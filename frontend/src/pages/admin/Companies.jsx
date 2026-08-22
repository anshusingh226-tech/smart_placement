import { useState } from 'react'

function Companies() {
  const [activeTab, setActiveTab] = useState('companies')

  const tabs = [
    { id: 'companies', label: 'Companies', icon: '🏢' },
    { id: 'reports', label: 'Reports', icon: '📊' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Companies 🏢
          </h1>

          <p className="mt-2 text-slate-500">
            Manage companies and view placement reports.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-sm">
          🏢
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
                Manage companies participating in the placement process.
              </p>
            </div>

            {/* Search + Action */}
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

        {/* Reports */}
        {activeTab === 'reports' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Placement Reports 📊
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View reports generated from placement system data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Student Assessment */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  📝
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Student Assessment Results
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View student assessment performance when assessment data is available.
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Report →
                </button>

              </div>

              {/* Skill Performance */}
              <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  🧠
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Skill Performance
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View student skill performance when skill data is available.
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  View Report →
                </button>

              </div>

              {/* Aptitude */}
              <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                  🎯
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Aptitude Results
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View aptitude assessment results when assessment data is available.
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  View Report →
                </button>

              </div>

              {/* Applications */}
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-md">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                  📄
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Job Applications
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  View application information when application data is available.
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  View Report →
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default Companies