/**
 * Best-effort classification of AI assistant referrers. Only catches
 * sessions where the referring tool actually passes a Referer header when
 * a visitor clicks a link — many chat interfaces strip it, and a
 * copy-pasted link carries no referrer at all. This under-counts; it is
 * not a complete picture of AI-driven traffic.
 */
const AI_REFERRER_DOMAINS: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "claude.ai": "claude",
  "perplexity.ai": "perplexity",
  "www.perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "bard.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "www.bing.com": "copilot",
  "you.com": "you",
  "poe.com": "poe",
};

export function classifyAiReferrer(referrerUrl: string): string | null {
  if (!referrerUrl) return null;
  try {
    const host = new URL(referrerUrl).hostname.toLowerCase();
    return AI_REFERRER_DOMAINS[host] ?? null;
  } catch {
    return null;
  }
}
