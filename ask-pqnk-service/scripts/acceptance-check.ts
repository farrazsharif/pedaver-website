// Acceptance suite for Ask PQNK V1, current through Revision 1.4.2
// (pre-deployment hardening: the knowledge-boundary rule enforced in code
// on top of 1.4.1's AI-under-deterministic-control redesign). Local-only:
// exercises the running dev server over HTTP for end-to-end flows, reads
// the sqlite file directly for provenance/DB-level assertions, and imports
// groundingValidator.ts / intent.ts directly for synthetic/adversarial
// unit checks that would be awkward to provoke through the real pipeline.
// No paid provider is called — MockAiProvider is the active provider
// (ai/index.ts default).
//
// Every record this suite creates is tracked and deleted in a teardown
// pass at the end (Revision 1.4.2 test 6: acceptance-test records must not
// contaminate the corpus) — the suite fails loudly if teardown doesn't
// leave the three tables exactly as it found them.
//
// Run: BASE=http://localhost:4001 npx tsx scripts/acceptance-check.ts
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { validateComposedAnswer } from "../src/ai/groundingValidator.js";
import { recognizeDeterministic } from "../src/intent.js";
import type { RetrievedSource } from "../src/ai/provider.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:4001";
const DB_PATH = path.join(__dirname, "..", "data", "ask-pqnk.sqlite");
const db = new DatabaseSync(DB_PATH);

let pass = 0;
let fail = 0;
const failures: string[] = [];

function check(name: string, condition: boolean, detail?: string) {
  if (condition) {
    pass++;
    console.log(`  ok  ${name}`);
  } else {
    fail++;
    failures.push(name);
    console.log(`FAIL  ${name}${detail ? " — " + detail : ""}`);
  }
}

async function ask(question: string): Promise<any> {
  const res = await fetch(`${BASE}/api/ask`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return res.json();
}

async function refer(question: string, extra: Record<string, string> = {}): Promise<any> {
  const res = await fetch(`${BASE}/api/refer`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question, ...extra }),
  });
  return res.json();
}

async function login(): Promise<string> {
  const password = process.env.ASK_PQNK_PEDAVER_PASSWORD ?? "pqnk-local-dev";
  const res = await fetch(`${BASE}/inbox/login`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `password=${encodeURIComponent(password)}`,
    redirect: "manual",
  });
  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) throw new Error("Login did not return a session cookie");
  return setCookie.split(";")[0];
}

async function findQueueIdByReference(cookie: string, referenceNumber: string): Promise<string> {
  const res = await fetch(`${BASE}/inbox`, { headers: { cookie } });
  const html = await res.text();
  // A row is <tr><td class="mono">REF</td>...<a href="/inbox/ID">Answer</a>...</tr>
  // (src/views/inboxList.ts) -- reference precedes the id, so scan forward
  // from the reference to the id within the same row.
  const re = new RegExp(`${referenceNumber}[\\s\\S]*?/inbox/([a-f0-9-]{36})`, "i");
  const m = html.match(re);
  if (!m) throw new Error(`Could not find queue row for ${referenceNumber} in inbox listing`);
  return m[1];
}

async function publish(cookie: string, queueId: string, fields: Record<string, string>): Promise<void> {
  const body = new URLSearchParams(fields).toString();
  await fetch(`${BASE}/inbox/${queueId}/publish`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", cookie },
    body,
    redirect: "manual",
  });
}

// --- Test-record tracking, for the teardown pass (test 6) ---
const createdQueueIds = new Set<string>();
const createdAdvisoryIdsByQuestion = new Map<string, string>(); // question -> advisory id, resolved after publish

async function referAndTrack(question: string, extra: Record<string, string> = {}): Promise<any> {
  const r = await refer(question, extra);
  if (typeof r.referenceNumber === "string") {
    const row = db.prepare(`SELECT id FROM referral_queue WHERE reference_number = ?`).get(r.referenceNumber) as { id: string } | undefined;
    if (row) createdQueueIds.add(row.id);
  }
  return r;
}

function advisoryIdForQueue(queueId: string): string | null {
  const row = db.prepare(`SELECT advisory_record_id FROM referral_queue WHERE id = ?`).get(queueId) as { advisory_record_id: string | null } | undefined;
  return row?.advisory_record_id ?? null;
}

async function main() {
  console.log("=== Ask PQNK V1 acceptance suite (Revision 1.4.2) ===\n");

  const preCounts = {
    advisory: (db.prepare(`SELECT COUNT(*) c FROM farmer_advisory`).get() as { c: number }).c,
    queue: (db.prepare(`SELECT COUNT(*) c FROM referral_queue`).get() as { c: number }).c,
    cluster: (db.prepare(`SELECT COUNT(*) c FROM question_cluster`).get() as { c: number }).c,
  };
  console.log(`DB before this run: farmer_advisory=${preCounts.advisory}, referral_queue=${preCounts.queue}, question_cluster=${preCounts.cluster}\n`);

  console.log("-- Regression: baseline pipeline still works --");
  {
    const r = await ask("Water is not going into my soil, what is wrong?");
    check("A. English on-topic question is answered sufficiently", r.sufficient === true, JSON.stringify(r).slice(0, 200));
    check("A. Answer is composed in English (no Urdu script in output)", r.sufficient && !/[؀-ۿ]/.test(r.answer ?? ""));
    check("A. Citations present", Array.isArray(r.sources) && r.sources.length > 0);
  }
  {
    const r = await ask("بارش کے بعد میری فصل پیلی کیوں ہوگئی؟");
    check("B. Urdu question detected as Urdu", r.language === "Urdu", r.language);
    check("B. Urdu question still answered in English", r.sufficient ? !/[؀-ۿ]/.test(r.answer ?? "") : true);
  }
  {
    const r = await ask("gehun mein paani ka masla hai");
    check("C. Roman Urdu detected", r.language === "Roman Urdu", r.language);
    check("C. paani/gehun resolved deterministically (confident)", r.intentSource === "deterministic", r.intentSource);
  }
  {
    const r = await ask("how deep is my hardpan");
    check("D. Field-condition question always refers (safety boundary)", r.sufficient === false && r.referralReason === "Field condition requires physical inspection", JSON.stringify(r).slice(0, 200));
  }

  console.log("\n-- Revision 1.4.1: conditional AI intent extraction --");
  {
    const r = await ask("gehun mein paani ka masla hai");
    check("E. Confident deterministic question skips AI intent call", r.intentSource === "deterministic", r.intentSource);
  }
  {
    const q = "Tell me about sugarcane";
    const det = recognizeDeterministic(q);
    check("F. Sanity: this probe question is deterministically inconclusive", det.confident === false, JSON.stringify(det));
    const r = await ask(q);
    check("F. Inconclusive deterministic pass triggers AI-assisted intent", r.intentSource === "ai-assisted", r.intentSource);
  }

  console.log("\n-- Revision 1.4.1: AI composition only runs when gate is sufficient --");
  {
    const r = await ask(`Which satellite imagery subscription service should I use for scouting, test ${Date.now()}?`);
    check("G. Unrecognized/off-corpus question is insufficient (composeAnswer never invoked, per code path)", r.sufficient === false, JSON.stringify(r).slice(0, 200));
  }

  console.log("\n-- Revision 1.4.1: grounding validator (source-membership + authority + conservative synthesis boundary; overlap is secondary only) --");
  {
    const sources: RetrievedSource[] = [
      { sourceType: "Science Page", reference: "/science/water", title: "Water", snippet: "PQNK water systems rely on infiltration, mulch, and dew capture to reduce irrigation dependency.", authorityStatus: "Current / Approved PQNK Knowledge", score: 40 },
      { sourceType: "Knowledge Paper", reference: "old-paper", title: "Old", snippet: "An older formulation, retained for history.", authorityStatus: "Historical PQNK Formulation", score: 10 },
    ];

    const draftMembership = { claims: [{ text: "This is a fully invented claim citing nothing real, long enough to pass length checks easily.", sourceIndex: 7 }], practicalAction: { text: "Follow the guidance in the cited source above.", sourceIndex: 0 } };
    const vMembership = validateComposedAnswer(draftMembership, sources);
    check("H. Claim citing an out-of-range source index is rejected on source-membership", vMembership.claimOutcomes[0].accepted === false && vMembership.claimOutcomes[0].reason === "source-membership", JSON.stringify(vMembership.claimOutcomes[0]));

    const draftAuthority = { claims: [{ text: "This claim cites a real source that is present in the retrieved set but historical, not current, PQNK knowledge.", sourceIndex: 1 }], practicalAction: { text: "Follow the guidance in the cited source above.", sourceIndex: 0 } };
    const vAuthority = validateComposedAnswer(draftAuthority, sources);
    check("I. Claim citing a retrieved-but-ineligible-authority source is rejected on authority", vAuthority.claimOutcomes[0].accepted === false && vAuthority.claimOutcomes[0].reason === "authority", JSON.stringify(vAuthority.claimOutcomes[0]));

    const paddedClaim = "PQNK water systems rely on infiltration, mulch, and dew capture to reduce irrigation dependency, and this claim keeps padding on far more invented elaboration than the source snippet actually contains, going on at much greater length than a conservative bounded paraphrase would, well past what is licensed by the cited passage, adding invented specifics, invented numbers, and invented recommendations the source never made, repeatedly, to make sure it is definitely more than three times as long as the source snippet itself.";
    const draftBoundary = { claims: [{ text: paddedClaim, sourceIndex: 0 }], practicalAction: { text: "Follow the guidance in the cited source above.", sourceIndex: 0 } };
    const vBoundary = validateComposedAnswer(draftBoundary, sources);
    check("J. Over-expanded claim is rejected on synthesis-boundary even though it shares real vocabulary with the source", vBoundary.claimOutcomes[0].accepted === false && vBoundary.claimOutcomes[0].reason === "synthesis-boundary", JSON.stringify(vBoundary.claimOutcomes[0]));
    check("J. (proof overlap is diagnostic-only) that rejected claim's logged overlap is nonzero, yet it was still dropped", vBoundary.claimOutcomes[0].lexicalOverlap > 0, String(vBoundary.claimOutcomes[0].lexicalOverlap));

    const draftLowOverlap = { claims: [{ text: "Farm irrigation needs shrink because rainwater soaks in, ground cover keeps it there, and moisture condenses overnight.", sourceIndex: 0 }], practicalAction: { text: "Follow the guidance in the cited source above.", sourceIndex: 0 } };
    const vLowOverlap = validateComposedAnswer(draftLowOverlap, sources);
    check("K. Differently-worded but bounded, source-attributed claim is accepted despite low overlap", vLowOverlap.claimOutcomes[0].accepted === true, JSON.stringify(vLowOverlap.claimOutcomes[0]));
    check("K. (measurement) that accepted claim's overlap is indeed low", vLowOverlap.claimOutcomes[0].lexicalOverlap < 0.3, String(vLowOverlap.claimOutcomes[0].lexicalOverlap));

    const draftAllBad = { claims: [{ text: "invented", sourceIndex: 99 }], practicalAction: { text: "Follow the guidance in the cited source above.", sourceIndex: 0 } };
    const vAllBad = validateComposedAnswer(draftAllBad, sources);
    check("L. All-claims-rejected draft produces answer=null (forces fallback to Refer)", vAllBad.answer === null);
  }

  console.log("\n-- Revision 1.4.2, adversarial test 1: AI-generated answers cannot become Farmer Advisory records --");
  {
    const noAiDbImport = !fs
      .readFileSync(path.join(__dirname, "..", "src", "ai", "mockProvider.ts"), "utf8")
      .match(/from ["'].*db\.js["']/);
    const noAiDbImport2 = !fs
      .readFileSync(path.join(__dirname, "..", "src", "ai", "anthropicProvider.ts"), "utf8")
      .match(/from ["'].*db\.js["']/);
    const noAiDbImport3 = !fs
      .readFileSync(path.join(__dirname, "..", "src", "ai", "groundingValidator.ts"), "utf8")
      .match(/from ["'].*db\.js["']/);
    check("N1. mockProvider.ts does not import the database module (structural: AI has no write path)", noAiDbImport);
    check("N1. anthropicProvider.ts does not import the database module", noAiDbImport2);
    check("N1. groundingValidator.ts does not import the database module", noAiDbImport3);

    const before = (db.prepare(`SELECT COUNT(*) c FROM farmer_advisory`).get() as { c: number }).c;
    const r = await ask("Water is not going into my soil, what is wrong?"); // sufficient, AI-composed
    const after = (db.prepare(`SELECT COUNT(*) c FROM farmer_advisory`).get() as { c: number }).c;
    check("N2. A grounded, AI-composed /api/ask answer creates zero new farmer_advisory rows", r.sufficient === true && after === before, `before=${before} after=${after}`);
  }

  console.log("\n-- Revision 1.4.2, adversarial test 2: an unanswered referral is not retrievable --");
  {
    const token = randomUUID().slice(0, 8);
    const q = `Which brand of pruning shears (ref ${token}) does Pedaver suggest for orchard staff?`;
    const first = await ask(q);
    check("O1. Fresh question is insufficient before any referral exists", first.sufficient === false, JSON.stringify(first).slice(0, 150));

    const referred = await referAndTrack(q);
    check("O2. Referral is created (status New, unanswered)", typeof referred.referenceNumber === "string");
    const row = db.prepare(`SELECT id, response_status FROM referral_queue WHERE reference_number = ?`).get(referred.referenceNumber) as { id: string; response_status: string };
    check("O3. Queue row is genuinely unanswered (response_status = New)", row.response_status === "New", row.response_status);

    const second = await ask(q); // re-ask with the referral still sitting unanswered in the queue
    check("O4. Same question, asked again while referral is still unanswered, is STILL insufficient", second.sufficient === false, JSON.stringify(second).slice(0, 150));
    check("O5. No farmer_advisory row exists for this question yet", !db.prepare(`SELECT id FROM farmer_advisory WHERE question = ?`).get(q));
  }

  console.log("\n-- Revision 1.4.2, adversarial test 3: a Pedaver answer remains non-retrievable until published --");
  {
    const token = randomUUID().slice(0, 8);
    // Deliberately avoids any taxonomy-relevant word (crop/domain/problem)
    // -- "soil thermometer" was tried first and accidentally matched the
    // Soil Science page via ordinary domain-keyword overlap, an existing,
    // previously-documented V1 ranking limitation (retrieval.ts) unrelated
    // to this test's actual point (a Private-decision answer must not be
    // retrievable). A sun hat has no plausible PQNK taxonomy overlap.
    const q = `Which brand of sun hat (ref ${token}) does Pedaver recommend for field staff?`;
    await referAndTrack(q);
    const cookie = await login();
    const referred = db.prepare(`SELECT reference_number FROM referral_queue WHERE original_question = ?`).get(q) as { reference_number: string };
    const queueId = await findQueueIdByReference(cookie, referred.reference_number);
    createdQueueIds.add(queueId);

    // Pedaver answers, but chooses NOT to publish (decision: Private).
    await publish(cookie, queueId, {
      answer: "PQNK does not endorse a specific thermometer brand.",
      publicationDecision: "Private",
    });

    const afterPrivateAnswer = db.prepare(`SELECT response_status, pedaver_answer, advisory_record_id FROM referral_queue WHERE id = ?`).get(queueId) as { response_status: string; pedaver_answer: string | null; advisory_record_id: string | null };
    check("P1. Queue entry is marked Answered with the answer text stored internally", afterPrivateAnswer.response_status === "Answered" && !!afterPrivateAnswer.pedaver_answer);
    check("P2. No farmer_advisory record was created for a Private decision", afterPrivateAnswer.advisory_record_id === null);
    check("P3. No farmer_advisory row exists for this question", !db.prepare(`SELECT id FROM farmer_advisory WHERE question = ?`).get(q));

    const stillInsufficient = await ask(q);
    check("P4. Ask PQNK still cannot answer this question — a Pedaver answer that isn't published is not retrievable", stillInsufficient.sufficient === false, JSON.stringify(stillInsufficient).slice(0, 150));
  }

  console.log("\n-- Revision 1.4.2, adversarial test 4: publication makes it immediately retrievable --");
  let firstAdvisoryId = "";
  let firstAdvisoryQuestion = "";
  {
    const token = randomUUID().slice(0, 8);
    const q = `Which brand of gardening gloves (reference ${token}) does Pedaver suggest for field staff?`;
    firstAdvisoryQuestion = q;
    const first = await ask(q);
    check("Q1. Genuinely novel question is insufficient", first.sufficient === false, JSON.stringify(first).slice(0, 150));

    const referred = await referAndTrack(q);
    const cookie = await login();
    const queueId = await findQueueIdByReference(cookie, referred.referenceNumber);
    await publish(cookie, queueId, {
      answer: "PQNK does not endorse a specific commercial glove brand; choose based on fit, durability, and chemical exposure per the site's own field-safety guidance.",
      shortAnswer: "PQNK does not recommend a specific glove brand.",
      practicalAction: "Evaluate options against the field-safety guidance in the PQNK materials.",
      publicationDecision: "Publish",
    });
    firstAdvisoryId = advisoryIdForQueue(queueId) ?? "";
    check("Q2. Publish created a farmer_advisory record", firstAdvisoryId.length > 0);

    const second = await ask(q);
    check("Q3. Same question, re-asked immediately after publish, is now sufficient (no rebuild/redeploy)", second.sufficient === true, JSON.stringify(second).slice(0, 250));
    check("Q4. Re-answered from the new Farmer Advisory record", second.sufficient && second.sources?.some((s: any) => s.sourceType === "Farmer Advisory Record"), JSON.stringify(second.sources));

    const advisoryRow = db.prepare(`SELECT approved_by, publication_status, origin_queue_id, origin_reference_number FROM farmer_advisory WHERE id = ?`).get(firstAdvisoryId) as any;
    check("Q5. Provenance recorded: approvedBy = Pedaver", advisoryRow.approved_by === "Pedaver", advisoryRow.approved_by);
    check("Q5. Provenance recorded: publicationStatus = Published", advisoryRow.publication_status === "Published");
    check("Q5. Provenance recorded: originQueueId set", !!advisoryRow.origin_queue_id);
    check("Q5. Provenance recorded: originReferenceNumber set (self-contained, new in 1.4.2)", advisoryRow.origin_reference_number === referred.referenceNumber, advisoryRow.origin_reference_number);
  }

  console.log("\n-- Revision 1.4.2, adversarial test 5: a later Advisory can supersede/clarify an older one without deleting historical provenance --");
  {
    const token = randomUUID().slice(0, 8);
    // Same underlying question, asked again — Pedaver is issuing an
    // improved/corrected answer that should outrank the first.
    const q = firstAdvisoryQuestion.replace(/\(reference [a-f0-9]+\)/, `(reference ${token}, corrected)`);
    const referred = await referAndTrack(q);
    const cookie = await login();
    const queueId = await findQueueIdByReference(cookie, referred.referenceNumber);
    await publish(cookie, queueId, {
      answer: "Correction: PQNK still does not endorse a specific commercial glove brand, but nitrile-coated gloves are specifically recommended for pesticide-handling tasks per updated field-safety guidance.",
      shortAnswer: "Use nitrile-coated gloves for pesticide handling; no specific brand is endorsed.",
      practicalAction: "Select nitrile-coated gloves for chemical-exposure tasks per the updated PQNK field-safety guidance.",
      publicationDecision: "Publish",
      supersedesRefs: firstAdvisoryId,
    });
    const newAdvisoryId = advisoryIdForQueue(queueId) ?? "";
    check("R1. Second Advisory was created", newAdvisoryId.length > 0 && newAdvisoryId !== firstAdvisoryId);

    const oldRow = db.prepare(`SELECT id, publication_status, superseded_by, answer FROM farmer_advisory WHERE id = ?`).get(firstAdvisoryId) as any;
    check("R2. Old Advisory record still exists (not deleted)", !!oldRow);
    check("R3. Old Advisory's content is unchanged (historical provenance intact)", oldRow?.answer?.includes("PQNK does not endorse a specific commercial glove brand"));
    check("R4. Old Advisory is now marked superseded_by the new record", oldRow?.superseded_by === newAdvisoryId, oldRow?.superseded_by);
    check("R5. Old Advisory is still Published (not retracted, just superseded)", oldRow?.publication_status === "Published");

    const newRow = db.prepare(`SELECT supersedes_or_clarifies FROM farmer_advisory WHERE id = ?`).get(newAdvisoryId) as any;
    const relations = JSON.parse(newRow.supersedes_or_clarifies);
    check("R6. New Advisory's supersedesOrClarifies names the old record", relations.some((rel: any) => rel.reference === firstAdvisoryId), newRow.supersedes_or_clarifies);

    const advisoryCountForQ = (db.prepare(`SELECT COUNT(*) c FROM farmer_advisory WHERE id = ? OR id = ?`).get(firstAdvisoryId, newAdvisoryId) as { c: number }).c;
    check("R7. Both records (old and new) remain independently queryable — nothing was deleted", advisoryCountForQ === 2);

    // R8: the promotion is not just recorded — it's actually exercised by
    // retrieval.ts's ranking. Asking the ORIGINAL question again should
    // match both records via text-similarity, with the superseding record
    // now leading (SOURCE_AUTHORITY_POLICY.md sec 4 point 2).
    const reAsked = await ask(firstAdvisoryQuestion);
    const leadSource = reAsked.sources?.[0];
    check(
      "R8. Re-asking the original question leads with the SUPERSEDING record, not the superseded one",
      reAsked.sufficient === true && leadSource?.sourceType === "Farmer Advisory Record" && leadSource?.reference === newAdvisoryId,
      JSON.stringify(reAsked.sources)
    );
  }

  console.log("\n-- Revision 1.4.2, adversarial test 6: acceptance-test records are cleaned up and cannot contaminate the corpus --");
  {
    // Teardown: delete every queue entry (and its linked advisory, cluster)
    // this run created. Nothing genuine should ever be in these sets in a
    // local dev run, but the deletion is scoped to tracked IDs regardless
    // — never a blanket wipe — so a real record could never be caught by
    // accident if this script were ever pointed at a non-empty DB.
    let deletedAdvisory = 0;
    let deletedQueue = 0;
    let deletedCluster = 0;
    for (const queueId of createdQueueIds) {
      const row = db.prepare(`SELECT advisory_record_id, cluster_id FROM referral_queue WHERE id = ?`).get(queueId) as { advisory_record_id: string | null; cluster_id: string | null } | undefined;
      if (row?.advisory_record_id) {
        db.prepare(`DELETE FROM farmer_advisory WHERE id = ?`).run(row.advisory_record_id);
        deletedAdvisory++;
      }
      if (row?.cluster_id) {
        db.prepare(`DELETE FROM question_cluster WHERE id = ?`).run(row.cluster_id);
        deletedCluster++;
      }
      db.prepare(`DELETE FROM referral_queue WHERE id = ?`).run(queueId);
      deletedQueue++;
    }
    console.log(`  Deleted ${deletedAdvisory} farmer_advisory, ${deletedQueue} referral_queue, ${deletedCluster} question_cluster test rows.`);

    const postCounts = {
      advisory: (db.prepare(`SELECT COUNT(*) c FROM farmer_advisory`).get() as { c: number }).c,
      queue: (db.prepare(`SELECT COUNT(*) c FROM referral_queue`).get() as { c: number }).c,
      cluster: (db.prepare(`SELECT COUNT(*) c FROM question_cluster`).get() as { c: number }).c,
    };
    check("S1. farmer_advisory count restored to pre-run baseline", postCounts.advisory === preCounts.advisory, `pre=${preCounts.advisory} post=${postCounts.advisory}`);
    check("S2. referral_queue count restored to pre-run baseline", postCounts.queue === preCounts.queue, `pre=${preCounts.queue} post=${postCounts.queue}`);
    check("S3. question_cluster count restored to pre-run baseline", postCounts.cluster === preCounts.cluster, `pre=${preCounts.cluster} post=${postCounts.cluster}`);

    const contamination = await ask(firstAdvisoryQuestion);
    check("S4. The cleaned-up test question is no longer answerable — corpus not contaminated", contamination.sufficient === false, JSON.stringify(contamination).slice(0, 150));
  }

  console.log(`\n=== ${pass} passed, ${fail} failed ===`);
  if (fail > 0) {
    console.log("Failed checks:", failures.join(", "));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Acceptance suite crashed:", err);
  process.exit(1);
});
