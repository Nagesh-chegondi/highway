import React from 'react'
import Link from 'next/link'


function Image(props) {
  return (
    <div className='w-[280px] h-[312px] rounded-[12px] overflow-hidden' > 
      <img className='h-[170px] w-full ' src={props.image} alt="image" />
      <div className='h-[142px] bg-[#F0F0F0] px-[16px] py-[12px] flex flex-col gap-[20px]'>
        <div >
      <div className='flex justify-between'>
      <p className='font-Inter text-[16px] font-medium'>{props.name}</p>
       <p className='px-[8px] py-[4px] bg-[#D6D6D6] rounded-[4px] font-Inter text-[11px] font-medium'>{props.place}</p>
       </div>
       <p className='font-Inter text-[12px] font-regular text-[#6C6C6C]'>Curated small-group experience. Certified guide. Safety first with gear included. </p>
       </div>
       <div className='flex justify-between '>
        <p className='font-Inter text-[12px] font-regular'>from <span className='font-Inter text-[20px] font-medium'>₹{props.price}</span> </p>
       <Link href={ `/details/${props.id.toString()}`}><button className=' px-[8px] py-[6px] rounded-[4px] bg-[#FFD643] font-Inter text-[14px] font-medium'>view details</button></Link> 
       </div>
    </div>
    </div>
  )
}

export default Image
