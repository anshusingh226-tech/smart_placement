function Results() {
  const results = [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Results
      </h1>

      <p className="mt-2 mb-8 text-slate-500">
        View your assessment results and performance.
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">📊</div>

          <h2 className="text-xl font-semibold text-slate-900">
            No Results Available
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your assessment results will appear here after you complete an assessment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-semibold text-slate-900">
                {result.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;