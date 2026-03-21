import BottomNav from '../components/BottomNav'

export default function History() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold text-lg">History</span>
      </header>

      <main className="page-content flex flex-col items-center justify-center text-center gap-4 py-16">
        <div className="text-6xl">📋</div>
        <h2 className="text-xl font-bold text-slate-700">Coming Soon</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          Your submitted reports will appear here in a future update.
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
