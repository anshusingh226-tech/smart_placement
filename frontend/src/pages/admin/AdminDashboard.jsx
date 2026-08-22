function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Welcome back! 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what's happening with your placement portal today.
          </p>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl">
            👤
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Admin Account
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

        {/* Opportunities */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            💼
          </div>

          <p className="text-sm font-medium text-slate-500">
            Total Opportunities
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Placement opportunities
          </p>
        </div>

        {/* Students */}
        <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            🎓
          </div>

          <p className="text-sm font-medium text-slate-500">
            Total Students
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Registered students
          </p>
        </div>

        {/* Applications */}
        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            📄
          </div>

          <p className="text-sm font-medium text-slate-500">
            Total Applications
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Student applications
          </p>
        </div>

      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent Opportunities */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                📌 Recent Opportunities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest placement opportunities
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              View All →
            </button>
          </div>

          {/* Empty state — backend data will appear here */}
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <div className="text-4xl">💼</div>

            <p className="mt-3 font-medium text-slate-700">
              No opportunities available yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Opportunities will appear here once they are added.
            </p>
          </div>

        </div>

        {/* Application Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              📊 Application Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current application status
            </p>
          </div>

          <div className="flex flex-col items-center">

            {/* Empty chart placeholder */}
            <div className="flex h-44 w-44 items-center justify-center rounded-full border-[22px] border-slate-100">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-slate-400">
                  —
                </span>

                <span className="text-xs text-slate-400">
                  No data
                </span>
              </div>
            </div>

            <div className="mt-7 w-full space-y-3">

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-3 w-3 rounded-full bg-amber-400"></span>
                  Pending
                </span>

                <span className="text-slate-400">—</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  Shortlisted
                </span>

                <span className="text-slate-400">—</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  Rejected
                </span>

                <span className="text-slate-400">—</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                  Offered
                </span>

                <span className="text-slate-400">—</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Student Highlights */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              👥 Student Highlights
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recently active students
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All Students →
          </button>
        </div>

        {/* Empty student state */}
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

          <div className="text-4xl">🎓</div>

          <p className="mt-3 font-medium text-slate-700">
            No student data available yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Student information will appear here once connected to the backend.
          </p>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard