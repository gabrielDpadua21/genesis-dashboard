import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RitualEntrada } from './RitualEntrada'
import { FluxoSessao } from './FluxoSessao'
import { LegendaCores } from './LegendaCores'
import { FLUXOS } from './fluxos'

export function GuiaSessaoPage() {
  const [fluxoAtivo, setFluxoAtivo] = useState('exploracao')

  return (
    <>
      <Link to="/" className="guia-voltar">← Voltar pra dashboard</Link>
      <div className="eyebrow" style={{ marginTop: 10 }}>Referência de Processo</div>
      <div className="name" style={{ fontSize: 20, marginBottom: 16 }}>📖 Guia da Sessão</div>

      <RitualEntrada />

      <div className="subtabs">
        {Object.entries(FLUXOS).map(([id, fluxo]) => (
          <button
            key={id}
            className={`subtab-btn ${fluxoAtivo === id ? 'active' : ''}`}
            onClick={() => setFluxoAtivo(id)}
          >
            {fluxo.label}
          </button>
        ))}
      </div>
      <FluxoSessao fluxo={FLUXOS[fluxoAtivo]} />

      <LegendaCores />
    </>
  )
}
