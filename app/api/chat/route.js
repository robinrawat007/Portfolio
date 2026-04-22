import Anthropic from "@anthropic-ai/sdk";
import { searchKnowledgeBase, formatRagContext } from "@/lib/rag";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_INPUT_LENGTH = 2000;

function toPlainText(messages) {
  // Keep the payload flexible: accept either {message} or a {messages:[...]} array.
  if (typeof messages === "string") return messages;
  if (!Array.isArray(messages)) return "";
  const lastUser = [...messages].reverse().find((m) => m?.role === "user" && typeof m?.content === "string");
  return lastUser?.content ?? "";
}

export async function POST(req) {
  try {
    // Rate limit: 20 requests per minute per IP
    const ip = getClientIp(req);
    if (!checkRateLimit(ip, 20, 60 * 1000)) {
      return Response.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json().catch(() => ({}));

    const userText =
      typeof body?.message === "string"
        ? body.message
        : toPlainText(body?.messages);

    if (!userText?.trim()) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    if (userText.length > MAX_INPUT_LENGTH) {
      return Response.json(
        { error: `Message too long (max ${MAX_INPUT_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Atlas is not configured", details: "Missing ANTHROPIC_API_KEY" },
        { status: 503 }
      );
    }

    const topChunks = await searchKnowledgeBase(userText, 3);
    console.log(`[Atlas] chunks: ${topChunks.length} | ids: ${topChunks.map(c => c.id).join(', ')}`);
    const ragContext = formatRagContext(topChunks);
    const hasContext = Boolean(topChunks?.length);

    const system = [
      "You are Atlas, Robin’s AI assistant on his portfolio website.",
      "FORMATTING RULES (strictly follow these):",
      "- Never use markdown formatting: no **, no *, no #, no bullet points (- or •), no numbered lists, no headers.",
      "- Write in plain, natural conversational prose only.",
      "- Do not structure answers as lists. Weave information into sentences.",
      "- Keep answers short — 2 to 4 sentences unless the user asks for more detail.",
      "Behavior guidelines:",
      "1) Be concise, smart, and professional.",
      "2) Answer like a knowledgeable assistant, not a generic chatbot.",
      "3) If asked about Robin’s skills, projects, or experience, give a brief prose summary grounded in the context.",
      "4) Encourage meaningful actions when appropriate: viewing projects, connecting on LinkedIn, sending an enquiry.",
      "5) If a recruiter visits, highlight Robin’s experience, tech stack, and value in plain sentences.",
      "6) If a developer visits, explain technical details at a practical level without lists.",
      "7) If asked unrelated questions, politely steer back to Robin’s work.",
      "8) Never fabricate information. If unsure, say you don’t have that info yet.",
      "9) Maintain a friendly but professional tone.",
      "If you use the provided context, prefer it over general knowledge.",
      "If the user asks for a drawback, weakness, or ‘one bad thing’ about Robin, respond diplomatically in plain prose: one factual growth area framed as a trade-off, no harsh language, end with a strength.",
      hasContext
        ? "Use the context below when relevant."
        : "No relevant knowledge base context was found. Answer using general knowledge, and explicitly mention it's a general response (not grounded in Robin's knowledge base).",
      "",
      hasContext ? "Context:\n" + ragContext : "",
    ]
      .filter(Boolean)
      .join("\n");

    const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
    const client = new Anthropic({ apiKey });

    // Return plaintext (client can still read it as a stream).
    // This avoids “200 with empty body” when streaming events change across SDK versions.
    let text = "";
    try {
      const msg = await client.messages.create({
        model,
        max_tokens: 700,
        temperature: 0.4,
        system,
        messages: [{ role: "user", content: userText }],
      });
      text = Array.isArray(msg?.content)
        ? msg.content
            .filter((c) => c?.type === "text" && typeof c?.text === "string")
            .map((c) => c.text)
            .join("")
        : "";
    } catch (e) {
      return Response.json(
        { error: "Chat provider error", details: e?.message || "Unknown error" },
        { status: 502 }
      );
    }

    if (!text.trim()) {
      return Response.json(
        { error: "Empty reply from provider" },
        { status: 502 }
      );
    }

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return Response.json(
      { error: "Chat request failed", details: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

