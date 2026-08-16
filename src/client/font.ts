/**
 * The Japanese font stylesheet: plugin-owned, present only while `ja` is
 * active, re-facing the whole UI through the base `--dsw-font-family` token
 * (see ADR-0004).
 */

const PLUGIN_ID = "@fang2hou/dsh-locale-ja";
const TAG_ID = `${PLUGIN_ID}/japanese-font.css`;

// Latin faces first, then Japanese faces so kana and kanji render with
// Japanese glyph shapes; every family is OS-bundled, no web font is fetched.
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", ' +
  '"Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Meiryo", "Noto Sans JP", sans-serif';

// `!important` stays ahead of shell stylesheets inserted after this tag.
const CSS = `:root{--dsw-font-family:${FONT_STACK} !important;}`;

export interface FontStylesheet {
  sync: (japanese: boolean) => void;
  dispose: () => void;
}

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
