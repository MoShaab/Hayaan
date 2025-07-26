
'use client'
import { useAuth } from '@/contexts/AuthContext'
import { Home, Users, UserCheck, FileText, Settings } from 'lucide-react'
import Link from 'next/link'
import { CurrentUserAvatar } from '@/components/current-user-avatar'
import {AuthButton}  from "@/components/auth-button";


export default function Sidebar() {
  const { userProfile } = useAuth()

  const menuItems = [
    { href: '/mentor-dashboard', icon: Home, label: 'Dashboard' },
    { href: '/beneficiaries/beneficiaryList', icon: Users, label: 'Beneficiaries' },
    { href: '/mentor-reports', icon: FileText, label: 'Reports' },
    { href: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
      <div className="flex items-center justify-between">
      
      <h1>KilimoVision</h1>
      <CurrentUserAvatar />
    </div>

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