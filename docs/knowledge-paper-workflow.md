# Knowledge Paper publishing & revision SOP

Pedaver.com is in **Publishing & Maintenance Mode** (structural development
closed — see §5). This document is the operational reference for the two
things that keep happening: publishing a new Knowledge Paper, and revising
an existing one. Written so an operator (human or a future Claude session)
can follow it without the conversation history that produced it.

## Permanent catalogue rules

**KP number.** Every paper gets one permanent identity: `KP-001` ...
`KP-190`, `KP-191`, ... For a new paper: `next kpNumber = max(existing
kpNumber) + 1`. Stored as a literal integer on the `Paper` object in
`src/lib/content/papers.ts` — never recomputed from sort order, and never
changed when a paper is revised.

**`libraryDate`.** The date the work first entered the Pedaver Knowledge
Papers library. Fixed permanently at first publication.

**`publishedDate`.** The work's original publication date. For an ordinary
Pedaver-authored paper this normally equals `libraryDate`. It is **not**
changed when a paper receives a later revision. For an externally-published
work it can legitimately predate `libraryDate` by years — the reference
case is KP-125 (`technical-adaptations-for-mechanized-sri-production`):
`publishedDate: "2011-01-09"` (the original Springer journal date) vs.
`libraryDate: "2026-07-28"` (when it was added to Pedaver, established from
git history). Don't collapse these two meanings.

**`modifiedDate`.** Optional field on `Paper`. Omitted entirely at first
publication. Set only when an existing paper receives a substantive
revision — the date of that revision. Current code behavior, both already
shipped and live:
- `src/app/papers/[slug]/page.tsx` — JSON-LD `dateModified: paper.modifiedDate ?? paper.publishedDate` (`datePublished` always stays `paper.publishedDate`)
- `src/app/sitemap.ts` — `lastModified: paper.externalUrl ? now : new Date(paper.modifiedDate ?? paper.publishedDate)`

**Revision identity.** An R1/R2-style substantive revision keeps the same
`kpNumber`, slug, page URL, PDF URL, and `libraryDate`, and keeps the
original `publishedDate` — only `modifiedDate` advances. A genuinely new
intellectual work is a deliberate editorial decision, not something that
automatically inherits or replaces an existing KP identity.

## A. Publishing a new Knowledge Paper

