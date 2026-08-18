import synonymsData from "./synonyms.json";
import type { Paper } from "@/lib/content/papers";
import type { PaperMetadata } from "./taxonomy";

/**
 * PQNK Knowledge Library search — deterministic client-side scoring over the
 * approved Taxonomy 1.1 discovery fields. Not an LLM/embedding search; a
 * transparent keyword + synonym match. V1.1 relevance refinement: matches are
 * now field-tiered (a questionsAnswered paraphrase or a canonical fieldProblem
 * hit outranks a generic shared word) and paraphrases can activate a canonical
 * concept even without an exact-phrase hit, via token-overlap against every
 * indexed synonym/farmer-language phrase — see `activatedConcepts()`.
 */

interface SynonymEntry {
  canonicalTerm: string;
  dimension?: string;
  terms: string[];
}

const vocabularySynonyms: SynonymEntry[] = synonymsData.vocabularySynonyms;
const coreTerminology: SynonymEntry[] = synonymsData.coreTerminology;
const exampleMappings: SynonymEntry[] = synonymsData.exampleMappings;
const farmerLanguagePairs: { scientificTerm: string; farmerTerms: string[] }[] = synonymsData.farmerLanguagePairs;

// ---------------------------------------------------------------------------
// Tokenization uses two different stopword lists, deliberately.
//
// PROSE_STOPWORDS is wide — it strips generic connective words ("going",
// "into", "gets", "very"...) from free-running paper text (title, summary,
// keyword lists), because those words appear incidentally in nearly every
// paper's prose and contributed real match weight there in V1.0, which is
// the direct cause of over-broad matches like "water is not going into my
// soil" (119 results).
//
// QUERY_STOPWORDS is deliberately lighter and keeps direction/negation/
// temporal words ("not", "going", "into", "down", "up", "after"...) — these
// are exactly the signal that distinguishes one farmer phrase from another
// ("water going down" vs "water NOT going down" are opposite meanings). It's
// used for the query itself, for the curated concept/synonym phrases being
// indexed, and for a paper's own questionsAnswered — all short, deliberately
// authored phrases (not incidental prose) where that signal matters.
// ---------------------------------------------------------------------------
const PROSE_STOPWORDS = new Set([
  "the", "a", "an", "of", "for", "and", "or", "to", "in", "on", "with", "is", "are", "do", "does",
  "my", "how", "why", "what", "when", "should", "can", "i", "it", "this", "that", "will", "was",
  "were", "be", "been", "at", "by", "from", "as", "not", "no", "yes",
  "going", "into", "get", "gets", "getting", "got", "very", "too", "much", "many", "more", "most",
  "some", "any", "all", "than", "then", "so", "just", "still", "keep", "keeps", "keeping", "also",
  "there", "here", "up", "down", "out", "over", "under", "after", "before", "during", "about",
  "them", "they", "their", "our", "your", "me", "us", "one", "have", "has", "had", "if", "but",
]);

const QUERY_STOPWORDS = new Set([
  "the", "a", "an", "of", "for", "and", "or", "to", "in", "on", "with", "is", "are", "do", "does",
  "my", "how", "why", "what", "when", "should", "can", "i", "it", "this", "that", "will", "was",
  "were", "be", "been", "at", "by", "from", "as", "no", "yes",
  "get", "gets", "getting", "got", "very", "too", "much", "many", "more", "most",
  "some", "any", "all", "than", "then", "so", "just", "still", "keep", "keeps", "keeping", "also",
  "there", "here",
  "them", "they", "their", "our", "your", "me", "us", "one", "have", "has", "had", "if", "but",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9°]+/i).filter((w) => w.length > 2 && !PROSE_STOPWORDS.has(w));
}

function tokenizeQuery(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9°]+/i).filter((w) => w.length > 2 && !QUERY_STOPWORDS.has(w));
}

/**
 * Direction/negation/temporal words kept as real query tokens (see
 * QUERY_STOPWORDS above) are exempted from fuzzy prefix-matching in
 * tokensEqual — their short length makes them prone to coincidental prefix
 * collisions with unrelated longer words ("into" is a literal prefix of
 * "intolerance"; "not" of "notice"; "over" of "overwhelm"), which would
 * silently fabricate a semantic match that isn't there. They still count as
 * hits on an exact match, just never via the fuzzy heuristic.
 */
