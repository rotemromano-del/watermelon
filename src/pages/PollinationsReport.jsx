import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import ColorEntry from '../components/ColorEntry'
import PhotoUpload from '../components/PhotoUpload'

const EMPLOYEES = [
  'Adul',
  'Dischai',
  'Utai',
  'Wisit',
  'Manoot',
  'Nat',
  'Nampen',
  'Samit',
  'Sanchai',
  'Sak',
  'Saksit',
  'Somai',
  'Sumrit',
  'Supachai',
  'Prawit',
  'Sinad',
  'Penya',
  'Ponchai',
  'Chordechai',
  'Apisit',
  'Sorian',
]

function getTodayDate() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

function createColorEntry() {
  return { id: Date.now() + Math.random(), color: '', lines: '', pollinations: '' }
}

function buildInitialState() {
  return {
    employeeName: '',
    date: getTodayDate(),
    colorEntries: [createColorEntry()],
    photos: [],
  }
}

export default function PollinationsReport() {
  const [employees, setEmployees] = useState(EMPLOYEES)
  const [form, setForm] = useState(buildInitialState())
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [addingName, setAddingName] = useState(false)
  const [newNameInput, setNewNameInput] = useState('')

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate() {
    const errs = {}

    if (!form.employeeName) errs.employeeName = 'Please select your name'

    const entryErrors = form.colorEntries.map((e) => {
      const ee = {}
      if (!e.color) ee.color = 'Required'
      if (e.lines === '' || e.lines === null) ee.lines = 'Required'
      else if (Number(e.lines) < 0) ee.lines = 'Must be ≥ 0'
      if (e.pollinations === '' || e.pollinations === null) ee.pollinations = 'Required'
      else if (Number(e.pollinations) < 0) ee.pollinations = 'Must be ≥ 0'
      return Object.keys(ee).length ? ee : null
    })

    const hasEntryErrors = entryErrors.some(Boolean)
    if (hasEntryErrors) errs.entries = entryErrors

    return errs
  }

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleColorEntryChange = (id, updated) => {
    setForm((f) => ({
      ...f,
      colorEntries: f.colorEntries.map((e) => (e.id === id ? updated : e)),
    }))
    // Clear entry errors on change
    setErrors((prev) => ({ ...prev, entries: null }))
  }

  const handleAddColorEntry = () => {
    setForm((f) => ({
      ...f,
      colorEntries: [...f.colorEntries, createColorEntry()],
    }))
  }

  const handleRemoveColorEntry = (id) => {
    setForm((f) => ({
      ...f,
      colorEntries: f.colorEntries.filter((e) => e.id !== id),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()

    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Convert photos to base64 for persistence
    const photosWithData = await Promise.all(form.photos.map((p) =>
      new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve({ dataUrl: reader.result, description: p.description, fileName: p.file.name })
        reader.readAsDataURL(p.file)
      })
    ))

    const reportData = {
      employeeName: form.employeeName,
      date: form.date,
      colorEntries: form.colorEntries.map((e) => ({
        color: e.color,
        lines: Number(e.lines),
        pollinations: Number(e.pollinations),
      })),
      photos: photosWithData,
      submittedAt: new Date().toISOString(),
    }

    console.log('=== POLLINATIONS REPORT SUBMITTED ===')
    console.log(JSON.stringify({ ...reportData, photos: `[${photosWithData.length} photos]` }, null, 2))

    const existing = JSON.parse(localStorage.getItem('submissions') || '[]')
    localStorage.setItem('submissions', JSON.stringify([...existing, reportData]))

    setSubmitted(true)
  }

  const handleNewReport = () => {
    // Revoke old photo URLs
    form.photos.forEach((p) => URL.revokeObjectURL(p.preview))
    setForm(buildInitialState())
    setErrors({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="app-shell">
        <header className="top-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 3c.5-1.5 2.5-1.5 3 0 .4 1.3 1.9 1.9 3 1 1.3-.9 3.1.5 2.5 2-.5 1.2.2 2.6 1.5 2.8 1.5.3 1.5 2.3 0 2.6-1.3.2-2 1.6-1.5 2.8.6 1.5-1.2 2.9-2.5 2-.9-.9-2.4-.4-3 1-.5 1.5-2.5 1.5-3 0-.6-1.3-2.1-1.9-3-1-1.3.9-3.1-.5-2.5-2 .5-1.2-.2-2.6-1.5-2.8-1.5-.3-1.5-2.3 0-2.6 1.3-.2 2-1.6 1.5-2.8-.6-1.5 1.2-2.9 2.5-2 .9.9 2.4.4 3-1z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="font-bold text-lg tracking-wide">Pollinations Report</span>
          <LockButton />
        </header>

        <main className="page-content flex flex-col items-center justify-center text-center gap-6 py-12">
          <div className="text-8xl animate-bounce">👍</div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Report Complete!</h2>
            <p className="text-slate-500 text-base">
              Your report has been submitted successfully.
            </p>
          </div>

          {/* Summary */}
          <div className="card w-full text-left">
            <p className="section-title">Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Employee</span>
                <span className="font-semibold text-slate-800">{form.employeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="font-semibold text-slate-800">{form.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Color entries</span>
                <span className="font-semibold text-slate-800">{form.colorEntries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total pollinations</span>
                <span className="font-semibold text-primary-700">
                  {form.colorEntries.reduce((sum, e) => sum + Number(e.pollinations || 0), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleNewReport} className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Start New Report
          </button>
        </main>

        <BottomNav />
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      {/* Top App Bar */}
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3c.5-1.5 2.5-1.5 3 0 .4 1.3 1.9 1.9 3 1 1.3-.9 3.1.5 2.5 2-.5 1.2.2 2.6 1.5 2.8 1.5.3 1.5 2.3 0 2.6-1.3.2-2 1.6-1.5 2.8.6 1.5-1.2 2.9-2.5 2-.9-.9-2.4-.4-3 1-.5 1.5-2.5 1.5-3 0-.6-1.3-2.1-1.9-3-1-1.3.9-3.1-.5-2.5-2 .5-1.2-.2-2.6-1.5-2.8-1.5-.3-1.5-2.3 0-2.6 1.3-.2 2-1.6 1.5-2.8-.6-1.5 1.2-2.9 2.5-2 .9.9 2.4.4 3-1z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <div>
          <p className="font-bold text-base leading-tight">Pollinations Report</p>
          <p className="text-primary-200 text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="page-content">
        <form onSubmit={handleSubmit} noValidate>

          {/* ── Section: Employee Info ─────────────────────────────────── */}
          <div className="card">
            <p className="section-title">Employee Info</p>

            {/* Employee Name */}
            <div className="mb-4">
              <label className="field-label" htmlFor="employee-name">
                Employee Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="employee-name"
                  value={addingName ? '__new__' : form.employeeName}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setAddingName(true)
                      setNewNameInput('')
                      setForm((f) => ({ ...f, employeeName: '' }))
                    } else {
                      setAddingName(false)
                      setForm((f) => ({ ...f, employeeName: e.target.value }))
                      setErrors((prev) => ({ ...prev, employeeName: null }))
                    }
                  }}
                  className={`field-input pr-10 ${errors.employeeName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                >
                  <option value="">Select employee...</option>
                  {employees.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                  <option value="__new__">+ Add new name...</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.employeeName && <p className="error-text">{errors.employeeName}</p>}

              {/* Inline new-name input */}
              {addingName && (
                <div className="mt-3 flex gap-2 items-center">
                  <input
                    type="text"
                    autoFocus
                    value={newNameInput}
                    onChange={(e) => setNewNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const trimmed = newNameInput.trim()
                        if (!trimmed) return
                        const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
                        if (!employees.includes(capitalized)) {
                          setEmployees((prev) => [...prev, capitalized])
                        }
                        setForm((f) => ({ ...f, employeeName: capitalized }))
                        setErrors((prev) => ({ ...prev, employeeName: null }))
                        setAddingName(false)
                        setNewNameInput('')
                      }
                      if (e.key === 'Escape') {
                        setAddingName(false)
                        setNewNameInput('')
                      }
                    }}
                    placeholder="Type new name..."
                    className="field-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = newNameInput.trim()
                      if (!trimmed) return
                      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
                      if (!employees.includes(capitalized)) {
                        setEmployees((prev) => [...prev, capitalized])
                      }
                      setForm((f) => ({ ...f, employeeName: capitalized }))
                      setErrors((prev) => ({ ...prev, employeeName: null }))
                      setAddingName(false)
                      setNewNameInput('')
                    }}
                    className="btn-primary px-4 py-3 w-auto rounded-xl text-sm"
                    style={{ minHeight: 52 }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAddingName(false); setNewNameInput('') }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 active:scale-95 transition-transform flex-shrink-0"
                    aria-label="Cancel"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="field-label" htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={form.date}
                disabled
                className="field-input"
              />
              <p className="text-xs text-slate-400 mt-1">Auto-filled to today</p>
            </div>
          </div>

          {/* ── Section: Color Entries ────────────────────────────────── */}
          <div className="card">
            <p className="section-title">Pollination Data</p>

            <div className="flex flex-col gap-4">
              {form.colorEntries.map((entry, index) => (
                <ColorEntry
                  key={entry.id}
                  entry={entry}
                  index={index}
                  totalEntries={form.colorEntries.length}
                  errors={errors.entries?.[index]}
                  onChange={(updated) => handleColorEntryChange(entry.id, updated)}
                  onRemove={() => handleRemoveColorEntry(entry.id)}
                />
              ))}
            </div>

          </div>

          {/* ── Section: Photos ───────────────────────────────────────── */}
          <div className="card">
            <p className="section-title">Photos</p>
            <PhotoUpload
              photos={form.photos}
              onChange={(photos) => setForm((f) => ({ ...f, photos }))}
            />
          </div>

          {/* ── Submit ───────────────────────────────────────────────── */}
          <button type="submit" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Submit Report
          </button>

          {/* General error hint */}
          {Object.keys(errors).length > 0 && (
            <p className="text-center text-red-500 text-sm mt-3 font-medium">
              Please fill in all required fields above
            </p>
          )}

        </form>
      </main>

      <BottomNav />
    </div>
  )
}
