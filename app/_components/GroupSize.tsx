import { div } from 'motion/react-client'
import React from 'react'

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '🧍',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '❤️',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '🎉',
        people: '5 to 10 People'
    }
]



export default function GroupSize({ onSelectedOption }:any) {

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
        {SelectTravelesList.map((item,index)=>(
            <div key={index} className='border p-3 rounded-lg hover:border-primary cursor-pointer'
            onClick={()=>onSelectedOption(item.title+":"+item.people)}
            >
                <div className='text-xl'>{item.icon}</div>
                <h3 className='font-semibold text-md mt-2'>{item.title}</h3>
                <p className='text-sm text-gray-500'>{item.desc}</p>
                <span className='text-sm text-gray-400'>{item.people}</span>
            </div>
        ))}
    </div>
  )
}
