# Architecture

This document records the architectural boundaries and invariants that must
remain true. Its purpose is to prevent accidental drift, especially when AI
agents modify the codebase. Keep it short and operational.

## What this project is

A dynamic **Client-half** Cordis plugin for DeepSeek Harness (DSH). It has no
Host half. It runs entirely in the browser page and is loaded as a dynamic
plugin via `cordis_define` / `cordis_run` (see
[ADR-0001](./docs/adr/0001-build-target-is-the-dynamic-plugin-artifact.md)).

## Invariants

1. **The build artifact is a function body, not a module.**
   `dist/client.js` is evaluated by the harness as a plain function body whose
   closure provides injected builtins. It must contain no
   `import` / `export` / `require` and must end by `return`-ing the plugin.
   `scripts/build.mjs` asserts both. Do not weaken these assertions.

2. **The plugin is the sole owner of its side effects, and all are reversible.**
   Every dictionary registration, the `setLocale`/`adopt` overrides, the font
   stylesheet, and the `locale.snapshot` extension are registered through
   `ctx.effect` / retained disposers and fully undone on teardown. Stopping,
   updating, or undefining the plugin restores the shipped behavior.

3. **Locale extension happens through the runtime's own internal fields.**
   The locale service has no public API to add a selectable locale, so the
   plugin reassigns `locale.snapshot` (adding `ja`) and calls `publish`, and
   overrides `setLocale`/`adopt`. These are internal to `LocaleRuntime`; the
   local `src/types.ts` contract intentionally includes them. See
   [ADR-0002](./docs/adr/0002-extend-the-locale-service-through-internal-fields.md).

4. **Japanese persistence is client-side only.**
   The host `locale` settings schema only accepts `zh|en` and
   `settings.register()` throws on a duplicate namespace, so `ja` is persisted
   in `localStorage`, never in the host document. `setLocale('ja')` must not
   call `host.set('preference', 'ja')`. See
   [ADR-0003](./docs/adr/0003-client-side-persistence-for-the-injected-locale.md).

5. **The font override is locale-scoped and token-level.**
   The Japanese font stylesheet is injected only while the active locale is
   `ja` and is removed otherwise. It overrides `--dsw-font-family` on `:root`
   (the base token every typography style reads), not individual elements or
   the global theme. See
   [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md).

6. **Code language is English; only UI copy literals are Japanese.**
   Identifiers, comments, and configuration are English. Dictionary values in
   `src/dictionaries.ts` are the only Japanese literals.

## Component responsibilities

- `src/client.ts` — the plugin: registers dictionaries, extends the selectable
  locales, overrides `setLocale`/`adopt`, manages the font stylesheet,
  persists/restores the preference, and tears everything down. Build entry.
- `src/dictionaries.ts` — Japanese copy for every shipped locale namespace.
  Keys are the lookup keys; values are UI strings. Source of truth for keys is
  each feature's shipped `zh` dictionary.
- `src/types.ts` — minimal local types for the `locale` service and client
  context this plugin touches.
- `src/builtins.d.ts` — ambient declaration of the injected `styles` builtin.
- `scripts/build.mjs` — TS → self-contained function-body artifact transform.

## Dependency direction

`client.ts` → `dictionaries.ts`, `types.ts`. `builtins.d.ts` is ambient only.
The build consumes `client.ts` as the entry. No source file depends on the
build output.

## What does not belong here

- A Host half (the plugin is client-only; persistence is `localStorage`, not a
  host service or settings namespace).
- Editing DSH's shipped locale package or host composition. This plugin
  composes at runtime; it does not patch shipped code.
- A UI-rendering Slot. The plugin augments the existing Language row through
  the locale service; it does not register its own UI.
