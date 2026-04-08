import nodemailer from "nodemailer";

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getTransporter() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function getEmailConfigError() {
  try {
    // Validate env presence/shape without sending.
    requiredEnv("SMTP_HOST");
    const port = Number(requiredEnv("SMTP_PORT"));
    if (!Number.isFinite(port) || port <= 0) return "Invalid SMTP_PORT";
    requiredEnv("SMTP_USER");
    requiredEnv("SMTP_PASS");
    return null;
  } catch (e) {
    return e?.message || "Email is not configured";
  }
}

export async function sendConfirmationEmail({ to, name, text, subject }) {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  if (!from) throw new Error("Missing EMAIL_FROM (or SMTP_USER)");

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
}

