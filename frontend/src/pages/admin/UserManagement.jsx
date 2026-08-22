import { useState } from 'react'

function UserManagement() {
  const [activeTab, setActiveTab] = useState('students')

  const students = []
  const placementOfficers = []

  const users =
    activeTab === 'students' ? students : placementOfficers

  return (
    <div className="p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          User Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage students and placement officers.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`border-b-2 px-1 pb-3 text-sm font-medium ${
              activeTab === 'students'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Students
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('officers')}
            className={`border-b-2 px-1 pb-3 text-sm font-medium ${
              activeTab === 'officers'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Placement Officers
          </button>
        </div>
      </div>

      {/* Search and Create */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder={`Search ${activeTab === 'students' ? 'students' : 'placement officers'}...`}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 md:max-w-md"
        />

        <button
          type="button"
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Create User
        </button>
      </div>

      {/* User table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Email
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
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No {activeTab === 'students' ? 'students' : 'placement officers'} found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-100">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button type="button">Edit</button>
                        <button type="button">Delete</button>
                        <button type="button">Reset Password</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagement