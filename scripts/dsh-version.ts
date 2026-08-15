/**
 * Resolve the `@deepseek-ai/dsh` version under test from the public npm
 * registry.
 *
 * DSH is a developer preview that ships frequently (and not always in
 * lockstep with its sub-packages' `latest` dist-tag — e.g.
 * `dsh-client-ui-directory-picker-browse` had `latest` pinned to an old line
 * while `next` carried the current one). The `@deepseek-ai/dsh` package's own
 * `latest` dist-tag is the one release channel worth tracking, so every
 * consumer resolves through it and pins the exact version it got.
 *
 * CLI: `node scripts/dsh-version.ts [latest|<version>]` prints the resolved
 * version. As a module: `resolveDshVersion(spec)`.
 */

import { pathToFileURL } from "node:url";

/** The registry document for the latest release; small enough to fetch whole. */
const LATEST_DOC_URL = "https://registry.npmjs.org/@deepseek-ai/dsh/latest";

/**
 * Resolve a DSH version specifier to an exact version.
 * @param spec - `"latest"` reads the registry's `latest` dist-tag; anything
 * else is an exact version, returned verbatim.
 * @returns the exact version string.
 */
export async function resolveDshVersion(spec: string): Promise<string> {
  if (spec !== "latest") return spec;
  const res = await fetch(LATEST_DOC_URL, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`npm registry returned ${res.status} for ${LATEST_DOC_URL}`);
  }
  const doc = (await res.json()) as { version?: string };
  if (typeof doc.version !== "string" || doc.version.length === 0) {
    throw new Error(`npm registry document has no version: ${LATEST_DOC_URL}`);
  }
  return doc.version;
}

// CLI entry: print the resolved version for shell consumption
// (`VERSION=$(node scripts/dsh-version.ts latest)`).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const spec = process.argv[2] ?? "latest";
  try {
    console.log(await resolveDshVersion(spec));
  } catch (error) {
    console.error(`failed to resolve DSH version "${spec}": ${error}`);
    process.exit(1);
  }
}
