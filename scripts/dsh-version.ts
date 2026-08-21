/**
 * Resolve the `@deepseek-ai/dsh` version under test from the public npm
 * registry.
 *
 * DSH is a developer preview that ships frequently (and not always in
 * lockstep with its sub-packages' dist-tags — e.g.
 * `dsh-client-ui-directory-picker-browse` had `latest` pinned to an old line
 * while `next` carried the current one). The plugin tracks the prerelease
 * line: waves land on `@deepseek-ai/dsh`'s `next` dist-tag first, while
 * `latest` can sit on an older line the dictionaries have already moved past.
 * Every consumer therefore resolves through `next` and pins the exact version
 * it got.
 *
 * CLI: `node scripts/dsh-version.ts [next|latest|<version>]` prints the
 * resolved version. As a module: `resolveDshVersion(spec)`.
 */

import { pathToFileURL } from "node:url";

/** The registry document for a dist-tag; small enough to fetch whole. */
const DOC_URL = "https://registry.npmjs.org/@deepseek-ai/dsh";

/**
 * Resolve a DSH version specifier to an exact version.
 * @param spec - `"next"` (the channel the plugin tracks) or `"latest"` reads
 * that dist-tag; anything else is an exact version, returned verbatim.
 * @returns the exact version string.
 */
export async function resolveDshVersion(spec: string): Promise<string> {
  if (spec !== "next" && spec !== "latest") return spec;
  const res = await fetch(`${DOC_URL}/${spec}`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`npm registry returned ${res.status} for ${DOC_URL}/${spec}`);
  }
  const doc = (await res.json()) as { version?: string };
  if (typeof doc.version !== "string" || doc.version.length === 0) {
    throw new Error(`npm registry document has no version: ${DOC_URL}/${spec}`);
  }
  return doc.version;
}

// CLI entry: print the resolved version for shell consumption
// (`VERSION=$(node scripts/dsh-version.ts next)`).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const spec = process.argv[2] ?? "next";
  try {
    console.log(await resolveDshVersion(spec));
  } catch (error) {
    console.error(`failed to resolve DSH version "${spec}": ${error}`);
    process.exit(1);
  }
}
