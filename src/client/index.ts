import type { Context as ClientContext } from "@deepseek-ai/cordis";
import { DICTS } from "./dictionaries.ts";
import { createFontStylesheet } from "./font.ts";
import { extendLocaleService, isJapaneseActive, JA } from "./locale-extension.ts";

export const inject = ["locale"];

export function apply(ctx: ClientContext): void {
  const { locale } = ctx;

  ctx.effect(() => {
    const disposers = Object.entries(DICTS).map(([ns, dict]) => locale.register(ns, JA, dict));
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "locale-ja: japanese dictionaries");

  // Dictionaries must land before the language exists: a stored `ja`
  // preference re-resolves on registration and would otherwise flip the UI
  // onto English fallback copy.
  ctx.effect(() => extendLocaleService(locale), "locale-ja: selectable ja locale");

  ctx.effect(() => {
    const font = createFontStylesheet();
    const sync = (): void => {
      font.sync(isJapaneseActive(locale));
    };
    sync();
    const unsubscribe = locale.subscribe(sync);
    return () => {
      unsubscribe();
      font.dispose();
    };
  }, "locale-ja: japanese font");
}
