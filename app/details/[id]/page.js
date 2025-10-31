"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { use } from 'react'
import Link from 'next/link'

function page({params}) {
    const[producti,setproducti] = useState()
    const {id} = use(params)
     const [selectedDate, setSelectedDate] = useState(null);

  // Generate next 5 days (including today)
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });
    const formatDate = (date) =>
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

    useEffect(()=>{
        async function getdata(){
         const res = await fetch('/api/experience');
         const data = await res.json();
         const prod = data.find((item)=>item.id.toString()===id);
         console.log(prod)
         setproducti(prod)
         console.log(producti)

        }
        getdata();
    },[id])
    if(!producti){
        return(
            <p>loading.....</p>
        )
    }

  return (
    <div className='mt-[24px] ml-[124px] h-[980px] w-[1440px]'>
         <div className='flex gap-[40px]'>
         <div>
         <div className='flex justify-center items-center w-[74px] gap-[8px] '>
            <img className='w-[12px] h-[12px]' src="/arrow_back.png" alt="arrow" />
            <p className='font-Inter text-[14px] font-medium'>Details</p>
         </div>
        
         <img className='w-[765px] h-[381px] rounded-[12px]' src={producti.image.src} alt="image" />
         </div>
         <div className='w-[387px] h-[305px] p-[24px] rounded-[12px] mt-[20px] bg-[#EFEFEF] box-border'>
          <div className='flex flex-col gap-[20px]'>
         <p className=' flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Starts at <span>999</span></p>
            
                <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565] '>Quantity <span>- <span>1</span>+ </span> </p>
                <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Subtotal <span>999</span></p>
                <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Taxes <span>59</span></p>
            <div className='h-[1px] w-full bg-[#D9D9D9]'></div>
                <p className='flex justify-between font-Inter text-[16px] font-regular text-[#656565]'>Total <span>958</span></p>
          </div>
         <Link href={"/checkout/efkmf"}><button className='w-[339px] bg-[#FFD643] px-[20px] py-[12px] rounded-[8px]'>Confirm</button></Link> 
         
          
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
        const isSelected = selectedDate === dateString;

        return (
          <button
            key={dateString}
            onClick={() => setSelectedDate(dateString)}
            className={`px-[12px] py-[8px] rounded-[4px] 
              ${
                isSelected
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
                        <div  className='flex flex-col gap-[12px]'>
                        <div className='flex gap-[16px]'>
                        <p className='px-[12px] py-[8px] box-border border-[0.6px] border-solid border-[#BDBDBD] rounded-[4px]'>07:00 am <span>4 left</span></p>
                        <p className='px-[12px] py-[8px] box-border border-[0.6px] border-solid border-[#BDBDBD] rounded-[4px]'>09:00 am <span>4 left</span></p>
                        <p className='px-[12px] py-[8px] box-border border-[0.6px] border-solid border-[#BDBDBD] rounded-[4px]'>11:00 am <span>4 left</span></p>
                        <p className='px-[12px] py-[8px] box-border border-[0.6px] border-solid border-[#BDBDBD] rounded-[4px]'>1:00 am <span>4 left</span></p>
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

export default page
