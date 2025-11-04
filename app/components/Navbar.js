"use client"
import React, { useEffect } from 'react'
import HDlogo from "../data/HDlogo_1.png"
import { useState } from 'react'
import { useContest } from '../context/CreateContext'

function Navbar() {
  const {producti,setproducti} = useContest();
  const[valuee,setvaluee] = useState('')
  async function filterate(){
    const res = await fetch("/api/experience")
    const data = await res.json();
    console.log(data)
    setproducti(data)
    if(valuee ===""){
      setproducti(data)
    }
    else{
   setproducti(prev => prev.filter(
  item => item.name.toLowerCase().includes(valuee.trim().toLowerCase())
 || item.place.toLowerCase().includes(valuee.trim().toLowerCase())
   

));
    }
    console.log("yes")
    console.log(valuee)
    
  }
  useEffect(() => {
  console.log("Updated producti:", producti);
}, [producti]);

  useEffect(()=>{
    const timer = setTimeout(() => {
      filterate();
    }, 300);
    return () => clearTimeout(timer);
  },[valuee])
  return (
    <div className='shadow-[0px_2px_16px_0_rgba(0,0,0,0.1)] flex justify-between px-[124px] py-[16px] w-[1440px]'>
      <img src={HDlogo.src} alt="img" />
      <div className='flex gap-[16px] jsutify-center items-center'>
        <input onChange={(e)=>setvaluee(e.target.value)} className='w-[340px] px-[16px] py-[12px] bg-[#EDEDED] rounded-[4px] font-Inter text-[14px] font-regular text-[#727272] '/>
        <button className='px-[20px] py-[12px] font-Inter text-[14px] font-medium bg-[#FFD643] rounded-[8px]'>Search</button>
      </div>
    </div>
  )
}

export default Navbar
