# Architecture

This document records the architectural boundaries and invariants that must
remain true. Its purpose is to prevent accidental drift, especially when AI
agents modify the codebase. Keep it short and operational.

## What this project is

`@fang2hou/dsh-locale-ja` is a **standard DSH client plugin package** for
DeepSeek Harness (DSH) `0.1.0-rc.7`, supported on the `web` profile. Its Host
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
   Dictionary registrations, locale overrides, persistence hooks, and the
   plugin-owned stylesheet must all have disposers that restore shipped
   behavior on stop, update, removal, and partial setup; see
   [ADR-0002](./docs/adr/0002-extend-the-locale-service-through-internal-fields.md),
   [ADR-0003](./docs/adr/0003-client-side-persistence-for-the-injected-locale.md),
   and [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md).
   This prevents a plugin lifecycle change from leaking registrations,
   callbacks, storage state, or DOM mutations.

4. **Only `src/client/locale-extension.ts` may contact locale internals, through
   `snapshot`/`publish`/`adopt` and a runtime capability check.** The module
   must fail loudly when the installed runtime no longer exposes that contract
   and must keep the original methods for teardown; see
   [ADR-0002](./docs/adr/0002-extend-the-locale-service-through-internal-fields.md).
   DSH `0.1.0-rc.7` has no public API for adding a selectable locale, so this
   boundary makes the compatibility risk explicit and contained.

5. **Japanese persistence must remain client-side, and `setLocale('ja')` must
   never write to the Host settings scope.** `src/client/preference.ts` uses
   the `dsh-locale-ja:preference` storage key, while shipped-locale selections
   clear the override and use the shipped path; see
   [ADR-0003](./docs/adr/0003-client-side-persistence-for-the-injected-locale.md).
   The Host locale schema accepts only `zh|en`, so writing `ja` would be
   rejected and could undo the active browser selection.

6. **The Japanese font override must be locale-scoped and token-level.**
   `src/client/font.ts` must own a style tag that exists only while `ja` is
   active and overrides `--dsw-font-family` on `:root`, using system-bundled
   faces and removing the tag on every teardown; see
   [ADR-0004](./docs/adr/0004-japanese-fonts-via-the-base-font-token.md).
   One base token changes the UI without styling product elements, changing the
   theme, or fetching a web font.

7. **Dictionaries must use the platform's own compile-time key unions whenever
   they are exposed.** `src/client/dictionaries.ts` must keep local unions only
   for `directory-browser`
   (`@deepseek-ai/dsh-client-ui-directory-picker-browse@0.1.0-rc.7`),
   `permission.access`
   (`@deepseek-ai/dsh-client-ui-permission-presets@0.1.0-rc.7`), and
   `trajectory` (`@deepseek-ai/dsh-client-ui-trajectory@0.1.0-rc.7`), naming
   each copied source and version; `pnpm typecheck` is the drift check.
   This makes platform key renames, additions, and removals compile-time
   failures while keeping the three unavailable unions auditable.

8. **Code identifiers, comments, and configuration must remain English, with
   Japanese confined to dictionary values.** This keeps implementation
   vocabulary stable while making every user-facing translation reviewable in
   the dictionaries.

## Component responsibilities

- `src/index.ts` — Host half; exports the empty `apply()` needed for the
  mountable Loader entry and contributes no Host behavior.
- `src/client/index.ts` — browser assembly point; injects `locale`, registers
  `DICTS`, installs the locale extension, syncs the font, restores the local
  preference, and owns the `ctx.effect` lifecycle.
- `src/client/locale-extension.ts` — the only module touching locale internals;
  extends the selectable list, wraps `setLocale`/`adopt`, checks capability, and
  restores the shipped methods and snapshot.
- `src/client/preference.ts` — reads and writes the plugin's localStorage key,
  tolerating unavailable storage without moving state into Host settings.
- `src/client/font.ts` — creates, synchronizes, and disposes the
  plugin-owned, locale-scoped style tag for `--dsw-font-family`.
- `src/client/layout.ts` — creates, synchronizes, and disposes the
  plugin-owned layout stylesheet that widens the shipped StatsLine text budget
  while `ja` is active; resolves the component's hashed CSS-module class at
  runtime from its registration tag and degrades to shipped behavior when the
  stylesheet is absent.
- `src/client/dictionaries.ts` — defines the 29 Japanese namespace dictionaries
  and their platform or documented local key unions.
- `scripts/build.ts` — emits declarations, the Host ESM entry, and the
  browser loader bundle, then enforces its envelope, purity, module-syntax, and
  export gates.
- `scripts/client.test.ts` — evaluates `lib/client.js` through a fake
  `window.__ModuleLoader__` and stand-in locale service, covering activation,
  switching, local persistence, fonts, and complete teardown.
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
