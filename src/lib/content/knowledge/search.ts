import synonymsData from "./synonyms.json";
import type { Paper } from "@/lib/content/papers";
import type { PaperMetadata } from "./taxonomy";

/**
 * PQNK Knowledge Library search — deterministic client-side scoring over the
 * approved Taxonomy 1.1 discovery fields. Not an LLM/embedding search; a
 * transparent keyword + synonym match, per the Knowledge Library V1.0 brief.
 *
 * Two complementary strategies, combined:
 *  1. Whole-phrase / synonym match — e.g. "hard layer" -> "hardpan", or a
 *     literal substring of the query appearing in a field.
 *  2. Per-word OR matching — a natural question like "why does my wheat
 *     ripen early" is tokenized into words, each independently expanded
 *     through the synonym index, so a paper doesn't need the exact phrase to
 *     surface — it needs enough of the meaningful words in common. This is
 *     what lets questionsAnswered ("Why does my wheat ripen too early?")
 *     match a looser farmer phrasing of the same question.
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

// term (lowercased) -> set of canonical terms it should expand to
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
  // Only index short, literal farmer phrases as lookup keys — long descriptive
  // "farmer translations" of a mechanism aren't useful as an exact search key,
  // but short ones (a handful of words) are exactly the vocabulary a farmer types.
  for (const ft of pair.farmerTerms) {
    if (ft.split(/\s+/).length <= 6) addSynonym(ft, pair.scientificTerm);
  }
}

const STOPWORDS = new Set([
  "the", "a", "an", "of", "for", "and", "or", "to", "in", "on", "with", "is", "are", "do", "does",
  "my", "how", "why", "what", "when", "should", "can", "i", "it", "this", "that", "will", "was",
  "were", "be", "been", "at", "by", "from", "as", "not", "no", "yes",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9°]+/i).filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

/** Expand a raw query into itself plus any canonical terms its full phrase resolves to. */
export function expandQuery(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const expansions = new Set<string>([q]);
  if (SYNONYM_INDEX.has(q)) {
    for (const c of SYNONYM_INDEX.get(q)!) expansions.add(c);
  }
  return Array.from(expansions);
}

/** For a single word, itself plus any canonical terms it resolves to. */
function expandWord(word: string): string[] {
  const group = [word];
  if (SYNONYM_INDEX.has(word)) group.push(...Array.from(SYNONYM_INDEX.get(word)!));
  return group;
}

export interface SearchResult {
  paper: Paper;
  score: number;
  matchedOn: string[];
}

interface Weighted {
  text: string;
  weight: number;
  label: string;
}

function fieldsFor(paper: Paper, meta: PaperMetadata | undefined): Weighted[] {
  const fields: Weighted[] = [
    { text: paper.title, weight: 6, label: "title" },
    { text: paper.summary, weight: 2, label: "summary" },
  ];
  if (!meta) return fields;
  fields.push(
    { text: meta.primarySubject, weight: 3, label: "subject" },
    { text: meta.questionsAnswered.join(" \n "), weight: 5, label: "a question this paper answers" },
    { text: meta.keywords.join(", "), weight: 3, label: "keyword" },
    { text: meta.crops.join(", "), weight: 4, label: "crop" },
    { text: meta.fieldProblems.join(", "), weight: 4, label: "problem" },
    { text: meta.problemFamily.join(", "), weight: 2, label: "problem area" },
    { text: meta.fieldPractices.join(", "), weight: 3, label: "practice" },
    { text: meta.machineryTools.join(", "), weight: 3, label: "machinery" },
    { text: meta.scientificDomains.join(", "), weight: 2, label: "science" },
  );
  return fields;
}

export function searchPapers(
  papers: Paper[],
  getMeta: (slug: string) => PaperMetadata | undefined,
  query: string
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const phraseTerms = expandQuery(q).filter((t) => t.length >= 3);
  const queryWords = tokenize(q);
  const wordGroups = queryWords.map(expandWord);
  // A single short query (e.g. "hardpan") has no separate word-overlap requirement —
  // the phrase check alone covers it. Multi-word natural questions need at least two
  // distinct query words to find a home somewhere, so common words like "soil" alone
  // don't flood every result.
  const minDistinctWords = Math.min(2, wordGroups.length);

  const results: SearchResult[] = [];
  for (const paper of papers) {
    const meta = getMeta(paper.slug);
    const fields = fieldsFor(paper, meta);
    let score = 0;
    const matchedOn = new Set<string>();
    let phraseHit = false;

    for (const field of fields) {
      const haystack = field.text.toLowerCase();
      if (!haystack) continue;
      for (const term of phraseTerms) {
        if (haystack === term) {
          score += field.weight * 3;
          matchedOn.add(field.label);
          phraseHit = true;
        } else if (haystack.includes(term)) {
          score += field.weight * 2;
          matchedOn.add(field.label);
          phraseHit = true;
        }
      }
    }

    let distinctWordsMatched = 0;
    for (const group of wordGroups) {
      let hitThisWord = false;
      for (const field of fields) {
        const haystack = field.text.toLowerCase();
        if (!haystack) continue;
        for (const term of group) {
          if (haystack.includes(term)) {
            score += field.weight * 0.5;
            matchedOn.add(field.label);
            hitThisWord = true;
          }
        }
      }
      if (hitThisWord) distinctWordsMatched++;
    }

    const meetsThreshold = phraseHit || distinctWordsMatched >= minDistinctWords || (wordGroups.length > 0 && distinctWordsMatched === wordGroups.length);
    if (score > 0 && meetsThreshold) {
      results.push({ paper, score, matchedOn: Array.from(matchedOn) });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
