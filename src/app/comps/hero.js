import React from 'react'
import Image from 'next/image'
import SimpleImageSlider from "react-simple-image-slider";
import Slider from './mainSlider';
import { motion } from "framer-motion"


export default function Hero(props) {
 
    return (
       <div className='p-1.5 lg:p-4 xl:p-4 md:p-4 '>
         
         <div className='grid grid-cols-6 gap-x-1.5 gap-y-1.5 sm:gap-y-1.5 lg:gap-y-1.5' >

{/* <motion.div
 whileHover={{ scale: 1.2 }}
 whileTap={{ scale: 1.1 }}
 drag="x"
 dragConstraints={{ left: -100, right: 100 }}
/> */}

<div
style={{width:"100%",position:"relative"}} className='lg:col-span-2 h-32 xl:col-span-2 md:col-span-3 
col-span-6 flex sm:flex lg:hidden'>
           {/* <Image quality={25} layout='fill'
  objectFit='cover' className='rounded-md'  src={"/offers/offer5.png"} /> */}



<Image 
  fill objectFit='cover'
  quality={25}
  //placeholder='empty'
  priority={true}
  alt={"banner immage"}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className='rounded-md'  src={"/offers/offer5.png"} />
           </div>

       
   
        
           <div style={{width:'100%',position:"relative"}} 
           className='lg:col-span-4 h-min xl:col-span-4 md:col-span-3 col-span-6 flex sm:flex lg:hidden md:hidden xl:hidden'>
           <Slider  slides={[
           
            '/offers/offermob7.png',
            '/offers/offermob6.png',
            '/offers/offermob5.png',
            '/offers/offermob4.png',
            '/offers/offermob3.png',
            '/offers/offermob2.png',
            '/offers/offermob1.png',
           ]} />
            {/* <Slider  slides={[
            '/offers/ban1.png',
            '/offers/ban2.png',
            '/offers/ban3.png',
        
           ]} /> */}
           </div>

           <div style={{width:'100%',position:"relative"}} 
           className='lg:col-span-4  h-min xl:col-span-4 md:col-span-3 col-span-6 hidden sm:hidden lg:flex md:flex xl:flex'>

           <Slider  slides={[
             '/offers/offer7.png',
             '/offers/offer6.png',
             '/offers/offer5.png',
            '/offers/offer1.png',
            '/offers/offer2.png',
            '/offers/offer3.png',
            '/offers/offer4.png',
           
            
           
             ]} />
          
           </div>

           <div style={{width:"100%",position:"relative"}} className='lg:col-span-2  h-56  w-full xl:col-span-2 md:col-span-3 col-span-6 '>
           {/* <Image priority={true}  width={100}  style={{width:"100%",auto}}  className="rounded-lg" src={'/offers/offmob2.png'}/> */}
           <Image 
         fill objectFit='cover'
         quality={25}
         priority={true}
         alt={"banner immage"}
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='rounded-md'   src={"/offers/ban1.png"} />
           </div>
           
           <div style={{width:"100%",position:"relative"}} className='lg:col-span-2 xl:col-span-2 h-56 md:col-span-3 col-span-6 hidden sm:hidden lg:flex'>
           <Image 
           
           fill objectFit='cover'
           quality={25}
           priority={true}
           alt={"banner immage"}
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='rounded-md'  src={"/offers/ban3.png"} />
           </div>

           <div style={{width:"100%",position:"relative"}} className='lg:col-span-4 h-56 xl:col-span-4 md:col-span-6 col-span-6 hidden sm:hidden lg:flex ' >
           <Image 
             alt={"banner immage"}
         fill objectFit='cover'
         quality={25}
         priority={true}
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='rounded-md'  src={"/offers/offer5.png"} />
           </div>

           {/* <div style={{width:"100%",position:"relative"}} className='lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6'>
           <img width={"100%"} className='rounded-md'  src={"/offers/offmob3.png"} />
           </div> */}

           {/* <div style={{width:"100%",position:"relative"}} className='lg:col-span-2 xl:col-span-2 md:col-span-3 col-span-6 '>
         
           <img width={"100%"} className='rounded-md'  src={"/offers/offer1.png"} />
           </div> */}

          

           
          
         
           {/* <div style={{width:'100%',position:"relative",height:"40vh"}} className='lg:col-span-4 xl:col-span-4 md:col-span-3 col-span-6'>
           <LazySlider/>
           </div> */}

        
        

          
           
         </div>
       </div>
    )
}
