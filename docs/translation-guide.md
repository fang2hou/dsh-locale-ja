# Japanese translation guide

## Review the action, not just the source word

Read the English and Chinese strings and their call sites in the pinned DSH
packages under `node_modules/@deepseek-ai/`. The control's actual behavior is
the deciding context. For example, a queue button adds a message for later
delivery; it does not merely report that delivery is waiting.

Prefer wording familiar to Japanese users of current AI products. Formal
grammar and style guides are supporting references, not the acceptance criteria.
Keep established terms such as トークン, 推論, スキル, サブエージェント, and
トレース instead of inventing more formal Japanese equivalents. Avoid slang,
memes, and literal translations that users would not expect in an AI tool.

Usage references checked on 2026-09-15:

- [Claude's Japanese latency guide](https://platform.claude.com/docs/ja/test-and-evaluate/strengthen-guardrails/reduce-latency)
  uses 最初のトークンまでの時間 for TTFT.
- [Sakura Internet's AI observability article](https://knowledge.sakura.ad.jp/51163/)
  uses TTFT directly and explains it as the wait for the first output token.
- [Microsoft's Japanese reasoning-model guide](https://learn.microsoft.com/ja-jp/azure/foundry/openai/how-to/reasoning)
  uses 推論トークン.
- [Claude's Japanese subagent documentation](https://code.claude.com/docs/ja/sub-agents)
  uses サブエージェント and プランモード.
- [Sakana AI's Namazu announcement](https://sakana.ai/namazu-api/)
  uses 指示追従 for instruction following; the feedback category uses
  指示の理解と追従 rather than the more formal 遵守.

These are examples of actual usage, not authorities that make every literal
translation natural. Choose compact labels for controls and fuller explanations
for help text; check each choice in its real UI.

Keep buttons short and action-oriented. Use polite Japanese (`です・ます`) for
explanations and errors, and short labels without final punctuation for buttons,
headings, and statuses. Preserve product names, command names, paths, and every
placeholder, including repeated occurrences. Do not translate `/plan`, `ID`,
`API`, or `JSON` as if they were prose.

## Shared terminology

| Concept | Japanese | Context |
| --- | --- | --- |
| Token usage | トークン使用量 / 使用量 | Counts of consumed tokens; never 用量 |
| Reasoning | 推論 | Reasoning tokens and activity; never 推理 |
| Reasoning effort | 思考レベル | Model selection and its settings description |
| Instruction following | 指示の理解と追従 | Feedback category; established AI usage of 追従 |
| Time to first token | 最初のトークンまでの時間 | Keep TTFT where present; distinguish an average from a single measurement |
| Full access | フルアクセス | Use the same name in the menu, confirmation, and enable button |
| Workspace write | ワークスペース内の書き込み | Permission limited to the workspace |
| Duplicate preset | 複製 / プリセットを複製 | Creates a separate preset; distinguish from clipboard copy (コピー) |
| Present files | ファイルを提示 | Presents files in the conversation; does not imply distribution to others |
| Queue message | キューに追加 | Adds a pending message |
| Steer | 割り込み送信 | Sends a message during an active run |
| Trace / trajectory | トレース | View name, loading state, and accessibility labels |
| Plan / skill / subagent | プラン / スキル / サブエージェント | UI concepts; retain literal tool or command identifiers |

Use `件` for subagent counts so interpolated values such as 12 remain natural.
Keep `.one` and `.other` strings identical when Japanese has no corresponding
singular/plural distinction. Preserve numeric formats such as `{value}K` and
units such as `tok/s`.

## Validation

1. Compare each changed value with the pinned source and the control it labels.
   Check subjects, scope (current session versus new sessions), negation, timing,
   and what is retained after cancellation or removal.
2. Compare keys and placeholder multisets before and after the edit. TypeScript
   checks dictionary keys, not the placeholders or meaning of string values.
3. Run `pnpm typecheck`, then `mise run check`.
4. For contextual changes, run `mise run e2e`. It covers language selection,
   persistence, removal, permission and preset dialogs, and reply usage panels.
   Inspect the Japanese screenshots in `e2e/.artifacts/` for wrapping, clipping,
   and whether each action label matches the resulting view.

The compact-label checks in `e2e/copy-layout.ts` compare old and new text in the
same real DOM element at 1280px and 1024px viewport widths. They wait for fonts,
measure text line boxes, and reject wrapping or clipping of single-line labels.
The old text is substituted only during measurement and restored immediately;
no runtime locale objects or CSS are modified. JSON measurements and screenshots
are test artifacts. Keep these checks when shortening or revising a label: do
not make it fit by shrinking the font, hiding overflow, or forcing `nowrap`.

For a control outside those flows, reproduce its actual UI or record that the
wording received source review only. A passing text assertion proves that a
label appears and the tested action works; it does not judge Japanese fluency.

## Documentation accuracy

The README describes the browser UI on the `web` profile. Keep its settings path
aligned with the real UI. Explain that removing the plugin unregisters its
language and dictionaries but retains the Host's saved language preference.
When Japanese remains selected, removal falls back to English and reinstalling
restores Japanese. Do not claim that uninstalling deletes the saved preference
or that every possible extension's UI is translated.
