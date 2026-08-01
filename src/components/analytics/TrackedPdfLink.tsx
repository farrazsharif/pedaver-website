"use client";

import { trackPdfDownload } from "@/lib/analytics";

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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackPdfDownload(contentId, contentTitle, file)}
    >
      {children}
    </a>
  );
}
