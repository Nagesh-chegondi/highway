"use client"
import React from 'react'
import { createContext, useState, useContext, useEffect } from 'react'
 const ContextContexti = createContext();
 

 export function CreateContext({children}) { 
  const[detailimage,setdetailimage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('detailimage');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  })
     const[producti,setproducti] = useState([])
       const [slotdata, setslotdata] = useState([]);
       const [slotinfo, setslotinfo] = useState([]);
         const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
           const slots =["7AM","9AM","11AM","1PM"]
            const[indexi,setindex] = useState(slots[0]);

              useEffect(() => {
    const saveddetail = localStorage.getItem("detail");
    if (saveddetail) {
      setdetailimage(JSON.parse(saveddetail));
    }
  }, []);

  // ✅ Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("detail", JSON.stringify(detailimage));
  }, [detailimage]);
            useEffect(()=>{
               console.log("this is the pace at which this is going to happen and iam here jsdokfvjdfnfjvnfdjnjfn")
            })

            useEffect(() => {
              return () => {
                localStorage.removeItem('detailimage');
              };
            }, []);
  return (
      <ContextContexti.Provider value={{ producti, setproducti ,slotdata,setslotdata,slotinfo,setslotinfo,slots,indexi,setindex,selectedDate,setSelectedDate,detailimage,setdetailimage }}>
      
      {children}
    </ContextContexti.Provider>
  )
}

export function useContest() {
  return useContext(ContextContexti);
}
