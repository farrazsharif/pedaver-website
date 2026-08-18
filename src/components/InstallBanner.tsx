"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";

const DISMISSED_KEY = "pedaver-install-banner-dismissed";

export default function InstallBanner({ dict }: { dict: Dictionary }) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Only show once we know the visitor hasn't dismissed it before — starting
    // from `dismissed = true` avoids a flash of the banner on every fresh
    // page load before localStorage has been checked.
    if (localStorage.getItem(DISMISSED_KEY) !== "1") {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
  }

  return (
    // Desktop-only: a visitor already on their phone doesn't need a banner
    // telling them to install the site on their phone. The underlying
    // install capability (and /install page) is unaffected by hiding this
    // promotional banner on narrower/touch layouts.
    <div className="hidden bg-accent/15 border-b border-accent/30 lg:block">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2.5 text-center sm:px-6">
        <p className="text-sm font-medium text-primary-dark">📱 {dict.install.bannerText}</p>
        <div className="flex items-center gap-4">
          <Link href="/install" className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-light">
            {dict.install.bannerCta}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label={dict.install.bannerDismiss}
            className="text-ink-soft/70 hover:text-ink-soft"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
