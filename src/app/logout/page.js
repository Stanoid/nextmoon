'use client'

import React from 'react';
import {useEffect,useState } from 'react';
import { API_URL} from '../local';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import {logout} from "../lib/actions/counterAction"
function AccounteEl() {
    const ls = require("local-storage")
    const dispatch = useDispatch();
    const router = useRouter(); 
    const [page,setPage] = useState(1) 

    useEffect(() => {
    dispatch(logout());
      router.push("/login")


   
  
    })


  return (
  
<>

{
    
 
    
}

</>


  )
}

export default AccounteEl






















































