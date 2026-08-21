/**
 * Japanese dictionaries for every locale namespace DSH registers, typed
 * against each namespace's shipped key union: a key the platform dropped,
 * renamed, or added is a compile error rather than a silent fallback, so
 * `pnpm typecheck` after a DSH upgrade is the dictionary drift check.
 * Placeholders (`{name}`) are preserved verbatim; translation conventions
 * live in DEVELOPMENT.md -> Editing the dictionaries.
 */
import type { LocaleDictOf } from "@deepseek-ai/dsh-client-ui-slots";
// common, settings.locale
import type {} from "@deepseek-ai/dsh-client-locale/client";
// settings.agentPreset
import type {} from "@deepseek-ai/dsh-client-ui-agent-preset/client";
// command
import type {} from "@deepseek-ai/dsh-client-ui-commands/client";
// conversation
import type {} from "@deepseek-ai/dsh-client-ui-conversation/client";
// cordis
import type {} from "@deepseek-ai/dsh-client-ui-cordis/client";
// deliverables
import type {} from "@deepseek-ai/dsh-client-ui-deliverables/client";
// goal
import type {} from "@deepseek-ai/dsh-client-ui-goal/client";
// slash.menu
import type {} from "@deepseek-ai/dsh-client-ui-input-trigger/client";
// job
import type {} from "@deepseek-ai/dsh-client-ui-jobs/client";
// feedback
import type {} from "@deepseek-ai/dsh-client-ui-message-feedback/client";
// model
import type {} from "@deepseek-ai/dsh-client-ui-model-selection/client";
// settings.permission
import type {} from "@deepseek-ai/dsh-client-ui-permission-presets/client";
// plan
import type {} from "@deepseek-ai/dsh-client-ui-plan/client";
// settings
import type {} from "@deepseek-ai/dsh-client-ui-settings-general/client";
// settings.models
import type {} from "@deepseek-ai/dsh-client-ui-settings-models/client";
// settings.pluginInventory
import type {} from "@deepseek-ai/dsh-client-ui-settings-plugin-inventory/client";
// settings.plugins
import type {} from "@deepseek-ai/dsh-client-ui-settings-plugins/client";
// sidebar
import type {} from "@deepseek-ai/dsh-client-ui-sidebar/client";
// skill
import type {} from "@deepseek-ai/dsh-client-ui-skill/client";
// subagent
import type {} from "@deepseek-ai/dsh-client-ui-subagent/client";
// settings.theme
import type {} from "@deepseek-ai/dsh-client-ui-theme/client";
// question
import type {} from "@deepseek-ai/dsh-client-ui-user-questions/client";
// workflowRun
import type {} from "@deepseek-ai/dsh-client-ui-workflow-run/client";
// workspace
import type {} from "@deepseek-ai/dsh-client-ui-workspace/client";
// session-log-download
import type {} from "@deepseek-ai/dsh-session-log-export/client";

/*
 * Three namespaces cannot borrow their key union from the platform, so each is
 * checked against a local copy of the shipped key set instead. `pnpm typecheck`
 * cannot detect upstream drift for these three; the comment on each names the
 * exact package and version the copy was taken from.
 */

/**
 * `directory-browser` keys, from
 * `@deepseek-ai/dsh-client-ui-directory-picker-browse@0.1.1-rc.1`, which
 * registers through the untyped overload and merges no namespace at all.
 */
type DirectoryBrowserKey =
  | "browser.title"
  | "browser.home"
  | "browser.newFolder"
  | "browser.folderName"
  | "browser.createIn"
  | "browser.untitledFolder"
  | "browser.create"
  | "browser.cancel"
  | "browser.open"
  | "browser.editPath"
  | "browser.loading"
  | "browser.truncated"
  | "browser.showHidden";

/**
 * `permission.access` keys, from
 * `@deepseek-ai/dsh-client-ui-permission-presets@0.1.1-rc.1`. `PermissionAccessKey`
 * lives in a module that package's `./client` export does not re-export.
 */
type PermissionAccessKey =
  | "preset.readOnly"
  | "preset.workspaceWrite"
  | "preset.fullAccess"
  | "confirm.title"
  | "confirm.description"
  | "confirm.acknowledge"
  | "confirm.cancel"
  | "confirm.enable";

/**
 * `trajectory` keys, from `@deepseek-ai/dsh-client-ui-trajectory@0.1.1-rc.1`.
 * Its `./client` export re-exports nothing, so neither `TrajectoryKey` nor its
 * `LocaleNamespaceMap` merge is reachable.
 */
type TrajectoryKey =
  | "view.trajectory"
  | "toolbar.aria"
  | "toolbar.duration"
  | "toolbar.useActualDuration"
  | "toolbar.useEqualWidth"
  | "toolbar.actualTime"
  | "toolbar.turns"
  | "toolbar.expandTurns"
  | "toolbar.collapseTurns"
  | "toolbar.calls"
  | "toolbar.expandCalls"
  | "toolbar.collapseCalls"
  | "toolbar.search"
  | "toolbar.searchPlaceholder";

const common: LocaleDictOf<"common"> = {
  ok: "OK",
  cancel: "キャンセル",
  close: "閉じる",
  copy: "コピー",
  copied: "コピーしました",
  retry: "再試行",
  loading: "読み込み中",
  "load.failed": "読み込みに失敗しました",
  submit: "送信",
  submitting: "送信中",
  next: "次へ",
  previous: "前へ",
  skip: "スキップ",
  delete: "削除",
  edit: "編集",
  save: "保存",
  search: "検索",
  more: "その他",
  collapse: "折りたたむ",
  expand: "展開",
  back: "戻る",
  unknown: "不明",
  none: "なし",
  truncated: "省略されています",
};

const settingsLocale: LocaleDictOf<"settings.locale"> = {
  "language.title": "言語",
};

