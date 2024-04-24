'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import AddSize from './addSize';
import AddColor from './AddColor';
import { TiThMenu } from "react-icons/ti";
import AddProduct from './addproduct';


import { AuthCon } from '../contexts/AuthCon';


function AccounteEl() {
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [logged,setLogged] = useState(0)
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [userData,setUserdata] = useState(null)
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

  if(data.type==1){
       
  }else{

    router.replace("/login")



    }
  
   }else{
  setLogged(0);
  router.push("/login")

   }
    
     
      });

  }


 

  return (
  
<>

{
    
    <div 
    style={{
    
      padding:5
      
    }}>


      

<ul style={{borderBottom:"2px solid lightgrey",margin:""}} class="flex flex-wrap text-sm font-medium text-center text-gray-500  border-gray-200 dark:border-gray-700 dark:text-gray-400">
<li onClick={()=>{setPage(1)}} class="me-2">
        <a style={{backgroundColor: page==1?"rgb(243 244 246)": "white" ,color:page==1?"rgb(37 99 235)":"grey"}} class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dashboard</a>
    </li>
    
    <li onClick={()=>{setPage(2)}} class="me-2">
        <a  aria-current="page" style={{backgroundColor: page==2?"rgb(243 244 246)": "white" ,color:page==2?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4   active dark:bg-gray-800 dark:text-blue-500">Products</a>
    </li>


     <li onClick={()=>{setPage(10)}} class="me-2">
        <a  style={{backgroundColor: page==10?"rgb(243 244 246)": "white" ,color:page==10?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Add a product</a>
    </li>
   
    <li onClick={()=>{setPage(3)}} class="me-2">
        <a style={{backgroundColor: page==3?"rgb(243 244 246)": "white" ,color:page==3?"rgb(37 99 235)":"grey",cursor:"pointer"}} 
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Sizes</a>
    </li>
    <li onClick={()=>{setPage(4)}} class="me-2">
        <a  style={{backgroundColor: page==4?"rgb(243 244 246)": "white" ,color:page==4?"rgb(37 99 235)":"grey",cursor:"pointer"}} 
        class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Colors</a>
    </li>

    <li onClick={()=>{setPage(5)}} class="me-2">
        <a  style={{backgroundColor: page==5?"rgb(243 244 246)": "white" ,color:page==5?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Categories</a>
    </li>


    <li onClick={()=>{setPage(6)}} class="me-2">
        <a  style={{backgroundColor: page==6?"rgb(243 244 246)": "white" ,color:page==6?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Sub-categories</a>
    </li>

    <li onClick={()=>{setPage(7)}} class="me-2">
        <a  style={{backgroundColor: page==7?"rgb(243 244 246)": "white" ,color:page==7?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Agents</a>
    </li>

    <li onClick={()=>{setPage(8)}} class="me-2">
        <a  style={{backgroundColor: page==8?"rgb(243 244 246)": "white" ,color:page==8?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Sellers</a>
    </li>


    <li onClick={()=>{setPage(9)}} class="me-2">
        <a  style={{backgroundColor: page==9?"rgb(243 244 246)": "white" ,color:page==9?"rgb(37 99 235)":"grey",cursor:"pointer"}}
         class="inline-block p-4  hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Users</a>
    </li>
  
</ul>


<div style={{padding:10}}>
{page==1 ? <AddProduct/> :<></>}
  {page==2 ? <AddProduct/> :<></>}
  {page==3 ? <AddSize/> :<></>}
  {page==4 ? <AddColor/> :<></>}

  
  




</div>



     

    </div>
    
}

</>


  )
}

export default AccounteEl






















































