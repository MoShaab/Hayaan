// app/dashboard/page.tsx
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, TrendingUp, Award } from 'lucide-react'

export default function Dashboard() {
  const { userProfile } = useAuth()

  const stats = [
    { title: 'Total Beneficiaries', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Mentors', value: '156', icon: UserCheck, color: 'bg-green-500' },
    { title: 'Avg. Self-Reliance Score', value: '67%', icon: TrendingUp, color: 'bg-yellow-500' },
    { title: 'Graduated', value: '89', icon: Award, color: 'bg-purple-500' }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-white p-1 rounded ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}