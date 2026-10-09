/*
 * Small dependency-free validators. Each returns { value } or { errors }.
 * Unknown fields are dropped (mass-assignment protection), strings are
 * trimmed and stripped of angle brackets (basic XSS hardening; React also
 * escapes on output).
 */

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Internship", "Contract"];
const APPLICATION_STATUSES = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Rejected",
  "Selected",
];

const isUuid = (v) => typeof v === "string" && UUID_RE.test(v);

const clean = (v) =>
  typeof v === "string" ? v.replace(/[<>]/g, "").trim() : v;

function num(v) {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function validateCompany(body = {}, { partial = false } = {}) {
  const errors = [];
  const value = {};
  for (const f of ["name", "description", "industry", "website", "location", "logo_url"]) {
    if (body[f] !== undefined) value[f] = clean(body[f]);
  }
  if (!partial && !value.name) errors.push("name is required.");
  if (value.website && !/^https?:\/\//i.test(value.website))
    errors.push("website must start with http:// or https://");
  return errors.length ? { errors } : { value };
}

function validateJob(body = {}, { partial = false } = {}) {
  const errors = [];
  const value = {};

  for (const f of ["role", "description", "location"]) {
    if (body[f] !== undefined) value[f] = clean(body[f]);
  }

  if (body.company_id !== undefined) {
    if (!isUuid(body.company_id)) errors.push("company_id must be a valid id.");
    else value.company_id = body.company_id;
  }

  if (body.employment_type !== undefined) {
    if (!EMPLOYMENT_TYPES.includes(body.employment_type))
      errors.push(`employment_type must be one of: ${EMPLOYMENT_TYPES.join(", ")}.`);
    else value.employment_type = body.employment_type;
  }

  if (body.deadline !== undefined && body.deadline !== "") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.deadline) || isNaN(Date.parse(body.deadline)))
      errors.push("deadline must be a date in YYYY-MM-DD format.");
    else value.deadline = body.deadline;
  }

  const ranges = {
    salary: [0, 1e12],
    required_skill_percentage: [0, 100],
    minimum_aptitude_percentage: [0, 100],
    minimum_cgpa: [0, 10],
  };
  for (const [f, [lo, hi]] of Object.entries(ranges)) {
    if (body[f] === undefined) continue;
    const n = num(body[f]);
    if (n === undefined) continue;
    if (Number.isNaN(n) || n < lo || n > hi)
      errors.push(`${f} must be a number between ${lo} and ${hi}.`);
    else value[f] = n;
  }

  for (const f of ["eligible_branches", "required_skills"]) {
    if (body[f] === undefined) continue;
    if (!Array.isArray(body[f]) || !body[f].every((x) => typeof x === "string"))
      errors.push(`${f} must be an array of text values.`);
    else value[f] = [...new Set(body[f].map(clean).filter(Boolean))];
  }

  if (!partial) {
    if (!value.role) errors.push("role is required.");
    if (!value.company_id && body.company_id === undefined) errors.push("company_id is required.");
  }

  return errors.length ? { errors } : { value };
}

function validateStatus(body = {}) {
  if (!APPLICATION_STATUSES.includes(body.status))
    return { errors: [`status must be one of: ${APPLICATION_STATUSES.join(", ")}.`] };
  return { value: { status: body.status } };
}

module.exports = {
  isUuid,
  validateCompany,
  validateJob,
  validateStatus,
  EMPLOYMENT_TYPES,
  APPLICATION_STATUSES,
};
