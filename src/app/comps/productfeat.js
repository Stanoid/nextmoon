import React from 'react'
import CURRENCY from "../local"
import { Button ,divider} from '@nextui-org/react'

import { FaListAlt, FaShoppingBasket } from 'react-icons/fa'
import { FaList } from 'react-icons/fa6'
function ProductFeat(props) {
  return (
    
    <div dir='rtl' className=" py-4 w-full sm:w-full lg:w-2/3 ">
  <div className="p-4 flex flex-col justify-center items-center w-full ">
  <h5 className="text-2xl font-black text-center tracking-normal text-moon-200 mt-2 "> {props.title} </h5>
  <p className=" py-1 w-full sm:w-full lg:w-1/2 px-4   mt-3 text-justify   leading-tight text-moon-300/60 ">
{props.text}
</p>
  </div>



<div className='flex flex-row w-full justify-center px-4 items-center' >
{/* week */}
<div className=' flex-col sm:flex-col lg:flex-row' style={{
    width:"100%",
display:props.variant=="week"?"flex":"none",
gap:8,
// gridTemplateAreas:`
// ' namear  namear  nameen nameen  sicon sicon  ' 
// `
   }} >
    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"namear"}}>
    <img className='rounded-md w-3/4 sm:w-3/4 lg:w-full ' src='/offers/offermob7.jpg'  />
   <div className='text-center text-sm mt-2' >
   منتجات أمهات
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"nameen"}}>
    <img className='rounded-md w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob3.jpg'/>
   <div className='text-center  text-sm mt-2' >
   منتجات أطفال
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"sicon"}}>
    <img className='rounded-md w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob6.jpg'  />
   <div className='text-center text-sm mt-2' >
   منتجات أناقة
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>




     

  
  

   </div>


{/* trend */}

<div
 className=' flex-col' 
style={{
    width:"100%",
display:props.variant=="trend"?"flex":"none",
gap:8,
// gridTemplateAreas:`
// ' namear  namear  nameen nameen  sicon sicon  ' 
// 'btn  btn  btn btn  btn btn' 
// `
   }} >

    <div className=' w-full gap-2 flex flex-col sm:flex-col lg:flex-row'>
    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"namear"}}>
    <img className='rounded-md  w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob7.jpg'  />
   <div className='text-center text-sm mt-2' >
   منتجات أمهات
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"nameen"}}>
    <img className='rounded-md -md w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob3.jpg'  />
   <div className='text-center  text-sm mt-2' >
   منتجات أطفال
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-center '  style={{gridArea:"sicon"}}>
    <img className='rounded-md  w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob6.jpg'  />
   <div className='text-center text-sm mt-2' >
   منتجات أناقة
    <div className='text-moon-200/80' >
المزيد
    </div>
   </div>
    </div>


 

     

  
  
</div>
<div className=' flex flex-col justify-center items-center  '  style={{gridArea:"btn"}}>
    <Button variant='shadow' startContent={<FaList/>} className='bg-moon-200 text-white font-medium' size='md'  >
عرض جميع المنتجات
    </Button>
    </div>
   </div>




{/* offer */}
<div style={{
    width:"100%",
display:props.variant=="offer"?"grid":"none",
gap:8,
gridTemplateAreas:`
' off2  off2  off2 off1  off1 off1  ' 
' namear  namear  nameen nameen  sicon sicon  ' 

'btn  btn  btn btn   btn  btn' 
`
   }} >
    


    <div className=' flex flex-col justify-center items-start '  style={{gridArea:"off1"}}>
    <img className='rounded-md' src='/offers/ban1.png' width={"100%"} />
   <div className='text-right text-xs mt-2 pr-1 ' >
 <div className='font-medium '>  تشوميل سوار متدلي من الفضة الإسترليني عيار  ... </div>
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>

    
    <div className=' flex flex-col justify-center items-start '  style={{gridArea:"off2"}}>
    <img className='rounded-md' src='/offers/ban2.png' width={"100%"} />
    <div className='text-right text-xs mt-2 pr-1 ' >
 <div className='font-medium '>  تشوميل سوار متدلي من الفضة الإسترليني عيار  ... </div>
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-start '  style={{gridArea:"namear"}}>
    <img className='rounded-md' src='/offers/ban4.png' width={"100%"} />
    <div className='text-right text-xs mt-2 pr-1 ' >
    <div className='font-medium '>  تشوميل سوار متدلي من   ... </div>
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-start '  style={{gridArea:"nameen"}}>
    <img className='rounded-md' src='/offers/ban5.png' width={"100%"} />
    <div className='text-right text-xs mt-2 pr-1 ' >
    <div className='font-medium '>  تشوميل سوار متدلي من   ... </div>
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    <div className=' flex flex-col justify-center items-start '  style={{gridArea:"sicon"}}>
    <img className='rounded-md' src='/offers/ban3.png' width={"100%"} />
    <div className='text-right text-xs mt-2 pr-1 ' >
 <div className='font-medium '>  تشوميل سوار متدلي من   ... </div>
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-start  w-full justify-between">
      <p className='text-right w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>



    <div className=' flex flex-col justify-center items-center  '  style={{gridArea:"btn"}}>
    <Button variant='shadow' startContent={<FaList/>} className='bg-moon-200 text-white font-medium' size='md'  >
  عرض جميع المنتجات
    </Button>
    </div>



   </div>





