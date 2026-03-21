import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import FieldMap from '../components/FieldMap'
import { ABEND_FEMALE_MAP } from '../data/fieldMaps'

const TABS = [
  { id: 'abend', label: 'Abend' },
  { id: '50',    label: '50'    },
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
            <p className="section-title mb-4">Abend Female</p>
            <FieldMap map={ABEND_FEMALE_MAP} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
            <div className="text-6xl">🗺️</div>
            <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              The 50 field map will appear here in a future update.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
