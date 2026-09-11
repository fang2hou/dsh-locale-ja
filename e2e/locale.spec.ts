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

async function openSettings(page: Page, triggerLabel: string): Promise<void> {
  await page.getByRole("button", { name: triggerLabel, exact: true }).click();
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
    await openSettings(page, "Settings");
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
    await openSettings(page, "Settings");

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
    await openSettings(page, "設定");
    await expect(page.getByText("言語", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "日本語", exact: true })).toBeVisible();
    await expect(page.locator(FONT_TAG)).toHaveCount(1);

    const second = await context.newPage();
    await openApp(second);
    await dismissOnboarding(second);
    await openSettings(second, "設定");
    await expect(second.getByText("言語", { exact: true })).toBeVisible();

    // Deactivate: back to English, no font tag.
    await openLanguageMenu(page, "日本語");
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page.getByText("Language", { exact: true })).toBeVisible();
    expect(await page.locator(FONT_TAG).count()).toBe(0);
  });
});

test.describe.serial("conversation: a mock-LLM turn renders the japanese chrome", () => {
  // The container's DEEPSEEK_BASE_URL points at the host-side mock
  // (e2e/mock-llm.ts), so a real turn completes without credentials.
  test("a turn completes with Japanese composer and reply chrome", async ({ page }) => {
    await openApp(page);
    await dismissOnboarding(page);

    // The previous phase ends back on English; switch to Japanese through the
    // shipped menu — the same path a user takes.
    await openSettings(page, "Settings");
    await openLanguageMenu(page, "English");
    await page.getByRole("menuitem", { name: "日本語" }).click();
    await expect(page.getByRole("button", { name: "設定", exact: true })).toBeVisible();
    await expect(page.locator(FONT_TAG)).toHaveCount(1);
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });

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
    await openSettings(page, "Settings");
    await expect(page.getByText("Language", { exact: true })).toBeVisible();

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文"]);

    expect(await page.locator(FONT_TAG).count()).toBe(0);
  });
});
