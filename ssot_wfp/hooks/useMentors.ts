'use client'

import { useEffect, useState } from 'react'
import { mentorsService } from '@/lib/database'

export function useMentors() {
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMentors() {
      setLoading(true)
      const { data, error } = await mentorsService.getAll()

      if (error) {
        setError(error.message)
        setMentors([])
      } else {
        setMentors(data || [])
        setError(null)
      }

      setLoading(false)
    }

    fetchMentors()
  }, [])

  return { mentors, loading, error }
}
