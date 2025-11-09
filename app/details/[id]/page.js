"use client"
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { CreateContext } from '../../context/CreateContext'
import { useContest } from '../../context/CreateContext'
import Image from 'next/image'
import { use } from 'react'

function Page({ params }) {
  const {id} = use(params)
  const {producti,setproducti,slots,indexi,setindex,selectedDate,setSelectedDate,slotdata,setslotdata,slotinfo,setslotinfo,detailimage,setdetailimage} = useContest()
  
  // Generate next 5 days (including today)
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });
  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  useEffect(() => {

    async function getSlots() {
      try {
        const res = await fetch("/api/auto");
        if (!res.ok) throw new Error("Failed to fetch slots");
        const data = await res.json();
        console.log("Slots data:", data);
        setslotdata(data.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    }
    getSlots();
  },[])
  useEffect(() => {
    console.log('hi')
    console.log(slotinfo)
    console.log('bye')
    console.log(slotinfo[0])
    if (slotinfo.length > 0) {
      console.log(slotinfo[0].bookedSeats);
    } else {
      console.log('o')
    }
  }, [slotinfo])
  useEffect(() => {
    if (selectedDate && slotdata.length > 0) {
      const formatted = selectedDate.toLocaleDateString('en-CA');
      const numberofslots = slotdata.filter(slot => slot.date === formatted);
      setslotinfo(numberofslots);
      
      console.log("Formatted date:", formatted);
      console.log("Filtered slots:", numberofslots);
    }
  }, [slotdata, selectedDate])

   useEffect(() => {
    async function getdata() {
      const res = await fetch('/api/experience',)
       
      const data = await res.json();
        const prod = data.find((item) => item.id.toString() === id);
      console.log( "rebel",prod)
      setdetailimage(prod);
      localStorage.setItem('detailimage', JSON.stringify(prod));

    }
  if(id)  getdata();
  }, [id])

  useEffect(()=>{
console.log("hey i got you");
console.log(producti);
},[producti])
    
  

  if (!detailimage || !detailimage.image) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className='mt-[24px] ml-[124px] h-[980px] w-[1440px]'>
      <div className='flex gap-[40px]'>
        <div>
          <div className='cursor-pointer flex justify-center items-center w-[74px] gap-[8px] mt-[20px] mb-[20px] '>
           <Link href={'/'}><img className='w-[12px] h-[12px]' src="/arrow_back.png" alt="arrow" /></Link> 
            
            <p className='font-Inter text-[14px] font-medium'>Details</p>
          </div>

          {detailimage && detailimage.image && (
            <img className='w-[765px] h-[381px] rounded-[12px]' src={detailimage.image.src} alt="image" />
          )}
          
        </div>
        <div className='w-[387px] h-[305px] p-[24px] rounded-[12px] mt-[60px] bg-[#EFEFEF] box-border'>
          <div className='flex flex-col gap-[20px]'>
            <p className=' flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Starts at <span>999</span></p>

            <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565] '>Quantity <span>- <span>1</span>+ </span> </p>
            <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Subtotal <span>999</span></p>
            <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Taxes <span>59</span></p>
            <div className='h-[1px] w-full bg-[#D9D9D9]'></div>
            <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Total <span>958</span></p>
          </div>
          <Link href={`/checkout/${id}`}><button className='w-[339px] bg-[#FFD643] px-[20px] py-[12px] rounded-[8px]'>Confirm</button></Link>


        </div>
      </div>
      <div className='mt-[32px] w-[765px] flex flex-col gap-[32px]'>
        <div className='flex flex-col gap-[16px]  '>
          <p className='font-Inter text-[24px] font-medium capitalize'>{producti.name}</p>
          <p className='font-Inter text-[16px] text-[#6C6C6C]'>Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.</p>
        </div>
        <div className='flex flex-col gap-[24px]'>
          <div className='flex flex-col gap-[12px]'><p>Choose date</p>
            <div className="flex gap-[16px]">
              {dates.map((date) => {
                const dateString = date.toDateString();
                const isSelected = selectedDate.toDateString() === date.toDateString();

                return (
                  <button
                    key={dateString}
                    onClick={() =>{ setSelectedDate(date);
                      setindex(slots[0]);
                    }}
                    className={`cursor-pointer px-[12px] py-[8px] rounded-[4px] 
              ${isSelected
                        ? "bg-[#FFD643] transfrorm duration-500 ease-in-out"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                  >
                    <div className="font-semibold">{formatDate(date)}</div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className='flex flex-col gap-[12px]'>
            <p>Choose time</p>
            <div className='flex flex-col gap-[12px]'>
              <div className='flex gap-[16px]'>
                {slots.map((item,index)=>{
                  const isActiva = indexi===slots[index]
                  return(
                   < button onClick={()=>setindex(slots[index])} key={index} className= {` ${isActiva?"bg-[#FFd643]":"bg-gray-100"} ${isActiva?"border-none":"box-border border-[0.6px] border-solid border-[#BDBDBD]"} px-[12px] py-[8px]  rounded-[4px] `}>{item}<span className={`   ${(100 - (slotinfo[0]?.bookedSeats || 0)) > 10
                    ? "text-green-500 border-green-400"
                    : "text-red-500 border-red-400"
                  }`}> {100 - (slotinfo[0]?.bookedSeats || 0)}  left</span></button>
                )})}
              </div>
              <p className='font-Inter text-[12px] font-regular text-[#838383]'>All times are in IST (GMT +5:30)</p>
            </div>
          </div>
          <div className='flex flex-col gap-[12px]'>
            <p className='font-Inter text-[18px] font-medium'>About</p>
            <p className='font-Inter text-[12px] px-[12px] py-[8px] rounded-[4px] bg-[#EEEEEE] text-[#838383] '>Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
          </div>
        </div>


      </div>
    </div>


  )
}

export default Page
