"use client";

import { useEffect } from "react";
import Link from "next/link";

// This route has been renamed to /validation ("Certification" implied third-party
// organic-style certification, which is not what PQNK does — Pedaver validates
// PQNK practice, it doesn't certify organic status). This stub just forwards
// any old links/bookmarks. Safe to delete this folder entirely once traffic
// to the old URL has faded.
export default function CertificationRedirectPage() {
  useEffect(() => {
    window.location.replace("/validation");
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-ink-soft">
        This page has moved. Redirecting to{" "}
        <Link href="/validation" className="font-semibold text-primary underline underline-offset-4">
          our Validation page
        </Link>
        …
      </p>
    </div>
  );
}
