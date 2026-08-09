import { lastNDays } from '../../utils/format'

function calcMaiorStreak(days) {
  let max = 0, cur = 0
  for (const d of days) {
    if (d.hit === true) { cur++; max = Math.max(max, cur) }
    else if (d.hit === false) { cur = 0 }
  }
  return max
}

export function Timeline({ studyDates, streakAtual, numDays = 20 }) {
  const days = lastNDays(numDays).map(d => ({
    ...d,
    hit: d.isToday ? (studyDates.has(d.date) ? true : null) : studyDates.has(d.date),
  }))

  const maiorStreak = calcMaiorStreak(days)

  return (
    <div className="panel">
      <div className="section-title">🔥 Timeline de Estudos</div>
      <div className="streak-callout">
        <div className="streak-box">
          <div className="streak-box-value fire">{streakAtual}</div>
          <div className="streak-box-label">Streak atual</div>
        </div>
        <div className="streak-box">
          <div className="streak-box-value cyan">{maiorStreak}</div>
          <div className="streak-box-label">Maior streak</div>
        </div>
      </div>
      <div className="timeline-scroll">
        <div className="timeline-row">
          {days.map(d => {
            const cls = d.hit === true ? 'hit' : d.hit === false ? 'miss' : 'pending'
            const icon = d.hit === true ? '✓' : d.hit === false ? '✕' : '…'
            return (
              <div className="timeline-day" key={d.date}>
                <div className={`timeline-dot ${cls}`}>{icon}</div>
                <div className="timeline-daynum">{d.label}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--green)' }} />Estudou</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--red)' }} />Não estudou</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--amber)' }} />Hoje</div>
      </div>
    </div>
  )
}
