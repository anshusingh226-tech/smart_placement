const supabase = require("../config/supabase");

// =========================
// COMPANIES
// =========================

const getCompanies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get companies error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch companies.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      companies: data || [],
    });
  } catch (error) {
    console.error("Get companies exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch companies.",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      industry,
      website,
      location,
      logo_url,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name: name.trim(),
          description: description || null,
          industry: industry || null,
          website: website || null,
          location: location || null,
          logo_url: logo_url || null,
          created_by: req.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create company error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to create company.",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company: data,
    });
  } catch (error) {
    console.error("Create company exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create company.",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const {
      name,
      description,
      industry,
      website,
      location,
      logo_url,
    } = req.body;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    const { data, error } = await supabase
      .from("companies")
      .update({
        name: name.trim(),
        description: description || null,
        industry: industry || null,
        website: website || null,
        location: location || null,
        logo_url: logo_url || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", companyId)
      .eq("created_by", req.user.id)
      .select()
      .single();

    if (error) {
      console.error("Update company error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update company.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company: data,
    });
  } catch (error) {
    console.error("Update company exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update company.",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required.",
      });
    }

    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", companyId)
      .eq("created_by", req.user.id);

    if (error) {
      console.error("Delete company error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete company.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Delete company exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete company.",
    });
  }
};


// =========================
// JOBS
// =========================

const getJobs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select(`
        *,
        companies (
          id,
          name,
          industry,
          website,
          location,
          logo_url
        )
      `)
      .eq("created_by", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get jobs error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch jobs.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      jobs: data || [],
    });
  } catch (error) {
    console.error("Get jobs exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs.",
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      company_id,
      role,
      description,
      salary,
      location,
      employment_type,
      deadline,
      required_skills,
      required_skill_percentage,
      minimum_aptitude_percentage,
      minimum_cgpa,
      eligible_branches,
    } = req.body;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company is required.",
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job role is required.",
      });
    }

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          company_id,
          role: role.trim(),
          description: description || null,
          salary: salary ?? null,
          location: location || null,
          employment_type: employment_type || null,
          deadline: deadline || null,
          required_skills: required_skills || [],
          required_skill_percentage:
            required_skill_percentage ?? null,
          minimum_aptitude_percentage:
            minimum_aptitude_percentage ?? null,
          minimum_cgpa: minimum_cgpa ?? null,
          eligible_branches: eligible_branches || [],
          created_by: req.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create job error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to create job.",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job: data,
    });
  } catch (error) {
    console.error("Create job exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job.",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const {
      company_id,
      role,
      description,
      salary,
      location,
      employment_type,
      deadline,
      required_skills,
      required_skill_percentage,
      minimum_aptitude_percentage,
      minimum_cgpa,
      eligible_branches,
    } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job role is required.",
      });
    }

    const { data, error } = await supabase
      .from("jobs")
      .update({
        company_id,
        role: role.trim(),
        description: description || null,
        salary: salary ?? null,
        location: location || null,
        employment_type: employment_type || null,
        deadline: deadline || null,
        required_skills: required_skills || [],
        required_skill_percentage:
          required_skill_percentage ?? null,
        minimum_aptitude_percentage:
          minimum_aptitude_percentage ?? null,
        minimum_cgpa: minimum_cgpa ?? null,
        eligible_branches: eligible_branches || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId)
      .eq("created_by", req.user.id)
      .select()
      .single();

    if (error) {
      console.error("Update job error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update job.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job: data,
    });
  } catch (error) {
    console.error("Update job exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job.",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId)
      .eq("created_by", req.user.id);

    if (error) {
      console.error("Delete job error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete job.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Delete job exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job.",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const { count: totalJobs, error: jobsError } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("created_by", req.user.id);

    if (jobsError) {
      console.error("Dashboard jobs error:", jobsError);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch total jobs.",
        error: jobsError.message,
      });
    }

    const { data: officerJobs, error: officerJobsError } = await supabase
      .from("jobs")
      .select("id")
      .eq("created_by", req.user.id);

    if (officerJobsError) {
      console.error("Dashboard officer jobs error:", officerJobsError);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch officer jobs.",
        error: officerJobsError.message,
      });
    }

    const jobIds = (officerJobs || []).map((job) => job.id);

    let totalApplications = 0;
    let recentApplications = [];

    if (jobIds.length > 0) {
      const { count: applicationCount, error: applicationsError } =
        await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .in("job_id", jobIds);

      if (applicationsError) {
        console.error(
          "Dashboard applications error:",
          applicationsError
        );

        return res.status(500).json({
          success: false,
          message: "Failed to fetch total applications.",
          error: applicationsError.message,
        });
      }

      totalApplications = applicationCount || 0;

      const { data: recentData, error: recentError } = await supabase
        .from("applications")
        .select(`
          id,
          student_id,
          job_id,
          status,
          applied_at,
          jobs (
            id,
            role,
            companies (
              id,
              name
            )
          ),
          students (
            id,
            name
          )
        `)
        .in("job_id", jobIds)
        .order("applied_at", { ascending: false })
        .limit(5);

      if (recentError) {
        console.error(
          "Dashboard recent applications error:",
          recentError
        );

        return res.status(500).json({
          success: false,
          message: "Failed to fetch recent applications.",
          error: recentError.message,
        });
      }

      recentApplications = recentData || [];
    }

    return res.status(200).json({
      success: true,
      dashboard: {
        totalJobs: totalJobs || 0,
        totalApplications,
        recentApplications,
      },
    });
  } catch (error) {
    console.error("Dashboard exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
    });
  }
};

const getApplications = async (req, res) => {
  try {
    // Get jobs created by the logged-in Placement Officer
    const { data: officerJobs, error: jobsError } = await supabase
      .from("jobs")
      .select(`
        id,
        role,
        company_id,
        companies (
          id,
          name
        )
      `)
      .eq("created_by", req.user.id);

    if (jobsError) {
      console.error("Get officer jobs error:", jobsError);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch officer jobs.",
        error: jobsError.message,
      });
    }

    const jobIds = (officerJobs || []).map((job) => job.id);

    if (jobIds.length === 0) {
      return res.status(200).json({
        success: true,
        applications: [],
      });
    }

    // Get applications for those jobs
    const { data: applications, error: applicationsError } =
      await supabase
        .from("applications")
        .select(`
          id,
          student_id,
          job_id,
          status,
          applied_at
        `)
        .in("job_id", jobIds)
        .order("applied_at", { ascending: false });

    if (applicationsError) {
      console.error("Get applications error:", applicationsError);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch applications.",
        error: applicationsError.message,
      });
    }

    const studentIds = [
      ...new Set(
        (applications || []).map(
          (application) => application.student_id
        )
      ),
    ];

    let students = [];

    if (studentIds.length > 0) {
      const { data: studentData, error: studentsError } =
        await supabase
          .from("students")
          .select(`
            id,
            name
          `)
          .in("id", studentIds);

      if (studentsError) {
        console.error("Get students error:", studentsError);

        return res.status(500).json({
          success: false,
          message: "Failed to fetch student details.",
          error: studentsError.message,
        });
      }

      students = studentData || [];
    }

    const formattedApplications = (applications || []).map(
      (application) => {
        const job = officerJobs.find(
          (item) => item.id === application.job_id
        );

        const student = students.find(
          (item) => item.id === application.student_id
        );

        return {
          id: application.id,
          student_id: application.student_id,
          job_id: application.job_id,
          student_name: student?.name || "Unknown Student",
          job_role: job?.role || "Unknown Job",
          company_name: job?.companies?.name || "Unknown Company",
          status: application.status,
          applied_at: application.applied_at,
        };
      }
    );

    return res.status(200).json({
      success: true,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Get applications exception:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
};

module.exports = {
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
};