"use client";

import { useRef, useState } from "react";
import type { TrainingSection } from "@/lib/content/farmersTraining";
import { timeToSeconds } from "@/lib/content/farmersTraining";

/**
 * The session video with its English transcript. Each section's time mark is a button: pressing it plays the video from that
 * point (the embed is reloaded with ?start=, which works without the YouTube player API and so needs no extra script or CSP entry).
 */
export default function TrainingPlayer({
  videoId,
  title,
  sections,
}: {
  videoId: string;
  title: string;
  sections: TrainingSection[];
}) {
  const [src, setSrc] = useState(`https://www.youtube.com/embed/${videoId}?rel=0`);
  const playerRef = useRef<HTMLDivElement>(null);

  function playFrom(time: string) {
    setSrc(`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&start=${timeToSeconds(time)}`);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div ref={playerRef} className="no-print scroll-mt-24">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-sm">
          <iframe
            className="h-full w-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-2 text-sm text-ink-soft">The talk is in Urdu. Press a time mark in the transcript to play the video from that point.</p>
      </div>

      <div id="transcript" className="mt-10 scroll-mt-24 [overflow-wrap:anywhere]">
        {sections.map((section) => (
          <section key={section.time} className="mt-8 first:mt-0">
            <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg font-bold text-primary-dark">
              <button
                type="button"
                onClick={() => playFrom(section.time)}
                className="no-print rounded-full bg-primary/10 px-3 py-0.5 font-mono text-sm font-semibold text-primary transition hover:bg-primary hover:text-cream"
                aria-label={`Play the video from ${section.time}`}
              >
                ▶ {section.time}
              </button>
              <span>{section.heading}</span>
            </h3>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
