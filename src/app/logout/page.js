'use client'

import React from 'react';
import {useEffect,useState } from 'react';
import { API_URL} from '../local';
import { useRouter } from 'next/navigation'

function AccounteEl() {
    const ls = require("local-storage")
  
    const router = useRouter(); 
    const [page,setPage] = useState(1) 

    useEffect(() => {
      ls.set("atkn", "");

      router.push("/")


   
  
    }, [])


  return (
  
<>

{
    
 
    
}

</>


  )
}

export default AccounteEl






















































