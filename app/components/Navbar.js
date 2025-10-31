import React from 'react'
import HDlogo from "../data/HDlogo_1.png"

function Navbar() {
  return (
    <div className='shadow-[0px_2px_16px_0_rgba(0,0,0,0.1)] flex justify-between px-[124px] py-[16px] w-[1440px]'>
      <img src={HDlogo.src} alt="img" />
      <div className='flex gap-[16px] jsutify-center items-center'>
        <input className='w-[340px] px-[16px] py-[12px] bg-[#EDEDED] rounded-[4px] font-Inter text-[14px] font-regular text-[#727272] '/>
        <button className='px-[20px] py-[12px] font-Inter text-[14px] font-medium bg-[#FFD643] rounded-[8px]'>Search</button>
      </div>
    </div>
  )
}

export default Navbar
