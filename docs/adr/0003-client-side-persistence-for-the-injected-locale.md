# ADR-0003: Client-side persistence for the injected locale

- Status: Accepted
- Date: 2026-08-14

## Context

The Host locale settings schema is `preference?: 'zh'|'en'`, so `ja` is
unrepresentable in the Host document. A direct `setLocale('ja')` write would
reach the Host, be rejected by that schema, and let the resulting preference
sync pull the UI back off Japanese.

## Decision

Persist the Japanese choice client-side in `localStorage` under
`dsh-locale-ja:preference`, and never write `ja` to the Host:

- The `setLocale` wrapper stores an injected `ja` selection locally without
  calling the Host.
- Selecting a shipped locale (`zh` or `en`) clears the local override and
  delegates to the shipped path, which may update the Host normally.
- On startup, a stored `ja` preference is re-applied.
- The `adopt` wrapper prevents a Host preference sync from overriding an
  injected locale.

## Alternatives considered

- **Re-register the `locale` namespace with a wider schema.** Rejected:
  `settings.register()` throws on a duplicate namespace.
- **Mutate the existing registration's schema.** Rejected: it is deep,
  fragile mutation tied to `dsh-settings` internals.
- **Host in-memory storage.** Rejected: `localStorage` is simpler, fully
  client-side, reversible, and survives a page refresh.

## Consequences

- The selection survives a page refresh within the same browser profile, but
  is not shared across browsers or profiles.
- `ja` remains outside the Host document. If DSH later accepts `ja` in the
  Host schema, persistence can move there.
