import { RITUAL_ENTRADA } from './fluxos'

export function RitualEntrada() {
  return (
    <div className="panel">
      <div className="section-title">🚪 Ritual de Entrada</div>
      <div className="ritual-row">
        {RITUAL_ENTRADA.map((item, i) => (
          <span key={item} className="ritual-item">
            {item}
            {i < RITUAL_ENTRADA.length - 1 && <span className="ritual-arrow">→</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
