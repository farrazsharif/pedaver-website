// The sufficiency gate — ASK_PQNK_RETRIEVAL_POLICY.md sec 4. Deliberately
// not a numeric confidence score: a small set of concrete, named
// conditions, each traceable to why a given question was answered or
// referred.
import type { NormalizedIntent, RetrievedSource } from "./ai/provider.js";
import type { RetrievalResult } from "./retrieval.js";

export type ReferralReason =
  | "No authoritative source"
  | "Sources materially conflict"
  | "Only tangential/partial match"
  | "Field condition requires physical inspection"
  | "Only Requires-Review content available"
  | "Could not distinguish between possible causes"
  // Set by routes/publicApi.ts, not by this gate: the gate said
  // sufficient, but the AI-composed draft failed the deterministic
  // grounding validator (ai/groundingValidator.ts) and too little
  // survived — degrades to Refer rather than showing a thinned answer
  // (ASK_PQNK_ARCHITECTURE.md sec 18.2 point 4, sec 18.3).
  | "Grounding validation could not support a full answer";

export interface SufficiencyResult {
  sufficient: boolean;
  reason?: ReferralReason;
  topSources: RetrievedSource[];
}

// Questions whose true answer depends on physically inspecting the field —
// Ask PQNK must name the diagnostic method, never guess a number
// (ASK_PQNK_RETRIEVAL_POLICY.md sec 6, the Safety Boundary).
const FIELD_CONDITION_PATTERNS = [
  /how deep.{0,20}hardpan/i,
  /hardpan.{0,20}how deep/i,
  /kitni gehri/i, // "how deep" (Roman Urdu)
];

export function evaluateSufficiency(
  question: string,
  intent: NormalizedIntent,
  result: RetrievalResult
): SufficiencyResult {
  if (FIELD_CONDITION_PATTERNS.some((p) => p.test(question))) {
    return { sufficient: false, reason: "Field condition requires physical inspection", topSources: [] };
  }

  if (!result.hasDirectTaxonomyMatch) {
    return { sufficient: false, reason: "No authoritative source", topSources: [] };
  }

  if (result.conflicting) {
    return { sufficient: false, reason: "Sources materially conflict", topSources: [] };
  }

  const eligible = result.candidates.filter(
    (c) => c.directTaxonomyMatch && c.authorityStatus === "Current / Approved PQNK Knowledge"
  );
  if (eligible.length === 0) {
    return { sufficient: false, reason: "Only Requires-Review content available", topSources: [] };
  }

  // Take the top-ranked cluster: the leader plus any other Tier 1/2
  // candidate that shares its top score band, capped at 4 citations so the
  // answer stays farmer-readable rather than dumping every match. 0.7 (not
  // 0.5) deliberately excludes papers that only share one incidental,
  // secondary fieldProblem tag with the leader rather than genuinely
  // matching the question — a known V1 limitation (overlap COUNT doesn't
  // capture how central a tag is to a given paper) that this threshold
  // reduces but doesn't fully solve; see the implementation report.
  const topScore = eligible[0].score;
  const topSources = eligible.filter((c) => c.score >= topScore * 0.7).slice(0, 4);

  return { sufficient: true, topSources };
}
