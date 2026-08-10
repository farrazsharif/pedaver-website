import type { Metadata, Viewport } from "next";
import { Bitter, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import dict from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalyticsScripts from "@/components/analytics/GoogleAnalyticsScripts";
import ClarityScript from "@/components/analytics/ClarityScript";
import AnalyticsClientRoot from "@/components/analytics/AnalyticsClientRoot";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

// Display: a grounded slab serif for headings. Body: a warm humanist sans.
const bitter = Bitter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${dict.meta.siteName} — PQNK`,
  description: dict.meta.tagline,
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
  appleWebApp: {
    title: "Pedaver — PQNK",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#2f5233",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/pedaver-logo-glow.png`,
  description: dict.meta.tagline,
  founder: {
    "@type": "Person",
    name: "Asif Sharif",
  },
  sameAs: [
    "https://www.facebook.com/Pedaver",
    "https://www.youtube.com/@pedaverpqnk3167/videos",
    "https://www.youtube.com/@aasifsharif",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${bitter.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
        <GoogleAnalyticsScripts gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <ClarityScript projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
        <AnalyticsClientRoot />
      </body>
    </html>
  );
}
