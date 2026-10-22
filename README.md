# Pedaver Website

Marketing website for **Pedaver** and its regenerative-farming system **PQNK**
(Paedar Qudratti Nizam Kashatqari). Built with Next.js 16, exported as a fully
static site (plain HTML/CSS/JS), and hosted on Cloudflare Pages.

---

## 1. What you need installed (one-time)

- **Node.js** — LTS version (22 or newer). https://nodejs.org
- **Git** — https://git-scm.com
- **Claude Code** (optional but recommended for editing with AI) — signed in
  with your own Claude account.

## 2. Get the project

```bash
git clone <the GitHub repo URL>
cd pedaver-website
npm install        # one-time, downloads dependencies
```

## 3. Preview it on your own PC

```bash
npm run dev
```

Then open the URL it prints (usually http://localhost:3000). Nothing here is
public — this is a private preview on your machine only. Stop it with `Ctrl+C`.

## 4. Where the content lives

| To change… | Edit this file |
|---|---|
| Most page text, headings, nav labels, taglines | `src/lib/dictionaries/en.ts` |
| Crop guides (names, descriptions, results) | `src/lib/content/crops.ts` |
| Which photo shows for each crop | `src/lib/content/cropImages.ts` |
| Hero slider slides | `src/lib/content/highlights.ts` |
| Videos shown | `src/lib/content/videos.ts` |
| Resources / techniques | `src/lib/content/resources.ts` |
| Photos & logo | `public/images/` (replace a file, keep the same name) |
| Homepage layout & sections | `src/app/page.tsx` |
| Header / menu | `src/components/Header.tsx` |
| Footer | `src/components/Footer.tsx` |

The simplest safe change is **swapping a photo**: put a new image in
`public/images/` using the *exact same filename* as the one it replaces.

## 5. Analytics (optional — currently off)

The site can send privacy-conscious analytics (Google Analytics 4 + Microsoft
Clarity) plus a Search Console verification tag, all configured through
build-time environment variables.

**They are not set in production right now, so analytics is off.** The site
works perfectly without them. To switch them back on, add the values as
**Cloudflare Pages environment variables** (Production) on the
`pedaver-website` project and redeploy:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_GSC_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Google Search Console is already verified through a DNS `TXT` record, so the
verification tag is not needed for that.

Only if you want analytics in a **local** build, put the same lines in a
`.env.local` file at the project root (gitignored, never committed). Values are
inlined at build time, so changing one needs a rebuild + redeploy. See
`docs/analytics-setup.md` for where each value comes from and the event catalog.

## 6. Build it on your own PC (optional)

```bash
npm run build
```

This regenerates the **`out/`** folder — the complete static site, PDFs
included. `npm run build:pages` is the variant Cloudflare runs: the same build,
then it strips the PDFs out of `out/` (they are served from Cloudflare R2, not
from the website host).

You do **not** need to build in order to publish — Cloudflare builds for you
(section 7). There is no `.htaccess` step any more: Cloudflare Pages does not
read `.htaccess`, so headers and redirects live in `public/_headers` and
`public/_redirects` instead. `docs/htaccess.txt` is kept only as history.

## 7. Publish to the live site (automatic)

```bash
git push        # to main
```

That is the whole deploy. Pushing to `main` triggers a **Cloudflare Pages**
build (project `pedaver-website`, build command `npm run build:pages`, output
directory `out`) which publishes to pedaver.com within a few minutes. Nothing
to zip, upload, or configure, and no FTP or cPanel involved.

- **To watch or troubleshoot a deploy:** Cloudflare dashboard → Workers & Pages
  → `pedaver-website` → the latest deployment's build log. Earlier deployments
  can be rolled back from the same screen.
- **To add a PDF:** drop it into `public/` (e.g. `public/papers/…` or
  `public/books/…`) and push. A GitHub Action mirrors it to the `pedaver-media`
  R2 bucket and the site links to it via `https://files.pedaver.com`. Nothing
  else to do.
- **Email still lives on SkyHost**, not Cloudflare. Read
  `docs/handoff-cloudflare.md` before changing anything to do with DNS,
  nameservers, or the old cPanel account — some of it will break email.

## 7a. Site backups (automatic — the rule)

Two rolling copies of the built site are kept on the Mac at
`~/Documents/Pedaver_Website_Backups/` — `current/` and `previous/` — so a bad
deploy is always recoverable.

- `scripts/backup-site.sh` builds the site and takes a snapshot (`--no-build`
  snapshots the existing `out/`). Copies are hard-linked, so after the first
  one each snapshot only costs what changed.
- It runs on its own: **before every `git push` to `main`** (the
  `.githooks/pre-push` hook — enable once per clone with
  `git config core.hooksPath .githooks`; bypass with `git push --no-verify`),
  and **daily at 13:00** (launchd agent
  `~/Library/LaunchAgents/com.pedaver.website-backup.plist`; reference copy in
  `scripts/`).
- **Restore:** the live site is now built from this repo, so first-line
  recovery is a **rollback in the Cloudflare Pages dashboard** or a corrective
  push to `main` — there are no files to re-upload by hand. The Mac snapshots
  are the offline copy of a known-good built site; `MANIFEST.txt` in each one
  records the git commit and file checksums so you know exactly what it holds.
- The repo itself is also backed up weekly as a `git bundle` into the
  `pedaver-backups` R2 bucket (`.github/workflows/backup-r2.yml`).

## 8. Team workflow (two people)

```bash
git pull            # get the latest before you start
# ...make changes...
git add -A
git commit -m "Describe what you changed"
git push            # share your changes — this also deploys
```

Always `git pull` before editing so you both stay in sync. Remember that a push
to `main` publishes the site, so push work you are happy to have live.

The production analytics values live in the Cloudflare Pages project, so
neither of you needs them locally. If you do want them for a local build
(section 5), share them out-of-band — a password manager entry or a private
note — never in a commit, issue, or chat message that could get pasted into a
tracked file.

---

## Notes

- This uses **Next.js 16**, which has changed conventions from older versions.
  See `AGENTS.md` for the key differences before editing app config/routing.
- Static export is configured in `next.config.ts` (`output: "export"`). Because
  the site is static, the contact and newsletter forms open the visitor's email
  app (mailto) rather than submitting to a server.
