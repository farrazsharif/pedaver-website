# Pedaver website — full onboarding for a new Claude account

Everything another Claude session (on a different account/machine) needs to pick
up this project. Written 2026-10-22, just after the site was migrated off SkyHost
onto Cloudflare. **Read this top to bottom before touching anything.**

---

## 1. What this project is

The marketing website for **Pedaver** and its regenerative-farming system **PQNK**
(pedaver.com). It is a **Next.js 16 + React 19 + Tailwind 4** site exported as a
**fully static** site (`output: "export"` in `next.config.ts`). There is **no
backend** — contact/newsletter forms use `mailto:`. The content is heavy on PDFs
(book chapters and "Knowledge Papers") — ~261 PDFs, ~1.2 GB.

Two people maintain it: **the owner (Farraz)** and **his father**, who makes most
of the content changes. Both push to `main` on the same GitHub repo.

---

## 2. Where everything lives (copy these)

**Source of truth = the GitHub repo.** To get a complete copy of the project
(code, all PDFs, docs, and full history), clone it:

```
git clone https://github.com/farrazsharif/pedaver-website.git
```

That single clone **is** "everything we did" on the code side — the migration
changes, the PDFs, the workflows, and all docs are committed.

### Folder locations on the current system (machine "sirgr", Windows)

| What | Path |
|---|---|
| **Project repo (local working copy)** | `D:\Claude Fs\pedaver` |
| **Claude memory for this project** (this account) | `C:\Users\sirgr\.claude\projects\D--Claude-Fs\memory\` |
| → the project memory file | `C:\Users\sirgr\.claude\projects\D--Claude-Fs\memory\pedaver-website-project.md` |
| → the memory index | `C:\Users\sirgr\.claude\projects\D--Claude-Fs\memory\MEMORY.md` |
| This onboarding file (in the repo) | `docs/pedaver-onboarding.md` |
| Standalone copy (original machine) | `D:\Claude Fs\pedaver-onboarding.md` |

To replicate on the other account/machine:
1. `git clone` the repo (above) — or copy the `D:\Claude Fs\pedaver` folder.
2. Copy this onboarding file and read it.
3. Seed the new account's memory from §9 below (or copy the
   `pedaver-website-project.md` file into that account's own
   `…/.claude/projects/<project>/memory/` folder).

### Key docs already inside the repo
- `CLAUDE.md` — project guide (build, deploy, content model, style).
- `docs/handoff-cloudflare.md` — the hosting handoff (Cloudflare setup, do-nots).
- `AGENTS.md` — Next.js 16 caveats (it has breaking changes; read before coding).
- `README.md` — human workflow.
- `docs/pqnk-book-workflow.md` — living status of the PQNK book workstream; its
  Decisions log is **binding**.

---

## 3. Hosting architecture (current, since 2026-10-18)

The site was migrated **off SkyHost's web server onto Cloudflare** because
SkyHost's shared node kept going fully down (HTTP 502). **Email was NOT moved** —
it still lives on SkyHost.

- **Website → Cloudflare Pages**, project **`pedaver-website`**, connected to the
  GitHub repo. Push to `main` → auto-build + deploy. No deploy GitHub Action, no
  manual upload. Build command `npm run build:pages`, output `out`, Pages env var
  `NEXT_PUBLIC_MEDIA_BASE=https://files.pedaver.com`, Node pinned to 22 via
  `.node-version`. Preview URL: `pedaver-website.pages.dev`.
- **PDFs → Cloudflare R2**, bucket **`pedaver-media`**, served at
  **`https://files.pedaver.com`** (R2 custom domain; free egress). They can't live
  on Pages (25 MiB/file limit — the largest PDF is 40 MB).
- **Repo backups → Cloudflare R2**, bucket **`pedaver-backups`** (weekly `git
  bundle` via `.github/workflows/backup-r2.yml`).
- **DNS → Cloudflare** (Free plan). Nameservers `dayana` / `kipp.ns.cloudflare.com`.
- **Registrar → GoDaddy.** (Rollback nameservers, if ever needed, were SkyHost's
  `ns5` / `ns6.skyhost.pk`.) DNSSEC is off.
- **Email → still SkyHost** (cPanel account **`caremidc`**, server
  **95.217.124.130** / `unlimited.skyhost.pk`). Webmail at
  `https://webmail.pedaver.com`.

---

## 4. Normal workflow (unchanged for the maintainers)

- Edit the data-driven content files (see `CLAUDE.md`) and **push to `main`** →
  Pages rebuilds, site updates in a few minutes.
- **To add a PDF:** drop it into `public/` (e.g. `public/papers/…` or
  `public/books/…`) and push. `.github/workflows/sync-media-r2.yml` mirrors it to
  the `pedaver-media` R2 bucket automatically, and the site links to it via
  `files.pedaver.com`. Nothing else to do.

### How the PDF-offload works (the migration's core change)
- PDFs stay in `public/` in the repo (so the add-a-PDF workflow is unchanged).
- `src/lib/mediaUrl.ts` + the `NEXT_PUBLIC_MEDIA_BASE` env var rewrite PDF links to
  `files.pedaver.com` at build time. The single PDF-link component is
  `src/components/analytics/TrackedPdfLink.tsx`.
- `npm run build:pages` = `npm run build` then `scripts/strip-media-from-out.mjs`,
  which deletes PDFs from `out/` so the Pages deploy stays small.
- `.github/workflows/sync-media-r2.yml` pushes `public/**/*.pdf` to R2 on push.

---

## 5. Do NOT

- **Do not re-add FTP, SSH, or the cPanel deploy.** `.github/workflows/deploy.yml`
  + `scripts/deploy-cpanel.sh` are **retired** (manual-only, kept for reference).
  SkyHost's web server is no longer used for the site.
- **Do not change the nameservers**, and **do not touch the email DNS records** in
  Cloudflare — `MX`, `mail`, `webmail`, `SPF`, `DKIM` (`default._domainkey`), and
  the cPanel service records all point to SkyHost (95.217.124.130) and are set to
  **"DNS only" (grey cloud)**. Changing these breaks email.
- **Do not delete the R2 buckets** (`pedaver-media` = site PDFs, `pedaver-backups`
  = repo backups).
- **Do not remove `pedaver.com` as a domain in cPanel** — that destroys the
  mailboxes/mail routing.
- **Keep the SkyHost account `caremidc` active and paid** — email depends on it.

---

## 6. Headers, redirects, SEO

Cloudflare Pages does **not** read `.htaccess`. Equivalents:
- `public/_headers` — security headers (HSTS, X-Frame-Options, X-Content-Type-
  Options, Referrer-Policy, Permissions-Policy, and a **Report-Only** CSP) +
  immutable caching for `/_next/static`.
- `public/_redirects` — legacy 301s (`/certification→/validation`, etc.).
- `www → pedaver.com` is a **Cloudflare Redirect Rule** (zone-level), not in
  `_redirects` (Pages `_redirects` doesn't do host-based redirects).
- `docs/htaccess.txt` is kept **only** as the historical reference.

---

## 7. Secrets & credentials (who holds what)

**Policy:** the owner creates and installs all credentials/tokens himself. Claude
never handles secret values — it only references them. The father has **no cPanel
access**; only the owner does.

GitHub repo secrets currently present (Settings → Secrets and variables → Actions):
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ACCOUNT_ID`, `R2_BUCKET` — used by
  the backup and media-sync workflows. The R2 API token must have **Object Read &
  Write on all buckets**.
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` — analytics.
  **Not currently used by any active workflow** (they fed the old SkyHost build).

Removed during cleanup: `CPANEL_USER`, `CPANEL_TOKEN` (the cPanel API token was
revoked in cPanel too — the old deploy no longer exists).

**Cloudflare Pages env var:** `NEXT_PUBLIC_MEDIA_BASE=https://files.pedaver.com`
(set in the Pages project, Production).

---

## 8. Open / optional items

- **Analytics is OFF on Pages.** Google Analytics and Microsoft Clarity aren't
  running because their values live in GitHub secrets that can't be read back. To
  restore: get the GA Measurement ID and Clarity Project ID and add them as **Pages
  environment variables** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`,
  `NEXT_PUBLIC_CLARITY_PROJECT_ID`). The site works fine without them.
- **Google Search Console** is already verified via the `google-site-verification`
  **DNS TXT** record (carried over to Cloudflare) — nothing to restore there.
- **CSP is Report-Only.** Once the browser console shows no violations in normal
  use, it can be switched to enforcing (rename `Content-Security-Policy-Report-Only`
  → `Content-Security-Policy` in `public/_headers`).
- **cPanel housekeeping (optional):** old website files in
  `/home/caremidc/pedaver.com/` are now idle (DNS points to Cloudflare); can be
  cleared later to free space. Rotate the cPanel password + enable 2FA.

---

## 9. Memory seed for the new account

Save these durable facts into the new account's memory:

- **pedaver-website** is a shared repo co-maintained with the owner's father; it
  lives at `https://github.com/farrazsharif/pedaver-website.git`. The owner
  authorized pulling/pushing on `main` without asking each time (`git pull` before
  editing, `git push` when done). On a **merge conflict**, stop and involve the
  owner rather than forcing either side.
- **Hosting (since 2026-10-18):** website on **Cloudflare Pages** (project
  `pedaver-website`, auto-deploys on push, build `npm run build:pages`, output
  `out`, env `NEXT_PUBLIC_MEDIA_BASE=https://files.pedaver.com`); **PDFs on
  Cloudflare R2** bucket `pedaver-media` at `https://files.pedaver.com` (synced
  from `public/**/*.pdf` by `sync-media-r2.yml`); **DNS on Cloudflare** (registrar
  GoDaddy); **email still on SkyHost** (account `caremidc`, 95.217.124.130).
- **Do not** re-add FTP/SSH/cPanel deploy, change nameservers, touch email DNS
  records, or delete the R2 buckets. SkyHost must stay paid (email).
- The old SkyHost cPanel/FTP deploy (`deploy.yml`, `scripts/deploy-cpanel.sh`) is
  retired; the cPanel API token was revoked; `CPANEL_*` GitHub secrets removed.

---

## 10. Status as of 2026-10-22

All verified live: pedaver.com + www on Pages (valid SSL), PDFs on R2, email
routing to SkyHost, security headers + redirects in place, auto-deploy working,
www→apex redirect working. Cost: **$0/month** on Cloudflare's free tiers.
