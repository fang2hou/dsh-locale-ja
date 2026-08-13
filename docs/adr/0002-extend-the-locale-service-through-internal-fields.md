# ADR-0002: Extend the locale service through its internal fields

- Status: Accepted
- Date: 2026-08-14

## Context

The client `locale` service (`LocaleRuntime`) exposes `register(ns, locale,
dict)` to add dictionaries and `setLocale(id)` to switch the active locale. It
does **not** expose any public method to add a new *selectable* locale:

- The selectable list is the frozen `snapshot.locales`, seeded with the two
  shipped locales.
- `setLocale(id)` throws if `id` is not in `snapshot.locales`.
- `register(...)` only adds dictionaries; it does not extend `snapshot.locales`.

So registering `ja` dictionaries alone is insufficient — the user could never
select Japanese, and `setLocale('ja')` would throw.

## Decision

Drive the locale service through the same internal fields the runtime itself
uses, all reversible on teardown:

- Reassign `locale.snapshot` to a new frozen snapshot whose `locales` includes
  `ja`.
- Call `locale.publish(active, true)` to bump the revision and refresh outlets
  (the Language row re-syncs on the `locale/change` event).
- Override `locale.setLocale` to validate against the (now extended) locale
  list and skip the host write for the injected locale.
- Override `locale.adopt` so a host-preference sync never reverts the UI off an
  injected locale.

These internals are intentionally part of the local `src/types.ts` contract.

## Alternatives considered

- **Patch the shipped `dsh-client-locale` package.** Rejected: mutates shipped
  code, breaks on upgrade, and is not shareable.
- **Register dictionaries only and accept that Japanese is unreachable.**
  Rejected: does not meet the requirement.

## Consequences

- The plugin depends on the field names `snapshot`, `publish`, `adopt`, and
  `host` of `LocaleRuntime`. On a DSH locale-package upgrade, re-verify these
  names against the shipped bundle and update `src/types.ts` if needed.
- All overrides are restored on teardown, so stopping the plugin returns the
  service to its shipped state.
