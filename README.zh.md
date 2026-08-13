# dsh-locale-ja

> 向 DeepSeek Harness 注入 **日语 (日本語)** 界面的插件。

[English](./README.en.md) · **中文** · [日本語](./README.md)

`dsh-locale-ja` 是一个动态 Cordis 插件，扩展了 DeepSeek Harness 客户端的 locale 服务，让 **日本語** 与内置的 **中文**、**English** 并列可选。在「设置 → 语言」中选择日语，整个界面会切换为自然的日语。

---

## 概述

DSH 出厂只提供 `zh` / `en` 两个 locale。本插件把日语补齐为完整的一级界面语言：

- **日语可选** — 在语言选择器中加入「日本語」，切换方式与中文/英文完全一致。
- **全量覆盖** — 翻译全部出厂 locale 命名空间（约 700 条字符串）：对话与输入框、侧边栏、工作区、模型选择、各项设置、目标、计划、子代理、工作流、轨迹视图等。
- **系统日语字体** — 仅在日语激活时，把字体栈切换为系统自带的日语字体（macOS/iOS 的 Hiragino、Windows 的游ゴシック/Meiryo、其余平台的 Noto Sans JP），让汉字假名以日语字形渲染。
- **持久化** — 日语选择保存在浏览器中，刷新页面后仍然生效。
- **完全可逆** — 停止 / 更新 / 卸载插件时，会还原字典注册、字体、语言列表与 `setLocale` 钩子。

## 工作原理（简述）

- locale 服务没有「新增可选语言」的公开 API，因此插件通过运行时自身的内部字段（`snapshot` / `publish` / `adopt`）安全地扩展。详见 [ARCHITECTURE.md](./ARCHITECTURE.md) 与 [ADR](./docs/adr)。
- 宿主侧的 locale 设置 schema 只接受 `zh|en`，因此 `ja` 的偏好改用 `localStorage` 持久化。
- 字体通过覆盖 `--dsw-font-family`（所有排版样式的基点）来实现级联生效。

## 环境要求

- 可运行 DeepSeek Harness 的环境
- 开发/构建：Node.js 24+、pnpm 11+、[mise](https://mise.jdx.dev/)（推荐）

## 快速开始

### 1. 构建

```bash
mise install          # 准备 Node / pnpm / cocogitto / prek（使用 mise 时）
pnpm install
mise run build        # => 生成 dist/client.js
```

不使用 mise 时，准备好 Node 24+ 与 pnpm，执行 `pnpm install && pnpm build` 即可。

### 2. 载入 DSH

把构建产物 `dist/client.js` 的**全部内容**作为一个动态插件的 `code.client` 注册并激活。最可靠的方式是让 DSH 的 agent 来完成：

```
请用 dist/client.js 的内容定义并运行一个 Cordis 插件。
```

agent 会调用 `cordis_define`（新插件，`code.client` = 文件内容）→ `cordis_run`。首次运行需要你在运行卡片上授权该客户端插件。

> 说明：DSH 目前没有「免前端重建安装第三方客户端插件」的入口，因此本插件的运行形态是动态插件（`cordis_define` / `cordis_run`）。详见 [ADR-0001](./docs/adr/0001-build-target-is-the-dynamic-plugin-artifact.md)。

### 3. 验证

打开「设置 → 语言」选择 **日本語**。整个界面切换为日语，字体也变为日语样式。切回 中文 / English 依然正常。

## 项目结构

```text
src/
  client.ts         插件入口（默认导出）
  dictionaries.ts   全部命名空间的日语字典
  types.ts          围绕 locale 服务的最小类型定义
  builtins.d.ts     DSH 客户端内置符号的 ambient 声明
scripts/
  build.mjs         将 TS 打包成单一的自包含函数体产物
docs/adr/           架构决策记录
```

## 开发

开发流程、工具链与任务清单见 [DEVELOPMENT.md](./DEVELOPMENT.md)，贡献规范见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

```bash
mise run check   # 一次性执行 类型检查 / lint / 格式检查 / 构建
```

## 语言策略

| 对象       | 语言                                          |
| ---------- | --------------------------------------------- |
| 产品 UI    | 日语（默认）、中文、英文（DSH 的 locale）     |
| 源代码     | 英语（标识符、注释、配置）                    |
| 对话       | 使用者的语言                                  |

只有字典的字面量（UI 文案）是日语；所有标识符与注释均为英语。

## 许可证

[MIT](./LICENSE)
