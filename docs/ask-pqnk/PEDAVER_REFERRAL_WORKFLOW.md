# Pedaver Referral Workflow — Ask PQNK 1.2

Status: Draft for review. Architecture only.

Depends on: `ASK_PQNK_RETRIEVAL_POLICY.md`, `QA_KNOWLEDGE_SCHEMA.json`.

**Revision 1.2 changes — locked decisions, superseding 1.1 in these
specific places:**
- Published Farmer Advisory records are **permanent**. The 1.1 "90-day
  auto-deletion" recommendation is removed entirely for published
  knowledge — see §13, rewritten.
- **Pedaver is the sole approval authority.** The 1.1 "dual sign-off"
  framing is removed — see §8, §10.
- A **one-week response-time objective** is added (§9, operating target,
  not a hard technical constraint).
- A concrete **reference-number lookup mechanism** is designed (§10a) so a
  published answer reaches the farmer without an account system.

## 1. Framing: this is not an error state

Unchanged. "Refer this question to Pedaver" is the mechanism by which the
knowledge base grows. Every referral is a corpus gap signal; every answered
referral permanently closes it.

## 2. The knowledge-development loop

```
Farmer asks Ask PQNK
      |
      v
Ask PQNK searches existing knowledge
  (Science, Knowledge Papers, Farmer Advisory, Media)
      |
      +-- Sufficiently answered --> Answer immediately with sources, done
      |
      v (insufficient)
Refer this Question to Pedaver
      |
      v
Register/increment the question's cluster (sec 5)
      |
      v
Pedaver reviews and answers  (target: within one week — sec 9)
      |
      v
Answer is classified and issued — Pedaver's issuance IS the approval (sec 8)
      |
      v
Publish as Farmer Advisory knowledge — PERMANENT (sec 13)
      |
      v
Farmer is notified / can retrieve the answer (sec 10a)
      |
      v
Index already live — future farmers with the same or a similar question
receive the answer automatically
```

## 3. User-facing trigger

Unchanged, still the locked copy:

```
This question needs a Pedaver response.

I could not find enough authoritative PQNK knowledge to answer this
reliably. You can refer this question to Pedaver for review.

[ Refer to Pedaver → ]
```

## 4. Submission form

Unchanged from 1.1.

**Required:** Question (pre-filled, editable).
**Optional context:** Crop, region, field condition.
**Optional evidence:** Photograph, short video, voice recording.
**Optional contact:** Name, WhatsApp, email.

Deliberately excluded: exact GPS, farm financials, mandatory contact info.
No account system — see §6.

## 5. Question clustering — unchanged from 1.1

Every incoming question matches against existing `questionCluster`s
(`QA_KNOWLEDGE_SCHEMA.json` `definitions.questionCluster`) by canonical
taxonomy overlap, not literal text similarity, so differently-worded,
differently-scripted, differently-modal questions about the same
underlying need resolve to one cluster while every original phrasing is
preserved in `variantQuestions`. Clusters with higher `repeatCount` and
`knowledgeGapStatus: Open Gap` surface first in the queue (§8).

## 6. Submission Reference Number, not an account

Unchanged principle from 1.1: every submission receives a short,
human-shareable reference number instead of requiring an account. Revision
1.2 makes this number do more work — see §10a, where it becomes the
mechanism for retrieving the published answer, not just an internal
tracking label.

## 7. Voice referral preservation — unchanged from 1.1

Preserves original audio, transcript, detected language, normalized
question, sources already checked, referral reason, and optional context.
Pedaver reviews the actual spoken question, not just its transcript.

## 8. Pedaver is the sole approval authority

**Locked.** A response issued by Pedaver is authoritative for publication
as a Farmer Advisory. There is no second reviewer, no dual sign-off, no
external approval gate. This removes 1.1's separate `approvalStatus` field
as a distinct review stage — `pedaverAnswer` being drafted and issued by an
authorized Pedaver reviewer *is* the approval. The queue's states (§9)
still distinguish drafting from publishing, but that distinction is about
*workflow completeness* (has an answer been written and classified yet),
not about a second party signing off on Pedaver's own answer.

**Version history is preserved regardless.** If Pedaver later improves,
expands, or corrects a published answer, this creates a new version
(`QA_KNOWLEDGE_SCHEMA.json` `version`/`supersededBy`) — Ask PQNK always
retrieves the current version, while every prior version remains
permanently queryable internally for traceability. Removing dual-review
bureaucracy does not remove accountability: every version records who
issued it and when.

## 9. Internal Pedaver Answers Queue

Fields, revised from 1.1 (removing the separate `approvalStatus` gate,
adding the SLA-relevant `dueBy`):

| Field | Notes |
|---|---|
| `referenceNumber` | Farmer-facing, from §6 |
| `originalQuestion` | As submitted, exact text or transcript |
| `questionModality` | Text or Voice |
| `originalAudioRef` | If voice |
| `submittedContext` | Crop, region, field condition, media attachments |
| `date` | Submission timestamp |
| `dueBy` | `date` + 7 days — the response-time objective (see below), a queue-sorting aid, not an enforcement mechanism |
| `taxonomyClassification` | Auto-tagged, editable by reviewer |
| `clusterId` | Which question cluster this belongs to |
| `retrievalAttempt` | Snapshot of what was searched and why insufficient |
| `sourcesAlreadyFound` | Partial/lower-tier matches, for reviewer convenience |
| `referralReason` | Which sufficiency-gate condition fired |
| `responseStatus` | State list below |
| `pedaverAnswer` | Drafted and issued by the reviewer — issuance is approval, sec 8 |
| `reviewer` | Which Pedaver reviewer issued the answer |
| `publicationDecision` | Publish to Farmer Advisory / Answer privately, do not publish / Escalate |
| `contactChannel` | If contact info given — how the answer will be delivered (sec 10a) |

