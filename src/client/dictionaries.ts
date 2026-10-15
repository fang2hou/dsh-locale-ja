/**
 * Japanese dictionaries for every locale namespace DSH registers, typed
 * against each namespace's shipped key union — key drift is a compile
 * error. Placeholders ({name}) are preserved verbatim.
 */
import type { LocaleDictOf } from "@deepseek-ai/dsh-client-ui-slots";
// common, settings.locale
import type {} from "@deepseek-ai/dsh-client-locale/client";
// settings.agentPreset
import type {} from "@deepseek-ai/dsh-client-ui-agent-preset/client";
// approval
import type {} from "@deepseek-ai/dsh-client-ui-approval/client";
// chat
import type {} from "@deepseek-ai/dsh-client-ui-chat/client";
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
// open-in-app
import type {} from "@deepseek-ai/dsh-client-ui-open-in-app/client";
// settings.permission
import type {} from "@deepseek-ai/dsh-client-ui-permission-presets/client";
// plan
import type {} from "@deepseek-ai/dsh-client-ui-plan/client";
// pluginManager
import type {} from "@deepseek-ai/dsh-client-ui-plugin-manager/client";
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
// sidebarDocumentPreview
import type {} from "@deepseek-ai/dsh-client-ui-sidebar-documentpreview/client";
// sidebarFiles
import type {} from "@deepseek-ai/dsh-client-ui-sidebar-files/client";
// sidebarRight
import type {} from "@deepseek-ai/dsh-client-ui-sidebar-right/client";
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
import type {} from "@deepseek-ai/dsh-client-ui-trajectory/client";
// settings.account
import type {} from "@deepseek-ai/dsh-client-ui-settings-account/client";
// settings.agentLoop
import type {} from "@deepseek-ai/dsh-client-ui-settings-agent-loop/client";
// settings.sessionLog
import type {} from "@deepseek-ai/dsh-client-ui-settings-session-log/client";
// settings.shell
import type {} from "@deepseek-ai/dsh-client-ui-settings-shell/client";
// settings.subagent
import type {} from "@deepseek-ai/dsh-client-ui-settings-subagent/client";
// settings.webSearch
import type {} from "@deepseek-ai/dsh-client-ui-settings-web-search/client";
// shortcuts
import type {} from "@deepseek-ai/dsh-client-ui-shortcuts/client";
// shortcuts.layout
import type {} from "@deepseek-ai/dsh-client-ui-layout/client";
// sidebarBrowser
import type {} from "@deepseek-ai/dsh-client-ui-sidebar-browser/client";

// The namespaces below ship no key union through their `exports`; each key
// set is copied from the named package, and `pnpm drift` is the only check
// that sees their upstream drift.
/** Keys of @deepseek-ai/dsh-client-ui-trajectory@0.2.0-rc.2 (union lives in a declaration the package's `exports` never exposes). */
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
  | "toolbar.searchPlaceholder"
  | "kind.system"
  | "kind.user"
  | "kind.context"
  | "kind.compacted"
  | "kind.message"
  | "kind.assistant"
  | "kind.tool"
  | "kind.subtool"
  | "kind.sub"
  | "column.input"
  | "column.output"
  | "column.think"
  | "column.time"
  | "column.model"
  | "column.tools"
  | "turn.label"
  | "section.betweenTurns"
  | "group.message"
  | "group.step"
  | "group.compaction"
  | "status.failed"
  | "status.pending"
  | "status.completed"
  | "timing.notAvailable"
  | "timing.notRecorded"
  | "timing.stepStartUnavailable"
  | "timing.firstTokenUnavailable"
  | "timing.usageUnavailable"
  | "timing.outputTokensUnavailable"
  | "timing.durationTooShort"
  | "timing.showLocalTime"
  | "timing.showUnixTimestamp"
  | "timing.started"
  | "timing.totalDuration"
  | "timing.ttft"
  | "timing.generation"
  | "timing.throughput"
  | "timing.duration"
  | "timing.source"
  | "timing.sessionTimestamps"
  | "timing.sessionTimestampsRunning"
  | "timing.request"
  | "unit.milliseconds"
  | "unit.seconds"
  | "unit.tokens"
  | "unit.tokensPerSecond"
  | "usage.tokens"
  | "usage.reasoning"
  | "usage.content"
  | "usage.notReported"
  | "usage.input"
  | "usage.cached"
  | "usage.cacheCreated"
  | "usage.other"
  | "usage.output"
  | "usage.thisRequest"
  | "usage.sessionCumulative"
  | "options.notRecorded"
  | "options.json"
  | "source.unknown"
  | "source.user"
  | "source.plugin"
  | "source.pluginNamed"
  | "source.goal"
  | "source.goalRound"
  | "source.notRecorded"
  | "source.messageJson"
  | "tab.summary"
  | "tab.rawOutput"
  | "tab.preview"
  | "tab.raw"
  | "tab.source"
  | "tab.payload"
  | "tab.result"
  | "tab.schema"
  | "tab.timing"
  | "tab.diff"
  | "tab.systemPrompt"
  | "tab.tools"
  | "tab.options"
  | "tab.usage"
  | "record.toolCallOnly"
  | "record.noContent"
  | "record.noPayload"
  | "record.noResult"
  | "record.noOutput"
  | "record.schemaUnavailable"
  | "record.parameters"
  | "record.resultJson"
  | "record.json"
  | "record.parametersJson"
  | "record.namedParametersJson"
  | "record.payloadJson"
  | "record.outputJson"
  | "record.thinking"
  | "record.systemPromptMissing"
  | "record.toolsMissing"
  | "record.systemPrompt"
  | "record.tools"
  | "block.openSummary"
  | "block.openSummaryTitle"
  | "block.label"
  | "history.loadingTrajectory"
  | "history.loadingEarlier"
  | "history.loadingEarlierAria"
  | "history.loadEarlier"
  | "history.clickToLoadEarlier"
  | "request.label"
  | "request.labelCompaction"
  | "request.compaction"
  | "request.compactionPurpose"
  | "request.retryProgress"
  | "request.collapsedSummary"
  | "request.collapsedTurn"
  | "request.collapsedAssistant"
  | "request.rowAria"
  | "request.rowPrefix"
  | "request.rowAriaCompaction"
  | "request.noContent"
  | "summary.toolCalls.one"
  | "summary.toolCalls.other"
  | "summary.steps.one"
  | "summary.steps.other"
  | "details.event"
  | "details.resize"
  | "details.resizeTitle"
  | "details.close"
  | "details.status"
  | "details.purpose"
  | "details.provider"
  | "details.model"
  | "details.toolCalls"
  | "details.subtoolCalls"
  | "details.error"
  | "details.failure.auth"
  | "details.retry"
  | "details.scheduled"
  | "details.retryDelay"
  | "details.result"
  | "details.compacted"
  | "details.assistantMessage"
  | "details.source"
  | "details.hierarchy"
  | "details.toolCall"
  | "timeline.aria"
  | "timeline.overviewAria"
  | "timeline.noTimingData"
  | "timeline.total"
  | "timeline.started"
  | "timeline.ttftDecoding"
  | "layout.compacting"
  | "layout.compactionFailed"
  | "layout.compacted"
  | "layout.toolCallOnly"
  | "layout.imageCount"
  | "layout.fileAttachments"
  | "layout.initialSystemPrompt"
  | "layout.systemPromptUpdated"
  | "layout.toolsUpdated"
  | "layout.systemPromptAndToolsUpdated"
  | "layout.compactionInterrupted"
  | "layout.toolAdded"
  | "layout.toolRemoved"
  | "layout.toolUpdateNotice"
  | "layout.toolsAdded"
  | "layout.toolsAddedCount"
  | "layout.toolsChanged"
  | "layout.toolsRemoved"
  | "layout.toolsRemovedCount"
  | "attachment.imageName"
  | "attachment.list"
  | "code.copyOutput"
  | "code.copySource"
  | "code.originalJson"
  | "code.output"
  | "code.running"
  | "code.source"
  | "record.wrapLines";

/** Keys of @deepseek-ai/dsh-client-ui-directory-picker-browse@0.2.0-rc.2 (registers through the untyped overload, no namespace merge). */
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

/** Keys of @deepseek-ai/dsh-client-ui-permission-presets@0.2.0-rc.2 (registers through the untyped overload). */
type PermissionAccessKey =
  | "mode"
  | "close"
  | "preset.readOnly"
  | "preset.workspaceWrite"
  | "preset.fullAccess"
  | "confirm.title"
  | "confirm.description"
  | "confirm.acknowledge"
  | "confirm.cancel"
  | "confirm.enable"
  | "auto.label"
  | "auto.badge"
  | "auto.description"
  | "auto.confirm.title"
  | "auto.confirm.description"
  | "auto.confirm.acknowledge"
  | "auto.confirm.enable";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type DocumentHtmlKey = "title" | "frame" | "loading" | "failed";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type DocumentMarkdownKey = "viewer.label" | "code.copy" | "code.copied" | "footnotes";

/** Keys of @deepseek-ai/dsh-client-ui-reference@0.2.0-rc.2 (registers through the untyped overload). */
type ReferenceKey =
  | "section.files"
  | "section.subagents"
  | "section.sessions"
  | "candidate.noCwd"
  | "crumb.root"
  | "time.now"
  | "time.minutes"
  | "time.hours"
  | "time.days"
  | "time.months"
  | "time.years";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarCodePreviewKey = "title" | "copy" | "copied";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarImageKey =
  | "title"
  | "preview"
  | "loading"
  | "failed"
  | "unsupported"
  | "zoomControls"
  | "zoomMenu"
  | "zoomOut"
  | "zoomIn"
  | "zoomFitWidth"
  | "zoomValue";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarPdfKey =
  | "title"
  | "pageImage"
  | "loading"
  | "rendering"
  | "failed"
  | "password"
  | "workerFailed"
  | "unsupported"
  | "retry"
  | "zoomControls"
  | "zoomMenu"
  | "zoomOut"
  | "zoomIn"
  | "zoomFitWidth"
  | "zoomValue";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-terminal@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarTerminalKey =
  | "shortcut.noSession"
  | "recoveryFailed"
  | "retryRecovery"
  | "shell"
  | "shellLoading"
  | "shellEmpty"
  | "description"
  | "title"
  | "new"
  | "loading"
  | "creating"
  | "connecting"
  | "disconnected"
  | "reconnect"
  | "readonly"
  | "control"
  | "closed"
  | "exited"
  | "failed"
  | "rename"
  | "unavailable"
  | "retry"
  | "cleanupFailed"
  | "missingTerminal"
  | "inputFull"
  | "attachmentEnded"
  | "invalidOutput"
  | "terminalLimit";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarExcelKey =
  | "title"
  | "language"
  | "loading"
  | "invalid"
  | "tooLarge"
  | "timeout"
  | "encoding"
  | "formulaWarning"
  | "unsupportedNotice"
  | "charts"
  | "images"
  | "shapes"
  | "conditionalFormatting"
  | "featureSeparator"
  | "retry";

/** Keys of @deepseek-ai/dsh-client-ui-sidebar-documentpreview@0.2.0-rc.2 (registers through the untyped overload). */
type SidebarOfficeKey =
  | "title"
  | "loading"
  | "retry"
  | "viewMissingFonts"
  | "missingFontsTitle"
  | "missingFontsDescription"
  | "missingFontsCount"
  | "closeDetails"
  | "unavailable"
  | "invalid"
  | "tooLarge"
  | "failed"
  | "timeout"
  | "busy"
  | "changed";

const approval: LocaleDictOf<"approval"> = {
  waiting: "承認待ち",
  "detail.aria": "承認の詳細",
  escalation: "ツール {toolName} が権限昇格を要求しています",
  reject: "拒否",
  allowOnce: "一度だけ許可",
};

const chat: LocaleDictOf<"chat"> = {
  "message.stepProcess.thinking": "リクエストを分析中",
  "message.stepProcess.read": "ファイルを読み取り中",
  "message.stepProcess.readImage": "画像を読み取り中",
  "message.stepProcess.write": "ファイルを書き込み中",
  "message.stepProcess.search": "コードを検索中",
  "message.stepProcess.edit": "ファイルを編集中",
  "message.stepProcess.commands": "コマンドを実行中",
  "message.stepProcess.code": "コードを実行中",
  "message.stepProcess.webSearch": "Web を検索中",
  "message.stepProcess.webFetch": "Web ページにアクセス中",
  "message.stepProcess.subagents": "サブエージェントを調整中",
  "message.stepProcess.plan": "プランを更新中",
  "message.stepProcess.questions": "操作待ち",
  "message.stepProcess.tools": "ツールを呼び出し中",
  "message.stepProcess.prepare.read": "ファイル読み取りを準備中",
  "message.stepProcess.prepare.readImage": "画像読み取りを準備中",
  "message.stepProcess.prepare.write": "ファイル書き込みを準備中",
  "message.stepProcess.prepare.search": "コード検索を準備中",
  "message.stepProcess.prepare.edit": "ファイル編集を準備中",
  "message.stepProcess.prepare.commands": "コマンド実行を準備中",
  "message.stepProcess.prepare.code": "コード実行を準備中",
  "message.stepProcess.prepare.webSearch": "Web 検索を準備中",
  "message.stepProcess.prepare.webFetch": "Web ページアクセスを準備中",
  "message.stepProcess.prepare.subagents": "サブエージェント調整を準備中",
  "message.stepProcess.prepare.plan": "プラン更新を準備中",
  "message.stepProcess.prepare.questions": "質問を準備中",
  "message.stepProcess.prepare.tools": "ツール呼び出しを準備中",
  "message.stepProcess.done.thinking": "分析しました",
  "message.stepProcess.done.read": "ファイルを読み取りました",
  "message.stepProcess.done.readImage": "画像を読み取りました",
  "message.stepProcess.done.write": "ファイルを書き込みました",
  "message.stepProcess.done.search": "コードを検索しました",
  "message.stepProcess.done.edit": "ファイルを編集しました",
  "message.stepProcess.done.commands": "コマンドを実行しました",
  "message.stepProcess.done.code": "コードを実行しました",
  "message.stepProcess.done.webSearch": "Web を検索しました",
  "message.stepProcess.done.webFetch": "Web ページにアクセスしました",
  "message.stepProcess.done.subagents": "サブエージェントを調整しました",
  "message.stepProcess.done.plan": "プランを更新しました",
  "message.stepProcess.done.questions": "ユーザーに質問しました",
  "message.stepProcess.done.tools": "ツールを呼び出しました",
  "message.stepProcess.joinTwo": "{first}と{second}",
  "message.stepProcess.comma": "、",
  "message.stepProcess.sharedPrefix": "",
  "message.stepProcess.more": "{title}など",
  "message.trigger.request": "実行リクエストを受信",
  "message.trigger.goal": "目標の継続実行",
  "message.trigger.agent": "タスクメッセージを受信",
  "message.trigger.team": "チームメッセージを受信",
  "message.trigger.subagent": "サブタスクの状態更新",
  "message.trigger.github": "GitHub イベントを受信",
  "message.trigger.webhook": "外部イベントを受信",
  "message.trigger.schedule": "自動化タスク",
  "message.trigger.job": "バックグラウンドタスクの状態更新",
  "message.trigger.plugin": "プラグインの状態更新",
  "message.trigger.explanation": "この通知がこの応答をトリガーしました。",
  "message.turnProcess.worked": "完了",
  "message.turnProcess.took": "完了、所要時間 ",
  "message.turnProcess.failed": "失敗しました",
  "view.chat": "チャット",
  "image.open": "元画像を表示",
  "image.loading": "画像を読み込み中…",
  "image.failed": "画像をプレビューできません",
  "image.dialog": "画像プレビュー",
  "image.close": "画像プレビューを閉じる",
  "number.groupSeparator": ",",
  "duration.compactSeconds": "{seconds}秒",
  "duration.compactMinutes": "{minutes}分{seconds}秒",
  "duration.milliseconds": "{milliseconds}ミリ秒",
  "stats.counts": "{turns} ターン {steps} ステップ",
  "stats.cacheHit": "ヒット率 {percent}%",
  "stats.dialog.title": "セッション統計",
  "stats.dialog.usageTitle": "トークン使用量",
  "stats.dialog.llmTime": "モデル所要時間",
  "stats.dialog.toolTime": "ツール呼び出し所要時間",
  "stats.dialog.ttft": "最初のトークンまでの平均時間（TTFT）",
  "stats.dialog.speed": "出力速度（TPS）",
  "chat.loadingHistory": "履歴を読み込み中",
  "chat.loadError": "履歴の読み込みに失敗しました：{message}（{code}）",
  "chat.loadOlder": "さらに前を読み込む",
  "chat.toBottom": "一番下へ",
  "chat.deepDiving": "深く探索中",
  "chat.deepDivingFor": "深く探索中、{duration} ···",
  "chat.turnNavigation.label": "ターンナビゲーション",
  "chat.turnNavigation.jump": "ターン {turn} へジャンプ",
  "chat.turnNavigation.jumpLoad": "ターン {turn} を読み込んでジャンプ",
  "chat.turnNavigation.turn": "ターン {turn}",
  "settings.performance.title": "パフォーマンスと使用量",
  "settings.performance.description":
    "パフォーマンスと使用量の情報をどの程度表示するかを選択します",
  "settings.performance.compact": "コンパクト",
  "settings.performance.detailed": "詳細",
  "settings.links.title": "チャット内リンクの開き先",
  "settings.links.description": "Web リンクを開く場所を選択します",
  "settings.links.sidebar": "アプリ内サイドバー",
  "settings.links.newTab": "デフォルトブラウザー",
  "settings.transcript.title": "作業の詳細",
  "settings.transcript.description": "ツール呼び出しの詳細をどこまで表示するかを選択します",
  "settings.transcript.compact": "コンパクト",
  "settings.transcript.standard": "標準",
  "settings.transcript.detailed": "詳細",
  "settings.transcript.verbose": "すべて表示",
  "fileOpen.title": "ファイルを開けませんでした",
  "fileOpen.unknown": "このファイルを開けませんでした",
  "message.extraBlock": "追加ブロック",
  "message.systemPrompt": "システムプロンプト",
  "message.systemPromptUpdate": "システムプロンプトの更新",
  "message.toolAdded": "ツール {name} を追加",
  "message.toolRemoved": "ツール {name} を削除",
  "message.toolsAdded": "追加：{names}",
  "message.toolsAddedCount": "{count} 件を追加",
  "message.toolsChanged": "{added} 件追加、{removed} 件削除",
  "message.toolsRemoved": "削除：{names}",
  "message.toolsRemovedCount": "{count} 件を削除",
  "message.toolsUpdated": "ツールを更新",
  "message.contextInjection": "コンテキスト注入",
  "message.contextRecall": "セッション横断の再利用",
  "message.referenceSummary": "参照セッション · {labels}",
  "message.referenceSeparator": "、",
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
  "message.compaction.commandTitle": "compact",
  "message.think": "思考",
  "message.unknownSurface": "不明な surface イベント：{type}",
  "message.unknownBlock": "不明なコンテンツブロック",
  "message.turnProcess.toolCalls.one": "{count} 回のツール呼び出し",
  "message.turnProcess.toolCalls.other": "{count} 回のツール呼び出し",
  "message.turnProcess.messages.one": "{count} 件のメッセージ",
  "message.turnProcess.messages.other": "{count} 件のメッセージ",
  "message.turnProcess.subagents.one": "{count} 件のサブエージェント",
  "message.turnProcess.subagents.other": "{count} 件のサブエージェント",
  "message.turnProcess.thoughtForAWhile": "思考しました",
  "message.turnProcess.separator": " · ",
  "message.stopped": "停止しました",
  "message.branch": "新しい会話で分岐",
  "message.branchUnavailable": "完了したターンの最終メッセージからのみ分岐できます",
  "message.retry.active": "モデルリクエストを再試行中",
  "message.retry.cancelled": "モデルリクエストの再試行をキャンセルしました",
  "message.retry.started": "モデルリクエストを再試行しました",
  "message.retry.scheduled": "モデルリクエストの再試行を待機中",
  "message.retry.status": "{label}（{retry}/{maximum}）· {seconds}秒",
  "message.retry.delay": "再試行までの待機：",
  "message.retry.failure": "失敗の理由：",
  "message.failure.auth": "API キーが無効です",
  "message.accountStopped": "タスクを停止しました",
  "message.failure.accountSignedOut": "DeepSeek からサインアウトしたため停止しました。",
  "message.failure.accountSignInRequired":
    "DeepSeek にサインインし、リクエスト先がアカウント認証に対応していることを確認してください。",
  "message.failure.quota": "リクエストのクォータを使い切りました。",
  "message.turnError": "このターンの実行に失敗しました",
  "message.maxTokens": "出力トークン上限に達しました",
  "message.maxTokens.hint":
    "回答が途中で打ち切られました。これまでの出力は会話に保持されています。「続けて」と送信すると、モデルが続きを出力します。",
  "message.tokensPerSecond": "{tps} tok/s",
  "message.turnUsage.title": "このターンの使用量",
  "message.turnUsage.consumed": "使用量 {total}",
  "message.turnUsage.model": "提供元 / モデル",
  "message.turnUsage.cacheHit": "キャッシュヒット",
  "message.turnUsage.input": "未キャッシュ入力",
  "message.turnUsage.cacheRead": "キャッシュ読み取り",
  "message.turnUsage.cacheWrite": "キャッシュ書き込み",
  "message.turnUsage.output": "出力",
  "message.turnUsage.reasoning": "（うち推論 {tokens}）",
  "message.turnUsage.count": "{count} tok",
  "duration.secondUnit": "秒",
  "duration.minuteUnit": "分",
  "duration.hourUnit": "時間",
  "command.running": "実行中",
  "command.failed": "コマンド失敗",
  "command.done": "完了",
  "command.title": "コマンド",
  "row.running": "実行中",
  "row.failed": "失敗",
  "json.truncated": " 以下は省略（全 {total} 文字）",
  "clock.md": "{m}月{d}日",
  "clock.ymd": "{y}年{m}月{d}日",
};

const command: LocaleDictOf<"command"> = {
  "label.compact": "圧縮",
  "label.export": "エクスポート",
  "label.feedback": "フィードバック",
  "label.goal": "目標",
  "label.permission": "権限",
  "label.plan": "プラン",
  "section.add": "追加",
  "section.commands": "コマンド",
  "token.compact": "compact",
  "token.export": "export",
  "token.feedback": "feedback",
  "token.goal": "goal",
  "token.permission": "permission",
  "token.plan": "plan",
  "description.compact": "これまでの会話履歴を圧縮します",
  "description.export": "現在のセッションログを ZIP としてダウンロードします",
  "description.feedback": "このセッションについてのフィードバックを送ります",
  "description.goal": "長期実行タスクの目標を設定・確認します",
  "description.permission": "権限プリセットを切り替えます（サンドボックスモードと承認ポリシー）",
  "description.plan": "プランモードを切り替えます",
  "search.placeholder": "検索",
  "search.aria": "オプションを絞り込み",
  "status.loading": "オプションを読み込み中",
  "status.applying": "適用中",
  "status.empty": "オプションなし",
  "overlay.aria": "/{command} オプション",
  "listbox.aria": "/{command} の一致項目",
  "notice.attachmentsUnsupported":
    "/{command} は添付ファイルを受け付けません。先に取り除いてください",
};
const common: LocaleDictOf<"common"> = {
  ok: "OK",
  cancel: "キャンセル",
  close: "閉じる",
  copy: "コピー",
  copied: "コピーしました",
  "copy.failed": "コピーに失敗しました",
  "copy.value": "値をコピー",
  "copy.json": "JSON をコピー",
  "copy.path": "プロパティのパスをコピー",
  "copy.prettyJson": "整形 JSON をコピー",
  "copy.compactJson": "コンパクト JSON をコピー",
  "copy.optionsHint": "{action}。右クリックでコピー形式を選択",
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
  "brand.localBuild": "DSH ローカルビルド",
  unknown: "不明",
  none: "なし",
  truncated: "省略されています",
  "codeBlock.title": "コードブロック",
  "codeBlock.wrap": "行を折り返す",
  "codeBlock.unwrap": "行を折り返さない",
  "workspace.defaultName": "デフォルトワークスペース",
  "json.label": "JSON",
  "markdown.footnotes": "脚注",
  "markdown.truncatedCharacters": "… 以下は省略（全 {total} 文字）",
  "number.thousand": "{value}K",
  "number.million": "{value}M",
};

const conversation: LocaleDictOf<"conversation"> = {
  "shortcut.newline": "改行",
  "shortcut.complementary": "キュー追加 / 割り込み送信のもう一方の動作を実行",
  "shortcut.slash": "コマンドメニューを開く",
  "shortcut.mention": "参照メニューを開く",
  "hint.plan": "タスクを記述してプランを生成",
  "hint.goal": "目標を入力すると、エージェントが継続的に実行します",
  "hint.goal.active":
    "目標を実行中です。edit で編集 / pause で一時停止 / resume で再開 / clear でクリア",
  "placeholder.plan": "タスクを記述してプランを生成",
  "placeholder.default": "メッセージの送信やタスク実行、/ コマンド、@ ファイルやセッション",
  "placeholder.unavailable": "このセッションは利用できません",
  "placeholder.parentOffline":
    "親セッションがオフラインのため送信できません。実行中の処理は停止できます",
  "placeholder.hero": "作りたいものを入力、/ コマンド、@ ファイルやセッション",
  "placeholder.workspace": "ワークスペースを選択して開始",
  "placeholder.steerQueue": "Cmd/Ctrl+Enter で保留中のメッセージをすべて割り込み送信",
  "input.commands": "ファイルを追加、またはコマンドを実行",
  "input.file": "ファイル",
  "input.stop": "生成を停止",
  "input.send": "メッセージを送信",
  "input.send.queue": "キューに追加",
  "input.send.steer": "割り込み送信",
  "attachment.pending": "添付待ちのファイル",
  "attachment.scrollLeft": "添付ファイルを左へスクロール",
  "attachment.scrollRight": "添付ファイルを右へスクロール",
  "attachment.dropTitle": "ファイルや画像をここにドラッグして追加",
  "attachment.dropDesc": "画像の制限：最大 {count} 枚、各 {size}",
  "attachment.dropBlocked": "現在はファイルや画像を追加できません",
  "attachment.directoryDesktopOnly":
    "フォルダーの追加はデスクトップアプリでのみ可能です。ブラウザーでは個別のファイルを追加してください",
  "attachment.pathUnavailable":
    "フォルダーのパスを取得できませんでした。もう一度ドラッグしてください",
  "attachment.pathUnsupported":
    "パスに参照できない文字が含まれています。名前を変更して再試行してください",
  "image.pending": "送信待ちの画像",
  "image.openOriginal": "元画像を表示",
  "image.openOriginalLabel": "{label}、クリックして元画像を表示",
  "image.remove": "画像 {name} を削除",
  "image.original": "元画像",
  "image.label": "画像",
  "image.loadFailed": "画像の読み込みに失敗しました。クリックして再試行",
  "image.loading": "画像を読み込み中",
  "image.preview": "元画像プレビュー",
  "image.closePreview": "元画像プレビューを閉じる",
  "image.unsupportedType": "対応している画像形式は PNG、JPG、WebP、GIF のみです",
  "image.tooMany": "メッセージ 1 件につき画像は {count} 枚までです",
  "image.fileTooLarge": "画像 1 枚のサイズは {size} 以下にしてください",
  "image.totalTooLarge": "画像の合計サイズが {size} を超えています。一部を削除してください",
  "image.tooManyPixels": "画像の解像度が大きすぎます。圧縮してから再試行してください",
  "image.dimensionTooLarge":
    "画像の幅と高さはそれぞれ {size}px 以内にしてください。縮小してから再試行してください",
  "image.modelUnsupported":
    "現在のモデルは画像に対応していません。画像対応のモデルに切り替えてください",
  "image.sendFailed":
    "画像の送信に失敗しました（{reason}）。画像を再度追加してから送信してください",
  "file.pending": "送信待ちのファイル",
  "file.remove": "ファイル {name} を削除",
  "file.uploading": "アップロード中…",
  "file.uploadFailed": "アップロードに失敗しました。クリックで再試行",
  "file.retry": "{name} のアップロードを再試行",
  "file.stillUploading": "ファイルをアップロード中です。完了してから送信してください",
  "file.sessionUnavailable": "セッションが利用できないため、ファイルをアップロードできません",
  "file.notStaged": "ファイルのアップロードが完了していません。追加し直してください",
  "file.label": "ファイル",
  "context.aria": "コンテキスト使用量 {percent}",
  "context.used": "コンテキスト使用量",
  "context.system": "システムプロンプト",
  "context.tools": "ツール定義",
  "context.messages": "メッセージ",
  "settings.enter.title": "実行中の送信動作",
  "settings.enter.description":
    "エージェント実行中の Enter キーと送信ボタンの動作。Cmd/Ctrl+Enter はもう一方の動作になります",
  "settings.enter.queue": "キューに追加",
  "settings.enter.steer": "割り込み送信",
  "hero.headline": "未知なるものへ",
  "hero.preview": "プレビュー",
  "hero.chooseWorkspace": "ワークスペースを選択",
  "session.hierarchy": "セッション階層",
  "todo.title": "タスク",
  "todo.progress.done": "{done} 完了",
  "todo.progress.active": "{active} 進行中",
  "todo.progress.pending": "{pending} 待機中",
  "todo.status.completed": "完了",
  "todo.status.inProgress": "進行中",
  "todo.status.pending": "待機中",
  "todo.rowTitle": "タスクリストを更新",
  "tool.title.createGoal": "目標を作成",
  "tool.title.getGoal": "目標を表示",
  "tool.title.updateGoal": "目標を更新",
  "tool.preparing.content": "コンテンツを準備中 {kilobytes}KB",
  "tool.title.createSchedule": "スケジュールタスクを作成",
  "tool.title.listSchedules": "スケジュールタスク一覧",
  "tool.title.deleteSchedule": "スケジュールタスクを削除",
  "tool.title.updateSchedule": "スケジュールタスクを更新",
  "detail.state": "状態",
  "detail.todo.completed": "完了",
  "detail.todo.in_progress": "進行中",
  "detail.todo.pending": "待機中",
  "detail.todo.empty": "タスクリストは空です",
  "todo.diff.initial": "初回のリスト",
  "todo.diff.compare": "前回のリストからの変更点",
  "todo.diff.unavailable": "前回のリストは利用できません",
  "todo.diff.noChanges": "リストに変更はありません",
  "todo.diff.added": "{count} 件追加",
  "todo.diff.updated": "{count} 件更新",
  "todo.diff.removed": "{count} 件削除",
  "todo.diff.unchanged": "{count} 件変更なし",
  "todo.diff.addedItem": "追加",
  "todo.diff.updatedItem": "状態が変化",
  "todo.diff.movedItem": "並べ替え",
  "todo.diff.removedItem": "削除",
  "detail.goal.empty": "目標なし",
  "detail.goal.active": "実行中",
  "detail.goal.disarmed": "継続待ち",
  "detail.goal.paused": "一時停止中",
  "detail.goal.blocked": "ブロック中",
  "detail.goal.complete": "完了",
  "detail.goal.rounds": "実行ラウンド",
  "detail.goal.reason": "ブロック原因",
  "detail.days": "{count}日",
  "detail.hours": "{count}時間",
  "detail.minutes": "{count}分",
  "detail.seconds": "{count}秒",
  "detail.schedule.once": "1 回のみ",
  "detail.schedule.every": "{interval} ごと",
  "detail.schedule.when": "実行予定",
  "detail.schedule.frequency": "繰り返し",
  "detail.schedule.scheduled": "実行待ち",
  "detail.schedule.overdue": "期限超過、セッションの再開を待機中",
  "detail.schedule.empty": "スケジュールタスクなし",
  "detail.schedule.deleted": "削除済み",
  "detail.schedule.count": "{count} 件のスケジュールタスク",
  "detail.schedule.daily": "毎日 {time}（{zone}）",
  "detail.schedule.weekly": "毎週 {days} {time}（{zone}）",
  "detail.schedule.cron": "Cron {expression}（{zone}）",
  "detail.weekday.1": "月",
  "detail.weekday.2": "火",
  "detail.weekday.3": "水",
  "detail.weekday.4": "木",
  "detail.weekday.5": "金",
  "detail.weekday.6": "土",
  "detail.weekday.7": "日",
  "detail.weekday.join": "・",
  "tool.title.inspectProviders": "プロバイダーを検査",
  "tool.title.queryRuntime": "ランタイムを照会",
  "tool.title.inspectPlugins": "動的プラグインを検査",
  "tool.title.workflow": "ワークフローを実行",
  "tool.title.ralph": "Ralph ループを実行",
  "tool.title.readEvent": "イベントを読み取り",
  "tool.title.searchEvents": "イベントを検索",
  "tool.title.traceEvent": "イベントをトレース",
  "tool.title.searchSessions": "セッションを検索",
  "tool.title.traceSession": "セッションをトレース",
  "tool.title.listModels": "モデル一覧",
  "tool.title.subagent": "サブエージェントを作成",
  "tool.title.listAgents": "サブエージェント一覧",
  "tool.title.sendMessage": "メッセージを送信",
  "tool.title.interruptAgent": "エージェントを中断",
  "tool.title.listJobs": "バックグラウンドタスク一覧",
  "tool.title.readJob": "タスク出力を読み取り",
  "tool.title.killJob": "バックグラウンドタスクをキャンセル",
  "tool.title.openTerminal": "ターミナルを開く",
  "tool.title.readTerminal": "ターミナルを読み取り",
  "tool.title.listTerminals": "ターミナル一覧",
  "tool.title.signalTerminal": "ターミナルにシグナルを送信",
  "tool.title.closeTerminal": "ターミナルを閉じる",
  "tool.title.lsp": "コードシンボルを検索",
  "tool.title.findDefinition": "定義を検索",
  "tool.title.findReferences": "参照を検索",
  "tool.title.findImplementation": "実装を検索",
  "tool.title.hoverSymbol": "シンボル情報を表示",
  "tool.title.spawnTeammate": "チームメイトを作成",
  "tool.title.createTeamTask": "チームタスクを作成",
  "tool.title.getTeamTask": "チームタスクを読み取り",
  "tool.title.updateTeamTask": "チームタスクを更新",
  "tool.title.listTeamTasks": "チームタスク一覧",
  "tool.title.waitAgent": "サブエージェントを待機",
  "detail.recordedResult": "記録された結果",
  "detail.empty": "結果なし",
  "detail.none": "なし",
  "detail.yes": "はい",
  "detail.no": "いいえ",
  "detail.moreInInspect": "他 {count} 件は「詳細を見る」で確認できます",
  "detail.status.running": "実行中",
  "detail.status.idle": "アイドル",
  "detail.status.ready": "準備完了",
  "detail.status.inactive": "非アクティブ",
  "detail.status.provisioning": "準備中",
  "detail.status.failed": "失敗",
  "detail.status.completed": "完了",
  "detail.status.deleted": "削除済み",
  "detail.status.killed": "キャンセル済み",
  "detail.status.accepted": "受理済み",
  "detail.status.queued": "キュー待ち",
  "detail.status.exited": "終了済み",
  "detail.field.id": "ID",
  "detail.field.revision": "リビジョン",
  "detail.field.platform": "プラットフォーム",
  "detail.field.provider": "提供元",
  "detail.field.model": "モデル",
  "detail.field.role": "ロール",
  "detail.field.context": "コンテキスト",
  "detail.field.owner": "担当者",
  "detail.field.ready": "開始可能",
  "detail.field.dependencies": "依存タスク",
  "detail.field.writeScopes": "書き込みスコープ",
  "detail.field.warnings": "警告",
  "detail.field.diagnostics": "診断",
  "detail.field.methods": "メソッド",
  "detail.field.inputSchema": "入力スキーマ",
  "detail.field.outputSchema": "出力スキーマ",
  "detail.field.currentPackage": "現在のパッケージ",
  "detail.field.nextPackage": "次のパッケージ",
  "detail.field.latestRun": "最近の実行",
  "detail.field.packages": "パッケージ",
  "detail.field.registrations": "登録項目",
  "detail.field.props": "プロパティ",
  "detail.field.data": "データ",
  "detail.field.source": "ソース",
  "detail.field.content": "内容",
  "detail.field.message": "メッセージ",
  "detail.field.messageId": "メッセージ ID",
  "detail.field.root": "ルート",
  "detail.field.pid": "プロセス ID",
  "detail.field.type": "種類",
  "detail.field.time": "時刻",
  "detail.field.seq": "イベント番号",
  "detail.field.turn": "ターン",
  "detail.field.step": "ステップ",
  "detail.field.callId": "呼び出し ID",
  "detail.field.agents": "起動済みエージェント数",
  "detail.field.result": "結果",
  "detail.field.parent": "親",
  "detail.field.depth": "階層",
  "detail.field.exitCode": "終了コード",
  "detail.field.signal": "シグナル",
  "detail.field.previousStatus": "中断前の状態",
  "detail.field.agent": "エージェント ID",
  "detail.field.job": "タスク ID",
  "detail.field.task": "タスク内容",
  "detail.field.processGroup": "プロセスグループ",
  "detail.field.availability": "利用可否",
  "detail.field.bestMatch": "最も関連するイベント",
  "detail.field.target": "対象イベント",
  "detail.field.surface": "記録状態",
  "detail.agents.count": "{count} 個のサブエージェント",
  "detail.jobs.count": "{count} 件のバックグラウンドタスク",
  "detail.terminals.count": "{count} 個のターミナル",
  "detail.tasks.count": "{count} 件のチームタスク",
  "detail.tasks.nextPage": "さらにタスクがあります。次のカーソルは {cursor}",
  "detail.locations.count": "{count} 箇所",
  "detail.location": "{line} 行 {column} 列",
  "detail.receipt.delivered": "メッセージ配信済み",
  "detail.receipt.interrupt": "割り込み要求済み",
  "detail.receipt.started": "開始済み",
  "detail.receipt.cancel": "キャンセル要求済み",
  "detail.receipt.alreadyFinished": "終了済み",
  "detail.receipt.signal": "シグナル送信済み",
  "detail.receipt.closed": "クローズ済み",
  "detail.receipt.closing": "クローズ中",
  "detail.wait.noProgress": "実行中のサブエージェントはありません",
  "detail.wait.title": "サブエージェントの状態",
  "detail.wait.timeout": "待機がタイムアウトしました",
  "detail.wait.changed": "変化を検出",
  "detail.agent.reply": "エージェントの応答",
  "detail.models.title": "利用可能なモデル",
  "detail.output.lines": "{total} 行中 {begin}–{end} 行",
  "detail.output.truncated": "出力は切り詰められています",
  "detail.providers.count": "{count} 個のプロバイダー",
  "detail.plugins.count": "{count} 個の動的プラグイン",
  "detail.workflow.script": "ワークフロースクリプト",
  "detail.ralph.reportedComplete": "ワーカーが完了を報告",
  "detail.ralph.reportedBlocker": "ワーカーがブロックを報告",
  "detail.ralph.limit": "ラウンド上限に達しました",
  "detail.report.nextSteps": "残りの作業",
  "detail.trace.replacedBy": "置換先",
  "detail.trace.replacementChain": "置換チェーン",
  "detail.trace.replaces": "置換対象のイベント",
  "detail.trace.sources": "ソースイベント",
  "detail.trace.derived": "派生イベント",
  "detail.trace.ancestors": "祖先セッション",
  "detail.trace.descendants": "子孫セッション",
  "detail.matches.count": "{count} 件の一致",
  "detail.matches.capped": "結果の上限に達しました。検索範囲を絞るとさらに表示できます",
  "detail.event.neighbors": "前後のイベント",
  "todo.completed": "{done}/{total} 完了",
  "command.attachmentsUnsupported":
    "/{command} は添付ファイルを受け付けません。先に取り除いてください",
  "ask.rowTitle": "質問",
  "ask.waiting": "回答待ち",
  "ask.pending": "継続中、回答可能",
  "ask.pendingDetail": "未回答の質問は、入力欄から引き続き回答できます。",
  "ask.reopen": "回答する",
  "ask.review": "回答を表示",
  "ask.closed": "終了済み",
  "ask.closedDetail": "この質問は終了済みです。結果は下の会話で確認できます。",
  "ask.cancelled": "キャンセル済み",
  "ask.cancelledDetail": "この質問セットは回答の送信前にキャンセルされました。",
  "ask.interrupted": "中断済み",
  "ask.interruptedDetail": "この質問セットは回答の送信前に中断されました。",
  "ask.answered": "{answered}/{total} 回答済み",
  "ask.skipped": "未回答",
  "bash.running": "実行中",
  "bash.failed": "失敗",
  "bash.stopped": "停止済み",
  "row.running": "実行中",
  "row.preparing": "ツール呼び出しを準備中",
  "row.failed": "失敗",
  "row.stopped": "停止済み",
  "row.input": "入力",
  "row.output": "出力",
  "row.inspect": "詳細を見る",
  "tool.title.search": "検索",
  "tool.title.read": "読み取り",
  "tool.title.bash": "Bash",
  "tool.title.write": "書き込み",
  "tool.title.edit": "編集",
  "tool.title.code": "コード",
  "tool.title.generic": "ツール呼び出し",
  "tool.title.inspect": "Cordis 環境を照会",
  "tool.title.runCordis": "Cordis プラグインを実行",
  "tool.title.stopCordis": "Cordis プラグインを停止",
  "tool.title.removeCordis": "Cordis プラグインを削除",
  "tool.title.pwsh": "Pwsh",
  "tool.title.readImage": "画像を読み取り",
  "tool.title.grep": "Grep",
  "tool.title.glob": "Glob",
  "tool.title.webSearch": "検索",
  "tool.title.webFetch": "Web 取得",
  "tool.autoReviewRejected": "自動レビューにより拒否されました",
  "tool.autoReviewNotExecuted": "ツールは実行されませんでした。理由：{reason}",
  "tool.autoReviewReasonFallback": "自動レビューがこの操作を承認しませんでした",
  "diff.collapseAria": "差分を折りたたむ",
  "diff.expandAria": "残り {count} 行の差分を展開",
  "diff.expandRest": "… 残り {count} 行",
  "read.window": "{total} 行中 {shown} 行を表示",
  "read.collapseAria": "内容を折りたたむ",
  "read.expandAria": "残り {count} 行を展開",
  "read.expandRest": "… 残り {count} 行",
  "search.paths": "{shown} 個のパス",
  "search.paths.truncated": "{total} 個のパス中 {shown} 個を表示",
  "search.matches": "{shown} 件の一致 · {files} 個のファイル",
  "search.matches.truncated": "{total} 件の一致中 {shown} 件を表示 · {files} 個のファイル",
  "search.noResults": "結果なし",
  "search.collapseAria": "検索結果を折りたたむ",
  "search.expandAria": "残り {count} 行の検索結果を展開",
  "search.expandRest": "… 残り {count} 行",
  "web.noResults": "結果が見つかりませんでした",
  "web.sourcesTruncated": "ソース一覧は切り詰められています",
  "web.http": "HTTP",
  "web.contentTruncated": "内容は切り詰められています",
  "details.running": "実行中",
  "queue.count": "{n} 件の保留メッセージ",
  "queue.sending": "送信中…",
  "queue.image": "待機中のメッセージ画像",
  "queue.file": "待機中のファイル {name}",
  "queue.edit": "保留メッセージを編集",
  "queue.edit.unsupported": "テキスト以外の内容が含まれているため、編集できません",
  "queue.save": "保留メッセージを保存",
  "queue.cancelEdit": "編集をキャンセル",
  "queue.remove": "保留メッセージを削除",
  "queue.steer": "割り込み送信",
  "queue.steer.unavailable": "実行中のみ割り込み送信できます",
  "error.sessionInUse":
    "このセッションはすでに使用中です。他の DSH インスタンス（dsh web やデスクトップアプリなど）が起動している可能性があります。他の DSH を終了してから再試行してください。",
  "queue.editFailed":
    "編集に失敗しました：このメッセージはすでに送信が始まっている可能性があります。",
  "queue.removeFailed":
    "削除に失敗しました：このメッセージはすでに送信が始まっている可能性があります。",
  "queue.steerFailed": "割り込み送信に失敗しました。再試行してください。",
  "terminal.signal": "シグナル {signal}",
  "terminal.exitCode": "終了コード {code}",
  "terminal.noExitCode": "終了コードなし",
  "terminal.running": "実行中",
  "terminal.failed": "失敗",
  "terminal.done": "完了",
  "terminal.noOutput": "出力なし",
  "terminal.collapseAria": "出力を折りたたむ",
  "terminal.expandAria": "残り {n} 行の出力を展開",
  "terminal.expandRest": "… 残り {n} 行",
  "terminal.sendInput": "（入力を送信）",
  "terminal.session": "ターミナル {sessionId}",
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
  "panel.trigger": "Cordis プラグイン",
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
  "action.inspect": "詳細を見る",
  "render.failedAbdicated": "{slot} のレンダリングに失敗し、デフォルト画面に戻しました：",
  "render.failedHeld": "{slot} のレンダリングに失敗しました：",
  "a11y.defining": "プラグインを定義中",
  "a11y.failed": "定義失敗",
  "a11y.stopped": "定義が中断されました",
  "a11y.preparing": "Cordis ツール呼び出しを準備中",
  "body.source": "プラグインコード",
  "body.hostCode": "Host",
  "body.clientCode": "Client",
  "body.output": "結果",
  "body.copy": "コピー",
  "body.copied": "コピーしました",
};

