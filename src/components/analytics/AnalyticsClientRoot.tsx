"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";
import { useReadingDepth } from "@/hooks/useReadingDepth";

/**
 * Mounted once in the root layout, alongside Header/Footer. Owns the
 * single page_view source (see GoogleAnalyticsScripts' send_page_view:
 * false) and global reading-depth tracking. Deliberately uses usePathname
 * alone, not useSearchParams — nothing on this site puts state in the
 * query string, so there's no Suspense-boundary requirement to work around.
 */
export default function AnalyticsClientRoot() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return; // guards React StrictMode's dev-mode double-invoke
    lastPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  useReadingDepth(pathname);

  return null;
}
