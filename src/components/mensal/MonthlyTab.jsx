import { useState } from 'react'
import { useHorasPorDia } from '../../hooks/useHorasPorDia'
import { fmtHoras } from '../../utils/format'

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

/** "2026-08" -> "Agosto 2026" */
function nomeMes(chaveMes) {
  const [ano, mes] = chaveMes.split('-').map(Number)
  return `${NOMES_MESES[mes - 1]} ${ano}`
}

/** Quantidade de dias do mês (ex: "2026-08" -> 31) */
function totalDiasDoMes(chaveMes) {
  const [ano, mes] = chaveMes.split('-').map(Number)
  return new Date(ano, mes, 0).getDate()
}

function MonthPanel({ chaveMes, registros }) {
  const horasPorDia = new Map(registros.map(r => [Number(r.data.slice(8, 10)), Number(r.horas)]))
  const totalDias = totalDiasDoMes(chaveMes)
  const dias = Array.from({ length: totalDias }, (_, i) => i + 1)

  const valores = dias.map(dia => horasPorDia.get(dia) ?? 0)
  const maiorHoras = Math.max(0, ...valores)
  const totalHoras = valores.reduce((soma, h) => soma + h, 0)
  const diasEstudados = valores.filter(h => h > 0).length
  const mediaPorDiaEstudado = diasEstudados > 0 ? totalHoras / diasEstudados : 0

  return (
    <div className="panel">
      <div className="section-title">📈 {nomeMes(chaveMes)}</div>
      <div className="stats-grid">
        <div className="stat">
          <div className="stat-label">Total de horas</div>
          <div className="stat-value cyan">{fmtHoras(totalHoras)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Média/dia estudado</div>
          <div className="stat-value amber">{fmtHoras(mediaPorDiaEstudado)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Dias estudados</div>
          <div className="stat-value violet">{diasEstudados}/{totalDias}</div>
        </div>
      </div>
      <div className="month-chart">
        {dias.map(dia => {
          const horas = horasPorDia.get(dia) ?? 0
          const pct = maiorHoras > 0 ? (horas / maiorHoras) * 100 : 0
          const pico = maiorHoras > 0 && horas === maiorHoras
          return (
            <div className="month-bar-col" key={dia} data-tooltip={`Dia ${dia}: ${fmtHoras(horas)}`}>
              <div
                className={`month-bar ${pico ? 'pico' : ''}`}
                style={{ height: `${Math.max(pct, 3)}%` }}
              />
              <div className="month-bar-daynum">{dia}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MonthlyTab() {
  const { data, loading, error } = useHorasPorDia()
  const [mesAtivo, setMesAtivo] = useState(null)

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>
  if (data.length === 0) return <div className="panel">Nenhum dado de horas registrado ainda.</div>

  const grupos = new Map()
  for (const registro of data) {
    const chaveMes = registro.data.slice(0, 7)
    if (!grupos.has(chaveMes)) grupos.set(chaveMes, [])
    grupos.get(chaveMes).push(registro)
  }
  const meses = [...grupos.keys()].sort().reverse()
  const ativo = mesAtivo ?? meses[0]

  return (
    <>
      <div className="subtabs">
        {meses.map(m => (
          <button
            key={m}
            className={`subtab-btn ${ativo === m ? 'active' : ''}`}
            onClick={() => setMesAtivo(m)}
          >
            {nomeMes(m)}
          </button>
        ))}
      </div>
      <MonthPanel chaveMes={ativo} registros={grupos.get(ativo)} />
    </>
  )
}
