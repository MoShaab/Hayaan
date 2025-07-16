// app/dashboard/layout.tsx
import Sidebar from '@/components/layout/Sidebar'
// import { AuthProvider } from '@/contexts/AuthContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
  
  )
}