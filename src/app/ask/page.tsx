import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import AskPqnkChat from "@/components/AskPqnkChat";
import { askPqnk } from "@/lib/content/askPqnk";
import { buildMetadata } from "@/lib/seo";

// Ask PQNK: the PQNK assistant (developer's n8n workflow, answering only from pedaver.com), built into
// the page (no floating chat button on other pages, author's decision), plus WhatsApp and a link to
// write to a person. Endpoint and WhatsApp link live in src/lib/content/askPqnk.ts.
export const metadata = buildMetadata({
  title: "Ask PQNK — Questions Answered from the PQNK Knowledge",
  description:
    "Ask any question about PQNK for your crop, soil, water or farm. Answers come from the PQNK book, Knowledge Papers and field evidence published on pedaver.com.",
  path: "/ask",
});

export default function AskPage() {
  const a = dict.ask;
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{a.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{a.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <AskPqnkChat labels={a} />
          <p className="mt-3 text-xs text-ink-soft">{a.privacyNote}</p>

          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-semibold text-primary-dark">{a.whatsappTitle}</p>
              <p className="text-sm text-ink-soft">{a.whatsappText}</p>
            </div>
            <a
              href={askPqnk.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              {a.whatsappButton}
            </a>
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft">
            {a.emailPrompt}{" "}
            <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
              {a.emailLink} →
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
