import React from 'react'
import Image from 'next/image'
import SimpleImageSlider from "react-simple-image-slider";
import Slider from './mainSlider';
import { motion } from "framer-motion"


export default function Hero(props) {
 
    return (
       <div className='bg-red-300'>
         
         {/* <div className='grid grid-cols-6 gap-x-1.5 gap-y-1.5 sm:gap-y-1.5 lg:gap-y-1.5' >



<div
style={{width:"100%",position:"relative"}} className='lg:col-span-2 h-32 xl:col-span-2 md:col-span-3 
col-span-6 flex sm:flex lg:hidden'>
         



<Image 
  fill objectFit='cover'
  quality={60}
  
  priority={true}
  alt={"banner immage"}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className='rounded-md'  src={"/offers/offer5.png"} />
           </div>

       
   
        
         

           <div style={{width:"100%",position:"relative"}} className='lg:col-span-2  h-56  w-full xl:col-span-2 md:col-span-3 col-span-6 '>
     
           <Image 
         fill objectFit='cover'
         quality={60}
        
         alt={"banner immage"}
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='rounded-md'   src={"/offers/ban1.png"} />
           </div>
           
           <div style={{width:"100%",position:"relative"}} className='lg:col-span-2 xl:col-span-2 h-56 md:col-span-3 col-span-6 hidden sm:hidden lg:flex'>
           <Image 
           
           fill objectFit='cover'
           quality={60}
       
           alt={"banner immage"}
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='rounded-md'  src={"/offers/ban3.png"} />
           </div>

           <div style={{width:"100%",position:"relative"}} className='lg:col-span-4 h-56 xl:col-span-4 md:col-span-6 col-span-6 hidden sm:hidden lg:flex ' >
           <Image 
           priority
             alt={"banner immage"}
         fill objectFit='cover'
         quality={100}
       
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className='rounded-md'  src={"/offers/offer5.png"} />
           </div>

         

          

           
          
         
        
        
        

          
           
         </div> */}


<div style={{width:'100%',position:"relative"}} 
           className='lg:col-span-4  xl:col-span-4 md:col-span-3 col-span-6  
           flex sm:flex w-full h-72 lg:hidden md:hidden xl:hidden'>
           <Slider  slides={[    
            '/offers/mobileban.png',
            '/offers/mobileban2.png',
            '/offers/mobileban3.png',
            '/offers/mobileban4.png',
            '/offers/mobileban5.png',
            '/offers/mobileban6.png',
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
             '/offers/lgrobeban30.png',
            '/offers/lgban.png',
            '/offers/lgban2.png',
            '/offers/lgban3.png',
            '/offers/lgban4.png',
  
           
            
           
             ]}
              />
          
           </div>

       </div>
    )
}
