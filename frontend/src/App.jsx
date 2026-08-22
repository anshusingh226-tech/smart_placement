import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentOpportunities from "./pages/student/StudentOpportunities";
import StudentApplications from "./pages/student/StudentApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="opportunities" element={<StudentOpportunities />} />
          <Route path="applications" element={<StudentApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;