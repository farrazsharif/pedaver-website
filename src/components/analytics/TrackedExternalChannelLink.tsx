"use client";

import { trackExternalChannelClick } from "@/lib/analytics";

/** For outbound links to YouTube/Facebook/WhatsApp channels on Services/Contact. */
export default function TrackedExternalChannelLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const host = (() => {
    try {
      return new URL(href).hostname;
    } catch {
      return href;
    }
  })();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackExternalChannelClick(label, host)}
    >
      {children}
    </a>
  );
}
