# ADR-0006: Adopt the public language-pack API

- Status: Accepted
- Date: 2026-09-11

## Context

DSH `0.1.5-rc.2` ships a public language-pack surface on the client `locale`
service, removing the reasons [ADR-0002](./0002-extend-the-locale-service-through-internal-fields.md)
and [ADR-0003](./0003-client-side-persistence-for-the-injected-locale.md)
existed:

- `locale.addLanguage({ id, label, fallback })` registers a selectable
  language in the runtime's own catalog, validates its fallback chain, and
  returns an idempotent disposer.
- The Host locale settings schema changed from `preference?: 'zh'|'en'` to
  `preference?: <any BCP 47 tag>`, so `setLocale('ja')` persists through the
  Host locale scope legitimately.
- `addLanguage` re-resolves a stored but currently unresolvable preference,
  so a boot with `preference: ja` lands on Japanese as soon as this plugin
  registers the language.
- Per-key lookup walks the active language's declared fallback chain, and a
  language absent from the catalog resolves every key through `en` — the
  ADR-0002 snapshot surgery stopped applying once this lookup model landed.

## Decision

Drive only the public API:

- `extendLocaleService` calls `locale.addLanguage({ id: 'ja', label: '日本語',
  fallback: 'en' })` and returns its disposer.
- Selection, persistence, restore, and Host sync are the runtime's own
  `setLocale`/`adopt` paths; the plugin adds no wrappers and no storage.
- `preference.ts` (localStorage persistence) is deleted, and with it the
  plugin-owned `dsh-locale-ja:preference` key.
- The `locale` service remains the only injected dependency; the plugin still
  registers its dictionaries through `locale.register`.

ADR-0002's internals drive (`snapshot`/`publish`/`adopt`) and ADR-0003's
client-side persistence are retired with this decision.

## Consequences

- `ja` persists in the Host `settings.yaml` under `locale.preference`, shared
  across browsers on that Host rather than per-browser localStorage.
- Removing the plugin while Japanese is active leaves the stored `ja`
  preference in place; the runtime falls back for as long as the language is
  unregistered, and a reinstall restores Japanese automatically.
- Compatibility now rests on a documented public contract instead of private
  field shapes; the pre-0.1.5 internals approach remains in ADR-0002 for
  history.
