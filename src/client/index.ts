/**
 * Browser half of the plugin: registers the Japanese dictionaries, adds `ja`
 * to the selectable locales, keeps the Japanese font stylesheet in sync with
 * the active locale, and restores a persisted selection. Everything is
 * registered through `ctx.effect` and reversed on teardown.
 */
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

  // Registration order matters: the language must exist before the runtime
  // re-resolves a stored `ja` preference, and its dictionaries must be in
  // place so the switch lands on Japanese copy rather than fallbacks.
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
