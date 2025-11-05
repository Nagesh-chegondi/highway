"use client"
import React from 'react'
import Image from './components/Image'

import { useEffect } from 'react'
import { useState } from 'react'
import { useContest } from './context/CreateContext'


function page() {
  const{producti,setproducti} = useContest()
  useEffect(()=>{
    async function lovedaddy(){
    const response =  await fetch('/api/experience')
    const data = await response.json();
    console.log(data)
    setproducti(data)
    }
    lovedaddy();
  }, [])
  if(producti.length===0){
    return(
      
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>

      
    )
  }
 
  return (
    <div className='flex w-[1440px] flex-wrap gap-y-[32px] gap-x-[20px] mt-[48px] ml-[124px]'>
      {producti.map((prod,index)=>(
        <Image key={prod.id} name={prod.name} place={prod.place} image={prod.image.src} price={prod.price} id={prod.id} />
      ))}
      
    </div>
  )
}

export default page
