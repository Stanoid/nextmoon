import React from 'react'
import Image from 'next/image'
import SimpleImageSlider from "react-simple-image-slider";
import Slider from './mainSlider';

export default function Hero(props) {
 
    return (
       <div className='p-1 lg:p-4 xl:p-4 md:p-4 '>
         
         <div className='grid grid-cols-6 gap-x-4 gap-y-6' >

   
        
           <div style={{width:'100%',position:"relative",height:"40vh"}} className='lg:col-span-4 xl:col-span-4 md:col-span-3 col-span-6'>
           <Slider slides={['/ltd2.jpg','/per.jpg']} />
           </div>
           <div style={{height:"40vh",position:"relative"}} className='lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6'>
           <Image priority={true}  className="rounded-lg" src={'/blk2.jpg'}layout="fill" objectFit="cover" />
           </div>

           {/* <div style={{width:'100%',position:"relative",height:"40vh"}} className='lg:col-span-4 xl:col-span-4 md:col-span-3 col-span-6'>
           <LazySlider/>
           </div> */}

        
        

          
           
         </div>
       </div>
    )
}