const deliverables: LocaleDictOf<"deliverables"> = {
  "presented.nativeUnavailable":
    "このファイルには利用可能なホストパスがありません。サイドバーでプレビューしてください",
  "presented.revealError": "ファイルマネージャーで表示できませんでした。再試行してください",
  "presented.directoryError": "親フォルダーを開けませんでした。再試行してください",
  "presented.directoryOpening": "親フォルダーを開いています…",
  "presented.directoryOpened": "親フォルダーを開くよう要求しました",
  "presented.revealed": "ファイルマネージャーでの表示を要求しました",
  "presented.revealing": "ファイルマネージャーに表示しています…",
  "presented.unavailable":
    "このホストには外部アプリでファイルやフォルダーを開けるデスクトップがありません。ファイルはサイドバーでプレビューできます。",
  "presented.retry": "再試行",
  "presented.hostError": "ホストのデスクトップ情報を読み取れませんでした",
  "presented.preview": "サイドバーでプレビュー",
  "presented.previewButton": "{name} をサイドバーで開く",
  "presented.previewCard": "{name} をサイドバーでプレビュー",
  "presented.all": "すべての {count} 個のファイル",
  "presented.expandAria": "提示された {count} 個のファイルをすべて表示",
  "presented.collapse": "折りたたむ",
  "presented.collapseAria": "提示されたファイル一覧を折りたたむ",
  "presented.opening": "開いています…",
  "presented.opened": "開くことを要求しました",
  "presented.error": "開けませんでした。クリックで再試行",
  "presented.file": "ファイル",
  "row.title": "ファイルを提示",
  "row.running": "提示中",
  "row.preparing": "提示を準備中",
  "row.ok": "提示済み",
  "row.error": "提示に失敗",
  "row.stopped": "中断済み",
  "row.inspect": "呼び出しを見る",
  "changes.title": "{count} 個のファイルを編集",
  "changes.singleTitle": "{name} を編集",
  "changes.added": "+{count}",
  "changes.deleted": "-{count}",
  "changes.binary": "バイナリ",
  "changes.openReview": "このターンの変更をサイドバーで確認",
  "changes.all": "すべての {count} 個のファイル",
  "changes.expandAria": "変更のあった {count} 個のファイルをすべて表示",
  "changes.collapse": "折りたたむ",
  "changes.collapseAria": "変更ファイルの一覧を折りたたむ",
  "changes.oversized": "サイズ超過",
  "changes.viewDiff": "{name} の変更を表示",
  "review.title": "レビュー · ターン {turn}",
  "review.selectFile": "レビューするファイルを選択",
  "review.split": "左右並べて表示に切り替え",
  "review.unified": "1 列表示に切り替え",
  "review.splitAria": "左右並べて表示",
  "review.wrap": "自動折り返しをオン",
  "review.nowrap": "自動折り返しをオフ",
  "review.wrapAria": "折り返し",
  "review.openFile": "ファイル全体をサイドバーで開く",
  "review.openFileAria": "{name} をサイドバーで開く",
  "diff.loading": "変更を読み込み中…",
  "diff.missing": "このターンの変更内容はもう利用できません",
  "diff.error": "変更を読み込めませんでした",
  "diff.binary": "バイナリファイルのため、変更を表示できません",
  "diff.oversized": "ファイルが大きすぎるため、変更を表示できません",
  "diff.created": "このターンで新規作成",
  "diff.deleted": "このターンで削除",
  "diff.unchanged": "左右の内容は同じです",
  "diff.coarse": "行の比較がタイムアウトしたため、ファイル全体の置き換えとして表示しています",
  "diff.truncated": "先頭の {count} 行のみ表示しています",
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

const documentHtml: Record<DocumentHtmlKey, string> = {
  title: "HTML",
  frame: "HTML ドキュメントのプレビュー",
  loading: "ドキュメントを描画中…",
  failed: "この HTML ドキュメントはプレビューできませんでした。",
};

const documentMarkdown: Record<DocumentMarkdownKey, string> = {
  "viewer.label": "Markdown",
  "code.copy": "コピー",
  "code.copied": "コピーしました",
  footnotes: "脚注",
};

const feedback: LocaleDictOf<"feedback"> = {
  "action.like": "良い回答",
  "action.likeActive": "評価を取り消す",
  "action.dislike": "問題のある回答",
  "action.dislikeActive": "評価を取り消す",
  "dialog.title": "フィードバックを送信",
  "dialog.categories": "フィードバックのカテゴリー",
  "dialog.detail": "フィードバックの詳細",
  "dialog.hint": "改善に役立つ詳細を書いてください。送信内容には現在の会話ログが含まれます",
  "category.task-result": "タスクの結果",
  "category.instruction-following": "指示の理解と追従",
  "category.product-interaction": "製品の機能と操作",
  "category.service-stability": "安定性と速度",
  "category.resource-cost": "リソース使用量とコスト",
  "category.security-privacy-permission": "セキュリティ・プライバシー・権限",
  "category.other": "その他",
  "toast.recorded": "フィードバックありがとうございます",
  "error.conflict": "このフィードバックは別の場所で変更されました。最新の状態を表示しています",
  "error.load": "フィードバックの読み込みに失敗しました",
  "error.generic": "フィードバックの保存に失敗しました",
  "error.noteTooLarge": "説明が長すぎます。短くしてから再度送信してください",
};

const goal: LocaleDictOf<"goal"> = {
  "phase.active": "進行中の目標",
  "phase.active.disarmed": "未実行の目標",
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
  "section.live": "実行中",
  "section.settledCount": "終了済み {count}",
  "section.clear": "クリア",
  "row.expandAria": "{label} のリアルタイム出力を表示",
  "row.collapseAria": "{label} のリアルタイム出力を折りたたむ",
  "kill.stop": "タスク {label} を停止",
  "kill.confirm": "もう一度クリックして確定",
  "kill.confirmAction": "停止を確定",
  "kill.failed": "停止に失敗しました",
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
  "output.gap": "… 以前の出力は破棄 …",
  "output.error": "リアルタイム出力ストリームが中断されました：{error}",
  "terminal.signal": "シグナル {signal}",
  "terminal.exitCode": "終了コード {code}",
  "terminal.noExitCode": "終了コードなし",
  "terminal.running": "実行中",
  "terminal.failed": "失敗",
  "terminal.done": "完了",
  "terminal.copy": "コピー",
  "terminal.copied": "コピーしました",
  "terminal.noOutput": "（出力なし）",
  "terminal.collapse": "折りたたむ",
  "terminal.collapseAria": "出力を折りたたむ",
  "terminal.expand": "残り {n} 行を表示",
  "terminal.expandAria": "折りたたまれた {n} 行の出力を展開",
};

const model: LocaleDictOf<"model"> = {
  "command.description": "この会話で使用するモデルを選択",
  "option.loadError": "カタログの読み込みに失敗しました：{message}",
  "command.label": "モデル",
  "provider.account": "DeepSeek アカウント",
  "search.placeholder": "モデルを検索…",
  "search.clear": "検索をクリア",
  "search.empty": "一致するモデルがありません。",
  "trigger.fallback": "モデルを選択",
  "trigger.loading": "モデルを読み込み中…",
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
  "error.sessionInUse":
    "このセッションはすでに使用中です。他の DSH インスタンス（dsh web やデスクトップアプリなど）が起動している可能性があります。他の DSH を終了してから再試行してください。",
  "empty.efforts": "このモデルには思考レベルが設定されていません。",
};

const openInApp: LocaleDictOf<"open-in-app"> = {
  "open.title": "{app} で開く",
  "open.tooltip": "ローカルで開く",
  "path.open": "開く",
  "path.more": "他の開き方",
  "path.appDefault": "{app}（デフォルト）",
  "path.appsError": "アプリケーション一覧を取得できませんでした",
  "path.openError": "開けませんでした。再試行してください。",
  "path.reveal": "ファイルの場所を表示",
  "path.revealError": "ファイルの場所を表示できませんでした。再試行してください。",
  "shortcut.busy": "ワークスペースを開いています",
  "shortcut.unavailable": "現在のワークスペースまたはローカルアプリが利用できません",
  "app.cursor": "Cursor",
  "app.vscode": "VS Code",
  "app.vscodeinsiders": "VS Code Insiders",
  "app.windsurf": "Windsurf",
  "app.zed": "Zed",
  "app.sublimetext": "Sublime Text",
  "app.xcode": "Xcode",
  "app.androidstudio": "Android Studio",
  "app.intellij": "IntelliJ IDEA",
  "app.pycharm": "PyCharm",
  "app.webstorm": "WebStorm",
  "app.phpstorm": "PhpStorm",
  "app.goland": "GoLand",
  "app.rider": "Rider",
  "app.rustrover": "RustRover",
  "app.fork": "Fork",
  "app.sourcetree": "Sourcetree",
  "app.github": "GitHub Desktop",
  "app.tower": "Tower",
  "app.gitkraken": "GitKraken",
  "app.smartgit": "SmartGit",
  "app.sublimemerge": "Sublime Merge",
  "app.ghostty": "Ghostty",
  "app.warp": "Warp",
  "app.iterm": "iTerm2",
  "app.kitty": "kitty",
  "app.windowsterminal": "Windows ターミナル",
  "app.gitbash": "Git Bash",
  "app.gnometerminal": "GNOME 端末",
  "app.konsole": "Konsole",
  "app.finder": "Finder",
  "app.explorer": "エクスプローラー",
  "app.filemanager": "ファイル",
  "app.terminal": "ターミナル",
};

const permissionAccess: Record<PermissionAccessKey, string> = {
  mode: "アクセスモード、現在：{name}",
  close: "閉じる",
  "preset.readOnly": "閲覧のみ",
  "preset.workspaceWrite": "ワークスペース内の書き込み",
  "preset.fullAccess": "フルアクセス",
  "confirm.title": "フルアクセスを有効にしますか？",
  "confirm.description":
    "フルアクセスを有効にすると、エージェントの確認ステップが減り、機密性の高い操作、ファイル変更、外部コマンドを含むより多くの操作を直接実行できるようになります。現在のタスクを信頼できる場合にのみ使用してください。",
  "confirm.acknowledge": "リスクを理解した上で続行します",
  "confirm.cancel": "キャンセル",
  "confirm.enable": "フルアクセスを有効化",
  "auto.label": "自動レビュー",
  "auto.badge": "実験",
  "auto.description":
    "サンドボックスなしで実行します。ネイティブツール呼び出しと PTC 内部呼び出しのたびに、同じモデルによる実験的な審査が行われます。",
  "auto.confirm.title": "自動レビュー（実験的）を有効にしますか？",
  "auto.confirm.description":
    "自動レビューはサンドボックスなしで実行されます。ネイティブツール呼び出しと PTC 内部呼び出しの前に、現在のエージェントと同じモデルが実行可否を審査し、拒否された呼び出しは手動で許可または拒否します。この機能は実験的であり、誤った許可や拒否が発生する可能性があるほか、追加のトークンを消費します。",
  "auto.confirm.acknowledge": "リスクを理解した上で続行します",
  "auto.confirm.enable": "自動レビューを有効化",
};

const pluginManager: LocaleDictOf<"pluginManager"> = {
  panel: "プラグイン",
  title: "プラグイン",
  intro: "プラグインのインストール、有効化、設定",
  infoLabel: "プラグインについて",
  infoDescription:
    "ここで公式プラグインを設定し、その他のプラグインをインストール・管理します。内蔵プラグインの一覧と実行状態は「設定 → 内蔵プラグイン」で確認できます。",
  loading: "プラグインを読み込み中…",
  error: "ネットワークの問題により、すべてのプラグインを読み込めなかった可能性があります",
  unavailable:
    "このデプロイは管理可能な profile なしで実行されているため、ここでプラグインをインストールまたは切り替えることはできません。",
  retry: "再試行",
  refresh: "更新",
  refreshError: "更新に失敗しました。再試行してください",
  empty: "まだインストールされたプラグインはありません。",
  addPlugin: "プラグインを追加",
  restartNotice: "変更は次回の起動時に有効になります",
  overriddenNotice:
    "{name} は保存されましたが、より優先度の高い設定が上書きしているため、現在は無効です",
  bundlesTitle: "インストール済み",
  officialTitle: "公式",
  statusProblem: "異常",
  statusBeta: "実験的",
  reasonLabel: "理由",
  metadataError: "パッケージメタデータエラー：{error}",
  versionTag: "v{version}",
  partsLabel: "コンポーネント",
  partsEmpty: "このプラグインパックにはコンポーネントが含まれていません。",
  partsCountTotal: "合計 {count} 件",
  partsCountRunning: "{count} 件が実行中",
  partsCountOff: "{count} 件が無効",
  partOff: "無効",
  partsCountFailed: "{count} 件が失敗",
  partsFilter: "コンポーネントを絞り込み",
  partsFilterEmpty: "一致するコンポーネントはありません。",
  partToggle: "コンポーネント {name} を有効化",
  rowPhasePending: "依存関係を待機中",
  rowPhaseLoading: "読み込み中",
  rowPhaseActive: "実行中",
  rowPhaseFailed: "異常",
  rowPhaseUnloading: "アンロード中",
  enableToggle: "{name} を有効化",
  openDetail: "{name} を表示",
  backToList: "プラグイン一覧に戻る",
  crumbRoot: "プラグイン",
  backToPackage: "{name} に戻る",
  configureRow: "{name} を設定",
  rowStateIdle: "未実行",
  uninstall: "アンインストール",
  uninstallLabel: "{name} をアンインストール",
  installTitle: "プラグインを追加",
  installDescription:
    "プラグインのパッケージ名、GitHub リポジトリのアドレス、またはローカルディレクトリのパスを入力してください。",
  installSpecLabel: "パッケージ名またはアドレス",
  installSpecPlaceholder: "例：dsh-plugin-whale-pet",
  installGuideToggle: "インストールガイドと例",
  installGuideHide: "ガイドを隠す",
  installGuideIdTitle: "プラグインの npm パッケージ名を入力",
  installGuideIdExample: "dsh-plugin-whale-pet",
  installGuideIdHint:
    "プラグインのパッケージ名は npm パッケージ名です（例：dsh-xxx や @author/plugin）。コミュニティプラグインの README のインストールコマンドで、dsh plugin add や pnpm add の後に続く部分です。",
  installGuideExampleLabel: "例：",
  installGitTemplateHint: "実際の Git リポジトリのアドレスに置き換えてください",
  installPathTemplateHint: "実際のローカルプラグインディレクトリのパスに置き換えてください",
  installGuideFill: "例を使用",
  installGuideFillAria: "例 {example} を使用",
  installGuideSafety:
    "信頼できるプラグインのみをインストールしてください。プラグインは現在のユーザーの権限で実行され、DeepSeek Harness を破損させたりデータを漏洩させたりするおそれがあります。",
  installUpgradeNotice:
    "インストール済みのプラグインは現時点で自動更新されません。アップグレードするには、一度アンインストールしてから新しいバージョンをインストールしてください。今後のリリースでアップグレード体験を改善していきます。",
  registryToggle: "レジストリ",
  registryLegend: "プラグインのダウンロード元となる npm レジストリ",
  registryDefault: "デフォルトのレジストリ",
  registryOfficial: "npm 公式レジストリ",
  registryNpmmirror: "中国本土のミラー",
  registryCustom: "カスタムアドレス",
  registryCustomPlaceholder: "https://npm.example.com/",
  registryCustomHint:
    "http:// または https:// で始まる社内またはプライベートの npm レジストリアドレスを入力してください。ログインが必要な場合は、認証情報をこのマシンの ~/.npmrc に保存してください。",
  registryCustomInvalid: "http:// または https:// で始まるアドレスを入力してください",
  registryListSeparator: "、",
  sentenceSeparator: "",
  installRun: "インストール",
  installChecking: "確認中…",
  installProblemInvalid: "インストール可能なパッケージ名またはアドレスではありません：{reason}",
  installProblemInstalled:
    "このプラグインは既にインストールされています。アップグレードするには、アンインストールしてから再インストールしてください",
  installProblemShipped:
    "このプラグインは DSH に同梱されています。DSH をアップグレードすると更新されます",
  installProblemNotFound: "該当するプラグインが見つかりません",
  installProblemNotPackage: "そのパスは存在しないか、有効なプラグインパッケージではありません",
  installProblemNotBundle:
    "このパッケージはバンドルを宣言していないため、プラグインとしてインストールできません：{reason}",
  installProblemNetwork:
    "プラグインのレジストリに接続できませんでした。ネットワークを確認して再試行してください",
  installProblemNetworkAll:
    "どのレジストリにも接続できませんでした（試行：{registries}）。ネットワークまたはプロキシ設定を確認するか、レジストリを変更してください",
  installProblemUnknown: "プラグインの情報を取得できませんでした：{reason}",
  installingTitle: "プラグインをインストール中…",
  installedTitle: "インストール済み",
  installFailedTitle: "プラグインをインストールできませんでした",
  installGithubFailedTitle: "GitHub にアクセスできません",
  installGithubTimeoutTitle: "GitHub への接続がタイムアウトしました",
  installGithubFailedDescription: "別のインストール元を試してください。",
  installUseGithubMirror: "中国本土のミラーを使用",
  installTryAnotherWay: "別の方法を試す",
  installPackageLabel: "プラグインのパッケージ名",
  installEdit: "編集",
  installEditAria: "編集に戻る",
  installCancelAndEdit: "インストールをキャンセルして編集に戻る",
  installApplyingCancellationError:
    "キャンセルは確認されませんでした。インストールは適用中のため、結果をお待ちください。{reason}",
  installReconcile: "インストール状態を確認",
  installUnknownTitle: "インストール結果を取得できません",
  installUnknownDescription:
    "Host にこのリクエスト ID の進行中のインストールがありません。プラグイン一覧を確認してから再試行してください。",
  installResultUnconfirmed:
    "インストール結果を受信できませんでした。インストール状態を確認してください。{reason}",
  installAwaitingAcceptance:
    "Host がインストールを受け付けるのを待っています。確認後、キャンセルは自動的に再試行されます。",
  installBackgroundUnknown: "インストール結果を取得できません。プラグイン一覧を確認してください。",
  installCancel: "インストールをキャンセル",
  installCloseCancels: "インストールをキャンセルして閉じる",
  installViewTask: "インストールを表示",
  installUnconfirmedTitle: "インストール状態は未確認",
  installBackgroundDone: "インストールが完了しました。詳細を表示します。",
  installBackgroundFailed: "インストールに失敗しました。詳細を表示します。",
  installBackgroundUnconfirmed:
    "インストール状態は未確認です。詳細はインストールを表示して確認してください。",
  installBackgroundApplying:
    "インストールは適用中のためキャンセルできません。進行状況を表示します。",
  installStarting: "インストールを準備中…",
  installCancelling: "インストールを停止中…",
  installApplying: "設定を適用中。しばらくお待ちください…",
  installCancelledShort: "キャンセル済み",
  installCancelled:
    "インストールはキャンセルされました。プラグインは有効化されておらず、ダウンロードされたファイルが残る場合があります",
  installCancelUnconfirmed:
    "インストールの停止は確認されていません。キャンセルを再試行するか、インストール結果をお待ちください。{reason}",
  installEnableNow: "今すぐ有効化",
  installDetailsShow: "インストールの詳細を表示",
  installDetailsHide: "インストールの詳細を隠す",
  installVersion: "バージョン {version}",
  installSubjectPath: "ローカルディレクトリ",
  installSubjectGit: "Git リポジトリ",
  installSubjectTarball: "Tarball",
  installLocation: "インストール先：{dir}",
  installRetry: "再試行",
  installChangeRegistry: "レジストリを変更",
  installAttempt:
    "{previous} でパッケージを取得できなかったため、{registry} で再試行しています（レジストリ {index} / {total}）",
  installAttemptBadge: "試行 {index} · {registry}",
  installFailureNetwork: "ネットワーク接続に失敗しました",
  installFailureNetworkAll:
    "どのレジストリにも接続できませんでした（試行：{registries}）。ネットワークまたはプロキシ設定を確認するか、レジストリを変更して再試行してください。",
  installFailureNetworkHost:
    "{host} に接続できません。GitHub のアドレスや .tgz リンクはレジストリを経由せず、このマシンから直接（またはプロキシ経由で）アクセスする必要があります。プラグインが npm にも公開されている場合は、パッケージ名を入力してください。",
  installFailureNotFound: "該当するプラグインが見つかりません",
  installFailureNoMatchingVersion: "リクエストに一致するバージョンがありません",
  installFailureDiskFull: "ディスク容量が不足しているため、インストールを停止しました",
  installFailurePermission: "書き込み権限がないため、プラグインをインストールできません",
  installFailureBuildBlocked:
    "続行するには、依存関係のインストールスクリプトの実行を許可する必要があります",
  installFailureBuildBlockedManual:
    "pnpm がインストールスクリプトをブロックしました。pnpm-workspace.yaml の allowBuilds で許可してから再試行してください",
  installFailureIntegrity: "ダウンロードしたパッケージの整合性チェックに失敗しました",
  installFailureTimeout: "インストールがタイムアウトしました",
  installFailurePnpmMissing: "pnpm が見つからないため、インストールできません",
  installFailureGeneric: "インストール中に問題が発生しました。詳細に原因が表示されます",
  terminalRunning: "実行中",
  terminalFailed: "失敗",
  terminalDone: "完了",
  terminalCopy: "コピー",
  terminalCopied: "コピーしました",
  terminalNoOutput: "出力なし",
  terminalCollapseAria: "出力を折りたたむ",
  terminalCollapse: "折りたたむ",
  terminalExpandAria: "残り {n} 行の出力を展開",
  terminalExpand: "… 残り {n} 行",
  terminalExitCode: "終了コード {code}",
  terminalSignal: "シグナル {signal}",
  terminalNoExitCode: "終了コードなし",
  installDoneNothing: "インストールが完了しました。新しい依存関係はありません。",
  installDoneRestart: "インストールしました。次回の起動時に読み込まれます。",
  installDoneApproved: "{names} のインストールスクリプトを許可しました",
  installApprovalTitle: "インストールスクリプトの許可が必要です",
  installApprovalDescription:
    "これらのパッケージには、pnpm が実行しなかったインストールスクリプトがあります。",
  installApprovalConsequence:
    "許可すると、スクリプトはこのマシンで現在のユーザーの権限で実行され、許可はこの profile に保存されます。",
  installApprovalCaution: "信頼できるパッケージのみ許可してください。",
  installApproveAndRetry: "これらのスクリプトを許可して再試行",
  installClose: "完了",
  close: "閉じる",
  cancel: "キャンセル",
  confirmUninstallTitle: "「{name}」をアンインストールしますか？",
  confirmUninstallDescription:
    "アンインストールすると、このプラグインが提供する機能は使えなくなります。",
  confirmUninstall: "アンインストール",
  failedEnable: "有効化できませんでした：{reason}",
  failedDisable: "無効化できませんでした：{reason}",
  failedUninstall: "アンインストールできませんでした：{reason}",
  failedRowEnable: "コンポーネントを有効化できませんでした：{reason}",
  failedRowDisable: "コンポーネントを無効化できませんでした：{reason}",
  reasonManagementRequired: "プラグイン管理に必要なため、無効化またはアンインストールできません",
  reasonUnaddressable: "現在の profile の patch ではこの項目を一意に特定できません",
  reasonUnknownPlugin: "そのプラグインは存在しません。",
  reasonInvalidSpec: "有効なパッケージ名またはアドレスを入力してください",
  reasonAmbiguousInstall:
    "依存関係の変更から、どのパッケージがインストールされたかを特定できません",
  reasonNotBundle: "このパッケージはバンドルを宣言していないため、プラグインとして管理できません",
  reasonNotRemovable: "このパッケージは現在の profile が所有していないか、プラグイン管理に必要です",
  reasonStopProfile:
    "この profile は HMR なしで実行されています。停止してから dsh plugin でパッケージをアンインストールしてください",
  reasonBundleInUse:
    "他の設定がまだこのバンドルのコンポーネントを使用しています。先に無効化してください",
  reasonStaleApproval:
    "承認待ちのインストールスクリプトが変更されました。再インストールして最新の状態にしてください",
  reasonIncompatibleVersion:
    "{plugin} は DSH {runtime} と互換性がありません（{peers} が必要）。実行するとクラッシュやデータ損失が発生する可能性があります。",
  reasonIncompatibleVersionUnnamed:
    "このプラグインは実行中の DSH バージョンと互換性がなく、実行するとクラッシュやデータ損失が発生する可能性があります。",
  reasonIncompatibleInstall:
    "この DSH と互換性のあるプラグインバージョンをインストールしてください。",
  reasonIncompatibleInstalled:
    "アンインストールして、この DSH と互換性のあるバージョンをインストールしてください。",
  reasonOperationError: "ホストがエラーを報告しました。",
};

const plan: LocaleDictOf<"plan"> = {
  "chip.label": "プラン",
  "chip.on.aria": "プランモードはオンです。押してオフにします",
  "chip.on.title": "プランモードはオン。クリックでオフ（/plan off）",
  "chip.exitFailed": "プランモードから抜けられませんでした",
  "preview.title": "プラン",
  "preview.document": "プラン · Markdown",
  "preview.loading": "プランを読み込み中…",
  "preview.failed": "プランを読み込めませんでした",
  "preview.notFound": "このプランは見つかりませんでした",
  "preview.invalidAddress": "プランのアドレスが無効です",
  "preview.unavailable": "プランプレビューは利用できません",
  "preview.historyUnavailable": "セッション履歴を利用できません",
  "preview.expired":
    "このプランのプレビューは期限切れです。保留中のレビューカードから再度開いてください。",
  "preview.full": "プラン全文を表示",
  "preview.open": "プランをサイドバーで開く",
  "preview.openNamed": "プランを開く：{title}",
  "preview.action": "開く",
};
const question: LocaleDictOf<"question"> = {
  "error.incomplete": "先にこの質問に回答してください。",
  "error.unanswered": "オプションを選択するか、カスタム回答を入力してください。",
  "error.resubmit": "回答が届く前に作業が再開されました。もう一度送信してください。",
  "error.unavailable": "現在送信できません。しばらくしてから再試行してください。",
  "nav.prev": "前の質問",
  "nav.next": "次の質問",
  "nav.minimize": "質問カードを折りたたむ",
  "nav.maximize": "質問カードを展開",
  "nav.cancel": "すべての質問を破棄",
  "nav.close": "パネルを閉じる（ツール呼び出しから再度開けます）",
  "option.recommended": "推奨",
  "custom.placeholder": "回答を入力",
  "action.skip": "スキップ",
  "action.next": "次へ",
  "reply.label": "以前の未回答の質問に回答",
  "reply.open": "質問の詳細を開く",
  "reply.close": "質問の詳細を閉じる",
  "reply.answerLabel": "回答：",
  "reply.skipped": "スキップ済み",
  "review.status": "回答済み",
  "review.skipped": "この質問はスキップされました。",
  "status.sent": "回答を送信しました。パネルを閉じられませんでした。",
  "wait.takeTime": "じっくり回答する",
  "wait.held": "回答するまで待機します",
  "wait.continued": "作業は再開されました。まだ回答できます",
  "wait.countdown": "{seconds} 秒後に作業を再開します",
  "wait.paused": "一時停止中 · 残り {seconds} 秒",
  "plan.header": "プランレビュー",
  "plan.approve": "承認",
  "plan.decline": "拒否",
  "plan.discuss": "修正を依頼",
};

const reference: Record<ReferenceKey, string> = {
  "section.files": "ファイルとフォルダー",
  "section.subagents": "サブエージェント",
  "section.sessions": "セッション",
  "candidate.noCwd": "（作業ディレクトリなし）",
  "crumb.root": "ワークスペース",
  "time.now": "たった今",
  "time.minutes": "{n}分",
  "time.hours": "{n}時間",
  "time.days": "{n}日",
  "time.months": "{n}ヶ月",
  "time.years": "{n}年",
};

const sessionLogDownload: LocaleDictOf<"session-log-download"> = {
  "header.more": "その他の操作",
  "menu.download": "セッションログをダウンロード",
  "menu.feedback": "フィードバック",
  "dialog.preparingTitle": "セッションをエクスポート中",
  "dialog.preparingDescription":
    "現在のセッション、子セッション、添付ファイルを含む ZIP ファイルを準備しています。",
  "dialog.successTitle": "セッションのダウンロードを開始しました",
  "dialog.successDescription": "ブラウザーがセッションの ZIP ファイルをダウンロードしています。",
  "dialog.errorTitle": "セッションのエクスポートに失敗しました",
  "dialog.close": "閉じる",
  "dialog.commandFailed": "セッションのエクスポートを開始できませんでした。",
};
const settings: LocaleDictOf<"settings"> = {
  trigger: "設定",
  title: "設定",
  close: "閉じる",
  "shortcut.open": "設定を開く",
  openDocument: "設定ファイルを開く",
  "openDocument.error": "設定ファイルを開けませんでした",
  "general.nav": "一般",
  "general.currentVersion": "現在のバージョン：{version}",
  "developerTools.title": "コーディングビューを表示",
  "developerTools.description":
    "オンにすると、トレースとこのターンのコード差分を表示し、エージェントプリセットを選択できます",
  "developerTools.error": "保存できませんでした。再試行してください。",
  "connection.error": "接続エラー",
  "connection.connecting": "再接続中",
  "connection.connected": "接続済み",
  "connection.reconnect": "接続エラー。今すぐ再接続",
  "connection.restart": "再接続中です。クリックで今すぐ再接続",
  "desktop.update.available": "アップデート",
  "desktop.update.checking": "アップデートを確認中…",
  "desktop.update.checkFailed":
    "アップデートの確認に失敗しました。しばらくしてから再試行してください。",
  "desktop.update.checkNetworkFailed":
    "アップデートの確認に失敗しました。ネットワーク接続を確認して再試行してください。",
  "desktop.update.progress": "{percent}%",
  "desktop.update.downloadDetail":
    "アップデートをダウンロード中：{percent}%\n対象バージョン：{version}",
  "desktop.update.downloadFailed": "アップデートのダウンロードに失敗しました。再試行してください。",
  "desktop.update.downloadNetworkFailed":
    "アップデートのダウンロードに失敗しました。ネットワーク接続を確認して再試行してください。",
  "desktop.update.verifying": "アップデートファイルを検証中…",
  "desktop.update.ready": "インストールして再起動",
  "desktop.update.installing": "再起動を準備中…",
  "desktop.update.installFailed":
    "アップデートのインストールに失敗しました。しばらくしてから再試行してください。",
  "desktop.update.installNetworkFailed":
    "アップデートのインストールに失敗しました。ネットワーク接続を確認して再試行してください。",
  "desktop.update.stopFailed":
    "タスクを安全に停止できませんでした。アップデートはインストールされていません。しばらくしてから再試行してください。",
  "desktop.update.tasksChanged":
    "新しいタスクが開始されました。タスクを停止してアップデートするか、再度確認してください。",
  "desktop.update.tasksUnavailable":
    "タスクの状態を確認できません。ワークスペースの準備ができてから再度アップデートしてください。",
  "desktop.update.versionDetail": "{label}：{version}",
  "desktop.update.retry": "アップデートを再試行",
};

const settingsAgentPreset: LocaleDictOf<"settings.agentPreset"> = {
  nav: "プリセット",
  seatHint: "新規タスクで使用するエージェントプリセットを選択",
  headerHint: "このタスクのエージェントプリセット（開始時に確定）",
  sectionIntro:
    "エージェントのツールと動作方式を選択します。日常のタスクには「標準モード」、DSH の機能を拡張するには「クリエイターモード」をご利用ください。",
  setDefault: "新規タスクのデフォルトに設定",
  view: "設定を表示",
  inUse: "デフォルト",
  builtInGroup: "内蔵",
  customGroup: "カスタム",
  noDescription: "説明はありません。",
  brokenBadge: "読み込み失敗",
  switchRefused: "「{name}」に切り替えられませんでした：{reason}",
  presetStandardName: "標準モード",
  presetStandardDescription:
    "コードやファイル、各種資料を扱います。ほとんどのタスクに対応し、検索・編集・ターミナルなどのツールを必要に応じて使用します。",
  presetPtcName: "PTC モード",
  presetPtcDescription:
    "標準モードの全機能を含みます。ツールを一括で呼び出し、結果の絞り込み・整理・重複排除・集計・要約を行うタスクに向いています。",
  presetMinimalName: "ミニマルモード",
  presetMinimalDescription:
    "ターミナルツールのみでタスクを実行します。基礎的な性能のテストや比較に適しています。",
  presetCordisName: "クリエイターモード",
  presetCordisDescription:
    "会話で DSH をカスタマイズします。新機能や UI を追加するプラグインの作成や、ツールとプロンプトを組み合わせた独自モードの作成が行えます。",
  creatorDraft: "エージェントと一緒にプリセットモードを作成",
  close: "閉じる",
  howToUse: "使い方",
  modeExplanation: "モードの詳細",
  guideSections: "ガイドの内容",
  guideExampleTask: "サンプルタスク",
  guideCopy: "コピー",
  guideCopied: "コピーしました",
  guideFootnotes: "脚注",
  guideStandardIntro:
    "新規タスクを開始するときに標準モードを選択します。達成したいこと、関連ファイルの場所、結果の確認方法を伝えてください。",
  guideStandardExplanation:
    "### 仕組み\n\nエージェントはツールを直接呼び出して、ファイルの読み書き、検索、ターミナルコマンドの実行を行います。Skills、プラン、目標、サブエージェント、ワークフロー、コンテキスト圧縮を含みます。\n\n### 選ぶタイミング\n\n日常的なコーディング、ファイル操作、調査はここから始めてください。標準モードでもスクリプトを書いてファイルを一括処理できます。PTC はツール呼び出しの組み立て方を変えるものであり、一括処理に必須ではありません。",
  guideStandardUsage:
    "### バグを修正する\n\n> 検索フォームを 2 回連続で送信すると結果が消える原因を突き止め、修正して関連テストを実行してください。原因と変更内容を説明してください。\n\n期待される成果：コードの修正、関連テストの結果、原因の説明。\n\n### プロジェクトノートを整理する\n\n> このプロジェクトの Markdown ノートを読み、決定事項と未解決の疑問点をソースファイルへのリンク付きでまとめてください。\n\n期待される成果：元のノートと照合できる、参照付きの要約。",
  guidePtcIntro:
    "新規タスクを開始するときに PTC モードを選択します。入力ファイル、処理ルール、出力形式を指定してください。コードはエージェントが作成します。",
  guidePtcExplanation:
    "### ツールの呼び出し方\n\nPTC は Programmatic Tool Calling の略です。この内蔵プリセットでは、エージェントが run_code を使って TypeScript プログラムを書き、生成された SDK 経由でツールを呼び出します。プログラムではループ、条件分岐、エラー処理、必要に応じた並行呼び出しを使えます。\n\n### モデルに渡るもの\n\nツールの結果はまずプログラムに渡され、絞り込みと結合が行われます。モデルが受け取るのはプログラムが出力・返却した内容で、画像の結果は別途添付されます。ネストしたツール呼び出しも記録され、ツール権限の対象になります。\n\n### 標準モードとの比較\n\nどちらのモードでもコーディングと一括処理タスクに対応できます。標準モードは個々のツールを直接扱い、PTC はツール呼び出しをコードとして組み立てます。現在の PTC プリセットではワークフローツールは無効のままです。速度とトークン消費は、タスクやプログラムが結果をどう処理するかによって変わります。",
  guidePtcUsage:
    "### 設定ファイル一式をチェックする\n\n> configs/ 内のすべての JSON ファイルをチェックしてください。schema.json に照らして、必須フィールドの欠落と無効な値を列挙してください。問題 1 件ごとに 1 行の CSV を保存してください。読み取れないファイルもレポートに含め、残りはチェックを続けてください。元のファイルは変更しないでください。\n\n期待される成果：問題の要約と CSV レポート。プログラムは同じチェックを繰り返し、個々の失敗を処理して結果をまとめられます。\n\n### エラーログを要約する\n\n> logs/ 内のログファイルを分析してください。エラーをサービス別・エラー種別にグループ化し、最も多い 10 グループと各グループの例 1 件を表示してください。全件数を CSV に保存してください。\n\n期待される成果：上位エラーグループと全件数の集計表。中間データは、要約がモデルに渡る前にプログラム内で集計できます。",
  guideMinimalIntro:
    "新規タスクを開始するときにミニマルモードを選択します。比較測定では、モデル、権限、入力、ワークスペースの初期状態を各実行で揃えてください。",
  guideMinimalExplanation:
    "### 含まれるもの\n\n永続シェルツール 1 つと、固定のシステムプロンプトです。この内蔵プリセットは Skills、プラン、コンテキスト圧縮、標準のランタイムコンテキストを読み込みません。\n\n### 選ぶタイミング\n\n実験や比較のベースラインとして使います。シェルコマンド経由でファイルの読み取りやスクリプト実行はできますが、長いタスクを管理する組み込みの手段は少なくなります。ツールが少ないからといって初心者向けというわけではありません。",
  guideMinimalUsage:
    "### 小さなバグ修正で性能を比較する\n\n> このプロジェクトのテストを実行し、失敗の原因を突き止め、最小限の修正を行ってください。関連テストを再実行し、結果を報告してください。\n\n同じ初期状態から、標準モードとミニマルモードで同じタスクをそれぞれ実行してください。完了状況、ツール呼び出し、最終的な変更を比較します。ミニマルモードはターミナルコマンドで作業を進めます。",
  guideCordisIntro:
    "新規タスクを開始するときにクリエイターモードを選択します。追加したい機能、使いたい場所、効果の確認方法を伝えてください。",
  guideCordisExplanation:
    "### 作れるもの\n\nクリエイターモードは、標準モードのタスクツールに加えて、実行時インスペクト、永続的なプラグイン管理、Cordis プラグインとエージェントプリセットの作成ガイドを備えています。機能や UI を追加するプラグインや、特定の作業向けにツールとプロンプトを組み合わせたプリセットを作成できます。\n\n### プラグインとモード\n\nプラグインは DSH に機能（ツール、サービス接続、UI の入り口など）を追加します。モードはエージェントプリセットの一種で、ツールを選び、タスクでエージェントがどう動くかを定義します。プラグインはカスタムプリセットに含められます。\n\n### 成果物の反映方法\n\nソースコードを生成するだけでなく、エージェントにインストールと検証まで依頼してください。プラグインは変更内容によって即時反映されることも、再起動が必要なこともあります。新しく作成したプリセットは、新規タスクの開始時に選択できます。",
  guideCordisUsage:
    "### UI を追加する\n\n> サイドバーにプロジェクトノートの項目を追加する DSH プラグインを作ってください。このワークスペースの Markdown ファイルを閲覧し、選んだノートをプレビューできるようにしてください。インストールして、ページが開くことを確認してください。\n\n期待される成果：動作する項目とプレビューページを持つインストール済みプラグインと、残りの有効化手順。\n\n### ツールを追加する\n\n> このプロジェクトのテストレポートを読み、失敗したテストを要約するツールを持つプラグインを作ってください。登録し、サンプルレポートで検証してください。\n\n期待される成果：呼び出し可能なツールと、検証済みのサンプル呼び出しを持つプラグイン。\n\n### 自分のモードを作る\n\n> 標準モードをベースに「コードレビュー」モードを作ってください。潜在的なバグとテストの抜け漏れを優先し、ファイルパスと行番号を引用し、ファイル変更の前に確認を求めるようにしてください。選択可能なプリセットとして保存してください。\n\n期待される成果：新規タスク用のカスタムプリセット。これらのレビュー指示がエージェントを導き、権限設定が実行できる操作を決めます。",
};

const settingsAccount: LocaleDictOf<"settings.account"> = {
  modelSignInRequired: "モデルを利用できません。サインインしてから再試行してください。",
  sessionExpired: "アカウントからサインアウトされました。再度サインインしてください。",
  onboardingArtworkLocale: "en",
  onboardingWelcome: "ようこそ",
  onboardingBrand: "DeepSeek Harness",
  onboardingIntroduction:
    "DeepSeek Harness はローカルフォルダーをワークスペースとして動作し、ツールを使ってコンピューター上のファイルを読み書きします。情報の調査・整理、ドキュメントや表の作成、コードの作成、問題のトラブルシューティングなど、さまざまなタスクをお手伝いします。",
  onboardingStart: "はじめる",
  onboardingCredit: "残高をチャージ",
  onboardingCreditDescription:
    "DeepSeek Harness はモデルとツールが使用したトークン量に応じて残高を消費します。タスクが中断されないよう、事前にチャージしてください。残高はエージェントがタスクを実行している間のみ使用されます。",
  onboardingTopUp: "チャージ",
  onboardingLater: "次へ",
  onboardingFundedTopUp: "チャージ",
  onboardingPurposePrefix: "",
  onboardingPurposeSuffix: "で何をしますか？",
  onboardingPurposeDescription: "選択した内容に合わせて、インターフェースとツールを調整します。",
  onboardingOffice: "オフィス業務・クリエイティブ作業",
  onboardingOfficeDescription: "ドキュメントの編集、データの整理、プレゼンテーションの作成など",
  onboardingDevelopment: "コーディング・開発",
  onboardingDevelopmentDescription:
    "コードの編集、問題のデバッグ、コマンドの実行、プロジェクトファイルの管理など",
  onboardingContinue: "続行",
  onboardingProcess: "作業の過程をどの程度表示しますか？",
  onboardingProcessDescription:
    "作業過程の表示方法が変わるだけで、DeepSeek Harness の性能は変わりません。",
  onboardingCompact: "結果のみ",
  onboardingCompactDescription: "シンプルなインターフェースで結果だけを表示します",
  onboardingStandard: "要点を表示",
  onboardingStandardDescription: "結果を中心に、重要なステップと操作のみを表示します",
  onboardingDetailed: "すべて表示",
  onboardingDetailedDescription: "過程をすべて表示し、デバッグや問題の調査をしやすくします",
  onboardingEnter: "アプリを開く",
  onboardingBack: "戻る",
  onboardingSkip: "スキップ",
  onboardingSkipTitle: "セットアップをスキップしますか？",
  onboardingSkipDescription:
    "作業過程・パフォーマンス・使用量の表示方法の変更や、コーディングビューの有効化は、いつでも「設定 → 一般」で行えます。",
  onboardingKeepSetting: "セットアップを続行",
  onboardingNoCreditTitle: "チャージをスキップしますか？",
  onboardingNoCreditDescription:
    "残高がないと、DeepSeek Harness は新しいタスクを開始できません。後から「設定 → アカウント」でチャージできます。",
  onboardingUnderstood: "了解しました",
  onboardingGoTopUp: "チャージ",
  onboardingSaveFailed: "設定を保存できませんでした。再試行してください。",
  onboardingRetry: "再試行",
  onboardingLoading: "設定を読み込み中…",
  close: "閉じる",
  addApiKey: "API キーを追加",
  retry: "再サインイン",
  loginTitle: "はじめる",
  loginDescription:
    "DeepSeek アカウントでサインインするか、API キーを追加して始めましょう。プロジェクトとファイルはローカルに保存されます。",
  browserTitle: "サインインを待機中",
  browserPrompt: "ページが自動的に開かない場合は",
  copyLink: "サインインリンクをコピー",
  copiedLink: "リンクをコピーしました",
  copyFailed: "コピーに失敗しました",
  browserDescription: "、リンクをブラウザーで開いてサインインを完了してください。",
  timeoutTitle: "サインインがタイムアウトしました",
  timeoutDescription: "続行するには、もう一度サインインしてください。",
  failureTitle: "サインインできませんでした",
  platformFailed: "操作を完了できませんでした。再試行してください。",
  platformRetry: "再試行",
  loading: "読み込み中…",
  backToHarness: "DeepSeek Harness に戻る",
  settings: "設定",
  contactUs: "フィードバック",
  menu: "アカウントメニュー",
  nav: "アカウント",
  signedIn: "DeepSeek にサインイン済み",
  signedOut: "未サインイン",
  signIn: "サインイン",
  signOut: "サインアウト",
  signOutUnknownDescription:
    "実行中のタスクを確認できませんでした。サインアウトすると、このアカウントを使用しているタスクが中断される可能性があります。サインアウトしますか？",
  signOutDescription:
    "サインアウトしてもデータは削除されません。このアカウントには再度サインインできます。",
  signOutRunningDescription:
    "タスクが実行中です。サインアウトするとタスクが中断されます。サインアウトしますか？",
  cancel: "キャンセル",
  open: "ブラウザーを開く",
  initializing: "サインインを開始中…",
  waiting: "ブラウザーで続行してください",
  completing: "サインインを完了中…",
  expired: "サインインの有効期限が切れました。再試行してください。",
  failed: "操作を完了できませんでした。再試行してください。",
  settingsSignedOutTitle: "DeepSeek Harness にサインインしていません",
  settingsSignedOutDescription: "DeepSeek Harness にサインインして専用の API キーを取得しましょう",
  signInDescription: "DeepSeek アカウントを使って始めましょう。",
  profileUnavailable: "アカウント情報はまだ利用できません。",
  balance: "チャージ残高",
  bonusBalance: "付与残高",
  balanceUnavailable: "プラットフォームで確認",
  balanceSignedOut: "サインインすると表示されます",
  accountInfo: "アカウントの詳細情報",
  more: "その他",
  usage: "使用量を確認",
  topUp: "チャージ",
  quotaTitle: "利用可能な残高がありません",
  quotaDescription:
    "残高がない場合、このアカウントでは DeepSeek Harness の新しいタスクを開始できません。チャージしますか？後から「設定 → アカウント」でチャージすることもできます。",
  quotaTopUp: "チャージ",
  bonusNoticeTitle: "ボーナスが付与されました",
};

const settingsAgentLoop: LocaleDictOf<"settings.agentLoop"> = {
  title: "エージェントループ",
  description: "エージェントがツール呼び出しをディスパッチする方法を制御します。",
  maxParallel: "並列ツール呼び出し数",
  maxParallelHint: "1 ステップ内で同時に実行できる、並列実行可能な呼び出しの上限。",
  overridden: "上書き設定済み",
  reset: "デフォルトに戻す",
  readOnly: "このデプロイでは設定は読み取り専用です。",
  unavailable: "このプラグインは読み込まれていないため、現在設定できません。",
  save: "保存",
  saving: "保存中…",
  saveFailed:
    "このデプロイはこれらの値を受け付けませんでした。修正できるよう入力を保持しています。",
  invalidNumber: "数値を入力してください。空欄の場合はデフォルト値を使用します。",
};

const settingsSessionLog: LocaleDictOf<"settings.sessionLog"> = {
  title: "公式モデル API 使用時に Session Log をアップロード",
  description: "DeepSeek のモデルと製品の改善にご協力ください。",
  saved: "設定を保存しました",
  failed: "設定を保存できませんでした",
};

const settingsShell: LocaleDictOf<"settings.shell"> = {
  title: "シェル",
  description: "各コマンドの実行時間と出力できる量を制限します。",
  timeoutMs: "コマンドタイムアウト（ms）",
  timeoutMsHint: "1 つのコマンドを実行できる最大時間。超過すると終了されます。",
  maxOutputBytes: "ストリームごとの出力上限（バイト）",
  maxOutputBytesHint: "上限を超えた出力は破棄されず、一時ファイルに退避されます。",
  overridden: "上書き設定済み",
  reset: "デフォルトに戻す",
  readOnly: "このデプロイでは設定は読み取り専用です。",
  unavailable: "このプラグインは読み込まれていないため、現在設定できません。",
  save: "保存",
  saving: "保存中…",
  saveFailed:
    "このデプロイはこれらの値を受け付けませんでした。修正できるよう入力を保持しています。",
  invalidNumber: "数値を入力してください。空欄の場合はデフォルト値を使用します。",
};

const settingsSubagent: LocaleDictOf<"settings.subagent"> = {
  overridden: "上書き設定済み",
  reset: "デフォルトに戻す",
  readOnly: "このデプロイでは設定は読み取り専用です。",
  unavailable: "このプラグインは読み込まれていないため、現在設定できません。",
  save: "保存",
  saving: "保存中…",
  saveFailed:
    "このデプロイはこれらの値を受け付けませんでした。修正できるよう入力を保持しています。",
  subagentTitle: "サブエージェント",
  subagentDescription: "サブエージェントの再帰深度、数、モデルを設定します。",
  subagentLimitsTitle: "実行制限",
  subagentMaxDepth: "最大再帰深度",
  subagentDepthHelpLabel: "最大再帰深度について",
  subagentDepthHelp: "エージェントが作成できるサブエージェントの再帰レベル数を制限します。",
  subagentDepthZero: "サブエージェントを無効化",
  subagentDepthOne: "メインエージェントのみサブエージェントを作成できます",
  subagentDepthOverride: "ツールが独自の最大再帰深度を定義している場合は、その設定が優先されます。",
  subagentMaxActive: "サブエージェントの同時実行数上限",
  subagentCapacityHelpLabel: "サブエージェントの同時実行数上限について",
  subagentCapacityHelp:
    "同じメインエージェント配下で、すべての再帰レベルを通じて同時に稼働できるサブエージェントの総数。メインエージェントは含まれません。上限に達すると、新しい起動要求は拒否されます。",
  subagentDepthInvalid: "0 以上の整数を入力してください。",
  subagentCapacityInvalid: "1 以上の整数を入力してください。",
  subagentModelSelectionTitle: "モデル選択",
  subagentModelSelectionToggle: "エージェントがサブエージェントのモデルを選択できるようにする",
  subagentModelSelectionChoose:
    "有効にすると、エージェントは下記の許可されたモデルから、サブエージェントごとにプロバイダー・モデル・思考レベルを選択できます。新しいセッションにのみ適用されます。",
  subagentModelSelectionAllowed: "エージェントが選択できるモデル",
  subagentModelSelectionLoading: "モデルを読み込み中…",
  subagentModelSelectionLoadFailed: "モデルを読み込めませんでした。",
  subagentModelSelectionRetry: "再試行",
  subagentModelSelectionPartial:
    "一部のモデルプロバイダーを読み込めませんでした。保存済みの選択は引き続き削除できます。",
  subagentModelSelectionUnavailable: "現在利用不可",
  subagentModelSelectionUnavailableGroup: "保存済みだが現在利用不可",
  subagentModelSelectionEmpty: "現在モデルを公開しているモデルプロバイダーはありません。",
  subagentModelSelectionRequired: "保存する前に、少なくとも 1 つのモデルを選択してください。",
  subagentModelSelectionConflict:
    "設定が別の場所で変更されました。変更を破棄してから再試行してください。",
  subagentModelSelectionOff:
    "サブエージェントは設定されたデフォルトのモデルを使用するか、親エージェントのモデルを継承します。保存済みのモデル選択は保持されます。",
};

const settingsWebSearch: LocaleDictOf<"settings.webSearch"> = {
  title: "Web 検索",
  description: "DeepSeek の検索プロバイダーを設定します。",
  apiKey: "API キー",
  apiKeyHint: "設定ファイルの外に保存されます。空欄のままにすると現在のキーが維持されます。",
  apiKeySet: "キーが設定されています。",
  apiKeyUnset:
    "キーが未設定です。DeepSeek アカウントのモデルを使用している会話のみ、デフォルトのエンドポイント経由で検索できます。",
  baseUrl: "エンドポイント",
  baseUrlHint: "空欄にするとプロバイダーのデフォルトを使用します。",
  maxUses: "リクエストあたりの最大検索回数",
  maxUsesHint: "1 つのリクエストが回答の前に検索できる回数の上限。",
  overridden: "上書き設定済み",
  reset: "デフォルトに戻す",
  readOnly: "このデプロイでは設定は読み取り専用です。",
  unavailable: "このプラグインは読み込まれていないため、現在設定できません。",
  save: "保存",
  saving: "保存中…",
  saveFailed:
    "このデプロイはこれらの値を受け付けませんでした。修正できるよう入力を保持しています。",
  invalidNumber: "数値を入力してください。空欄の場合はデフォルト値を使用します。",
};

const settingsLocale: LocaleDictOf<"settings.locale"> = {
  "language.title": "言語",
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
  add: "モデルプロバイダーを追加",
  addMode: "追加方法",
  addCatalog: "サードパーティのモデルプロバイダー",
  addCatalogHint:
    "内蔵カタログから OpenAI、Anthropic、Kimi などのプロバイダーを選び、API キーを入力するだけで使えます。",
  addCatalogExhausted: "カタログ内のプロバイダーはすべて追加済みです。",
  addCustom: "カスタムモデル API",
  addCustomHint:
    "中継サーバー、セルフホスト環境、その他 OpenAI / Anthropic 互換のエンドポイントを、エンドポイント・プロトコル・モデルを指定して接続します。",
  addCustomUnavailable: "利用できる API プロトコルがありません。",
  deepSeekAccount: "DeepSeek アカウント",
  deepSeekBaseUrl: "https://api.deepseek.com/anthropic",
  deepSeekEndpointHint: "Anthropic Messages 互換の API エンドポイントを指定してください。",
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
  modelInputTypes: "入力タイプ",
  modelInputText: "テキスト",
  modelInputImage: "画像",
  contextWindow: "コンテキストウィンドウ",
  contextWindowPlaceholder: "プロバイダーのデフォルトを使用",
  maxTokens: "最大出力トークン数",
  maxTokensPlaceholder: "プロバイダーのデフォルトを使用",
  modelAdvanced: "モデルオプション",
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
    "その他のフィールドは cordis.patch.yml にあります。該当セクションを直接編集してください。",
  modelCapacityInvalid: "容量は数値で指定してください。末尾に K または M を付けられます。",
  modelDuplicate: "モデル ID は重複できません。",
  fetchModels: "利用可能なモデルを取得",
  fetching: "プロバイダーに問い合わせ中",
  fetchNeedsBaseUrl: "先にエンドポイントを入力してから取得してください。",
  fetchEmpty: "このプロバイダーにはモデルが登録されていません。手動で追加してください。",
  fetchTitle: "追加するモデルを選択",
  fetchDescription:
    "以下はプロバイダーで利用可能なモデルです。追加するモデルにチェックを入れてください。",
  fetchSearch: "モデルを検索",
  fetchNoMatches: "一致するモデルがありません。",
  fetchSelectAll: "すべて選択",
  fetchDeselectAll: "すべて解除",
  fetchAdopt: "選択した項目を追加",
  customTag: "カスタム",
  customRoute: "プロバイダー ID",
  customRouteHint:
    "小文字で始まる ID。リクエスト内でこのプロバイダーを一意に識別し、認証情報名としても使用されます。",
  customRouteInvalid: "小文字で始める必要があります。以降は小文字、数字、ハイフンが使用できます。",
  customRouteTaken: "この ID はすでに別のプロバイダーで使用されています。",
  customDisplayName: "表示名",
  customApi: "API プロトコル",
  customApiUnset: "未選択",
  customNeedsBaseUrl: "カスタムプロバイダーにはエンドポイントが必要です。",
  customBaseUrlInvalid: "有効な HTTP または HTTPS の URL を入力してください。",
  customNeedsModels: "カスタムプロバイダーにはモデルが 1 つ以上必要です。",
  customBaseUrlPlaceholder: "https://gateway.example/v1",
  customAnthropicBaseUrlPlaceholder: "https://gateway.example",
  protocolAnthropicMessages: "Anthropic Messages",
  protocolOpenAiCompletions: "OpenAI Chat Completions",
  protocolOpenAiResponses: "OpenAI Responses",
  settingsPathUnresolvable: "設定パスを解決できません",
  create: "プロバイダーを作成",
  creating: "作成中",
  welcomeTitle: "プレビュー版について",
  welcomeBody:
    "DeepSeek Harness 0.2 はまだプレビュー段階であり、改善と磨き込みが必要な部分が多く残っています。開発者・ユーザーの皆様からのご意見・ご要望をお待ちしています。新しいデスクトップアプリは幅広いユーザー向けで、開発者向けの高度な機能は設定で有効化できます。DeepSeek Harness の製品機能とプラグイン API は今後も急速なイテレーションを続けながら、徐々に安定していく予定です。\n\nオープンソースで再利用・組み合わせ自由なインフラを土台に、世界中のユーザーと開発者の皆様とともに知性の限界を探求できることを楽しみにしています。皆様が DeepSeek Harness でアイデアを形にし、コミュニティとともにプラグインエコシステムを豊かにしてくださることを歓迎します。",
  welcomeContinue: "続行",
  welcomeError: "確認状態を一時的に保存できません。再試行してください。",
  onboardingTitle: "API キーを追加して始める",
  onboardingDescription: "DeepSeek の公式モデルを設定すると、すぐに使い始められます。",
  onboardingLater: "後で設定",
  onboardingSave: "保存して続行",
  onboardingSaving: "保存中",
  keyRequired: "続行するには API キーを入力してください。",
};

const settingsPermission: LocaleDictOf<"settings.permission"> = {
  title: "権限",
  description: "新しいセッションのデフォルトの権限モードを選択",
  loading: "読み込み中",
  unavailable: "利用不可",
  "preset.readOnly": "閲覧のみ",
  "preset.workspaceWrite": "ワークスペース内の書き込み",
  "preset.fullAccess": "フルアクセス",
  "confirm.title": "フルアクセスを有効にしますか？",
  "confirm.description":
    "フルアクセスを有効にすると、新しいセッションでの確認ステップが減り、機密性の高い操作、ファイル変更、外部コマンドを含むより多くの操作を直接実行できるようになります。以降のタスクを信頼できる場合にのみ使用してください。",
  "confirm.acknowledge": "リスクを理解した上で続行します",
  "confirm.cancel": "キャンセル",
  "confirm.enable": "フルアクセスを有効化",
};

const settingsPluginInventory: LocaleDictOf<"settings.pluginInventory"> = {
  tab: "プラグイン一覧",
  loading: "プラグインを読み込み中",
  clientSyncing: "このページのプラグインを同期中…",
  clientSyncFailed:
    "このページの一部のプラグインを同期できませんでした。ホスト側の有効状態は変更されていません",
  clientSyncRetry: "このページを再試行",
  error: "プラグインを一時的に読み込めません。",
  metadataError: "パッケージのメタデータエラー：{error}",
  retry: "再試行",
  search: "プラグインを検索",
  empty: "利用可能なプラグインがありません。",
  emptySearch: "一致するプラグインがありません。",
  presetTitle: "セッションプラグイン",
  presetSubtitle: "エージェントプリセットがセッションごとに構成します",
  countUnit: "個",
  switcherLabel: "確認するエージェントプリセットを選択",
  presetOptionDefault: "{name}（デフォルト）",
  presetOptionBroken: "{name}（読み込み失敗）",
  globalTitle: "グローバルプラグイン",
  globalSubtitle: "システムとすべてのセッションで共有されます",
  presetProvidedDetail: "グローバルでは無効。エージェントプリセットがセッションごとに提供します",
  enabledIn: "有効な場所",
  viewInPreset: "プリセットグループで表示",
  matchesInOtherPresets: "他のプリセットにさらに {count} 件の一致：",
  failedCountLabel: "失敗",
  enabledTag: "有効",
  disabledTag: "無効",
  conditionalTag: "条件付きで有効",
  presetEnabledTag: "プリセット経由",
  failedTag: "失敗",
  moduleLabel: "モジュール",
  fromPreset: "提供元",
  condition: "無効にする条件",
  configuration: "設定状態",
  runtime: "実行状態",
  unobserved: "未実行",
  pending: "依存関係を待機中",
  loadingPhase: "読み込み中",
  active: "実行中",
  failed: "起動失敗",
  unloading: "アンロード中",
};

const settingsPlugins: LocaleDictOf<"settings.plugins"> = {
  nav: "内蔵プラグイン",
  title: "内蔵プラグイン",
  intro: "このデプロイに内蔵されているプラグインを確認します。",
  tabs: "プラグインビュー",
  empty: "このデプロイではプラグインビューが公開されていません。",
};

const settingsTheme: LocaleDictOf<"settings.theme"> = {
  "appearance.title": "外観",
  "appearance.light": "ライト",
  "appearance.dark": "ダーク",
  "appearance.system": "システム",
  "fontSize.title": "文字サイズ",
  "fontSize.description": "会話の本文にのみ適用されます",
  "fontSize.unit": "px",
  "fontSize.increase": "文字を大きくする",
  "fontSize.decrease": "文字を小さくする",
};

const shortcuts: LocaleDictOf<"shortcuts"> = {
  "edit-label": "{command} のショートカットを編集",
  record: "ショートカットを入力",
  "record-help": "キーを離すと保存されます。Tab で項目を移動、Esc でキャンセルします。",
  "web-help":
    "ブラウザーで使用できる組み合わせ：Mod+/、Mod+Shift+,、Mod+Shift+.。Mod は Mac では Command、その他では Ctrl です。",
  "unsupported-key": "このキーはサポートされていません。",
  reserved: "この組み合わせはシステムまたはテキスト編集操作に予約されています。",
  "modifier-required": "Command、Ctrl、Alt のいずれかを組み合わせに含めてください。",
  "too-many-keys": "非修飾キーは最大 2 個までです。キーを離してから再試行してください。",
  "macos-web-help":
    "Command+/、Command+,、Command+Backslash、Control+Backquote、Command+Option+キー、Command+Shift+キー を使用できます。3 つまたは 4 つの異なる修飾キーの組み合わせにも対応しています。ブラウザーやシステムのショートカットはページに届かない場合があります。",
  "windows-web-help":
    "Ctrl+/、Ctrl+,、Ctrl+Alt+キー、Ctrl+Shift+キー を使用できます。3 つまたは 4 つの異なる修飾キーの組み合わせにも対応しています。ブラウザーやシステムのショートカットはページに届かない場合があります。",
  "unsupported-browser": "このブラウザーはまだこの組み合わせに対応していません。",
  conflict: "「{commands}」で使用中",
  saved: "変更済み",
  clear: "解除",
  "retry-save": "保存を再試行",
  reset: "デフォルトに戻す",
  "reset-all": "すべてデフォルトに戻す",
  "modified-count": "{count} 件を変更済み",
  "reset-title": "すべてのショートカットをデフォルトに戻しますか？",
  "reset-description":
    "このプラットフォームのデフォルトのショートカットを復元します。変更または削除したすべてのショートカットが元に戻ります。他のプラットフォームには影響しません。",
  cancel: "キャンセル",
  "reset-saved": "デフォルトのショートカットを復元しました",
  "close-confirmation": "確認を閉じる",
  "reset-failed":
    "デフォルトを復元できませんでした。ショートカットは変更されていません。再試行してください。",
  review: "最新の設定を確認しました",
  stale:
    "ショートカットの設定または利用可能なコマンドが変更されました。保存する前に最新のキー割り当てを確認してください。",
  "write-failed":
    "保存できませんでした。以前のショートカットと現在の下書きは保持されています。再試行してください。",
  "not-ready": "ショートカットの準備ができていません。再試行してください。",
  read: "{location} を読み取れませんでした。アクセス権限を確認してから{reload}してください。",
  invalid:
    "{location} のショートカット設定が破損しています。設定をバックアップして修復してから{reload}してください。",
  future:
    "{location} のショートカット設定は新しいバージョンで作成されました。Harness をアップグレードしてから再試行してください。",
  "web-document": "このサイトの localStorage の dsh.keybindings.v1",
  "desktop-document": "userData/keybindings.json",
  "web-reload": "ページを再読み込み",
  "desktop-reload": "Harness を再起動",
  "using-defaults": "デフォルトのキー割り当てを使用中です。",
  "using-accepted": "最後に正常に読み込めたキー割り当てを引き続き使用しています。",
  "native-failed":
    "デスクトップのキー記録保護を有効にできませんでした。記録を終了してから再試行してください。",
  "global-hint": "どこからでも開く",
  "clear-search": "検索をクリア",
  title: "キーボードショートカット",
  open: "キーボードショートカットを開く",
  settings: "キーボードショートカット",
  view: "ショートカットを編集",
  description: "利用可能なショートカットと入力操作を表示・編集します",
  search: "ショートカットを検索",
  close: "キーボードショートカットを閉じる",
  application: "アプリケーション",
  input: "メッセージ入力",
  menus: "メニューとダイアログ",
  approval: "承認エリア",
  unbound: "ショートカットなし",
  empty: "一致するショートカットがありません",
  move: "メニューの選択を移動",
  select: "メニュー項目を選択",
  dismiss: "メニューまたは最前面のダイアログを閉じる",
};

const shortcutsLayout: LocaleDictOf<"shortcuts.layout"> = {
  toggle: "左サイドバーの表示を切り替え",
};

const sidebar: LocaleDictOf<"sidebar"> = {
  "session.new": "新規セッション",
  "session.new.label": "新規セッションを作成",
  "toggle.open": "サイドバーを開く",
  "toggle.collapse": "サイドバーを折りたたむ",
  "panels.label": "グローバルパネル",
};

const sidebarCodePreview: Record<SidebarCodePreviewKey, string> = {
  title: "コード",
  copy: "コピー",
  copied: "コピーしました",
};

const sidebarBrowser: LocaleDictOf<"sidebarBrowser"> = {
  "type.label": "ブラウザー",
  "guide.title": "ブラウザー",
  "guide.description": "Web ページを閲覧",
  "shortcut.noSession": "先にセッションを開いてください",
  "address.placeholder": "HTTP(S) アドレスを入力",
  "address.changed": "URL が変更されました",
  back: "戻る",
  forward: "進む",
  reload: "再読み込み",
  go: "移動",
  external: "システムブラウザーで開く",
  "sandbox.disable": "サンドボックス制限を無効化",
  "sandbox.enable": "サンドボックス制限を復元",
  "sandbox.warning":
    "サンドボックス制限が無効です。ページはトップレベルのアプリを操作したり、ダウンロード、モーダルダイアログ、入力ロックを使用できます。",
  start: "HTTP(S) アドレスを入力して閲覧を開始",
  loading: "開いています…",
  "restore.previous": "前回開いたページ",
  "restore.action": "ページを復元",
  "error.empty": "アドレスを入力してください。",
  "error.invalid": "そのアドレスは無効か、長すぎます。",
  "error.protocol":
    "HTTP と HTTPS のアドレスのみ対応しています。ローカルファイルはドキュメントプレビューを使用してください。",
  "error.credentials": "アドレスにユーザー名やパスワードを含めることはできません。",
  "error.application-origin": "埋め込みブラウザーでは DSH アプリケーション自体を開けません。",
  "load.failed":
    "ページを読み込めませんでした。再読み込みするか、システムブラウザーで開いてください。",
  "load.failed.detail": "ページの読み込みに失敗しました ({code}): {description}",
  "address.unknown": "ページが移動しました。現在のビューでは新しい URL を読み取れません。",
};

const sidebarDocumentPreview: LocaleDictOf<"sidebarDocumentPreview"> = {
  loading: "ドキュメントを描画中…",
  loadMore: "さらに読み込む",
  changed: "ファイルが更新されました。表示中の内容は更新前のものです。",
  reloadNow: "再読み込み",
  reload: "ファイルを再読み込み",
  autoRefresh: "自動更新",
  "autoRefresh.enable": "自動更新をオン",
  "autoRefresh.disable": "自動更新をオフ",
  "wrap.enable": "自動折り返しをオン",
  "wrap.disable": "自動折り返しをオフ",
  "wrap.aria": "折り返し",
  openWith: "開き方",
  "viewer.text": "プレーンテキスト",
  resourceUnavailable: "ファイルリソースサービスが利用できません。",
  rendererUnavailable: "{name} プレビューは利用できません。",
  unsupportedFile: "この形式のファイルは、現時点ではプレビューできません。",
  "error.notFound": "ファイルが見つかりません。移動または削除された可能性があります。",
  "error.tooLarge": "このページは {limit} の上限を超えるため読み込めません。",
  "error.notText": "このファイル形式はまだプレビューできません。",
  "error.notRegularFile": "通常のファイルではないため、表示できる内容がありません。",
  "error.unavailable": "読み込みに失敗しました：{message}",
  retry: "再試行",
};

const sidebarFiles: LocaleDictOf<"sidebarFiles"> = {
  "shortcut.noSession": "先にセッションを選択してください",
  "type.label": "ファイル",
  "guide.title": "ワークスペースのファイル",
  "guide.description": "このセッションのワークスペース内のファイルを閲覧",
  loading: "読み込み中",
  empty: "空のディレクトリ",
  truncated: "項目が多すぎるため、一部のみ表示しています。",
  noWorkspace: "このセッションにはワークスペースディレクトリがありません。",
  reload: "再読み込み",
  autoRefresh: "自動更新",
  "autoRefresh.enable": "自動更新をオン",
  "autoRefresh.disable": "自動更新をオフ",
  "entry.other": "ファイルでもディレクトリでもないため、開けません。",
  "error.notFound": "そのディレクトリは存在しません。移動または削除された可能性があります。",
  "error.outsideWorkspace":
    "そのディレクトリはワークスペース外のため、サイドバーでは読み取りません。",
  "error.notDirectory": "それはディレクトリではありません。",
  "error.unavailable": "読み込みに失敗しました：{message}",
};

const sidebarImage: Record<SidebarImageKey, string> = {
  title: "画像",
  preview: "画像プレビュー：{name}",
  loading: "ドキュメントを描画中…",
  failed: "この画像は表示できませんでした。",
  unsupported: "画像のプレビューにはファイル全体の内容が必要です。",
  zoomControls: "ズームコントロール",
  zoomMenu: "ズーム倍率を選択",
  zoomOut: "縮小",
  zoomIn: "拡大",
  zoomFitWidth: "幅に合わせる",
  zoomValue: "{percent}%",
};

const sidebarPdf: Record<SidebarPdfKey, string> = {
  title: "PDF",
  pageImage: "PDF の {page} ページ",
  loading: "ドキュメントを描画中…",
  rendering: "ページを描画中…",
  failed: "PDF を表示できません：{message}",
  password:
    "この PDF にはパスワードが必要です。パスワード保護されたプレビューには対応していません。",
  workerFailed: "PDF 描画プロセスを継続できませんでした。再試行してください。",
  unsupported: "PDF のプレビューにはファイル全体の内容が必要です。",
  retry: "再試行",
  zoomControls: "ズームコントロール",
  zoomMenu: "ズーム倍率を選択",
  zoomOut: "縮小",
  zoomIn: "拡大",
  zoomFitWidth: "幅に合わせる",
  zoomValue: "{percent}%",
};

const sidebarExcel: Record<SidebarExcelKey, string> = {
  title: "スプレッドシート",
  language: "ja",
  loading: "ドキュメントを描画中…",
  invalid:
    "このスプレッドシートを開けませんでした。ファイル形式・内容・パスワード保護を確認してください。",
  tooLarge: "このワークブックはプレビューのサイズ上限を超えています。",
  timeout: "このワークブックを開く際にタイムアウトしました。より小さいファイルでお試しください。",
  encoding:
    "このテキストエンコーディングを読み取れませんでした。ファイルを UTF-8 または BOM 付き UTF-16 で保存してから、再試行してください。",
  formulaWarning:
    "このワークブックには数式が含まれています。表示される結果は欠落していたり不正確な場合があります。",
  unsupportedNotice:
    "このプレビューは、このワークブックの{features}に対応していません。完全な表示にはシステムアプリケーションで開いてください。",
  charts: "グラフ",
  images: "画像",
  shapes: "図形",
  conditionalFormatting: "条件付き書式",
  featureSeparator: "、",
  retry: "再試行",
};

const sidebarOffice: Record<SidebarOfficeKey, string> = {
  title: "Office ドキュメント",
  loading: "ドキュメントを描画中…",
  retry: "再試行",
  viewMissingFonts: "欠落しているフォント：{count} 種。クリックして表示",
  missingFontsTitle: "欠落しているフォント",
  missingFontsDescription:
    "このプレビューでは以下のフォントを利用できません。テキストやレイアウトが元のドキュメントと異なる場合があります。",
  missingFontsCount: "フォント：{count} 種",
  closeDetails: "フォントの詳細を閉じる",
  unavailable:
    "Office プレビューを利用できません。DeepSeek Harness が動作しているコンピューターでドキュメントプレビューサービスを有効にしてください。",
  invalid:
    "この Office ファイルはプレビューできません。ファイルが破損しているか、パスワードで保護されているか、拡張子が正しくない可能性があります。",
  tooLarge:
    "Office ファイルまたは変換後の PDF がプレビューのサイズ上限を超えています。ファイルサイズを小さくするか、プレビュー設定を調整してください。",
  failed:
    "Office の変換で利用可能な PDF が生成されませんでした。ファイルを確認して再試行してください。",
  timeout: "Office の変換がタイムアウトしました。再試行してください。",
  busy: "Office プレビューが混み合っています。しばらくしてから再試行してください。",
  changed: "読み込み中にファイルが変更されました。プレビューを開き直してください。",
};

const sidebarRight: LocaleDictOf<"sidebarRight"> = {
  "command.close": "現在のページまたはウィンドウを閉じる",
  "command.refresh": "現在のページを再読み込み",
  "command.noRefresh": "このページは再読み込みできません",
  "command.toggle": "右サイドバーの表示を切り替える",
  "command.fullscreen": "パネルの全画面表示を切り替える",
  "command.noSession": "先にセッションを選択してください",
  "command.noFocus": "先に右サイドバーのペインをフォーカスしてください",
  "command.stale": "ページが切り替わりました。もう一度フォーカスしてください",
  "command.collapsed": "先に右サイドバーを開いてください",
  "command.float": "この操作はフローティングパネルでは使用できません",
  "command.empty": "先にページを開いてください",
  "command.budget": "上限は 2 ペインです",
  "command.width": "幅が足りないため分割できません。サイドバーを広げてください",
  "chrome.expand": "サイドバーを開く",
  "chrome.expandAria": "右サイドバーを開く",
  "chrome.collapse": "サイドバーを折りたたむ",
  "chrome.collapseAria": "右サイドバーを折りたたむ",
  "chrome.toFullscreen": "全画面",
  "chrome.exitFullscreen": "全画面を終了",
  "dock.emptyPane": "空のペイン",
  "dock.splitPane": "分割",
  "dock.splitPaneDisabled": "上限は 2 ペインです",
  "dock.splitPaneNarrow": "幅が足りないため分割できません。サイドバーを広げてください",
  "dock.closeTab": "閉じる",
  "dock.addTab": "新しいタブ",
  "dock.dockFloat": "サイドバーに戻す",
  "dock.closeFloat": "閉じる",
  "dock.drop.center": "ここへ移動",
  "dock.drop.left": "左に分割して追加",
  "dock.drop.right": "右に分割して追加",
  "dock.drop.top": "上に分割して追加",
  "dock.drop.bottom": "下に分割して追加",
  "tab.guide.title": "はじめる",
  "tab.unavailable": "この種類のコンテンツを表示できるビューはまだありません。",
};

const sidebarTerminal: Record<SidebarTerminalKey, string> = {
  "shortcut.noSession": "先にセッションを選択してください",
  recoveryFailed: "ターミナルの復旧に失敗しました：{message}",
  retryRecovery: "ターミナルの復旧を再試行",
  shell: "シェルを選択",
  shellLoading: "シェルを読み込み中…",
  shellEmpty: "利用可能なシェルがありません",
  description: "セッションのワークスペースでコマンドを実行",
  title: "ターミナル",
  new: "新規ターミナル",
  loading: "ターミナル環境を読み込み中…",
  creating: "起動中…",
  connecting: "接続中…",
  disconnected: "接続が切断されました。",
  reconnect: "再接続",
  readonly: "このビューは読み取り専用です。",
  control: "操作を引き継ぐ",
  closed: "ターミナルは閉じられました。",
  exited: "プロセスが終了しました（{code}）",
  failed: "ターミナルエラー：{message}",
  rename: "ターミナル名",
  unavailable: "利用不可",
  retry: "再試行",
  cleanupFailed: "ターミナル「{title}」を終了できませんでした：{message}",
  missingTerminal: "このターミナルはすでに存在しません。新しいターミナルを開いてください。",
  inputFull: "入力バッファがいっぱいです。再接続して再試行してください。",
  attachmentEnded: "ターミナルの接続が終了しました。続行するには再接続してください。",
  invalidOutput: "ターミナルの画面を受信できませんでした。復旧するには再接続してください。",
  terminalLimit:
    "ターミナル数が上限に達しました。使用していないターミナルを閉じてから再試行してください。終了済みのターミナルも数に含まれます。",
};

const skill: LocaleDictOf<"skill"> = {
  "row.title": "スキル",
  "row.running": "スキルを読み込み中",
  "row.failed": "スキルの読み込みに失敗しました",
  "row.stopped": "スキルの読み込みが中止されました",
  "row.instructions": "説明",
  "row.inspect": "詳細を見る",
  "menu.userOnly": "ユーザーのみ",
  "row.preparing": "スキルを準備中",
};

const slashMenu: LocaleDictOf<"slash.menu"> = {
  command: "コマンド",
  skill: "スキル",
  subagent: "サブエージェント",
  loading: "読み込み中",
  "drill.aria": "フォルダーを参照",
  "drill.hint": "フォルダーを参照",
  "drill.key": "Tab",
  "crumbs.aria": "フォルダー階層ナビゲーション",
  "suggestions.aria": "トリガー候補の提案",
};

const subagent: LocaleDictOf<"subagent"> = {
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
  "tokens.thousand": "{value}K",
  "tokens.million": "{value}M",
  "tokens.total": "{value} tok",
  "loading.label": "サブエージェントを読み込み中",
  "load.error": "サブエージェントを読み込めません",
  retry: "再試行",
  "mode.oneShot": "ワンショット",
  "mode.continuable": "継続可能",
  "mode.unknown": "不明なモード",
  "readonly.unknown.body": "子セッションを読み込むと、継続できるかどうかがわかります。",
  "activity.running": "実行中",
  "activity.completed": "完了",
  "activity.inactive": "停止中",
  "branch.collapse": "{label} 配下のサブエージェントを折りたたむ",
  "branch.expand": "{label} 配下のサブエージェントを展開",
  "count.total.one": "{count} 件のサブエージェント",
  "count.total.other": "{count} 件のサブエージェント",
  "count.running.one": "{count} 件のサブエージェントが実行中",
  "count.running.other": "{count} 件のサブエージェントが実行中",
  "switcher.aria": "サブエージェントを切り替え：{title}",
  "tree.aria": "サブエージェントセッション",
  "open.sidebar": "サイドバーで開く",
  "open.sidebar.aria": "{label} をサイドバーで開く",
  "sidebar.chat": "チャット",
  "readonly.oneShot.title": "ワンショットサブエージェントレコード",
  "readonly.title": "このサブエージェントは一時的に読み取り専用です",
  "readonly.oneShot.body":
    "ワンショットタスクでは追加メッセージに対応していません。ここで完全な実行レコードを確認できます。",
  "readonly.body":
    "親セッションが現在オフラインです。親セッションを再度開くとメッセージの送信を再開できます。",
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
  "kind.system": "システム",
  "kind.user": "ユーザー",
  "kind.context": "コンテキスト",
  "kind.compacted": "圧縮済み",
  "kind.message": "メッセージ",
  "kind.assistant": "アシスタント",
  "kind.tool": "ツール",
  "kind.subtool": "サブツール",
  "kind.sub": "サブ",
  "column.input": "入力",
  "column.output": "出力",
  "column.think": "思考",
  "column.time": "時間",
  "column.model": "モデル",
  "column.tools": "ツール",
  "turn.label": "ターン {turn}",
  "section.betweenTurns": "ターン間",
  "group.message": "メッセージ",
  "group.step": "ステップ {step}",
  "group.compaction": "圧縮 {seq}",
  "status.failed": "失敗",
  "status.pending": "待機中",
  "status.completed": "完了",
  "timing.notAvailable": "利用できません",
  "timing.notRecorded": "記録なし",
  "timing.stepStartUnavailable": "ステップ開始時刻なし",
  "timing.firstTokenUnavailable": "最初のトークンの時刻なし",
  "timing.usageUnavailable": "使用量なし",
  "timing.outputTokensUnavailable": "出力トークン数なし",
  "timing.durationTooShort": "時間が短すぎます",
  "timing.showLocalTime": "ローカル時刻を表示",
  "timing.showUnixTimestamp": "Unix タイムスタンプを表示",
  "timing.started": "開始",
  "timing.totalDuration": "合計時間",
  "timing.ttft": "最初のトークンまでの時間",
  "timing.generation": "生成",
  "timing.throughput": "スループット",
  "timing.duration": "所要時間",
  "timing.source": "計測ソース",
  "timing.sessionTimestamps": "セッションのタイムスタンプ",
  "timing.sessionTimestampsRunning": "セッションのタイムスタンプ（実行中）",
  "timing.request": "リクエストの計測",
  "unit.milliseconds": "{value} ミリ秒",
  "unit.seconds": "{value} 秒",
  "unit.tokens": "{value} tok",
  "unit.tokensPerSecond": "{value} tok/s",
  "usage.tokens": "トークン",
  "usage.reasoning": "推論",
  "usage.content": "内容",
  "usage.notReported": "使用量は報告されていません",
  "usage.input": "入力",
  "usage.cached": "キャッシュ読み取り",
  "usage.cacheCreated": "キャッシュ書き込み",
  "usage.other": "その他",
  "usage.output": "出力",
  "usage.thisRequest": "このリクエスト",
  "usage.sessionCumulative": "セッション累計",
  "options.notRecorded": "オプションは未記録です",
  "options.json": "リクエストオプションの JSON",
  "source.unknown": "不明",
  "source.user": "ユーザー",
  "source.plugin": "プラグイン",
  "source.pluginNamed": "プラグイン · {plugin}",
  "source.goal": "目標",
  "source.goalRound": "目標 · ラウンド {round}",
  "source.notRecorded": "ソースは未記録です",
  "source.messageJson": "メッセージソースの JSON",
  "tab.summary": "概要",
  "tab.rawOutput": "生の出力",
  "tab.preview": "プレビュー",
  "tab.raw": "生データ",
  "tab.source": "ソース",
  "tab.payload": "パラメーター",
  "tab.result": "結果",
  "tab.schema": "スキーマ",
  "tab.timing": "計測",
  "tab.diff": "差分",
  "tab.systemPrompt": "システムプロンプト",
  "tab.tools": "ツール",
  "tab.options": "オプション",
  "tab.usage": "使用量",
  "record.toolCallOnly": "（ツール呼び出しのみ）",
  "record.noContent": "内容なし",
  "record.noPayload": "取得したパラメーターはありません",
  "record.noResult": "取得した結果はありません",
  "record.noOutput": "出力なし",
  "record.schemaUnavailable": "スキーマは利用できません",
  "record.parameters": "パラメーター",
  "record.resultJson": "結果の JSON",
  "record.json": "JSON",
  "record.parametersJson": "パラメーターの JSON",
  "record.namedParametersJson": "{name} のパラメーター JSON",
  "record.payloadJson": "パラメーターの JSON",
  "record.outputJson": "結果の JSON",
  "record.thinking": "思考",
  "record.wrapLines": "行を折り返す",
  "code.source": "コード",
  "code.output": "出力",
  "code.copySource": "コードをコピー",
  "code.copyOutput": "出力をコピー",
  "code.originalJson": "元の JSON",
  "code.running": "実行中…",
  "record.systemPromptMissing": "このリクエストにシステムプロンプトはありません",
  "record.toolsMissing": "このリクエストにツールはありません",
  "record.systemPrompt": "システムプロンプト",
  "record.tools": "ツール",
  "block.openSummary": "ブロック #{index} のツール呼び出し概要を開く",
  "block.openSummaryTitle": "ツール呼び出しの概要を開く",
  "block.label": "ブロック #{index} {type}",
  "history.loadingTrajectory": "トレースを読み込み中…",
  "history.loadingEarlier": "より前の履歴を読み込み中…",
  "history.loadingEarlierAria": "より前の履歴を読み込み中…",
  "history.loadEarlier": "より前の履歴を読み込む",
  "history.clickToLoadEarlier": "クリックでより前の履歴を読み込む",
  "request.label": "リクエスト #{request}",
  "request.labelCompaction": "リクエスト #{request} · 圧縮",
  "request.compaction": "圧縮 · {section}",
  "request.compactionPurpose": "圧縮",
  "request.retryProgress": "{retry}/{maximum}",
  "request.collapsedSummary": "折りたたまれた{kind}の概要、{summary}",
  "request.collapsedTurn": "ターン",
  "request.collapsedAssistant": "アシスタント",
  "request.rowAria": "{request}{kind}、{content}",
  "request.rowPrefix": "リクエスト {request}、",
  "request.rowAriaCompaction": "リクエスト {request}、圧縮",
  "request.noContent": "内容なし",
  "summary.toolCalls.one": "{count} 回のツール呼び出し",
  "summary.toolCalls.other": "{count} 回のツール呼び出し",
  "summary.steps.one": "{count} ステップ",
  "summary.steps.other": "{count} ステップ",
  "details.event": "イベントの詳細",
  "details.resize": "イベント詳細の幅を調整",
  "details.resizeTitle": "ドラッグでサイズ変更。ダブルクリックで戻す。",
  "details.close": "詳細を閉じる",
  "details.status": "状態",
  "details.purpose": "用途",
  "details.provider": "提供元",
  "details.model": "モデル",
  "details.toolCalls": "ツール呼び出し",
  "details.subtoolCalls": "サブツール呼び出し",
  "details.error": "エラー",
  "details.failure.auth": "API キーが無効です",
  "details.retry": "再試行",
  "details.scheduled": "予定済み",
  "details.retryDelay": "再試行の待機時間",
  "details.result": "結果",
  "details.compacted": "圧縮済み",
  "details.assistantMessage": "アシスタントのメッセージ",
  "details.source": "ソース",
  "details.hierarchy": "階層",
  "details.toolCall": "ツール呼び出し",
  "timeline.aria": "トレースのタイムライン",
  "timeline.overviewAria": "タイムラインの概要。水平にドラッグしてイベントにフォーカス",
  "timeline.noTimingData": "計測データなし",
  "timeline.total": "合計 {duration}",
  "timeline.started": "{time} に開始",
  "timeline.ttftDecoding": "最初のトークンまで {ttft} · デコード {decoding}",
  "layout.compacting": "圧縮中",
  "layout.compactionFailed": "コンテキスト圧縮に失敗",
  "layout.compacted": "コンテキストを圧縮しました",
  "layout.toolCallOnly": "ツール呼び出しのみ",
  "attachment.list": "添付ファイル",
  "attachment.imageName": "画像 {index}",
  "layout.imageCount": "画像 ×{count}",
  "layout.fileAttachments": "ファイル ×{count}",
  "layout.initialSystemPrompt": "初期システムプロンプト",
  "layout.systemPromptUpdated": "システムプロンプトを更新",
  "layout.toolsUpdated": "ツールを更新",
  "layout.toolAdded": "ツール {name} を追加",
  "layout.toolRemoved": "ツール {name} を削除",
  "layout.toolUpdateNotice": "ツールが更新されました",
  "layout.toolsAdded": "追加：{names}",
  "layout.toolsAddedCount": "{count} 件を追加",
  "layout.toolsChanged": "{added} 件追加、{removed} 件削除",
  "layout.toolsRemoved": "削除：{names}",
  "layout.toolsRemovedCount": "{count} 件を削除",
  "layout.systemPromptAndToolsUpdated": "システムプロンプトとツールを更新",
  "layout.compactionInterrupted": "コンテキスト圧縮は完了前に中断されました。",
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
  "defaultWorkspace.failed":
    "デフォルトのワークスペースを作成できませんでした。「ワークスペースを選択」からフォルダーを選択してください",
  "group.ungrouped": "未グループ化",
  "session.new": "新規セッション",
  "session.untitled": "無題",
  "shortcut.noSession": "先にセッションを選択してください",
  "shortcut.noPicker": "ディレクトリ選択ツールを利用できません",
  "shortcut.directoryBusy": "ワークスペースを選択中または追加中です",
  "shortcut.noCompletedTurn": "このセッションには完了したターンがありません",
  "shortcut.forkFailed": "セッションを分岐できませんでした。再試行してください",
  "section.workspaces": "ワークスペース",
  "section.sessions": "セッション",
  "viewOptions.label": "表示設定",
  "viewOptions.hideArchived": "アーカイブ済みを非表示",
  "viewOptions.showArchived": "すべてのセッション（アーカイブ済みを表示）",
  "viewOptions.onlyArchived": "アーカイブ済みのみ",
  "groupBy.label": "グループ化",
  "groupBy.workspace": "ワークスペース別",
  "groupBy.workspaceTree": "ワークスペースツリー別",
  "groupBy.flat": "リスト表示",
  "orderBy.label": "並べ替え",
  "orderBy.manual": "手動",
  "orderBy.updated": "更新日時順",
  "filterBy.label": "絞り込み",
  "sessions.expand": "残り {n} 件のセッションを表示",
  "sessions.collapse": "折りたたむ",
  "empty.none": "セッションがありません",
  "empty.noneArchived": "アーカイブ済みのセッションがありません",
  "empty.noMatches": "一致する結果がありません",
  "empty.viewOthers": "他のセッションを表示",
  "workspace.add": "ワークスペースを追加",
  "search.sessions.aria": "セッションを検索",
  "search.placeholder": "セッション名を検索",
  "search.clear": "検索をクリア",
  "search.results.aria": "検索結果",
  "search.pending": "セッション履歴を検索中",
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
  "archive.confirm.title": "このセッションを停止してアーカイブしますか？",
  "archive.confirm.desc":
    "「{title}」には進行中の作業があります。アーカイブするとまず作業が停止されます。セッションは後からサイドバーの「すべてのセッション（アーカイブ済みを表示）」フィルターから復元できますが、停止された作業が自動的に再開することはありません。",
  "archive.confirm.activity": "停止される作業",
  "archive.confirm.turn": "実行中のターン",
  "archive.confirm.subagents.one": "実行中のサブエージェント {n} 件：{names}",
  "archive.confirm.subagents.other": "実行中のサブエージェント {n} 件：{names}",
  "archive.confirm.jobs.one": "バックグラウンドタスク {n} 件：{names}",
  "archive.confirm.jobs.other": "バックグラウンドタスク {n} 件：{names}",
  "archive.confirm.schedules.one": "スケジュールタスク {n} 件：{names}",
  "archive.confirm.schedules.other": "スケジュールタスク {n} 件：{names}",
  "archive.confirm.other.one": "その他の作業 {n} 件（{kind}）",
  "archive.confirm.other.other": "その他の作業 {n} 件（{kind}）",
  "archive.confirm.listSeparator": "、",
  "archive.confirm.action": "停止してアーカイブ",
  "archive.confirm.pending": "停止してアーカイブ中…",
  "menu.fork": "セッションをフォーク",
  "menu.archiveSession": "セッションをアーカイブ",
  "menu.unarchiveSession": "セッションをアーカイブ解除",
  "menu.pinSession": "セッションをピン留め",
  "menu.unpinSession": "セッションのピン留めを解除",
  "row.archived": "アーカイブ済み",
  "row.pinned": "ピン留め済み",
  "toast.archivedNotOpenable":
    "アーカイブ済みのセッションは開けません。表示するにはアーカイブを解除してください",
  "toast.archived": "セッションをアーカイブしました。",
  "toast.stoppedAndArchived": "セッションを停止してアーカイブしました。",
  "toast.archivedUndo": "元に戻す",
  "toast.archivedOr": "または",
  "toast.archivedFilter": "アーカイブ済みのセッションを表示",
  "toast.pinFailed": "ピン留めに失敗しました。しばらくしてから再試行してください",
  "toast.unpinFailed": "ピン留めの解除に失敗しました。しばらくしてから再試行してください",
  "toast.createFailed": "新規セッションの作成に失敗しました：{message}",
  "sessions.count.one": "{n} セッション",
  "sessions.count.other": "{n} セッション",
  "actions.workspace.aria": "ワークスペース「{name}」の操作",
  "actions.session.aria": "セッション「{name}」の操作",
  "actions.archive": "アーカイブ",
  "actions.unarchive": "アーカイブ解除",
  "actions.pin": "ピン留め",
  "actions.unpin": "ピン留め解除",
  "actions.newSession": "新規セッション",
  "actions.newSession.aria": "「{name}」に新規セッションを作成",
  "status.running": "実行中",
  "status.subagentsRunning.one": "{n} 件のサブエージェントが実行中",
  "status.subagentsRunning.other": "{n} 件のサブエージェントが実行中",
  "status.idle": "待機中",
  "status.waitingApproval": "承認待ち",
  "status.planReview": "プランレビュー待ち",
  "status.waitingAnswer": "回答待ち",
  "status.compact.approval": "承認",
  "status.compact.planReview": "プランレビュー",
  "status.compact.answer": "回答",
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

export const DICTS: Record<string, Record<string, string>> = {
  approval: approval,
  chat: chat,
  command: command,
  common: common,
  conversation: conversation,
  cordis: cordis,
  deliverables: deliverables,
  "directory-browser": directoryBrowser,
  documentHtml: documentHtml,
  documentMarkdown: documentMarkdown,
  feedback: feedback,
  goal: goal,
  job: job,
  model: model,
  "open-in-app": openInApp,
  "permission.access": permissionAccess,
  plan: plan,
  question: question,
  reference: reference,
  pluginManager: pluginManager,
  "settings.account": settingsAccount,
  "settings.agentLoop": settingsAgentLoop,
  "settings.sessionLog": settingsSessionLog,
  "settings.shell": settingsShell,
  "settings.subagent": settingsSubagent,
  "settings.webSearch": settingsWebSearch,
  shortcuts: shortcuts,
  "shortcuts.layout": shortcutsLayout,
  sidebarBrowser: sidebarBrowser,
  sidebarExcel: sidebarExcel,
  sidebarOffice: sidebarOffice,
  sidebarTerminal: sidebarTerminal,
  "session-log-download": sessionLogDownload,
  settings: settings,
  "settings.agentPreset": settingsAgentPreset,
  "settings.locale": settingsLocale,
  "settings.models": settingsModels,
  "settings.permission": settingsPermission,
  "settings.pluginInventory": settingsPluginInventory,
  "settings.plugins": settingsPlugins,
  "settings.theme": settingsTheme,
  sidebar: sidebar,
  sidebarCodePreview: sidebarCodePreview,
  sidebarDocumentPreview: sidebarDocumentPreview,
  sidebarFiles: sidebarFiles,
  sidebarImage: sidebarImage,
  sidebarPdf: sidebarPdf,
  sidebarRight: sidebarRight,
  skill: skill,
  "slash.menu": slashMenu,
  subagent: subagent,
  trajectory: trajectory,
  workflowRun: workflowRun,
  workspace: workspace,
};
