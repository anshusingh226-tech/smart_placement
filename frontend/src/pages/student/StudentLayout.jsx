import { NavLink, Outlet } from "react-router-dom";

function StudentLayout() {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-white text-slate-900"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <aside className="w-full bg-slate-900 p-6 md:w-64 md:min-h-screen">
        <h1 className="text-lg font-bold text-white">Smart Placement</h1>
        <p className="mb-8 text-sm text-slate-400">Student Portal</p>

        <nav className="space-y-1">
          <NavLink to="/student" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/student/profile" className={linkClass}>
            My Profile
          </NavLink>
          <NavLink to="/student/opportunities" className={linkClass}>
            Opportunities
          </NavLink>
          <NavLink to="/student/applications" className={linkClass}>
            Applications
          </NavLink>
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;