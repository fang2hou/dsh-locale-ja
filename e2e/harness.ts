// Docker lifecycle helpers for the DSH web E2E suite. The default DSH version
// pin mirrors the plugin's peerDependencies — bump both together; override
// with DSH_E2E_DSH_VERSION to test an upcoming or newer DSH.
import { execFileSync, spawnSync } from "node:child_process";
import type { ExecFileSyncOptions } from "node:child_process";
import net from "node:net";
import { setTimeout as sleep } from "node:timers/promises";

export const IMAGE = "dsh-locale-ja-e2e";
export const CONTAINER = "dsh-locale-ja-e2e";
export const DEFAULT_DSH_VERSION = "0.1.5-rc.2";

// First boot initializes the profile and installs its whole dependency tree
// inside the container, so readiness takes minutes on slower runners.
const BOOT_TIMEOUT_MS = Number(process.env.DSH_E2E_BOOT_TIMEOUT_MS ?? 300_000);

function run(cmd: string, args: string[], opts: ExecFileSyncOptions = {}): void {
  execFileSync(cmd, args, { stdio: "inherit", ...opts });
}

export function buildImage(version: string): void {
  run("docker", [
    "build",
    "-f",
    "e2e/Dockerfile",
    "--build-arg",
    `DSH_VERSION=${version}`,
    "-t",
    `${IMAGE}:dsh-${version}`,
    "e2e",
  ]);
}

export function pickFreePort(): Promise<number> {
  const { promise, resolve, reject } = Promise.withResolvers<number>();
  const server = net.createServer();
  server.unref();
  server.on("error", reject);
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    if (typeof address !== "object" || address === null) {
      reject(new Error("the port probe server did not report its address"));
      return;
    }
    server.close(() => resolve(address.port));
  });
  return promise;
}

export function startContainer(port: number, version: string, mockLlmUrl?: string): void {
  // Idempotent: clear any leftover container from a previous aborted run.
  spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
  // dsh refuses to bind anything but 127.0.0.1, which docker port publishing
  // cannot reach; socat relays the loopback server to 0.0.0.0:3081. The
  // browser-facing authority is 127.0.0.1:<port>, so that is what the
  // /api browser-trust fence must trust. `--no-open` keeps headless runs
  // from spawning a browser that does not exist. host-gateway lets the
  // container reach a host-side mock LLM (e2e/mock-llm.ts) on every docker
  // flavor.
  const args = [
    "run",
    "-d",
    "--name",
    CONTAINER,
    "--add-host",
    "host.docker.internal:host-gateway",
    "-p",
    `127.0.0.1:${port}:3081`,
  ];
  if (mockLlmUrl !== undefined) {
    args.push("-e", `DEEPSEEK_BASE_URL=${mockLlmUrl}`, "-e", "DEEPSEEK_API_KEY=mock-key");
  }
  args.push(
    `${IMAGE}:dsh-${version}`,
    "sh",
    "-c",
    "socat TCP-LISTEN:3081,bind=0.0.0.0,fork,reuseaddr TCP:127.0.0.1:3080 " +
      `& dsh web --host 127.0.0.1 --port 3080 --no-open --trusted-host 127.0.0.1:${port} --trusted-host localhost:${port}`,
  );
  run("docker", args);
}

export async function waitReady(baseUrl: string, timeoutMs = BOOT_TIMEOUT_MS): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  // First boot auto-initializes the profile and runs pnpm install inside the
  // container, so allow minutes. The browser-trust fence answers tokenless
  // requests with 401/303 — any HTTP response means the server is up.
  // Sequential polling by design.
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseUrl, { redirect: "manual" });
      if (res.status > 0) return;
    } catch {
      // not up yet
    }
    await sleep(1500);
  }
  console.error(
    `[harness] DSH web did not become ready at ${baseUrl} within ${timeoutMs} ms; docker logs:`,
  );
  spawnSync("docker", ["logs", CONTAINER], { stdio: "inherit" });
  throw new Error(`DSH web not ready at ${baseUrl} after ${timeoutMs} ms`);
}

/**
 * The authenticated entry URL for the running server: since DSH 0.1.5 the
 * /api browser-trust fence rejects tokenless requests, so a fresh browser
 * context must first visit the process-token URL the server prints on boot.
 * Each boot prints a fresh token, so take the last one in the logs.
 */
export async function authUrl(baseUrl: string): Promise<string> {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const logs = spawnSync("docker", ["logs", CONTAINER], { encoding: "utf8" });
    const token = [...(logs.stdout ?? "").matchAll(/token=([A-Za-z0-9_-]+)/g)].at(-1)?.[1];
    if (token !== undefined) return `${baseUrl}/?token=${token}`;
    await sleep(500);
  }
  throw new Error(`no process token found in docker logs of ${CONTAINER}`);
}

export function copyTarball(localPath: string): void {
  run("docker", ["cp", localPath, `${CONTAINER}:/tmp/dsh-locale-ja.tgz`]);
}

export function installPlugin(): void {
  // Absolute path required: pnpm runs with cwd = the profile directory.
  run("docker", [
    "exec",
    CONTAINER,
    "dsh",
    "plugin",
    "--profile",
    "web",
    "add",
    "/tmp/dsh-locale-ja.tgz",
  ]);
}

export function removePlugin(): void {
  run("docker", [
    "exec",
    CONTAINER,
    "dsh",
    "plugin",
    "--profile",
    "web",
    "remove",
    "@fang2hou/dsh-locale-ja",
  ]);
}

export async function restartAndWait(baseUrl: string): Promise<void> {
  // docker restart preserves the container FS, so install/remove state persists.
  run("docker", ["restart", CONTAINER]);
  await waitReady(baseUrl);
}

export function stopContainer(): void {
  spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
}
