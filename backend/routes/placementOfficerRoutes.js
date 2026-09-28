const express = require("express");
const authenticate = require("../middleware/auth");
const placementOfficerAuth = require("../middleware/placementOfficerAuth");

const {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getDashboard,
  getApplications,
} = require("../controllers/placementOfficerController");

const router = express.Router();

router.use(authenticate);
router.use(placementOfficerAuth);

// Test
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Placement Officer authorization is working.",
  });
});

// Companies
router.get("/companies", getCompanies);
router.post("/companies", createCompany);
router.put("/companies/:companyId", updateCompany);
router.delete("/companies/:companyId", deleteCompany);

// Jobs
router.get("/jobs", getJobs);
router.post("/jobs", createJob);
router.put("/jobs/:jobId", updateJob);
router.delete("/jobs/:jobId", deleteJob);
router.get("/dashboard", getDashboard);
router.get("/applications", getApplications);

module.exports = router;