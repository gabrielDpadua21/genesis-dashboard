import { useState } from 'react'
import { TabBar } from './components/layout/TabBar'
import { GeralTab } from './components/geral/GeralTab'
import { CicloTab } from './components/ciclo42/CicloTab'
import { MateriasGeralTab } from './components/materias/MateriasGeralTab'
import { MateriasTrilhaTab } from './components/materias/MateriasTrilhaTab'
import { ConquistasTab } from './components/conquistas/ConquistasTab'
import { LootsTab } from './components/loots/LootsTab'
import { SemanalTab } from './components/semanal/SemanalTab'
import { MonthlyTab } from './components/mensal/MonthlyTab'

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
  const ActiveComponent = TABS.find(t => t.id === active).Component

  return (
    <div className="wrap">
      <TabBar tabs={TABS} active={active} onChange={setActive} />
      <ActiveComponent />
      <div className="footer-note">
        Operação Genesis — dado ao vivo do Supabase.
      </div>
    </div>
  )
}
