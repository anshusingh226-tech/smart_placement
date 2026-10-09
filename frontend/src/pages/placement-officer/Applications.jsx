import { useEffect, useState } from 'react'
import { officerApi } from '../../lib/officerApi'
import StatusBadge from '../../components/StatusBadge'

const STATUSES = ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected']
const PAGE_SIZE = 20

const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—')
const show = (v) => (v === null || v === undefined || v === '' ? '—' : v)

function Section({ icon, iconBg, title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-slate-200 p-5 ${className}`}>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${iconBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

// Asks the backend to run the AI resume analysis and merges the result in.
async function runAnalysis(id, { setDetail, setAiRunning, setAiError, setRecommended }) {
  try {
    setAiRunning(true)
    setAiError('')
    const result = await officerApi(`applications/${id}/analyze`, { method: 'POST' })
    setDetail((d) =>
      d && d.id === id ? { ...d, ai_analysis: { ...d.ai_analysis, ...result.data } } : d
    )
    setRecommended(result.data.recommended_skills || [])
  } catch (e) {
    setAiError(e.message)
  } finally {
    setAiRunning(false)
  }
}

function Applications() {
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedId, setSelectedId] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [savingStatus, setSavingStatus] = useState(false)
  const [aiRunning, setAiRunning] = useState(false)
  const [aiError, setAiError] = useState('')
  const [recommended, setRecommended] = useState([])
  const aiSetters = { setDetail, setAiRunning, setAiError, setRecommended }

  // Load the list (search is debounced)
  useEffect(() => {
    let active = true
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const result = await officerApi('applications', {
          query: { search, status: statusFilter, page, limit: PAGE_SIZE },
        })
        if (!active) return
        setRows(result.data)
        setTotal(result.pagination?.total || 0)
        setError('')
      } catch (e) {
        if (active) setError(e.message)
      } finally {
        if (active) setLoading(false)
      }
    }, 300)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [search, statusFilter, page])

  // Load one application's full details
  useEffect(() => {
    if (!selectedId) return
    let active = true
    ;(async () => {
      try {
        setDetailLoading(true)
        setDetailError('')
        const result = await officerApi(`applications/${selectedId}`)
        if (!active) return
        setDetail(result.data)
        setNewStatus(result.data.status)
        setRecommended([])
        setAiError('')
        const ai = result.data.ai_analysis
        if (ai.ai_configured && ai.match_percentage == null && result.data.resume?.view_url) {
          runAnalysis(selectedId, { setDetail, setAiRunning, setAiError, setRecommended })
        }
      } catch (e) {
        if (active) setDetailError(e.message)
      } finally {
        if (active) setDetailLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [selectedId])

  const closeDetail = () => {
    setSelectedId(null)
    setDetail(null)
    setDetailError('')
  }

  const saveStatus = async () => {
    try {
      setSavingStatus(true)
      setDetailError('')
      await officerApi(`applications/${selectedId}/status`, {
        method: 'PATCH',
        body: { status: newStatus },
      })
      setDetail((d) => ({ ...d, status: newStatus }))
      setRows((rs) => rs.map((r) => (r.id === selectedId ? { ...r, status: newStatus } : r)))
    } catch (e) {
      setDetailError(e.message)
    } finally {
      setSavingStatus(false)
    }
  }

  const openUrl = (url) => url && window.open(url, '_blank', 'noopener,noreferrer')
  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1)
  const inputClass =
    'rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100'

  const elig = detail?.eligibility
  const eligBox = (label, ok) => (
    <div className="rounded-xl bg-slate-50 p-4" key={label}>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className={`mt-2 text-sm font-semibold ${ok ? 'text-emerald-600' : 'text-red-500'}`}>
        {ok ? '✔ Met' : '✘ Not met'}
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Placement Portal</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Applications 📄
        </h1>
        <p className="mt-2 text-slate-500">
          Review students who have applied to your job opportunities.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Job Applications</h2>
          <p className="mt-1 text-sm text-slate-500">
            Only students who have applied to your jobs will appear here.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search by student name..."
            className={`w-full md:max-w-md ${inputClass}`}
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className={inputClass}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Student</span>
            <span>Job</span>
            <span>Date Applied</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📄
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {loading ? 'Loading…' : 'No applications available'}
              </h3>
              {!loading && (
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Students will appear here after they apply to one of your job
                  opportunities.
                </p>
              )}
            </div>
          ) : (
            rows.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-5 items-center border-t border-slate-100 px-5 py-4 text-sm hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-800">{a.student_name}</span>
                <span className="text-slate-600">
                  {a.job_role}
                  {a.company ? ` · ${a.company}` : ''}
                </span>
                <span className="text-slate-600">{formatDate(a.applied_at)}</span>
                <span>
                  <StatusBadge status={a.status} />
                </span>
                <span>
                  <button
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className="font-medium text-blue-600 transition hover:text-blue-800"
                  >
                    View Details
                  </button>
                </span>
              </div>
            ))
          )}
        </div>

        {total > PAGE_SIZE && (
          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <span>
              Page {page} of {totalPages} · {total} applications
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal (read-only except status) */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Application Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {detail
                    ? `${detail.job.role}${detail.job.company ? ` · ${detail.job.company}` : ''}`
                    : 'Student application information'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 p-6">
              {detailError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {detailError}
                </div>
              )}

              {detailLoading && !detail && (
                <p className="py-10 text-center text-sm text-slate-500">Loading…</p>
              )}

              {detail && (
                <>
                  {/* Status (the only editable thing) */}
                  <div className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <span className="text-sm font-medium text-slate-600">Status:</span>
                    <StatusBadge status={detail.status} />
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="ml-auto rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={saveStatus}
                      disabled={savingStatus || newStatus === detail.status}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40"
                    >
                      {savingStatus ? 'Saving…' : 'Update Status'}
                    </button>
                  </div>

                  {/* Student Profile */}
                  <Section
                    icon="👤"
                    iconBg="bg-blue-50"
                    title="Student Profile"
                    subtitle="Read-only student information"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        ['Name', detail.student.name],
                        ['Email', detail.student.email],
                        ['Phone', detail.student.phone],
                        ['Department', detail.student.department],
                        ['Branch', detail.student.branch],
                        ['Graduation Year', detail.student.graduation_year],
                        ['CGPA', detail.student.cgpa],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-lg bg-slate-50 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            {label}
                          </p>
                          <p className="mt-1 break-words text-sm font-medium text-slate-700">
                            {show(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {/* Resume */}
                  <Section
                    icon="📎"
                    iconBg="bg-purple-50"
                    title="Resume"
                    subtitle="Resume uploaded by the student"
                  >
                    {detail.resume?.view_url ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openUrl(detail.resume.view_url)}
                          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          View Resume
                        </button>
                        <button
                          type="button"
                          onClick={() => openUrl(detail.resume.download_url)}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Download Resume
                        </button>
                        {detail.resume.file_name && (
                          <span className="text-xs text-slate-400">{detail.resume.file_name}</span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        This student has not uploaded a resume.
                      </p>
                    )}
                  </Section>

                  {/* AI Analysis */}
                  <Section
                    icon="🤖"
                    iconBg="bg-purple-100"
                    title="AI Analysis"
                    subtitle="Resume and job matching information"
                    className="!border-purple-100 bg-purple-50/40"
                  >
                    {detail.ai_analysis.ai_configured && detail.resume?.view_url && (
                      <div className="mb-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => runAnalysis(selectedId, aiSetters)}
                          disabled={aiRunning}
                          className="rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 disabled:opacity-50"
                        >
                          {aiRunning
                            ? 'Analysing…'
                            : detail.ai_analysis.match_percentage != null
                              ? 'Re-run analysis'
                              : 'Run analysis'}
                        </button>
                        {aiRunning && (
                          <span className="text-xs text-slate-500">
                            Reading the resume — this can take up to a minute the first time.
                          </span>
                        )}
                      </div>
                    )}

                    {aiError && (
                      <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                        {aiError}
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-xl bg-white p-4">
                        <p className="text-xs font-medium text-slate-400">Resume Match</p>
                        <p className="mt-2 text-2xl font-bold text-purple-600">
                          {detail.ai_analysis.match_percentage != null
                            ? `${detail.ai_analysis.match_percentage}%`
                            : aiRunning
                              ? '…'
                              : '—'}
                        </p>
                        {detail.ai_analysis.match_percentage == null && !aiRunning && (
                          <p className="mt-1 text-xs text-slate-400">
                            {!detail.ai_analysis.ai_configured
                              ? 'AI service not set up'
                              : !detail.resume?.view_url
                                ? 'No resume to analyse'
                                : 'Not analysed yet'}
                          </p>
                        )}
                      </div>
                      {[
                        ['Extracted Skills', detail.ai_analysis.extracted_skills, 'bg-blue-50 text-blue-700'],
                        ['Missing Skills', detail.ai_analysis.missing_skills, 'bg-red-50 text-red-600'],
                      ].map(([label, list, chip]) => (
                        <div key={label} className="rounded-xl bg-white p-4">
                          <p className="text-xs font-medium text-slate-400">{label}</p>
                          {list.length ? (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {list.map((sk) => (
                                <span key={sk} className={`rounded-full px-2.5 py-1 text-xs font-medium ${chip}`}>
                                  {sk}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-2 text-sm text-slate-500">No data available</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {recommended.length > 0 && (
                      <div className="mt-4 rounded-xl bg-white p-4">
                        <p className="text-xs font-medium text-slate-400">Recommended Skills</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {recommended.map((sk) => (
                            <span key={sk} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Section>

                  {/* Assessment Scores */}
                  <Section
                    icon="📝"
                    iconBg="bg-green-50"
                    title="Assessment Scores"
                    subtitle="Highest score for each attempted assessment"
                  >
                    {detail.assessment_scores.length ? (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {detail.assessment_scores.map((s) => (
                          <div key={s.skill} className="rounded-xl bg-slate-50 p-4">
                            <p className="text-xs font-medium text-slate-400">{s.skill}</p>
                            <p className="mt-1 text-xl font-bold text-slate-800">
                              {s.highest_percentage}%
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
                        This student has not attempted any assessments.
                      </div>
                    )}
                  </Section>

                  {/* Eligibility */}
                  <Section
                    icon="✅"
                    iconBg="bg-green-50"
                    title="Eligibility"
                    subtitle="Job eligibility evaluation"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {eligBox('Aptitude Requirement', elig.aptitude_requirement_met)}
                      {eligBox('Skill Requirement', elig.skill_requirement_met)}
                      {eligBox('Overall Eligibility', elig.overall_eligible)}
                    </div>
                    {elig.reasons.length > 0 && (
                      <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-red-600">
                        {elig.reasons.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </Section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications
