import { useState } from 'react'
import BottomNav from '../components/BottomNav'

const VARIETY_TABS = [
  { id: '089',  label: '089'  },
  { id: '208',  label: '208'  },
  { id: '318',  label: '318'  },
  { id: '323A', label: '323A' },
  { id: '337',  label: '337'  },
]

export default function History() {
  const [activeTab, setActiveTab] = useState('089')

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold text-lg">History</span>
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

      <main className="page-content flex flex-col items-center justify-center text-center gap-4 py-16">
        <div className="text-6xl">📋</div>
        <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          History for variety {activeTab} will appear here in a future update.
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
