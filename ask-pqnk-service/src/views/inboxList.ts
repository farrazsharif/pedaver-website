import { layout, esc } from "./layout.js";

export interface QueueListRow {
  id: string;
  reference_number: string;
  original_question: string;
  language: string | null;
  taxonomy_classification: string; // json
  submitted_context: string; // json
  referral_reason: string | null;
  response_status: string;
  date: string;
  cluster_id: string | null;
  clusterRepeatCount?: number;
  clusterCanonical?: string;
}

const STATUS_CLASS: Record<string, string> = {
  New: "new",
  "Under Review": "review",
  "Needs More Information": "review",
  Answered: "answered",
  Closed: "answered",
};

function timeWaiting(dateIso: string): string {
  const ms = Date.now() - new Date(dateIso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days < 1) return "< 1 day";
  return `${days} day${days === 1 ? "" : "s"}`;
}

export function inboxListView(rows: QueueListRow[], sort: string, counts: { open: number; answered: number }): string {
  const sortLinks = [
    ["newest", "Newest"],
    ["repeated", "Most repeated"],
    ["waiting", "Waiting longest"],
  ]
    .map(([key, label]) => `<a href="/inbox?sort=${key}" class="${sort === key ? "active" : ""}">${label}</a>`)
    .join("");

  const body = `
    <h1>Pedaver Question Inbox</h1>
    <p class="muted">${counts.open} open · ${counts.answered} answered · this is where every question Ask PQNK could not answer arrives — no email, WhatsApp, or log-digging required.</p>
    <div class="filters">${sortLinks}</div>
    <table>
      <thead><tr>
        <th>Reference</th><th>Question</th><th>Lang</th><th>Crop / Problem</th>
        <th>Why referred</th><th>Similar</th><th>Status</th><th>Waiting</th><th></th>
      </tr></thead>
      <tbody>
        ${rows
          .map((r) => {
            const ctx = JSON.parse(r.taxonomy_classification || "{}");
            const crop = (ctx.crops || [])[0] ?? "—";
            const problem = (ctx.fieldProblems || [])[0] ?? (ctx.scienceDomains || [])[0] ?? "—";
            const statusClass = STATUS_CLASS[r.response_status] ?? "new";
            const repeat = r.clusterRepeatCount ?? 1;
            return `<tr>
              <td class="mono">${esc(r.reference_number)}</td>
              <td>${esc(r.original_question.slice(0, 90))}${r.original_question.length > 90 ? "…" : ""}</td>
              <td>${esc(r.language)}</td>
              <td>${esc(crop)} / ${esc(problem)}</td>
              <td class="muted">${esc(r.referral_reason)}</td>
              <td>${repeat > 1 ? `<span class="repeat-badge">${repeat} similar</span>` : "—"}</td>
              <td><span class="pill ${statusClass}">${esc(r.response_status)}</span></td>
              <td>${timeWaiting(r.date)}</td>
              <td><a class="btn secondary" href="/inbox/${r.id}">Answer →</a></td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
  return layout("Inbox", body);
}
