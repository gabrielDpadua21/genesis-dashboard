import { fmtHoras } from '../../utils/format'

export function PortalPendente({ pendentes }) {
  return (
    <div className="panel">
      <div className="section-title">🌀 Portal Pós-Fight</div>
      {pendentes.length === 0 && (
        <div className="loading-box">Nenhuma tarefa aguardando Contra-Ataque no momento.</div>
      )}
      {pendentes.map(p => (
        <div key={`${p.tarefa}-${p.data_leitura}`} className="portal-row">
          <div className="portal-row-top">
            <span className="portal-tarefa">{p.tarefa}</span>
            <span className={`portal-grupo ${p.grupo === 'A' ? 'cyan' : 'amber'}`}>Grupo {p.grupo}</span>
          </div>
          <div className="portal-meta">
            {p.trilha} · {p.materia} · lido em {new Date(`${p.data_leitura}T00:00:00`).toLocaleDateString('pt-BR')} · {fmtHoras(p.minutos / 60)}
            {p.paginas ? ` · ${p.paginas}p` : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
