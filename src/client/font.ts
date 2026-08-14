/**
 * The Japanese font stylesheet: owned by this plugin, present only while `ja`
 * is the active locale.
 *
 * `--dsw-font-family` is the base token every typography style reads, so a
 * single `:root` declaration re-faces the whole UI without touching product
 * markup or the theme service. The tag follows the shipped client-bundle
 * convention (`data-plugin` / `data-plugin-css`), so the module loader
 * recognizes it as this package's style tag.
 */

/** Package id, matching the client bundle's module id. */
const PLUGIN_ID = "@fang2hou/dsh-locale-ja";

/** Stylesheet identity, unique per plugin-owned tag. */
const TAG_ID = `${PLUGIN_ID}/japanese-font.css`;

/**
 * Latin system UI faces first, then Japanese system faces for kana and kanji so
 * they render with Japanese glyph shapes instead of Chinese ones. Every family
 * is OS-bundled: macOS/iOS Hiragino, Windows Yu Gothic/Meiryo, Android and most
 * Linux distributions Noto Sans JP. No web font is fetched.
 */
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", ' +
  '"Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Meiryo", "Noto Sans JP", sans-serif';

/**
 * `!important` keeps the override ahead of shell stylesheets inserted after
 * this tag, which decide the cascade on equal specificity.
 */
const CSS = `:root{--dsw-font-family:${FONT_STACK} !important;}`;

/** The plugin-owned font stylesheet and its lifecycle. */
export interface FontStylesheet {
  /**
   * Match the stylesheet to the active locale.
   * @param japanese - whether `ja` is the active locale.
   */
  sync: (japanese: boolean) => void;
  /** Remove the stylesheet. */
  dispose: () => void;
}

/**
 * Create the font stylesheet controller.
 *
 * The tag is created on the first activation and dropped again whenever a
 * shipped locale takes over, so a session that never selects Japanese leaves no
 * stylesheet behind.
 * @returns the stylesheet controller.
 */
export function createFontStylesheet(): FontStylesheet {
  let tag: HTMLStyleElement | null = null;

  const remove = (): void => {
    tag?.remove();
    tag = null;
  };

  return {
    sync(japanese: boolean): void {
      if (!japanese) {
        remove();
        return;
      }
      // No document while the client tree boots outside a browser.
      if (tag !== null || typeof document === "undefined") return;
      tag = document.createElement("style");
      tag.dataset.plugin = PLUGIN_ID;
      tag.dataset.pluginCss = TAG_ID;
      tag.textContent = CSS;
      document.head.append(tag);
    },
    dispose: remove,
  };
}
