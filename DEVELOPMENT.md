# Development

This document describes how to develop, validate, and release `dsh-locale-ja`.

## Prerequisites

The project standardizes its environment with [mise](https://mise.jdx.dev/):

| Tool                         | Managed by  | Purpose                                  |
| ---------------------------- | ----------- | ---------------------------------------- |
| Node.js 24                   | `mise`      | Runtime / build                          |
| pnpm 11                      | `mise`      | Package manager (never npm/yarn)         |
| [cocogitto](https://cocogitto.ai/) (`cog`) | `mise` | Conventional Commits validation          |
| [prek](https://github.com/j178/prek)       | `mise` | Pre-commit framework                     |
| TypeScript, esbuild, oxlint, oxfmt | npm devDeps | Type-check, bundle, lint, format   |

## Setup

```bash
mise install          # provision runtimes and CLI tools
pnpm install          # install dev dependencies
prek install          # install git hooks (uses .pre-commit-config.yaml)
```

## Toolchain

- **Package manager**: pnpm only. Do not introduce npm or yarn.
- **Linter**: [oxlint](https://oxc.rs/docs/guide/usage/linter) (config: `.oxlintrc.json`). No ESLint.
- **Formatter**: [oxfmt](https://oxc.rs/docs/guide/usage/formatter) (config via defaults). No Prettier.
- **Type checker**: `tsc --noEmit` (config: `tsconfig.json`). Emit is done by esbuild, not tsc.
- **Bundler**: esbuild (`scripts/build.mjs`).
- **Commits**: Conventional Commits, validated by cocogitto (`cog`) and prek.
- **Pre-commit**: prek runs oxlint, oxfmt (check), and (on push) typecheck, plus a `commit-msg` hook that runs `cog verify`.

## Common tasks

All meaningful workflows are exposed as mise tasks (delegating to pnpm scripts):

```bash
mise run install        # pnpm install
mise run typecheck      # tsc --noEmit
mise run lint           # oxlint .
mise run format         # oxfmt --write .
mise run format-check   # oxfmt --check .
mise run build          # node scripts/build.mjs  -> dist/client.js
mise run check          # typecheck + lint + format-check + build
mise run clean          # remove dist/
```

The project's main validation entry point is:

```bash
mise run check
```

Local validation and CI use the same mise tasks so they cannot diverge.

## Build pipeline

The harness evaluates a dynamic Client plugin's `code.client` as a **plain
function body** — its closure injects builtins (`styles`, `React`, `host`,
`console`, …). It is not a module: no `import` / `export` / `require` is
allowed at the top level.

`scripts/build.mjs` therefore:

1. Bundles `src/client.ts` (plus its `dictionaries`/`types` imports) with
   esbuild into one self-contained ESM module.
2. Rewrites the hoisted `export { client_default as default }` block into
   `return client_default;` so the output is a valid function body that returns
   the plugin.
3. Asserts no module syntax remains and that the body ends with a `return`.

The result is `dist/client.js`. It is a generated artifact — **do not edit it
by hand**; edit `src/` and rebuild.

`src/builtins.d.ts` declares the injected `styles` builtin for type-checking;
it emits no runtime code.

## Editing the dictionaries

All Japanese copy lives in `src/dictionaries.ts`, one typed constant per
namespace, aggregated into `DICTS`. To add or revise a translation:

1. Edit the relevant namespace constant (keys must match the shipped `zh`
   dictionary exactly — they are the lookup keys).
2. Preserve placeholders such as `{name}` verbatim.
3. Run `mise run check`, then `mise run build`.

## Coding standards

- **Code language is English.** Identifiers, comments, and configuration are
  English. Only dictionary literal values (UI copy) are Japanese. No romaji or
  pinyin identifiers.
- Follow the repository's engineering guideline (standardized toolchain,
  Conventional Commits, root-cause fixes over suppression, no over-engineering).
- Prefer the smallest coherent change. Introduce abstractions only when they
  solve a real maintenance, correctness, or architecture problem.

## Validating a change

Before considering work complete:

```bash
mise run check        # typecheck / lint / format-check / build
prek run --all-files  # run all pre-commit hooks
```

Review the diff, confirm no unintended files or dependencies were added, and
that architecture invariants (see `ARCHITECTURE.md`) still hold.

## Releasing

Releases are published to the public npm registry by the `Release` workflow
(`.github/workflows/release.yml`) on version tags, using **npm trusted
publishing (OIDC)** — no npm token is stored as a secret. The published package
contains the built `dist/client.js`; loading into DSH is unchanged (still
`cordis_define` / `cordis_run`). See
[ADR-0005](./docs/adr/0005-npm-distribution-channel.md).

Trusted publishing requires npm CLI ≥ 11.5.1 and Node ≥ 22.14 (both met by the
`node = "24"` tool in `mise.toml`), and a GitHub-hosted runner (the workflow
uses `ubuntu-latest`).

### One-time setup

npm trusted publishing can only be configured for a package that **already
exists** (there is no PyPI-style pre-claim). Bootstrap it once:

1. Build and publish `0.1.0` manually to create the package:

   ```bash
   pnpm build
   npm login --registry https://registry.npmjs.org
   npm publish --registry https://registry.npmjs.org
   ```

2. On [npmjs.com](https://www.npmjs.com) → `@fang2hou/dsh-locale-ja` → Settings →
   **Trusted publishing** → GitHub Actions, add a trusted publisher:
   - Organization or user: `fang2hou`
   - Repository: `dsh-locale-ja`
   - Workflow filename: `release.yml`
   - Allowed actions: `npm publish`

   (Environment name is optional — leave it blank unless you add a GitHub
   environment to the workflow.)

   Or via CLI (after `npm login`):
   `npm trust github @fang2hou/dsh-locale-ja --file release.yml --repository fang2hou/dsh-locale-ja --allow-publish --registry https://registry.npmjs.org -y`

### Routine releases

```bash
# 1. bump the version (package.json is the single source of truth)
$EDITOR package.json            # "version": "0.X.Y"

# 2. commit (Conventional Commits — validated by the cog commit-msg hook)
git add package.json
git commit -m "chore(release): v0.X.Y"

# 3. tag and push
git tag vX.Y.Z
git push origin main --tags
```

Pushing the `v*` tag triggers the workflow: it installs, runs `mise run check`,
builds, and publishes via OIDC (provenance is attached automatically). Confirm
at <https://www.npmjs.com/package/@fang2hou/dsh-locale-ja>.
