export function RankLadder({ ranks, player, rankAtualNome }) {
  const idxAtual = ranks.findIndex(r => r.nome === rankAtualNome)

  return (
    <div className="panel">
      <div className="section-title">🪜 Progresso de Rank</div>
      <div className="legend" style={{ marginBottom: 10 }}>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--amber)' }} />Horas</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--cyan)' }} />Questões</div>
      </div>
      <div className="rank-ladder">
        {ranks.map((r, i) => {
          const rowClass = i < idxAtual ? 'achieved' : i === idxAtual ? 'current' : ''
          const pctH = r.horas_necessarias > 0
            ? Math.min(100, (player.horas_liquidas / r.horas_necessarias) * 100) : 100
          const pctQ = r.questoes_necessarias > 0
            ? Math.min(100, (player.questoes / r.questoes_necessarias) * 100) : 100
          const badgeText = i < idxAtual ? '✓' : r.nome

          return (
            <div className={`rank-row ${rowClass}`} key={r.nome}>
              <div className="rank-badge">{badgeText}</div>
              <div className="rank-info">
                <div className="rank-name">Rank {r.nome}{i === idxAtual ? ' (atual)' : ''}</div>
                <div className="rank-req">
                  {r.horas_necessarias}h · {r.questoes_necessarias.toLocaleString('pt-BR')} questões
                </div>
              </div>
              <div className="rank-mini-bars">
                <div className="mini-bar-track"><div className="mini-bar-fill h" style={{ width: `${pctH}%` }} /></div>
                <div className="mini-bar-track"><div className="mini-bar-fill q" style={{ width: `${pctQ}%` }} /></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
