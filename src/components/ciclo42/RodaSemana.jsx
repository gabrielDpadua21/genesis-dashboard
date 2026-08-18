const DIAS = [
  { label: 'Dom', tipo: 'recovery', texto: 'Recovery' },
  { label: 'Seg', tipo: 'exploracao-a', texto: 'Exploração — Grupo A' },
  { label: 'Ter', tipo: 'exploracao-b', texto: 'Exploração — Grupo B' },
  { label: 'Qua', tipo: 'exploracao-a', texto: 'Exploração — Grupo A' },
  { label: 'Qui', tipo: 'exploracao-b', texto: 'Exploração — Grupo B' },
  { label: 'Sex', tipo: 'contra-ataque', texto: 'Contra-Ataque #1' },
  { label: 'Sáb', tipo: 'contra-ataque', texto: 'Contra-Ataque #2 + Boss Raid' },
]

export function RodaSemana() {
  const diaAtual = new Date().getDay()

  return (
    <div className="panel">
      <div className="section-title">🔄 Roda da Semana</div>
      <div className="week-wheel">
        {DIAS.map((d, i) => (
          <div key={d.label} className={`week-wheel-day ${d.tipo} ${i === diaAtual ? 'today' : ''}`}>
            <div className="week-wheel-dot" />
            <div className="week-wheel-label">{d.label}</div>
          </div>
        ))}
      </div>
      <div className="week-wheel-legend">Hoje: {DIAS[diaAtual].texto}</div>
    </div>
  )
}
