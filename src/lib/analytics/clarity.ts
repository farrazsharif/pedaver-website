declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Clarity's own bootstrap snippet installs window.clarity as a
 * queue-then-drain function from the moment it runs (before the real
 * script has loaded), so calling it directly is always safe once the
 * inline snippet in ClarityScript.tsx has executed.
 */
export function clarityPush(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  window.clarity(...args);
}
