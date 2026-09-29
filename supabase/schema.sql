-- Spark venture database. Paste into Supabase → SQL Editor → Run. Run once.
-- What is measured and how to read it: docs/measure.md.
--
-- Three tables:
--   events       what visitors do on the page     (the page adds rows)
--   leads        people who joined the list       (the page adds rows)
--   commitments  confirmed asks, any kind         (/log, or webhooks at Level 2)
--
-- Two views, the funnel:
--   funnel_daily      visitors → engaged → clicked → leads → confirmed, per day
--   funnel_by_source  the same funnel per channel, with conversion rates
--
-- Access rule: the page can ADD rows to events and leads, and nothing else.
-- Reading happens in the Supabase dashboard, where you are signed in.

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type ~ '^[a-z][a-z_]{1,39}$'),
  page        text check (char_length(page) <= 200),
  visitor_id  text check (char_length(visitor_id) <= 64),
  session_id  text check (char_length(session_id) <= 64),
  source      text check (char_length(source) <= 200),
  medium      text check (char_length(medium) <= 100),
  campaign    text check (char_length(campaign) <= 100),
  referrer    text check (char_length(referrer) <= 200),
  device      text check (device in ('mobile', 'desktop')),
  detail      jsonb check (detail is null or pg_column_size(detail) <= 2000)
);
create index if not exists events_created_at on public.events (created_at);
create index if not exists events_type_visitor on public.events (type, visitor_id);

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text check (char_length(name) <= 120),
  email       text not null check (char_length(email) <= 254 and position('@' in email) > 1),
  note        text check (char_length(note) <= 1000),
  source      text check (char_length(source) <= 200),
  page        text check (char_length(page) <= 200),
  visitor_id  text check (char_length(visitor_id) <= 64)
);

-- Every confirmed ask lands here in the same shape, whatever its kind:
-- a deposit, a pre-order, a booking kept, a pilot signed, a letter of intent.
-- Until Level 2, evidence/commitments.csv is the ledger; import it here
-- (Table Editor → commitments → Insert → Import data from CSV) to see it in
-- the funnel.
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
  visitor_id   text,
  status       text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'refunded')),
  note         text
);

alter table public.events      enable row level security;
alter table public.leads       enable row level security;
alter table public.commitments enable row level security;

grant insert on public.events, public.leads to anon;

create policy "page adds events" on public.events for insert to anon with check (true);
create policy "page adds leads"  on public.leads  for insert to anon with check (true);

-- commitments has no public policy on purpose: only the dashboard and a
-- server-side webhook holding the secret key can touch it. A confirmed ask
-- therefore never comes from the page itself.

-- Funnel per day. Each stage counts visitors once per day.
create or replace view public.funnel_daily
with (security_invoker = true) as
with days as (
  select distinct created_at::date as day from public.events
  union select distinct created_at::date from public.leads
  union select distinct created_at::date from public.commitments
)
select
  d.day,
  (select count(distinct visitor_id) from public.events e where e.type = 'page_view' and e.created_at::date = d.day) as visitors,
  (select count(distinct visitor_id) from public.events e where e.type = 'engaged'   and e.created_at::date = d.day) as engaged,
  (select count(distinct visitor_id) from public.events e where e.type = 'cta_click' and e.created_at::date = d.day) as clicked,
  (select count(*) from public.leads l where l.created_at::date = d.day) as leads,
  (select count(*) from public.commitments c where c.status = 'confirmed' and c.created_at::date = d.day) as confirmed
from days d
order by d.day desc;

-- Funnel per channel, all time. Channel = the ?ref= or utm_source on the
-- link, else the referring site, else "direct". Rates are % of visitors.
create or replace view public.funnel_by_source
with (security_invoker = true) as
with v as (
  select source,
    count(distinct visitor_id) filter (where type = 'page_view') as visitors,
    count(distinct visitor_id) filter (where type = 'engaged')   as engaged,
    count(distinct visitor_id) filter (where type = 'cta_click') as clicked
  from public.events group by source
),
l as (select source, count(*) as leads from public.leads group by source),
c as (select channel as source, count(*) as confirmed from public.commitments where status = 'confirmed' group by channel),
s as (select source from v union select source from l union select source from c)
select
  coalesce(s.source, 'unknown') as source,
  coalesce(v.visitors, 0)  as visitors,
  coalesce(v.engaged, 0)   as engaged,
  coalesce(v.clicked, 0)   as clicked,
  coalesce(l.leads, 0)     as leads,
  coalesce(c.confirmed, 0) as confirmed,
  round(100.0 * coalesce(v.engaged, 0)   / nullif(v.visitors, 0), 1) as engaged_pct,
  round(100.0 * coalesce(v.clicked, 0)   / nullif(v.visitors, 0), 1) as clicked_pct,
  round(100.0 * coalesce(c.confirmed, 0) / nullif(v.visitors, 0), 1) as confirmed_pct
from s
left join v on v.source is not distinct from s.source
left join l on l.source is not distinct from s.source
left join c on c.source is not distinct from s.source
order by visitors desc nulls last;

revoke all on public.funnel_daily, public.funnel_by_source from anon, authenticated;
