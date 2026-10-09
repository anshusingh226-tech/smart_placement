// Run:  node scripts/list-users.js   -> shows each account's email and role
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const s = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
(async () => {
  const { data, error } = await s.from("profiles").select("id,email,role");
  if (error) return console.error(error.message);
  console.table(data.map((u) => ({ email: u.email, role: u.role })));
})();
