# Ask PQNK — V1 Implementation Specification

Status: Approved (Revision 1.4.2), in local implementation. **No commit,
no push, no deployment.**

**Revision 1.4.2 note (current, pre-deployment hardening):** the
knowledge-boundary rule — ASK PQNK GENERATED ANSWER ≠ PEDAVER KNOWLEDGE —
is now explicitly enforced in code, not just implied by which routes
happen to exist. `provenance.ts`'s `assertPedaverAuthoredPublication`
guards the single `farmer_advisory` insert site (`routes/inbox.ts`); the
`supersedesOrClarifies` mechanism `retrieval.ts` already implemented is
now actually populated at publish time; a new `originReferenceNumber`
column gives each record self-contained provenance. §5, §7, §9, §10
updated. Full statement in `ASK_PQNK_ARCHITECTURE.md` §19.

**Revision 1.4.1 note:** AI is a required V1 capability for
question understanding and answer composition, wrapped in deterministic
control — retrieval, ranking, citations, the sufficiency gate, and the
Refer decision stay deterministic and are computed before AI composition
ever runs; every AI-composed claim is validated before rendering, or the
response falls back to Refer. Two corrections from 1.4 as first approved:

1. **Grounding validator**: the primary check is now source-membership +
   authority + conservative source-bound synthesis, not lexical/keyword
   overlap — overlap is a secondary diagnostic only, logged but never
   gating. See `ASK_PQNK_ARCHITECTURE.md` §18.2, §18.5.
2. **Intent extraction**: the AI call is conditional, not mandatory — it
   runs only when the deterministic term/pattern recognizer doesn't
   already resolve the question confidently on its own. See
   `ASK_PQNK_ARCHITECTURE.md` §9.

§3, §7, and §8 below reflect both corrections. **The local V1 build
predates this revision** — it implements the deterministic scaffolding
(retrieval, ranking, gate, referral, the Farmer Advisory loop) correctly,
but its `MockAiProvider` composed from a fixed template with no AI call
and no grounding-validation step, since neither was needed under the prior
(1.3) instruction. This revision is now being implemented directly in
that codebase: a deterministic intent-confidence gate, a restructured
`MockAiProvider` that composes structured per-claim output (still
deterministic — no paid provider is provisioned locally, §8), and a new
grounding validator enforcing the corrected checks. `AnthropicAiProvider`
is updated to the same contract and remains unexercised locally, exactly
as before.

Scope: Farmer Advisory + Ask PQNK text interface, retrieval over Science +
Knowledge Papers + Farmer Advisory, AI-assisted multilingual question
understanding, AI-composed but deterministically-grounded English answers,
source citations, the sufficiency gate, Refer to Pedaver, and the
permanent Farmer Advisory data model. Media indexing and voice are
excluded from V1 by explicit instruction — this spec keeps the data model
compatible with both so neither is retrofitted later, without letting
either delay V1.

## 1. Revised final architecture (V1 slice)

```
                    +-----------------------------+
                    |   /advisory  (Farmer Advisory) |
                    |   = the Ask PQNK interface       |
                    +-----------------------------+
                              |
                 client-side fetch to a separate,
                 small backend service (sec 8) --
                 NOT part of the static export
                              |
        +---------------------+---------------------+
        |                                             |
   POST /api/ask                              POST /api/refer
   -> retrieval + sufficiency gate            -> queue entry + cluster
   -> answer OR "insufficient"                -> reference number
        |                                             |
        v                                             v
   Science + Papers + Farmer Advisory          Pedaver Answers Queue
   (read-only retrieval, sec 4-5)              (internal, authenticated,
                                                 sec 6-7)
                                                      |
                                                      v
                                          Pedaver answers, publishes
                                          -> Farmer Advisory record
                                          -> immediately queryable by
                                             /api/ask, no rebuild needed
```

Everything else in the six-source, six-tier architecture
(`ASK_PQNK_ARCHITECTURE.md`, `SOURCE_AUTHORITY_POLICY.md`) still applies
conceptually to V1 — Science is still absolute, recency/relationship still
matter within Tier 2 — V1 simply has no Media records populated yet, so
that part of ranking is a no-op until media indexing begins.

## 2. Proposed Farmer Advisory page structure

As specified in `ASK_PQNK_UI_ARCHITECTURE.md` §3, three zones on one page:
Ask a Question (text input; mic slot present, inert), Answer Zone (renders
after a question, or the Refer-to-Pedaver prompt), Browse Existing Farmer
Advisory (filterable list, superseding today's 5-category `AdvisoryNote`
browse). This spec adds the concrete component boundary — see §7.

## 3. Ask PQNK question-and-answer flow

```
Farmer types a question
  |
  v
Client sends { question } to POST /api/ask
  |
  v
Server [DETERMINISTIC first]: intent normalization -> canonical taxonomy
  terms, understanding English/Urdu/Roman Urdu/Punjabi input alike. The
  deterministic term/pattern vocabulary (ASK_PQNK_ARCHITECTURE.md sec 9)
  always runs first, at zero cost, and its result is checked for
  confidence (sec 9, 1.4.1: a phrase-level TRIGGERS match, or >=2 distinct
  tags via TERM_VOCABULARY).
    confident    -> use the deterministic result directly, AI is not
                     called for this question
    inconclusive -> [AI-ASSISTED] extract additional tags from open
                     phrasing; validated against the real taxonomy before
                     use -- invented tags discarded -- and merged (union)
                     with whatever the deterministic pass already found.
                     If the AI call fails, the deterministic result still
                     stands, never a hard failure.
  |
  v
Server [DETERMINISTIC]: retrieval across Science pages, Knowledge Papers,
  Farmer Advisory records (taxonomy-overlap scoring, same pattern already
  used for Related Knowledge in related.ts, extended to a third content
  type). AI has no input into this step.
  |
  v
Server [DETERMINISTIC]: rank by relevance -> explicit supersedesOrClarifies
  -> recency (SOURCE_AUTHORITY_POLICY.md sec 4). AI has no input into this
  step.
  |
  v
Server [DETERMINISTIC]: sufficiency gate (ASK_PQNK_RETRIEVAL_POLICY.md
  sec 4). AI is never consulted here and never sees a question the gate
  will refuse -- this decision fully precedes AI composition.
  |
  +-- Insufficient --> client renders "This question needs a Pedaver
  |                     response" + Refer to Pedaver, pre-filled. AI
  |                     composition is never invoked.
  |
  +-- Sufficient --> Server [AI, GROUNDED]: composes Answer/Why/What-to-do
                      in English, given ONLY the retrieved source snippets
                      as context, returning structured per-claim output
                      { claims: [{text, sourceIndex}],
                      practicalAction: {text, sourceIndex} }
                      (ASK_PQNK_ARCHITECTURE.md sec 18.2)
                        |
                        v
                      Server [DETERMINISTIC]: validate every claim on
                      three checks, none of them lexical overlap --
                      (1) source-membership: sourceIndex must reference an
                      actually-retrieved source; (2) authority: that
                      source must independently clear the same
                      eligibility bar the sufficiency gate required;
                      (3) conservative source-bound synthesis: claim text
                      must stay within a bounded elaboration of that one
                      source's own snippet, not a free-ranging expansion.
                      Lexical overlap is still computed and logged, but
                      only as a secondary diagnostic (sec 1.4.1 note
                      above, ASK_PQNK_ARCHITECTURE.md sec 18.5) -- claims
                      failing (1)-(3) are dropped silently regardless of
                      how much vocabulary they share with the source
                        |
                        +-- Enough validated content survives --> client
                        |    renders Answer/Why/What-to-do with citations.
                        |    A farmer wanting it in another language uses
                        |    the site's existing Translate facility.
                        |
                        +-- Too little survives --> falls back to the
                             Insufficient path above -- Refer to Pedaver,
                             never a thinned or partially-guessed answer
```

## 4. Referral flow

```
Farmer clicks Refer to Pedaver (question pre-filled)
  |
  v
Submission form: optional crop / region / field condition / photo / video
  / name / WhatsApp / email  (voice recording omitted from the V1 form --
  voice is out of scope; a farmer can still describe symptoms in the text
  field)
  |
  v
POST /api/refer -> server creates/updates a question cluster
  (canonical-question match, PEDAVER_REFERRAL_WORKFLOW.md sec 5),
  creates a queue entry, generates a reference number
  |
  v
Client shows the reference number + "Pedaver typically answers within a
  week; check back with this number, or we'll message you if you gave
  contact details."
  |
  v
(internal, sec 6) Pedaver answers via the review tool
  |
  v
Publish -> Farmer Advisory record created, publicationStatus: Published
  |
  v
If contact info given: notification sent (WhatsApp/email) with a link
If not: farmer can look up the reference number on /advisory at any time
```

## 5. Permanent Farmer Advisory data model

`QA_KNOWLEDGE_SCHEMA.json` as already specified, used directly as the V1
data model (not a simplified subset — the fields matter from day one so
nothing is retrofitted): `question`, `canonicalQuestion`,
`farmerLanguageWording`, `fieldContext`, `questionCluster`, `shortAnswer`,
`answer`, `practicalAction`, `language`, `crops`, `problems`,
`problemFamily`, `scienceDomains`, `practices`, `machinery`, `geography`,
`authorityStatus`, `evidenceType`, `publicationLevel`, `escalatedTo`,
`publicationStatus`, `advisoryReference`, `supersedesOrClarifies`,
`sources`, `approvedBy`, `approvedDate`, `relatedMedia` (empty array in V1
— no media indexed yet, field stays for compatibility),
`relatedPapers`, `relatedScience`, `relatedFarmerAdvisories`,
`originQuestionModality` (always `"Text"` in V1), `version`,
`supersededBy`, `originQueueId`, `originReferenceNumber` (new,
Revision 1.4.2 — the human-facing `PQNK-Q-XXXXXXXX` reference number
stored directly on the record, not only reachable via a join through
`originQueueId`, so provenance survives independently of the queue's own
retention), `repeatCount`.

`approvedBy` (always the literal string `"Pedaver"`) is the record's
answer-author provenance field, enforced at the single insert site by
`provenance.ts`'s `assertPedaverAuthoredPublication` — see
`ASK_PQNK_ARCHITECTURE.md` §19. No separate "answerAuthor" field was
added; this existing field already serves exactly that role.

**Permanent by design**: this is the published record. There is no
deletion path for it in V1's design — see §9 for what data protection
requirements this does and does not create. Superseding an older record
(`supersedesOrClarifies`, now a real mechanism as of Revision 1.4.2 — see
`ASK_PQNK_ARCHITECTURE.md` §19 point 5) sets that older record's own
`supersededBy` pointer; it is never deleted or edited.

**Personal data lives elsewhere entirely** — the Pedaver Answers Queue
entry (`PEDAVER_REFERRAL_WORKFLOW.md` §9), a structurally separate table/
store, holding `referenceNumber`, `originalQuestion`, `submittedContext`,
`date`, `dueBy`, contact fields, and workflow state. V1 must implement
these as genuinely separate data structures, not just separate fields in
one table, so that no code path can accidentally expose contact info
through a public "read Farmer Advisory records" endpoint.

## 6. How a Pedaver answer automatically becomes searchable knowledge

This is a property of the architecture, not an extra integration step:
`POST /api/ask` retrieval and the publish action both read/write the same
backend database. The moment a queue entry's `publicationDecision` is set
to Publish and the Farmer Advisory record is written with
`publicationStatus: Published`, the very next `/api/ask` call that matches
it will find it — **no site rebuild, no redeploy, no FTP sync, no cache
invalidation beyond the ordinary lifetime of the client's own request**.
This is the specific reason V1's Farmer Advisory content must be served
from a live backend rather than baked into the static Next.js export the
way Papers/Science content is today: baking it into the static build would
mean a new Farmer Advisory only becomes searchable after the next full
site deploy, which breaks the "automatically becomes searchable" property
this phase is explicitly meant to deliver.

## 7. Proposed technical components/files

**New backend service** (separate from the static Next.js export, detail
in §8):
- `POST /api/ask` — retrieval + sufficiency gate + AI-composed,
  deterministically-validated answer
- `POST /api/refer` — referral submission, clustering, reference number
- `GET /api/status/:referenceNumber` — reference-number lookup
- `GET /api/advisory` and `GET /api/advisory/:id` — published records, for
  the browse zone and for direct linking
- Internal, authenticated: a minimal Pedaver review tool — queue list/
  detail, answer/classify form, publish action. Kept deliberately simple
  for V1 (a small authenticated internal page, not a polished admin
  product) per "remove unnecessary approval bureaucracy."

**AI/grounding layer** (deterministic except the two conditionally-AI
calls, per `ASK_PQNK_ARCHITECTURE.md` §18):
- `ai/provider.ts` — the existing `AiProvider` interface, isolating
  provider choice from everything else (already built).
- `intent.ts` (new) — the deterministic term/pattern recognizer (moved out
  of `ai/mockProvider.ts`, used regardless of which `AiProvider` is
  active), the confidence test that decides whether to call the provider
  at all (§3, 1.4.1), taxonomy-tag validation for whatever the AI layer
  returns when it is called, and the merge of the two results.
- A production AI provider implementation (e.g. `ai/anthropicProvider.ts`,
  already scaffolded locally though unexercised) behind that interface,
  for intent-tag extraction (when called) and structured per-claim
  composition.
- `ai/groundingValidator.ts` (new) — the deterministic post-composition
  check described in architecture §18.2, corrected per 1.4.1: validates
  each claim's **source-membership** (`sourceIndex` resolves to an
  actually-retrieved source), **authority** (that source independently
  clears the sufficiency gate's own eligibility bar), and **conservative
  source-bound synthesis** (claim text stays within a bounded elaboration
  of that source's own snippet). Computes lexical overlap too, but only as
  a logged secondary diagnostic, never a gating condition. Drops claims
  that fail any of the three primary checks and signals "fall back to
  Refer" when too little survives. This module has no AI dependency and is
  unit-testable on fixed inputs — it enforces that a given answer is
  *grounded*; it says nothing about whether that answer becomes corpus.
- `provenance.ts` (new, Revision 1.4.2) — the separate enforcement of
  *that*: `assertPedaverAuthoredPublication`, called at the single
  `farmer_advisory` INSERT site (`routes/inbox.ts`) before it runs.
  Independently re-checks `approvedBy === "Pedaver"`,
  `publicationStatus === "Published"`, and that the record traces to a
  real referral (`originQueueId` + `originReferenceNumber`) — the concrete
  code enforcement of `ASK_PQNK_ARCHITECTURE.md` §19's "ASK PQNK GENERATED
  ANSWER ≠ PEDAVER KNOWLEDGE."

**Frontend, inside the existing Next.js app** (still part of the static
export — these are client components that fetch the backend service at
runtime, not server-rendered content):
- `src/app/advisory/page.tsx` — revised to host the three zones
- `src/components/advisory/AskPqnkBox.tsx` — question input + answer
  rendering (new)
- `src/components/advisory/ReferralForm.tsx` — submission form (new)
- `src/components/advisory/ReferenceLookup.tsx` — status/lookup (new)
- `src/components/advisory/AdvisoryBrowse.tsx` — browse zone, fetches
  published records (new; supersedes the current empty `AdvisoryNote`
  list rendering)
- `src/components/Header.tsx` — the Search icon's target changes to a
  link to `/advisory/` and its icon/label update (small, isolated change
  — everything else in the file untouched, per the standing instruction
  not to disturb the locked header structure)
- `src/lib/content/advisory.ts` — `AdvisoryNote` type retired in favor of
  fetching `QA_KNOWLEDGE_SCHEMA.json`-shaped records from the backend;
  since the current file is empty, there is no real migration burden, only
  a type/fetch-path change

No changes proposed to `src/lib/content/papers.ts`,
`src/lib/content/knowledge/*`, any Science page, or the taxonomy files —
V1 *reads* Papers/Science taxonomy for retrieval but does not modify how
they're authored or built.

## 8. What infrastructure V1 actually requires — the central decision

**The current site cannot run Ask PQNK as-is.** `next.config.ts` uses
`output: "export"` — a fully static site with no server, deployed by FTP
to cPanel shared hosting (per `CLAUDE.md`). Ask PQNK fundamentally needs:
a place to run retrieval logic, an LLM API key (which can never ship to
the browser), and a database to hold Farmer Advisory records, question
clusters, and the referral queue. A static export cannot provide any of
these. **Revised per Architecture §18: an LLM provider is a required V1
dependency**, confined to intent-tag extraction and grounded answer
composition, with retrieval, ranking, the sufficiency gate, citation, and
the Refer decision remaining deterministic server logic exactly as the
local V1 build already demonstrates for those parts.

**Two paths, and a recommendation:**

**(A) — Recommended: a separate, small backend service, deployed
independently.** The marketing site's static export and its existing
GitHub Actions → FTP → cPanel pipeline are completely untouched. The new
Farmer Advisory client components call this separate service's API over
HTTPS (CORS-configured to the site's origin). This is additive risk only
— nothing about the currently-working, just-locked visual shell deployment
changes.

- Compute: a small serverless function set (e.g., Cloudflare Workers,
  Vercel Functions, or AWS Lambda) or a lightweight always-on Node
  service, sized for V1's genuinely low expected volume.
- Database: one small managed relational database (e.g., Postgres via a
  managed provider, or even SQLite for the earliest volume — the local V1
  build uses Node's built-in `node:sqlite`, zero new dependencies) — three
  logical tables/collections: Farmer Advisory records, question clusters,
  referral queue (with contact fields kept structurally separate per §5 /
  §9).
- LLM provider: **required for V1**, confined to at most two calls per
  question, and often just one — intent-tag extraction only when the
  deterministic recognizer doesn't already resolve the question
  confidently (§3, 1.4.1), and grounded answer composition only when the
  deterministic gate says sufficient. Architecture stays provider-agnostic
  behind the existing `AiProvider` interface, so the specific vendor is a
  decision for you (§17), not fixed here. The model never sees a question
  the gate has refused (no composition call is made for an insufficient
  question), never receives anything beyond the already-retrieved source
  snippets as context, and its output passes through the deterministic
  grounding validator (§7, Architecture §18.2) — checking source-
  membership, authority, and conservative synthesis boundary, not lexical
  overlap — before anything reaches a farmer. API cost and hallucination
  surface are both bounded by this: at most two short calls per question,
  frequently zero or one, each constrained to a narrow, checkable task,
  never an open-ended one. See `ASK_PQNK_ARCHITECTURE.md` §18 for the full
  mechanism and the
  capability-by-capability breakdown of what is and isn't AI's to decide.

**(B) — Not recommended for V1: move the whole Next.js app off static
export** to a Node-capable host to gain native API routes. This would
touch the entire deployment pipeline that Website Refinement Phase 1/2 and
the Header/Banner/Mobile Polish work just finished locking down, for a
benefit V1 doesn't actually need (path A gets the same capability without
that risk). Worth reconsidering only if the site's hosting requirements
change for unrelated reasons later.

**This is the one infrastructure decision genuinely requiring your
approval before any coding begins** — everything else in this spec follows
from picking (A).

## 9. Security and privacy implications

- **`/api/ask` has zero write capability, to any table.** It is a pure
  read-and-compose path: retrieval reads `farmer_advisory`, composition
  reads the retrieved sources, grounding validation reads both — nothing
  in that request handler, nor anything under `ai/`, ever calls an
  INSERT or UPDATE. The only route in the service that can create a
  `farmer_advisory` record is the authenticated `POST /inbox/:id/publish`,
  guarded additionally by `provenance.ts` (`ASK_PQNK_ARCHITECTURE.md` §19).
  This is what makes "an AI-generated answer cannot become Farmer Advisory
  knowledge" a structural fact about the request path, not a policy a
  future change could quietly violate.
- **Public write endpoints** (`/api/ask`, `/api/refer`) need basic abuse
  protection — rate limiting per IP/session as the first line of defense;
  avoid CAPTCHA friction for a low-literacy farmer audience unless real
  abuse volume makes it necessary.
- **No PII reaches the LLM.** `/api/ask` never includes contact
  information in its prompt (it never collects any); `/api/refer`'s
  contact fields are stored, never sent to the LLM, which only ever sees
  the agricultural question and context.
- **The LLM's output is never trusted directly.** The grounding validator
  (§7, Architecture §18.2, §18.5) checks every AI-composed claim's
  source-membership, authority, and synthesis boundary against the actual
  retrieved source set before it can reach a farmer — this is the primary
  defense against both hallucination and prompt injection via a crafted
  question: even if a malicious or unusual input got the model to produce
  an unwanted claim, that claim still has to cite a real, eligible source
  and stay within a bounded elaboration of that source's own text to be
  shown — reusing the source's vocabulary is not by itself enough to pass
  (lexical overlap is logged, not a gate). Composition failing this check
  degrades to Refer to Pedaver, not to an error or a fallback guess.
- **Contact info is access-restricted**, stored only in the queue entry,
  never returned by any public endpoint, readable only by authenticated
  Pedaver reviewers through the internal tool.
- **The reference number is a bearer credential** for the status-lookup
  endpoint — no login, so it must have enough entropy to resist guessing
  and enumeration (recommend a randomly generated code, not a predictable
  sequential ticket number, or a sequential ID paired with a random
  verification suffix).
- **The internal Pedaver review/publish tool requires authentication.**
  "No dual sign-off" is about removing a *second reviewer*, not about
  removing access control — the endpoint that publishes content as
  Pedaver's authoritative answer must verify the caller is an authorized
  reviewer, otherwise anyone could publish arbitrary content under
  Pedaver's authority.
- **Uploaded evidence** (photos/videos) is stored in access-controlled
  storage, never publicly listable, until/unless a specific item is
  explicitly published with permission as part of a Farmer Advisory
  record.
- **HTTPS everywhere**, standard practice, worth stating since this is a
  new service surface, not an extension of the existing static site's
  transport.
- **No special regulatory data class is implicated** (not health or
  financial data), but ordinary data-minimization practice still applies
  to contact info and unpublished evidence, per
  `PEDAVER_REFERRAL_WORKFLOW.md` §13.

## 10. Exact implementation sequence

1. Stand up the backend service and database (§8), with the three data
   structures from §5 — before anything else, since nothing works without
   them.
2. Build retrieval: taxonomy-overlap scoring across Science + Papers +
   Farmer Advisory (extending the existing pattern already used for
   Related Knowledge), plus the deterministic term/pattern vocabulary for
   intent understanding (already built locally). Test this in isolation
   against a handful of real example questions, including at least one in
   Urdu and one in Roman Urdu, before any AI or UI work begins — cheapest
   point to catch retrieval-quality issues independent of composition.
3. Build the sufficiency gate and citation formatting on top of step 2's
   output — still fully deterministic, no AI involved yet.
3a. Wire in the AI provider (§8) for at most two conditional calls:
    intent-tag extraction (skipped when step 2's deterministic pass is
    already confident, §3 1.4.1; otherwise called and merged in, never
    replacing the deterministic result) and grounded composition (invoked
    only on a Sufficient gate result). Implement the structured per-claim
    output schema and the deterministic grounding validator (§7) in the
    same pass — the two are one unit of work, since composition without
    validation is exactly the state this revision exists to prevent. The
    validator's primary checks are source-membership, authority, and
    conservative synthesis boundary — lexical overlap is computed too but
    only as a logged secondary diagnostic (`ASK_PQNK_ARCHITECTURE.md`
    §18.2, §18.5). Test against: a deterministically-confident question
    (confirm the AI intent call is skipped, via call-count instrumentation
    on the provider); a deterministically-inconclusive question (confirm
    AI is called and its validated tags are merged in); a normal
    sufficient question (answer renders with citations); a deliberately
    insufficient question (AI composition is never invoked, confirm via
    call count); a claim engineered to cite a real but ineligible-
    authority source (rejected on the authority check alone); a claim
    engineered to cite a real, eligible source but with text far exceeding
    that source's own scope (rejected on the synthesis-boundary check
    alone, even with high keyword overlap — proves overlap isn't gating);
    and a borderline case where validation should drop enough claims to
    fall back to Refer (confirm no thinned answer ever renders).
4. Build referral submission, question clustering, and reference-number
   issuance (`/api/refer`, `/api/status/:referenceNumber`).
5. Build the minimal authenticated Pedaver review tool: queue list/detail,
   answer/classify/publish.
6. Build the frontend: the three-zone `/advisory` page and its four new
   components (§7), wired to the backend service.
7. Make the one small `Header.tsx` change: the Search icon's target and
   icon/label.
8. End-to-end test: ask a genuinely new question with no existing Farmer
   Advisory coverage → confirm referral and reference number → answer and
   publish it via the internal tool → immediately re-ask the same (and a
   differently-worded) question → confirm it now answers directly, with
   correct citations, AI-composed and grounding-validated, with no rebuild
   or redeploy of the static site in between. This test is the concrete
   proof of both §6's core property and Architecture §18.3's claim that the
   growth loop is unaffected by how composition works.
9. Wire the V1-relevant analytics events (questions asked, answered vs.
   referred, sources opened, clusters, Farmer Advisory records created,
   and — new for this revision — grounding-validator claim-drop rate
   broken down by which check failed (membership / authority / synthesis-
   boundary), as the concrete signal for whether the synthesis-boundary
   parameters, §17, are set sensibly; lexical-overlap values are logged
   alongside each claim's outcome for the same tuning purpose, per its
   role as a secondary diagnostic).
10. Security review pass (rate limiting live, internal tool
    authentication verified, contact-info access-control verified) before
    any real farmer traffic reaches it.

Media indexing (`MEDIA_INGESTION_PLAN.md`) and voice (speech-to-text/
text-to-speech, `ASK_PQNK_UI_ARCHITECTURE.md` §7) remain architecturally
compatible with everything above — the schema fields for both already
exist — but neither is built in this sequence, per instruction.
