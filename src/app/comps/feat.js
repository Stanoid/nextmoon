import React from 'react'
import Image  from 'next/image'
import PromoComp from './promo'
function Feat(props) {
  return (
    <div className="relative group w-full">
    <div className="overflow-hidden  shadow-lg shadow-moon-200/40   aspect-video">
    <Image 
             priority={true}
           quality={60} layout='fill'
  objectFit='cover'
  
  className="rounded-md" src={props.img} alt="" />
    </div>
    <div className="absolute left-3 top-3">
        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide
         text-moon-200 uppercase bg-white rounded-full">جديد</p>
    </div>
    <div className="flex items-start justify-between mt-4 space-x-4">
        <div>
            <h3 className="text-sm w-full text-center font-bold text-moon-200 sm:text-sm md:text-base">
              
            {props.text&&props.text}
                    <span className="absolute inset-0" aria-hidden="true"></span>
              
            </h3>
           
        </div>

       
    </div>
</div>
  )
}

export default Feat