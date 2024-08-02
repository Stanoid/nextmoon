import React from 'react'
import { Tooltip } from '@nextui-org/react';
import { useEffect,useState,useMemo } from 'react';
import { IMG_URL } from '../local';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CURRENCY } from '../local';
import Image from 'next/image';
function ProductCopm(props) {
 const router = useRouter();


useEffect(() => {

//

}, [])


  return (
    <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    
    onClick={()=>{router.push(`/products?pid=${props.data.id}`)}} dir='rtl' className=" m-0 lg:m-2 sm:m-2 w-full overflow-hidden
    ">
  <div className="relative mx-3 mt-3 flex h-min overflow-hidden rounded-md lg:rounded-lg" href="#">
    {/* <img  className="object-cover  h-60 "
     src={IMG_URL.concat(JSON.parse(props.data.img)[0]?JSON.parse(props.data.img)[0]:JSON.parse(props.data.img)[1])} alt="product image" /> */}
  <div className=' w-full h-60' style={{position:"relative"}} >
  <Image  fill objectFit='cover'
  quality={40}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={IMG_URL.concat(JSON.parse(props.data.img)[0]?JSON.parse(props.data.img)[0]:JSON.parse(props.data.img)[1])} 

  />
  </div>
    <span className="absolute top-0 left-0 m-2 rounded-full bg-black  text-center text-xs italic tracking-tighter p-1 px-3 font-medium text-white">39% خصم</span>
  </div>
  
  
  
  
  <div className="mt-4 px-3 pb-5">
    <a href="#">
      <h5 className="text-md tracking-tight text-slate-900">{props.data.name_ar.slice(0,40)+"..." }</h5>
    </a>


    <div className='flex align-middle justify-end py-2 ' > 
    {props.data.varients&&props.data.varients.map(vari=>(
    
<div className='align-middle justify-center px-1 '   key={vari.id}>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={vari.color.name_ar} >
<div style={{backgroundColor:vari.color.colorCode}} className=' h-3 w-3 rounded-full  ' >

</div>
</Tooltip>



</div>
))}
    </div>
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-xl font-bold text-moon-300/75">  {CURRENCY}  {props.data.varients[0].price}</span>
        <span className="text-sm text-moon-200 line-through">  {CURRENCY} {props.data.varients[0].price+20}</span>
      </p>
    </div>
   
    
    <a  onClick={()=>{router.push(`/products?pid=${props.data.id}`)}} className="flex  items-center justify-center rounded-md bg-moon-200 px-5 py-2.5 text-center text-sm
     font-medium text-white hover:bg-gray-700  focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
        <span  className='mr-2' > إضافة ألى السلة </span> </a >
  </div>
</motion.div>



  )
}

export default ProductCopm