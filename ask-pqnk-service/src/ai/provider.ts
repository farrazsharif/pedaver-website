// Provider-agnostic interface (Architecture 1.2 sec "AI provider
// abstraction"): the retrieval pipeline calls this interface only, never a
// specific vendor SDK directly, so swapping providers later never touches
// retrieval/ranking/sufficiency-gate code.
export type FarmerLanguage = "English" | "Urdu" | "Roman Urdu" | "Punjabi" | "Mixed";

export interface NormalizedIntent {
  language: FarmerLanguage;
  canonicalQuestion: string; // English reference phrasing, for cluster matching
  crops: string[];
  fieldProblems: string[];
  scienceDomains: string[];
  keywords: string[];
  // Which layer produced this result — set by intent.ts's orchestrator,
  // never by a provider directly. "deterministic": the term/pattern
  // recognizer resolved the question confidently and AI was never called.
  // "ai-assisted": the deterministic pass was inconclusive, so the AI
  // layer was invoked and its (taxonomy-validated) tags were merged in.
  // Optional only because call sites that don't go through the
  // orchestrator (rare — e.g. reconstructing intent from stored data)
  // won't have it. ASK_PQNK_ARCHITECTURE.md sec 9, Revision 1.4.1.
  intentSource?: "deterministic" | "ai-assisted";
}

export interface RetrievedSource {
  sourceType: "Science Page" | "Knowledge Paper" | "Farmer Advisory Record";
  reference: string; // path, slug, or advisory id
  title: string;
  snippet: string; // the text actually shown to the composer — never the full document
  authorityStatus: string;
  score: number;
}

// A single claim in a composed answer, anchored to the specific retrieved
// source it draws from — not free prose with citations appended after.
// This is the structural half of grounding enforcement
// (ASK_PQNK_ARCHITECTURE.md sec 18.2): a claim with no defensible source to
// point to has nowhere to attach in this schema. sourceIndex indexes into
// the same `sources` array passed to composeAnswer.
export interface ComposedClaim {
  text: string;
  sourceIndex: number;
}

// What a provider returns — NOT yet validated, NOT yet shown to a farmer.
// The deterministic grounding validator (ai/groundingValidator.ts) checks
// every claim's source-membership, authority, and conservative synthesis
// boundary before this becomes a ComposedAnswer. Lexical overlap is
// computed there too, but only as a secondary diagnostic — see
// ASK_PQNK_ARCHITECTURE.md sec 18.2, sec 18.5 for why overlap alone isn't
// the gate.
export interface ComposedAnswerDraft {
  claims: ComposedClaim[]; // becomes the "Why" section once validated
  practicalAction: ComposedClaim; // the "What to do" step, also source-anchored
}

// The final, validated shape shown to a farmer — built by
// groundingValidator.ts from whichever claims survive validation, never
// returned directly by a provider.
export interface ComposedAnswer {
  shortAnswer: string;
  answer: string;
  practicalAction: string;
}

export interface AiProvider {
  readonly name: string;
  // Intent extraction. NOT called for every question — intent.ts's
  // orchestrator calls this only when the deterministic term/pattern
  // recognizer doesn't already resolve the question confidently
  // (ASK_PQNK_ARCHITECTURE.md sec 9, Revision 1.4.1). When it is called,
  // its output is validated against the real taxonomy before use, never
  // trusted outright.
  normalizeIntent(question: string): Promise<NormalizedIntent>;
  // Composition is English-only for V1 (locked simplification — see
  // ASK_PQNK_ARCHITECTURE.md sec 8). No language parameter: the answer is
  // always composed in English regardless of the question's language, so
  // there is nothing here for a provider to branch on. Returns a DRAFT —
  // the provider proposes claims anchored to sources; it does not decide
  // whether they're grounded (ASK_PQNK_ARCHITECTURE.md sec 18.1: AI is
  // prohibited from being the final word on its own grounding). Called
  // only when the deterministic sufficiency gate has already said this
  // question can be answered.
  composeAnswer(question: string, sources: RetrievedSource[]): Promise<ComposedAnswerDraft>;
  // The one exception: a fixed, pre-written referral message picked from a
  // static per-language table, not synthesized — see referralText.ts for
  // why this doesn't count as "answer generation."
  composeReferralExplanation(language: FarmerLanguage): Promise<string>;
}
