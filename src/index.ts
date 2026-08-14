/**
 * Japanese locale plugin, Host half.
 *
 * This is a pure browser-surface plugin: the empty `apply` exists so the
 * package mounts as a Loader entry (`cordis.patch.yml` inserts the row), which
 * is what makes `@deepseek-ai/dsh-client-modules` discover the `dsh.client`
 * declaration and serve the browser half from `exports["./client"]`. The
 * registry scans Loader entries, not installed dependencies, so a package with
 * no Host row is never served to the browser.
 *
 * All behavior lives in the browser half — see `src/client/index.ts`.
 */

/** Host plugin body: this surface contributes nothing to the Host. */
export function apply(): void {}
