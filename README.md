# dsh-locale-ja

> DeepSeek Harness（DSH）の web UI に **日本語** インターフェースを追加するプラグインパッケージです。

## 機能

DSH の組み込み言語 **中文**・**English** に加えて、**日本語** を選択可能な言語として追加します。

- **日本語の選択** — 29 個の名前空間、706 個の UI 文字列を収録し、画面全体を日本語に切り替えます。
- **日本語フォントの適用** — 日本語が有効な間は、OS 標準の日本語システムフォントで表示します。
- **選択の保持** — 選択した言語はブラウザに保存され、ページを再読み込みしても維持されます。
- **完全な可逆性** — プラグインの停止・更新・削除のときは、組み込みの辞書・フォント・言語設定への変更をすべて元に戻します。

## 対応バージョン

- DSH `0.1.0-rc.6`

## インストール

```bash
dsh plugin --profile web add @fang2hou/dsh-locale-ja
dsh web
```

削除する場合は次を実行します。

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

## 使い方

DSH で **設定 → 言語**（**Settings → Language**）を開き、**日本語** を選択します。UI 全体が日本語に切り替わり、日本語システムフォントが適用されます。選択はページを再読み込みしても維持され、中文または English にいつでも戻せます。プラグインを削除すると English に戻ります。

## 開発

ビルドと検証の手順は [DEVELOPMENT.md](./DEVELOPMENT.md) を、設計と互換性に関する判断は [ARCHITECTURE.md](./ARCHITECTURE.md) および [ADR](./docs/adr/) を参照してください。

```bash
mise run check   # 型チェック + lint + format-check + build + test
```

## ライセンス

[MIT](./LICENSE)
