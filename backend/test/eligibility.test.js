const test = require("node:test");
const assert = require("node:assert");
const { evaluateEligibility } = require("../services/eligibilityService");
const v = require("../utils/validators");

const job = {
  min_aptitude_percentage: 65,
  required_skill_percentage: 60,
  min_cgpa: 7,
  eligible_branches: ["CSE", "IT"],
};
const java = { id: "j", name: "Java" };
const sql = { id: "s", name: "SQL" };

test("eligible when every rule is met", () => {
  const r = evaluateEligibility({
    job, requiredSkills: [java, sql],
    scores: [{ skill_id: "j", highest_percentage: 70 }, { skill_id: "s", highest_percentage: 60 }],
    aptitudePercentage: 65, student: { cgpa: 7, branch: "cse" },
  });
  assert.equal(r.eligible, true);
  assert.deepEqual(r.reasons, []);
});

test("aptitude not attempted blocks and explains", () => {
  const r = evaluateEligibility({ job, requiredSkills: [], scores: [], aptitudePercentage: null, student: { cgpa: 8, branch: "CSE" } });
  assert.equal(r.aptitudeMet, false);
  assert.equal(r.eligible, false);
  assert.match(r.reasons[0], /not attempted/);
});

test("aptitude just below threshold fails", () => {
  const r = evaluateEligibility({ job, requiredSkills: [], scores: [], aptitudePercentage: 64.99, student: { cgpa: 8, branch: "CSE" } });
  assert.equal(r.aptitudeMet, false);
});

test("missing and low skills are reported separately", () => {
  const r = evaluateEligibility({
    job, requiredSkills: [java, sql],
    scores: [{ skill_id: "j", highest_percentage: 50 }],
    aptitudePercentage: 80, student: { cgpa: 8, branch: "IT" },
  });
  assert.equal(r.skillMet, false);
  assert.equal(r.reasons.length, 2);
  assert.match(r.reasons[0], /Java score 50%/);
  assert.match(r.reasons[1], /SQL assessment not attempted/);
});

test("low CGPA and wrong branch fail", () => {
  const r = evaluateEligibility({ job, requiredSkills: [], scores: [], aptitudePercentage: 90, student: { cgpa: 6.5, branch: "ME" } });
  assert.equal(r.cgpaMet, false);
  assert.equal(r.branchMet, false);
  assert.equal(r.eligible, false);
});

test("empty branch list means all branches allowed", () => {
  const r = evaluateEligibility({ job: { ...job, eligible_branches: [] }, requiredSkills: [], scores: [], aptitudePercentage: 90, student: { cgpa: 8, branch: "ME" } });
  assert.equal(r.branchMet, true);
});

test("job validator rejects bad input and drops unknown fields", () => {
  const bad = v.validateJob({ role: "Dev", company_id: "nope", minimum_cgpa: 11, employment_type: "Gig" });
  assert.ok(bad.errors.length >= 3);
  const ok = v.validateJob({
    role: " <b>Dev</b> ", company_id: "123e4567-e89b-12d3-a456-426614174000",
    minimum_cgpa: "7.5", salary: "600000", created_by: "hacker", required_skills: ["Java", "Java", "SQL"],
  });
  assert.equal(ok.value.role, "bDev/b");
  assert.equal(ok.value.minimum_cgpa, 7.5);
  assert.equal(ok.value.salary, 600000);
  assert.equal(ok.value.created_by, undefined);
  assert.deepEqual(ok.value.required_skills, ["Java", "SQL"]);
});

test("status validator only accepts known statuses", () => {
  assert.ok(v.validateStatus({ status: "Selected" }).value);
  assert.ok(v.validateStatus({ status: "Hacked" }).errors);
});
