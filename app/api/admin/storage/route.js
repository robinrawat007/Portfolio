import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { validateAdminRequest } from '@/lib/adminAuth';

const IMAGE_EXTS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

export async function GET(request) {
  if (!validateAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folder = new URL(request.url).searchParams.get('folder') || '';

  const supabase = createServerSupabase();

  // List root of bucket to get all project folders when no folder specified
  const { data, error } = await supabase.storage
    .from('projects')
    .list(folder || undefined, { sortBy: { column: 'name', order: 'asc' } });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const files = (data || [])
    .filter(item => {
      const ext = item.name.split('.').pop()?.toLowerCase();
      return IMAGE_EXTS.has(ext);
    })
    .map(item => {
      const path = folder ? `${folder}/${item.name}` : item.name;
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(path);
      return { name: item.name, url: publicUrl };
    });

  // Also return folder names (items without an extension) for root listing
  const folders = folder
    ? []
    : (data || [])
        .filter(item => !item.name.includes('.'))
        .map(item => item.name);

  return NextResponse.json({ files, folders });
}

export async function DELETE(request) {
  if (!validateAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = new URL(request.url).searchParams.get('path');
  if (!path) return NextResponse.json({ error: 'No path provided' }, { status: 400 });

  const supabase = createServerSupabase();
  const { error } = await supabase.storage
    .from('projects')
    .remove([path]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
