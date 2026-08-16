/**
 * The Japanese layout stylesheet: owned by this plugin, present only while
 * `ja` is the active locale, widening text budgets that shipped components
 * size for Latin copy.
 *
 * `StatsLine` (dsh-client-ui-conversation) centers one line of turn/token
 * statistics padded by `calc(var(--dsh-composer-side-clearance) + 16px)` per
 * side — 32px each way on the default theme — and ellipsizes on overflow.
 * Japanese runs close to the English width (CJK glyphs are wider, the words
 * shorter), so that padding routinely starves the line into "…" with real
 * session numbers. The override widens the text budget and lets a line that
 * still cannot fit wrap instead of truncating.
 *
 * The component's class names are per-build CSS-module hashes, so the rule is
 * generated at runtime: the component's registration tag
 * (`style[data-plugin-css$="/StatsLine.module.css"]`) carries a stable id, and
 * the actual `_root` class is read from its text. A DSH build whose stylesheet
 * stops matching simply drops the adjustment (shipped behavior returns); it
 * never breaks loading.
 */

/** Package id, matching the client bundle's module id. */
const PLUGIN_ID = "@fang2hou/dsh-locale-ja";

/** Stylesheet identity, unique per plugin-owned tag. */
const TAG_ID = `${PLUGIN_ID}/japanese-layout.css`;

/** Stable registration id of the shipped component's stylesheet. */
const STATSLINE_TAG = 'style[data-plugin-css$="/StatsLine.module.css"]';

/**
 * The override for a resolved StatsLine root class: a wider text budget and a
 * wrap fallback instead of ellipsis. `!important` keeps the override ahead of
 * shell stylesheets inserted after this tag, which decide the cascade on
 * equal specificity.
 */
const statsLineRule = (rootClass: string): string =>
  `.${rootClass}{` +
  "padding-left:8px !important;" +
  "padding-right:8px !important;" +
  "white-space:normal !important;" +
  "}";

/** The plugin-owned layout stylesheet and its lifecycle. */
export interface LayoutStylesheet {
  /**
   * Match the stylesheet to the active locale.
   * @param japanese - whether `ja` is the active locale.
   */
  sync: (japanese: boolean) => void;
  /** Remove the stylesheet. */
  dispose: () => void;
}

/**
 * Read the shipped StatsLine root class from its registration tag.
 * @returns the class name, or null while the capability is absent (no
 * document, no querySelector, or no matching shipped stylesheet).
 */
function resolveStatsLineRoot(): string | null {
  if (typeof document === "undefined" || typeof document.querySelector !== "function") {
    return null;
  }
  const shipped = document.querySelector(STATSLINE_TAG);
  // The tag's text is the module's own CSS: `.HASH_root{…}` opens it.
  const rootClass = shipped?.textContent?.match(/\.([-\w]+)_root\s*\{/)?.[1];
  return rootClass === undefined ? null : `${rootClass}_root`;
}

/**
 * Create the layout stylesheet controller.
 *
 * The tag is created on the first activation and dropped again whenever a
 * shipped locale takes over, so a session that never selects Japanese leaves
 * no stylesheet behind. A document without the shipped StatsLine stylesheet
 * (older/newer DSH, non-browser boot) keeps the tag absent by design.
 * @returns the stylesheet controller.
 */
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
      tag.textContent = statsLineRule(rootClass);
      document.head.append(tag);
    },
    dispose: remove,
  };
}
