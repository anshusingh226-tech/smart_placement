import { useEffect, useState } from 'react'
import { officerApi } from '../../lib/officerApi'
import StatusBadge from '../../components/StatusBadge'

const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—')

function PlacementOfficerDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const result = await officerApi('dashboard')
        if (active) setData(result.data)
      } catch (e) {
        if (active) setError(e.message)
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const recent = data?.recent_applications || []
  const cards = [
    {
      label: 'Total Jobs',
      value: data?.total_jobs,
      note: 'Job opportunities created',
      icon: '💼',
      style: 'border-blue-100 from-blue-50',
      iconStyle: 'bg-blue-100',
    },
    {
      label: 'Total Applications',
      value: data?.total_applications,
      note: 'Applications received',
      icon: '📄',
      style: 'border-purple-100 from-purple-50',
      iconStyle: 'bg-purple-100',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Placement Portal</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Welcome back! 👋
        </h1>
        <p className="mt-2 text-slate-500">
          Here's what's happening with your placement portal today.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border bg-gradient-to-br to-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${c.style}`}
          >
            <div
              className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${c.iconStyle}`}
            >
              {c.icon}
            </div>
            <p className="text-sm font-medium text-slate-500">{c.label}</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {loading ? '…' : c.value ?? '—'}
            </p>
            <p className="mt-2 text-sm text-slate-500">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Applications 📋</h2>
          <p className="mt-1 text-sm text-slate-500">
            Recently submitted applications for your job opportunities.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>Student</span>
            <span>Job</span>
            <span>Date Applied</span>
            <span>Status</span>
          </div>

          {recent.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📄
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {loading ? 'Loading…' : 'No applications available'}
              </h3>
              {!loading && (
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Applications will appear here when students apply to your job
                  opportunities.
                </p>
              )}
            </div>
          ) : (
            recent.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-4 items-center border-t border-slate-100 px-5 py-4 text-sm hover:bg-slate-50"
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PlacementOfficerDashboard
