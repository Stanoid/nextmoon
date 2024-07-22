'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import Orders from './orders';
import { AuthCon } from '../contexts/AuthCon';


function AccounteEl() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 

    useEffect(() => {
     loginval();
   
  
    }, [])



    

    async function loginvalHandler(){
      console.log("aaaa",loginval())
      loginval.then(function(result) {
       console.log("aaaa",result)
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

      console.log("aaaaaaaaaaaaaaaaaaaaaaa",data)

        
  if(data.id){   

  if(data.type==4){
       
  }else{

    router.replace("/login")



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
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






















































