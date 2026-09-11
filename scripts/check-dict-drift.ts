/**
 * Upstream dictionary drift check: compares the plugin's Japanese
 * dictionaries against the locale key contracts a DSH release actually
 * ships, failing on missing keys (silent fallback), stale keys, uncovered
 * namespaces, and removed namespaces. `pnpm typecheck` covers the pinned
 * devDependencies, but three namespaces borrow no key union from the
 * platform and nothing watches newer previews — this closes both gaps by
 * installing a full DSH web tree into a throwaway directory and reading the
 * key contracts out of it with the TypeScript compiler.
 *
 * Usage: `node scripts/check-dict-drift.ts [--dsh <version|latest>]`
 * (default `latest`; exit code 1 on any drift or extraction failure).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import ts from "typescript";
import { DICTS } from "../src/client/dictionaries.ts";
import { resolveDshVersion } from "./dsh-version.ts";

/** The web profile composition — its dependency tree is the package set `dsh web` mounts. */
const WEB_APP_PACKAGE = "@deepseek-ai/dsh-web-app";

/**
 * The package that owns the `LocaleNamespaceMap` interface every client
 * package augments. Since the 0.1.0-rc.8 wave it ships only as a
 * devDependency of those packages, so a web-tree install no longer includes
 * it — install it alongside the tree or the probe import cannot resolve.
 */
const NAMESPACE_MAP_PACKAGE = "@deepseek-ai/dsh-client-ui-slots";

/**
 * A declaration file whose namespace merge is not reachable through the
 * package `exports` map (`./client` re-exports nothing of it). Upstream
 * internals: if the path moves, this check fails loudly (module resolution
 * error) — the intended signal to re-derive the extraction points.
 */
const MERGE_DECLARATION = "@deepseek-ai/dsh-client-ui-trajectory/lib/types/client/locales.d.ts";

/**
 * Namespaces registered through the untyped `register(ns, locale, dict)`
 * overload whose key union still exists in an internal declaration file.
 * The declaration path and type name are upstream internals with the same
 * loud-failure contract as {@link MERGE_DECLARATION}.
 */
const UNTYPED_TYPE_NAMESPACES: Record<string, { declaration: string; typeName: string }> = {
  "permission.access": {
    declaration: "@deepseek-ai/dsh-client-ui-permission-presets/lib/types/client/locales.d.ts",
    typeName: "PermissionAccessKey",
  },
};

/**
 * Namespaces whose keys exist only as dictionary literals inside the shipped
 * client bundle (no type anywhere). Keys are read from the bundle's
 * `locale.register(ns, …)` call sites — quoted string literals survive
 * minification — so an unregistered namespace or a bundle shape change
 * yields zero keys and fails loudly, which is exactly the drift signal
 * wanted here.
 */
const RUNTIME_SCANNED_NAMESPACES: { ns: string; pkg: string }[] = [
  {
    ns: "directory-browser",
    pkg: "@deepseek-ai/dsh-client-ui-directory-picker-browse",
  },
  {
    ns: "documentHtml",
    pkg: "@deepseek-ai/dsh-client-ui-sidebar-documentpreview",
  },
  {
    ns: "documentMarkdown",
    pkg: "@deepseek-ai/dsh-client-ui-sidebar-documentpreview",
  },
  {
    ns: "reference",
    pkg: "@deepseek-ai/dsh-client-ui-reference",
  },
  {
    ns: "sidebarCodePreview",
    pkg: "@deepseek-ai/dsh-client-ui-sidebar-documentpreview",
  },
  {
    ns: "sidebarImage",
    pkg: "@deepseek-ai/dsh-client-ui-sidebar-documentpreview",
  },
  {
    ns: "sidebarPdf",
    pkg: "@deepseek-ai/dsh-client-ui-sidebar-documentpreview",
  },
];

/** Parse `--dsh <version|next|latest>` (default `next`). */
function parseArgs(argv: string[]): string {
  const flag = argv.indexOf("--dsh");
  if (flag !== -1 && argv[flag + 1]) return argv[flag + 1]!;
  const inline = argv.find((arg) => arg.startsWith("--dsh="));
  if (inline) return inline.slice("--dsh=".length);
  return "next";
}

/** Install the DSH web tree for `version` into `dir`; throws with npm's output on failure. */
function installWebTree(dir: string, version: string): void {
  console.log(`[drift] installing ${WEB_APP_PACKAGE}@${version} into ${dir}`);
  const result = spawnSync(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      "--loglevel=error",
      `${WEB_APP_PACKAGE}@${version}`,
      `${NAMESPACE_MAP_PACKAGE}@${version}`,
    ],
    { cwd: dir, encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(
      `npm install ${WEB_APP_PACKAGE}@${version} failed (exit ${result.status}):\n${
        result.stderr ?? result.stdout ?? ""
      }`,
    );
  }
}

