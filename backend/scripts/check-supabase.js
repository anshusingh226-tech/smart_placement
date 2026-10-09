// Run:  node scripts/check-supabase.js [--create-buckets]
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing values in backend/.env");
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Columns the backend routes rely on
const expected = {
  profiles: "id,email,role",
  companies: "id,name,description,industry,website,location,logo_url,created_by,created_at",
  skills: "id,name,description,is_active,created_at",
  questions: "id,question,question_type,options,correct_answer,difficulty,marks,negative_marks,skill_id,is_active",
  assessments: "id,title,description,skill_id,duration_minutes,number_of_questions,passing_percentage,negative_marking,random_question_selection,is_active",
  students: "id,name,phone,department,branch,graduation_year,cgpa",
  jobs: "id,company_id,created_by,role,description,salary,location,employment_type,deadline,required_skills,required_skill_percentage,minimum_aptitude_percentage,minimum_cgpa,eligible_branches,created_at",
  applications: "id,job_id,student_id,status,applied_at,created_at,match_percentage,extracted_skills,missing_skills",
  student_skill_scores: "student_id,skill_id,score",
  resumes: "id,student_id,file_url,file_name,file_path,uploaded_at",
  notifications: "id,student_id,title,message,is_read,created_at",
};

(async () => {
  console.log("Project:", new URL(SUPABASE_URL).host, "\n");
  let problems = 0;

  for (const [table, cols] of Object.entries(expected)) {
    const { error } = await admin.from(table).select(cols, { head: true, count: "exact" });
    if (error) {
      problems++;
      console.log(`PROBLEM  ${table}: ${error.message}`);
    } else console.log(`ok       ${table}`);
  }

  for (const fn of ["is_admin", "is_officer", "officer_can_see_student"]) {
    const args = fn === "officer_can_see_student"
      ? { p_student: "00000000-0000-0000-0000-000000000000" } : {};
    const { error } = await admin.rpc(fn, args);
    if (error?.code === "PGRST202") { problems++; console.log(`MISSING  function ${fn}()`); }
    else console.log(`ok       function ${fn}()`);
  }

  const { data: buckets } = await admin.storage.listBuckets();
  const names = (buckets || []).map((b) => b.name);
  for (const b of ["resumes", "company-logos"]) {
    if (names.includes(b)) { console.log(`ok       bucket ${b}`); continue; }
    if (process.argv.includes("--create-buckets")) {
      const { error } = await admin.storage.createBucket(b, { public: b === "company-logos" });
      console.log(error ? `FAILED   bucket ${b}: ${error.message}` : `created  bucket ${b}`);
    } else { problems++; console.log(`MISSING  bucket ${b}  (run with --create-buckets)`); }
  }

  const { data: users } = await admin.from("profiles").select("role");
  const count = (r) => (users || []).filter((u) => u.role === r).length;
  console.log(`\nProfiles: ${count("admin")} admin, ${count("placement-officer")} officer, ${count("student")} student`);
  console.log(problems ? `\n${problems} problem(s) found.` : "\nAll good.");
})();
