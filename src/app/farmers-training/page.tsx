import Link from "next/link";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { trainingSessions } from "@/lib/content/farmersTraining";

export const metadata = buildMetadata({
  title: "PQNK Farmers Training: Asif Sharif's Training Sessions with English Transcripts",
  description:
    "Asif Sharif's PQNK training sessions for farmers, in Urdu, with practical field examples. Each session has the video and an English transcript, with time marks, Read Aloud and Translate for any language.",
  path: "/farmers-training",
});

// Added 2026-11-27 (author: "Farmers Training" as its own section). Not in the header menu; linked from the footer,
// the Videos and Video Library pages and the Resources page. Sessions are listed by their number.
export default function FarmersTrainingPage() {
  const sessions = [...trainingSessions].sort((a, b) =>
    a.number.localeCompare(b.number, undefined, { numeric: true })
  );
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">PQNK Farmers Training</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            Asif Sharif&apos;s training sessions for farmers, in the language of the field, with practical examples. Each session has
            the video, in Urdu, and an English transcript you can listen to or translate into your own language.
          </p>
        </div>
      </section>

      <Section>
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {sessions.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/farmers-training/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Session {s.number}</p>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-primary-dark group-hover:text-primary">{s.title}</h2>
                  <p className="mt-2 line-clamp-4 text-sm text-ink-soft">{s.summary}</p>
                  <p className="mt-auto pt-4 text-sm font-semibold text-primary">Watch and read the transcript →</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
