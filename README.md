# dsh-locale-ja

> DeepSeek Harness に **日本語 (日本語)** インターフェースを注入するプラグイン。

[English](./README.en.md) · [中文](./README.zh.md) · **日本語**

`dsh-locale-ja` は [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（以下 DSH）のクライアント側ロケールサービスを拡張し、標準の **中文** ・ **English** と並んで **日本語** を選択できるようにする動的 Cordis プラグインです。設定の「言語」で日本語を選ぶと、UI 全体が自然な日本語に切り替わります。

---

## 概要

DSH の出荷時ロケールは `zh` / `en` の 2 つだけです。本プラグインは以下を実現します。

- **日本語を選択可能に** — 言語セレクターに「日本語」を追加し、中文・English と同じ操作で切り替えられます。
- **全ネームスペースを翻訳** — チャット・入力欄・サイドバー・ワークスペース・モデル選択・各種設定・ゴール・プラン・サブエージェント・ワークフロー・トレースなど、出荷される全ロケールネームスペース（約 700 文字列）を網羅します。
- **システム日本語フォント** — 日本語表示時のみ、フォントスタックを OS 標準の日本語フォント（macOS/iOS のヒラギノ、Windows の游ゴシック/メイリオ、Android/Linux の Noto Sans JP）に切り替えます。漢字かなが日本語字形で描画されます。
- **セッションを跨ぐ永続化** — 選択した日本語設定はブラウザに保存され、ページ再読み込み後も維持されます。
- **完全に可逆** — プラグインの停止・更新・削除時に、辞書登録・フォント・言語設定・`setLocale` のフックをすべて元に戻します。

## 主な機能の仕組み（抜粋）

- ロケールサービスには「選択可能な言語を追加する」公開 API がないため、内部の `snapshot` / `publish` / `adopt` を通じて安全に拡張します（詳細は [ARCHITECTURE.md](./ARCHITECTURE.md) と [docs/adr](./docs/adr) を参照）。
- ホスト側のロケール設定スキーマは `zh|en` しか受け付けないため、`ja` の永続化はブラウザの `localStorage` で行います。
- フォントは、全タイポグラフィトークンの基点である `--dsw-font-family` を上書きして cascade させます。

## 要件

- DeepSeek Harness が動作する環境
- 開発・ビルド向け: Node.js 24+・pnpm 11+・[mise](https://mise.jdx.dev/)（推奨）

## クイックスタート

### 1. ビルド

```bash
mise install          # Node / pnpm / cocogitto / prek を整える（mise 利用時）
pnpm install
mise run build        # => dist/client.js を生成
```

[mise](https://mise.jdx.dev/) を使わない場合は、Node 24+ と pnpm を用意して `pnpm install && pnpm build` でも構いません。

### 2. DSH に読み込む

ビルド成果物 `dist/client.js` の**中身全体**を、動的プラグインの `code.client` として登録し、有効化します。もっとも確実な方法は DSH のエージェントに依頼することです。

```
dist/client.js の内容で Cordis プラグインを定義して実行してください。
```

エージェントは内部で `cordis_define`（新規プラグイン、`code.client` = ファイル内容）→ `cordis_run` を行い、日本語を有効化します。初回はブラウザ側プラグインとして承認が必要です（実行カードで許可してください）。

> 補足: DSH は現在、サードパーティ製クライアントプラグインを「インストール」する仕組み（フロントエンド再ビルドなしで差し込み可能な経路）を提供していません。そのため、本プラグインの実行形態は動的プラグイン（`cordis_define` / `cordis_run`）になります。詳しくは [ADR-0001](./docs/adr/0001-build-target-is-the-dynamic-plugin-artifact.md) を参照してください。

### 3. 確認

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

| 対象       | 言語                                             |
| ---------- | ------------------------------------------------ |
| 製品 UI    | 日本語（既定）・中文・English（DSH 標準ロケール） |
| ソースコード | 英語（識別子・コメント・設定）                    |
| 会話       | ユーザーの言語                                   |

辞書のリテラル値（UI 文言）のみ日本語であり、コードの識別子やコメントはすべて英語です。

## ライセンス

[MIT](./LICENSE)
