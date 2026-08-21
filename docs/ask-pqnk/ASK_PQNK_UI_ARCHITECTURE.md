# Ask PQNK UI Architecture — 1.2

Status: Draft for review. Architecture and placement proposal only. **No
implementation, no header changes.**

Depends on: current locked navigation in `src/components/Header.tsx`,
`ASK_PQNK_RETRIEVAL_POLICY.md`, `PEDAVER_REFERRAL_WORKFLOW.md`.

**Revision 1.2 change — supersedes 1.1's §6 recommendation:** 1.1 proposed
a new, additive homepage section and left overlay-vs-dedicated-page as an
open choice across several entry points. That created a second, competing
knowledge destination. **Locked now: Farmer Advisory is the Ask PQNK
interface.** There is one destination for "ask a new question," not
several. The global header control still replaces Search, but it leads
into Farmer Advisory rather than opening a separate self-contained overlay
experience or a standalone homepage block.

## 1. What "replaces Search" means now

Unchanged from 1.1 in mechanics — same icon slot, same sizing, same
utility-bar position, conceptually `Translate | ASK PQNK | Contact`. What
changes in 1.2 is the destination: clicking/tapping the Ask PQNK control
navigates to **Farmer Advisory** (`/advisory`) rather than opening an
in-place overlay with its own separate conversational UI. This removes the
"which entry point is the real one" ambiguity 1.1 left open.

**What happens to the current Search behavior**, unchanged from 1.1: the
existing quick-filter-Papers overlay is retired. It is superseded by
Farmer Advisory's own retrieval (Science + Papers + Farmer Advisory,
§4 below), which already surfaces matching Papers as citations — nothing
is lost, the capability moves to a better-suited destination.

## 2. What does NOT change

Unchanged from 1.1: nav array, logos, identity-band spacing, Translate and
Contact position/behavior, mobile hamburger accordion, and — explicitly
reconfirmed — **`/papers/`'s own search/filter UI is untouched**. It
remains the tool for browsing/filtering a known list of Papers by
taxonomy; Farmer Advisory/Ask PQNK is the tool for asking an open question
and being routed to whichever knowledge source actually answers it. Both
exist, for different intents, unchanged from 1.1's position on this.

## 3. Farmer Advisory page structure

Revised from 1.1's separate-homepage-block idea. Farmer Advisory
(`/advisory`) becomes a single page with three zones:

```
+-----------------------------------------------------+
| ASK A QUESTION                                       |
| [ text input: "What's going on in your field?" ]      |
| [ mic icon — reserved slot, inert until V1.2 voice ]  |
+-----------------------------------------------------+
| ANSWER ZONE (appears only after a question is asked)  |
|   Answer / Why / What to do                           |
|   Sources: Science, Knowledge Papers, Farmer Advisory  |
|   Watch: Media (once media indexing is active)         |
|   -- or, if insufficient --                            |
|   "This question needs a Pedaver response."            |
|   [ Refer to Pedaver -> ]  (opens the submission form,  |
|     sec 5, with the question pre-filled)                |
+-----------------------------------------------------+
| BROWSE EXISTING FARMER ADVISORY                        |
|   Existing published records, filterable by crop /      |
|   field problem / science domain (the richer taxonomy — |
|   see sec 6 on reconciling this with today's 5-category  |
|   AdvisoryNote browse, which this supersedes)             |
+-----------------------------------------------------+
```

This reflects the locked flow precisely: a farmer arriving at Farmer
Advisory can ask Ask PQNK a question, get an immediate cited answer where
one exists, see the supporting Science/Papers/Advisory/Media, or refer to
Pedaver — all without leaving the page or being routed to a different
"chatbot" destination. The third zone (browse) is what makes Farmer
Advisory still recognizably itself, not merely a rebrand of a search box:
existing farmers-facing content remains directly browsable, not hidden
behind having to already know what to ask.

## 4. Ask PQNK question-and-answer flow (V1: text only)

