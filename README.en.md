# dsh-locale-ja

> A plugin that adds a **Japanese (日本語)** interface to DeepSeek Harness.

**English** · [中文](./README.zh.md) · [日本語](./README.md)

`dsh-locale-ja` is a dynamic Cordis plugin that extends DeepSeek Harness's
client-side locale service so that **日本語** is selectable alongside the
built-in **中文** and **English**. Choose it in **Settings → Language** and the
entire UI switches to natural Japanese.

---

## Overview

DSH ships with only two built-in locales (`zh` / `en`). This plugin adds
Japanese as a first-class interface language:

- **Selectable Japanese** — adds 「日本語」 to the language selector; switch it
  exactly like Chinese/English.
- **Full coverage** — translates every built-in locale namespace (~700 strings):
  chat & composer, sidebar, workspace, model selection, all settings, goal,
  plan, subagent, workflow, trace/trajectory view, and more.
- **Japanese system fonts** — while Japanese is active, the font stack switches
  to OS-bundled Japanese fonts (Hiragino on macOS/iOS, Yu Gothic/Meiryo on
  Windows, Noto Sans JP elsewhere), so CJK glyphs render in Japanese style.
- **Persistence** — the Japanese choice is stored in the browser and survives a
  page refresh.
- **Fully reversible** — stopping, updating, or removing the plugin restores
  dictionaries, fonts, the locale list, and the `setLocale` hook.

## How it works (brief)

- The locale service exposes no public API to add a selectable language, so the
  plugin drives it through the same internal fields the runtime uses
  (`snapshot` / `publish` / `adopt`). See [ARCHITECTURE.md](./ARCHITECTURE.md)
  and the [ADRs](./docs/adr).
- The host `locale` settings schema only accepts `zh|en`, so the `ja`
  preference is persisted in `localStorage` instead.
- The font override targets `--dsw-font-family`, the single token every
  typography style references.

## Requirements

- A running DeepSeek Harness environment
- For development/build: Node.js 24+, pnpm 11+, [mise](https://mise.jdx.dev/)
  (recommended)

## Installation

The built artifact `dist/client.js` is available via npm or by building from
source.

### Install via npm

```bash
pnpm add dsh-locale-ja   # or: npm install / yarn add / bun add
```

After installing, load the contents of `node_modules/dsh-locale-ja/dist/client.js`
into DSH (next section).

### Build from source

```bash
git clone https://github.com/fang2hou/dsh-locale-ja.git
cd dsh-locale-ja
mise install          # provision Node / pnpm / cocogitto / prek (if using mise)
pnpm install
pnpm build            # => dist/client.js
```

Without mise, ensure Node 24+ and pnpm, then `pnpm install && pnpm build`.

## Load into DSH

Register the **entire contents** of `dist/client.js` as a dynamic plugin's
`code.client`, then activate it. The most reliable way is to ask your DSH agent:

```
Define and run a Cordis plugin whose client code is the contents of dist/client.js.
```

The agent calls `cordis_define` (new plugin, `code.client` = file contents) →
`cordis_run`. The first run needs you to authorize the client package (approve
it on the run card).

> Note: DSH does not currently offer a drop-in "install" path for third-party
> client plugins without rebuilding the frontend, so this plugin's runtime form
> is the dynamic plugin (`cordis_define` / `cordis_run`). See
> [ADR-0001](./docs/adr/0001-build-target-is-the-dynamic-plugin-artifact.md).

## Verify

Open **Settings → Language** and pick **日本語**. The whole UI switches to
Japanese with Japanese-style fonts. Switching back to 中文 / English keeps
working.

## Project layout

```text
src/
  client.ts         plugin entry (default export)
  dictionaries.ts   Japanese dictionaries for every namespace
  types.ts          minimal local types around the locale service
  builtins.d.ts     ambient declarations for DSH client builtins
scripts/
  build.mjs         bundles TS into one self-contained function-body artifact
docs/adr/           architectural decision records
```

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for workflow, toolchain, and tasks, and
[CONTRIBUTING.md](./CONTRIBUTING.md) for contribution conventions.

```bash
mise run check   # typecheck / lint / format check / build in one shot
```

## Language policy

| Aspect        | Language                                                |
| ------------- | ------------------------------------------------------- |
| Product UI    | Japanese (default), Chinese, English (DSH locales)      |
| Source code   | English (identifiers, comments, configuration)          |
| Conversation  | The user's language                                     |

Only dictionary literal values (UI copy) are Japanese; all identifiers and
comments are English.

## License

[MIT](./LICENSE)
