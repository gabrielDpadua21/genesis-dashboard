export function fmtHoras(h) {
  if (h == null) return '—'
  const horas = Math.floor(h)
  const min = Math.round((h - horas) * 60)
  return `${horas}h${min > 0 ? min + 'min' : ''}`
}

export function fmtAcuracia(pct) {
  return pct == null ? '—' : `${pct}%`
}

export const CAT_COLORS = {
  TI: 'var(--ti)',
  Direito: 'var(--direito)',
  Exatas: 'var(--exatas)',
  Outros: 'var(--outros)',
}

/** Gera os últimos N dias (incluindo hoje) como { date: 'YYYY-MM-DD', label: 'DD/MM' } */
export function lastNDays(n) {
  const days = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    const label = `${String(d.getDate()).padStart(2, '0')}`
    days.push({ date: iso, label, isToday: i === 0 })
  }
  return days
}
