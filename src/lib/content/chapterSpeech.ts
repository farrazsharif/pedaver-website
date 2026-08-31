/**
 * Read Aloud (browser-native text-to-speech) — speech input builder and
 * pronunciation normalisation for published PQNK book chapters.
 *
 * PILOT SCOPE (2026-09-01): English only, three published chapters. No cloud
 * TTS, no generated audio, no voice selector, no word highlighting, no
 * cross-session persistence, no Urdu. See ReadAloud.tsx for the UI.
 *
 * Two guarantees this module exists to keep:
 *  1. Speech input is built from the STRUCTURED chapter data (ChapterBlock[]),
 *     never by scraping the rendered DOM.
 *  2. Pronunciation normalisation is SPEECH-ONLY. It is applied to the string
 *     handed to SpeechSynthesis and never touches anything the reader sees —
 *     the visible chapter text rendered by ChapterBody is completely untouched.
 */

import type { ChapterBlock } from "@/lib/content/books";

/* ------------------------------------------------------------------ *
 * 1. Speech segments — what gets read, and in what order
 * ------------------------------------------------------------------ */

export type SpeechSegmentKind =
  | "title"
  | "subtitle"
  | "quote"
  | "attribution"
  | "heading"
  | "paragraph"
  | "pull"
  | "qaHeading"
  | "qaQuestion"
  | "qaAnswer"
  | "closing";

export type SpeechSegment = {
  kind: SpeechSegmentKind;
  /** Raw visible text, verbatim from the structured data. Normalised only at speak time. */
  text: string;
};

/**
 * Turn a published chapter into the ordered list of things to read aloud.
 *
 * READ:   title, subtitle, opening quote, attribution, section headings,
 *         body paragraphs, pull paragraphs, Q&A (heading + every question
 *         and answer), closing heading.
 * SKIP:   PART/CHAPTER eyebrow and release metadata (never passed in here),
 *         image groups, infographic text, captions, the transition line that
 *         announces the next chapter, and every piece of site chrome.
 */
export function buildChapterSpeech(chapter: {
  title: string;
  subtitle?: string;
  body: ChapterBlock[];
}): SpeechSegment[] {
  const segments: SpeechSegment[] = [];

  segments.push({ kind: "title", text: chapter.title });
  if (chapter.subtitle) segments.push({ kind: "subtitle", text: chapter.subtitle });

  for (const block of chapter.body) {
    switch (block.type) {
      case "openingQuote":
        segments.push({ kind: "quote", text: block.text });
        break;
      case "attribution":
        segments.push({ kind: "attribution", text: block.text });
        break;
      case "heading":
        segments.push({ kind: "heading", text: block.text });
        break;
      case "paragraph":
        // Join the inline runs back into the exact visible sentence. Bold is a
        // visual-only distinction and carries no spoken meaning, so it is dropped.
        segments.push({ kind: "paragraph", text: block.runs.map((r) => r.text).join("") });
        break;
      case "pullParagraph":
        segments.push({ kind: "pull", text: block.text });
        break;
      case "qaPanel":
        segments.push({ kind: "qaHeading", text: block.heading });
        for (const item of block.items) {
          segments.push({ kind: "qaQuestion", text: item.q });
          segments.push({ kind: "qaAnswer", text: item.a });
        }
        break;
      case "closingHeading":
        segments.push({ kind: "closing", text: block.text });
        break;
      case "imageGroup":
      case "caption":
      case "transition":
        // Intentionally not read — see the file header.
        break;
    }
  }

  return segments.filter((s) => s.text != null && s.text.trim().length > 0);
}

/* ------------------------------------------------------------------ *
 * 2. Pronunciation normalisation (speech-only)
 * ------------------------------------------------------------------ */

export type SpeechNormalisation = {
  /** Human label for the report / tests. */
  label: string;
  find: RegExp;
  replace: string;
  note?: string;
};

/**
 * Applied in order. Order matters where one pattern is a prefix of another
 * (kg/acre before kg; 0.083% before the generic percent rule; "Rs. <n>"
 * before bare "Rs.").
 *
 * Deliberately NOT normalised — these already speak acceptably on the common
 * platform voices, and expanding them would be editorialising:
 *   - "maund" / "maunds"  -> said /mund/, correct. (Watch for engines that say
 *                            "mound"; flagged for review, not changed here.)
 *   - "hectare"           -> said /hektair/, correct.
 */
