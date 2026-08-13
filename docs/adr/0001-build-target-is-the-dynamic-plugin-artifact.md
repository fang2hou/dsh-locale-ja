# ADR-0001: Build target is the dynamic-plugin artifact

- Status: Accepted
- Date: 2026-08-14

## Context

This plugin is a DeepSeek Harness (DSH) **client-half** plugin: it runs in the
browser page and extends the client `locale` service. DSH has two ways a
capability can ship:

1. **Bundled client modules** — compiled into the web frontend (`apps/web`) and
   loaded via the browser `__ModuleLoader__`. Adding one requires rebuilding the
   frontend.
2. **Dynamic plugins** — arbitrary client code registered at runtime via
   `cordis_define` (as `code.client`) and activated via `cordis_run`.

DSH does **not** expose a drop-in "install a third-party client plugin" path.
Compositions / agent presets are host-side plugin rows; they do not carry
arbitrary client browser code.

We want a project that is shareable as source and produces a runnable artifact
without rebuilding DSH.

## Decision

The build target is the **dynamic-plugin artifact**: a single self-contained
JavaScript **function body** at `dist/client.js`, intended to be passed as
`code.client` to `cordis_define` and activated with `cordis_run`.

`scripts/build.mjs` bundles the TypeScript entry with esbuild and rewrites the
ESM default export into a `return` so the output is a valid function body.

## Alternatives considered

- **Installable npm package wired through a composition.** Rejected: DSH
  compositions mount host plugins, not arbitrary client code; client modules
  are bundled into the frontend.
- **Fork/rebuild the DSH frontend to include the plugin.** Rejected: too heavy
  for sharing and tightly coupled to DSH's build.

## Consequences

- Loading the plugin requires `cordis_define` / `cordis_run` (agent-assisted or
  via the GUI Cordis panel). It is not a static composition row.
- The plugin is process-local and ephemeral (a dynamic plugin), which is
  consistent with how DSH exposes runtime client extension today.
- The build must guarantee the function-body invariants (no module syntax; ends
  with `return`). `scripts/build.mjs` asserts these.