/** Installed @deepseek-ai packages that expose a `./client` types entry. */
function clientTypedPackages(root: string): string[] {
  const scopeDir = path.join(root, "node_modules", "@deepseek-ai");
  return fs
    .readdirSync(scopeDir)
    .filter((name) => fs.statSync(path.join(scopeDir, name)).isDirectory())
    .filter((name) => {
      const manifest = JSON.parse(
        fs.readFileSync(path.join(scopeDir, name, "package.json"), "utf8"),
      );
      return typeof manifest.exports?.["./client"]?.types === "string";
    })
    .map((name) => `@deepseek-ai/${name}`)
    .toSorted();
}

/**
 * Type-check a generated probe file under the temp install and hand back its
 * checker plus source file. Probe semantics mirror the repo tsconfig (bundler
 * resolution, skipLibCheck) so package `exports` maps are honored.
 */
function createProbeProgram(
  root: string,
  lines: string[],
): { checker: ts.TypeChecker; source: ts.SourceFile } {
  const probePath = path.join(root, "probe.ts");
  fs.writeFileSync(probePath, `${lines.join("\n")}\n`);
  const program = ts.createProgram([probePath], {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    allowImportingTsExtensions: true,
    skipLibCheck: true,
    types: [],
    noEmit: true,
  });
  const errors = ts
    .getPreEmitDiagnostics(program)
    .filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (errors.length > 0) {
    const rendered = errors
      .slice(0, 10)
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, " "))
      .join("\n  ");
    throw new Error(
      `probe program has ${errors.length} type error(s) — upstream declarations changed shape or an internal path moved:\n  ${rendered}`,
    );
  }
  const source = program.getSourceFile(probePath);
  if (!source) throw new Error(`probe source file missing: ${probePath}`);
  return { checker: program.getTypeChecker(), source };
}

/**
 * Evaluate a type alias declared in the probe into its string-literal union
 * members. Throws when the alias is not a pure string-literal union — an
 * opaque key contract that cannot be checked statically and needs a human.
 */
function literalUnionOf(
  checker: ts.TypeChecker,
  source: ts.SourceFile,
  aliasName: string,
): string[] {
  const alias = source.statements.find(
    (statement): statement is ts.TypeAliasDeclaration =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === aliasName,
  );
  if (!alias) throw new Error(`probe alias not found: ${aliasName}`);
  const type = checker.getTypeAtLocation(alias.name);
  // `Union & string` keeps the literal union; unwrap the intersection first.
  const unwrapped = type.isIntersection() ? (type.types.find((t) => t.isUnion()) ?? type) : type;
  const members = unwrapped.isUnion() ? unwrapped.types : [unwrapped];
  const literals: string[] = [];
  for (const member of members) {
    // Read the literal's own value: `typeToString` quoting is configurable
    // and has already bitten this script once.
    if (member.flags & ts.TypeFlags.StringLiteral) {
      literals.push((member as ts.StringLiteralType).value);
    } else {
      throw new Error(
        `probe alias ${aliasName} is not a union of string literals (${checker.typeToString(type)}) — key extraction is impossible, needs a human look`,
      );
    }
  }
  return literals.toSorted();
}

/** All locale namespaces the installed tree merges into `LocaleNamespaceMap`. */
function mergedNamespaces(root: string, packages: string[]): string[] {
  const { checker, source } = createProbeProgram(root, [
    ...packages.map((pkg) => `import type {} from "${pkg}/client";`),
    `import type {} from "./node_modules/${MERGE_DECLARATION}";`,
    `import type { LocaleNamespaceMap } from "${NAMESPACE_MAP_PACKAGE}";`,
    "export type AllNamespaces = keyof LocaleNamespaceMap & string;",
  ]);
  return literalUnionOf(checker, source, "AllNamespaces");
}

/** Key unions for every merged namespace, read from the map's members. */
function mergedNamespaceKeys(
  root: string,
  packages: string[],
  namespaces: string[],
): Map<string, string[]> {
  const { checker, source } = createProbeProgram(root, [
    ...packages.map((pkg) => `import type {} from "${pkg}/client";`),
    `import type {} from "./node_modules/${MERGE_DECLARATION}";`,
    `import type { LocaleNamespaceMap } from "${NAMESPACE_MAP_PACKAGE}";`,
    ...namespaces.map(
      (ns, index) => `export type K${index} = LocaleNamespaceMap[${JSON.stringify(ns)}] & string;`,
    ),
  ]);
  const keys = new Map<string, string[]>();
  namespaces.forEach((ns, index) => {
    keys.set(ns, literalUnionOf(checker, source, `K${index}`));
  });
  return keys;
}

