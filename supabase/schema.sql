-- Saozi Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Extends Supabase Auth Users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('organizer', 'model', 'md')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Users can read their own profile. Anyone can read basic public info.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. Jobs Table (Organizer creates)
CREATE TABLE public.jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organizer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_datetime TIMESTAMPTZ NOT NULL,
  location_detail TEXT NOT NULL,
  pay_amount TEXT NOT NULL,
  required_headcount INTEGER NOT NULL DEFAULT 1,
  requirements TEXT,
  status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are viewable by everyone." ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Organizers can insert jobs" ON public.jobs FOR INSERT WITH CHECK (
  auth.uid() = organizer_id AND 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'organizer')
);
CREATE POLICY "Organizers can update own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = organizer_id);

-- 3. Applications Table (Models / MDs applying)
CREATE TABLE public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  model_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  applied_by_md_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Null if model applied directly
  status TEXT DEFAULT 'PENDING_VERIFICATION' CHECK (status IN ('PENDING_VERIFICATION', 'VERIFIED', 'ACCEPTED', 'REJECTED')),
  verification_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, model_id) -- One application per model per job
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
-- Organizers can see applications for their jobs
CREATE POLICY "Organizers can view applications for their jobs" ON public.applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs WHERE id = public.applications.job_id AND organizer_id = auth.uid())
);
-- Models can see their own applications
CREATE POLICY "Models can view their own applications" ON public.applications FOR SELECT USING (auth.uid() = model_id);
-- MDs can see applications they made
CREATE POLICY "MDs can view applications they made" ON public.applications FOR SELECT USING (auth.uid() = applied_by_md_id);
-- Models can insert directly
CREATE POLICY "Models can insert applications" ON public.applications FOR INSERT WITH CHECK (
  auth.uid() = model_id AND applied_by_md_id IS NULL
);
-- MDs can insert for their models
CREATE POLICY "MDs can insert applications for models" ON public.applications FOR INSERT WITH CHECK (
  auth.uid() = applied_by_md_id
);
-- Models can update (to upload verification photo)
CREATE POLICY "Models can update their applications" ON public.applications FOR UPDATE USING (auth.uid() = model_id);
-- Organizers can update (to accept/reject)
CREATE POLICY "Organizers can update applications for their jobs" ON public.applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.jobs WHERE id = public.applications.job_id AND organizer_id = auth.uid())
);

-- 4. Agency Models (MD's roster)
CREATE TABLE public.agency_models (
  md_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  model_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (md_id, model_id)
);

ALTER TABLE public.agency_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "MDs can view their roster" ON public.agency_models FOR SELECT USING (auth.uid() = md_id);
CREATE POLICY "Models can view their agencies" ON public.agency_models FOR SELECT USING (auth.uid() = model_id);
CREATE POLICY "MDs can manage their roster" ON public.agency_models FOR ALL USING (auth.uid() = md_id);

-- Storage bucket for verification photos (Manual setup required in Supabase Dashboard)
-- insert into storage.buckets (id, name) values ('verifications', 'verifications');
-- create policy "Models can upload verification photos" on storage.objects for insert with check (bucket_id = 'verifications' and auth.uid() = owner);
