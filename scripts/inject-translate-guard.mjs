// Post-build (2026-10-07): insert the translate-proxy guard as the very FIRST element of <head> in every exported page.
// On Google's translate proxy (*.translate.goog) the page arrives already translated. If the site's scripts start
// there, React finds text that differs from its English original (hydration mismatch, React error #418), redraws the
// page in English and the translation is lost, including in any saved copy. So on the proxy only: keep the Turbopack
// runtime from starting (it exits when globalThis.TURBOPACK is not an array), mark the page as translated
// (html[data-translated] shows the "Download this page in your language" button), and handle [data-print-page]
// buttons with a plain click listener, and set the page direction to match the translated language (RTL for Urdu etc.). It must run before Next's async chunk scripts, which is why it is injected here
// rather than rendered from app/layout.tsx. pedaver.com itself is unaffected (the function returns at once).
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const GUARD =
  '<script>(function(){if(!/\\.translate\\.goog$/.test(location.hostname))return;' +
  'try{Object.defineProperty(globalThis,"TURBOPACK",{value:{push:function(){}},writable:false,configurable:false})}catch(e){}' +
  'var h=document.documentElement;h.setAttribute("data-translated","1");' +
  // Text direction follows the chosen language: right-to-left for Urdu, Arabic, Persian, Pashto, Sindhi, etc.
  'var R={ar:1,ur:1,fa:1,ps:1,sd:1,he:1,iw:1,yi:1,ug:1,dv:1,ckb:1};' +
  'function d(l){l=(l||"").split("-")[0].toLowerCase();if(l)h.dir=R[l]?"rtl":"ltr"}' +
  'd(new URLSearchParams(location.search).get("_x_tr_tl"));' +
  'new MutationObserver(function(){d(h.lang)}).observe(h,{attributes:true,attributeFilter:["lang"]});' +
  // Google translates lazily, only the parts of the page that have been on screen. Before saving, scroll through the
  // whole page, wait until Google has stopped adding translated text (<font> wrappers stable for 1.5 s, at most ~18 s),
  // return to where the reader was, then open print / Save as PDF.
  'document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&e.target.closest("[data-print-page]");' +
  'if(!b)return;e.preventDefault();if(b.getAttribute("data-busy"))return;b.setAttribute("data-busy","1");b.style.opacity="0.5";' +
  'var y0=window.scrollY,y=0;' +
  'function step(){window.scrollTo(0,y);y+=window.innerHeight*0.8;if(y<document.documentElement.scrollHeight)setTimeout(step,250);else settle(0,-1,0)}' +
  'function settle(k,last,same){var c=document.getElementsByTagName("font").length;same=c===last?same+1:0;' +
  'if(same>=5||k>=60){window.scrollTo(0,y0);b.removeAttribute("data-busy");b.style.opacity="";setTimeout(function(){window.print()},300)}' +
  'else setTimeout(function(){settle(k+1,c,same)},300)}' +
  'step()})})();</script>';
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
