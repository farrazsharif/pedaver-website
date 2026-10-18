"use client";

import { trackPdfDownload } from "@/lib/analytics";
import { mediaUrl } from "@/lib/mediaUrl";

export default function TrackedPdfLink({
  href,
  contentId,
  contentTitle,
  className,
  children,
}: {
  href: string;
  contentId: string;
  contentTitle: string;
  className?: string;
  children: React.ReactNode;
}) {
  const file = href.split("/").pop() ?? href;
  return (
    <a
      href={mediaUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackPdfDownload(contentId, contentTitle, file)}
    >
      {children}
    </a>
  );
}
