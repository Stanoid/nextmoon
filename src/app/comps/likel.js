import React from 'react'
import { motion } from 'framer-motion'
import Image from "next/image"
import {CURRENCY} from '../local'
import { useRouter } from 'next/navigation'
import { BsX } from 'react-icons/bs'
function LikeEl(props) {

    const router = useRouter();
    return (
<a href={`/products?pid=${props.id}`} >
    <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
     //onClick={()=>{revalidatePath('/products?pid=${props.id}') ; props.closeModal()}}
       onClick={()=>{ router.refresh(); router.push(`/products?pid=${props.id}`);  props.closeModal()}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }} key={props.index} className='flex flex-row my-3 shadow-md rounded-sm p-2 justify-between align-middle ' > 
  
    <div sty className='w-20 h-20 min-w-20  ' style={{position:"relative"}} >
      <Image fill objectFit='cover'
      alt={props.name}
      quality={25}
       onClick={()=>{router.push(`/products?pid=${props.id}`)}}  className=' rounded-md  ' 
        src={props.img} 
    
      />
      
    {/* </object> */}
        
    
       
          </div>
      
    <div className='flex flex-col px-2' dir='rtl' >
               <div className='text-gray-400 text-lg'>
               {props.name.length>10?props.name.slice(0,40)+"...":props.name }
               </div>
               <div className='text-black font-bold' >
{props.price} {CURRENCY}
      </div>
                 </div>

                 <div
      onClick={()=>{alert("TODO: remove from likes")}}
      style={{display:props.order?"none":"flex",alignItems:"center",justifyContent:"center",borderRight:"0px solid lightgrey",paddingRight:10}}>
        <div style={{backgroundColor:"red",padding:2.5,borderRadius:100}}>
        <BsX style={{color:"white",fontSize:25}} />
        </div>
  
      </div>
                
                </motion.div>
                </a>
  )
}

export default LikeEl