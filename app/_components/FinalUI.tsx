import { Button } from '@/components/ui/button'
import { Globe2, CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FinalUIProps {
  onSelectedOption?: (value: string) => void;
  disable?: boolean;
  tripDetail?: any;
}

export default function FinalUI({ onSelectedOption, disable = true, tripDetail }: FinalUIProps) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const viewTrip = () => {
    if (tripDetail) {
      // Navigate to trip details page or do something with the trip data
      router.push('/my-trips'); // or wherever you want to navigate
    }
  };

  const generateTrip = () => {
    if (onSelectedOption) {
      setIsGenerating(true);
      onSelectedOption('Generate my trip plan');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-lg shadow-sm border'>
      {!tripDetail ? (
        <>
          <Globe2 className='h-12 w-12 text-primary' />
          <h2 className='text-lg font-semibold mt-4'>Ready to create your dream trip?</h2>
          <p className='text-gray-600 text-center mb-4'>
            I have all the details I need. Let me create a personalized travel plan for you!
          </p>
          <Button 
            className='w-full' 
            onClick={generateTrip}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                Generating Trip Plan...
              </>
            ) : (
              'Generate My Trip Plan'
            )}
          </Button>
        </>
      ) : (
        <>
          <CheckCircle className='h-12 w-12 text-green-500' />
          <h2 className='text-lg font-semibold mt-4 text-green-700'>Trip Plan Generated!</h2>
          <p className='text-gray-600 text-center mb-4'>
            Your personalized travel plan is ready. Click below to view all the details.
          </p>
          <Button 
            className='w-full bg-green-600 hover:bg-green-700' 
            onClick={viewTrip}
            disabled={disable}
          >
            View My Trip Plan
          </Button>
        </>
      )}
    </div>
  )
}