const conversation: LocaleDictOf<"conversation"> = {
  "view.chat": "チャット",
  "hint.plan": "タスクを記述してプランを生成",
  "hint.goal": "目標を入力すると、エージェントが継続的に実行します",
  "hint.goal.active":
    "目標を実行中です。edit で編集 / pause で一時停止 / resume で再開 / clear でクリア",
  "placeholder.plan": "タスクを記述してプランを生成",
  "placeholder.default": "エージェントにメッセージを送信",
  "placeholder.unavailable": "このセッションは利用できません",
  "placeholder.parentOffline":
    "親セッションがオフラインのため送信できません。実行中の処理は停止できます",
  "placeholder.hero": "作りたいものを入力してください",
  "placeholder.workspace": "ワークスペースを選択して開始",
  "input.commands": "コマンド",
  "input.stop": "生成を停止",
  "input.send": "メッセージを送信",
  "placeholder.steerQueue": "Cmd/Ctrl+Enter で保留中のメッセージをすべて割り込み送信",
  "input.accessMode": "アクセスモード、現在：{name}",
  "image.dropTitle": "画像をここにドラッグして追加",
  "image.dropDesc": "最大 {count} 枚、各 {size}",
  "image.dropBlocked": "現在は画像を追加できません",
  "image.pending": "送信待ちの画像",
  "image.openOriginal": "元画像を表示",
  "image.openOriginalLabel": "{label}、クリックして元画像を表示",
  "image.remove": "画像 {name} を削除",
  "image.scrollLeft": "画像を左にスクロール",
  "image.scrollRight": "画像を右にスクロール",
  "image.original": "元画像",
  "image.label": "画像",
  "image.loadFailed": "画像の読み込みに失敗しました。クリックして再試行",
  "image.loading": "画像を読み込み中",
  "image.preview": "元画像プレビュー",
  "image.closePreview": "元画像プレビューを閉じる",
  "image.serviceUnavailable": "画像読み込みサービスは利用できません",
  "image.unsupportedType": "対応している画像形式は PNG、JPG、WebP、GIF のみです",
  "image.tooMany": "メッセージ 1 件につき画像は {count} 枚までです",
  "image.fileTooLarge": "画像 1 枚のサイズは {size} 以下にしてください",
  "image.totalTooLarge": "画像の合計サイズが {size} を超えています。一部を削除してください",
  "image.tooManyPixels": "画像の解像度が大きすぎます。圧縮してから再試行してください",
  "image.dimensionTooLarge":
    "画像の幅と高さはそれぞれ {size}px 以内にしてください。縮小してから再試行してください",
  "image.modelUnsupported":
    "現在のモデルは画像に対応していません。画像対応のモデルに切り替えてください",
  "image.subagentUnsupported": "サブエージェントセッションではまだ画像を利用できません",
  "image.sendFailed":
    "画像の送信に失敗しました（{reason}）。画像を再度追加してから送信してください",
  "fileOpen.title": "ファイルを開けませんでした",
  "fileOpen.unknown": "このファイルを開けませんでした",
  "fileOpen.folderTitle": "フォルダーを開けませんでした",
  "fileOpen.folderUnknown": "このフォルダーを開けませんでした",
  "context.aria": "コンテキスト使用量 {percent}",
  "context.used": "コンテキスト使用量",
  "context.system": "システムプロンプト",
  "context.tools": "ツール",
  "context.messages": "メッセージ",
  "stats.counts": "{turns} ﾀｰﾝ · {steps} ｽﾃｯﾌﾟ",
  "stats.llm": "LLM {duration}",
  "stats.toolCall": "ツール {duration}",
  "stats.ttftAverage": "TTFT {duration}",
  "stats.tokensPerSecond": "{throughput} tok/s",
  "stats.cacheHit": "ﾋｯﾄ率 {percent}%",
  "stats.tokens": "入力 {input} tok · 出力 {output} tok",
  "settings.enter.title": "実行中の Enter キーの動作",
  "settings.enter.description":
    "エージェント実行中のみ有効。Cmd/Ctrl+Enter はもう一方の動作になります",
  "settings.enter.queue": "キューに送信",
  "settings.enter.steer": "割り込み送信",
  "access.preset.readOnly": "読み取り専用",
  "access.preset.workspaceWrite": "ワークスペース書き込み",
  "access.preset.fullAccess": "Full Access",
  "access.confirm.title": "Full Access を有効にしますか？",
  "access.confirm.description":
    "Full Access を有効にすると、エージェントの確認ステップが減り、機密操作、ファイル変更、外部コマンドを含むより多くの操作を直接実行できるようになります。現在のタスクを信頼できる場合にのみ使用してください。",
  "access.confirm.acknowledge": "リスクを理解した上で続行します",
  "access.confirm.cancel": "キャンセル",
  "access.confirm.enable": "Full Access を有効化",
  "hero.headline": "未知なるものへ",
  "hero.preview": "プレビュー",
  "hero.chooseWorkspace": "ワークスペースを選択",
  "session.hierarchy": "セッション階層",
  "details.title": "詳細",
  "details.close": "詳細を閉じる",
  "details.empty": "メッセージのツール行をクリックして詳細を表示",
  "details.notInWindow": "この呼び出しは現在のウィンドウにありません",
  "details.input": "入力",
  "details.output": "出力",
  "details.running": "実行中",
  "todo.title": "タスク",
  "todo.progress.done": "{done} 完了",
  "todo.progress.active": "{active} 進行中",
  "todo.progress.pending": "{pending} 待機中",
  "todo.rowTitle": "タスクリストを更新",
  "todo.completed": "{done}/{total} 完了",
  "chat.loadingHistory": "履歴を読み込み中",
  "chat.loadError": "履歴の読み込みに失敗しました：{message}（{code}）",
  "chat.loadOlder": "さらに前を読み込む",
  "chat.toBottom": "一番下へ",
  "message.extraBlock": "追加ブロック",
  "message.contextInjection": "コンテキスト注入",
  "message.contextRecall": "セッション横断の再利用",
  "message.context.instructions.loaded": "読み込み済み",
  "message.context.instructions.added": "追加済み",
  "message.context.instructions.updated": "更新済み",
  "message.context.instructions.removed": "削除済み",
  "message.context.catalog.replaced": "カタログを差し替え",
  "message.context.catalog.more": "他 {count} 件",
  "message.context.snapshot.supersedes": "以前のスナップショットを置き換え",
  "message.context.relay.from": "セッション {session} から",
  "message.context.recall.counts": "{retained} 件保持 · {omitted} 件省略",
  "message.context.recall.truncated": "一部省略",
  "message.compaction": "コンテキストを圧縮しました",
  "message.compaction.running": "圧縮中",
  "message.compaction.completed": "会話履歴 {items} 件を圧縮しました（約 {tokens} トークン）",
  "message.compaction.expand": "クリックして圧縮要約を表示",
  "message.compaction.unavailable": "圧縮要約は利用できません",
  "message.unknownSurface": "不明な surface イベント：{type}",
  "message.unknownBlock": "不明なコンテンツブロック",
  "message.stopped": "停止しました",
  "message.branch": "新しい会話で分岐",
  "message.branchUnavailable": "完了したターンの最終メッセージからのみ分岐できます",
  "message.referenceSummary": "参照セッション · {labels}",
  "message.referenceSeparator": "、",
  "message.retry.active": "モデルリクエストを再試行中",
  "message.retry.cancelled": "モデルリクエストの再試行をキャンセルしました",
  "message.retry.started": "モデルリクエストを再試行しました",
  "message.retry.scheduled": "モデルリクエストの再試行を待機中",
  "message.retry.status": "{label}（{retry}/{maximum}）· {seconds}秒",
  "message.retry.delay": "再試行までの待機：",
  "message.retry.failure": "失敗の理由：",
  "message.turnError": "このターンの実行に失敗しました",
  "message.maxTokens": "出力トークン上限に達しました",
  "message.maxTokens.hint":
    "回答が途中で打ち切られました。これまでの出力は会話に保持されています。「続けて」と送信すると、モデルが続きを出力します。",
  "message.ranFor": "所要時間 {duration}",
  "message.ttft": "初回トークン {seconds}秒",
  "message.tokensPerSecond": "{tps} tok/s",
  "duration.seconds": "{seconds}秒",
  "duration.minutes": "{minutes}分{seconds}秒",
  "command.running": "実行中",
  "command.failed": "コマンド失敗",
  "command.done": "完了",
  "command.title": "コマンド",
  "command.imagesUnsupported":
    "/{command} は画像添付に対応していません。先に画像を取り除いてください",
  "approval.waiting": "承認待ち",
  "approval.detail.aria": "承認の詳細",
  "approval.escalation": "ツール {toolName} が権限昇格を要求しています",
  "approval.reject": "拒否",
  "approval.allowOnce": "一度だけ許可",
  "ask.rowTitle": "質問",
  "ask.waiting": "回答待ち",
  "ask.cancelled": "キャンセル済み",
  "ask.interrupted": "中断済み",
  "ask.answered": "{answered}/{total} 回答済み",
  "bash.running": "実行中",
  "bash.failed": "失敗",
  "bash.stopped": "停止済み",
  "row.running": "実行中",
  "row.failed": "失敗",
  "row.stopped": "停止済み",
  "queue.count": "{n} 件の保留メッセージ",
  "queue.edit": "保留メッセージを編集",
  "queue.edit.unsupported": "テキスト以外の内容が含まれているため、編集できません",
  "queue.save": "保留メッセージを保存",
  "queue.cancelEdit": "編集をキャンセル",
  "queue.remove": "保留メッセージを削除",
  "queue.steer": "割り込み送信",
  "queue.steer.unavailable": "実行中のみ割り込み送信できます",
  "queue.editFailed":
    "編集に失敗しました：このメッセージはすでに送信が始まっている可能性があります。",
  "queue.removeFailed":
    "削除に失敗しました：このメッセージはすでに送信が始まっている可能性があります。",
  "queue.steerFailed": "割り込み送信に失敗しました。再試行してください。",
  "terminal.signal": "シグナル {signal}",
  "terminal.exitCode": "終了コード {code}",
  "terminal.running": "実行中",
  "terminal.failed": "失敗",
  "terminal.done": "完了",
  "terminal.noOutput": "出力なし",
  "terminal.collapseAria": "出力を折りたたむ",
  "terminal.expandAria": "残り {n} 行の出力を展開",
  "terminal.expandRest": " 残り {n} 行",
  "json.truncated": " 以下は省略（全 {total} 文字）",
  "clock.md": "{m}月{d}日",
  "clock.ymd": "{y}年{m}月{d}日",
};

const sidebar: LocaleDictOf<"sidebar"> = {
  "session.new": "新規セッション",
  "session.new.label": "新規セッションを作成",
  "toggle.open": "サイドバーを開く",
  "toggle.collapse": "サイドバーを折りたたむ",
};

const model: LocaleDictOf<"model"> = {
  "command.description": "この会話で使用するモデルを選択",
  "option.loadError": "カタログの読み込みに失敗しました：{message}",
  "trigger.fallback": "モデルを選択",
  "trigger.selectAria": "モデルを選択",
  "trigger.aria": "モデルを選択、現在 {model}",
  "trigger.ariaEffort": "モデルを選択、現在 {model}、思考レベル {effort}",
  "menu.aria": "モデルと思考レベル",
  "menu.model": "モデル",
  "menu.effort": "思考レベル",
  "effort.providerDefault": "デフォルト",
  "status.loading": "モデル一覧を更新中",
  "error.action": "モデルの操作に失敗しました：{message}",
  "action.reload": "再読み込み",
  "warning.groupLoad": "{name} の読み込みに失敗しました：{message}",
  "empty.models": "利用可能なモデルがありません。",
  "blocked.composer": "現在のモデルは利用できません。先にモデルを選択してください",
  "empty.efforts": "このモデルには思考レベルが設定されていません。",
};

const settings: LocaleDictOf<"settings"> = {
  trigger: "設定",
  title: "設定",
  close: "閉じる",
  openDocument: "設定ファイルを開く",
  "openDocument.error": "設定ファイルを開けませんでした",
  "general.nav": "一般",
};

const settingsTheme: LocaleDictOf<"settings.theme"> = {
  "appearance.title": "外観",
  "appearance.light": "ライト",
  "appearance.dark": "ダーク",
  "appearance.system": "システム",
};

