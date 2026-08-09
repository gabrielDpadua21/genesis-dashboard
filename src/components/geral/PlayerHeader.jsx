import { fmtHoras, fmtAcuracia } from '../../utils/format'

export function PlayerHeader({ player, rankAtual }) {
  return (
    <div className="panel">
      <div className="header-row">
        <div>
          <div className="eyebrow">Operação Genesis · Season I</div>
          <div className="name">Gabriel</div>
          <div className="class-line">Software Engineer → Future Public Servant</div>
        </div>
        <div className="rank-chip">RANK {rankAtual?.rank_atual ?? '—'}</div>
      </div>
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-label">Horas líquidas</div>
          <div className="stat-value amber">{fmtHoras(player.horas_liquidas)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Questões</div>
          <div className="stat-value cyan">{player.questoes}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Acurácia</div>
          <div className="stat-value violet">{fmtAcuracia(player.acuracia_pct)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">XP Total</div>
          <div className="stat-value fire">{player.xp_total}</div>
        </div>
      </div>
    </div>
  )
}
