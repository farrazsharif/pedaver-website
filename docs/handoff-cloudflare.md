# Handoff: the Cloudflare setup (read before changing the site)

The website was migrated **off SkyHost's web server onto Cloudflare on 2026-10-18**
(SkyHost's shared node kept going down with HTTP 502). **Email was NOT moved** — it
still lives on SkyHost. This note is the quick orientation; `CLAUDE.md` has the
build/deploy details.

## How hosting works now

- **Website → Cloudflare Pages** (project `pedaver-website`), connected to the
  GitHub repo. Pushing to `main` **auto-builds and deploys** — there is no deploy
  GitHub Action anymore and no manual upload. Build command `npm run build:pages`,
  output dir `out`, Pages env var `NEXT_PUBLIC_MEDIA_BASE=https://files.pedaver.com`,
  Node pinned to 22 via `.node-version`. Preview URL: `pedaver-website.pages.dev`.
- **PDFs (~1.2 GB) → Cloudflare R2** bucket `pedaver-media`, served at
  `https://files.pedaver.com` (free egress). They can't live on Pages (25 MiB/file
  limit).
- **DNS → Cloudflare** (registrar is **GoDaddy**; nameservers
  `dayana`/`kipp.ns.cloudflare.com`).
- **Email → still SkyHost**, unchanged (`mail.pedaver.com`, `webmail.pedaver.com`).

## Normal workflow (unchanged)

- Edit the data-driven content files (see `CLAUDE.md`) and **push to `main`** → Pages
  rebuilds and the site updates in a few minutes.
- **To add a PDF:** drop it into `public/` (e.g. `public/papers/…` or
  `public/books/…`) and push. `.github/workflows/sync-media-r2.yml` automatically
  mirrors it to R2, and the site links to it via `files.pedaver.com`. Nothing else
  to do.

## Do NOT

- **Do not re-add FTP, SSH, or the cPanel deploy.** The old `deploy.yml` +
  `scripts/deploy-cpanel.sh` are **retired** (manual-only, kept for reference).
  SkyHost's web server is no longer used for the site.
- **Do not change the nameservers**, and **do not touch the email DNS records** in
  Cloudflare — `MX`, `mail`, `webmail`, `SPF`, and `DKIM` (`default._domainkey`) all
  point to SkyHost (`95.217.124.130`) and are set to **"DNS only" (grey cloud)**.
  Changing these breaks email.
- **Do not delete the R2 buckets** (`pedaver-media` = site PDFs, `pedaver-backups`
  = repo backups).
- **Keep the SkyHost account `caremidc` active/paid** — email depends on it.

## Good to know

- Headers/redirects live in `public/_headers` and `public/_redirects` (Cloudflare
  Pages does **not** read `.htaccess`; `docs/htaccess.txt` is kept only as a
  historical reference). The CSP in `_headers` is **Report-Only**. `www → pedaver.com`
  is a Cloudflare **Redirect Rule** (zone-level), not in `_redirects`.
- To check a deploy, look at the build log in the **Cloudflare Pages** dashboard.
- **Secrets:** the `R2_*` GitHub secrets need **Object Read & Write on all buckets**.
  The `CPANEL_*` secrets are now unused (only the retired manual deploy references
  them).
- **Analytics is currently OFF** — Google Analytics, Microsoft Clarity, and the
  Google Search Console verification tag — because those values lived in GitHub
  secrets that can't be read back. They need to be re-entered as **Pages environment
  variables** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`,
  `NEXT_PUBLIC_GSC_VERIFICATION`) when the values are available. The site works fine
  without them.

## If a Pages build fails

Check the build log in the Pages dashboard. Common causes are a missing env var
(`NEXT_PUBLIC_MEDIA_BASE`) or the Node version — both are already configured, so a
failure usually points to a code/build error in the pushed commit.
