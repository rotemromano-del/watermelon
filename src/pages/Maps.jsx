import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import FieldMap from '../components/FieldMap'
import { ABEND_FEMALE_MAP, MALES_700_MAP } from '../data/fieldMaps'

// Compute planted area in dunam from a field map
function plantedDunam(map) {
  const w = (map.bedWidthCm ?? 192) / 100
  let m2 = 0
  for (const group of map.bedGroups) {
    for (const bed of group.beds) {
      if (bed.color)       m2 += bed.lengthM * w
      if (bed.futureColor) m2 += bed.futureLengthM * w
    }
  }
  return m2 / 1000
}

const VARIETIES = [
  { code: '089',  femaleParent: '2024', maleParent: '2037', femaleMaps: [ABEND_FEMALE_MAP], maleMaps: [MALES_700_MAP] },
  { code: '208',  femaleParent: '2048', maleParent: '2045', femaleMaps: [], maleMaps: [] },
  { code: '318',  femaleParent: '2106', maleParent: '2177', femaleMaps: [], maleMaps: [] },
  { code: '323A', femaleParent: '2088', maleParent: '2247', femaleMaps: [], maleMaps: [] },
  { code: '337',  femaleParent: '2210', maleParent: '2309', femaleMaps: [], maleMaps: [] },
]

const TABS = [
  { id: 'abend',    label: 'Abend - Females' },
  { id: '50',       label: '50 Females'      },
  { id: '700males', label: '700 Males'      },
  { id: '600males', label: '600 Males'      },
  { id: 'data',     label: 'Data'           },
]

export default function Maps() {
  const [activeTab, setActiveTab] = useState('abend')

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
        </svg>
        <span className="font-bold text-lg">Maps</span>
      </header>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        {TABS.map((tab) => (
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
        {activeTab === 'abend' ? (
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <p className="section-title">Abend Females</p>
              {/* North arrow pointing left (west→east view) */}
              <svg width="62" height="36" viewBox="0 0 62 36">
                {/* Top half (black): tip → top-wing → base */}
                <polygon points="12,18 44,4 44,18" fill="#1e293b" />
                {/* Bottom half (white): tip → bottom-wing → base */}
                <polygon points="12,18 44,32 44,18" fill="white" stroke="#1e293b" strokeWidth="1" />
                <text x="5" y="22" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#1e293b">N</text>
              </svg>
            </div>
            <FieldMap map={ABEND_FEMALE_MAP} />
          </div>
        ) : activeTab === '700males' ? (
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <p className="section-title">700 Males</p>
              {/* North arrow pointing right */}
              <svg width="62" height="36" viewBox="0 0 62 36">
                {/* Top half (black): tip → top-wing → base */}
                <polygon points="50,18 18,4 18,18" fill="#1e293b" />
                {/* Bottom half (white): tip → bottom-wing → base */}
                <polygon points="50,18 18,32 18,18" fill="white" stroke="#1e293b" strokeWidth="1" />
                <text x="57" y="22" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#1e293b">N</text>
              </svg>
            </div>
            <FieldMap map={MALES_700_MAP} />
          </div>
        ) : activeTab === '600males' ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <div className="text-6xl">🗺️</div>
            <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
            <p className="text-slate-400 text-sm max-w-xs">The 600 Males field map will appear here in a future update.</p>
          </div>
        ) : activeTab === 'data' ? (
          <div className="card">
            <p className="section-title mb-4">Area by Variety</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                    <th className="text-left py-2 pr-4">Variety</th>
                    <th className="text-left py-2 pr-4">Female</th>
                    <th className="text-left py-2 pr-4">Male</th>
                    <th className="text-right py-2 pr-4">Female Used (dunam)</th>
                    <th className="text-right py-2 pr-4">Female Planned (dunam)</th>
                    <th className="text-right py-2 pr-4">Male Used (dunam)</th>
                    <th className="text-right py-2">Male Planned (dunam)</th>
                  </tr>
                </thead>
                <tbody>
                  {VARIETIES.map((v) => {
                    const femaleArea = v.femaleMaps.reduce((s, m) => s + plantedDunam(m), 0)
                    const maleArea   = v.maleMaps.reduce((s, m) => s + plantedDunam(m), 0)
                    const fmt = (n) => n > 0 ? n.toFixed(2) : '—'
                    return (
                      <tr key={v.code} className="border-b border-slate-100">
                        <td className="py-3 pr-4 font-bold text-slate-700">{v.code}</td>
                        <td className="py-3 pr-4 text-slate-500">{v.femaleParent}</td>
                        <td className="py-3 pr-4 text-slate-500">{v.maleParent}</td>
                        <td className="py-3 pr-4 text-right text-slate-700">{fmt(femaleArea)}</td>
                        <td className="py-3 pr-4 text-right text-slate-300">—</td>
                        <td className="py-3 pr-4 text-right text-slate-700">{fmt(maleArea)}</td>
                        <td className="py-3 text-right text-slate-300">—</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <div className="text-6xl">🗺️</div>
            <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
            <p className="text-slate-400 text-sm max-w-xs">The 50 Female field map will appear here in a future update.</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
