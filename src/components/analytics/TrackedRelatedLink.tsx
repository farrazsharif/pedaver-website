"use client";

import Link from "next/link";
import { trackRelatedContentClick } from "@/lib/analytics";
import type { ContentType } from "@/lib/analytics/types";

export default function TrackedRelatedLink({
  href,
  fromType,
  fromId,
  toType,
  toId,
  className,
  children,
}: {
  href: string;
  fromType: ContentType;
  fromId: string;
  toType: ContentType;
  toId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackRelatedContentClick(fromType, fromId, toType, toId)}>
      {children}
    </Link>
  );
}
