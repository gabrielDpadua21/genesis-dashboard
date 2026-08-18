export function CicloGeral({ statusList }) {
  const total = statusList.length
  const concluidas = statusList.filter(s => s.status === 'Concluído').length
  const pct = total > 0 ? Math.round((concluidas / total) * 1000) / 10 : 0

  return (
    <div className="panel">
      <div className="section-title">📈 Progresso Geral do Ciclo</div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="ciclo-geral-summary">
        {concluidas}/{total} tarefas concluídas ({pct}%)
      </div>
    </div>
  )
}
