/**
 * Build the plugin package into `lib/`: declarations via tsc (the only
 * emitter that can produce them), the Host half as plain ESM, and the browser
 * half as a CommonJS body wrapped in the module-loader envelope the shell
 * evaluates (see ARCHITECTURE.md). The gates below enforce the envelope, the
 * zero-`require()` purity, and the exposed `apply`/`inject`.
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
  // The envelope shifts every line, so a sourcemap would point at the wrong rows.
  sourcemap: false,
  minify: false,
  write: false,
  logLevel: "silent",
});

const [output] = client.outputFiles;
if (output === undefined) throw new Error("esbuild produced no client bundle output");
const body = output.text;

// Every platform import is type-only, so the bundle must resolve nothing.
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
