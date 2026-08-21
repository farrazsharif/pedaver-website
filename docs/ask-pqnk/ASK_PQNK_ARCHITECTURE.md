# Ask PQNK — System Architecture 1.4.2

Status: Approved, in local implementation (V1 core — see
`ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`). Pre-deployment hardening pass
(Revision 1.4.2) complete locally; no commit, push, deploy, or paid
provider provisioning has occurred.

**Revision 1.4.2 — pre-deployment hardening, locked: the knowledge-
boundary rule made explicit and enforced in code.** ASK PQNK GENERATED
ANSWER ≠ PEDAVER KNOWLEDGE — a grounded, AI-composed answer is never
written back into Farmer Advisory, never indexed, and acquires no
authority merely because Ask PQNK generated it. Only Pedaver's publish
action creates new authoritative knowledge. Full statement, the single
authorized pathway, and the five concrete enforcement mechanisms in new
§19.

**Revision 1.4.1 — approved correction to 1.4, locked:**

1. **Grounding validator redesigned.** Lexical/keyword overlap is
   demoted from primary factual validator to a secondary diagnostic
   signal only — logged for tuning and monitoring, never gating whether a
   claim is shown. The primary validator is now three deterministic
   checks: **source-membership** (does the cited source actually exist in
   the retrieved set), **authority** (does that source independently meet
   the eligibility bar this question's sufficiency gate required), and
   **conservative source-bound synthesis** (is the claim a tightly bounded
   paraphrase of that one source's own text, not an elaboration that
   drifts beyond it). Full mechanism in the revised §18.2.
2. **AI intent extraction made conditional, not mandatory.** When the
   deterministic term/pattern recognizer already resolves a question
   confidently on its own, the AI intent-extraction call is skipped
   entirely — not merely run redundantly alongside it. AI is invoked for
   understanding only when the deterministic pass is inconclusive. Full
   mechanism in the revised §9.

Both corrections narrow AI's footprint further and make the "never the
source of PQNK knowledge" guarantee rest on checks that don't reward a
model for merely reusing the right words — see §18.5 for why lexical
overlap alone was an insufficient primary gate.

**Revision 1.3 change — locked: multilingual answer generation is removed
as a production dependency.** Ask PQNK still understands questions in
English, Urdu, Roman Urdu, and Punjabi — that recognition is retained and
was strengthened (§9–10) — but V1 composes the authoritative answer in
English only. The site's existing Translate facility covers a farmer's own
translation need; Ask PQNK does not duplicate it.

**Revision 1.4 change — locked: AI is reinstated as a required V1
capability, confined to two roles and wrapped in deterministic control on
both sides.** AI understands the farmer's natural-language question and
composes the final answer's prose; it is never permitted to be the
authority or source of PQNK knowledge. Retrieval, authority ranking,
citation selection, the sufficiency determination, and the Refer-to-Pedaver
decision remain 100% deterministic and are computed *before* AI composition
ever runs — an insufficient question never reaches the composition step at
all. Every factual statement AI produces must be traceable to a specific
retrieved passage; a deterministic validator checks this after generation
and strips or refers rather than trusting the model's word for it. See §18
for the full mechanism, §8 for where this sits in the pipeline, and
`ASK_PQNK_V1_IMPLEMENTATION_SPEC.md` §3 and §8 for the implementation-level
detail.

Top-level architecture document. Companion documents:

- `SOURCE_AUTHORITY_POLICY.md` — the six-tier hierarchy (Science absolute;
  Papers/Farmer Advisory/Media ranked as peers by relevance, recency, and
  explicit relationship, not fixed content-type order)
- `ASK_PQNK_RETRIEVAL_POLICY.md` — search, ranking, sufficiency gate
- `MEDIA_KNOWLEDGE_SCHEMA.json` — media + segment record, locked to three
  authenticated sources
- `QA_KNOWLEDGE_SCHEMA.json` — the permanent Farmer Advisory knowledge
  record and question-cluster schema
- `PEDAVER_REFERRAL_WORKFLOW.md` — submission, clustering, single-authority
  approval, permanent retention, reference-number lookup
- `MEDIA_INGESTION_PLAN.md` — controlled indexing of the three locked
  sources
- `ASK_PQNK_UI_ARCHITECTURE.md` — Farmer Advisory as the one Ask PQNK
  interface
- `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md` — the concrete V1 build
  specification (new in this revision)

## 1. Locked knowledge architecture

Unchanged shape from 1.1: six sources in three groups. Keynote ingestion
(~2,600 slides) remains outside the active roadmap.

**Foundational and structured knowledge**
1. PQNK Science pages
2. PQNK Knowledge Papers

**Living practical knowledge**
3. Farmer Advisory
4. Approved Pedaver/PQNK YouTube knowledge and evidence
5. Approved Pedaver/PQNK Facebook knowledge and evidence

**Knowledge-expansion mechanism**
6. Refer this Question to Pedaver

## 2. Farmer Advisory is the interface, not a destination beside it

Revised from 1.1. Farmer Advisory is not only where approved answers get
published — **it is the page a farmer actually uses to ask Ask PQNK a
question**, alongside browsing existing advisories. There is no separate
`/ask-pqnk/` competing with it. Full page structure in
`ASK_PQNK_UI_ARCHITECTURE.md` §3.

`QA_KNOWLEDGE_SCHEMA.json` is confirmed as the record shape: the same
record is produced when Pedaver answers a referral (`publicationStatus:
Internal`) and becomes the public Farmer Advisory record once published
(`publicationStatus: Published`). The live, currently-empty `AdvisoryNote`
model is superseded by this richer schema going forward, per the locked
content-model decision — not stretched to fit, replaced.

## 3. Core principle

Unchanged: search the approved PQNK knowledge system, answer from that
knowledge, cite the sources, and escalate when the answer is not
sufficiently supported. Prefer not answering over inventing a PQNK
position.

## 4. Source authority — the six-tier model

Revised from 1.1's eight tiers. Full detail and reasoning in
`SOURCE_AUTHORITY_POLICY.md`.

| Tier | Content |
|---|---|
| 1 | Locked PQNK Science — absolute, never silently overridden regardless of recency |
| 2 | Current PQNK Practical Knowledge — Knowledge Papers, Farmer Advisory, Approved Media, ranked amongst each other by relevance, explicit `supersedesOrClarifies` relationship, and recency — **not** by fixed content-type order |
| 3 | Historical PQNK Formulation |
| 4 | External Knowledge / Evidence |
| 5 | Requires PQNK Review |
| 6 | Human escalation (Refer to Pedaver) |

**The key change from 1.1**: a Knowledge Paper does not automatically
outrank a Farmer Advisory record. A newly issued, explicitly-related
Farmer Advisory can be the leading citation over an older Paper on the
specific point it clarifies. Science remains the one hard exception —
never silently amended by the automated Q&A process, at any recency.

## 5. Answer flow — summary

```
Question
  -> [DETERMINISTIC] recognize intent via term/pattern vocabulary; check
     confidence (sec 9, 1.4.1)
       confident     -> use deterministic result, skip AI entirely
       inconclusive  -> [AI] extract additional tags, validated against
                        the real taxonomy, merged with the deterministic
                        result
  -> [DETERMINISTIC] search Science / Papers / Farmer Advisory (+ Media
     once active)
  -> [DETERMINISTIC] rank by relevance + authority + recency + relationship
  -> [DETERMINISTIC] sufficiency gate
       insufficient -> [DETERMINISTIC] refer to Pedaver, register question
                        cluster -- AI composition is never invoked
       sufficient    -> [AI, GROUNDED + deterministically validated]
                        compose the answer in English, strictly from the
                        already-retrieved, already-ranked, already-cited
                        sources
                     -> [DETERMINISTIC] validate every claim on source-
                        membership, authority, and conservative synthesis
                        boundary (sec 18.2, 1.4.1) -- not lexical overlap;
                        strip claims that fail; if too little survives,
                        fall back to refer rather than show a thin or
                        unsupported answer
```

AI touches at most two steps — intent extraction only when the
deterministic pass is inconclusive, composition only when the gate is
sufficient — both bracketed by deterministic logic on every side. Full
mechanism in §18; retrieval/ranking/gate detail in
`ASK_PQNK_RETRIEVAL_POLICY.md`.

## 6. Answer style and citation

Unchanged from 1.1: Answer / Why / What to do / Sources /Watch-Read, source
-backed, expandable on request. Citation format extended to name Farmer
Advisory explicitly:

```
Waterlogging and Yellowing — Pedaver Farmer Advisory — 06:42
```

## 7. Text and voice

Unchanged principle from 1.1: both required in the V1 architecture, voice
*activation* staged later (see the V1 spec for exact phasing — media and
voice are explicitly kept out of V1 itself, but the data model already
carries the modality fields needed so nothing is retrofitted later).
Same-modality-in/same-modality-out — a voice question gets a voice answer
— but per §8, that voice answer is now composed in English and spoken via
English text-to-speech, same as the text path; a voice answer still always
ships its readable transcript and citations alongside the audio, never
audio-only.

## 8. AI-assisted understanding and composition, under deterministic control

**Revision 1.4, locked.** Ask PQNK understands a question asked in
English, Urdu, Roman Urdu, or Punjabi — using AI for open-ended phrasing,
backed by a deterministic taxonomy vocabulary that runs regardless (§9)
— and composes the authoritative answer in English only, using AI to
synthesize fluent prose from material that deterministic retrieval has
already found, ranked, and cited. **AI is never the source of the answer's
facts and never decides whether to answer or refer** — both of those
remain fully deterministic, computed before AI composition is invoked (§5,
§18).

Two things stay true from 1.3, unchanged by reinstating AI:

- Retrieval still matches the language-independent canonical taxonomy
  regardless of input language (full detail in
  `ASK_PQNK_RETRIEVAL_POLICY.md` §5). AI-assisted intent understanding
  feeds this same taxonomy — it does not replace or bypass it (§9, §18).
- Composition stays English-only. The site's existing Translate facility
  covers a farmer's own translation need, so AI composition is never asked
  to generate in another language. `NormalizedIntent.language` is still
  detected and reported — for analytics and for the one remaining
  language-varying output, §11's referral message — never as an
  instruction about what language to *answer* in.

What Revision 1.4 changes from 1.3: composition is no longer a fixed
template assembled from the top few source snippets. AI is now allowed to
synthesize a more fluent, more directly-responsive answer — but only from
those same retrieved snippets, under the grounding controls in §18. This
is a capability upgrade in *how well* Ask PQNK explains an answer, not a
loosening of *what* it's allowed to assert.

## 9. Farmer language, not formal language

Unchanged principle from 1.1, and the part of the language story every
revision since has kept and strengthened: practical farmer terminology
(Roman Urdu, Urdu script, Punjabi expressions, colloquial names —
"paani," "gehun," "makai," and the like) still normalizes internally to
the controlled taxonomy, because retrieval depends on it — this has
nothing to do with what language the answer comes back in. The farmer
never needs to know that taxonomy exists. Original wording is always
preserved (`questionCluster.variantQuestions`, `farmerLanguageWording` on
published records) because it improves future retrieval and gives Pedaver
the real phrasing to review.

**Revision 1.4: two layers, not one, and neither is a single point of
failure.** AI-assisted understanding handles open-ended, unanticipated
phrasing across all four understood languages — genuinely the strongest
argument for using AI anywhere in this system, since a fixed vocabulary
can never cover everything a farmer might write. The deterministic
term/pattern vocabulary already built (`mockProvider.ts`'s
`TERM_VOCABULARY`/`TRIGGERS`) is free, instant, and not dependent on an
external call succeeding.

**Revision 1.4.1, approved correction: the AI layer is now conditional,
not unconditional.** The deterministic recognizer always runs first,
against every question, at zero cost. Its result is checked for
*confidence* — a named, deterministic test (currently: at least one
phrase-level `TRIGGERS` pattern matched, or at least two distinct
crop/fieldProblem/scienceDomain tags recognized via `TERM_VOCABULARY` —
tunable, §17). **If the deterministic pass is confident, the AI
intent-extraction call is skipped entirely** — not run redundantly beside
it, not called "just in case." AI is invoked for understanding only when
the deterministic pass is inconclusive: too few or no tags recognized, or
a phrasing shape the vocabulary doesn't cover. This is a genuine cost and
latency reduction (most well-formed, on-topic farmer questions are
expected to resolve deterministically — the same reasoning 1.3 already
established about the vocabulary's coverage, §18.4), and it further
narrows AI's footprint to exactly the cases where it earns its cost: real
ambiguity, not routine phrasing.

When AI is invoked, its output is still never trusted outright:

- **AI output is validated, not trusted.** Any crop/fieldProblem/
  scienceDomain tag AI extracts is checked against the real taxonomy
  vocabulary (`taxonomy.json`) before use; a tag AI invents that isn't a
  real value is discarded, never passed to retrieval. AI can miss a valid
  tag; it cannot fabricate one that then affects ranking.
- **The two layers' results merge (union of tags) rather than one
  replacing the other**, on the rare occasion the deterministic pass was
  inconclusive but still found something: a partial deterministic match
  is never thrown away just because AI was also consulted.
- **If the AI call fails, times out, or errors, the deterministic
  vocabulary's result still stands.** Intent understanding degrades to
  narrower-but-correct, never to broken — a farmer's question still gets
  processed on whatever the deterministic pass already found, exactly as
  when AI is skipped for being unnecessary.

## 9a. Compatibility note: multiple providers behind one interface

Because `AiProvider` already isolates provider choice (`ai/index.ts`'s
`AI_PROVIDER` switch), a deterministic-only implementation (the existing
`MockAiProvider`) and a real AI-backed one (`AnthropicAiProvider` or
equivalent) both remain valid ways to satisfy the same interface. Local/
offline testing of the deterministic scaffolding (retrieval, ranking,
gate, referral, the Farmer Advisory loop) can keep using the mock provider
without any AI call. **Production V1, per this revision, must run a real
AI provider** for the two roles in §8 — the mock provider is a test
double for everything AI is deliberately excluded from, not a substitute
for AI where this revision requires it.

## 10. Question clustering — the corpus-gap signal

Unchanged mechanism from 1.1, now explicitly framed as *ongoing and
permanent*, not a one-time detection pass: every question, answered or
referred, is matched into a `questionCluster`
(`QA_KNOWLEDGE_SCHEMA.json`). Repeat count and open-gap status drive
Pedaver's review priority (`PEDAVER_REFERRAL_WORKFLOW.md` §5, §9). This is
the mechanism behind the closing principle in §16.

## 11. Refer to Pedaver — single authority, permanent output, one-week objective

Locked in this revision:

- **Pedaver is the sole approval authority.** No second reviewer, no
  dual sign-off. Pedaver issuing an answer is the approval. Version
  history is preserved regardless, so a later correction is traceable.
- **Published Farmer Advisory knowledge is permanent.** No scheduled
  deletion of an approved record. What *is* time-limited is personal
  contact information and unpublished submission evidence, which live in
  a structurally separate place from the permanent knowledge record — see
  `PEDAVER_REFERRAL_WORKFLOW.md` §13.
- **Operating objective: Pedaver answers within one week** of submission —
  a prioritization target the queue surfaces against, not an enforced
  technical constraint.
- **No account system.** A reference number, generated with enough
  entropy to serve as its own access credential, lets a farmer check
  status or retrieve a published answer without logging in — full design
  in `PEDAVER_REFERRAL_WORKFLOW.md` §10a.

The locked trigger wording is unchanged:

```
This question needs a Pedaver response.

I could not find enough authoritative PQNK knowledge to answer this
reliably. You can refer this question to Pedaver for review.

Refer to Pedaver →
```

This message is the one place Ask PQNK's output still varies by language
even after Revision 1.3 — but as a fixed, pre-written string picked from a
static per-language table, not generated. Translating one unchanging
sentence into four languages once is not the same commitment as generating
open-ended answers in those languages, and costs nothing per question. See
§18.

## 12. Authenticated media sources — locked, but architecturally deferred from V1

Exactly three sources are authenticated Pedaver/PQNK evidence sources:
`facebook.com/Pedaver`, `youtube.com/@pedaverpqnk3167`,
`youtube.com/@aasifsharif`. Authentication determines *discoverability*,
never automatic authority — an authenticated source's old material still
goes through the same tagging and conflict rules as everything else, and
never silently overrides current doctrine. Full detail in
`MEDIA_INGESTION_PLAN.md` §2. Media indexing itself is not part of V1 (see
the V1 spec) but the schema and source list are locked now so nothing
about V1's data model needs to change when media indexing begins.

## 13. Voice architecture — summary

Speech-to-text is an input adapter ahead of the retrieval pipeline;
text-to-speech is an output adapter after it. Everything in between is
already modality-agnostic because it operates on canonical taxonomy
matching, not raw text. This is why voice does not require restructuring
the core pipeline later — only the speech-provider integration itself is
new work, deferred out of V1. **Revision 1.3 simplifies this further**:
since composition is English-only, text-to-speech only ever needs to speak
English text, regardless of the question's language — one voice, not a
voice per supported language.

## 14. Acceptance scenarios

Revised from 1.1 for the Revision 1.3 language simplification:

**Scenario A** — a farmer asks by voice, in Urdu, "بارش کے بعد میری فصل
پیلی کیوں ہوگئی؟" Ask PQNK understands the question (Urdu detected,
taxonomy-normalized), searches Science, Papers, Farmer Advisory, and (once
active) indexed media, distinguishes possible mechanisms from a confident
diagnosis, answers in English with a voice response plus readable English
text and sources, and refers to Pedaver — using the fixed, pre-written
Urdu referral message (§11) — if the evidence can't reliably answer the
field-specific case. It must not diagnose blindly from a generic symptom.
The local V1 build's deterministic-only provider was verified against this
exact scenario (English question and Urdu question both tested; see the
V1 implementation report) — confirmed: Urdu input is correctly detected
and taxonomy-matched, and the answer composes in English. That test
verified the deterministic scaffolding this scenario depends on
(retrieval, ranking, gate, referral) but predates Revision 1.4's AI
composition — production behavior additionally requires the grounding
validation in §18 to be exercised against a real AI provider before this
scenario counts as production-verified.

**Scenario B** — a farmer asks, in text, "Water is not going into my
soil." A successful response provides Answer, What to check, Read the
Science, Read the detailed guidance, Farmer Advisory (if one exists), and
Watch — falling back to "This question needs a Pedaver response" if
insufficient.

## 15. Implementation sequence — V1 is now specified separately

This revision's central instruction: **do not let media or voice delay a
working V1 core.** The detailed, concrete build specification for V1 lives
in `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md` — components, data model,
infrastructure, security, and sequence. In brief, the phase shape:

- **V1** — Farmer Advisory + Ask PQNK text interface, Science + Knowledge
  Papers + Farmer Advisory retrieval, multilingual question understanding
  with English-composed answers, citations, sufficiency gate, Refer to
  Pedaver, permanent Q&A knowledge structure.
- **V1.1 and beyond** — voice activation and media ingestion, both
  architecturally compatible from V1's data model, built once V1 is
  working and without blocking it.

## 16. The governing objective

Unchanged in spirit, restated as the closing principle: a farmer should be
able to ask PQNK naturally — in their own words, language, and eventually
their own voice — without knowing where the knowledge is stored. If PQNK
already knows, Ask PQNK finds it, explains it, and shows the evidence. If
PQNK does not yet know, the question reaches Pedaver, gets answered,
becomes permanent Farmer Advisory knowledge, and makes Ask PQNK more
knowledgeable for the next farmer. This is a self-expanding knowledge
system, not a chatbot — the questions themselves are meant to help
determine what Pedaver documents, demonstrates, or researches next.

## 17. Open policy decisions requiring approval before coding

Narrowed sharply by this revision — most of 1.1's list is now locked.
Remaining, all addressed concretely in the V1 spec but flagged here for
final sign-off:

- Exact reference-number format and entropy requirement.
- Exact WhatsApp/email consent copy.
- Whether the one-week response objective is ever shown publicly.
- **Which AI provider to use in production** (§18) — architecture is
  provider-agnostic behind `AiProvider`; the choice itself (Anthropic or
  otherwise) is a decision for you, not made here.
- **The grounding-validation thresholds** (§18.2): the deterministic
  confidence test that decides whether AI intent extraction is skipped
  (§9); the conservative-synthesis-boundary parameters (how much a claim
  may exceed its cited source's own length before being judged an
  unbounded elaboration); and the minimum surviving-claim bar before the
  system falls back to Refer instead of showing a thinned answer.
  Lexical-overlap logging thresholds (§18.2, secondary diagnostic only)
  are a lower-stakes tuning knob, not a correctness-affecting one. All are
  implementation parameters, not locked here — they should be tuned
  against real questions before being treated as final.

## 18. AI role under deterministic control (Revision 1.4)

**Locked instruction this revision implements:** AI stays in Ask PQNK V1,
confined to understanding the question and composing the answer's prose —
and it must never be the authority or source of PQNK knowledge. Retrieval,
authority ranking, citations, sufficiency determination, and the
Refer-to-Pedaver decision stay deterministic. This section states exactly
where AI is used, where it is prohibited, how that prohibition is
technically enforced (not just prompted for), and how an insufficient
question still reaches Pedaver and becomes searchable knowledge.

### 18.1 Where AI is used, and where it is prohibited

| Capability | AI role | Enforcement |
|---|---|---|
| Understanding a farmer's natural-language question | **AI, conditional** — invoked only when the deterministic term vocabulary (§9) doesn't already resolve the question confidently; extracts taxonomy tags from open-ended phrasing across English/Urdu/Roman Urdu/Punjabi | Deterministic recognizer always runs first and decides, via a named confidence test, whether AI is even called (§9, 1.4.1); when it is called, extracted tags are validated against the real taxonomy before use, invented tags are discarded; AI failure or skip both degrade to vocabulary-only, never to a broken request |
| Retrieving/synthesizing the most relevant Science, Paper, and Advisory material | **Prohibited** — deterministic only | Taxonomy-overlap ranking (`retrieval.ts`); AI is never consulted on what counts as relevant |
| Authority ranking (which source leads, Science-exception handling) | **Prohibited** — deterministic only | `SOURCE_AUTHORITY_POLICY.md` §4's tier/relevance/relationship/recency rules; AI never reorders or overrides this |
| Staying strictly grounded in PQNK knowledge | **AI composes, deterministically checked** — see 18.2 | AI receives only retrieved source text as context; every claim it produces is validated post-generation against that same text (18.2) — grounding is enforced by a code-level check, not by trusting the prompt |
| Citing supporting sources | **Prohibited** — deterministic only, but AI must attribute each claim to one | Citations are the ranked candidate list, unchanged by composition; AI's per-claim source attribution is itself validated (18.2), not taken on faith |
| Recognizing when knowledge is insufficient | **Prohibited** — deterministic only | `sufficiency.ts`'s named checklist decides Answer vs. Refer *before* AI composition is ever invoked (18.3). AI is never asked "is this enough?" — it never sees an insufficient question at all |
| Triggering "Refer this Question to Pedaver" | **Prohibited** — deterministic only | Downstream of the deterministic gate, same as always |
| Composing the answer's prose | **AI, grounded and validated** | See 18.2 |

The pattern across every "Prohibited" row is the same: those decisions are
made and finalized *before* AI is invoked, using only deterministic logic,
so there is no step at which AI could have influenced them even if it
tried. AI is never given the sufficiency question, never given the
candidate pool to re-rank, and never given the option to decide relevance
— it receives a pre-decided, pre-ranked, pre-cited set of sources and is
asked to explain them.

### 18.2 How grounding is enforced — a code-level check, not a prompt promise

A prompt instruction ("answer only from the sources") is necessary but not
sufficient — models can still drift, especially on a topic the base model
has confident general knowledge about (many of PQNK's claims run counter
to conventional agricultural advice, which is exactly the case where an
ungrounded model is most likely to "correct" PQNK toward the mainstream
view). V1 therefore enforces grounding structurally.

**Revision 1.4.1, approved correction: lexical/keyword overlap is demoted
from primary validator to secondary diagnostic.** Word-overlap similarity
is a weak proxy for "is this claim actually supported" in both directions
— it rejects a valid paraphrase that uses different words for the same
fact, and it can accept a claim that reuses a source's vocabulary while
asserting something the source doesn't actually say (a model can echo
keywords without echoing meaning). The primary gate is now three checks
that constrain what a claim can be *structurally*, not how similar its
wording looks:

