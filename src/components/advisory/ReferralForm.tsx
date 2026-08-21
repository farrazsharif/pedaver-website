"use client";

import { useState } from "react";
import { referToPedaver } from "./askPqnkClient";

// PEDAVER_REFERRAL_WORKFLOW.md sec 4/11: minimal form, question already
// carried forward (never retyped), optional context/contact only, no
// account, no GPS, no financial/personal fields beyond simple contact.
export default function ReferralForm({ question, onDone }: { question: string; onDone: (referenceNumber: string, message: string) => void }) {
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [fieldCondition, setFieldCondition] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await referToPedaver({
        question,
        crop: crop || undefined,
        region: region || undefined,
        fieldCondition: fieldCondition || undefined,
        name: name || undefined,
        whatsapp: whatsapp || undefined,
        email: email || undefined,
      });
      onDone(result.referenceNumber, result.message);
    } catch {
      setError("Something went wrong submitting your question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-background p-4">
      <p className="text-sm font-semibold text-primary-dark">Add anything that would help Pedaver answer (all optional)</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="Crop"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        />
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Region / district"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        />
      </div>
      <textarea
        value={fieldCondition}
        onChange={(e) => setFieldCondition(e.target.value)}
        placeholder="Field condition or anything else useful to know"
        className="min-h-20 rounded-lg border border-border bg-card px-3 py-2 text-sm"
      />
      <p className="mt-1 text-xs font-semibold text-ink-soft">Optional — so Pedaver or Ask PQNK can reach you directly</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-border bg-card px-3 py-2 text-sm" />
        <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp" className="rounded-lg border border-border bg-card px-3 py-2 text-sm" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-border bg-card px-3 py-2 text-sm" />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 self-start rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-cream disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Refer this Question to Pedaver →"}
      </button>
    </form>
  );
}
