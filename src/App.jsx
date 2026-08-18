import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Sidebar } from './components/layout/Sidebar'
import { GeralTab } from './components/geral/GeralTab'
import { CicloTab } from './components/ciclo42/CicloTab'
import { MateriasGeralTab } from './components/materias/MateriasGeralTab'
import { MateriasTrilhaTab } from './components/materias/MateriasTrilhaTab'
import { ConquistasTab } from './components/conquistas/ConquistasTab'
import { LootsTab } from './components/loots/LootsTab'
import { SemanalTab } from './components/semanal/SemanalTab'
import { MonthlyTab } from './components/mensal/MonthlyTab'
import { GuiaSessaoPage } from './components/guia/GuiaSessaoPage'

const TABS = [
  { id: 'geral', label: '📊 Geral', Component: GeralTab },
  { id: 'ciclo42', label: '🔄 Ciclo 4.2', Component: CicloTab },
  { id: 'materias-geral', label: '📚 Matérias Geral', Component: MateriasGeralTab },
  { id: 'materias-trilha', label: '🗂️ Por Trilha', Component: MateriasTrilhaTab },
  { id: 'conquistas', label: '🏆 Conquistas', Component: ConquistasTab },
  { id: 'loots', label: '🎲 Loots', Component: LootsTab },
  { id: 'semanal', label: '📅 Semanal', Component: SemanalTab },
  { id: 'mensal', label: '📈 Mensal', Component: MonthlyTab },
]

export default function App() {
  const [active, setActive] = useState('geral')
  const [collapsed, setCollapsed] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSelectTab = (id) => {
    setActive(id)
    setMobileOpen(false)
    if (location.pathname !== '/') navigate('/')
  }

  const ActiveComponent = TABS.find(t => t.id === active).Component

  return (
    <div className="app-shell">
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <Sidebar
        tabs={TABS}
        active={location.pathname === '/' ? active : null}
        onSelect={handleSelectTab}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="app-main">
        <div className="mobile-topbar">
          <button
            className="mobile-topbar-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <span className="mobile-topbar-title">Operação Genesis</span>
        </div>

        <Routes>
          <Route path="/" element={<div className="tab-content"><ActiveComponent /></div>} />
          <Route path="/guia" element={<GuiaSessaoPage />} />
        </Routes>

        <div className="footer-note">
          Operação Genesis — dado ao vivo do Supabase.
        </div>
      </main>
    </div>
  )
}
