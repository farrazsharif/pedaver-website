// Minimal hand-rolled router over node:http — deliberately no framework
// dependency (Express etc. was not installed) for a service this small.
// Supports path params (":id"), JSON body parsing, and a couple of
// response helpers used throughout the route handlers.
import type { IncomingMessage, ServerResponse } from "node:http";

export interface Ctx {
  req: IncomingMessage;
  res: ServerResponse;
  params: Record<string, string>;
  query: URLSearchParams;
  body: unknown;
  cookies: Record<string, string>;
}

type Handler = (ctx: Ctx) => Promise<void> | void;

interface Route {
  method: string;
  segments: string[];
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  add(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, segments: pattern.split("/").filter(Boolean), handler });
  }
  get(pattern: string, handler: Handler) { this.add("GET", pattern, handler); }
  post(pattern: string, handler: Handler) { this.add("POST", pattern, handler); }

  async handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url ?? "/", "http://localhost");
    const reqSegments = url.pathname.split("/").filter(Boolean);

    for (const route of this.routes) {
      if (route.method !== req.method) continue;
      if (route.segments.length !== reqSegments.length) continue;
      const params: Record<string, string> = {};
      let matched = true;
      for (let i = 0; i < route.segments.length; i++) {
        const seg = route.segments[i];
        if (seg.startsWith(":")) {
          params[seg.slice(1)] = decodeURIComponent(reqSegments[i]);
        } else if (seg !== reqSegments[i]) {
          matched = false;
          break;
        }
      }
      if (!matched) continue;

      const body = await parseBody(req);
      const cookies = parseCookies(req.headers.cookie);
      const ctx: Ctx = { req, res, params, query: url.searchParams, body, cookies };
      try {
        await route.handler(ctx);
      } catch (err) {
        console.error(`[error] ${req.method} ${url.pathname}:`, err);
        if (!res.headersSent) json(res, 500, { error: "Internal error" });
      }
      return;
    }

    json(res, 404, { error: "Not found" });
  }
}

function parseBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    if (req.method === "GET" || req.method === "HEAD") return resolve(undefined);
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve(undefined);
      const contentType = req.headers["content-type"] ?? "";
      if (contentType.includes("application/json")) {
        try { resolve(JSON.parse(raw)); } catch { resolve(undefined); }
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        resolve(Object.fromEntries(new URLSearchParams(raw)));
      } else {
        resolve(raw);
      }
    });
  });
}

function parseCookies(header?: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k) out[k] = decodeURIComponent(v.join("="));
  }
  return out;
}

export function json(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

export function html(res: ServerResponse, status: number, body: string) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(body);
}

export function redirect(res: ServerResponse, location: string) {
  res.writeHead(302, { Location: location });
  res.end();
}
