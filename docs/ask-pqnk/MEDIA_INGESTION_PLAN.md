# Media Ingestion Plan — Ask PQNK 1.2

Status: Draft for review. Architecture only. **No ingestion begins in this
phase** — this document designs the process, it does not run it. **Not part
of V1** — see `ASK_PQNK_V1_IMPLEMENTATION_SPEC.md`.

Depends on: `MEDIA_KNOWLEDGE_SCHEMA.json`, `SOURCE_AUTHORITY_POLICY.md`.

**Revision 1.2 changes:** the authenticated source list is now locked to
three named channels/pages (§2), replacing 1.1's "to be finalized with
Pedaver" placeholder. Everything else carries forward from 1.1 (pilot batch
size of 20–30 items, the video-advisory naming clarification in §1a).

## 1a. Naming clarification: video advisories vs. the Farmer Advisory knowledge source

A Pedaver lecture delivered on video can itself be an "advisory" in the
everyday sense — a farmer-facing recommendation captured on camera. That is
a `contentType` on a **Media Record** (`MEDIA_KNOWLEDGE_SCHEMA.json`), not
the same thing as a published **Farmer Advisory record**
(`QA_KNOWLEDGE_SCHEMA.json`), which is always structured text, reviewed and
approved against the full taxonomy. The two are related — a video advisory
is exactly the kind of source that might get transcribed, summarized, and
turned into a proper Farmer Advisory text record (via the same review path
described in `PEDAVER_REFERRAL_WORKFLOW.md` §9–10, just without an
originating farmer question) — but they are not interchangeable, and
ingestion tagging should never mark a video `contentType` in a way that
implies it already *is* a Farmer Advisory record. Use
`relatedFarmerAdvisories` (`MEDIA_KNOWLEDGE_SCHEMA.json`) to link the two
once such a text record actually exists.

## 1. Principle: controlled indexing, not a scrape

Every media item that enters the index goes through discovery, metadata
collection, segmentation, taxonomy tagging, and authority review — the same
rigor the Knowledge Paper taxonomy already went through. Nothing is
auto-approved by virtue of being on the official channel/page. This
document exists specifically because "point a scraper at the channel" is the
wrong shape of solution for a system whose core promise is that every answer
is traceable and reviewed.

## 2. Discovery

**Authenticated source list — LOCKED (Revision 1.2).** Exactly three
channels/pages are Pedaver-authenticated knowledge/evidence sources.
Discovery does not crawl outward from this list, and no other source is
treated as authenticated until a new, explicit decision adds it:

| Platform | Source |
|---|---|
| Facebook | `www.facebook.com/Pedaver` |
| YouTube | `youtube.com/@pedaverpqnk3167/videos` |
| YouTube | `youtube.com/@aasifsharif` |

- Content posted through these three sources is treated as authenticated
  Pedaver/PQNK material for the purposes of controlled media indexing —
  this determines *discoverability*, not automatic authority: an
  authenticated source's content still goes through `contentType`/
  `evidenceType`/`authorityStatus` tagging per `SOURCE_AUTHORITY_POLICY.md`
  §5 before anything is citable, and an old statement from an authenticated
  source never automatically overrides current PQNK doctrine merely because
  the source is authenticated — the same version/conflict rules apply.
- **Do not crawl unrelated Facebook or YouTube sources.** A third-party
  page mentioning PQNK, a re-post, or a farmer's own channel discussing
  PQNK is not in scope, regardless of how accurate or well-intentioned the
  content is — see §2a below and `SOURCE_AUTHORITY_POLICY.md` §5's "PQNK
  authority is never inferred merely because a post mentions PQNK."
- Adding a fourth source later is a new, explicit, documented decision —
  not an automatic extension of "official-adjacent" channels, and not a
  schema-level free-text field (see the `channelOrPage` enum constraint in
  `MEDIA_KNOWLEDGE_SCHEMA.json`).
- Within an approved source, discovery pulls the full public post/video
  list on a schedule (e.g., weekly), diffed against what's already indexed,
  so new uploads are found without re-processing everything each run.

## 3. Metadata collection

For each newly discovered item, collect platform-native metadata first
(title, description, publish date, duration, URL) — this populates the
"record shell" (`MEDIA_KNOWLEDGE_SCHEMA.json` top-level fields) before any
transcript or taxonomy work happens. This shell alone is enough to queue the
item for review; nothing is searchable by Ask PQNK yet at this stage
(`reviewStatus: Pending Ingestion Review`).

## 4. Transcript acquisition

- **Where a platform transcript/caption exists** (YouTube auto-captions,
  Facebook auto-generated captions where available): pull it as the
  starting transcript, tagged `transcript.source: "Platform Auto-Caption"`.
- **Where none exists**: the item is queued for human transcription rather
  than silently skipped. Until transcribed, it can still carry
  record-level metadata (title, description-derived tags) and be indexed
  at a coarse level, but cannot be segmented or timestamp-cited — see §6.
- **Correction pass**: auto-captions are unreliable for Urdu/Punjabi/mixed
  farmer language and PQNK-specific terminology (SIPP, VIPP, jantar, SMM,
  etc.). Every transcript intended to found segment-level citations passes
  through a human correction step before `transcript.source` is set to
  `"Reviewed/Corrected"`. Auto-caption-only transcripts may support
  keyword search but are not cited directly to a farmer as the transcript
  excerpt until corrected.

## 5. Segmentation

- Long-form content (lectures, advisories, multi-topic Q&A sessions) is
  broken into segments the same way a human reviewer would chapter a video:
  each segment covers one coherent question/topic.
