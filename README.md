# dsh-locale-ja

> DeepSeek Harness に **日本語** インターフェースを追加するプラグイン。

[English](./README.en.md) · [中文](./README.zh.md) · **日本語**

`dsh-locale-ja` は [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（以下 DSH）のクライアント側ロケールサービスを拡張し、組み込みの **中文** ・ **English** と並んで **日本語** を選択できるようにする動的 Cordis プラグインです。「設定 → 言語」で日本語を選ぶと、UI 全体が自然な日本語に切り替わります。

---

## 概要

DSH の組み込みロケールは `zh` / `en` の 2 つだけです。本プラグインは日本語を第一級のインターフェース言語として追加します。

- **日本語を選択可能に** — 言語セレクターに「日本語」を追加します。中文・English と同じ操作で切り替えられます。
- **全ネームスペースを翻訳** — チャット・入力欄・サイドバー・ワークスペース・モデル選択・各種設定・ゴール・プラン・サブエージェント・ワークフロー・トレースなど、組み込みの全ロケール（約 700 文字列）を網羅します。
- **システムの日本語フォント** — 日本語表示時のみ、フォントを OS 標準の日本語フォント（macOS/iOS のヒラギノ、Windows の游ゴシック/メイリオ、Android/Linux の Noto Sans JP）に切り替えます。漢字やかなが日本語の字形で描画されます。
- **永続化** — 選択した設定はブラウザに保存され、ページを再読み込みしても維持されます。
- **完全に元に戻せる** — プラグインの停止・更新・削除時に、辞書登録・フォント・言語設定・`setLocale` のフックをすべて元の状態に戻します。

## 仕組み（概要）

- ロケールサービスには「選択可能な言語を追加する」公開 API がなく、内部の `snapshot` / `publish` / `adopt` を通じて安全に拡張します（詳細は [ARCHITECTURE.md](./ARCHITECTURE.md) と [docs/adr](./docs/adr) を参照）。
- ホスト側のロケール設定スキーマは `zh|en` しか受け付けないため、`ja` の永続化はブラウザの `localStorage` で行います。
- フォントは、すべてのタイポグラフィトークンの基点である `--dsw-font-family` を上書きし、スタイル全体に反映させます。

## 要件

- DeepSeek Harness が動作する環境
- 開発・ビルド向け: Node.js 24+・pnpm 11+・[mise](https://mise.jdx.dev/)（推奨）

## インストール

ビルド済みの成果物 `dist/client.js` は、npm またはソースからのビルドで取得できます。

### npm でインストール

```bash
pnpm add @fang2hou/dsh-locale-ja   # npm install / yarn add / bun add でも可
```

インストール後、`node_modules/@fang2hou/dsh-locale-ja/dist/client.js` の内容を DSH に読み込みます（次節）。

### ソースからビルド

```bash
git clone https://github.com/fang2hou/dsh-locale-ja.git
cd dsh-locale-ja
mise install          # Node / pnpm / cocogitto / prek を整える（mise 利用時）
pnpm install
pnpm build            # => dist/client.js
```

[mise](https://mise.jdx.dev/) を使わない場合は、Node 24+ と pnpm を用意して `pnpm install && pnpm build` でも構いません。

## DSH への読み込み

取得した `dist/client.js` の**内容全体**を、動的プラグインの `code.client` として登録し、有効化します。もっとも確実な方法は DSH のエージェントに依頼することです。

```
dist/client.js の内容で Cordis プラグインを定義して実行してください。
```

エージェントは内部で `cordis_define`（新規プラグイン、`code.client` = ファイルの内容）→ `cordis_run` を行い、日本語を有効化します。初回はブラウザ側プラグインとしての承認が必要です（実行カードで許可してください）。

> 補足: DSH は現在、サードパーティ製クライアントプラグインを「インストール」する仕組み（フロントエンドを再ビルドせずに追加できる経路）を提供していません。そのため本プラグインの実行形態は動的プラグイン（`cordis_define` / `cordis_run`）になります。詳しくは [ADR-0001](./docs/adr/0001-build-target-is-the-dynamic-plugin-artifact.md) を参照してください。

## 動作確認

「設定 → 言語」を開き、**日本語** を選択します。UI 全体が日本語に切り替わり、フォントも日本語スタイルになります。中文・English への切り替えもそのまま機能します。

## プロジェクト構成

```text
src/
  client.ts         プラグイン本体（エントリ・既定エクスポート）
  dictionaries.ts   全ネームスペースの日本語辞書
  types.ts          ロケールサービス周辺の最小限の型定義
  builtins.d.ts     DSH クライアント組み込みシンボルの ambient 宣言
scripts/
  build.mjs         TS を 1 つの関数本体成果物にバンドル
docs/adr/           主要な設計判断の記録
```

## 開発

開発ワークフロー・ツールチェーン・タスク一覧は [DEVELOPMENT.md](./DEVELOPMENT.md) を、コントリビューション規約は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

```bash
mise run check   # 型チェック / lint / フォーマット確認 / ビルド を一括実行
```

## 言語ポリシー

本プロジェクトは以下の言語方針で運用します（詳細は各開発ドキュメント）。

| 対象         | 言語                                               |
| ------------ | -------------------------------------------------- |
| 製品 UI      | 日本語（既定）・中文・English（DSH 標準ロケール）  |
| ソースコード | 英語（識別子・コメント・設定）                     |
| 会話         | ユーザーの言語                                     |

辞書のリテラル値（UI の文言）のみ日本語であり、コードの識別子やコメントはすべて英語です。

## ライセンス

[MIT](./LICENSE)
