'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';

const Orders = dynamic(() => import('./orders'))


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

      

        
  if(data.id){   

  if(data.type==5){
       
  }else{

    router.replace("/login")



    }
  
   }else{
 
 

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


      

<ul style={{borderBottom:"2px solid lightgrey",paddingBottom:5}} className="flex flex-wrap scrollable-content 
 text-sm font-medium text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400">
<li onClick={()=>{setPage(1)}} className="me-1">
        <a style={{backgroundColor: page==1?"rgb(243 244 246)": "white" ,color:page==1?"rgb(37 99 235)":"grey",cursor:"pointer"}} className="inline-block 
        p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dashboard</a>
    </li>
    
    {/* <li onClick={()=>{setPage(2)}} className="me-1">
        <a  aria-current="page" style={{backgroundColor: page==2?"rgb(243 244 246)": "white" ,color:page==2?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         className="inline-block p-3   active dark:bg-gray-800 dark:text-blue-500">Products</a>
    </li>


   
    <li onClick={()=>{setPage(3)}} className="me-1" >
        <a style={{backgroundColor: page==3?"rgb(243 244 246)": "white" ,color:page==3?"rgb(37 99 235)":"grey",cursor:"pointer"}} 
         className="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Sizes</a>
    </li>
  



    <li onClick={()=>{setPage(9)}} className="me-1">
        <a  style={{backgroundColor: page==9?"rgb(243 244 246)": "white" ,color:page==9?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         className="inline-block p-3  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Users</a>
    </li>
   */}
</ul>


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






















































