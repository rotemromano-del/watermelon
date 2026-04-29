import { Routes, Route, Navigate } from 'react-router-dom'
import PollinationsReport from './pages/PollinationsReport'
import History from './pages/History'
import Maps from './pages/Maps'
import Settings from './pages/Settings'
import SprayingFertilizing from './pages/SprayingFertilizing'
import CoversReport from './pages/CoversReport'
import { AdminProvider } from './AdminContext'
import { LangProvider } from './LangContext'

export default function App() {
  return (
    <LangProvider>
    <AdminProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/report" replace />} />
      <Route path="/report" element={<PollinationsReport />} />
      <Route path="/history" element={<History />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/spraying" element={<SprayingFertilizing />} />
      <Route path="/covers" element={<CoversReport />} />
    </Routes>
    </AdminProvider>
    </LangProvider>
  )
}