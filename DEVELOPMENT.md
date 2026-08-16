# Development

This document describes how to develop, validate, and release
`dsh-locale-ja`.

The project is pre-release (`0.2.0`) and supports the DSH `0.1.0-rc.6` `web`
profile and browser UI only. The `0.1.0` on npm is the older, dynamically
loaded artifact; the standard package ships from `0.2.0`.

## Prerequisites

The project standardizes its environment with [mise](https://mise.jdx.dev/):

| Tool                         | Managed by  | Purpose                                      |
| ---------------------------- | ----------- | -------------------------------------------- |
| Node.js 24                   | `mise`      | Runtime / build                              |
| pnpm 11                      | `mise`      | Package manager (never npm/yarn)             |
| [cocogitto](https://cocogitto.ai/) (`cog`) | `mise` | Conventional Commits validation             |
| [prek](https://github.com/j178/prek)       | `mise` | Pre-commit framework                         |
| gitleaks                     | `mise`      | Secret scanning                              |
| actionlint, shellcheck       | `mise`      | Workflow and shell lint (prek hooks)         |
| TypeScript, esbuild, oxlint, oxfmt | npm devDeps | Type-check, declarations, bundle, lint, format |

TypeScript is pinned as an npm devDependency through the lockfile rather than
a mise tool: mise manages runtimes and CLI tools, while language packages
belong to pnpm. The lockfile makes the `tsc` version exactly as reproducible
as a mise pin.

## Setup

```bash
mise install          # provision runtimes and CLI tools
pnpm install          # install dev dependencies
prek install          # install git hooks (uses .pre-commit-config.yaml)
```

## Toolchain

- **Package manager**: pnpm only. Do not introduce npm or yarn.
- **Linter**: [oxlint](https://oxc.rs/docs/guide/usage/linter) (config:
  `.oxlintrc.json`). No ESLint. The `node` plugin's rules apply to `scripts/`
  and `e2e/` (the only Node-running code) through overrides;
  `no-await-in-loop` is off for the E2E/dev flows, which are sequential by
  design; `no-console` is off for build/test tooling; Playwright rules load
  through oxlint's `jsPlugins` bridge (`eslint-plugin-playwright`).
- **Formatter**: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) (config:
  `.oxfmtrc.json`). No Prettier.
- **Type checker**: `tsc --noEmit` (configs: `tsconfig.json` for `src/`,
  `tsconfig.tools.json` for `scripts/` and `e2e/`; both use explicit `.ts`
  import specifiers — only declaration-only emit and Node type-stripping can
  resolve them).
- **Bundler**: esbuild (`scripts/build.ts`); it also emits declarations through
  TypeScript.
- **Commits**: Conventional Commits, validated by cocogitto (`cog`) and prek.
- **PR titles**: the title becomes the squash-merge commit subject on `main`;
  CI validates it with `cog verify` (`validate-pr-title` job in
  `.github/workflows/ci.yml`). The title reaches the script through an
  environment variable, never `${{ }}` interpolation (script-injection guard).
- **Pre-commit**: prek runs oxlint, oxfmt (check), gitleaks, actionlint
  (GitHub workflows), shellcheck, and (on push) typecheck, plus a `commit-msg`
  hook that runs `cog verify`.
- **Workspace policy** (`pnpm-workspace.yaml`): `allowBuilds` approves
  esbuild's postinstall; `minimumReleaseAge: 60` refuses resolutions
  published less than an hour ago, with the fast-moving `@deepseek-ai/*`
  prerelease line excluded.

## Common tasks

All meaningful workflows are exposed as mise tasks (delegating to pnpm scripts):

```bash
mise run install        # pnpm install
mise run typecheck      # tsc --noEmit
mise run lint           # oxlint .
mise run format         # oxfmt --write .
mise run format-check   # oxfmt --check .
mise run build          # node scripts/build.ts -> lib/
mise run test           # pnpm test (browser-bundle integration test)
mise run check          # typecheck + lint + format-check + build + test
mise run clean          # remove lib/
mise run dev            # persistent local DSH web, hot-reloading this plugin
mise run dev-stop       # remove the dev container
```

The project's main validation entry point is:

```bash
mise run check
```

Local validation and CI use the same mise tasks so they cannot diverge.

## Build pipeline

The build produces three generated outputs:

- `lib/index.js` — Host half, emitted as ESM. Its empty `apply()` lets the
  package mount as a DSH Loader entry.
- `lib/client.js` — browser half, emitted as CommonJS inside the DSH loader
  envelope.
- `lib/types/**/*.d.ts` — TypeScript declarations emitted by `tsc`.

The browser envelope is:

```js
window.__ModuleLoader__.load({ id, factory: (require) => { ... return module.exports } })
```

`scripts/build.ts` asserts the envelope, the exposed `apply`/`inject`, the
absence of module syntax, and a zero-`require()` purity gate. `lib/` is
generated — **do not edit it by hand**; edit `src/` and rebuild.

`pnpm test` runs `scripts/client.test.ts`. It evaluates the built
`lib/client.js` through a fake `window.__ModuleLoader__` and drives it against a
stand-in locale service.

## Editing the dictionaries

Japanese copy lives in `src/client/dictionaries.ts`. Each dictionary is typed
against its namespace's shipped key union, so a renamed, removed, or added DSH
key is a compile-time error. Preserve placeholders such as `{name}` verbatim.

Twenty-six of the 29 namespaces use unions from the owning package's shipped
declarations. The three namespaces `directory-browser`, `permission.access`,
and `trajectory` use documented local copies because their owning packages do
not expose those unions through their `exports` maps; `pnpm typecheck` cannot
see drift in those three, but the upstream drift check below can — it reads
the key contracts (including those three) straight out of any DSH release.

After editing a dictionary, run:

```bash
pnpm typecheck
```

This is both the dictionary correctness check and the DSH-upgrade drift check
at the pinned devDependency versions.


## End-to-end suite

`mise run e2e` (`e2e/run-e2e.ts`):
1. builds the plugin tarball from the current source (`pnpm pack`),
2. builds a Docker image pinning `@deepseek-ai/dsh@0.1.0-rc.6`
   (`e2e/Dockerfile`),
3. starts `dsh web` in a container with a throwaway in-container `$DSH_HOME`,
4. drives the real UI with Playwright from the host in three phases —
   baseline (no plugin), installed (日本語 selectable, applies, persists,
   reverses; a mock-LLM conversation turn renders the Japanese reply and the
   stats row), removed (back to English, menu back to 中文/English),
5. installs/removes the plugin between phases via
   `dsh plugin --profile web add/remove` inside the container, and
   tears everything down.

The suite runs a DeepSeek-compatible mock LLM (`e2e/mock-llm.ts`) on the
host and points the container's `DEEPSEEK_BASE_URL`/`DEEPSEEK_API_KEY` at
it through the `host.docker.internal` host-gateway mapping, so the
conversation phase needs no real credentials or network access.

Prerequisites: a running Docker daemon (OrbStack/Docker Desktop), and
one-time `pnpm exec playwright install chromium`. CI runs the same suite on
every PR (`e2e` job) and gates releases on it. It is deliberately not part of
`mise run check` or any git hook.

The DSH under test defaults to the pinned version above; override it with
`DSH_E2E_DSH_VERSION` (an exact version, or `latest` for the registry's
current release):

```bash
mise run e2e-latest                  # latest @deepseek-ai/dsh
DSH_E2E_DSH_VERSION=0.1.0-rc.7 mise run e2e   # an exact upcoming version
```

## Local dev environment (Docker + hot reload)

`mise run dev` brings up a persistent, isolated DSH web for manual testing —
the same pinned image the E2E suite uses — with this repository hot-linked
into it:

1. starts the container `dsh-locale-ja-dev` at `http://127.0.0.1:13080`
   (override with `DSH_DEV_PORT`), bind-mounting the repo read-only and
   installing it through pnpm's `link:` protocol, then
2. stays in the foreground watching `src/` and the loader-level files,
   rebuilding on every change.

The environment also starts a DeepSeek-compatible mock LLM
(`e2e/mock-llm.ts`) on `127.0.0.1:13090` and wires the container's
`DEEPSEEK_BASE_URL`/`DEEPSEEK_API_KEY` to it, so manual conversations in the
dev UI complete without a real API key.

The reload chain after that is DSH's own dev mechanism (`dsh-client-hmr`):
the server stat-polls every plugin's client bundle, and when the watcher's
rebuild rewrites `lib/client.js`, the open page hot-swaps the plugin live —
no browser refresh, and the plugin's disposers run on every swap. Changes to
`cordis.patch.yml` or `package.json` restart DSH automatically (the loader
composes the plugin tree at boot).

Companion tasks: `mise run dev-stop` (remove the container; its profile state
is throwaway by design), `mise run dev-restart` (manual DSH restart),
`mise run dev-logs`. Test against another DSH with `DSH_DEV_DSH_VERSION`
(exact version or `latest`), same override the E2E suite uses.

## Watching upstream DSH releases

DSH is a developer preview that ships faster than this plugin pins it. The
`E2E latest DSH` workflow (`.github/workflows/e2e-upstream.yml`) runs twice a
day on `main` against the registry's latest release and fails the run — and
emails the repo owner — when upstream drifts:

- **E2E on the latest DSH** catches runtime breakage (locale service
  contracts, plugin loading, UI structure).
- **`mise run drift`** (`scripts/check-dict-drift.ts`) installs that
  release's full web tree into a throwaway directory and diffs the Japanese
  dictionaries against the shipped locale key contracts — every namespace,
  including the three local-copy ones — reporting missing keys (fallback
  leaks through), stale keys, and uncovered or removed namespaces.

Both checks also run on manual dispatch, where a `dsh_version` input accepts
an exact version to preview a release before it becomes `latest`. A red
nightly means: pull that DSH version into devDependencies and
`e2e/harness.ts`'s pin, refresh `src/client/dictionaries.ts`, and release.

## Testing against a real DSH

Build a package tarball, install that tarball into the `web` profile, and start
DSH:

```bash
pnpm build && pnpm pack
dsh plugin --profile web add <absolute path to the tgz>
dsh web
```

In the browser, open **Settings → Language** and choose **日本語**. The path
to the tarball must be absolute because `pnpm` runs with its working directory
set to the profile directory. Remove the local package with:

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

## Coding standards

- **Code language is English.** Identifiers, comments, and configuration are
  English. Only dictionary literal values (UI copy) are Japanese. No romaji or
  pinyin identifiers.
- Follow the repository's engineering guideline (standardized toolchain,
  Conventional Commits, root-cause fixes over suppression, no
  over-engineering).
- Prefer the smallest coherent change. Introduce abstractions only when they
  solve a real maintenance, correctness, or architecture problem.

## Validating a change

Before considering work complete:

```bash
mise run check        # typecheck / lint / format-check / build / test
prek run --all-files  # run all pre-commit hooks
```

Review the diff, confirm no unintended files or dependencies were added, and
that architecture invariants (see `ARCHITECTURE.md`) still hold.

## Releasing

Releases are published to the public npm registry by the `Release` workflow
(`.github/workflows/release.yml`) on version tags, using **npm trusted
publishing (OIDC)** — no npm token is stored as a secret. The published package
includes the plugin files `lib/index.js`, `lib/client.js`,
`lib/types/**/*.d.ts`, and `cordis.patch.yml`. Install it into DSH with
`dsh plugin --profile web add @fang2hou/dsh-locale-ja`; this installs the
package and reconciles `dsh.profile.bundles` through DSH's standard
client-module loader. See
[ADR-0005](./docs/adr/0005-npm-distribution-channel.md).

Trusted publishing requires npm CLI ≥ 11.5.1 and Node ≥ 22.14 (both met by the
`node = "24"` tool in `mise.toml`), and a GitHub-hosted runner (the workflow
uses `ubuntu-latest`). A trusted publisher is already registered on npmjs.com
for this repository and the `release.yml` workflow, so routine releases need
no local npm credentials: pushing the tag is the whole release.

### Routine releases

The pushed `v*` tag is the single source of truth for the version — the
workflow stamps `package.json` from it before publishing, so no manual bump is
required and a tag can never ship a stale version.

```bash
# 1. commit any pending changes (Conventional Commits — validated by the cog
#    commit-msg hook)

# 2. tag and push
git tag vX.Y.Z
git push origin main --tags
```

Pushing the `v*` tag triggers the workflow: it installs, runs `mise run check`
and the E2E suite, sets the package version from the tag, and publishes via
OIDC (provenance is attached automatically). Confirm at
<https://www.npmjs.com/package/@fang2hou/dsh-locale-ja>.
