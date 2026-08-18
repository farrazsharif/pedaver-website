import Link from "next/link";
import { papers } from "@/lib/content/papers";
import { getMetadata, REQUIRES_REVIEW, EXTERNAL_EVIDENCE } from "@/lib/content/knowledge/taxonomy";
import { getRelatedKnowledgeForScience } from "@/lib/content/knowledge/related";
import TrackedRelatedLink from "@/components/analytics/TrackedRelatedLink";
import Section from "@/components/Section";

/**
 * Science → Related Knowledge Papers (Phase 2). Surrounding navigation
 * module only — does not touch the locked Science content around it. Data
 * comes entirely from the existing approved `scienceLinks` mapping via
 * `getRelatedKnowledgeForScience`; see that function for the ranking logic.
 */
const DOMAIN_LABELS: Record<string, string> = {
  soil: "Soil",
  plants: "Plants",
  water: "Water",
  biodiversity: "Biodiversity",
  nutrition: "Nutrition",
  "crop-protection": "Crop Protection",
  climate: "Climate",
  "food-quality": "Food Quality",
  "production-architecture": "Production Architecture",
  transition: "Transition",
};

function AuthorityTag({ status }: { status: string }) {
  if (status === REQUIRES_REVIEW) {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
        Under PQNK Review
      </span>
    );
  }
  if (status === EXTERNAL_EVIDENCE) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
        External Evidence
      </span>
    );
  }
  return null;
}

export default function RelatedKnowledgeModule({ domainSlug }: { domainSlug: string }) {
  const label = DOMAIN_LABELS[domainSlug];
  if (!label) return null;

  const items = getRelatedKnowledgeForScience(`/science/${domainSlug}`, papers, getMetadata);
  if (items.length === 0) return null;

  return (
    <Section muted id="related-knowledge">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Related Knowledge</p>
            <h2 className="mt-1 text-2xl font-bold text-primary-dark sm:text-3xl">Related Knowledge Papers</h2>
          </div>
          <Link
            href={`/papers/?domain=${encodeURIComponent(label)}`}
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            View all related Knowledge Papers →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ paper, meta, why }) => {
            const hasBadge = meta.authorityStatus === REQUIRES_REVIEW || meta.authorityStatus === EXTERNAL_EVIDENCE;
            const tags = [...meta.crops.slice(0, 2), ...meta.fieldProblems.slice(0, 1)];
            return (
              <TrackedRelatedLink
                key={paper.slug}
                href={`/papers/${paper.slug}`}
                fromType="science"
                fromId={domainSlug}
                toType="paper"
                toId={paper.slug}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">{why}</p>
                <h3 className="mt-1.5 text-base font-bold text-primary-dark group-hover:text-primary">
                  {paper.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{paper.summary}</p>
                {tags.length > 0 && (
                  <p className="mt-3 text-xs text-ink-soft">{tags.join(" · ")}</p>
                )}
                {hasBadge && (
                  <div className="mt-3">
                    <AuthorityTag status={meta.authorityStatus} />
                  </div>
                )}
              </TrackedRelatedLink>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