export const SPEECH_NORMALISATIONS: SpeechNormalisation[] = [
  { label: "kg/acre", find: /\bkg\s*\/\s*acre\b/g, replace: "kilograms per acre" },
  { label: "kg/ha", find: /\bkg\s*\/\s*ha\b/g, replace: "kilograms per hectare" },
  { label: "N2O / N₂O", find: /N(?:2|₂)O/g, replace: "nitrous oxide" },
  { label: "CO2 / CO₂", find: /CO(?:2|₂)/g, replace: "carbon dioxide" },
  {
    label: "0.083%",
    find: /\b0\.083\s*%/g,
    replace: "zero point zero eight three percent",
    note: "the chapter's core figure — pinned so no engine can mis-read the decimal",
  },
  { label: "Rs. <number>", find: /\bRs\.?\s*([\d,]+(?:\.\d+)?)/g, replace: "$1 rupees" },
  { label: "Rs. (bare)", find: /\bRs\.(?=\s|$)/g, replace: "rupees" },
  { label: "PKR", find: /\bPKR\b/g, replace: "Pakistani rupees", note: "not present in the 3 pilot chapters" },
  { label: "e.g.", find: /\be\.g\.\s*/g, replace: "for example, " },
  { label: "i.e.", find: /\bi\.e\.\s*/g, replace: "that is, " },
  { label: "PQNK", find: /\bPQNK\b/g, replace: "picnic", note: "spoken-only: read as the ordinary English word; visible spelling is unchanged" },
  { label: "ACI", find: /\bACI\b/g, replace: "A C I" },
  { label: "NPK", find: /\bNPK\b/g, replace: "N P K" },
  { label: "BT", find: /\bBT\b/g, replace: "B T", note: "Bacillus thuringiensis, spoken as letters" },
  { label: "SIPP", find: /\bSIPP\b/g, replace: "S I P P", note: "not present in the 3 pilot chapters" },
  { label: "VIPP", find: /\bVIPP\b/g, replace: "V I P P", note: "not present anywhere in current content" },
  { label: "kg", find: /\bkg\b/g, replace: "kilograms" },
  { label: "N% -> N percent", find: /(\d)\s*%/g, replace: "$1 percent" },
  { label: "em / en dash -> pause", find: /\s*[—–]\s*/g, replace: ", " },
];

/** Speech-only. Returns a string for SpeechSynthesis; never used for display. */
export function normalizeForSpeech(text: string): string {
  let out = text;
  for (const rule of SPEECH_NORMALISATIONS) out = out.replace(rule.find, rule.replace);
  return out.replace(/\s{2,}/g, " ").trim();
}

/* ------------------------------------------------------------------ *
 * 3. Sentence chunking (the Chrome long-utterance mitigation)
 * ------------------------------------------------------------------ */

// Sentinels (ASCII control chars, cannot occur in the prose) used to hide a
// "." from the sentence splitter, then swap it back afterwards.
const PROTECT_DECIMAL = String.fromCharCode(1);
const PROTECT_ABBR = String.fromCharCode(2);
// Titles / honorifics / short abbreviations that can appear mid-sentence.
// "Rs." and "e.g." / "i.e." are already gone by the time this runs (handled
// in normalizeForSpeech), so they are not repeated here.
const ABBREVIATIONS = /\b(Dr|Mr|Mrs|Ms|Prof|Sr|Jr|St|vs|No|Fig|Inc|Ltd|Co|approx|cf|al|Ch)\.(?=\s)/g;

/**
 * Split normalised text into short utterance chunks — one sentence each, and
 * long sentences further broken at semicolons / commas so no single
 * SpeechSynthesis utterance runs long enough to trip Chrome's ~15-second
 * cut-off. Lookbehind is avoided so the regex parses on older iOS Safari.
 */
export function splitSentences(input: string, maxChars = 240): string[] {
  const protectedText = input
    .replace(/(\d)\.(\d)/g, "$1" + PROTECT_DECIMAL + "$2")
    .replace(ABBREVIATIONS, "$1" + PROTECT_ABBR);

  const rough: string[] = [];
  const re = /[^.!?…]+[.!?…]+["'”’)\]]*\s*/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  while ((match = re.exec(protectedText)) !== null) {
    rough.push(match[0]);
    lastIndex = re.lastIndex;
  }
  if (lastIndex < protectedText.length) rough.push(protectedText.slice(lastIndex));

  const restore = (s: string) =>
    s.split(PROTECT_DECIMAL).join(".").split(PROTECT_ABBR).join(".").trim();

  const out: string[] = [];
  for (const raw of rough) {
    const sentence = restore(raw);
    if (!sentence) continue;
    if (sentence.length <= maxChars) {
      out.push(sentence);
      continue;
    }
    for (const clause of softChunk(sentence, maxChars)) {
      if (clause.trim()) out.push(clause.trim());
    }
  }
  return out;
}

/** Break an over-long sentence at semicolons, then commas, keeping each piece under `max`. */
function softChunk(sentence: string, max: number): string[] {
  const pieces: string[] = [];
  for (const part of sentence.split(/;\s+/)) {
    if (part.length <= max) {
      pieces.push(part);
      continue;
    }
    let buffer = "";
    for (const clause of part.split(/,\s+/)) {
      const candidate = buffer ? buffer + ", " + clause : clause;
      if (candidate.length > max && buffer) {
        pieces.push(buffer);
        buffer = clause;
      } else {
        buffer = candidate;
      }
    }
    if (buffer) pieces.push(buffer);
  }
  return pieces;
}

/* ------------------------------------------------------------------ *
 * 4. Convenience: segments -> flat utterance chunks
 * ------------------------------------------------------------------ */

export type SpeechChunk = {
  /** Text ready to hand to SpeechSynthesisUtterance (normalised + sentence-sized). */
  text: string;
  /** Index of the SpeechSegment this chunk came from, for progress display. */
  segmentIndex: number;
};

export function buildSpeechChunks(segments: SpeechSegment[]): SpeechChunk[] {
  const chunks: SpeechChunk[] = [];
  segments.forEach((segment, segmentIndex) => {
    const normalised = normalizeForSpeech(segment.text);
    for (const sentence of splitSentences(normalised)) {
      const text = sentence.trim();
      if (text) chunks.push({ text, segmentIndex });
    }
  });
  return chunks;
}
