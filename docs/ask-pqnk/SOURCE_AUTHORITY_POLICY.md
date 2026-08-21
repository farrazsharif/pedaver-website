# Source Authority Policy — Ask PQNK 1.2

Status: Draft for review. Architecture only — no code, no ingestion, no schema deployed.

**Revision 1.2 change — locked, and a real redesign, not a relabel:** 1.1
ranked Knowledge Papers above Farmer Advisory above Media as fixed
sub-tiers within "current." That is now explicitly wrong: *"Do not assume
that every Knowledge Paper outranks every Farmer Advisory simply because of
its content type. A newly issued Pedaver Farmer Advisory may contain a
newer authoritative clarification that supersedes an older paper or
video."* Content-type ranking is replaced with a flatter model where
Papers, Farmer Advisory, and Approved Media are peers within one "current"
band, differentiated by relevance, recency, and explicit source
relationships — not by which format they happen to be. Science is the one
exception: it remains the absolute ceiling, never silently overridden by
anything, regardless of recency.

## 1. Purpose

Unchanged. Ask PQNK answers from the approved PQNK knowledge system, never
from open-ended generation. This document defines which sources outrank
which, and how conflicts are resolved.

## 2. The six-tier hierarchy

| Tier | Name | What's in it |
|---|---|---|
| 1 | Locked PQNK Science | The 10 Science pages. Absolute — see §3. |
| 2 | Current PQNK Practical Knowledge | Knowledge Papers, Farmer Advisory records, and Approved Media, all `authorityStatus = Current / Approved PQNK Knowledge`, ranked amongst each other by §4, not by format. |
| 3 | Historical PQNK Formulation | Any source type, tagged as superseded. |
| 4 | External Knowledge / Evidence | Any source type, third-party origin. |
| 5 | Requires PQNK Review | Any source type, not yet vetted. |
| 6 | Human escalation | "Refer this question to Pedaver" — terminal action, not a knowledge source. |

This is a return to something closer to 1.0's six-tier shape, but Tier 2
now means something structurally different: it is a *ranked band*, not a
single content type. Papers, Farmer Advisory, and Media all sit in it,
distinguished from each other only by §4's ranking factors — not by a fixed
Paper-beats-Advisory-beats-Media ordering. This is the direct implementation
of the locked instruction: *relevance + current authority + version/recency
+ source relationship, rather than source class alone.*

## 3. Science is the one absolute rule

**Science is foundational and must never be silently amended by the
automated Q&A process, at any recency.** A Farmer Advisory record — however
new, however clearly it addresses a question — cannot outrank or quietly
override a Science page. If a Farmer Advisory record appears to conflict
with current Science, this is not resolved by "the Advisory is newer" — it
is treated as a same-tier-style conflict requiring human resolution
(`SOURCE_AUTHORITY_POLICY.md` §6), specifically a **Science Review**
escalation (`PEDAVER_REFERRAL_WORKFLOW.md` §12), never an automatic
supersession. This is the one place recency explicitly does not win.

Below Science, current/locked PQNK sources (Tier 1–2) always outrank
historical, uncertain, or external material (Tier 3–5), with no exception —
unchanged from 1.0/1.1.

## 4. Ranking within Tier 2 — relevance, authority, recency, relationship

When two or more Tier 2 sources (any mix of Papers, Farmer Advisory, Media)
match a question, rank by, in order:

1. **Relevance** — direct `fieldProblem`/`crop`/`scienceDomain` match beats
   keyword-only match, unchanged from 1.1.
2. **Explicit source relationship** — if a Farmer Advisory record carries a
   `supersedesOrClarifies` reference to a specific Paper or Media item
   (`QA_KNOWLEDGE_SCHEMA.json`), that explicit relationship wins outright:
   the Advisory is cited as the current position for that specific claim,
   and the superseded source is cited only as prior/background context if
   at all. This is how "a newly issued Farmer Advisory supersedes an older
   paper" actually happens — through a named, reviewer-asserted
   relationship, never inferred automatically from publish date alone.
