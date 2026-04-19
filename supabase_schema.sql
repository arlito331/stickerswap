-- ═══════════════════════════════════════════
-- STICKERSWAP — Supabase Schema
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════

-- EXTENSIONS
create extension if not exists "uuid-ossp";

-- ─── USERS (extends Supabase auth.users) ─────────────────
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text not null,
  city          text,
  whatsapp      text,
  photo_url     text,
  rating        numeric(2,1) default 5.0,
  swaps_done    integer default 0,
  -- Account status: locked | pending | active
  account_status text default 'locked' check (account_status in ('locked','pending','active')),
  payment_proof_url text,          -- screenshot uploaded by user
  payment_confirmed_at timestamptz, -- set by admin when approved
  subscription_expires_at timestamptz,
  lang          text default 'es' check (lang in ('en','es')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- ─── ALBUMS ───────────────────────────────────────────────
create table public.albums (
  id          text primary key,  -- 'wc2026', 'ucl', 'pokemon', etc
  name_es     text not null,
  name_en     text not null,
  total       integer not null,
  emoji       text,
  active      boolean default true,
  created_at  timestamptz default now()
);

insert into public.albums (id, name_es, name_en, total, emoji) values
  ('wc2026',  'FIFA Mundial 2026',        'FIFA World Cup 2026',        638, '⚽'),
  ('ucl',     'UEFA Champions League',    'UEFA Champions League',      540, '🏆'),
  ('pokemon', 'Pokémon Journey',          'Pokémon Journey',            250, '⚡'),
  ('disney',  'Disney 100 Años',          'Disney 100 Years',           200, '✨'),
  ('nba',     'NBA 2025-26',              'NBA 2025-26',                300, '🏀'),
  ('copa',    'Copa América 2024',        'Copa América 2024',          240, '🌎');

-- ─── USER STICKERS ────────────────────────────────────────
create table public.user_stickers (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  album_id    text references public.albums(id) on delete cascade not null,
  sticker_num integer not null check (sticker_num > 0 and sticker_num <= 9999),
  type        text not null check (type in ('missing','extra')),
  created_at  timestamptz default now(),
  unique (user_id, album_id, sticker_num, type)
);

create index on public.user_stickers (user_id, album_id, type);
create index on public.user_stickers (album_id, type);

alter table public.user_stickers enable row level security;
create policy "Users can view all stickers" on public.user_stickers for select using (true);
create policy "Users can manage own stickers" on public.user_stickers for all using (auth.uid() = user_id);

-- ─── MATCHES (computed view) ──────────────────────────────
-- A match exists when:
--   user A has extra sticker X that user B needs (missing)
--   AND/OR user A has missing sticker Y that user B has extra
create or replace view public.matches as
select
  a.user_id  as user_a_id,
  b.user_id  as user_b_id,
  a.album_id,
  count(*)   as score
from public.user_stickers a
join public.user_stickers b
  on  a.album_id    = b.album_id
  and a.sticker_num = b.sticker_num
  and a.type        = 'extra'
  and b.type        = 'missing'
  and a.user_id     != b.user_id
group by a.user_id, b.user_id, a.album_id
having count(*) > 0;

-- ─── EXCHANGE REQUESTS ────────────────────────────────────
create table public.exchange_requests (
  id            uuid default uuid_generate_v4() primary key,
  from_user_id  uuid references public.profiles(id) on delete cascade not null,
  to_user_id    uuid references public.profiles(id) on delete cascade not null,
  album_id      text references public.albums(id) not null,
  stickers_give integer[] not null,  -- stickers from_user gives
  stickers_get  integer[] not null,  -- stickers from_user gets
  status        text default 'pending' check (status in ('pending','accepted','declined','completed')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.exchange_requests enable row level security;
create policy "Users can view their requests" on public.exchange_requests for select
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);
create policy "Users can create requests" on public.exchange_requests for insert
  with check (auth.uid() = from_user_id);
create policy "Users can update their requests" on public.exchange_requests for update
  using (auth.uid() = from_user_id or auth.uid() = to_user_id);

-- ─── MESSAGES ─────────────────────────────────────────────
create table public.messages (
  id          uuid default uuid_generate_v4() primary key,
  from_id     uuid references public.profiles(id) on delete cascade not null,
  to_id       uuid references public.profiles(id) on delete cascade not null,
  body        text not null,
  read        boolean default false,
  created_at  timestamptz default now()
);

create index on public.messages (from_id, to_id, created_at);
create index on public.messages (to_id, read);

alter table public.messages enable row level security;
create policy "Users can view their messages" on public.messages for select
  using (auth.uid() = from_id or auth.uid() = to_id);
create policy "Users can send messages" on public.messages for insert
  with check (auth.uid() = from_id);
create policy "Users can mark messages read" on public.messages for update
  using (auth.uid() = to_id);

-- ─── RATINGS ──────────────────────────────────────────────
create table public.ratings (
  id              uuid default uuid_generate_v4() primary key,
  from_user_id    uuid references public.profiles(id) on delete cascade not null,
  to_user_id      uuid references public.profiles(id) on delete cascade not null,
  exchange_id     uuid references public.exchange_requests(id),
  score           integer check (score between 1 and 5),
  comment         text,
  created_at      timestamptz default now(),
  unique (from_user_id, exchange_id)
);

alter table public.ratings enable row level security;
create policy "Ratings are public" on public.ratings for select using (true);
create policy "Users can rate" on public.ratings for insert with check (auth.uid() = from_user_id);

-- ─── PAYMENT PROOFS (for manual Yappy approval) ───────────
create table public.payment_proofs (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  screenshot_url text not null,
  amount        numeric(10,2) default 1.00,
  status        text default 'pending' check (status in ('pending','approved','rejected')),
  admin_note    text,
  submitted_at  timestamptz default now(),
  reviewed_at   timestamptz,
  reviewed_by   uuid references auth.users(id)
);

alter table public.payment_proofs enable row level security;
create policy "Users can view own proofs" on public.payment_proofs for select using (auth.uid() = user_id);
create policy "Users can submit proofs" on public.payment_proofs for insert with check (auth.uid() = user_id);

-- ─── TRIGGER: auto-update updated_at ─────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger on_profiles_updated before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ─── TRIGGER: update rating average on new rating ─────────
create or replace function public.update_user_rating()
returns trigger language plpgsql as $$
begin
  update public.profiles
  set rating = (select round(avg(score)::numeric, 1) from public.ratings where to_user_id = new.to_user_id)
  where id = new.to_user_id;
  return new;
end;
$$;

create trigger on_new_rating after insert on public.ratings
  for each row execute procedure public.update_user_rating();

-- ─── TRIGGER: approve account when payment proof approved ──
create or replace function public.approve_account_on_payment()
returns trigger language plpgsql as $$
begin
  if new.status = 'approved' and old.status = 'pending' then
    update public.profiles
    set
      account_status = 'active',
      payment_confirmed_at = now(),
      subscription_expires_at = now() + interval '31 days'
    where id = new.user_id;
  end if;
  return new;
end;
$$;

create trigger on_payment_approved after update on public.payment_proofs
  for each row execute procedure public.approve_account_on_payment();

-- ─── STORAGE BUCKET for payment screenshots ───────────────
-- Run in Supabase dashboard > Storage:
-- Create bucket: 'payment-proofs' (private)
-- Create bucket: 'avatars' (public)
