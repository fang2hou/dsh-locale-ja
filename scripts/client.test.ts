/**
 * Integration test for the built browser bundle (`lib/client.js`).
 *
 * The bundle is evaluated the way the shell evaluates it — as a script that
 * calls `window.__ModuleLoader__.load({ id, factory })` — and then driven
 * against a stand-in locale service that mirrors the shipped `LocaleRuntime`
 * semantics (snapshot freezing, `publish` revision bumps, `setLocale`
 * validation, `adopt` from the Host scope) plus stubs for the browser APIs the
 * plugin touches.
 *
 * What this covers that `tsc` cannot: the envelope the loader requires, that the
 * bundle resolves nothing through the platform module table, and the runtime
 * behavior of the locale extension including full teardown.
 *
 * Run after `pnpm build` (`mise run test` builds first).
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { name: PACKAGE_ID } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  name: string;
};
const bundle = readFileSync(resolve(root, "lib/client.js"), "utf8");

/** Namespaces the plugin must register Japanese dictionaries for. */
const NAMESPACE_COUNT = 29;

let failures = 0;

/**
 * Assert a condition, recording a failure instead of throwing so one broken
 * expectation still reports the rest.
 * @param condition - the expectation.
 * @param message - what was expected.
 */
function assert(condition: boolean, message: string): void {
  if (condition) console.log(`  ✓ ${message}`);
  else {
    failures += 1;
    console.error(`  ✗ ${message}`);
  }
}

// --- browser stubs --------------------------------------------------------

/** One style tag the stubbed `document` hands out. */
interface StyleTagStub {
  dataset: Record<string, string>;
  textContent: string;
  remove(): void;
}

/** The `document` surface the bundle touches. */
interface DocumentStub {
  createElement(): StyleTagStub;
  head: { append(tag: StyleTagStub): void };
}

