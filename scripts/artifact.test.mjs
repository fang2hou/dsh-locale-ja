/**
 * Integration test for the BUILT artifact (dist/client.js).
 *
 * Loads the real build output as a function body (the way the harness does),
 * drives it against a mock `locale` service that mirrors LocaleRuntime
 * semantics, and asserts the behavior the plugin must guarantee:
 *   - `ja` becomes selectable
 *   - every namespace is registered with `ja`
 *   - the Japanese font stylesheet is inserted when `ja` becomes active
 *   - `setLocale('ja')` does not touch the host; `setLocale('en')` does
 *   - `adopt` does not revert an injected locale
 *   - teardown fully reverses every side effect
 *
 * Run: `node scripts/artifact.test.mjs` (or `mise run test`).
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifact = readFileSync(resolve(root, "dist/client.js"), "utf8").replace(
  /^\/\*[\s\S]*?\*\/\s*/,
  "",
);

const NAMESPACE_COUNT = 29;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

function createMockLocale() {
  const registrations = [];
  const hostSets = [];
  const subscribers = new Set();
  let snapshot = Object.freeze({
    active: "zh",
    locales: Object.freeze([
      { id: "zh", label: "中文" },
      { id: "en", label: "English" },
    ]),
    revision: 0,
  });
  return {
    get snapshot() {
      return snapshot;
    },
    set snapshot(value) {
      snapshot = value;
    },
    getLocale() {
      return snapshot;
    },
    getSnapshot() {
      return snapshot;
    },
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    register(namespace, locale) {
      registrations.push({ namespace, locale });
      return () => {
        const i = registrations.findIndex((r) => r.namespace === namespace && r.locale === locale);
        if (i >= 0) registrations.splice(i, 1);
      };
    },
    publish(active) {
      snapshot = Object.freeze({
        active,
        locales: snapshot.locales,
        revision: snapshot.revision + 1,
      });
      for (const fn of subscribers) fn();
    },
    // Base implementations; the plugin overrides both.
    setLocale(id) {
      throw new Error(`locale "${id}" is not registered`);
    },
    adopt() {},
    host: {
      set(field, value) {
        hostSets.push({ field, value });
        return Promise.resolve();
      },
    },
    // Test-accessible mirrors of internal state.
    registrations,
    hostSets,
  };
}

// Harness injects: ctx, React, host, styles, console.
const factory = new Function("ctx", "React", "host", "styles", "console", artifact);

const insertedCss = [];
const disposedCss = [];
const styles = {
  insert(css) {
    insertedCss.push(css);
    return () => disposedCss.push(css);
  },
};

const locale = createMockLocale();
let teardown = null;
const ctx = {
  locale,
  effect(disposer) {
    teardown = disposer();
  },
};

const plugin = factory(ctx, undefined, undefined, styles, console);
assert(
  plugin && Array.isArray(plugin.inject) && plugin.inject.includes("locale"),
  "artifact returns a plugin injecting 'locale'",
);
assert(typeof plugin.apply === "function", "artifact returns a plugin with apply()");

// --- apply (active locale is still zh) ---
plugin.apply(ctx);

assert(
  locale.getLocale().locales.some((l) => l.id === "ja"),
  "ja is added to selectable locales",
);

const jaRegistrations = locale.registrations.filter((r) => r.locale === "ja");
assert(
  jaRegistrations.length === NAMESPACE_COUNT,
  `registered ${NAMESPACE_COUNT} namespaces for ja (got ${jaRegistrations.length})`,
);
assert(
  ["common", "conversation", "trajectory", "workspace"].every((ns) =>
    jaRegistrations.some((r) => r.namespace === ns),
  ),
  "key namespaces registered for ja",
);
assert(insertedCss.length === 0, "font not inserted while zh is active");

// --- switching to ja inserts the font and never touches the host ---
locale.setLocale("ja");
assert(locale.getLocale().active === "ja", "setLocale('ja') switches active to ja");
assert(locale.hostSets.length === 0, "setLocale('ja') does not touch the host");
assert(
  insertedCss.some((css) => css.includes("--dsw-font-family") && css.includes("Hiragino Sans")),
  "Japanese font stylesheet inserted when ja becomes active",
);

// --- adopt must not revert an injected locale ---
locale.adopt(locale.host);
assert(locale.getLocale().active === "ja", "adopt does not revert an injected locale");

// --- switching to en disposes the font and writes through to the host ---
const hostSetsBefore = locale.hostSets.length;
locale.setLocale("en");
assert(locale.getLocale().active === "en", "setLocale('en') switches active to en");
assert(locale.hostSets.length === hostSetsBefore + 1, "setLocale('en') writes through to the host");
const last = locale.hostSets.at(-1);
assert(
  last && last.field === "preference" && last.value === "en",
  "setLocale('en') writes preference=en",
);
assert(disposedCss.length === insertedCss.length, "font stylesheet disposed when leaving ja");

// --- teardown reverses every side effect ---
assert(typeof teardown === "function", "teardown disposer registered");
teardown();
assert(!locale.getLocale().locales.some((l) => l.id === "ja"), "teardown removes ja from locales");
assert(
  locale.registrations.every((r) => r.locale !== "ja"),
  "teardown disposes all ja registrations",
);
let baseSetLocaleRestored = false;
try {
  locale.setLocale("zh");
} catch {
  baseSetLocaleRestored = true;
}
assert(baseSetLocaleRestored, "teardown restores the base setLocale (throws for unregistered)");

if (process.exitCode) {
  console.error("artifact test FAILED");
} else {
  console.log(
    "✔ artifact test passed (ja selectable, 29 namespaces, font, persistence, adopt guard, teardown)",
  );
}
