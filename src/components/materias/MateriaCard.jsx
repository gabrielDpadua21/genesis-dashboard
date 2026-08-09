import { CAT_COLORS, fmtHoras, fmtAcuracia } from '../../utils/format'

export function MateriaCard({ materia }) {
  const { materia: nome, categoria, horas_liquidas, questoes, acertos, acuracia_pct } = materia

  return (
    <div className="materia-card">
      <div className="materia-top">
        <span className="cat-dot" style={{ background: CAT_COLORS[categoria] }} />
        <span className="materia-name">{nome}</span>
        <span className="materia-cat-tag">{categoria}</span>
      </div>
      <div className="materia-stats-row">
        <div className="msr-item">
          <div className="msr-label">Horas</div>
          <div className="msr-value amber">{fmtHoras(horas_liquidas)}</div>
        </div>
        <div className="msr-item">
          <div className="msr-label">Questões</div>
          <div className="msr-value cyan">{questoes}</div>
        </div>
        <div className="msr-item">
          <div className="msr-label">Acertos</div>
          <div className="msr-value violet">{acertos}</div>
        </div>
        <div className="msr-item">
          <div className="msr-label">Acurácia</div>
          <div className="msr-value">{fmtAcuracia(acuracia_pct)}</div>
        </div>
      </div>
    </div>
  )
}
