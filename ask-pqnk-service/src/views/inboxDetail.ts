import { layout, esc } from "./layout.js";
import type { RetrievedSource } from "../ai/provider.js";

export interface QueueDetailData {
  id: string;
  reference_number: string;
  original_question: string;
  language: string | null;
  canonical_question: string | null;
  submitted_context: string; // json
  taxonomy_classification: string; // json
  referral_reason: string | null;
  response_status: string;
  date: string;
}

export function inboxDetailView(
  row: QueueDetailData,
  candidateSources: RetrievedSource[],
  clusterVariants: { text: string; language: string }[],
  alreadyAnswered: boolean,
  publishedAdvisoryId?: string
): string {
  const ctx = JSON.parse(row.submitted_context || "{}");
  const classification = JSON.parse(row.taxonomy_classification || "{}");

  const contextRows = [
    ["Crop", ctx.crop],
    ["Region", ctx.region],
    ["Field condition", ctx.fieldCondition],
    ["Additional explanation", ctx.additionalExplanation],
  ].filter(([, v]) => v);

  const body = `
    <p><a href="/inbox" class="btn secondary">← Back to Inbox</a></p>
    <h1>Reference ${esc(row.reference_number)}</h1>

    <div class="card">
      <div class="field-label">Farmer's original question — exactly as asked</div>
      <div class="field-value" style="font-size:16px;">${esc(row.original_question)}</div>

      <div class="field-label">Normalized / canonical interpretation</div>
      <div class="field-value muted">${esc(row.canonical_question)}</div>

      ${contextRows.length ? `<div class="field-label">Context</div><div class="field-value">${contextRows.map(([k, v]) => `<div><strong>${esc(k)}:</strong> ${esc(v)}</div>`).join("")}</div>` : ""}

      <div class="field-label">Ask PQNK findings — what was found, and why it was insufficient</div>
      <div class="field-value">Referral reason: <strong>${esc(row.referral_reason)}</strong><br>
      Detected crops/problems/domains: ${esc(JSON.stringify(classification))}</div>

      ${clusterVariants.length > 1 ? `<div class="field-label">Similar questions (${clusterVariants.length})</div>
      <div class="field-value">${clusterVariants.map((v) => `<div class="muted">• [${esc(v.language)}] ${esc(v.text)}</div>`).join("")}</div>` : ""}

      <div class="field-label">Potential supporting knowledge already found</div>
      <div class="field-value">
        ${
          candidateSources.length
            ? candidateSources
                .map(
                  (s, i) =>
                    `<label class="source-check"><input type="checkbox" name="sourceRefs" value="${esc(s.sourceType)}::${esc(s.reference)}" ${i < 2 ? "checked" : ""}>
                    <span><strong>${esc(s.title)}</strong> <span class="muted">(${esc(s.sourceType)}, ${esc(s.authorityStatus)})</span><br><span class="muted">${esc(s.snippet.slice(0, 160))}…</span></span></label>`
                )
                .join("")
            : `<div class="muted">Nothing relevant was found — this is a genuinely new knowledge area.</div>`
        }
      </div>
    </div>

    ${
      alreadyAnswered
        ? `<div class="card"><strong>This question has already been answered and published.</strong>
           <p><a href="/advisory-preview/${esc(publishedAdvisoryId)}" class="btn secondary">View published Farmer Advisory →</a></p></div>`
        : `<div class="card">
      <h2>Pedaver Answer</h2>
      <form method="POST" action="/inbox/${esc(row.id)}/publish">
        <label>Your answer</label>
        <textarea name="answer" required placeholder="Write the answer as you would explain it to the farmer directly."></textarea>

        <label>Practical action (optional — the concrete "what to do")</label>
        <textarea name="practicalAction" style="min-height:60px" placeholder="e.g. Dig a 12-inch profile after the next irrigation and check for..."></textarea>

        <label>Short answer (optional — auto-generated from your answer if left blank)</label>
        <input type="text" name="shortAnswer">

        <label>Answer language</label>
        <select name="language">
          ${["English", "Urdu", "Roman Urdu", "Punjabi"].map((l) => `<option value="${l}" ${l === row.language ? "selected" : ""}>${l}</option>`).join("")}
        </select>

        <label>Crop (comma-separated, edit if needed)</label>
        <input type="text" name="crops" value="${esc((classification.crops || []).join(", "))}">

        <label>Field problem (comma-separated, edit if needed)</label>
        <input type="text" name="problems" value="${esc((classification.fieldProblems || []).join(", "))}">

        <label>Science domain (comma-separated, edit if needed)</label>
        <input type="text" name="scienceDomains" value="${esc((classification.scienceDomains || []).join(", "))}">

        <label>Supersedes / clarifies (optional — Farmer Advisory record ID(s) this answer replaces or corrects, comma-separated)</label>
        <input type="text" name="supersedesRefs" placeholder="e.g. ad39815f-63bb-4152-8e20-48223e220eb4">
        <p class="muted">The record(s) named here are never deleted — they stay in the permanent history, marked as superseded, so this answer can outrank them in Ask PQNK's ranking without losing provenance.</p>

        <label>Evidence type</label>
        <select name="evidenceType">
          ${["Scientific Mechanism", "Field Observation", "Measured Field Result", "Farmer Testimony", "Demonstration"].map((e) => `<option>${e}</option>`).join("")}
        </select>

        <label>Publishing level</label>
        <select name="publicationLevel">
          <option value="Farmer Advisory Q&A" selected>Farmer Advisory Q&A (simple practical question)</option>
          <option value="Substantial Farmer Advisory">Substantial Farmer Advisory (recurring problem, fuller explanation)</option>
        </select>
        <p class="muted">Major-subject or doctrine-level answers should become a Knowledge Paper or Science review outside this quick workflow, not through Publish here.</p>

        <label>What should happen with this answer?</label>
        <select name="publicationDecision">
          <option value="Publish">Publish to Farmer Advisory (permanent, searchable by Ask PQNK immediately)</option>
          <option value="Private">Answer privately — do not publish</option>
        </select>

        <div style="margin-top:18px;"><button type="submit">Publish Answer</button></div>
        <p class="muted">Publishing is one action: it creates the permanent Farmer Advisory record, resolves the question cluster, marks this question Answered, and makes the answer immediately searchable by Ask PQNK. No second approval is required — you are the authority.</p>
      </form>
    </div>`
    }
  `;
  return layout(`Reference ${row.reference_number}`, body);
}
