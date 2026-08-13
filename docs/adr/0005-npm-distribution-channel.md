# ADR-0005: npm as a distribution channel (trusted publishing)

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

Authentication for publishing is handled by **npm trusted publishing** (OpenID
Connect), so no long-lived npm token is stored as a repository secret. Each
publish is authenticated with a short-lived, workflow-specific credential that
npm issues after verifying the GitHub Actions OIDC identity.

## Decision

Publish `@fang2hou/dsh-locale-ja` to the **public npm registry** as a distribution
channel for the built artifact, using trusted publishing for CI releases.

- The package contains `dist/client.js` (the function-body artifact) plus the
  README and LICENSE. It is **not** an importable module — the function-body
  invariant from ADR-0001 is unchanged, and there is intentionally no
  `main` / `exports` entry.
- Consumers obtain the artifact with `pnpm add @fang2hou/dsh-locale-ja` (or
  `npm install` / `yarn add`), read `node_modules/@fang2hou/dsh-locale-ja/dist/client.js`,
  and pass its contents to `cordis_define` exactly as in the build-from-source
  path.
- `package.json` is public (`private` removed), with `publishConfig.registry`
  pinned to `https://registry.npmjs.org/` so publishing is not affected by a
  developer's local registry mirror.
- The `Release` workflow publishes on version tags (`v*`) with
  `permissions: id-token: write` and a plain `npm publish`; npm CLI (>= 11.5.1,
  provided by Node 24 via mise) auto-detects OIDC and attaches provenance
  automatically. No `NPM_TOKEN` secret is used.

## Constraints

- npm trusted publishing can only be configured for a package that **already
  exists** on the registry (npm has no PyPI-style pre-claim; this prevents
  package-name hijacking). Because `@fang2hou/dsh-locale-ja` is new, the **first**
  version is published manually once to create the package; afterwards the
  trusted publisher is configured on npmjs.com and all subsequent versions
  publish via OIDC. See [DEVELOPMENT.md](../../DEVELOPMENT.md) → Releasing.
- Trusted publishing requires npm CLI >= 11.5.1 and Node >= 22.14 (both met by
  the `node = "24"` tool), and a GitHub-hosted runner (`ubuntu-latest`).
- Each package supports exactly one trusted publisher configuration.

## Consequences

- Loading is still `cordis_define` / `cordis_run`; npm does not introduce a new
  loading mechanism and does not contradict ADR-0001.
- No npm token to create, store, or rotate. To publish, bump the version in
  `package.json`, commit, tag `vX.Y.Z`, push the tag — CI builds, validates,
  and publishes via OIDC.
- The package is verifiable: every OIDC publish carries a provenance
  attestation linking it to this source and the workflow run.
