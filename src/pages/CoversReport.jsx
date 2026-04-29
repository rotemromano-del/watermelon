import { useState, useEffect, useRef } from 'react'
import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import ColorEntry from '../components/ColorEntry'
import { useLang } from '../LangContext'

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
    employeeName: localStorage.getItem('lastEmployeeName') || '',
    date: getTodayDate(),
    colorEntries: [createColorEntry()],
  }
}

export default function CoversReport() {
  const { t } = useLang()
  const installPromptRef = useRef(null)
  const [showInstallGuide, setShowInstallGuide] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      installPromptRef.current = e
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  function handleInstall() {
    if (installPromptRef.current) {
      installPromptRef.current.prompt()
      installPromptRef.current.userChoice.then(() => { installPromptRef.current = null })
    } else {
      setShowInstallGuide(true)
    }
  }

  const [employees, setEmployees] = useState(EMPLOYEES)
  const [form, setForm] = useState(buildInitialState())
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [addingName, setAddingName] = useState(false)
  const [newNameInput, setNewNameInput] = useState('')

  function validate() {
    const errs = {}
    if (!form.employeeName) errs.employeeName = t('pleaseSelectName')
    const entryErrors = form.colorEntries.map((e) => {
      const ee = {}
      if (!e.color) ee.color = t('required')
      if (e.lines === '' || e.lines === null) ee.lines = t('required')
      else if (Number(e.lines) < 0) ee.lines = t('mustBeNonNeg')
      if (e.pollinations === '' || e.pollinations === null) ee.pollinations = t('required')
      else if (Number(e.pollinations) < 0) ee.pollinations = t('mustBeNonNeg')
      return Object.keys(ee).length ? ee : null
    })
    if (entryErrors.some(Boolean)) errs.entries = entryErrors
    return errs
  }

  const handleColorEntryChange = (id, updated) => {
    setForm((f) => ({ ...f, colorEntries: f.colorEntries.map((e) => (e.id === id ? updated : e)) }))
    setErrors((prev) => ({ ...prev, entries: null }))
  }

  const handleAddColorEntry = () => {
    setForm((f) => ({ ...f, colorEntries: [...f.colorEntries, createColorEntry()] }))
  }

  const handleRemoveColorEntry = (id) => {
    setForm((f) => ({ ...f, colorEntries: f.colorEntries.filter((e) => e.id !== id) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const reportData = {
      type: 'covers',
      employeeName: form.employeeName,
      date: form.date,
      colorEntries: form.colorEntries.map((e) => ({
        color: e.color,
        lines: Number(e.lines),
        pollinations: Number(e.pollinations),
      })),
      submittedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('coversSubmissions') || '[]')
    localStorage.setItem('coversSubmissions', JSON.stringify([...existing, reportData]))

    const syncUrl = localStorage.getItem('syncUrl')
    if (syncUrl) {
      const params = new URLSearchParams({ data: JSON.stringify(reportData) })
      fetch(`${syncUrl}?${params}`, { mode: 'no-cors' }).catch(() => {})
    }

    setSubmitted(true)
  }

  const handleNewReport = () => {
    setForm(buildInitialState())
    setErrors({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="app-shell">
        <header className="top-bar" style={{ backgroundColor: '#2563eb' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-bold text-lg tracking-wide">{t('coversReport')}</span>
          <LockButton />
        </header>

        <main className="page-content flex flex-col items-center justify-center text-center gap-6 py-12">
          <div className="text-8xl animate-bounce">👍</div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('reportComplete')}</h2>
            <p className="text-slate-500 text-base">{t('submittedSuccessfully')}</p>
          </div>

          <div className="card w-full text-left">
            <p className="section-title">{t('summary')}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">{t('employee')}</span>
                <span className="font-semibold text-slate-800">{form.employeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('date')}</span>
                <span className="font-semibold text-slate-800">{form.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('colorEntries')}</span>
                <span className="font-semibold text-slate-800">{form.colorEntries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t('totalCovers')}</span>
                <span className="font-semibold text-blue-700">
                  {form.colorEntries.reduce((sum, e) => sum + Number(e.pollinations || 0), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleNewReport} className="btn-covers">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t('startNewReport')}
          </button>
        </main>

        <BottomNav />
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      <header className="top-bar" style={{ backgroundColor: '#2563eb' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <div className="flex-1">
          <p className="font-bold text-base leading-tight">{t('coversReport')}</p>
          <p className="text-blue-200 text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 text-white active:scale-90 transition-transform"
          title="Add to Home Screen"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </header>

      <main className="page-content">
        <form onSubmit={handleSubmit} noValidate onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}>

          <div className="card">
            <p className="section-title">{t('employeeInfo')}</p>
            <div className="mb-4">
              <label className="field-label" htmlFor="covers-employee-name">
                {t('employeeName')} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="covers-employee-name"
                  value={addingName ? '__new__' : form.employeeName}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setAddingName(true)
                      setNewNameInput('')
                      setForm((f) => ({ ...f, employeeName: '' }))
                    } else {
                      setAddingName(false)
                      setForm((f) => ({ ...f, employeeName: e.target.value }))
                      localStorage.setItem('lastEmployeeName', e.target.value)
                      setErrors((prev) => ({ ...prev, employeeName: null }))
                    }
                  }}
                  className={`field-input pr-10 ${errors.employeeName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                >
                  <option value="">{t('selectEmployee')}</option>
                  {employees.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                  <option value="__new__">{t('addNewName')}</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.employeeName && <p className="error-text">{errors.employeeName}</p>}

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
                        if (!employees.includes(capitalized)) setEmployees((prev) => [...prev, capitalized])
                        setForm((f) => ({ ...f, employeeName: capitalized }))
                        setErrors((prev) => ({ ...prev, employeeName: null }))
                        setAddingName(false)
                        setNewNameInput('')
                      }
                      if (e.key === 'Escape') { setAddingName(false); setNewNameInput('') }
                    }}
                    placeholder={t('typeNewName')}
                    className="field-input flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = newNameInput.trim()
                      if (!trimmed) return
                      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
                      if (!employees.includes(capitalized)) setEmployees((prev) => [...prev, capitalized])
                      setForm((f) => ({ ...f, employeeName: capitalized }))
                      setErrors((prev) => ({ ...prev, employeeName: null }))
                      setAddingName(false)
                      setNewNameInput('')
                    }}
                    className="btn-covers px-4 py-3 w-auto rounded-xl text-sm"
                    style={{ minHeight: 52 }}
                  >
                    {t('add')}
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

            <div>
              <label className="field-label" htmlFor="covers-date">{t('date')}</label>
              <input id="covers-date" type="date" value={form.date} disabled className="field-input" />
              <p className="text-xs text-slate-400 mt-1">{t('autoFilledToday')}</p>
            </div>
          </div>

          <div className="card">
            <p className="section-title">{t('coversData')}</p>
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
                  pollinationsLabel={t('covers')}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn-covers">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('submitCoversReport')}
          </button>

          {Object.keys(errors).length > 0 && (
            <p className="text-center text-red-500 text-sm mt-3 font-medium">
              {t('pleaseFillRequired')}
            </p>
          )}

        </form>
      </main>

      <BottomNav />

      {showInstallGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={() => setShowInstallGuide(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <p className="font-bold text-lg mb-3 text-slate-800">{t('addToHomeScreen')}</p>
            <p className="text-slate-600 text-sm mb-2">{t('installStep1')}</p>
            <p className="text-slate-600 text-sm mb-4">{t('installStep2')}</p>
            <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold" onClick={() => setShowInstallGuide(false)}>
              {t('gotIt')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
