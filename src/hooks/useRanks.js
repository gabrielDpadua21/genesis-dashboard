import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useRanks() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('ranks')
      .select('*')
      .order('ordem', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error)
        else setData(data ?? [])
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  return { data, loading, error }
}
