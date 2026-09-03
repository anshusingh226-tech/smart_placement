import { useState } from "react";

function StudentDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Student Portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what's happening with your applications.
          </p>
        </div>

        {/* Notification Button + Panel */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl shadow-sm transition hover:bg-slate-50"
            title="Notifications"
          >
            🔔

            {/* Notification dot */}
            {notifications.length > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Notifications
                  </h2>

                  <p className="text-xs text-slate-500">
                    {notifications.length} new notifications
                  </p>
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-lg text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              {/* Notifications */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <div className="text-3xl">🔔</div>

                    <p className="mt-3 font-medium text-slate-700">
                      No notifications
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          🔔
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 px-5 py-3">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
            💼
          </div>

          <p className="text-sm font-medium text-slate-500">
            Opportunities
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Available to you
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
            📄
          </div>

          <p className="text-sm font-medium text-slate-500">
            Applications
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            —
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            Submitted so far
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
            Average fit
          </p>
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          📌 Recent Opportunities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest postings matched to you
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <div className="text-4xl">💼</div>

          <p className="mt-3 font-medium text-slate-700">
            No opportunities available yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Opportunities will appear here once they are added.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;