**States**, simplified from 1.1 (removing `Approved for Knowledge Base` as
a separate gate after `Answered`, since Pedaver's answer already carries
publication authority — publication is a `publicationDecision` value set
at `Answered`, not a subsequent approval stage):

```
New -> Under Review -> [Needs More Information] -> Answered -> Closed
```

**Response-time objective: Pedaver answers referred questions within one
week of submission.** This is an operating target the queue is designed to
surface against (`dueBy`, and a "questions waiting longest" / "overdue"
queue view), not a hard technical constraint the system enforces by
blocking or escalating automatically. Missing the target does not change
any record's validity; it's a workload/prioritization signal for Pedaver,
the same way `repeatCount` is.

**Queue views**, unchanged from 1.1: newest, repeated (by `repeatCount`),
most common unresolved problems, crops generating questions, language
distribution, emerging seasonal problems, longest-waiting (now including
overdue-against-`dueBy`), needing clarification. Access restricted to
authorized Pedaver reviewers.

## 10. Publish-to-Farmer-Advisory decision

At `Answered`, `publicationDecision` resolves to one of three outcomes,
unchanged in shape from 1.1, now issued solely by Pedaver with no further
gate:

1. **Publish to Farmer Advisory** — `publicationStatus: Published`,
   permanent (§13).
2. **Answer privately, do not publish** — farmer gets a direct reply,
   nothing added to the corpus.
3. **Escalate** — genuine gap requiring a full Knowledge Paper or a formal
   Science review, tracked via `escalatedTo`.

### 10a. Conveying the published answer back to the farmer

The simplest mechanism that avoids an account system, in two parts that
work independently of each other:

**If contact info was given** (`contactChannel` populated): once
`publicationDecision = Publish`, a notification (WhatsApp message or
email) is sent containing the short answer and a direct link to the
published Farmer Advisory page. This reuses exactly the consent scope
already defined in §11 — delivering the answer to *this* question, nothing
broader.

**Always available, regardless of contact info**: the farmer can return to
the Ask PQNK / Farmer Advisory interface and enter their reference number
into a simple, unauthenticated "Check your question" lookup. This returns:
current `responseStatus` while unresolved, and once `Published`, a direct
link to the resulting Farmer Advisory record. The reference number itself
is the access credential — no login, no personal identifier required to
look it up — so it should be generated with enough entropy that it isn't
practically guessable or enumerable (an implementation detail for the
V1 spec, not resolved here).

This means a farmer who declined to give any contact info at all still has
a path back to their answer, and a farmer who did give contact info gets
proactively notified without needing to remember to check back.

## 11. Contact consent

Unchanged from 1.1. WhatsApp/email, when provided, are used only for
clarifying the submitted question and delivering/following up on its
answer. Submission is not permission for general marketing or unrelated
communication.

## 12. Publishing level — do not duplicate long Knowledge Papers

Unchanged from 1.1. Default to the lightest publishing level that
genuinely answers the question (Farmer Advisory Q&A → Substantial Farmer
Advisory → Escalated to Knowledge Paper → Escalated to Science Review,
never automatic). Full table in `QA_KNOWLEDGE_SCHEMA.json`
`publicationLevel`.

## 13. Retention policy — LOCKED, revised from 1.1

**Published Farmer Advisory knowledge is permanent.** There is no
scheduled deletion of an approved Q&A record, and the architecture is not
built around one. Retaining and publishing the agricultural question and
Pedaver's answer does not require separate permission from the person who
originally asked it — the question and its answer are PQNK knowledge, not
that person's personal data, once stripped of identifying contact
information.

This requires a clear structural separation, which the schema already
enforces (`QA_KNOWLEDGE_SCHEMA.json` `notes.personalDataSeparation`):

| Data | Where it lives | Retention |
|---|---|---|
| Question, field context, answer, classifications, sources, related knowledge | `QA_KNOWLEDGE_SCHEMA.json` record | Permanent once Published — never auto-deleted |
| Name, WhatsApp, email | Pedaver Answers Queue entry only, never the published record | Retained only as long as needed to deliver/clarify this specific answer; purge after the case is `Closed` and any notification (§10a) has been sent, following ordinary data-minimization practice — not tied to a fixed knowledge-retention clock, since the *knowledge* no longer expires but the *contact detail* was never part of the knowledge in the first place |
| Submitted photo/video/voice evidence not incorporated into the published record | Case file, linked to the queue entry | Retained while the case is open; deleted after closure unless the farmer gives separate, explicit permission for it to become part of the published record's evidence (in which case it's retained as part of that permanent record, like any other published site asset) |

This resolves 1.1's now-superseded framing: the *knowledge* is permanent
and needs no farmer permission to retain; the *personal contact detail*
was never part of the permanent record and follows ordinary minimization
practice, independent of any fixed day-count on the knowledge itself.

## 14. Open policy decisions before this can be built

Narrowed from 1.1, now that retention and approval are locked:

- Exact reference-number format (§6) and its entropy/guessability
  requirement (§10a) — cosmetic but worth settling once, at spec time.
- Exact WhatsApp/email consent copy (§11 states the scope; wording itself
  is a copywriting task).
- Whether the `dueBy` response-time objective should ever surface publicly
  (e.g., "we aim to answer within a week" shown to the farmer) or stays
  internal-only to the queue.
