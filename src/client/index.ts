/**
 * Browser half of the plugin: registers the Japanese dictionaries, adds `ja`
 * to the selectable locales, keeps the Japanese font and layout stylesheets
 * in sync with the active locale, and restores a persisted selection.
 * Everything is registered through `ctx.effect` and reversed on teardown.
 */
import type { ClientContext } from "@deepseek-ai/dsh-client-runtime/client";
import { DICTS } from "./dictionaries.ts";
import { createFontStylesheet } from "./font.ts";
import { createLayoutStylesheet } from "./layout.ts";
import { extendLocaleService, isJapaneseActive, JA } from "./locale-extension.ts";
import { readPreference } from "./preference.ts";

export const inject = ["locale"];

export function apply(ctx: ClientContext): void {
  const { locale } = ctx;

  ctx.effect(() => {
    const disposers = Object.entries(DICTS).map(([ns, dict]) => locale.register(ns, JA, dict));
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "locale-ja: japanese dictionaries");

  ctx.effect(() => extendLocaleService(locale), "locale-ja: selectable ja locale");

  ctx.effect(() => {
    const font = createFontStylesheet();
    const layout = createLayoutStylesheet();
    const sync = (): void => {
      const japanese = isJapaneseActive(locale);
      font.sync(japanese);
      layout.sync(japanese);
    };
    sync();
    const unsubscribe = locale.subscribe(sync);
    return () => {
      unsubscribe();
      font.dispose();
      layout.dispose();
    };
  }, "locale-ja: japanese font and layout");

  // The shipped service has already settled on the Host or browser language.
  if (readPreference() === JA) locale.setLocale(JA);
}
