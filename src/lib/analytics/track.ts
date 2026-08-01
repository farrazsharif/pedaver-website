import { gtagPush } from "./gtag";
import { clarityPush } from "./clarity";

/**
 * The single fan-out point: every typed event function in events.ts calls
 * this, and this is the only place that knows both GA4 and Clarity exist.
 * Adding a third provider later means editing this one function, not every
 * call site.
 */
export function track(eventName: string, params: Record<string, string | number | boolean> = {}) {
  gtagPush("event", eventName, params);
  // Clarity's own "custom tags" concept doesn't take arbitrary parameter
  // objects the way GA4 does — set each param as a tag, and separately log
  // the event name so it appears in Clarity's event timeline.
  clarityPush("event", eventName);
  Object.entries(params).forEach(([key, value]) => {
    clarityPush("set", key, String(value));
  });
}
