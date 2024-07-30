'use client'

import React from 'react';
import {useEffect,useState } from 'react';
import { API_URL} from '../local';
import { Button } from '@nextui-org/react';
import { FaCheckCircle,FaListAlt,FaShoppingBasket } from 'react-icons/fa';
import { useRouter } from 'next/navigation'
import { BiFontSize } from 'react-icons/bi';
import { motion } from 'framer-motion';
function AccounteEl() {
    const ls = require("local-storage")
  
    const router = useRouter(); 
    const [page,setPage] = useState(1) 

    // useEffect(() => {
    //   ls.set("atkn", "");

    //   router.push("/")


   
  
    // }, [])


  return (
  
<>
<div dir="rtl" className=' flex items-center text-center p-14 flex-col justify-center'>
<div className='text-green-500' style={{fontSize:"10rem"}} >  
<FaCheckCircle/>
</div>

<div className='font-bold mt-4' >
تمت عملية الدفع بنجاح
</div>
<div className='font-normal' >
   يمكنك متابعة التسوق او عرض الطلب في حسابك .
</div>


<div className='mt-4 flex justify-center items-center'>

<motion.div className='flex-grow p-0 sm:px-0 lg:px-3 flex align-middle justify-end ml-2' whileTap={{ scale: 1.03 }}>
      {/* <LoadingBtn act={()=>{router.push("/login")} } color={Theme.primary} textColor={"white"} icon={<FaLock  />} text={"تسجيل دخول"}  /> */}
     <Button onClick={()=>{router.push("/user")} } variant="shadow" className="text-white text-xs rounded-lg
      bg-gray-600 font-bold shadow-md" endContent={<FaListAlt />}> عرض الطلبات </Button>
     </motion.div>

     <motion.div className='flex-grow p-0 sm:px-0 lg:px-3 flex align-middle justify-end ml-2' whileTap={{ scale: 1.03 }}>
      {/* <LoadingBtn act={()=>{router.push("/login")} } color={Theme.primary} textColor={"white"} icon={<FaLock  />} text={"تسجيل دخول"}  /> */}
     <Button onClick={()=>{router.push("/")} } variant="shadow" className="text-white text-xs rounded-lg
      bg-moon-200 font-bold shadow-md" endContent={<FaShoppingBasket />}>  متابعة التسوق </Button>
     </motion.div>


</div>
</div>





</>


  )
}

export default AccounteEl






















































