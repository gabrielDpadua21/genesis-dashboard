import { useWeeklyStats } from '../../hooks/useWeeklyStats'
import { WeekCard } from './WeekCard'

export function SemanalTab() {
  const { data: semanas, loading, error } = useWeeklyStats()

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>

  return (
    <div className="panel">
      <div className="section-title">📅 Estatísticas Semanais</div>
      {semanas.map(s => <WeekCard key={s.semana_inicio} semana={s} />)}
    </div>
  )
}
