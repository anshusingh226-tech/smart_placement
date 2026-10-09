-- Run this part on its own in the Supabase SQL editor. Safe to re-run.

-- 1/2. Missing columns -------------------------------------------------
alter table public.applications
  add column if not exists match_percentage numeric(5,2),
  add column if not exists extracted_skills text[] not null default '{}',
  add column if not exists missing_skills   text[] not null default '{}';

alter table public.resumes
  add column if not exists file_path text;

