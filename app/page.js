"use client"
import React from 'react'
import Image from './components/Image'

import { useEffect } from 'react'
import { useState } from 'react'


function page() {
  const [products,setproducts]  = useState([])
  useEffect(()=>{
    async function lovedaddy(){
    const response =  await fetch('/api/experience')
    const data = await response.json();
    console.log(data)
    setproducts(data)
    }
    lovedaddy();
  }, [])
  if(!products){
    return(
      <p>loading....</p>
    )
  }
  return (
    <div className='flex w-[1440px] flex-wrap gap-y-[32px] gap-x-[20px] mt-[48px] ml-[124px]'>
      {products.map((prod,index)=>(
        <Image key={index} name = {prod.name} place = {prod.place} image = {prod.image.src} price = {prod.price} id = {prod.id} />
      ))}
      
    </div>
  )
}

export default page