const EXACT_ONLY_TOKENS = new Set([
  "not", "going", "into", "down", "up", "out", "over", "under", "after", "before", "during", "about",
]);

/**
 * Light fuzzy equality between two tokens: exact match, or one is a prefix of
 * the other at length >=4 (catches plurals and common suffixes — "weed" /
 * "weeds", "insect" / "insects", "yellow" / "yellowing", "break" /
 * "breaking" — without a real stemmer or external dependency).
 */
function tokensEqual(a: string, b: string): boolean {
  if (a === b) return true;
  if (EXACT_ONLY_TOKENS.has(a) || EXACT_ONLY_TOKENS.has(b)) return false;
  if (a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a))) return true;
  return false;
}

/**
 * A small, hand-curated bridge from common natural-language words to the
 * vocabulary PQNK content actually uses, for the handful of cases token
 * fuzzy-matching alone can't reach (e.g. "hot" vs "heat"/"temperature"). This
 * is a search-layer convenience only — it does not touch the taxonomy or any
 * canonical term, and every entry here was found empirically against the
 * benchmark queries in this audit, not guessed speculatively.
 */
const WORD_EQUIVALENTS: Record<string, string[]> = {
  hot: ["heat", "temperature"],
  heat: ["hot", "temperature"],
  cold: ["frost", "chill"],
  wet: ["waterlog", "moist", "flood"],
  dry: ["drought", "arid"],
  bugs: ["insect", "pest"],
  bug: ["insect", "pest"],
  breaking: ["breakage", "broken", "shatter"],
  broken: ["breakage", "breaking"],
  deep: ["depth"],
  shading: ["shade"],
  shade: ["shading"],
};

function expandToken(token: string): string[] {
  return [token, ...(WORD_EQUIVALENTS[token] || [])];
}

/** Does `token` (with its word-equivalents) fuzzy-match anything in `pool`? */
function tokenHitsPool(token: string, pool: string[]): boolean {
  const candidates = expandToken(token);
  return pool.some((p) => candidates.some((c) => tokensEqual(c, p)));
}

// ---------------------------------------------------------------------------
// Exact-phrase synonym index (kept from V1.0, used for single/short queries
// like "hardpan", "corn", "gehun" where an exact canonical/synonym lookup is
// both correct and cheap).
// ---------------------------------------------------------------------------
const SYNONYM_INDEX = new Map<string, Set<string>>();

function addSynonym(term: string, canonical: string) {
  const key = term.trim().toLowerCase();
  if (!key) return;
  if (!SYNONYM_INDEX.has(key)) SYNONYM_INDEX.set(key, new Set());
  SYNONYM_INDEX.get(key)!.add(canonical.toLowerCase());
}

for (const entry of [...vocabularySynonyms, ...exampleMappings]) {
  for (const t of entry.terms) addSynonym(t, entry.canonicalTerm);
}
for (const entry of coreTerminology) {
  for (const t of entry.terms) addSynonym(t, entry.canonicalTerm);
}
for (const pair of farmerLanguagePairs) {
  for (const ft of pair.farmerTerms) {
    if (ft.split(/\s+/).length <= 6) addSynonym(ft, pair.scientificTerm);
  }
}

export function expandQuery(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const expansions = new Set<string>([q]);
  if (SYNONYM_INDEX.has(q)) {
    for (const c of SYNONYM_INDEX.get(q)!) expansions.add(c);
  }
  return Array.from(expansions);
}

// ---------------------------------------------------------------------------
// NEW in V1.1: concept-phrase index for paraphrase activation. Every
// synonym/farmer-language phrase across the whole taxonomy is tokenized once
// at module load. At query time, a phrase "activates" its canonical term when
// enough of the phrase's own meaningful words are present in the query —
// this is what lets "water is not going into my soil" reach "Poor Water
// Infiltration" via its farmer phrase "water not going down", without the
// query needing to match that phrase verbatim.
// ---------------------------------------------------------------------------
interface ConceptPhrase {
  canonicalTerm: string;
  tokens: string[];
}

const CONCEPT_PHRASES: ConceptPhrase[] = [];

function indexConceptPhrase(phrase: string, canonicalTerm: string) {
  const tokens = tokenizeQuery(phrase);
  // Single-word phrases are already covered by the exact SYNONYM_INDEX lookup
  // and by direct field word-matching — indexing them here would let one
  // common word "activate" a whole concept, reintroducing the over-broad-
  // match problem this pass exists to fix.
  if (tokens.length < 2) return;
  CONCEPT_PHRASES.push({ canonicalTerm: canonicalTerm.toLowerCase(), tokens });
}