const feedback: LocaleDictOf<"feedback"> = {
  "action.like": "良い回答",
  "action.likeActive": "評価を取り消す",
  "action.dislike": "問題のある回答",
  "action.dislikeActive": "評価を取り消す",
  "note.open": "コメントを追加",
  "note.placeholder": "この回答の良かった点、気になった点を教えてください（任意）",
  "note.save": "保存",
  "note.cancel": "キャンセル",
  "note.dialog": "フィードバック",
  "note.aria": "フィードバックコメント",
  "error.conflict": "このフィードバックは別の場所で変更されました。最新の状態を表示しています",
  "error.load": "フィードバックの読み込みに失敗しました",
  "error.generic": "フィードバックの保存に失敗しました",
};

const skill: LocaleDictOf<"skill"> = {
  "row.running": "スキルを読み込み中",
  "row.failed": "スキルの読み込みに失敗しました",
  "row.stopped": "スキルの読み込みが中止されました",
  "row.instructions": "説明",
  "menu.userOnly": "ユーザーのみ",
};

const question: LocaleDictOf<"question"> = {
  "error.incomplete": "先にこの質問に回答してください。",
  "error.unanswered": "オプションを選択するか、カスタム回答を入力してください。",
  "nav.prev": "前の質問",
  "nav.next": "次の質問",
  "nav.minimize": "質問カードを折りたたむ",
  "nav.maximize": "質問カードを展開",
  "nav.cancel": "すべての質問を破棄",
  "option.recommended": "推奨",
  "custom.placeholder": "回答を入力",
  "action.skip": "この質問をスキップ",
  "action.next": "次へ",
  "plan.header": "プランレビュー",
  "plan.approve": "承認",
  "plan.decline": "拒否",
  "plan.discuss": "チャットで相談",
};

const sessionLogDownload: LocaleDictOf<"session-log-download"> = {
  "dialog.preparingTitle": "セッションをエクスポート中",
  "dialog.preparingDescription":
    "現在のセッション、子セッション、添付ファイルを含む ZIP ファイルを準備しています。",
  "dialog.successTitle": "セッションのダウンロードを開始しました",
  "dialog.successDescription": "ブラウザーがセッションの ZIP ファイルをダウンロードしています。",
  "dialog.errorTitle": "セッションのエクスポートに失敗しました",
  "dialog.close": "閉じる",
  "dialog.commandFailed": "セッションのエクスポートを開始できませんでした。",
};

const trajectory: Record<TrajectoryKey, string> = {
  "view.trajectory": "トレース",
  "toolbar.aria": "トレースツールバー",
  "toolbar.duration": "所要時間",
  "toolbar.useActualDuration": "実際の所要時間を使用",
  "toolbar.useEqualWidth": "操作の幅を揃える",
  "toolbar.actualTime": "実際の時間",
  "toolbar.turns": "ターン",
  "toolbar.expandTurns": "ターンを展開",
  "toolbar.collapseTurns": "ターンを折りたたむ",
  "toolbar.calls": "ツール呼び出し",
  "toolbar.expandCalls": "ツール呼び出しを展開",
  "toolbar.collapseCalls": "ツール呼び出しを折りたたむ",
  "toolbar.search": "トレースを検索",
  "toolbar.searchPlaceholder": "検索",
};

