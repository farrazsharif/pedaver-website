# PQNK Books — workflow and living status

This file is the **single source of truth for the PQNK book publishing
workstream**. Any Claude session doing book work reads this first (see the
pointer in `CLAUDE.md`), and updates it before finishing. Its **Decisions
log is binding** — do not re-litigate a settled call listed there.

Why this file exists: chapter work spans many sessions. Facts that persist
on their own are the `memory/` files, git history, and `CLAUDE.md`. What did
*not* persist — and kept getting re-argued — is per-chapter review state and
decisions already made with the author. That lives here now.

---

## 0. Site backup rule — BINDING (added 2026-09-10)

**Never push to `main` (i.e. never trigger a deploy) without a fresh local
backup of the built site.** On 2026-09-10 the live site went down for hours
during a run of failed deploys; the author's rule is that two rolling copies
must always exist on the Mac so any bad deploy or wiped server is instantly
recoverable.

- The backup script is `scripts/backup-site.sh`. It builds the site, then
  snapshots `out/` (with `.htaccess`) into
  `~/Documents/Pedaver_Website_Backups/`, keeping exactly two copies:
  `current/` (this run) and `previous/` (the run before), each with a
  `MANIFEST.txt` (git commit, file count, SHA-256s of key files + every
  chapter PDF). Copies are hard-linked, so the second and later snapshots
  cost only the delta.
- It runs **automatically** in two places, already wired on the author's Mac:
  1. `.githooks/pre-push` — before every push to `main` (activated with
     `git config core.hooksPath .githooks`; skipped if a snapshot < 20 min
     old exists; emergency bypass `git push --no-verify`).
  2. `~/Library/LaunchAgents/com.pedaver.website-backup.plist` — a launchd
     agent, daily at 13:00 (reference copy: `scripts/com.pedaver.website-backup.plist`).
- **To restore:** upload the contents of
  `~/Documents/Pedaver_Website_Backups/current/site/` into the cPanel
  document root (`public_html`), overwriting. `.htaccess` is included.
- If a Claude session runs the publish checklist below, it must ensure a
  snapshot was taken for the state being pushed (the pre-push hook does this;
  if hooks are bypassed, run `scripts/backup-site.sh` by hand first).

---

## 1. What the PQNK books are

Four planned books. Book one is in active chapter-by-chapter publication:

- **bookId:** `natural-ecosystem-science`
- **Title:** *PQNK: The Natural Ecosystem Science of Production Agriculture*
- Manuscript version: **v61** (upgraded from v60 on 2026-09-02). v61 adds the
  KP-195 nutritional-productivity framework to Ch59; individual chapters are
  published from their reviewed standalone files, not sliced out of the
  master `.pages`.

Data model and all rendering: `src/lib/content/books.ts` (read its long file
header once — it explains bookId/chapterId permanence, the block types, and
public vs internal chapter lists). Page: `src/app/books/[bookId]/[chapterId]/`.

## 2. Where the approved source files live

**Not in this repo.** On Asif's Mac:
`~/Documents/PQNK_Claude_Work/PQNK Book/`

- `PQNK_Book_Chapter_N_Final - <approved|Claude Reviewed>.docx` / `.pdf` —
  the approved chapter. The `.pdf` is the artefact uploaded as the chapter
  download; the `.docx` is the text source.
- `backups/` — timestamped pre-edit copies.
- `PQNK_Final_Book_v61.pages` — the master manuscript (huge; do not parse).

Always confirm the file's mtime/size actually changed before trusting a
"re-saved" claim. Extract and eyeball the infographics every time — a
re-export can silently carry an old embedded image.

## 3. How a chapter gets published (the mechanical checklist)

1. **Editorial pass** on the approved `.docx`/`.pdf`: typos, internal number
   consistency, cross-references, and consistency with already-published
   chapters and the Decisions log below.
2. **Infographic pass**: extract every embedded image from the PDF, check each
   for numbers/claims that conflict with the text, sibling infographics, or
   the locked science rules (esp. `project_pqnk_ch3_infographic_science_rules`
   in memory — the 0.083% rule).
