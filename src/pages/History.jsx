import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import { useAdmin } from '../AdminContext'
import { useLang } from '../LangContext'

const VARIETY_TABS = [
  { id: '089',     label: '089'         },
  { id: '208',     label: '208'         },
  { id: '318',     label: '318'         },
  { id: '323A',    label: '323A'        },
  { id: '337',     label: '337'         },
  { id: '2088S',   label: '2088S'       },
  { id: 'covers',  labelKey: 'covers'   },
  { id: 'rawdata', labelKey: 'rawData'  },
]

const COLOR_STYLE = {
  Yellow: { bg: '#FEF08A', text: '#713F12' },
  Purple: { bg: '#A855F8', text: '#ffffff' },
  Blue:   { bg: '#3B82F6', text: '#ffffff' },
  Brown:  { bg: '#92400E', text: '#ffffff' },
  Peach:  { bg: '#FBCBA7', text: '#7C2D12' },
  Green:  { bg: '#4ADE80', text: '#14532D' },
}

function saveSubmissions(data) {
  localStorage.setItem('submissions', JSON.stringify(data))
}

export default function History() {
  const [activeTab, setActiveTab] = useState('089')
  const { isAdmin } = useAdmin()
  const { t } = useLang()
  const [submissions, setSubmissions] = useState(() =>
    JSON.parse(localStorage.getItem('submissions') || '[]')
  )
  const [editingKey, setEditingKey] = useState(null) // 'sIdx-eIdx'
  const [editValues, setEditValues] = useState({})
  const [coversSubmissions, setCoversSubmissions] = useState(() =>
    JSON.parse(localStorage.getItem('coversSubmissions') || '[]')
  )
  const [expandedDates, setExpandedDates] = useState(new Set())

  useEffect(() => {
    const syncUrl = localStorage.getItem('syncUrl')
    if (!syncUrl) return
    fetch(syncUrl)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setSubmissions(data) })
      .catch(() => {})
    fetch(`${syncUrl}?sheet=Covers`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCoversSubmissions(data) })
      .catch(() => {})
  }, [])

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold text-lg">{t('history')}</span>
        <LockButton />
      </header>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        {VARIETY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors duration-150 ${
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            {tab.labelKey ? t(tab.labelKey) : tab.label}
          </button>
        ))}
      </div>

      <main className="page-content">
        {activeTab === 'covers' ? (() => {
          if (coversSubmissions.length === 0) return (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="text-6xl">📋</div>
              <p className="text-slate-400 text-sm">{t('noCoversYet')}</p>
            </div>
          )

          const grouped = {}
          coversSubmissions.forEach((s) => {
            if (!grouped[s.date]) grouped[s.date] = []
            grouped[s.date].push(s)
          })
          const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

          return (
            <div className="card">
              {sortedDates.map((date, di) => {
                const daySubs = grouped[date]
                const total = daySubs.reduce((sum, s) =>
                  sum + s.colorEntries.reduce((s2, e) => s2 + Number(e.pollinations || 0), 0), 0)
                const isExpanded = expandedDates.has(date)

                return (
                  <div key={date} className={di < sortedDates.length - 1 ? 'border-b border-slate-100' : ''}>
                    <button
                      onClick={() => setExpandedDates((prev) => {
                        const next = new Set(prev)
                        next.has(date) ? next.delete(date) : next.add(date)
                        return next
                      })}
                      className="w-full flex items-center justify-between py-3"
                    >
                      <span className="font-semibold text-slate-700">{date}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600 text-lg">{total.toLocaleString()}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                          className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="pb-3 space-y-3">
                        {daySubs.map((s, i) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                              <span className="font-semibold text-slate-700">{s.employeeName}</span>
                              <span>{new Date(s.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {s.colorEntries.map((e, j) => {
                              const style = COLOR_STYLE[e.color]
                              return (
                                <div key={j} className="flex items-center justify-between py-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-medium"
                                      style={style ? { backgroundColor: style.bg, color: style.text } : {}}>
                                      {e.color}
                                    </span>
                                    <span className="text-slate-500 text-sm">{t('line')} {e.lines}</span>
                                  </div>
                                  <span className="font-bold text-blue-700">{e.pollinations}</span>
                                </div>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })() : activeTab === 'rawdata' ? (() => {
          if (submissions.length === 0) return (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="text-6xl">📋</div>
              <p className="text-slate-400 text-sm">{t('noSubmissions')}</p>
            </div>
          )

          function deleteEntry(sIdx, eIdx) {
            const updated = submissions.map((s, si) => si !== sIdx ? s : {
              ...s,
              colorEntries: s.colorEntries.filter((_, ei) => ei !== eIdx),
            }).filter(s => s.colorEntries.length > 0)
            setSubmissions(updated)
            saveSubmissions(updated)
          }

          function startEdit(sIdx, eIdx, entry, employeeName) {
            setEditingKey(`${sIdx}-${eIdx}`)
            setEditValues({ variety: entry.color, line: entry.lines, pollinations: entry.pollinations, employee: employeeName })
          }

          function saveEdit(sIdx, eIdx) {
            const updated = submissions.map((s, si) => si !== sIdx ? s : {
              ...s,
              employeeName: editValues.employee,
              colorEntries: s.colorEntries.map((e, ei) => ei !== eIdx ? e : {
                ...e, color: editValues.variety, lines: editValues.line, pollinations: editValues.pollinations,
              }),
            })
            setSubmissions(updated)
            saveSubmissions(updated)
            setEditingKey(null)
          }

          const rows = submissions.flatMap((s, sIdx) =>
            s.colorEntries.map((e, eIdx) => ({ s, sIdx, e, eIdx }))
          )

          return (
            <div className="card" style={{ overflowX: 'auto' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="section-title">{t('rawSubmissions')}</p>
                {isAdmin && (
                  <button
                    onClick={() => {
                      const rows = submissions.flatMap(s =>
                        s.colorEntries.map(e => ({
                          Date: s.date,
                          Employee: s.employeeName,
                          Variety: e.color,
                          Line: e.lines,
                          Pollinations: e.pollinations,
                          'Submitted At': new Date(s.submittedAt).toLocaleString(),
                        }))
                      )
                      const ws = XLSX.utils.json_to_sheet(rows)
                      const wb = XLSX.utils.book_new()
                      XLSX.utils.book_append_sheet(wb, ws, 'Submissions')
                      XLSX.writeFile(wb, 'pollinations_data.xlsx')
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    {t('exportExcel')}
                  </button>
                )}
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                    <th className="text-left py-2 pr-3">{t('date')}</th>
                    <th className="text-left py-2 pr-3">{t('time')}</th>
                    <th className="text-left py-2 pr-3">{t('employee')}</th>
                    <th className="text-left py-2 pr-3">{t('variety')}</th>
                    <th className="text-right py-2 pr-3">{t('line')}</th>
                    <th className="text-right py-2 pr-3">{t('pollinations')}</th>
                    <th className="py-2"></th>
                    {isAdmin && <th className="py-2"></th>}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ s, sIdx, e, eIdx }) => {
                    const key = `${sIdx}-${eIdx}`
                    const isEditing = editingKey === key
                    return (
                      <tr key={key} className="border-b border-slate-100">
                        <td className="py-2 pr-3 text-slate-700">{s.date}</td>
                        <td className="py-2 pr-3 text-slate-500 text-xs">{new Date(s.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="py-2 pr-3 text-slate-700">{s.employeeName}</td>
                        {isEditing ? (
                          <>
                            <td className="py-1 pr-3 text-slate-500 text-xs">{new Date(s.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td className="py-1 pr-3"><input className="field-input py-1 px-2 text-sm w-24" value={editValues.employee} onChange={ev => setEditValues(v => ({ ...v, employee: ev.target.value }))} /></td>
                            <td className="py-1 pr-3"><input className="field-input py-1 px-2 text-sm w-24" value={editValues.variety} onChange={ev => setEditValues(v => ({ ...v, variety: ev.target.value }))} /></td>
                            <td className="py-1 pr-3 text-right"><input className="field-input py-1 px-2 text-sm w-16 text-right" value={editValues.line} onChange={ev => setEditValues(v => ({ ...v, line: ev.target.value }))} /></td>
                            <td className="py-1 pr-3 text-right"><input className="field-input py-1 px-2 text-sm w-20 text-right" value={editValues.pollinations} onChange={ev => setEditValues(v => ({ ...v, pollinations: ev.target.value }))} /></td>
                            <td className="py-1 pr-2"></td>
                            <td className="py-1 flex gap-1">
                              <button onClick={() => saveEdit(sIdx, eIdx)} className="px-2 py-1 rounded bg-primary-600 text-white text-xs">{t('save')}</button>
                              <button onClick={() => setEditingKey(null)} className="px-2 py-1 rounded bg-slate-200 text-slate-600 text-xs">{t('cancel')}</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2 pr-3 text-slate-700">{e.color}</td>
                            <td className="py-2 pr-3 text-right text-slate-700">{e.lines}</td>
                            <td className="py-2 pr-3 text-right font-semibold text-primary-700">{e.pollinations}</td>
                            <td className="py-2 pr-2"></td>
                            {isAdmin && (
                              <td className="py-2 flex gap-2">
                                <button onClick={() => startEdit(sIdx, eIdx, e, s.employeeName)} className="text-blue-500 hover:text-blue-700" title="Edit">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
                                  </svg>
                                </button>
                                <button onClick={() => deleteEntry(sIdx, eIdx)} className="text-red-500 hover:text-red-700" title="Delete">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7H5m4 0V5a1 1 0 011-1h4a1 1 0 011 1v2m-9 4l1 8h8l1-8" />
                                  </svg>
                                </button>
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })() : (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <div className="text-6xl">📋</div>
            <h2 className="text-xl font-bold text-slate-700">{t('comingSoon')}</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              {t('historyForVariety')} {activeTab} {t('historyComingSoonDesc')}
            </p>
          </div>
        )
        }
      </main>

      <BottomNav />

    </div>
  )
}
