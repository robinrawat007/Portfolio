import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { validateAdminRequest } from '@/lib/adminAuth';

const ALLOWED_EXTS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

export async function POST(request) {
  if (!validateAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  const folder = (formData.get('folder') || 'misc')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  if (!ALLOWED_EXTS.has(ext)) {
    return NextResponse.json({ error: `File type .${ext} not allowed` }, { status: 400 });
  }

  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createServerSupabase();
  const { error } = await supabase.storage
    .from('projects')
    .upload(path, buffer, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from('projects')
    .getPublicUrl(path);

  return NextResponse.json({ url: publicUrl, path });
}
