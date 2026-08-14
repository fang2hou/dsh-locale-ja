# dsh-locale-ja

> A standard client plugin package that adds a **Japanese (日本語)** interface to DeepSeek Harness.

**English** · [中文](./README.zh.md) · [日本語](./README.md)

---

## What it does

The package adds **日本語** as a selectable locale beside DSH's built-in **中文** and **English**.

- **Selectable Japanese** — provides about 693 Japanese strings across 29 namespaces.
- **Japanese system fonts** — while Japanese is active, the UI uses OS-bundled Japanese system fonts.
- **Persistent selection** — the choice is stored in the browser and survives a page reload.
- **Fully reversible** — stopping, updating, or removing the plugin restores the shipped dictionaries, fonts, and locale behavior.

## Status

This is pre-release version `0.2.0`. It targets DSH `0.1.0-rc.6` and supports the `web` profile only. Because the plugin extends the locale service through internal members, every DSH upgrade requires re-verification.

> The `0.1.0` already on npm is the older artifact, loaded by pasting its code into `cordis_define`. Use `0.2.0` or later for the standard plugin package.

## Requirements

- An installed DSH `0.1.0-rc.6`
- `pnpm` available on PATH (`dsh plugin` forwards its work to `pnpm`)
- Only for building from source: Node.js 24+, pnpm 11+, and [mise](https://mise.jdx.dev/)

## Installation

### Install the published package

Install and start it with these two commands:

```bash
dsh plugin --profile web add @fang2hou/dsh-locale-ja
dsh web
```

`dsh plugin` is a `pnpm` forwarder. On first use, it initializes `$DSH_HOME/profiles/web` (`$DSH_HOME` defaults to `~/.dsh`), runs the installation with that profile directory as its working directory, and reconciles `dsh.profile.bundles`.

To remove the package:

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

### Install a local build for development

From the repository root, build and pack the package, then add the generated tarball:

```bash
mise install && pnpm install
pnpm build && pnpm pack
dsh plugin --profile web add /absolute/path/to/fang2hou-dsh-locale-ja-<version>.tgz
```

Use an absolute tarball path. `dsh plugin` runs `pnpm` with the profile directory as its working directory, so a relative path would resolve there instead of at the repository location.

## Usage

Open **Settings → Language** (**設定 → 言語**) and choose **日本語**. The whole UI switches to Japanese and the Japanese system font stack becomes active. The selection survives a page reload, and switching back to 中文 or English remains available.

## How it works

See [ARCHITECTURE.md](./ARCHITECTURE.md) and the [ADRs](./docs/adr/) for the implementation boundaries and design decisions.

- **Host half** — an empty `apply()` Loader entry. The `cordis.patch.yml` bundle patch inserts the `locale-ja` row and mounts the package as a profile bundle.
- **browser half** — discovered from the `dsh.client` manifest and served to the browser by DSH.
- **compile-time key validation** — each dictionary is typed against its namespace's shipped key union, so a renamed, removed, or added key becomes a compile error.
- **selectable locale** — rc.6 exposes no public API for this, so the plugin uses the locale runtime's own internal members.
- **`ja` persistence** — the Host settings schema accepts only `zh|en`, so the Japanese preference is stored in `localStorage`.
- **Font override** — while Japanese is active, one locale-scoped `:root` token, `--dsw-font-family`, supplies the Japanese font stack.

## Project layout

```text
src/
  index.ts                         Host half and its empty apply()
  client/
    index.ts                       browser half entry and client manifest
    locale-extension.ts            selectable-locale integration with the locale runtime
    preference.ts                  localStorage preference handling
    font.ts                         locale-scoped Japanese font-token override
    dictionaries.ts                 Japanese dictionaries for 29 namespaces
scripts/
  build.mjs                        build and output verification
  client.test.mjs                  tests for the built browser half
cordis.patch.yml                   bundle patch for the profile bundle
docs/adr/                          architectural decision records
```

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for the workflow, toolchain, and tasks, and [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution conventions.

```bash
mise run check   # typecheck + lint + format-check + build + test
```

## Language policy

| Aspect        | Language                                      |
| ------------- | --------------------------------------------- |
| Product UI    | Japanese (default), 中文, English             |
| Source code   | English (identifiers, comments, configuration) |
| Conversation  | The user's language                            |

Only dictionary literal values (UI copy) are Japanese; all identifiers and comments are English.

## License

[MIT](./LICENSE)
