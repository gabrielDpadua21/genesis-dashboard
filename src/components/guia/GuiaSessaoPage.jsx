import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RitualEntrada } from './RitualEntrada'
import { FluxoSessao } from './FluxoSessao'
import { LegendaCores } from './LegendaCores'
import { FLUXOS } from './fluxos'

export function GuiaSessaoPage() {
  const [fluxoAtivo, setFluxoAtivo] = useState('exploracao')

  return (
    <div className="tab-content">
      <div className="page-header">
        <Link to="/" className="guia-voltar">← Voltar pra dashboard</Link>
        <div className="eyebrow" style={{ marginTop: 10 }}>Referência de Processo</div>
        <div className="name" style={{ fontSize: 20 }}>📖 Guia da Sessão</div>
      </div>

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
    </div>
  )
}
