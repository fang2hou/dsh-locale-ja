// Docker lifecycle helpers for the DSH web E2E suite. No dependencies:
// node:child_process + global fetch only. The DSH version pin mirrors the
// plugin's peerDependencies — bump both together.
import { execFileSync, spawnSync } from "node:child_process";
import net from "node:net";

export const IMAGE = "dsh-locale-ja-e2e";
export const CONTAINER = "dsh-locale-ja-e2e";
export const DSH_VERSION = "0.1.0-rc.6";

const BOOT_TIMEOUT_MS = Number(process.env.DSH_E2E_BOOT_TIMEOUT_MS ?? 180_000);

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { stdio: "inherit", ...opts });
}

export function buildImage() {
  run("docker", [
    "build",
    "-f",
    "e2e/Dockerfile",
    "--build-arg",
    `DSH_VERSION=${DSH_VERSION}`,
    "-t",
    `${IMAGE}:dsh-${DSH_VERSION}`,
    "e2e",
  ]);
}

export function pickFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

export function startContainer(port) {
  // Idempotent: clear any leftover container from a previous aborted run.
  spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
  // dsh refuses to bind anything but 127.0.0.1, which docker port publishing
  // cannot reach; socat relays the loopback server to 0.0.0.0:3081.
  // The browser-facing authority is 127.0.0.1:<port>, so that is what the
  // /api browser-trust fence must trust.
  run("docker", [
    "run",
    "-d",
    "--name",
    CONTAINER,
    "-p",
    `127.0.0.1:${port}:3081`,
    `${IMAGE}:dsh-${DSH_VERSION}`,
    "sh",
    "-c",
    "socat TCP-LISTEN:3081,bind=0.0.0.0,fork,reuseaddr TCP:127.0.0.1:3080 " +
      `& dsh web --host 127.0.0.1 --port 3080 --trusted-host 127.0.0.1:${port} --trusted-host localhost:${port}`,
  ]);
}

export async function waitReady(baseUrl, timeoutMs = BOOT_TIMEOUT_MS) {
  const deadline = Date.now() + timeoutMs;
  // First boot auto-initializes the profile and runs pnpm install inside the
  // container, so allow minutes. Sequential polling by design.
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseUrl, { redirect: "manual" });
      if (res.status === 200) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.error(
    `[harness] DSH web did not become ready at ${baseUrl} within ${timeoutMs} ms; docker logs:`,
  );
  spawnSync("docker", ["logs", CONTAINER], { stdio: "inherit" });
  throw new Error(`DSH web not ready at ${baseUrl} after ${timeoutMs} ms`);
}

export function copyTarball(localPath) {
  run("docker", ["cp", localPath, `${CONTAINER}:/tmp/dsh-locale-ja.tgz`]);
}

export function installPlugin() {
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

export function removePlugin() {
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

export async function restartAndWait(baseUrl) {
  // docker restart preserves the container FS, so install/remove state persists.
  run("docker", ["restart", CONTAINER]);
  await waitReady(baseUrl);
}

export function stopContainer() {
  spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
}
