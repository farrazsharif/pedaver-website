# Pedaver Website

Marketing website for **Pedaver** and its regenerative-farming system **PQNK**
(Paedar Qudratti Nizam Kashatqari). Built with Next.js 16, exported as a fully
static site (plain HTML/CSS/JS), and hosted on cPanel shared hosting.

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

## 5. Build for publishing

```bash
npm run build
```

This regenerates the **`out/`** folder — the complete static site. A copy of
the `.htaccess` file (custom 404 + caching) should sit at the top of `out/`
before you zip it; see `docs/htaccess.txt` for its contents.

## 6. Publish to the live site (cPanel)

1. Zip the **contents** of `out/` (so `index.html` is at the top of the zip,
   not inside an `out/` folder). Use forward-slash paths (right-click → Send to
   → Compressed folder works, or ask Claude to build the zip).
2. Log into **cPanel → File Manager → `public_html`**.
3. Delete the old site files (or upload and overwrite).
4. Upload the zip, right-click → **Extract**, then delete the zip.
5. Open the domain and hard-refresh (`Ctrl+F5`).

The site is 100% static, so there is nothing to configure on the server —
cPanel just serves the files.

## 7. Team workflow (two people)

```bash
git pull            # get the latest before you start
# ...make changes...
git add -A
git commit -m "Describe what you changed"
git push            # share your changes
```

Always `git pull` before editing so you both stay in sync.

---

## Notes

- This uses **Next.js 16**, which has changed conventions from older versions.
  See `AGENTS.md` for the key differences before editing app config/routing.
- Static export is configured in `next.config.ts` (`output: "export"`). Because
  the site is static, the contact and newsletter forms open the visitor's email
  app (mailto) rather than submitting to a server.
