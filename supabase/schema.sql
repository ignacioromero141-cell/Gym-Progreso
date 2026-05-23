create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  date date not null,
  routine text not null,
  duration_min integer default 0,
  effort integer check (effort between 1 and 10),
  notes text,
  created_at timestamptz default now()
);

create table public.exercise_logs (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references public.workouts(id) on delete cascade,
  name text not null,
  muscle_group text not null,
  notes text,
  created_at timestamptz default now()
);

create table public.exercise_sets (
  id uuid primary key default gen_random_uuid(),
  exercise_log_id uuid references public.exercise_logs(id) on delete cascade,
  set_number integer not null,
  reps integer not null,
  weight numeric(6,2) not null,
  rir integer check (rir between 0 and 5)
);

create table public.body_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  date date not null,
  body_weight numeric(5,2),
  chest numeric(5,2),
  waist numeric(5,2),
  arm numeric(5,2),
  thigh numeric(5,2),
  created_at timestamptz default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  current_value numeric(8,2) default 0,
  target_value numeric(8,2) not null,
  unit text not null,
  created_at timestamptz default now()
);

alter table public.workouts enable row level security;
alter table public.exercise_logs enable row level security;
alter table public.exercise_sets enable row level security;
alter table public.body_metrics enable row level security;
alter table public.goals enable row level security;
