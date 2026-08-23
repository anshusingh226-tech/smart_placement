import { useState } from 'react'

function Applications() {
  const [selectedApplication, setSelectedApplication] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Placement Portal
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Applications 📄
        </h1>

        <p className="mt-2 text-slate-500">
          Review students who have applied to your job opportunities.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Job Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Only students who have applied to your jobs will appear here.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full md:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search applications..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200">

          <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Student</span>
            <span>Job</span>
            <span>Date Applied</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              📄
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No applications available
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Students will appear here after they apply to one of your job opportunities.
            </p>

          </div>

        </div>

      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Student application information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* Student Profile */}
              <section className="rounded-xl border border-slate-200 p-5">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    👤
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Student Profile
                    </h3>

                    <p className="text-xs text-slate-500">
                      Read-only student information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {[
                    'Name',
                    'Email',
                    'Phone',
                    'Department',
                    'Branch',
                    'Graduation Year',
                    'CGPA',
                  ].map((field) => (
                    <div
                      key={field}
                      className="rounded-lg bg-slate-50 p-4"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        {field}
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        —
                      </p>
                    </div>
                  ))}

                </div>

              </section>

              {/* Resume */}
              <section className="rounded-xl border border-slate-200 p-5">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-xl">
                    📎
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Resume
                    </h3>

                    <p className="text-xs text-slate-500">
                      Resume uploaded by the student
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">

                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Resume
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Download Resume
                  </button>

                </div>

              </section>

              {/* AI Analysis */}
              <section className="rounded-xl border border-purple-100 bg-purple-50/40 p-5">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl">
                    🤖
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      AI Analysis
                    </h3>

                    <p className="text-xs text-slate-500">
                      Resume and job matching information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-400">
                      Resume Match
                    </p>

                    <p className="mt-2 text-2xl font-bold text-purple-600">
                      —
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-400">
                      Extracted Skills
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      No data available
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-400">
                      Missing Skills
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      No data available
                    </p>
                  </div>

                </div>

              </section>

              {/* Assessment Scores */}
              <section className="rounded-xl border border-slate-200 p-5">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
                    📝
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Assessment Scores
                    </h3>

                    <p className="text-xs text-slate-500">
                      Highest score for each attempted assessment
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">

                  <p className="text-sm text-slate-500">
                    Assessment scores will appear here when connected to the backend.
                  </p>

                </div>

              </section>

              {/* Eligibility */}
              <section className="rounded-xl border border-slate-200 p-5">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
                    ✅
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Eligibility
                    </h3>

                    <p className="text-xs text-slate-500">
                      Job eligibility evaluation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  {[
                    'Aptitude Requirement',
                    'Skill Requirement',
                    'Overall Eligibility',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <p className="text-xs font-medium text-slate-400">
                        {item}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Not available
                      </p>
                    </div>
                  ))}

                </div>

              </section>

            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default Applications