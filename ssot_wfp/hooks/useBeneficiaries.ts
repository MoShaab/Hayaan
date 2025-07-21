
import { useState, useEffect } from 'react'
import { beneficiariesService } from '@/lib/database'

export function useBeneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadBeneficiaries()
  }, [])

  const loadBeneficiaries = async () => {
    setLoading(true)
    const { data, error } = await beneficiariesService.getAll()
    if (error) {
      setError(error)
    } else {
      setBeneficiaries(data || [])
    }
    setLoading(false)
  }

  const createBeneficiary = async (beneficiary: any) => {
    const { data, error } = await beneficiariesService.create(beneficiary)
    if (!error && data) {
      setBeneficiaries(prev => [data, ...prev])
    }
    return { data, error }
  }

  const updateBeneficiary = async (id: string, updates: any) => {
    const { data, error } = await beneficiariesService.update(id, updates)
    if (!error && data) {
      setBeneficiaries(prev => 
        prev.map(b => b.id === id ? data : b)
      )
    }
    return { data, error }
  }

  return {
    beneficiaries,
    loading,
    error,
    createBeneficiary,
    updateBeneficiary,
    reload: loadBeneficiaries
  }
}