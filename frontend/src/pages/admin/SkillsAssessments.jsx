import { useState } from 'react'

function SkillsAssessments() {
  const [activeTab, setActiveTab] = useState('skills')

  const tabs = [
    { id: 'skills', label: 'Skills', icon: '🧠' },
    { id: 'questions', label: 'Question Bank', icon: '❓' },
    { id: 'assessments', label: 'Assessments', icon: '📝' },
  ]

  const tabContent = {
    skills: {
      title: 'Skills',
      description: 'Manage the skills used by the placement system.',
      placeholder: 'Search skills...',
      button: '+ Add Skill',
      icon: '🧠',
      emptyTitle: 'No skills available',
      emptyText:
        'Skills will appear here once they are loaded from the backend.',
      color: 'blue',
    },

    questions: {
      title: 'Question Bank',
      description: 'Manage questions used for assessments.',
      placeholder: 'Search questions...',
      button: '+ Add Question',
      icon: '❓',
      emptyTitle: 'No questions available',
      emptyText:
        'Questions will appear here once they are loaded from the backend.',
      color: 'purple',
    },

    assessments: {
      title: 'Assessments',
      description: 'Create and manage student assessments.',
      placeholder: 'Search assessments...',
      button: '+ Create Assessment',
      icon: '📝',
      emptyTitle: 'No assessments available',
      emptyText:
        'Assessments will appear here once they are loaded from the backend.',
      color: 'green',
    },
  }

  const current = tabContent[activeTab]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Skills & Assessments 🧠
          </h1>

          <p className="mt-2 text-slate-500">
            Manage skills, questions, and assessments.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-sm">
          📚
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Tabs */}
        <div className="mb-7 border-b border-slate-200">
          <div className="flex flex-wrap gap-7">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}

          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {current.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {current.description}
          </p>
        </div>

        {/* Search + Action */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder={current.placeholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {current.button}
          </button>

        </div>

        {/* Empty State */}
        <div className="overflow-hidden rounded-xl border border-slate-200">

          {/* Table Header */}
          <div className="grid grid-cols-3 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>
              {activeTab === 'skills'
                ? 'Skill'
                : activeTab === 'questions'
                  ? 'Question'
                  : 'Assessment'}
            </span>

            <span>
              {activeTab === 'skills'
                ? 'Category'
                : activeTab === 'questions'
                  ? 'Skill'
                  : 'Status'}
            </span>

            <span>Actions</span>
          </div>

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${
                current.color === 'blue'
                  ? 'bg-blue-50'
                  : current.color === 'purple'
                    ? 'bg-purple-50'
                    : 'bg-green-50'
              }`}
            >
              {current.icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              {current.emptyTitle}
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              {current.emptyText}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default SkillsAssessments