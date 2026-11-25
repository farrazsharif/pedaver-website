// Detects and repairs isolated bad values (data-entry errors) in an AMIS price series.
// A point is treated as an error only when it is far from the prices around it AND those
// surrounding prices agree with each other (i.e. the market itself did not move).
// Genuine jumps persist for several days, so the surrounding prices disagree and nothing is changed.
(function (root) {
  "use strict";
  var CFG = {
    win: 3,          // neighbours on each side
    hi: 1.6,         // flag if price > 1.6 x local median
    lo: 0.6,         // flag if price < 0.6 x local median
    agree: 0.25,     // neighbours "agree" if within 25% of their median
    minAgree: 0.66,  // ...and at least 2/3 of them do
    maxGapDays: 21   // ignore neighbours further than this (season gaps)
  };
  function median(a) {
    var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  function dayNum(s) { var p = s.split("-"); return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000; }

  // points: [[yyyy-mm-dd, price], ...] sorted by date.
  // Returns { points: cleaned copy, fixes: [{date, original, fixed}], suspectLast: bool }
  function cleanSeries(points) {
    var n = points.length, days = points.map(function (p) { return dayNum(p[0]); });
    var bad = new Array(n), suspectLast = false;
    for (var i = 0; i < n; i++) {
      var nb = [];
      for (var j = Math.max(0, i - CFG.win); j <= Math.min(n - 1, i + CFG.win); j++) {
        if (j !== i && Math.abs(days[j] - days[i]) <= CFG.maxGapDays) nb.push(points[j][1]);
      }
      var before = 0, after = 0;
      for (j = Math.max(0, i - CFG.win); j < i; j++) if (days[i] - days[j] <= CFG.maxGapDays) before++;
      for (j = i + 1; j <= Math.min(n - 1, i + CFG.win); j++) if (days[j] - days[i] <= CFG.maxGapDays) after++;
      if (nb.length < 3) continue;
      var m = median(nb), p = points[i][1], r = p / m;
      if (r <= CFG.hi && r >= CFG.lo) continue;
      var agreeing = nb.filter(function (v) { return Math.abs(v - m) / m <= CFG.agree; }).length;
      if (agreeing / nb.length < CFG.minAgree) continue;
      // The day before and the day after must both follow the local trend (single-day error only).
      var prevOk = i > 0 && days[i] - days[i - 1] <= CFG.maxGapDays && Math.abs(points[i - 1][1] - m) / m <= CFG.agree;
      var nextOk = i < n - 1 && days[i + 1] - days[i] <= CFG.maxGapDays && Math.abs(points[i + 1][1] - m) / m <= CFG.agree;
      if (before >= 1 && after >= 1 && prevOk && nextOk) bad[i] = true;
      else if (i === n - 1 && prevOk && before >= 3) suspectLast = true; // latest day: cannot confirm yet, only warn
    }
    var out = [], fixes = [];
    for (i = 0; i < n; i++) {
      if (!bad[i]) { out.push([points[i][0], points[i][1]]); continue; }
      var a = i - 1, b = i + 1;   // both are known-good neighbours (checked above)
      var v = points[a][1] + (points[b][1] - points[a][1]) * (days[i] - days[a]) / (days[b] - days[a]);
      v = Math.round(v / 5) * 5;
      out.push([points[i][0], v]);
      fixes.push({ date: points[i][0], original: points[i][1], fixed: v });
    }
    return { points: out, fixes: fixes, suspectLast: suspectLast };
  }
  root.cleanSeries = cleanSeries;
  root.CLEAN_CFG = CFG;
  if (typeof module !== "undefined") module.exports = { cleanSeries: cleanSeries, CFG: CFG };
})(typeof window !== "undefined" ? window : this);
