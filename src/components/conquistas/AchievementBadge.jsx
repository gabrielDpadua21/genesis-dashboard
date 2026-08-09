export function AchievementBadge({ achievement }) {
  const isUnlocked = achievement.status === 'Conquistado'
  const [icon, ...rest] = achievement.titulo.split(' ')
  const nomeSemIcone = rest.join(' ')

  return (
    <div className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="badge-icon">{icon}</div>
      <div className="badge-title">{nomeSemIcone}</div>
      <div className="badge-progress">{achievement.progresso_atual}</div>
      {achievement.data_conquista && (
        <div className="badge-date">✓ {achievement.data_conquista}</div>
      )}
    </div>
  )
}
