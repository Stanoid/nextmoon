import React from 'react'
import PromoComp from './promo'
function Feat(props) {
  return (
    <div class="relative group">
    <div class="overflow-hidden shadow-lg shadow-moon-200/40 aspect-w-1 rounded-md aspect-h-1">
        <img class="object-cover w-full h-full transition-all rounded-md duration-300 group-hover:scale-150" src={props.img} alt="" />
    </div>
    <div class="absolute left-3 top-3">
        <p class="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide
         text-moon-200 uppercase bg-white rounded-full">جديد</p>
    </div>
    <div class="flex items-start justify-between mt-4 space-x-4">
        <div>
            <h3 class="text-sm w-full text-center font-bold text-moon-200 sm:text-sm md:text-base">
              
            {props.text&&props.text}
                    <span class="absolute inset-0" aria-hidden="true"></span>
              
            </h3>
           
        </div>

       
    </div>
</div>
  )
}

export default Feat