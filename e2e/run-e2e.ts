// Single entry point for the Docker + Playwright E2E suite:
// pack the plugin from current source -> build image -> start container ->
// run Playwright against it -> teardown.
import { spawnSync, execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import fs from "node:fs";
import path from "node:path";
import {
  buildImage,
  startContainer,
  waitReady,
  copyTarball,
  stopContainer,
  pickFreePort,
  CONTAINER,
} from "./harness.ts";

// Refuse to run without a Docker daemon.
const probe = spawnSync("docker", ["info"], { stdio: "ignore" });
if (probe.status !== 0) {
  console.error("Docker daemon not available — start Docker/OrbStack first");
  process.exit(1);
}

buildImage();

// Pack the plugin from the current source (prepack runs the full build).
const packDir = fs.mkdtempSync(path.join(tmpdir(), "dsh-locale-ja-e2e-"));
execFileSync("pnpm", ["pack", "--pack-destination", packDir], { stdio: "inherit" });
const tarball = fs
  .readdirSync(packDir)
  .find((name) => /^fang2hou-dsh-locale-ja-.*\.tgz$/.test(name));
if (tarball === undefined) throw new Error(`no tarball found in ${packDir}`);
const tarballPath = path.join(packDir, tarball);

let exitCode = 1;
try {
  const port = await pickFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  startContainer(port);
  await waitReady(baseUrl);
  copyTarball(tarballPath);

  const result = spawnSync(
    "pnpm",
    ["exec", "playwright", "test", "-c", "e2e/playwright.config.ts"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        DSH_BASE_URL: baseUrl,
        DSH_E2E_CONTAINER: CONTAINER,
      },
    },
  );
  exitCode = result.status ?? 1;
} finally {
  stopContainer();
  fs.rmSync(packDir, { recursive: true, force: true });
}
process.exit(exitCode);
