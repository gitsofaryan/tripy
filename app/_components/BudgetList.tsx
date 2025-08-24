import React from 'react'
export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        color: 'bg-yellow-100 text-yellow-600'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don’t worry about cost',
        icon: '💎',
        color: 'bg-purple-100 text-purple-600'
    }
]
export default function BudgetList({ onSelectedOption }: any) {
  return (
   <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
           {SelectBudgetOptions.map((item,index)=>(
               <div key={index} className='border p-3 rounded-lg hover:border-primary cursor-pointer'
               onClick={()=>onSelectedOption(item.title+":"+item.desc)}
               >
                   <div className='text-xl p-3 rounded-full'>{item.icon}</div>
                   <h3 className='font-semibold text-md mt-2'>{item.title}</h3>
                   <p className='text-sm text-gray-500'>{item.desc}</p>
          
               </div>
           ))}
       </div>
  )
}
