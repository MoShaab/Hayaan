
'use client'
import { useBeneficiaries } from '@/hooks/useBeneficiaries'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Link from 'next/link'

export default function BeneficiaryList() {
  const { beneficiaries, loading, error, reload } = useBeneficiaries()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBeneficiaries = beneficiaries.filter(b =>
    b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.beneficiary_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={reload} />

  const getCategoryColor = (category: string) => {
    const colors = {
      agriculture: 'bg-green-100 text-green-800',
      skills_training: 'bg-blue-100 text-blue-800',
      business: 'bg-purple-100 text-purple-800',
      employment: 'bg-orange-100 text-orange-800',
      mixed: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Beneficiaries</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Beneficiary
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search beneficiaries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBeneficiaries.map((beneficiary) => (
            <TableRow key={beneficiary.id}>
              <TableCell className="font-mono text-sm">
                {beneficiary.beneficiary_id}
              </TableCell>
              <TableCell className="font-medium">
                {beneficiary.full_name}
              </TableCell>
              <TableCell>
                <Badge className={getCategoryColor(beneficiary.category)}>
                  {beneficiary.category.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${beneficiary.self_reliance_score}%` }}
                    />
                  </div>
                  <span className="text-sm">{beneficiary.self_reliance_score}%</span>
                </div>
              </TableCell>
              <TableCell>
                {beneficiary.assigned_mentor?.profiles?.full_name || 'Unassigned'}
              </TableCell>
              <TableCell>
                <Badge variant={beneficiary.status === 'active' ? 'default' : 'secondary'}>
                  {beneficiary.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                <Link href={`/beneficiaries/${beneficiary.id}/beneficiaryDetail`}>
                  View
                  </Link>
                  
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}