```
Farmer types a question on /advisory
  |
  v
Intent understanding, normalization (ASK_PQNK_RETRIEVAL_POLICY.md sec 2)
  |
  v
Search Science + Knowledge Papers + Farmer Advisory
  (Media search included once that phase is active, same pipeline slot —
   see ASK_PQNK_V1_IMPLEMENTATION_SPEC.md for V1's actual scope)
  |
  v
Rank (relevance + authority + recency + relationship,
  SOURCE_AUTHORITY_POLICY.md sec 4) -> sufficiency gate
  |
  +-- Sufficient --> render Answer / Why / What to do / Sources, in
  |                  English (Revision 1.3 -- the site's Translate
  |                  facility covers a farmer's own language; see
  |                  ASK_PQNK_ARCHITECTURE.md sec 8, sec 18)
  |
  +-- Insufficient --> render "This question needs a Pedaver response,"
                       offer Refer to Pedaver (sec 5), pre-filled
```

## 5. Referral flow, as surfaced in the UI

```
Farmer clicks "Refer to Pedaver →" (from the answer zone, question
  already pre-filled)
  |
  v
Submission form: optional crop / region / field condition / photo / video
  / voice / name / WhatsApp / email  (PEDAVER_REFERRAL_WORKFLOW.md sec 4)
  |
  v
Submit -> reference number shown to the farmer immediately, with a plain
  explanation: "Pedaver typically answers within a week. You can check
  back here with this number, or we'll message you if you gave contact
  details."
  |
  v
Farmer Advisory page gains (or already has) a small, unauthenticated
  "Check your question" lookup: enter reference number -> status, and
  once published, a direct link to the resulting Advisory record
  (PEDAVER_REFERRAL_WORKFLOW.md sec 10a)
```

## 6. Reconciling today's Farmer Advisory with this structure

The live page (`src/app/advisory`, `AdvisoryNote` in `advisory.ts`) is a
5-category browse of WhatsApp-sourced notes, currently empty. Per the
locked content-model decision (`QA_KNOWLEDGE_SCHEMA.json`
`notes.advisoryModelReconciliation`), the page's **browse zone** (§3) is
the evolution of this existing page, not a new page beside it — the same
URL, the same section in navigation, richer underneath. The 5 existing
`AdvisoryCategorySlug` values can remain as a coarse filter option
alongside the finer taxonomy (crop/problem/domain) rather than being
discarded outright; exact migration mechanics are a V1 implementation
detail (see `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`).

## 7. Voice input surface — unchanged principle from 1.1, now sited on Farmer Advisory

The question input on `/advisory` reserves a microphone affordance from
V1's first layout even though it stays inert until V1.2 activates
speech-to-text (`ASK_PQNK_ARCHITECTURE.md` §15). Once active, a voice
answer renders with both an audio player and the full readable text/
citations in the same Answer Zone (§3) — never audio-only.

## 8. Homepage, Papers hub, and Science page entry points

Revised from 1.1: these are no longer separate competing destinations,
they are **links into Farmer Advisory**, optionally pre-filled:

- **Homepage**: unchanged placement idea (an additive section after
  "Where Should You Go Next"), but its content is now a short framing line
  plus a single "Ask PQNK" link/button that navigates to `/advisory`,
  rather than an embedded question box of its own.
- **Knowledge Papers hub (`/papers/`)**: a contextual "Ask PQNK about
  this" link near the existing filter UI, navigating to `/advisory`
  (optionally with the current filter context carried over as a
  pre-filled starting point) — not a second answer surface living inside
  `/papers/` itself.
- **Science pages**: same pattern, lower priority, deferred until Ask PQNK
  is proven on Farmer Advisory first.

## 9. What this document does not do

- Does not specify visual design beyond the three-zone structure in §3.
- Does not modify `Header.tsx`, the nav array, the mobile accordion, or
  `PapersBrowser.tsx`.
- Does not implement the mic button, speech-to-text, text-to-speech, or
  the actual migration of `AdvisoryNote` content.
- Does not resolve the exact reference-number lookup's technical
  implementation (that's in `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`).
