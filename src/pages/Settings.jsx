import BottomNav from '../components/BottomNav'

export default function Settings() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-bold text-lg">Settings</span>
      </header>

      <main className="page-content flex flex-col items-center justify-center text-center gap-4 py-16">
        <div className="text-6xl">⚙️</div>
        <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          App settings and preferences will be available here in a future update.
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
