/**
 * The Japanese layout stylesheet: plugin-owned, present only while `ja` is
 * active. The shipped `StatsLine` pads and ellipsizes one line of turn/token
 * statistics sized for Latin copy; the override widens the text budget and
 * lets overflow wrap instead of truncating. The component's class names are
 * per-build CSS-module hashes, so the `_root` class is read at runtime from
 * its registration tag — a DSH build whose stylesheet stops matching simply
 * drops the adjustment.
 */

const PLUGIN_ID = "@fang2hou/dsh-locale-ja";
const TAG_ID = `${PLUGIN_ID}/japanese-layout.css`;
const STATSLINE_TAG = 'style[data-plugin-css$="/StatsLine.module.css"]';

export interface LayoutStylesheet {
  sync: (japanese: boolean) => void;
  dispose: () => void;
}

function resolveStatsLineRoot(): string | null {
  if (typeof document === "undefined" || typeof document.querySelector !== "function") {
    return null;
  }
  const shipped = document.querySelector(STATSLINE_TAG);
  // The tag's text is the module's own CSS: `.HASH_root{…}` opens it.
  const rootClass = shipped?.textContent?.match(/\.([-\w]+)_root\s*\{/)?.[1];
  return rootClass === undefined ? null : `${rootClass}_root`;
}

export function createLayoutStylesheet(): LayoutStylesheet {
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
      if (tag !== null || typeof document === "undefined") return;
      const rootClass = resolveStatsLineRoot();
      if (rootClass === null) return;
      tag = document.createElement("style");
      tag.dataset.plugin = PLUGIN_ID;
      tag.dataset.pluginCss = TAG_ID;
      // `!important` stays ahead of the shipped stylesheet on equal specificity.
      tag.textContent =
        `.${rootClass}{` +
        "padding-left:8px !important;" +
        "padding-right:8px !important;" +
        "white-space:normal !important;" +
        "}";
      document.head.append(tag);
    },
    dispose: remove,
  };
}
