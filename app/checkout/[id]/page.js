"use client"
import React from 'react'
import Link from 'next/link'
import { use } from 'react'
import { useContest } from '@/app/context/CreateContext'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

function page({params}) {
    const {id}   = use(params)
    const{selectedDate,indexi,detailimage} = useContest();
    const email_ref = useRef()
    const username_ref = useRef()
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    
  async function checkouts(){
    const username = username_ref.current?.value;
    const email = email_ref.current?.value;

    console.log("Form values:", { username, email, place: detailimage?.name, date: selectedDate, slot: indexi });

    if (!username || !email) {
      alert("Please fill in all required fields (name and email)");
      return;
    }

    if (!detailimage) {
      alert('No experience selected');
      return;
    }

    setLoading(true);
    try {
      // 1) create user booking
      const bookingResp = await fetch("/api/booking",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          place: detailimage.name,
          date: selectedDate.toLocaleDateString('en-CA'),
          slot: indexi,
        })
      });

      if (!bookingResp.ok) {
        const errBody = await bookingResp.json().catch(() => null);
        console.error('Booking API error', errBody || bookingResp.status);
        alert(errBody?.message || 'Booking failed');
        return;
      }

      // 2) decrement seat availability
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
        const errBody = await res.json().catch(() => null);
        console.error('Checkout API error', errBody || res.status);
        alert(errBody?.message || 'Checkout failed');
        return;
      }

      const data = await res.json();
      console.log("Booking successful:", data);
      router.push("/confirmed")
      return data;
    } catch (error) {
      console.error("Booking failed:", error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) checkouts();
  }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='ml-[150px] mt-[80px] flex gap-[40px]'>
      
        <div className='cursor-pointer flex gap-[10px] relative left-[130px] top-[-60px] mt-[20px] mb-[20px] h-[25px] justify-center items-center'>
   <Link href={`/details/${id}`} > <img className=' w-[13px] h-[13px]' src="/arrow_back.png" alt="" /></Link>    
        <p className='font-inter text-[14px] font-medium'>Checkout</p>
        </div>
    <div className='w-[739px] bg-[#EFEFEF] h-[200px] px-[24px] py-[20px] rounded-[12px]'>
    

    <div className="flex   gap-4 mb-4">
        
        <div className="flex-1">
            <label htmlFor="full_name" className="block text-sm font-medium text-[#5B5B5B] mb-1">Full name</label>
            <input ref={username_ref} type="text" id="full_name" name="full_name" placeholder="Your name" 
                   className="placeholder:Inter placeholder:text-[14px] placeholder:text[#727272] w-full h-10 px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-150 ease-in-out"
            />
        </div>

        <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#5B5B5B] mb-1">Email</label>
            <input ref={email_ref} type="email" id="email" name="email" placeholder="Your name" 
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
        {isClient && (
        <div className='flex flex-col gap-[10px]'>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Experience <span className='text-[#161616] font-Inter text-[16px] capitalize'>{detailimage?.place}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Date <span  className='text-[#161616] font-Inter text-[16px] capitalize' >{selectedDate.toLocaleDateString('en-GB').split('/').join('-')}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Time <span className='text-[#161616] font-Inter text-[16px] capitalize' >{indexi}</span></p>
            <p className='flex justify-between font-Inter text-[16px] text-[#656565]'>Qty  <span  className='text-[#161616] font-Inter text-[16px] capitalize'>1</span></p>
        </div>
        )}
        <div className='cursor-pointer px-[12px] py-[10px] bg-[#FFD643] text-center rounded-[8px]'>
         <button type='submit' disabled={loading} className='w-full'>
           {loading ? 'Processing...' : 'Pay and Confirm'}
         </button>
        </div>

    </div>
  
    </div>
    </form>
    </>
  )


}

export default page
