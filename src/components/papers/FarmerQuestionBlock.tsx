import type { FarmerQuestionOrigin } from "@/lib/content/knowledge/farmerQuestions";

// Distinct visual treatment reserved for the small, verified set of
// Knowledge Papers that genuinely originated from a real farmer's
// question (see farmerQuestions.ts). Never applied generically — most
// papers carry no entry here and render nothing from this component.
export default function FarmerQuestionBlock({ origin }: { origin: FarmerQuestionOrigin }) {
  return (
    <div className="border-b border-accent/30 bg-accent/5">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Farmer Question</p>
        <p className="mt-2 text-xl font-semibold text-primary-dark">&ldquo;{origin.question}&rdquo;</p>
        <p className="mt-2 text-sm text-ink-soft">
          — {origin.attribution}. Preserved here as Pedaver&rsquo;s own account of the question, not a
          verbatim quotation.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">Pedaver&rsquo;s Answer</p>
      </div>
    </div>
  );
}
