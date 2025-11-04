"use client"
import React from 'react'
import { createContext ,useState , useContext } from 'react'
 const ContextContexti = createContext();

 export function CreateContext({children}) {
     const[producti,setproducti] = useState([])
       const [slotdata, setslotdata] = useState([]);
       const [slotinfo, setslotinfo] = useState([]);
         const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
           const slots =["7:00 am","9:00 am","11:00 am","1:00 am"]
            const[indexi,setindex] = useState(slots[0]);
  return (
      <ContextContexti.Provider value={{ producti, setproducti ,slotdata,setslotdata,slotinfo,setslotinfo,slots,indexi,setindex }}>
      {children}
    </ContextContexti.Provider>
  )
}

export function useContest() {
  return useContext(ContextContexti);
}
