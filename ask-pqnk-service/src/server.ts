import { createServer } from "node:http";
import { Router } from "./router.js";
import { registerPublicApi } from "./routes/publicApi.js";
import { registerInboxRoutes } from "./routes/inbox.js";
import "./ai/index.js"; // logs which provider is active on boot

const PORT = Number(process.env.ASK_PQNK_PORT ?? 4001);
const ALLOWED_ORIGIN = process.env.ASK_PQNK_ALLOWED_ORIGIN ?? "http://localhost:3101";

const router = new Router();
registerPublicApi(router);
registerInboxRoutes(router);

const server = createServer(async (req, res) => {
  // CORS: the static Next.js site (a different origin, even in local dev)
  // calls /api/* from the browser at runtime — see
  // ASK_PQNK_V1_IMPLEMENTATION_SPEC.md sec 8. The Inbox routes are
  // same-service, browser-navigated directly, and don't need CORS.
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  await router.handle(req, res);
});

server.listen(PORT, () => {
  console.log(`[ask-pqnk-service] listening on http://localhost:${PORT}`);
  console.log(`[ask-pqnk-service] Pedaver Inbox: http://localhost:${PORT}/inbox`);
});