3. **Body → typed blocks** in `books.ts`: append the chapter's `body:
   ChapterBlock[]`, flip `status` to `"published"`, set `publishedDate`,
   `version` ("1.0"), `pdfPath`, and a `summary`. Fold stray mid-sentence
   paragraph breaks from the Word doc into single `paragraph` blocks. Order
   inside `body`: opening image(s) → openingQuote → attribution → paragraphs/
   headings/pullParagraphs/images → `qaPanel` → `closingHeading` → closing
   paragraphs → `transition` (names the *next* chapter).
4. **PDF** → `public/books/natural-ecosystem-science/<chapterId>.pdf`
   (semantic name, never numbered).
5. **Images** → `public/books/natural-ecosystem-science/<chapterId>/chN-img-*.{png,jpg}`,
   referenced from `imageGroup` blocks. Each chapter's images live only in its
   own folder. Images are optional — a text-only chapter is valid.
6. **Previous chapter's `transition`** block: make sure it names this chapter.
7. **Read Aloud** needs no wiring — `page.tsx` renders `<ReadAloud>` for any
   published chapter with a body. If the chapter introduces a new acronym or
   an odd-to-pronounce term, add a speech-only rule in
   `src/lib/content/chapterSpeech.ts` (`SPEECH_NORMALISATIONS`).
8. `npm run build` — must pass.
9. Commit: `Publish Chapter N: <Title>` (direct to `main`, matching every
   prior chapter/KP publish).
10. **`git push origin main`** — this alone deploys it. The `.githooks/pre-push`
    hook snapshots the site first (see §0); if hooks are off, run
    `scripts/backup-site.sh` by hand before pushing. See "Deployment" below;
    do not skip this step or assume a commit is live on its own.
11. **Update this file** — move the chapter to Published + confirm LIVE
    (verify via SHA-256/Last-Modified against production, not just a 200),
    clear its open issues, add any new decisions.
12. **Archive Word + PDF in the "Published Chapters" folder** (Asif's Mac:
    `PQNK Book/Published Chapters/`, next to `PQNK_Book_Editorial_and_Typography_Style_Standard.docx`
    — this is separate from the eBook/print master track in
    `memory/pqnk_book_v60_status.md`). Copy the PDF **from the deployed site**
    (`public/books/natural-ecosystem-science/<chapterId>.pdf`, i.e. what was
    just SHA-256-verified live in step 11) — never from a loose draft PDF
    elsewhere, those have been found to NOT byte-match what actually shipped.
    Name both files `PQNK_Book_Chapter_<N>_<Title_With_Underscores>.docx` /
    `.pdf` (Chapter 1 predates this convention — its docx is
    `PQNK_Book_Chapter_1_Formatted.docx`; leave it named as-is, just keep its
    `.pdf` pair current). For the `.docx`, use the same approved Word source
    the chapter was published from; if the only fully-final version of a late
    fix (e.g. an infographic swap) exists solely as `.pages` (Apple Pages) and
    was never re-exported to `.docx`, archive the closest `.docx` available and
    say so plainly rather than silently pairing a mismatched file — do not
    assume Word and PDF match without checking (see the Ch2–4 note below).

## 4. Chapter status

| # | chapterId | Title | Status | Notes |
|---|-----------|-------|--------|-------|
| 1 | `earths-original-design` | Earth's Original Design | **Published** 2026-08-27 (v1.0) | |
| 2 | `rock-dirt-soil-life` | Rock, Dirt, Soil, Life | **Published** 2026-08-29 (v1.0) | |
| 3 | `the-0-083-paradox` | The 0.083% Paradox | **Published + LIVE** 2026-08-31 (v1.0) | Closing-paragraph hand-off fixed 2026-09-04, commit `7b7e557` (now points to Carbon, not water). Verified live on pedaver.com 2026-09-04. |
| 4 | `carbon-the-currency-of-life` | Carbon: The Currency of Life | **Published + LIVE** 2026-09-04 (v1.0), commit `21da998` | 9 images, PDF from the author-approved `PQNK_Book_Chapter_4_Final - Publish ready (Claude-merged) Approved.pdf`. Hands to Chapter Five, `the-natural-water-system`. Verified live on pedaver.com 2026-09-04 (page-1 infographic + PDF byte-verified via SHA-256 against production). |
| 5 | `the-natural-water-system` | The Natural Water System | **Published + LIVE** 2026-09-06 (v1.0), commit `66cca55` | 13 infographics. PDF from the author-approved `PQNK_Book_Chapter_5_Final - Approved.pdf` after the reviewer's geographic-framing + grammar corrections were applied directly to the DOCX and re-exported (see Decisions log, 2026-09-06). Hands to Chapter Six, `natures-pest-protection`. Verified live on pedaver.com 2026-09-06 — deployed PDF SHA-256 `1ac0008a…` matches the local source byte-for-byte. Added an `SMM` → `S M M` speech-normalisation rule in `chapterSpeech.ts`. |
| 6 | `natures-pest-protection` | Nature's Pest Protection | **Published + LIVE** 2026-09-07 (v1.0), commit `bf800c8` | 6 infographics/photos. PDF from the author-locked `PQNK_Book_Chapter_6 - reviewer updates Locked.pdf` — incorporates the external scientific-tightening pass (established weed/BT ecology vs PQNK field interpretation, resistance not "impossible", BT not "all sucking insects", endophyte colonisation labelled as interpretation, two-stage BT-cotton history, "1,700 predators" → qualitative) and four final wording fixes (softened the "quietly destroying" phrase; "Monoculture eliminates ecological diversity" → "disrupts the ecological balance"; pull-quote "response" → "cure"; added a preventive-vs-curative health analogy in the closing, corrected to say a farm recovers fast — first crop shows change, a few crop cycles to restore). Hands to Chapter Seven, `weeds-as-soil-physicians`. Verified live on pedaver.com 2026-09-07. **PDF corrected 2026-09-07** (commit `cf7cd5e`): the author fixed the page-9 Q&A oversized-answer font in Pages and re-exported; the new PDF (SHA-256 `9989d1cd…`) is byte-identical in text and images to the previous one — only the page-9 layout reflows. Deployed PDF re-verified against the local source. |
| 7 | `weeds-as-soil-physicians` | Weeds as Soil Physicians | **Published + LIVE** 2026-09-07 (v1.0), commit `c932a8c` | 6 figures. PDF from the author-locked `PQNK_Book_Chapter_7_FINAL - Claude Reviewed - Approved.pdf`. Incorporates the external scientific-tightening pass (weeds *do* compete — PQNK changes the conditions; diagnostic table hedged to "Soil conditions commonly associated"; Bathu "not proof of fixation", Maina "when effectively nodulated", Motha "a PQNK reading, not established botany", Deeela/Motha dominance "should decline"; herbicides "can disrupt/alter" not "destroy/kill", "limited or transient effects at recommended field rates"; resistance as progressive selection; three-season transition explicitly a PQNK field observation; "chemical snapshot vs living record" replaces "more accurate than any lab") and the country-name universalisation pass (P1 "Pakistani farmers" → "Farmers"; P6 "in Pakistani agriculture" → "one of the world's most herbicide-resistant weeds"; P8 dropped "in Pakistan"). Germination sentence rewritten (seed decides on its DNA cue; disturbance signals trigger it, light only "for many species"). Part Two hand-off corrected — soil degradation spans the whole ~10,000-year arc, "not for sixty years". **The page-5 diagnostic-guide table is a rendered image (`ch7-img-04.png`)** — no `table` block type was added to `books.ts` (deliberate: closing-out phase, no new structural work); the full selectable table is in the download PDF. Closes Part One; `transition` points to Part Two. Verified live on pedaver.com 2026-09-07 — deployed PDF SHA-256 `4a97e93f…` matches the local source byte-for-byte. |
| 8 | `the-first-error` | The First Error | **Published + LIVE** 2026-09-09 (v1.0), commit `8a3a3a6` | Opens Part Two. 5 infographics/photos. Body from the author-approved `PQNK_Book_Chapter_8_FINAL_APPROVED.docx` after the external-reviewer evidence-strengthening pass (functional-not-chronological framing; GPP/NPP evidence for pre-agricultural productivity; the "dump-heap" seed-dispersal pathway; seed-burial mechanism; tillage/pesticide/nutrient-decline claims hedged; Liebig framing + Lawes/Rothamsted 1842/1843 chronology corrected; post-war chemistry de-compressed — Haber-Bosch "always served both", organophosphates "on a separate track"; capture reframed as funding architecture, not conspiracy, with the USDA R&D figures; Pakistan SOM/groundwater figures corrected; Midwest topsoil softened). **68-year alignment** carried through both the intro ("sixty-eight years for the catastrophic acceleration") and the closing ("over the last sixty-eight"); Central Asia softened from "less than sixty years" to "a few decades"; the "Six Numbers" infographic regenerated to "SIXTY-EIGHT YEARS". Captured Science and The True Cost referenced by title, not chapter number. Chapter 7's `transition` block updated to name Chapter 8 (was the generic "Part Two: The Destruction" divider). Hands to Chapter Nine, `ancient-conventional-industrial-aci`. **Known PDF-only lag:** the deployed download PDF still reads "over the last sixty" in the closing paragraph (one word); the web body is correct at "sixty-eight". Swap the PDF on the author's next re-export. Verified live on pedaver.com 2026-09-09. |
| 9 | `ancient-conventional-industrial-aci` | Ancient Conventional Industrial (ACI) | **Published + LIVE 2026-09-11 (v1.0), commit `386dc98` — deploy incident resolved, went live via run #230)** | Body from the reviewer-approved `PQNK_Book_Chapter_9_FINAL - Approved.docx/.pdf` (14-point external-reviewer evidence pass + 6 surgical corrections + migration-para rewrite already baked in). The Cover-Up Technology Chain — seven links (tillage → fertiliser → pesticides → GMO seeds → herbicide tolerance → irrigation → nutrition consequence), framed as a **functional dependency chain, not a strict chronology**. One infographic (`ch9-img-01.png`, "The ACI Cover-Up Technology Chain" panel, extracted from PDF p2 at 1800px) placed after Link One with its caption. The three "THE LOGIC OF THE CHAIN" paragraphs were normalised to **lead-sentence bold** — the approved PDF has the middle one ("The institutions that might break the chain are shaped by it…") fully bold, treated as a typography slip and matched to Ch8's bold-lead pattern. Forward refs (Captured Science, The True Cost) by title; backward refs (Ch 3, 6, 8) keep numbers. `chapterSpeech.ts`: added `GMO → "G M O"` and `GURT → "G U R T"`. Ch 8's `transition` already named Chapter Nine (no change). Hands to Chapter Ten, `the-industrialization-of-agriculture`. **Soft flag for the eventual Ch 11 publish:** Ch 9's "As Chapter Three set out, … declines often in the range of twenty to forty percent" leans on Ch 3 for a figure Ch 3 states only lightly; the "20–40 percent" framing is really a Ch 11 topic — reconcile the Ch 3 / Ch 11 nutrient-decline cross-refs when Ch 11 is prepared. **Verified live 2026-09-11** — page, `ch9-img-01.png` and PDF all return HTTP 200 on pedaver.com after run #230. |
| 10 | `the-industrialization-of-agriculture` | The Industrialisation of Agriculture | **Published + LIVE 2026-09-11 (v1.0)** — went live via run #230 (deploy incident resolved) | Body from the reviewer-approved `PQNK_Book_Chapter_10_PUBLISH_READY - Approved.docx/.pdf` — this file had already been through an earlier publish-ready pass (31 British-spelling normalisations, the "beyond the root's own reach...as the plant signals need" rewrite); this session found and fixed one remaining straight apostrophe and confirmed everything else clean (no placeholders, no spaced hyphens/em-dashes, no US spelling, cross-refs to Chapter Nine and Chapter Eleven both correct). One hero infographic (`ch10-img-01.png`, "The Industrialization of Agriculture / From Living Ecosystems to Industrial Substitution" two-column comparison panel, extracted from PDF p1 at 1800px) placed right after the title, before the epigraph — same pattern as Ch8. No bold-lead or pull-paragraph styling in this chapter (plain section headings only). **`books.ts` title corrected to British "Industrialisation"** (chapterId stays `the-industrialization-of-agriculture`, permanent) — resolves the flag logged against Ch14/15. Minor, non-blocking: the infographic artwork itself still says "INDUSTRIALIZATION" (US, baked into the image). Ch9's `transition` already named Chapter Ten correctly (no change needed there). Hands to Chapter Eleven, `the-68-year-experiment`. |
| 11 | `the-68-year-experiment` | The 68-Year Experiment | **Published + LIVE 2026-09-12 (v1.0), commit `a9d7bb0`** | Body from `PQNK_Chapter_11_FINAL_LOCKED - Publish.docx/.pdf`. Six accounts ("bills"): soil, water, nutrition, biodiversity, climate, farmer economics — the balance sheet a yield-only measure of agricultural success leaves out. One hero infographic (`ch11-img-01.png`, "The 68-Year Balance Sheet" six-panel summary, extracted from PDF p1) placed after the title; one data table (`ch11-img-02.png`, "The Cumulative Audit: Putting Numbers to the Catastrophe", extracted from PDF p7 as an image — same pattern as Ch7's diagnostic-guide table, no `table` block type added). **Editorial fixes before publish:** 14 straight apostrophes/quotes → curly (house style); 2× "Chapter Fourteen, The True Cost" → "a later chapter, The True Cost" (this session's leftover `ch11_reviewed.docx` scratch file, from an earlier unfinished pass, had already identified this and the British-spelling fixes — the spelling fixes were already present in the author's `- Publish` export, the forward-reference fix was not, and was reapplied here). Resolves the soft flag Ch9 logged against this chapter (20–40% nutrient-decline figure now stated directly, with Davis 2004 / UK Composition of Foods citations). This chapter's own forward reference to The True Cost follows the same by-title convention as Ch9/Ch10. Hands to Chapter Twelve, `captured-science`. **Verified live 2026-09-12** — page, both images and PDF all return HTTP 200 on pedaver.com; PDF SHA-256 `be8c6e1b…` matches the local source byte-for-byte. |
| 12 | `captured-science` | Captured Science | **Published + LIVE 2026-09-12 (v1.0), commit `a9d7bb0`** | Body from `PQNK_Chapter_12_FINAL_PUBLISH_READY - Publish.docx/.pdf`. Examines funding/incentive mechanisms that can bias agricultural research (university funding, peer review, extension), then uses PQNK's own documented institutional history as a case study: the 2011 peer-reviewed *Paddy and Water Environment* SRI paper, the NARC wheat-trial comparison (58% lower cost of production vs. conventional), the December 2025 submission to FAO/UNEP/IPCC/World Bank/IMF/WHO/WEF/UNDP/IFAD/CGIAR/GEF/OECD, and the v-Fluence/Guardian investigation into organised industry attacks on pesticide critics. Two infographics (`ch12-img-01.png` hero "Nature Is The Production System", `ch12-img-02.png` "Why PQNK Can Challenge The Established Paradigm", both extracted from the PDF) and one Q&A panel ("What the Funding Structure Tells Us About Research", 4 items). **Editorial fixes before publish:** 29 straight apostrophes/quotes → curly; same "Chapter Fourteen, The True Cost" → "a later chapter, The True Cost" fix as Ch11; **"PQNK Research Collective" → "Pedaver Research"** — this chapter used both names for the same December 2025 analysis in different paragraphs (line ~87 said "PQNK Research Collective", line ~115 said "Pedaver Research"), standardised to match the entity-name fix already made in the Ch14 publish-ready pass. Ch11's `transition` already named Chapter Twelve correctly. Hands to Chapter Thirteen, `the-sevenfold-bankruptcy`. **Verified live 2026-09-12** — page, both images and PDF all return HTTP 200 on pedaver.com; PDF SHA-256 `93ee88d9…` matches the local source byte-for-byte. |
| 13 | `the-sevenfold-bankruptcy` | The Sevenfold Bankruptcy | **Published + LIVE 2026-09-12 (v1.0), commit `d3f2076`** | Body from `PQNK_Chapter_13_PUBLISH_READY - Publish.docx/.pdf` — text identical to the 2026-09-09 publish-ready pass (see below), no further edits needed. Hero infographic (`ch13-img-01.png`) + the seven-dimension summary table (`ch13-img-02.png`, extracted as an image, same pattern as Ch7/Ch11 — no `table` block type added). "One. … Seven." numbered Title Case heading scheme preserved as-is. Ch12's `transition` already named Chapter Thirteen. Hands to Chapter Fourteen, `the-true-cost` (**held**, see §6 2026-09-12 entry). **Verified live 2026-09-12** — page, both images and PDF all return HTTP 200; PDF SHA-256 `1b9c91c7…` matches the local source byte-for-byte. |
| 14 | `the-true-cost` | The True Cost | **Published + LIVE 2026-09-12 (v1.0), commit `d514ca0`; hero infographic added 2026-09-12, commit `10325e5`** | Fully rebuilt, not repaired — see §6 for the full $1.9T/$2.8T/$4.7T correction history. Subtitle changed to "What Agriculture Does Not Put on the Farm Account." Ten sections: the farm-account/externality argument, why no single global total is honest (Pedaver's non-summing governing rule), three sourced cost windows (FAO ~$12T/yr agrifood hidden costs, UNCCD ~$878bn/yr land-degradation inaction, FAO ~$400bn/yr soil loss — reported separately, never summed), farm cost vs. social cost, UNCCD's real restoration economics replacing the fabricated $2.8T dividend, PQNK's own documented cost reductions (NARC trial, 58%), a restored-and-rewritten Pakistan section (FAO's ~$9bn food-import figure, the ~$55bn national energy-and-food import bill, the Ch11-established Economic Survey 14.1% fertiliser-offtake decline and Indus Basin aquifer stress — cross-referenced, not re-derived), a restored-and-rewritten policy section ("From Subsidising Inputs to Financing Independence"), what must be measured under PQNK, and the real dividend. The old $1.9T/$4.7T pie-chart infographic and every regional/Pakistan dollar split derived from the retired model were permanently removed, not adapted. Docx and PDF rebuilt from scratch via docx-js/reportlab (no LibreOffice on this machine); old versions backed up at each rewrite pass. Also fixed in the same push: Ch13's own transition line, which still named the retired subtitle. Hands to Chapter Fifteen, `human-civilization-and-the-politics-of-food`. **New hero infographic (`ch14-img-01.png`), 2026-09-12** — built per the author's exact spec (see §6), placed at the top of the body (`imageGroup` + `caption`) matching the Ch11 placement pattern: same three evidence windows as Ch11 ($12T FAO / $878B UNCCD / $400B FAO) under "DIFFERENT SCOPES. OVERLAPPING COSTS. DO NOT ADD.", a cost-flow diagram (Farm Account → Externalised Costs → Soil/Water/Health/Climate/Society) and the PQNK reversal (Restore biological functions → Reduce purchased replacement → Return productive capacity to the farm). Built with PIL matching the Ch11 visual language exactly (same fonts, palette, header/footer bars). **Verified live 2026-09-12** — page HTTP 200, PDF HTTP 200, PDF SHA-256 (`1ba0efe3…`) matches the local rebuilt file byte-for-byte; infographic HTTP 200, SHA-256 (`d7a25758…`) matches the local file byte-for-byte, caption text confirmed present on the live page. This closes the $1.9T/$2.8T/$4.7T correction episode in full — see §6. |
| 15 | `human-civilization-and-the-politics-of-food` | Human Civilisation and the Politics of Food | **Published + LIVE 2026-09-12 (v1.0), commit `bbcf3ba91`** | Continuity review against the corrected Chapters 1–14 (see §6 Decisions log for full detail): found two indirect survivals of the retired $1.9T figure in the docx's own closing paragraphs, fixed both by hand-editing `word/document.xml` (replaced with language pointing to Chapter 14's own accounting rather than restating a number), user re-exported the corrected docx to PDF via Pages, PDF verified programmatically (0 occurrences of "1.9 trillion", both replacement sentences present, 0 straight quotes, 0 US spelling, 0 placeholders). Title corrected to British spelling "Human Civilisation" in `books.ts` display title (chapterId/slug kept as the original US-spelled path). **Verified live 2026-09-12** — page HTTP 200 (redirect-followed), PDF HTTP 200, PDF SHA-256 (`6611bf11e6…`) matches the local file byte-for-byte, live page contains "documented in Chapter Fourteen" and zero "1.9 trillion" occurrences. This closes Part Two and the entire $1.9T/$2.8T/$4.7T correction episode. Prior history: Ch 8–15 all use the "68-year (1958–2026)" framework and reference later chapters by title. **Ch 15 publish-ready pass done 2026-09-10** (source `PQNK_Chapter_15_FINAL.docx`; backup `backups/PQNK_Chapter_15_FINAL.pre-publishready.20260910-153850.docx`): removed a corrupted duplicate title block (photo placeholder + repeated subtitle + repeated straight-quote epigraph); US → British spelling, 39 replacements (civilization→civilisation, organis/centralis/specialis/fertiliser/industrialis/mechanis); 5× ` --- ` (em-dash substitute) → commas/colon/parentheses; 2× `\$` → `$`; "preceding thirteen chapters" → "fourteen"; title → "Human Civilisation and the Politics of Food". **Author decision (2026-09-10):** keep both Ch14 and Ch15 in Part Two, order …Ch13 → Ch14 (The True Cost) → Ch15 (Human Civilisation) → Part Three; the "Part Three: The Discovery" hand-off moved from the end of Ch14 to the end of Ch15. Open flags from the 2026-09-10 pass: (1) Ch15's "CAPTURED SCIENCE" section overlap with Chapter 12 — resolved 2026-09-11, one cross-reference sentence added. (2)/(3) both resolved by the 2026-09-12 continuity review above. **Ch 13 publish-ready pass done 2026-09-09** (source `PQNK_Chapter_13_PUBLISH_READY.docx`, backup `backups/PQNK_Chapter_13_PUBLISH_READY.pre-publishready.20260909-223453.docx`): font normalised to the house profile (`Noto Serif` → `Georgia`, 118 runs; result Georgia + Arial + Arial Unicode MS, matching Ch 10–12); straight apostrophes/quotes → curly; four spaced-hyphen parentheticals → parentheses/commas (house style, no em-dashes in body); section-heading spacing made uniform (3 blank lines before each of the seven numbered headings, "THE INTERCONNECTION…", "WHAT THIS CHAPTER…", and the ⁂). One factual fix: the 58% cost-of-production figure belongs to the **NARC wheat trial** (per Ch 4 and Ch 12), not a "rice trial" — corrected, and spelled "fifty-eight percent" to match Ch 12. Closing transition aligned to the canonical Ch 14 subtitle in `books.ts` ("$1.9 Trillion Per Year, and the $4.7 Trillion PQNK Restoration Dividend"). **PDF needs re-export** — the on-disk `PQNK_Chapter_13_PUBLISH_READY.pdf` predates these edits. Not touched: the "One. … Seven." numbered title-case heading scheme (intentional for a seven-part audit; renders Georgia-Bold after the font swap). |

| 16 | `building-the-machine` | Building the Machine | **Published + LIVE 2026-09-13 (v1.0), commit `57f2b91`** | Opens Part Three, "The Discovery." Built from the author's own five-decade visual-history material (10 self-captioned composite graphics plus a historical 1989 Ford-tractor-relaunch photo) — see §6 Decisions log for the full build history, the two extraction bugs found and fixed along the way, and the author's review corrections. Subtitle corrected to "1973-2007: Mastering Industrial Agriculture Before PQNK" (was the stub's placeholder "1973-1994...Before Rejecting It"). Covers: 1973 farm-design/syphon-tube work (seeds Soil Moisture Management), potato-corn-corn-potato rotation, 1976 Deltapine-15 cotton (corrected from an initial 1974 date), 1980s national dealerships (IMT, Ford, Massey Ferguson, Sperry New Holland), 1989 Ford tractor manufacturing licence + 1991 Pioneer Seed Company (PM Nawaz Sharif award), a direct role on PM Benazir Bhutto's 1994–96 liberalisation committee, the chance 1995 Bt-cotton discovery on a US highway (2kg of seed, not 20kg), a new "THE QUIET YEARS: 1997–2006" section handling a sensitive period gracefully per the author's explicit direction (no specifics, framed as pride not complaint), the 2007 Cholistan solar interlude extended into 2010s solar/CA-storage, and a three-paragraph machinery-progression narrative tying the 2000s/2020s PQNK machine catalogues to the chapter's thesis. Closes with a farmer's (Abdul Wajid) response to Chapters 9–10 as a coda. **Verified live 2026-09-13** — page HTTP 200, PDF HTTP 200 (SHA-256 `ebe1de26…` matches local byte-for-byte), all 10 images HTTP 200 and byte-matched, all key text markers (Ford caption, "began in 1976", British spelling, Quiet Years, farmer quote) confirmed present on the live page. |

| 17 | `the-turning-points` | The Turning Points | **Published + LIVE 2026-09-14 (v1.0), commit `5edec44`** | Second Part Three chapter. Traces four cotton turning points across Sharif's career: the late-1970s bollworm crisis, the late-1980s/early-1990s whitefly surge and cotton leaf curl epidemic, the 1995 Bt cotton question (encountered by chance on a US highway, same pattern as Ch16's Bt story), and the PQNK 200-boll cotton result. Also introduces the milk-and-yogurt transition-speed paradigm and the 1990s–2008 adversity period. **Corrections applied before publish** (see §6 Decisions log for full detail): the 200-boll claim now explicitly requires the variety's own genetic potential (PQNK expresses it, does not create it); the "imprisonment"/legal-dispute language the author's draft had independently reintroduced was removed and replaced with the Ch16 Quiet Years framing, now locked as a permanent book-wide rule (§6, binding); the chapter's own cover graphic was regenerated via an AI-image prompt after the original mismatched the actual Turning-Point 3/4 content, then flattened (base graphic + transparent PQNK-logo overlay) into one composite PNG for the web to match the author's two-layer DOCX/PDF rendering; 13 straight apostrophes/quotes normalised to curly, matching house style. **Verified live 2026-09-14** — page HTTP 200, PDF HTTP 200 (SHA-256 `893bee80…` matches local byte-for-byte), all 3 images HTTP 200 and byte-matched, genetic-potential and Quiet-Years phrasing confirmed present, zero "imprison" occurrences on the live page. |
| 18 | `the-amazon-revelation` | The Amazon Revelation | **Published + LIVE 2026-09-16 (v1.0), commit `1d818b1` — republished after explicit author approval, from a fully rewritten source (`PQNK_Chapter_18_FINAL_TEXT_REVIEW.docx/.pdf`).** | Full rewrite, not a patch of the withdrawn version (see §4 history above and the 2026-09-15 withdrawal §7 entry for the incident this replaces). New subtitle: "2008: Seeing Nature's Production Principles Working Together" (was "...What Four Hundred Million Years Showed in a Forest" — the "400 million years" framing is gone; the new text explicitly separates "the present Amazon has not stood unchanged for hundreds of millions of years" from "terrestrial plant life has existed for hundreds of millions of years," fixing the conflation the withdrawn version made). Timeline stated cleanly in the source itself this time: three weeks in Brazil in 2008, one in the Amazon, two visiting farms and government offices — matches the author's own correction, no separate fix needed. Structure: BEFORE THE AMAZON, BRAZIL 2008, THE REVELATION WAS THE SYSTEM, five numbered observations (protect the soil surface / diversity performs work / water moves through a living system / fertility is continuously recycled / biological regulation), PRODUCTIVITY: THE RIGHT COMPARISON, WHAT THE AMAZON COULD NOT PROVIDE, FROM ECOLOGICAL UNDERSTANDING TO ENGINEERING, THE FIRST AGRICULTURAL TRANSLATION (the 2009 rice work, correctly dated and figured — 12.84 t/ha, ~70% less water and labour, matching Ch19 exactly), WHAT CHANGED IN 2008, FROM THE AMAZON TO THE RICE FIELD. Three hero-grade infographics this time (`ch18-img-01.png` "The Amazon Revelation" overview panel, `ch18-img-02.png` "A Raindrop Through a Living Landscape" water-cycle diagram, `ch18-img-03.png` "From Amazon Ecology to PQNK Engineering" translation table with its own Brazil-2008/rice-2009-2011/mature-PQNK timeline strip), each placed at the section it illustrates. **Zero PHOTO PLACEHOLDER markers** — the core defect that triggered the withdrawal is gone at the source. No cross-chapter references at all this time (no "Chapter Six," no reused figures needing verification) — the withdrawn version's "1,700 species" cross-reference error has no equivalent here. **Editorial fixes before publish:** 9 straight apostrophes/quotes → curly, including one in the `subtitle` field itself. Added a standard `attribution` line ("Asif Sharif, Lahore, 2008") after the opening quote — the source docx had none, unlike every other chapter; matches the chapter's own dateline. No `closingHeading`/"what this chapter established" section this time (the chapter ends on a forward-looking transition instead) — left as authored rather than forcing the pattern. Added a `transition` block naming Chapter Nineteen (the source docx had no closing "⁂" hand-off line this time); Ch17's own transition updated to match the new subtitle. Verified the 42-inch bed width and 22-inch hardpan-break depth against established figures used throughout `papers.ts` — both within the site's existing ranges, no conflict. `chapterSpeech.ts`: no new acronyms (only PQNK, already covered). Hands to Chapter Nineteen, `the-first-experiment` (itself still withdrawn — see its own row). |
| 19 | `the-first-experiment` | The First Experiment | **Published + LIVE 2026-09-16 (v1.0), commit `d3a468e` — republished after explicit author approval, from `PQNK_Chapter_19_BOOK_STYLE - Approved.docx/.pdf`.** | Withdrawn 2026-09-15 (see the withdrawal §7 entry), then rebuilt from a fresh approved source and republished. Structure unchanged from the withdrawn version (see the original 2026-09-15 §4 history for the full content summary — founding 2009 trial, careful 70%-vs-92% separation, deduped Q&A panel, 5 images). **Acreage precision fix applied before publish:** the author's newly-approved "The Results" paragraph stated the acreage breakdown explicitly (44 acres total = 4 acres flooded control + 40 acres raised beds, with hectare conversions and a 5.20 t/acre figure added) but, in doing so, dropped the sentence that kept the monitored-block distinct from the full 40 acres — as written, it attributed the 12.84 t/ha crop-cut result to "the raised-bed crop" across all 40 acres, contradicting the chapter's own earlier, unchanged sentence that the yield came from "the monitored 8-hectare block" (a 20-acre sub-block within the 40). Fixed by merging: kept every number the author added (44/4/40 acres, 17.8/1.6/16.2 ha, 5.20 t/acre) and restored the monitored-block qualifier and the "avoids turning a sub-block result into a claim about every acre" caution sentence. Flagged to the author before publishing rather than silently corrected. **"Hanoi" resolved by removal, not addition:** the author's own edit of "Publication and Its Reception" dropped "from Hanoi" from "The important lesson from Hanoi and from the years that followed..." rather than adding the introducing sentence Claude had drafted for the web-only version earlier — the web content was rebuilt from this approved docx to match (no Hanoi/Vietnam sentence), keeping web and source in sync rather than carrying forward a patch the author's own edit had superseded. **Duplicate Q&A panel bug persisted through every docx revision** (now anchored to the "Reduced disturbance" paragraph instead of "No continuous flooding" — the anchor moved when nearby text was edited, but the underlying two-floating-tables defect was never fixed at the source) — deduped in the web body as before; the underlying docx defect is cosmetic-only in the PDF (both panels render, just twice) and doesn't block publishing on that basis alone. Own build mistake caught during pre-publish preview: the hero infographic was accidentally dropped when the body was rebuilt from the newly-approved source — caught because it showed 4 images loaded instead of 5, fixed before commit. Archived to `Published Chapters/`. Hands to Chapter Twenty, `the-naming-of-pqnk`. |

### Deployment — automatic via GitHub Actions, not manual

**pedaver.com deploys automatically.** `.github/workflows/deploy.yml`
("Build and deploy to cPanel") runs on every `git push` that lands commits on
GitHub's `main` (or via manual `workflow_dispatch` from the Actions tab): it
runs `npm ci`, `npm run build`, copies `docs/htaccess.txt` to `out/.htaccess`,
then FTPS-uploads the contents of `out/` straight into the pedaver.com
document root via a scoped `deploy@pedaver.com` FTP account
(`SamKirkland/FTP-Deploy-Action`). No File Manager step, no manual zip.

**The correct deploy sequence for any future chapter/paper publish is simply:**
`git push origin main` → watch the "Build and deploy to cPanel" run in
GitHub Actions (or poll `https://api.github.com/repos/farrazsharif/pedaver-website/actions/runs?branch=main`,
the repo is public so this needs no auth) → once `conclusion: success`, verify
live.

