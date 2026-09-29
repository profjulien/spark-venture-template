-- Spark venture database. Paste into Supabase → SQL Editor → Run. Run once.
--
-- Three tables:
--   leads     people who joined the list        (the page adds rows)
--   events       page views and ask clicks        (the page adds rows)
--   commitments  confirmed asks, any kind         (Level 2: webhooks add rows)
--
-- Access rule: the page can ADD rows to leads and events, and nothing else.
-- Reading happens in the Supabase dashboard, where you are signed in.

create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text check (char_length(name) <= 120),
  email      text not null check (char_length(email) <= 254 and position('@' in email) > 1),
  note       text check (char_length(note) <= 1000),
  source     text check (char_length(source) <= 200),
  page       text check (char_length(page) <= 200)
);

create table if not exists public.events (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type       text not null check (type in ('view', 'cta_click')),
  page       text check (char_length(page) <= 200),
  source     text check (char_length(source) <= 200)
);

-- Every confirmed ask lands here in the same shape, whatever its kind:
-- a deposit, a pre-order, a booking kept, a pilot signed, a letter of intent.
-- Until Level 2, evidence/commitments.csv is the ledger.
create table if not exists public.commitments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  kind         text not null check (kind ~ '^[a-z][a-z-]{1,30}$'),
  channel      text,
  provider     text,
  provider_ref text,
  amount       numeric(12, 2) check (amount is null or amount > 0),
  currency     text check (currency is null or char_length(currency) = 3),
  customer     text,
  status       text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'refunded')),
  note         text
);

alter table public.leads    enable row level security;
alter table public.events   enable row level security;
alter table public.commitments enable row level security;

grant insert on public.leads, public.events to anon;

create policy "page adds leads"  on public.leads  for insert to anon with check (true);
create policy "page adds events" on public.events for insert to anon with check (true);

-- commitments has no public policy on purpose: only the dashboard and a
-- server-side webhook holding the secret key can touch it.

-- Funnel at a glance: Supabase → Table Editor → funnel_by_day.
create or replace view public.funnel_by_day
with (security_invoker = true) as
select
  d.day,
  (select count(*) from public.events e where e.type = 'view'          and e.created_at::date = d.day) as views,
  (select count(*) from public.events e where e.type = 'cta_click'     and e.created_at::date = d.day) as ask_clicks,
  (select count(*) from public.leads  l where l.created_at::date = d.day)                             as leads
from (
  select distinct created_at::date as day from public.events
  union
  select distinct created_at::date from public.leads
) d
order by d.day desc;

revoke all on public.funnel_by_day from anon, authenticated;
