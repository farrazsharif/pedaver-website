"use client";

import { useEffect, useRef } from "react";
import { trackContentView } from "@/lib/analytics";
import type { ContentType } from "@/lib/analytics/types";

/**
 * Fires one content_view on mount, for routed content (papers, crops —
 * anything with its own URL). Distinct from page_view so GA can segment
 * "which papers/crops get read" without parsing URL paths.
 */
export default function ContentViewTracker({
  contentType,
  contentId,
  contentTitle,
}: {
  contentType: ContentType;
  contentId: string;
  contentTitle: string;
}) {
  const fired = useRef<string | null>(null);

  useEffect(() => {
    const key = `${contentType}:${contentId}`;
    if (fired.current === key) return;
    fired.current = key;
    trackContentView(contentType, contentId, contentTitle);
  }, [contentType, contentId, contentTitle]);

  return null;
}
