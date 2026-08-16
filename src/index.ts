/**
 * Host half of the plugin: the empty `apply` exists only so the package
 * mounts as a Loader row (see cordis.patch.yml); all behavior lives in the
 * browser half (`src/client/index.ts`).
 */
export function apply(): void {}
