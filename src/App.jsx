import { Routes, Route, Navigate } from 'react-router-dom'
import PollinationsReport from './pages/PollinationsReport'
import History from './pages/History'
import Maps from './pages/Maps'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/report" replace />} />
      <Route path="/report" element={<PollinationsReport />} />
      <Route path="/history" element={<History />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
