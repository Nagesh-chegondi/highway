import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div className='flex justify-center mt-[60px] '>
    <div className='flex flex-col gap-[20px] text-center w-[300px] justify-center items-center ' >
     <img className='w-[70px] h-[70px]' src="/Tick.png" alt="" />
     <p className='font-Inter text-[32px] font-medium'>Booking Confirmed</p>
     <p className='font-Inter text-[20px] text-[#656565] '>Ref ID: HUF56&SO</p>
    <Link href={'/'}><div className='px-[16px] py-[8px] rounded-[4px] bg-[#E3E3E3]'><button className='font-Inter text-[16px] text-[#656565]'>Back to Home</button></div></Link> 
    </div>
    </div>
  )
}

export default page


