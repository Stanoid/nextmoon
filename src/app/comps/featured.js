import React from 'react'

import Feat from './feat'
function FeaturedComp() {
  return (
    <section dir='rtl' className=" w-full mb-6 flex justify-center flex-col items-center ">
  
        <div className=" text-center my-6">
            <h2 className="text-3xl  font-bold text-moon-200 "> الفئات المميزة </h2>
                </div>

 <div className=" mt-4  flex sm:flex lg:flex  
    py-5 scrollable-content   " style={{alignItems:"center",justifyContent:"center",maxWidth:"100vw",overflowX:"scroll",overflowY:"hidden"}} >  
        <div className='mx-2 min-w-20 lg:hidden'></div>
        <div className='mx-2 min-w-20 lg:hidden '></div>
        <div className='mx-2 min-w-20 lg:hidden'></div>
        <Feat text="بجامات" img={"/featured/f1.svg"} />  
        <Feat text="جلابية" img={"/featured/f2.svg"} />     
        <Feat text="سراويل" img={"/featured/f3.svg"} />  
        <Feat text="لانجري" img={"/featured/f4.svg"} />  
        <Feat text="ملابس TRD" img={"/featured/f5.svg"} />  
        <Feat text="موضة و اناقة" img={"/featured/f6.svg"} />  
          
          </div>
        

          

     
    
</section>

  )
}

export default FeaturedComp