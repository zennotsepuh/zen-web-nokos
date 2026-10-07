create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade,email text,role text default 'user',balance bigint default 0,created_at timestamptz default now());
create table if not exists public.orders (id uuid primary key default gen_random_uuid(),user_id uuid references public.profiles(id),provider_order_id text,server int,country text,produk text,provider text,operator text,status text,phone text,otp text,price bigint default 0,created_at timestamptz default now());
create table if not exists public.deposits (id uuid primary key default gen_random_uuid(),user_id uuid references public.profiles(id),provider_deposit_id text,nominal bigint,status text,qr_url text,created_at timestamptz default now());
alter table public.profiles enable row level security; alter table public.orders enable row level security; alter table public.deposits enable row level security;
create policy "own profile" on public.profiles for select using (auth.uid()=id);
create policy "own orders" on public.orders for select using (auth.uid()=user_id);
create policy "own deposits" on public.deposits for select using (auth.uid()=user_id);
