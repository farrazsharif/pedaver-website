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
10. **`git push origin main`** — this alone deploys it. See "Deployment"
    below; do not skip this step or assume a commit is live on its own.
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
| 9 | `ancient-conventional-industrial-aci` | Ancient Conventional Industrial (ACI) | **Published + LIVE** 2026-09-10 (v1.0), commit `386dc98` | Body from the reviewer-approved `PQNK_Book_Chapter_9_FINAL - Approved.docx/.pdf` (14-point external-reviewer evidence pass + 6 surgical corrections + migration-para rewrite already baked in). The Cover-Up Technology Chain — seven links (tillage → fertiliser → pesticides → GMO seeds → herbicide tolerance → irrigation → nutrition consequence), framed as a **functional dependency chain, not a strict chronology**. One infographic (`ch9-img-01.png`, "The ACI Cover-Up Technology Chain" panel, extracted from PDF p2 at 1800px) placed after Link One with its caption. The three "THE LOGIC OF THE CHAIN" paragraphs were normalised to **lead-sentence bold** — the approved PDF has the middle one ("The institutions that might break the chain are shaped by it…") fully bold, treated as a typography slip and matched to Ch8's bold-lead pattern. Forward refs (Captured Science, The True Cost) by title; backward refs (Ch 3, 6, 8) keep numbers. `chapterSpeech.ts`: added `GMO → "G M O"` and `GURT → "G U R T"`. Ch 8's `transition` already named Chapter Nine (no change). Hands to Chapter Ten, `the-industrialization-of-agriculture`. **Soft flag for the eventual Ch 11 publish:** Ch 9's "As Chapter Three set out, … declines often in the range of twenty to forty percent" leans on Ch 3 for a figure Ch 3 states only lightly; the "20–40 percent" framing is really a Ch 11 topic — reconcile the Ch 3 / Ch 11 nutrient-decline cross-refs when Ch 11 is prepared. Verified live on pedaver.com 2026-09-10. |
| 10+ | — | — | With external reviewers, not web-published | Chapters 10–13 (`the-industrialization-of-agriculture`, `the-68-year-experiment`, `captured-science`, `the-sevenfold-bankruptcy`) are manuscript-final and out to external reviewers; not yet prepared for web publication. Ch 8–13 all use the "68-year (1958–2026)" framework and reference later chapters by title. **Ch 13 publish-ready pass done 2026-09-09** (source `PQNK_Chapter_13_PUBLISH_READY.docx`, backup `backups/PQNK_Chapter_13_PUBLISH_READY.pre-publishready.20260909-223453.docx`): font normalised to the house profile (`Noto Serif` → `Georgia`, 118 runs; result Georgia + Arial + Arial Unicode MS, matching Ch 10–12); straight apostrophes/quotes → curly; four spaced-hyphen parentheticals → parentheses/commas (house style, no em-dashes in body); section-heading spacing made uniform (3 blank lines before each of the seven numbered headings, "THE INTERCONNECTION…", "WHAT THIS CHAPTER…", and the ⁂). One factual fix: the 58% cost-of-production figure belongs to the **NARC wheat trial** (per Ch 4 and Ch 12), not a "rice trial" — corrected, and spelled "fifty-eight percent" to match Ch 12. Closing transition aligned to the canonical Ch 14 subtitle in `books.ts` ("$1.9 Trillion Per Year, and the $4.7 Trillion PQNK Restoration Dividend"). **PDF needs re-export** — the on-disk `PQNK_Chapter_13_PUBLISH_READY.pdf` predates these edits. Not touched: the "One. … Seven." numbered title-case heading scheme (intentional for a seven-part audit; renders Georgia-Bold after the font swap). |

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

## 5. Open issues

**Part One (Chapters 1–7) plus Chapters 8 and 9 (Part Two) are published
and LIVE.** Chapter 8 shipped 2026-09-09 (`8a3a3a6`); Chapter 9 shipped
2026-09-10 (`386dc98`).

**Ch8 open issue — PDF one-word lag:** the deployed `the-first-error.pdf`
closing paragraph reads "over the last sixty"; the web body was corrected
to "sixty-eight" for internal consistency with the intro. The docx
(`PQNK_Book_Chapter_8_FINAL_APPROVED.docx`) is already fixed — swap a fresh
PDF on the author's next re-export, then re-verify SHA-256 against
production and update the §4 row. Non-blocking (web text is correct).

Chapters 10–13 are manuscript-final and with external reviewers; not yet in
web-publication preparation. Ch 13 has had its publish-ready editorial pass
(see §4 row and §6). Ch 9 carries one soft cross-reference flag for the
eventual Ch 11 publish (the "twenty to forty percent" nutrient-decline
figure is attributed to Chapter Three but is really a Ch 11 topic — see the
§4 Ch 9 row).

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
