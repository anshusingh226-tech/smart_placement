import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'
import PlacementOfficerLayout from './layouts/PlacementOfficerLayout'

import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import SkillsAssessments from './pages/admin/SkillsAssessments'
import Companies from './pages/admin/Companies'

import PlacementOfficerDashboard from './pages/placement-officer/PlacementOfficerDashboard'
import CompaniesJobs from './pages/placement-officer/CompaniesJobs'
import Applications from './pages/placement-officer/Applications'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== ADMIN ==================== */}

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


        {/* ============== PLACEMENT OFFICER ============== */}

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
  )
}

export default App