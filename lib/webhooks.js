/** Client-side webhook endpoints (static export). */
export const ENQUIRY_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL ||
  "https://robinsinghrawat.app.n8n.cloud/webhook-test/df2e8225-8278-4eaa-9bb1-b0c5bb36b83f";

export const SERVICE_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_SERVICE_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL ||
  "https://robinsinghrawat.app.n8n.cloud/webhook-test/df2e8225-8278-4eaa-9bb1-b0c5bb36b83f";

export const ATLAS_WEBHOOK_URL =
  "https://robinsinghrawat.app.n8n.cloud/webhook-test/5f857125-1751-4b67-bc09-5dfe970ace8c";

export const API_CHAT_URL = "/api/chat";
export const API_ENQUIRY_URL = "/api/enquiry";
export const API_START_PROJECT_URL = "/api/start-project";

// In static export mode (e.g. GitHub Pages), API routes don't exist.
export const USE_WEBHOOKS = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
