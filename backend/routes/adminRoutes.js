const express = require("express");
const authenticate = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// All Admin routes require authentication and Admin role
router.use(authenticate);
router.use(adminAuth);

// Test Admin endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin authorization is working.",
  });
});

module.exports = router;