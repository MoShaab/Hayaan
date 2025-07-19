// components/mentors/MentorAssignment.tsx
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MentorAssignmentProps {
  beneficiaryId: string
  currentMentorId?: string
  onAssignment: (mentorId: string) => void
}

export default function MentorAssignment({ 
  beneficiaryId, 
  currentMentorId, 
  onAssignment 
}: MentorAssignmentProps) {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState(currentMentorId || '')

  useEffect(() => {
    loadAvailableMentors()
  }, [])

  const loadAvailableMentors = async () => {
    const { data, error } = await supabase
      .from('mentors')
      .select(`
        *,
        profile:profiles(full_name, email),
        partner:partners(organization_name)
      `)
      .eq('status', 'active')
      .order('current_beneficiaries', { ascending: true })

    if (!error && data) {
      setMentors(data)
    }
    setLoading(false)
  }

  const handleAssignment = async () => {
    if (!selectedMentor) return

    setAssigning(true)
    
    // Update beneficiary's mentor
    const { error: beneficiaryError } = await supabase
      .from('beneficiaries')
      .update({ assigned_mentor: selectedMentor })
      .eq('id', beneficiaryId)

    if (!beneficiaryError) {
      // Update mentor's beneficiary count
      const { error: mentorError } = await supabase.rpc('update_mentor_beneficiary_count', {
        mentor_id: selectedMentor,
        old_mentor_id: currentMentorId
      })

      if (!mentorError) {
        onAssignment(selectedMentor)
      }
    }

    setAssigning(false)
  }

  const getMentorCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Mentor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedMentor} onValueChange={setSelectedMentor}>
          <SelectTrigger>
            <SelectValue placeholder="Select a mentor" />
          </SelectTrigger>
          <SelectContent>
            {mentors.map((mentor) => (
              <SelectItem key={mentor.id} value={mentor.id}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-medium">{mentor.profile?.full_name}</p>
                    <p className="text-sm text-gray-600">{mentor.specialization}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${getMentorCapacityColor(mentor.current_beneficiaries, mentor.max_beneficiaries)} text-white`}
                    >
                      {mentor.current_beneficiaries}/{mentor.max_beneficiaries}
                    </Badge>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleAssignment} 
          disabled={!selectedMentor || assigning}
          className="w-full"
        >
          {assigning ? 'Assigning...' : 'Assign Mentor'}
        </Button>
      </CardContent>
    </Card>
  )
}