-- =====================================================================
-- 002_restore_open_access_for_team_code.sql
--
-- WHY: the student backend (branch backend-yahvi) and the officer
-- controller on main query Supabase with the plain anon key and NO user
-- token. With row-level security ON, Postgres treats them as an anonymous
-- visitor and returns no rows. 001c turned RLS on for these tables.
--
-- This puts those six tables back to how they were before (RLS off) so
-- teammates' code works again. The policies from 001c stay defined but
-- are inactive while RLS is off. Safe to re-run.
--
-- To turn protection back on later: re-enable RLS AFTER the controllers
-- are changed to use the signed-in user's token (like adminRoutes.js does).
-- =====================================================================
alter table public.students             disable row level security;
alter table public.jobs                 disable row level security;
alter table public.applications         disable row level security;
alter table public.student_skill_scores disable row level security;
alter table public.resumes              disable row level security;
alter table public.notifications        disable row level security;
