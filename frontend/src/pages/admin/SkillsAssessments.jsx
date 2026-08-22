import { useState } from 'react'

function SkillsAssessments() {
  const [activeTab, setActiveTab] = useState('skills')

  const tabs = [
    { id: 'skills', label: 'Skills' },
    { id: 'questions', label: 'Question Bank' },
    { id: 'assessments', label: 'Assessments' },
  ]

  return (
    <div className="p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Skills & Assessments
        </h1>

        <p className="mt-2 text-gray-600">
          Manage skills, questions, and assessments.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 pb-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      {activeTab === 'skills' && (
        <div className="mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 md:max-w-md"
            />

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              + Add Skill
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No skills found.
            </p>
          </div>
        </div>
      )}

      {/* Question Bank */}
      {activeTab === 'questions' && (
        <div className="mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 md:max-w-md"
            />

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              + Add Question
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No questions found.
            </p>
          </div>
        </div>
      )}

      {/* Assessments */}
      {activeTab === 'assessments' && (
        <div className="mt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search assessments..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 md:max-w-md"
            />

            <button
              type="button"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              + Create Assessment
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">
              No assessments found.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsAssessments