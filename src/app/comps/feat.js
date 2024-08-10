import React from 'react'
import Image  from 'next/image'
import { motion } from 'framer-motion'
import PromoComp from './promo'
function Feat(props) {
  return (
    <motion.div 
    whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}

    
    className="flex  hover:bg-moon-100 transition-colors min-w-24 lg:min-w-40 flex-col items-center justify-center mx-2 rounded-md  shadow-md  px-2  py-8 ">
    
    <Image  
           
           quality={100} 
  width={130}
  height={130}
  
  className="rounded-md " src={props.img&&props.img} alt="aaa" />


    
    {/* <div className="absolute left-3 top-3">
        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide
         text-moon-200 uppercase bg-white rounded-full">جديد</p>
    </div> */}
    <div className="flex items-start justify-between mt-4 space-x-4">
        <div>
            <h3 className="text-sm w-full whitespace-nowrap text-center font-bold text-moon-200 sm:text-sm md:text-base">
              
            {props.text&&props.text}
                   
              
            </h3>
           
        </div>

       
    </div>
</motion.div>
  )
}

export default Feat