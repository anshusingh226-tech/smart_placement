import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MdNotifications } from 'react-icons/md'
import { FiX } from 'react-icons/fi'
import { supabase } from '../lib/supabase'

function PlacementOfficerLayout() {
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('userRole')
    navigate('/')
  }

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

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Area */}
      <div className="ml-64 min-h-screen relative">

        {/* Notification Bell */}
        <div className="absolute right-8 top-5 z-40">

          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-amber-50"
            aria-label="Notifications"
          >
            <MdNotifications
              size={25}
              className="text-amber-400"
            />
          </button>

          {/* Notification Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-[4.5rem] z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

              {/* Notification Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Notifications
                  </h2>

                  <p className="text-xs text-slate-400">
                    0 new notifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close notifications"
                >
                  <FiX size={20} />
                </button>

              </div>

              {/* Empty Notification State */}
              <div className="flex flex-col items-center justify-center px-5 py-12 text-center">

                <MdNotifications
                  size={40}
                  className="mb-5 text-amber-400"
                />

                <p className="text-base font-semibold text-slate-800">
                  No notifications
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  You're all caught up!
                </p>

              </div>

              {/* Close Button */}
              <div className="border-t border-slate-200 px-5 py-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Close
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default PlacementOfficerLayout