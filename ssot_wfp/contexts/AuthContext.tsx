// // contexts/AuthContext.tsx
// 'use client'
// import { createContext, useContext, useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { User } from '@supabase/supabase-js'

// interface AuthContextType {
//   user: User | null
//   loading: boolean
//   userProfile: any
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   userProfile: null
// })

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [userProfile, setUserProfile] = useState(null)

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setUser(session?.user ?? null)
//         if (session?.user) {
//           // Fetch user profile
//           const { data } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', session.user.id)
//             .single()
//           setUserProfile(data)
//         }
//         setLoading(false)
//       }
//     )

//     return () => subscription.unsubscribe()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ user, loading, userProfile }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)