import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crop Prices: Mandi and Retail Rates in Punjab, Pakistan",
  description:
    "Today's mandi (wholesale) and official retail prices of crops, vegetables and fruits in Punjab markets, price trends over five years and the year's top 10, in English and Urdu. Data from AMIS Punjab.",
  path: "/crop-prices",
});

// A tool, not a main-menu page (author 2026-11-25): linked from the footer, the Resources page and the Ask PQNK page.
// The tool is the AMIS Prices app's web version (public/crop-prices-app), shown in a frame so its styles stay apart
// from the site's. Its data comes from the Pages Function /api/crop-prices (functions/api/crop-prices.js).
export default function CropPricesPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">Crop Prices</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Mandi (wholesale) and official retail rates of crops, vegetables and fruits in the markets of Punjab,
            Pakistan. See today&apos;s rates or any past date, price trends over five years, and the year&apos;s top 10.
            In English and Urdu.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-2 py-8 sm:px-6">
          <iframe
            src="/crop-prices-app/index.html"
            title="Crop Prices: today's prices, price trends and top 10"
            className="block w-full rounded-2xl border border-border bg-card shadow-sm"
            style={{ height: "calc(100dvh - 140px)", minHeight: 560 }}
          />

          <p className="mt-6 rounded-xl border border-border bg-card px-5 py-4 text-sm text-ink-soft">
            <strong className="text-primary-dark">Disclaimer:</strong> The prices are as published by the{" "}
            <a
              href="http://amis.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Agriculture Marketing Information Service (amis.pk)
            </a>
            , Directorate of Agriculture (Economics &amp; Marketing) Punjab, Lahore. Official retail rates are the
            district administrations&apos; notified rates; markets may charge more. These are market prices for
            conventionally grown produce.
          </p>
        </div>
      </section>
    </div>
  );
}
