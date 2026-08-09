import { useAchievements } from '../../hooks/useAchievements'
import { AchievementBadge } from './AchievementBadge'

export function ConquistasTab() {
  const { data: achievements, loading, error } = useAchievements()

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>

  const conquistados = achievements.filter(a => a.status === 'Conquistado').length

  return (
    <div className="panel">
      <div className="section-title">🏆 Achievements ({conquistados}/{achievements.length})</div>
      <div className="badges-grid">
        {achievements.map(a => <AchievementBadge key={a.id} achievement={a} />)}
      </div>
    </div>
  )
}
