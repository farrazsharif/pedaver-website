// Retrieval + ranking, implementing SOURCE_AUTHORITY_POLICY.md sec 2/4 and
// ASK_PQNK_RETRIEVAL_POLICY.md sec 2-3: search Science + Knowledge Papers +
// published Farmer Advisory, rank by relevance -> explicit relationship ->
// recency -> format, never by fixed content-type order.
import { snapshot, type PaperContent, type ScienceContent } from "./content.js";
import { db } from "./db.js";
import type { NormalizedIntent, RetrievedSource } from "./ai/provider.js";

function overlapCount(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  return a.filter((x) => setB.has(x)).length;
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

// A Farmer Advisory record exists specifically to answer ONE question. A
// repeat of that same (or near-same) question must find it even when the
// question carries no recognizable taxonomy tags at all — which is exactly
// the case for a genuinely novel question a farmer asked, that Pedaver
// answered from field knowledge rather than an existing tagged fieldProblem
// (see the "New Field Determination" source type in
// QA_KNOWLEDGE_SCHEMA.json). Taxonomy overlap alone would never re-find
// such a record, since by definition nothing tagged it. Word-overlap
// against the record's own question text is the fallback that closes this
// gap — this is the mechanism the immediate-feedback-loop acceptance test
// depends on (ASK_PQNK_V1_IMPLEMENTATION_SPEC.md sec "how a Pedaver answer
// automatically becomes searchable knowledge").
function questionTextSimilarity(question: string, candidateQuestion: string): number {
  const a = significantWords(question);
  const b = significantWords(candidateQuestion);
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / Math.min(a.size, b.size);
}

interface ScoredCandidate extends RetrievedSource {
  directTaxonomyMatch: boolean; // true for fieldProblem/crop/scienceDomain
  // overlap, OR (Farmer Advisory only) a strong question-text match — never
  // for keyword-only. This is what the sufficiency gate checks per
  // ASK_PQNK_RETRIEVAL_POLICY.md sec 4 ("not keyword-only"); a repeat of an
  // Advisory's own question is treated as equally direct as a taxonomy hit.
  createdAt?: string; // for recency tiebreak (sec 4 point 3)
  tier: 1 | 2; // Tier 1 = Science (absolute), Tier 2 = current practical knowledge
}

function scoreScience(intent: NormalizedIntent, page: ScienceContent): ScoredCandidate | null {
  const scienceDomainNames = snapshot.taxonomy.scientificDomains;
  const matchedDomain = scienceDomainNames.find(
    (d) => d.toLowerCase().replace(/\s+/g, "-") === page.domainSlug
  );
  const domainOverlap = matchedDomain && intent.scienceDomains.includes(matchedDomain) ? 1 : 0;
  const keywordHit = intent.keywords.some(
    (k) => page.description.toLowerCase().includes(k.toLowerCase()) || page.title.toLowerCase().includes(k.toLowerCase())
  );
  if (domainOverlap === 0 && !keywordHit) return null;

  // Science is Tier 1 authority (always outranks Tier 2 when a conflict
  // arises — SOURCE_AUTHORITY_POLICY.md sec 3) but that is not the same as
  // always leading the answer's citation order: a Knowledge Paper that
  // directly names the farmer's specific field problem is a more precise
  // "Answer" than a whole-domain Science page. Weighted so Science still
  // reliably appears as the "Read the Science" supporting citation
  // (ASK_PQNK_RETRIEVAL_POLICY.md sec 3 point 3) whenever its domain
  // matches, and still outranks a Paper that only weakly/domain-matches —
  // but a Paper with a genuine field-problem match leads.
  return {
    sourceType: "Science Page",
    reference: page.path,
    title: page.title,
    snippet: page.description,
    authorityStatus: "Current / Approved PQNK Knowledge",
    score: domainOverlap * 40 + (keywordHit ? 5 : 0),
    directTaxonomyMatch: domainOverlap > 0,
    tier: 1,
  };
}

function scorePaper(intent: NormalizedIntent, paper: PaperContent): ScoredCandidate | null {
  if (paper.authorityStatus === "Requires PQNK Review") return null; // Tier 6, never founds an answer
  const problemOverlap = overlapCount(intent.fieldProblems, paper.fieldProblems);
  const domainOverlap = overlapCount(intent.scienceDomains, paper.scientificDomains);
  const cropOverlap = overlapCount(intent.crops, paper.crops);
  const keywordHit = intent.keywords.some(
    (k) => paper.summary.toLowerCase().includes(k.toLowerCase()) || paper.title.toLowerCase().includes(k.toLowerCase())
  );
  const directTaxonomyMatch = problemOverlap > 0 || domainOverlap > 0 || cropOverlap > 0;
  if (!directTaxonomyMatch && !keywordHit) return null;

  // Historical/External-status papers are still retrieved (SOURCE_AUTHORITY_
  // POLICY.md sec 6: may be shown, labeled, if directly relevant) but their
  // authorityStatus alone excludes them from founding an answer — enforced
  // in the sufficiency gate, not by filtering them out of candidates here.
  //
  // Domain overlap is capped at 1 regardless of how many domains match
  // (Math.min below), not multiplied per matched domain. Uncapped, a broad
  // multi-topic paper (e.g. a full crop-cultivation guide tagged across
  // several science domains) accumulates points across every domain the
  // question happens to touch and can out-score a paper that precisely
  // names the actual field problem but is tagged to only one domain — the
  // same "breadth mistaken for relevance" failure already identified and
  // rejected during the Knowledge Library anchor curation work. Field
  // problem overlap, the most specific and direct signal, is weighted
  // well above domain overlap for the same reason.
  return {
    sourceType: "Knowledge Paper",
    reference: paper.slug,
    title: paper.title,
    snippet: paper.summary,
    authorityStatus: paper.authorityStatus,
    score: problemOverlap * 60 + Math.min(domainOverlap, 1) * 15 + cropOverlap * 25 + (keywordHit ? 5 : 0),
    directTaxonomyMatch,
    tier: 2,
  };
}

interface AdvisoryRow {
  id: string;
  question: string;
  canonical_question: string;
  short_answer: string;
  answer: string;
  crops: string; // json
  problems: string; // json
  science_domains: string; // json
  authority_status: string;
  publication_status: string;
  approved_date: string | null;
  supersedes_or_clarifies: string; // json
}

const TEXT_MATCH_THRESHOLD = 0.5;

function scoreAdvisory(question: string, intent: NormalizedIntent, row: AdvisoryRow): ScoredCandidate | null {
  const crops: string[] = JSON.parse(row.crops);
  const problems: string[] = JSON.parse(row.problems);
  const scienceDomains: string[] = JSON.parse(row.science_domains);

  const problemOverlap = overlapCount(intent.fieldProblems, problems);
  const domainOverlap = overlapCount(intent.scienceDomains, scienceDomains);
  const cropOverlap = overlapCount(intent.crops, crops);
  const taxonomyMatch = problemOverlap > 0 || domainOverlap > 0 || cropOverlap > 0;

  // Text-similarity fallback (see questionTextSimilarity above) — checked
  // against both the original farmer wording and the canonical phrasing,
  // since a repeat asker's exact words won't always match the canonical
  // form Pedaver's answer was filed under.
  const textSim = Math.max(
    questionTextSimilarity(question, row.question),
    questionTextSimilarity(question, row.canonical_question)
  );
  const directTextMatch = textSim >= TEXT_MATCH_THRESHOLD;

  if (!taxonomyMatch && !directTextMatch) return null;

  return {
    sourceType: "Farmer Advisory Record",
    reference: row.id,
    title: row.canonical_question,
    snippet: row.short_answer,
    authorityStatus: row.authority_status,
    // A strong text match (the same question, essentially) is scored to
    // compete with or lead a solid taxonomy match, not just barely qualify
    // — it is, after all, literally the record built to answer this
    // question. Taxonomy overlap still stacks on top when both are present.
    score:
      problemOverlap * 60 +
      Math.min(domainOverlap, 1) * 15 +
      cropOverlap * 25 +
      (directTextMatch ? 55 + textSim * 20 : 0) +
      8, // +8: Farmer Advisory is a direct-answer format, a soft
    // presentation preference per SOURCE_AUTHORITY_POLICY.md sec 4 point 4.
    directTaxonomyMatch: taxonomyMatch || directTextMatch,
    createdAt: row.approved_date ?? undefined,
    tier: 2,
  };
}

export interface RetrievalResult {
  candidates: ScoredCandidate[];
  hasDirectTaxonomyMatch: boolean;
  conflicting: boolean;
}

export function retrieve(question: string, intent: NormalizedIntent): RetrievalResult {
  const candidates: ScoredCandidate[] = [];

  for (const page of snapshot.science) {
    const c = scoreScience(intent, page);
    if (c) candidates.push(c);
  }
  for (const paper of snapshot.papers) {
    const c = scorePaper(intent, paper);
    if (c) candidates.push(c);
  }

  // publication_status = 'Published' is the entire enforcement of "draft,
  // unanswered, under-review, or otherwise unpublished referrals must
  // never enter retrieval" (ASK_PQNK_ARCHITECTURE.md sec 19) -- the only
  // row of this table Ask PQNK can ever see is one Pedaver has explicitly
  // published via routes/inbox.ts (provenance.ts). referral_queue itself
  // (drafts, in-progress answers, unpublished/"Private" decisions) is
  // never queried anywhere in this file.
  const advisoryRows = db
    .prepare(`SELECT * FROM farmer_advisory WHERE publication_status = 'Published'`)
    .all() as unknown as AdvisoryRow[];
  for (const row of advisoryRows) {
    const c = scoreAdvisory(question, intent, row);
    if (c) candidates.push(c);
  }

  // Rank: tier (Science always considered separately, never excluded) ->
  // relevance score -> explicit supersedesOrClarifies relationship ->
  // recency -> format (already baked in as a small score bonus above).
  candidates.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    const aDate = a.createdAt ?? "";
    const bDate = b.createdAt ?? "";
    return bDate.localeCompare(aDate); // recency tiebreak only when score ties
  });

  // Apply explicit supersedesOrClarifies: if a Farmer Advisory in the
  // candidate list names another candidate's reference, promote it above
  // that reference regardless of raw score (SOURCE_AUTHORITY_POLICY.md
  // sec 4 point 2 — an explicit relationship wins outright).
  for (const c of candidates) {
    if (c.sourceType !== "Farmer Advisory Record") continue;
    const row = advisoryRows.find((r) => r.id === c.reference);
    if (!row) continue;
    const relations: { sourceType: string; reference: string }[] = JSON.parse(row.supersedes_or_clarifies);
    for (const rel of relations) {
      const idx = candidates.findIndex((x) => x.reference === rel.reference);
      const selfIdx = candidates.indexOf(c);
      if (idx > -1 && idx < selfIdx) {
        // Move the superseding Advisory ahead of the source it clarifies.
        candidates.splice(selfIdx, 1);
        candidates.splice(idx, 0, c);
      }
    }
  }

  const hasDirectTaxonomyMatch = candidates.some((c) => c.directTaxonomyMatch && c.authorityStatus === "Current / Approved PQNK Knowledge");

  // V1 does not attempt automated semantic conflict detection beyond the
  // explicit supersedesOrClarifies mechanism above — judging whether two
  // sources make genuinely contradictory claims (vs. just both being
  // relevant) needs a real LLM reading both texts, not taxonomy overlap.
  // Flagged as a known V1 limitation in the implementation report.
  const conflicting = false;

  return { candidates, hasDirectTaxonomyMatch, conflicting };
}
