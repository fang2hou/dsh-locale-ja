/**
 * Japanese locale injector — Client half.
 *
 * Adds `ja` (日本語) as a fully selectable interface language in DeepSeek
 * Harness, registers Japanese dictionaries for every shipped locale namespace,
 * applies a Japanese system font while `ja` is active, and persists the choice
 * client-side (survives page refresh).
 *
 * This module is the build entry. `scripts/build.mjs` bundles it and rewrites
 * the ESM default export into the self-contained function-body artifact that
 * the harness evaluates as a dynamic Client plugin's `code.client`.
 *
 * Architecture notes (see ARCHITECTURE.md + docs/adr):
 *  - There is no public API to add a selectable locale, so the plugin drives
 *    the `locale` service through the same internal fields the runtime uses
 *    (`snapshot`, `publish`, `adopt`). Every change is reversed on teardown.
 *  - The host `locale` settings schema only accepts `zh|en`, so `ja` cannot be
 *    persisted in the host document; it is persisted in `localStorage` instead.
 */
import type { LocaleDefinition, LocaleSnapshot, LocaleRuntime, ClientContext } from "./types";
import { DICTS } from "./dictionaries";

const JA: LocaleDefinition = { id: "ja", label: "日本語" };
const INJECTED: Readonly<Record<string, true>> = { ja: true };
// Settings field that carries the durable locale preference in the host doc.
const LOCALE_SETTINGS_FIELD = "preference";
const STORE_KEY = "dsh-locale-ja:preference";

// Latin system UI fonts first, then Japanese system fonts for CJK glyphs.
// All are OS-bundled (no web-font download). Applied only while `ja` is active.
const JP_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", ' +
  '"Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Meiryo", "Noto Sans JP", sans-serif';

const lsGet = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
};

const lsSet = (value: string | null): void => {
  if (typeof window === "undefined") return;
  try {
    if (value) window.localStorage.setItem(STORE_KEY, value);
    else window.localStorage.removeItem(STORE_KEY);
  } catch {
    /* ignore unavailable / quota-restricted storage */
  }
};

const freeze = (
  active: string,
  locales: readonly LocaleDefinition[],
  revision: number,
): LocaleSnapshot =>
  Object.freeze({ active, locales: Object.freeze(locales), revision }) as LocaleSnapshot;

export default {
  inject: ["locale"],
  apply(ctx: ClientContext): void {
    const locale = ctx.locale;

    // --- Register Japanese dictionaries for every namespace (defensively). ---
    const disposers: Array<() => void> = [];
    for (const namespace of Object.keys(DICTS)) {
      try {
        const dispose = locale.register(namespace, "ja", DICTS[namespace]);
        disposers.push(dispose);
      } catch (error) {
        console.error("[locale-ja] register failed for", namespace, (error as Error)?.message);
      }
    }

    // --- Add Japanese to the selectable locales list. ---
    const ensureJaSelectable = (): void => {
      const current = locale.getLocale();
      if (current.locales.some((entry) => entry.id === "ja")) return;
      locale.snapshot = freeze(current.active, current.locales.concat([JA]), current.revision);
    };
    ensureJaSelectable();

    // --- Japanese system font, applied only while `ja` is active. ---
    const fontCss = `:root{--dsw-font-family:${JP_FONT_STACK} !important;}`;
    let fontDisposer: (() => void) | null = null;
    const syncFont = (): void => {
      const isJapanese = locale.getLocale().active === "ja";
      if (isJapanese && !fontDisposer) {
        fontDisposer = styles.insert(fontCss);
      } else if (!isJapanese && fontDisposer) {
        try {
          fontDisposer();
        } catch {
          /* dispose best-effort */
        }
        fontDisposer = null;
      }
    };

    // --- Intercept setLocale: injected locales persist client-side only. ---
    // The host `locale` schema rejects `ja`, so it is never written there; the
    // override is persisted in localStorage. Durable locales write through and
    // clear the override. `adopt` is guarded so a host sync never reverts `ja`.
    const originalSetLocale = locale.setLocale;
    const originalAdopt = locale.adopt;
    locale.setLocale = function (this: LocaleRuntime, id: string): void {
      const match = this.snapshot.locales.find((entry) => entry.id === id);
      if (match === undefined) throw new Error(`locale "${id}" is not registered`);
      if (this.snapshot.active === match.id) return;
      this.publish(match.id, true);
      if (INJECTED[id]) {
        lsSet(id);
      } else {
        lsSet(null);
        if (this.host) {
          try {
            void this.host.set(LOCALE_SETTINGS_FIELD, id);
          } catch {
            /* durable write best-effort */
          }
        }
      }
    };
    locale.adopt = function (this: LocaleRuntime, host: LocaleRuntime["host"]): void {
      if (INJECTED[this.snapshot.active]) return;
      originalAdopt.call(this, host as never);
    };

    // --- Refresh outlets, apply the font, and restore a saved preference. ---
    try {
      locale.publish(locale.getLocale().active, true);
    } catch (error) {
      console.error("[locale-ja] publish failed", (error as Error)?.message);
    }
    syncFont();
    const unsubscribeFont = locale.subscribe(syncFont);
    if (lsGet() === "ja") {
      try {
        locale.setLocale("ja");
      } catch {
        /* locale not ready; stay on the current active locale */
      }
    }

    // --- Teardown: reverse every side effect this plugin introduced. ---
    ctx.effect(
      () => (): void => {
        try {
          unsubscribeFont();
        } catch {
          /* best-effort */
        }
        if (fontDisposer) {
          try {
            fontDisposer();
          } catch {
            /* best-effort */
          }
          fontDisposer = null;
        }
        for (const dispose of disposers) {
          try {
            dispose();
          } catch {
            /* best-effort */
          }
        }
        locale.setLocale = originalSetLocale;
        locale.adopt = originalAdopt;
        const current = locale.getLocale();
        if (current.locales.some((entry) => entry.id === "ja")) {
          const active = INJECTED[current.active] ? "zh" : current.active;
          locale.snapshot = freeze(
            active,
            current.locales.filter((entry) => entry.id !== "ja"),
            current.revision,
          );
          try {
            locale.publish(active, true);
          } catch {
            /* best-effort */
          }
        }
      },
      "locale-ja: teardown",
    );
  },
};
