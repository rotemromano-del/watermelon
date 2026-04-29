import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import LockButton from '../components/LockButton'
import { useLang } from '../LangContext'

export default function Settings() {
  const { lang, setLanguage, t } = useLang()
  const [syncUrl, setSyncUrl] = useState(() => localStorage.getItem('syncUrl') || '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    const trimmed = syncUrl.trim()
    localStorage.setItem('syncUrl', trimmed)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleClear() {
    setSyncUrl('')
    localStorage.removeItem('syncUrl')
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-bold text-lg">{t('settings')}</span>
        <LockButton />
      </header>

      <main className="page-content">
        <div className="card">
          <p className="section-title">{t('languageLabel')}</p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                lang === 'en'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {t('english')}
            </button>
            <button
              type="button"
              onClick={() => setLanguage('th')}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${
                lang === 'th'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {t('thai')}
            </button>
          </div>
        </div>
      </main>

        <div className="card mt-0">
          <p className="section-title">{t('syncSection')}</p>
          <label className="field-label mt-2">{t('syncUrlLabel')}</label>
          <textarea
            value={syncUrl}
            onChange={(e) => { setSyncUrl(e.target.value); setSaved(false) }}
            placeholder={t('syncUrlPlaceholder')}
            rows={3}
            className="field-input text-xs resize-none py-2 mt-1 font-mono"
          />
          <p className="text-xs text-slate-400 mt-1">{t('syncUrlHint')}</p>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary flex-1 py-2 text-sm"
            >
              {saved ? t('syncUrlSaved') : t('save')}
            </button>
            {syncUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold"
              >
                {t('syncUrlClear')}
              </button>
            )}
          </div>
        </div>

      <BottomNav />
    </div>
  )
}
