<div align="center">

<img width="647" height="385" alt="sample" src="https://github.com/user-attachments/assets/ee9a6b90-52a5-4c23-b6a9-4aefb7e8247f" />

# dsh-locale-ja

DeepSeek Harness（DSH）の Web UI に **日本語** を追加するプラグイン

</div>

## 機能

DSH に標準で用意されている **中文**・**English** に加えて、**日本語** を選べるようにします。

- **日本語表示**：29 名前空間・706 件の UI 文字列を収録し、画面全体を日本語に切り替えます。
- **日本語フォント**：日本語の表示中は、OS 標準の日本語システムフォントを適用します。
- **選択の保持**：選んだ言語はブラウザーに保存され、ページを再読み込みしても維持されます。
- **完全な可逆性**：プラグインを停止・更新・削除すると、辞書・フォント・言語設定への変更をすべて元に戻します。

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

DSH の **設定 → 言語**（**Settings → Language**）を開き、**日本語** を選択します。UI 全体が日本語に切り替わり、日本語システムフォントが適用されます。選択内容はページを再読み込みしても維持され、中文や English にはいつでも戻せます。プラグインを削除すると English に戻ります。

## 開発

ビルドと検証の手順は [DEVELOPMENT.md](./DEVELOPMENT.md) を、設計と互換性に関する判断は [ARCHITECTURE.md](./ARCHITECTURE.md) および [ADR](./docs/adr/) を参照してください。

```bash
mise run check   # 型チェック + lint + format-check + build + test
```

## ライセンス

[MIT](./LICENSE)
