import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useStudyDays() {
  const [studyDates, setStudyDates] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('sessions')
      .select('data')
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          setError(error)
        } else {
          setStudyDates(new Set((data ?? []).map(row => row.data)))
        }
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  return { studyDates, loading, error }
}
