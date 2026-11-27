"use client";

import { useEffect, useRef, useState } from "react";
import ReadAloud from "@/app/books/[bookId]/[chapterId]/ReadAloud";
import type { SpeechSegment } from "@/lib/content/chapterSpeech";

/**
 * "Listen to this page" for ordinary pages (2026-11-27, author: add the read option to About and the other pages that lack it).
 *
 * Chapters, papers and training transcripts build their speech from structured data. Ordinary pages (About, Founder, Science,
 * crops, machines and so on) have no such data, so this reads what the page shows: the text of <main>, in order, as title,
 * headings and paragraphs. Site chrome, buttons, forms, hidden elements and anything marked .no-print or data-read-skip are left
 * out. The player itself is the same ReadAloud used on chapters (speed control, iPhone and Chrome fixes, privacy note).
 */

const BLOCKS = "h1, h2, h3, h4, p, li, blockquote, figcaption, dt, dd";
const SKIP =
  "header, footer, nav, button, form, select, label, script, style, iframe, [role='group'], [aria-hidden='true'], .no-print, [data-read-skip]";

function collect(root: Element): SpeechSegment[] {
  const out: SpeechSegment[] = [];
  let last = "";
  for (const el of Array.from(root.querySelectorAll(BLOCKS))) {
    if (el.closest(SKIP)) continue;
    // A list item or quote that wraps paragraphs or headings is read through its children, not twice.
    if (el.matches("li, blockquote, dd") && el.querySelector("p, li, h2, h3, h4")) continue;
    if (el.getClientRects().length === 0) continue; // hidden (e.g. closed menus, tabs not shown)
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!text || text === last) continue;
    last = text;
    const tag = el.tagName.toLowerCase();
    const kind: SpeechSegment["kind"] =
      tag === "h1" ? "title" : /^h[2-4]$/.test(tag) ? "heading" : tag === "blockquote" ? "quote" : "paragraph";
    out.push({ kind, text });
  }
  return out;
}

export default function PageReadAloud({ align = "center" }: { align?: "center" | "start" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [segments, setSegments] = useState<SpeechSegment[]>([]);

  useEffect(() => {
    const root = ref.current?.closest("main") ?? document.querySelector("main");
    if (!root) return;
    // After the first paint, so client-rendered parts of the page are in place.
    const id = window.setTimeout(() => setSegments(collect(root)), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      ref={ref}
      data-read-skip
      className={`no-print mt-5 text-start ${align === "center" ? "mx-auto max-w-2xl" : ""}`}
    >
      <ReadAloud segments={segments} noun="page" />
    </div>
  );
}
