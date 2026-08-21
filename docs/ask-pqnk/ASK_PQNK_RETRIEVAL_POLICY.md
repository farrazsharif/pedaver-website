# Ask PQNK Retrieval Policy — 1.4.1

Status: Approved, partially implemented locally (V1 core).

Depends on: `SOURCE_AUTHORITY_POLICY.md`.

**Revision 1.4.1 change (approved correction to 1.4):** the grounding
validator's primary check (§8) is now source-membership + authority +
conservative source-bound synthesis, not lexical/keyword overlap — overlap
is retained only as a logged secondary diagnostic. Intent understanding
(§2) is now conditional, not unconditionally AI-assisted: the deterministic
vocabulary always runs first, and the AI call is skipped whenever it
already resolves the question confidently (`ASK_PQNK_ARCHITECTURE.md` §9,
§18.2, §18.5 for the full reasoning behind both corrections).

Carried forward from 1.4: composition (§8) is AI-assisted, not
template-only — an AI call synthesizes the answer's prose from retrieved
sources, but every claim it produces is deterministically validated
against those same sources before rendering. Retrieval (§2–§4), ranking
(§3), and the sufficiency gate (§4) remain entirely deterministic and are
unaffected — AI has no input into any of them, and never sees a question
the gate has already refused. Carried forward from 1.3: composition stays
English-only, multilingual question understanding is retained. Carried
forward from 1.2: ranking within the "current" band (Papers/Farmer
Advisory/Media as peers, ranked by relevance + explicit relationship +
recency + format). V1 implementation scope (Science + Papers + Farmer
Advisory only, Media deferred) is noted where relevant — see
`ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`.

## 1. Core principle

Unchanged: search the approved PQNK knowledge system, answer from that
knowledge, cite the sources, and escalate when the answer is not
sufficiently supported.

## 2. Retrieval pipeline

```
User Question (text, or voice once V1.2 activates)
  |
  v
1. Intent understanding [DETERMINISTIC first, AI conditional]
   - normalize farmer language (English/Urdu/Roman Urdu/Punjabi) onto the
     canonical taxonomy — this step alone stays multilingual. The
     deterministic term vocabulary always runs first, at zero cost; its
     result is checked for confidence (`ASK_PQNK_ARCHITECTURE.md` §9,
     §1.4.1). Only when inconclusive is an AI call made to extract
     additional tags from open phrasing — checked against the real
     taxonomy before use, merged (union) with the deterministic result,
     never replacing it
   - extract: crop(s), field problem(s), science domain(s), practice(s),
     production stage, explicit keywords
   - classify question type: diagnostic / how-to / why / economic / general
   - detect and record source language — used for the "Refer to Pedaver"
     message only (sec 5), NOT as an instruction for what language to
     compose the answer in
  |
  v
2. Parallel search across indexes
   a. Science pages             (10 locked pages — always searched)
   b. Knowledge Papers          (always searched)
   c. Farmer Advisory records   (always searched — V1 scope; starts near-empty
                                 and grows via the referral loop)
   d. Media Knowledge Index     (searched once media indexing is active —
                                 not part of V1, architecturally identical
                                 slot in the pipeline once it is)
  |
  v
3. Merge candidates, de-duplicate
  |
  v
4. Re-rank — see sec 3 below
  |
  v
5. Sufficiency gate (sec 4)
  |
  +-- SUFFICIENT --> 6a. [AI, GROUNDED] Compose answer in English from
  |                  retrieved sources only, structured per-claim with
  |                  source attribution -> [DETERMINISTIC] validate each
  |                  claim, drop unsupported ones -> enough survives: cite
  |                  and stop; too little survives: fall through to 6b
  |
  +-- INSUFFICIENT --> 6b. Refer to Pedaver, register/increment question cluster
```

## 3. Ranking — relevance, authority, recency, relationship

Per `SOURCE_AUTHORITY_POLICY.md` §2 and §4, ranking is no longer "sort by
tier, then by format." It is:

1. **Tier, hard pre-sort.** Science (Tier 1) and current material (Tier 2)
   are eligible to found an answer. Historical/External/Requires-Review
   (Tiers 3–5) are not, regardless of anything else.
2. **Within Tier 2**, in order: relevance (direct taxonomy match beats
   keyword-only) → explicit `supersedesOrClarifies` relationship (wins
   outright for the specific claim it names) → recency (tiebreaker only,
   between otherwise-equal, unrelated candidates) → format (soft
   presentation preference only when 1–3 are tied).
3. Science, when it matches, is always shown as the "Read the Science"
   citation regardless of where the Tier 2 leader came from — Science
   participating in the answer is never optional once relevant, since it's
   the foundational layer the Tier 2 answer is itself built on.

This keeps ranking auditable: a reviewer can always point to which specific
factor (taxonomy match, a named relationship, or recency) produced a given
answer's leading source, rather than trusting an opaque score.

## 4. Sufficiency gate — Answer vs. Refer

Unchanged in structure and conditions from 1.1:

**Answer if, and only if:**
- At least one Tier 1–2 source directly matches the field problem, crop,
  or science domain.
- Retrieved Tier 1–2 sources do not materially conflict (§6 below).
- The question can be answered from the source's content as written.
- The question does not require physical field inspection (§6).

**Refer to Pedaver if:** no authoritative source exists; sources
materially conflict; a source only partially answers; field condition is
required; diagnosis would be unsafe from text alone; only
`Requires PQNK Review` content is available; or answering would require
guessing.

