/**
 * Build the standard DSH plugin package into `lib/`.
 *
 * Three outputs, one per face of the package:
 *  - `lib/types/**.d.ts` — declarations, emitted by tsc (the only emitter that
 *    can produce them; esbuild does not type-check).
 *  - `lib/index.js`      — the Host half, a plain ESM module (`exports["."]`).
 *  - `lib/client.js`     — the browser half (`exports["./client"]`), a CommonJS
 *    body wrapped in the module-loader envelope the shell evaluates.
 *
 * The envelope is the contract every shipped `@deepseek-ai/dsh-client-*` bundle
 * satisfies: the file is evaluated in the page, calls
 * `window.__ModuleLoader__.load({ id, factory })`, and the factory receives a
 * `require` bound to the frozen platform module table and returns the plugin's
 * `module.exports`. This package resolves nothing through that table — every
 * platform import in `src/` is type-only — which the purity gate below enforces.
 */
import { spawnSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const libDir = resolve(root, "lib");

/** Module id the loader registers this bundle under; must equal the package name. */
const { name: PACKAGE_ID } = JSON.parse(await readFile(resolve(root, "package.json"), "utf8")) as {
  name: string;
};

const BANNER = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(PACKAGE_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
`;

const FOOTER = `\t\treturn module.exports;
\t}
});
`;

await rm(libDir, { recursive: true, force: true });
await mkdir(libDir, { recursive: true });

// --- declarations ---------------------------------------------------------
const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");
const types = spawnSync(process.execPath, [tsc, "-p", "tsconfig.json"], {
  cwd: root,
  stdio: "inherit",
});
if (types.status !== 0) throw new Error("tsc failed to emit declarations");

// --- Host half -----------------------------------------------------------
await build({
  entryPoints: [resolve(root, "src/index.ts")],
  outfile: resolve(libDir, "index.js"),
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  legalComments: "none",
  logLevel: "silent",
});

const host = await readFile(resolve(libDir, "index.js"), "utf8");
if (!/\bexport\s*\{[^}]*\bapply\b/.test(host)) {
  throw new Error("lib/index.js does not export apply; the Loader cannot mount the row");
}

// --- browser half --------------------------------------------------------
const client = await build({
  entryPoints: [resolve(root, "src/client/index.ts")],
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2024",
  legalComments: "none",
  // The envelope wraps the module body in a function, shifting every line, so a
  // sourcemap would point at the wrong rows. The bundle ships unminified and
  // readable instead, exactly like the shipped ones.
  sourcemap: false,
  minify: false,
  write: false,
  logLevel: "silent",
});

const [output] = client.outputFiles;
if (output === undefined) throw new Error("esbuild produced no client bundle output");
const body = output.text;

// Purity gate: a value import of a platform package would make this plugin
// depend on the shared module table and on another plugin's runtime identity.
// Every platform import here is type-only, so the bundle must resolve nothing.
const requires = [...body.matchAll(/\brequire\(\s*(["'][^"']+["'])\s*\)/g)].map((m) => m[1]);
if (requires.length > 0) {
  throw new Error(
    `client bundle resolves platform modules at runtime: ${requires.join(", ")}. ` +
      "Import DSH packages with `import type` only.",
  );
}

if (/^\s*(?:import|export)\s/m.test(body)) {
  throw new Error("client bundle body contains module syntax; it must be a CommonJS body");
}
for (const named of ["apply", "inject"]) {
  if (!new RegExp(`\\b${named}\\b`).test(body)) {
    throw new Error(`client bundle does not expose ${named}`);
  }
}

await writeFile(resolve(libDir, "client.js"), BANNER + body + FOOTER, "utf8");

console.log(`✔ built lib/index.js, lib/client.js, lib/types (${PACKAGE_ID})`);
