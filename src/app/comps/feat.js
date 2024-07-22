import React from 'react'

function Feat() {
  return (
    <div class="relative group">
    <div class="overflow-hidden aspect-w-1 aspect-h-1">
        <img class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png" alt="" />
    </div>
    <div class="absolute left-3 top-3">
        <p class="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide
         text-moon-200 uppercase bg-white rounded-full">New</p>
    </div>
    <div class="flex items-start justify-between mt-4 space-x-4">
        <div>
            <h3 class="text-xs text-center font-bold text-moon-200 sm:text-sm md:text-base">
              
                  لباس سباحة من قطعة واحدة بأكمام قصيرة 
                    <span class="absolute inset-0" aria-hidden="true"></span>
              
            </h3>
           
        </div>

       
    </div>
</div>
  )
}

export default Feat