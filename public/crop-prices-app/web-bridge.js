// Web bridge for the Crop Prices page on pedaver.com.
// The app (app.js) is shared with the AMIS Prices Android/iPhone apps and talks to a `window.Android`
// object. Here that object fetches from the site's data proxy (/api/crop-prices) instead of native code.
(function () {
  "use strict";
  var meta = document.querySelector('meta[name="crop-prices-api"]');
  var API = (meta && meta.content) || "/api/crop-prices";
  var MAX = 5, active = 0, queue = [];

  function pump() { while (active < MAX && queue.length) queue.shift()(); }
  function get(query) {
    return new Promise(function (resolve) {
      queue.push(function () {
        active++;
        fetch(API + "?" + query, { headers: { Accept: "application/json" } })
          .then(function (r) { return r.json(); })
          .then(resolve, function (e) {
            resolve({ ok: false, code: navigator.onLine === false ? "offline" : "server", error: String(e) });
          })
          .then(function () { active--; pump(); });
      });
      pump();
    });
  }
  function deliver(id, p) { p.then(function (json) { if (window.__amisCb) window.__amisCb(id, json); }); }
  function pad(n) { n = +n; return (n < 10 ? "0" : "") + n; }
  function mdyToIso(m) { var p = m.split("/"); return p[2] + "-" + pad(p[0]) + "-" + pad(p[1]); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------------------------------------------------------------- CSV: direct download (BOM so Excel shows Urdu)
  function download(name, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }

  // ---------------------------------------------------------------- PDF: printable report -> "Save as PDF"
  // The browser's own print engine shapes Urdu correctly, which PDF libraries in JS do not.
  function printReport(s) {
    var dir = s.rtl ? "rtl" : "ltr";
    var stats = (s.stats || []).map(function (x) { return '<div class="st"><div class="k">' + esc(x[0]) + '</div><div class="v">' + esc(x[1]) + "</div></div>"; }).join("");
    var tables = (s.tables || []).slice();
    if (s.headers && s.headers.length) tables.unshift({ title: s.tableTitle || "", headers: s.headers, rows: s.rows || [] });
    var tbl = tables.map(function (tb) {
      return (tb.title ? "<h2>" + esc(tb.title) + "</h2>" : "") + "<table><thead><tr>" + tb.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
        "</tr></thead><tbody>" + tb.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
    }).join("");
    var html = '<!DOCTYPE html><html lang="' + (s.rtl ? "ur" : "en") + '" dir="' + dir + '"><head><meta charset="utf-8"><title>' + esc((s.fileName || "report").replace(/\.pdf$/, "")) + "</title><style>" +
      '@font-face{font-family:UrduNastaliq;src:url("fonts/nastaliq-400.woff2") format("woff2");font-weight:400}' +
      '@font-face{font-family:UrduNastaliq;src:url("fonts/nastaliq-700.woff2") format("woff2");font-weight:700}' +
      "@page{size:A4;margin:14mm}body{font:11px/1.45 system-ui,Roboto,Arial,sans-serif;color:#17221C;margin:0}" +
      "html[lang=ur] body{font-family:UrduNastaliq,'Noto Nastaliq Urdu',system-ui,sans-serif;line-height:1.9}" +
      ".band{height:5px;background:#1F6F43;margin-bottom:10px}h1{color:#1F6F43;font-size:19px;margin:0 0 4px}.sub{color:#555;margin-bottom:10px}" +
      ".stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.st{background:#F1F6F2;border-radius:6px;padding:6px 8px}.st .k{color:#666;font-size:9.5px}.st .v{font-weight:700;font-size:12px}" +
      "img{width:100%;margin:6px 0}.note{color:#8A5A00;font-size:10px;margin:6px 0}h2{color:#1F6F43;font-size:13px;margin:12px 0 4px}" +
      "table{width:100%;border-collapse:collapse}th{background:#1F6F43;color:#fff;text-align:start;padding:4px 6px;font-size:10px}td{padding:4px 6px;border-bottom:1px solid #E5ECE7}tr:nth-child(even) td{background:#F4F7F5}" +
      ".foot{margin-top:14px;color:#777;font-size:9px;text-align:center}thead{display:table-header-group}tr{page-break-inside:avoid}" +
      "</style></head><body><div class=band></div><h1>" + esc(s.title) + '</h1><div class="sub">' + esc(s.subtitle) + "</div>" +
      (stats ? '<div class="stats">' + stats + "</div>" : "") + (s.chartPng ? '<img src="' + s.chartPng + '">' : "") +
      (s.note ? '<div class="note">' + esc(s.note) + "</div>" : "") + tbl + '<div class="foot">' + esc(s.footer) + "</div></body></html>";

    var f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
    document.body.appendChild(f);
    var d = f.contentDocument;
    d.open(); d.write(html); d.close();
    var go = function () {
      try { f.contentWindow.focus(); f.contentWindow.print(); }
      catch (e) { var w = window.open("", "_blank"); if (w) { w.document.write(html); w.document.close(); w.print(); } }
      setTimeout(function () { f.remove(); }, 60000);
    };
    (d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve()).then(function () { setTimeout(go, 300); });
  }

  window.Android = {
    isOnline: function () { return navigator.onLine !== false; },
    fetchSeries: function (id, crop, city, start, end) {
      deliver(id, get("op=series&crop=" + crop + "&city=" + city + "&start=" + encodeURIComponent(start) + "&end=" + encodeURIComponent(end)));
    },
    fetchRetail: function (id, mdy, iso) { deliver(id, get("op=retail&date=" + iso)); },
    fetchToday: function (id, market, mdy) { deliver(id, get("op=today&market=" + market + (mdy ? "&date=" + mdyToIso(mdy) : ""))); },
    cancelPending: function () { queue.length = 0; },
    exportCsv: function (name, content) { download(name, new Blob(["﻿" + content], { type: "text/csv;charset=utf-8" })); },
    exportPdf: function (spec) { printReport(JSON.parse(spec)); },
    openUrl: function (url) { window.open(url, "_blank", "noopener"); }
  };
  window.__isWeb = true;

  // Inside pedaver.com the app runs in a frame. Bottom sheets (market / item pickers) are pinned to the
  // bottom of the frame, so before one opens, scroll the whole frame into view (it is shorter than the screen).
  function frameIntoView() {
    try {
      var fe = window.frameElement;
      if (!fe) return;
      var r = fe.getBoundingClientRect(), vh = window.parent.innerHeight;
      if (r.top < 0 || r.bottom > vh) fe.scrollIntoView({ block: r.height <= vh ? "end" : "start", behavior: "auto" });
    } catch (e) { /* cross-origin parent: nothing to do */ }
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".picker, #todayBtn, #showBtn, #topBtn, .tab")) frameIntoView();
  }, true);
})();
