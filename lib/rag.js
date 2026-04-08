import fs from "node:fs/promises";
import path from "node:path";

function normalizeText(s) {
  return (s ?? "").toString().toLowerCase();
}

function normalizeToken(t) {
  const token = (t ?? "").toString().toLowerCase();
  if (!token) return "";

  // Lightweight synonyms to catch common wording differences.
  if (token === "located") return "location";
  if (token === "where") return "location";

  // Very small stemming (good enough for portfolio KB search).
  if (token.endsWith("ing") && token.length > 5) return token.slice(0, -3);
  if (token.endsWith("ed") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 4) return token.slice(0, -1);

  return token;
}

function tokenize(s) {
  return normalizeText(s)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter(Boolean);
}

function computeIdf(kb) {
  const df = new Map();
  const totalDocs = Math.max(1, kb.length);

  for (const chunk of kb) {
    const content = chunk?.content ?? "";
    const unique = new Set(tokenize(content));
    for (const t of unique) df.set(t, (df.get(t) ?? 0) + 1);
  }

  const idf = new Map();
  for (const [t, d] of df.entries()) {
    // Smooth IDF: ln((N+1)/(df+1)) + 1
    idf.set(t, Math.log((totalDocs + 1) / (d + 1)) + 1);
  }
  return idf;
}

function scoreChunk(queryTokens, queryText, chunk, idf) {
  const chunkText = chunk?.content ?? "";
  const hay = normalizeText(chunkText);
  if (!hay) return 0;

  let score = 0;
  for (const t of queryTokens) {
    if (t.length <= 2) continue;
    if (hay.includes(t)) score += 2 * (idf?.get(t) ?? 1);
  }

  // Boost matches in metadata (company/service/project).
  const meta = chunk?.metadata ?? {};
  const metaHay = normalizeText(
    [meta.section, meta.company, meta.project, meta.serviceId].filter(Boolean).join(" ")
  );
  if (metaHay) {
    for (const t of queryTokens) {
      if (t.length <= 2) continue;
      if (metaHay.includes(t)) score += 6 * (idf?.get(t) ?? 1);
    }
  }

  // Explicit boost for common entity formatting like "Builder.AI".
  const qNorm = normalizeText(queryText);
  if (qNorm.includes("builder.ai") && hay.includes("builder.ai")) score += 12;

  // Tiny boost if any longer phrase appears.
  const q = normalizeText(queryText).trim();
  if (q.length >= 10 && hay.includes(q.slice(0, Math.min(32, q.length)))) score += 3;

  return score;
}

export async function loadKnowledgeBase() {
  const kbPath = path.join(process.cwd(), "data", "knowledge-base.json");
  const raw = await fs.readFile(kbPath, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export async function searchKnowledgeBase(query, topK = 3) {
  const kb = await loadKnowledgeBase();
  const queryTokens = tokenize(query);
  const queryText = query ?? "";
  const idf = computeIdf(kb);

  const scored = kb
    .map((chunk) => {
      return {
        chunk,
        score: scoreChunk(queryTokens, queryText, chunk, idf),
      };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => x.chunk);

  return scored;
}

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

