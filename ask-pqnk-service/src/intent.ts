// Deterministic intent recognition + the AI-conditional orchestrator —
// ASK_PQNK_ARCHITECTURE.md sec 9, Revision 1.4.1: the deterministic term/
// pattern vocabulary always runs first, at zero cost, against every
// question. The AI layer (whichever AiProvider is active) is invoked only
// when the deterministic pass is inconclusive — not run redundantly
// alongside it. This is the one place that decision is made; nothing
// downstream (retrieval, ranking, the sufficiency gate) knows or cares
// whether a given question's tags came from the deterministic recognizer
// alone or from the merged result.
import type { AiProvider, FarmerLanguage, NormalizedIntent } from "./ai/provider.js";
import { snapshot } from "./content.js";

const URDU_SCRIPT = /[؀-ۿ]/;

// A hand-authored bridge between real farmer phrasing (English / Roman Urdu
// / Urdu script / Punjabi) and the canonical taxonomy terms already live in
// taxonomy.json. Deliberately kept and expanded per the locked instruction
// to retain lightweight Urdu/Roman-Urdu agricultural-term recognition —
// this is rule-based matching, not a trained model, so it only ever
// generalizes as far as this list covers. A question this list can't
// resolve confidently is exactly the case the AI layer exists for
// (isDeterministicallyConfident, below); a question neither layer can
// resolve refers to Pedaver rather than guessing.
interface Trigger {
  patterns: RegExp[];
  fieldProblems?: string[];
  scienceDomains?: string[];
  crops?: string[];
  keywords?: string[];
}

