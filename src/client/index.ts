/**
 * Japanese locale plugin, browser half.
 *
 * Adds `ja` (日本語) as a fully selectable interface language: Japanese
 * dictionaries for every namespace the shipped client packages register, the
 * locale itself in the language selector, Japanese system fonts while it is
 * active, and a selection that survives a page reload.
 *
 * `apply` is the assembly point; each concern owns its own module and its own
 * disposer, and every contribution is registered through `ctx.effect` so
 * stopping, updating, or removing the plugin restores the shipped behavior.
 */
import type { ClientContext } from "@deepseek-ai/dsh-client-runtime/client";
import { DICTS } from "./dictionaries.ts";
import { createFontStylesheet } from "./font.ts";
import { createLayoutStylesheet } from "./layout.ts";
import { extendLocaleService, isJapaneseActive, JA } from "./locale-extension.ts";
import { readPreference } from "./preference.ts";

/** Required services: the locale registry this plugin extends. */
export const inject = ["locale"];

/**
 * Browser plugin body.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  const { locale } = ctx;

  ctx.effect(() => {
    // The untyped single-locale form: the typed form demands every shipped
    // locale, and this plugin contributes exactly one.
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

  // Last word on the active locale: the shipped service has already settled on
  // the Host preference or the browser's own language by now.
  if (readPreference() === JA) locale.setLocale(JA);
}
