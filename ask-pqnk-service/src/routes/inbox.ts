import { randomUUID } from "node:crypto";
import type { Router } from "../router.js";
import { html, redirect } from "../router.js";
import { checkPassword, sessionCookieHeader, clearSessionCookieHeader, isAuthenticated } from "../auth.js";
import { layout, esc } from "../views/layout.js";
import { inboxListView, type QueueListRow } from "../views/inboxList.js";
import { inboxDetailView, type QueueDetailData } from "../views/inboxDetail.js";
import { db, nowIso } from "../db.js";
import { retrieve } from "../retrieval.js";
import { markClusterResolved, getCluster } from "../clustering.js";
import { assertPedaverAuthoredPublication, PEDAVER_AUTHOR } from "../provenance.js";
import type { NormalizedIntent, RetrievedSource } from "../ai/provider.js";

export function registerInboxRoutes(router: Router) {
  router.get("/inbox/login", (ctx) => {
    if (isAuthenticated(ctx)) return redirect(ctx.res, "/inbox");
    html(
      ctx.res,
      200,
      layout(
        "Log in",
        `<h1>Pedaver Question Inbox</h1>
        <div class="card" style="max-width:360px;">
        <form method="POST" action="/inbox/login">
          <label>Password</label>
          <input type="password" name="password" autofocus>
          <div style="margin-top:14px;"><button type="submit">Log in</button></div>
        </form>
        </div>`,
        false
      )
    );
  });

  router.post("/inbox/login", (ctx) => {
    const { password } = (ctx.body as { password?: string }) ?? {};
    if (password && checkPassword(password)) {
      ctx.res.setHeader("Set-Cookie", sessionCookieHeader());
      return redirect(ctx.res, "/inbox");
    }
    html(ctx.res, 401, layout("Log in", `<h1>Pedaver Question Inbox</h1><p>Incorrect password. <a href="/inbox/login">Try again</a></p>`, false));
  });

  router.get("/inbox/logout", (ctx) => {
    ctx.res.setHeader("Set-Cookie", clearSessionCookieHeader());
    redirect(ctx.res, "/inbox/login");
  });

  router.get("/inbox", (ctx) => {
    if (!isAuthenticated(ctx)) return redirect(ctx.res, "/inbox/login");

    const sort = ctx.query.get("sort") ?? "newest";
    const rows = db.prepare(`SELECT * FROM referral_queue`).all() as unknown as (QueueListRow & { cluster_id: string | null })[];

    const enriched = rows.map((r) => {
      const cluster = r.cluster_id ? getCluster(r.cluster_id) : undefined;
      return { ...r, clusterRepeatCount: cluster?.repeat_count ?? 1, clusterCanonical: cluster?.canonical_question };
    });

    let sorted = [...enriched];
    if (sort === "repeated") sorted.sort((a, b) => b.clusterRepeatCount - a.clusterRepeatCount);
    else if (sort === "waiting") sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const counts = {
      open: rows.filter((r) => !["Answered", "Closed"].includes(r.response_status)).length,
      answered: rows.filter((r) => ["Answered", "Closed"].includes(r.response_status)).length,
    };

    html(ctx.res, 200, inboxListView(sorted, sort, counts));
  });

  router.get("/inbox/:id", (ctx) => {
    if (!isAuthenticated(ctx)) return redirect(ctx.res, "/inbox/login");
    const row = db.prepare(`SELECT * FROM referral_queue WHERE id = ?`).get(ctx.params.id) as unknown as
      | (QueueDetailData & { cluster_id: string | null; advisory_record_id: string | null; response_status: string })
      | undefined;
    if (!row) return html(ctx.res, 404, layout("Not found", `<h1>Not found</h1>`));

    // Re-run retrieval so the reviewer sees exactly what Ask PQNK saw.
    const classification = JSON.parse(row.taxonomy_classification || "{}");
    const intent: NormalizedIntent = {
      language: (row.language as NormalizedIntent["language"]) ?? "English",
      canonicalQuestion: row.canonical_question ?? row.original_question,
      crops: classification.crops ?? [],
      fieldProblems: classification.fieldProblems ?? [],
      scienceDomains: classification.scienceDomains ?? [],
      keywords: [],
    };
    const result = retrieve(row.original_question, intent);
    const candidateSources: RetrievedSource[] = result.candidates.slice(0, 6);

    const cluster = row.cluster_id ? getCluster(row.cluster_id) : undefined;
    const variants = cluster ? (JSON.parse(cluster.variant_questions) as { text: string; language: string }[]) : [];

    const alreadyAnswered = row.response_status === "Answered" || row.response_status === "Closed";
    html(ctx.res, 200, inboxDetailView(row, candidateSources, variants, alreadyAnswered, row.advisory_record_id ?? undefined));
  });

  // The single decisive publish action (V1 core prompt sec 17): answering,
  // classifying, creating the permanent Advisory, resolving the cluster,
  // and making it searchable all happen together, not as separate steps.
  router.post("/inbox/:id/publish", async (ctx) => {
    if (!isAuthenticated(ctx)) return redirect(ctx.res, "/inbox/login");
    const row = db.prepare(`SELECT * FROM referral_queue WHERE id = ?`).get(ctx.params.id) as any;
    if (!row) return html(ctx.res, 404, layout("Not found", `<h1>Not found</h1>`));

    // Idempotency guard: publishing is a one-time decisive action per queue
    // entry (V1 core prompt sec 17) — a resubmit (double-click, retry,
    // redirect replay) must not create a second Farmer Advisory record.
    if (row.response_status === "Answered" || row.response_status === "Closed") {
      return redirect(ctx.res, `/inbox/${row.id}`);
    }

    const body = ctx.body as Record<string, string | string[]>;
    const answer = String(body.answer ?? "").trim();
    if (!answer) return html(ctx.res, 400, layout("Error", `<h1>An answer is required.</h1><a href="/inbox/${esc(row.id)}">Back</a>`));

    const splitList = (v: unknown) => String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    const crops = splitList(body.crops);
    const problems = splitList(body.problems);
    const scienceDomains = splitList(body.scienceDomains);
    const language = String(body.language ?? row.language ?? "English");
    const practicalAction = String(body.practicalAction ?? "").trim() || null;
    const shortAnswer = String(body.shortAnswer ?? "").trim() || answer.split(/(?<=[.!?])\s/)[0];
    const evidenceType = String(body.evidenceType ?? "Scientific Mechanism");
    const publicationLevel = String(body.publicationLevel ?? "Farmer Advisory Q&A");
    const decision = String(body.publicationDecision ?? "Publish");

    const now = nowIso();
    const advisoryId = randomUUID();
    const sourceRefsRaw = body.sourceRefs;
    const sourceRefs = Array.isArray(sourceRefsRaw) ? sourceRefsRaw : sourceRefsRaw ? [sourceRefsRaw] : [];
    const sources = sourceRefs.map((ref) => {
      const [sourceType, reference] = ref.split("::");
      return { sourceType, reference };
    });
    const relatedPapers = sources.filter((s) => s.sourceType === "Knowledge Paper").map((s) => s.reference);
    const relatedScience = sources.filter((s) => s.sourceType === "Science Page").map((s) => s.reference);
    const relatedFarmerAdvisories = sources.filter((s) => s.sourceType === "Farmer Advisory Record").map((s) => s.reference);

    // Explicit supersedesOrClarifies relationship (SOURCE_AUTHORITY_POLICY.md
    // sec 4 point 2, ASK_PQNK_RETRIEVAL_POLICY.md sec 3) — a reviewer names
    // the specific older Farmer Advisory record(s) this answer supersedes or
    // clarifies. Free-text IDs rather than checkbox-from-candidates because
    // the record being superseded need not be a retrieval candidate for
    // THIS question's own wording.
    const supersedesIds = splitList(body.supersedesRefs);
    const supersedesOrClarifies = supersedesIds.map((id) => ({ sourceType: "Farmer Advisory Record", reference: id }));

    const contextRaw = JSON.parse(row.submitted_context || "{}");

    if (decision === "Publish") {
      // Defense-in-depth: the only INSERT site for farmer_advisory in the
      // service, guarded by an explicit, testable assertion rather than
      // relying solely on "approved_by happens to always be hardcoded to
      // Pedaver here" (ASK_PQNK_ARCHITECTURE.md sec 19, provenance.ts).
      assertPedaverAuthoredPublication({
        approvedBy: PEDAVER_AUTHOR,
        publicationStatus: "Published",
        originQueueId: row.id,
        originReferenceNumber: row.reference_number,
      });

      db.prepare(`
        INSERT INTO farmer_advisory (
          id, question, canonical_question, farmer_language_wording, field_context,
          question_cluster_id, short_answer, answer, practical_action, language,
          crops, problems, problem_family, science_domains, practices, machinery,
          geography, authority_status, evidence_type, publication_level, escalated_to,
          publication_status, advisory_reference, supersedes_or_clarifies, sources,
          approved_by, approved_date, related_media, related_papers, related_science,
          related_farmer_advisories, origin_question_modality, version, superseded_by,
          origin_queue_id, origin_reference_number, repeat_count, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '[]', ?, '[]', '[]', ?, ?, ?, ?, NULL, 'Published', ?, ?, ?, ?, ?, '[]', ?, ?, ?, 'Text', 1, NULL, ?, ?, ?, ?)
      `).run(
        advisoryId,
        row.original_question,
        row.canonical_question ?? row.original_question,
        JSON.stringify([row.original_question]),
        contextRaw.fieldCondition ?? null,
        row.cluster_id,
        shortAnswer,
        answer,
        practicalAction,
        language,
        JSON.stringify(crops),
        JSON.stringify(problems),
        JSON.stringify(scienceDomains),
        contextRaw.region ?? null,
        "Current / Approved PQNK Knowledge",
        evidenceType,
        publicationLevel,
        advisoryId, // advisory_reference == its own id for V1 (used as the public slug)
        JSON.stringify(supersedesOrClarifies),
        JSON.stringify(sources),
        PEDAVER_AUTHOR,
        now,
        JSON.stringify(relatedPapers),
        JSON.stringify(relatedScience),
        JSON.stringify(relatedFarmerAdvisories),
        row.id,
        row.reference_number,
        (JSON.parse(row.sources_already_found || "[]") as unknown[]).length,
        now
      );

      // Bidirectional provenance: the superseded record is NEVER deleted or
      // mutated in its content — only its own superseded_by pointer is set,
      // so the full history of both records remains independently queryable
      // (ASK_PQNK_ARCHITECTURE.md sec 19, adversarial test 5).
      for (const id of supersedesIds) {
        db.prepare(`UPDATE farmer_advisory SET superseded_by = ? WHERE id = ?`).run(advisoryId, id);
      }

      if (row.cluster_id) markClusterResolved(row.cluster_id, advisoryId);

      db.prepare(`
        UPDATE referral_queue SET response_status = 'Answered', pedaver_answer = ?, reviewer = 'Pedaver', publication_decision = 'Publish', advisory_record_id = ?, updated_at = ?
        WHERE id = ?
      `).run(JSON.stringify({ answer, practicalAction, shortAnswer }), advisoryId, now, row.id);
    } else {
      db.prepare(`
        UPDATE referral_queue SET response_status = 'Answered', pedaver_answer = ?, reviewer = 'Pedaver', publication_decision = 'Private', updated_at = ?
        WHERE id = ?
      `).run(JSON.stringify({ answer, practicalAction, shortAnswer }), now, row.id);
    }

    redirect(ctx.res, `/inbox/${row.id}`);
  });

  // Read-only preview of a published record, linked from the inbox once answered.
  router.get("/advisory-preview/:id", (ctx) => {
    if (!isAuthenticated(ctx)) return redirect(ctx.res, "/inbox/login");
    const row = db.prepare(`SELECT * FROM farmer_advisory WHERE id = ?`).get(ctx.params.id) as any;
    if (!row) return html(ctx.res, 404, layout("Not found", `<h1>Not found</h1>`));
    const body = `
      <p><a href="/inbox" class="btn secondary">← Back to Inbox</a></p>
      <h1>Published Farmer Advisory</h1>
      <div class="card">
        <div class="field-label">Question</div><div class="field-value">${esc(row.question)}</div>
        <div class="field-label">Short answer</div><div class="field-value">${esc(row.short_answer)}</div>
        <div class="field-label">Full answer</div><div class="field-value">${esc(row.answer)}</div>
        ${row.practical_action ? `<div class="field-label">Practical action</div><div class="field-value">${esc(row.practical_action)}</div>` : ""}
        <div class="field-label">Status</div><div class="field-value"><span class="pill answered">${esc(row.authority_status)} · Published</span></div>
        <div class="field-label">Sources</div><div class="field-value muted">${esc(row.sources)}</div>
      </div>`;
    html(ctx.res, 200, layout("Published Advisory", body));
  });
}
