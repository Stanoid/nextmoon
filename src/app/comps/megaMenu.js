import React from 'react'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
function MegaMenu(props) {

    const [rend,SetRend] = useState(0)
    const router = useRouter();
    useEffect(() => {
     console.log("mega menu data",props.data)
    
    
    }, [rend])
    


  return (
    <div style={{width:"70vw"}} dir='rtl'  className="  relative     ">
    <div className="">
        <div className="grid  grid-cols-4 gap-x-2  py-16">
          
            <div className="col-span-2 sm:col-span-2 lg:col-span-1    grid-cols-3 gap-x-8 gap-y-10 px-2 text-sm">
                <div>
                    <p  id="Clothing-heading"
                        className="font-black tracking-tight  text-right text-3xl  text-moon-300/80">{props.cat}</p>
                    <ul role="list" aria-labelledby="Clothing-heading"
                        className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-2.5 lg:space-y-6 pr-0 ">


{props.data&&props.data.map(subcat=>(
    
    <li  className="flex justify-center items-center  px-4 py-2 shadow-lg rounded-md whitespace-nowrap bg-white  text-moon-200/80 font-medium ">
    <div onClick={()=>{router.push(`/subcatagories?sid=${subcat.id}`)}} 
        className="hover:text-gray-800 tracking-tight ">{subcat.attributes.name_ar}</div>
</li>
    ))}


                      


                    
                    </ul>
                </div>
             
             
            </div>
            <div className="col-span-2 sm:col-span-2 lg:col-span-3 text-right flex flex-col sm:flex-col lg:flex-row   items-center justify-center  ">
                <div className="group relative text-base sm:text-sm mb-4 sm:mb-4 lg:mb-0 ml-0 sm:ml-0 lg:ml-6   ">
                    <div
                        className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                            alt="Drawstring top with elastic loop closure and textured interior padding."
                            className="object-cover object-center"/>
                    </div>
                    {/* <a href="#"
                        classNameName="mt-6 block font-medium text-gray-900">
                        <span className="absolute inset-0 z-10"
                            aria-hidden="true"></span>
                        وصل حديثآ 
                    </a>
                    <p aria-hidden="true" className="mt-1">تسوق الآن </p> */}
                </div>
                <div className="group relative text-base sm:text-sm">
                    <div
                        className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg"
                            alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt."
                            className="object-cover object-center"/>
                    </div>
                    {/* <a href="#"
                        className="mt-6 block font-medium text-gray-900">
                        <span className="absolute inset-0 z-10"
                            aria-hidden="true"></span>
                        Artwork Tees
                    </a>
                    <p aria-hidden="true" className="mt-1">تسوق الآن </p> */}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default MegaMenu