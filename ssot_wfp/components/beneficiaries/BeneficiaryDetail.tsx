// components/beneficiaries/BeneficiaryDetail.tsx
'use client'
import { useEffect, useState } from 'react'
import { beneficiariesService } from '@/lib/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Phone, MapPin, Calendar, User, Target } from 'lucide-react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface BeneficiaryDetailProps {
  beneficiaryId: string
}

export default function BeneficiaryDetail({ beneficiaryId }: BeneficiaryDetailProps) {
  const [beneficiary, setBeneficiary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBeneficiary()
  }, [beneficiaryId])

  const loadBeneficiary = async () => {
    setLoading(true)
    const { data, error } = await beneficiariesService.getById(beneficiaryId)
    if (!error && data) {
      setBeneficiary(data)
    }
    setLoading(false)
  }

  if (loading) return <LoadingSpinner />
  if (!beneficiary) return <div>Beneficiary not found</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{beneficiary.full_name}</h1>
          <p className="text-gray-600">ID: {beneficiary.beneficiary_id}</p>
        </div>
        <Badge className="text-lg px-3 py-1">
          Score: {beneficiary.self_reliance_score}%
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold">{beneficiary.age} years</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{beneficiary.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Program Duration</p>
                <p className="font-semibold">
                  {Math.floor((new Date().getTime() - new Date(beneficiary.program_start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold">{beneficiary.category.replace('_', ' ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Self-Reliance Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Overall Score</span>
              <span className="font-semibold">{beneficiary.self_reliance_score}%</span>
            </div>
            <Progress value={beneficiary.self_reliance_score} className="h-3" />
            
            {/* Score breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Income Generation</span>
                  <span className="text-sm font-medium">24/30</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Skill Development</span>
                  <span className="text-sm font-medium">18/25</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Asset Accumulation</span>
                  <span className="text-sm font-medium">12/20</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Social Integration</span>
                  <span className="text-sm font-medium">10/15</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="progress">Progress Logs</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficiary.milestones?.map((milestone: any) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                      <p className="text-xs text-gray-500">
                        Target: {new Date(milestone.target_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                        {milestone.status}
                      </Badge>
                      <span className="text-sm font-medium">+{milestone.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficiary.communications?.map((comm: any) => (
                  <div key={comm.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{comm.type.replace('_', ' ')}</h4>
                          <p className="text-sm text-gray-600">{comm.notes}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(comm.created_at).toLocaleDateString()}
                          </p>
                          {comm.duration_minutes && (
                            <p className="text-xs text-gray-500">{comm.duration_minutes} min</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficiary.progress_logs?.map((log: any) => (
                  <div key={log.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{log.log_type.replace('_', ' ')}</h4>
                          <p className="text-sm text-gray-600">{log.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(log.created_at).toLocaleDateString()}
                          </p>
                          {log.score_impact > 0 && (
                            <p className="text-xs text-green-600">+{log.score_impact} pts</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="mt-1">{beneficiary.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Gender</label>
                  <p className="mt-1">{beneficiary.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Age</label>
                  <p className="mt-1">{beneficiary.age} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Family Size</label>
                  <p className="mt-1">{beneficiary.family_size} members</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="mt-1">{beneficiary.contact_phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="mt-1">{beneficiary.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Arrival Date</label>
                  <p className="mt-1">{new Date(beneficiary.arrival_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Program Start</label>
                  <p className="mt-1">{new Date(beneficiary.program_start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Assigned Mentor</label>
                  <p className="mt-1">{beneficiary.assigned_mentor?.profiles?.full_name || 'Not assigned'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Partner Organization</label>
                  <p className="mt-1">{beneficiary.partner?.organization_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}