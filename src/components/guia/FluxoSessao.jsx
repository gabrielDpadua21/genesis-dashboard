export function FluxoSessao({ fluxo }) {
  return (
    <div className="panel">
      <div className="section-title">{fluxo.label}</div>
      <div className="class-line" style={{ marginBottom: 12 }}>{fluxo.subtitulo}</div>
      <ol className="guia-steps">
        {fluxo.passos.map((passo, i) => (
          <li key={passo} className="guia-step">
            <span className="guia-step-num">{i + 1}</span>
            <span className="guia-step-text">{passo}</span>
          </li>
        ))}
      </ol>
      <div className="guia-resultado">↳ {fluxo.resultado}</div>
    </div>
  )
}