for (const entry of [...vocabularySynonyms, ...exampleMappings]) {
  for (const t of entry.terms) indexConceptPhrase(t, entry.canonicalTerm);
  indexConceptPhrase(entry.canonicalTerm, entry.canonicalTerm); // the canonical name's own words count too
}
for (const pair of farmerLanguagePairs) {
  for (const ft of pair.farmerTerms) indexConceptPhrase(ft, pair.scientificTerm);
}

export interface ConceptActivation {
  term: string; // canonical term, lowercase
  closeness: number; // 0..1ish — how tightly this concept matches the query
}

/**
 * Which canonical concepts does this query activate, ranked by closeness —
 * the tightest, most specific match first. A single query can activate
 * several related concepts at once (e.g. "water is not going into my soil"
 * activates Poor Water Infiltration, Hardpan, and Waterlogging together);
 * the caller uses the top-ranked one as the query's Primary Intent and the
 * rest as Related Concepts (see searchPapers).
 *
 * closeness = coverage of the matched phrase's own words (a tight, nearly-
 * complete match) × coverage of the query's own words (how much of the
 * query this phrase actually explains). The second factor is what makes a
 * longer, more specific phrase outrank a short generic one: a short phrase
 * can only ever explain a small share of a longer query, capping its score,
 * while a longer phrase that explains most of the query scores higher even
 * if a couple of its own words go unmatched. Same symmetric-coverage shape
 * already used for questionsAnswered matching in questionMatchStrength.
 */
function activatedConcepts(queryTokens: string[]): ConceptActivation[] {
  const bestByTerm = new Map<string, number>();
  for (const phrase of CONCEPT_PHRASES) {
    let overlap = 0;
    for (const t of phrase.tokens) if (queryTokens.some((q) => tokensEqual(q, t))) overlap++;
    const coveragePhrase = overlap / phrase.tokens.length;
    // Require both a minimum absolute overlap (>=2 real shared words) and a
    // majority of the phrase's own words present, so a two-word phrase can't
    // fire off a single incidental shared word.
    if (overlap >= 2 && coveragePhrase >= 0.6) {
      const coverageQuery = overlap / Math.max(queryTokens.length, 1);
      const closeness = coveragePhrase * coverageQuery;
      const prev = bestByTerm.get(phrase.canonicalTerm) ?? 0;
      if (closeness > prev) bestByTerm.set(phrase.canonicalTerm, closeness);
    }
  }
  return Array.from(bestByTerm, ([term, closeness]) => ({ term, closeness }))
    .sort((a, b) => b.closeness - a.closeness);
}

// ---------------------------------------------------------------------------
// Per-paper field tokenization, memoized — 186 papers is small, but caching
// keeps repeated keystrokes/searches cheap on mobile.
// ---------------------------------------------------------------------------
const fieldTokenCache = new Map<string, string[]>();
const meaningfulTokenCache = new Map<string, string[]>();

function tokensFor(text: string): string[] {
  let t = fieldTokenCache.get(text);
  if (!t) {
    t = tokenize(text);
    fieldTokenCache.set(text, t);
  }
  return t;
}

/** Like tokensFor, but keeps direction/negation words — for questionsAnswered. */
function meaningfulTokensFor(text: string): string[] {
  let t = meaningfulTokenCache.get(text);
  if (!t) {
    t = tokenizeQuery(text);
    meaningfulTokenCache.set(text, t);
  }
  return t;
}

/** Weighted overlap: `weight` points per distinct query token that fuzzy-matches anywhere in `text`. */
function weightedOverlap(queryTokens: string[], text: string, weight: number): number {
  if (!text) return 0;
  const textTokens = tokensFor(text);
  if (textTokens.length === 0) return 0;
  let score = 0;
  for (const qt of queryTokens) {
    if (tokenHitsPool(qt, textTokens)) score += weight;
  }
  return score;
}

/**
 * How well does `question` (one of a paper's own questionsAnswered entries)
 * paraphrase the query? Symmetric coverage: most of the question's words
 * must be present in the query, AND a meaningful share of the query must be
 * accounted for by the question — this is what makes it a paraphrase match
 * rather than a partial one.
 */
