import { useState } from 'react'
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

function SkillsAssessments() {
  const [activeTab, setActiveTab] = useState('skills')

  const [showSkillForm, setShowSkillForm] = useState(false)
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [showAssessmentForm, setShowAssessmentForm] = useState(false)

  const [editingSkill, setEditingSkill] = useState(null)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [editingAssessment, setEditingAssessment] = useState(null)

  const [deleteType, setDeleteType] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: '',
    description: '',
    enabled: true,
  })

  const [questionForm, setQuestionForm] = useState({
    question: '',
    questionType: 'MCQ',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    difficulty: '',
    marks: '',
    negativeMarks: '',
    skill: '',
  })

  const [assessmentForm, setAssessmentForm] = useState({
    title: '',
    skill: '',
    duration: '',
    numberOfQuestions: '',
    passingPercentage: '',
    negativeMarking: false,
    randomQuestionSelection: false,
  })

  const tabs = [
    { id: 'skills', label: 'Skills', icon: '🧠' },
    { id: 'questions', label: 'Question Bank', icon: '❓' },
    { id: 'assessments', label: 'Assessments', icon: '📝' },
  ]

  const tabsContent = {
    skills: {
      title: 'Skills',
      description: 'Manage the skills used by the placement system.',
      placeholder: 'Search skills...',
      button: '+ Add Skill',
    },
    questions: {
      title: 'Question Bank',
      description: 'Manage questions used for student assessments.',
      placeholder: 'Search questions...',
      button: '+ Add Question',
    },
    assessments: {
      title: 'Assessments',
      description: 'Create and manage student assessments.',
      placeholder: 'Search assessments...',
      button: '+ Create Assessment',
    },
  }

  const current = tabsContent[activeTab]

  /*
   * No hardcoded backend records.
   * These arrays will later be populated from Supabase/backend.
   */
  const skills = []
  const questions = []
  const assessments = []

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

  const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

  /* ================= SKILLS ================= */

  const openAddSkill = () => {
    setEditingSkill(null)

    setSkillForm({
      name: '',
      category: '',
      description: '',
      enabled: true,
    })

    setShowSkillForm(true)
  }

  const openEditSkill = (skill) => {
    setEditingSkill(skill)

    setSkillForm({
      name: skill.name || '',
      category: skill.category || '',
      description: skill.description || '',
      enabled: skill.enabled ?? true,
    })

    setShowSkillForm(true)
  }

  const closeSkillForm = () => {
    setShowSkillForm(false)
    setEditingSkill(null)
  }

  const saveSkill = () => {
    // Backend integration will be added later.
    closeSkillForm()
  }

  const toggleSkillStatus = (skill) => {
    // Backend integration will be added later.
    console.log('Toggle skill status:', skill)
  }

  /* ================= QUESTIONS ================= */

  const openAddQuestion = () => {
    setEditingQuestion(null)

    setQuestionForm({
      question: '',
      questionType: 'MCQ',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficulty: '',
      marks: '',
      negativeMarks: '',
      skill: '',
    })

    setShowQuestionForm(true)
  }

  const openEditQuestion = (question) => {
    setEditingQuestion(question)

    setQuestionForm({
      question: question.question || '',
      questionType: question.questionType || 'MCQ',
      optionA: question.optionA || '',
      optionB: question.optionB || '',
      optionC: question.optionC || '',
      optionD: question.optionD || '',
      correctAnswer: question.correctAnswer || '',
      difficulty: question.difficulty || '',
      marks: question.marks || '',
      negativeMarks: question.negativeMarks || '',
      skill: question.skill || '',
    })

    setShowQuestionForm(true)
  }

  const closeQuestionForm = () => {
    setShowQuestionForm(false)
    setEditingQuestion(null)
  }

  const saveQuestion = () => {
    // Backend integration will be added later.
    closeQuestionForm()
  }

  /* ================= ASSESSMENTS ================= */

  const openCreateAssessment = () => {
    setEditingAssessment(null)

    setAssessmentForm({
      title: '',
      skill: '',
      duration: '',
      numberOfQuestions: '',
      passingPercentage: '',
      negativeMarking: false,
      randomQuestionSelection: false,
    })

    setShowAssessmentForm(true)
  }

  const openEditAssessment = (assessment) => {
    setEditingAssessment(assessment)

    setAssessmentForm({
      title: assessment.title || '',
      skill: assessment.skill || '',
      duration: assessment.duration || '',
      numberOfQuestions: assessment.numberOfQuestions || '',
      passingPercentage: assessment.passingPercentage || '',
      negativeMarking: assessment.negativeMarking || false,
      randomQuestionSelection:
        assessment.randomQuestionSelection || false,
    })

    setShowAssessmentForm(true)
  }

  const closeAssessmentForm = () => {
    setShowAssessmentForm(false)
    setEditingAssessment(null)
  }

  const saveAssessment = () => {
    // Backend integration will be added later.
    closeAssessmentForm()
  }

  /* ================= DELETE ================= */

  const openDeleteConfirmation = (type, item) => {
    setDeleteType(type)
    setDeleteItem(item)
  }

  const closeDeleteConfirmation = () => {
    setDeleteType(null)
    setDeleteItem(null)
  }

  const confirmDelete = () => {
    // Backend delete operation will be added later.
    closeDeleteConfirmation()
  }

  /* ================= ACTION BUTTON ================= */

  const handleActionButton = () => {
    if (activeTab === 'skills') {
      openAddSkill()
    }

    if (activeTab === 'questions') {
      openAddQuestion()
    }

    if (activeTab === 'assessments') {
      openCreateAssessment()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
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
            <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder={current.placeholder}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            onClick={handleActionButton}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {current.button}
          </button>
        </div>

        {/* ================= SKILLS TABLE ================= */}
        {activeTab === 'skills' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Skill</span>
              <span>Category</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {skills.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  🧠
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No skills available
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Skills will appear here once they are loaded from the
                  backend.
                </p>
              </div>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="grid grid-cols-4 items-center border-t border-slate-100 px-5 py-4 text-sm"
                >
                  <span className="font-semibold text-slate-800">
                    {skill.name}
                  </span>

                  <span className="text-slate-600">
                    {skill.category}
                  </span>

                  <span>
                    <button
                      type="button"
                      onClick={() => toggleSkillStatus(skill)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        skill.enabled
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {skill.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditSkill(skill)}
                      className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={15} />
                      Edit
                    </button>

                    <span className="text-slate-300">/</span>

                    <button
                      type="button"
                      onClick={() =>
                        openDeleteConfirmation('skill', skill)
                      }
                      className="inline-flex items-center gap-1.5 font-medium text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= QUESTIONS TABLE ================= */}
        {activeTab === 'questions' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-6 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span className="col-span-2">Question</span>
              <span>Type</span>
              <span>Skill</span>
              <span>Difficulty</span>
              <span>Actions</span>
            </div>

            {questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                  ❓
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No questions available
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Questions will appear here once they are loaded from the
                  backend.
                </p>
              </div>
            ) : (
              questions.map((question) => (
                <div
                  key={question.id}
                  className="grid grid-cols-6 items-center border-t border-slate-100 px-5 py-4 text-sm"
                >
                  <span className="col-span-2 font-medium text-slate-800">
                    {question.question}
                  </span>

                  <span className="text-slate-600">
                    {question.questionType}
                  </span>

                  <span className="text-slate-600">
                    {question.skill}
                  </span>

                  <span className="text-slate-600">
                    {question.difficulty}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditQuestion(question)}
                      className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={15} />
                      Edit
                    </button>

                    <span className="text-slate-300">/</span>

                    <button
                      type="button"
                      onClick={() =>
                        openDeleteConfirmation('question', question)
                      }
                      className="inline-flex items-center gap-1.5 font-medium text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= ASSESSMENTS TABLE ================= */}
        {activeTab === 'assessments' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-6 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span className="col-span-2">Assessment</span>
              <span>Skill</span>
              <span>Duration</span>
              <span>Questions</span>
              <span>Actions</span>
            </div>

            {assessments.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                  📝
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No assessments available
                </h3>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Assessments will appear here once they are loaded from the
                  backend.
                </p>
              </div>
            ) : (
              assessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="grid grid-cols-6 items-center border-t border-slate-100 px-5 py-4 text-sm"
                >
                  <span className="col-span-2 font-semibold text-slate-800">
                    {assessment.title}
                  </span>

                  <span className="text-slate-600">
                    {assessment.skill}
                  </span>

                  <span className="text-slate-600">
                    {assessment.duration} min
                  </span>

                  <span className="text-slate-600">
                    {assessment.numberOfQuestions}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditAssessment(assessment)}
                      className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={15} />
                      Edit
                    </button>

                    <span className="text-slate-300">/</span>

                    <button
                      type="button"
                      onClick={() =>
                        openDeleteConfirmation('assessment', assessment)
                      }
                      className="inline-flex items-center gap-1.5 font-medium text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT SKILL ================= */}
      {showSkillForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingSkill ? 'Edit Skill' : 'Add Skill'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingSkill
                    ? 'Update the skill information.'
                    : 'Add a new skill to the placement system.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeSkillForm}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto">
              <div className="grid gap-5 p-6">
                <div>
                  <label className={labelClass}>Skill Name</label>

                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Java"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Category</label>

                  <input
                    type="text"
                    value={skillForm.category}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g. Programming"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>

                  <textarea
                    rows="4"
                    value={skillForm.description}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the skill..."
                    className={inputClass}
                  />
                </div>

                <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    checked={skillForm.enabled}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        enabled: e.target.checked,
                      })
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    Enable this skill
                  </span>
                </label>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                type="button"
                onClick={closeSkillForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveSkill}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingSkill ? 'Save Changes' : 'Save Skill'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT QUESTION ================= */}
      {showQuestionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingQuestion ? 'Edit Question' : 'Add Question'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure the question and its assessment properties.
                </p>
              </div>

              <button
                type="button"
                onClick={closeQuestionForm}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto">
              <div className="grid gap-5 p-6">
                <div>
                  <label className={labelClass}>Question</label>

                  <textarea
                    rows="4"
                    value={questionForm.question}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        question: e.target.value,
                      })
                    }
                    placeholder="Enter the question..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Question Type</label>

                  <select
                    value={questionForm.questionType}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        questionType: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="MCQ">MCQ</option>
                    <option value="True False">True / False</option>
                    <option value="Fill in Blank">Fill in the Blank</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>

                {questionForm.questionType === 'MCQ' && (
                  <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-800">
                      Options
                    </h3>

                    <div>
                      <label className={labelClass}>Option A</label>

                      <input
                        type="text"
                        value={questionForm.optionA}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            optionA: e.target.value,
                          })
                        }
                        placeholder="Option A"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Option B</label>

                      <input
                        type="text"
                        value={questionForm.optionB}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            optionB: e.target.value,
                          })
                        }
                        placeholder="Option B"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Option C</label>

                      <input
                        type="text"
                        value={questionForm.optionC}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            optionC: e.target.value,
                          })
                        }
                        placeholder="Option C"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Option D</label>

                      <input
                        type="text"
                        value={questionForm.optionD}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            optionD: e.target.value,
                          })
                        }
                        placeholder="Option D"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Correct Answer</label>

                      <select
                        value={questionForm.correctAnswer}
                        onChange={(e) =>
                          setQuestionForm({
                            ...questionForm,
                            correctAnswer: e.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        <option value="">Select correct answer</option>
                        <option value="A">Option A</option>
                        <option value="B">Option B</option>
                        <option value="C">Option C</option>
                        <option value="D">Option D</option>
                      </select>
                    </div>
                  </div>
                )}

                {questionForm.questionType === 'True False' && (
                  <div>
                    <label className={labelClass}>Correct Answer</label>

                    <select
                      value={questionForm.correctAnswer}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          correctAnswer: e.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="">Select answer</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                )}

                {questionForm.questionType === 'Fill in Blank' && (
                  <div>
                    <label className={labelClass}>Correct Answer</label>

                    <input
                      type="text"
                      value={questionForm.correctAnswer}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          correctAnswer: e.target.value,
                        })
                      }
                      placeholder="Enter the expected answer"
                      className={inputClass}
                    />
                  </div>
                )}

                {questionForm.questionType === 'Programming' && (
                  <div>
                    <label className={labelClass}>
                      Expected Answer / Solution
                    </label>

                    <textarea
                      rows="6"
                      value={questionForm.correctAnswer}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          correctAnswer: e.target.value,
                        })
                      }
                      placeholder="Enter expected solution details..."
                      className={inputClass}
                    />
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Difficulty</label>

                    <select
                      value={questionForm.difficulty}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          difficulty: e.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="">Select difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Skill</label>

                    <input
                      type="text"
                      value={questionForm.skill}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          skill: e.target.value,
                        })
                      }
                      placeholder="e.g. Java"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Marks</label>

                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={questionForm.marks}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          marks: e.target.value,
                        })
                      }
                      placeholder="e.g. 2"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Negative Marks</label>

                    <input
                      type="number"
                      min="0"
                      step="0.25"
                      value={questionForm.negativeMarks}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          negativeMarks: e.target.value,
                        })
                      }
                      placeholder="e.g. 0.5"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                type="button"
                onClick={closeQuestionForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveQuestion}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingQuestion ? 'Save Changes' : 'Save Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT ASSESSMENT ================= */}
      {showAssessmentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Fixed Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingAssessment
                    ? 'Edit Assessment'
                    : 'Create Assessment'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure the assessment requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAssessmentForm}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="grid gap-5 p-6">
                <div>
                  <label className={labelClass}>Assessment Name</label>

                  <input
                    type="text"
                    value={assessmentForm.title}
                    onChange={(e) =>
                      setAssessmentForm({
                        ...assessmentForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g. Java Programming Assessment"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Skill</label>

                  <input
                    type="text"
                    value={assessmentForm.skill}
                    onChange={(e) =>
                      setAssessmentForm({
                        ...assessmentForm,
                        skill: e.target.value,
                      })
                    }
                    placeholder="e.g. Java"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Duration (minutes)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={assessmentForm.duration}
                      onChange={(e) =>
                        setAssessmentForm({
                          ...assessmentForm,
                          duration: e.target.value,
                        })
                      }
                      placeholder="e.g. 30"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Number of Questions
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={assessmentForm.numberOfQuestions}
                      onChange={(e) =>
                        setAssessmentForm({
                          ...assessmentForm,
                          numberOfQuestions: e.target.value,
                        })
                      }
                      placeholder="e.g. 20"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Passing Percentage
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={assessmentForm.passingPercentage}
                      onChange={(e) =>
                        setAssessmentForm({
                          ...assessmentForm,
                          passingPercentage: e.target.value,
                        })
                      }
                      placeholder="e.g. 60"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Negative Marking
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Apply negative marks for incorrect answers.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={assessmentForm.negativeMarking}
                      onChange={(e) =>
                        setAssessmentForm({
                          ...assessmentForm,
                          negativeMarking: e.target.checked,
                        })
                      }
                      className="h-5 w-5"
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Random Question Selection
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Randomly select questions for each assessment
                        attempt.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={assessmentForm.randomQuestionSelection}
                      onChange={(e) =>
                        setAssessmentForm({
                          ...assessmentForm,
                          randomQuestionSelection: e.target.checked,
                        })
                      }
                      className="h-5 w-5"
                    />
                  </label>
                </div>

                {/* Extra bottom spacing so the last field is never cramped */}
                <div className="h-2" />
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
              <button
                type="button"
                onClick={closeAssessmentForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveAssessment}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {editingAssessment
                  ? 'Save Changes'
                  : 'Create Assessment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION ================= */}
      {deleteItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <FiTrash2 size={22} className="text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Delete{' '}
              {deleteType === 'skill'
                ? 'Skill'
                : deleteType === 'question'
                  ? 'Question'
                  : 'Assessment'}
              ?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete this{' '}
              {deleteType === 'skill'
                ? 'skill'
                : deleteType === 'question'
                  ? 'question'
                  : 'assessment'}
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteConfirmation}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsAssessments