import { sendGTMEvent } from "@next/third-parties/google";

// GA4-recommended event names (generate_lead, etc.) so the events show up
// under the canonical reports without extra config in GA4 / GTM.

declare global {
  interface Window {
    /** Stub queue defined by the OpenAI pixel snippet in the root layout. */
    oaiq?: (...args: unknown[]) => void;
  }
}

/*
 * OpenAI (ChatGPT Ads) conversion.
 *
 * `lead_created` is OpenAI's standard event for this action. Standard events
 * work as conversion goals for campaign optimisation; a custom event would
 * need manual configuration to be usable the same way.
 *
 * Fired only from trackLead() below, which every call site reaches solely
 * inside a success guard. Keeping it here rather than at the call sites is
 * what stops it drifting away from generate_lead.
 *
 * The guard covers two real cases: a server-side import, and the pixel being
 * blocked or not yet initialised. It is not a load-order workaround — the
 * snippet's stub queues calls made before the SDK arrives.
 */
function trackOpenAILead() {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") return;

  window.oaiq("measure", "lead_created", { type: "customer_action" });
}

type LeadSource =
  | "home_quote_form"
  | "chat_pool_quote"
  | "chat_repair_inquiry"
  | "chat_question_inquiry";

export function trackLead(params: {
  source: LeadSource;
  value?: number;
  currency?: string;
}) {
  sendGTMEvent({
    event: "generate_lead",
    lead_source: params.source,
    value: params.value,
    currency: params.currency ?? "USD",
  });

  // Same success path, same guard — the two conversions cannot diverge.
  trackOpenAILead();
}

type ClickSurface =
  | "navbar"
  | "navbar_mobile"
  | "footer"
  | "home_hero"
  | "home_cta"
  | "contact_page"
  | "blog";

export function trackPhoneClick(surface: ClickSurface) {
  sendGTMEvent({ event: "phone_call_click", click_surface: surface });
}

export function trackEmailClick(surface: ClickSurface) {
  sendGTMEvent({ event: "email_click", click_surface: surface });
}
