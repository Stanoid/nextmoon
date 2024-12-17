'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import { TiThMenu } from "react-icons/ti";


import { AuthCon } from '../contexts/AuthCon';


function AccounteEl() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [logged,setLogged] = useState(0)
    const [userData,setUserdata] = useState(null)
    useEffect(() => {
     loginval()
    },[])
    

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

      //  

        
   if(data.id){
   setLogged(1)
   setUserdata(data);
   }else{
  setLogged(0);
  router.push("/login")
  setUserdata(null);
   }
    
     
      });

  }


 

  return (
  
<>

{
    logged?
    <div 
    style={{
        display:"flex",
        padding:10,
        alignItems:"center",
        justifyContent:"space-between",
    }}>



       <div >
       Vendor
       </div>
     

    </div>
    :<> 
     </>
}

</>


  )
}

export default AccounteEl






















































