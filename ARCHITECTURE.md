# Architecture

This document records the architectural boundaries and invariants that must
remain true. Its purpose is to prevent accidental drift, especially when AI
agents modify the codebase. Keep it short and operational.

## What this project is

`@fang2hou/dsh-locale-ja` is a **standard DSH client plugin package** for
DeepSeek Harness (DSH) `0.2.1-rc.4`, supported on the `web` profile. Its Host
half (`src/index.ts`) exports an empty `apply()` only so the package can mount a
Loader row; its browser half (`src/client/index.ts`) performs locale
registration and all user-facing work. `dsh plugin --profile web add
@fang2hou/dsh-locale-ja` installs it as a **profile bundle** through
`dsh.bundle.patch` and `cordis.patch.yml`.

## Invariants

1. **The browser bundle must use DSH's module-loader envelope and resolve nothing
   through the platform module table.** Every `@deepseek-ai/*` reference in
   `src/` is `import type` only, so `lib/client.js` loads without a runtime
   platform-module dependency. `scripts/build.ts` asserts the envelope, zero
   `require()` calls, no module syntax, and exposed `apply`/`inject`
   ([ADR-0001](./docs/adr/0001-standard-client-plugin-package.md)).

2. **The package must mount through its own bundle patch, with an empty Host
   `apply()` and `dsh.client.immediately: true`.** `cordis.patch.yml` inserts
   the Loader row, and `package.json` declares both `dsh.bundle.patch` and the
   immediate client manifest
   ([ADR-0001](./docs/adr/0001-standard-client-plugin-package.md)). Because
   `dsh-client-modules` scans Loader entries rather than installed dependencies
   and nothing imports this package, a missing row is never served and a lazy
   entry never activates.

3. **The plugin must own every side effect and reverse it through `ctx.effect`.**
   Dictionary registrations, the language-pack registration, and the
   plugin-owned stylesheet each return a disposer that restores shipped
   behavior on stop, update, removal, or partial setup
   ([ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md),
   [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md)).

4. **The plugin must extend the locale service only through its public
   language-pack API.** `src/client/locale-extension.ts` calls
   `locale.addLanguage({ id: 'ja', label: '日本語', fallback: 'en' })` and
   returns the runtime's disposer. Selection, persistence, restore, and Host
   sync run through the shipped `setLocale`/`adopt` paths without wrappers
   ([ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md); the
   retired `0.1.x` internals approach is recorded in
   [ADR-0002](./docs/adr/0002-extend-the-locale-service-through-internal-fields.md)).

5. **Japanese must persist through the Host locale scope, not plugin storage.**
   The Host locale schema has accepted arbitrary BCP 47 tags since DSH `0.1.5`.
   Calling `setLocale('ja')` writes the shipped `locale.preference` field, and
   subsequent boots restore Japanese as soon as the language pack registers
   ([ADR-0006](./docs/adr/0006-adopt-the-public-language-pack-api.md)).

6. **The Japanese font override must be locale-scoped and token-level.**
   `src/client/font.ts` manages a `<style>` tag that exists only while `ja` is
   active, overrides `--dsw-font-family` on `:root` with system-bundled faces,
   and removes the tag on teardown
   ([ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md)).
   Overriding the base token updates the UI typography without styling
   individual product elements or fetching web fonts.

7. **Dictionaries must use the platform's compile-time key unions wherever packages
   export them.** `src/client/dictionaries.ts` defines local key unions only for
   namespaces whose owning packages omit them from `exports`:
   `directory-browser`
   (`@deepseek-ai/dsh-client-ui-directory-picker-browse@0.2.1-rc.4`),
   `permission.access`
   (`@deepseek-ai/dsh-client-ui-permission-presets@0.2.1-rc.4`), `trajectory`
   (`@deepseek-ai/dsh-client-ui-trajectory@0.2.1-rc.4`), and the nine
   runtime-only namespaces registered through the untyped overload
   (`documentHtml`, `documentMarkdown`, `reference`, `sidebarCodePreview`,
   `sidebarExcel`, `sidebarImage`, `sidebarOffice`, `sidebarPdf`, and
   `sidebarTerminal`), each citing its source package and version. `pnpm
   typecheck` catches key drift across the exported unions, and `pnpm drift`
   (`scripts/check-dict-drift.ts`) verifies all 58 namespaces against a real
   DSH web tree.

8. **Code identifiers, comments, and configuration must stay in English; Japanese
   is confined to dictionary values and user-facing docs.**

## Component responsibilities

- `src/index.ts`: Host half. Exports the empty `apply()` required to mount the
  Loader entry and owns no Host behavior.
- `src/client/index.ts`: Browser assembly point. Injects `locale`, registers
  `DICTS`, installs the language pack, syncs the font stylesheet, and binds
  everything to `ctx.effect`.
- `src/client/locale-extension.ts`: Registers 日本語 through
  `locale.addLanguage` and returns the runtime's disposer.
- `src/client/font.ts`: Inserts and removes the locale-scoped `<style>` tag for
  `--dsw-font-family`.
- `src/client/dictionaries.ts`: Holds the 58 Japanese namespace dictionaries and
  their platform or local key unions.
- `scripts/build.ts`: Emits declarations, the Host ESM entry, and the browser
  loader bundle, then checks the loader envelope, zero-`require` purity, module
  syntax, and `apply`/`inject` exports.
- `scripts/client.test.ts`: Runs `lib/client.js` against a stand-in
  `window.__ModuleLoader__` and locale service to test activation, switching,
  Host-scope persistence, font toggling, and teardown.
- `scripts/check-dict-drift.ts`: Installs a target DSH web tree into a
  temporary directory and checks that every shipped namespace and key matches
  `DICTS`.
- `cordis.patch.yml`: Mounts the `locale-ja` Loader row so DSH discovers and
  serves the browser bundle.

## Dependency direction

All `@deepseek-ai/*` packages in `devDependencies` are imported as types only.
The optional `peerDependencies` entry (`@deepseek-ai/dsh-client-locale`)
declares the compatible runtime range and is never imported at runtime. At
runtime, the plugin couples only to the Cordis `locale` service on `ctx`, which
keeps the browser bundle free of `require()`.

## Out of scope

- Host-side behavior or plugin-owned persistence for `ja` (the Host half only
  mounts the Loader row).
- Custom UI Slot registrations (the plugin extends the shipped language
  selector through the locale service).
- Patching DSH's shipped locale package or rebuilding the DSH frontend.
- Web fonts or any network requests.