/** Key unions for namespaces whose unions live in internal declarations. */
function untypedTypeKeys(root: string): Map<string, string[]> {
  const entries = Object.entries(UNTYPED_TYPE_NAMESPACES);
  const lines: string[] = [];
  entries.forEach(([, config], index) => {
    lines.push(
      `import type { ${config.typeName} } from "./node_modules/${config.declaration}";`,
      `export type K${index} = ${config.typeName};`,
    );
  });
  const { checker, source } = createProbeProgram(root, lines);
  const keys = new Map<string, string[]>();
  entries.forEach(([ns], index) => {
    keys.set(ns, literalUnionOf(checker, source, `K${index}`));
  });
  return keys;
}

/** Keys of namespaces that register dictionaries only at runtime, scanned from bundles. */
function runtimeScannedKeys(root: string): Map<string, string[]> {
  const keys = new Map<string, string[]>();
  for (const { ns, pkg } of RUNTIME_SCANNED_NAMESPACES) {
    const bundle = path.join(root, "node_modules", pkg, "lib", "client.js");
    if (!fs.existsSync(bundle)) {
      throw new Error(`runtime-scanned namespace "${ns}": bundle missing: ${bundle}`);
    }
    const text = fs.readFileSync(bundle, "utf8");
    const found = new Set<string>(registerCallKeys(text, ns));
    if (found.size === 0) {
      throw new Error(
        `runtime-scanned namespace "${ns}": no register call for "${ns}" in ${bundle} — the bundle shape changed, extraction needs a human look`,
      );
    }
    keys.set(ns, [...found].toSorted());
  }
  return keys;
}

/**
 * Extract the dictionary keys every `locale.register(ns, …)` call site in a
 * bundle installs for `ns`. Handles the typed overload
 * `register(ns, { zh, en })` (shorthand or renamed identifiers), the
 * per-locale overload `register(ns, "zh", { … })` (inline literal or
 * identifier, possibly referencing module constants), and the
 * `for (const [locale, dict] of dictionaries)` array form.
 */
