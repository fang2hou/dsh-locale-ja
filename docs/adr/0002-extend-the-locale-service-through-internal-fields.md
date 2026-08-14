# ADR-0002: Extend the locale service through its internal fields

- Status: Accepted
- Date: 2026-08-14

## Context

In DSH `0.1.0-rc.6`, the client `locale` service can register dictionaries
and switch locales, but it has no public way to add a selectable locale:

- `LOCALE_IDS` is frozen as `['zh','en']`.
- The selectable-list state is held in a private `snapshot`.
- `setLocale(id)` rejects an id that is not already selectable.

Registering Japanese dictionaries alone therefore cannot make 日本語 appear in
the language selector.

## Decision

Extend the service through the same internal fields used by the runtime:

- Reassign `locale.snapshot` to a frozen snapshot whose locales include `ja`.
- Call `locale.publish(active, true)` to bump the revision and refresh outlets.
- Wrap `locale.setLocale` for the injected locale and wrap `locale.adopt` so a
  host-preference sync cannot revert an injected locale.

The only module that contacts these internals is
`src/client/locale-extension.ts`, behind one narrow typed view. A runtime
capability check fails loudly with a clear message when an incompatible DSH no
longer provides the expected fields or shapes. The shipped client bundles are
unminified, so `snapshot`, `publish`, and `adopt` survive publication verbatim.

## Alternatives considered

- **Patch the shipped `dsh-client-locale` package.** Rejected: it mutates
  shipped code, breaks on upgrade, and is not shareable.
- **Register dictionaries only.** Rejected: Japanese remains unreachable from
  the selector and `setLocale('ja')` rejects it.

## Consequences

- The plugin is coupled to the runtime member names and shapes
  `snapshot`, `publish`, `setLocale`, and `adopt`. Every DSH upgrade requires
  re-verifying them against the shipped bundle; the runtime check is the
  compatibility guard.
- All overrides are restored through `ctx.effect` teardown, returning the
  service to its shipped behavior when the plugin stops or is removed.
- Persistence behavior for the injected locale is defined in
  [ADR-0003](./0003-client-side-persistence-for-the-injected-locale.md).
