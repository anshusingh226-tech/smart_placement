function AdminDashboard() {
  const summaryCards = [
    { title: 'Total Students', value: 0 },
    { title: 'Placement Officers', value: 0 },
    { title: 'Companies', value: 0 },
    { title: 'Jobs', value: 0 },
    { title: 'Applications', value: 0 },
    { title: 'Skills', value: 0 },
    { title: 'Assessments', value: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Overview of the Smart Placement System
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard