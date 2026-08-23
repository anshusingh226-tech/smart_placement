import { NavLink, Outlet } from 'react-router-dom'

function PlacementOfficerLayout() {
  const navItems = [
    {
      to: '/placement-officer',
      label: 'Dashboard',
      end: true,
    },
    {
      to: '/placement-officer/companies-jobs',
      label: 'Companies & Jobs',
    },
    {
      to: '/placement-officer/applications',
      label: 'Applications',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col bg-slate-950 text-white">

        {/* Sidebar Header */}
        <div className="border-b border-slate-800 px-6 py-7">
          <h1 className="text-xl font-bold">
            Smart Placement
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Placement Officer
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

      </aside>

      {/* Main Area */}
      <div className="ml-64 min-h-screen">

        {/* Top Bar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

          {/* Top Left */}
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Placement Officer
            </p>
          </div>

          {/* Top Right - Single Profile */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white shadow-sm">
              👤
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Placement Officer
              </p>

              <p className="text-xs text-slate-400">
                Account
              </p>
            </div>

          </div>

        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default PlacementOfficerLayout