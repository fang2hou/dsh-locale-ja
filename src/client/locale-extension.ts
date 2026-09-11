// The only module that talks to the locale service's language-pack surface;
// the history of the internals drive this replaces is in ADR-0006.
import type { LocaleRuntime } from "@deepseek-ai/dsh-client-locale/client";

export const JA = "ja";

const JA_LABEL = "日本語";

export function isJapaneseActive(locale: LocaleRuntime): boolean {
  return (locale.getLocale().active as string) === JA;
}

export function extendLocaleService(locale: LocaleRuntime): () => void {
  return locale.addLanguage({ id: JA, label: JA_LABEL, fallback: "en" });
}
