-- Alternative to Supabase Dashboard Webhooks.
-- Run this in SQL Editor if you can't find the Webhooks UI.
-- Replace YOUR_APP_URL and YOUR_SYNC_SECRET before running.

create extension if not exists pg_net;

create or replace function notify_kb_sync()
returns trigger language plpgsql security definer as $$
declare
  payload jsonb;
  record_data jsonb;
  old_record_data jsonb;
begin
  record_data     := case when TG_OP = 'DELETE' then 'null'::jsonb else to_jsonb(NEW) end;
  old_record_data := case when TG_OP = 'INSERT' then 'null'::jsonb else to_jsonb(OLD) end;

  payload := jsonb_build_object(
    'type',       TG_OP,
    'table',      TG_TABLE_NAME,
    'schema',     TG_TABLE_SCHEMA,
    'record',     record_data,
    'old_record', old_record_data
  );

  perform net.http_post(
    url     := 'https://YOUR_APP_URL/api/sync-kb',
    body    := payload,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-sync-secret', 'YOUR_SYNC_SECRET'
    )
  );

  return coalesce(NEW, OLD);
end;
$$;

-- Attach to projects (most important — this is the auto-KB sync)
create trigger projects_kb_sync
  after insert or update or delete on projects
  for each row execute function notify_kb_sync();

-- Attach to services
create trigger services_kb_sync
  after insert or update or delete on services
  for each row execute function notify_kb_sync();

-- Attach to skills
create trigger skills_kb_sync
  after insert or update or delete on skills
  for each row execute function notify_kb_sync();
