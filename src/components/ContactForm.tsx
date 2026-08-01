"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { trackEnquirySubmitIntent } from "@/lib/analytics";

export default function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEnquirySubmitIntent("contact_form");
    const subject = encodeURIComponent(`Website inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:pedaver@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-bold text-primary-dark">{dict.formTitle}</h2>
      <p className="text-sm text-ink-soft">{dict.formNote}</p>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">{dict.nameLabel}</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-clarity-mask="true"
          className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">{dict.emailFieldLabel}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-clarity-mask="true"
          className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">{dict.messageLabel}</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          data-clarity-mask="true"
          className="w-full rounded-lg border border-border bg-cream px-3 py-2 text-ink outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
      >
        {dict.submitButton}
      </button>
    </form>
  );
}
