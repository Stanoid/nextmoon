'use client'

import React from 'react';
import {useEffect,useState,useRef } from 'react';
import { API_URL} from '../local';
import { Button } from '@nextui-org/react';
import { FaCheckCircle,FaListAlt,FaShoppingBasket } from 'react-icons/fa';
import { clearCart } from '../lib/actions/counterAction';
import { useRouter } from 'next/navigation'
import { BiFontSize } from 'react-icons/bi';
import { useSelector,useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

function AccounteEl() {
    const ls = require("local-storage")
  const [lod,setLod] =useState(false)
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);
    const router = useRouter(); 
    const dispatch = useDispatch();
    const [page,setPage] = useState(1) 
    const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    useEffect(() => {
      dispatch(clearCart([]))    

      // if (firstRenderRef.current) {
      //   firstRenderRef.current = false;
      //   orderhandler(getQueryVariable("orderid"));
      // } else {
      //   //orderhandler(getQueryVariable("orderid"));
      //   setRefr(false);        
      // }
    },[])

const orderhandler = (orid)=>{
//setRefr(false);


  console.log(orid);
setLod(true);
  const requestOptions = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' +  isLogged.data.jwt
    },
    body: JSON.stringify({
       oid: orid,
      })
  };
  fetch(`${API_URL}orders?func=orderProccessor`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
   setLod(false);
 
 // window.location= data.url;
    }).then(()=>{
      
    });


}

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      
    }



  return (
  
<>

{lod?

<div className='h-80' style={{
  display:lod?'flex':'none' ,
  alignItems:"center",
  
  flexDirection: "column",
  justifyContent:"center"
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>

      <div className='flex justify-center items-center text-lg font-bold text-moon-200 ' > الرجاء الإنتظار </div>
</div>
:<div dir="rtl" className=' flex items-center text-center p-14 flex-col justify-center'>
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
</div>}






</>


  )
}

export default AccounteEl






















































