# Pedaver Website — project guide for Claude

Marketing website for **Pedaver** and its regenerative-farming system **PQNK**.
Next.js 16, exported as a **fully static** site (`output: "export"` in
`next.config.ts`) and hosted on cPanel shared hosting. There is no backend:
contact/newsletter forms use `mailto:`.

## Working on this project
- Read `README.md` for the human workflow and `AGENTS.md` for Next.js 16 caveats.
- **Hosting:** read `docs/handoff-cloudflare.md` — the site runs on Cloudflare
  Pages + R2 (migrated off SkyHost on 2026-10-18); email stays on SkyHost. It
  lists what not to touch (nameservers, email DNS, the retired cPanel deploy).
- **New session / different Claude account?** `docs/pedaver-onboarding.md` is the
  full orientation (architecture, where everything lives, a memory seed).
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
- `npm run build` — regenerates the static site into `out/` (PDFs included).
- `npm run build:pages` — the Cloudflare Pages build command: runs `build` then
  strips PDFs from `out/` (`scripts/strip-media-from-out.mjs`); PDFs are served
  from R2, not Pages (which has a 25 MiB/file limit).
- Deploy is automatic: pushing to `main` triggers a **Cloudflare Pages** build
  (Pages is connected to this repo) that publishes to pedaver.com. No GitHub
  Action, no manual upload. Pages env var: `NEXT_PUBLIC_MEDIA_BASE=https://files.pedaver.com`.
- **PDFs live on Cloudflare R2**, served at `https://files.pedaver.com`. They
  stay in `public/`; `.github/workflows/sync-media-r2.yml` mirrors
  `public/**/*.pdf` to the `pedaver-media` bucket on push — drop a PDF in
  `public/` and push and it syncs automatically. Links resolve via `mediaUrl()`
  (`src/lib/mediaUrl.ts`) + `NEXT_PUBLIC_MEDIA_BASE`.
- Headers & redirects: `public/_headers` and `public/_redirects` (Pages does not
  read `.htaccess`; `docs/htaccess.txt` is kept only as the historical reference).
- **Email stays on SkyHost cPanel** (`mail.pedaver.com`) — the Oct 2026 migration
  moved only the website. The old SkyHost deploy (`deploy.yml`,
  `scripts/deploy-cpanel.sh`) is retired (manual-only) but kept for reference.

## Style
- Fonts: Bitter (headings) + Hanken Grotesk (body). Palette: green `#2f5233`,
  deep green `#1e3722`, terracotta accent `#c97c3d`, gold `#e0a868`, cream.
- Keep copy plain; avoid heavy em-dash use in body text.

@AGENTS.md
