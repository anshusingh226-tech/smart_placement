function Notifications() {
  const notifications = [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Notifications
      </h1>

      <p className="mt-2 mb-8 text-slate-500">
        Stay updated with your placement activities.
      </p>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">🔔</div>

          <h2 className="text-xl font-semibold text-slate-900">
            No Notifications
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            New notifications and placement updates will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-slate-900">
                {notification.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;