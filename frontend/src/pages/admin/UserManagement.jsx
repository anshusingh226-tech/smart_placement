import { useMemo, useState } from 'react'
import {
  FiEdit2,
  FiKey,
  FiPower,
  FiTrash2,
  FiUserPlus,
  FiX,
} from 'react-icons/fi'

function UserManagement() {
  const [activeTab, setActiveTab] = useState('students')

  const [showUserForm, setShowUserForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] =
    useState(false)

  const [editingUser, setEditingUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [statusAction, setStatusAction] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    status: 'Active',
  })

  /*
   * No hardcoded backend users.
   *
   * These arrays will later be populated from Supabase/backend.
   */
  const students = []
  const officers = []

  const currentUsers =
    activeTab === 'students' ? students : officers

  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase()

    if (!search) {
      return currentUsers
    }

    return currentUsers.filter((user) => {
      const name = user.name?.toLowerCase() || ''
      const email = user.email?.toLowerCase() || ''

      return name.includes(search) || email.includes(search)
    })
  }, [currentUsers, searchTerm])

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

  const labelClass =
    'mb-2 block text-sm font-medium text-slate-700'

  /* ================= CREATE / EDIT USER ================= */

  const openCreateUser = () => {
    setEditingUser(null)

    setUserForm({
      name: '',
      email: '',
      role:
        activeTab === 'students'
          ? 'Student'
          : 'Placement Officer',
      status: 'Active',
    })

    setShowUserForm(true)
  }

  const openEditUser = (user) => {
    setEditingUser(user)

    setUserForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'Student',
      status: user.status || 'Active',
    })

    setShowUserForm(true)
  }

  const closeUserForm = () => {
    setShowUserForm(false)
    setEditingUser(null)
  }

  const saveUser = () => {
    /*
     * Backend integration will be added later.
     *
     * Administrator is the only role that should be able
     * to perform this operation.
     */
    closeUserForm()
  }

  /* ================= DELETE USER ================= */

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setSelectedUser(null)
    setShowDeleteModal(false)
  }

  const confirmDelete = () => {
    // Backend delete operation will be added later.
    closeDeleteModal()
  }

  /* ================= SUSPEND / ACTIVATE ================= */

  const openStatusModal = (user, action) => {
    setSelectedUser(user)
    setStatusAction(action)
    setShowStatusModal(true)
  }

  const closeStatusModal = () => {
    setSelectedUser(null)
    setStatusAction(null)
    setShowStatusModal(false)
  }

  const confirmStatusChange = () => {
    /*
     * Backend status update will be added later.
     *
     * statusAction:
     * - suspend
     * - activate
     */
    closeStatusModal()
  }

  /* ================= RESET PASSWORD ================= */

  const openResetPasswordModal = (user) => {
    setSelectedUser(user)
    setShowResetPasswordModal(true)
  }

  const closeResetPasswordModal = () => {
    setSelectedUser(null)
    setShowResetPasswordModal(false)
  }

  const confirmResetPassword = () => {
    // Backend password reset operation will be added later.
    closeResetPasswordModal()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            User Management 👥
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students and placement officers.
          </p>
        </div>

        {/* Admin-only UI action */}
        <button
          type="button"
          onClick={openCreateUser}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <FiUserPlus size={17} />
          Create User
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex flex-wrap gap-8">
            <button
              type="button"
              onClick={() => {
                setActiveTab('students')
                setSearchTerm('')
              }}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                activeTab === 'students'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🎓 Students
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('officers')
                setSearchTerm('')
              }}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                activeTab === 'officers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              🧑‍💼 Placement Officers
            </button>
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeTab === 'students'
                  ? 'Search students...'
                  : 'Search placement officers...'
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p className="text-sm text-slate-400">
            {filteredUsers.length} user
            {filteredUsers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* ================= STUDENTS ================= */}

        {activeTab === 'students' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Name</span>
              <span>Email</span>
              <span>Status</span>
              <span>Role</span>
              <span>Actions</span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  🎓
                </div>

                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                  {searchTerm
                    ? 'No students found'
                    : 'No students available'}
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  {searchTerm
                    ? 'Try searching with a different name or email.'
                    : 'Student records will appear here once they are loaded from the backend.'}
                </p>

                {!searchTerm && (
                  <button
                    type="button"
                    onClick={openCreateUser}
                    className="mt-5 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    + Add Student
                  </button>
                )}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={openEditUser}
                  onDelete={openDeleteModal}
                  onStatusChange={openStatusModal}
                  onResetPassword={openResetPasswordModal}
                />
              ))
            )}
          </div>
        )}

        {/* ================= PLACEMENT OFFICERS ================= */}

        {activeTab === 'officers' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Name</span>
              <span>Email</span>
              <span>Status</span>
              <span>Role</span>
              <span>Actions</span>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                  🧑‍💼
                </div>

                <h2 className="mt-4 text-lg font-semibold text-slate-800">
                  {searchTerm
                    ? 'No placement officers found'
                    : 'No placement officers available'}
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  {searchTerm
                    ? 'Try searching with a different name or email.'
                    : 'Placement officer records will appear here once they are loaded from the backend.'}
                </p>

                {!searchTerm && (
                  <button
                    type="button"
                    onClick={openCreateUser}
                    className="mt-5 rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                  >
                    + Add Placement Officer
                  </button>
                )}
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={openEditUser}
                  onDelete={openDeleteModal}
                  onStatusChange={openStatusModal}
                  onResetPassword={openResetPasswordModal}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* ================= CREATE / EDIT USER MODAL ================= */}

      {showUserForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingUser ? 'Edit User' : 'Create User'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingUser
                    ? 'Update the user account information.'
                    : 'Create an account for a student or placement officer.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeUserForm}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="grid gap-5 p-6">
                {/* Name */}
                <div>
                  <label className={labelClass}>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Rahul Sharma"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="e.g. rahul@example.com"
                    className={inputClass}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className={labelClass}>
                    Role
                  </label>

                  <select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        role: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Student">Student</option>
                    <option value="Placement Officer">
                      Placement Officer
                    </option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className={labelClass}>
                    Account Status
                  </label>

                  <select
                    value={userForm.status}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        status: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {!editingUser && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-800">
                      Administrator Account Creation
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-600">
                      Students and Placement Officers do not have a
                      self-registration option. Their accounts are created
                      by an Administrator.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
              <button
                type="button"
                onClick={closeUserForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveUser}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && selectedUser && (
        <ConfirmationModal
          title="Delete User?"
          description={`Are you sure you want to permanently delete ${selectedUser.name}? This action cannot be undone.`}
          confirmText="Delete User"
          confirmClass="bg-red-500 hover:bg-red-600"
          icon={<FiTrash2 size={21} className="text-red-500" />}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}

      {/* ================= STATUS MODAL ================= */}

      {showStatusModal && selectedUser && (
        <ConfirmationModal
          title={
            statusAction === 'suspend'
              ? 'Suspend User?'
              : 'Activate User?'
          }
          description={
            statusAction === 'suspend'
              ? `Are you sure you want to suspend ${selectedUser.name}? They will no longer be able to use their account while suspended.`
              : `Are you sure you want to activate ${selectedUser.name}? Their account will become active again.`
          }
          confirmText={
            statusAction === 'suspend'
              ? 'Suspend User'
              : 'Activate User'
          }
          confirmClass={
            statusAction === 'suspend'
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-emerald-500 hover:bg-emerald-600'
          }
          icon={<FiPower size={21} className="text-slate-600" />}
          onCancel={closeStatusModal}
          onConfirm={confirmStatusChange}
        />
      )}

      {/* ================= RESET PASSWORD MODAL ================= */}

      {showResetPasswordModal && selectedUser && (
        <ConfirmationModal
          title="Reset Password?"
          description={`Are you sure you want to reset the password for ${selectedUser.name}? A password reset process will be triggered.`}
          confirmText="Reset Password"
          confirmClass="bg-blue-600 hover:bg-blue-700"
          icon={<FiKey size={21} className="text-blue-500" />}
          onCancel={closeResetPasswordModal}
          onConfirm={confirmResetPassword}
        />
      )}
    </div>
  )
}

