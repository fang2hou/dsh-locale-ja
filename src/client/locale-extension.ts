/**
 * The `ja` extension of the shipped locale service.
 *
 * This is the only module that reaches past the locale service's public API,
 * and it does so because rc.6 offers no alternative: `LOCALE_IDS` is a frozen
 * `['zh', 'en']` constant, the selectable list lives in a private snapshot, and
 * `setLocale` rejects any id that is not in it. Adding a selectable locale
 * therefore goes through the same three members the runtime itself uses —
 * `snapshot`, `publish` and `adopt` — which the shipped bundle exposes verbatim
 * (client bundles ship unminified). See docs/adr/0002.
 *
 * Everything installed here is undone by the returned disposer, so stopping or
 * removing the plugin returns the service to its shipped behavior.
 */
import type { LocaleRuntime } from "@deepseek-ai/dsh-client-locale/client";
import { writePreference } from "./preference.ts";

/** The injected locale id. */
export const JA = "ja";

/** Display name, in its own language, as the language selector shows it. */
const JA_LABEL = "日本語";

/**
 * Locale the plugin hands the UI back to when it is removed while Japanese is
 * active. Typed against the shipped ids so it cannot drift to an id the Host
 * schema would reject.
 */
const FALLBACK: "zh" | "en" = "en";

/** One entry of the selectable locale list, widened to injected ids. */
interface Locale {
  /** Locale id (the `setLocale` argument). */
  id: string;
  /** Display name in its own language. */
  label: string;
}

/** The locale snapshot, widened to injected ids. */
interface Snapshot {
  /** Active locale id. */
  active: string;
  /** Selectable locales in display order. */
  locales: readonly Locale[];
  /** Monotonic change counter. */
  revision: number;
}

/**
 * The internal `LocaleRuntime` members this plugin drives. They are `private`
 * in the shipped declarations, so the runtime object is viewed through this
 * contract instead — narrowed to exactly what is used, and verified at
 * activation by {@link internalsOf}.
 */
interface Internals {
  /** Current snapshot; reassigned to extend the selectable locales. */
  snapshot: Snapshot;
  /** Advance the revision, notify subscribers, and optionally emit `locale/change`. */
  publish: (active: string, localeChanged: boolean) => void;
  /** Adopt the durable Host selection. Its argument is only ever forwarded. */
  adopt: (...args: unknown[]) => void;
}

/**
 * View the locale service through its internal contract, failing loudly when
 * the installed DSH no longer matches it.
 * @param locale - the locale service.
 * @returns the same object, typed as {@link Internals}.
 */
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

/**
 * Replace the selectable locale list, mirroring how the runtime freezes its own
 * snapshots so consumers cannot tell the difference.
 *
 * `publish` is called with `localeChanged: true` even though the active locale
 * is unchanged: the language selector row refreshes its options from the
 * `locale/change` event, so an already-mounted settings panel would otherwise
 * keep showing a stale list.
 */
function republish(internals: Internals, locales: readonly Locale[], active: string): void {
  const { revision } = internals.snapshot;
  internals.snapshot = Object.freeze({ active, locales: Object.freeze(locales), revision });
  internals.publish(active, true);
}

/**
 * Whether the injected Japanese locale is the active one.
 *
 * The shipped snapshot types `active` as the shipped ids only, so reading an
 * injected id back out needs the widened view this module owns.
 * @param locale - the locale service.
 * @returns true while Japanese is active.
 */
export function isJapaneseActive(locale: LocaleRuntime): boolean {
  return (locale.getLocale().active as string) === JA;
}

/**
 * Make `ja` a selectable, switchable locale.
 *
 * Two writes are intercepted, because the Host cannot represent `ja`:
 * `setLocale` persists an injected selection in the browser instead of the Host
 * document, and `adopt` stops a Host preference sync from pulling the UI back
 * off Japanese.
 * @param locale - the locale service to extend.
 * @returns the disposer restoring the shipped behavior.
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
      // A shipped locale takes over: forget the override so the Host selection
      // is authoritative again, then let the shipped path validate and persist.
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
