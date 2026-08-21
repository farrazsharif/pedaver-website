// Question clustering — PEDAVER_REFERRAL_WORKFLOW.md sec 5. Matches by
// canonical taxonomy overlap (same fieldProblem/scienceDomain/crop
// footprint), not literal text similarity, per the locked instruction:
// "Use the existing PQNK taxonomy and deterministic matching first. Do not
// build unnecessary machine-learning infrastructure merely for clustering
// V1." Every original question is preserved regardless of which cluster it
// joins.
import { randomUUID } from "node:crypto";
import { db, nowIso } from "./db.js";
import type { NormalizedIntent } from "./ai/provider.js";

interface ClusterRow {
  id: string;
  canonical_question: string;
  variant_questions: string;
  repeat_count: number;
  languages_observed: string;
  crops_observed: string;
  regions_observed: string;
  first_asked: string;
  last_asked: string;
  answer_coverage: string;
  knowledge_gap_status: string;
}

function taxonomyKey(intent: NormalizedIntent): string {
  // Deterministic matching key: sorted field problems ∪ science domains.
  // Two questions land in the same cluster only if they touch the exact
  // same taxonomy footprint — conservative by design, so distinct
  // knowledge needs never get silently merged.
  return [...intent.fieldProblems, ...intent.scienceDomains].sort().join("|");
}

export function findOrCreateCluster(
  question: string,
  intent: NormalizedIntent,
  modality: "Text" | "Voice",
  region?: string
): string {
  const key = taxonomyKey(intent);
  const now = nowIso();

  // A small dedicated key->clusterId index table makes matching a direct
  // lookup on the taxonomy footprint (sorted fieldProblems + scienceDomains)
  // rather than re-deriving it from every stored cluster on each call.
  db.exec(`CREATE TABLE IF NOT EXISTS cluster_key_index (key TEXT PRIMARY KEY, cluster_id TEXT NOT NULL)`);

  if (key) {
    const existing = db.prepare(`SELECT cluster_id FROM cluster_key_index WHERE key = ?`).get(key) as { cluster_id: string } | undefined;
    if (existing) {
      const row = db.prepare(`SELECT * FROM question_cluster WHERE id = ?`).get(existing.cluster_id) as unknown as ClusterRow;
      const variants = JSON.parse(row.variant_questions);
      variants.push({ text: question, language: intent.language, askedDate: now, modality });
      const languages = new Set<string>(JSON.parse(row.languages_observed));
      languages.add(intent.language);
      const crops = new Set<string>(JSON.parse(row.crops_observed));
      intent.crops.forEach((c) => crops.add(c));
      const regions = new Set<string>(JSON.parse(row.regions_observed));
      if (region) regions.add(region);

      db.prepare(`
        UPDATE question_cluster SET
          variant_questions = ?, repeat_count = repeat_count + 1,
          languages_observed = ?, crops_observed = ?, regions_observed = ?,
          last_asked = ?
        WHERE id = ?
      `).run(
        JSON.stringify(variants),
        JSON.stringify([...languages]),
        JSON.stringify([...crops]),
        JSON.stringify([...regions]),
        now,
        row.id
      );
      return row.id;
    }
  }

  const id = randomUUID();
  const variantQuestions = [{ text: question, language: intent.language, askedDate: now, modality }];
  db.prepare(`
    INSERT INTO question_cluster (
      id, canonical_question, variant_questions, repeat_count,
      languages_observed, crops_observed, regions_observed,
      first_asked, last_asked, answer_coverage, knowledge_gap_status
    ) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, 'Unanswered', 'Open Gap')
  `).run(
    id,
    intent.canonicalQuestion,
    JSON.stringify(variantQuestions),
    JSON.stringify([intent.language]),
    JSON.stringify(intent.crops),
    JSON.stringify(region ? [region] : []),
    now,
    now
  );
  if (key) {
    db.prepare(`INSERT OR REPLACE INTO cluster_key_index (key, cluster_id) VALUES (?, ?)`).run(key, id);
  }
  return id;
}

export function markClusterResolved(clusterId: string, advisoryRecordId: string) {
  db.prepare(`
    UPDATE question_cluster SET answer_coverage = 'Fully Answered', knowledge_gap_status = 'Resolved', resolved_by_record_id = ?
    WHERE id = ?
  `).run(advisoryRecordId, clusterId);
}

export function getCluster(id: string) {
  return db.prepare(`SELECT * FROM question_cluster WHERE id = ?`).get(id) as unknown as ClusterRow | undefined;
}
