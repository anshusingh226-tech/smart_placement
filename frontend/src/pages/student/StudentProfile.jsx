function StudentProfile() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Student Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your details, skills, and application history.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-2xl text-white">
          🧑‍🎓
        </div>

        <div>
          <p className="text-base font-semibold text-slate-800">
            Student Name
          </p>

          <p className="text-sm text-slate-500">
            student@email.com
          </p>

          <p className="mt-1 text-xs font-medium text-blue-600">
            Computer Science · Final Year
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            📄
          </div>

          <p className="text-sm font-medium text-slate-500">
            Applications Sent
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Total applications submitted
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            🧠
          </div>

          <p className="text-sm font-medium text-slate-500">
            Skills Verified
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Assessed and confirmed skills
          </p>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
            🎯
          </div>

          <p className="text-sm font-medium text-slate-500">
            Match Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Average opportunity fit
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              🧩 My Skills
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Skills you've added or been assessed on
            </p>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
            + Add Skill
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <div className="text-4xl">🧠</div>

          <p className="mt-3 font-medium text-slate-700">
            No skills added yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add skills to improve your opportunity matches.
          </p>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            📄 Resume
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload your latest resume for placements.
          </p>
        </div>

        <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50">
          <div className="text-4xl">📄</div>

          <p className="mt-3 font-medium text-slate-700">
            Click to upload your resume
          </p>

          <p className="mt-1 text-sm text-slate-500">
            PDF, DOC or DOCX
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </label>
      </div>

      {/* Application Status */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            📋 Application Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track where your applications stand
          </p>
        </div>

        <div className="space-y-3">
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
  );
}

export default StudentProfile;