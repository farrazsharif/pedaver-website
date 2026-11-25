import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fieldEvidence, formatFeNumber, parseFeQuery, getFieldEvidenceByFeNumber, youTubeThumbnail } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import ShareButton from "@/components/ShareButton";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { EvidenceCard } from "../FieldEvidenceBrowser";

// One page per Knowledge Exchange record (2026-11-25), e.g. /field-evidence/ke-067/.
// Its reason to exist is the shared link: WhatsApp and other apps show the record's own
// title, summary and video picture, instead of the general Knowledge Exchange heading.

export const dynamicParams = false;

export async function generateStaticParams() {
  return fieldEvidence.map((fe) => ({ ke: formatFeNumber(fe.feNumber).toLowerCase() }));
}

function find(ke: string) {
  const n = parseFeQuery(ke);
  return n === null ? undefined : getFieldEvidenceByFeNumber(n);
}

function shortSummary(text: string) {
  return text.length <= 200 ? text : `${text.slice(0, 197).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ ke: string }> }): Promise<Metadata> {
  const { ke } = await params;
  const fe = find(ke);
  if (!fe) return {};
  const pic = fe.clippingImage ?? youTubeThumbnail(fe) ?? undefined;
  return buildMetadata({
    title: `${formatFeNumber(fe.feNumber)}: ${fe.title}`,
    description: shortSummary(fe.summary),
    path: `/field-evidence/${ke}`,
    image: pic && pic.startsWith("/") ? `${SITE_URL}${pic}` : pic,
  });
}

export default async function KnowledgeExchangeRecordPage({ params }: { params: Promise<{ ke: string }> }) {
  const { ke } = await params;
  const fe = find(ke);
  if (!fe) notFound();
  const title = `${formatFeNumber(fe.feNumber)}: ${fe.title}`;
  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <p className="text-sm">
          <Link href="/field-evidence" className="font-semibold text-primary underline underline-offset-4">
            ← Knowledge Exchange
          </Link>
        </p>
        <div className="mt-6">
          <EvidenceCard fe={fe} recordLink={false} />
        </div>
        <div className="no-print mt-6 flex flex-wrap gap-3">
          <ShareButton
            title={title}
            path={`/field-evidence/${ke}/`}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:bg-primary-light/10"
          />
        </div>
      </div>
    </Section>
  );
}