function registerCallKeys(text: string, ns: string): string[] {
  const keys = new Set<string>();
  // Module-scope string/array/object constants the call sites may reference.
  const consts = new Map<string, unknown>();
  for (const match of text.matchAll(/(?:const|let) ([A-Za-z_$][\w$]*) = (\{|\[|")/g)) {
    const start = match.index + match[0].length - 1;
    const literal =
      match[2] === '"'
        ? /"(?:[^"\\]|\\.)*"/.exec(text.slice(start))?.[0]
        : balancedLiteral(text, start, true);
    if (literal === undefined || literal === null) continue;
    try {
      consts.set(
        match[1]!,
        new Function(...consts.keys(), `return (${literal})`)(...consts.values()),
      );
    } catch {
      // Constants referencing functions or unresolved names are irrelevant here.
    }
  }
  const resolve = (code: string): unknown => {
    const identifier = /^[$A-Za-z_][\w$]*$/.exec(code);
    if (identifier && consts.has(identifier[0]!)) return consts.get(identifier[0]!);
    try {
      return new Function(...consts.keys(), `return (${code})`)(...consts.values());
    } catch {
      return undefined;
    }
  };
  const nsMatchesNamespace = (argument: string): boolean => {
    const literal = /^"(?:[^"\\]|\\.)*"$/.exec(argument);
    if (literal) return JSON.parse(literal[0]) === ns;
    const value = resolve(argument);
    return value === ns;
  };
  const addDict = (value: unknown): void => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return;
    for (const key of Object.keys(value)) keys.add(key);
  };
  for (const match of text.matchAll(/(?:locale|ctx\.locale)\.register\(/g)) {
    const argumentsText = balancedLiteral(text, match.index + match[0].length - 1, false);
    if (argumentsText === null) continue;
    const args = splitArguments(argumentsText.slice(1, -1));
    if (!nsMatchesNamespace(args[0] ?? "")) continue;
    const second = args[1] ?? "";
    const perLocale = /^"(zh|en)"$/.exec(second);
    if (perLocale) {
      addDict(resolve(args[2] ?? ""));
      continue;
    }
    // `{ zh, en }` — shorthand identifiers or renamed `{ zh: X, en: Y }`.
    for (const part of splitArguments(second.replace(/^\{|\}$/g, ""))) {
      const named = /^(?:zh|en)\s*:\s*([$A-Za-z_][\w$]*)$/.exec(part);
      addDict(resolve(named ? named[1]! : part));
    }
  }
  // The `dictionaries` array form: register(LOCALE_NS, locale, dict) in a
  // loop over `[["zh", {…}], ["en", {…}]]`. Attribute it to `ns` when the
  // bundle declares a string constant holding that namespace id.
  const declaresNamespace = [...consts.values()].includes(ns);
  for (const match of text.matchAll(/const (\w+) = (\[)/g)) {
    const array = balancedLiteral(text, match.index + match[0].length - 1, true);
    if (array === null) continue;
    const value = resolve(array);
    if (!Array.isArray(value) || !declaresNamespace) continue;
    for (const pair of value) {
      if (Array.isArray(pair) && (pair[0] === "zh" || pair[0] === "en")) addDict(pair[1]);
    }
  }
  return [...keys];
}

/** Read the balanced `{…}` / `(…)` / `[…]` literal starting at `start`. */
function balancedLiteral(text: string, start: number, bracketsOnly: boolean): string | null {
  let depth = 0;
  let inString = false;
  let stringOpener = "";
  for (let i = start; i < text.length; i++) {
    const char = text[i]!;
    if (inString) {
      if (char === "\\") i++;
      else if (char === stringOpener) inString = false;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      // The literal itself must open with a bracket, not a quote; quotes
      // nested inside are ordinary string contents.
      if (i === start && !bracketsOnly) return null;
      inString = true;
      stringOpener = char;
      continue;
    }
    if (char === "(" || char === "{" || char === "[") depth++;
    else if (char === ")" || char === "}" || char === "]") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/** Split an argument list on top-level commas, preserving nested literals. */
function splitArguments(argumentText: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let inString = false;
  let stringOpener = "";
  let current = "";
  for (const char of argumentText) {
    if (inString) {
      current += char;
      if (char === stringOpener) inString = false;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringOpener = char;
      current += char;
      continue;
    }
    if (char === "(" || char === "{" || char === "[") depth++;
    if (char === ")" || char === "}" || char === "]") depth--;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim() !== "") parts.push(current.trim());
  return parts;
}

/** Compare upstream key sets against the plugin's dictionaries; returns failure lines. */
function diff(
  plugin: Record<string, Record<string, string>>,
  upstream: Map<string, string[]>,
): string[] {
  const failures: string[] = [];
  for (const [ns, upstreamKeys] of upstream) {
    const dict = plugin[ns];
    if (!dict) {
      failures.push(`namespace not covered by the plugin: ${ns} (${upstreamKeys.length} keys)`);
      continue;
    }
    const missing = upstreamKeys.filter((key) => !(key in dict));
    const stale = Object.keys(dict).filter((key) => !upstreamKeys.includes(key));
    if (missing.length > 0) {
      failures.push(`${ns}: missing ja keys (fallback leaks through): ${missing.join(", ")}`);
    }
    if (stale.length > 0) {
      failures.push(`${ns}: ja keys upstream no longer has: ${stale.join(", ")}`);
    }
  }
  for (const ns of Object.keys(plugin)) {
    if (!upstream.has(ns)) {
      failures.push(`namespace no longer shipped upstream: ${ns}`);
    }
  }
  return failures;
}

const spec = parseArgs(process.argv.slice(2));
const version = await resolveDshVersion(spec);
console.log(`[drift] checking dictionaries against @deepseek-ai/dsh@${version}`);

const root = await mkdtemp(path.join(tmpdir(), "dsh-locale-ja-drift-"));
let failed = false;
try {
  installWebTree(root, version);
  const packages = clientTypedPackages(root);

  const upstream = new Map(mergedNamespaceKeys(root, packages, mergedNamespaces(root, packages)));
  for (const [ns, keys] of untypedTypeKeys(root)) upstream.set(ns, keys);
  for (const [ns, keys] of runtimeScannedKeys(root)) upstream.set(ns, keys);

  console.log(
    `[drift] upstream: ${upstream.size} namespaces, ${[...upstream.values()].reduce((n, keys) => n + keys.length, 0)} keys; plugin: ${Object.keys(DICTS).length} namespaces`,
  );

  const failures = diff(DICTS, upstream);
  if (failures.length > 0) {
    failed = true;
    console.error(`\ndictionary drift against @deepseek-ai/dsh@${version}:`);
    for (const failure of failures) console.error(`  - ${failure}`);
    console.error(
      "\nFix: update the devDependencies + dictionaries in src/client/dictionaries.ts\n(and the pinned e2e version in e2e/harness.ts) for this DSH release.",
    );
  } else {
    console.log(`✔ dictionaries match @deepseek-ai/dsh@${version}`);
  }
} finally {
  await rm(root, { recursive: true, force: true });
}
if (failed) process.exit(1);
