"use client";

import { useState } from "react";
import { lookupReference, advisoryApiBase, type ReferralStatus } from "./askPqnkClient";

// PEDAVER_REFERRAL_WORKFLOW.md sec 10a: unauthenticated, no account —
// the reference number itself is the access credential.
export default function ReferenceLookup() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<ReferralStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await lookupReference(value.trim());
      setStatus(res);
    } catch {
      setError("No question found with that reference number.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-sm font-semibold text-primary-dark">Check your question</p>
      <form onSubmit={handleLookup} className="mt-2 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="PQNK-Q-XXXXXXXX"
          className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
        />
        <button type="submit" disabled={loading} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-cream disabled:opacity-60">
          {loading ? "…" : "Check"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      {status && (
        <p className="mt-2 text-sm text-ink-soft">
          Status: <span className="font-semibold text-ink">{status.status}</span>
          {status.advisoryUrl && (
            <>
              {" — "}
              <a href={`${advisoryApiBase()}${status.advisoryUrl}`} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                view the published answer
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}