- Segmentation happens after transcript correction, done by a reviewer
  reading the transcript and marking topic boundaries — this is not (in
  this phase) a fully automated topic-segmentation model, because the
  taxonomy tagging that follows (crop, fieldProblem, scienceDomain,
  questionsAnswered per segment) requires the same human judgment a
  Knowledge Paper's metadata tagging already requires.
- Short-form content (a single-topic testimony, a short demonstration clip)
  may be a single segment spanning the whole item — segmentation is about
  matching citation granularity to actual content structure, not imposing
  a minimum number of segments.

## 6. Non-transcribed content handling

Content that cannot be transcribed (poor audio, purely visual
demonstration with no narration, or simply not yet reached in the
transcription queue) is still indexed at the record level:

- Title, description, and reviewer-assigned taxonomy tags make it
  discoverable in search.
- It is marked `transcript.available: false`.
- It cannot be cited with a `transcriptExcerpt` or used to found an
  answer's core claim — at most it can be offered as a "Watch" link
  alongside a properly-sourced text answer, never as the sole citation.

## 7. Duplicate and cross-post detection

- Match candidates by: identical or near-identical title, matching
  duration (+/- a few seconds), and publish dates within a short window
  across the approved source list.
- When a likely duplicate is found across platforms (the same lecture
  posted to both YouTube and Facebook), it becomes **one Media Record**
  with two entries in `relatedRecordIds` cross-referencing each other —
  not two independent records with duplicate segments. Whichever platform
  has the better transcript/caption support becomes the primary record;
  the other is linked, not merged away.
- True re-uploads (someone re-posting the exact same video later) resolve
  to the earliest-published record; the later one is logged and linked,
  not treated as new content requiring re-tagging.

## 8. Multilingual handling

- `language` is set per record (English / Urdu / Roman Urdu / Punjabi /
  Mixed), based on what's actually spoken, not the channel's general
  language.
- Segmentation and tagging happen against the transcript regardless of
  language — the controlled taxonomy (crops, fieldProblems, scienceDomains,
  etc.) is language-independent, so an Urdu-language segment and an
  English-language segment covering the same fieldProblem tag identically
  and are retrievable together.
- `farmerLanguage` captures the actual colloquial terms used (a local pest
  name, a regional phrase for a symptom), which is the bridge to natural
  farmer-language retrieval described in `ASK_PQNK_ARCHITECTURE.md` §13
  (Language). This is captured at ingestion time because a human reviewer
  transcribing/tagging the content is best placed to note it, not
  reconstructed later.
- Full translation of every transcript is out of scope for this phase —
  tagging in the canonical (largely English) taxonomy is what makes content
  retrievable across languages, not machine translation of the transcript
  itself.

## 9. Farmer comments and questions

Not ingested in this phase. Flagged as a future source of exactly the kind
of "what are farmers actually asking" signal the Pedaver Referral Workflow
is designed to capture more reliably through direct submission. Revisit
only after the referral queue (`PEDAVER_REFERRAL_WORKFLOW.md`) has running
history to compare against — comments are noisier and harder to attribute
than a structured submission.

## 10. Private, deleted, or unavailable material

- If a source URL becomes unavailable after indexing (video deleted, made
  private), the Media Record is **not deleted** — it is marked
  `reviewStatus: "Needs Re-Review"` and excluded from new answer citations
  going forward, since Ask PQNK should never cite or link a source the
  farmer can't actually open. Existing citations already shown to farmers
  are a historical fact and don't need retroactive scrubbing, but the
  record stops being eligible for new retrieval matches.
- Content that was always private (unlisted, internal) is never a
  candidate for ingestion — discovery in §2 only touches public posts on
  approved public channels/pages.

## 11. Review and authority assignment (ties to `SOURCE_AUTHORITY_POLICY.md`)

Every record's path to `reviewStatus: "Approved"` requires a human to set:

- `contentType` (Pedaver Lecture / Advisory / Testimony / Demonstration /
  Interview / Third-Party Discussion / Historical Formulation)
- `evidenceType`
- `authorityStatus` (record-level default, plus any segment-level
  overrides where one video mixes current and historical material — see
  `SOURCE_AUTHORITY_POLICY.md` §7's worked example)

This is the same authority-tagging discipline Knowledge Papers already use.
Ingestion produces candidates; it does not grant authority.

## 12. Sequencing recommendation — pilot before bulk ingestion

**Locked per Revision 1.1: do not begin by indexing the full Facebook/
YouTube archive.**

1. Finalize the approved source list (channel/page IDs) with Pedaver.
2. Pilot on a deliberately chosen batch of **approximately 20–30 items** —
   lectures, farmer advisories delivered on video, Q&A videos, and field
   demonstrations — spanning at least English and Urdu content, to validate:
   - transcript quality
   - multilingual retrieval (does a Roman Urdu question actually surface
     the right Urdu-language segment?)
   - segment boundaries
   - timestamp citation
   - duplicate/cross-post detection
   - authority handling (contentType/evidenceType/authorityStatus tagging
     holds up against real, messy source material)
   - answer relevance (does citing this pilot content actually improve Ask
     PQNK's answers, or just add noise?)
3. Only after the pilot demonstrably passes the checks above does ingestion
   scale beyond it (V1.4 in the revised implementation sequence — see
   `ASK_PQNK_ARCHITECTURE.md` §15). Scaling is a distinct, later decision,
   not an automatic continuation of the pilot.
4. Once scaling begins, prioritize by the repeat-question signal from the
   Pedaver Referral Workflow rather than channel chronology — index what
   farmers are actually asking about first.
