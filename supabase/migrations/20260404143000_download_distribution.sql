create extension if not exists pgcrypto;

create table if not exists public.download_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  company_name text not null,
  job_title text not null,
  industry text not null,
  country text not null,
  purpose_of_use text,
  role_category text not null default 'other' check (role_category in ('investor','partner','engineer','operator','researcher','other')),
  detected_platform text not null,
  selected_platform text not null,
  user_agent text,
  locale text,
  referrer text,
  status text not null default 'pending' check (status in ('pending','sent','failed','expired','resent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email_sent_at timestamptz,
  notes text
);

alter table public.download_requests add column if not exists job_title text;
alter table public.download_requests add column if not exists country text;

create table if not exists public.download_tokens (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.download_requests(id) on delete cascade,
  token text not null unique,
  platform text not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  last_download_at timestamptz,
  download_count integer not null default 0
);

create index if not exists idx_download_requests_email on public.download_requests(email);
create index if not exists idx_download_requests_status_created_at on public.download_requests(status, created_at desc);
create index if not exists idx_download_tokens_token on public.download_tokens(token);
create index if not exists idx_download_tokens_expires_at on public.download_tokens(expires_at);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_download_requests_updated_at on public.download_requests;
create trigger trg_download_requests_updated_at
before update on public.download_requests
for each row execute function public.touch_updated_at();

alter table public.download_requests enable row level security;
alter table public.download_tokens enable row level security;

create policy "allow_insert_download_requests"
on public.download_requests
for insert
to anon, authenticated
with check (true);

create policy "allow_select_own_request_rows"
on public.download_requests
for select
to authenticated
using (true);
