"use client";

import { useEffect } from "react";
import { trackPdfDownload } from "@/lib/analytics";

/** Opens the complete-book PDF as soon as the page loads (link-preview crawlers do not run scripts, so they read the cover). */
export default function StartDownload({ href, contentId, title }: { href: string; contentId: string; title: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      trackPdfDownload(contentId, title, href.split("/").pop() ?? href);
      window.location.replace(href);
    }, 600);
    return () => window.clearTimeout(t);
  }, [href, contentId, title]);
  return null;
}
