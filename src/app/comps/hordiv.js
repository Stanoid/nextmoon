import React from 'react'
import ProductCopm from './saveproduct'
import { FaCircleArrowRight } from 'react-icons/fa6'
import Product from './product'
function HorDiv(props) {
  return (
    <div className=' scrollable-content space-x-4 w-lvw flex align-middle p-2 overflow-x-scroll '>

{props.data&&props.data.map(product=>(
product.status?  

<div className=" min-w-56 rounded-md shadow-md shadow-gray-300 "  key={product.id}>
    
<ProductCopm atcbtn={true} data={product} /> 
</div>
:<></>
))}


<div  className="  flex justify-center items-center  bg-gradient-to-tr to-moonsec-200/80 from-moonsec-100/80  min-w-40  shadow-lg rounded-md
 text-white font-bold text-lg  " >
  <span className='mr-1.5  tracking-tight' >  عرض الكل </span>     <FaCircleArrowRight/>
</div>


{/* <div className='bg-red-300 p-3 rounded-md px-24 '>a</div>
<div className='bg-red-300 p-3 rounded-md px-24 '>a</div>
<div className='bg-red-300 p-3 rounded-md px-24 '>a</div> */}

    </div>
  )
}

export default HorDiv