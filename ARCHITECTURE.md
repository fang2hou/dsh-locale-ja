# Architecture

This document records the architectural boundaries and invariants that must
remain true. Its purpose is to prevent accidental drift, especially when AI
agents modify the codebase. Keep it short and operational.

## What this project is

`@fang2hou/dsh-locale-ja` is a **standard DSH client plugin package** for
DeepSeek Harness (DSH) `0.1.5-rc.2`, supported on the `web` profile. Its Host
half (`src/index.ts`) exports an empty `apply()` only so the package can mount a
Loader row; its browser half (`src/client/index.ts`) performs locale
registration and all user-facing work. `dsh plugin --profile web add
@fang2hou/dsh-locale-ja` installs it as a **profile bundle** through
`dsh.bundle.patch` and `cordis.patch.yml`.

## Invariants

1. **The browser bundle must use DSH's module-loader envelope and resolve
   nothing through the platform module table.** Every `@deepseek-ai/*` reference
   in `src/` is `import type` only, and `scripts/build.ts` must keep asserting
   the envelope, zero `require()` calls, no module syntax, and exposed
   `apply`/`inject`; see [ADR-0001](./docs/adr/0001-standard-client-plugin-package.md).
   This keeps `lib/client.js` loadable by DSH without a runtime platform-module
   dependency.

2. **The package must be mounted by its own bundle patch, with an empty Host
   `apply()` and `dsh.client.immediately: true`.** `cordis.patch.yml` inserts
   the Loader row and `package.json` keeps both `dsh.bundle.patch` and the
   immediate client manifest; see
   [ADR-0001](./docs/adr/0001-standard-client-plugin-package.md). `dsh-client-modules`
   scans Loader entries rather than installed dependencies, and no module
   imports this package, so a missing row is not served and a lazy entry never
   activates.

3. **The plugin must own every side effect and reverse it through `ctx.effect`.**
   Dictionary registrations, the language-pack registration, and the
   plugin-owned stylesheet must all have disposers that restore shipped
   behavior on stop, update, removal, and partial setup; see
   [ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md) and
   [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md).
   This prevents a plugin lifecycle change from leaking registrations,
   callbacks, storage state, or DOM mutations.

4. **The plugin must extend the locale service only through its public
   language-pack API.** `src/client/locale-extension.ts` calls
   `locale.addLanguage({ id: 'ja', label: '日本語', fallback: 'en' })` and
   returns the runtime's own disposer; selection, persistence, restore, and
   Host sync are the shipped `setLocale`/`adopt` paths with no wrappers; see
   [ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md). The
   retired `0.1.x` internals drive is recorded in
   [ADR-0002](./docs/adr/0002-extend-the-locale-service-through-internal-fields.md).

5. **Japanese persists through the Host locale scope, not plugin storage.**
   The Host locale schema accepts any BCP 47 tag since DSH `0.1.5`, so
   `setLocale('ja')` writes the shipped `locale.preference` field and boots
   restore Japanese once the language registration lands; the plugin keeps no
   persistence layer of its own; see
   [ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md).

6. **The Japanese font override must be locale-scoped and token-level.**
   `src/client/font.ts` must own a style tag that exists only while `ja` is
   active and overrides `--dsw-font-family` on `:root`, using system-bundled
   faces and removing the tag on every teardown; see
   [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md).
   One base token changes the UI without styling product elements, changing the
   theme, or fetching a web font.

7. **Dictionaries must use the platform's own compile-time key unions whenever
   they are exposed.** `src/client/dictionaries.ts` must keep local unions only
   for namespaces whose owning packages do not expose them through their
   `exports` maps — `directory-browser`
   (`@deepseek-ai/dsh-client-ui-directory-picker-browse@0.1.5-rc.2`),
   `permission.access`
   (`@deepseek-ai/dsh-client-ui-permission-presets@0.1.5-rc.2`), `trajectory`
   (`@deepseek-ai/dsh-client-ui-trajectory@0.1.5-rc.2`), and the
   runtime-only namespaces registered through the untyped overload — naming
   each copied source and version; `pnpm typecheck` is the drift check for the
   typed set. This makes platform key renames, additions, and removals
   compile-time failures while keeping the unavailable unions auditable.

8. **Code identifiers, comments, and configuration must remain English, with
   Japanese confined to dictionary values.** This keeps implementation
   vocabulary stable while making every user-facing translation reviewable in
   the dictionaries.

## Component responsibilities

- `src/index.ts` — Host half; exports the empty `apply()` needed for the
  mountable Loader entry and contributes no Host behavior.
- `src/client/index.ts` — browser assembly point; injects `locale`, registers
  `DICTS`, installs the language pack, syncs the font, and owns the
  `ctx.effect` lifecycle.
- `src/client/locale-extension.ts` — registers 日本語 through the public
  `addLanguage` language-pack API and hands back the runtime's disposer.
- `src/client/font.ts` — creates, synchronizes, and disposes the
  plugin-owned, locale-scoped style tag for `--dsw-font-family`.
- `src/client/dictionaries.ts` — defines the 42 Japanese namespace
  dictionaries and their platform or documented local key unions.
- `scripts/build.ts` — emits declarations, the Host ESM entry, and the
  browser loader bundle, then enforces its envelope, purity, module-syntax, and
  export gates.
- `scripts/client.test.ts` — evaluates `lib/client.js` through a fake
  `window.__ModuleLoader__` and stand-in locale service, covering activation,
  switching, Host-scope persistence, fonts, and complete teardown.
- `cordis.patch.yml` — inserts the `locale-ja` Loader row that lets DSH discover
  and serve the package's browser half.

## Dependency direction

All `@deepseek-ai/*` dependencies are dev-only and type-only. The single
`peerDependencies` entry (`@deepseek-ai/dsh-client-locale`) is optional and
states the compatible runtime range; it is never imported. The runtime coupling
is the Cordis `locale` service obtained from `ctx`, which is what keeps the
browser bundle free of `require()`.

## What does not belong here

- Host-side behavior or Host persistence of `ja`; the Host half only mounts the
  package row.
- A UI Slot registration of its own; the plugin extends the shipped language
  selector through the locale service.
- Patching DSH's shipped locale package.
- Rebuilding the DSH frontend.
- Web fonts or any font fetched over the network.
