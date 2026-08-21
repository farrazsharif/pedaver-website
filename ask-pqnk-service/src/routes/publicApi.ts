import { randomUUID } from "node:crypto";
import type { Router } from "../router.js";
import { json } from "../router.js";
import { aiProvider } from "../ai/index.js";
import { validateComposedAnswer } from "../ai/groundingValidator.js";
import { retrieve } from "../retrieval.js";
import { evaluateSufficiency } from "../sufficiency.js";
import { findOrCreateCluster } from "../clustering.js";
import { generateReferenceNumber } from "../referenceNumber.js";
import { normalizeIntentWithControl } from "../intent.js";
import { db, nowIso } from "../db.js";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function registerPublicApi(router: Router) {
  // POST /api/ask — ASK_PQNK_RETRIEVAL_POLICY.md sec 2 end to end.
  router.post("/api/ask", async (ctx) => {
    const { question } = (ctx.body as { question?: string }) ?? {};
    if (!question || typeof question !== "string" || question.trim().length < 3) {
      return json(ctx.res, 400, { error: "A question is required." });
    }

    // AI intent extraction is conditional, not mandatory — this orchestrator
    // runs the deterministic recognizer first and only calls aiProvider when
    // it's inconclusive (ASK_PQNK_ARCHITECTURE.md sec 9, Revision 1.4.1).
    const intent = await normalizeIntentWithControl(question, aiProvider);
    const result = retrieve(question, intent);
    const gate = evaluateSufficiency(question, intent, result);

    let referralReason = gate.reason;

    if (gate.sufficient) {
      const draft = await aiProvider.composeAnswer(question, gate.topSources);
      // Deterministic grounding validation — source-membership, authority,
      // conservative synthesis boundary, NOT lexical overlap (that's a
      // logged secondary diagnostic only). ASK_PQNK_ARCHITECTURE.md sec
      // 18.2, sec 18.5.
      const validation = validateComposedAnswer(draft, gate.topSources);
      if (validation.answer) {
        return json(ctx.res, 200, {
          sufficient: true,
          language: intent.language,
          intentSource: intent.intentSource,
          shortAnswer: validation.answer.shortAnswer,
          answer: validation.answer.answer,
          practicalAction: validation.answer.practicalAction,
          sources: gate.topSources.map((s) => ({
            sourceType: s.sourceType,
            reference: s.reference,
            title: s.title,
            authorityStatus: s.authorityStatus,
          })),
          aiProvider: aiProvider.name,
        });
      }
      // AI failed to stay grounded well enough to constitute a real
      // answer — degrade to Refer rather than show a thinned or
      // unsupported answer (ASK_PQNK_ARCHITECTURE.md sec 18.2 point 4).
      referralReason = "Grounding validation could not support a full answer";
    }

    const explanation = await aiProvider.composeReferralExplanation(intent.language);
    return json(ctx.res, 200, {
      sufficient: false,
      language: intent.language,
      intentSource: intent.intentSource,
      referralReason,
      explanation,
      normalizedIntent: intent,
      sourcesExamined: result.candidates.slice(0, 5).map((c) => ({ title: c.title, sourceType: c.sourceType, score: c.score })),
    });
  });

  // POST /api/refer — PEDAVER_REFERRAL_WORKFLOW.md sec 4, 6, 10.
  // Carries the original question + everything Ask PQNK already found
  // forward automatically — the farmer never retypes anything (locked
  // instruction sec 10 of the V1 core prompt).
  router.post("/api/refer", async (ctx) => {
    const body = (ctx.body as Record<string, unknown>) ?? {};
    const question = String(body.question ?? "").trim();
    if (question.length < 3) return json(ctx.res, 400, { error: "A question is required." });

    const intent = await normalizeIntentWithControl(question, aiProvider);
    const result = retrieve(question, intent);
    const gate = evaluateSufficiency(question, intent, result);
    const region = typeof body.region === "string" ? body.region : undefined;

    const clusterId = findOrCreateCluster(question, intent, "Text", region);

    const referenceNumber = generateReferenceNumber();
    const id = randomUUID();
    const now = nowIso();
    const dueBy = new Date(Date.now() + ONE_WEEK_MS).toISOString();

    const contact = {
      name: typeof body.name === "string" ? body.name : undefined,
      whatsapp: typeof body.whatsapp === "string" ? body.whatsapp : undefined,
      email: typeof body.email === "string" ? body.email : undefined,
    };
    const submittedContext = {
      crop: typeof body.crop === "string" ? body.crop : undefined,
      region,
      fieldCondition: typeof body.fieldCondition === "string" ? body.fieldCondition : undefined,
      additionalExplanation: typeof body.additionalExplanation === "string" ? body.additionalExplanation : undefined,
    };

    db.prepare(`
      INSERT INTO referral_queue (
        id, reference_number, original_question, question_modality, language,
        canonical_question, submitted_context, contact, date, due_by,
        taxonomy_classification, cluster_id, retrieval_attempt,
        sources_already_found, referral_reason, response_status,
        created_at, updated_at
      ) VALUES (?, ?, ?, 'Text', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?)
    `).run(
      id,
      referenceNumber,
      question,
      intent.language,
      intent.canonicalQuestion,
      JSON.stringify(submittedContext),
      JSON.stringify(contact),
      now,
      dueBy,
      JSON.stringify({ crops: intent.crops, fieldProblems: intent.fieldProblems, scienceDomains: intent.scienceDomains }),
      clusterId,
      JSON.stringify({ candidatesChecked: result.candidates.length }),
      JSON.stringify(result.candidates.slice(0, 5).map((c) => ({ title: c.title, sourceType: c.sourceType }))),
      gate.reason ?? "No authoritative source",
      now,
      now
    );

    return json(ctx.res, 200, {
      referenceNumber,
      dueBy,
      message: "Your question has been referred to Pedaver. Pedaver normally aims to respond within one week.",
    });
  });

  // GET /api/status/:referenceNumber — PEDAVER_REFERRAL_WORKFLOW.md sec 10a.
  // No authentication — the reference number itself is the bearer credential.
  router.get("/api/status/:referenceNumber", (ctx) => {
    const row = db
      .prepare(`SELECT reference_number, response_status, advisory_record_id FROM referral_queue WHERE reference_number = ?`)
      .get(ctx.params.referenceNumber) as { reference_number: string; response_status: string; advisory_record_id: string | null } | undefined;

    if (!row) return json(ctx.res, 404, { error: "No question found with that reference number." });

    return json(ctx.res, 200, {
      referenceNumber: row.reference_number,
      status: row.response_status,
      advisoryId: row.advisory_record_id,
      advisoryUrl: row.advisory_record_id ? `/api/advisory/${row.advisory_record_id}` : null,
    });
  });

  // GET /api/advisory — browse zone.
  router.get("/api/advisory", (ctx) => {
    const rows = db
      .prepare(`SELECT id, canonical_question, short_answer, crops, problems, science_domains, language, approved_date FROM farmer_advisory WHERE publication_status = 'Published' ORDER BY approved_date DESC`)
      .all();
    return json(ctx.res, 200, { records: rows });
  });

  router.get("/api/advisory/:id", (ctx) => {
    const row = db.prepare(`SELECT * FROM farmer_advisory WHERE id = ? AND publication_status = 'Published'`).get(ctx.params.id);
    if (!row) return json(ctx.res, 404, { error: "Not found." });
    return json(ctx.res, 200, row);
  });
}
