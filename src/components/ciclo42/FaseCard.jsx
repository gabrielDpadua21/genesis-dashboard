import { fmtHoras } from '../../utils/format'

export function FaseCard({ fase }) {
  const metaDiaUtil = fmtHoras(fase.meta_dia_util_min / 60)
  const metaFds = fmtHoras(fase.meta_fds_min / 60)
  const inicio = new Date(`${fase.data_inicio}T00:00:00`).toLocaleDateString('pt-BR')

  return (
    <div className="panel">
      <div className="section-title">🔥 Fase Atual</div>
      <div className="eyebrow">Fase {fase.fase}</div>
      <div className="name" style={{ fontSize: 18 }}>{fase.nome}</div>
      <div className="class-line">desde {inicio}</div>
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-label">Meta dia útil</div>
          <div className="stat-value cyan">{metaDiaUtil}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Meta fim de semana</div>
          <div className="stat-value amber">{metaFds}</div>
        </div>
      </div>
    </div>
  )
}
