import { useAdmin } from '../AdminContext'

export default function LockButton() {
  const { isAdmin, openPrompt } = useAdmin()
  return (
    <button onClick={openPrompt} className="ml-auto text-white/70 hover:text-white p-1">
      {isAdmin ? (
        // Unlocked icon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      ) : (
        // Locked icon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
    </button>
  )
}