function questionMatchStrength(queryTokens: string[], question: string): number {
  const qTokens = meaningfulTokensFor(question);
  if (qTokens.length < 2) return 0;
  let overlap = 0;
  for (const t of qTokens) if (queryTokens.some((q) => tokensEqual(q, t))) overlap++;
  const coverageOfQuestion = overlap / qTokens.length;
  const coverageOfQuery = overlap / Math.max(queryTokens.length, 1);
  if (overlap >= 2 && coverageOfQuestion >= 0.5 && coverageOfQuery >= 0.4) {
    return coverageOfQuestion * coverageOfQuery;
  }
  return 0;
}

export interface SearchResult {
  paper: Paper;
  score: number;
  matchedOn: string[];
}

// ---------------------------------------------------------------------------
// Relevance tiers (highest to lowest weight per hit), matching the priority
// hierarchy: an answer-like match must outrank a generic shared word.
// ---------------------------------------------------------------------------
const W_QUESTION = 140; // exact/near-exact questionsAnswered paraphrase
const W_CONCEPT_PROBLEM = 90; // activated concept present in the paper's own canonical fieldProblems
const W_CONCEPT_OTHER = 55; // activated concept present in crops/fieldPractices/machineryTools
const W_EXACT_PROBLEM = 90; // exact/short-query synonym hit landing on a canonical fieldProblem
const W_EXACT_CROP = 70;
const W_EXACT_OTHER = 55;
const W_TITLE = 14;
const W_SUBJECT = 10;
const W_FIELDPROBLEM_TEXT = 8;
const W_CROP_TEXT = 8;
const W_PRACTICE_TEXT = 6;
const W_MACHINERY_TEXT = 6;
const W_KEYWORD_TEXT = 4;
const W_SCIENCE_TEXT = 3;
const W_SUMMARY_TEXT = 2;
const W_PROBLEM_FAMILY_TEXT = 2;
const W_STAGE_TEXT = 1;
// Ceilings on the summed Tier 4 / Tier 5 contribution per paper (see below) —
// each well under a single Tier 2/2b hit (55+), so accumulated breadth across
// many low-value fields can never outrank genuine concept/question signal.
const MAX_TIER4 = 30;
const MAX_TIER5 = 15;
// A paper tagged with the query's single closest-matching concept (Primary
// Intent) should rank clearly above one that only matches a weaker,
// merely-related concept — e.g. for "water is not going into my soil",
// Poor Water Infiltration (primary) should outrank Aquifer Recharge, which
// only shares surface vocabulary. Related concepts still count (they're
// useful secondary signal — Hardpan/Compaction papers should still surface)
// but at a fraction of full weight, so no number of them collectively
// outweighs a genuine Primary Intent match.
const RELATED_CONCEPT_MULTIPLIER = 0.45;

