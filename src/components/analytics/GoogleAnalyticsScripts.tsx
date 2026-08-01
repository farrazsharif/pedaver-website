import Script from "next/script";

/**
 * send_page_view: false turns off GA's own automatic pageview on load —
 * AnalyticsClientRoot is the single source of every page_view event
 * instead, first load included, so there's nothing to double-fire
 * against. anonymize_ip truncates IP before geo-resolution.
 */
export default function GoogleAnalyticsScripts({ gaId }: { gaId?: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false, anonymize_ip: true });`}
      </Script>
    </>
  );
}