const TRIGGERS: Trigger[] = [
  {
    patterns: [
      /water.{0,15}(not|isn't|isnt).{0,15}(going|soaking|infiltrat)/i,
      /soil.{0,10}(not|isn't).{0,10}absorb/i,
      /paani.{0,10}(zameen|mitti).{0,15}(nahi|nhi)/i,
      /پانی.{0,10}(زمین|مٹی)/,
    ],
    fieldProblems: ["Poor Water Infiltration", "Low Soil Water-Holding Capacity (Field Capacity)"],
    scienceDomains: ["Water", "Soil"],
    keywords: ["infiltration", "water absorption"],
  },
  {
    patterns: [
      /yellow.{0,20}(after|following).{0,10}rain/i,
      /rain.{0,20}yellow/i,
      /barish.{0,15}(baad|bad).{0,15}pe+li/i,
      /fasal.{0,10}pe+li/i,
      /بارش.{0,15}(بعد)/,
      /پیلی/,
    ],
    fieldProblems: ["Leaf Discoloration (Yellowing/Purpling)", "Waterlogging"],
    scienceDomains: ["Climate", "Water", "Plants"],
    keywords: ["yellowing", "leaf color", "after rain"],
  },
  {
    patterns: [/hardpan/i, /hard\s*pan/i, /sakht\s*tabaqa/i],
    fieldProblems: ["Hardpan", "Soil Compaction (General)"],
    scienceDomains: ["Soil"],
  },
  {
    patterns: [/waterlog/i, /flood.{0,10}field/i, /khet.{0,10}doob/i],
    fieldProblems: ["Waterlogging"],
    scienceDomains: ["Water", "Soil"],
  },
];

// Single-term Roman Urdu / Urdu-script vocabulary -> canonical taxonomy.
// This is the piece the locked instruction specifically calls out
// ("paani, gehun, makai, etc.") — a standalone word lookup, independent of
// the phrase-level TRIGGERS above, so a farmer naming a crop or concept in
// their own word for it is recognized even outside a matched sentence
// pattern. Not exhaustive; extending this list is the cheapest, lowest-risk
// way to widen deterministic recognition without adding AI cost.
interface TermEntry {
  words: string[]; // matched as whole words, case-insensitive, Roman Urdu and/or Urdu script
  crops?: string[];
  scienceDomains?: string[];
}

const TERM_VOCABULARY: TermEntry[] = [
  { words: ["paani", "پانی"], scienceDomains: ["Water"] },
  { words: ["zameen", "mitti", "زمین", "مٹی"], scienceDomains: ["Soil"] },
  { words: ["gehun", "gandum", "گندم"], crops: ["Wheat"] },
  { words: ["makai", "bhutta", "مکئی"], crops: ["Maize (Corn)"] },
  { words: ["chawal", "dhaan", "چاول", "دھان"], crops: ["Rice"] },
  { words: ["kapas", "rui", "کپاس", "روئی"], crops: ["Cotton"] },
  { words: ["ganna", "گنا"], crops: ["Sugarcane"] },
  { words: ["aloo", "آلو"], crops: ["Potato"] },
  { words: ["kaddu", "کدو"], crops: ["Squash"] },
  { words: ["tamatar", "ٹماٹر"], crops: ["Tomato"] },
  { words: ["pyaz", "پیاز"], crops: ["Onion"] },
  { words: ["lehsan", "لہسن"], crops: ["Garlic"] },
  { words: ["mirch", "مرچ"], crops: ["Chilli"] },
  { words: ["keera", "keeda", "sundhi", "کیڑا", "سنڈی"], scienceDomains: ["Crop Protection"] },
  { words: ["khaad", "کھاد"], scienceDomains: ["Nutrition"] },
  { words: ["barish", "بارش"], scienceDomains: ["Climate", "Water"] },
];

export function detectLanguage(question: string): FarmerLanguage {
  const hasUrdu = URDU_SCRIPT.test(question);
  const romanUrduMarkers = /\b(kyun|kyu|hai|ho gai|hogayi|nahi|nhi|kaise|kese|kya|mein|mai|zameen|paani|barish|fasal|peeli|acha|theek|gehun|makai|chawal|kapas)\b/i;
  const hasRomanUrdu = romanUrduMarkers.test(question);
  const hasLatin = /[A-Za-z]/.test(question);

  if (hasUrdu) return "Urdu";
  if (hasRomanUrdu && hasLatin) return "Roman Urdu";
  return "English";
}

function buildCanonicalQuestion(question: string, fieldProblems: string[], scienceDomains: string[]): string {
  if (fieldProblems.length === 0 && scienceDomains.length === 0) {
    return question;
  }
  return `${fieldProblems[0] ?? scienceDomains[0]}${fieldProblems.length || scienceDomains.length > 1 ? " — " + [...fieldProblems, ...scienceDomains].join(", ") : ""}`;
}

export interface DeterministicIntentResult {
  language: FarmerLanguage;
  canonicalQuestion: string;
  crops: string[];
  fieldProblems: string[];
  scienceDomains: string[];
  keywords: string[];
  // Named test, not a numeric score: a phrase-level TRIGGERS match is
  // strong signal on its own (multi-word, curated, low false-positive
  // rate); otherwise at least two independent tags are required so a
  // single loose word hit ("paani" alone) doesn't skip AI on a question
  // that's still genuinely ambiguous. Tunable — ASK_PQNK_ARCHITECTURE.md
  // sec 17.
  confident: boolean;
}

export function recognizeDeterministic(question: string): DeterministicIntentResult {
  const language = detectLanguage(question);
  const fieldProblems = new Set<string>();
  const scienceDomains = new Set<string>();
  const crops = new Set<string>();
  const keywords = new Set<string>();
  let triggerMatched = false;

  for (const trigger of TRIGGERS) {
    if (trigger.patterns.some((p) => p.test(question))) {
      triggerMatched = true;
      trigger.fieldProblems?.forEach((f) => fieldProblems.add(f));
      trigger.scienceDomains?.forEach((d) => scienceDomains.add(d));
      trigger.crops?.forEach((c) => crops.add(c));
      trigger.keywords?.forEach((k) => keywords.add(k));
    }
  }

  // Single-word Roman Urdu / Urdu vocabulary — matched independently of
  // sentence-level triggers, whole-word (so "aloo" doesn't match inside an
  // unrelated longer word).
  const lower = question.toLowerCase();
  for (const entry of TERM_VOCABULARY) {
    const hit = entry.words.some((w) => {
      if (URDU_SCRIPT.test(w)) return question.includes(w);
      return new RegExp(`\\b${w}\\b`, "i").test(lower);
    });
    if (hit) {
      entry.crops?.forEach((c) => crops.add(c));
      entry.scienceDomains?.forEach((d) => scienceDomains.add(d));
    }
  }

  // Fallback: direct substring match against known (English) canonical
  // crop names too, so an explicitly named crop is never missed even when
  // a farmer writes in English or a crop isn't yet in TERM_VOCABULARY.
  for (const crop of Object.keys(snapshot.taxonomy.crops)) {
    if (lower.includes(crop.toLowerCase())) crops.add(crop);
  }

  const tagCount = crops.size + fieldProblems.size + scienceDomains.size;
  const confident = triggerMatched || tagCount >= 2;

  const canonicalQuestion = buildCanonicalQuestion(question, [...fieldProblems], [...scienceDomains]);

  return {
    language,
    canonicalQuestion,
    crops: [...crops],
    fieldProblems: [...fieldProblems],
    scienceDomains: [...scienceDomains],
    keywords: [...keywords],
    confident,
  };
}

function toNormalizedIntent(det: DeterministicIntentResult, intentSource: NormalizedIntent["intentSource"]): NormalizedIntent {
  return {
    language: det.language,
    canonicalQuestion: det.canonicalQuestion,
    crops: det.crops,
    fieldProblems: det.fieldProblems,
    scienceDomains: det.scienceDomains,
    keywords: det.keywords,
    intentSource,
  };
}

// AI output is validated, not trusted (ASK_PQNK_ARCHITECTURE.md sec 9): any
// tag the AI layer extracts must be a real taxonomy value or it's
// discarded before it can reach retrieval. AI can under-tag; it cannot
// invent a tag that then affects ranking.
function validateTaxonomyTags(ai: NormalizedIntent): { crops: string[]; fieldProblems: string[]; scienceDomains: string[] } {
  const validCrops = new Set(Object.keys(snapshot.taxonomy.crops));
  const validFieldProblems = new Set(Object.keys(snapshot.taxonomy.fieldProblems));
  const validDomains = new Set(snapshot.taxonomy.scientificDomains);
  return {
    crops: ai.crops.filter((c) => validCrops.has(c)),
    fieldProblems: ai.fieldProblems.filter((f) => validFieldProblems.has(f)),
    scienceDomains: ai.scienceDomains.filter((d) => validDomains.has(d)),
  };
}

function mergeIntent(
  det: DeterministicIntentResult,
  validatedAiTags: { crops: string[]; fieldProblems: string[]; scienceDomains: string[] },
  aiKeywords: string[]
): NormalizedIntent {
  const crops = new Set([...det.crops, ...validatedAiTags.crops]);
  const fieldProblems = new Set([...det.fieldProblems, ...validatedAiTags.fieldProblems]);
  const scienceDomains = new Set([...det.scienceDomains, ...validatedAiTags.scienceDomains]);
  const keywords = new Set([...det.keywords, ...aiKeywords]);
  return {
    // Language stays the deterministic detector's result regardless of
    // what the AI layer reports — it's a fast, reliable, script/marker-
    // based check that doesn't benefit from a second opinion, and keeping
    // one authoritative source avoids the two ever disagreeing.
    language: det.language,
    canonicalQuestion: buildCanonicalQuestion(det.canonicalQuestion, [...fieldProblems], [...scienceDomains]),
    crops: [...crops],
    fieldProblems: [...fieldProblems],
    scienceDomains: [...scienceDomains],
    keywords: [...keywords],
    intentSource: "ai-assisted",
  };
}

// The orchestrator: always runs the deterministic pass; calls the AI layer
// only when that pass is inconclusive, per the confidence test above. This
// is the entire enforcement of "AI intent extraction is conditional, not
// mandatory" (ASK_PQNK_ARCHITECTURE.md sec 9, Revision 1.4.1) — callers
// (routes/publicApi.ts) never call aiProvider.normalizeIntent directly.
export async function normalizeIntentWithControl(question: string, aiProvider: AiProvider): Promise<NormalizedIntent> {
  const det = recognizeDeterministic(question);
  if (det.confident) {
    return toNormalizedIntent(det, "deterministic");
  }

  let aiResult: NormalizedIntent | null = null;
  try {
    aiResult = await aiProvider.normalizeIntent(question);
  } catch (err) {
    console.warn(`[intent] AI intent extraction failed, falling back to deterministic-only: ${(err as Error).message}`);
    aiResult = null;
  }

  if (!aiResult) {
    return toNormalizedIntent(det, "deterministic");
  }

  const validatedAiTags = validateTaxonomyTags(aiResult);
  return mergeIntent(det, validatedAiTags, aiResult.keywords ?? []);
}
