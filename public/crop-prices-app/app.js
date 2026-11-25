(function () {
  "use strict";

  // ---------------------------------------------------------------- bridge
  // In the APK, window.Android is the Java bridge. In a desktop browser (for UI testing)
  // a mock produces synthetic data so the screens can be previewed.
  var native = window.Android || makeMockBridge();
  var pending = {};
  var reqSeq = 0;
  window.__amisCb = function (id, res) {
    var p = pending[id];
    if (!p) return;
    delete pending[id];
    p(res);
  };
  function fetchSeries(cropId, cityId, start, end) {
    return new Promise(function (resolve) {
      var id = "r" + (++reqSeq);
      pending[id] = resolve;
      native.fetchSeries(id, cropId, cityId, mdy(start), mdy(end));
    });
  }

  // ---------------------------------------------------------------- state
  var LS = safeStorage();
  var S = {
    lang: LS.get("lang") || "en",
    crop: +LS.get("crop") || 25,
    city: +LS.get("city") || 1,
    period: LS.get("period") || "30d",
    from: LS.get("from") || "",
    to: LS.get("to") || "",
    topCity: +LS.get("topCity") || 1,
    topYear: new Date().getFullYear(),
    topCat: LS.get("topCat") || "V",
    topMetric: LS.get("topMetric") || "avg",
    showRaw: false,
    qty: [1, 5, 10, 40, 100].indexOf(+LS.get("qty")) >= 0 ? +LS.get("qty") : 1,
    tab: "today",
    todayCity: +LS.get("todayCity") || 0,
    todayDate: "",                       // "" = today (default on every visit); else yyyy-mm-dd
    todayItem: +LS.get("todayItem") || 0,
    todayCat: LS.get("todayCat") || "all"
  };
  var cropById = {}, cityById = {};
  CROPS.forEach(function (c) { cropById[c[0]] = c; });
  CITIES.forEach(function (c) { cityById[c[0]] = c; });
  if (!cropById[S.crop]) S.crop = 25;
  if (!cityById[S.city]) S.city = 1;
  if (!cityById[S.topCity]) S.topCity = S.city;
  if (!cityById[S.todayCity]) S.todayCity = S.city;
  if (S.todayItem && !cropById[S.todayItem]) S.todayItem = 0;

  var chart = null, current = null, rowsExpanded = false, topData = null;

  // ---------------------------------------------------------------- helpers
  function $(id) { return document.getElementById(id); }
  function t(k, vars) {
    var s = (I18N[S.lang][k] != null ? I18N[S.lang][k] : I18N.en[k]) || k;
    if (vars) Object.keys(vars).forEach(function (v) { s = s.split("{" + v + "}").join(vars[v]); });
    return s;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseYmd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function mdy(d) { return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function addMonths(d, n) { var x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
  function fmtNum(v) { return v == null || isNaN(v) ? "–" : Math.round(v).toLocaleString("en-US"); }
  function fmtDate(s) {
    var d = typeof s === "string" ? parseYmd(s) : s;
    return pad(d.getDate()) + " " + t("months")[d.getMonth()] + " " + d.getFullYear();
  }
  function cropName(id) { var c = cropById[id]; return c ? (S.lang === "ur" ? c[2] : c[1]) : "?"; }
  function cityName(id) { var c = cityById[id]; return c ? (S.lang === "ur" ? c[2] : c[1]) : "?"; }
  function unitKey(u) {
    var x = (u || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (x.indexOf("100kg") >= 0) return "100kg";
    if (x.indexOf("dozen") >= 0) return "dozen";
    if (x.indexOf("100pc") >= 0) return "100pcs";
    if (x.indexOf("kg") >= 0) return "kg";
    return "";
  }
  function unitLabel(u) { var k = unitKey(u); return k ? t("unitMap")[k] : (u || ""); }
  function pct(a, b) { return b ? ((a - b) / b) * 100 : null; }
  function fmtPct(p) {
    if (p == null || !isFinite(p)) return "–";
    return (p > 0 ? "▲ " : p < 0 ? "▼ " : "") + Math.abs(p).toFixed(1) + "%";
  }
  function status(el, kind, html, spin) {
    $(el).innerHTML = kind ? '<div class="status ' + kind + '">' + (spin ? '<i class="spinner"></i>' : "") + "<div>" + html + "</div></div>" : "";
  }
  function safeStorage() {
    var ok = false;
    try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); ok = true; } catch (e) {}
    var mem = {};
    return {
      get: function (k) { try { return ok ? localStorage.getItem(k) : mem[k]; } catch (e) { return mem[k]; } },
      set: function (k, v) { try { if (ok) localStorage.setItem(k, v); else mem[k] = v; } catch (e) { mem[k] = v; } },
      del: function (k) { try { if (ok) localStorage.removeItem(k); delete mem[k]; } catch (e) {} },
      keys: function () { try { return ok ? Object.keys(localStorage) : Object.keys(mem); } catch (e) { return []; } }
    };
  }
  function save() {
    ["lang", "crop", "city", "period", "from", "to", "topCity", "topCat", "topMetric", "qty", "todayCity", "todayItem", "todayCat"].forEach(function (k) { LS.set(k, S[k]); });
  }

  // ---------------------------------------------------------------- series cache
  // Per crop+city+start; valid for the day it was fetched. Keeps the newest 25 entries.
  var memCache = {};
  function cacheGet(key) {
    if (memCache[key]) return memCache[key];
    var raw = LS.get("s|" + key);
    if (!raw) return null;
    try {
      var o = JSON.parse(raw);
      if (o.day !== ymd(today()) && !o.final) return null;
      memCache[key] = o.data;
      return o.data;
    } catch (e) { return null; }
  }
  function cachePut(key, data, final) {
    memCache[key] = data;
    try {
      LS.set("s|" + key, JSON.stringify({ day: ymd(today()), final: !!final, data: data }));
      var ks = LS.keys().filter(function (k) { return k.indexOf("s|") === 0; });
      if (ks.length > 25) {
        ks.map(function (k) { try { return [k, JSON.parse(LS.get(k)).day]; } catch (e) { return [k, ""]; } })
          .sort(function (a, b) { return a[1] < b[1] ? -1 : 1; })
          .slice(0, ks.length - 25).forEach(function (k) { LS.del(k[0]); });
      }
    } catch (e) { /* storage full: memory cache only */ }
  }

  // ---------------------------------------------------------------- i18n apply
  function applyLang() {
    document.documentElement.lang = S.lang;
    document.documentElement.dir = S.lang === "ur" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    var lb = $("langBtn");
    lb.textContent = t("langBtn");
    lb.setAttribute("data-to", S.lang === "en" ? "ur" : "en");
    $("pickerSearch").placeholder = t("search");
    renderPickers();
    renderPeriodChips();
    renderTopChips();
    if (current) renderTrend();
    if (topData) renderTop();
    renderTodayChips();
    if (todayData) renderToday();
  }

  function renderPickers() {
    var c = cropById[S.crop];
    $("cropBtn").querySelector(".pv").innerHTML = esc(cropName(S.crop)) + ' <small>' + esc(S.lang === "ur" ? c[1] : c[2]) + "</small>";
    $("cityBtn").querySelector(".pv").textContent = cityName(S.city);
    $("todayCityBtn").querySelector(".pv").textContent = cityName(S.todayCity);
    $("todayItemBtn").querySelector(".pv").textContent = S.todayItem ? cropName(S.todayItem) : t("allItems");
    $("topCityBtn").querySelector(".pv").textContent = cityName(S.topCity);
  }

  // ---------------------------------------------------------------- chips
  var PERIODS = ["today", "7d", "30d", "6m", "1y", "5y", "custom"];
  function chipRow(el, items, active, onPick) {
    $(el).innerHTML = items.map(function (it) {
      return '<button class="chip' + (it[0] == active ? " on" : "") + '" data-v="' + it[0] + '">' + esc(it[1]) + "</button>";
    }).join("");
    $(el).onclick = function (e) {
      var b = e.target.closest(".chip");
      if (b) onPick(b.getAttribute("data-v"));
    };
  }
  function renderPeriodChips() {
    chipRow("periodChips", PERIODS.map(function (p) { return [p, t("p_" + p)]; }), S.period, function (v) {
      S.period = v; save(); renderPeriodChips();
      if (current && v !== "custom") renderTrend();
    });
    $("customRange").classList.toggle("hidden", S.period !== "custom");
    if (S.period === "custom") {
      if (!S.from) S.from = ymd(addMonths(today(), -3));
      if (!S.to) S.to = ymd(today());
      $("fromDate").value = S.from; $("toDate").value = S.to;
      $("fromDate").max = $("toDate").max = ymd(today());
    }
  }
  function renderTopChips() {
    var y = new Date().getFullYear(), years = [];
    for (var i = 0; i < 5; i++) years.push([y - i, String(y - i)]);
    chipRow("yearChips", years, S.topYear, function (v) { S.topYear = +v; renderTopChips(); });
    chipRow("catChips", [["all", t("all")], ["V", t("cat_V")], ["F", t("cat_F")], ["C", t("cat_C")]], S.topCat, function (v) {
      S.topCat = v; save(); renderTopChips(); if (topData) renderTop();
    });
    chipRow("metricChips", [["avg", t("m_avg")], ["max", t("m_max")]], S.topMetric, function (v) {
      S.topMetric = v; save(); renderTopChips(); if (topData) renderTop();
    });
  }

  // ---------------------------------------------------------------- picker sheet
  var picker = null;
  function openPicker(kind, onPick) {
    var isCrop = kind === "crop" || kind === "todayItem";
    picker = { kind: kind, onPick: onPick, filter: "all" };
    $("pickerTitle").textContent = t(kind === "todayItem" ? "selectItem" : isCrop ? "selectCrop" : "selectCity");
    $("pickerSearch").value = "";
    $("pickerFilter").classList.toggle("hidden", !isCrop);
    if (isCrop) {
      chipRow("pickerFilter", [["all", t("all")], ["V", t("cat_V")], ["F", t("cat_F")], ["C", t("cat_C")]], "all", function (v) {
        picker.filter = v;
        $("pickerFilter").querySelectorAll(".chip").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-v") === v); });
        fillPicker();
      });
    }
    $("pickerOv").classList.remove("hidden");
    fillPicker();
  }
  function fillPicker() {
    var isCrop = picker.kind === "crop" || picker.kind === "todayItem";
    var q = $("pickerSearch").value.trim().toLowerCase();
    var src = isCrop ? CROPS : CITIES;
    var sel = { crop: S.crop, todayItem: S.todayItem, city: S.city, topCity: S.topCity, todayCity: S.todayCity }[picker.kind];
    var items = src.filter(function (c) {
      if (isCrop && picker.filter !== "all" && c[3] !== picker.filter) return false;
      return !q || c[1].toLowerCase().indexOf(q) >= 0 || c[2].indexOf(q) >= 0;
    });
    if (isCrop) items = items.slice().sort(function (a, b) { var i = S.lang === "ur" ? 2 : 1; return a[i].localeCompare(b[i], S.lang); });
    $("pickerList").innerHTML = items.length ? items.map(function (c) {
      var main = S.lang === "ur" ? c[2] : c[1], alt = S.lang === "ur" ? c[1] : c[2];
      var tag = isCrop ? '<span class="tag">' + esc(t("cat_" + c[3])) + "</span>" : "";
      return '<li data-id="' + c[0] + '"' + (c[0] === sel ? ' class="sel"' : "") + "><span>" + esc(main) + tag + '</span><span class="alt">' + esc(alt) + "</span></li>";
    }).join("") : '<li class="empty">' + t("noMatch") + "</li>";
    if (picker.kind === "todayItem" && !q)
      $("pickerList").innerHTML = '<li data-id="0"' + (!S.todayItem ? ' class="sel"' : "") + "><span><b>" + esc(t("allItems")) + "</b></span><span></span></li>" + $("pickerList").innerHTML;
  }
  function closePicker() { $("pickerOv").classList.add("hidden"); picker = null; }

  // ---------------------------------------------------------------- price trend
  function periodRange() {
    var end = today(), start;
    switch (S.period) {
      case "today": start = end; break;
      case "7d": start = addDays(end, -6); break;
      case "30d": start = addDays(end, -29); break;
      case "6m": start = addMonths(end, -6); break;
      case "1y": start = addMonths(end, -12); break;
      case "5y": start = addMonths(end, -60); break;
      default:
        start = S.from ? parseYmd(S.from) : addMonths(end, -3);
        end = S.to ? parseYmd(S.to) : end;
    }
    return [start, end];
  }

  function loadTrend() {
    var r = periodRange();
    if (r[0] > r[1]) { status("trendStatus", "err", t("badRange")); return; }
    var fetchStart = addMonths(today(), -60);
    fetchStart.setDate(1);
    if (r[0] < fetchStart) fetchStart = r[0];
    var key = S.crop + "|" + S.city + "|" + ymd(fetchStart);
    var cached = cacheGet(key);
    if (cached) { setCurrent(S.crop, S.city, cached); finishTrend(); return; }
    if (native.isOnline && !native.isOnline()) { status("trendStatus", "err", t("offline")); return; }

    $("showBtn").disabled = true;
    status("trendStatus", "info", t("loading"), true);
    var crop = S.crop, city = S.city;
    fetchSeries(crop, city, fetchStart, today()).then(function (res) {
      $("showBtn").disabled = false;
      if (!res || !res.ok) {
        status("trendStatus", "err", t(res && res.code === "offline" ? "offline" : "serverErr"));
        return;
      }
      cachePut(key, res);
      setCurrent(crop, city, res);
      finishTrend();
    });
  }

  // Keeps the series exactly as AMIS published it, plus a cleaned copy (single-day errors repaired).
  function setCurrent(crop, city, res) {
    var c = cleanSeries(res.points);
    var fixedMap = {};
    c.fixes.forEach(function (f) { fixedMap[f.date] = f; });
    current = { crop: crop, city: city, raw: res, clean: { unit: res.unit, points: c.points }, fixes: c.fixes, fixedMap: fixedMap, suspectLast: c.suspectLast };
    current.data = S.showRaw ? current.raw : current.clean;
  }

  function finishTrend() {
    if (!current.data.points.length) {
      status("trendStatus", "warn", t("noData"));
      $("trendResult").classList.add("hidden");
      return;
    }
    status("trendStatus", "");
    $("trendResult").classList.remove("hidden");
    rowsExpanded = false;
    renderTrend();
    setTimeout(function () { $("trendResult").scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
  }

  function inPeriod() {
    var r = periodRange(), a = ymd(r[0]), b = ymd(r[1]);
    return current.data.points.filter(function (p) { return p[0] >= a && p[0] <= b; });
  }

  // ================================================================ quantities
  // Wholesale is published per 100 kg (or per dozen / per 100 pieces); official retail per kg.
  var QTYS = [1, 5, 10, 40, 100];
  function isKg() { return unitKey(current.data.unit) === "100kg"; }
  function isPcs() { return unitKey(current.data.unit) === "100pcs"; }
  // wholesale value (as published) -> value for the selected quantity
  function wq(v, q) { q = q || S.qty; return isKg() ? v / 100 * q : v; }
  // retail value (per kg, as notified) -> value for the selected quantity
  function rq(v, q) { q = q || S.qty; return isKg() ? v * q : v; }
  function money(v) {
    if (v == null || isNaN(v)) return "–";
    if (v < 100 && Math.abs(v - Math.round(v)) > 0.05) return (Math.round(v * 10) / 10).toLocaleString("en-US");
    return Math.round(v).toLocaleString("en-US");
  }
  function qtyName(q) { return t("q_" + q); }
  function perLabel() { return isKg() ? t("perQty", { q: qtyName(S.qty) }) : unitLabel(current.data.unit); }
  function rangeStr(a) { return a ? (a[0] === a[1] ? money(a[0]) : money(a[0]) + "–" + money(a[1])) : "–"; }

  // ================================================================ official retail
  var RETAIL_START = "2023-06-01";       // nothing on amis.pk before mid-2023
  var retailDays = {};                    // iso -> day object from amis.pk (all items, all districts)
  var retailPending = {};
  var retailRun = 0;
  function fetchRetailDay(iso) {
    if (retailDays[iso]) return Promise.resolve(retailDays[iso]);
    if (retailPending[iso]) return retailPending[iso];
    var p = new Promise(function (resolve) {
      var id = "r" + (++reqSeq);
      pending[id] = function (res) { delete retailPending[iso]; if (res && res.ok) retailDays[iso] = res; resolve(res); };
      native.fetchRetail(id, mdy(parseYmd(iso)), iso);
    });
    retailPending[iso] = p;
    return p;
  }
  function districtOf(city) { return CITY_DISTRICT[city] || null; }
  function districtName(k) { var d = DISTRICTS[k]; return d ? (S.lang === "ur" ? d[1] : d[0]) : ""; }
  function retailOn(iso) {
    var day = retailDays[iso], dk = districtOf(current.city);
    if (!day || !dk) return null;
    var it = day.items[RETAIL_KEY[current.crop]];
    return it && it[dk] ? it[dk] : null;
  }
  // [[iso, min, max], ...] sorted, for the current crop + district (only fetched days)
  function retailSeries() {
    var out = [];
    Object.keys(retailDays).sort().forEach(function (iso) { var v = retailOn(iso); if (v) out.push([iso, v[0], v[1]]); });
    return out;
  }
  function latestRetail() { var s = retailSeries(); return s.length ? s[s.length - 1] : null; }
  // nearest retail sample on or before a date (within 20 days) - for the chart readout / table
  function retailNear(iso, exactOnly) {
    var v = retailOn(iso);
    if (v || exactOnly) return v ? [iso, v[0], v[1]] : null;
    var s = retailSeries(), best = null;
    for (var i = 0; i < s.length; i++) if (s[i][0] <= iso) best = s[i];
    if (best && (parseYmd(iso) - parseYmd(best[0])) / DAY <= 20) return best;
    return null;
  }

  // Which dates to ask amis.pk for: daily for short periods, ~30 evenly spaced dates for long ones,
  // plus the last 3 days so the latest notified rate is always known.
  function retailPlan() {
    var r = periodRange(), end = r[1] > today() ? today() : r[1];
    var start = r[0] < parseYmd(RETAIL_START) ? parseYmd(RETAIL_START) : r[0];
    var dates = [ymd(today()), ymd(addDays(today(), -1)), ymd(addDays(today(), -2))];
    if (start <= end && S.period !== "today") {
      var days = Math.round((end - start) / DAY) + 1, step = Math.max(1, Math.ceil(days / 30));
      for (var d = new Date(end); d >= start; d = addDays(d, -step)) dates.push(ymd(d));
    }
    return dates.filter(function (x, i) { return dates.indexOf(x) === i; });
  }

  function loadRetail() {
    if (!current || !districtOf(current.city)) { renderRetailViews(); return; }
    var run = ++retailRun, plan = retailPlan();
    var todo = plan.filter(function (iso) { return !retailDays[iso]; });
    if (!todo.length) { renderRetailViews(); return; }
    var done = 0;
    function prog() {
      $("retailStatus").innerHTML = done < todo.length
        ? '<i class="spinner sm"></i> ' + t("retailLoading", { i: done, n: todo.length }) : "";
    }
    prog();
    var timer = null;
    todo.forEach(function (iso) {
      fetchRetailDay(iso).then(function () {
        if (run !== retailRun) return;
        done++; prog();
        if (!timer) timer = setTimeout(function () { timer = null; if (run === retailRun) renderRetailViews(); }, 350);
        if (done === todo.length) setTimeout(renderRetailViews, 0);
      });
    });
  }

  // Re-draws everything that shows retail without resetting the chart zoom.
  function renderRetailViews() {
    if (!current) return;
    renderPriceBox();
    renderRows(inPeriod());
    if (chart) {
      var rs = chartRetail();
      chart.data.datasets[2].data = rs.max;
      chart.data.datasets[3].data = rs.min;
      chart.update("none");
      $("legendRetail").classList.toggle("hidden", !rs.max.length);
    }
  }

  // ================================================================ trend rendering
  function renderTrend() {
    var d = current.data, sel = inPeriod(), r = periodRange();
    $("resTitle").textContent = cropName(current.crop) + " — " + cityName(current.city);
    $("resSub").textContent = t("p_" + S.period) + " · " + fmtDate(r[0]) + (S.period === "today" ? "" : " – " + fmtDate(r[1]));

    // quantity chips (kg items only)
    $("qtyRow").classList.toggle("hidden", !isKg());
    chipRow("qtyChips", QTYS.map(function (q) { return [q, qtyName(q)]; }), S.qty, function (v) {
      S.qty = +v; save(); renderTrend();
    });

    // data-correction note
    var a0 = ymd(r[0]), b0 = ymd(r[1]);
    var nFix = current.fixes.filter(function (f) { return f.date >= a0 && f.date <= b0; }).length;
    var nAll = current.fixes.length;
    $("fixNote").innerHTML = nAll ? '<span class="fixdot"></span><span>' + t(S.showRaw ? "rawShown" : (nFix ? "fixedNote" : "fixedNone"), { n: nFix, all: nAll }) +
      '</span><label class="check sm"><input type="checkbox" id="rawToggle"' + (S.showRaw ? " checked" : "") + "> " + t("showRaw") + "</label>" : "";
    $("fixNote").classList.toggle("hidden", !nAll);
    var rt = $("rawToggle");
    if (rt) rt.onchange = function () { S.showRaw = rt.checked; current.data = S.showRaw ? current.raw : current.clean; renderTrend(); };

    // wholesale stats for the selected period (selected quantity)
    if (sel.length && S.period !== "today") {
      var vals = sel.map(function (p) { return wq(p[1]); });
      var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
      var avg = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
      var ch = pct(vals[vals.length - 1], vals[0]);
      $("statsTitle").textContent = t("wsStats", { per: perLabel() });
      $("statsTitle").classList.remove("hidden");
      $("stats").innerHTML = [
        [t("avg"), money(avg)], [t("min"), money(mn)], [t("max"), money(mx)],
        [t("change"), '<span class="' + (ch > 0 ? "up" : ch < 0 ? "down" : "") + '">' + fmtPct(ch) + "</span>"],
        [t("latest"), money(vals[vals.length - 1])], [t("days"), String(vals.length)]
      ].map(function (s) { return '<div class="stat"><div class="k">' + s[0] + '</div><div class="v num">' + s[1] + "</div></div>"; }).join("");
    } else {
      $("statsTitle").classList.add("hidden");
      $("stats").innerHTML = sel.length || S.period === "today" ? "" : '<div class="status warn" style="grid-column:1/-1">' + t("noDataShort") + "</div>";
    }

    $("thW").textContent = t("wholesaleCol") + " (" + perLabel() + ")";
    $("thR").textContent = t("retailCol") + (isPcs() ? "" : " (" + perLabel() + ")");
    renderPriceBox();
    renderRows(sel);
    drawChart();
    loadRetail();
  }

  // Wholesale vs official retail, latest values, plus the 1/5/10/40/100 kg table.
  function renderPriceBox() {
    var pts = current.data.points, last = pts[pts.length - 1], prev = pts[pts.length - 2];
    var isToday = last[0] === ymd(today());
    var dk = districtOf(current.city), lr = latestRetail();
    var unitW = unitLabel(current.data.unit);

    var wCard = '<div class="pcard w"><div class="lbl">' + t("wholesale") + '</div>' +
      '<div class="big num">Rs ' + money(wq(last[1])) + '</div><div class="per">' + esc(perLabel()) + "</div>" +
      '<div class="sm">' + fmtDate(last[0]) + (prev ? ' · <span class="' + (last[1] > prev[1] ? "up" : last[1] < prev[1] ? "down" : "") + '">' + fmtPct(pct(last[1], prev[1])) + "</span>" : "") + "</div>" +
      (isKg() && S.qty !== 100 ? '<div class="sm">' + t("asPublished", { v: "Rs " + fmtNum(last[1]), u: unitW }) + "</div>" : "") + "</div>";

    var rBody;
    if (!dk) rBody = '<div class="sm">' + t("noRetailDistrict") + "</div>";
    else if (!lr) rBody = '<div class="sm">' + (retailRun && Object.keys(retailPending).length ? t("retailWait") : t("noRetailItem", { d: districtName(dk) })) + "</div>";
    else rBody = '<div class="big num">Rs ' + rangeStr([rq(lr[1]), rq(lr[2])]) + '</div><div class="per">' + esc(isPcs() ? t("asNotified") : perLabel()) + "</div>" +
      '<div class="sm">' + fmtDate(lr[0]) + " · " + esc(districtName(dk)) + "</div>";
    var rCard = '<div class="pcard r"><div class="lbl">' + t("retail") + "</div>" + rBody + "</div>";

    var warn = (!isToday && S.period === "today" ? '<div class="sm note1">' + t("noToday") + "</div>" : "") +
      (current.suspectLast ? '<div class="sm warnline">⚠ ' + t("suspectLast") + "</div>" : "");

    // quantity table
    var qt = "";
    if (isKg()) {
      qt = '<table class="qty"><thead><tr><th>' + t("qty") + "</th><th>" + t("wholesale") + "</th><th>" + t("retail") + "</th></tr></thead><tbody>" +
        QTYS.map(function (q) {
          return '<tr' + (q === S.qty ? ' class="on"' : "") + "><td>" + qtyName(q) + '</td><td class="num">Rs ' + money(wq(last[1], q)) +
            '</td><td class="num">' + (lr ? "Rs " + rangeStr([rq(lr[1], q), rq(lr[2], q)]) : "–") + "</td></tr>";
        }).join("") + "</tbody></table>";
      if (lr) {
        var mid = (lr[1] + lr[2]) / 2, wkg = last[1] / 100, mk = pct(mid, wkg);
        if (mk != null) qt += '<div class="sm markup">' + t(mk >= 0 ? "markupUp" : "markupDown", { p: Math.abs(mk).toFixed(0) + "%" }) + "</div>";
      }
    } else if (lr && isPcs()) {
      qt = '<div class="sm note1">' + t("pcsNote") + "</div>";
    }
    var foot = dk ? '<div class="sm muted rnote">' + t("retailNote", { d: districtName(dk) }) + "</div>" : "";
    $("todayBox").innerHTML = '<div class="pgrid">' + wCard + rCard + "</div>" + warn + qt + foot;
  }

  function renderRows(sel) {
    var rows = sel.slice().reverse();
    if (S.period === "today" && !rows.length) rows = current.data.points.slice(-1);
    $("rowCount").textContent = t("rows", { n: rows.length });
    var shown = rowsExpanded ? rows : rows.slice(0, 30);
    var all = current.data.points, idx = {};
    all.forEach(function (p, i) { idx[p[0]] = i; });
    $("rows").innerHTML = shown.map(function (p) {
      var i = idx[p[0]], pv = i > 0 ? all[i - 1][1] : null, c = pct(p[1], pv);
      var fx = current.fixedMap[p[0]];
      var priceCell = money(wq(p[1])) + (fx ? (S.showRaw ? ' <span class="fixtag">⚠</span>' : ' <span class="fixtag">✎</span><div class="orig">' + t("amisShowed") + " " + fmtNum(fx.original) + " " + esc(unitLabel(current.data.unit)) + "</div>") : "");
      var rv = retailOn(p[0]);
      return "<tr" + (fx ? ' class="fixed"' : "") + "><td>" + fmtDate(p[0]) + '</td><td class="num">' + priceCell +
        '</td><td class="num rcell">' + (rv ? rangeStr([rq(rv[0]), rq(rv[1])]) : "–") +
        '</td><td class="num ' + (c > 0 ? "up" : c < 0 ? "down" : "") + '">' + fmtPct(c) + "</td></tr>";
    }).join("");
    $("moreRows").classList.toggle("hidden", rowsExpanded || rows.length <= 30);
  }

  // ---------------------------------------------------------------- chart
  var whiteBg = {
    id: "whiteBg",
    beforeDraw: function (c) { var x = c.ctx; x.save(); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.restore(); }
  };
  var DAY = 86400000;
  function tickLabel(v, span) {
    var d = new Date(v), m = I18N.en.months[d.getMonth()];
    if (span > 60 * DAY) return m + " " + String(d.getFullYear()).slice(2);
    return d.getDate() + " " + m;
  }
  // Retail is only drawn when its unit matches wholesale (per kg or per dozen), not for "100 pcs" items.
  function chartRetail() {
    if (isPcs()) return { max: [], min: [] };
    var s = retailSeries();
    return {
      max: s.map(function (r) { return { x: parseYmd(r[0]).getTime(), y: rq(r[2]) }; }),
      min: s.map(function (r) { return { x: parseYmd(r[0]).getTime(), y: rq(r[1]) }; })
    };
  }

  function drawChart() {
    var pts = current.data.points;
    var data = pts.map(function (p) { return { x: parseYmd(p[0]).getTime(), y: wq(p[1]) }; });
    var dMin = data[0].x, dMax = data[data.length - 1].x;
    var r = periodRange();
    var vMin = S.period === "today" ? addDays(today(), -30).getTime() : r[0].getTime();
    var vMax = Math.max(r[1].getTime(), vMin + 7 * DAY);
    vMin = Math.max(vMin, dMin - DAY); if (vMax > dMax + 2 * DAY && vMin < dMax) vMax = dMax + DAY;
    if (vMin >= vMax) { vMin = dMin; vMax = dMax; }

    var marks = current.fixes.map(function (f) { return { x: parseYmd(f.date).getTime(), y: wq(S.showRaw ? f.original : f.fixed) }; });
    var rs = chartRetail();

    if (chart) chart.destroy();
    var ctx = $("chart").getContext("2d");
    var grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0, "rgba(31,111,67,.22)"); grad.addColorStop(1, "rgba(31,111,67,0)");
    chart = new Chart(ctx, {
      type: "line",
      data: { datasets: [
        { data: data, borderColor: "#1F6F43", backgroundColor: grad, fill: "origin", borderWidth: 1.8, pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: "#1F6F43", tension: 0.15, order: 2 },
        // corrected days (or, in "original data" mode, the suspicious values) as orange dots
        { data: marks, showLine: false, pointRadius: 4, pointHoverRadius: 5, pointBackgroundColor: "#E8912D", pointBorderColor: "#fff", pointBorderWidth: 1, order: 0 },
        // official retail range: upper line, lower line, band between them
        { data: rs.max, borderColor: "#2F5EA8", borderWidth: 1.6, pointRadius: 2, pointBackgroundColor: "#2F5EA8", pointHoverRadius: 4, fill: false, tension: 0.1, spanGaps: true, order: 1 },
        { data: rs.min, borderColor: "#2F5EA8", borderWidth: 1, borderDash: [3, 3], pointRadius: 0, pointHoverRadius: 0, fill: "-1", backgroundColor: "rgba(47,94,168,.14)", tension: 0.1, spanGaps: true, order: 1 }
      ] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: false, parsing: false, normalized: true,
        interaction: { mode: "nearest", axis: "x", intersect: false },
        scales: {
          x: {
            type: "linear", min: vMin, max: vMax,
            ticks: { maxTicksLimit: 6, maxRotation: 0, callback: function (v) { return tickLabel(v, this.max - this.min); }, font: { size: 10.5 } },
            grid: { display: false }
          },
          y: { ticks: { callback: function (v) { return money(v); }, font: { size: 10.5 } }, grid: { color: "#EEF2EF" }, grace: "5%", afterDataLimits: function (sc) { if (sc.min < 0) sc.min = 0; } }
        },
        plugins: {
          legend: { display: false },
          decimation: { enabled: true, algorithm: "lttb", samples: 400 },
          // No floating box over the graph: the selected day is shown in the strip above the chart.
          tooltip: {
            enabled: false,
            external: function (c) {
              var dp = c.tooltip.dataPoints;
              if (c.tooltip.opacity === 0 || !dp || !dp.length) return;
              setReadout(dp[0].parsed.x, true);
            }
          },
          zoom: {
            limits: { x: { min: dMin - DAY, max: dMax + DAY, minRange: 5 * DAY } },
            pan: { enabled: true, mode: "x", onPanComplete: markRange },
            zoom: { pinch: { enabled: true }, wheel: { enabled: true }, mode: "x", onZoomComplete: markRange }
          }
        }
      },
      plugins: [whiteBg, crosshair]
    });
    chart.$home = { min: vMin, max: vMax };
    $("legendRetail").classList.toggle("hidden", !rs.max.length);
    setReadout(dMax, false);
    renderRangeBtns();
  }

  var crosshair = {
    id: "crosshair",
    afterDatasetsDraw: function (c) {
      var act = c.tooltip && c.tooltip.getActiveElements ? c.tooltip.getActiveElements() : [];
      if (!act.length) return;
      var x = act[0].element.x, a = c.chartArea, g = c.ctx;
      g.save(); g.strokeStyle = "rgba(23,34,28,.35)"; g.lineWidth = 1; g.setLineDash([4, 3]);
      g.beginPath(); g.moveTo(x, a.top); g.lineTo(x, a.bottom); g.stroke(); g.restore();
    }
  };
  // nearest wholesale point to a timestamp
  function nearestW(x) {
    var pts = current.data.points, lo = 0, hi = pts.length - 1;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (parseYmd(pts[mid][0]).getTime() < x) lo = mid; else hi = mid; }
    return Math.abs(parseYmd(pts[lo][0]).getTime() - x) <= Math.abs(parseYmd(pts[hi][0]).getTime() - x) ? pts[lo] : pts[hi];
  }
  function setReadout(x, picked) {
    var w = nearestW(x), day = w[0], fx = current.fixedMap[day];
    var extra = "";
    if (fx) extra = S.showRaw ? '<span class="fixtag">⚠ ' + t("suspect") + "</span>"
                              : '<span class="fixtag">✎ ' + t("amisShowed") + " " + fmtNum(fx.original) + "</span>";
    var rr = retailNear(day, false), rtxt = "";
    if (rr) rtxt = '<span class="rd-r num">' + t("retailShort") + " Rs " + rangeStr([rq(rr[1]), rq(rr[2])]) +
      (rr[0] !== day ? ' <small>(' + fmtDate(rr[0]) + ")</small>" : "") + "</span>";
    $("readout").innerHTML = '<span class="rd-date">' + (picked ? "" : t("latest") + " · ") + fmtDate(day) + "</span>" +
      '<span class="rd-val num">' + t("wholesaleShort") + " Rs " + money(wq(w[1])) + "</span>" + rtxt +
      '<span class="rd-per">' + esc(perLabel()) + "</span>" + extra;
  }

  var RANGES = [["1M", 1], ["3M", 3], ["6M", 6], ["1Y", 12], ["2Y", 24], ["5Y", 60]];
  function renderRangeBtns() {
    $("rangeBtns").innerHTML = RANGES.map(function (r) { return '<button data-m="' + r[1] + '">' + r[0] + "</button>"; }).join("");
    markRange();
  }
  function markRange() {
    if (!chart) return;
    var sx = chart.scales.x, span = sx.max - sx.min;
    $("rangeBtns").querySelectorAll("button").forEach(function (b) {
      var m = +b.getAttribute("data-m");
      b.classList.toggle("on", Math.abs(span - m * 30.44 * DAY) < m * 3 * DAY);
    });
  }
  function zoomMonths(m) {
    var pts = current.data.points, end = parseYmd(pts[pts.length - 1][0]).getTime() + DAY;
    var start = Math.max(parseYmd(pts[0][0]).getTime() - DAY, end - m * 30.44 * DAY);
    chart.zoomScale("x", { min: start, max: end }, "none");
    markRange();
  }

  // ---------------------------------------------------------------- exports
  function stamp() { var d = new Date(); return ymd(d) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function fileSafe(s) { return String(s).replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
  function csvCell(v) { v = String(v == null ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function r2(v) { return Math.round(v * 100) / 100; }

  function exportTrendCsv() {
    var c = cropById[current.crop], city = cityById[current.city], dk = districtOf(current.city);
    var rows = inPeriod();
    if (!rows.length) rows = current.data.points.slice(-1);
    var kg = isKg(), q = S.qty;
    var head = ["Date", "Crop", "Crop (Urdu)", "Market", "Market (Urdu)", "Wholesale (as published)", "Wholesale unit",
      "Wholesale Rs/kg", "Official retail min Rs/kg", "Official retail max Rs/kg", "Retail district"];
    if (kg && q !== 1) head.push("Wholesale Rs/" + q + "kg", "Official retail min Rs/" + q + "kg", "Official retail max Rs/" + q + "kg");
    head.push("AMIS original wholesale", "Corrected");
    var lines = [head.map(csvCell).join(",")];
    rows.forEach(function (p) {
      var fx = current.fixedMap[p[0]], rv = retailOn(p[0]);
      var row = [p[0], c[1], c[2], city[1], city[2], p[1], current.data.unit,
        kg ? r2(p[1] / 100) : "", rv ? rv[0] : "", rv ? rv[1] : "", dk ? DISTRICTS[dk][0] : ""];
      if (kg && q !== 1) row.push(r2(p[1] / 100 * q), rv ? r2(rv[0] * q) : "", rv ? r2(rv[1] * q) : "");
      row.push(fx ? fx.original : p[1], fx && !S.showRaw ? "yes (single-day error)" : (fx ? "suspected error, not corrected" : ""));
      lines.push(row.map(csvCell).join(","));
    });
    var r = periodRange();
    native.exportCsv("AMIS_" + fileSafe(c[1]) + "_" + fileSafe(city[1]) + "_" + ymd(r[0]) + "_to_" + ymd(r[1]) + ".csv", lines.join("\r\n"));
  }

  function exportTrendPdf() {
    var c = cropById[current.crop], city = cityById[current.city], r = periodRange(), dk = districtOf(current.city);
    var rows = inPeriod().slice().reverse();
    if (!rows.length) rows = current.data.points.slice(-1);
    var last = current.data.points[current.data.points.length - 1], lr = latestRetail();
    var statsArr = [[t("wholesale") + " · " + fmtDate(last[0]), "Rs " + money(wq(last[1])) + " " + perLabel()],
      [t("retail") + (lr ? " · " + fmtDate(lr[0]) : ""), lr ? "Rs " + rangeStr([rq(lr[1]), rq(lr[2])]) + " " + (isPcs() ? t("asNotified") : perLabel()) : "–"]];
    document.querySelectorAll("#stats .stat").forEach(function (s) { statsArr.push([s.querySelector(".k").textContent, s.querySelector(".v").textContent]); });
    var tables = [];
    if (isKg()) tables.push({
      title: t("byQty"),
      headers: [t("qty"), t("wholesale"), t("retail")],
      rows: QTYS.map(function (q) { return [qtyName(q), "Rs " + money(wq(last[1], q)), lr ? "Rs " + rangeStr([rq(lr[1], q), rq(lr[2], q)]) : "–"]; })
    });
    var all = current.data.points, idx = {};
    all.forEach(function (p, i) { idx[p[0]] = i; });
    tables.push({
      title: t("table"),
      headers: [t("date"), t("wholesaleCol") + " (" + perLabel() + ")", t("retailCol"), t("dayChange")],
      rows: rows.map(function (p) {
        var i = idx[p[0]], fx = current.fixedMap[p[0]], rv = retailOn(p[0]);
        var v = money(wq(p[1])) + (fx ? (S.showRaw ? " ⚠" : " ✎ (" + t("amisShowed") + " " + fmtNum(fx.original) + ")") : "");
        return [fmtDate(p[0]), v, rv ? rangeStr([rq(rv[0]), rq(rv[1])]) : "–", fmtPct(pct(p[1], i > 0 ? all[i - 1][1] : null))];
      })
    });
    var note = ($("fixNote").classList.contains("hidden") ? "" : $("fixNote").querySelector("span:nth-child(2)").textContent + " ") +
      (current.suspectLast ? t("suspectLast") + " " : "") + (dk ? t("retailNote", { d: districtName(dk) }) : t("noRetailDistrict"));
    native.exportPdf(JSON.stringify({
      fileName: "AMIS_" + fileSafe(c[1]) + "_" + fileSafe(city[1]) + "_" + ymd(r[0]) + "_to_" + ymd(r[1]) + ".pdf",
      rtl: S.lang === "ur",
      title: t("pdfTitle", { crop: cropName(current.crop), city: cityName(current.city) }),
      subtitle: t("pdfSub", { from: fmtDate(r[0]), to: fmtDate(r[1]), unit: perLabel(), now: stamp() }),
      stats: statsArr,
      chartPng: chart ? chart.toBase64Image("image/png", 1) : "",
      note: note, tables: tables, footer: t("footer")
    }));
  }

  // ---------------------------------------------------------------- top 10
  var topRun = 0;
  function yearRange(y) {
    var start = new Date(y, 0, 1), end = new Date(y, 11, 31);
    if (end > today()) end = today();
    return [start, end];
  }
  function topKey(city, y) { return "top2|" + city + "|" + y; }
  function loadTopStore(city, y) {
    try {
      var o = JSON.parse(LS.get(topKey(city, y)) || "null");
      if (!o) return {};
      if (y === new Date().getFullYear() && o.day !== ymd(today())) return {};
      return o.items || {};
    } catch (e) { return {}; }
  }
  function saveTopStore(city, y, items) {
    try { LS.set(topKey(city, y), JSON.stringify({ day: ymd(today()), items: items })); } catch (e) {}
  }

  function loadTop() {
    var run = ++topRun, city = S.topCity, y = S.topYear;
    var store = loadTopStore(city, y);
    var wanted = CROPS.filter(function (c) { return S.topCat === "all" || c[3] === S.topCat; });
    var todo = wanted.filter(function (c) { return !store[c[0]]; });
    topData = { city: city, year: y, items: store, failed: 0 };
    if (!todo.length) { status("topStatus", ""); renderTop(); return; }
    if (native.isOnline && !native.isOnline()) { status("topStatus", "err", t("offline")); return; }

    $("topBtn").disabled = true;
    var done = 0, failed = 0, r = yearRange(y);
    function prog() {
      status("topStatus", "info", t("topProgress", { i: done, n: todo.length }) + '<div class="progress"><i style="width:' + Math.round(done / todo.length * 100) + '%"></i></div>', true);
    }
    prog();
    var jobs = todo.map(function (c) {
      return fetchSeries(c[0], city, r[0], r[1]).then(function (res) {
        if (run !== topRun) return;
        done++;
        if (res && res.ok) {
          var v = cleanSeries(res.points).points.map(function (p) { return p[1]; });
          store[c[0]] = v.length ? {
            n: v.length, unit: res.unit,
            avg: v.reduce(function (a, b) { return a + b; }, 0) / v.length,
            max: Math.max.apply(null, v), min: Math.min.apply(null, v)
          } : { n: 0, unit: res.unit };
        } else failed++;
        if (done % 4 === 0 || done === todo.length) { prog(); saveTopStore(city, y, store); }
      });
    });
    Promise.all(jobs).then(function () {
      if (run !== topRun) return;
      $("topBtn").disabled = false;
      saveTopStore(city, y, store);
      topData = { city: city, year: y, items: store, failed: failed };
      status("topStatus", failed ? "warn" : "", failed ? t("partial", { f: failed }) : "");
      renderTop();
    });
  }

  function topLists() {
    var m = S.topMetric, list = [], considered = 0;
    CROPS.forEach(function (c) {
      if (S.topCat !== "all" && c[3] !== S.topCat) return;
      var it = topData.items[c[0]];
      if (!it) return;
      considered++;
      if (!it.n || it.n < 5) return;
      if ($("sameUnit").checked && unitKey(it.unit) !== "100kg") return;
      list.push({ id: c[0], v: it[m], unit: it.unit, n: it.n });
    });
    list.sort(function (a, b) { return b.v - a.v; });
    // With fewer than 20 qualifying items the two lists would overlap; split them instead.
    var nHigh = Math.min(10, Math.ceil(list.length / 2)), nLow = Math.min(10, list.length - nHigh);
    return { high: list.slice(0, nHigh), low: list.slice().reverse().slice(0, nLow), total: considered, withData: list.length };
  }

  function renderTop() {
    var L = topLists();
    if (!L.high.length) {
      $("topResult").classList.add("hidden");
      if (!$("topBtn").disabled) status("topStatus", "warn", t("topNone"));
      return;
    }
    $("topResult").classList.remove("hidden");
    var yr = topData.year === new Date().getFullYear() ? t("ytd", { y: topData.year }) : t("fullYear", { y: topData.year });
    $("topMeta1").textContent = $("topMeta2").textContent = yr;
    var maxV = L.high[0].v;
    function li(x, i, cls) {
      return '<li data-id="' + x.id + '"><span class="rk">' + (i + 1) + '</span><div class="rn"><b>' + esc(cropName(x.id)) +
        '</b><div class="bar"><i style="width:' + Math.max(3, x.v / maxV * 100) + "%;background:" + (cls === "up" ? "#D9776C" : "#5FA37C") + '"></i></div></div>' +
        '<div class="rv num ' + cls + '">' + fmtNum(x.v) + "<small>" + esc(unitLabel(x.unit)) + "</small></div></li>";
    }
    $("topHigh").innerHTML = L.high.map(function (x, i) { return li(x, i, "up"); }).join("");
    $("topLow").innerHTML = L.low.map(function (x, i) { return li(x, i, "down"); }).join("");
    $("topNote").textContent = t("topNote", { metric: t("m_" + S.topMetric), year: yr, city: cityName(topData.city), k: L.withData, n: L.total }) + " " + t("cleanedNote");
  }

  function exportTopCsv() {
    var L = topLists(), city = cityById[topData.city];
    var lines = [["List", "Rank", "Item", "Item (Urdu)", "Category", "Average", "Peak", "Lowest", "Days", "Unit", "Market", "Year"].join(",")];
    [["Highest", L.high], ["Lowest", L.low]].forEach(function (g) {
      g[1].forEach(function (x, i) {
        var c = cropById[x.id], it = topData.items[x.id];
        lines.push([g[0], i + 1, c[1], c[2], I18N.en["cat_" + c[3]], Math.round(it.avg), Math.round(it.max), Math.round(it.min), it.n, it.unit, city[1], topData.year].map(csvCell).join(","));
      });
    });
    native.exportCsv("AMIS_Top10_" + fileSafe(city[1]) + "_" + topData.year + ".csv", lines.join("\r\n"));
  }
  function exportTopPdf() {
    var L = topLists(), city = cityById[topData.city];
    var yr = topData.year === new Date().getFullYear() ? t("ytd", { y: topData.year }) : t("fullYear", { y: topData.year });
    var rows = [];
    [[t("highest"), L.high], [t("lowest"), L.low]].forEach(function (g) {
      rows.push(["", g[0], "", ""]);
      g[1].forEach(function (x, i) { rows.push([String(i + 1), cropName(x.id), fmtNum(x.v), unitLabel(x.unit)]); });
    });
    native.exportPdf(JSON.stringify({
      fileName: "AMIS_Top10_" + fileSafe(city[1]) + "_" + topData.year + ".pdf",
      rtl: S.lang === "ur",
      title: t("topPdfTitle", { city: cityName(topData.city) }),
      subtitle: t("topPdfSub", { year: yr, cat: S.topCat === "all" ? t("all") : t("cat_" + S.topCat), metric: t("m_" + S.topMetric), now: stamp() }),
      note: $("topNote").textContent,
      headers: [t("rank"), t("item"), t("value"), t("unit")],
      rows: rows, footer: t("footer")
    }));
  }

  // ================================================================ today's prices (all items at one market)
  var todayRun = 0, todayData = null, todayMem = {};
  function cropUnit(id) {                       // wholesale unit as AMIS publishes it
    var n = cropById[id][1];
    if (/\(Dozen\)/i.test(n)) return "dozen";
    if (/100\s*Pcs/i.test(n)) return "100pcs";
    return "100kg";
  }
  function wqU(v, u, q) { return u === "100kg" ? v / 100 * (q || S.qty) : v; }
  function rqU(v, u, q) { return u === "100kg" ? v * (q || S.qty) : v; }
  function perU(u) { return u === "100kg" ? t("perQty", { q: qtyName(S.qty) }) : t("unitMap")[u === "dozen" ? "dozen" : "100pcs"]; }

  function fetchTodayMandi(city, mdyStr) {
    var k = city + "|" + mdyStr, c = todayMem[k];
    if (c && Date.now() - c.t < 30 * 60 * 1000) return Promise.resolve(c.d);
    return new Promise(function (resolve) {
      var id = "r" + (++reqSeq);
      pending[id] = function (res) { if (res && res.ok) todayMem[k] = { t: Date.now(), d: res }; resolve(res); };
      native.fetchToday(id, VIEW_ID[city], mdyStr);
    });
  }

  // Latest mandi list: today, else up to 3 days back (rates are uploaded during the morning).
  function latestMandi(city) {
    var tries = ["", mdy(addDays(today(), -1)), mdy(addDays(today(), -2)), mdy(addDays(today(), -3))];
    function next(i) {
      return fetchTodayMandi(city, tries[i]).then(function (res) {
        if (res && res.ok && res.n > 0) return res;
        if (res && !res.ok && res.code === "offline") return res;
        return i + 1 < tries.length ? next(i + 1) : res;
      });
    }
    return next(0);
  }
  // Latest retail list that includes this district: today, else up to 3 days back.
  function latestRetailDay(dk) {
    if (!dk) return Promise.resolve(null);
    function next(i) {
      var iso = ymd(addDays(today(), -i));
      return fetchRetailDay(iso).then(function (res) {
        var has = res && res.ok && Object.keys(res.items).some(function (k) { return res.items[k][dk]; });
        if (has) return res;
        return i < 3 ? next(i + 1) : null;
      });
    }
    return next(0);
  }

  function retailOnDate(dk, iso) {
    if (!dk) return Promise.resolve(null);
    return fetchRetailDay(iso).then(function (res) {
      var has = res && res.ok && Object.keys(res.items).some(function (k) { return res.items[k][dk]; });
      return has ? res : null;
    });
  }

  function loadToday() {
    var run = ++todayRun, city = S.todayCity, dk = districtOf(city), dsel = S.todayDate;
    if (native.isOnline && !native.isOnline()) { status("todayStatus", "err", t("offline")); return; }
    $("todayBtn").disabled = true;
    status("todayStatus", "info", t("todayLoading", { city: cityName(city) }), true);
    var jobs = dsel ? [fetchTodayMandi(city, mdy(parseYmd(dsel))), retailOnDate(dk, dsel)]   // a chosen date: exactly that day
                    : [latestMandi(city), latestRetailDay(dk)];                                // today: fall back to latest
    Promise.all(jobs).then(function (r) {
      if (run !== todayRun) return;
      $("todayBtn").disabled = false;
      var m = r[0], rt = r[1];
      if (m && !m.ok && !rt) { status("todayStatus", "err", t(m.code === "offline" ? "offline" : "serverErr")); $("todayResult").classList.add("hidden"); return; }
      todayData = { city: city, dk: dk, mandi: m && m.ok && m.n > 0 ? m : null, retail: rt, date: dsel };
      status("todayStatus", "");
      renderToday();
    });
  }

  function todayRows() {
    var d = todayData, rows = [];
    CROPS.forEach(function (c) {
      if (S.todayItem && c[0] !== S.todayItem) return;
      if (!S.todayItem && S.todayCat !== "all" && c[3] !== S.todayCat) return;
      var k = RETAIL_KEY[c[0]];
      var w = d.mandi && d.mandi.items[k] || null;
      var r = d.retail && d.dk && d.retail.items[k] && d.retail.items[k][d.dk] || null;
      if (!w && !r) return;
      rows.push({ id: c[0], cat: c[3], unit: cropUnit(c[0]), w: w, r: r });
    });
    var order = { V: 0, F: 1, C: 2 };
    rows.sort(function (a, b) { return order[a.cat] - order[b.cat] || cropName(a.id).localeCompare(cropName(b.id), S.lang); });
    return rows;
  }
  // Flags rows where wholesale per kg and the notified retail per kg disagree wildly (likely a data-entry error).
  function oddRow(x) {
    if (!x.w || !x.r || x.unit !== "100kg") return false;
    var ratio = (x.w[2] / 100) / ((x.r[0] + x.r[1]) / 2);
    return ratio > 2 || ratio < 0.33;
  }

  function renderToday() {
    var d = todayData;
    if (!d) return;
    $("todayResult").classList.remove("hidden");
    var md = d.mandi ? d.mandi.date : "", rdte = d.retail ? d.retail.date : "", ti = d.date || ymd(today());
    $("todayTitle").textContent = cityName(d.city) + (d.date ? " — " + fmtDate(d.date) : "");
    $("todaySub").innerHTML =
      '<span class="tw">' + t("wholesale") + ": " + (md ? fmtDate(md) + (md !== ti ? ' <b class="old">' + t("notToday") + "</b>" : "") : t(d.date ? "noneOnDate" : "noneYet")) + "</span>" +
      '<span class="tr">' + t("retail") + ": " + (!d.dk ? t("noRetailList") : rdte ? fmtDate(rdte) + " · " + esc(districtName(d.dk)) + (rdte !== ti ? ' <b class="old">' + t("notToday") + "</b>" : "") : t(d.date ? "noneOnDate" : "noneYet")) + "</span>";

    chipRow("todayQty", QTYS.map(function (q) { return [q, qtyName(q)]; }), S.qty, function (v) { S.qty = +v; save(); renderToday(); });

    var rows = todayRows();
    $("todayCount").textContent = S.todayItem ? "" : t("itemsCount", { n: rows.length });
    if (!rows.length) {
      $("todayList").innerHTML = "";
      $("todaySingle").innerHTML = '<div class="status warn">' + t(d.date ? "dateNone" : S.todayItem ? "todayNoItem" : "todayNone") + "</div>";
      $("todayExport").classList.add("hidden");
      return;
    }
    $("todayExport").classList.remove("hidden");

    if (S.todayItem) {                               // single item: big card + quantity table
      var x = rows[0], u = x.unit;
      var wC = '<div class="pcard w"><div class="lbl">' + t("wholesale") + "</div>" +
        (x.w ? '<div class="big num">Rs ' + money(wqU(x.w[2], u)) + '</div><div class="per">' + esc(perU(u)) + "</div>" +
          '<div class="sm">' + t("minMax") + " " + money(wqU(x.w[0], u)) + "–" + money(wqU(x.w[1], u)) + "</div>" : '<div class="sm">' + t("noMandiItem") + "</div>") + "</div>";
      var rC = '<div class="pcard r"><div class="lbl">' + t("retail") + "</div>" +
        (x.r ? '<div class="big num">Rs ' + rangeStr([rqU(x.r[0], u), rqU(x.r[1], u)]) + '</div><div class="per">' + esc(u === "100pcs" ? t("asNotified") : perU(u)) + "</div>"
             : '<div class="sm">' + (d.dk ? t("noRetailItem", { d: districtName(d.dk) }) : t("noRetailDistrict")) + "</div>") + "</div>";
      var qt = "";
      if (u === "100kg") {
        qt = '<table class="qty"><thead><tr><th>' + t("qty") + "</th><th>" + t("wholesale") + "</th><th>" + t("retail") + "</th></tr></thead><tbody>" +
          QTYS.map(function (q) {
            return "<tr" + (q === S.qty ? ' class="on"' : "") + "><td>" + qtyName(q) + '</td><td class="num">' + (x.w ? "Rs " + money(wqU(x.w[2], u, q)) : "–") +
              '</td><td class="num">' + (x.r ? "Rs " + rangeStr([rqU(x.r[0], u, q), rqU(x.r[1], u, q)]) : "–") + "</td></tr>";
          }).join("") + "</tbody></table>";
      } else if (u === "100pcs" && x.r) qt = '<div class="sm note1">' + t("pcsNote") + "</div>";
      $("todaySingle").innerHTML = '<div class="single-h"><b>' + esc(cropName(x.id)) + "</b></div>" +
        '<div class="pgrid">' + wC + rC + "</div>" + (oddRow(x) ? '<div class="sm warnline">⚠ ' + t("oddRow") + "</div>" : "") + qt +
        '<button class="ghost wide" id="todayToTrend">' + t("seeTrend") + "</button>";
      $("todayList").innerHTML = "";
      $("todayToTrend").onclick = function () { openTrendFor(x.id, d.city); };
      return;
    }

    $("todaySingle").innerHTML = "";
    var lastCat = null, html = "";
    rows.forEach(function (x) {
      if (x.cat !== lastCat) { html += '<li class="cat">' + esc(t("cat_" + x.cat)) + "</li>"; lastCat = x.cat; }
      var c = cropById[x.id], u = x.unit;
      html += '<li class="it" data-id="' + x.id + '"><div class="nm"><b>' + esc(cropName(x.id)) + '</b><small>' + esc(S.lang === "ur" ? c[1] : c[2]) + "</small>" +
        (oddRow(x) ? '<span class="odd">⚠ ' + t("check") + "</span>" : "") + "</div>" +
        '<div class="pw num">' + (x.w ? "Rs " + money(wqU(x.w[2], u)) + "<small>" + money(wqU(x.w[0], u)) + "–" + money(wqU(x.w[1], u)) + "</small>" : "–") + "</div>" +
        '<div class="pr num">' + (x.r ? "Rs " + rangeStr([rqU(x.r[0], u), rqU(x.r[1], u)]) : "–") + "</div>" +
        (u !== "100kg" ? '<div class="un">' + esc(perU(u)) + (u === "100pcs" && x.r ? " · " + t("retailShort") + ": " + t("asNotified") : "") + "</div>" : "") + "</li>";
    });
    $("todayList").innerHTML = '<li class="hd"><span>' + t("item") + '</span><span class="pw">' + t("wholesaleShort") + '<small>' + esc(t("perQty", { q: qtyName(S.qty) })) + '</small></span><span class="pr">' + t("retailShort") + '<small>' + esc(t("perQty", { q: qtyName(S.qty) })) + "</small></span></li>" + html;
  }

  function openTrendFor(cropId, city) {
    S.crop = cropId; S.city = city; S.period = "30d"; save();
    renderPickers(); renderPeriodChips(); setTab("trend"); loadTrend();
  }

  function exportTodayCsv() {
    var d = todayData, city = cityById[d.city], rows = todayRows();
    var lines = [["Item", "Item (Urdu)", "Category", "Market", "Mandi date", "Wholesale min", "Wholesale max", "Wholesale FQP", "Wholesale unit",
      "Wholesale FQP Rs/kg", "Retail district", "Retail date", "Official retail min Rs/kg", "Official retail max Rs/kg",
      "Wholesale Rs/" + S.qty + "kg", "Official retail min Rs/" + S.qty + "kg", "Official retail max Rs/" + S.qty + "kg"].map(csvCell).join(",")];
    rows.forEach(function (x) {
      var c = cropById[x.id], kg = x.unit === "100kg";
      lines.push([c[1], c[2], I18N.en["cat_" + c[3]], city[1], d.mandi ? d.mandi.date : "",
        x.w ? x.w[0] : "", x.w ? x.w[1] : "", x.w ? x.w[2] : "", I18N.en.unitMap[x.unit === "100pcs" ? "100pcs" : x.unit],
        x.w && kg ? r2(x.w[2] / 100) : "", d.dk ? DISTRICTS[d.dk][0] : "", x.r ? d.retail.date : "", x.r ? x.r[0] : "", x.r ? x.r[1] : "",
        x.w && kg ? r2(x.w[2] / 100 * S.qty) : "", x.r && kg ? r2(x.r[0] * S.qty) : "", x.r && kg ? r2(x.r[1] * S.qty) : ""].map(csvCell).join(","));
    });
    native.exportCsv("AMIS_Today_" + fileSafe(city[1]) + "_" + (d.mandi ? d.mandi.date : ymd(today())) + ".csv", lines.join("\r\n"));
  }
  function exportTodayPdf() {
    var d = todayData, city = cityById[d.city], rows = todayRows();
    native.exportPdf(JSON.stringify({
      fileName: "AMIS_Today_" + fileSafe(city[1]) + "_" + (d.mandi ? d.mandi.date : ymd(today())) + ".pdf",
      rtl: S.lang === "ur",
      title: t("todayPdfTitle", { city: cityName(d.city) }),
      subtitle: $("todaySub").textContent + " · " + t("perQty", { q: qtyName(S.qty) }) + " · " + stamp(),
      note: d.dk ? t("retailNote", { d: districtName(d.dk) }) : t("noRetailDistrict"),
      tables: [{
        title: S.todayItem ? cropName(S.todayItem) : (S.todayCat === "all" ? t("all") : t("cat_" + S.todayCat)),
        headers: [t("item"), t("wholesale"), t("retail"), t("unit")],
        rows: rows.map(function (x) {
          var u = x.unit;
          return [cropName(x.id), x.w ? "Rs " + money(wqU(x.w[2], u)) + " (" + money(wqU(x.w[0], u)) + "–" + money(wqU(x.w[1], u)) + ")" : "–",
            x.r ? "Rs " + rangeStr([rqU(x.r[0], u), rqU(x.r[1], u)]) : "–", perU(u)];
        })
      }],
      footer: t("footer")
    }));
  }

  function renderTodayChips() {
    chipRow("todayCat", [["all", t("all")], ["V", t("cat_V")], ["F", t("cat_F")], ["C", t("cat_C")]], S.todayCat, function (v) {
      S.todayCat = v; save(); renderTodayChips(); if (todayData) renderToday();
    });
    $("todayCatRow").classList.toggle("hidden", !!S.todayItem);
  }

  // ---------------------------------------------------------------- navigation
  function setTab(tab) {
    S.tab = tab;
    document.querySelectorAll(".tab").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === tab); });
    document.querySelectorAll(".pane").forEach(function (p) { p.classList.toggle("active", p.id === "tab-" + tab); });
    window.scrollTo(0, 0);
  }
  window.handleBack = function () {
    if (picker) { closePicker(); return true; }
    if (S.tab !== "today") { setTab("today"); return true; }
    return false;
  };

  // ---------------------------------------------------------------- wire up
  $("langBtn").onclick = function () { S.lang = S.lang === "en" ? "ur" : "en"; save(); applyLang(); };
  document.querySelectorAll(".tab").forEach(function (b) { b.onclick = function () { setTab(b.getAttribute("data-tab")); }; });
  $("cropBtn").onclick = function () { openPicker("crop", function (id) { S.crop = id; }); };
  $("cityBtn").onclick = function () { openPicker("city", function (id) { S.city = id; }); };
  $("topCityBtn").onclick = function () { openPicker("topCity", function (id) {
    if ($("topBtn").disabled) { topRun++; native.cancelPending(); $("topBtn").disabled = false; pending = {}; retailPending = {}; $("showBtn").disabled = false; }
    S.topCity = id; topData = null; $("topResult").classList.add("hidden"); status("topStatus", ""); }); };
  $("todayCityBtn").onclick = function () { openPicker("todayCity", function (id) { S.todayCity = id; todayData = null; $("todayResult").classList.add("hidden"); }); };
  $("todayItemBtn").onclick = function () { openPicker("todayItem", function (id) { S.todayItem = id; renderTodayChips(); if (todayData && todayData.city === S.todayCity) renderToday(); }); };
  $("todayBtn").onclick = loadToday;
  function syncTodayDate() {
    var ti = ymd(today());
    $("todayDate").max = ti;
    $("todayDate").value = S.todayDate || ti;
    $("todayDateReset").classList.toggle("hidden", !S.todayDate);
  }
  $("todayDate").onchange = function () {
    var v = this.value, ti = ymd(today());
    S.todayDate = !v || v >= ti ? "" : v;
    syncTodayDate();
    loadToday();
  };
  $("todayDateReset").onclick = function () { S.todayDate = ""; syncTodayDate(); loadToday(); };
  syncTodayDate();
  $("todayCsvBtn").onclick = exportTodayCsv;
  $("todayPdfBtn").onclick = exportTodayPdf;
  $("todayList").onclick = function (e) { var li = e.target.closest("li[data-id]"); if (li && todayData) openTrendFor(+li.getAttribute("data-id"), todayData.city); };
  $("pickerClose").onclick = closePicker;
  $("pickerOv").onclick = function (e) { if (e.target === $("pickerOv")) closePicker(); };
  $("pickerSearch").oninput = fillPicker;
  $("pickerList").onclick = function (e) {
    var li = e.target.closest("li[data-id]");
    if (!li || !picker) return;
    picker.onPick(+li.getAttribute("data-id"));
    closePicker(); save(); renderPickers();
  };
  $("fromDate").onchange = function () { S.from = this.value; save(); };
  $("toDate").onchange = function () { S.to = this.value; save(); };
  $("showBtn").onclick = loadTrend;
  $("resetZoom").onclick = function () { if (chart) { chart.zoomScale("x", chart.$home, "none"); markRange(); } };
  $("rangeBtns").onclick = function (e) { var b = e.target.closest("button"); if (b && chart) zoomMonths(+b.getAttribute("data-m")); };
  $("moreRows").onclick = function () { rowsExpanded = true; renderRows(inPeriod()); };
  $("csvBtn").onclick = exportTrendCsv;
  $("pdfBtn").onclick = exportTrendPdf;
  $("topBtn").onclick = loadTop;
  $("sameUnit").onchange = function () { if (topData) renderTop(); };
  $("topCsvBtn").onclick = exportTopCsv;
  $("topPdfBtn").onclick = exportTopPdf;
  $("topHigh").onclick = $("topLow").onclick = function (e) {
    var li = e.target.closest("li[data-id]");
    if (!li) return;
    S.crop = +li.getAttribute("data-id"); S.city = topData.city;
    S.period = "1y"; save(); renderPickers(); renderPeriodChips(); setTab("trend"); loadTrend();
  };

  // results cached before data cleaning existed are discarded
  LS.keys().forEach(function (k) { if (k.indexOf("top|") === 0) LS.del(k); });
  applyLang();
  setTab("today");
  loadToday();     // open straight on today's prices for the last-used market

  // ---------------------------------------------------------------- mock (browser preview only)
  function makeMockBridge() {
    function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }; }
    return {
      isOnline: function () { return true; },
      fetchSeries: function (id, crop, city, s, e) {
        var r = rnd(crop * 97 + city * 13 + 7), sp = s.split("/"), ep = e.split("/");
        var d = new Date(+sp[2], +sp[0] - 1, +sp[1]), end = new Date(+ep[2], +ep[0] - 1, +ep[1]);
        var base = 2000 + r() * 15000, pts = [], unit = crop === 41 ? "Rs./Dozen" : crop === 44 ? "Rs./100Pcs." : "Rs./100kg";
        if (crop % 9 === 0) { setTimeout(function () { window.__amisCb(id, { ok: true, unit: unit, points: [] }); }, 200); return; }
        while (d <= end) {
          if (d.getDay() !== 0 && r() > 0.05) {
            base = Math.max(300, base * (1 + (r() - 0.5) * 0.06) + Math.sin(d.getMonth() / 1.9) * 40);
            pts.push([ymd(d), Math.round(base / 25) * 25]);
          }
          d.setDate(d.getDate() + 1);
        }
        setTimeout(function () { window.__amisCb(id, { ok: true, unit: unit, points: pts }); }, 150 + r() * 400);
      },
      fetchRetail: function (id, m, iso) {
        var r = rnd(+iso.replace(/-/g, "") % 99991 + 3), items = {};
        CROPS.forEach(function (c) {
          if (r() < 0.3) return;
          var o = {};
          Object.keys(DISTRICTS).forEach(function (dk) { if (r() < 0.8) { var lo = Math.round(30 + r() * 300); o[dk] = [lo, lo + Math.round(5 + r() * 20)]; } });
          items[RETAIL_KEY[c[0]]] = o;
        });
        setTimeout(function () { window.__amisCb(id, iso < "2023-06-01" ? { ok: true, date: iso, items: {}, n: 0 } : { ok: true, date: iso, items: items, n: 1 }); }, 100 + r() * 300);
      },
      fetchToday: function (id, viewId, m) {
        var r = rnd(viewId * 31 + 5), items = {};
        CROPS.forEach(function (c) { if (r() < 0.45) { var lo = Math.round(2000 + r() * 20000); items[RETAIL_KEY[c[0]]] = [lo, lo + 800, lo + 400]; } });
        setTimeout(function () { window.__amisCb(id, { ok: true, date: ymd(today()), items: items, n: Object.keys(items).length }); }, 200);
      },
      cancelPending: function () {},
      exportCsv: function (n, c) { console.log("CSV", n, c.slice(0, 300)); },
      exportPdf: function (s) { console.log("PDF", s.slice(0, 300)); }
    };
  }
})();
