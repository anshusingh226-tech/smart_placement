import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'User Management', path: '/admin/users' },
    { name: 'Skills & Assessments', path: '/admin/skills-assessments' },
    { name: 'Companies', path: '/admin/companies' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <aside className="w-full bg-slate-900 text-white md:min-h-screen md:w-64">
        <div className="border-b border-slate-700 p-6">
          <h1 className="text-xl font-bold">
            Smart Placement
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Admin Panel
          </p>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <p className="text-sm font-medium text-gray-500">
            Administrator
          </p>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout