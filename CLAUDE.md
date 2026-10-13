# Pedaver Website — project guide for Claude

Marketing website for **Pedaver** and its regenerative-farming system **PQNK**.
Next.js 16, exported as a **fully static** site (`output: "export"` in
`next.config.ts`) and hosted on cPanel shared hosting. There is no backend:
contact/newsletter forms use `mailto:`.

## Working on this project
- Read `README.md` for the human workflow and `AGENTS.md` for Next.js 16 caveats.
- **PQNK book chapters:** before any work on the books, read
  `docs/pqnk-book-workflow.md` — it is the living status of that workstream,
  and its Decisions log is binding (do not re-raise a settled call). Update it
  before you finish.
- Content is data-driven. Prefer editing these over hardcoding in components:
  - Copy/labels: `src/lib/dictionaries/en.ts`
  - Crops: `src/lib/content/crops.ts` · crop→photo map: `src/lib/content/cropImages.ts`
  - Hero slides: `src/lib/content/highlights.ts` · videos: `videos.ts` · resources: `resources.ts`
  - Images & logo: `public/images/`
- Routes live directly under `src/app/` (no `[locale]` — the site is English-only).

## Build & deploy
- `npm run dev` — local preview.
- `npm run build` — regenerates the static site into `out/`.
- Deploy is automatic: pushing to `main` runs `.github/workflows/deploy.yml`,
  which builds and publishes to pedaver.com via the **cPanel API**
  (`scripts/deploy-cpanel.sh`, incremental — small set every run + changed
  media only). No manual upload step. (The docroot is the add-on domain path
  `/home/caremidc/pedaver.com/`, not `public_html`.)

## Style
- Fonts: Bitter (headings) + Hanken Grotesk (body). Palette: green `#2f5233`,
  deep green `#1e3722`, terracotta accent `#c97c3d`, gold `#e0a868`, cream.
- Keep copy plain; avoid heavy em-dash use in body text.

@AGENTS.md
