const { createClient } = require("@supabase/supabase-js");

/*
 * Allows only Placement Officers.
 * Mirrors adminAuth.js: asks the database (is_officer() RPC) using the
 * caller's own token, so the role can never be spoofed by the client.
 * Must run after the `authenticate` middleware.
 */
const officerAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const userSupabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: isOfficer, error } = await userSupabase.rpc("is_officer");

    if (error) {
      console.error("Officer authorization check failed:", error.message);
      return res.status(500).json({
        success: false,
        message: "Unable to verify placement officer access.",
      });
    }

    if (isOfficer !== true) {
      return res.status(403).json({
        success: false,
        message: "Placement officer access required.",
      });
    }

    next();
  } catch (error) {
    console.error("Officer authorization error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to verify placement officer access.",
    });
  }
};

module.exports = officerAuth;
