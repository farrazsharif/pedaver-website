"use client";

import { useState } from "react";
import { trackNewsletterSignupIntent } from "@/lib/analytics";

export default function NewsletterForm({
  namePlaceholder,
  placeholder,
  consentLabel,
  buttonLabel,
}: {
  namePlaceholder: string;
  placeholder: string;
  consentLabel: string;
  buttonLabel: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackNewsletterSignupIntent();
    const subject = encodeURIComponent("Add me to PQNK updates");
    const body = encodeURIComponent(`Please add me to PQNK updates.\n\nName: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:pedaver@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl text-start">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={namePlaceholder}
          data-clarity-mask="true"
          className="w-full rounded-full border border-cream/30 bg-cream/10 px-5 py-3 text-sm text-cream placeholder:text-cream/60 outline-none focus:border-cream/70"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          data-clarity-mask="true"
          className="w-full rounded-full border border-cream/30 bg-cream/10 px-5 py-3 text-sm text-cream placeholder:text-cream/60 outline-none focus:border-cream/70"
        />
      </div>
      <label className="mt-4 flex items-start gap-2 text-sm text-cream/80">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-accent" />
        <span>{consentLabel}</span>
      </label>
      <button
        type="submit"
        className="mt-4 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-ink transition hover:bg-accent-light"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
