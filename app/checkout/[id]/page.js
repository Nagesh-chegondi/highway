"use client"
import React from 'react'
import Link from 'next/link'
import { use } from 'react'
import { useContest } from '@/app/context/CreateContext'

function page({params}) {
    const {id}   = use(params)
    const{selectedDate,indexi,detailimage} = useContest();
    
  async function checkouts(){
    if(!detailimage) {
      console.error("No detail image data available");
      return;
    }

    try { 
        console.log("hijnsdkjnjdf")
        console.log(detailimage)
        console.log(detailimage.name)
        console.log("vaishnavi")
      const res = await fetch('/api/checkouts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          place: detailimage.name,
          date: selectedDate.toLocaleDateString('en-CA'),
          slot: indexi
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Booking successful:", data);
      return data;
    } catch (error) {
      console.error("Booking failed:", error);
      // You might want to show an error message to the user here
    }
  }
  
  return (
    <>
    <div className='ml-[150px] mt-[80px] flex gap-[40px]'>
        <div className='cursor-pointer flex gap-[10px] relative left-[130px] top-[-60px] mt-[20px] mb-[20px] h-[25px] justify-center items-center'>
   <Link href={`/details/${id}`} > <img className=' w-[13px] h-[13px]' src="/arrow_back.png" alt="" /></Link>    
        <p className='font-inter text-[14px] font-medium'>Checkout</p>
        </div>
    <div className='w-[739px] bg-[#EFEFEF] h-[200px] px-[24px] py-[20px] rounded-[12px]'>
    <form action="#" >

    <div className="flex   gap-4 mb-4">
        
        <div className="flex-1">
            <label htmlFor="full_name" className="block text-sm font-medium text-[#5B5B5B] mb-1">Full name</label>
            <input type="text" id="full_name" name="full_name" placeholder="Your name" 
                   className="placeholder:Inter placeholder:text-[14px] placeholder:text[#727272] w-full h-10 px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-150 ease-in-out"
            />
        </div>

        <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#5B5B5B] mb-1">Email</label>
            <input type="email" id="email" name="email" placeholder="Your name" 
                   className=" placeholder:Inter placeholder:text-[14px] placeholder:text[#727272]  w-full h-10 px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-150 ease-in-out"
            />
        </div>
    </div>

    <div className="flex mb-4 gap-[16px]">
        <input type="text" id="promo_code" name="promo_code" placeholder="Promo code" 
               className=" placeholder:Inter placeholder:text-[14px] placeholder:text[#727272]  flex-1 h-10 px-[16px] py-[12px] text-gray-700 bg-gray-200 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-150 ease-in-out"
        />
        <button type="button" 
                className="bg-gray-800 text-white font-semibold h-10 px-4 rounded-r-md 
                       hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
            Apply
        </button>
    </div>

    <div className="flex items-center mb-4">
        <input id="terms_checkbox" name="terms_agreed" type="checkbox" required
               className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms_checkbox" className="ml-2 block text-sm text-[#5B5B5B] select-none">
            I agree to the terms and safety policy
        </label>
    </div>
    
    </form>
    </div>
    <div className='w-[387px] px-[24px] py-[24px] bg-[#EFEFEF] flex flex-col gap-[16px] rounded-[12px]'>
        <div className='flex flex-col gap-[10px]'>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Experience <span className='text-[#161616] font-Inter text-[16px] capitalize'>{detailimage?.place}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Date <span  className='text-[#161616] font-Inter text-[16px] capitalize' >{selectedDate.toLocaleDateString('en-GB').split('/').join('-')}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Time <span className='text-[#161616] font-Inter text-[16px] capitalize' >{indexi}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Qty  <span  className='text-[#161616] font-Inter text-[16px] capitalize'>1</span></p>
        </div>
        <div className='flex flex-col gap-[10px]'>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Subtotal <span className='text-[#161616] font-Inter text-[16px] capitalizetext-[#161616] font-Inter text-[16px] capitalize'>999</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Taxes    <span className='text-[#161616] font-Inter text-[16px] capitalizetext-[#161616] font-Inter text-[16px] capitalize'>59</span></p>
        </div>
        <div className='h-[1px] bg-[#D9D9D9]'></div>
        <p className='font-Inter text-[20px] font-medium flex justify-between'>Total <span>958</span></p>
        <div className='cursor-pointer px-[12px] py-[10px] bg-[#FFD643] text-center rounded-[8px]'>
         <Link href={'/confirmed'}><button onClick={()=>checkouts()}>Pay and Confirm</button> </Link>   
            </div>

    </div>
    </div>
    </>
  )


}

export default page
