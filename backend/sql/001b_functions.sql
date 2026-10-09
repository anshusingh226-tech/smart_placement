-- Run this part on its own in the Supabase SQL editor. Safe to re-run.

-- 3. Helper functions (SECURITY DEFINER avoids RLS recursion) ----------
create or replace function public.current_app_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.is_officer()
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce(public.current_app_role() = 'placement-officer', false) $$;

create or replace function public.is_student()
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce(public.current_app_role() = 'student', false) $$;

-- True when the signed-in officer created a job this student applied to.
create or replace function public.officer_can_see_student(p_student uuid)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.applications a
    join public.jobs j on j.id = a.job_id
    where a.student_id = p_student and j.created_by = auth.uid()
  )
$$;

