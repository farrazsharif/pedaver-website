"use client";

import { useEffect, useRef } from "react";

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

// A curated set of Google Translate's supported languages. Urdu, Punjabi,
// Pashto, and Sindhi are pulled into a "Suggested" group up top since most
// PQNK visitors reading in a non-English language will want one of those —
// the full alphabetical list still contains everything below it.
const SUGGESTED: [string, string][] = [
  ["ur", "Urdu"],
  ["pa", "Punjabi"],
  ["ps", "Pashto"],
  ["sd", "Sindhi"],
  ["ar", "Arabic"],
  ["hi", "Hindi"],
  ["zh-CN", "Chinese (Simplified)"],
  ["fr", "French"],
  ["es", "Spanish"],
];

const ALL_LANGUAGES: [string, string][] = [
  ["en", "English"],
  ["af", "Afrikaans"],
  ["sq", "Albanian"],
  ["am", "Amharic"],
  ["ar", "Arabic"],
  ["hy", "Armenian"],
  ["as", "Assamese"],
  ["az", "Azerbaijani"],
  ["eu", "Basque"],
  ["be", "Belarusian"],
  ["bn", "Bengali"],
  ["bs", "Bosnian"],
  ["bg", "Bulgarian"],
  ["ca", "Catalan"],
  ["ny", "Chichewa"],
  ["zh-CN", "Chinese (Simplified)"],
  ["zh-TW", "Chinese (Traditional)"],
  ["co", "Corsican"],
  ["hr", "Croatian"],
  ["cs", "Czech"],
  ["da", "Danish"],
  ["nl", "Dutch"],
  ["eo", "Esperanto"],
  ["et", "Estonian"],
  ["fil", "Filipino"],
  ["fi", "Finnish"],
  ["fr", "French"],
  ["fy", "Frisian"],
  ["gl", "Galician"],
  ["ka", "Georgian"],
  ["de", "German"],
  ["el", "Greek"],
  ["gu", "Gujarati"],
  ["ht", "Haitian Creole"],
  ["ha", "Hausa"],
  ["haw", "Hawaiian"],
  ["he", "Hebrew"],
  ["hi", "Hindi"],
  ["hu", "Hungarian"],
  ["is", "Icelandic"],
  ["ig", "Igbo"],
  ["id", "Indonesian"],
  ["ga", "Irish"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["jw", "Javanese"],
  ["kn", "Kannada"],
  ["kk", "Kazakh"],
  ["km", "Khmer"],
  ["rw", "Kinyarwanda"],
  ["ko", "Korean"],
  ["ku", "Kurdish"],
  ["ky", "Kyrgyz"],
  ["lo", "Lao"],
  ["la", "Latin"],
  ["lv", "Latvian"],
  ["lt", "Lithuanian"],
  ["lb", "Luxembourgish"],
  ["mk", "Macedonian"],
  ["mg", "Malagasy"],
  ["ms", "Malay"],
  ["ml", "Malayalam"],
  ["mt", "Maltese"],
  ["mi", "Maori"],
  ["mr", "Marathi"],
  ["mn", "Mongolian"],
  ["my", "Myanmar (Burmese)"],
  ["ne", "Nepali"],
  ["no", "Norwegian"],
  ["or", "Odia"],
  ["ps", "Pashto"],
  ["fa", "Persian"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["pa", "Punjabi"],
  ["ro", "Romanian"],
  ["ru", "Russian"],
  ["sm", "Samoan"],
  ["gd", "Scots Gaelic"],
  ["sr", "Serbian"],
  ["st", "Sesotho"],
  ["sn", "Shona"],
  ["sd", "Sindhi"],
  ["si", "Sinhala"],
  ["sk", "Slovak"],
  ["sl", "Slovenian"],
  ["so", "Somali"],
  ["es", "Spanish"],
  ["sw", "Swahili"],
  ["sv", "Swedish"],
  ["tg", "Tajik"],
  ["ta", "Tamil"],
  ["te", "Telugu"],
  ["th", "Thai"],
  ["tr", "Turkish"],
  ["uk", "Ukrainian"],
  ["ur", "Urdu"],
  ["uz", "Uzbek"],
  ["vi", "Vietnamese"],
  ["cy", "Welsh"],
  ["xh", "Xhosa"],
  ["yi", "Yiddish"],
  ["yo", "Yoruba"],
  ["zu", "Zulu"],
];

const SUGGESTED_CODES = new Set(SUGGESTED.map(([code]) => code));
const REST = ALL_LANGUAGES.filter(([code]) => !SUGGESTED_CODES.has(code));

/**
 * A compact "translate this page" control.
 *
 * Google's own Website Translator widget (the small "Select Language" box
 * with a search field) opens a giant, unstyled overlay listing every
 * language in a wide grid — that overlay lives in a cross-origin iframe we
 * cannot restyle or make responsive, and it was overflowing the page and
 * effectively burying languages like Urdu below the fold.
 *
 * Instead, we keep Google's translation *engine* (loaded invisibly, off
 * in the corner) but drive it entirely through our own native <select>,
 * with Urdu, Punjabi, Pashto, and Sindhi surfaced at the top. A native
 * select can never overflow the page — the browser handles the long list
 * itself — and we get to keep the site's own visual language for the
 * trigger control.
 */
export default function TranslateWidget() {
  const selectRef = useRef<HTMLSelectElement>(null);

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

  const applyTranslation = (code: string, attempt = 0) => {
    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
      return;
    }
    // Google's script loads async and may not have injected its own
    // <select> yet on a fast click right after page load — retry briefly.
    if (attempt < 10) {
      setTimeout(() => applyTranslation(code, attempt + 1), 300);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (!code) return;
    applyTranslation(code);
    // Reset so the same language can be re-selected later and the control
    // always shows the neutral "Translate" state rather than a raw code.
    if (selectRef.current) selectRef.current.value = "";
  };

  return (
    <div className="relative">
      {/* Google's actual widget: kept mounted so the engine works, but
          visually hidden — this is what powers the native goog-te-combo
          select we drive above. */}
      <div
        id="google_translate_element"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      />

      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream"
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9s1.3-6.5 3.8-9Z" />
        </svg>
      </div>

      <select
        ref={selectRef}
        defaultValue=""
        onChange={handleChange}
        aria-label="Translate this page — click here and select a language"
        title="Translate this page — select a language"
        className="absolute inset-0 h-10 w-10 cursor-pointer appearance-none opacity-0"
      >
        <option value="" disabled>
          Translate this page — select a language
        </option>
        <optgroup label="Suggested">
          {SUGGESTED.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </optgroup>
        <optgroup label="All languages">
          {REST.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
