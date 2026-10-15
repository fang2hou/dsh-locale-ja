<div align="center">

<img width="647" height="385" alt="DSH の日本語インターフェースの表示例" src="https://github.com/user-attachments/assets/ee9a6b90-52a5-4c23-b6a9-4aefb7e8247f" />

# dsh-locale-ja

DeepSeek Harness（DSH）の Web UI に **日本語** を追加するプラグイン

</div>

## 概要

DSH 標準の **中文**・**English** に加えて、表示言語として **日本語** を選択できるようにします。

- 54 の名前空間にわたる 2,232 件の UI 文字列を日本語化します。未翻訳の項目は英語で表示されます。
- 日本語の表示中は OS 標準の日本語システムフォントを適用します。外部の Web フォントは読み込みません。
- 選択した言語は DSH ホストの設定に保存され、ページを再読み込みしても維持されます。同じ DSH ホストに接続する別のブラウザーにも反映されます。

## 対応環境

- DSH `0.2.0-rc.2` の `web` プロファイル（ブラウザー UI）

## インストール

```bash
dsh plugin --profile web add @fang2hou/dsh-locale-ja
dsh web
```

アンインストールする場合は、次のコマンドを実行します。

```bash
dsh plugin --profile web remove @fang2hou/dsh-locale-ja
```

## 使い方

1. DSH の **Settings → General → Language**（**設定 → 一般 → 言語**）を開きます。
2. **日本語** を選択すると、UI の表示言語とフォントが切り替わります。**中文** や **English** にもいつでも戻せます。

プラグインを削除すると、追加した辞書・フォント・言語の選択肢はすべて解除されます。日本語を選択したまま削除すると表示は英語に戻りますが、DSH 側の言語設定は残ります。再インストールすると再び日本語で表示されます。

## 開発

ビルドと検証の手順は [DEVELOPMENT.md](./DEVELOPMENT.md) を参照してください。設計と互換性の判断は [ARCHITECTURE.md](./ARCHITECTURE.md) および [ADR](./docs/adr/) に記録しています。

```bash
mise run check   # 型チェック + lint + format-check + build + test
```

## ライセンス

[MIT](./LICENSE)
