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
10. **Update this file** — move the chapter to Published, clear its open
    issues, add any new decisions.

## 4. Chapter status

| # | chapterId | Title | Status | Notes |
|---|-----------|-------|--------|-------|
| 1 | `earths-original-design` | Earth's Original Design | **Published** 2026-08-27 (v1.0) | |
| 2 | `rock-dirt-soil-life` | Rock, Dirt, Soil, Life | **Published** 2026-08-29 (v1.0) | |
| 3 | `the-0-083-paradox` | The 0.083% Paradox | **Published** 2026-08-31 (v1.0) | Closing paragraph still says "next chapter turns to water" — needs the Ch4 hand-off fix; ship with the Ch4 publish. |
| 4 | `carbon-the-currency-of-life` | Carbon: The Currency of Life | **In review — blocked** | See Open issues. Next chapter it hands to = Chapter Five, `the-natural-water-system`. |
| 5+ | — | — | In preparation | Full TOC (8 Parts, 66 chapters) is in `books.ts`. |

## 5. Open issues

### Chapter 4 — blocked on the corrected source file
- **Page-1 title infographic** ("CARBON: THE CURRENCY OF LIFE" cover graphic,
  PDF page 1). As reviewed 2026-09-04 it:
  - shows `95.917% / 4.000% / 0.083%` summing to exactly 100.000% and framed
    as plant composition — this reintroduces the biomass-composition reading
    of 0.083% that the locked Ch3 rule forbids (0.083% = illustrative net
    mineral *export* in harvested produce, not a composition fraction). The
    published Ch3 web infographic (`ch3-img-01.png`) was deliberately rebuilt
    to carry **no such percentages**.
  - labels the carbon split "~20–50% root exudates / ~50–80% builds the
    harvest" — conflicts with the chapter text and the sibling "Liquid Carbon
    Pathway" infographic, both of which say **"20 to 40%"** (the locked
    value), and "~50–80% builds the harvest" contradicts the chapter's own
    opening argument.
- Author states (2026-09-04) a corrected, self-approved version exists.
  Attempt 1: file at canonical path unchanged (page-1 image `md5 19a1c301`).
  Attempt 2 (2026-09-04 14:45): re-saved as
  `PQNK_Book_Chapter_4_Final - Publish ready.{docx,pdf}` — this is a **rename
  only**, byte-identical content, all 14 embedded images unchanged incl.
  page-1 `md5 19a1c301`; the old `- Claude Reviewed` files were removed. The
  infographic fix has NOT been exported yet. The corrected image must
  actually reach the PDF before publishing.
- **The exact fix the page-1 infographic needs:** (a) drop the
  `95.917 / 4.000 / 0.083` three-column split, or relabel `0.083%` as
  *illustrative net mineral export in harvested produce under stated PQNK
  assumptions* — not a share of plant mass; match how published
  `ch3-img-01.png` handles it (words, no percentages). (b) change the carbon
  split from "~20–50% root exudates / ~50–80% builds the harvest" to
  "20 to 40% below ground", and drop "builds the harvest" (contradicts the
  chapter's own argument). (c) remove the em dash in the header line
  ("SUNLIGHT, AIR AND WATER — THROUGH THE POWER OF CARBON").
- **Re-verify the extracted page-1 image + carbon-split wording every time a
  new file is provided** — do not trust a "fixed" claim without re-extracting.
- Minor, non-blocking: the mulch-thermostat infographic says the bare-vs-mulch
  gap is "about 40 °C"; the Ch4 text says "more than thirty degrees" and
  published Ch1 says "thirty degrees cooler." Not a contradiction; align only
  if the author wants.

### Chapter 3 — ship with the Ch4 publish
- `books.ts`, Ch3 `body`, the paragraph beginning *"The next chapter turns to
  water…"* — rewrite to hand off to *Carbon: The Currency of Life*. The
  `transition` block right after it already names Chapter Four correctly; only
  the prose paragraph is wrong. Prepared replacement text is in the session
  that flagged it; keep Ch3's voice, point at carbon / crop-residue-and-roots
  / the closed loop.

## 6. Decisions log — BINDING, do not re-litigate

- **2026-09-04 — Ch4 "Roughly half of a crop plant's mass is below ground as
  roots"** (in the "rate at which this happens surprises farmers" paragraph).
  Claude flagged this as agronomically high for the book's crops (measured
  root fraction ~15–30%). First call: author accepted as written. **REVERSED
  later the same day** by the author's "final scientific-consistency pass"
  prompt (item 6): now to be reworded to "a large share ... varies widely
  with species, growth stage, environment and production conditions", keeping
  the point that retained roots are a major carbon return and leave pore
  architecture. Corrected wording delivered; awaiting author sign-off.
- **2026-09-04 — Ch4 scientific-consistency pass.** Author supplied a 15-point
  prompt to remove residual scientific inconsistencies from Ch4 (0.083% wording,
  below-ground allocation vs exudation, "one-way store" error, heterotroph
  generalisation, humus/stability mechanism, root-mass claim, "eliminates
  evaporation", "sterilised"/temperature wording, ACI "no deposits", labelling
  the 0.5%→4% field figure as PQNK field evidence, carbon-not-single-factor,
  climate/permanence, Sustained-State vs transition). Claude produced a
  before→after report + a corrected running-text file
  (`Chapter4_science_pass_corrected_text.md`). NOT yet applied to the docx or
  the master; NOT published. Awaiting author sign-off, then the corrected
  page-1 infographic, then publish.
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
