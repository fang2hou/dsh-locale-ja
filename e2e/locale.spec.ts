import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { installPlugin, removePlugin, restartAndWait } from "./harness.ts";

const BASE = process.env.DSH_BASE_URL ?? "http://127.0.0.1:3080";
const FONT_TAG = 'style[data-plugin-css="@fang2hou/dsh-locale-ja/japanese-font.css"]';
const LAYOUT_TAG = 'style[data-plugin-css="@fang2hou/dsh-locale-ja/japanese-layout.css"]';

async function dismissOnboarding(page: Page) {
  // Onboarding dialogs (Internal Testing Notice, API-key setup) block the
  // whole UI, and their labels follow the active locale — English by default,
  // Japanese once this plugin is active. They mount sequentially, and on a
  // cold first load they can appear seconds after the shell: keep checking
  // until the UI stays dialog-free for a settle window.
  const anyDialog = page.getByRole("dialog").first();
  const dismissButton = page
    .getByRole("button", { name: /^(Continue|続行|Configure later|後で設定)$/ })
    .first();
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (!(await anyDialog.isVisible())) {
      await page.waitForTimeout(500);
      if (!(await anyDialog.isVisible())) return; // settled: nothing blocking
      continue;
    }
    await dismissButton.click();
    await anyDialog.waitFor({ state: "hidden", timeout: 5000 }).catch(() => {});
  }
}

async function openSettings(page: Page, triggerLabel: string) {
  await page.getByRole("button", { name: triggerLabel, exact: true }).click();
  await page.getByRole("dialog").waitFor();
}

async function openLanguageMenu(page: Page, activeLabel: string) {
  // The language pill button shows the active label.
  await page.getByRole("button", { name: activeLabel, exact: true }).click();
  await page.getByRole("menu").waitFor();
}

async function menuItems(page: Page) {
  // The menu renders in a portal, so query at page level.
  const items = await page.getByRole("menuitem").allInnerTexts();
  return items.map((t) => t.trim()).toSorted();
}

test.describe.serial("baseline: fresh DSH web without the plugin", () => {
  test("UI is English; language menu offers exactly 中文 / English; no plugin artifacts", async ({
    page,
  }) => {
    await page.goto("/");
    await dismissOnboarding(page);
    await openSettings(page, "Settings");
    await expect(page.getByText("Language", { exact: true })).toBeVisible();

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文"]);

    expect(await page.locator(FONT_TAG).count()).toBe(0);
    expect(await page.evaluate(() => localStorage.getItem("dsh-locale-ja:preference"))).toBeNull();
  });
});

test.describe.serial("installed: load, activate, persist, deactivate", () => {
  test.beforeAll(async () => {
    await installPlugin();
    await restartAndWait(BASE);
  });

  // One continuous test: Playwright isolates contexts per test, and the
  // plugin's localStorage preference must carry through activation,
  // reload, a second page, and deactivation.
  test("日本語 selectable, applies, persists, and reverses", async ({ page, context }) => {
    await page.goto("/");
    await dismissOnboarding(page);
    await openSettings(page, "Settings");

    // 1. 日本語 appears in the menu alongside the shipped languages.
    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文", "日本語"]);

    // 2. Selecting it flips the UI to Japanese.
    await page.getByRole("menuitem", { name: "日本語" }).click();
    await expect(page.getByText("言語", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "日本語", exact: true })).toBeVisible();

    // 3. Font override active.
    await expect(page.locator(FONT_TAG)).toHaveCount(1);
    const fontFamily = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--dsw-font-family"),
    );
    expect(fontFamily).toContain('"Hiragino Sans"');

    // 4. Persistence: preference key written, survives reload and a second
    //    page in the same context.
    expect(await page.evaluate(() => localStorage.getItem("dsh-locale-ja:preference"))).toBe("ja");
    await page.reload();
    await dismissOnboarding(page);
    await openSettings(page, "設定");
    await expect(page.getByText("言語", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "日本語", exact: true })).toBeVisible();
    await expect(page.locator(FONT_TAG)).toHaveCount(1);

    const second = await context.newPage();
    await second.goto("/");
    await dismissOnboarding(second);
    await openSettings(second, "設定");
    await expect(second.getByText("言語", { exact: true })).toBeVisible();

    // 5. Deactivate within the installed plugin: back to English, no font
    //    tag, preference key removed.
    await openLanguageMenu(page, "日本語");
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page.getByText("Language", { exact: true })).toBeVisible();
    expect(await page.locator(FONT_TAG).count()).toBe(0);
    expect(await page.evaluate(() => localStorage.getItem("dsh-locale-ja:preference"))).toBeNull();
  });
});

test.describe.serial("conversation: a mock-LLM turn renders the japanese chrome", () => {
  // The container's DEEPSEEK_BASE_URL points at the host-side mock
  // (e2e/mock-llm.ts), so a real turn completes without credentials.
  test("reply arrives; stats row shows every segment without truncating", async ({ page }) => {
    // Japanese comes back through the plugin's own persistence path.
    await page.addInitScript(() => localStorage.setItem("dsh-locale-ja:preference", "ja"));
    await page.goto("/");
    await dismissOnboarding(page);
    await expect(page.getByRole("button", { name: "設定", exact: true })).toBeVisible();
    await expect(page.locator(LAYOUT_TAG)).toHaveCount(1);

    // Start a workspace session through the composer's directory picker.
    await page.getByRole("button", { name: "ワークスペースを選択" }).click();
    const picker = page.getByRole("dialog");
    await picker.waitFor();
    await picker.getByRole("button", { name: "開く", exact: true }).click();
    const composer = page.getByPlaceholder("作りたいものを入力してください");
    await composer.waitFor({ timeout: 15_000 });

    // One turn against the mock.
    await composer.fill("統計行の表示テスト");
    await page.getByRole("button", { name: "メッセージを送信" }).click();

    // The mock's reply and the stats row underneath it. The reply's first
    // line also becomes the session title, so match the first occurrence.
    await expect(
      page.getByText("これはモック LLM の応答です。", { exact: false }).first(),
    ).toBeVisible({ timeout: 30_000 });
    const stats = page.getByText("1 ﾀｰﾝ · 1 ｽﾃｯﾌﾟ", { exact: false }).first();
    await expect(stats).toBeVisible();
    await expect(page.getByText("ﾋｯﾄ率", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("出力 180 tok", { exact: false }).first()).toBeVisible();

    // The layout override keeps the row readable: the line fits or wraps,
    const overflow = await stats.evaluate((el) => {
      const root = el.closest("div");
      return root === null ? null : root.scrollWidth - root.clientWidth;
    });
    expect(overflow).toBe(0);
  });
});

test.describe.serial("removed: uninstall reverts to shipped default", () => {
  test.beforeAll(async () => {
    await removePlugin();
    await restartAndWait(BASE);
  });

  test("UI is English again; menu back to exactly 中文 / English; no plugin style tag", async ({
    page,
  }) => {
    await page.goto("/");
    await dismissOnboarding(page);
    await openSettings(page, "Settings");

    await openLanguageMenu(page, "English");
    expect(await menuItems(page)).toEqual(["English", "中文"]);

    expect(await page.locator(FONT_TAG).count()).toBe(0);
    expect(await page.evaluate(() => localStorage.getItem("dsh-locale-ja:preference"))).toBeNull();
  });
});
