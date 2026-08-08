import dict from "@/lib/dictionaries";
import { getNotesByCategory, type AdvisoryCategorySlug } from "@/lib/content/advisory";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Farmer Advisory — Real PQNK Questions & Answers",
  description:
    "Real questions from Pedaver's PQNK WhatsApp learning groups, and Asif Sharif's answers, organized by topic: adoption, planting, water management, and symptoms.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.advisory.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.advisory.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {dict.advisory.categories.map((category) => {
            const notes = getNotesByCategory(category.slug as AdvisoryCategorySlug);
            return (
              <div
                key={category.slug}
                id={category.slug}
                className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-primary-dark">{category.title}</h2>
                  <span className="rounded-full bg-primary-light/20 px-3 py-1 text-xs font-semibold text-primary-dark">
                    {notes.length} {notes.length === 1 ? "note" : "notes"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{category.body}</p>

                {notes.length === 0 ? (
                  <p className="mt-5 rounded-xl border border-dashed border-border bg-primary-light/5 p-5 text-sm text-ink-soft">
                    {dict.advisory.emptyBody}
                  </p>
                ) : (
                  <ul className="mt-5 flex flex-col gap-3">
                    {notes.map((note) => (
                      <li key={note.id} className="rounded-xl border border-border bg-background p-4">
                        <p className="font-semibold text-primary-dark">{note.question}</p>
                        {note.answerSummary && (
                          <p className="mt-1 text-sm text-ink-soft">{note.answerSummary}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
