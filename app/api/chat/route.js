import OpenAI from "openai";
import { searchKnowledgeBase, formatRagContext } from "@/lib/rag";

export const runtime = "nodejs";

function toPlainText(messages) {
  // Keep the payload flexible: accept either {message} or a {messages:[...]} array.
  if (typeof messages === "string") return messages;
  if (!Array.isArray(messages)) return "";
  const lastUser = [...messages].reverse().find((m) => m?.role === "user" && typeof m?.content === "string");
  return lastUser?.content ?? "";
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));

    const userText =
      typeof body?.message === "string"
        ? body.message
        : toPlainText(body?.messages);

    if (!userText?.trim()) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Atlas is not configured", details: "Missing GROQ_API_KEY" },
        { status: 503 }
      );
    }

    const topChunks = await searchKnowledgeBase(userText, 3);
    const ragContext = formatRagContext(topChunks);
    const hasContext = Boolean(topChunks?.length);

    const system = [
      "You are Atlas, Robin's AI assistant on his portfolio website.",
      "Behavior guidelines:",
      "1) Be concise, smart, and professional.",
      "2) Answer like a knowledgeable assistant, not a generic chatbot.",
      "3) If asked about Robin’s skills, projects, or experience, provide clear summaries grounded in the context.",
      "4) Encourage meaningful actions when appropriate: viewing projects, connecting on LinkedIn, sending an enquiry, discussing opportunities.",
      "5) If a recruiter visits, prioritize highlighting Robin's experience, tech stack, and value.",
      "6) If a developer visits, explain technical details and architecture at a practical level.",
      "7) If asked unrelated questions, politely steer the conversation back to Robin’s work or expertise.",
      "8) Never fabricate information. If unsure, say you don’t have that information yet.",
      "9) Keep answers short unless the user asks for deeper detail.",
      "10) Maintain a friendly but professional tone.",
      "Be concise, helpful, and accurate.",
      "If you use the provided context, prefer it over general knowledge.",
      "If the user asks for a drawback, weakness, or 'one bad thing' about Robin, respond diplomatically: give a single, factual growth area framed as a trade-off, avoid harsh language, and end with a reassuring strength. Do not invent serious negatives.",
      hasContext
        ? "Use the context below when relevant."
        : "No relevant knowledge base context was found. Answer using general knowledge, and explicitly mention it's a general response (not grounded in Robin's knowledge base).",
      "",
      hasContext ? "Context:\n" + ragContext : "",
    ]
      .filter(Boolean)
      .join("\n");

    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    let upstreamStream;
    try {
      upstreamStream = await client.chat.completions.create({
        model,
        temperature: 0.4,
        max_tokens: 700,
        stream: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: userText },
        ],
      });
    } catch (e) {
      return Response.json(
        { error: "Chat provider error", details: e?.message || "Unknown error" },
        { status: 502 }
      );
    }

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          let gotAny = false;
          for await (const part of upstreamStream) {
            const delta = part?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta.length > 0) {
              gotAny = true;
              controller.enqueue(encoder.encode(delta));
            }
          }

          // Fallback: some OpenAI-compatible providers may not stream deltas consistently.
          if (!gotAny) {
            const completion = await client.chat.completions.create({
              model,
              temperature: 0.4,
              max_tokens: 700,
              stream: false,
              messages: [
                { role: "system", content: system },
                { role: "user", content: userText },
              ],
            });
            const text = completion?.choices?.[0]?.message?.content;
            if (typeof text === "string" && text.length > 0) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          // Best-effort: close stream; client will show partial response.
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
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

