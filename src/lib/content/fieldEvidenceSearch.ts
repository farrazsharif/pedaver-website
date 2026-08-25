import type { FieldEvidence } from "./fieldEvidence";
import { parseFeQuery } from "./fieldEvidence";

/**
 * Deliberately simple substring search, not the concept/synonym engine built
 * for Knowledge Papers (knowledge/search.ts) — that engine exists to match
 * natural-language farmer questions onto scientific taxonomy. Field
 * Evidence search is a direct lookup across known, structured fields (FE
 * number, farmer, crop, location, evidence type, title, tags, summary), so
 * a straightforward match is both correct and, unlike a synonym index,
 * trivial to keep fast at thousands of records without a build step.
 */
export function searchFieldEvidence(records: FieldEvidence[], query: string): FieldEvidence[] {
  const q = query.trim();
  if (!q) return records;

  const feLookup = parseFeQuery(q);
  if (feLookup !== null) {
    const hit = records.find((r) => r.feNumber === feLookup);
    return hit ? [hit] : [];
  }

  const needle = q.toLowerCase();
  return records.filter((r) => {
    const haystack = [
      r.title,
      r.farmer,
      r.cropName,
      r.cropSlug,
      r.location,
      r.district,
      r.province,
      r.country,
      r.evidenceType,
      r.summary,
      ...(r.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
