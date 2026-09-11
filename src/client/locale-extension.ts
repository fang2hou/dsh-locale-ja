/**
 * The `ja` extension of the shipped locale service. Since DSH 0.1.5 the
 * runtime ships a public language-pack API: `addLanguage` extends the
 * selectable catalog (including fallback resolution), `setLocale` persists
 * any registered id through the Host locale scope, and `adopt` restores the
 * stored selection on boot. This module registers 日本語 and owns the
 * disposer — no internals drive, no plugin-local persistence; see ADR-0003
 * for the internals approach this replaced.
 */
import type { LocaleRuntime } from "@deepseek-ai/dsh-client-locale/client";

export const JA = "ja";

// Shown by the language selector, in its own language.
const JA_LABEL = "日本語";

export function isJapaneseActive(locale: LocaleRuntime): boolean {
  return (locale.getLocale().active as string) === JA;
}

/**
 * Make `ja` selectable and switchable. Persistence is the runtime's own
 * Host locale scope — the schema accepts any BCP 47 id since 0.1.5 — and a
 * stored `ja` preference re-resolves automatically once this registration
 * lands, so boots restore Japanese without plugin-side storage.
 */
export function extendLocaleService(locale: LocaleRuntime): () => void {
  return locale.addLanguage({ id: JA, label: JA_LABEL, fallback: "en" });
}
