function StudentDashboard() {
  return (
    <div className="p-6 md:p-8">
      <p className="mb-2 text-sm font-medium text-blue-600">Student Portal</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Welcome back 👋
      </h1>
      <p className="mt-2 text-slate-500">Here's what's happening with your applications.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            💼
          </div>
          <p className="text-sm font-medium text-slate-500">Opportunities</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">—</h2>
          <p className="mt-3 text-xs text-slate-500">Available to you</p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            📄
          </div>
          <p className="text-sm font-medium text-slate-500">Applications</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">—</h2>
          <p className="mt-3 text-xs text-slate-500">Submitted so far</p>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            🎯
          </div>
          <p className="text-sm font-medium text-slate-500">Match Score</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">—</h2>
          <p className="mt-3 text-xs text-slate-500">Average fit</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">📌 Recent Opportunities</h2>
        <p className="mt-1 text-sm text-slate-500">Latest postings matched to you</p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <div className="text-4xl">💼</div>
          <p className="mt-3 font-medium text-slate-700">No opportunities available yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Opportunities will appear here once they are added.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;