/* ============================================================
   USER ROW
   ============================================================ */

function UserRow({
  user,
  onEdit,
  onDelete,
  onStatusChange,
  onResetPassword,
}) {
  const isSuspended =
    user.status?.toLowerCase() === 'suspended'

  const isActive =
    user.status?.toLowerCase() === 'active'

  return (
    <div className="grid grid-cols-5 items-center border-t border-slate-100 px-5 py-4 text-sm">
      {/* Name */}
      <span className="font-semibold text-slate-800">
        {user.name}
      </span>

      {/* Email */}
      <span className="text-slate-600">
        {user.email}
      </span>

      {/* Status */}
      <span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isSuspended
              ? 'bg-orange-50 text-orange-700'
              : isActive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-slate-100 text-slate-500'
          }`}
        >
          {user.status}
        </span>
      </span>

      {/* Role */}
      <span className="text-slate-600">
        {user.role}
      </span>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {/* Edit */}
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:text-blue-800"
        >
          <FiEdit2 size={14} />
          Edit
        </button>

        <span className="text-slate-300">/</span>

        {/* Suspend / Activate */}
        {isSuspended ? (
          <button
            type="button"
            onClick={() => onStatusChange(user, 'activate')}
            className="inline-flex items-center gap-1.5 font-medium text-emerald-600 hover:text-emerald-800"
          >
            <FiPower size={14} />
            Activate
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStatusChange(user, 'suspend')}
            className="inline-flex items-center gap-1.5 font-medium text-orange-600 hover:text-orange-800"
          >
            <FiPower size={14} />
            Suspend
          </button>
        )}

        <span className="text-slate-300">/</span>

        {/* Reset Password */}
        <button
          type="button"
          onClick={() => onResetPassword(user)}
          className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-800"
        >
          <FiKey size={14} />
          Reset
        </button>

        <span className="text-slate-300">/</span>

        {/* Delete */}
        <button
          type="button"
          onClick={() => onDelete(user)}
          className="inline-flex items-center gap-1.5 font-medium text-red-500 hover:text-red-700"
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  )
}

/* ============================================================
   CONFIRMATION MODAL
   ============================================================ */

function ConfirmationModal({
  title,
  description,
  confirmText,
  confirmClass,
  icon,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${confirmClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserManagement