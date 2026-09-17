function JobEligibility() {
  const jobs = [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Job Eligibility
      </h1>

      <p className="mt-2 mb-8 text-slate-500">
        Check your eligibility for available placement opportunities.
      </p>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">✅</div>

          <h2 className="text-xl font-semibold text-slate-900">
            No Eligibility Results Yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your job eligibility details will appear here when opportunities
            are available.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {job.title}
              </h2>

              <p className="mt-1 text-slate-500">
                {job.company}
              </p>

              <div className="mt-4">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    job.eligible
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.eligible ? "Eligible" : "Not Eligible"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobEligibility;