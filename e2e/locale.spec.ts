// E2E for the Japanese locale plugin against a real DSH web in Docker.
// Four serial phases mutate shared container state; order is load-bearing:
//   1. baseline — shipped behavior without the plugin
//   2. installed — add the plugin, switch to 日本語, persistence, revert
//   3. conversation — one mock-LLM turn renders Japanese chrome
//   4. removed — uninstall restores the shipped default
// Navigation goes through the process-token URL (harness.authUrl): since
// DSH 0.1.5 the /api browser-trust fence rejects tokenless sessions, and
// every fresh Playwright context must re-authenticate.
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { authUrl, installPlugin, removePlugin, restartAndWait } from "./harness.ts";
import { checkSingleLineCopy } from "./copy-layout.ts";

const BASE = process.env.DSH_BASE_URL ?? "http://127.0.0.1:3080";
const FONT_TAG = 'style[data-plugin-css="@fang2hou/dsh-locale-ja/japanese-font.css"]';

async function openApp(page: Page): Promise<void> {
  await page.goto(await authUrl(BASE), { waitUntil: "load" });
}

// Onboarding dialogs block the whole UI and mount sequentially, possibly
// seconds after the shell — wait for one, dismiss it, repeat until none
// appears within the settle timeout.
async function dismissOnboarding(page: Page): Promise<void> {
  const anyDialog = page.getByRole("dialog").first();
  const proceed = page
    .getByRole("button", { name: /^(Continue|続行|Configure later|後で設定|あとで設定)$/ })
    .first();
  for (let step = 0; step < 8; step++) {
    const appeared = await anyDialog.waitFor({ state: "visible", timeout: 8_000 }).then(
      () => true,
      () => false,
    );
    if (!appeared) return;
    await proceed.waitFor({ state: "visible", timeout: 5_000 });
    await proceed.click();
    // Sequential dialogs mount moments after the previous one unmounts.
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1_000);
  }
  throw new Error("onboarding dialogs never settled");
}

// 0.2.1 folded the sidebar Settings button into the account menu: the
// bottom-left "Account menu" button opens a menu whose first item is Settings.
async function openSettings(page: Page, locale: "en" | "ja"): Promise<void> {
  const labels =
    locale === "ja"
      ? { account: "アカウントメニュー", settings: "設定" }
      : { account: "Account menu", settings: "Settings" };
  await page.getByRole("button", { name: labels.account, exact: true }).click();
  await page.getByRole("menuitem", { name: labels.settings, exact: true }).click();
  await page.getByRole("dialog").waitFor();
}

async function openLanguageMenu(page: Page, activeLabel: string): Promise<void> {
  await page.getByRole("button", { name: activeLabel, exact: true }).click();
  await page.getByRole("menu").waitFor();
}

// The menu renders in a page-level portal, so query at page level.
async function menuItems(page: Page): Promise<string[]> {
  const items = await page.getByRole("menuitem").allInnerTexts();
  return items.map((t) => t.trim()).toSorted();
}

test.describe.serial("baseline: fresh DSH web without the plugin", () => {
  test("UI is English; language menu offers exactly 中文 / English; no plugin artifacts", async ({
    page,
  }) => {
    await openApp(page);
    await dismissOnboarding(page);
    await openSettings(page, "en");
    await expect(page.getByText("Language", { exact: true })).toBeVisible();

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文"]);

    expect(await page.locator(FONT_TAG).count()).toBe(0);
  });
});

test.describe.serial("installed: load, activate, persist, deactivate", () => {
  test.beforeAll(async () => {
    await installPlugin();
    await restartAndWait(BASE);
  });

  // One continuous test: Playwright isolates contexts per test, and the
  // Japanese selection must carry through activation, reload, a second page,
  // and deactivation.
  test("日本語 selectable, applies, persists, and reverses", async ({ page, context }) => {
    await openApp(page);
    await dismissOnboarding(page);
    await openSettings(page, "en");

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文", "日本語"]);

    await page.getByRole("menuitem", { name: "日本語" }).click();
    await expect(page.getByText("言語", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "日本語", exact: true })).toBeVisible();

    await expect(page.locator(FONT_TAG)).toHaveCount(1);
    const fontFamily = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--dsw-font-family"),
    );
    expect(fontFamily).toContain('"Hiragino Sans"');

    // Persistence through the Host locale scope: reload and a second page in
    // the same context both come back in Japanese.
    await page.reload();
    await dismissOnboarding(page);
    await openSettings(page, "ja");
    await expect(page.getByText("言語", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "日本語", exact: true })).toBeVisible();
    await expect(page.locator(FONT_TAG)).toHaveCount(1);

    const second = await context.newPage();
    await openApp(second);
    await dismissOnboarding(second);
    await openSettings(second, "ja");
    await expect(second.getByText("言語", { exact: true })).toBeVisible();

    // Deactivate: back to English, no font tag.
    await openLanguageMenu(page, "日本語");
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page.getByText("Language", { exact: true })).toBeVisible();
    expect(await page.locator(FONT_TAG).count()).toBe(0);
  });

  test("Japanese settings actions describe their dialogs and cancellation", async ({
    page,
  }, testInfo) => {
    await openApp(page);
    await dismissOnboarding(page);
    await openSettings(page, "en");
    await openLanguageMenu(page, "English");
    await page.getByRole("menuitem", { name: "日本語" }).click();

    const permission = page.getByRole("button", {
      name: "ワークスペース内の書き込み",
      exact: true,
    });
    await checkSingleLineCopy(page, testInfo, "settings-labels", [
      { locator: permission, before: "ワークスペース内書き込み" },
      {
        locator: page.getByRole("button", { name: "キューに追加", exact: true }),
        before: "キューに送信",
      },
    ]);
    await permission.click();
    await page.getByRole("menuitem", { name: "フルアクセス", exact: true }).click();
    const risk = page.getByRole("dialog", { name: "フルアクセスを有効にしますか？", exact: true });
    await expect(risk).toContainText("新しいセッション");
    await expect(risk.getByRole("button", { name: "フルアクセスを有効化" })).toBeDisabled();
    await risk.getByRole("checkbox", { name: "リスクを理解した上で続行します" }).check();
    await expect(risk.getByRole("button", { name: "フルアクセスを有効化" })).toBeEnabled();
    await checkSingleLineCopy(page, testInfo, "permission-labels", [
      {
        locator: risk.getByRole("button", { name: "フルアクセスを有効化" }),
        before: "Full Access を有効化",
      },
      { locator: risk.getByRole("heading"), before: "Full Access を有効にしますか？" },
    ]);
    await page.screenshot({ path: testInfo.outputPath("permission-ja.png") });
    await risk.getByRole("button", { name: "キャンセル", exact: true }).click();
    await expect(risk).toBeHidden();
    await expect(permission).toBeVisible();

    await page.getByRole("button", { name: "プリセット", exact: true }).click();
    // 0.2.0 replaced preset duplication with per-mode guide dialogs.
    await page.getByRole("button", { name: "モードの詳細: 標準モード" }).click();
    const guide = page.getByRole("dialog", { name: "標準モード", exact: true });
    await expect(guide.getByRole("tablist", { name: "ガイドの内容" })).toBeVisible();
    await expect(guide.getByRole("heading", { name: "仕組み" })).toBeVisible();
    await expect(guide).toContainText("サブエージェント、ワークフロー、コンテキスト圧縮");
    await guide.getByRole("tab", { name: "使い方" }).click();
    await expect(guide.getByRole("heading", { name: "バグを修正する" })).toBeVisible();
    await expect(guide.getByText("サンプルタスク").first()).toBeVisible();
    await checkSingleLineCopy(page, testInfo, "preset-labels", [
      {
        locator: guide.getByRole("tab", { name: "モードの詳細" }),
        before: "Mode details",
      },
      {
        locator: guide.getByRole("tab", { name: "使い方" }),
        before: "How to use",
      },
    ]);
    await page.screenshot({ path: testInfo.outputPath("preset-ja.png") });
    await guide.getByRole("button", { name: "閉じる", exact: true }).click();
    await expect(guide).toBeHidden();

    await page.getByRole("button", { name: "一般", exact: true }).click();
    await openLanguageMenu(page, "日本語");
    await page.getByRole("menuitem", { name: "English", exact: true }).click();
  });
});

test.describe.serial("conversation: a mock-LLM turn renders the japanese chrome", () => {
  // The container's DEEPSEEK_BASE_URL points at the host-side mock
  // (e2e/mock-llm.ts), so a real turn completes without credentials.
  test("a turn completes with Japanese composer and reply chrome", async ({ page }, testInfo) => {
    await openApp(page);
    await dismissOnboarding(page);

    // The previous phase ends back on English; switch to Japanese through the
    // shipped menu — the same path a user takes.
    await openSettings(page, "en");
    await openLanguageMenu(page, "English");
    await page.getByRole("menuitem", { name: "日本語" }).click();
    // 0.2.1 has no sidebar Settings button anymore; the settings dialog
    // title turns Japanese instead.
    await expect(page.getByRole("dialog", { name: "設定", exact: true })).toBeVisible();
    await expect(page.locator(FONT_TAG)).toHaveCount(1);
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });

    // The new sidebar More menu must use Japanese for both its trigger and
    // the shared plugin actions, rather than falling back to English.
    await page.getByRole("button", { name: "その他", exact: true }).click();
    await expect(page.getByRole("menuitem", { name: "他のプラグインを探す" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "プラグインを作成" })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("entry-customization-ja.png") });
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "ワークスペースを選択" }).click();
    const picker = page.getByRole("dialog");
    await picker.waitFor();
    await picker.getByRole("button", { name: "開く", exact: true }).click();
    const composer = page.getByRole("textbox", { name: /作りたいものを入力/ });
    await composer.waitFor({ timeout: 15_000 });

    // One turn against the mock. The reply's first line also becomes the
    // session title, so match the first occurrence.
    await composer.fill("統計表示のテスト");
    await page.getByRole("button", { name: "メッセージを送信" }).click();
    await expect(
      page.getByText("これはモック LLM の応答です。", { exact: false }).first(),
    ).toBeVisible({ timeout: 30_000 });

    const usageButton = page.getByRole("button", { name: /^使用量 / });
    await expect(usageButton).toBeVisible();
    await expect(page.getByText(/^完了、所要時間/).first()).toBeVisible();
    await checkSingleLineCopy(page, testInfo, "reply-labels", [
      { locator: usageButton, before: (await usageButton.innerText()).replace("使用量", "用量") },
    ]);

    // Open real reply controls, so a translated label must lead to the
    // intended data rather than merely exist in the dictionary.
    await usageButton.click();
    const usage = page.getByRole("dialog", { name: "このターンの使用量", exact: true });
    await expect(usage.getByText("出力", { exact: true })).toBeVisible();
    await expect(usage).toContainText("180 tok");
    // The 0.2.0 Messages protocol reports no reasoning-token usage, so the
    // うち推論 segment no longer renders; thinking deltas still show below.
    await expect(usage.getByText("キャッシュ読み取り", { exact: true })).toBeVisible();
    await checkSingleLineCopy(page, testInfo, "usage-labels", [
      {
        locator: usage.getByText("このターンの使用量", { exact: true }),
        before: "このターンの用量",
      },
    ]);
    await page.screenshot({ path: testInfo.outputPath("turn-usage-ja.png") });
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: /tok · ヒット率/ }).click();
    const totals = page.getByRole("dialog", { name: "トークン使用量", exact: true });
    await expect(totals.getByText("キャッシュ読み取り", { exact: true })).toBeVisible();
    await expect(totals).toContainText("768 tok");
    await checkSingleLineCopy(page, testInfo, "session-usage-labels", [
      { locator: totals.getByText("トークン使用量", { exact: true }), before: "トークン用量" },
    ]);
    await page.screenshot({ path: testInfo.outputPath("session-usage-ja.png") });
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: /^1 ターン 1 ステップ/ }).click();
    const timing = page.getByRole("dialog", { name: "セッション統計", exact: true });
    await expect(
      timing.getByText("最初のトークンまでの平均時間（TTFT）", { exact: true }),
    ).toBeVisible();
    await checkSingleLineCopy(page, testInfo, "timing-labels", [
      {
        locator: timing.getByText("最初のトークンまでの平均時間（TTFT）", { exact: true }),
        before: "初トークン平均（TTFT）",
      },
    ]);
    await page.screenshot({ path: testInfo.outputPath("session-timing-ja.png") });
  });
});

test.describe.serial("removed: uninstall reverts to shipped default", () => {
  test.beforeAll(async () => {
    await removePlugin();
    await restartAndWait(BASE);
  });

  test("日本語 gone; UI is English again; no plugin artifacts", async ({ page }) => {
    await openApp(page);
    await dismissOnboarding(page);
    await openSettings(page, "en");
    await expect(page.getByText("Language", { exact: true })).toBeVisible();

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文"]);

    expect(await page.locator(FONT_TAG).count()).toBe(0);
  });
});
