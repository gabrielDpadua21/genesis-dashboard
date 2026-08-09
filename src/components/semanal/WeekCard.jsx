import { fmtHoras, fmtAcuracia } from '../../utils/format'

export function WeekCard({ semana }) {
  const {
    semana_inicio, semana_fim, horas_liquidas, questoes, acertos,
    acuracia_pct, dias_executados, meta_horas, pct_meta_batida, xp_semana,
  } = semana

  const hoje = new Date().toISOString().slice(0, 10)
  const encerrada = semana_fim < hoje
  const temMeta = meta_horas != null

  let badgeClass = null, badgeLabel = null, statusTexto = null

  if (temMeta) {
    if (!encerrada) {
      badgeClass = 'andamento'
      badgeLabel = '⏳ EM ANDAMENTO'
      statusTexto = `Semana ainda não fechou. Ritmo atual: ${pct_meta_batida}% da meta com ${dias_executados} dia(s) executado(s).`
    } else if (pct_meta_batida >= 100) {
      badgeClass = 'sucesso'
      badgeLabel = '✅ SUCESSO'
      statusTexto = `Meta batida — ${fmtHoras(horas_liquidas)} de ${meta_horas}h (${pct_meta_batida}%).`
    } else {
      badgeClass = 'falha'
      badgeLabel = '❌ FALHA'
      statusTexto = `Meta não batida — ${fmtHoras(horas_liquidas)} de ${meta_horas}h (${pct_meta_batida}%).`
    }
  }

  return (
    <div className="week-card">
      <div className="week-header">
        <div className="week-range">{semana_inicio} → {semana_fim}</div>
        <div className="week-xp">+{xp_semana ?? 0} XP</div>
      </div>
      <div className="week-stats-row">
        <div className="wsr-item"><div className="wsr-label">Horas</div><div className="wsr-value amber">{fmtHoras(horas_liquidas)}</div></div>
        <div className="wsr-item"><div className="wsr-label">Questões</div><div className="wsr-value cyan">{questoes}</div></div>
        <div className="wsr-item"><div className="wsr-label">Acurácia</div><div className="wsr-value violet">{fmtAcuracia(acuracia_pct)}</div></div>
        <div className="wsr-item"><div className="wsr-label">Dias</div><div className="wsr-value">{dias_executados}/7</div></div>
      </div>

      {temMeta ? (
        <>
          <div className="bar-track">
            <div className={`bar-fill ${badgeClass}`} style={{ width: `${Math.min(100, pct_meta_batida)}%` }} />
          </div>
          <div className="week-meta-row">
            {fmtHoras(horas_liquidas)} / {meta_horas}h de meta ({pct_meta_batida}%)
          </div>
          <div className="week-status-row">
            <span className={`status-badge ${badgeClass}`}>{badgeLabel}</span>
            <span className="status-texto">{statusTexto}</span>
          </div>
        </>
      ) : (
        <div className="week-meta-row">Sem meta definida para esta semana (tabela weekly_meta)</div>
      )}
    </div>
  )
}