1. **Context isolation.** Unchanged. The composition call receives *only*
   the retrieved, already-ranked source snippets (`RetrievedSource[]`) and
   the farmer's question. No system message grants it general knowledge
   use; no browsing or outside-tool access; no conversation memory across
   questions. It cannot answer from anything it wasn't handed.
2. **Structured, per-claim output — not free prose.** Unchanged. The model
   returns a list of claims, each tagged with the index of the *specific*
   retrieved source it draws from: `{ claims: [{ text, sourceIndex }],
   practicalAction: { text, sourceIndex } }`. A claim with no defensible
   source to point to has nowhere to attach in this schema.
3. **Deterministic post-validation of every claim** — the corrected
   primary gate, run in code after the model responds, before anything is
   shown to a farmer:
   - **Source-membership.** `sourceIndex` must reference an actually-
     retrieved source. Any claim citing an out-of-range or fabricated
     index is dropped outright.
   - **Authority.** The cited source must independently clear the same
     eligibility bar the sufficiency gate already required of the
     retrieved set (`sufficiency.ts`'s Tier 1–2 / "Current / Approved"
     rule, re-checked here rather than assumed from how the claim arrived
     — a defense-in-depth check, not a redundant formality: it means a
     claim's authority is verified against the source it actually cites,
     independent of whatever set it was handed in).
   - **Conservative source-bound synthesis.** The claim must stay within a
     bounded elaboration of that one cited source's own text — not
     wildly longer or broader than a close paraphrase of that specific
     passage would produce, and not near-empty. This bounds *how far the
     model is allowed to synthesize beyond the source's own scope*, which
     is a different and stronger constraint than word-similarity: a
     terse, well-worded paraphrase with zero shared vocabulary can pass;
     a claim padded with unsupported elaboration cannot, even if it
     borrows the source's own words to do it.
   - Surviving claims are what gets rendered as the "Why" section; dropped
     claims never reach the farmer, silently.
   - **Lexical overlap is still computed, but only as a secondary
     diagnostic** — logged alongside each claim's outcome, feeding the
     claim-drop-rate analytics already planned
     (`ASK_PQNK_V1_IMPLEMENTATION_SPEC.md` §10 step 9) so overlap can be
     watched for tuning the synthesis-boundary threshold, or used later
     to flag passing claims for human spot-review. It never decides, by
     itself, whether a claim is shown.
4. **Safe degradation, not a thin answer.** Unchanged. If validation drops
   enough claims that what remains is too little to constitute a real
   answer (e.g., zero claims survive, or the practicalAction claim itself
   fails validation), the system does not display a partial or hedged
   answer. It converts the response to Refer to Pedaver — the same
   deterministic path an insufficient retrieval takes (18.3). **AI failing
   to stay grounded degrades to the safe deterministic fallback, never to
   a guess reaching a farmer.**

This is what makes "AI must never allow the model to complete the answer
from its own knowledge" a structural property rather than a hope: even if
the model ignores its instructions and states something true-sounding but
unsupported, step 3 has no membership/authority/boundary path for that
claim to survive on merely because it shares vocabulary with a real
source, so it's removed before rendering. The exact synthesis-boundary
parameters (and the secondary overlap-logging threshold) are
implementation parameters to tune against real questions (§17) — the
mechanism (isolate context → structured per-claim output → validate on
membership/authority/boundary → degrade safely) is the locked part.

### 18.3 How an insufficient question still reaches Pedaver and becomes searchable knowledge

Unchanged by this revision, and worth restating precisely because it's the
system's actual growth mechanism regardless of how composition works:

```
Question -> [deterministic] retrieval + ranking + sufficiency gate
  |
  +-- SUFFICIENT --> [AI, grounded + validated, 18.2] compose answer
  |                  --> farmer sees Answer/Why/What-to-do + citations
  |
  +-- INSUFFICIENT (gate fails, OR grounding validation degrades a
      would-be answer down to "not enough surviving content", 18.2 step 4)
       |
       v
      [deterministic] register/increment question cluster
       |
       v
      Farmer clicks "Refer to Pedaver" -> queue entry created, reference
      number issued (PEDAVER_REFERRAL_WORKFLOW.md)
       |
       v
      Pedaver answers via the Inbox, Publishes -> Farmer Advisory record
      written, publicationStatus: Published (single-authority, §11)
       |
       v
      The SAME deterministic retrieval that gated this question now
      indexes the new record immediately -- no rebuild, no redeploy
      (`ASK_PQNK_V1_IMPLEMENTATION_SPEC.md` §6). The next farmer who asks
      the same or a similarly-worded question gets a SUFFICIENT gate
      result, and AI composition now has a grounded source to draw from
      that didn't exist before.
```

Two guarantees this preserves: first, AI never gets a second chance to
answer a question the deterministic gate refused — there is no path from
"insufficient" back into composition. Second, the corpus-growth loop is
identical whether composition is AI-driven (this revision) or
template-driven (1.3's approach) — growth comes from Pedaver answering
real gaps and that answer becoming an immediately-retrievable, immediately
citable Tier 2 source, not from anything about how prose gets assembled.
AI composing more fluent answers changes how well *already-sufficient*
questions get explained; it does not change what counts as sufficient, and
it adds nothing to the corpus itself — only Pedaver's publish action does
that.

### 18.4 What this reverses from Revision 1.3, and why

1.3 recommended shipping V1 with zero external AI provider, reasoning that
five of six named capabilities were already deterministic and the sixth
(grounded composition) could be a constrained template rather than a model
call. That reasoning about *which capabilities can be deterministic* still
holds — nothing in 18.1's "Prohibited" rows changed. What changed is the
instruction: AI should be used for understanding and composition where it
genuinely improves the farmer's experience (more natural question
handling, more fluent and directly-responsive answers), provided grounding
is enforced structurally rather than assumed. 18.2's four-layer check is
the reason this can be true simultaneously with "AI is never the authority
or source of PQNK knowledge" — the two are not in tension once grounding
is a code-level gate instead of a prompt-level request.

