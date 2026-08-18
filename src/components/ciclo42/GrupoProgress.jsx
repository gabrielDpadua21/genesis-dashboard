const GRUPO_LABEL = {
  A: 'Especialidade TI',
  B: 'Base Fiscal/Jurídica',
}

export function GrupoProgress({ grupos }) {
  return (
    <div className="panel">
      <div className="section-title">⚔️ Progresso por Grupo</div>
      {grupos.map(g => (
        <div key={g.grupo} className="grupo-row">
          <div className="grupo-row-header">
            <span className="grupo-row-label">Grupo {g.grupo} · {GRUPO_LABEL[g.grupo] ?? g.grupo}</span>
            <span className={`grupo-row-value ${g.grupo === 'A' ? 'cyan' : 'amber'}`}>
              {g.tarefas_concluidas}/{g.total_tarefas}
            </span>
          </div>
          <div className="bar-track">
            <div
              className={`bar-fill grupo-${g.grupo.toLowerCase()}`}
              style={{ width: `${Number(g.pct_concluido)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
