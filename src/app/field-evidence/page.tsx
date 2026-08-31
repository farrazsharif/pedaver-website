import Link from "next/link";
import { fieldEvidence } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import TrackedExternalChannelLink from "@/components/analytics/TrackedExternalChannelLink";
import { buildMetadata } from "@/lib/seo";
import FieldEvidenceBrowser from "./FieldEvidenceBrowser";

// User-facing name is "Knowledge Exchange" (renamed 2026-08-25 from "Field
// Evidence Library" — broadened umbrella covering Q&A, Advisory, Farmer
// Testimony and Field Evidence, see fieldEvidence.ts). The route stays
// permanently at /field-evidence: this is a deliberate, settled decision,
// not a placeholder — "Knowledge Exchange" is the broader user-facing
// section name, while /field-evidence remains the correct, stable
// technical URL for the indexed FE-numbered collection specifically. No
// redirect or URL migration is planned.
export const metadata = buildMetadata({
  title: "Knowledge Exchange — What PQNK Farms Actually Show",
  description:
    "A searchable index of farmer testimony, Q&A, advisory notes and field evidence for PQNK — by farmer, crop, or evidence number. The original videos stay on YouTube and Facebook; Pedaver keeps the record.",
  path: "/field-evidence",
});

export default function FieldEvidencePage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">Knowledge Exchange</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            What PQNK farms actually show — questions and answers, advisory notes, farmer
            testimony and field evidence, indexed and searchable. The original videos stay on
            YouTube and Facebook; this page just helps you find them.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-soft">
            Knowledge Papers explain the science. Knowledge Exchange documents what happened in
            the field. <Link href="/papers" className="font-semibold text-primary underline underline-offset-4">See the Knowledge Papers →</Link>
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold text-primary-dark">Explore the Complete Knowledge Exchange</h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-ink-soft">
            The cards below present a selected and indexed sample of farmer testimonies, field
            evidence, questions, advisory discussions and practical experiences with PQNK.
          </p>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-ink-soft">
            Pedaver&rsquo;s knowledge exchange with farmers has developed over many years and
            includes a much larger collection of field videos, farmer experiences, discussions and
            practical observations. The extended collection remains available through our public
            video channels.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <TrackedExternalChannelLink
              href="https://www.facebook.com/Pedaver"
              label="Facebook — Pedaver"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Facebook — Pedaver →
            </TrackedExternalChannelLink>
            <TrackedExternalChannelLink
              href="https://www.youtube.com/@pedaverpqnk3167/videos"
              label="YouTube — Pedaver PQNK"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              YouTube — Pedaver PQNK →
            </TrackedExternalChannelLink>
            <TrackedExternalChannelLink
              href="http://www.youtube.com/@aasifsharif"
              label="YouTube — Asif Sharif"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              YouTube — Asif Sharif →
            </TrackedExternalChannelLink>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-xs text-ink-soft">
            New selected evidence will continue to be indexed here with permanent FE numbers,
            while the original video collections remain on their source platforms.
          </p>
        </div>
      </Section>

      <Section muted>
        <h2 className="text-center text-xl font-bold text-primary-dark">Find a crop, an FE number</h2>
        <p className="mx-auto mt-1 max-w-2xl text-center text-sm text-ink-soft">
          Search by FE number, crop, topic, evidence type, or keywords.
        </p>
        <div className="mt-6">
          <FieldEvidenceBrowser records={fieldEvidence} />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-lg font-bold text-primary-dark">More From Pedaver&rsquo;s Knowledge Exchange</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
            Related material not yet folded into the FE-numbered index above.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {/* Farmer Advisory link hidden until the four PQNK books are
                published — the /advisory route is de-registered
                (src/app/_advisory) until then. */}
            <Link
              href="/farmer-voices"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Farmer Voices →
            </Link>
            <Link
              href="/video-library"
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Video Library →
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
