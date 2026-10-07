"use client";

import { useState } from "react";

/**
 * Share this page's pedaver.com link. Added 2026-10-04: when the site is installed as an app
 * (manifest display "standalone"), iPhone shows no address bar or share button, so a paper or
 * chapter could not be forwarded. Uses the phone's share sheet where available, otherwise copies
 * the link.
 * 2026-10-07: "Download this page" saves the page as it is on screen through the browser's print / Save as PDF.
 * When a farmer has translated the page (Google's translate proxy runs our page's scripts), the saved copy is
 * in the translated language. Header, footer and buttons are left out of the copy by the print styles (.no-print).
 */
export default function ShareButton({ title, path, className }: { title: string; path: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://pedaver.com${path}`;

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  // WhatsApp is not always in the system share list (e.g. on a Mac), so it gets its own button.
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;

  return (
    <>
      <button type="button" onClick={share} className={className}>
        {copied ? "Link copied" : "Share this page"}
      </button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={className}>
        Share on WhatsApp
      </a>
      <button type="button" data-print-page="" onClick={() => window.print()} className={className}>
        Download this page (PDF)
      </button>
    </>
  );
}