export function searchPapers(
  papers: Paper[],
  getMeta: (slug: string) => PaperMetadata | undefined,
  query: string
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const queryTokens = tokenizeQuery(q);
  if (queryTokens.length === 0) return [];

  const concepts = activatedConcepts(queryTokens);
  const exactExpansions = expandQuery(q);

  // Primary Intent: the concept(s) at (or within a small margin of) the top
  // closeness score. A tie is common and meaningful, not noise — the
  // taxonomy sometimes maps the same farmer phrase to two closely related
  // canonical terms (e.g. "water not going down" -> both Hardpan and Poor
  // Water Infiltration), and both deserve full-strength credit rather than
  // an arbitrary single winner. Everything else is a Related concept.
  const PRIMARY_TIE_MARGIN = 0.02;
  const topCloseness = concepts.length > 0 ? concepts[0].closeness : 0;
  const primaryTerms = new Set(
    concepts.filter((c) => c.closeness >= topCloseness - PRIMARY_TIE_MARGIN).map((c) => c.term)
  );

  const raw: SearchResult[] = [];

  for (const paper of papers) {
    const meta = getMeta(paper.slug);
    if (!meta) continue;

    let score = 0;
    const matchedOn = new Set<string>();
    let distinctTokensMatched = 0;
    // Set explicitly at each Tier 1/2/2b hit below — a real answer-like or
    // canonical-concept match, as opposed to incidental word overlap in a
    // low-value field. Reconstructing this from `matchedOn` after the fact
    // doesn't work: multiple tiers add the same label (e.g. "crop"), so a
    // weak Tier 4 text-overlap hit would be indistinguishable from a real
    // Tier 2b exact/synonym hit once merged into one set.
    let strongSignal = false;
    for (const qt of queryTokens) {
      const hit =
        tokenHitsPool(qt, tokensFor(paper.title)) ||
        tokenHitsPool(qt, tokensFor(meta.primarySubject)) ||
        tokenHitsPool(qt, tokensFor(meta.crops.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.fieldProblems.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.fieldPractices.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.machineryTools.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.keywords.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.scientificDomains.join(" "))) ||
        tokenHitsPool(qt, tokensFor(meta.questionsAnswered.join(" "))) ||
        tokenHitsPool(qt, tokensFor(paper.summary));
      if (hit) distinctTokensMatched++;
    }

    // Tier 1 — questionsAnswered paraphrase
    let bestQuestion = 0;
    for (const question of meta.questionsAnswered) {
      const s = questionMatchStrength(queryTokens, question);
      if (s > bestQuestion) bestQuestion = s;
    }
    if (bestQuestion > 0) {
      score += W_QUESTION * bestQuestion;
      matchedOn.add("a question this paper answers");
      strongSignal = true;
    }

    // Tier 2 — activated concepts landing on this paper's own canonical tags.
    // A single query can activate several related concepts at once (e.g.
    // "water is not going into my soil" activates Poor Water Infiltration,
    // Hardpan, and Waterlogging together). Two protections apply: (1) take
    // the single best-matching concept per dimension, not a sum across every
    // activated concept — a paper that happens to carry several of those
    // tags in its fieldProblems list should not out-score the paper that is
    // precisely about the one best-matching concept; (2) a match on the
    // query's Primary Intent (the top-ranked, closest concept) counts at
    // full strength, while a match on a merely-Related concept is scaled
    // down — see RELATED_CONCEPT_MULTIPLIER.
    let bestProblemConcept = 0, bestPracticeConcept = 0, bestCropConcept = 0, bestMachineryConcept = 0;
    for (const { term, closeness } of concepts) {
      const weight = primaryTerms.has(term) ? closeness : closeness * RELATED_CONCEPT_MULTIPLIER;
      if (meta.fieldProblems.some((p) => p.toLowerCase() === term)) {
        bestProblemConcept = Math.max(bestProblemConcept, weight);
      }
      if (meta.fieldPractices.some((p) => p.toLowerCase() === term)) {
        bestPracticeConcept = Math.max(bestPracticeConcept, weight);
      }
      if (meta.crops.some((p) => p.toLowerCase() === term)) {
        bestCropConcept = Math.max(bestCropConcept, weight);
      }
      if (meta.machineryTools.some((p) => p.toLowerCase() === term)) {
        bestMachineryConcept = Math.max(bestMachineryConcept, weight);
      }
    }
    if (bestProblemConcept > 0) {
      score += W_CONCEPT_PROBLEM * bestProblemConcept;
      matchedOn.add("problem");
      strongSignal = true;
    }
    if (bestPracticeConcept > 0) {
      score += W_CONCEPT_OTHER * bestPracticeConcept;
      matchedOn.add("practice");
      strongSignal = true;
    }
    if (bestCropConcept > 0) {
      score += W_CONCEPT_OTHER * bestCropConcept;
      matchedOn.add("crop");
      strongSignal = true;
    }
    if (bestMachineryConcept > 0) {
      score += W_CONCEPT_OTHER * bestMachineryConcept;
      matchedOn.add("machinery");
      strongSignal = true;
    }

    // Tier 2b — exact/short-query synonym hits (handles "hardpan", "corn", "gehun")
    for (const term of exactExpansions) {
      if (meta.fieldProblems.some((p) => p.toLowerCase() === term)) {
        score += W_EXACT_PROBLEM;
        matchedOn.add("problem");
        strongSignal = true;
      }
      if (meta.crops.some((p) => p.toLowerCase() === term)) {
        score += W_EXACT_CROP;
        matchedOn.add("crop");
        strongSignal = true;
      }
      if (meta.fieldPractices.some((p) => p.toLowerCase() === term)) {
        score += W_EXACT_OTHER;
        matchedOn.add("practice");
        strongSignal = true;
      }
      if (meta.machineryTools.some((p) => p.toLowerCase() === term)) {
        score += W_EXACT_OTHER;
        matchedOn.add("machinery");
        strongSignal = true;
      }
    }

    // Tier 3 — title / primary subject
    const titleScore = weightedOverlap(queryTokens, paper.title, W_TITLE);
    if (titleScore > 0) { score += titleScore; matchedOn.add("title"); }
    const subjectScore = weightedOverlap(queryTokens, meta.primarySubject, W_SUBJECT);
    if (subjectScore > 0) { score += subjectScore; matchedOn.add("subject"); }

    // Tier 4 — residual word-overlap on high-value structured fields (catches
    // plural/word-form variants the concept index didn't activate). Capped in
    // aggregate: with ~9 scored fields, two generic query words (e.g. "water",
    // "soil") landing in nearly every field of nearly every paper would
    // otherwise sum past a genuine Tier 1/2/2b hit purely on breadth, letting
    // an unrelated paper outrank the one actually about the query's concept —
    // exactly the over-broad-match failure mode this whole pass exists to fix.
    // The cap keeps Tier 4/5 acting as a tie-breaker, never a top-rank driver.
    let tier4 = 0;
    const fp = weightedOverlap(queryTokens, meta.fieldProblems.join(", "), W_FIELDPROBLEM_TEXT);
    if (fp > 0) { tier4 += fp; matchedOn.add("problem"); }
    const cropText = weightedOverlap(queryTokens, meta.crops.join(", "), W_CROP_TEXT);
    if (cropText > 0) { tier4 += cropText; matchedOn.add("crop"); }
    const practiceText = weightedOverlap(queryTokens, meta.fieldPractices.join(", "), W_PRACTICE_TEXT);
    if (practiceText > 0) { tier4 += practiceText; matchedOn.add("practice"); }
    const machineryText = weightedOverlap(queryTokens, meta.machineryTools.join(", "), W_MACHINERY_TEXT);
    if (machineryText > 0) { tier4 += machineryText; matchedOn.add("machinery"); }
    score += Math.min(tier4, MAX_TIER4);

    // Tier 5 — medium/low value metadata, capped for the same reason.
    let tier5 = 0;
    const kw = weightedOverlap(queryTokens, meta.keywords.join(", "), W_KEYWORD_TEXT);
    if (kw > 0) { tier5 += kw; matchedOn.add("keyword"); }
    const sci = weightedOverlap(queryTokens, meta.scientificDomains.join(", "), W_SCIENCE_TEXT);
    if (sci > 0) { tier5 += sci; matchedOn.add("science"); }
    const summ = weightedOverlap(queryTokens, paper.summary, W_SUMMARY_TEXT);
    if (summ > 0) { tier5 += summ; matchedOn.add("summary"); }
    const fam = weightedOverlap(queryTokens, meta.problemFamily.join(", "), W_PROBLEM_FAMILY_TEXT);
    if (fam > 0) { tier5 += fam; matchedOn.add("problem area"); }
    const stage = weightedOverlap(queryTokens, meta.productionStages.join(", "), W_STAGE_TEXT);
    if (stage > 0) { tier5 += stage; matchedOn.add("production stage"); }
    score += Math.min(tier5, MAX_TIER5);

    if (score <= 0) continue;

    // Minimum-relevance gate: a real Tier 1/2/2b hit (question paraphrase,
    // activated concept, or exact/synonym match landing on this paper's own
    // canonical tags) always qualifies on its own. Otherwise require at
    // least two distinct query tokens (or, for a single-meaningful-word
    // query, that one word) to have found a home somewhere — this is what
    // stops a single generic word from producing hundreds of near-zero
    // matches, while still letting synonym-only queries like "gehun" (which
    // never appears literally in any paper's text) through on strongSignal.
    const minTokens = Math.min(2, queryTokens.length);
    if (!strongSignal && distinctTokensMatched < minTokens) continue;

    raw.push({ paper, score, matchedOn: Array.from(matchedOn) });
  }

  raw.sort((a, b) => b.score - a.score);

  // Result tiering: a relative cutoff from the best score keeps the primary
  // result set to genuinely comparable matches instead of a long flat tail of
  // weak hits, without needing a separate "Best Matches" / "Related
  // Knowledge" UI split. Only applied once there's a large-enough pool for a
  // tail to matter, and never trims below a handful of results.
  if (raw.length > 10) {
    const top = raw[0].score;
    const cutoff = top * 0.22;
    const trimmed = raw.filter((r) => r.score >= cutoff);
    return trimmed.length >= 5 ? trimmed : raw.slice(0, 5);
  }

  return raw;
}
