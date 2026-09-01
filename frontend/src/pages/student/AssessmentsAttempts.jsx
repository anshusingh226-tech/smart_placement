function AssessmentAttempts() {
  const attempts = [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Assessment Attempts
      </h1>

      <p className="mt-2 mb-8 text-slate-500">
        View your assessment attempts and progress.
      </p>

      {attempts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">📝</div>

          <h2 className="text-xl font-semibold text-slate-900">
            No Assessment Attempts Yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your completed assessments will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-semibold text-slate-900">
                {attempt.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssessmentAttempts;