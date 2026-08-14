/**
 * Persistence for the injected locale selection.
 *
 * The Host `locale` settings schema accepts only the shipped ids (`zh` / `en`),
 * so a `ja` selection cannot live in the Host document. It is kept in
 * `localStorage` instead, which makes it survive a page reload while staying
 * scoped to the browser profile that chose it.
 *
 * Every access is guarded: the accessor throws both when storage is denied
 * (private windows, blocked cookies) and when there is no `window` at all
 * (booting the client tree outside a browser). A failed read or write only
 * costs the persistence, never the language switch itself.
 */

/** Storage key holding the injected locale id, namespaced to this plugin. */
const STORE_KEY = "dsh-locale-ja:preference";

/** Read the persisted injected locale id, or `null` when unset or unavailable. */
export function readPreference(): string | null {
  try {
    return window.localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

/**
 * Persist the injected locale selection, or clear it with `null` to hand the
 * preference back to the Host.
 * @param id - the injected locale id to remember, or `null` to forget.
 */
export function writePreference(id: string | null): void {
  try {
    if (id === null) window.localStorage.removeItem(STORE_KEY);
    else window.localStorage.setItem(STORE_KEY, id);
  } catch {
    // Storage unavailable: the selection still applies for this page view.
  }
}
