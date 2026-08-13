# ADR-0003: Client-side persistence for the injected locale

- Status: Accepted
- Date: 2026-08-14

## Context

The durable locale preference lives in the host user-settings document under
the `locale` namespace, validated by `LocaleSettingsSchema =
union(["zh", "en"])`. Selecting Japanese would call `host.set("preference",
"ja")`, which the host schema **rejects**; the rejected write then reloads host
state and `adopt()` reverts the UI off Japanese.

Additionally, `settings.register()` throws on a duplicate namespace, so the
`locale` schema cannot be cleanly re-registered with a wider union.

## Decision

Persist the Japanese choice **client-side in `localStorage`**, and never write
`ja` to the host:

- `setLocale('ja')` switches the locale (session-local) and stores the choice
  in `localStorage`; it does **not** call `host.set`.
- `setLocale('zh'|'en')` writes through to the host as normal and clears the
  stored override.
- On load, a stored `ja` preference is re-applied; the `adopt` override
  prevents a late host sync from reverting it.

## Alternatives considered

- **Re-register the `locale` namespace with a wider schema.** Rejected:
  `settings.register()` throws on a duplicate namespace.
- **Mutate the existing registration's `schema` field.** Rejected: deep,
  fragile internal mutation tied to `dsh-settings` internals.
- **Host in-memory storage via Package-private RPC.** Rejected: `localStorage`
  is simpler, fully client-side, reversible, and also survives a page refresh.

## Consequences

- The Japanese selection survives a page refresh (within the same browser) but
  is not stored in the host document and is not shared across browsers/profiles.
- This matches the plugin's nature (a dynamic, process-local extension); if DSH
  later accepts `ja` in the host schema, persistence can move there.
