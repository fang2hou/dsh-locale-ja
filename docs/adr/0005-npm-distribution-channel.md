# ADR-0005: npm as a distribution channel

- Status: Accepted
- Date: 2026-08-14

## Context

ADR-0001 decided the build target is the **dynamic-plugin artifact**: a
self-contained JavaScript function body at `dist/client.js`, loaded via
`cordis_define` (`code.client`) and `cordis_run`. ADR-0001 listed an
"installable npm package wired through a composition" under alternatives and
rejected it — that was about **auto-loading** a package through a DSH
composition, which DSH does not support for client browser code.

A separate question is how the artifact is **distributed and versioned**.
Consumers today obtain it by building from source. Publishing to npm adds
versioning, easy updates (`pnpm update`), discoverability, and CI-driven
releases — without changing how DSH loads the plugin.

## Decision

Publish `dsh-locale-ja` to the **public npm registry** as a distribution
channel for the built artifact.

- The package contains `dist/client.js` (the function-body artifact) plus the
  README and LICENSE. It is **not** an importable module — the function-body
  invariant from ADR-0001 is unchanged.
- Consumers obtain the artifact with `pnpm add dsh-locale-ja` (or
  `npm install` / `yarn add`), read `node_modules/dsh-locale-ja/dist/client.js`,
  and pass its contents to `cordis_define` exactly as in the build-from-source
  path.
- `package.json` is public (`private` removed), with `publishConfig.registry`
  pinned to `https://registry.npmjs.org/` so publishing is not affected by a
  developer's local registry mirror.
- A `Release` workflow publishes on version tags (`v*`) with provenance.

## Consequences

- Loading is still `cordis_define` / `cordis_run`; npm does not introduce a new
  loading mechanism and does not contradict ADR-0001.
- Releases are driven by tags: bump the version in `package.json`, commit, tag
  `vX.Y.Z`, push the tag — CI builds, validates, and publishes. See
  [DEVELOPMENT.md](../../DEVELOPMENT.md).
- Publishing requires the `NPM_TOKEN` repository secret (an npm automation or
  granular access token). Provenance additionally requires the workflow's
  `id-token: write` permission and a GitHub-hosted runner.
- The package has no `main` / `exports` entry by design: importing it is not
  supported, because the artifact is a function body, not a module.