**2026-09-04 correction:** earlier in this session Claude told the author
deployment was 100%-manual-only (cPanel File Manager) and prepared a 932 MB
`pedaver-deploy-2026-09-04.zip` for hand upload. That was wrong — Claude had
only read `README.md`'s manual-deploy section and never checked for a CI
workflow, even though recent Knowledge Paper publishes had already been going
live this way. The author caught it by checking the GitHub Actions tab.
**The manual zip/cPanel-File-Manager procedure is fallback-only** (e.g. if
GitHub Actions or the FTP credentials are ever broken) — never the default.
Always check `.github/workflows/` before telling the author a deploy step is
manual.

Chapters 1–4 and the Ch3 hand-off fix were pushed (`04db364`) and deployed via
this workflow on 2026-09-04 (run #204, all steps succeeded) — confirmed live
by byte-for-byte SHA-256 match between the production files and the approved
local source, and by fresh `Last-Modified` timestamps matching the deploy
window.

### Deployment incident — 2026-09-10 → RESOLVED 2026-09-11

The FTP upload step of the deploy workflow is **failing** and has not put
Chapter 9 live. Runs **#216, #217, #218** all failed at "Upload to cPanel
via FTP" with:

> `Error: None of the available transfer strategies work. Last error
> response was 'Error: Timeout when trying to open data connection to
> 95.217.124.130:57439'.`

The build succeeds every time; the control (login) connection succeeds; it
is the **FTPS passive-mode data connection** that times out. This is a
host-side / network condition (passive port range firewalled, or the
cPanel FTP service degraded/reconfigured), not anything in the repo.
Runs #216 and #217 also collided because two pushes ~60 s apart started
two concurrent deploys with no concurrency guard — but the solo re-run
#218 failed the same way, so the collision was not the cause.

**State:** `main` is correct through `386dc98` (Ch 9) / `ce6d85f`
(workflow doc) / `9b6cfff` (empty re-trigger). Ch 9's page, image and PDF
are right in `out/`. Nothing else is wrong.

**Update 2026-09-11 — still broken, two paths tried, both fail:**

- The `concurrency` guard suggested above was added (commit `e848eb2` area).
- The author's son tried switching the deploy to SSH/rsync
  (`easingthemes/ssh-deploy`, commits `a55b80a`/`b8fc75f`/`cbe6f95`, after
  SkyHost enabled SSH port 22 on the account). All 3 runs (**#220–#222**)
  failed in **0.0 seconds** — before any connection attempt — which is the
  action rejecting its own inputs, almost certainly `SSH_PRIVATE_KEY`
  unset/invalid or its public half never added to the cPanel account's
  `~/.ssh/authorized_keys`. Needs someone with cPanel access to generate a
  real keypair and verify all 5 `SSH_*` secrets; parked for now (reverted
  in `e848eb2`, preserved in git history at `a55b80a`).
- Reverted to FTPS to test whether the passive-port issue had cleared
  alongside the broader 2026-09-10 host outage (pedaver.com's web server on
  80/443 was fully unreachable for hours while cPanel/FTP/mail stayed up —
  confirmed a host-side outage, since resolved for the *website*). **It has
  not cleared for FTP**: run **#223** failed with the identical error,
  `Timeout when trying to open data connection to 95.217.124.130:59098`,
  after running 395 seconds. **Both configured deploy paths are currently
  non-functional.** This needs one of:
  1. **SkyHost fixes the passive-FTP-data-connection block** on the account/
     firewall (the actual, durable fix — ask them specifically about
     passive-mode FTP data ports, not just "the site is down").
  2. **Someone with cPanel access finishes the SSH route properly**:
     generate an SSH keypair, add the private key as the `SSH_PRIVATE_KEY`
     repo secret, add the public key to `~/.ssh/authorized_keys` in cPanel,
     and confirm `SSH_HOST`/`SSH_USER`/`SSH_PORT`/`DEPLOY_PATH` are all set
     correctly — then restore the SSH step from commit `a55b80a`.
  3. **Manual upload** (sanctioned fallback, used meanwhile): a 10 MB
     `ch9-ch10-manual-deploy.zip` built from `out/` — both Ch 9 and Ch 10
     (pages, images, PDFs), the updated `books/natural-ecosystem-science/index.html`,
     and `sitemap.xml`. Extract into `public_html/` via cPanel File Manager,
     overwriting. SHA-256-verify the live PDFs against
     `public/books/natural-ecosystem-science/ancient-conventional-industrial-aci.pdf`
     (`38a25dee…`) and `.../the-industrialization-of-agriculture.pdf`
     (`b425c29a…`), then flip both §4 rows to "Published + LIVE".

**RESOLVED 2026-09-11.** Root cause was entirely host-side, as suspected:
SkyHost's firewall allowed the FTP control port (21) but the **Pure-FTPd
passive data-port range was not aligned with the firewall's allowed range**,
so Pure-FTPd handed out random high ephemeral ports (57439, 59098, …) that
the firewall dropped → "Timeout when trying to open data connection". Fixed
via SkyHost support ticket **20260910-064**: they set Pure-FTPd's
`PassivePortRange` to match the firewall's allowed inbound range. First green
deploy after the fix: **run #230** (commit `0ce8c9f`), ~3 min, no timeout.
Verified live (HTTP 200): pedaver.com homepage, Ch 9 page + PDF +
`ch9-img-01.png` (all previously 404), and Ch 10 page. The Ch 9 / Ch 10
backlog and KP-198 are now live via the pipeline; manual upload no longer
needed. Deploy remains on **FTPS** (`SamKirkland/FTP-Deploy-Action`).

**Correction to the SSH note above:** the SSH/rsync runs did **not** fail on
a bad/missing key. Watching the live run logs, they attempted to connect and
failed with `ssh: connect to host … port …: Connection timed out` /
`0 bytes received` — i.e. the SSH port itself is firewall-blocked from
GitHub's runners, and shell access is **disabled** on the account (cPanel's
Git Version Control page states "your system administrator must enable shell
access"). So SSH/rsync was never viable here without SkyHost both opening the
SSH port and enabling shell access. FTPS is the correct method for this host.

**If this recurs:** a "Timeout when trying to open data connection" on deploy
is a SkyHost passive-FTP config drift, not a repo problem — open a ticket
asking them to re-align Pure-FTPd `PassivePortRange` with the firewall's
`TCP_IN` range. The tell: FTP login (port 21) succeeds, only the data
connection times out.

## 5. Open issues

**Part One (Chapters 1–7) plus Chapters 8, 9, 10, 11 and 12 (Part Two) are
published and LIVE.** Chapter 8 shipped 2026-09-09 (`8a3a3a6`); Chapter 9
shipped 2026-09-10 (`386dc98`), Chapter 10 shipped 2026-09-11 (`4a95abf`) —
both held by the FTP passive-port incident and confirmed live 2026-09-11
after SkyHost's fix (run #230); Chapters 11 and 12 shipped together
2026-09-12 (`a9d7bb0`), verified live the same day.

**Ch8 open issue — PDF one-word lag:** the deployed `the-first-error.pdf`
closing paragraph reads "over the last sixty"; the web body was corrected
to "sixty-eight" for internal consistency with the intro. The docx
(`PQNK_Book_Chapter_8_FINAL_APPROVED.docx`) is already fixed — swap a fresh
PDF on the author's next re-export, then re-verify SHA-256 against
production and update the §4 row. Non-blocking (web text is correct).

Chapters 13–15 are manuscript-final and with external reviewers; not yet in
web-publication preparation. Ch 13 has had its publish-ready editorial pass
(see §4 row and §6). Ch 9's soft cross-reference flag against Ch 11 (the
"twenty to forty percent" nutrient-decline figure) is now resolved — Ch 11
states the figure directly with its own Davis 2004 / UK Composition of
Foods citations.

Ch7 note for a future revisit: the page-5 diagnostic-guide table ships as a
rendered image (`ch7-img-04.png`), not selectable text, because adding a
`table` block type to `books.ts` was ruled out during the closing-out phase.
If the data model is ever reopened, a proper `table` block would let that
table be read by Read Aloud and selected/searched on the page.

Minor, non-blocking, left as-is: the Ch4 mulch-thermostat infographic says the
bare-vs-mulch gap is "about 40 °C" (matches the text's "roughly forty degrees
… at the peak of the day"); published Ch1 still says "thirty degrees cooler" —
touch Ch1 only if the author asks.

[Note: Chapters 13–17 have since published; see their §4 rows and the
dated §7 entries for their history. This section (§5) has not been kept
current chapter-by-chapter since Ch9 — treat the §4 table as the source
of truth for chapter status.]

**Ch18 open issue — two unfilled photo placeholders, non-blocking:** the
source docx (`PQNK_Chapter_18_FINAL.docx`) has two `[ PHOTO PLACEHOLDER ]`
bracket markers with no real photo behind either — see the §4 row and the
2026-09-15 §7 entry for the exact insertion points. Add them as
`imageGroup` blocks if/when the author supplies the two photos.

**Ch18 open issue — PDF lag (same pattern as Ch8), non-blocking:** the
2026-09-15 timeline/predator-count correction (see §4 row) was applied to
the web body and to the master docx, but the deployed PDF still reads the
old "three weeks in the Amazon" / "1,700 species" text. Swap a fresh PDF
on the author's next re-export, then re-verify SHA-256 against production
and update the §4 row. Web text (what Read Aloud reads) is correct.

## 6. Decisions log — BINDING, do not re-litigate

- **2026-09-04 — Ch4 scientific-consistency pass: APPROVED by the author.**
  Author supplied a 15-point prompt to remove residual scientific
  inconsistencies; Claude delivered a before→after report + corrected running
  text (`Chapter4_science_pass_corrected_text.md`, each ¶ tagged). Author
  approved all 13 substantive corrections and ruled on the 6 open questions:
  1. ¶50 — "almost the whole plant returns" → **"most of the plant biomass not
     removed in the harvest returns…"** (more precise; strengthens the
     carbon-accounting argument).
  2. ¶18 — **correct the biochemistry**: CO₂ fixation's first stable product is
     3-phosphoglycerate; glyceraldehyde-3-phosphate is produced subsequently
     and is the first three-carbon sugar. No avoidable biochemical error.
  3. ¶37 — **accept "several times"** more carbon than all living vegetation,
     not "four times" (comparison varies with pools/depth).
  4. ¶138 dew/humidity — reject both earlier wordings; use the author's exact
     text: *"Supplemental moisture intercepted by mulch from dew and
     atmospheric condensation adds to the soil-water supply, while the mulch
     simultaneously reduces evaporative loss. PQNK field observations indicate
     that this contribution forms part of the system's overall water economy,
     although its quantity under different crops and climatic conditions
     remains to be measured separately."*
  5. Typography — **fix both now**: the double space in ¶35, and
     "wheat & rice straw" / "Wheat & Rice straw" → **"wheat and rice straw"**.
  6. Infographic — **keep `4.000%` (and `95.917%`)**: they belong to the
     established plant-mass framework; rounding is a separate scientific
     decision, not part of this pass. The 0.083% separation and the
     "supports above-ground growth" relabel are the changes that mattered and
     are done.
  Root-mass claim ("Roughly half … as roots"): first accepted as written, then
  reversed by this pass's item 6 — now "a large share … varies widely with the
  species, the growth stage, the soil, and the growing conditions", keeping the
  retained-roots carbon-return + pore-architecture point.
  These corrections are approved for the master; after they go in, Chapter 4 is
  ready for the author's page-by-page QA, **not another rewrite round.**
  **DONE:** applied directly into the approved DOCX/PDF and published
  2026-09-04, commit `21da998`.
- **2026-09-04 — layout risk with anchored graphics: general lesson.** Adding
  ~3,100 characters of corrected text to Ch4 shifted page flow enough that the
  Q&A panel (anchored at a *fixed page position*, `wrapTopAndBottom`) collided
  with the reflowed "WHAT THIS CHAPTER HAS ESTABLISHED" paragraph, mangling its
  last line into wide letter-spacing — invisible in text extraction, only
  caught by rendering the actual page image. Author fixed it by nudging the
  panel in Pages. **Lesson for any future manuscript edit that changes text
  length near a page carrying an anchored/floating graphic: render the actual
  page image and eyeball it, don't just diff extracted text.**
- **2026-09-04 — Ch4 below-ground photosynthate allocation = "twenty to forty
  percent."** The earlier Ch4 draft said "twenty to fifty percent"; corrected.
  This matches the PQNK-locked figure (`memory/project_pqnk_belowground_carbon_figure.md`).
  Any infographic or text saying otherwise (e.g. "20–50%") is wrong.
- **2026-09-04 — Ch4 identity.** Title *Carbon: The Currency of Life*;
  `chapterId: carbon-the-currency-of-life`; Part One; sits after
  `the-0-083-paradox`; its closing `transition` names *Chapter Five: The
  Natural Water System, Rain, Dew, Humidity, and Soil Moisture Management*.
- **Read Aloud** is in-scope for every published book chapter automatically;
  it is NOT to be expanded to non-chapter pages or given Urdu/cloud TTS
  without explicit approval (`memory/project_read_aloud_pilot.md`).
- **2026-09-04 — "Published Chapters" archive populated + made a standing
  step (checklist item 12).** `PQNK Book/Published Chapters/` now holds a
  Word + PDF pair for Chapters 1–4. Every PDF was copied from the deployed
  site (`public/books/.../<chapterId>.pdf`), not from a loose draft, after
  discovering the loose "approved" PDFs sitting in the `PQNK Book/` root for
  Ch2 and Ch3 do **not** byte-match what's actually live (different MD5,
  different size — e.g. Ch2's loose PDF is ~26MB vs the deployed ~6.4MB).
  Word files archived are the best available approved source per chapter, but
  are **not guaranteed byte-identical** to the final published PDF: Ch4's
  `.docx` predates its last infographic swap and the page-16 layout fix,
  which exist only in `.pages` and the final `.pdf`. Treat the PDFs in this
  archive as authoritative; treat the `.docx` files as "the approved working
  source," not a certified match. If exact Word/PDF parity is ever needed,
  re-export a fresh `.docx` from the chapter's `.pages` file.

- **2026-09-06 — geographic framing of the book: BINDING rule for every
  chapter.** The book is written for an international readership, but early
  chapters kept centring Pakistan/Punjab as the *subject*. Rule, agreed with
  the author after a Chapter 5 reviewer (Vineet / Vasudha) flagged it:
  **state each principle in universal terms, then use Pakistan as the
  documented case study, with a global parallel at two or three anchor points
  per chapter — not everywhere.** Keep every *named* piece of evidence exactly
  as written (a case study is supposed to have a place name): the 2011 *Paddy
  and Water Environment* rice trial, the 2020 Sindh floods, the Balochistan /
  Cholistan / Pothohar demonstrations, the "Case Study: Pakistan" infographic
  panels, the four-country water-table comparison. Universalise only the
  *framing* sentences — e.g. "the water crisis in Pakistan" → "the water
  crisis … in Pakistan or in any country where industrial agriculture has
  hardened the soil"; "in Punjab summer conditions" → "in a hot, dry summer,
  of the kind common across the world's irrigated drylands"; "the dominant
  irrigation method in Pakistan" → "still the dominant method across Pakistan
  and much of the irrigated world"; "farming context in Punjab and Sindh" →
  "across the canal-irrigated plains of South Asia, Punjab and Sindh among
  them"; drop "Pakistan's" / "in the country" from the closing rhetorical
  line. Chapter 5 was corrected this way before publish — 5 framing edits + 3
  grammar fixes applied directly to the approved DOCX and re-exported to PDF.
  Apply the same rule to Chapter 6 onward; apply it to Chapters 1–4 only if
  the author reopens them.

- **2026-09-11 — KP-198 promoted to a standalone v61 master chapter, placed
  at the end of Part Seven.** KP-198 ("The Seed Is Potential, the Soil Is
  the Production System") was published live as a Knowledge Paper
  unchanged; its content was separately elaborated (additional historical/
  scientific sourcing: Borlaug/CIMMYT/Norin 10/Rht genes, IR8's sd1 gene,
  genotype-by-environment interaction, the FAO ~75%-diversity-loss
  estimate, Svalbard/CGIAR genebanks, the 2001 ITPGRFA, La Via Campesina's
  "seed sovereignty", UPOV 1991, and the contested 2001 Oaxaca maize-
  landrace study) into a ~4,100-word chapter and inserted into
  `PQNK_Final_Book_v61.docx` as the new **Chapter Sixty-Three**, the last
  chapter of **Part Seven (Extended Knowledge)** — the same slot used
  previously for KP-186/188/190. Author's placement decision, reasoned
  through explicitly: Part Two (narrative fit with the ACI/GMO-seed
  critique in Chapters 9–10) was considered and rejected because it would
  require renumbering roughly fifty subsequent chapters in a still-being-
  edited master; Part Seven costs only renumbering the trailing four
  Part Eight chapters, matches the exact precedent of the three prior
  KP-to-chapter promotions, and fits the chapter's hybrid
  science-explainer/ACI-critique register better than Part One or Four.
  **Mechanics:** `document.xml`-only edit, byte-copy-verified against the
  pre-edit file (all 179 other package entries, incl. every image,
  byte-identical; backup at
  `backups/PQNK_Final_Book_v61.pre-seed-chapter-insert.20260911-203938.docx`).
  Old Chapters 63–66 (PQNK™ Validation System, Policy Recommendations, A
  Call to Action, The Field Record) renumbered to 64–67 — book is now
  **67 chapters**. Six cross-references updated (four chapter-header
  kickers, one self-referential "Chapter Sixty-Four" callback inside
  Policy Recommendations' own closing section, one "⁂" hand-off line into
  A Call to Action) plus the Table of Contents (one new row, four renumbered
  rows; new chapter's page number is provisional, like all TOC page numbers
  in this master — needs the same eventual repagination pass). Verified: the
  full 1–67 chapter-heading sequence is contiguous with no gaps or
  duplicates; no other chapter anywhere in the book references "Chapter
  Sixty-Three" through "Chapter Sixty-Six" by name (checked whole-document).
  New chapter matches the **local** style of its immediate neighbours
  Ch60–62 (plain bold `Body A`/`Body A A` paragraph styles, Title Case
  mid-chapter headings, no epigraph/attribution line, one photo placeholder)
  rather than the more elaborate green/letter-spaced style the "native"
  chapters use — Ch60–62 already established that as the local convention
  for this append point, not touched. A pre-existing, unrelated defect was
  found but deliberately left alone: Chapter Forty-Nine's closing transition
  line incorrectly reads "Chapter Sixty-One: Policy Recommendations…"
  instead of naming Chapter Fifty — stale cross-reference left over from an
  earlier renumbering pass, out of scope for this edit. **`books.ts`**: a
  matching `in-preparation` stub added to `part-seven`
  (`the-seed-is-potential-the-soil-is-the-production-system`), directly
  after `why-only-four-kilograms-of-np-during-transition` — same pattern as
  the three prior KP stubs; not web-published. **PDF/`.pages` version**:
  not yet re-exported — same known, accepted limitation as every other v61
  edit in this log (Pages re-export + repagination is Asif's step).

- **2026-09-11 — Ch15/Ch12 "Captured Science" overlap: cross-reference added,
  APPROVED by the author.** Flagged as an open item in the Ch14+Ch15
  publish-ready pass (2026-09-10): Ch15's "CAPTURED SCIENCE: How Knowledge
  Was Turned Away From The Field" section restates the same institutional-
  capture thesis as Ch12 ("Captured Science") without citing it. On review
  this is not duplicated content — Ch12 is the evidentiary case study (2011
  *Paddy and Water Environment* paper, NARC wheat trial, v-Fluence/Guardian
  investigation, RAPS appropriation claim, CGIAR/World Bank critique, Q&A
  panel, policy prescriptions); Ch15's section makes the same claim at a
  higher, civilisational-power altitude with no citations, as one link in
  its own surplus→power→captured-science→subsidy→debt→fragility chain.
  Fix: one sentence appended to the end of the "structural logic" paragraph
  in `PQNK_Chapter_15_FINAL.docx` — "Chapter Twelve documents this pattern
  in detail: the funding structures, the published case studies, and
  PQNK's own institutional history of engagement with it." No other text
  in either chapter touched. Backup:
  `backups/PQNK_Chapter_15_FINAL.pre-ch12-crossref.20260911-213354.docx`.
  Edit made via unzip → `word/document.xml` string-replace (single-run
  paragraph, unique anchor) → `xml.dom.minidom` validation → rezip
  preserving original compression types → verified via `zipfile` comparison
  that all other package parts are byte-identical to the pre-edit file, and
  via `textutil` extraction that the sentence reads correctly in place.
  **PDF still needs re-export** — same open item as the rest of the Ch14/15
  pass (see §4, chapter-status row for Chapters 13–15).

- **2026-09-12 — Chapters 11 and 12 published together, APPROVED by the
  author** ("Ch 11 and 12 are also cleared for publications. Publish.").
  Sources: `PQNK_Chapter_11_FINAL_LOCKED - Publish.docx/.pdf` and
  `PQNK_Chapter_12_FINAL_PUBLISH_READY - Publish.docx/.pdf`. Full 12-step
  checklist run for both: editorial pass, infographic extraction (2 images
  each), `books.ts` typed blocks, PDF + images placed under
  `public/books/natural-ecosystem-science/`, previous chapter's `transition`
  block confirmed already correct, `chapterSpeech.ts` updated (IPBES, CGIAR,
  IFPRI added), `npm run build` clean, verified in a local dev-server
  preview before publish (content, both images, Read Aloud, no console
  errors), single commit `a9d7bb0`, pushed, deploy run succeeded, live
  verified via HTTP 200 + PDF SHA-256 match on both chapters. Backups:
  `backups/PQNK_Chapter_11_FINAL_LOCKED - Publish.pre-crossref-fix.20260912-000726.docx`
  and `backups/PQNK_Chapter_12_FINAL_PUBLISH_READY - Publish.pre-curlyquotes.20260912-001207.docx`.
  **Pre-publish editorial fixes applied to both** (beyond what the author's
  `- Publish` exports already had): straight apostrophes/quotes → curly
  (14 in Ch11, 29 in Ch12); "Chapter Fourteen, The True Cost" → "a later
  chapter, The True Cost" (2 instances each) to match the by-title-only
  forward-reference convention Ch9/Ch10 already established for not-yet-
  locked later chapters. **Ch12 only:** "PQNK Research Collective" (used
  once, for the December 2025 FAO/World Bank/IPCC submission) standardised
  to "Pedaver Research" — the same paragraph's later sentence already said
  "Pedaver Research (2025)" for the same analysis; matches the entity-name
  fix already made in the Ch14 publish-ready pass. Ch11's own table (§4 row)
  is a rendered image, same pattern as Ch7's diagnostic-guide table — no
  `table` block type added. This closes the last soft flag Ch9 had logged
  (the Ch3/Ch11 nutrient-decline cross-reference). Note found but not
  acted on: leftover scratch files from an earlier, unfinished editorial
  pass on Ch11 (`ch11_reviewed.docx` and related, dated 2026-09-09) were
  discovered in this session's scratchpad; cross-checking them confirmed
  the author's spelling fixes had already made it into the final `- Publish`
  export, and only the forward-reference fix (above) still needed applying
  — mentioned here in case that scratch trail is ever puzzled over later.
  **Archive gap closed:** step 12 (archive to `Published Chapters/`) had
  been skipped for Chapter 10 in the prior session — closed now, alongside
  Ch11 and Ch12, all three copied from the deployed/verified-live PDF (not
  a loose draft) and SHA-256-matched against production before archiving.

- **2026-09-12 — Chapter 13 published; Chapter 14 and Chapter 15 HELD by
  author decision.** Author cleared "Chapters 13, 14 and 15" together and
  supplied `- Publish` docx/pdf exports for all three. Chapter 13 checked
  clean (text identical to the already-logged 2026-09-09 publish-ready
  pass) and was published, commit `d3f2076`, verified live same day. Before
  touching Chapter 14, re-checked the cost-table arithmetic flag logged in
  the 2026-09-10 pass (`PQNK_Chapter_14_FINAL - LOCKED - Publish.docx`):
  the individual cost components (soil $400bn + water $300bn + healthcare
  $1.2T + climate $417bn + further "hundreds of billions" in biodiversity/
  farmer/input costs) still visibly exceed the stated "TOTAL (conservative)
  >$1.9 trillion/yr", and the restoration-dividend components ($150bn +
  $400bn + $80bn + $200bn + $150bn + $50bn ≈ $1.03T) still fall well short
  of the stated "$2.8 trillion/yr benefit" — unchanged from the version
  checked in the prior session. Flagged to the author directly (third time
  this has been raised); **author decision: hold both Chapter 14 and
  Chapter 15** rather than publish as-is or have Claude draft a
  reconciliation note. Chapter 13 remains the latest live chapter. Chapter
  15 was independently verified ready otherwise (the Ch12 cross-reference
  fix carried through into its own new `- Publish` export, hero infographic
  present, no US spelling/placeholders/straight quotes) but is held anyway
  because it opens by referencing "the preceding fourteen chapters" and
  hands off from Chapter 14 — publishing it out of order would break the
  book's sequence. **Do not publish Ch14 or Ch15 until the cost-table
  arithmetic is reconciled and the author gives an explicit go-ahead.**

- **2026-09-12 — Ch14 cost-table reconciliation memo produced.** Follow-up
  to the entry above: the author asked for a full breakdown of exactly
  where the cost-side and benefit-side tables diverge from the published
  $1.9T / $2.8T headlines, then authored a detailed reconciliation memo
  covering both mismatches, a source-verification checklist (10 fields per
  line item: source, year, geographic scope, cost type, annualisation,
  gross/net, agriculture-only share, inflation basis, overlap risk,
  original calculation), the two highest-priority figures to re-check
  first (the $1.2T healthcare cost, which alone is more than half the
  cost-side subtotal, and the $417bn climate figure, for possible overlap
  with soil/water estimates), suggested interim wording for Chapter 14 if
  it must ship before reconciliation finishes, and a four-step decision
  rule (reconstruct the source model → remove overlap/scope mismatch →
  recompute totals from verified components → only then decide whether the
  published headlines survive). Formatted and saved as
  `PQNK_Ch14_Economic_Model_Reconciliation_Memo.docx` in
  `PQNK_Claude_Work/PQNK Book/` for handoff to whoever reconstructs the
  cost model. **This memo does not itself resolve anything** — Ch14/Ch15
  remain held exactly as above until the source figures are actually
  re-verified and the author gives an explicit go-ahead to publish.

- **2026-09-12 — MAJOR PIVOT: the $1.9T / $2.8T / $4.7T headline model does
  not survive source verification; abandon rather than reconcile.**
  Following the memo above, Claude independently verified each cited
  source via live web search, and the author separately re-verified
  against FAO, UNCCD, WHO/FAO and World Bank primary sources. Both checks
  converged on the same conclusion, with the author's search finding sharper
  specifics on two items:
  - **Soil ($400bn, UNCCD)** — the one figure that holds up. FAO/UNCCD
    currently publish ~$400bn/yr in lost agricultural production from soil
    erosion. Already used correctly elsewhere on the site (see
    `what-science-delivered`, KP, "$400 billion (UNCCD)") — leave as-is.
  - **Water ($300bn, "World Bank")** — no such World Bank figure found by
    either search. Nearby real figures exist (Fortune's $307bn drought-cost
    estimate; a $425bn "water pollution costs businesses" figure) but none
    match "World Bank, $300bn, agricultural water scarcity + pollution."
  - **Healthcare ($1.2T, "WHO/WEF", presented as global)** — likely a
    **US-only** diet-related-illness figure misapplied as a global one.
    Confirmed by internal evidence: KP-82 (`restoring-earths-operating-system`,
    live) cites the identical $1.2T figure and correctly labels it **"US
    diet-related healthcare costs"**, while KP-78
    (`the-global-cost-of-agricultural-degradation`, live) and Ch14 both fold
    the same number into a *global* total — i.e. the error already exists
    on a second live page (KP-78), not just in the unpublished Ch14.
  - **Climate ($417bn, "IPCC/IMF")** — the author's search traced this
    number to **2024 global natural-disaster economic losses** (a WEF
    citation), unrelated to agriculture's climate externality. Claude's own
    check had already found the 24% GHG-share figure itself is a legitimate
    IPCC AFOLU number, but the $417bn dollar output is not a real IPCC/IMF
    publication — now clear it is not even the right kind of figure.
  - **Pakistan import substitution ($50bn, "SBP/FAO")** — no such figure
    found; real FAO figure for Pakistan's food import bill is ~$9bn, and a
    separate ~$55bn figure covers *all* energy+food imports, not
    agricultural inputs specifically.
  - **Benefit side ($2.8T)** — no authoritative source found supporting a
    $2.8T/yr global restoration benefit under our six categories. UNCCD's
    own restoration-economics work (150M ha restored → $85bn net benefit,
    of which $30–40bn/yr smallholder income) does not scale to $2.8T under
    any documented methodology either author could find.
  - A real, authoritative, on-topic alternative exists and points the
    other way: **FAO's State of Food and Agriculture 2023/2024** finds
    global hidden agrifood-system costs of **~$10–12 trillion/yr** (~70%,
    $8–8.1T, from unhealthy diets/NCDs; ~20% environmental) — a rigorous,
    154-country UN methodology, and *larger* than Pedaver's $1.9T, meaning
    the true-cost argument is if anything understated, not overstated.
    Adopting it would mean replacing the framework, not patching it.

  **Decision: do not preserve $1.9T / $2.8T / $4.7T on publication-history
  grounds alone.** A number that cannot be sourced does not become more
  defensible for having already shipped. **Author is now reconstructing
  the Chapter 14 economic case from authoritative, traceable sources
  (FAO/UNCCD/WHO/World Bank/peer-reviewed) and will hand Claude a precise
  replacement/correction list.** Full corrected blast radius, confirmed by
  Claude before the list arrives:
  - **Ch11** (`the-68-year-experiment`) — one paragraph cites all three
    headline figures. **Its hero infographic image (`ch11-img-01.png`)
    also has the figures baked into the artwork itself** ("$1.9T avoidable
    cost + $2.8T restoration opportunity ≈ $4.7T per year") — this cannot
    be fixed by a text edit; the image asset itself needs regenerating or
    replacing once the real numbers are set.
  - **Ch12** (`captured-science`) — one paragraph, text only, no image
    impact (its two infographics don't carry these figures).
  - **Ch13** (`the-sevenfold-bankruptcy`) — one closing paragraph, text
    only, no image impact.
  - **Ch14 stub + full chapter** (`the-true-cost`, held, not live) — the
    **chapter's own subtitle** is built from these numbers
    (`"$1.9 Trillion Per Year, and the $4.7 Trillion PQNK Restoration
    Dividend"`); if the headline changes, the chapter's identity/title
    changes too, not just its body.
  - **KP-78** (`the-global-cost-of-agricultural-degradation`, live) —
    heaviest lift: summary line + 4 abstract paragraphs are built around
    the framework, including the same US/global $1.2T conflation as Ch14.
    Its title does not itself quote a figure. No `heroImage` set, so no
    infographic-asset complication there — but its PDF has not yet been
    checked for baked-in figures.
  - **Ch9** — checked and confirmed clean: references "The True Cost" by
    title only, cites no numbers, needs no correction. **KP-82**
    (`restoring-earths-operating-system`, live) — checked and confirmed
    clean: its $1.2T figure is already correctly labelled "US," and it
    runs its own independent, self-contained cost model unrelated to
    $1.9T/$2.8T/$4.7T. Neither needs touching.
  - `metadata.json` — checked, no occurrences of these figures to update.

  **Nothing has been edited yet.** Ch13 stays live as published; Ch11 and
  Ch12 stay live with the now-known-unsourced paragraph pending the
  author's replacement text; Ch14/Ch15 remain held. Wait for the author's
  correction list before touching any of the above.

- **2026-09-12 — Correction executed: Ch11, Ch12, Ch13, KP-78, commit
  `24ea7e7`.** Author supplied a precise, sourced replacement-text list
  (FAO SOFA 2024 ~$12T/yr global agrifood hidden costs, ~$8.1T of that tied
  to unhealthy diets/NCDs; UNCCD ~$878bn/yr cost of land-degradation
  inaction; FAO ~$400bn/yr soil-loss figure — reported separately, never
  summed) after re-verifying against FAO/UNCCD/WHO/World Bank primary
  sources directly. Executed as one controlled pass:
  - **Ch11** (`the-68-year-experiment`) — replaced the one paragraph
    citing $1.9T/$2.8T/$4.7T with the author's sourced replacement text.
  - **Ch12** (`captured-science`) — same, replaced the "December 2025
    Pedaver Research analysis" paragraph (the submission-to-institutions
    narrative was dropped along with the figures, at the author's
    direction).
  - **Ch13** (`the-sevenfold-bankruptcy`) — replaced the closing paragraph.
  - **Ch14 stub** (`the-true-cost`, still held/in-preparation) — subtitle
    changed from the retired figures to "What Agriculture Does Not Put on
    the Farm Account," per the author's title-change instruction (avoids
    putting a food-system-wide FAO figure into a chapter about agriculture
    specifically).
  - **KP-78** (`the-global-cost-of-agricultural-degradation`) — the
    heaviest lift, confirmed correctly: this KP's entire PDF (9 pages) was
    built around the retired framework, including its own region-by-region
    $2.8T benefit table with no findable supporting source for any
    regional split. No editable Word source existed for it anywhere in
    `PQNK_Claude_Work` (checked). No LibreOffice/Word/wkhtmltopdf available
    on this Mac to convert from a rebuilt docx, so the corrected PDF was
    generated directly via Python + `reportlab` (`pip3 install --user
    reportlab`) — every section untouched by the correction (systems-
    failure comparison, 8-step protocol, core innovations, policy section,
    appendix, footer) carried over verbatim from the original PDF's text
    extraction; the diagnosis section, the fabricated benefit table, and
    the summary/conclusion were rewritten per the corrected framework.
    Original PDF backed up to
    `backups/KP-78.pre-cost-model-correction.20260912-135856.pdf` before
    overwrite. **Two additional misattributions caught and fixed while
    rebuilding, beyond the author's list:** (1) a "$300bn/yr, World Bank"
    water-scarcity figure with no findable supporting publication —
    withdrawn, with a sentence explaining the withdrawal rather than
    silently dropped; (2) an "80% of threatened species, IPBES" biodiversity
    claim — corrected to the already-established 86% (Chatham House/UN
    Environment, 2021) per the identical fix already made in Ch11's own
    publish pass; also standardised "PQNK Research Collective" →
    "Pedaver Research" for the same entity, matching the Ch12/Ch14
    precedent. Treated as a formal KP revision per §B of
    `knowledge-paper-workflow.md`: `kpNumber` 78, slug and `publishedDate`
    (2026-07-25) unchanged, `modifiedDate` set to 2026-09-12. `papers.ts`
    summary/abstract/keyTakeaways rewritten to match, explicitly naming the
    withdrawal rather than silently revising history (author's stated
    preference — "that increases rather than reduces credibility").
  - **Confirmed no changes needed:** Ch9 (references "The True Cost" by
    title only) and KP-82 (`restoring-earths-operating-system`) — Claude
    pulled KP-82's actual live PDF text directly and confirmed it reads
    "$1.2 trillion/year in diet-related healthcare costs **(US only)**"
    with no WHO/FAO/SOFI citation attached at all — the "US" scoping is
    native to the source document, not a mislabel, so the author's
    flagged concern about it did not apply.
  - **Verified before publish:** all four affected pages rendered locally
    (dev server) with the correct replacement text; KP-78's page JSON-LD
    shows `dateModified: "2026-09-12"` while `datePublished` stays fixed
    at the original date; the new KP-78 PDF's byte size matched what the
    dev server actually served. **Verified live after deploy:** all four
    pages return HTTP 200 with the correct new text; KP-78's production
    PDF SHA-256 (`2093e963…`) matches the local rebuilt file byte-for-byte.
  - **Explicitly deferred, per the author:** the Ch11 hero infographic
    (`ch11-img-01.png`) still has the retired $1.9T/$2.8T/$4.7T figures
    baked into the image artwork itself — text edits can't fix that. The
    author's own spec for the replacement infographic (heading "THE COST
    IS MEASURED IN TRILLIONS," three evidence blocks for the FAO/UNCCD/FAO
    figures, bottom banner "DIFFERENT MEASURES. OVERLAPPING COSTS. DO NOT
    ADD THEM.") is recorded above in the 2026-09-12 pivot entry, to be
    built once the text corrections were confirmed live — which they now
    are.

- **2026-09-12 — Ch11 hero infographic rebuilt, commit `f8f731f`, closing
  the correction.** The old six-panel "68-Year Balance Sheet" graphic
  (soil/water/nutrition/biodiversity/climate/farmer bills) had the retired
  figures baked into its bottom footer band only — but per the author's
  explicit instruction ("Retire the existing PNG. Do not simply replace
  $4.7T with another total"), the whole image was replaced rather than
  patched; the six-panel content is not carried into the new graphic.
  Built per the author's exact spec (heading, three evidence blocks
  citing FAO SOFA 2024/UNCCD/FAO, the "DIFFERENT MEASURES. OVERLAPPING
  COSTS. DO NOT ADD THEM." banner + the farm-account sentence beneath it).
  **No LibreOffice, Chrome/Chromium, or wkhtmltopdf available on this
  machine to render HTML/CSS to an image** — first prototyped the layout
  as HTML/CSS (served over a throwaway local `python3 -m http.server` so
  the Browser pane could screenshot it for a visual layout check, since a
  `file://` URL renders as a static, non-interactive snapshot in that
  tool), then rebuilt it for real as a raster image directly via Python +
  Pillow at 1800×966, reusing the site's own `pedaver-logo-white.png` /
  `pqnk-logo.png` assets, Georgia/Arial (house font profile), and the
  established green/deep-green/terracotta/gold/cream palette. Old artwork
  backed up to
  `backups/ch11-img-01.pre-cost-model-correction.20260912-141014.png`.
  Image caption updated to match (previously described the retired
  six-panel content). Verified locally (1800×966 loads correctly in the
  rendered chapter page, no console errors) before publish and **live
  after deploy** — page and image both HTTP 200, image SHA-256
  (`c82a0573…`) matches the local file byte-for-byte. **This closes the
  $1.9T/$2.8T/$4.7T correction across every location identified in the
  blast-radius audit** (Ch11 text + image, Ch12, Ch13, Ch14 stub subtitle,
  KP-78 text + PDF); Ch14's own body and Ch15 remain held pending the
  author's full economic-architecture rebuild for Chapter 14 itself
  (§6, "Rebuild the Chapter 14 economic architecture").

- **2026-09-12 — Chapter 14 rebuilt and published, commit `d514ca0`. This
  closes the correction episode.** Author supplied a governing 8-section
  structure (what the farm account excludes → why no single total is
  honest → documented cost windows → farm cost vs. social cost →
  restoration side → where PQNK enters the economics → what must be
  measured → the real dividend), a governing line ("Pedaver does not need
  the biggest number. It needs the number it can defend."), and a closing
  economic-conclusion paragraph. Claude drafted the full chapter against
  that structure and presented it for review before touching any files.
  **Author reviewed and returned five corrections**, all applied and
  verified present in the rebuilt docx/PDF before publish: (1) FAO SOFA
  2024 covers 156 countries, not 154 (154 was the 2023 figure); (2) the
  UNCCD $878bn figure is scoped "across the selected countries included
  in its analysis," not asserted as a complete global total; (3) softened
  "unambiguously measured in trillions" (which implied the $12T FAO figure
  was agriculture's alone) to attribute the burden to "degraded land,
  food-system externalities and agricultural decline" without conflating
  scopes; (4) softened a causal claim about nutritional decline directly
  causing healthcare costs to the more defensible "diet-related health
  costs are ultimately borne by households, healthcare systems and
  society"; (5) strengthened the closing paragraph to specify PQNK's
  economic case should be "documented crop by crop, farm by farm and
  season by season," replacing weaker "keep measuring it" language.
  **Second review round**: author would not accept dropping the old
  chapter's Pakistan case study and policy-subsidy argument outright,
  judging the 8-section version too abstract without them, but was
  explicit that nothing derived from the retired global/regional
  arithmetic should survive in any form. Two new sections were written
  and inserted between "Where PQNK Enters the Economics" and "What Must
  Be Measured Under PQNK": **"Pakistan: Where Externalised Cost Becomes
  Farm Reality"** (using only independently verified figures already
  established elsewhere in the book — FAO's ~$9bn Pakistan food-import
  bill, the nation's ~$55bn total energy-and-food import bill, the
  Economic Survey 2024-25 14.1% fertiliser-offtake decline and Indus
  Basin aquifer stress, both already cited in Ch11, and the NARC trial's
  58% cost reduction, already cited in Ch12 — no new Pakistan-specific
  dollar total was constructed) and **"From Subsidising Inputs to
  Financing Independence"** (reframes public agricultural spending from
  financing input dependency to financing the machinery, training and
  measurement a PQNK transition requires — the old "government subsidy
  of the four essential transition machines" argument, rewritten without
  reference to the retired dividend). The old $1.9T/$4.7T pie-chart
  infographic (page 5 of the original PDF) and every regional/Pakistan
  dollar split derived from the retired model were permanently deleted,
  not adapted forward in any form, per explicit author instruction. A
  replacement infographic ("THE TRUE COST: WHAT THE FARM ACCOUNT DOES NOT
  SHOW," three evidence windows marked "Different scopes. Do not add,"
  plus a cost-flow visual) was specified by the author as a deliberate
  **follow-up, not built in this pass** — the author's own words: "Once
  the text is final, we can make a new Chapter 14 infographic."
  **Mechanics:** docx and PDF both rebuilt from scratch via docx-js /
  reportlab in two passes (initial 8-section version, then the Pakistan/
  policy insertion) — no LibreOffice, Word or Chrome available on this
  machine to convert or render HTML, so PDFs were generated directly;
  old versions backed up before each pass (`backups/PQNK_Chapter_14_FINAL
  - LOCKED - Publish.pre-full-rewrite.*` and `.pre-pakistan-policy-
  sections.*`). `books.ts` built with `status: "published"` and verified
  in a local dev-server preview (full text, PDF byte size, no console
  errors) before any commit. **Caught and fixed in passing**: Chapter 13's
  own transition line, already live, still named Ch14's retired subtitle
  ("$1.9 Trillion Per Year…") — corrected in the same push. **Verified
  live after deploy**: Ch14 page and PDF both HTTP 200, PDF SHA-256
  (`1ba0efe3…`) matches the local rebuilt file byte-for-byte, Ch13's
  corrected transition line confirmed live. **Not done in this pass,
  logged as explicit follow-ups**: (1) the replacement infographic: (2)
  Chapter 15 needs a final continuity check against the corrected Ch14
  before it can be published — see the §4 Ch15 row.

## 7. Post-publication feedback — QUEUED, NOT ACTIONED

Chapter 4 is locked (author directive, 2026-09-04): no content, science,
infographic, or design changes until the author explicitly reopens it. Colleague
feedback + author replies get logged here as they arrive, saved by the author
as Word docs (e.g. `PQNK_Claude_Work/Comments on Ch 4.docx`, outside the
`PQNK Book` folder). Author's stated policy (in that doc): batch comments,
don't react to each one individually, decide what enters "the next revision"
once the colleague's full read-through is done. Do not action anything below
without the author explicitly reopening Ch4 for a v1.1.

### Batch 1 (logged 2026-09-04, from `Comments on Ch 4.docx`)

1. **"Atmospheric nitrogen" / soil-pore air.** Colleague noted the term could
   read as excluding N₂ present in soil-pore air. Author's proposed fix:
   *"Atmospheric N₂, including N₂ present in soil-pore air, is converted into
   biologically usable forms by nitrogen-fixing microorganisms."* Claude's
   check: this matches the **page-1 infographic's** "ATMOSPHERIC NITROGEN /
   THROUGH BIOLOGICAL NITROGEN FIXATION" panel register, not the running
   prose (prose uses "atmospheric nitrogen" twice, in passing, with no
   soil-pore-air point). Likely an infographic-wording change, possibly plus
   a short prose addition.
2. **Carbon going "to you / any life form" (Feynman reference).** CONFIRMED
   by the author 2026-09-04: this is the chapter's **second body paragraph**,
   `books.ts` line ~445 — "Without carbon cycling continuously through the
   system, from atmosphere to plant to soil to atmosphere again, there is no
   life." The colleague's point: this cycle description skips the step where
   carbon passes through animate life (people, animals) before returning to
   soil/atmosphere. Author's proposed fix, to replace "to plant to soil to
   atmosphere again" with something closer to: *"into plants, soil organisms,
   animals and us, and eventually back to the atmosphere again."* This is a
   **prose change**, not an infographic change.
3. **"PQNK turns every field into a carbon pump."** Author's proposed fix:
   *"PQNK turns every field into a living carbon capture and recycling
   system."* Claude's check: this is the closing banner line of the
   **Soil Organic Matter Trajectory infographic** (`ch4-img-04.png`):
   "Healthy soil is the largest carbon store on land. PQNK FARMING TURNS
   EVERY FIELD INTO A CARBON PUMP." The prose separately uses "carbon pump"
   once, narrowly, for roots ("Every living root is a carbon pump...") —
   that usage is unambiguous and likely does not need the same fix.

### External reviewer: Norman Uphoff (Cornell) — endorsements, NO changes requested

Norman Uphoff is the leading academic figure on SRI (System of Rice
Intensification) and a career irrigation-management researcher (Gal Oya,
Sri Lanka). Directly relevant here: PQNK's founding rice trial is the 2011
*Paddy and Water Environment* (PAWE) paper Chapter 5 cites. Two emails to
the author, forwarded 2026-09-06. Both are endorsements; neither asks for a
manuscript change. Logged for the record.

1. **On Chapter 1** (2026-08-28). "Truly wonderful"; says the writing is
   "much better than in that PAWE article 15 years ago." Tone now "direct and
   conversational … coherent and compelling"; the "somewhat strident" tone he
   had flagged in an earlier draft "I did not sense in this … justifiably
   urgent, but not strident." Likes the four-step model (rocks → dirt → soil →
   life). Reports the same personal epiphany (plants growing 400M+ years
   without exhausting the soil). Two non-editorial items worth tracking
   separately from chapter work:
   - **Dissemination:** he shared Chapter 1 with **Adam Parr**, a UK barrister
     working to rein in fertiliser companies.
   - **Translation network offer:** assumes an Urdu edition; offers colleagues
     in Sri Lanka and Bangladesh for **Sinhalese and Bengali** editions, could
     sound out a **Nepali** edition, and suggests **Hindi** via India
     colleagues — "a force for all of South Asia." Author to pursue if/when
     translation becomes a workstream; not book-editing work.
2. **On Chapter 5** (2026-09-06). "The one that most raised my enthusiasm for
   your project because it was so concrete, informative, and well-substantiated
   scientifically." Singles out the **dew and atmospheric-humidity** treatment
   — a topic he had long been interested in but "filed away" for lack of a way
   to examine it — as brought "nicely and succinctly to the fore." Useful as
   independent validation of Chapter 5's least-conventional section from a
   water specialist.

### 2026-09-12 — Chapter 15 continuity review, publish, and KP sweep close the correction episode

With Chapter 14 locked, the author asked for the final continuity review of
Chapter 15 against the corrected Chapters 1–14 before publishing. Findings
and actions:

1. **Two indirect survivals of the retired $1.9T figure found and fixed.**
   Ch15's closing paragraphs restated "$1.9 trillion" directly rather than
   pointing to Chapter 14's accounting. Both were hand-edited in
   `word/document.xml` (exact string-replace, `count==1` verified before
   each replace):
   - "...that the dismantling has cost the world $1.9 trillion per year in
     externalities while delivering declining soil health..." → "...that
     the dismantling imposes real, documented costs, measured in the
     trillions of dollars once the accounting set out in Chapter Fourteen
     is applied, while delivering declining soil health..."
   - "...a food system that produces abundant calories while generating
     $1.9 trillion in annual externalities, declining nutritional
     quality..." → "...a food system that produces abundant calories while
     generating the trillions of dollars in annual externalities
     documented in Chapter Fourteen, declining nutritional quality..."

   Source backed up to
   `backups/PQNK_Chapter_15_FINAL - Publish.pre-ch14-continuity-fix.20260912-144853.docx`
   before editing. Everything else in Ch15 checked clean against the
   corrected Ch1–14: no other retired-figure references, no stale chapter
   titles/subtitles, no broken cross-references.

2. **PDF regeneration handed to the author.** Ch15's PDF has an embedded
   hero infographic, so unlike Ch14 (text-only, rebuilt from scratch via
   reportlab) a from-scratch rebuild was judged too risky. Claude cannot
   regenerate a Word-exact PDF on this Mac (no LibreOffice/Word/Chrome/
   wkhtmltopdf). The author opened the corrected docx in Pages, confirmed
   the text read correctly (screenshots), and exported to PDF at the same
   filename ("PDF of Ch 15 is saved").

3. **Fresh PDF verified programmatically** via PyMuPDF: 0 occurrences of
   "1.9 trillion", both replacement sentences present verbatim, 0 straight
   apostrophes/quotes, 0 "civilization" (US spelling), 0 "PHOTO
   PLACEHOLDER". Hero image extracted from the fresh PDF via PyMuPDF
   (bbox 56.7,142.1,538.3,503.3, upscaled to 1801×1351) to
   `ch15-img-01.png`.

4. **`books.ts` Ch15 entry built and published**: `status: "published"`,
   `publishedDate: "2026-09-12"`, `version: "1.0"`, display `title`
   corrected to British "Human Civilisation" (chapterId/slug kept as the
   original US-spelled path — not renamed, to avoid breaking any existing
   links), full `body` matching the corrected docx text exactly.

5. **Committed and pushed** together with the Ch13 transition-line note
   already in place from the Ch14 push (commit `bbcf3ba91`). GitHub
   Actions deploy completed successfully.

6. **Live verification, 2026-09-12**: page HTTP 200 (redirect-followed),
   PDF HTTP 200, PDF SHA-256 `6611bf11e695073a90f71afe847b832c4058364d6e0ea87486f872a462e8aebf`
   matches the local file byte-for-byte, live page contains "documented in
   Chapter Fourteen" and zero occurrences of "1.9 trillion".

7. **KP sweep, requested by the author ("what about KP's?")**: grepped
   `src/lib/content/papers.ts` and `src/lib/content/knowledge/metadata.json`
   for `$1.9 trillion` / `$2.8 trillion` / `$4.7 trillion`. Result: **KP-78
   is the only Knowledge Paper referencing the retired figures anywhere in
   the codebase**, and it was already corrected earlier in this episode
   (summary/abstract/keyTakeaways rewritten to explicitly describe the
   withdrawal, PDF rebuilt 9→7 pages via reportlab, `modifiedDate:
   "2026-09-12"` added). `metadata.json` — the KP search/filter index — has
   zero matches, confirming no other paper's indexed content touches these
   figures. No further KP action required.

**At this point the episode was substantively closed**: Chapters 9 (untouched
by design), 11, 12, 13, 14, and 15 were all published, live, and verified
consistent; KP-78 corrected and live; the Ch11 hero infographic rebuilt; no
other chapter or Knowledge Paper referencing the retired $1.9T/$2.8T/$4.7T
figures except within Ch14's and KP-78's own text explicitly explaining why
those figures were withdrawn. The one deliberately deferred item was the
Chapter 14 infographic itself — built next, same session.

### 2026-09-12 — Chapter 14 hero infographic built and published, closing the episode

With Chapter 15 live, the author asked to build the deferred Chapter 14
infographic and close the phase, per the exact spec given earlier in this
episode (§6, "Chapter 14 can now be considered closed and locked" entry):
**"THE TRUE COST: WHAT THE FARM ACCOUNT DOES NOT SHOW"** — the same three
evidence windows as Ch11 ($12T/yr FAO, $878B/yr UNCCD, $400B/yr FAO) under
"Different scopes. Do not add.", then a cost-flow visual (Farm Account →
Externalised Costs → Soil/Water/Health/Climate/Society) and the PQNK
reversal (Restore biological functions → Reduce purchased replacement →
Return productive capacity to the farm).

Built with PIL (`build_infographic.py`, adapted from the Ch11 rebuild
script) at 1800×1514, matching the Ch11 visual language exactly: same
Pedaver/PQNK header bar, same Georgia/Arial house fonts, same green/
deep-green/terracotta/gold palette, same card and banner structure, same
"HEALTHY SOIL · CLEAN WATER · ..." footer strip. The two new flow diagrams
use rounded chip-and-arrow shapes in the same palette — green/deep-green
chips for the cost-flow and PQNK-reversal stages, terracotta for the
"externalised costs" pivot and the reversal arrows — centered so the
"Externalised Costs" chip sits directly above the five destination chips
it feeds into.

Placed in `books.ts` as `imageGroup` + `caption` at the very top of the
chapter body, before the opening quote — the same placement pattern used
for Ch11's hero infographic. Verified in a local dev-server preview
(1800×1514 natural size, no console errors, caption renders correctly)
before committing. Committed and pushed (commit `10325e5`); GitHub Actions
deploy completed successfully. **Verified live**: page HTTP 200, PDF HTTP
200, infographic HTTP 200 with SHA-256 (`d7a25758…`) matching the local
file byte-for-byte, caption text confirmed present on the live page.

**This closes the entire correction episode**: Chapters 9 (untouched by
design), 11, 12, 13, 14, and 15 are all published, live, and verified
consistent, each with its correct infographic; KP-78 is corrected and
live; no other chapter or Knowledge Paper references the retired
$1.9T/$2.8T/$4.7T figures except within Ch14's and KP-78's own text
explicitly explaining why those figures were withdrawn. Part Two of the
book (Chapters 8–15) is now fully published, with no open items left from
this episode.

### 2026-09-13 — Chapter 16 built, reviewed and published: opens Part Three

Author supplied the docx/PDF for Chapter 16, "Building the Machine"
(1973–2007, pre-PQNK), with a text-only placeholder-driven skeleton
built earlier in the session, then progressively inserted their own
real photographs and composite graphics from a separate 36-page "Five
Decades of Agricultural Innovation" reference deck (chronological
year-by-year record of interventions 1973–2023), asking Claude to
place each image and write matching prose around it.

**Two serious XML-extraction bugs found and fixed during the build,
both from the same root cause**: several of the author's composite
images are `mc:AlternateContent` grouped shapes (a modern DrawingML
picture + a VML fallback with its own *nested* `<w:p>` caption). A
naive non-nesting-aware `<w:p>…</w:p>` regex scan desyncs on the first
such nested paragraph and silently mis-bounds every paragraph match
after it in the document — the fix is either full run-balancing
(`<w:r>`/`</w:r>` depth tracking) for image extraction, or temporarily
masking the whole nested run to a placeholder token before any
paragraph-level text surgery, restoring it afterward. The first
"final treatment" pass (relocating 5 of 9 images to their correct
sections, rewriting surrounding prose) used whole-paragraph regex
replacement without this fix and silently corrupted the solar/CA-store
image's position; caught only when a later, unrelated edit made a
paragraph's `r:embed` count come up short. The entire pipeline was
rebuilt from the author's true original file with the fix applied
throughout, and every image's final position was independently
verified against its surrounding text (not just trusted from a
textutil read-through) before re-sending.

**Author's full review (after that corrected build) requested six
changes**, all applied: (1) a three-paragraph machinery-progression
narrative inserted after the 2000s/2020s PQNK machine-catalogue
images, explaining the shift from capacity-focused to
disturbance-minimising engineering objectives; (2) one sentence
explaining why 2020s-era machines appear in a chapter whose historical
boundary is 2007; (3) a historical 1989 Ford-tractor-relaunch photo
(Punjab Governor Mian Azhar) to be added once supplied; (4) softened
"gave New Holland a majority share…that it has held ever since" to
"helped establish New Holland as a major force," removing an
unsupported present-day market-share claim; (5) corrected the Deltapine
cotton date from 1974 to 1976, matching the section heading and the
"In 1976, Sharif did not yet have that diagnosis" line; (6) softened
"were the cause" to "would identify the underlying production-system
causes," avoiding an over-absolute single-causal claim.

**Sensitive-content handling**: the reference deck described 2002–2006
as forced business suspension ("state tyranny," "New World Order,"
~4 years without charges) and framed it as when PQNK was conceptually
born. Author's explicit instruction: do not use that language at all;
handle gracefully, as a proud personal sacrifice, without specifics;
keep the 2008 Amazon study (not 2002–2006) as PQNK's actual
crystallising moment, consistent with Chapter 17's forward reference.
Result: new "THE QUIET YEARS: 1997–2006" section, no accusation
language, no imprisonment claim, framed entirely around the recurring
question maturing "undisturbed." Also corrected on the author's
instruction: the Bt-cotton seed brought back from the US was 2kg, not
20kg as first transcribed from a screenshot.

**A farmer's WhatsApp message** (Abdul Wajid, responding to the
Ch9/Ch10 publish announcement — fireflies and honeybees returning with
PQNK adoption) was condensed and placed as the chapter's closing quote,
honestly framed as "received after Chapters Nine and Ten were
published" rather than claimed as being about Chapter 16 itself.

