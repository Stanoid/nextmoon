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



export default function Product(props) {
  const router = useRouter();
  const [loading,setLoading]= useState(false);
 const [cimg,setCimg] = useState("");


  useEffect(() => {
//getprice();

// }
//console.log("img url", IMG_URL.concat(props.data.img&&JSON.parse(props.data.img)[0])) 


   }, [])

// const getprice = ()=>{
//   for (let i = 0; i < props.data.length; i++) {
    
    
//   }
// }

   


    return (

      
        <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="   overflow-hidden
     rounded-none lg:rounded-xl sm:rounded-none border border-gray-100 bg-white shadow-none lg:shadow-md md:shadow-md sm:shadow-none"  
        style={{display:'block',
        display:"flex",alignItems:"center",justifyContent:"center"
        ,padding:10,textAlign:'left',width:"100%",height:"100%"}}>

<div className=' h-full w-full'  style={{
  
  display:loading?'none':'flex',
  alignItems:"center",justifyContent:"space-between",flexDirection:"column" 
}} >
    
  <div sty className='w-full h-48 min-w-full ' style={{position:"relative"}} >
  <Image quality={20} onClick={()=>{router.push(`/products?pid=${props.data.id}`)}}  className=' rounded-md  ' 
    src={IMG_URL.concat(JSON.parse(props.data.img)[0]?JSON.parse(props.data.img)[0]:JSON.parse(props.data.img)[1])} 
  layout='fill'
  objectFit='cover'
  />
  
  <span    onClick={()=>{router.push(`/categories?cid=${props.data.subcatagory.id}`)}}  className="absolute cursor-pointer bottom-0 left-0 m-2 rounded-full bg-black 
    text-center text-xs p-1 px-3 font-medium text-white">
      {props.data.subcatagory.name_ar  }
      </span>
  <span className="absolute top-0 right-0 p-2 ">
  <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={"إضافة إلى المفضلة"} >
    <Button size='sm'  className='text-white bg-moon-200 rounded-full' variant='shadow' isIconOnly startContent={<FaHeart/>} />
    </Tooltip>
    </span>
{/* </object> */}
    

   
      </div>

      
      <div  onClick={()=>{router.push(`/products?pid=${props.data.id}`)}}  className="mt-1 px-1 pb-2 w-full">

      <h5 dir='rtl' className="text-sm text-right tracking-normal leading-tight text-slate-900">{props.data.name_ar} .</h5>
    
  </div>

  <div className="mt-1 mb-0 flex items-start  w-full flex-col justify-between">
  <div className='flex align-middle justify-end py-2  ' > 
    {props.data.varients&&props.data.varients.map(vari=>(
    
<div className='align-middle justify-center mr-1 '   key={vari.id}>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={vari.color.name_ar} >
<div style={{backgroundColor:vari.color.colorCode}} className=' h-3 w-3 rounded-full  ' >

</div>
</Tooltip>



</div>
))}
    </div>
      <p className='text-right w-full '>
        <span className="text-xl font-bold text-moon-300/75">  {CURRENCY}  {props.data.varients[0].price}</span>
        <span className="text-sm text-moon-200 line-through">  {CURRENCY} {props.data.varients[0].price+20}</span>
      </p>
    
    </div>
    
  {/* <div href="#" className="flex hidden  items-center justify-center rounded-md bg-moon-200 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart</div > */}




      </div>

    
   
    


        </motion.div>
    )
}
