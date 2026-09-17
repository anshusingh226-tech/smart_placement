function StudentApplications() {
  return (
    <div className="p-6 md:p-8">
      <p className="mb-2 text-sm font-medium text-blue-600">Student Portal</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Applications 📄
      </h1>
      <p className="mt-2 text-slate-500">Track the status of jobs you've applied to.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <div className="text-4xl">📄</div>
          <p className="mt-3 font-medium text-slate-700">No applications yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Your submitted applications will show up here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentApplications;