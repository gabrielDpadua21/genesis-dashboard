import { CAT_COLORS, fmtHoras, fmtAcuracia } from '../../utils/format'

export function MateriaCard({ materia }) {
  const { materia: nome, categoria, horas_liquidas, questoes, acertos, acuracia_pct } = materia

  return (
    <div className="materia-card">
      <div className="materia-info">
        <span className="cat-dot" style={{ background: CAT_COLORS[categoria] }} />
        <span className="materia-name">{nome}</span>
        <span className="materia-cat-tag" style={{ color: CAT_COLORS[categoria] }}>{categoria}</span>
      </div>
      <div className="materia-stats-row">
        <div className="msr-item">
          <span className="msr-label">Horas</span>
          <span className="msr-value amber">{fmtHoras(horas_liquidas)}</span>
        </div>
        <div className="msr-item">
          <span className="msr-label">Questões</span>
          <span className="msr-value cyan">{questoes}</span>
        </div>
        <div className="msr-item">
          <span className="msr-label">Acertos</span>
          <span className="msr-value violet">{acertos}</span>
        </div>
        <div className="msr-item">
          <span className="msr-label">Acurácia</span>
          <span className="msr-value">{fmtAcuracia(acuracia_pct)}</span>
        </div>
      </div>
    </div>
  )
}
