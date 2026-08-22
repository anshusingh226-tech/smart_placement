import { useState } from 'react'

function Companies() {
  const [activeTab, setActiveTab] = useState('companies')

  const tabs = [
    { id: 'companies', label: 'Companies' },
    { id: 'reports', label: 'Reports' },
  ]

  return (
    <div className="p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Companies
        </h1>

        <p className="mt-2 text-gray-600">
          Manage companies and view placement reports.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Companies */}
      {activeTab === 'companies' && (
        <div className="mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 md:max-w-md"
            />

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              + Add Company
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Company
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Contact
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No companies found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Student Assessment Results
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View student assessment performance.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                View Report
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Skill Performance
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View student skill performance results.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                View Report
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Aptitude Results
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View aptitude assessment results.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                View Report
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Job Applications
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                View job application information.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                View Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Companies