# ADR-0004: Japanese fonts via the base font token

- Status: Accepted
- Date: 2026-08-14

## Context

The shipped base font stack `--dsw-font-family` is Chinese-leaning
(`PingFang SC`, `Microsoft YaHei`, `Hiragino Sans GB`, …). Because the same CJK
codepoints are shared across languages, Japanese text rendered with these fonts
uses Chinese-style glyphs — the interface reads as Japanese but *looks* Chinese.

Every typography style token (e.g. `--dsw-font-base-16-font-family`) reads
`var(--dsw-font-family)`, so the base token is the single leverage point.

## Decision

While the active locale is `ja`, insert one stylesheet that overrides
`--dsw-font-family` on `:root` with a Japanese-first system-font stack (Hiragino
on macOS/iOS, Yu Gothic UI / Meiryo on Windows, Noto Sans JP elsewhere), with
Latin system UI fonts first so Latin text keeps the native UI font. Remove the
stylesheet when the locale is not `ja`.

The override reacts to locale changes via `locale.subscribe(syncFont)`.

## Alternatives considered

- **`theme.overrideTokens`.** Rejected: heavier; requires paired light/dark
  values and targets the global theme rather than a single locale-scoped rule.
- **Per-element `font-family`.** Rejected: does not cascade through the many
  components that set their own font.
- **Replacing the global theme.** Rejected: overreaching; affects all locales.

## Consequences

- Latin characters keep the OS UI font; CJK characters render in Japanese style
  only while Japanese is active.
- A single stylesheet toggle owns the effect, applied and removed with the
  locale, and is reversed on teardown.
