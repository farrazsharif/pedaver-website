// Remove PDF files from the exported `out/` directory before deploying to
// Cloudflare Pages. The PDFs are served from Cloudflare R2 (https://files.pedaver.com),
// not from Pages, so shipping them would waste the build and hit Pages' 25 MiB
// per-file limit. The originals stay in /public (and are mirrored to R2 by the
// sync-media-r2 workflow); this only prunes the build OUTPUT, never the source.
//
// Used by `npm run build:pages` (the Cloudflare Pages build command). A plain
// `npm run build` leaves the PDFs in out/ so local preview still works.
import { readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
let removed = 0;
let bytes = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
      bytes += statSync(p).size;
      rmSync(p);
      removed += 1;
    }
  }
}

if (!existsSync(OUT)) {
  console.error(`strip-media: "${OUT}/" not found — run the build first`);
  process.exit(1);
}

walk(OUT);
console.log(
  `strip-media: removed ${removed} PDF(s) (${(bytes / 1048576).toFixed(0)} MB) from ${OUT}/ — these are served from R2`,
);