const settingsModels: LocaleDictOf<"settings.models"> = {
  nav: "モデル",
  title: "モデル",
  intro: "各プロバイダーの API キーを入力すると、そのモデルを利用できます。",
  edit: "編集",
  editProvider: "{provider} を編集",
  remove: "削除",
  removeProvider: "{provider} を削除",
  deleteTitle: "{provider} を削除しますか？",
  deleteDescription:
    "{provider} を削除すると、その設定が削除されます。使用している認証情報（ある場合）は別の場所で管理されるため保持されます。",
  deleteDescriptionWithCredential:
    "{provider} を削除すると、その設定と保存済みの API キーが削除されます。",
  deleteConfirm: "{provider} を削除",
  deleting: "{provider} を削除中",
  add: "プロバイダーを追加",
  provider: "プロバイダー",
  close: "閉じる",
  cancel: "キャンセル",
  apply: "保存",
  applying: "保存中",
  savedProvider: "{provider} を保存しました。",
  credentialConfigured: "API キー設定済み",
  credentialMissing: "API キーが未設定",
  readOnly: "このデプロイでは設定ファイルが読み取り専用です。",
  loadFailed: "プロバイダーカタログの読み込みに失敗しました",
  conflict:
    "このカードを開いている間に、設定が別の場所で変更されました。閉じて再度開き、現在の値で編集してください。",
  retry: "再試行",
  keyInput: "API キー",
  keyPlaceholder: "API キーを入力",
  keyPlaceholderNative: "API キーを入力（環境の認証情報を使う場合は空欄のまま）",
  keyStored: "設定済み。新しい値を入力すると置き換わります",
  keyEnvLocked: "起動環境から取得（読み取り専用）",
  customized: "カスタム設定",
  baseUrl: "エンドポイント",
  baseUrlDefault: "プロバイダーのデフォルト",
  models: "モデルカタログ",
  modelsInherited: "アダプターのデフォルトモデルを使用中",
  modelsCustomized: "モデルカタログをカスタマイズ済み",
  resetModels: "デフォルトのモデルに戻す",
  model: "モデル",
  modelId: "モデル ID",
  modelName: "表示名",
  modelNamePlaceholder: "空欄の場合はモデル ID を使用",
  contextWindow: "コンテキストウィンドウ",
  contextWindowPlaceholder: "プロバイダーのデフォルトを使用",
  maxTokens: "最大出力トークン数",
  maxTokensPlaceholder: "プロバイダーのデフォルトを使用",
  modelAdvanced: "容量",
  addModel: "モデルを追加",
  removeModel: "モデルを削除",
  modelsEmpty: "モデルセレクターには何も表示されません。一覧にない ID もそのまま送信できます。",
  keyBlank: "API キーを入力してください。空欄の場合は保存済みのキーを維持します。",
  keyBlankNew:
    "API キーを入力してください。このプロバイダーが別の方法で認証する場合は空欄にできます。",
  keyIllegalCharacters: "API キーの形式が正しくありません。確認してください。",
  modelIdRequired: "モデル ID は必須です。",
  modelIdDuplicate: "モデル ID は重複できません。",
  modelNameInvalid: "表示名は必須です。",
  modelContextInvalid: "コンテキストウィンドウは正の数で指定してください（例：131072、256K、1M）。",
  modelMaxTokensInvalid: "最大出力トークン数は正の数で指定してください（例：8192、64K、1M）。",
  advancedHint:
    "その他のフィールドは settings.yaml にあります。該当セクションを直接編集してください。",
  modelCapacityInvalid: "容量は数値で指定してください。末尾に K または M を付けられます。",
  modelDuplicate: "モデル ID は重複できません。",
  modelContextWindow: "コンテキストウィンドウ",
  modelMaxTokens: "最大出力トークン",
  fetchModels: "利用可能なモデルを取得",
  fetching: "プロバイダーに問い合わせ中",
  fetchNeedsBaseUrl: "先にエンドポイントを入力してから取得してください。",
  fetchEmpty: "このプロバイダーにはモデルが登録されていません。手動で追加してください。",
  fetchTitle: "追加するモデルを選択",
  fetchDescription:
    "以下はプロバイダーで利用可能なモデルです。追加するモデルにチェックを入れてください。",
  fetchSelectAll: "すべて選択",
  fetchDeselectAll: "すべて解除",
  fetchAdopt: "選択した項目を追加",
  customAdd: "カスタムプロバイダーを追加",
  customTitle: "カスタムプロバイダー",
  customTag: "カスタム",
  customRoute: "Provider ID",
  customRouteHint:
    "小文字で始まるID。リクエスト内でこのプロバイダーを一意に識別し、認証情報名としても使用されます。",
  customRouteInvalid: "小文字で始める必要があります。以降は小文字、数字、ハイフンが使用できます。",
  customRouteTaken: "この ID はすでに別のプロバイダーで使用されています。",
  customDisplayName: "表示名",
  customApi: "API プロトコル",
  customApiUnset: "未選択",
  customNeedsBaseUrl: "カスタムプロバイダーにはエンドポイントが必要です。",
  customNeedsModels: "カスタムプロバイダーにはモデルが 1 つ以上必要です。",
  create: "プロバイダーを作成",
  creating: "作成中",
  welcomeTitle: "内部テストのお知らせ",
  welcomeBody:
    "DeepSeek Harness 0.1 は Harness 開発者向けのテスト段階にあり、改善すべき点がまだ多く残っています。皆様からのフィードバックをお待ちしております。DeepSeek Harness のコアプラグインと基本 API は、今後しばらく急速に進化していく予定です。\n\nオープンソースで開かれた、再利用と組み合わせが自由なインフラを土台に、世界中の開発者とともに知性の限界を探求できることを楽しみにしています。各国の Harness 開発者の皆様が DSH プラグインエコシステムに参加してくださることを歓迎します。",
  welcomeContinue: "続行",
  welcomeError: "確認状態を一時的に保存できません。再試行してください。",
  onboardingTitle: "API キーを追加して始める",
  onboardingDescription: "DeepSeek の公式モデルを設定すると、すぐに使い始められます。",
  onboardingLater: "後で設定",
  onboardingSave: "保存して続行",
  onboardingSaving: "保存中",
  keyRequired: "続行するには API キーを入力してください。",
};

const settingsAgentPreset: LocaleDictOf<"settings.agentPreset"> = {
  title: "エージェントプリセット",
  description:
    "新規作成するセッションに適用されます。実行中のセッションは開始時のプリセットを維持します。",
  loading: "プリセットを読み込み中",
  error: "エージェントプリセットを読み込めません。",
  userTrust: "カスタム",
  seatHint: "次に開始するセッションで使用するエージェントプリセット",
  headerHint: "このセッションで実行中のエージェントプリセット（開始時に固定）",
  nav: "プリセット",
  sectionIntro:
    "プリセットとは、セッションのエージェントが実行するプラグイン構成（ツール、プロンプト、能力）です。既存のプリセットをコピーして自分用に編集するか、クリエイターモードでエージェントに作成させることができます。",
  builtIn: "ビルトイン",
  setDefault: "デフォルトに設定",
  view: "表示",
  presetStandardName: "スタンダード",
  presetStandardDescription:
    "ファイル編集、Shell、ファイルおよびウェブ検索、Skills、プラン、ゴール、サブエージェント、ワークフローをサポートする、フル機能のコーディングエージェントです。",
  presetCodeName: "PTC",
  presetCodeDescription:
    "スタンダードモードの全能力に加え、Code Mode SDK でツールを公開し、モデルが 1 つの TypeScript プログラムで複数ステップの操作を組み立てられます。",
  presetMinimalName: "ミニマル",
  presetMinimalDescription:
    "永続化された bash と str_replace_editor の 2 ツールのみを備えたコーディングエージェントです。",
  presetCordisName: "クリエイター",
  presetCordisDescription:
    "カスタムエージェントプリセットの作成向け。スタンダードモードの全能力に加え、実行時インスペクト、プラグイン実験、プリセット作成のガイダンスを提供します。",
  duplicate: "コピー新規",
  duplicateUnavailable: "このデプロイでは書き込み可能なプリセットディレクトリが設定されていません",
  delete: "削除",
  presetId: "ID",
  presetIdPlaceholder: "my-agent",
  displayName: "名称",
  displayNamePlaceholder: "セレクターに表示する名前（未設定時はIDを代わりに表示）",
  inUse: "使用中",
  builtInGroup: "ビルトイン",
  customGroup: "カスタム",
  noDescription: "説明はありません。",
  brokenBadge: "読み込み失敗",
  brokenNoCopy: "プリセットの読み込みに失敗したためコピーできません",
  copyOf: "コピー元",
  composition: "構成（agent.cordis.yml）",
  cancel: "キャンセル",
  close: "閉じる",
  retry: "再試行",
  copyTitle: "プリセットをコピー新規",
  copyIntro:
    "プリセットまるごとコピーされます。プリセットIDが保存用のディレクトリ名になり、後から変更できません。設定内容は、プリセットファイルの修正で調整してください。",
  create: "作成",
  creating: "作成中",
  creatorDraft: "クリエイターモードでカスタムプリセットを作成",
  openLocation: "ディレクトリを開く",
  showLocation: "パスを表示",
  revealedPathLabel: "プリセットファイル：",
  idRequired: "IDを入力してください。",
  idInvalid: "使用できるのは小文字、数字、ハイフンのみで、先頭は文字または数字にしてください。",
  idTaken: "このIDはすでに使用されています。",
  deleteTitle: "このプリセットを削除しますか？",
  deleteDescription:
    "プリセットのディレクトリが削除されます。すでにこのプリセットで実行中のセッションには影響しませんが、新規セッションでは選択できなくなります。",
  deleteConfirm: "削除",
  deleting: "削除中",
};

