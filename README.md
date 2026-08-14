# dsh-locale-ja

> DeepSeek Harness に **日本語** インターフェースを追加する標準クライアントプラグインパッケージです。

[English](./README.en.md) · [中文](./README.zh.md) · **日本語**

---

## できること

DSH の組み込み **中文**・**English** と並ぶ選択可能な言語として **日本語** を追加します。

- **日本語を選択可能にします** — 29 ネームスペース、約 693 個の日本語文字列を収録しています。
- **日本語の字形で表示します** — 日本語が有効な間は、OS にバンドルされた日本語システムフォントを使用します。
- **選択を保持します** — 日本語を選ぶとブラウザに保存され、ページを再読み込みしても維持されます。
- **完全に可逆です** — プラグインの停止・更新・削除時には、組み込みの辞書、フォント、言語設定への変更を元に戻します。

## ステータス

プレリリース段階の `0.2.0` です。対象は DSH `0.1.0-rc.6` の `web` プロファイルだけです。ロケールサービスを内部メンバー経由で拡張しているため、DSH をアップグレードした場合は再検証が必要です。

> npm に公開済みの `0.1.0` は、`cordis_define` にコードを貼り付けて読み込む旧方式の成果物です。標準プラグインパッケージとして導入する場合は `0.2.0` 以降を利用してください。

## 要件

- DSH `0.1.0-rc.6` がインストール済みであること
- `pnpm` が PATH 上で実行できること（`dsh plugin` は `pnpm` に処理を転送します）
- ソースからビルドする場合のみ: Node.js 24+、pnpm 11+、[mise](https://mise.jdx.dev/)

## インストール

### 公開パッケージを使う

次の 2 つのコマンドでインストールして起動できます。

```bash
dsh plugin --profile web add @fang2hou/dsh-locale-ja
dsh web
```

`dsh plugin` は `pnpm` へのフォワーダーです。初回実行時に `$DSH_HOME/profiles/web`（`$DSH_HOME` の既定値は `~/.dsh`）を初期化し、そのディレクトリを作業ディレクトリとしてインストールを実行したうえで、`dsh.profile.bundles` を調整します。

削除する場合は次を実行します。

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

### ローカルビルドを使う（開発）

リポジトリのルートでビルドしてパッケージを作成し、生成された tarball を絶対パスで指定します。

```bash
mise install && pnpm install
pnpm build && pnpm pack
dsh plugin --profile web add /absolute/path/to/fang2hou-dsh-locale-ja-<version>.tgz
```

`dsh plugin` はプロファイルディレクトリをカレントディレクトリにして `pnpm` を実行するため、tarball は相対パスではなく絶対パスで指定してください。

## 使い方

DSH で **設定 → 言語**（**Settings → Language**）を開き、**日本語** を選択します。UI 全体が日本語に切り替わり、日本語システムフォントが適用されます。ページを再読み込みしても選択は維持され、中文または English に戻すこともできます。

## 仕組み

実装の境界と設計判断の詳細は [ARCHITECTURE.md](./ARCHITECTURE.md) と [ADR](./docs/adr/) を参照してください。

- **Host half** — 空の `apply()` を持つ Loader エントリです。`cordis.patch.yml` の bundle patch が `locale-ja` の行を挿入し、パッケージを profile bundle としてマウントします。
- **browser half** — `dsh.client` マニフェストから発見され、DSH によってブラウザへ配信されます。
- **辞書キーの型検証** — 各辞書を各ネームスペースの公開済みキー集合に対して型付けしているため、キーの変更はコンパイルエラーになります。
- **選択可能な言語の追加** — rc.6 に公開 API がないため、ロケールランタイム自身が使う内部メンバーを通じて選択肢を追加します。
- **`ja` の保存** — Host の設定スキーマが `zh|en` だけを受け付けるため、`ja` の選択は `localStorage` に保存します。
- **フォント** — 日本語の locale が有効な間だけ、`:root` の単一トークン `--dsw-font-family` を上書きします。

## プロジェクト構成

```text
src/
  index.ts                         Host half と空の apply() を提供します
  client/
    index.ts                       browser half のエントリ（inject と apply）です
    locale-extension.ts            日本語をロケールランタイムに接続します
    preference.ts                  localStorage の選択を管理します
    font.ts                        日本語表示時のフォントトークンを管理します
    dictionaries.ts                29 ネームスペースの日本語辞書を定義します
scripts/
  build.mjs                        ビルドと出力の検証を行います
  client.test.mjs                  ビルド済み browser half の動作を検証します
cordis.patch.yml                   profile bundle 用の bundle patch です
docs/adr/                          主要な設計判断を記録します
```

## 開発

開発フロー、ツールチェーン、タスクは [DEVELOPMENT.md](./DEVELOPMENT.md) を、コントリビューションの規約は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

```bash
mise run check   # 型チェック + lint + format-check + build + test
```

## 言語ポリシー

本プロジェクトは以下の言語方針で運用します。

| 対象         | 言語                               |
| ------------ | ---------------------------------- |
| 製品 UI      | 日本語（既定）・中文・English       |
| ソースコード | 英語（識別子・コメント・設定）     |
| 会話         | ユーザーの言語                     |

辞書のリテラル値（UI の文言）のみ日本語であり、コードの識別子やコメントはすべて英語です。

## ライセンス

[MIT](./LICENSE)
