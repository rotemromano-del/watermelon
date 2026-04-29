import { createContext, useContext, useState } from 'react'
import { translations } from './data/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  function t(key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key
  }

  function setLanguage(l) {
    setLang(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