const command: LocaleDictOf<"command"> = {
  "search.placeholder": "検索",
  "search.aria": "オプションを絞り込み",
  "status.loading": "オプションを読み込み中",
  "status.applying": "適用中",
  "status.empty": "オプションなし",
  "overlay.aria": "/{command} オプション",
  "listbox.aria": "/{command} の一致項目",
  "notice.imagesUnsupported":
    "/{command} は画像添付に対応していません。先に画像を取り除いてください",
};

const cordis: LocaleDictOf<"cordis"> = {
  "row.defineTitle": "Cordis プラグインを登録",
  "row.runTitle": "Cordis プラグインを実行",
  "row.updateTitle": "Cordis プラグインを更新",
  "row.stopTitle": "Cordis プラグインを停止",
  "row.removeTitle": "Cordis プラグインを削除",
  "purpose.missing": "（用途未入力）",
  "status.idle": "有効化待ち",
  "status.awaitingApproval": "承認待ち",
  "status.failed": "実行失敗",
  "status.clientPending": "Client 有効化待ち",
  "status.running": "実行中",
  "status.removed": "削除済み",
  "status.superseded": "更新あり",
  "run.removed": "パッケージが存在しません",
  "run.superseded": "より新しい実行カードがあります。下を確認してください",
  "panel.hint": "実行操作は、画面左下の設定の上にある Cordis パネルにあります",
  "panel.plugins.aria": "Cordis プラグイン",
  "panel.approvals.aria": "Cordis 承認",
  "panel.trigger": "Cordis Plugin",
  "panel.runningCount": "{count} 件実行中",
  "panel.title": "Cordis プラグイン",
  "panel.empty": "まだプラグインが定義されていません",
  "panel.loading": "読み込み中",
  "panel.readFailed": "プラグイン一覧の読み込みに失敗しました：{message}",
  "panel.group.current": "現在のセッション",
  "panel.group.others": "その他のセッション",
  "panel.version": "バージョン",
  "panel.current": "現在：{packageId}",
  "panel.next": "切り替え待ち：{packageId}",
  "action.approve": "許可",
  "action.approveOnce": "このバージョンのみ許可",
  "action.approvePlugin": "このプラグインの今後のバージョンを許可",
  "action.decline": "拒否",
  "action.run": "実行",
  "action.stop": "停止",
  "action.remove": "削除",
  "action.retry": "再試行",
  "action.rollback": "ロールバック",
  "render.failedAbdicated": "{slot} のレンダリングに失敗し、デフォルト画面に戻しました：",
  "render.failedHeld": "{slot} のレンダリングに失敗しました：",
  "a11y.defining": "プラグインを定義中",
  "a11y.failed": "定義失敗",
  "a11y.stopped": "定義が中断されました",
  "body.source": "プラグインコード",
  "body.hostCode": "Host",
  "body.clientCode": "Client",
  "body.output": "結果",
  "body.copy": "コピー",
  "body.copied": "コピーしました",
};

const deliverables: LocaleDictOf<"deliverables"> = {
  "produced.label": "成果物",
  "produced.moreOne": "+ 1 件のファイル",
  "produced.more": "+ {count} 件のファイル",
  "produced.open": "{name} を開く",
  "produced.showInFolder": "フォルダーで表示",
};

const directoryBrowser: Record<DirectoryBrowserKey, string> = {
  "browser.title": "ワークスペースディレクトリを選択",
  "browser.home": "ホーム",
  "browser.newFolder": "新規フォルダー",
  "browser.folderName": "フォルダー名",
  "browser.createIn": "「{name}」に新規フォルダーを作成",
  "browser.untitledFolder": "無題のフォルダー",
  "browser.create": "作成",
  "browser.cancel": "キャンセル",
  "browser.open": "開く",
  "browser.editPath": "パスを編集",
  "browser.loading": "読み込み中",
  "browser.truncated": "フォルダーが多すぎるため、先頭部分のみ表示しています。",
  "browser.showHidden": "隠しファイルを表示",
};

const goal: LocaleDictOf<"goal"> = {
  "phase.active": "進行中の目標",
  "phase.paused": "一時停止中の目標",
  "phase.blocked": "ブロックされた目標",
  "objective.aria": "目標の内容",
  "commandInput.aria": "コマンド入力",
  "action.save": "目標を保存",
  "action.cancel": "編集をキャンセル",
  "action.pause": "目標を一時停止",
  "action.resume": "目標を再開",
  "action.edit": "目標を編集",
  "action.clear": "目標をクリア",
};

const job: LocaleDictOf<"job"> = {
  "count.live.one": "{count} 件のバックグラウンドタスクを実行中",
  "count.live.other": "{count} 件のバックグラウンドタスクを実行中",
  "count.idle.one": "{count} 件のバックグラウンドタスク",
  "count.idle.other": "{count} 件のバックグラウンドタスク",
  "list.aria": "バックグラウンドタスク",
  "status.running": "実行中",
  "status.stopping": "停止中",
  "status.completed": "完了",
  "status.killed": "キャンセル済み",
  "status.failed": "失敗",
  "duration.seconds": "{seconds}秒",
  "duration.minutes": "{minutes}分{seconds}秒",
  "duration.hours": "{hours}時間{minutes}分",
  "duration.title.live": "{duration} 経過",
  "duration.title.done": "所要時間 {duration}",
};

const slashMenu: LocaleDictOf<"slash.menu"> = {
  command: "コマンド",
  skill: "スキル",
  subagent: "サブエージェント",
  loading: "読み込み中",
  "suggestions.aria": "トリガー候補の提案",
};

