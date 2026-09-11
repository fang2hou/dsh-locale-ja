// Persistent local DSH web for developing this plugin: the container
// bind-mounts the repository read-only and installs it through pnpm's
// `link:` protocol, so the served plugin IS the host's built output; the
// watcher rebuilds on change and DSH's HMR hot-swaps the bundle into the
// open page. Subcommands (mise tasks): start, stop, restart, status, logs.
// Env: DSH_DEV_PORT (13080), DSH_DEV_DSH_VERSION (default the pinned peer
// version), DSH_DEV_MOCK_LLM_PORT (13090).
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { ensureMockLlm } from "../e2e/mock-llm.ts";
import { buildImage, DEFAULT_DSH_VERSION, IMAGE } from "../e2e/harness.ts";
import { resolveDshVersion } from "./dsh-version.ts";

const CONTAINER = "dsh-locale-ja-dev";
const DEFAULT_PORT = 13080;
const PLUGIN_MOUNT = "/srv/plugin";
const PROFILE_MODULES = "/data/dsh/profiles/web/node_modules";
const BOOT_TIMEOUT_MS = Number(process.env.DSH_DEV_BOOT_TIMEOUT_MS ?? 180_000);
const MOCK_LLM_PORT = Number(process.env.DSH_DEV_MOCK_LLM_PORT ?? 13090);
const DEEPSEEK_BASE_URL = `http://host.docker.internal:${MOCK_LLM_PORT}`;
const DEBOUNCE_MS = 400;

const root = path.resolve(import.meta.dirname, "..");
const port = Number(process.env.DSH_DEV_PORT ?? DEFAULT_PORT);
const baseUrl = `http://127.0.0.1:${port}`;
const WATCHED_ROOT_FILES: Record<string, true> = {
  "cordis.patch.yml": true,
  "package.json": true,
  "tsconfig.json": true,
  "tsconfig.tools.json": true,
};
// DSH reads these only at boot, so a build needs a restart to take effect.
const STRUCTURAL_FILES: Record<string, true> = {
  "cordis.patch.yml": true,
  "package.json": true,
};

function run(cmd: string, args: string[]): void {
  execFileSync(cmd, args, { stdio: "inherit" });
}

function ok(cmd: string, args: string[]): boolean {
  return spawnSync(cmd, args, { stdio: "ignore" }).status === 0;
}

function inspect(format: string): string | null {
  const result = spawnSync("docker", ["inspect", "-f", format, CONTAINER], {
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : null;
}

async function waitReady(): Promise<void> {
  const deadline = Date.now() + BOOT_TIMEOUT_MS;
  // Sequential polling by design; first boot takes minutes. The browser-trust
  // fence answers tokenless requests with 401/303 — any HTTP response means
  // the server is up.
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseUrl, { redirect: "manual" });
      if (res.status > 0) return;
    } catch {
      // not up yet
    }
    await sleep(1500);
  }
  console.error(`[dev] DSH web did not become ready at ${baseUrl}; recent logs:`);
  spawnSync("docker", ["logs", "--tail", "50", CONTAINER], { stdio: "inherit" });
  process.exit(1);
}

function authUrl(): string | null {
  const result = spawnSync("docker", ["logs", CONTAINER], { encoding: "utf8" });
  const token = /token=([A-Za-z0-9_-]+)/.exec(result.stdout ?? "")?.[1];
  return token === undefined ? null : `${baseUrl}/?token=${token}`;
}

// Returns true when the container was created and needs a first install.
function ensureContainer(version: string): boolean {
  const expected = `${IMAGE}:dsh-${version}`;
  const state = inspect("{{.State.Status}}");
  if (state !== null) {
    const image = inspect("{{.Config.Image}}") ?? "";
    const binds = inspect("{{json .HostConfig.Binds}}") ?? "[]";
    const env = inspect("{{json .Config.Env}}") ?? "[]";
    // A different image pin, a moved repository, or stale mock-LLM env wiring
    // invalidates the container.
    if (image !== expected || !binds.includes(root) || !env.includes(DEEPSEEK_BASE_URL)) {
      console.log("[dev] recreating the container (image pin, mount, or env changed)");
      spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
    } else if (state === "running") {
      return false;
    } else {
      console.log("[dev] starting the existing container");
      run("docker", ["start", CONTAINER]);
      // docker restart preserves the container FS, so the link survives.
      return false;
    }
  }
  console.log("[dev] creating the container");
  // socat relays dsh's loopback-only bind to a publishable interface; the
  // DeepSeek env pair routes the bundled mock LLM so conversations complete
  // without a real API key. See e2e/harness.ts for the fence details.
  run("docker", [
    "run",
    "-d",
    "--name",
    CONTAINER,
    "-p",
    `127.0.0.1:${port}:3081`,
    "-v",
    `${root}:${PLUGIN_MOUNT}:ro`,
    "-e",
    `DEEPSEEK_BASE_URL=${DEEPSEEK_BASE_URL}`,
    "-e",
    "DEEPSEEK_API_KEY=mock-key",
    expected,
    "sh",
    "-c",
    "socat TCP-LISTEN:3081,bind=0.0.0.0,fork,reuseaddr TCP:127.0.0.1:3080 " +
      `& dsh web --host 127.0.0.1 --port 3080 --no-open ` +
      `--trusted-host 127.0.0.1:${port} --trusted-host localhost:${port}`,
  ]);
  return true;
}

