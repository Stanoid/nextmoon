
'use client'

import React from 'react'

import { API_URL } from '../local';
import {useState,useContext,useEffect} from "react";
import { Theme } from '../local';
import LoadingBtn from '../comps/loadingbtn';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image';
import { Flip, Slide, toast,ToastContainer } from 'react-toastify'
export default function Login() {
const [emial, setEmial] = useState("");

const [pass, setpass] = useState("");
const [lod, setlod] = useState(0);
// const{loginUser,loading,checkLogged,isLogged} = useContext(AuthContext)
const router = useRouter();
const ls = require("local-storage")


useEffect(()=>{

//  //isLogged(ls.get("atkn"))
//  console.log("aaaa",ls.get("atkn"))

},[])

const handlelogin=()=>{
 setlod(1);
 console.log(loading);
 loginUser(emial,pass)

 

}

   


    return (
        <div style={{
          display:"flex",
          justifyContent:"center",
       padding:20,
          alignItems:"center"
        }}>
           

           <div style={{position:'absolute', bottom:0,right:0,zIndex:0}}>
      <Image  src={'/dec2.svg'} width={200} height={200} />
      </div>
          
            <div className=" text-right  to-indigo-600 flex justify-center flex-col items-center w-full">
 


         
      

    <div style={{zIndex:1,backgroundColor:Theme.secondary}} className=" px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-white ">تسجيل دخول</h1>
       
        <div>
          <label  style={{marginBottom:10}} htmlFor="email" className="block mb-1 text-white font-semibold">البريد الإلكتروني</label>
          <input value={emial}  type="text" onChange={(event)=>{setEmial(event.target.value)}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label style={{marginBottom:10}} htmlFor="email" className="block mb-1 text-white font-semibold">كلمة المرور</label>
          <input type="password" value={pass} onChange={(event)=>{setpass(event.target.value)}} className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>



      <div style={{marginTop:30}}>

      <LoadingBtn act={()=>{alert("login")}} text={"دخول"} lod={lod} />
      {/* <button onClick={()=>{}} className="mt-4 w-full bg-primary text-white py-2 rounded-md text-lg tracking-wide">Login</button> */}
      <button onClick={()=>{router.replace("/register")}} className="mt-4 w-full  text-white py-2 rounded-md text-lg underline tracking-wide"> تسجيل حساب جديد </button>
 

      </div>
    
    </div>
 
</div>
                {/* <div style={{minHeight:'100vh'}}>
                    <div style={{height:100}}></div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
       <input value={emial} placeholder='email' type={"email"} onChange={(event)=>{setEmial(event.target.value)}} />
       <input value={pass}  placeholder='password' type={"password"} onChange={(event)=>{setpass(event.target.value)}} />
       <div onClick={upload}> 
       Login 
               </div>
               
  </div>
                </div> */}
           
        </div>
    )
}
