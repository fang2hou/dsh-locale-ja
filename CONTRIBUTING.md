# Contributing

Contributions are welcome. This document sets the expectations for issues,
pull requests, and commits so that both humans and AI agents can collaborate
predictably.

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

## Issue workflow

- Search existing issues before opening a new one.
- For translation fixes, edit `src/client/dictionaries.ts`; name the affected
  namespace and key, the preferred Japanese wording (and why it is better for
  an AI-agent UI), and run `pnpm typecheck` to validate the namespace keys.
- For bugs, include the DSH version, the active locale, and reproduction steps.

## Pull request workflow

1. Create a branch from `main`.
2. Make the smallest coherent change that solves the requirement. Avoid
   unrelated cleanup in the same PR.
3. Validate locally:

   ```bash
   mise run check        # typecheck / lint / format-check / build / test
   prek run --all-files
   ```

4. Open a pull request using the
   [PR template](./.github/pull_request_template.md).

### Pull request description

The PR description must clearly include:

- **Purpose** — what the change does and why.
- **Impact** — what is affected (UI copy, package build artifacts, runtime
  behavior).
- **Context** — relevant background or linked issues.
- **Risks** — any concerns or behavioral changes.
- **Testing** — validation performed (`mise run check` output, manual checks,
  screenshots for UI changes).

For AI-generated or AI-assisted PRs, state this explicitly in the description.

### Squash merging

If the repository uses squash merging, the **PR title** must follow the
Conventional Commits convention, because it becomes the final commit message.

## Commit conventions

All commits follow [Conventional Commits](https://www.conventionalcommits.org/),
validated by cocogitto:

```text
feat(core): add a namespace dictionary
fix(font): keep override scoped to the active locale
docs(readme): clarify the load flow
refactor(build): tighten the client-bundle purity gate
```

- Use meaningful types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`,
  `ci`, `chore`, `perf`, `style`, `revert`.
- Use a scope when it improves clarity.
- Avoid meaningless messages (`update`, `wip`, `fix stuff`).
- Create validated commits with `cog commit`, or verify a message with
  `cog verify "<message>"`.

## Review expectations

- The change implements the requested behavior.
- `mise run check` and prek pass.
- No unintended files, dependencies, secrets, or direct edits to generated
  `lib/` output.
- Architecture invariants still hold.
- Code language is English (only UI copy literals are Japanese); UI copy is
  natural Japanese, not machine-translated or Chinese-influenced wording.

## Language policy

| Aspect       | Language                                           |
| ------------ | -------------------------------------------------- |
| Product UI   | Japanese (default), Chinese, English               |
| Source code  | English                                            |
| Conversation | The contributor's language                         |

Do not infer UI language from conversation language, and keep Japanese UI copy
natural and consistent.
