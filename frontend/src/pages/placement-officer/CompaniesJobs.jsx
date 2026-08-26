import { useState } from 'react'

function CompaniesJobs() {
  const [activeTab, setActiveTab] = useState('companies')

  const tabs = [
    {
      id: 'companies',
      label: 'Companies',
      icon: '🏢',
    },
    {
      id: 'jobs',
      label: 'Jobs',
      icon: '💼',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Placement Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Companies & Jobs 🏢
          </h1>

          <p className="mt-2 text-slate-500">
            Manage companies and job opportunities.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-sm">
          💼
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Tabs */}
        <div className="mb-7 border-b border-slate-200">
          <div className="flex flex-wrap gap-7">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}

          </div>
        </div>

        {/* Companies */}
        {activeTab === 'companies' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Company Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add and manage companies participating in placements.
              </p>
            </div>

            {/* Search + Add */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="relative w-full md:max-w-md">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                + Add Company
              </button>

            </div>

            {/* Companies Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200">

              <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span>Company</span>
                <span>Contact</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  🏢
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No companies available
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Company records will appear here once they are loaded from the backend.
                </p>

              </div>

            </div>
          </>
        )}

        {/* Jobs */}
        {activeTab === 'jobs' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Job Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage job opportunities for students.
              </p>
            </div>

            {/* Search + Create */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div className="relative w-full md:max-w-md">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                + Create Job
              </button>

            </div>

            {/* Jobs Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200">

              <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span>Company</span>
                <span>Role</span>
                <span>Location</span>
                <span>Deadline</span>
                <span>Actions</span>
              </div>

              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                  💼
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No jobs available
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Job opportunities will appear here once they are loaded from the backend.
                </p>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default CompaniesJobs