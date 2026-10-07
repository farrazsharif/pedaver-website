"use client";

import { useEffect, useState } from "react";

/**
 * 2026-10-07: farmers read papers and chapters through Translate (Google's proxy, *.translate.goog) and want to keep
 * the translated text. The English "Download PDF" buttons always give the English file, so on a translated page this
 * shows a prominent button at the top of the article that saves the page as shown (in the reader's language) through
 * the browser's print / Save as PDF. Header, footer and buttons are left out of the copy by the print styles.
 * Renders nothing on pedaver.com itself.
 */
export default function TranslatedPageDownload() {
  const [translated, setTranslated] = useState(false);
  useEffect(() => {
    setTranslated(window.location.hostname.endsWith(".translate.goog"));
  }, []);
  if (!translated) return null;
  return (
    <div className="no-print mx-auto mb-8 max-w-4xl">
      <button
        type="button"
        onClick={() => window.print()}
        className="w-full rounded-full bg-accent px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        Download this page in your language (PDF)
      </button>
    </div>
  );
}
