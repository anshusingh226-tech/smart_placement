function PlacementOfficerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Main Page Header */}
      <div className="mb-8">

        <p className="mb-2 text-sm font-medium text-blue-600">
          Placement Portal
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Welcome back! 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your placement portal today.
        </p>

      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Total Jobs */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            💼
          </div>

          <p className="text-sm font-medium text-slate-500">
            Total Jobs
          </p>

          <p className="mt-3 text-4xl font-bold text-slate-900">
            —
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Job opportunities created
          </p>

        </div>

        {/* Total Applications */}
        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            📄
          </div>

          <p className="text-sm font-medium text-slate-500">
            Total Applications
          </p>

          <p className="mt-3 text-4xl font-bold text-slate-900">
            —
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Applications received
          </p>

        </div>

      </div>

      {/* Recent Applications */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-slate-900">
            Recent Applications 📋
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently submitted applications for your job opportunities.
          </p>

        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200">

          <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Student</span>
            <span>Job</span>
            <span>Date Applied</span>
            <span>Status</span>
          </div>

          {/* Empty State */}
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              📄
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No applications available
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Applications will appear here when students apply to your job opportunities.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default PlacementOfficerDashboard