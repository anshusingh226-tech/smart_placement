import { useState } from 'react'

function UserManagement() {
  const [activeTab, setActiveTab] = useState('students')

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            User Management 👥
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students and placement officers.
          </p>
        </div>

        {/* Create User */}
        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          + Create User
        </button>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex gap-8">

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                activeTab === 'students'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🎓 Students
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('officers')}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                activeTab === 'officers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🧑‍💼 Placement Officers
            </button>

          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder={
                activeTab === 'students'
                  ? 'Search students...'
                  : 'Search placement officers...'
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p className="text-sm text-slate-400">
            Data will appear when connected to the backend.
          </p>

        </div>

        {/* Students */}
        {activeTab === 'students' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">

            <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Name</span>
              <span>Email</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                🎓
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                No students available
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Student records will appear here once they are loaded from the backend.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                + Add Student
              </button>

            </div>
          </div>
        )}

        {/* Placement Officers */}
        {activeTab === 'officers' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">

            <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Name</span>
              <span>Email</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                🧑‍💼
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                No placement officers available
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Placement officer records will appear here once they are loaded from the backend.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100"
              >
                + Add Placement Officer
              </button>

            </div>
          </div>
        )}

      </div>

    </div>
  )
}

export default UserManagement