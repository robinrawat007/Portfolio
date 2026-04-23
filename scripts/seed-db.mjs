/**
 * One-time seed script. Run after applying 001_schema.sql.
 * Usage: node --env-file .env scripts/seed-db.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function embed(text) {
  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "voyage-3-lite", input: [text] }),
  });
  if (!res.ok) throw new Error(`Voyage ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data[0].embedding;
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "builder-studio",
    title: "Builder Studio",
    subtitle: "No-Code App Development Platform",
    period: "Jan 2021 – Apr 2025",
    tech: ["Angular", "TypeScript", "Bootstrap", "REST APIs"],
    image_url: null,
    case_study: {
      sections: [
        { title: "The Problem", content: "Non-technical users needed to build custom apps without writing code. Existing tools were too rigid for client-specific business logic — customers needed drag-and-drop flexibility combined with enterprise-grade reliability." },
        { title: "Design Decisions", content: "Chose a component-based Angular architecture to support modular feature delivery across a large team. Form builders and logic flow engines were built as isolated micro-features, allowing independent iteration." },
        { title: "Engineering Approach", content: "Built pricing configuration, build automation, and live project preview as first-class RESTful integrations. Strict TypeScript typing eliminated runtime surprises during handoff between teams." },
      ],
      outcomes: ["Scaled to serve enterprise clients globally", "Drag-and-drop reduced time-to-app significantly", "Modular architecture enabled independent delivery", "Zero cross-browser layout regressions"],
    },
    display_order: 0,
    published: true,
  },
  {
    id: "builder-tracker",
    title: "Builder Tracker",
    subtitle: "Real-Time Project Tracking Dashboard",
    period: "Jan 2021 – Apr 2025",
    tech: ["Angular", "RxJS", "WebSockets", "Figma"],
    image_url: null,
    case_study: {
      sections: [
        { title: "The Problem", content: "Project managers had no real-time visibility into construction milestones. Updates happened in spreadsheets, delays went unnoticed, and there was no single source of truth for live project state." },
        { title: "Design Decisions", content: "Chose WebSockets over polling to eliminate latency. RxJS streams composed multiple data sources into a single reactive view layer. All components were spec'd in Figma first to reduce engineering back-and-forth." },
        { title: "UI/UX Approach", content: "Progressive disclosure — summary cards for quick triage, drill-down for details. Color coding and status chips made state legible without reading text." },
      ],
      outcomes: ["Real-time milestone visibility across all projects", "Eliminated spreadsheet-based status tracking", "Figma-to-code fidelity with zero regressions", "WebSocket latency under 200ms"],
    },
    display_order: 1,
    published: true,
  },
  {
    id: "builder-home",
    title: "Builder Home",
    subtitle: "User Onboarding & Account Portal",
    period: "Jan 2021 – Apr 2025",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Jest"],
    image_url: null,
    case_study: {
      sections: [
        { title: "The Problem", content: "Users managing projects, teams, subscriptions, and billing had no unified portal. Context-switching created friction and generated support tickets for tasks that should have been self-serve." },
        { title: "Architecture Decisions", content: "Next.js + TypeScript for type safety across a shared component library. RBAC implemented at route and component level. Lazy loading and code splitting kept the bundle lean despite the feature surface." },
        { title: "Quality & Testing", content: "85%+ Jest unit test coverage maintained throughout. Tests written alongside features caught three auth-flow regressions before staging. Code reviews enforced the component library contract." },
      ],
      outcomes: ["85%+ Jest unit test coverage", "RBAC reduced unauthorized access to zero", "Lazy loading cut initial load time significantly", "Component library adopted by 2 downstream teams"],
    },
    display_order: 2,
    published: true,
  },
  {
    id: "atlas",
    title: "Atlas — AI Assistant",
    subtitle: "RAG-Powered Chatbot",
    period: "2026",
    tech: ["Claude API", "RAG", "Next.js", "n8n"],
    image_url: null,
    case_study: {
      sections: [
        { title: "The Problem", content: "Static portfolios rely on visitors digging through pages to find my specific skill-sets or background." },
        { title: "Design Decisions", content: "A context-aware AI assistant built on Claude Haiku with a custom BM25 retrieval layer to answer queries dynamically — strictly grounded to my background, avoiding hallucinations." },
        { title: "Engineering Approach", content: "Maintained a strict session-based conversation state with custom structured prompting. Built a seamless fallback to an n8n webhook backend to ensure 100% uptime for static deployments." },
      ],
      outcomes: ["Custom BM25 TF-IDF retrieval over a local knowledge base", "RAG context injection preventing LLM drift", "Immediate user engagement inside a live portfolio instance"],
    },
    display_order: 3,
    published: true,
  },
  {
    id: "ai-content-pipeline",
    title: "AI Content Pipeline",
    subtitle: "Instagram & YouTube Automation",
    period: "2026",
    tech: ["n8n", "OpenAI API", "Insta Graph API", "YouTube API"],
    image_url: null,
    case_study: {
      sections: [
        { title: "The Problem", content: "Content generation, formatting, and manual cross-posting across social media demands immense repetitive busywork." },
        { title: "System Architecture", content: "Designed a centralized n8n workflow. It takes a raw topic prompt and dynamically generates specialized content — tailored hooks, bodies, CTAs, and hashtags — for multiple platforms simultaneously." },
        { title: "Integration Strategy", content: "Strictly orchestrated OpenAI completions formatted for Instagram Graph API and YouTube Data API endpoints, yielding zero-touch automated scheduled rollouts." },
      ],
      outcomes: ["AI-written hooks engineered to stop the scroll", "Format-aware payload generation per platform", "100% automated scheduled publishing pipeline"],
    },
    display_order: 4,
    published: true,
  },
];

const SERVICES = [
  { id: "starter-website", title: "Starter Website", description: "Clean, fast websites and landing pages for individuals and small businesses.", icon_name: "FaGlobe", disabled: false, display_order: 0 },
  { id: "enterprise-web-app", title: "Enterprise Web Application", description: "Scalable, full-stack web apps built for complex business needs.", icon_name: "FaLayerGroup", disabled: false, display_order: 1 },
  { id: "ai-workflow-automation", title: "AI Workflow Automation", description: "End-to-end automation pipelines that eliminate manual, repetitive work.", icon_name: "FaBolt", disabled: false, display_order: 2 },
  { id: "custom-chatbot", title: "Custom Chatbot", description: "Intelligent chatbots for websites, WhatsApp, and customer support.", icon_name: "FaCommentDots", disabled: false, display_order: 3 },
  { id: "custom-voice-assistant", title: "Custom Voice Assistant", description: "AI-powered voice agents for sales, support, and operations.", icon_name: "FaMicrophone", disabled: false, display_order: 4 },
  { id: "rag-knowledge-base", title: "RAG System / Knowledge Base AI", description: "Smart document Q&A and internal knowledge search systems.", icon_name: "FaDatabase", disabled: false, display_order: 5 },
  { id: "ai-content-pipeline", title: "AI Content Pipeline", description: "Automated content generation workflows for video, copy, and social.", icon_name: "FaClapperboard", disabled: true, display_order: 6 },
];

const SKILLS = [
  // Showcase (ArsenalPlayground)
  { id: "angular", name: "Angular", category: "frontend", icon_name: "FaAngular", color: "#f40e5e", shadow: "#ac0a42", rgba: "244, 14, 94", showcase: true, display_order: 0 },
  { id: "react", name: "React", category: "frontend", icon_name: "FaReact", color: "#58c4dc", shadow: "#3e8a9c", rgba: "88, 196, 220", showcase: true, display_order: 1 },
  { id: "nextjs", name: "Next.js", category: "frontend", icon_name: "SiNextdotjs", color: "#ffffff", shadow: "#a3a3a3", rgba: "255, 255, 255", showcase: true, display_order: 2 },
  { id: "typescript", name: "TypeScript", category: "frontend", icon_name: "SiTypescript", color: "#3178c6", shadow: "#23558c", rgba: "49, 120, 198", showcase: true, display_order: 3 },
  { id: "javascript", name: "JavaScript", category: "frontend", icon_name: "SiJavascript", color: "#f7e024", shadow: "#ab9a18", rgba: "247, 224, 36", showcase: true, display_order: 4 },
  { id: "tailwind", name: "Tailwind", category: "frontend", icon_name: "SiTailwindcss", color: "#00bcff", shadow: "#0085b3", rgba: "0, 188, 255", showcase: true, display_order: 5 },
  { id: "n8n", name: "n8n", category: "ai", icon_name: "SiN8N", color: "#e94b70", shadow: "#a3354f", rgba: "233, 75, 112", showcase: true, display_order: 6 },
  { id: "github", name: "GitHub", category: "tools", icon_name: "FaGithub", color: "#ffffff", shadow: "#a3a3a3", rgba: "255, 255, 255", showcase: true, display_order: 7 },
  { id: "supabase", name: "Supabase", category: "tools", icon_name: "SiSupabase", color: "#3bc688", shadow: "#298c5f", rgba: "59, 198, 136", showcase: true, display_order: 8 },
  { id: "claude", name: "Claude", category: "ai", icon_name: "SiClaude", color: "#d97757", shadow: "#99543d", rgba: "217, 119, 87", showcase: true, display_order: 9 },
  // Non-showcase (full skill list)
  { id: "react-native", name: "React Native", category: "frontend", icon_name: "TbBrandReactNative", color: null, shadow: null, rgba: null, showcase: false, display_order: 10 },
  { id: "redux", name: "Redux", category: "frontend", icon_name: "SiRedux", color: null, shadow: null, rgba: null, showcase: false, display_order: 11 },
  { id: "zustand", name: "Zustand", category: "frontend", icon_name: "SiZustand", color: null, shadow: null, rgba: null, showcase: false, display_order: 12 },
  { id: "tanstack", name: "TanStack Query", category: "frontend", icon_name: "SiReactquery", color: null, shadow: null, rgba: null, showcase: false, display_order: 13 },
  { id: "rxjs", name: "RxJS", category: "frontend", icon_name: "SiReactivex", color: null, shadow: null, rgba: null, showcase: false, display_order: 14 },
  { id: "material-ui", name: "Material UI", category: "frontend", icon_name: "SiMui", color: null, shadow: null, rgba: null, showcase: false, display_order: 15 },
  { id: "jest", name: "Jest", category: "frontend", icon_name: "SiJest", color: null, shadow: null, rgba: null, showcase: false, display_order: 16 },
  { id: "openai", name: "OpenAI API", category: "ai", icon_name: "SiOpenai", color: null, shadow: null, rgba: null, showcase: false, display_order: 17 },
  { id: "langchain", name: "LangChain", category: "ai", icon_name: "SiLangchain", color: null, shadow: null, rgba: null, showcase: false, display_order: 18 },
  { id: "huggingface", name: "Hugging Face", category: "ai", icon_name: "SiHuggingface", color: null, shadow: null, rgba: null, showcase: false, display_order: 19 },
  { id: "figma", name: "Figma", category: "tools", icon_name: "SiFigma", color: null, shadow: null, rgba: null, showcase: false, display_order: 20 },
  { id: "aws", name: "AWS", category: "tools", icon_name: "FaAws", color: null, shadow: null, rgba: null, showcase: false, display_order: 21 },
  { id: "vercel", name: "Vercel", category: "tools", icon_name: "SiVercel", color: null, shadow: null, rgba: null, showcase: false, display_order: 22 },
  { id: "sentry", name: "Sentry", category: "tools", icon_name: "SiSentry", color: null, shadow: null, rgba: null, showcase: false, display_order: 23 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatProjectContent(p) {
  const sections = (p.case_study?.sections ?? []).map((s) => `${s.title}: ${s.content}`).join(" ");
  const outcomes = (p.case_study?.outcomes ?? []).join(", ");
  return `Project: ${p.title} — ${p.subtitle} (${p.period}). Tech: ${p.tech.join(", ")}. ${sections} Key outcomes: ${outcomes}.`;
}

function formatServiceContent(s) {
  return `Service: ${s.title}${s.disabled ? " (Coming soon)" : ""} — ${s.description}`;
}

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertTable(table, rows, label) {
  console.log(`\nSeeding ${label}...`);
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) { console.error(`  ✗ ${label}:`, error.message); return false; }
  console.log(`  ✓ ${rows.length} rows`);
  return true;
}

async function upsertKbEntry(entry) {
  let embedding;
  try {
    embedding = await embed(entry.content);
  } catch (err) {
    console.error(`  ✗ Embed failed for ${entry.id}:`, err.message);
    return false;
  }
  const { error } = await supabase.from("knowledge_base").upsert(
    { ...entry, embedding, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  if (error) { console.error(`  ✗ KB upsert ${entry.id}:`, error.message); return false; }
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Portfolio DB Seed ===");

  // 1. Seed lookup tables
  await upsertTable("projects", PROJECTS, "projects");
  await upsertTable("services", SERVICES, "services");
  await upsertTable("skills", SKILLS, "skills");

  // 2. Seed knowledge_base from knowledge-base.json (manual/static entries)
  console.log("\nSeeding knowledge_base (manual entries from JSON)...");
  const raw = await readFile(join(ROOT, "data", "knowledge-base.json"), "utf8");
  const kbEntries = JSON.parse(raw);

  let kbOk = 0;
  for (const entry of kbEntries) {
    process.stdout.write(`  Embedding ${entry.id}...`);
    const ok = await upsertKbEntry({ ...entry, source: "manual", source_id: null });
    console.log(ok ? " ✓" : " ✗");
    if (ok) kbOk++;
    await new Promise((r) => setTimeout(r, 22000)); // 3 RPM limit on unverified Voyage accounts
  }
  console.log(`  Done: ${kbOk}/${kbEntries.length} KB entries`);

  // 3. Seed KB entries derived from projects (auto-sync preview)
  console.log("\nSeeding knowledge_base (project-derived entries)...");
  for (const p of PROJECTS) {
    const entry = {
      id: `projects.${p.id}`,
      content: formatProjectContent(p),
      metadata: {
        section: "Projects",
        type: "project",
        tags: [p.id, p.title.toLowerCase(), ...p.tech.map((t) => t.toLowerCase())],
      },
      source: "projects",
      source_id: p.id,
    };
    process.stdout.write(`  Embedding ${entry.id}...`);
    const ok = await upsertKbEntry(entry);
    console.log(ok ? " ✓" : " ✗");
    await new Promise((r) => setTimeout(r, 120));
  }

  // 4. Seed KB entries derived from services
  console.log("\nSeeding knowledge_base (service-derived entries)...");
  for (const s of SERVICES) {
    const entry = {
      id: `services.${s.id}`,
      content: formatServiceContent(s),
      metadata: { section: "Services", type: "service", tags: [s.id, s.title.toLowerCase()] },
      source: "services",
      source_id: s.id,
    };
    process.stdout.write(`  Embedding ${entry.id}...`);
    const ok = await upsertKbEntry(entry);
    console.log(ok ? " ✓" : " ✗");
    await new Promise((r) => setTimeout(r, 120));
  }

  console.log("\n=== Seed complete ===");
}

main().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
