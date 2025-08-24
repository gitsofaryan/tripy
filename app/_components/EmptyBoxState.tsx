import React from 'react'
import { suggestions } from './Hero'

interface EmptyBoxStateProps {
    onSelectOption: (title: string) => void;
}

export default function EmptyBoxState({ onSelectOption }: EmptyBoxStateProps) {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-3xl text-center'>Start planning with <strong className='text-primary'>Tripy</strong></h2>
            <p className='text-center text-gray-400 mt-2'>Discover personalized travel itineraries and recommendations tailored just for you.</p>
            <div className='flex flex-col gap-5 mt-4'>
                {suggestions.map((suggestion, index) => {

                    return <div key={index} 
                    onClick={()=>onSelectOption(suggestion.title)}
                    className='flex items-center gap-2 border rounded-full p-3 cursor-pointer hover:bg-primary hover:text-white'>
                        {suggestion.icon}
                        <h2 className='text-lg'>{suggestion.title}</h2>
                    </div>
                })}
            </div>
        </div>
    )
}