/** The `localStorage` surface the bundle touches. */
interface LocalStorageStub {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** The `window` surface the loader envelope touches. */
interface WindowStub {
  __ModuleLoader__: { load(entry: LoaderEntry): void };
  localStorage: LocalStorageStub;
}

/** The contract the browser bundle must export. */
interface ClientPlugin {
  inject: readonly string[];
  apply: (ctx: unknown) => void;
}

/** One module registered through the loader envelope. */
interface LoaderEntry {
  id: string;
  factory: (require: (specifier: string) => unknown) => ClientPlugin;
}

/** The `ctx` surface the bundle's `apply` touches. */
interface ContextStub {
  locale: LocaleStandIn;
  effect(fn: () => () => void, description?: string): void;
}

/**
 * Minimal `document` covering the plugin's stylesheet ownership.
 * @returns the stub plus the live list of appended style tags.
 */
function createDocument(): { tags: StyleTagStub[]; document: DocumentStub } {
  const head: StyleTagStub[] = [];
  return {
    tags: head,
    document: {
      createElement() {
        const tag: StyleTagStub = {
          dataset: {},
          textContent: "",
          remove() {
            const at = head.indexOf(tag);
            if (at !== -1) head.splice(at, 1);
          },
        };
        return tag;
      },
      head: {
        append(tag) {
          head.push(tag);
        },
      },
    },
  };
}

/**
 * Minimal `localStorage`.
 * @param initial - entries present before the plugin runs.
 * @returns the storage stub.
 */
function createStorage(initial: Record<string, string> = {}): {
  entries: Map<string, string>;
  localStorage: LocalStorageStub;
} {
  const entries = new Map(Object.entries(initial));
  return {
    entries,
    localStorage: {
      getItem: (key) => entries.get(key) ?? null,
      setItem: (key, value) => entries.set(key, value),
      removeItem: (key) => entries.delete(key),
    },
  };
}

// --- locale service stand-in ---------------------------------------------

/** One entry of the selectable locale list. */
interface LocaleEntry {
  id: string;
  label: string;
}

/** The immutable snapshot the locale service hands the UI. */
interface Snapshot {
  active: string;
  locales: readonly LocaleEntry[];
  revision: number;
}

/** One dictionary registration recorded by the stand-in. */
interface Registration {
  ns: string;
  id: string;
  dict: unknown;
}

/** One write the stand-in forwarded to the Host scope. */
interface HostWrite {
  field: string;
  value: string;
}

/** The Host settings scope the service syncs with. */
interface HostScope {
  preference: string;
  set(field: string, value: string): void;
  getSnapshot(): { value?: { preference?: string } };
}

/** The recorded, drivable stand-in for the shipped `LocaleRuntime`. */
interface LocaleStandIn {
  registrations: Registration[];
  hostWrites: HostWrite[];
  host: HostScope;
  provisional: string;
  snapshot: Snapshot;
  events: string[];
  getLocale(): Snapshot;
  getSnapshot(): Snapshot;
  subscribe(fn: () => void): () => void;
  register(ns: string, id: string, dict: unknown): () => void;
  setLocale(id: string): void;
  adopt(scope: HostScope): void;
  publish(active: string, localeChanged: boolean): void;
}

/**
 * A stand-in for the shipped `LocaleRuntime`, reproducing the behavior the
 * plugin depends on: a frozen snapshot, `publish` as the only mutation path,
 * `setLocale` rejecting unregistered ids and writing through to the Host, and
 * `adopt` following the Host scope.
 * @returns the service plus the recorded interactions.
 */
function createLocale(): LocaleStandIn {
  const registrations: Registration[] = [];
  const hostWrites: HostWrite[] = [];
  const listeners = new Set<() => void>();
  const host: HostScope = {
    preference: "en",
    set(field, value) {
      hostWrites.push({ field, value });
    },
    getSnapshot() {
      return { value: { preference: host.preference } };
    },
  };

  const locale: LocaleStandIn = {
    registrations,
    hostWrites,
    host,
    provisional: "zh",
    snapshot: Object.freeze({
      active: "zh",
      locales: Object.freeze([
        { id: "zh", label: "中文" },
        { id: "en", label: "English" },
      ]),
      revision: 0,
    }),
    events: [],

    getLocale() {
      return locale.snapshot;
    },
    getSnapshot() {
      return locale.snapshot;
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    register(ns, id, dict) {
      const entry = { ns, id, dict };
      registrations.push(entry);
      locale.publish(locale.snapshot.active, false);
      return () => {
        const at = registrations.indexOf(entry);
        if (at !== -1) registrations.splice(at, 1);
      };
    },
    setLocale(id) {
      const match = locale.snapshot.locales.find((entry) => entry.id === id);
      if (match === undefined) throw new Error(`locale "${id}" is not registered`);
      if (locale.snapshot.active === match.id) return;
      locale.publish(match.id, true);
      host.set("preference", match.id);
    },
    adopt(scope) {
      const section = scope.getSnapshot().value;
      if (section === undefined) return;
      const target = section.preference ?? locale.provisional;
      if (locale.snapshot.active === target) return;
      locale.publish(target, true);
    },
    publish(active, localeChanged) {
      locale.snapshot = Object.freeze({
        active,
        locales: locale.snapshot.locales,
        revision: locale.snapshot.revision + 1,
      });
      if (localeChanged) locale.events.push(active);
      // Snapshot the set: a listener may unsubscribe during notification, which
      // is exactly what the shipped runtime guards against here.
      for (const fn of Array.from(listeners)) fn();
    },
  };
  return locale;
}

// --- load the bundle ------------------------------------------------------

const loaded: LoaderEntry[] = [];
const dom = createDocument();
const storage = createStorage();
const window: WindowStub = {
  __ModuleLoader__: {
    load(entry) {
      loaded.push(entry);
    },
  },
  localStorage: storage.localStorage,
};

// eslint-disable-next-line no-new-func -- evaluating the artifact is the point
const evaluateBundle = new Function("window", "document", bundle) as (
  window: WindowStub,
  document: DocumentStub,
) => void;
evaluateBundle(window, dom.document);

console.log("bundle envelope");
assert(loaded.length === 1, "registers exactly one module with the loader");
assert(loaded[0]?.id === PACKAGE_ID, `registers under the package id (${PACKAGE_ID})`);

const loaderEntry = loaded[0];
if (loaderEntry === undefined) throw new Error("the loader registered no module to drive");
const plugin = loaderEntry.factory(function require(specifier: string): never {
  throw new Error(`bundle must not resolve platform modules, but required ${specifier}`);
});

assert(
  Array.isArray(plugin.inject) && plugin.inject.includes("locale"),
  "injects the locale service",
);
assert(typeof plugin.apply === "function", "exports apply()");

// --- activation ----------------------------------------------------------

console.log("activation");
let locale = createLocale();
let disposers: Array<() => void> = [];
const ctxOf = (service: LocaleStandIn): ContextStub => ({
  locale: service,
  effect(fn, _description) {
    disposers.push(fn());
  },
});

plugin.apply(ctxOf(locale));

const japanese = locale.registrations.filter((entry) => entry.id === "ja");
assert(japanese.length === NAMESPACE_COUNT, `registers ${NAMESPACE_COUNT} namespaces for ja`);
assert(
  ["common", "conversation", "trajectory", "workspace", "permission.access"].every((ns) =>
    japanese.some((entry) => entry.ns === ns),
  ),
  "covers the namespaces owned by different packages",
);
assert(
  locale.getLocale().locales.some((entry) => entry.id === "ja"),
  "adds 日本語 to the selectable locales",
);
assert(locale.events.length > 0, "emits a locale change so a mounted selector refreshes");
assert(dom.tags.length === 0, "inserts no stylesheet while zh is active");

// --- switching to Japanese ----------------------------------------------

console.log("switching to ja");
const writesBefore = locale.hostWrites.length;
locale.setLocale("ja");

assert(locale.getLocale().active === "ja", "setLocale('ja') activates Japanese");
assert(locale.hostWrites.length === writesBefore, "never writes ja to the Host schema");
assert(storage.entries.get("dsh-locale-ja:preference") === "ja", "persists the selection locally");
assert(dom.tags.length === 1, "inserts exactly one stylesheet");
assert(
  dom.tags[0]?.dataset.plugin === PACKAGE_ID && typeof dom.tags[0]?.dataset.pluginCss === "string",
  "tags the stylesheet as plugin-owned",
);
const fontTag = dom.tags[0];
assert(
  fontTag !== undefined &&
    fontTag.textContent.includes("--dsw-font-family") &&
    fontTag.textContent.includes("Hiragino Sans"),
  "overrides the base font token with Japanese system faces",
);

locale.adopt(locale.host);
assert(locale.getLocale().active === "ja", "a Host preference sync does not revert Japanese");

// --- switching back -----------------------------------------------------

console.log("switching back to a shipped locale");
locale.setLocale("en");
assert(locale.getLocale().active === "en", "setLocale('en') activates English");
assert(
  locale.hostWrites.at(-1)?.field === "preference" && locale.hostWrites.at(-1)?.value === "en",
  "writes a shipped locale through to the Host",
);
assert(storage.entries.has("dsh-locale-ja:preference") === false, "clears the local override");
assert(dom.tags.length === 0, "removes the stylesheet");

// --- teardown -----------------------------------------------------------

console.log("teardown");
locale.setLocale("ja");
for (const dispose of disposers.toReversed()) dispose();

assert(
  locale.getLocale().locales.some((entry) => entry.id === "ja") === false,
  "removes 日本語 from the selectable locales",
);
assert(
  locale.getLocale().active === "en",
  "falls back to English when removed while Japanese is active",
);
assert(locale.registrations.length === 0, "disposes every dictionary registration");
assert(dom.tags.length === 0, "removes the stylesheet");

let restored = false;
try {
  locale.setLocale("ja");
} catch {
  restored = true;
}
assert(restored, "restores the shipped setLocale, which rejects unregistered ids");

// --- restoring a persisted selection ------------------------------------

console.log("restoring a persisted selection");
const persisted = createStorage({ "dsh-locale-ja:preference": "ja" });
window.localStorage = persisted.localStorage;
locale = createLocale();
disposers = [];
plugin.apply(ctxOf(locale));
assert(locale.getLocale().active === "ja", "boots straight into Japanese");
for (const dispose of disposers.toReversed()) dispose();

if (failures > 0) {
  console.error(`\nclient bundle test FAILED (${failures})`);
  process.exitCode = 1;
} else {
  console.log("\n✔ client bundle test passed");
}
