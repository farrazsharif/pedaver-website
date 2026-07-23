import dict from "@/lib/dictionaries";
import Section from "@/components/Section";

export default function FounderPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr]">
          <div className="mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-cream shadow-sm lg:mx-0">
            <img
              src="/images/asif-sharif.png"
              alt="Asif Sharif, Founder Chairman of Pedaver"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-primary-dark">{dict.founder.pageTitle}</h1>
            <p className="mt-2 text-lg font-medium text-accent">{dict.founder.pageSubtitle}</p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft lg:mx-0">
              {dict.founder.intro}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {dict.founder.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-primary-dark">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <img
              src="/images/asif-sharif-meeting.jpg"
              alt="Asif Sharif in a meeting with government officials on agricultural policy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-ink-soft">
            Asif Sharif has taken PQNK and One Acre Prosperity to national policy forums.
          </figcaption>
        </figure>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-2xl border-l-4 border-accent pl-6 text-xl italic leading-relaxed text-ink">
          {dict.founder.closingQuote}
        </blockquote>
      </Section>
    </div>
  );
}
