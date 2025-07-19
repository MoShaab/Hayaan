// components/mentors/MentorList.tsx
'use client'
import { useState } from 'react'
import { useMentors } from '@/hooks/useMentors'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Search, UserCheck, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MentorList() {
  const { mentors, loading, error } = useMentors()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMentors = mentors.filter(m =>
    m.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mentors</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Mentor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mentors.filter(m => m.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Capacity</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mentors.reduce((acc, m) => acc + (m.current_beneficiaries / m.max_beneficiaries * 100), 0) / mentors.length) || 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Mentors Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMentors.map((mentor) => (
            <TableRow key={mentor.id}>
              <TableCell className="font-medium">
                {mentor.profile?.full_name}
              </TableCell>
              <TableCell>{mentor.specialization}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${(mentor.current_beneficiaries / mentor.max_beneficiaries) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm">
                    {mentor.current_beneficiaries}/{mentor.max_beneficiaries}
                  </span>
                </div>
              </TableCell>
              <TableCell>{mentor.partner?.organization_name}</TableCell>
              <TableCell>
                <Badge variant={mentor.status === 'active' ? 'default' : 'secondary'}>
                  {mentor.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}