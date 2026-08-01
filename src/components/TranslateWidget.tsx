"use client";

import { useRef } from "react";
import { SITE_URL } from "@/lib/seo";
import { trackLanguageChange } from "@/lib/analytics";

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
 * Google's embeddable Website Translator widget (the in-page "select a
 * language and watch the DOM swap" gadget) depends on third-party
 * cookies/storage from Google's translate domains, which modern browsers
 * now block by default — the widget silently no-ops instead of erroring.
 * Google's separate translate.google.com proxy page has no such
 * dependency, so instead of driving the broken in-page widget, this
 * control opens that proxy page in a new tab, pointed at the current
 * article.
 *
 * The Urdu, Punjabi, Pashto, and Sindhi are pulled into a "Suggested"
 * group up top since most PQNK visitors reading in a non-English language
 * will want one of those — the full alphabetical list still contains
 * everything below it. A native <select> can never overflow the page —
 * the browser handles the long list itself.
 */
export default function TranslateWidget() {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (!code) return;
    trackLanguageChange(code, window.location.pathname);
    const currentPath = window.location.pathname + window.location.search;
    const targetUrl = `${SITE_URL}${currentPath}`;
    const translateUrl = `https://translate.google.com/translate?sl=en&tl=${encodeURIComponent(code)}&u=${encodeURIComponent(targetUrl)}`;
    window.open(translateUrl, "_blank", "noopener,noreferrer");
    // Reset so the same language can be re-selected later and the control
    // always shows the neutral "Translate" state rather than a raw code.
    if (selectRef.current) selectRef.current.value = "";
  };

  return (
    <div className="relative">
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
        aria-label="Translate this page — opens in a new tab"
        title="Translate this page — opens in a new tab"
        className="absolute inset-0 h-10 w-10 cursor-pointer appearance-none opacity-0"
      >
        <option value="" disabled>
          Translate this page (opens in a new tab)
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
