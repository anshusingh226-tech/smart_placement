import { useState } from 'react'
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

function CompaniesJobs() {
  const [activeTab, setActiveTab] = useState('companies')

  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [showJobForm, setShowJobForm] = useState(false)

  const [editingCompany, setEditingCompany] = useState(null)
  const [editingJob, setEditingJob] = useState(null)

  const [deleteType, setDeleteType] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)

  const [companyForm, setCompanyForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    status: 'Active',
  })

  const [jobForm, setJobForm] = useState({
    company: '',
    role: '',
    description: '',
    salary: '',
    location: '',
    employmentType: '',
    deadline: '',
    requiredSkills: '',
    requiredSkillPercentage: '',
    minimumAptitudePercentage: '',
    minimumCGPA: '',
    eligibleBranches: '',
  })

  const tabs = [
    { id: 'companies', label: 'Companies', icon: '🏢' },
    { id: 'jobs', label: 'Jobs', icon: '💼' },
  ]

  // No hardcoded backend data.
  // These arrays will be replaced with backend data later.
  const companies = []
  const jobs = []

  const openAddCompany = () => {
    setEditingCompany(null)
    setCompanyForm({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      status: 'Active',
    })
    setShowCompanyForm(true)
  }

  const openEditCompany = (company) => {
    setEditingCompany(company)

    setCompanyForm({
      name: company.name || '',
      contactPerson: company.contactPerson || '',
      email: company.email || '',
      phone: company.phone || '',
      website: company.website || '',
      status: company.status || 'Active',
    })

    setShowCompanyForm(true)
  }

  const closeCompanyForm = () => {
    setShowCompanyForm(false)
    setEditingCompany(null)
  }

  const saveCompany = () => {
    // Backend integration will be added later.
    closeCompanyForm()
  }

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

  const openCreateJob = () => {
    setEditingJob(null)
    setJobForm({
      company: '',
      role: '',
      description: '',
      salary: '',
      location: '',
      employmentType: '',
      deadline: '',
      requiredSkills: '',
      requiredSkillPercentage: '',
      minimumAptitudePercentage: '',
      minimumCGPA: '',
      eligibleBranches: '',
    })
    setShowJobForm(true)
  }

  const openEditJob = (job) => {
    setEditingJob(job)

    setJobForm({
      company: job.company || '',
      role: job.role || '',
      description: job.description || '',
      salary: job.salary || '',
      location: job.location || '',
      employmentType: job.employmentType || '',
      deadline: job.deadline || '',
      requiredSkills: job.requiredSkills || '',
      requiredSkillPercentage: job.requiredSkillPercentage || '',
      minimumAptitudePercentage: job.minimumAptitudePercentage || '',
      minimumCGPA: job.minimumCGPA || '',
      eligibleBranches: job.eligibleBranches || '',
    })

    setShowJobForm(true)
  }

  const closeJobForm = () => {
    setShowJobForm(false)
    setEditingJob(null)
  }

  const saveJob = () => {
    // Backend integration will be added later.
    closeJobForm()
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

  const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Placement Portal
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Companies & Jobs 🏢
        </h1>

        <p className="mt-2 text-slate-500">
          Manage companies and job opportunities.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-slate-200 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= COMPANIES ================= */}
        {activeTab === 'companies' && (
          <>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Companies
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage companies participating in campus placements.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddCompany}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Add Company
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search companies..."
                className={inputClass}
              />
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Company
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <div className="mx-auto max-w-md">
                          <div className="mb-4 text-4xl">🏢</div>

                          <h3 className="text-base font-semibold text-slate-800">
                            No companies yet
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            Companies added through the backend will appear
                            here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    companies.map((company) => (
                      <tr
                        key={company.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-800">
                            {company.name}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {company.contactPerson}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              company.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {company.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-3 text-sm">
                            <button
                              type="button"
                              onClick={() => openEditCompany(company)}
                              className="inline-flex items-center gap-1.5 font-medium text-blue-600 transition hover:text-blue-800"
                            >
                              <FiEdit2 size={15} />
                              Edit
                            </button>

                            <span className="text-slate-300">/</span>

                            <button
                              type="button"
                              onClick={() =>
                                openDeleteConfirmation('company', company)
                              }
                              className="inline-flex items-center gap-1.5 font-medium text-red-500 transition hover:text-red-700"
                            >
                              <FiTrash2 size={15} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add/Edit Company Modal */}
            {showCompanyForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
                <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {editingCompany ? 'Edit Company' : 'Add Company'}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {editingCompany
                          ? 'Update company information.'
                          : 'Add a company to the placement portal.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeCompanyForm}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Close"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Company Name</label>
                      <input
                        type="text"
                        value={companyForm.name}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter company name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Contact Person</label>
                      <input
                        type="text"
                        value={companyForm.contactPerson}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            contactPerson: e.target.value,
                          })
                        }
                        placeholder="Enter contact person"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Contact Email</label>
                      <input
                        type="email"
                        value={companyForm.email}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="company@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Contact Phone</label>
                      <input
                        type="tel"
                        value={companyForm.phone}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter phone number"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Company Website</label>
                      <input
                        type="url"
                        value={companyForm.website}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Status</label>

                      <select
                        value={companyForm.status}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            status: e.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
                    <button
                      type="button"
                      onClick={closeCompanyForm}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveCompany}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {editingCompany ? 'Save Changes' : 'Save Company'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= JOBS ================= */}
        {activeTab === 'jobs' && (
          <>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create and manage job opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateJob}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Create Job
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search jobs..."
                className={inputClass}
              />
            </div>

            {/* Jobs Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Company
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Role
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Location
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Deadline
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="mx-auto max-w-md">
                          <div className="mb-4 text-4xl">💼</div>

                          <h3 className="text-base font-semibold text-slate-800">
                            No jobs yet
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            Jobs created through the backend will appear here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr
                        key={job.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                          {job.company}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-700">
                          {job.role}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {job.location}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {job.deadline}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-3 text-sm">
                            <button
                              type="button"
                              onClick={() => openEditJob(job)}
                              className="inline-flex items-center gap-1.5 font-medium text-blue-600 transition hover:text-blue-800"
                            >
                              <FiEdit2 size={15} />
                              Edit
                            </button>

                            <span className="text-slate-300">/</span>

                            <button
                              type="button"
                              onClick={() =>
                                openDeleteConfirmation('job', job)
                              }
                              className="inline-flex items-center gap-1.5 font-medium text-red-500 transition hover:text-red-700"
                            >
                              <FiTrash2 size={15} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Create/Edit Job Modal */}
            {showJobForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
                <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {editingJob ? 'Edit Job' : 'Create Job'}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {editingJob
                          ? 'Update the job opportunity details.'
                          : 'Add a new job opportunity.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeJobForm}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Close"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="overflow-y-auto">
                    <div className="grid gap-5 p-6 md:grid-cols-2">
                      {/* Company */}
                      <div>
                        <label className={labelClass}>Company</label>

                        <select
                          value={jobForm.company}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              company: e.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="">
                            Companies will load from backend
                          </option>
                        </select>
                      </div>

                      {/* Role */}
                      <div>
                        <label className={labelClass}>Role</label>

                        <input
                          type="text"
                          value={jobForm.role}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              role: e.target.value,
                            })
                          }
                          placeholder="e.g. Software Engineer"
                          className={inputClass}
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <label className={labelClass}>
                          Job Description
                        </label>

                        <textarea
                          rows="4"
                          value={jobForm.description}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter job description..."
                          className={inputClass}
                        />
                      </div>

                      {/* Salary */}
                      <div>
                        <label className={labelClass}>Salary</label>

                        <input
                          type="text"
                          value={jobForm.salary}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              salary: e.target.value,
                            })
                          }
                          placeholder="e.g. ₹8 LPA"
                          className={inputClass}
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className={labelClass}>Location</label>

                        <input
                          type="text"
                          value={jobForm.location}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              location: e.target.value,
                            })
                          }
                          placeholder="e.g. Pune"
                          className={inputClass}
                        />
                      </div>

                      {/* Employment Type */}
                      <div>
                        <label className={labelClass}>
                          Employment Type
                        </label>

                        <select
                          value={jobForm.employmentType}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              employmentType: e.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="">Select type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>

                      {/* Deadline */}
                      <div>
                        <label className={labelClass}>
                          Application Deadline
                        </label>

                        <input
                          type="date"
                          value={jobForm.deadline}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              deadline: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      {/* Required Skills */}
                      <div className="md:col-span-2">
                        <label className={labelClass}>
                          Required Skills
                        </label>

                        <input
                          type="text"
                          value={jobForm.requiredSkills}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              requiredSkills: e.target.value,
                            })
                          }
                          placeholder="e.g. Java, SQL, React"
                          className={inputClass}
                        />

                        <p className="mt-1.5 text-xs text-slate-400">
                          Separate multiple skills with commas.
                        </p>
                      </div>

                      {/* Required Skill Percentage */}
                      <div>
                        <label className={labelClass}>
                          Required Skill Percentage
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={jobForm.requiredSkillPercentage}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              requiredSkillPercentage: e.target.value,
                            })
                          }
                          placeholder="e.g. 70"
                          className={inputClass}
                        />
                      </div>

                      {/* Minimum Aptitude Percentage */}
                      <div>
                        <label className={labelClass}>
                          Minimum Aptitude Percentage
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={jobForm.minimumAptitudePercentage}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              minimumAptitudePercentage: e.target.value,
                            })
                          }
                          placeholder="e.g. 60"
                          className={inputClass}
                        />
                      </div>

                      {/* Minimum CGPA */}
                      <div>
                        <label className={labelClass}>Minimum CGPA</label>

                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.01"
                          value={jobForm.minimumCGPA}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              minimumCGPA: e.target.value,
                            })
                          }
                          placeholder="e.g. 7.5"
                          className={inputClass}
                        />
                      </div>

                      {/* Eligible Branches */}
                      <div>
                        <label className={labelClass}>
                          Eligible Branches
                        </label>

                        <input
                          type="text"
                          value={jobForm.eligibleBranches}
                          onChange={(e) =>
                            setJobForm({
                              ...jobForm,
                              eligibleBranches: e.target.value,
                            })
                          }
                          placeholder="e.g. CSE, IT, AI&DS"
                          className={inputClass}
                        />

                        <p className="mt-1.5 text-xs text-slate-400">
                          Separate multiple branches with commas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
                    <button
                      type="button"
                      onClick={closeJobForm}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={saveJob}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {editingJob ? 'Save Changes' : 'Create Job'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= DELETE CONFIRMATION ================= */}
      {deleteItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <FiTrash2 size={22} className="text-red-500" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Delete {deleteType === 'company' ? 'Company' : 'Job'}?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete this{' '}
              {deleteType === 'company' ? 'company' : 'job'}? This action
              cannot be undone.
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

export default CompaniesJobs