import React from 'react'
import Feat from './feat'
function FeaturedComp() {
  return (
    <section dir='rtl' className="py-12 px-8  w-full sm:py-16 lg:py-20">
    <div className="   ">
        <div className=" text-right">
            <h2 className="text-xl  font-bold text-moon-200 ">تصفح الفئات:</h2>
                </div>

        <div className="grid grid-cols-2 gap-6 mt-4 lg:gap-4 lg:grid-cols-4">
          <div className='w-full '><Feat img={"/offers/offermob4.png"} text={"ملابس اطفال"} />
          </div>
        <Feat img={"/offers/offermob7.png"} text={"الملابس الداخلية"} />     
        <Feat img={"/offers/offermob6.png"} text={"مجموعة الصيف"} />
        <Feat img={"/offers/offermob5.png"} text={" الملابس الرياضية "} />

         

          

           
        </div>
    </div>
</section>

  )
}

export default FeaturedComp