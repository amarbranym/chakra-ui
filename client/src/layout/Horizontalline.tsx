import React from 'react'
import "../style.css"
const Horizontalline = ({text}:{text?:string}) => {
  return (
    <div className='mt-8 pb-4'>
      <h2 className='font-bold'>
        {text}
      </h2>
      <div className=' h-[1px] bg-gray-700 ' />
    </div>
  )
}

export default Horizontalline
