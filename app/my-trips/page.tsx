"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MyTripsPage() {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center gap-4 mb-6'>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className='h-4 w-4' />
          </Button>
          <h1 className='text-2xl font-bold'>My Trips</h1>
        </div>
        
        <div className='bg-white rounded-lg shadow-sm border p-6'>
          <h2 className='text-lg font-semibold mb-4'>Your Recent Trip</h2>
          <p className='text-gray-600'>
            Your trip details will be displayed here. This is where you can view your complete itinerary, 
            hotel bookings, and all the activities planned for your trip.
          </p>
        </div>
      </div>
    </div>
  )
}
