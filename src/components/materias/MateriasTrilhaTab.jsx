import { useState } from 'react'
import { useTrilhas } from '../../hooks/useTrilhas'
import { useMateriasPorTrilha } from '../../hooks/useMateriasPorTrilha'
import { MateriaCard } from './MateriaCard'
import { fmtHoras, fmtAcuracia } from '../../utils/format'

function TrilhaPanel({ trilha }) {
  const { data: materias, loading, error } = useMateriasPorTrilha(trilha.trilha)
  const pct = trilha.total_subquests > 0
    ? Math.round((trilha.subquests_concluidas / trilha.total_subquests) * 1000) / 10
    : 0

  return (
    <>
      <div className="panel">
        <div className="section-title">🗺️ {trilha.trilha}</div>
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-label">Tarefas</div>
            <div className="stat-value amber">{trilha.tarefas_tocadas}/{trilha.total_tarefas}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Sub-quests</div>
            <div className="stat-value cyan">{trilha.subquests_concluidas}/{trilha.total_subquests}</div>
          </div>
        </div>
        <div className="bar-track" style={{ marginTop: 10 }}>
          <div className="bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="week-meta-row" style={{ marginTop: 8 }}>
          {fmtHoras(trilha.horas_liquidas)} líquidas · {trilha.questoes} questões · {fmtAcuracia(trilha.acuracia_pct)} de acurácia
        </div>
      </div>
      <div className="panel">
        <div className="section-title">📚 Matérias desta trilha</div>
        {loading && <div className="loading-box">Carregando matérias...</div>}
        {error && <div className="error-box">Erro: {error.message}</div>}
        {!loading && !error && materias.map(m => <MateriaCard key={m.materia} materia={m} />)}
      </div>
    </>
  )
}

export function MateriasTrilhaTab() {
  const { data: trilhas, loading, error } = useTrilhas()
  const [ativa, setAtiva] = useState(null)

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>
  if (trilhas.length === 0) return <div className="panel">Nenhuma trilha registrada ainda.</div>

  const trilhaAtiva = ativa ?? trilhas[0].trilha

  return (
    <>
      <div className="subtabs">
        {trilhas.map(t => (
          <button
            key={t.trilha}
            className={`subtab-btn ${trilhaAtiva === t.trilha ? 'active' : ''}`}
            onClick={() => setAtiva(t.trilha)}
          >
            {t.trilha}
          </button>
        ))}
      </div>
      {trilhas.filter(t => t.trilha === trilhaAtiva).map(t => (
        <TrilhaPanel key={t.trilha} trilha={t} />
      ))}
    </>
  )
}
