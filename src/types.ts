/**
 * Minimal local types for the DeepSeek Harness client `locale` service and the
 * Cordis client context this plugin touches.
 *
 * DSH does not ship first-party type packages for dynamic plugins, so these
 * describe only the surface area this plugin relies on. They mirror the
 * runtime contracts of `@deepseek-ai/dsh-client-locale`.
 */

/** One selectable locale: id plus its self-described display name. */
export interface LocaleDefinition {
  /** Locale id (persisted; the `setLocale` argument). */
  id: string;
  /** Display name in its own language (中文 / English / 日本語). */
  label: string;
}

/** Immutable locale state published on every locale or registry change. */
export interface LocaleSnapshot {
  /** Active locale id. */
  active: string;
  /** Selectable locales in display order. */
  locales: readonly LocaleDefinition[];
  /** Monotonic change counter (registry or active changes). */
  revision: number;
}

/**
 * The runtime face of the client `locale` service.
 *
 * `snapshot`, `publish`, `adopt` and `host` are internal to the shipped
 * LocaleRuntime but are intentionally part of this contract: adding a locale
 * that is selectable *and* switchable is not exposed by any public method, so
 * the plugin drives the registry through the same internal fields the runtime
 * itself uses.
 */
export interface LocaleRuntime {
  /** Current immutable snapshot. Reassigned to extend the selectable locales. */
  snapshot: LocaleSnapshot;
  /** Read the current immutable locale snapshot. */
  getLocale(): LocaleSnapshot;
  /** LocaleFace getSnapshot (uSES-safe snapshot for the render machinery). */
  getSnapshot(): LocaleSnapshot;
  /** Notified on every snapshot change; returns an unsubscribe. */
  subscribe(fn: () => void): () => void;
  /** Switch the active locale; throws for unregistered ids. */
  setLocale(id: string): void;
  /** Register one namespace dictionary for one locale; returns a disposer. */
  register(namespace: string, locale: string, dict: Record<string, string>): () => void;
  /** Advance the snapshot revision and notify subscribers. */
  publish(active: string, localeChanged: boolean): void;
  /** Sync the active locale from the durable host preference. */
  adopt(host: SettingsScope): void;
  /** Durable preference scope bound to the `locale` settings namespace. */
  host?: SettingsScope | undefined;
}

/** Subset of the settings scope used to persist durable locale preferences. */
export interface SettingsScope {
  set(field: string, value: unknown): Promise<void> | void;
}

/** Subset of the Cordis client context this plugin consumes. */
export interface ClientContext {
  /** The locale service (declared via `inject: ['locale']`). */
  locale: LocaleRuntime;
  /** Own a reversible side effect; the returned disposer runs on teardown. */
  effect(disposer: () => (() => void) | void, label?: string): void;
}

/** A namespace dictionary: flat key to template string ({placeholder}). */
export type LocaleDict = Record<string, string>;
