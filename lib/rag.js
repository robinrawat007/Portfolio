import { createServerSupabase } from "@/lib/supabase";
import { embed } from "@/lib/voyage";
import fs from "node:fs/promises";
import path from "node:path";

// ─── Vector search (primary) ──────────────────────────────────────────────────
export async function searchKnowledgeBase(query, topK = 4) {
  try {
    const embedding = await embed(query);
    const supabase = createServerSupabase();
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.4,
      match_count: topK,
    });
    if (error) throw error;
    if (data?.length) return data;
    // Zero results from vector search — fall through to BM25
  } catch (err) {
    console.error("[RAG] Vector search failed, falling back to BM25:", err.message);
  }
  return bm25Search(query, topK);
}

// ─── BM25 fallback ────────────────────────────────────────────────────────────
async function bm25Search(query, topK) {
  const kb = await loadKbJson();
  const queryTokens = tokenize(query);
  const idf = computeIdf(kb);

  return kb
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, query, chunk, idf) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => x.chunk);
}

async function loadKbJson() {
  try {
    const p = path.join(process.cwd(), "data", "knowledge-base.json");
    const raw = await fs.readFile(p, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ─── BM25 helpers ─────────────────────────────────────────────────────────────
function normalizeToken(t) {
  const token = (t ?? "").toString().toLowerCase();
  if (!token) return "";
  if (token === "located") return "location";
  if (token === "where") return "location";
  if (token.endsWith("ing") && token.length > 5) return token.slice(0, -3);
  if (token.endsWith("ed") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 4) return token.slice(0, -1);
  return token;
}

function tokenize(s) {
  return (s ?? "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter(Boolean);
}

function computeIdf(kb) {
  const df = new Map();
  const N = Math.max(1, kb.length);
  for (const chunk of kb) {
    for (const t of new Set(tokenize(chunk?.content ?? ""))) {
      df.set(t, (df.get(t) ?? 0) + 1);
    }
  }
  const idf = new Map();
  for (const [t, d] of df.entries()) {
    idf.set(t, Math.log((N + 1) / (d + 1)) + 1);
  }
  return idf;
}

function scoreChunk(queryTokens, queryText, chunk, idf) {
  const hay = (chunk?.content ?? "").toLowerCase();
  if (!hay) return 0;
  let score = 0;
  for (const t of queryTokens) {
    if (t.length <= 2) continue;
    if (hay.includes(t)) score += 2 * (idf?.get(t) ?? 1);
  }
  const meta = chunk?.metadata ?? {};
  const metaHay = [meta.section, meta.company, meta.project, meta.serviceId]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const t of queryTokens) {
    if (t.length <= 2) continue;
    if (metaHay.includes(t)) score += 6 * (idf?.get(t) ?? 1);
  }
  const qNorm = (queryText ?? "").toLowerCase();
  if (qNorm.includes("builder.ai") && hay.includes("builder.ai")) score += 12;
  if (qNorm.length >= 10 && hay.includes(qNorm.slice(0, Math.min(32, qNorm.length)))) score += 3;
  return score;
}

// ─── Shared formatter ─────────────────────────────────────────────────────────
export function formatRagContext(chunks) {
  if (!chunks?.length) return "";
  return chunks
    .map((c, i) => {
      const id = c?.id ?? `chunk-${i + 1}`;
      const meta = c?.metadata ? JSON.stringify(c.metadata) : "";
      const content = (c?.content ?? "").toString();
      return `[#${i + 1} | id=${id}]${meta ? ` metadata=${meta}` : ""}\n${content}`;
    })
    .join("\n\n---\n\n");
}
