-- Stores the per-component match breakdown shown in the officer view.
-- Safe to run more than once.
alter table public.applications add column if not exists ai_breakdown jsonb;