1. Determine the next `kpNumber` (`max(existing) + 1`).
2. Set `libraryDate` and `publishedDate` (normally equal, today's date). Omit `modifiedDate`.
3. Choose a stable, kebab-case slug — it becomes the permanent page URL and PDF filename.
4. Place the PDF at `public/papers/<slug>.pdf`.
5. Add the paper object to `src/lib/content/papers.ts`, following the existing `Paper` interface and the content style already in use (plain-text `abstract` paragraphs, `keyTakeaways` as single-sentence bullets).
6. Add the matching entry to `src/lib/content/knowledge/metadata.json`, using only values from the controlled vocabulary in `src/lib/content/knowledge/taxonomy.json` (crops, fieldProblems, fieldPractices, scientificDomains, pqnkPrinciples, etc.) — don't invent new categories.
7. **Metadata editing rule**: preserve `metadata.json`'s existing formatting exactly (one token per line, no space after `:`, no indentation). Never run a whole-file JSON rewrite/reformatter to add one entry — locate the insertion point and splice in only the new object, then check `git diff --stat` shows roughly the new entry's line count and nothing else. (This rule exists because a whole-file `json.dump` rewrite once reformatted ~13,800 unrelated lines and had to be caught and corrected before it shipped.)
8. **Hero/card image** — treat as editorial content, not a slot to fill. Preferred hierarchy: (a) the paper's own title infographic/illustration if it has one; (b) another unique, directly relevant illustration from the paper; (c) a new image supplied or explicitly approved for that paper; (d) no image at all, rather than an irrelevant or already-duplicated one. `heroImage` is optional on `Paper` — omitting it is a valid, correct choice. Don't try to solve the existing image backlog as part of a single-paper publish; that's a separate project (§7).
9. Search/discovery integration is automatic once steps 5–6 are done — no additional wiring:
   - the Knowledge Papers browser (`PapersBrowser.tsx`) reads the full `papers` array directly;
   - `KP-191`/`KP191`/`kp-191`-style search resolves via `parseKpQuery`/`getPaperByKpNumber`;
   - natural-language/concept search (`src/lib/content/knowledge/search.ts`) reads `metadata.json` directly;
   - science/crop/machine cross-links (`src/lib/content/crossLinks.ts`) and related-knowledge suggestions (`src/lib/content/knowledge/related.ts`) are pure functions over the full `papers`/metadata arrays — they key off the `crops`/`machineryTools`/taxonomy fields set in step 6, nothing else to wire;
   - `src/app/sitemap.ts` maps over the full `papers` array automatically.
10. Run `npx tsc --noEmit`, then `npm run build`. Both must be clean.
11. Review `git status`/`git diff --stat` before staging. Stage only the files that belong to this paper (the PDF, `papers.ts`, `metadata.json`) by exact path — never `git add -A`. Confirm no unrelated working-tree changes (in particular, no paused Ask PQNK files) got swept in.
12. Commit, push to `main`.
13. The existing GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and FTP-deploys to cPanel automatically on push — no manual server step. A failed build stops the job before the deploy step runs, so a broken build can't reach production.
14. After deployment lands, verify on production: paper page returns 200; PDF returns 200 (if locally hosted); the page shows the correct `KP-XXX`; title/summary/abstract match; the taxonomy box and science cross-links render; the hero image (if any) loads; the paper appears in the Knowledge Papers listing and in a representative search; the URL is present in `sitemap.xml`.
15. IndexNow (optional): submit the new URL(s) with the existing `scripts/indexnow-submit.ts` (`npm run indexnow:submit`, or `--dry-run` first to check). One deliberate submission per publish — don't resubmit repeatedly just because indexing hasn't shown up yet.

## B. Revising an existing Knowledge Paper

Reference implementation: KP-190 R1 (`why-only-4kg-of-np-during-pqnk-transition`).

1. Confirm the new material is a revision of the same intellectual work, not a new paper. If genuinely new, that's a deliberate editorial call about whether it earns its own KP number (§ "Revision identity" above) — not this workflow.
2. Retain unchanged: `kpNumber`, slug, page URL, PDF path/URL, `libraryDate`, original `publishedDate`.
3. Set `modifiedDate` to the revision's publication date.
4. Replace the PDF in place at the same `public/papers/<slug>.pdf` path.
5. Update only what the revision actually changed — typically `summary`, `abstract`, `keyTakeaways` in `papers.ts`, and the corresponding `questionsAnswered`, `keywords`, `fieldProblems`, `fieldPractices`, `scientificDomains`, `scienceLinks`, etc. in `metadata.json`.
6. Same minimal-diff discipline as §A.7 applies to the `metadata.json` edit — locate and replace only this paper's entry.
7. Run `npx tsc --noEmit` and `npm run build`.
8. Verify: `datePublished` in the page's JSON-LD is still the original `publishedDate`; `dateModified` shows the new `modifiedDate`; `sitemap.xml`'s `lastmod` for this URL shows the new `modifiedDate`; KP number, slug, and both URLs are unchanged; the revised PDF and content are live.
9. Commit, push, deploy, and verify via the same pipeline as §A (steps 11–14).

## What this covers (routine, not structural)

Publishing a new Knowledge Paper; revising an existing one; correcting
factual wording or typos; justified taxonomy updates; hero/card image
replacement (including replacing irrelevant or duplicated images, or
adding newly approved ones); normal crop/resource/video additions through
the existing content-array patterns. None of these reopen structural
development by themselves.

## What this does not cover

Ask PQNK development (paused on `wip/ask-pqnk-paused`); the pqnk.org →
Pedaver server-side redirect consolidation; the four-book manuscript
project and the reserved future `/books/` architecture; the KP-001–KP-190
hero-image cleanup project (separate, editorial, still pending); broad SEO
or navigation redesign; dependency upgrades; lint-debt cleanup; future
analytics-driven changes.

## Publishing discipline

Pedaver.com is in Publishing & Maintenance Mode. Reopening structural
website development normally requires one of: a demonstrated technical
defect; a genuine knowledge/discoverability gap the existing structures
can't accommodate; or evidence (from users or analytics) that an existing
structure is actually failing. "Could be improved" is not by itself
sufficient reason to reopen it.
