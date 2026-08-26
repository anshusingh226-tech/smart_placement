import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==================== STUDENT ====================
import LoginPage from "./pages/auth/LoginPage";
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentOpportunities from "./pages/student/StudentOpportunities";
import StudentApplications from "./pages/student/StudentApplications";

// ==================== ADMIN ====================
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import SkillsAssessments from "./pages/admin/SkillsAssessments";
import Companies from "./pages/admin/Companies";

// ==================== PLACEMENT OFFICER ====================
import PlacementOfficerLayout from "./layouts/PlacementOfficerLayout";
import PlacementOfficerDashboard from "./pages/placement-officer/PlacementOfficerDashboard";
import CompaniesJobs from "./pages/placement-officer/CompaniesJobs";
import Applications from "./pages/placement-officer/Applications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== LOGIN ==================== */}

        <Route path="/" element={<LoginPage />} />

        {/* ==================== STUDENT ==================== */}

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="opportunities" element={<StudentOpportunities />} />
          <Route path="applications" element={<StudentApplications />} />
        </Route>

        {/* ==================== ADMIN ==================== */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="skills-assessments" element={<SkillsAssessments />} />
          <Route path="companies" element={<Companies />} />
        </Route>

        {/* ==================== PLACEMENT OFFICER ==================== */}

        <Route
          path="/placement-officer"
          element={<PlacementOfficerLayout />}
        >
          <Route
            index
            element={<PlacementOfficerDashboard />}
          />

          <Route
            path="companies-jobs"
            element={<CompaniesJobs />}
          />

          <Route
            path="applications"
            element={<Applications />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;