const settingsPermission: LocaleDictOf<"settings.permission"> = {
  title: "権限",
  description: "新しいセッションのデフォルトの権限モードを選択",
  loading: "読み込み中",
  unavailable: "利用不可",
  "preset.readOnly": "読み取り専用",
  "preset.workspaceWrite": "ワークスペース書き込み",
  "preset.fullAccess": "Full Access",
  "confirm.title": "Full Access を有効にしますか？",
  "confirm.description":
    "Full Access を有効にすると、新しいセッションでの確認ステップが減り、機密操作、ファイル変更、外部コマンドを含むより多くの操作を直接実行できるようになります。以降のタスクを信頼できる場合にのみ使用してください。",
  "confirm.acknowledge": "リスクを理解した上で続行します",
  "confirm.cancel": "キャンセル",
  "confirm.enable": "Full Access を有効化",
};

const permissionAccess: Record<PermissionAccessKey, string> = {
  "preset.readOnly": "読み取り専用",
  "preset.workspaceWrite": "ワークスペース書き込み",
  "preset.fullAccess": "Full Access",
  "confirm.title": "Full Access を有効にしますか？",
  "confirm.description":
    "Full Access を有効にすると、エージェントの確認ステップが減り、機密操作、ファイル変更、外部コマンドを含むより多くの操作を直接実行できるようになります。現在のタスクを信頼できる場合にのみ使用してください。",
  "confirm.acknowledge": "リスクを理解した上で続行します",
  "confirm.cancel": "キャンセル",
  "confirm.enable": "Full Access を有効化",
};

const plan: LocaleDictOf<"plan"> = {
  "chip.on.aria": "プランモードはオンです。押してオフにします",
  "chip.on.title": "プランモードはオン。クリックでオフ（/plan off）",
  "chip.off.aria": "プランモードはオフです。押してオンにします",
  "chip.off.title": "プランモードはオフ。クリックでオン（/plan）",
};

const settingsPluginInventory: LocaleDictOf<"settings.pluginInventory"> = {
  tab: "プラグイン一覧",
  loading: "プラグインを読み込み中",
  error: "プラグインを一時的に読み込めません。",
  retry: "再試行",
  search: "プラグインを検索",
  catalog: "プラグイン一覧",
  empty: "利用可能なプラグインがありません。",
  emptySearch: "一致するプラグインがありません。",
  enabledTag: "有効",
  disabledTag: "無効",
  configuration: "設定状態",
  cordis: "Cordis 状態",
  unobserved: "未マウント",
  pending: "依存関係を待機中",
  loadingPhase: "読み込み中",
  active: "マウント済み",
  failed: "マウント失敗",
  unloading: "アンロード中",
};

const settingsPlugins: LocaleDictOf<"settings.plugins"> = {
  nav: "プラグイン",
  title: "プラグイン",
  intro: "このデプロイにインストール済みのプラグインを設定・確認します。",
  tabs: "プラグインビュー",
  configurableTab: "プラグイン設定",
  empty: "このデプロイではプラグイン設定が公開されていません。",
  overridden: "上書き済み",
  reset: "デフォルトに戻す",
  readOnly: "このデプロイの設定は読み取り専用です。",
  expand: "設定を展開",
  collapse: "設定を折りたたむ",
  save: "保存",
  saving: "保存中",
  discard: "変更を破棄",
  unsaved: "未保存",
  saveFailed:
    "このデプロイはこれらの値を受け付けませんでした。修正できるよう入力内容はそのまま残しています。",
  invalidNumber: "数値を入力してください。空欄の場合はデフォルト値を使用します。",
  bashTitle: "ターミナル",
  bashDescription: "エージェントが実行する各コマンドの制限",
  bashTimeoutMs: "コマンドタイムアウト（ミリ秒）",
  bashTimeoutMsHint: "1 コマンドの最長実行時間。超過すると終了します。",
  bashMaxOutputBytes: "ストリームごとの出力上限（バイト）",
  bashMaxOutputBytesHint: "超過分は破棄されず、一時ファイルに保存されます。",
  agentLoopTitle: "エージェントループ",
  agentLoopDescription: "エージェントによるツール呼び出しの振り分け",
  agentLoopMaxParallel: "ツール並列呼び出し上限",
  agentLoopMaxParallelHint: "同一ステップ内で同時に実行できる並列可能な呼び出しの最大数。",
  webSearchTitle: "ウェブ検索",
  webSearchDescription: "DeepSeek ウェブ検索サービスプロバイダー",
  webSearchApiKey: "API キー",
  webSearchApiKeyHint: "設定ファイルには書き込まれません。空欄の場合は現在のキーを維持します。",
  webSearchApiKeySet: "キーが設定済みです。",
  webSearchApiKeyUnset: "キーが未設定です。設定するまで検索は利用できません。",
  webSearchBaseUrl: "エンドポイント",
  webSearchBaseUrlHint: "空欄の場合はプロバイダーのデフォルトを使用します。",
  webSearchMaxUses: "1 リクエストあたりの最大検索回数",
  webSearchMaxUsesHint: "回答前に 1 リクエストで実行できる検索の最大回数。",
};