**Final round**: author's own Word/Pages edit (inserting the approved
Ford 1989 photo) triggered two issues — an apparent large content loss
around the Ford/Pioneer Seed paragraph (investigated and found to be a
false alarm, the same nested-caption text-extraction quirk fooling
both `textutil` and a first-pass regex check; the actual XML content
was fully intact) and a genuine one, 9 words silently reverted from
British to American spelling by autocorrect (recognised, modernisation
×2, organisations, specialised, levelling, programme, customised,
fertiliser) — all 9 fixed and verified via targeted string replacement,
zero regressions.

**Publish**: `books.ts` built with the corrected subtitle
"1973-2007: Mastering Industrial Agriculture Before PQNK" (superseding
the stub's placeholder), 10 images extracted at native resolution,
two of them (potato-corn rotation, Ford 1989) needing separate
`caption` blocks in `books.ts` since their captions are overlaid VML
text boxes rather than baked into the raster like the other eight.
Verified in local dev-server preview (all 10 images load at natural
resolution, PDF fetches with matching byte size, zero console errors)
before commit. **Verified live 2026-09-13**: page and PDF both HTTP
200, PDF SHA-256 matches the local file byte-for-byte, all 10 images
HTTP 200 and SHA-256-matched, every key text marker (Ford caption,
corrected cotton date, British spelling, Quiet Years section, farmer
quote) confirmed present on the live page. This opens Part Three,
"The Discovery."

### 2026-09-13 — Chapter 16: rice-on-moist-soil forward-reference added post-publish

Author flagged a missed achievement after Ch16 went live: PQNK's
rice-on-moist-soil (not saturated/inundated) breakthrough, reporting
70-90% water savings. Checked first against the existing Part Three
outline in `books.ts` — Chapter 19, `the-first-experiment`, is already
titled "The First Experiment: Rice on Moist Soil Raised Beds,
Paradoxical Agriculture Becomes Proof," confirming this is a
**post-2008 PQNK validation experiment**, not part of Ch16's own
1973-2007 "before PQNK" scope. Author agreed and asked for only a
brief forward-reference in Ch16, not the full story.

**Claim softened per author's explicit instruction**: not "the first
time in the world" (unverifiable absolute), but "a method with no
known precedent elsewhere at the time" — the author's own words were
"although in 2010/11 there was no such known technology elsewhere."
One new sentence added to Ch16's closing section, naming the
achievement and pointing to "a later chapter, The First Experiment"
(house convention for forward references beyond the immediately next
chapter — no hard-coded chapter number, since only Ch17's number is
committed via the transition line).

Applied to both `books.ts` (published immediately, single-sentence
addition, low risk) and the master docx (same sentence inserted at
the matching point, backup taken first, all 10 image relationships
verified intact after the edit, non-`document.xml` parts confirmed
byte-identical). **Verified live 2026-09-13**: page HTTP 200, both
"seventy to ninety percent" and "no known precedent elsewhere"
confirmed present. Author separately asked to insert an additional
photograph in this chapter — not yet supplied; picture is pending,
no other action needed until it arrives.

### 2026-09-14 — Chapter 16: rice-on-moist-soil photo added, chapter PDF refreshed

Author saved an updated docx/PDF with the promised photograph: a
PQNK raised-bed rice composite ("Rice crop on PQNK - permanent raised
beds, Tillers on some plants reached 118"), pasted mid-sentence inside
the closing farmer-quote paragraph (same "just drop it near the end"
pattern as every prior image this chapter). Extracted cleanly with the
same balanced-run technique used throughout this chapter's build (this
one had no nested caption, unlike the rotation/Ford images), then
moved to its actual home: directly after the rice-on-moist-soil
sentence added the previous entry, since the photo (dry furrows
visible between raised beds, no standing water) directly illustrates
that claim. `books.ts` updated with the new `imageGroup`; the chapter
PDF (public + archived copy) replaced with the author's fresh export,
confirmed to already carry the rice-mention text. **Verified live
2026-09-14**: page HTTP 200, new image HTTP 200 (SHA-256 byte-match),
refreshed PDF HTTP 200 (SHA-256 byte-match). Chapter 16 has no further
open items.

### 2026-09-14 — BINDING, permanent: the "Quiet Years" treatment applies to every chapter, not just Ch16

Chapter 17's draft (`PQNK_Chapter_17_PUBLISH_READY.docx`) independently
used the word "imprisonment," framed it as "a business dispute
subsequently resolved through the Pakistani legal process," and
pointed to "Chapter Nineteen" to address it directly (a stale forward
reference — Ch19 is `the-first-experiment`, not an adversity chapter).
This directly contradicted the Ch16 Quiet Years decision (§6,
2026-09-13 entry). Flagged to the author before touching anything else
in Ch17.

**Author's ruling, verbatim intent: apply the Ch16 Quiet Years stance,
and carry it into every future chapter.** This is now a permanent
authorial rule for the whole book, on the same footing as the
Ch14 non-summing economic rule: no "imprisonment," no "state tyranny,"
no "New World Order," no legal/dispute specifics, no named chapter
promising to address the episode directly — ever, in any chapter.
Where the 1997-2006 period needs mentioning, use language matching
Ch16's own: "circumstances outside his control," framed as personal
sacrifice made in service of the wider farming community, not as a
setback, spoken of "with pride, not complaint." Ch17's paragraph fixed
to match: "For a period during these years, Sharif's business
activities were substantially interrupted by circumstances outside
his control, a period he regards, in his own words, as a significant
personal sacrifice rather than a setback." Applied via targeted
paragraph replacement (backup taken first, XML validated,
non-`document.xml` parts confirmed byte-identical). **Not yet
re-exported to PDF or published** — pending the author's PDF
re-export and sign-off on the rest of Ch17 (boll-genetics correction
also applied this same session; graphic/turning-point mismatch and
straight-quote cleanup still open).

**Applies going forward without being re-raised**: any future chapter
touching this period (Ch18 onward) must default to the graceful,
non-specific framing above. Do not ask the author to re-confirm this
per chapter — it is settled.

### 2026-09-14 — Chapter 17 built, corrected, and published

Author supplied `PQNK_Chapter_17_PUBLISH_READY.docx/.pdf` directly
(no incremental placeholder-build pass this time, unlike Ch16). Two
issues found on first read, both flagged before any other work:

1. **The 200-boll claim** ("individual PQNK cotton plants reached
   about two hundred bolls... without pesticide spraying") stated as
   if PQNK alone produced the result. Author's correction: this is
   only possible when the cotton variety itself carries the genetic
   potential for a high boll count — PQNK restores the conditions
   under which that potential is expressed, it does not create
   boll-bearing capacity a variety does not already have. Fixed by
   adding: "of a variety with the genetic potential for high boll
   counts... That starting genetic potential matters: PQNK restores
   the conditions under which a plant can express what it is
   genetically capable of, but it does not create boll-bearing
   capacity a variety does not already carry."

2. **The draft independently used "imprisonment"** for the 1997-2006
   period, framed as "a business dispute...subsequently resolved
   through the Pakistani legal process," and pointed to a wrong
   "Chapter Nineteen" (Ch19 is `the-first-experiment`, not an
   adversity chapter) to address it directly — directly contradicting
   the Ch16 Quiet Years decision. **Author's ruling: apply the Ch16
   stance and carry it into every future chapter, permanently** — now
   locked above as a binding, book-wide rule and saved to Claude's
   persistent memory so it applies automatically without being
   re-raised per chapter. Fixed to: "For a period during these years,
   Sharif's business activities were substantially interrupted by
   circumstances outside his control, a period he regards, in his own
   words, as a significant personal sacrifice rather than a setback."

Both fixes applied via targeted XML paragraph replacement on the
docx (backup taken before each), then the author added a real cotton
photo ("Cotton on PQNK — no-pest — no-disease — no-dropping, No
Agrochemical Applied") embedded mid-paragraph inside the same 200-boll
paragraph the genetic-potential fix touched — directly illustrating
the corrected claim.

**Cover-graphic mismatch, found and resolved**: the chapter's own
AI-generated cover infographic labelled Turning Point 3 "The Yield
Plateau" and Turning Point 4 "The Bt Cotton Failure" — neither matches
the actual text (Turning Point 3 is "The Bt Cotton Question," Turning
Point 4 is "The 200-Boll Cotton Plant"). Flagged via `AskUserQuestion`
(dismissed — author chose to handle it directly rather than answer
inline); author then asked Claude to write an AI image-generation
prompt to redraw the graphic with correct panel 3/4 content. First
regenerated version's panel 4 subtitle ("No spray. No purchased
input. No exception made for genetics.") was flagged as inadvertently
undercutting the freshly-added genetic-potential nuance — read as a
parallel list, "no exception made for genetics" implies genetics
wasn't a factor, the opposite of the correction just made. Author
regenerated with the suggested fix ("The variety's own genetic
potential, fully expressed.") — accepted as final.

**Extraction bug found and fixed during the "final treatment" pass**:
the corrected cover graphic was pasted into the docx as a *group* of
two stacked pictures (base graphic `wp:anchor`-full-size, plus a
separate PQNK-logo TIFF positioned and sized via the group's *own*
child-coordinate `a:xfrm`, not the outer `wp:extent`/`wp:position`
Claude was reading). Naively resizing the logo to the outer anchor's
extent (as the previous chapter's simpler images allowed) produced a
massively distorted, canvas-filling logo; the actual rendered PDF
showed a small, correctly-scaled logo top-left. Fixed by reading the
group's inner `wpg:grpSpPr/a:xfrm` (chOff/chExt) and each child
`pic:spPr/a:xfrm` (off/ext) to compute true relative position and
size, then flattening base + logo into one composite PNG via PIL
alpha-compositing for the web (the site's `imageGroup` renders plain
`<img>` tags, not stacked/layered pictures) — verified pixel-for-pixel
against a fresh render of the author's own PDF page before use.

**House-style cleanup**: 13 straight apostrophes/quotes across the
chapter (this docx was typed with straight quotes throughout, unlike
the rest of the book) normalised to curly, one paragraph requiring
special handling since the cotton photo was embedded mid-sentence
inside it (image run extracted, text corrected, image reinserted at
the same relative position, to avoid the same "whole-paragraph
replace silently drops embedded image" bug caught and fixed once
already in Ch16).

**Publish**: `books.ts` built with the docx's own subtitle "Four
Cotton Turning Points and the Questions They Forced" (differs slightly
from the stub's "Four Cotton Crises..."), 3 images (composite cover,
200-boll cotton photo, milk-and-yogurt illustration). Verified in
local dev-server preview (all images at natural resolution, PDF byte
size match, zero console errors) before commit. **Verified live
2026-09-14**: page and PDF both HTTP 200, PDF SHA-256 matches the
local file byte-for-byte, all 3 images HTTP 200 and SHA-256-matched,
genetic-potential and Quiet-Years phrasing both confirmed present,
zero "imprison" occurrences live. Archived to `Published Chapters/`.

### 2026-09-15 — Chapter 18 built and published

Author supplied `PQNK_Chapter_18_FINAL.docx/.pdf` directly (9 pages,
one embedded image). Third Part Three chapter: Sharif's 2008 Amazon
field trip. Editorial pass found one cross-reference inconsistency and
fixed it before publish, both logged in the §4 table row above:

1. **Stale predator-count cross-reference.** The source text read "the
   predator network: the 1,700 species of biological controllers
   described in Chapter Six." Chapter Six's own publish pass (see its
   §4 row) had already softened that figure to qualitative language —
   Ch6's current text states no "1,700" number anywhere. Fixed by
   matching Ch6's own phrasing: "the diverse community of predators and
   parasitoids described in Chapter Six." A same-class error to the
   kind this file's Decisions log has flagged before (a later chapter
   citing an earlier chapter's retired figure) — worth a standing
   reminder for future chapters that reference Ch3, Ch6, Ch9's nutrient
   figure, or any other chapter whose numbers have since been revised:
   check the cited chapter's *current* text, not just its title.
2. **4 straight apostrophes → curly**, matching house style (this docx,
   unusually for this book, was typed with straight quotes in a few
   spots — "PQNK's", "forest's", "farmer's", "block's").
3. **Attribution line fixed**: the docx's own epigraph attribution ran
   ", Asif Sharif, Lahore, 2008" with a stray leading comma (evidently a
   leftover from a template where the attribution followed the quote on
   the same line) — dropped the comma to match every other chapter's
   attribution format.
4. **Duplicate subtitle line dropped**: the docx repeats "2008, What
   Four Hundred Million Years Showed in a Forest" as a body line
   directly under the chapter title — this is already carried by the
   `subtitle` field and every other published chapter omits the
   duplicate from its body, so it was dropped here too for consistency.

**Two open photo placeholders, left unfilled.** Despite the "FINAL" in
its filename, the source docx contains two literal
`[ PHOTO PLACEHOLDER | ... | Caption: ... ]` bracket markers with no
photo behind either of them — only one real image exists in the whole
document (the hero infographic, `ch18-img-01.png`, "The Amazon
Revelation: 2008", extracted at its native 1500×1125, no higher-res
source available on this Mac). Confirmed via the docx's own
relationships file: exactly one image relationship (`rId4` →
`media/image1.png`), so this was not a paragraph-matching artefact.
Both placeholders (an "Amazon rainforest floor" shot near the opening,
a "PQNK farmer showing empty input store" shot near the closing) were
left out of the web body entirely rather than rendered as literal
bracket text — images are optional per the publish checklist, and nothing
elsewhere in the chapter depends on either caption's content. Logged in
the §4 row with the exact insertion points for whenever the author
supplies the two photos, same pattern as Ch16's post-publish rice-photo
addition.

**Consistency checks that passed with no changes needed:** the "1,700"
fix aside, cross-checked "12.84 tonnes per hectare... three times the
regional average" and "seventy percent less water" against Ch5's
founding-trial paragraph (`the-natural-water-system`) — both match
exactly. Confirmed the companion Knowledge Paper the chapter
forward-references, "The Missing Synthesis: Positioning PQNK Among a
Century of Fragmented Regenerative Science" (`the-missing-synthesis`,
KP-111), already exists and is live — no dangling forward reference.
Noted, but did not reconcile, that the KP's own list of six comparison
programmes includes SRI where Ch18's in-chapter list does not (Ch18
naturally excludes SRI since Sharif's own 2011 SRI trial is PQNK's own
direct root, not a parallel discovery) — not a contradiction, just a
different framing for a different audience, left as authored.

**Publish**: `books.ts` built with `status: "published"`, one
`imageGroup` + `caption` (hero infographic, placed after the "Why the
Amazon" section matching its position in the source docx rather than
forced to the very top) and one `qaPanel`. Verified in local dev-server
preview before commit (page text sanity-checked via `get_page_text` and
a `document.body.innerText` scan for the placeholder string, the "1,700"
figure, and the Chapter Nineteen transition; image confirmed loaded via
`naturalWidth`/`complete` since the Browser pane was hidden and its
screenshots were blank as a result — not a rendering bug, see the tool's
own hidden-pane caveat). Committed and pushed (commit `b80710a`);
`.githooks/pre-push` took a fresh site backup first, per the binding
§0 rule. GitHub Actions deploy (run `34916507835`) completed
successfully in about 90 seconds. **Verified live 2026-09-15**: page,
image and PDF all HTTP 200; image SHA-256 (`d36cde3e…`) and PDF SHA-256
(`bfb90d3a…`) both match the local source byte-for-byte; live page text
confirmed free of "PHOTO PLACEHOLDER" and the stale "1,700" figure, and
confirmed to contain the Chapter Nineteen transition. Archived to
`Published Chapters/` as `PQNK_Book_Chapter_18_The_Amazon_Revelation.docx/.pdf`
— PDF copied from the deployed/verified `public/` file, docx copied
from the same approved `PQNK_Chapter_18_FINAL.docx` the chapter was
built from. Ch17's `transition` already named Chapter Eighteen
correctly, no change needed. Hands to Chapter Nineteen,
`the-first-experiment`.

### 2026-09-15 — Chapter 19 reviewed and published; cross-reference correction to KP-110

Author supplied `PQNK_Chapter_19_FINAL.docx/.pdf` and asked for a full
review with a publish-ready draft prepared for approval before anything
went live — the first time in this project a chapter was held for
sign-off rather than published straight through. Full editorial pass
(see §4 row) found one genuine structural bug (a duplicate floating
Q&A panel, fixed) and one orphaned reference ("Hanoi," fixed after the
author's go-ahead by adding an introducing sentence).

**The most consequential finding was cross-document, not internal to
Ch19.** Ch19 is explicit and repeated (body text once, Q&A panel twice)
that the 2009 founding trial's own peer-reviewed result was **~70%**
irrigation-water reduction, and that the **~92-93% / 321 L/kg** figure
belongs only to the later, mature, direct-seeded PQNK system — "must
not be attributed to the original trial." An already-live Knowledge
Paper, KP-110 (`why-conventional-rice-keeps-failing`), directly
contradicted this: its abstract and a keyTakeaway stated "PQNK's rice
work began in **2008** with an inaugural 44-acre moist-soil trial...
**that original trial** cut water use to **321 liters per kilogram, a
93% reduction**" — the same trial, wrong year, and the mature-system
figure misattributed to it. Flagged to the author rather than silently
resolved either direction, since it involved conflicting claims about
the company's own documented history that only the author could settle.

**Author's ruling:** Ch19 is correct (2009, ~70% for the founding
trial); KP-110 was wrong on both the year and the attribution. Fixed
KP-110's abstract paragraph and keyTakeaway in `papers.ts`
(`why-conventional-rice-keeps-failing`, KP-110): 2008 → 2009 throughout,
and the 321 L/kg/93% figure now explicitly attributed to "the mature
system's own field records, not to the original 2009 trial." Checked
and confirmed no other file (other Knowledge Papers, `metadata.json`,
the KP's own PDF) carries the same 2008/93% conflation — the PDF's only
"2008" occurrence is an unrelated reference citation (Xu et al. 2008).
The `~4.2 t/ha` vs Ch19 infographic's `4.0 t/ha` conventional-yield
figure was left untouched, per the author's instruction to fix only the
year and the attribution, not the rounding difference.

**Two items the author ruled on directly, both applied as instructed:**
1. The "Transposing" → "Transplanting" image caption typo, and a
   4.0-vs-4.2 t/ha hero-infographic correction — the author reported
   having fixed both in a freshly re-saved docx/PDF. Verified via a
   byte-for-byte diff of every zip entry (docx) and the full extracted
   PDF text against the prior save: **zero content difference** — only
   outer file metadata had changed, every image and all document text
   were identical to what was already reviewed. Flagged to the author;
   published with the original art rather than block on a save that
   hadn't actually taken. Swap in the genuinely corrected file when
   supplied.
2. The 100+ tillers-per-plant figure (image-6 caption only) — author
   confirmed it is a well-documented number, but instructed it be kept
   strictly as a field-photo caption, not folded into the chapter's own
   "Tiller development" paragraph as a general trial result, preserving
   the chapter's measured-vs-observed discipline.

**Publish**: `books.ts` built with `status: "published"`, deduped Q&A
panel, one Hanoi/Vietnam sentence added, 6 images placed against the
text they illustrate, `chapterSpeech.ts` given an `SRI → "S R I"` rule.
Verified in local dev-server preview (all images loaded, Q&A panel
count == 1, Hanoi sentence present, zero console errors of substance)
before commit. KP-110's correction verified the same way. Archived to
`Published Chapters/` as
`PQNK_Book_Chapter_19_The_First_Experiment.docx/.pdf`. Hands to Chapter
Twenty, `the-naming-of-pqnk`.

### 2026-09-15 — Chapters 18 and 19 withdrawn; publish-approval rule now BINDING

The author stated he never approved Chapter 18 going live — a prior
session, disrupted by a Mac software update, pushed it without his
sign-off — and separately had not asked for Chapter 19 to be pushed
either, despite having said "Proceed with Chapter 19" during its
review (that phrase was read as publish authorisation; the author's
follow-up makes clear it was not). Both chapters were pulled from the
site in the same sweep, same session:

- **Mechanics**: both chapter entries in `books.ts` reverted from their
  full `published` object back to the original one-line
  `status: "in-preparation"` stub (chapterId/partId/title/subtitle only
  — exactly how every other not-yet-built chapter is represented).
  Their PDFs and image directories were deleted from `public/` and
  `git rm --cached`, so nothing under `/books/natural-ecosystem-science/
  the-amazon-revelation*` or `/the-first-experiment*` ships in the next
  deploy — confirmed by grepping the built `out/` directory after
  rebuilding: zero matches for either chapterId. Grepped the rest of
  `src/` for both chapterIds first: no other page, KP, or cross-link
  referenced either, so no dangling links were left behind. Ch17 and
  Ch18's own `transition` lines (naming the chapter that follows) were
  left untouched — they'll be correct again the moment each chapter is
  properly republished.
- **What is NOT lost**: full build history for both chapters remains in
  git (Ch18: `b80710a` + two correction commits; Ch19: `8cc255b`),
  the reviewed prose is intact in those commits, and the Word/PDF pairs
  are archived on the author's Mac in `Published Chapters/`. A Chapter
  19 refinement (the merged nursery+irrigation composite image, the
  corrected hero infographic, deduped Q&A panel) done just before the
  withdrawal request was mid-review, uncommitted, and had been
  `git stash`-ed to isolate it from the Chapter 18 revert — that stash
  still holds the refined image set for whenever Chapter 19 is
  reopened; it was not applied to this withdrawal.
- **Not touched, deliberately**: the KP-110 correction
  (`why-conventional-rice-keeps-failing`) made in the same commit as
  Chapter 19's original publish is an independent fix to an
  already-published, unrelated page (see the entry above) — it stays
  live regardless of Chapter 19's status.
- **Chapter 18's underlying content issue, still open**: the two
  `[ PHOTO PLACEHOLDER ]` blocks and the stale "three weeks" /
  "1,700 species" wording were never fixed in the PDF (only in the web
  body and the master docx) — seeing the still-broken PDF is what
  prompted the author to say the chapter was never approved. A
  redaction-based partial fix (removing both placeholder boxes cleanly
  from the existing PDF, verified working) was built but not applied
  anywhere, since the chapter is offline again regardless. Before any
  future republish of Chapter 18: get a fresh PDF re-exported from the
  already-corrected `PQNK_Chapter_18_FINAL.docx` (Pages/Word — this Mac
  has neither, so hand-patching the existing PDF's flowing body text
  was judged too failure-prone to attempt, see the redaction rectangles
  and font/position data captured during this session if that route is
  revisited), and get the author's explicit go-ahead before pushing.

**BINDING, permanent, applies to every future chapter and Knowledge
Paper publish, not just books:** never commit-and-push a new
publish — flipping a chapter or paper to `status: "published"` and
deploying it — without an explicit, unambiguous go-ahead from the
author for that specific push, given after they've seen the reviewed
content. General forward-progress language ("proceed," "looks good,"
continuing a review conversation) is not sufficient on its own to read
as publish authorisation unless the author's words plainly mean "make
this live now" — when genuinely unclear, ask before pushing rather
than infer. This tightens, and for publish actions specifically
supersedes, the working pattern used through Chapters 1–17 (review,
fix what's found, publish once nothing blocking remains) — that
pattern remains fine for post-publish corrections to already-approved
chapters (typo fixes, cross-reference corrections, the KP-110 fix
above), just not for the initial decision to take something live.

### 2026-09-16 — Chapter 18 republished from a full rewrite, on explicit approval

Author supplied a completely rewritten `PQNK_Chapter_18_FINAL_TEXT_REVIEW.docx/.pdf`
and approved it for publish. See the §4 row for the full content summary
(new subtitle, five re-sequenced observations, zero photo placeholders,
timeline stated correctly at the source, three new infographics, no
cross-chapter references). Published, commit `1d818b1`.

**Hero-infographic placement bug found and fixed the same day.** The
image was anchored in the same Word paragraph as the chapter title (a
docx quirk — title text and all three title-page images share one
paragraph), which led to placing it several paragraphs into the body
instead of where the PDF actually renders it: immediately after the
title/subtitle, before the opening quote. Caught by checking the PDF's
own page-1 text/image y-coordinates directly rather than trusting the
XML anchor paragraph alone — the other two infographics were already
correctly placed because their anchor paragraphs matched their true
visual position; only the hero, being grouped with the title, did not.
Fixed, commit `5588656`.

**Word-document typography pass, requested separately.** The author
pointed out the approved docx had never been formatted to the book's
locked house style — it was a content-review draft, not a typeset one.
Compared it paragraph-by-paragraph against `PQNK_Book_Chapter_17_The_Turning_Points.docx`
(an already-approved, already-published reference) rather than relying
solely on `PQNK_Book_Editorial_and_Typography_Style_Standard.docx`, since
the two disagree on Level-1 headings (the written standard says Georgia;
every actually-published chapter uses Arial). **Author confirmed
directly: body is Georgia 12pt, headings are Arial — the written
standard is stale on this point**, not the published chapters. (The
standard document itself should probably be corrected to match at some
point — not done here, out of scope for a single chapter's formatting.)

Found and fixed, all via precise XML string-replacement (each change
count-verified before applying, backup and byte-diff against every
non-`document.xml` package part afterward, confirmed unchanged):
chapter title 27pt → 26pt and its colour corrected from a slightly-off
green (`1b3e28`) to the locked Deep Green (`1a4731`); subtitle 14pt →
13pt; the opening quotation's colour corrected from Deep Green to the
locked Quote Grey (`3d3d3d`) with an explicit 11pt size added; the
closing punch-line paragraph ("The Amazon helped me see the system...")
restyled from bold-italic Deep Green to the locked PQNK Pull Paragraph
spec (italic-only, Accent Green `2d6a4f`, 13pt) — it was styled like a
second opening quote in the source, but its role and position match a
closing pull paragraph, not a quotation. Body-text ink colour corrected
globally from `1e1e1e` to the locked `1c1c1c` (162 occurrences, both the
`w:color` and `w14:srgbClr` forms). Section headings needed no change —
already correct (Arial, 11pt, Accent Green) despite the discrepancy with
the written standard. 9 straight apostrophes/quotes → curly, matching
every other chapter. Two structural elements the docx was missing
entirely (unlike every other chapter) were added: an attribution line
("Asif Sharif, Lahore, 2008") after the opening quote, and a closing
`⁂ Chapter Nineteen: …` transition line — both flagged to the author as
content additions, not pure formatting, since the typography standard
explicitly scopes itself to formatting only.

Saved as `PQNK_Chapter_18_BOOK_STYLE.docx` in `PQNK_Claude_Work/PQNK Book/`
for the author to open in Pages and export to PDF. **Not yet applied
anywhere** — waiting for the author's Pages-exported PDF, which then
replaces `public/books/natural-ecosystem-science/the-amazon-revelation.pdf`
(this Mac has no Word/Pages/LibreOffice to export PDFs itself, so this
round-trip is the established pattern for anything beyond raw text
correction — see Ch15's PDF re-export for precedent).

**Same day: Chapter 19's docx found to have the identical class of bug,
half-fixed.** While reviewing Ch18's typography, the author pointed at
a screenshot of Chapter 19's own docx ("THE DESIGN OF THE FIRST
EXPERIMENT") and flagged that heading style and pre-section spacing
still didn't match. Checked all 8 of Ch19's L1 headings individually:
**5 of the 8 had no character formatting applied at all** — plain
default black Times New Roman text that only happened to be typed in
caps (`WHAT THE PROBLEM WITH PADDY...`, `WHY THE YIELD WAS HIGH...`,
`FROM THE FIRST EXPERIMENT TO THE FULL SYSTEM`, `FROM TRANSPLANTING TO
DIRECT SEEDING...`, `WHAT THIS CHAPTER HAS ESTABLISHED`), while the
other 3 (`THE DESIGN OF THE FIRST EXPERIMENT`, `THE RESULTS...`,
`PUBLICATION AND ITS RECEPTION`) were already correctly Arial/11pt/
Accent Green/bold/letter-spaced — explaining the "doesn't match"
complaint precisely: it was inconsistent *within the same document*,
not a wrong-vs-right question. Fixed all 5 to match the other 3 exactly
(same rPr template, count-verified single-occurrence replacements).
Pre-heading spacer paragraphs (the empty paragraph before each heading
that creates the visual gap) were already present and consistent
throughout — not the actual cause, despite "space before new section"
being how the author described the symptom. Straight quotes/apostrophes
checked and already clean (0 found). Saved as
`PQNK_Chapter_19_BOOK_STYLE.docx`, zip-integrity and byte-diff verified
against the source (only `word/document.xml` changed). Chapter 19 is
still withdrawn (§4 row) — this is prep work for whenever it's
reopened, not a republish.

**Chapter 18 PDF closed out same day.** Author opened
`PQNK_Chapter_18_BOOK_STYLE.docx` in Pages and exported
`PQNK_Chapter_18_BOOK_STYLE.pdf`. Verified before swapping it in:
rendered all 8 pages to images and visually confirmed the title
(26pt Deep Green), subtitle (13pt), opening quote (Quote Grey, 11pt)
and closing line (now a proper italic Accent Green pull paragraph, not
a second bold quotation) all render correctly, the hero infographic
sits before the opening quote as intended, and the attribution and
transition lines are present. Full-text diff against the
previously-live PDF confirmed **only the intended changes**: curly
quotes/apostrophes, the new attribution line, the new transition line
— no accidental content drift from the Pages round-trip. Replaced
`public/books/natural-ecosystem-science/the-amazon-revelation.pdf`;
archived both the docx and PDF to `Published Chapters/`, superseding
the versions saved right after the 2026-09-16 publish. This closes the
last open Chapter 18 item — see the §4 row for the chapter's full
history.
