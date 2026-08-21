// Real LLM-backed implementation, behind the same AiProvider interface as
// the mock. NOT exercised in this local build — no API key was authorized
// and no paid provider is provisioned ("do not provision paid
// infrastructure without approval"). Included so the architecture's "must
// not depend on one AI vendor, keep provider calls behind an abstraction"
// requirement is demonstrably satisfied, and so switching to a real
// provider later is a one-line env var change (AI_PROVIDER=anthropic +
// ANTHROPIC_API_KEY), not a retrieval rewrite.
//
// Revision 1.4.1 contract (ASK_PQNK_ARCHITECTURE.md sec 9, sec 18):
// - normalizeIntent is NOT called for every question. intent.ts's
//   orchestrator calls it only when the deterministic term/pattern
//   recognizer is inconclusive on its own — this class has no say in
//   that decision and doesn't need to know it's conditional.
// - composeAnswer returns an unvalidated DRAFT of source-anchored claims,
//   never free prose. The deterministic groundingValidator (not this
//   class, not this model) decides what's actually grounded — this
//   provider's job is to propose a conservative, source-bound synthesis,
//   not to certify its own accuracy.
// - composeAnswer is English-only — no language parameter, no
//   instruction to translate.
import type { AiProvider, ComposedAnswerDraft, FarmerLanguage, NormalizedIntent, RetrievedSource } from "./provider.js";
import { REFERRAL_TEXT } from "./referralText.js";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = process.env.ASK_PQNK_ANTHROPIC_MODEL ?? "claude-sonnet-5";

export class AnthropicAiProvider implements AiProvider {
  readonly name = "anthropic";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async call(system: string, user: string): Promise<string> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });
    if (!res.ok) {
      throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
    }
    const data = (await res.json()) as { content: { type: string; text?: string }[] };
    return data.content.find((c) => c.type === "text")?.text ?? "";
  }

  async normalizeIntent(question: string): Promise<NormalizedIntent> {
    const system =
      "You extract structured PQNK taxonomy tags from a farmer's question, which may be in English, Urdu, Roman Urdu, or Punjabi. " +
      "Respond ONLY with strict JSON: {language, canonicalQuestion, crops, fieldProblems, scienceDomains, keywords}. " +
      "language is one of English/Urdu/Roman Urdu/Punjabi/Mixed — this is for understanding the question only, NOT an instruction " +
      "about what language to answer in. canonicalQuestion should be in English regardless of the input language. " +
      "Never invent taxonomy values not plausibly implied by the question.";
    const raw = await this.call(system, question);
    return JSON.parse(raw) as NormalizedIntent;
  }

  async composeAnswer(question: string, sources: RetrievedSource[]): Promise<ComposedAnswerDraft> {
    const system =
      "Answer the farmer's question in English, regardless of what language the question was asked in (the site's Translate " +
      "facility handles translation for the farmer; you must not attempt it). " +
      "You will be given a numbered list of retrieved PQNK sources. Produce 1-3 CLAIMS, each a short, CONSERVATIVE, closely-" +
      "bounded synthesis of exactly ONE numbered source — a tight paraphrase of what that specific source says, not an " +
      "inference, not a combination of implications across multiple sources, not elaboration beyond what that source's text " +
      "actually contains. Each claim must name the sourceIndex (0-based) of the ONE source it draws from. Also produce one " +
      "practicalAction claim, same rules, anchored to one source. Do not add any fact, number, or recommendation that is not " +
      "directly stated in the source you cite for it — a downstream check will verify this and drop anything it can't " +
      "confirm, so prefer a shorter, safer claim over a longer speculative one. Respond ONLY with strict JSON: " +
      '{"claims": [{"text": string, "sourceIndex": number}], "practicalAction": {"text": string, "sourceIndex": number}}';
    const user = `Question: ${question}\n\nSources (cite by index):\n${sources
      .map((s, i) => `[${i}] ${s.title} (${s.sourceType}): ${s.snippet}`)
      .join("\n")}`;
    const raw = await this.call(system, user);
    return JSON.parse(raw) as ComposedAnswerDraft;
  }

  // Static lookup, not a model call — see the file header and
  // referralText.ts.
  async composeReferralExplanation(language: FarmerLanguage): Promise<string> {
    return REFERRAL_TEXT[language] ?? REFERRAL_TEXT.English;
  }
}
