declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes directly to window.dataLayer rather than calling window.gtag(...).
 * gtag.js drains this array once it finishes loading, so calls made before
 * the script has loaded (or if it never loads, e.g. blocked by an ad
 * blocker) are never lost or throw — there's nothing to race against.
 */
export function gtagPush(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}
