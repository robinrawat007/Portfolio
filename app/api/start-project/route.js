import { getEmailConfigError, sendConfirmationEmail } from "@/lib/email";
import { appendToSheet, getGoogleSheetsConfigError } from "@/lib/googleSheets";

export const runtime = "nodejs";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export async function POST(req) {
  try {
    const configError = getEmailConfigError();
    if (configError) {
      return Response.json({ error: "Email is not configured", details: configError }, { status: 503 });
    }

    const sheetsError = getGoogleSheetsConfigError();
    if (sheetsError) {
      return Response.json({ error: "Google Sheets is not configured", details: sheetsError }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const services = Array.isArray(body?.services) ? body.services.map((s) => String(s)) : [];
    const budget = String(body?.budget || "").trim();
    const message = String(body?.message || "").trim();

    if (!name) return Response.json({ error: "Name is required" }, { status: 400 });
    if (!email || !isValidEmail(email))
      return Response.json({ error: "Valid email is required" }, { status: 400 });

    await appendToSheet({
      sheetName: process.env.GOOGLE_SHEETS_SERVICE_SHEET_NAME || "Service",
      values: [
        new Date().toISOString(),
        name,
        email,
        phone || "",
        services.join(", "),
        budget || "",
        message || "",
        "website-start-project",
      ],
    });

    const subject = "Project enquiry received — Robin Rawat";
    const text = `Hi,

Thanks for reaching out and sharing details about your project.

I’ve received your enquiry regarding the services you’re interested in. I’ll review the information you submitted (including project details and budget range) and get back to you shortly to discuss the next steps.

If your project is time-sensitive or you’d like to share additional details, feel free to reply directly to this email.

Looking forward to learning more about your project.

Best regards,
Robin Rawat
Frontend Developer | AI Interfaces & Automation

📧 robinrawat37@gmail.com
📞 +91 9416149624
🔗 https://www.linkedin.com/in/robinrawat1/`;

    await sendConfirmationEmail({
      to: email,
      name,
      subject,
      text,
    });

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: "Start-project request failed", details: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