Every Refer event feeds question clustering
(`PEDAVER_REFERRAL_WORKFLOW.md` §5) regardless of which condition fired.

## 5. Multilingual understanding, English-composed answers

**Changed in 1.3.** Ask PQNK no longer composes the authoritative answer
in the farmer's language — it composes in English, always. This is a
locked product decision, not a technical limitation: the Pedaver website
already provides a Translate facility, and multilingual answer
*generation* was adding cost and complexity without adding accuracy, since
the underlying source corpus is itself English.

What is retained, and was already true architecturally: retrieval matches
against the language-independent canonical taxonomy, so a question asked
in Urdu, Roman Urdu, or Punjabi is understood and retrieved against
exactly as well as the same question in English (sec 2 step 1;
`ASK_PQNK_ARCHITECTURE.md` sec 8–9 for the full reasoning and the
retained/expanded Roman-Urdu-and-Urdu-script term vocabulary). Only the
final composed answer's language changed.

The one output that still varies by farmer language is the fixed "Refer
this Question to Pedaver" message (sec after the trigger-wording block in
`ASK_PQNK_ARCHITECTURE.md` sec 11) — a static per-language lookup string,
not generated text, so it carries none of the cost or grounding risk of
answer generation. See `ASK_PQNK_ARCHITECTURE.md` sec 18 for the full
AI-capability reassessment.

## 6. Same-tier conflict handling

Unchanged in mechanism, now explicitly including the Science exception from
`SOURCE_AUTHORITY_POLICY.md` §3: a Tier 2 source that appears to conflict
with Science is never resolved in the Tier 2 source's favor by this
pipeline — it routes to Refer, flagged specifically as a possible Science
Review case (`PEDAVER_REFERRAL_WORKFLOW.md` §12), not an ordinary same-tier
conflict between two Papers or Advisories.

Two Tier 2 sources conflicting with each other, with no explicit
`supersedesOrClarifies` relationship between them, is treated as
insufficient evidence and referred — exactly the moment a reviewer should
either add that relationship (if one genuinely does supersede the other)
or resolve the underlying disagreement.

## 7. "Field condition" questions

Unchanged from 1.1. Some questions require physical inspection Ask PQNK
cannot perform from text — e.g., "how deep is my hardpan," answered with
the diagnostic method, never a guessed number.

## 8. Answer composition

Composed by AI in English only (sec 5), regardless of the question's
language, and only ever from the sources this pipeline has already
retrieved, ranked, and gated as sufficient — AI never chooses what's
relevant, only explains what deterministic logic already decided was
relevant:

```
Answer       — 2-4 sentences, English
Why          — mechanism, cites Science/Papers/Farmer Advisory, English
What to do   — concrete next step(s), English
Sources      — Science page(s), Knowledge Paper(s), Farmer Advisory record(s)
Watch/Read   — Media segments with timestamp, once media is active
```

**Revision 1.4: this is a code-level guarantee, not a prompt request.**
The AI composer returns structured, per-claim output — each claim tagged
with the specific retrieved source it draws from — rather than free prose
with citations bolted on after.

**Revision 1.4.1, approved correction: the validator's primary check is
not lexical overlap.** A deterministic validator checks every claim on
three structural grounds: **source-membership** (the cited source must be
one that was actually retrieved), **authority** (that source must
independently clear the same eligibility bar the sufficiency gate already
required), and **conservative source-bound synthesis** (the claim's text
must stay within a bounded elaboration of that one source's own snippet,
not a free-ranging expansion). A claim that fails any of the three is
dropped before rendering, silently. Lexical overlap is still computed, but
only as a logged secondary diagnostic — it never decides whether a claim
is shown, since word-reuse alone is neither necessary (a valid paraphrase
may share few words) nor sufficient (a claim can echo a source's
vocabulary without actually being supported by it) for grounding. If
dropping claims leaves too little to constitute a real answer, the
question routes to Refer instead of showing a thinned answer — never a
guess reaching a farmer. Full mechanism, including why a prompt
instruction alone isn't sufficient and why overlap alone was the wrong
primary gate, in `ASK_PQNK_ARCHITECTURE.md` §18.2, §18.5.

A farmer who needs the answer in their own language uses the site's
existing Translate facility on the rendered English output — Ask PQNK
itself does not attempt translation.

## 9. What retrieval and composition must never do

- Never fall back to open-web search or general model knowledge — the AI
  composer receives only the retrieved source snippets as context, never
  broader access, and its output is validated against those same snippets
  regardless (sec 8).
- Never trust an AI-composed claim's cited source without checking it —
  the deterministic grounding validator (sec 8, `ASK_PQNK_ARCHITECTURE.md`
  §18.2) verifies every claim's source-membership, authority, and
  synthesis boundary before rendering, every time, not spot-checked, and
  never accepts a claim on vocabulary overlap alone (§18.5).
- Never let AI decide what's relevant, how sources rank, whether a
  question is sufficiently supported, or whether to refer — those four
  decisions are made deterministically before AI composition is ever
  invoked (sec 2, sec 4).
- Never present a Tier 3–5 source as if it carries Tier 1–2 authority.
- Never let a Tier 2 source silently override Science, regardless of
  recency.
- Never blend conflicting Tier 1–2 sources into an averaged position.
- Never answer a field-condition question with a specific guessed value.
- Never force a farmer to ask in English — question understanding stays
  multilingual (sec 5) even though composition does not.
- Never build a separate translation layer, or use AI to generate
  multilingual answers — that need is already met by the site's Translate
  facility (sec 5, `ASK_PQNK_ARCHITECTURE.md` sec 18).
