function StudentOpportunities() {
  const opportunities = [];
  const eligibilityResults = [];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Student Portal
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Opportunities
        </h1>

        <p className="mt-2 text-slate-500">
          Explore placement opportunities and check your eligibility.
        </p>
      </div>


      {/* ================= JOB OPPORTUNITIES ================= */}
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Job Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse the latest placement opportunities available to students.
          </p>
        </div>


        {/* Empty State */}
        {opportunities.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

            <div className="text-4xl">
              💼
            </div>

            <p className="mt-3 font-medium text-slate-700">
              No job opportunities available
            </p>

            <p className="mt-1 text-sm text-slate-500">
              New placement opportunities will appear here when they are posted.
            </p>

          </div>
        )}

      </section>


      {/* ================= ELIGIBILITY ================= */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Eligibility Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Check whether you meet the eligibility criteria for available jobs.
          </p>
        </div>


        {/* Eligible / Not Eligible Boxes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Eligible */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg">
                ✓
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Eligible
                </h3>

                <p className="text-xs text-slate-500">
                  Jobs you can apply for
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-dashed border-green-200 bg-white px-5 py-8 text-center">

              {eligibilityResults.length === 0 ? (
                <>
                  <p className="font-medium text-slate-700">
                    No eligibility results yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Your eligible jobs will appear here.
                  </p>
                </>
              ) : (
                <p>Eligible jobs will appear here.</p>
              )}

            </div>
          </div>


          {/* Not Eligible */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg">
                ✕
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Not Eligible
                </h3>

                <p className="text-xs text-slate-500">
                  Jobs you currently don't qualify for
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-dashed border-red-200 bg-white px-5 py-8 text-center">

              {eligibilityResults.length === 0 ? (
                <>
                  <p className="font-medium text-slate-700">
                    No eligibility results yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Jobs you are not eligible for will appear here.
                  </p>
                </>
              ) : (
                <p>Non-eligible jobs will appear here.</p>
              )}

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default StudentOpportunities;