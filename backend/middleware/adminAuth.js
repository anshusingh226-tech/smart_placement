
const { createClient } = require("@supabase/supabase-js");

const adminAuth = async (req, res, next) => {
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
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const { data: isAdmin, error } =
      await userSupabase.rpc("is_admin");

    if (error) {
      console.error("Admin authorization check failed:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to verify administrator access.",
      });
    }

    if (isAdmin !== true) {
      return res.status(403).json({
        success: false,
        message: "Administrator access required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify administrator access.",
    });
  }
};

module.exports = adminAuth;
