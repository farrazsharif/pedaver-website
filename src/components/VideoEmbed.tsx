"use client";

import { useEffect, useRef } from "react";
import { trackVideoEngage } from "@/lib/analytics";
import type { VideoContextType } from "@/lib/analytics/types";

/**
 * Cross-origin YouTube iframes can't bubble real play/pause events into
 * the parent document. video_engage is a focus-detection proxy instead —
 * it fires once, the first time the visitor's focus moves into this
 * specific player — not a substitute for real watch-time data.
 */
export default function VideoEmbed({
  videoId,
  title,
  context,
  contextId,
  autoplay = false,
  className = "aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-sm",
}: {
  videoId: string;
  title: string;
  context?: VideoContextType;
  contextId?: string;
  /** Muted, looping autoplay — for video used as a silent, always-playing visual rather than a clip the visitor presses play on. */
  autoplay?: boolean;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const engaged = useRef(false);

  useEffect(() => {
    if (!context || !contextId) return;
    function onWindowBlur() {
      if (engaged.current) return;
      if (document.activeElement !== iframeRef.current) return;
      engaged.current = true;
      trackVideoEngage(videoId, context!, contextId!);
    }
    window.addEventListener("blur", onWindowBlur);
    return () => window.removeEventListener("blur", onWindowBlur);
  }, [context, contextId, videoId]);

  return (
    <div className={className}>
      <iframe
        ref={iframeRef}
        className="h-full w-full"
        src={
          autoplay
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`
            : `https://www.youtube.com/embed/${videoId}`
        }
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
