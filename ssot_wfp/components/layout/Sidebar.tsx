// components/layout/Sidebar.tsx
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Home, Users, UserCheck, FileText, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  const { userProfile } = useAuth()

  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/beneficiaries', icon: Users, label: 'Beneficiaries' },
    { href: '/mentors', icon: UserCheck, label: 'Mentors' },
    { href: '/reports', icon: FileText, label: 'Reports' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">WFP System</h1>
        <p className="text-sm text-gray-300">{userProfile?.role}</p>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-4 py-2 hover:bg-gray-700"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}