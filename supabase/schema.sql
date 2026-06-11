-- ============================================================
-- RUANG FISIO — Supabase Schema
-- Jalankan file ini di: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ── EXTENSIONS ──────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── ENUM TYPES ──────────────────────────────────────────────
create type status_terapis as enum ('ruang_fisio', 'mitra');
create type mode_layanan   as enum ('klinik', 'homecare', 'online');
create type status_booking as enum ('menunggu', 'dikonfirmasi', 'berlangsung', 'selesai', 'dibatalkan');

-- ── TABEL: pasien ───────────────────────────────────────────
-- Terhubung ke Supabase Auth (auth.users)
create table public.pasien (
  id          uuid primary key references auth.users(id) on delete cascade,
  nama        text        not null,
  no_hp       text,
  tanggal_lahir date,
  jenis_kelamin text,
  alamat      text,
  foto_url    text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── TABEL: fisioterapis ─────────────────────────────────────
create table public.fisioterapis (
  id                  text primary key,
  nama                text        not null,
  gelar               text        not null default 'S.Ft',
  status              status_terapis not null,
  spesialisasi        text[]      not null default '{}',
  spesialisasi_utama  text        not null,
  mode_layanan        mode_layanan[] not null default '{}',
  tersedia_klinik     boolean     not null default false,
  tersedia_homecare   boolean     not null default false,
  tersedia_online     boolean     not null default false,
  harga_mulai         integer     not null,
  rating              numeric(3,1) not null default 0,
  jumlah_ulasan       integer     not null default 0,
  jadwal_terdekat     text,
  kondisi_ditangani   text[]      not null default '{}',
  featured            boolean     not null default false,
  inisial             text        not null,
  foto_url            text,
  bio                 text,
  created_at          timestamptz default now()
);

-- ── TABEL: jadwal_terapis ───────────────────────────────────
create table public.jadwal_terapis (
  id          uuid primary key default gen_random_uuid(),
  terapis_id  text        not null references public.fisioterapis(id) on delete cascade,
  hari        text        not null, -- 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'
  jam_mulai   time        not null,
  jam_selesai time        not null,
  mode        mode_layanan not null,
  tersedia    boolean     not null default true
);

-- ── TABEL: bookings ─────────────────────────────────────────
create table public.bookings (
  id            uuid primary key default gen_random_uuid(),
  pasien_id     uuid        not null references public.pasien(id) on delete cascade,
  pasien_nama   text        not null,
  terapis_id    text        not null references public.fisioterapis(id),
  tanggal       date        not null,
  jam           text        not null,
  mode          mode_layanan not null,
  keluhan       text,
  paket         text,
  jumlah_sesi   integer     not null default 1,
  harga         integer     not null,
  status        status_booking not null default 'menunggu',
  catatan       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── TABEL: ulasan ───────────────────────────────────────────
create table public.ulasan (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid        not null references public.bookings(id) on delete cascade,
  pasien_id   uuid        not null references public.pasien(id) on delete cascade,
  terapis_id  text        not null references public.fisioterapis(id),
  rating      integer     not null check (rating between 1 and 5),
  komentar    text,
  created_at  timestamptz default now()
);

-- ── TABEL: favorit ──────────────────────────────────────────
create table public.favorit (
  id          uuid primary key default gen_random_uuid(),
  pasien_id   uuid        not null references public.pasien(id) on delete cascade,
  terapis_id  text        not null references public.fisioterapis(id) on delete cascade,
  created_at  timestamptz default now(),
  unique (pasien_id, terapis_id)
);

-- ── ROW LEVEL SECURITY ──────────────────────────────────────
alter table public.pasien         enable row level security;
alter table public.bookings       enable row level security;
alter table public.ulasan         enable row level security;
alter table public.favorit        enable row level security;
alter table public.fisioterapis   enable row level security;
alter table public.jadwal_terapis enable row level security;

-- pasien: hanya bisa lihat/edit data sendiri
create policy "pasien: baca sendiri"
  on public.pasien for select using (auth.uid() = id);
create policy "pasien: update sendiri"
  on public.pasien for update using (auth.uid() = id);
create policy "pasien: insert sendiri"
  on public.pasien for insert with check (auth.uid() = id);

-- bookings: pasien hanya akses booking sendiri
create policy "bookings: baca sendiri"
  on public.bookings for select using (auth.uid() = pasien_id);
create policy "bookings: insert sendiri"
  on public.bookings for insert with check (auth.uid() = pasien_id);
create policy "bookings: update sendiri"
  on public.bookings for update using (auth.uid() = pasien_id);

-- ulasan: pasien hanya akses ulasan sendiri
create policy "ulasan: baca sendiri"
  on public.ulasan for select using (auth.uid() = pasien_id);
create policy "ulasan: insert sendiri"
  on public.ulasan for insert with check (auth.uid() = pasien_id);

-- favorit: pasien hanya akses favorit sendiri
create policy "favorit: baca sendiri"
  on public.favorit for select using (auth.uid() = pasien_id);
create policy "favorit: insert sendiri"
  on public.favorit for insert with check (auth.uid() = pasien_id);
create policy "favorit: delete sendiri"
  on public.favorit for delete using (auth.uid() = pasien_id);

-- fisioterapis & jadwal: semua orang bisa baca (data publik)
create policy "fisioterapis: publik baca"
  on public.fisioterapis for select using (true);
create policy "jadwal_terapis: publik baca"
  on public.jadwal_terapis for select using (true);

-- ── TRIGGER: auto update updated_at ─────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_pasien_updated
  before update on public.pasien
  for each row execute procedure public.handle_updated_at();

create trigger on_booking_updated
  before update on public.bookings
  for each row execute procedure public.handle_updated_at();

-- ── TRIGGER: auto create profil pasien saat register ────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.pasien (id, nama)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nama', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
