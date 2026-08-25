import { track } from "./track";
import { classifyAiReferrer } from "./aiReferrers";
import type { ContentType, ScrollDepthMilestone, VideoContextType, VideoProgressMilestone, VideoSource } from "./types";

/**
 * Fired once per pathname change (including the first load) by
 * AnalyticsClientRoot. This is the *only* source of page_view events —
 * GA's own automatic pageview is disabled (send_page_view: false in
 * GoogleAnalyticsScripts.tsx) specifically so there is exactly one place
 * responsible for this and nothing to double-fire against.
 */
export function trackPageView(pathname: string) {
  const params: Record<string, string> = {
    page_path: pathname,
    page_location: typeof window !== "undefined" ? window.location.href : pathname,
    page_title: typeof document !== "undefined" ? document.title : "",
  };
  // Only worth checking on arrival from outside the site at all;
  // document.referrer is empty for same-site client-side navigations, so
  // this naturally only fires once per session in practice.
  if (typeof document !== "undefined" && document.referrer) {
    const aiTool = classifyAiReferrer(document.referrer);
    if (aiTool) {
      params.traffic_source_category = "ai_referral";
      params.ai_referrer = aiTool;
    }
  }
  track("page_view", params);
}

/** A paper or crop page being viewed (routed content — has its own URL). */
export function trackContentView(contentType: ContentType, contentId: string, contentTitle: string) {
  track("content_view", { content_type: contentType, content_id: contentId, content_title: contentTitle });
}

export function trackPdfDownload(contentId: string, contentTitle: string, file: string) {
  track("pdf_download", { content_id: contentId, content_title: contentTitle, file });
}

export function trackPaperExternalLinkClick(contentId: string, publisher: string) {
  track("paper_external_link_click", { content_id: contentId, publisher });
}

/**
 * Cross-origin YouTube iframes can't bubble real play/pause events into
 * the parent document without loading YouTube's separate IFrame Player
 * API. This is a focus-detection proxy instead: it tells you the visitor's
 * focus moved into this specific player, not whether they watched to
 * completion. Deliberately named "engage," not "play".
 */
export function trackVideoEngage(videoId: string, contextType: VideoContextType, contextId: string) {
  track("video_engage", {
    source: "youtube_embed" satisfies VideoSource,
    video_id: videoId,
    context_type: contextType,
    context_id: contextId,
  });
}

/** Self-hosted <video> is same-origin, so these are real native media events. */
export function trackVideoPlay(contextType: VideoContextType, contextId: string) {
  track("video_play", { source: "self_hosted" satisfies VideoSource, context_type: contextType, context_id: contextId });
}

export function trackVideoProgress(contextType: VideoContextType, contextId: string, milestone: VideoProgressMilestone) {
  track("video_progress", {
    source: "self_hosted" satisfies VideoSource,
    context_type: contextType,
    context_id: contextId,
    milestone,
  });
}

export function trackVideoComplete(contextType: VideoContextType, contextId: string) {
  track("video_complete", { source: "self_hosted" satisfies VideoSource, context_type: contextType, context_id: contextId });
}

/**
 * ContactForm builds a mailto: link and hands off to the visitor's own
 * email client — there is no real network submission on this static site.
 * This measures "visitor clicked submit and their email client opened,"
 * never "message received." The function intentionally has no parameter
 * for name/email/message: it structurally cannot leak form contents
 * because it never receives them.
 */
export function trackEnquirySubmitIntent(source: "contact_form" | "ask_form") {
  track("enquiry_submit_intent", { source });
}

export function trackLanguageChange(targetLang: string, currentPath: string) {
  track("language_change", { target_lang: targetLang, current_path: currentPath });
}

/**
 * No query text is ever sent, by design — a visitor could type something
 * personal into the search box. Only shape-of-the-search metadata.
 */
export function trackInternalSearch(queryLength: number, resultCount: number) {
  track("internal_search", {
    query_length: queryLength,
    result_count: resultCount,
    has_results: resultCount > 0,
  });
}

export function trackRelatedContentClick(fromType: ContentType, fromId: string, toType: ContentType, toId: string) {
  track("related_content_click", { from_type: fromType, from_id: fromId, to_type: toType, to_id: toId });
}

export function trackExternalChannelClick(destinationLabel: string, destinationHost: string) {
  track("external_channel_click", { destination_label: destinationLabel, destination_host: destinationHost });
}

export function trackScrollDepth(depth: ScrollDepthMilestone, pagePath: string) {
  track("scroll_depth", { depth, page_path: pagePath });
}
