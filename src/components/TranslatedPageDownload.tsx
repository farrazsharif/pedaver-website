/**
 * 2026-10-07: farmers read papers and chapters through Translate (Google's proxy, *.translate.goog) and want to keep
 * the translated text. The English "Download PDF" buttons always give the English file, so on a translated page this
 * shows a prominent button at the top of the article that saves the page as shown (in the reader's language) through
 * the browser's print / Save as PDF. It works without React: on the proxy the site's scripts are deliberately not
 * started (see the early script in app/layout.tsx), so the button is shown by CSS (html[data-translated]) and handled
 * by that script's click listener ([data-print-page]). Hidden on pedaver.com itself.
 */
export default function TranslatedPageDownload() {
  return (
    <div className="translated-only no-print mx-auto mb-8 max-w-4xl">
      <button
        type="button"
        data-print-page=""
        className="w-full rounded-full bg-accent px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        Download this page in your language (PDF)
      </button>
    </div>
  );
}
