function SkillScores() {
  const skills = [
    "Java",
    "Python",
    "Data Structures",
    "DBMS",
    "Communication",
    "Problem Solving",
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Skill Scores
      </h1>

      <p className="mt-2 text-slate-500">
        Your skill scores will appear here after completing assessments.
      </p>

      <div className="mt-6 rounded-xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Overall Skill Score
          </h2>

          <p className="mt-2 text-3xl font-bold text-slate-400">
            —
          </p>
        </div>

        <div className="space-y-5">
          {skills.map((skill) => (
            <div key={skill}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-slate-700">
                  {skill}
                </span>

                <span className="text-slate-400">
                  Not assessed
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-slate-300"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillScores;