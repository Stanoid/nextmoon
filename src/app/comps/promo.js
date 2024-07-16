import React from 'react'
import bg from "../../../public/promo.svg"
import { Theme } from '../local';
import logowhite from "../../../public/blk2.jpg";
import Image from 'next/image'

function PromoComp() {
  return (
    <div style={{overflow:"hidden"}} className=' group rounded-sm hover:bg-moon-100   hover:shadow-2xl transition-all ease-soft-spring hover:scale-110 
     border-moon-300/50 inline-flex ' >
          <div className='p-1  border-dashed  border-2  border-moon-200 inline-flex ' >
          <div className='p-1 border-dotted border-4 border-moon-100 inline-flex ' >
<div  className="  rounded-sm backgroundSize-140 master-hover:sca   border-moon-200 bg-[url('../../public/promo.svg')]  "   style={{width:200,
    height:200,overflow:"hidden",backgroundSize:"cover",display:"flex",justifyContent:"center",alignItems:"center"}} > 
  

  <div className="bg-moon-300 rounded-full bg-[url('../../public/blk2.jpg')] " style={{
    width:"160px",
    height:"160px",
    backgroundSize:"cover"
    
  }} >


{/* <Image src={logowhite} layout={"fill"} objectFit={"cover"} /> */}


  </div>
{/* 
  <div style={{alignSelf:"flex-end",justifySelf:"flex-start",position:"relative",padding:10,marginBottom:-20,borderRadius:"100%",backgroundColor:"red"}} >
    خصم
  </div> */}
    </div>
    </div>
    </div>
    </div>
    
  )
}

export default PromoComp