"use client";

import { useRef } from "react";
import { trackVideoComplete, trackVideoPlay, trackVideoProgress } from "@/lib/analytics";
import type { VideoContextType, VideoProgressMilestone } from "@/lib/analytics/types";

const MILESTONES: VideoProgressMilestone[] = [25, 50, 75];

/**
 * Wraps a self-hosted <video>. Same-origin, so real native media events
 * (play/timeupdate/ended) give genuine play/progress/complete tracking —
 * unlike the YouTube iframe case in VideoEmbed, which can only proxy
 * "engagement".
 */
export default function TrackedVideo({
  src,
  contextType,
  contextId,
  className,
  ariaLabel,
}: {
  src: string;
  contextType: VideoContextType;
  contextId: string;
  className?: string;
  ariaLabel?: string;
}) {
  const played = useRef(false);
  const firedMilestones = useRef<Set<VideoProgressMilestone>>(new Set());
  const completed = useRef(false);

  return (
    <video
      src={src}
      controls
      className={className}
      aria-label={ariaLabel}
      onPlay={() => {
        if (played.current) return;
        played.current = true;
        trackVideoPlay(contextType, contextId);
      }}
      onTimeUpdate={(e) => {
        const video = e.currentTarget;
        if (!video.duration) return;
        const percent = (video.currentTime / video.duration) * 100;
        for (const milestone of MILESTONES) {
          if (percent >= milestone && !firedMilestones.current.has(milestone)) {
            firedMilestones.current.add(milestone);
            trackVideoProgress(contextType, contextId, milestone);
          }
        }
      }}
      onEnded={() => {
        if (completed.current) return;
        completed.current = true;
        trackVideoComplete(contextType, contextId);
      }}
    />
  );
}
