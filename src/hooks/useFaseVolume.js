import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useFaseVolume() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('fase_volume')
      .select('*')
      .eq('ativa', true)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error)
        else setData(data)
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  return { data, loading, error }
}
