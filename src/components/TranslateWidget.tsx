"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              layout?: number;
              autoDisplay?: boolean;
            },
            containerId: string
          ): unknown;
          InlineLayout: { SIMPLE: number };
        };
      };
    };
  }
}

/**
 * A lightweight, on-page "translate this site" control.
 *
 * Uses Google's free Website Translator widget: it rewrites the DOM into
 * whichever language the visitor picks, client-side, with no build step or
 * per-language content to maintain. Quality is machine-translation grade —
 * good for making the site broadly accessible to any world visitor, but not
 * a substitute for a proper hand-translated version of priority languages
 * (e.g. Urdu), which should carry PQNK's own vocabulary deliberately rather
 * than however generic MT happens to render it.
 */
export default function TranslateWidget() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="translate-widget flex h-10 items-center rounded-full border border-white/20 px-2 text-xs text-cream/80"
      aria-label="Translate this site"
    />
  );
}
