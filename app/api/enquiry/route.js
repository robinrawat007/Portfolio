import { getEmailConfigError, sendConfirmationEmail } from "@/lib/email";
import { appendToSheet, getGoogleSheetsConfigError } from "@/lib/googleSheets";
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
    // Rate limit: 5 requests per 10 minutes per IP
    const ip = getClientIp(req);
    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return Response.json(
        { error: "Too many submissions. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    const configError = getEmailConfigError();
    if (configError) {
      return Response.json({ error: "Email is not configured", details: configError }, { status: 503 });
    }

    const sheetsError = getGoogleSheetsConfigError();
    if (sheetsError) {
      return Response.json({ error: "Google Sheets is not configured", details: sheetsError }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim().slice(0, MAX_NAME_LENGTH);
    const email = String(body?.email || "").trim().slice(0, MAX_EMAIL_LENGTH);
    const enquiry = String(body?.enquiry || "").trim().slice(0, MAX_ENQUIRY_LENGTH);

    if (!name) return Response.json({ error: "Name is required" }, { status: 400 });
    if (!email || !isValidEmail(email))
      return Response.json({ error: "Valid email is required" }, { status: 400 });
    if (!enquiry) return Response.json({ error: "Enquiry is required" }, { status: 400 });

    await appendToSheet({
      sheetName: process.env.GOOGLE_SHEETS_ENQUIRY_SHEET_NAME || "Enquiry",
      values: [
        new Date().toISOString(),
        name,
        email,
        enquiry,
        "website-enquiry",
      ],
    });

    const subject = "Thanks for your enquiry — Robin Rawat";
    const text = `Thank you for reaching out through my website.

I’ve received your enquiry and will review the details shortly. I’ll get back to you as soon as possible, usually within 24–48 hours.

In the meantime, if your enquiry is urgent, you can also reach me directly at robinrawat37@gmail.com or +91 9416149624.

Thanks again for your interest.

Best regards,
Robin Rawat`;

    await sendConfirmationEmail({
      to: email,
      name,
      subject,
      text,
    });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "Enquiry request failed", details: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

