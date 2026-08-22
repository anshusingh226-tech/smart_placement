import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import SkillsAssessments from './pages/admin/SkillsAssessments'
import Companies from './pages/admin/Companies'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route
            path="skills-assessments"
            element={<SkillsAssessments />}
          />
          <Route path="companies" element={<Companies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App