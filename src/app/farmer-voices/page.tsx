import fs from "fs";
import path from "path";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Farmer Voices — Real Messages from PQNK Farmers",
  description:
    "Real messages from farmers practicing PQNK in Pedaver's WhatsApp learning groups, shared as they were sent.",
  path: "/farmer-voices",
});

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function loadVoiceImages(): string[] {
  const dir = path.join(process.cwd(), "public", "farmer-voices");
  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));
  // Newest first — filenames are expected to sort naturally (e.g. by date or
  // add-order); reverse so the most recently added screenshot leads.
  return files.sort().reverse().map((f) => `/farmer-voices/${f}`);
}

export default function FarmerVoicesPage() {
  const images = loadVoiceImages();

  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.farmerVoices.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.farmerVoices.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        {images.length > 0 ? (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {images.map((src) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 block break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img src={src} alt="A farmer's message from a PQNK WhatsApp learning group" className="w-full" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-ink-soft">More farmer messages coming soon.</p>
        )}
      </Section>
    </div>
  );
}
