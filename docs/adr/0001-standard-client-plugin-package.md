# ADR-0001: Build target is a standard DSH client plugin package

- Status: Accepted
- Date: 2026-08-14

## Context

DeepSeek Harness (DSH) ships client capabilities in two existing forms:

1. **Bundled client modules** — compiled into the web frontend and loaded via
   the browser `__ModuleLoader__`. Adding one requires a frontend rebuild.
2. **Dynamic plugins** — arbitrary client code registered at runtime through
   `cordis_define` (`code.client`) and activated with `cordis_run`.

A third path is intended for a third-party plugin: a published package that
declares `dsh.bundle.patch` and `dsh.client`. `dsh plugin add` installs it into
a profile; its bundle patch mounts a Loader row, and
`@deepseek-ai/dsh-client-modules` serves its browser entry at
`/plugins/<id>/client.js` without a frontend rebuild.

## Decision

Build `@fang2hou/dsh-locale-ja` as a **standard client plugin package**. The
Host half (`src/index.ts` → `lib/index.js`) exists so the package mounts as a
Loader entry and exports an empty `apply()`. The browser half
(`src/client/index.ts` → `lib/client.js`) is exposed as `exports["./client"]`
and served by DSH through the profile bundle.

The browser bundle must use the loader envelope shipped client bundles use:

```js
window.__ModuleLoader__.load({ id, factory: (require) => { ... return module.exports } })
```

Its body is CommonJS, returns `module.exports`, and contains no leaked module
syntax. `dsh.client.immediately` is `true`: nothing imports this package, so a
lazy client entry would never materialize or activate.

## Alternatives considered

- **Dynamic-plugin artifact.** Rejected: it is ephemeral and process-local,
  requires an agent to paste code into `cordis_define`, and provides no package
  versioning.
- **Fork the DSH frontend.** Rejected: too heavy and tightly coupled to DSH's
  frontend build.

## Consequences

- Installing the package mounts the profile bundle and lets DSH serve the
  browser half without rebuilding the frontend. See
  [ARCHITECTURE.md](../../ARCHITECTURE.md) and
  [DEVELOPMENT.md](../../DEVELOPMENT.md).
- The build must preserve the loader envelope, CommonJS body, and immediate
- client-entry metadata; `scripts/build.ts` asserts these invariants.
