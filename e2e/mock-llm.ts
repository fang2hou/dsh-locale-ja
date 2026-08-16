/**
 * A minimal DeepSeek-compatible chat-completions mock for local development
 * and E2E — streamed content and reasoning deltas, a finish frame with
 * usage, and the [DONE] sentinel — with zero dependencies (`dsh-llm-deepseek`
 * is the consumer). Point DSH at it with DEEPSEEK_BASE_URL and
 * DEEPSEEK_API_KEY=mock-key; `node e2e/mock-llm.ts [port]` runs it standalone.
 */
import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import http from "node:http";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

/** Deterministic usage so the stats row renders every segment, cache included. */
const USAGE = {
  prompt_tokens: 1234,
  completion_tokens: 180,
  prompt_tokens_details: { cached_tokens: 768 },
  completion_tokens_details: { reasoning_tokens: 64 },
};

const REASONING = ["テスト用モックモデルです。", "回答を組み立てています…"];
const CONTENT = [
  "これはモック LLM の応答です。実際のモデルは呼び出されません。",
  "日本語インターフェースのレイアウト確認に使用します。",
  "統計行（ターン数・所要時間・トークン数）の表示確認が目的です。",
];

/** Frame delay so LLM/tool durations and TTFT in the stats row are non-zero. */
const FRAME_DELAY_MS = 60;

type ChatRequest = {
  stream?: boolean;
  reasoning_effort?: string;
  thinking?: { type?: string };
};

/**
 * Start the mock server.
 * @param port - port to listen on (loopback + LAN interfaces, so containers
 * reach it through host.docker.internal).
 * @param log - optional line logger.
 * @returns the server; `close()` stops it.
 */
export function startMockLlm(port: number, log: (line: string) => void = console.log) {
  const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200).end("ok");
      return;
    }
    if (req.method !== "POST" || !req.url?.endsWith("/chat/completions")) {
      res.writeHead(404).end();
      return;
    }
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as ChatRequest;
      log(`[mock-llm] ${req.url} stream=${String(body.stream ?? false)}`);
      if (body.stream === true) {
        void streamReply(res, wantsReasoning(body));
      } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            choices: [
              { message: { role: "assistant", content: CONTENT.join("") }, finish_reason: "stop" },
            ],
            usage: USAGE,
          }),
        );
      }
    });
  });
  server.listen(port);
  return server;
}

const wantsReasoning = (body: ChatRequest): boolean =>
  (body.reasoning_effort !== undefined && body.reasoning_effort !== "off") ||
  body.thinking?.type === "enabled";

async function streamReply(res: http.ServerResponse, reasoning: boolean): Promise<void> {
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  const send = (payload: unknown): void => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };
  const frame = (delta: Record<string, string>): void => {
    send({ choices: [{ index: 0, delta, finish_reason: null }] });
  };
  if (reasoning) {
    for (const text of REASONING) {
      frame({ reasoning_content: text });
      await sleep(FRAME_DELAY_MS);
    }
  }
  for (const text of CONTENT) {
    frame({ content: text });
    await sleep(FRAME_DELAY_MS);
  }
  // Finish-attached usage: the deferred usage/finish chunks key off [DONE].
  send({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage: USAGE });
  res.write("data: [DONE]\n\n");
  res.end();
}

const isAlive = async (port: number): Promise<boolean> => {
  try {
    return (await fetch(`http://127.0.0.1:${port}/health`)).ok;
  } catch {
    return false;
  }
};

/**
 * Ensure a mock server is serving on `port`, in its OWN process.
 *
 * The orchestrators (`e2e/run-e2e.ts`, `scripts/dev-env.ts`) spend most of
 * their life inside blocking `spawnSync` calls (docker, pnpm, playwright);
 * an in-process server would starve behind those and dead-lock any
 * container-side fetch that arrives mid-call (connect, then no response
 * headers until the call ends). A detached child keeps serving regardless.
 * @param port - port to listen on.
 * @returns the child process when one was started, or null when a server
 * already answers on the port (reused, not owned — do not kill it).
 */
export async function ensureMockLlm(port: number): Promise<ChildProcess | null> {
  if (await isAlive(port)) {
    console.log(`[mock-llm] reusing the server on port ${port}`);
    return null;
  }
  const child = spawn(process.execPath, [fileURLToPath(import.meta.url), String(port)], {
    stdio: "ignore",
    detached: true,
  });
  child.unref();
  for (let attempt = 0; attempt < 50; attempt++) {
    if (await isAlive(port)) break;
    await sleep(100);
  }
  if (!(await isAlive(port))) {
    throw new Error(`the mock LLM did not become ready on port ${port}`);
  }
  console.log(`[mock-llm] detached server on port ${port} (pid ${child.pid})`);
  return child;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.argv[2] ?? 13090);
  startMockLlm(port);
  console.log(`[mock-llm] listening on http://127.0.0.1:${port}`);
}
