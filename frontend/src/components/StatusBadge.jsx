const STYLES = {
  Applied: 'bg-blue-50 text-blue-700',
  'Under Review': 'bg-amber-50 text-amber-700',
  Shortlisted: 'bg-purple-50 text-purple-700',
  Selected: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-600',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        STYLES[status] || 'bg-slate-100 text-slate-600'
      }`}
    >
      {status || '—'}
    </span>
  )
}

export default StatusBadge
