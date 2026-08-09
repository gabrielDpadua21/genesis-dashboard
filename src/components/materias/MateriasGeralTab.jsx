import { useMateriaStats } from '../../hooks/useMateriaStats'
import { MateriaCard } from './MateriaCard'

export function MateriasGeralTab() {
  const { data: materias, loading, error } = useMateriaStats()

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>

  return (
    <div className="panel">
      <div className="section-title">📚 Todas as Matérias — Todas as Trilhas</div>
      {materias.map(m => <MateriaCard key={m.materia} materia={m} />)}
    </div>
  )
}
