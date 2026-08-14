# ADR-0005: npm is the install channel

- Status: Accepted
- Date: 2026-08-14

## Context

This is a **standard client plugin package**, not a separately distributed
browser artifact. Running
`dsh plugin --profile web add @fang2hou/dsh-locale-ja` installs the package
into the profile and reconciles it into `dsh.profile.bundles`. The package's
bundle patch then mounts its Loader row, allowing DSH to serve the browser half
without a frontend rebuild. See
[ADR-0001](./0001-standard-client-plugin-package.md).

The package is a real importable npm package with `exports` entries for `.` and
`./client`. It publishes the plugin files `lib/index.js`, `lib/client.js`,
`lib/types/**/*.d.ts`, and `cordis.patch.yml`. Version `0.1.0` is pre-release
and has not yet been published.

## Decision

Use the public npm registry as the install channel for
`@fang2hou/dsh-locale-ja`. Consumers install it with the DSH plugin command,
which both installs the package and updates the profile bundle manifest.

CI releases use npm trusted publishing (OIDC):

- No `NPM_TOKEN` is stored.
- Publishing runs on `v*` tags with npm CLI >= 11.5.1 on a GitHub-hosted
  runner.
- npm permits one trusted publisher per package.
- The package must already exist on npm before trusted publishing can be
  configured, so the first version is published manually once; subsequent
  versions use OIDC.

## Alternatives considered

- **Distribute the dynamic-plugin function body.** Rejected: it is not an
  installable, profile-mounted package and requires manual runtime loading.
- **Require a frontend fork or rebuild.** Rejected: it is too heavy and makes
  installation tightly coupled to DSH's frontend source.

## Consequences

- Installation is versioned and profile-integrated; removing the package with
  `dsh plugin --profile web remove @fang2hou/dsh-locale-ja` removes its mounted
  entry without changing the frontend.
- Trusted publishing avoids a long-lived npm credential while retaining
  provenance for tag-based releases. Setup and routine release steps are in
  [DEVELOPMENT.md](../../DEVELOPMENT.md).
