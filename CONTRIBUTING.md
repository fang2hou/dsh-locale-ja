# Contributing

Contributions are welcome. This document sets the expectations for issues,
pull requests, and commits.

## Engineering baseline

This repository follows a standardized toolchain. Do not substitute tools
without explicit approval:

- **mise** for runtimes, CLI tools, and tasks
- **pnpm** (not npm/yarn) for packages
- **oxlint** (not ESLint) for linting
- **oxfmt** (not Prettier) for formatting
- **prek** (not pre-commit/Lefthook) for pre-commit
- **cocogitto** for Conventional Commits validation

See [DEVELOPMENT.md](./DEVELOPMENT.md) for setup and tasks, and
[ARCHITECTURE.md](./ARCHITECTURE.md) for invariants that must not be broken.

## Issues

- Search existing issues before opening a new one.
- For translation fixes, edit `src/client/dictionaries.ts`; name the affected
  namespace and key, the preferred Japanese wording, and run `pnpm typecheck`
  to validate the namespace keys.
- For bugs, include the DSH version, the active locale, and reproduction steps.

## Pull requests

1. Create a branch from `main`.
2. Make the smallest coherent change that solves the requirement. Avoid
   unrelated cleanup in the same PR.
3. Validate locally:

   ```bash
   mise run check        # typecheck / lint / format-check / build / test
   prek run --all-files
   ```

4. Open a pull request using the
   [PR template](./.github/pull_request_template.md) and fill in every
   section; state AI assistance explicitly when it applies. The PR title
   follows Conventional Commits because squash merging makes it the final
   commit message.

## Commits

All commits follow [Conventional Commits](https://www.conventionalcommits.org/),
validated by cocogitto:

- Use meaningful types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`,
  `ci`, `chore`, `perf`, `style`, `revert`, and a scope when it improves
  clarity.
- Avoid meaningless messages (`update`, `wip`, `fix stuff`).
- Create validated commits with `cog commit`, or verify a message with
  `cog verify "<message>"`.

## Review expectations

- `mise run check` and prek pass.
- No unintended files, dependencies, secrets, or direct edits to generated
  `lib/` output.
- Architecture invariants still hold.
- Code is English and UI copy is natural Japanese — not machine-translated or
  Chinese-influenced wording.
