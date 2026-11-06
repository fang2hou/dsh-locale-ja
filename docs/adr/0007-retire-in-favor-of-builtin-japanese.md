# ADR-0007: Retire in favor of built-in Japanese

- Status: Accepted
- Date: 2026-11-06

## Context

DSH `0.2.2-rc.1` (published 2026-11-04, now the npm `latest` and `next` tag)
ships `ja` in `@deepseek-ai/dsh-client-locale` alongside `en`, `zh`, `es`, `fr`,
`de`, `ru`, and `pt`. The fresh-install language menu already lists 日本語, so
this plugin no longer adds a language the runtime lacks.

The scheduled `E2E next DSH` workflow has failed since 2026-11-04 against
`0.2.2-rc.1`:

- the baseline and removed-state e2e specs assert the menu is exactly
  `["English", "中文"]`, which no longer holds;
- the install and conversation specs time out waiting for the Account menu;
- the dictionary drift check reports missing keys in about 20 namespaces plus
  stale keys and an uncovered namespace.

Porting would mean rewriting the e2e baseline around a language upstream now
owns and risking a duplicate `ja` registration.

## Decision

- Retire the package. Users on `0.2.2` or later remove the plugin and use the
  built-in Japanese.
- Remove `.github/workflows/e2e-upstream.yml`. `ci.yml` still gates PRs on the
  pinned `0.2.1-rc.4`.
- Keep `scripts/check-dict-drift.ts` and `mise run drift` for on-demand use.
- Do not bump the DSH pin or refresh dictionaries again.

## Consequences

- No further DSH releases are tracked; the package is frozen on `0.2.1-rc.4`.
- The README carries a deprecation notice pointing users at the built-in
  language.
- Publishing a final release and running `npm deprecate` are separate, manual
  steps outside this change.
