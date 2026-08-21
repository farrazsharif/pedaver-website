// The concrete enforcement of the locked knowledge-boundary principle:
//
//   ASK PQNK GENERATED ANSWER ≠ PEDAVER KNOWLEDGE
//
// An answer AI composes from existing PQNK sources (routes/publicApi.ts,
// ai/groundingValidator.ts) is a conversational synthesis only. It is
// never written back into farmer_advisory, never indexed as a new
// knowledge record, and acquires no authority merely because Ask PQNK
// generated it. The ONLY pathway that creates new authoritative Farmer
// Advisory knowledge is:
//
//   Insufficient existing knowledge -> Refer this Question to Pedaver ->
//   Pedaver answers -> Pedaver publishes -> Farmer Advisory record
//   becomes authoritative and immediately searchable by Ask PQNK.
//
// This is enforced structurally, not just by omission:
//   1. No module under ai/ imports db.js — AI code has no mechanism to
//      write to any table, checked by grep in scripts/acceptance-check.ts
//      and true by inspection of every file in ai/.
//   2. routes/inbox.ts's POST /inbox/:id/publish is the ONLY INSERT site
//      for farmer_advisory in the entire service, and it requires an
//      authenticated Pedaver session (auth.ts) — no public or AI-reachable
//      route can create or modify a Farmer Advisory record.
//   3. This function is called at that single insert site, before the
//      INSERT runs, as a defense-in-depth check that doesn't rely on (1)
//      and (2) continuing to hold by accident as the codebase changes.
export const PEDAVER_AUTHOR = "Pedaver" as const;

export interface PublicationCandidate {
  approvedBy: string;
  publicationStatus: string;
  originQueueId: string | null | undefined;
  originReferenceNumber: string | null | undefined;
}

export function assertPedaverAuthoredPublication(record: PublicationCandidate): void {
  if (record.approvedBy !== PEDAVER_AUTHOR) {
    throw new Error(
      `Refusing to publish: approvedBy must be exactly "${PEDAVER_AUTHOR}", got ${JSON.stringify(record.approvedBy)}. ` +
        "ASK PQNK GENERATED ANSWER ≠ PEDAVER KNOWLEDGE — only a Pedaver-authored publish action may create a Farmer Advisory record."
    );
  }
  if (record.publicationStatus !== "Published") {
    throw new Error(`Refusing to publish: publicationStatus must be exactly "Published", got ${JSON.stringify(record.publicationStatus)}.`);
  }
  if (!record.originQueueId || !record.originReferenceNumber) {
    throw new Error(
      "Refusing to publish: a Farmer Advisory record must trace to a referral_queue entry and its reference number. " +
        "There is no anonymous, AI-originated, or freestanding publication path — every published record must be traceable back " +
        "through Refer this Question to Pedaver."
    );
  }
}
