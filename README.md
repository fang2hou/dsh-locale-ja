<div align="center">

<img width="647" height="385" alt="DSH の日本語インターフェースの表示例" src="https://github.com/user-attachments/assets/ee9a6b90-52a5-4c23-b6a9-4aefb7e8247f" />

# dsh-locale-ja

DeepSeek Harness（DSH）の Web UI に **日本語** を追加するプラグイン

</div>

## 機能

DSH に標準で用意されている **中文**・**English** に加えて、**日本語** を選べるようにします。

- **日本語表示**：42 の名前空間に 1,257 件の UI 文字列を収録しています。未翻訳の項目は英語で表示されます。
- **日本語フォント**：日本語の表示中は、OS 標準の日本語システムフォントを適用します。
- **選択の保持**：選んだ言語は DSH の設定として保存され、ページを再読み込みしても維持されます。
- **削除時の動作**：プラグインを削除すると、追加した辞書・フォント・言語の選択肢を取り除きます。DSH に保存された言語設定は残ります。

## 対応バージョン

- DSH `0.1.5-rc.2` の `web` プロファイル（ブラウザー UI）

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

1. DSH の **Settings → General → Language**（**設定 → 一般 → 言語**）を開きます。
2. **日本語** を選択すると、UI の表示言語とフォントが切り替わります。

選択内容は DSH に保存され、ページを再読み込みしても維持されます。同じ DSH ホストに接続する別のブラウザーにも適用されます。中文や English にはいつでも切り替えられます。

日本語を選択したままプラグインを削除すると、表示は英語に戻ります。保存済みの日本語設定は残るため、そのまま再インストールすると日本語表示に戻ります。

## 開発

ビルドと検証の手順は [DEVELOPMENT.md](./DEVELOPMENT.md) を、設計と互換性に関する判断は [ARCHITECTURE.md](./ARCHITECTURE.md) および [ADR](./docs/adr/) を参照してください。

```bash
mise run check   # 型チェック + lint + format-check + build + test
```

## ライセンス

[MIT](./LICENSE)
