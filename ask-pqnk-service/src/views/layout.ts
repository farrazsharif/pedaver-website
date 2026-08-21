// Minimal server-rendered HTML for the Pedaver Question Inbox — no
// framework, no build step, deliberately plain. Per the locked instruction:
// "Keep the interface simple. Pedaver is answering agricultural questions,
// not operating a complicated enterprise workflow system."
export function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

export function layout(title: string, body: string, loggedIn = true): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Pedaver Question Inbox</title>
<style>
  :root { --green: #2f5233; --green-deep: #1e3722; --terracotta: #c97c3d; --cream: #faf6ee; --line: #ddd6c4; --ink: #26302a; --ink-soft: #666; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; background: var(--cream); color: var(--ink); margin: 0; line-height: 1.5; }
  header.topbar { background: var(--green-deep); color: #fff; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
  header.topbar a { color: #fff; text-decoration: none; font-weight: 700; }
  header.topbar .nav a { margin-left: 16px; font-weight: 400; font-size: 14px; color: #d9e5da; }
  main { max-width: 1100px; margin: 0 auto; padding: 24px; }
  h1 { font-size: 22px; color: var(--green-deep); }
  h2 { font-size: 16px; color: var(--green-deep); margin-top: 28px; }
  table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); font-size: 13.5px; vertical-align: top; }
  th { background: #f1ede0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-soft); }
  tr:last-child td { border-bottom: none; }
  .pill { display: inline-block; padding: 2px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #eee; }
  .pill.new { background: #fde7d5; color: #a5572a; }
  .pill.review { background: #fff3c4; color: #8a6d00; }
  .pill.answered { background: #dff0dc; color: #2f5233; }
  .repeat-badge { background: var(--terracotta); color: #fff; border-radius: 999px; padding: 1px 8px; font-size: 11px; font-weight: 700; }
  .card { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; margin-top: 14px; }
  .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-soft); font-weight: 700; margin-bottom: 4px; }
  .field-value { margin-bottom: 14px; }
  textarea, input[type=text], select { width: 100%; padding: 8px 10px; border: 1px solid var(--line); border-radius: 6px; font: inherit; font-size: 14px; }
  textarea { min-height: 120px; }
  label { display: block; margin: 12px 0 4px; font-weight: 600; font-size: 13px; }
  button, .btn { background: var(--terracotta); color: #fff; border: none; padding: 10px 18px; border-radius: 999px; font-weight: 700; font-size: 14px; cursor: pointer; }
  .btn.secondary { background: transparent; color: var(--green-deep); border: 1px solid var(--line); }
  .filters a { margin-right: 14px; font-size: 13px; color: var(--green-deep); text-decoration: none; }
  .filters a.active { font-weight: 700; text-decoration: underline; }
  .source-check { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f0ede0; font-size: 13px; }
  .mono { font-family: ui-monospace, monospace; }
  .muted { color: var(--ink-soft); font-size: 12.5px; }
</style>
</head>
<body>
${loggedIn ? `<header class="topbar">
  <a href="/inbox">Pedaver Question Inbox</a>
  <div class="nav"><a href="/inbox">Inbox</a><a href="/inbox/logout">Log out</a></div>
</header>` : ""}
<main>
${body}
</main>
</body>
</html>`;
}
