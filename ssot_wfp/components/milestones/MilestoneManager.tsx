// // components/milestones/MilestoneManager.tsx
// 'use client'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { supabase } from '@/lib/supabase'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Calendar, Target, CheckCircle } from 'lucide-react'

// interface MilestoneManagerProps {
//   beneficiaryId: string
//   milestones: any[]
//   onMilestoneUpdate: () => void
// }

// export default function MilestoneManager({ 
//   beneficiaryId, 
//   milestones, 
//   onMilestoneUpdate 
// }: MilestoneManagerProps) {
//   const [showForm, setShowForm] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const { register, handleSubmit, reset } = useForm()

//   const onSubmit = async (data: any) => {
//     setLoading(true)
    
//     const { error } = await supabase
//       .from('milestones')
//       .insert({
//         ...data,
//         beneficiary_id: beneficiaryId,
//         created_by: (await supabase.auth.getUser()).data.user?.id
//       })

//     if (!error) {
//       reset()
//       setShowForm(false)
//       onMilestoneUpdate()
//     }
//     setLoading(false)
//   }

//   const updateMilestoneStatus = async (milestoneId: string, status: string) => {
//     const updates: any = { status }
    
//     if (status === 'completed') {
//       updates.completion_date = new Date().toISOString()
//     }

//     const { error } = await supabase
//       .from('milestones')
//       .update(updates)
//       .eq('id', milestoneId)

//     if (!error) {
//       onMilestoneUpdate()
      
//       // Update beneficiary's self-reliance score
//       if (status === 'completed') {
//         const milestone = milestones.find(m => m.id === milestoneId)
//         if (milestone?.points > 0) {
//           await supabase.rpc('update_beneficiary_score', {
//             beneficiary_id: beneficiaryId,
//             points_to_add: milestone.points
//           })
//         }
//       }
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed': return 'bg-green-100 text-green-800'
//       case 'in_progress': return 'bg-blue-100 text-blue-800'
//       case 'overdue': return 'bg-red-100 text-red-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-semibold">Milestones</h3>
//         <Button onClick={() => setShowForm(!showForm)}>
//           <Target className="w-4 h-4 mr-2" />
//           Add Milestone
//         </Button>
//       </div>

//       {showForm && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Add New Milestone</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Title</Label>
//                 <Input
//                   id="title"
//                   {...register('title', { required: true })}
//                   placeholder="Milestone title"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   {...register('description')}
//                   placeholder="Detailed description"
//                   rows={3}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="target_date">Target Date</Label>
//                   <Input
//                     id="target_date"
//                     type="date"
//                     {...register('target_date')}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="points">Points</Label>
//                   <Input
//                     id="points"
//                     type="number"
//                     {...register('points', { valueAsNumber: true })}
//                     placeholder="Points value"
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-2">
//                 <Button type="submit" disabled={loading}>
//                   {loading ? 'Creating...' : 'Create Milestone'}
//                 </Button>
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}

//       {/* Milestones List */}
//       <div className="space-y-3">
//         {milestones.map((milestone) => (
//           <Card key={milestone.id}>
//             <CardContent className="p-4">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2">
//                     <h4 className="font-medium">{milestone.title}</h4>
//                     <Badge className={getStatusColor(milestone.status)}>
//                       {milestone.status}
//                     </Badge>
//                   </div>
                  
//                   <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  
//                   <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                     <div className="flex items-center space-x-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>
//                         Target: {new Date(milestone.target_date).toLocaleDateString()}
//                       </span>
//                     </div>
                    
//                     <div className="flex items-center space-x-1">
//                       <Target className="w-4 h-4" />
//                       <span>{milestone.points} points</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex space-x-2">
//                   {milestone.status === 'pending' && (
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => updateMilestoneStatus(milestone.id, 'in_progress')}
//                     >
//                       Start
//                     </Button>
//                   )}
                  
//                   {milestone.status === 'in_progress' && (
//                     <Button
//                       size="sm"
//                       onClick={()