import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import FieldMap from '../components/FieldMap'
import { ABEND_FEMALE_MAP, MALES_700_MAP, FIFTY_WEST_FEMALE_MAP } from '../data/fieldMaps'
import LockButton from '../components/LockButton'
import { useAdmin } from '../AdminContext'

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
  { code: '089',  femaleParent: '2024', maleParent: '2037', femalePlanned: 11.11, femaleMaps: [ABEND_FEMALE_MAP], maleMaps: [MALES_700_MAP] },
  { code: '208',  femaleParent: '2048', maleParent: '2045', femalePlanned: 6.25,  femaleMaps: [], maleMaps: [] },
  { code: '318',  femaleParent: '2106', maleParent: '2177', femalePlanned: 7.06,  femaleMaps: [], maleMaps: [] },
  { code: '323A', femaleParent: '2088', maleParent: '2247', femalePlanned: 6.67,  femaleMaps: [], maleMaps: [] },
  { code: '337',  femaleParent: '2210', maleParent: '2309', femalePlanned: 1.2,   femaleMaps: [], maleMaps: [] },
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
  const { isAdmin } = useAdmin()
  const visibleTabs = TABS.filter(t => t.id !== 'data' || isAdmin)

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
        </svg>
        <span className="font-bold text-lg">Maps</span>
        <LockButton />
      </header>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        {visibleTabs.map((tab) => (
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
        ) : activeTab === '50' ? (
          <div className="flex flex-col gap-4">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <p className="section-title">50 West</p>
                {/* North arrow pointing up (south at bottom) */}
                <svg width="36" height="56" viewBox="0 0 36 56">
                  <polygon points="18,4 4,38 18,38" fill="#1e293b" />
                  <polygon points="18,4 32,38 18,38" fill="white" stroke="#1e293b" strokeWidth="1" />
                  <text x="18" y="52" textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700" fill="#1e293b">N</text>
                </svg>
              </div>
              <FieldMap map={FIFTY_WEST_FEMALE_MAP} />
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="text-6xl">🗺️</div>
              <h2 className="text-xl font-bold text-slate-700">50 East — Coming Soon</h2>
              <p className="text-slate-400 text-sm max-w-xs">The 50 East field map will appear here in a future update.</p>
            </div>
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
                        <td className="py-3 pr-4 text-right text-slate-500">{v.femalePlanned.toFixed(2)}</td>
                        <td className="py-3 pr-4 text-right text-slate-700">{fmt(maleArea)}</td>
                        <td className="py-3 text-right text-slate-500">{(v.femalePlanned / 3).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
