// E2E entry point: pack the plugin from current source -> build image ->
// start container -> run Playwright against it -> teardown.
// DSH_E2E_DSH_VERSION selects the DSH under test: an exact version, or
// `latest` for the registry's current release. Unset = the pinned version.
import { spawnSync, execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import fs from "node:fs";
import path from "node:path";
import { resolveDshVersion } from "../scripts/dsh-version.ts";
import { ensureMockLlm } from "./mock-llm.ts";
import {
  buildImage,
  startContainer,
  waitReady,
  copyTarball,
  stopContainer,
  pickFreePort,
  CONTAINER,
  DEFAULT_DSH_VERSION,
} from "./harness.ts";

// Refuse to run without a Docker daemon.
const probe = spawnSync("docker", ["info"], { stdio: "ignore" });
if (probe.status !== 0) {
  console.error("Docker daemon not available — start Docker/OrbStack first");
  process.exit(1);
}

const dshVersion = await resolveDshVersion(process.env.DSH_E2E_DSH_VERSION ?? DEFAULT_DSH_VERSION);
console.log(`[e2e] testing against @deepseek-ai/dsh@${dshVersion}`);

buildImage(dshVersion);

// Pack the plugin from the current source (prepack runs the full build).
const packDir = fs.mkdtempSync(path.join(tmpdir(), "dsh-locale-ja-e2e-"));
execFileSync("pnpm", ["pack", "--pack-destination", packDir], { stdio: "inherit" });
const tarball = fs
  .readdirSync(packDir)
  .find((name) => /^fang2hou-dsh-locale-ja-.*\.tgz$/.test(name));
if (tarball === undefined) throw new Error(`no tarball found in ${packDir}`);
const tarballPath = path.join(packDir, tarball);

let exitCode = 1;
// The mock LLM lets the suite drive real conversations without credentials;
// the container reaches it through the host-gateway mapping.
const mockPort = await pickFreePort();
// Detached: this process blocks on spawnSync for whole phases; an in-process
// server would starve behind those and dead-lock container-side fetches.
const mockLlm = await ensureMockLlm(mockPort);
try {
  const port = await pickFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`[e2e] mock LLM on 127.0.0.1:${mockPort}`);
  startContainer(port, dshVersion, `http://host.docker.internal:${mockPort}`);
  await waitReady(baseUrl);
  copyTarball(tarballPath);
  const mockProbe = spawnSync(
    "docker",
    [
      "exec",
      CONTAINER,
      "node",
      "-e",
      `fetch("http://host.docker.internal:${mockPort}/health")` +
        '.then(r=>r.text()).then(t=>console.log("mock reachable:",t))' +
        '.catch(e=>{console.error("mock unreachable:",e.cause?.code||e.message);process.exit(1)})',
    ],
    { encoding: "utf8" },
  );
  console.log(`[e2e] container→mock probe: ${mockProbe.stdout.trim() || mockProbe.stderr.trim()}`);

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
  mockLlm?.kill();
  fs.rmSync(packDir, { recursive: true, force: true });
}
process.exit(exitCode);
