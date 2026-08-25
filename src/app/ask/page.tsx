import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

// Human advisory, not an AI/chatbot system: this form opens the visitor's
// own email client (see ContactForm) — a person on Pedaver's team reads
// and answers. Reuses the same mailto mechanism as /contact, just framed
// as a direct question rather than a general inquiry.
export const metadata = buildMetadata({
  title: "Ask Pedaver — Send Us Your PQNK Question",
  description:
    "Have a specific question about PQNK for your crop, region or farm? Write to us — a real person on our team reads and answers every question personally.",
  path: "/ask",
});

export default function AskPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.ask.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.ask.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-xl">
          <ContactForm dict={dict.ask} subjectPrefix="Question via Ask" trackingId="ask_form" />
          <p className="mt-6 text-center text-sm text-ink-soft">
            Looking for general contact details instead?{" "}
            <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
              Visit Contact →
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
