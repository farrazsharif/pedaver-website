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

## 4. Chapter status

| # | chapterId | Title | Status | Notes |
|---|-----------|-------|--------|-------|
| 1 | `earths-original-design` | Earth's Original Design | **Published** 2026-08-27 (v1.0) | |
| 2 | `rock-dirt-soil-life` | Rock, Dirt, Soil, Life | **Published** 2026-08-29 (v1.0) | |
| 3 | `the-0-083-paradox` | The 0.083% Paradox | **Published + LIVE** 2026-08-31 (v1.0) | Closing-paragraph hand-off fixed 2026-09-04, commit `7b7e557` (now points to Carbon, not water). Verified live on pedaver.com 2026-09-04. |
| 4 | `carbon-the-currency-of-life` | Carbon: The Currency of Life | **Published + LIVE** 2026-09-04 (v1.0), commit `21da998` | 9 images, PDF from the author-approved `PQNK_Book_Chapter_4_Final - Publish ready (Claude-merged) Approved.pdf`. Hands to Chapter Five, `the-natural-water-system`. Verified live on pedaver.com 2026-09-04 (page-1 infographic + PDF byte-verified via SHA-256 against production). |
| 5+ | — | — | In preparation | Full TOC (8 Parts, 66 chapters) is in `books.ts`. |

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

None outstanding for Chapters 1–4. Next chapter to prepare: Chapter Five,
`the-natural-water-system` ("The Natural Water System — Rain, Dew, Humidity,
and Soil Moisture Management").

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