3. **Recency, as a tiebreaker** — when relevance is equal and no explicit
   relationship exists between the candidates, the more recently
   published/approved source is preferred. This is deliberately the
   *last* factor, not the first: recency alone does not let a throwaway
   Advisory answer outrank a carefully written Paper on the same specific
   point merely by being newer — it only breaks ties between otherwise
   equally relevant, unrelated sources.
4. **Format, as a soft default when 1–3 are all tied** — a direct-answer
   format (Farmer Advisory) is presented as the lead citation over a
   longer-form one (Paper) purely for readability, with the Paper offered
   as "Read the detailed guidance." This is presentation preference only,
   carried over from 1.1, and never overrides 1–3.

## 5. Evidence Type and Content Type — unchanged from 1.1

Two separate, orthogonal fields on every source record:

- **`authorityStatus`** — is this citable as PQNK's current position?
- **`evidenceType`** — what kind of support is this? (Scientific Mechanism,
  Field Observation, Farmer Testimony, Demonstration, Measured Field
  Result, Economic Model/Projection, External Scientific Evidence,
  Philosophical/Framework Argument)

A farmer testimony is never promoted to a universal scientific rule merely
because it is `Current / Approved`, regardless of which Tier-2 sub-content-
type carries it.

Media additionally carries `contentType` (Pedaver Lecture, Asif Sharif
Advisory, Field Demonstration, Farmer Testimony, Interview, Third-Party
Discussion, Historical Formulation), unchanged from 1.1, governing its
authority ceiling — see `MEDIA_INGESTION_PLAN.md` §2a on the distinction
between a video *advisory* and a published Farmer Advisory *record*.

## 6. Conflict resolution rule

Unchanged in mechanism, restated against the new tier shape:

1. Identify the highest tier present among retrieved sources.
2. Within Tier 2, apply §4's ranking to find the leading position.
3. That position is the answer. Lower-tier sources are never blended into
   it or averaged with it.
4. If two Tier 2 sources conflict on the same specific claim with *no*
   explicit `supersedesOrClarifies` relationship between them, this is a
   genuine unresolved conflict — treat as insufficient evidence and refer
   to Pedaver (`ASK_PQNK_RETRIEVAL_POLICY.md` §4), which is also exactly
   the moment a reviewer should add the missing explicit relationship if
   one of the two truly does supersede the other.
5. Any apparent conflict between a Tier 2 source and Science is never
   auto-resolved in the Tier 2 source's favor — see §3.

Ask PQNK must never silently merge contradictory formulations into one
smoothed-over answer.

## 7. Worked example (updated for the flatter Tier 2)

**Question:** "How deep should I break the hardpan?"

- A 2025 YouTube lecture states a fixed depth (`Historical PQNK
  Formulation`, Tier 3).
- An older Knowledge Paper describes an earlier version of the shatter
  protocol.
- A newer, `Current/Approved` Farmer Advisory record exists, published
  after a recent cluster of similar questions, and explicitly carries
  `supersedesOrClarifies` pointing at that Paper — Pedaver's review
  determined the Paper's wording was ambiguous and the Advisory clarifies
  the current diagnose-first, shatter-the-entire-restrictive-layer
  position.
- The current Soil Science page also describes the diagnose-first
  approach (Tier 1).

Ranking: Tier 1 (Science) and the Advisory's explicit-relationship win
within Tier 2 both lead the answer; the older Paper is not cited as the
current position (its content is superseded by the named relationship, not
merely out-ranked by format); the Tier 3 video is omitted from the answer
basis entirely unless the farmer references it directly.

## 8. Ownership and change control

Unchanged from 1.1. This hierarchy is a policy artifact — updating it is a
Pedaver decision, reviewed the same way a Science page edit is reviewed.
