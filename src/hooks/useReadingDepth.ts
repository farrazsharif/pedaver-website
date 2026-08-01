"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";
import type { ScrollDepthMilestone } from "@/lib/analytics/types";

const THRESHOLDS: ScrollDepthMilestone[] = [25, 50, 75, 90];

/**
 * Fires scroll_depth once per threshold per page view. Mounted once,
 * globally, via AnalyticsClientRoot rather than per-page — the fired set
 * resets whenever pathname changes so each route gets its own fresh
 * 25/50/75/90 sequence. On very short pages several thresholds may fire
 * almost immediately after mount; that's expected and left as-is rather
 * than adding a minimum-page-length gate.
 */
export function useReadingDepth(pathname: string) {
  const fired = useRef<Set<ScrollDepthMilestone>>(new Set());
  const ticking = useRef(false);

  useEffect(() => {
    fired.current = new Set();

    function checkDepth() {
      ticking.current = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const percent = scrollable <= 0 ? 100 : ((window.scrollY + doc.clientHeight) / doc.scrollHeight) * 100;

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackScrollDepth(threshold, pathname);
        }
      }
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(checkDepth);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Catch pages short enough that no scrolling is needed to see 100%.
    checkDepth();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}
