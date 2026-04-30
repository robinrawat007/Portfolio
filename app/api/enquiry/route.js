import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_ENQUIRY_LENGTH = 3000;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Too many submissions. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim().slice(0, MAX_NAME_LENGTH);
    const email = String(body?.email || "").trim().slice(0, MAX_EMAIL_LENGTH);
    const enquiry = String(body?.enquiry || "").trim().slice(0, MAX_ENQUIRY_LENGTH);

    if (!name) return Response.json({ error: "Name is required" }, { status: 400 });
    if (!email || !isValidEmail(email))
      return Response.json({ error: "Valid email is required" }, { status: 400 });
    if (!enquiry) return Response.json({ error: "Enquiry is required" }, { status: 400 });

    const webhookUrl = process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL;
    if (!webhookUrl) {
      return Response.json({ error: "Enquiry webhook not configured" }, { status: 503 });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, enquiry, source: "website-enquiry", submittedAt: new Date().toISOString() }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => res.status);
      throw new Error(`Webhook responded ${res.status}: ${detail}`);
    }

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "Enquiry request failed", details: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
