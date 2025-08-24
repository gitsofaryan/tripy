import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

export default function SelectDaysUI({ onSelectedOption }: any) {
    const [days, setDays] = useState(1);

    const incrementDays = () => {
        if (days < 30) {
            setDays(days + 1);
        }
    };

    const decrementDays = () => {
        if (days > 1) {
            setDays(days - 1);
        }
    };

    const confirmSelection = () => {
        onSelectedOption(`${days} days`);
    };

    return (
        <div className='flex flex-col items-center space-y-4 py-4'>
            <h3 className='text-lg font-semibold'>How many days for your trip?</h3>

            <div className='flex items-center space-x-4'>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementDays}
                    disabled={days <= 1}
                >
                    <Minus className='h-4 w-4' />
                </Button>

                <div className='min-w-[100px] text-center'>
                    <span className='text-3xl font-bold'>{days}</span>
                    <p className='text-sm text-gray-600'>{days === 1 ? 'day' : 'days'}</p>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementDays}
                    disabled={days >= 30}
                >
                    <Plus className='h-4 w-4' />
                </Button>
            </div>

            <Button
                onClick={confirmSelection}
                className='w-full mt-4'
            >
                Confirm {days} {days === 1 ? 'Day' : 'Days'}
            </Button>
        </div>
    )
}
