import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import { useLang } from '../LangContext'

export default function Covers() {
  const { t } = useLang()

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
        </svg>
        <span className="font-bold text-lg">{t('covers')}</span>
        <LockButton />
      </header>

      <main className="page-content flex flex-col items-center justify-center text-center gap-4 py-16">
        <div className="text-6xl">🏠</div>
        <h2 className="text-xl font-bold text-slate-700">{t('comingSoon')}</h2>
      </main>

      <BottomNav />
    </div>
  )
}
