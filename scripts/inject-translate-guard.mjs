// Post-build (2026-10-07): insert the translate-proxy guard as the very FIRST element of <head> in every exported page.
// On Google's translate proxy (*.translate.goog) the page arrives already translated. If the site's scripts start
// there, React finds text that differs from its English original (hydration mismatch, React error #418), redraws the
// page in English and the translation is lost, including in any saved copy. So on the proxy only: keep the Turbopack
// runtime from starting (it exits when globalThis.TURBOPACK is not an array), mark the page as translated
// (html[data-translated] shows the "Download this page in your language" button), and handle [data-print-page]
// buttons with a plain click listener. It must run before Next's async chunk scripts, which is why it is injected here
// rather than rendered from app/layout.tsx. pedaver.com itself is unaffected (the function returns at once).
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const GUARD =
  '<script>(function(){if(!/\\.translate\\.goog$/.test(location.hostname))return;' +
  'try{Object.defineProperty(globalThis,"TURBOPACK",{value:{push:function(){}},writable:false,configurable:false})}catch(e){}' +
  'document.documentElement.setAttribute("data-translated","1");' +
  'document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("[data-print-page]");' +
  'if(b){e.preventDefault();window.print()}})})();</script>';
const MARK = "translate\\.goog$/.test(location.hostname)";

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

let n = 0;
for (const file of walk("out")) {
  const html = readFileSync(file, "utf8");
  if (html.includes(MARK)) continue;
  const i = html.indexOf("<head>");
  if (i < 0) continue;
  writeFileSync(file, html.slice(0, i + 6) + GUARD + html.slice(i + 6));
  n++;
}
console.log(`translate guard injected into ${n} pages`);
