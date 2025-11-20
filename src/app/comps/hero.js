import React from 'react'
import Image from 'next/image'
// import SimpleImageSlider from "react-simple-image-slider";
// import Slider from './mainSlider';
// import { motion } from "framer-motion"


export default function Hero(props) {
 
    return (
       <div className='w-full'>
         
{/* TEMPORARY: Slider commented out - using single image */}
{/* <div className='w-full h-72 lg:hidden overflow-hidden rounded-2xl shadow-md'>
           <Slider 
             key="mobile-slider"
             slides={[    
              '/offers/mobileban.png',
              '/offers/mobileban2.png',
              '/offers/mobileban3.png',
              '/offers/mobileban4.png',
              '/offers/mobileban5.png',
              '/offers/mobileban6.png',
             ]} 
           />
           </div>

           <div className='max-w-7xl h-[480px] hidden lg:flex overflow-hidden rounded-2xl shadow-lg'>
           <Slider 
             key="desktop-slider"
             slides={[
              '/offers/lgrobeban30.png',
              '/offers/lgban.png',
              '/offers/lgban2.png',
              '/offers/lgban3.png',
              '/offers/lgban4.png',
             ]} 
           />
           </div> */}

           {/* Single Hero Image - Mobile */}
           <div className='w-full h-72 lg:hidden relative overflow-hidden rounded-2xl shadow-md'>
             <Image 
               src='/offers/mobileban.png'
               fill
               style={{ objectFit: 'cover' }}
               alt='Hero Banner'
               priority
               sizes="100vw"
             />
           </div>

           {/* Single Hero Image - Desktop */}
           <div className='max-w-7xl h-[480px] hidden lg:block relative overflow-hidden rounded-2xl shadow-lg'>
             <Image 
               src='/offers/lgrobeban30.png'
               fill
               style={{ objectFit: 'cover' }}
               alt='Hero Banner'
               priority
               sizes="1280px"
             />
           </div>

       </div>
    )
}
