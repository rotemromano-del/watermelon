import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import { useLang } from '../LangContext'

export default function SprayingFertilizing() {
  const { t } = useLang()

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <span className="font-bold text-lg">{t('sprayingFertilizing')}</span>
        <LockButton />
      </header>

      <main className="page-content flex flex-col items-center justify-center text-center gap-4 py-16">
        <div className="text-6xl">🌿</div>
        <h2 className="text-xl font-bold text-slate-700">{t('comingSoon')}</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          {t('sprayingComingSoonDesc')}
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
