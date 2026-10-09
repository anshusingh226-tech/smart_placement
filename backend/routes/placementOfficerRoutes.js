const express = require("express");
const authenticate = require("../middleware/auth");
const placementOfficerAuth = require("../middleware/placementOfficerAuth");
const {
  getDashboard,
  getSkills,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  getApplicationDetail,
  updateApplicationStatus,
} = require("../controllers/placementOfficerController");

const router = express.Router();

// Every route needs a valid session AND the placement-officer role
router.use(authenticate);
router.use(placementOfficerAuth);

router.get("/test", (req, res) => {
  res.json({ success: true, message: "Placement Officer authorization is working." });
});

router.get("/dashboard", getDashboard);
router.get("/skills", getSkills);
router.get("/companies", getCompanies);
router.post("/companies", createCompany);
router.put("/companies/:id", updateCompany);
router.delete("/companies/:id", deleteCompany);
router.get("/jobs", getJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationDetail);
router.patch("/applications/:id/status", updateApplicationStatus);

// Unexpected errors
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  console.error("[placement-officer] unhandled:", err);
  res.status(500).json({ success: false, message: "Internal server error." });
});

module.exports = router;
