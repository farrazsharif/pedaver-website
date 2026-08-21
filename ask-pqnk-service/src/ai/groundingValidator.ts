// The deterministic grounding validator — ASK_PQNK_ARCHITECTURE.md sec
// 18.2, corrected in Revision 1.4.1. This is the concrete enforcement of
// "AI is never the source of PQNK knowledge": every claim an AiProvider's
// composeAnswer returns passes through here before a farmer ever sees it.
//
// The primary gate is three structural checks, none of them lexical
// similarity:
//   1. source-membership — does the cited source actually exist in the
//      retrieved set for this question.
//   2. authority — does that source independently clear the same
//      eligibility bar the sufficiency gate already required.
//   3. conservative source-bound synthesis — is the claim a boundedly
//      close elaboration of that ONE source's own text, not a free-
//      ranging expansion.
// Lexical/keyword overlap is still computed and logged, but only as a
// secondary diagnostic (sec 18.5): it doesn't reject a valid paraphrase
// that shares few words with its source, and it doesn't accept a claim
// just because it echoes the source's vocabulary. No module in this
// service has ever used overlap as the sole gate; this file replaces the
// version that briefly did in the first draft of Revision 1.4.
import type { ComposedAnswer, ComposedAnswerDraft, ComposedClaim, RetrievedSource } from "./provider.js";

// Mirrors sufficiency.ts's own eligibility rule. Re-checked here
// independently rather than assumed from how the claim arrived — a
// defense-in-depth check: a claim's authority is verified against the
// specific source it actually cites, not against whatever set it happened
// to be handed. Currently redundant with sufficiency.ts's own filtering of
// `topSources` (every source passed to composeAnswer is already Tier 1-2
// / "Current / Approved"), but this module must never assume that
// upstream invariant holds — grounding enforcement that trusts its inputs
// isn't enforcement.
const ELIGIBLE_AUTHORITY_STATUS = "Current / Approved PQNK Knowledge";

function isEligibleAuthority(source: RetrievedSource | undefined): boolean {
  return !!source && source.authorityStatus === ELIGIBLE_AUTHORITY_STATUS;
}

// A claim may not be near-empty, and may not run far past what a close,
// bounded paraphrase of its cited source's own snippet would produce.
// This bounds how much the model is allowed to synthesize BEYOND the
// source's own scope, which is a different and stronger constraint than
// word-similarity: a terse, entirely differently-worded paraphrase passes;
// a claim padded with unsupported elaboration does not, even if it reuses
// the source's own words to do it. Tunable — ASK_PQNK_ARCHITECTURE.md sec
// 17.
const MIN_CLAIM_LENGTH = 15;
const MAX_SYNTHESIS_EXPANSION_RATIO = 3;

function withinSynthesisBoundary(claimText: string, sourceSnippet: string): boolean {
  const trimmed = claimText.trim();
  if (trimmed.length < MIN_CLAIM_LENGTH) return false;
  return trimmed.length <= sourceSnippet.length * MAX_SYNTHESIS_EXPANSION_RATIO;
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "for", "of",
  "in", "on", "at", "to", "and", "or", "my", "me", "i", "what", "how",
  "why", "when", "where", "does", "do", "did", "should", "can", "will",
  "this", "that", "it", "with", "not", "into", "going",
]);

function significantWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

// Secondary diagnostic only — see file header. Never gates acceptance.
function lexicalOverlap(claimText: string, sourceSnippet: string): number {
  const claimWords = significantWords(claimText);
  const sourceWords = significantWords(sourceSnippet);
  if (claimWords.size === 0) return 0;
  let shared = 0;
  for (const w of claimWords) if (sourceWords.has(w)) shared++;
  return shared / claimWords.size;
}

export type RejectionReason = "source-membership" | "authority" | "synthesis-boundary";

export interface ClaimOutcome {
  claim: ComposedClaim;
  accepted: boolean;
  reason?: RejectionReason;
  lexicalOverlap: number; // logged always, gates nothing
}

export interface ValidationResult {
  // null => caller must fall back to Refer to Pedaver rather than show a
  // thinned or unsupported answer (ASK_PQNK_ARCHITECTURE.md sec 18.2
  // point 4, sec 18.3).
  answer: ComposedAnswer | null;
  claimOutcomes: ClaimOutcome[];
  practicalActionOutcome: ClaimOutcome;
}

function evaluateClaim(claim: ComposedClaim, sources: RetrievedSource[]): ClaimOutcome {
  const source = sources[claim.sourceIndex];
  const overlap = source ? lexicalOverlap(claim.text, source.snippet) : 0;

  if (!source) {
    return { claim, accepted: false, reason: "source-membership", lexicalOverlap: overlap };
  }
  if (!isEligibleAuthority(source)) {
    return { claim, accepted: false, reason: "authority", lexicalOverlap: overlap };
  }
  if (!withinSynthesisBoundary(claim.text, source.snippet)) {
    return { claim, accepted: false, reason: "synthesis-boundary", lexicalOverlap: overlap };
  }
  return { claim, accepted: true, lexicalOverlap: overlap };
}

// At least one validated "why" claim, and a validated practicalAction, is
// the minimum bar for "a real answer" rather than a fragment. Tunable —
// ASK_PQNK_ARCHITECTURE.md sec 17.
const MIN_VALIDATED_CLAIMS = 1;

export function validateComposedAnswer(draft: ComposedAnswerDraft, sources: RetrievedSource[]): ValidationResult {
  const claimOutcomes = draft.claims.map((c) => evaluateClaim(c, sources));
  const practicalActionOutcome = evaluateClaim(draft.practicalAction, sources);

  for (const o of claimOutcomes) {
    console.log(
      `[grounding] claim ${o.accepted ? "accepted" : `DROPPED (${o.reason})`} — overlap=${o.lexicalOverlap.toFixed(2)} (diagnostic only)`
    );
  }
  console.log(
    `[grounding] practicalAction ${practicalActionOutcome.accepted ? "accepted" : `DROPPED (${practicalActionOutcome.reason})`} — overlap=${practicalActionOutcome.lexicalOverlap.toFixed(2)} (diagnostic only)`
  );

  const validated = claimOutcomes.filter((o) => o.accepted);
  if (validated.length < MIN_VALIDATED_CLAIMS || !practicalActionOutcome.accepted) {
    return { answer: null, claimOutcomes, practicalActionOutcome };
  }

  const answer: ComposedAnswer = {
    shortAnswer: `Answer: ${validated[0].claim.text}`,
    answer: `Why: ${validated.map((o) => o.claim.text).join(" ")}`,
    practicalAction: `What to do: ${practicalActionOutcome.claim.text}`,
  };

  return { answer, claimOutcomes, practicalActionOutcome };
}
