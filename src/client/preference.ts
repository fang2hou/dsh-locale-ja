/**
 * Persistence for the injected locale selection: the Host schema accepts only
 * `zh`/`en`, so `ja` lives in `localStorage`, scoped to this plugin and
 * surviving page reloads. Storage is guarded — a failed read or write only
 * costs the persistence, never the language switch.
 */

const STORE_KEY = "dsh-locale-ja:preference";

export function readPreference(): string | null {
  try {
    return window.localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

export function writePreference(id: string | null): void {
  try {
    if (id === null) window.localStorage.removeItem(STORE_KEY);
    else window.localStorage.setItem(STORE_KEY, id);
  } catch {
    // Storage unavailable: the selection still applies for this page view.
  }
}
