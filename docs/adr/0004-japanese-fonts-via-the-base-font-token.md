# ADR-0004: Japanese fonts via the base font token

- Status: Accepted
- Date: 2026-08-14

## Context

The shipped base font stack `--dsw-font-family` is Chinese-leaning. Because
the same CJK codepoints are shared across languages, Japanese text rendered
with that stack uses Chinese-style glyphs.

Every typography style token (for example,
`--dsw-font-base-16-font-family`) reads `var(--dsw-font-family)`, making the
base token the single leverage point. The `styles` builtin is available only
to dynamic plugins, not standard packages, so this plugin must own its
stylesheet.

## Decision

While `ja` is active, create one plugin-owned style tag:

```html
<style data-plugin="@fang2hou/dsh-locale-ja" data-plugin-css="...">
```
The tag overrides `--dsw-font-family` on `:root` with Latin system UI faces
followed by an OS-bundled Japanese-first stack using Hiragino, Yu Gothic,
Meiryo, and Noto Sans JP. No web font is fetched. Insert the tag only while
`ja` is active and
remove it for other locales; synchronize it with locale changes.

The `data-plugin` / `data-plugin-css` attributes follow the convention used by
shipped CSS-module bundles. The contribution is registered through
`ctx.effect`, so teardown removes the tag and restores the shipped behavior.

## Alternatives considered

- **`theme.overrideTokens`.** Rejected: heavier, requires paired light/dark
  values, and targets the global theme rather than a locale-scoped rule.
- **Per-element `font-family`.** Rejected: it does not cascade through the
  many components that set their own font.
- **Replacing the global theme.** Rejected: it overreaches and affects every
  locale.

## Consequences

- Latin text keeps the OS UI font while CJK characters use Japanese glyphs
  only when Japanese is active.
- One locale-scoped stylesheet owns the effect, avoids a network dependency,
  and is reversed on locale changes, plugin updates, or removal.
