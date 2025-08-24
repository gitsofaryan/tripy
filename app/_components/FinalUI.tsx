import { Button } from '@/components/ui/button'
import { Globe2 } from 'lucide-react'
import React from 'react'

const viewTrip = () => {
  // Logic to view the trip
}

export default function FinalUI({ onSelectedOption }: any) {
  return (
    <div className='flex flex-col items-center justify-content mt-6 p-6 bg-white '>
      <Globe2 className='h-12 w-12 text-gray-400' />
      <h2 className='text-lg font-semibold mt-4'>Planning your dream trip...</h2>
      <p className='text-gray-600'>Gathering best destinations, activities, and travel details for you.</p>
      <Button className='mt-4 w-full' disabled onClick={viewTrip}>View Trip</Button>
    </div>
  )
}
