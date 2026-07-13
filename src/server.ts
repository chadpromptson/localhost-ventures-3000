import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { loadEnvFile } from "node:process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { runPromptLoop } from "./promptlooper.js";
import type { LoopRequest } from "./types.js";

try {
  loadEnvFile(".env");
} catch (error) {
  if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
    throw error;
  }
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const HOST = process.env.HOST ?? "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const ENGINE = process.env.PROMPTLOOPER_ENGINE ?? "template";
const BACKEND_LINE_LIMIT = Number.parseInt(
  process.env.BACKEND_LINE_LIMIT ?? "1500",
  10,
);
const MAX_BODY_BYTES = 16_384;

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65_535) {
  throw new Error("PORT must be a whole number between 1 and 65535.");
}

if (ENGINE !== "template") {
  throw new Error("V0.1 only supports the safe local template engine.");
}

const staticFiles = new Map<string, { file: string; contentType: string }>([
  ["/", { file: "index.html", contentType: "text/html; charset=utf-8" }],
  ["/app.js", { file: "app.js", contentType: "text/javascript; charset=utf-8" }],
  ["/favicon.svg", { file: "favicon.svg", contentType: "image/svg+xml" }],
  ["/styles.css", { file: "styles.css", contentType: "text/css; charset=utf-8" }],
]);

function setSecurityHeaders(response: ServerResponse): void {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'",
  );
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  setSecurityHeaders(response);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });
  response.end(payload);
}

async function readJson(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;

    if (size > MAX_BODY_BYTES) {
      throw new Error("Request body is too large.");
    }

    chunks.push(buffer);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function sendStatic(
  response: ServerResponse,
  file: string,
  contentType: string,
): Promise<void> {
  const payload = await readFile(join(PUBLIC_DIR, file));
  setSecurityHeaders(response);
  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": payload.length,
    "Cache-Control": "no-store",
  });
  response.end(payload);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", APP_URL);

  try {
    if (request.method === "GET" && url.pathname === "/api/health") {
      sendJson(response, 200, {
        status: "production-grade",
        production: APP_URL,
        engine: ENGINE,
        backendLineLimit: BACKEND_LINE_LIMIT,
        customers: 1,
        lastVerifiedTests: ["n", "n+1"],
        simulatedSatire: true,
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/loop") {
      const body = (await readJson(request)) as Partial<LoopRequest>;

      if (typeof body.post !== "string") {
        sendJson(response, 400, { error: "The post field must be a string." });
        return;
      }

      const iteration = body.iteration ?? 0;
      if (typeof iteration !== "number") {
        sendJson(response, 400, { error: "The iteration field must be a number." });
        return;
      }

      sendJson(response, 200, runPromptLoop(body.post, iteration));
      return;
    }

    const staticFile = staticFiles.get(url.pathname);
    if (request.method === "GET" && staticFile) {
      await sendStatic(response, staticFile.file, staticFile.contentType);
      return;
    }

    sendJson(response, 404, { error: "Not found on this localhost." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected production event.";
    sendJson(response, 400, { error: message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`PromptLooper production started at ${APP_URL}`);
  console.log(`Engine: ${ENGINE} | Backend budget: ${BACKEND_LINE_LIMIT} lines`);
});

function shutdown(): void {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
