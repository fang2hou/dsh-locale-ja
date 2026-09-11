// Integration test for the built browser bundle (`lib/client.js`): evaluates
// it through `window.__ModuleLoader__.load` the way the shell does, against
// a stand-in locale service mirroring the shipped `LocaleRuntime`.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { name: PACKAGE_ID } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  name: string;
};
const bundle = readFileSync(resolve(root, "lib/client.js"), "utf8");

const NAMESPACE_COUNT = 42;

let failures = 0;

// Records failures instead of throwing so one broken expectation still
// reports the rest.
function assert(condition: boolean, message: string): void {
  if (condition) console.log(`  ✓ ${message}`);
  else {
    failures += 1;
    console.error(`  ✗ ${message}`);
  }
}

// --- browser stubs --------------------------------------------------------

interface StyleTagStub {
  dataset: Record<string, string>;
  textContent: string;
  remove(): void;
}

interface DocumentStub {
  createElement(): StyleTagStub;
  head: { append(tag: StyleTagStub): void };
}

interface WindowStub {
  __ModuleLoader__: { load(entry: LoaderEntry): void };
}

interface ClientPlugin {
  inject: readonly string[];
  apply: (ctx: unknown) => void;
}

interface LoaderEntry {
  id: string;
  factory: (require: (specifier: string) => unknown) => ClientPlugin;
}

interface ContextStub {
  locale: LocaleStandIn;
  effect(fn: () => () => void, description?: string): void;
}

// Minimal `document` covering the plugin's stylesheet ownership.
function createDocument(): {
  tags: StyleTagStub[];
  document: DocumentStub;
} {
  const head: StyleTagStub[] = [];
  const document: DocumentStub = {
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
  };
  return { tags: head, document };
}

// --- locale service stand-in ---------------------------------------------

interface LocaleEntry {
  id: string;
  label: string;
}

interface Snapshot {
  active: string;
  locales: readonly LocaleEntry[];
  revision: number;
}

interface Registration {
  ns: string;
  id: string;
  dict: unknown;
}

interface HostWrite {
  field: string;
  value: string;
}

interface HostScope {
  preference: string;
  set(field: string, value: string): void;
  getSnapshot(): { value?: { preference?: string } };
}

interface LanguageRegistration {
  id: string;
  label: string;
  fallback: string;
}

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
  addLanguage(input: LanguageRegistration): () => void;
  setLocale(id: string): void;
  adopt(scope: HostScope): void;
  publish(active: string, localeChanged: boolean, locales?: readonly LocaleEntry[]): void;
}

// Mirrors the 0.1.5 `LocaleRuntime` contract the plugin depends on: frozen
// snapshots, `addLanguage` re-resolving a stored `ja` preference,
// `setLocale` writing through to the Host scope, `adopt` following it.
function createLocale(initialHostPreference = "en"): LocaleStandIn {
  const registrations: Registration[] = [];
  const hostWrites: HostWrite[] = [];
  const listeners = new Set<() => void>();
  const catalog = new Map<string, LanguageRegistration>([
    ["zh", { id: "zh", label: "中文", fallback: "en" }],
    ["en", { id: "en", label: "English", fallback: "en" }],
  ]);
  const host: HostScope = {
    preference: initialHostPreference,
    set(field, value) {
      hostWrites.push({ field, value });
      if (field === "preference") host.preference = value;
    },
    getSnapshot() {
      return { value: { preference: host.preference } };
    },
  };
  let preference: string = initialHostPreference;
  const localeList = (): readonly LocaleEntry[] =>
    Object.freeze([...catalog.values()].map(({ id, label }) => ({ id, label })));
  const resolveActive = (): string => (catalog.has(preference) ? preference : locale.provisional);

  const locale: LocaleStandIn = {
    registrations,
    hostWrites,
    host,
    provisional: "en",
    snapshot: Object.freeze({
      active: catalog.has(initialHostPreference) ? initialHostPreference : "en",
      locales: localeList(),
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
    addLanguage(input) {
      if (catalog.has(input.id)) throw new Error(`locale "${input.id}" is already registered`);
      catalog.set(input.id, input);
      // publishCatalog: the stored preference re-resolves now that `ja` exists.
      const active = resolveActive();
      locale.publish(active, active !== locale.snapshot.active, localeList());
      return () => {
        if (catalog.get(input.id) !== input) return;
        catalog.delete(input.id);
        const next = resolveActive();
        locale.publish(next, next !== locale.snapshot.active, localeList());
      };
    },
    setLocale(id) {
      if (!catalog.has(id)) throw new Error(`locale "${id}" is not registered`);
      preference = id;
      if (locale.snapshot.active !== id) locale.publish(id, true);
      host.set("preference", id);
    },
    adopt(scope) {
      const section = scope.getSnapshot().value;
      if (section === undefined) return;
      preference = section.preference ?? locale.provisional;
      const target = resolveActive();
      if (locale.snapshot.active === target) return;
      locale.publish(target, true);
    },
    publish(active, localeChanged, locales = locale.snapshot.locales) {
      locale.snapshot = Object.freeze({
        active,
        locales,
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
const window: WindowStub = {
  __ModuleLoader__: {
    load(entry) {
      loaded.push(entry);
    },
  },
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
assert(locale.getLocale().revision > 0, "publishes a fresh snapshot so mounted selectors refresh");
assert(dom.tags.length === 0, "inserts no stylesheet while en is active");

// --- switching to Japanese ----------------------------------------------

console.log("switching to ja");
const writesBefore = locale.hostWrites.length;
locale.setLocale("ja");

assert(locale.getLocale().active === "ja", "setLocale('ja') activates Japanese");
assert(locale.events.at(-1) === "ja", "emits a locale change for the switch");
assert(
  locale.hostWrites.length === writesBefore + 1 &&
    locale.hostWrites.at(-1)?.field === "preference" &&
    locale.hostWrites.at(-1)?.value === "ja",
  "persists ja through the Host locale scope",
);
assert(dom.tags.length === 1, "inserts the font stylesheet");
assert(
  dom.tags.every((tag) => tag.dataset.plugin === PACKAGE_ID),
  "tags the stylesheet as plugin-owned",
);
const fontTag = dom.tags[0];
assert(
  fontTag !== undefined &&
    fontTag.dataset.pluginCss === `${PACKAGE_ID}/japanese-font.css` &&
    fontTag.textContent.includes("--dsw-font-family") &&
    fontTag.textContent.includes("Hiragino Sans"),
  "overrides the base font token with Japanese system faces",
);

locale.adopt(locale.host);
assert(locale.getLocale().active === "ja", "a Host preference sync keeps Japanese");

// --- switching back -----------------------------------------------------

console.log("switching back to a shipped locale");
locale.setLocale("en");
assert(locale.getLocale().active === "en", "setLocale('en') activates English");
assert(
  locale.hostWrites.at(-1)?.field === "preference" && locale.hostWrites.at(-1)?.value === "en",
  "writes a shipped locale through to the Host",
);
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
// The Host scope already holds `ja`; the runtime boots on a fallback because
// the language does not exist yet, and re-resolves once the plugin registers
// it — no plugin-side storage involved.
locale = createLocale("ja");
assert(locale.getLocale().active === "en", "boots on a fallback before the language exists");
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
