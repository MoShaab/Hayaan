import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/supabase'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const beneficiariesService = {
  async getAll() {
    
    const { data, error } = await supabase
      .from('beneficiaries')
      .select(`
        *,
        assigned_mentor:mentors(id, profile_id, profiles(full_name)),
        partner:partners(organization_name)
      `)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('beneficiaries')
      .select(`
        *,
        assigned_mentor:mentors(id, profile_id, profiles(full_name)),
        partner:partners(organization_name),
        milestones(*),
        progress_logs(*),
        communications(*)
      `)
      .eq('id', id)
      .single()
    
    return { data, error }
  },

  async create(beneficiary: any) {
    // Generate unique beneficiary ID
    const beneficiaryId = `BEN${Date.now().toString().slice(-9)}`
    
    const { data, error } = await supabase
      .from('beneficiaries')
      .insert({
        ...beneficiary,
        beneficiary_id: beneficiaryId
      })
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('beneficiaries')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  }
}

export const mentorsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profile:profiles(full_name, email, phone),
        partner:partners(organization_name)
      `)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  async create(mentor: any) {
    const { data, error } = await supabase
      .from('mentors')
      .insert(mentor)
      .select()
      .single()
    
    return { data, error }
  }
}