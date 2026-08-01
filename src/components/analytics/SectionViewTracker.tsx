"use client";

import { useEffect, useRef } from "react";
import { trackContentView } from "@/lib/analytics";
import type { ContentType } from "@/lib/analytics/types";

/**
 * Machines and resources have no per-item URL — each one is an
 * id-anchored <article> on one shared page — so this is the only way to
 * know which one someone actually engaged with. Observes the element by
 * DOM id (rather than requiring a ref-forwarding wrapper around the
 * article) and fires one content_view the first time it crosses 50%
 * visible.
 */
export default function SectionViewTracker({
  targetId,
  contentType,
  contentId,
  contentTitle,
}: {
  targetId: string;
  contentType: ContentType;
  contentId: string;
  contentTitle: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackContentView(contentType, contentId, contentTitle);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId, contentType, contentId, contentTitle]);

  return null;
}
