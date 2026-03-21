import { createContext, useContext, useState } from 'react'

const AdminContext = createContext()

const ADMIN_PASSWORD = '2026'

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('adminMode') === 'true')
  const [showPrompt, setShowPrompt] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function openPrompt() {
    if (isAdmin) {
      setIsAdmin(false)
      localStorage.removeItem('adminMode')
    } else {
      setInput('')
      setError(false)
      setShowPrompt(true)
    }
  }

  function submitPassword() {
    if (input === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('adminMode', 'true')
      setShowPrompt(false)
    } else {
      setError(true)
    }
  }

  return (
    <AdminContext.Provider value={{ isAdmin, openPrompt }}>
      {children}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-72">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Administrator Mode</h2>
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && submitPassword()}
              placeholder="Enter password"
              autoFocus
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-primary-500"
            />
            {error && <p className="text-red-500 text-xs mb-2">Incorrect password</p>}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setShowPrompt(false)}
                className="flex-1 py-2 rounded-lg text-sm text-slate-500 border border-slate-200">
                Cancel
              </button>
              <button onClick={submitPassword}
                className="flex-1 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white">
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
