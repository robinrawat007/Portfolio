-- Run this in your Supabase SQL editor: Dashboard > SQL Editor > New Query

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists vector;

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists projects (
  id            text primary key,
  title         text not null,
  subtitle      text not null,
  period        text not null,
  tech          text[] not null default '{}',
  image_url     text,
  case_study    jsonb not null default '{}'::jsonb,
  display_order int  not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists services (
  id            text primary key,
  title         text not null,
  description   text not null,
  icon_name     text not null,
  disabled      boolean not null default false,
  display_order int  not null default 0
);

create table if not exists skills (
  id            text primary key,
  name          text not null,
  category      text not null,     -- 'frontend' | 'ai' | 'tools'
  icon_name     text not null,
  color         text,
  shadow        text,
  rgba          text,
  showcase      boolean not null default false,  -- true = physics playground
  display_order int  not null default 0
);

create table if not exists knowledge_base (
  id         text primary key,
  content    text not null,
  embedding  vector(512),          -- voyage-3-lite produces 512-dim vectors
  metadata   jsonb not null default '{}',
  source     text not null default 'manual',  -- 'projects'|'services'|'skills'|'manual'
  source_id  text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Vector similarity search ─────────────────────────────────────────────────
create or replace function match_documents(
  query_embedding vector(512),
  match_threshold float default 0.4,
  match_count     int   default 4
)
returns table (
  id         text,
  content    text,
  metadata   jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
  from knowledge_base
  where embedding is not null
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table projects      enable row level security;
alter table services      enable row level security;
alter table skills        enable row level security;
alter table knowledge_base enable row level security;

-- Public read (anon key can select)
create policy "public_read" on projects      for select using (published = true);
create policy "public_read" on services      for select using (true);
create policy "public_read" on skills        for select using (true);
create policy "public_read" on knowledge_base for select using (true);

-- Service role bypasses RLS automatically — no extra policy needed for writes

-- ─── updated_at trigger ───────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

create trigger knowledge_base_updated_at
  before update on knowledge_base
  for each row execute function set_updated_at();
