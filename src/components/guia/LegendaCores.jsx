import { LEGENDA_CORES } from './fluxos'

export function LegendaCores() {
  return (
    <div className="panel">
      <div className="section-title">🎨 Legenda de Cores — Leitura Ativa</div>
      <div className="legend legend-wrap">
        {LEGENDA_CORES.map(c => (
          <span key={c.nome} className="legend-item">
            <span className="legend-dot" style={{ background: c.hex }} />
            {c.nome}
          </span>
        ))}
      </div>
    </div>
  )
}
