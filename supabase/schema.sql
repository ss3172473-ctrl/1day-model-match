-- 1. Enum types creation
CREATE TYPE user_role AS ENUM ('ORGANIZER', 'MODEL', 'MD');
CREATE TYPE job_status AS ENUM ('OPEN', 'CLOSED', 'CANCELLED');
CREATE TYPE application_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- 2. Users Table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Model Profiles Table
CREATE TABLE public.model_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  height INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  photos TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT,
  instagram_id TEXT,
  experience TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Job Posts Table
CREATE TABLE public.job_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  event_datetime TIMESTAMPTZ NOT NULL,
  location_detail TEXT NOT NULL,
  pay_amount TEXT NOT NULL,
  required_headcount INTEGER NOT NULL,
  additional_requirements TEXT,
  status job_status DEFAULT 'OPEN',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Applications Table
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_post_id UUID REFERENCES public.job_posts(id) ON DELETE CASCADE NOT NULL,
  applicant_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  model_profile_id UUID REFERENCES public.model_profiles(id) ON DELETE CASCADE NOT NULL,
  live_photo_url TEXT NOT NULL,
  status application_status DEFAULT 'PENDING',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevent applying multiple times to the same job post with the same model profile
  UNIQUE(job_post_id, model_profile_id)
);

-- Row Level Security (RLS) setup (Basic template, needs refining for production)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow all for now (Testing purposes MVP)
CREATE POLICY "Allow all actions for authenticated users" ON public.users FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all actions for authenticated model_profiles" ON public.model_profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all actions for authenticated job_posts" ON public.job_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all actions for authenticated applications" ON public.applications FOR ALL TO authenticated USING (true);

-- Allow read for anon
CREATE POLICY "Allow read for anon" ON public.job_posts FOR SELECT TO anon USING (true);
