import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/** Agrega, no cliente, as sessões de uma trilha específica por matéria. */
export function useMateriasPorTrilha(trilhaNome) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!trilhaNome) return
    let active = true
    setLoading(true)
    supabase
      .from('sessions')
      .select('materia, categoria, minutos, questoes, acertos')
      .eq('trilha', trilhaNome)
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          setError(error)
          setLoading(false)
          return
        }
        const map = {}
        for (const row of data ?? []) {
          if (!map[row.materia]) {
            map[row.materia] = { materia: row.materia, categoria: row.categoria, minutos: 0, questoes: 0, acertos: 0 }
          }
          map[row.materia].minutos += row.minutos
          map[row.materia].questoes += row.questoes
          map[row.materia].acertos += row.acertos
        }
        const result = Object.values(map)
          .map(m => ({ ...m, horas_liquidas: Math.round((m.minutos / 60) * 100) / 100 }))
          .sort((a, b) => b.horas_liquidas - a.horas_liquidas)
        setData(result)
        setLoading(false)
      })
    return () => { active = false }
  }, [trilhaNome])

  return { data, loading, error }
}
