"use client";

import { trackPaperExternalLinkClick } from "@/lib/analytics";

/** For paper.externalUrl links — journal-hosted papers, not our own PDF. */
export default function TrackedExternalLink({
  href,
  contentId,
  publisher,
  className,
  children,
}: {
  href: string;
  contentId: string;
  publisher?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackPaperExternalLinkClick(contentId, publisher ?? "unknown")}
    >
      {children}
    </a>
  );
}
