import Link from "next/link";
import dict from "@/lib/dictionaries";
import { farmerStories } from "@/lib/content/farmers";
import Section from "@/components/Section";

export default function FarmerStoriesPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.farmerStories.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.farmerStories.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {farmerStories.map((farmer) => (
            <div key={farmer.name} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-lg italic leading-relaxed text-ink">“{farmer.quote}”</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-bold text-primary-dark">{farmer.name}</p>
                <p className="text-sm text-ink-soft">
                  {farmer.role}
                  {farmer.location ? ` · ${farmer.location}` : ""}
                </p>
                {farmer.cropSlug && (
                  <Link
                    href={`/crops/${farmer.cropSlug}`}
                    className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    {dict.farmerStories.viewCrop} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
