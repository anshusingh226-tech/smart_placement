// Run:  node scripts/check-rls.js
// Shows whether the plain anon key (what the student/officer controllers on
// main use, with no user token) can still read each table.
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL: U, SUPABASE_ANON_KEY: A, SUPABASE_SERVICE_ROLE_KEY: S } = process.env;
const anon = createClient(U, A, { auth: { persistSession: false } });
const svc = createClient(U, S, { auth: { persistSession: false } });

(async () => {
  console.log("table                  rows(total)  rows(anon sees)  verdict");
  for (const t of ["students", "jobs", "applications", "student_skill_scores", "resumes", "notifications", "companies", "skills"]) {
    const a = await svc.from(t).select("*", { count: "exact", head: true });
    const b = await anon.from(t).select("*", { count: "exact", head: true });
    const total = a.count ?? "?";
    const seen = b.error ? "error" : b.count;
    const blocked = total > 0 && seen === 0;
    console.log(
      `${t.padEnd(22)} ${String(total).padEnd(12)} ${String(seen).padEnd(16)} ${blocked || b.error ? "BLOCKED for anon-key code" : "ok"}`
    );
  }
})();
