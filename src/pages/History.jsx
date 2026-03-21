import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import { useAdmin } from '../AdminContext'

const VARIETY_TABS = [
  { id: '089',     label: '089'      },
  { id: '208',     label: '208'      },
  { id: '318',     label: '318'      },
  { id: '323A',    label: '323A'     },
  { id: '337',     label: '337'      },
  { id: 'rawdata', label: 'Raw Data' },
]

function saveSubmissions(data) {
  localStorage.setItem('submissions', JSON.stringify(data))
}

export default function History() {
  const [activeTab, setActiveTab] = useState('089')
  const { isAdmin } = useAdmin()
  const [submissions, setSubmissions] = useState(() =>
    JSON.parse(localStorage.getItem('submissions') || '[]')
  )
  const [editingKey, setEditingKey] = useState(null) // 'sIdx-eIdx'
  const [editValues, setEditValues] = useState({})
  const [viewingPhotos, setViewingPhotos] = useState(null) // array of photos

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold text-lg">History</span>
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
            {tab.label}
          </button>
        ))}
      </div>

      <main className="page-content">
        {activeTab === 'rawdata' ? (() => {
          if (submissions.length === 0) return (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="text-6xl">📋</div>
              <p className="text-slate-400 text-sm">No submissions yet.</p>
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
              <p className="section-title mb-4">Raw Submissions</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                    <th className="text-left py-2 pr-3">Date</th>
                    <th className="text-left py-2 pr-3">Employee</th>
                    <th className="text-left py-2 pr-3">Variety</th>
                    <th className="text-right py-2 pr-3">Line</th>
                    <th className="text-right py-2 pr-3">Pollinations</th>
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
                        <td className="py-2 pr-3 text-slate-700">{s.employeeName}</td>
                        {isEditing ? (
                          <>
                            <td className="py-1 pr-3"><input className="field-input py-1 px-2 text-sm w-24" value={editValues.employee} onChange={ev => setEditValues(v => ({ ...v, employee: ev.target.value }))} /></td>
                            <td className="py-1 pr-3"><input className="field-input py-1 px-2 text-sm w-24" value={editValues.variety} onChange={ev => setEditValues(v => ({ ...v, variety: ev.target.value }))} /></td>
                            <td className="py-1 pr-3 text-right"><input className="field-input py-1 px-2 text-sm w-16 text-right" value={editValues.line} onChange={ev => setEditValues(v => ({ ...v, line: ev.target.value }))} /></td>
                            <td className="py-1 pr-3 text-right"><input className="field-input py-1 px-2 text-sm w-20 text-right" value={editValues.pollinations} onChange={ev => setEditValues(v => ({ ...v, pollinations: ev.target.value }))} /></td>
                            <td className="py-1 pr-2"></td>
                            <td className="py-1 flex gap-1">
                              <button onClick={() => saveEdit(sIdx, eIdx)} className="px-2 py-1 rounded bg-primary-600 text-white text-xs">Save</button>
                              <button onClick={() => setEditingKey(null)} className="px-2 py-1 rounded bg-slate-200 text-slate-600 text-xs">Cancel</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2 pr-3 text-slate-700">{e.color}</td>
                            <td className="py-2 pr-3 text-right text-slate-700">{e.lines}</td>
                            <td className="py-2 pr-3 text-right font-semibold text-primary-700">{e.pollinations}</td>
                            <td className="py-2 pr-2">
                              {s.photos?.length > 0 && eIdx === 0 && (
                                <button onClick={() => setViewingPhotos(s.photos)} className="text-slate-400 hover:text-primary-600" title="View photos">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </button>
                              )}
                            </td>
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
            <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              History for variety {activeTab} will appear here in a future update.
            </p>
          </div>
        )}
      </main>

      <BottomNav />

      {/* Photo viewer modal */}
      {viewingPhotos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setViewingPhotos(null)}>
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-slate-800">Photos ({viewingPhotos.length})</p>
              <button onClick={() => setViewingPhotos(null)} className="text-slate-400 hover:text-slate-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {viewingPhotos.map((p, i) => (
                <div key={i}>
                  <img src={p.dataUrl} alt={p.fileName} className="w-full rounded-xl object-cover" />
                  {p.description && <p className="text-xs text-slate-500 mt-1">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
