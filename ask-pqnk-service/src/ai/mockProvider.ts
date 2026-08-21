// Deterministic, credential-free implementation of AiProvider — the
// exercised local stand-in for a real AI call (no paid provider is
// provisioned in this build; see ai/index.ts). Two things changed in
// Revision 1.4.1's implementation:
//
// 1. The deterministic term/pattern recognizer that used to live here has
//    moved to intent.ts, because it now needs to run for EVERY question,
//    regardless of which AiProvider is active, before the orchestrator
//    decides whether to call this class's normalizeIntent at all
//    (ASK_PQNK_ARCHITECTURE.md sec 9). What remains here is this
//    provider's stand-in for the AI layer itself: broader, alias-based
//    taxonomy matching that the tight deterministic vocabulary doesn't
//    attempt — a reasonable, honestly-labeled approximation of "what an
//    LLM would likely catch that a short curated list wouldn't," kept
//    fully deterministic so it's testable offline.
// 2. composeAnswer returns a structured, per-claim DRAFT (ComposedAnswerDraft)
//    instead of free prose — each claim anchored to a specific source index
//    — which the deterministic groundingValidator then checks before
//    anything reaches a farmer (ASK_PQNK_ARCHITECTURE.md sec 18.2). This
//    provider builds claims directly from source snippets, which trivially
//    satisfies grounding by construction; groundingValidator.ts is exercised
//    for real via its own unit tests (scripts/acceptance-check.ts), not by
//    trying to make the mock provider misbehave.
import type { AiProvider, ComposedAnswerDraft, ComposedClaim, FarmerLanguage, NormalizedIntent, RetrievedSource } from "./provider.js";
import { snapshot } from "../content.js";
import { REFERRAL_TEXT } from "./referralText.js";
import { detectLanguage } from "../intent.js";

export class MockAiProvider implements AiProvider {
  readonly name = "mock-rule-based";

  // Call counters, for acceptance testing the conditional-AI-call wiring
  // (ASK_PQNK_ARCHITECTURE.md sec 9, sec 18.1) — proving intent.ts skips
  // this method when the deterministic pass is confident, and proving
  // composeAnswer is never called for an insufficient question.
  callCounts = { normalizeIntent: 0, composeAnswer: 0 };

  // Stands in for a real AI call. Only invoked (by intent.ts's
  // orchestrator) when the deterministic recognizer couldn't confidently
  // resolve the question. Deliberately broader than the deterministic
  // layer: matches against every alias in the taxonomy, not just the
  // curated TRIGGERS/TERM_VOCABULARY list, which is the honest shape of
  // what a real model call would plausibly add.
  async normalizeIntent(question: string): Promise<NormalizedIntent> {
    this.callCounts.normalizeIntent++;
    const language = detectLanguage(question);
    const lower = question.toLowerCase();
    const crops = new Set<string>();
    const fieldProblems = new Set<string>();
    const scienceDomains = new Set<string>();

    for (const [canonical, aliases] of Object.entries(snapshot.taxonomy.crops)) {
      if ([canonical, ...aliases].some((a) => a.length > 2 && lower.includes(a.toLowerCase()))) {
        crops.add(canonical);
      }
    }
    for (const [canonical, aliases] of Object.entries(snapshot.taxonomy.fieldProblems)) {
      if ([canonical, ...aliases].some((a) => a.length > 3 && lower.includes(a.toLowerCase()))) {
        fieldProblems.add(canonical);
      }
    }
    for (const domain of snapshot.taxonomy.scientificDomains) {
      if (lower.includes(domain.toLowerCase())) scienceDomains.add(domain);
    }

    return {
      language,
      canonicalQuestion: question,
      crops: [...crops],
      fieldProblems: [...fieldProblems],
      scienceDomains: [...scienceDomains],
      keywords: [],
    };
  }

  // Returns an UNVALIDATED draft — grounding is enforced downstream by
  // ai/groundingValidator.ts, never assumed here (ASK_PQNK_ARCHITECTURE.md
  // sec 18.1: composition is prohibited from being the final word on its
  // own grounding). Each claim is anchored to exactly one retrieved
  // source's own snippet — a conservative, source-bound construction by
  // design, not a free-form summary across all sources at once.
  async composeAnswer(question: string, sources: RetrievedSource[]): Promise<ComposedAnswerDraft> {
    this.callCounts.composeAnswer++;
    const claims: ComposedClaim[] = sources.slice(0, 3).map((s, i) => ({ text: s.snippet, sourceIndex: i }));
    // Kept short and generic on purpose: this text is itself subject to
    // the synthesis-boundary check against sources[0]'s snippet (a claim
    // is a claim, including the practicalAction one — no special
    // exemption), and a title/sourceType-length string has no principled
    // relationship to snippet length. The specific source is still named
    // to the farmer via the citations list rendered alongside the answer
    // (routes/publicApi.ts), not by embedding it in AI-controlled text.
    const practicalAction: ComposedClaim = {
      text: "Follow the guidance in the cited source above.",
      sourceIndex: 0,
    };
    return { claims, practicalAction };
  }

  // The one output that still varies by language — a fixed, pre-written
  // string picked from a static table, not synthesized. Kept because it's
  // effectively free (a lookup, not a model call) and genuinely helps a
  // farmer understand what's happening in their own language, which is a
  // different thing from generating the authoritative answer itself.
  async composeReferralExplanation(language: FarmerLanguage): Promise<string> {
    return REFERRAL_TEXT[language] ?? REFERRAL_TEXT.English;
  }
}
