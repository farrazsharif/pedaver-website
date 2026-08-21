"use client";

import { useEffect, useState } from "react";
import { fetchAdvisories, type AdvisoryListItem } from "./askPqnkClient";

// ASK_PQNK_UI_ARCHITECTURE.md sec 3: the "Browse Existing Farmer Advisory"
// zone — supersedes the old empty AdvisoryNote category list, fetched live
// from the backend so a newly published record appears immediately with no
// site rebuild (ASK_PQNK_V1_IMPLEMENTATION_SPEC.md sec 6).
export default function AdvisoryBrowse() {
  const [records, setRecords] = useState<AdvisoryListItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAdvisories()
      .then(setRecords)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="text-sm text-ink-soft">Farmer Advisory knowledge is temporarily unavailable — please try again shortly.</p>;
  }

  if (!records) {
    return <p className="text-sm text-ink-soft">Loading published advisories…</p>;
  }

  if (records.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-primary-light/5 p-5 text-sm text-ink-soft">
        No Farmer Advisory questions have been published yet. Ask PQNK a question above — if Pedaver needs to answer it, it will appear here once published.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {records.map((r) => {
        const crops: string[] = JSON.parse(r.crops || "[]");
        const problems: string[] = JSON.parse(r.problems || "[]");
        return (
          <li key={r.id} className="rounded-xl border border-border bg-background p-4">
            <p className="font-semibold text-primary-dark">{r.canonical_question}</p>
            <p className="mt-1 text-sm text-ink-soft">{r.short_answer}</p>
            {(crops.length > 0 || problems.length > 0) && (
              <p className="mt-2 text-xs text-ink-soft">{[...crops, ...problems].slice(0, 3).join(" · ")}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
