const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const authenticate = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Every endpoint in this router requires a valid session and Admin role.
router.use(authenticate);
router.use(adminAuth);

router.get("/test", (req, res) => {
  res.json({ success: true, message: "Admin authorization is working." });
});

// Use the caller's access token so Supabase RLS is still enforced.
function userSupabase(req) {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: req.headers.authorization } },
    }
  );
}

const resources = {
  companies: {
    fields: ["name", "description", "industry", "website", "location", "logo_url"],
    required: ["name"],
  },
  skills: {
    fields: ["name", "description", "is_active"],
    required: ["name"],
  },
  questions: {
    fields: ["question", "question_type", "options", "correct_answer", "difficulty", "marks", "negative_marks", "skill_id", "is_active"],
    required: ["question", "question_type", "skill_id"],
  },
  assessments: {
    fields: ["title", "description", "skill_id", "duration_minutes", "number_of_questions", "passing_percentage", "negative_marking", "random_question_selection", "is_active"],
    required: ["title", "skill_id"],
  },
};

function cleanBody(resource, body) {
  const allowed = resources[resource].fields;
  return Object.fromEntries(
    Object.entries(body || {}).filter(([key, value]) => allowed.includes(key) && value !== undefined)
  );
}

function sendError(res, error, fallback) {
  // Return the database message to help diagnose validation/FK issues; never return secrets.
  console.error(fallback, error?.message || error);
  return res.status(400).json({ success: false, message: error?.message || fallback });
}

for (const [resource, config] of Object.entries(resources)) {
  router.get(`/${resource}`, async (req, res) => {
    const { data, error } = await userSupabase(req)
      .from(resource)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return sendError(res, error, `Unable to load ${resource}.`);
    return res.json({ success: true, data: data || [] });
  });

  router.post(`/${resource}`, async (req, res) => {
    const payload = cleanBody(resource, req.body);
    const missing = config.required.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === "");
    if (missing.length) {
      return res.status(400).json({ success: false, message: `Required fields: ${missing.join(", ")}.` });
    }
    if (resource === "companies") payload.created_by = req.user.id;
    const { data, error } = await userSupabase(req)
      .from(resource)
      .insert(payload)
      .select("*")
      .single();
    if (error) return sendError(res, error, `Unable to create ${resource.slice(0, -1)}.`);
    return res.status(201).json({ success: true, data });
  });

  router.put(`/${resource}/:id`, async (req, res) => {
    const payload = cleanBody(resource, req.body);
    if (!Object.keys(payload).length) {
      return res.status(400).json({ success: false, message: "Provide at least one field to update." });
    }
    const { data, error } = await userSupabase(req)
      .from(resource)
      .update(payload)
      .eq("id", req.params.id)
      .select("*")
      .single();
    if (error) return sendError(res, error, `Unable to update ${resource.slice(0, -1)}.`);
    return res.json({ success: true, data });
  });

  router.delete(`/${resource}/:id`, async (req, res) => {
    const { error } = await userSupabase(req)
      .from(resource)
      .delete()
      .eq("id", req.params.id);
    if (error) return sendError(res, error, `Unable to delete ${resource.slice(0, -1)}.`);
    return res.json({ success: true, message: `${resource.slice(0, -1)} deleted.` });
  });
}

module.exports = router;
