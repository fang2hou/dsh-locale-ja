/**
 * The `ja` extension of the shipped locale service — the only module that
 * reaches past the public API, because rc.6 offers no way to add a selectable
 * locale. It drives the runtime's own `snapshot`/`publish`/`adopt` members,
 * verifies them at activation, and undoes everything it installed; see
 * ADR-0002.
 */
import type { LocaleRuntime } from "@deepseek-ai/dsh-client-locale/client";
import { writePreference } from "./preference.ts";

export const JA = "ja";

// Shown by the language selector, in its own language.
const JA_LABEL = "日本語";

// Handed back to when the plugin is removed while Japanese is active; typed
// against the shipped ids the Host schema accepts.
const FALLBACK: "zh" | "en" = "en";

interface Locale {
  id: string;
  label: string;
}

interface Snapshot {
  active: string;
  locales: readonly Locale[];
  revision: number;
}

/**
 * The `private` internal `LocaleRuntime` members this plugin drives, narrowed
 * to exactly what is used and verified at activation by `internalsOf`.
 */
interface Internals {
  snapshot: Snapshot;
  publish: (active: string, localeChanged: boolean) => void;
  adopt: (...args: unknown[]) => void;
}

function internalsOf(locale: LocaleRuntime): Internals {
  const internals = locale as unknown as Internals;
  const usable =
    typeof internals.publish === "function" &&
    typeof internals.adopt === "function" &&
    typeof internals.snapshot.active === "string";
  if (!usable) {
    throw new Error(
      "@fang2hou/dsh-locale-ja: the locale service no longer exposes the internal " +
        "members this plugin drives (snapshot/publish/adopt); the installed " +
        "DeepSeek Harness is not compatible with this plugin version",
    );
  }
  return internals;
}

// Freezes the snapshot the way the runtime freezes its own. `publish` is
// called with `localeChanged: true` even though the active locale is
// unchanged: the language selector refreshes its options from that event.
function republish(internals: Internals, locales: readonly Locale[], active: string): void {
  const { revision } = internals.snapshot;
  internals.snapshot = Object.freeze({ active, locales: Object.freeze(locales), revision });
  internals.publish(active, true);
}

export function isJapaneseActive(locale: LocaleRuntime): boolean {
  return (locale.getLocale().active as string) === JA;
}

/**
 * Make `ja` selectable and switchable. `setLocale` persists an injected
 * selection in the browser instead of the Host document, and `adopt` stops a
 * Host preference sync from pulling the UI back off Japanese.
 */
export function extendLocaleService(locale: LocaleRuntime): () => void {
  const internals = internalsOf(locale);
  const baseSetLocale = locale.setLocale;
  const baseAdopt = internals.adopt;

  const { active, locales } = internals.snapshot;
  if (!locales.some((entry) => entry.id === JA)) {
    republish(internals, [...locales, { id: JA, label: JA_LABEL }], active);
  }

  locale.setLocale = (id: string): void => {
    if (id !== JA) {
      // A shipped locale takes over: forget the override so the Host
      // selection is authoritative again, then let the shipped path run.
      writePreference(null);
      baseSetLocale.call(locale, id);
      return;
    }
    if (internals.snapshot.active === JA) return;
    internals.publish(JA, true);
    writePreference(JA);
  };

  internals.adopt = (...args: unknown[]): void => {
    if (internals.snapshot.active === JA) return;
    baseAdopt.apply(locale, args);
  };

  return (): void => {
    locale.setLocale = baseSetLocale;
    internals.adopt = baseAdopt;
    const current = internals.snapshot;
    const remaining = current.locales.filter((entry) => entry.id !== JA);
    if (remaining.length === current.locales.length) return;
    republish(internals, remaining, current.active === JA ? FALLBACK : current.active);
  };
}
