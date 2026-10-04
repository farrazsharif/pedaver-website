"use client";

import { useState } from "react";

/**
 * Share this page's pedaver.com link. Added 2026-10-04: when the site is installed as an app
 * (manifest display "standalone"), iPhone shows no address bar or share button, so a paper or
 * chapter could not be forwarded. Uses the phone's share sheet where available, otherwise copies
 * the link.
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

  return (
    <button type="button" onClick={share} className={className}>
      {copied ? "Link copied" : "Share this page"}
    </button>
  );
}