{/* never */}
<div className='flex-col'  style={{
    width:"100%",
display:props.variant=="never"?"flex":"none",

   }} >
    
    <div className=" mt-4  flex sm:flex lg:flex  
    py-5 scrollable-content  " style={{alignItems:"center",justifyContent:"center",maxWidth:"100%",overflowX:"scroll",overflowY:"hidden"}} >  

<div className='mx-2 min-w-20 lg:hidden'></div>
<div className='mx-2 min-w-20 lg:hidden'></div>
<div className='mx-2 min-w-20 lg:hidden'></div>
<div className='mx-2 min-w-20 lg:hidden'></div>
<div className='mx-2 min-w-10 lg:hidden'></div>

    <div className=' flex flex-col mx-2 justify-center min-w-36 items-center py-2 '  style={{gridArea:"namear"}}>
    <img className='rounded-full shadow-lg ' src='/offers/offermob7.jpg' width={"100%"} />
   <div className='text-center text-sm font-medium mt-2' >
   جلابية مطرزة بالاحمر
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-center  w-full justify-between">
      <p className='text-center w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    
    <div className=' flex flex-col mx-2 justify-center items-center min-w-36 py-2 '  style={{gridArea:"namear"}}>
    <img className='rounded-full shadow-lg' src='/offers/offermob7.jpg' width={"100%"} />
   <div className='text-center text-sm font-medium mt-2' >
   جلابية مطرزة بالاحمر
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-center  w-full justify-between">
      <p className='text-center w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>

    
    <div className=' flex flex-col mx-2 justify-center items-center py-2 min-w-36 '  style={{gridArea:"namear"}}>
    <img className='rounded-full shadow-lg ' src='/offers/offermob7.jpg' width={"100%"} />
   <div className='text-center text-sm font-medium mt-2' >
   جلابية مطرزة بالاحمر
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-center  w-full justify-between">
      <p className='text-center w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    
    <div className=' flex flex-col mx-2 justify-center items-center py-2  min-w-36'  style={{gridArea:"namear"}}>
    <img className='rounded-full shadow-lg ' src='/offers/offermob7.jpg' width={"100%"} />
   <div className='text-center text-sm font-medium mt-2' >
   جلابية مطرزة بالاحمر
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-center  w-full justify-between">
      <p className='text-center w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>



    
    <div className=' flex flex-col mx-2 justify-center items-center py-2  min-w-36'  style={{gridArea:"namear"}}>
    <img className='rounded-full shadow-lg' src='/offers/offermob7.jpg' width={"100%"} />
   <div className='text-center text-sm font-medium mt-2' >
   جلابية مطرزة بالاحمر
    <div className='text-moon-200/80' >
    <div className="mt-1 mb-3 flex items-center  w-full justify-between">
      <p className='text-center w-full '>
        <span className="text-md font-bold ml-1 text-moon-300/75"> ر.س {121}</span>
        <span className="text-xs text-moon-200 line-through">  ر.س {121+20}</span>
      </p>
    </div>
    </div>
   </div>
    </div>


    



    </div>

   



    <div className=' flex flex-col justify-center items-center  '>
    <Button variant='shadow' startContent={<FaShoppingBasket/>} className='bg-moon-200 text-white font-medium' size='md'  >
  تسوق الآن 
    </Button>
    </div>



   </div>


   {/* new */}
   <div className=' justify-center items-center flex-col' style={{
    width:"100%",
display:props.variant=="new"?"flex":"none",
gap:8,
// gridTemplateAreas:`
// ' namear  namear  nameen nameen  sicon sicon  ' 
// 'btn  btn  btn btn  btn btn' 
// `
   }} >
    <div className=' w-full  flex gap-2 items-center flex-col sm:flex-col lg:flex-row '>
    <div className=' flex flex-col justify-center  items-center sm:items-center lg:items-start '  style={{gridArea:"namear"}}>
    <img className='rounded-md  w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob7.jpg' />
    <div className='text-right text-md px-4 font-semibold  my-4 ' >
    إسم الفئة | <span className='text-moon-200' >التاريخ</span>
    <div className='text-moon-300/70 leading-tight font-medium text-justify mt-1' >
    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
     </div>
   </div>
    </div>

    <div className=' flex flex-col justify-center items-center sm:items-center lg:items-start '  style={{gridArea:"nameen"}}>
    <img className='rounded-md  w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob3.jpg'  />
   <div className='text-right text-md px-4 font-semibold  my-4 ' >
    إسم الفئة | <span className='text-moon-200' >التاريخ</span>
    <div className='text-moon-300/70 leading-tight font-medium text-justify mt-1' >
    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
     </div>
   </div>
    </div>

    <div className=' flex flex-col justify-center items-center sm:items-center lg:items-start '  style={{gridArea:"sicon"}}>
    <img className='rounded-md  w-3/4 sm:w-3/4 lg:w-full' src='/offers/offermob6.jpg'  />
    <div className='text-right text-md px-4 font-semibold  my-4 ' >
    إسم الفئة | <span className='text-moon-200' >التاريخ</span>
    <div className='text-moon-300/70 leading-tight font-medium text-justify mt-1' >
    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
     </div>
   </div>
    </div>






    </div>
    <div className=' flex flex-col justify-center items-center  mt-2'  style={{gridArea:"btn"}}>
    <Button variant='shadow' startContent={<FaList/>} className='bg-moon-200 text-white font-medium' size='md'  >
عرض  الكل
    </Button>
    </div>

       

   </div>


   


</div>

  
</div>



  )
}

export default ProductFeat