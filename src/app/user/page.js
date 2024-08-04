'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
//import Orders from './orders';
import dynamic from 'next/dynamic';
import { AuthCon } from '../contexts/AuthCon';

const Orders = dynamic(() => import('./orders'))

function AccounteEl() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 

    useEffect(() => {
     loginval();
   
  
    }, [])



    

    async function loginvalHandler(){
      
      loginval.then(function(result) {
       
    });
    }
 
    



    
   const loginval = ()=>{


    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + ls.get("atkn")
      },
    
  };

    fetch(`${API_URL}users/me`, requestOptions)
      .then((response) => response.json())
      .then((data) => {


      });

  }



  const handleEdit = (pageid,id)=>{

    setPid(id)

   setPage(pageid)


  }

  
 

  return (
  
<>

{
    
    <div 
    style={{
    
      padding:0,
      textWrap:"nowrap"
      
    }}>





<div>
{page== undefined ? <div/> :<></>}
  {page==1 ? <Orders setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
 
</div>



    </div>
    
}

</>


  )
}

export default AccounteEl






















































