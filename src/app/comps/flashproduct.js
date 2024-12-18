'use client'

import React from 'react'

import Styles from "../styles/Home.module.css"
import { Theme,CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState,useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { FaHeart } from 'react-icons/fa6'
import { MAIN_STYLE } from '../styles/style'
import Head from 'next/head'
import { BsStarFill,BsCheck2Circle,BsCheckCircleFill,BsCartPlusFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'


export default function Product(props) {
  const router = useRouter();
  const [loading,setLoading]= useState(false);
 const [cimg,setCimg] = useState("");
const [colors,setColors]= useState(null)

  useEffect(() => {
//getprice();

// }
//
colorDisplay();


   },[])

   const colorDisplay = ()=>{
    var colo = []
    var colob = []
  
  for (let i = 0; i < props.data.varients.length; i++) {
   
    if(colo.includes(props.data.varients[i].colors[0].id)){
  
    }else{
      colo.push(props.data.varients[i].colors[0].id);
      colob.push(props.data.varients[i].colors[0]);
      
    }
    
  }
  
  
  setColors(colob);
  }

// const getprice = ()=>{
//   for (let i = 0; i < props.data.length; i++) {
    
    
//   }
// }

   


    return (

      
        <div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="   overflow-hidden
   "  
        style={{display:'block',
        display:"flex",alignItems:"center",justifyContent:"center"
        ,padding:10,textAlign:'left',width:"100%",height:"100%"}}>

<div className=' h-full w-full'  style={{
  
  display:loading?'none':'flex',
  alignItems:"center",justifyContent:"space-between",flexDirection:"row-reverse"
}} >
    
  <div sty className='w-full h-48  ' style={{position:"relative"}} >
  {/* <Image  fill objectFit='cover'
  quality={50}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"    className=' rounded-md  '  src={props.data&&IMG_URL.concat(JSON.parse(props.data.img)[0]?JSON.parse(props.data.img)[0]:JSON.parse(props.data.img)[1])} 
 
  /> */}

<CldImage

  onClick={()=>{router.push(`/products?pid=${props.data.id}`)}}
  fill objectFit='cover'
   className='no-select no-drag rounded-md  ' 
  src={JSON.parse(props.data.img)[0].id}
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description of my image"
/>
  
  <span     className="absolute cursor-pointer bottom-0 left-0 m-2 rounded-full bg-moonsec-200/80 
    text-center text-xs p-1 px-3 tracking-tight whitespace-nowrap font-medium text-white">
      {props.data.subcatagory.name_ar  }
      </span>

{/* </object> */}
    

   
      </div>

      
      <div   className=" flex flex-col justify-center items-center">

   
      <h5  className="text-base  
        tracking-normal  text-white bg-moon-200 inline font-bold px-4 py-1  rounded-full ">{props.data&&props.data.code} </h5>


      <div className='flex align-middle items-center   justify-center py-2  ' > 
   
      {colors&&colors.map((color,index)=>(
                
                <div className='align-middle w-full justify-center mr-1 '   key={color.id}>
                    <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar} >
                     <div style={{backgroundColor:color.colorCode}} className=' h-3 w-3 rounded-full  ' >
                     
                     </div>
                     </Tooltip>
                    </div>
           
               ))}

    </div>
<div className=' w-full' >
<p className='text-right w-full  '>
        <span className="text-xl font-bold text-moon-300/75">   {props.data.varients[0].price}  </span>  <span className='text-gray-500 mx-0.5 italic text-xs' >{CURRENCY}</span>
        <span className="text-sm text-moon-200 line-through">   {props.data.varients[0].price+20} <span className='text-gray-500 mx-0.5 italic text-xs' >{CURRENCY}</span> </span>
      </p>
  
</div>

<div  onClick={()=>{router.push(`/products?pid=${props.data.id}`)}}  className="flex    items-center justify-center rounded-md bg-moon-200 m-3 px-2 py-2 text-center text-xs whitespace-nowrap font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
        
      <span  className='mr-1' > إضافةألى السلة </span> 
        
          </div >
    
  </div>

  {/* <div className=" flex items-start   w-full flex-col justify-between">

    
    
    </div> */}
    
  




      </div>

    
   
    


        </div>
    )
}
