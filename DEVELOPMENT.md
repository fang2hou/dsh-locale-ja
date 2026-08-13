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
