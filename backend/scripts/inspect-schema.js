// Run:  node scripts/inspect-schema.js
// Prints the real columns of each table and what is missing vs what the backend needs.
require("dotenv").config();
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: KEY } = process.env;

const expected = {
  students: "id,full_name,phone,department,branch,graduation_year,cgpa",
  jobs: "id,company_id,officer_id,role,description,salary,location,employment_type,deadline,required_skill_percentage,min_aptitude_percentage,min_cgpa,eligible_branches,is_active,created_at",
  job_skills: "job_id,skill_id",
  applications: "id,job_id,student_id,status,match_percentage,extracted_skills,missing_skills,created_at",
  student_skill_scores: "student_id,skill_id,highest_percentage,attempts",
  resumes: "id,student_id,file_path,uploaded_at",
  notifications: "id,user_id,title,message,is_read,created_at",
  companies: "id,name,description,industry,website,location,logo_url,created_by",
  skills: "id,name,is_active",
};

(async () => {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!r.ok) return console.error("Could not read schema:", r.status, await r.text());
  const defs = (await r.json()).definitions || {};
  for (const [table, cols] of Object.entries(expected)) {
    const props = defs[table]?.properties;
    console.log(`\n== ${table}`);
    if (!props) { console.log("   TABLE NOT FOUND"); continue; }
    const have = Object.entries(props).map(([c, p]) => `${c}:${p.format || p.type}`);
    console.log("   has:    ", have.join(", "));
    const missing = cols.split(",").filter((c) => !(c in props));
    console.log("   missing:", missing.length ? missing.join(", ") : "(none)");
  }
})();
