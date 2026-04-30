import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { validateAdminRequest } from '@/lib/adminAuth';
import { embed } from '@/lib/voyage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function formatProjectContent(p) {
  const sections = (p.case_study?.sections ?? [])
    .map((s) => `${s.title}: ${s.content}`)
    .join(' ');
  const tech = (p.tech ?? []).join(', ');
  return `Project: ${p.title} — ${p.subtitle} (${p.period}). Tech: ${tech}. ${sections}`.trim();
}

export async function POST(request) {
  if (!validateAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabase();

  const { data: projects, error: fetchErr } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order');

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });

  const results = [];
  for (const p of projects) {
    const content = formatProjectContent(p);
    try {
      const embedding = await embed(content);
      const { error } = await supabase.from('knowledge_base').upsert({
        id: `projects.${p.id}`,
        content,
        embedding,
        metadata: {
          section: 'Projects',
          type: 'project',
          tags: [p.id, p.title?.toLowerCase(), ...(p.tech ?? []).map((t) => t.toLowerCase())],
        },
        source: 'projects',
        source_id: p.id,
        updated_at: new Date().toISOString(),
      });
      results.push({ id: p.id, title: p.title, ok: !error, error: error?.message });
    } catch (err) {
      results.push({ id: p.id, title: p.title, ok: false, error: err.message });
    }
  }

  const failed = results.filter((r) => !r.ok);
  return NextResponse.json({ synced: results.length, failed: failed.length, results });
}
