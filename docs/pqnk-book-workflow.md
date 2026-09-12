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
| 14 | `the-true-cost` | The True Cost | **Published + LIVE 2026-09-12 (v1.0), commit `d514ca0`** | Fully rebuilt, not repaired — see §6 for the full $1.9T/$2.8T/$4.7T correction history. Subtitle changed to "What Agriculture Does Not Put on the Farm Account." Ten sections: the farm-account/externality argument, why no single global total is honest (Pedaver's non-summing governing rule), three sourced cost windows (FAO ~$12T/yr agrifood hidden costs, UNCCD ~$878bn/yr land-degradation inaction, FAO ~$400bn/yr soil loss — reported separately, never summed), farm cost vs. social cost, UNCCD's real restoration economics replacing the fabricated $2.8T dividend, PQNK's own documented cost reductions (NARC trial, 58%), a restored-and-rewritten Pakistan section (FAO's ~$9bn food-import figure, the ~$55bn national energy-and-food import bill, the Ch11-established Economic Survey 14.1% fertiliser-offtake decline and Indus Basin aquifer stress — cross-referenced, not re-derived), a restored-and-rewritten policy section ("From Subsidising Inputs to Financing Independence"), what must be measured under PQNK, and the real dividend. The old $1.9T/$4.7T pie-chart infographic and every regional/Pakistan dollar split derived from the retired model were permanently removed, not adapted — a new infographic for the corrected architecture is a deliberate follow-up, not done yet. Docx and PDF rebuilt from scratch via docx-js/reportlab (no LibreOffice on this machine); old versions backed up at each rewrite pass. Also fixed in the same push: Ch13's own transition line, which still named the retired subtitle. Hands to Chapter Fifteen, `human-civilization-and-the-politics-of-food` (held — see below). **Verified live 2026-09-12** — page and PDF both HTTP 200; PDF SHA-256 (`1ba0efe3…`) matches the local rebuilt file byte-for-byte. |
| 15 | — | — | **HELD** — awaiting continuity check against the now-corrected Chapter 14 | Chapter 15 (`human-civilization-and-the-politics-of-food`) has its `- Publish` docx/pdf ready (`PQNK_Chapter_15_FINAL - Publish.docx/.pdf`) and was independently verified clean back on 2026-09-12 (the Ch12 cross-reference fix carries through, hero infographic present, no US spelling/placeholders/straight quotes) but stays held: it opens referencing "the preceding fourteen chapters" and needs a final continuity check now that Ch14's content, title and transition have all changed. Ch 8–15 all use the "68-year (1958–2026)" framework and reference later chapters by title. **Ch 15 publish-ready pass done 2026-09-10** (source `PQNK_Chapter_15_FINAL.docx`; backup `backups/PQNK_Chapter_15_FINAL.pre-publishready.20260910-153850.docx`): removed a corrupted duplicate title block (photo placeholder + repeated subtitle + repeated straight-quote epigraph); US → British spelling, 39 replacements (civilization→civilisation, organis/centralis/specialis/fertiliser/industrialis/mechanis); 5× ` --- ` (em-dash substitute) → commas/colon/parentheses; 2× `\$` → `$`; "preceding thirteen chapters" → "fourteen"; title → "Human Civilisation and the Politics of Food". **Author decision (2026-09-10):** keep both Ch14 and Ch15 in Part Two, order …Ch13 → Ch14 (The True Cost) → Ch15 (Human Civilisation) → Part Three; the "Part Three: The Discovery" hand-off moved from the end of Ch14 to the end of Ch15. **Open flags:** (1) Ch15's "CAPTURED SCIENCE" section overlap with Chapter 12 — **resolved 2026-09-11**, one cross-reference sentence added. (2) `books.ts`'s Ch15 stub still spells "Civilization" (US); reconcile to British when Ch15 is web-published. (3) Since "preceding fourteen chapters" now needs to mean the corrected Ch14, re-read Ch15's opening against Ch14's final text before publishing — not yet done. **Ch 13 publish-ready pass done 2026-09-09** (source `PQNK_Chapter_13_PUBLISH_READY.docx`, backup `backups/PQNK_Chapter_13_PUBLISH_READY.pre-publishready.20260909-223453.docx`): font normalised to the house profile (`Noto Serif` → `Georgia`, 118 runs; result Georgia + Arial + Arial Unicode MS, matching Ch 10–12); straight apostrophes/quotes → curly; four spaced-hyphen parentheticals → parentheses/commas (house style, no em-dashes in body); section-heading spacing made uniform (3 blank lines before each of the seven numbered headings, "THE INTERCONNECTION…", "WHAT THIS CHAPTER…", and the ⁂). One factual fix: the 58% cost-of-production figure belongs to the **NARC wheat trial** (per Ch 4 and Ch 12), not a "rice trial" — corrected, and spelled "fifty-eight percent" to match Ch 12. Closing transition aligned to the canonical Ch 14 subtitle in `books.ts` ("$1.9 Trillion Per Year, and the $4.7 Trillion PQNK Restoration Dividend"). **PDF needs re-export** — the on-disk `PQNK_Chapter_13_PUBLISH_READY.pdf` predates these edits. Not touched: the "One. … Seven." numbered title-case heading scheme (intentional for a seven-part audit; renders Georgia-Bold after the font swap). |

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