function pluginLinked(): boolean {
  return ok("docker", [
    "exec",
    CONTAINER,
    "test",
    "-e",
    `${PROFILE_MODULES}/@fang2hou/dsh-locale-ja`,
  ]);
}

function linkPlugin(): void {
  // pnpm's link: protocol symlinks the profile dependency to the read-only
  // mount, so the served client bundle is the host's lib/ verbatim.
  run("docker", [
    "exec",
    CONTAINER,
    "dsh",
    "plugin",
    "--profile",
    "web",
    "add",
    `link:${PLUGIN_MOUNT}`,
  ]);
}

function watch(): void {
  let pending = new Set<string>();
  let building = false;
  let timer: NodeJS.Timeout | undefined;

  const flush = (): void => {
    timer = undefined;
    if (building || pending.size === 0) return;
    const changed = [...pending];
    pending = new Set();
    building = true;
    void rebuild(changed).finally(() => {
      building = false;
      // Events that arrived during the build trigger another pass.
      if (pending.size > 0) timer = setTimeout(flush, DEBOUNCE_MS);
    });
  };

  const rebuild = async (changed: string[]): Promise<void> => {
    console.log(`[dev] change: ${changed.join(", ")}`);
    const result = spawnSync("pnpm", ["build"], { stdio: "inherit" });
    if (result.status !== 0) {
      console.error("[dev] build failed — the last good bundle stays live");
      return;
    }
    if (changed.some((rel) => STRUCTURAL_FILES[rel] === true)) {
      // The loader composes the plugin tree at boot; restart to re-read it.
      console.log("[dev] loader-level change — restarting DSH");
      run("docker", ["restart", CONTAINER]);
      await waitReady();
      console.log("[dev] restarted — refresh the page if the plugin tree changed");
    } else {
      console.log("[dev] rebuilt — DSH HMR swaps it into the open page");
    }
  };

  fs.watch(root, { recursive: true }, (_event, filename) => {
    const rel = String(filename);
    if (!rel.startsWith("src/") && WATCHED_ROOT_FILES[rel] !== true) return;
    pending.add(rel);
    clearTimeout(timer);
    timer = setTimeout(flush, DEBOUNCE_MS);
  });
  console.log(`[dev] watching for changes under ${root}`);
}

function requireDocker(): void {
  if (!ok("docker", ["info"])) {
    console.error("Docker daemon not available — start Docker/OrbStack first");
    process.exit(1);
  }
}

async function start(): Promise<void> {
  requireDocker();
  const version = await resolveDshVersion(process.env.DSH_DEV_DSH_VERSION ?? DEFAULT_DSH_VERSION);
  console.log(`[dev] @deepseek-ai/dsh@${version} at ${baseUrl}`);
  buildImage(version);
  // Detached: the watcher blocks on spawnSync builds; the mock must keep
  // serving conversations from its own event loop. Survives Ctrl-C too.
  await ensureMockLlm(MOCK_LLM_PORT);
  console.log(`[dev] mock LLM on ${DEEPSEEK_BASE_URL} (DEEPSEEK_API_KEY=mock-key)`);

  const fresh = ensureContainer(version);
  await waitReady();
  if (fresh || !pluginLinked()) {
    console.log("[dev] link-installing the mounted repository as the plugin");
    linkPlugin();
    run("docker", ["restart", CONTAINER]);
    await waitReady();
  }
  const entry = authUrl();
  console.log(`
[dev] ready: ${entry ?? `${baseUrl} (token not printed yet — check docker logs)`}
      edit src/ — changes hot-reload into the open page within ~2s
      Ctrl-C stops only this watcher; the container keeps running
      remove the environment with: mise run dev:stop`);
  watch();
}

async function restart(): Promise<void> {
  requireDocker();
  if (inspect("{{.State.Status}}") === null) {
    console.error("[dev] no container — start one with mise run dev");
    process.exit(1);
  }
  run("docker", ["restart", CONTAINER]);
  await waitReady();
  console.log(`[dev] restarted — ${authUrl() ?? baseUrl}`);
}

function stop(): void {
  spawnSync("docker", ["rm", "-f", CONTAINER], { stdio: "ignore" });
  console.log(`[dev] removed the container (was serving ${baseUrl})`);
}

function status(): void {
  const state = inspect("{{.State.Status}}");
  if (state === null) {
    console.log(`[dev] no container; start one with mise run dev (port ${port})`);
    return;
  }
  console.log(`[dev] container: ${state}`);
  console.log(`[dev] url:       ${baseUrl}`);
}

function logs(): void {
  run("docker", ["logs", "-f", CONTAINER]);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown(): void {
  console.log(`\n[dev] watcher stopped — the container keeps running at ${baseUrl}`);
  process.exit(0);
}

const command = process.argv[2] ?? "start";
switch (command) {
  case "start":
    await start();
    break;
  case "restart":
    await restart();
    break;
  case "stop":
    stop();
    break;
  case "status":
    status();
    break;
  case "logs":
    logs();
    break;
  default:
    console.error(`unknown subcommand "${command}" — use start|restart|stop|status|logs`);
    process.exit(1);
}
