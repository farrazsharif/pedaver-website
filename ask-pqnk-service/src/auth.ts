// Minimal Pedaver authentication for the local V1 build. "Pedaver is the
// sole approval authority" (locked decision) is about removing a SECOND
// reviewer, not about removing access control — the publish action still
// must verify the caller is an authorized reviewer, so a random visitor
// cannot publish content under Pedaver's authority. Deliberately simple
// for a local build: one shared password from an env var, a signed
// session cookie. Swapping to real per-reviewer accounts is a later,
// separate decision, not required for V1's architecture to be correct.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Ctx } from "./router.js";
import { redirect } from "./router.js";

const SESSION_SECRET = process.env.ASK_PQNK_SESSION_SECRET ?? randomBytes(32).toString("hex");
const PEDAVER_PASSWORD = process.env.ASK_PQNK_PEDAVER_PASSWORD ?? "pqnk-local-dev";
const COOKIE_NAME = "ask_pqnk_session";

function sign(value: string): string {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const a = Buffer.from(candidate.padEnd(64, " "));
  const b = Buffer.from(PEDAVER_PASSWORD.padEnd(64, " "));
  return a.length === b.length && timingSafeEqual(a, b) && candidate === PEDAVER_PASSWORD;
}

export function sessionCookieHeader(): string {
  const token = `pedaver.${sign("pedaver")}`;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax`;
}

export function clearSessionCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`;
}

export function isAuthenticated(ctx: Ctx): boolean {
  const token = ctx.cookies[COOKIE_NAME];
  if (!token) return false;
  const [role, signature] = decodeURIComponent(token).split(".");
  if (role !== "pedaver" || !signature) return false;
  return signature === sign("pedaver");
}

export function requireAuth(ctx: Ctx): boolean {
  if (isAuthenticated(ctx)) return true;
  redirect(ctx.res, "/inbox/login");
  return false;
}
