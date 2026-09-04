import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==================== AUTH ====================
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ==================== PROTECTED ROUTE ====================
import ProtectedRoute from "./components/ProtectedRoute";

// ==================== STUDENT ====================
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentOpportunities from "./pages/student/StudentOpportunities";
import StudentApplications from "./pages/student/StudentApplications";
import Assessments from "./pages/student/Assessments";
import AssessmentsAttempts from "./pages/student/AssessmentsAttempts";
import Results from "./pages/student/Results";
import SkillScores from "./pages/student/SkillScores";

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

        {/* ==================== AUTH ==================== */}

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* ==================== STUDENT ==================== */}

        <Route element={<ProtectedRoute role="student" />}>

          <Route path="/student" element={<StudentLayout />}>

            <Route
              index
              element={<StudentDashboard />}
            />

            <Route
              path="profile"
              element={<StudentProfile />}
            />

            <Route
              path="opportunities"
              element={<StudentOpportunities />}
            />

            <Route
              path="applications"
              element={<StudentApplications />}
            />

            <Route
              path="assessments"
              element={<Assessments />}
            />

            <Route
              path="assessment-attempts"
              element={<AssessmentsAttempts />}
            />

            <Route
              path="results"
              element={<Results />}
            />

            <Route
              path="skill-scores"
              element={<SkillScores />}
            />

          </Route>

        </Route>


        {/* ==================== ADMIN ==================== */}

        <Route element={<ProtectedRoute role="admin" />}>

          <Route path="/admin" element={<AdminLayout />}>

            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="users"
              element={<UserManagement />}
            />

            <Route
              path="skills-assessments"
              element={<SkillsAssessments />}
            />

            <Route
              path="companies"
              element={<Companies />}
            />

          </Route>

        </Route>


        {/* ==================== PLACEMENT OFFICER ==================== */}

        <Route
          element={
            <ProtectedRoute role="placement-officer" />
          }
        >

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

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;