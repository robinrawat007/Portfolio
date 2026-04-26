import { createServerSupabase } from "@/lib/supabase";
import { embed } from "@/lib/voyage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatProjectContent(p) {
  const sections = (p.case_study?.sections ?? [])
    .map((s) => `${s.title}: ${s.content}`)
    .join(" ");
  const outcomes = (p.case_study?.outcomes ?? []).join(", ");
  const tech = (p.tech ?? []).join(", ");
  return `Project: ${p.title} — ${p.subtitle} (${p.period}). Tech: ${tech}. ${sections} Key outcomes: ${outcomes}.`;
}

function formatSkillContent(s) {
  return `Skill: ${s.name}. Category: ${s.category}. ${s.showcase ? "Featured in the interactive skills playground." : ""}`;
}

function buildKbEntry(table, record) {
  switch (table) {
    case "projects":
      return {
        id: `projects.${record.id}`,
        content: formatProjectContent(record),
        metadata: {
          section: "Projects",
          type: "project",
          tags: [record.id, record.title?.toLowerCase(), ...(record.tech ?? []).map((t) => t.toLowerCase())],
        },
        source: "projects",
        source_id: record.id,
      };
    case "skills":
      return {
        id: `skills.${record.id}`,
        content: formatSkillContent(record),
        metadata: {
          section: "Skills",
          type: "skill",
          tags: [record.name?.toLowerCase(), record.category],
        },
        source: "skills",
        source_id: record.id,
      };
    default:
      return null;
  }
}

export async function POST(req) {
  const secret = req.headers.get("x-sync-secret");
  if (!secret || secret !== process.env.SYNC_KB_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, table, record, old_record } = body;

  if (!["projects", "skills"].includes(table)) {
    return Response.json({ ok: true, skipped: true });
  }

  const supabase = createServerSupabase();

  if (type === "DELETE") {
    const sourceId = old_record?.id;
    if (sourceId) {
      await supabase
        .from("knowledge_base")
        .delete()
        .eq("source", table)
        .eq("source_id", sourceId);
    }
    return Response.json({ ok: true, action: "deleted" });
  }

  if (!record) {
    return Response.json({ error: "Missing record" }, { status: 400 });
  }

  if (table === "projects" && record.published === false) {
    await supabase
      .from("knowledge_base")
      .delete()
      .eq("source", "projects")
      .eq("source_id", record.id);
    return Response.json({ ok: true, action: "unpublished-removed" });
  }

  const entry = buildKbEntry(table, record);
  if (!entry) {
    return Response.json({ error: "Could not build KB entry" }, { status: 400 });
  }

  let embedding;
  try {
    embedding = await embed(entry.content);
  } catch (err) {
    return Response.json(
      { error: "Embedding failed", details: err.message },
      { status: 502 }
    );
  }

  const { error } = await supabase.from("knowledge_base").upsert({
    ...entry,
    embedding,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, action: type === "INSERT" ? "created" : "updated", id: entry.id });
}