**Production V1 requires a real AI provider** for the two AI-marked rows
in 18.1 (§9a). Provider selection remains open (§17); the `AiProvider`
interface keeps that choice isolated from everything deterministic.

### 18.5 Correction (Revision 1.4.1): why lexical overlap couldn't be the primary gate

1.4 as first written used lexical/keyword overlap as the primary
claim-acceptance check. Approved correction: that check is real signal but
the wrong thing to gate on, for two concrete failure modes:

- **False rejection.** A grounded, accurate paraphrase that happens to use
  different words than the source snippet (a common and desirable thing
  for AI composition to do — "conservative" doesn't mean "verbatim") could
  fail a word-overlap threshold despite being fully supported, pushing
  genuinely good answers toward an unnecessary Refer.
- **False acceptance.** A claim can reuse a source's own vocabulary —
  crop names, domain terms, distinctive phrases — while still asserting
  something that source's text doesn't actually say. Overlap checks *word
  reuse*, not *entailment*; a model motivated (even unintentionally) to
  pass the check can do so by echoing keywords around an unsupported
  claim.

The corrected design (18.2) gates on **structure instead of similarity**:
does the cited source exist and independently qualify as authoritative
(membership + authority — checks that don't care about wording at all),
and is the claim's elaboration boundedly close to that one source's own
text rather than free-ranging (synthesis-boundary — a check on *how much
new content the model added*, not on *which words it chose*). This is
harder to satisfy by accident and harder to game by design, since it
doesn't reward vocabulary reuse on its own. Lexical overlap remains useful
as exactly what it's good at: a cheap, continuous signal for monitoring
and threshold-tuning (§18.2 point 3, `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`
§10 step 9) — just not as the line between "shown to a farmer" and
"dropped."

## 19. Ask PQNK's generated answer is not Pedaver knowledge (Revision 1.4.2, locked)

Pre-deployment hardening, made explicit and enforced in code rather than
left implicit in §18's "Prohibited" table:

**ASK PQNK GENERATED ANSWER ≠ PEDAVER KNOWLEDGE.**

An answer AI composes from existing PQNK sources (§18) is a conversational
synthesis only. It is grounded (§18.2), but grounded is not the same as
*authoritative* — it must never be written back into Farmer Advisory,
never indexed as a new knowledge record, and it acquires no authority
merely because Ask PQNK generated and validated it. Grounding controls
what a generated answer is allowed to *say*; it says nothing about whether
that answer gets to become part of the corpus. Those are different
questions, and only the second one is what this section locks down.

**Only one pathway creates new authoritative Farmer Advisory knowledge:**

```
Insufficient existing knowledge
  -> Refer this Question to Pedaver
  -> Pedaver answers (routes/inbox.ts, authenticated)
  -> Pedaver publishes (the same action, §11 — no separate publish step)
  -> Farmer Advisory record becomes authoritative and immediately
     searchable by Ask PQNK (ASK_PQNK_V1_IMPLEMENTATION_SPEC.md §6)
```

There is no second pathway. An Ask PQNK answer, however well-grounded,
terminates at the farmer — it is never fed back into retrieval, ranking,
or the knowledge corpus.

**How this is enforced, not just asserted:**

1. **No AI-reachable code path can write to `farmer_advisory`.** Every
   module under `ai/` (`mockProvider.ts`, `anthropicProvider.ts`,
   `groundingValidator.ts`) is read-only with respect to the database — none
   of them import the database module at all. The sole INSERT site for
   `farmer_advisory` in the entire service is `POST /inbox/:id/publish`
   (`routes/inbox.ts`), which requires an authenticated Pedaver session
   (`auth.ts`). `POST /api/ask` — the public, AI-composed answer endpoint —
   has no write capability of any kind.
2. **The insert itself is guarded by an explicit, testable assertion**
   (`provenance.ts`'s `assertPedaverAuthoredPublication`), not merely by
   the fact that the current code happens to hardcode `approvedBy` to
   `"Pedaver"`. The guard independently requires: `approvedBy` is exactly
   `"Pedaver"`; `publicationStatus` is exactly `"Published"`; and the
   record traces to a real `referral_queue` entry and its reference
   number. A future code change that tried to loosen any of these fails
   loudly rather than silently.
3. **Provenance is recorded directly on the record, not only inferable.**
   `QA_KNOWLEDGE_SCHEMA.json`'s `approvedBy` field (always `"Pedaver"`) IS
   the answer-author provenance field — no separate field was added, since
   one already existed and duplicating it would only create a second
   source of truth to keep in sync. New this revision: `originQueueId`
   (already existed) is now joined by `originReferenceNumber` — the
   human-facing `PQNK-Q-XXXXXXXX` reference number stored directly on the
   record, so provenance back to the originating referral survives even if
   `referral_queue` rows are ever archived independently. Publication
   status (`publicationStatus`) and date (`approvedDate`) were already
   locked fields from Revision 1.2.
4. **Only `publicationStatus: Published` is ever retrievable.**
   `retrieval.ts`'s only query against `farmer_advisory` filters on
   `publication_status = 'Published'`; `referral_queue` — where drafts,
   in-progress answers, and unpublished ("Private") decisions actually
   live — is never queried by retrieval, ranking, or composition anywhere
   in the service. A draft, an unanswered referral, an answer Pedaver
   chose to keep private, and a record still under review are all
   structurally identical in one respect: none of them can be cited by Ask
   PQNK, because none of them are reachable by the one query retrieval
   ever runs.
5. **`supersedesOrClarifies` is now a real, populated mechanism**, not
   ranking logic (`retrieval.ts`, `SOURCE_AUTHORITY_POLICY.md` §4 point 2)
   written against a field nothing ever set. Publishing a Farmer Advisory
   record can name the specific older record(s) it supersedes or
   clarifies; those older records are never deleted or edited — only their
   own `supersededBy` pointer is set, so both the old and new record
   remain independently queryable and the full history stays intact. This
   is the concrete mechanism for "a later Advisory can supersede/clarify
   an older one without deleting historical provenance."

Nothing about this section changes §18's mechanism for how a *given*
answer gets composed and grounded — it draws the separate, sharper line
around what happens to that answer afterward.
