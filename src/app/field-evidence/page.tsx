import Link from "next/link";
import { fieldEvidence } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import FieldEvidenceBrowser from "./FieldEvidenceBrowser";

export const metadata = buildMetadata({
  title: "Field Evidence Library — What PQNK Farms Actually Show",
  description:
    "A searchable index of farmer testimony and field evidence for PQNK — by farmer, crop, or evidence number. The original videos stay on YouTube and Facebook; Pedaver keeps the record.",
  path: "/field-evidence",
});

export default function FieldEvidencePage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">Field Evidence Library</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            What PQNK farms actually show — farmer testimony and field evidence, indexed and
            searchable. The original videos stay on YouTube and Facebook; this page just helps you
            find them.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-soft">
            Knowledge Papers explain the science. Field Evidence documents what happened in the
            field. <Link href="/papers" className="font-semibold text-primary underline underline-offset-4">See the Knowledge Papers →</Link>
          </p>
        </div>
      </section>

      <Section muted>
        <h2 className="text-center text-xl font-bold text-primary-dark">Find a farmer, a crop, an FE number</h2>
        <p className="mx-auto mt-1 max-w-2xl text-center text-sm text-ink-soft">
          Search by FE number (e.g. FE-002), farmer name, crop, or evidence type.
        </p>
        <div className="mt-6">
          <FieldEvidenceBrowser records={fieldEvidence} />
        </div>
      </Section>
    </div>
  );
}
