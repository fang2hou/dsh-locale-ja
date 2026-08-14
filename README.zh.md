# dsh-locale-ja

> 为 DeepSeek Harness 添加 **日语 (日本語)** 界面的标准客户端插件包。

[English](./README.en.md) · **中文** · [日本語](./README.md)

---

## 功能

本包在 DSH 内置的 **中文** 和 **English** 之外，加入 **日本語** 作为可选择的界面语言。

- **可选择日语** — 覆盖 29 个命名空间，包含约 693 条日语字符串。
- **使用日语系统字体** — 日语激活期间，界面使用操作系统自带的日语系统字体。
- **持久保存选择** — 选择保存在浏览器中，刷新页面后仍会保留。
- **完全可逆** — 停止、更新或移除插件时，会恢复 DSH 原有的字典、字体和语言行为。

## 状态

当前为预发布版本 `0.1.0`，尚未发布到 npm。目标平台是 DSH `0.1.0-rc.6`，仅支持 `web` profile。由于插件通过 locale 服务的内部成员进行扩展，升级 DSH 后必须重新验证。

## 环境要求

- 已安装 DSH `0.1.0-rc.6`
- `pnpm` 可在 PATH 中直接执行（`dsh plugin` 会把操作转发给 `pnpm`）
- 仅从源码构建时需要：Node.js 24+、pnpm 11+ 和 [mise](https://mise.jdx.dev/)

## 安装

### 安装已发布的包

本包目前尚未发布到 npm。发布后，使用以下两个命令完成安装并启动：

```bash
dsh plugin --profile web add @fang2hou/dsh-locale-ja
dsh web
```

`dsh plugin` 是 `pnpm` 的转发器。首次使用时，它会初始化 `$DSH_HOME/profiles/web`（`$DSH_HOME` 默认为 `~/.dsh`），以该 profile 目录作为工作目录执行安装，并同步 `dsh.profile.bundles`。

移除插件：

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

### 开发时安装本地构建

在仓库根目录构建并打包，然后添加生成的 tarball：

```bash
mise install && pnpm install
pnpm build && pnpm pack
dsh plugin --profile web add /absolute/path/to/fang2hou-dsh-locale-ja-0.1.0.tgz
```

必须使用 tarball 的绝对路径。`dsh plugin` 会把 profile 目录设为 `pnpm` 的工作目录，因此相对路径会在那里解析，而不是在仓库目录中解析。

## 使用

打开 **Settings → Language**（**设置 → 语言**），选择 **日本語**。整个界面会切换为日语，并启用日语系统字体栈。刷新页面后选择仍会保留，也可以随时切回中文或 English。

## 工作原理

实现边界和设计决策详见 [ARCHITECTURE.md](./ARCHITECTURE.md) 与 [ADR](./docs/adr/)。

- **Host half** — 提供一个空的 `apply()` Loader 入口；`cordis.patch.yml` 中的 bundle patch 插入 `locale-ja` 行，并将本包挂载为 profile bundle。
- **browser half** — 由 `dsh.client` 清单发现，再由 DSH 提供给浏览器。
- **字典键的编译期校验** — 每个字典都按所属命名空间发布的键集合进行类型约束，因此键被重命名、删除或新增时会产生编译错误。
- **可选择语言的接入** — rc.6 没有用于此目的的公开 API，因此插件使用 locale 运行时自身的内部成员。
- **`ja` 的持久化** — Host 设置 schema 只接受 `zh|en`，所以日语偏好保存在 `localStorage` 中。
- **字体覆盖** — 日语激活期间，仅覆盖 locale 作用域内 `:root` 的单个 token `--dsw-font-family`，提供日语字体栈。

## 项目结构

```text
src/
  index.ts                         Host half 与空的 apply() 入口
  client/
    index.ts                       browser half 入口（inject 与 apply）
    locale-extension.ts            将日语接入 locale 运行时
    preference.ts                  管理 localStorage 中的语言选择
    font.ts                        管理 locale 作用域内的日语字体 token 覆盖
    dictionaries.ts                定义 29 个命名空间的日语字典
scripts/
  build.mjs                        构建并验证输出
  client.test.mjs                  验证构建后的 browser half
cordis.patch.yml                   profile bundle 使用的 bundle patch
docs/adr/                          架构决策记录
```

## 开发

开发流程、工具链和任务见 [DEVELOPMENT.md](./DEVELOPMENT.md)，贡献规范见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

```bash
mise run check   # 类型检查 + lint + format-check + build + test
```

## 语言策略

| 对象       | 语言                                  |
| ---------- | ------------------------------------- |
| 产品 UI    | 日语（默认）、中文、English            |
| 源代码     | 英语（标识符、注释、配置）             |
| 对话       | 使用者的语言                          |

只有字典字面量（UI 文案）使用日语；所有标识符和注释均使用英语。

## 许可证

[MIT](./LICENSE)