const subagent: LocaleDictOf<"subagent"> = {
  "diagnostic.corrupt": "セッションレコードが破損しています",
  "diagnostic.unsupported": "サブエージェントレコードのバージョンに対応していません",
  "diagnostic.unavailable": "セッションレコードは一時的に利用できません",
  "duration.seconds": "{seconds}秒",
  "duration.minutes": "{minutes}分{seconds}秒",
  "duration.hours": "{hours}時間{minutes}分{seconds}秒",
  "duration.days": "{days}日",
  "duration.daysHours": "{days}日{hours}時間",
  "duration.months": "約{months}ヶ月",
  "duration.monthsDays": "約{months}ヶ月{days}日",
  "duration.years": "約{years}年",
  "duration.yearsMonths": "約{years}年{months}ヶ月",
  "duration.exactDays": "{days}日{hours}時間{minutes}分{seconds}秒",
  "duration.exactTitle": "合計アクティブ時間：{duration}",
  "loading.label": "サブエージェントを読み込み中",
  "loading.aria": "サブエージェントを読み込み中",
  "load.error": "サブエージェントを読み込めません",
  retry: "再試行",
  "mode.oneShot": "ワンショット",
  "mode.continuable": "継続可能",
  "activity.running": "実行中",
  "activity.inactive": "停止中",
  "branch.collapse": "{label} 配下のサブエージェントを折りたたむ",
  "branch.expand": "{label} 配下のサブエージェントを展開",
  "count.total.one": "{count} つのサブエージェント",
  "count.total.other": "{count} つのサブエージェント",
  "count.running.one": "{count} つのサブエージェントが実行中",
  "count.running.other": "{count} つのサブエージェントが実行中",
  "switcher.aria": "サブエージェントを切り替え：{title}",
  "tree.aria": "サブエージェントセッション",
  "readonly.oneShot.title": "ワンショットサブエージェントレコード",
  "readonly.title": "このサブエージェントは一時的に読み取り専用です",
  "readonly.oneShot.body":
    "ワンショットタスクでは追加メッセージに対応していません。ここで完全な実行レコードを確認できます。",
  "readonly.body":
    "親セッションが現在オフラインです。親セッションを再度開くとメッセージの送信を再開できます。",
};

const workflowRun: LocaleDictOf<"workflowRun"> = {
  "run.title": "{name}",
  "run.members.one": "{count} メンバー",
  "run.members.other": "{count} メンバー",
  "run.empty": "開始済みのメンバーはいません",
  "phase.unassigned": "フェーズ未割り当て",
  "phase.empty": "空のフェーズ名",
  "statusCount.running": "実行中 {count}",
  "statusCount.completed": "完了 {count}",
  "statusCount.failed": "失敗 {count}",
  "statusCount.cancelled": "キャンセル済み {count}",
  "statusCount.interrupted": "中断済み {count}",
  "member.empty": "空のメンバー名",
  "member.open": "{name} を開く",
  "status.running": "実行中",
  "status.completed": "完了",
  "status.failed": "失敗",
  "status.cancelled": "キャンセル済み",
  "status.interrupted": "中断済み",
};

const workspace: LocaleDictOf<"workspace"> = {
  "group.ungrouped": "未グループ化",
  "session.new": "新規セッション",
  "section.workspaces": "ワークスペース",
  "section.sessions": "セッション",
  "viewOptions.label": "表示設定",
  "groupBy.label": "グループ化",
  "groupBy.workspace": "ワークスペース別",
  "groupBy.flat": "リスト表示",
  "orderBy.label": "並び替え",
  "orderBy.manual": "手動",
  "orderBy.updated": "更新日時順",
  "sessions.expand": "残り {n} 件のセッションを表示",
  "sessions.collapse": "折りたたむ",
  "empty.none": "セッションがありません",
  "empty.noMatches": "一致する結果がありません",
  "workspace.add": "ワークスペースを追加",
  "search.sessions.aria": "セッションを検索",
  "search.placeholder": "セッションを検索",
  "search.clear": "検索をクリア",
  "search.results.aria": "検索結果",
  "search.pending": "セッション履歴を検索中",
  "search.unavailable": "コンテンツ検索は一時的に利用できません。名前の一致のみ表示しています。",
  "search.noMatches": "一致するセッションがありません",
  "search.hasMore": "最初の {n} 件のみ表示されています。検索範囲を絞り込んでください。",
  "menu.addWorkspace": "ワークスペースを追加",
  "picker.loading": "ワークスペースを読み込み中",
  "conflict.named": "「{name}」という名前のワークスペースはすでに存在します。",
  "folderError.title": "フォルダーを開けません",
  "folderError.retry": "再選択",
  rename: "名前を変更",
  "rename.workspace.title": "ワークスペースの名前を変更",
  "rename.session.title": "セッションの名前を変更",
  "field.workspaceName": "ワークスペース名",
  "field.sessionName": "セッション名",
  "delete.workspace": "ワークスペースを削除",
  "delete.desc":
    "「{name}」をワークスペースリストから削除します。フォルダーとセッション記録は保持され、そのセッションは「未グループ化」の下に表示されます。",
  "delete.pending": "ワークスペースを削除中",
  "menu.fork": "セッションをフォーク",
  "menu.archiveSession": "セッションをアーカイブ",
  "sessions.count.one": "{n} セッション",
  "sessions.count.other": "{n} セッション",
  "actions.workspace.aria": "ワークスペース「{name}」の操作",
  "actions.session.aria": "セッション「{name}」の操作",
  "actions.newSession.aria": "「{name}」に新規セッションを作成",
  "status.running": "実行中",
  "status.subagentsRunning.one": "{n} つのサブエージェントが実行中",
  "status.subagentsRunning.other": "{n} つのサブエージェントが実行中",
  "status.idle": "待機中",
  "status.waitingApproval": "承認待ち",
  "status.planReview": "プランレビュー待ち",
  "status.waitingAnswer": "回答待ち",
  "status.completed": "完了",
  "hover.created": "{time} に作成",
  "hover.copied": "コピーしました",
  "date.ymd": "{y}年{m}月{d}日",
  "time.now": "たった今",
  "time.minutes": "{n}分",
  "time.hours": "{n}時間",
  "time.days": "{n}日",
  "time.months": "{n}ヶ月",
  "time.years": "{n}年",
  "time.ago": "{t}前",
};

/**
 * All Japanese namespace dictionaries, keyed by locale namespace.
 * Registered as the `ja` locale for each namespace.
 */
export const DICTS: Record<string, Record<string, string>> = {
  common,
  "settings.locale": settingsLocale,
  conversation,
  sidebar,
  model,
  settings,
  "settings.theme": settingsTheme,
  feedback,
  skill,
  question,
  "session-log-download": sessionLogDownload,
  trajectory,
  "settings.models": settingsModels,
  "settings.agentPreset": settingsAgentPreset,
  command,
  cordis,
  deliverables,
  "directory-browser": directoryBrowser,
  goal,
  job,
  "slash.menu": slashMenu,
  "settings.permission": settingsPermission,
  "permission.access": permissionAccess,
  plan,
  "settings.pluginInventory": settingsPluginInventory,
  "settings.plugins": settingsPlugins,
  subagent,
  workflowRun,
  workspace,
};
