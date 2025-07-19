// components/beneficiaries/BeneficiaryForm.tsx
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBeneficiaries } from '@/hooks/useBeneficiaries'

const beneficiarySchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(1).max(120),
  gender: z.enum(['male', 'female', 'other']),
  contact_phone: z.string().optional(),
  family_size: z.number().min(1),
  location: z.string().min(2),
  category: z.enum(['agriculture', 'skills_training', 'business', 'employment', 'mixed']),
  arrival_date: z.string()
})

type BeneficiaryFormData = z.infer<typeof beneficiarySchema>

export default function BeneficiaryForm({ onSuccess }: { onSuccess: () => void }) {
  const { createBeneficiary } = useBeneficiaries()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<BeneficiaryFormData>({
    resolver: zodResolver(beneficiarySchema)
  })

  const onSubmit = async (data: BeneficiaryFormData) => {
    setLoading(true)
    const { error } = await createBeneficiary(data)
    
    if (error) {
      alert('Error creating beneficiary: ' + error.message)
    } else {
      onSuccess()
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Beneficiary</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                {...register('full_name')}
                placeholder="Enter full name"
              />
              {errors.full_name && (
                <p className="text-sm text-red-600">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register('age', { valueAsNumber: true })}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue('gender', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contact_phone">Phone Number</Label>
              <Input
                id="contact_phone"
                {...register('contact_phone')}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label htmlFor="family_size">Family Size</Label>
              <Input
                id="family_size"
                type="number"
                {...register('family_size', { valueAsNumber: true })}
                placeholder="Enter family size"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Enter location"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agriculture">Agriculture/Livestock</SelectItem>
                  <SelectItem value="skills_training">Skills Training</SelectItem>
                  <SelectItem value="business">Business/Entrepreneurship</SelectItem>
                  <SelectItem value="employment">Employment</SelectItem>
                  <SelectItem value="mixed">Mixed Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="arrival_date">Arrival Date</Label>
              <Input
                id="arrival_date"
                type="date"
                {...register('arrival_date')}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Beneficiary'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}