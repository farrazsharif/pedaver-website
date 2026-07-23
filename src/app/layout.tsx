import type { Metadata } from "next";
import { Bitter, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import dict from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${bitter.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
        <Header dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
