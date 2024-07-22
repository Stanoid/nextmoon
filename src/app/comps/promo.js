import React from 'react'
import bg from "../../../public/promo.svg"
import { Theme } from '../local';
import logowhite from "../../../public/blk2.jpg";
import Image from 'next/image'

function PromoComp() {

  
  return (
    <div style={{overflow:"hidden"}} className=' h-min w-full group py-3 rounded-sm  
     transition-all ease-soft-spring 
     border-moon-300/50 inline-flex ' >
          <div className='p-1  border-dashed  border-2  border-moon-200 inline-flex ' >
          <div className='p-1 border-dotted border-4 border-moon-100 inline-flex ' >
<div  className="  rounded-sm backgroundSize-140  border-moon-200 bg-[url('../../public/promo.svg')]  "   style={{width:200,
    height:200,overflow:"hidden",backgroundSize:"cover",display:"flex",justifyContent:"center",alignItems:"center"}} > 
  

  <div className="bg-moon-300 rounded-full bg-[url('https://images.unsplash.com/photo-1635447272615-a414b7ea1df4?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] " style={{
    width:"165px",
    height:"165px",
    backgroundSize:"cover"
    
  }} >


{/* <Image src={logowhite} layout={"fill"} objectFit={"cover"} /> */}
{/* 
<div style={{alignSelf:"flex-end",justifySelf:"flex-start",position:"relative",padding:10,borderRadius:"100%",backgroundColor:"red"}} >
    خصم
  </div> */}

  </div>

 
    </div>
    </div>
    </div>
    </div>
    
  )
}

export default PromoComp