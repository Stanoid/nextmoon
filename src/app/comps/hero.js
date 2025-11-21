'use client';

import React, { useState } from 'react'
import Image from 'next/image'
// import SimpleImageSlider from "react-simple-image-slider";
// import Slider from './mainSlider';
// import { motion } from "framer-motion"


export default function Hero(props) {
  const [mobileImageError, setMobileImageError] = useState(false);
  const [desktopImageError, setDesktopImageError] = useState(false);
 
    return (
       <div className='w-full flex justify-center pt-4 lg:pt-16'>
         
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
             <img 
               src='/offers/mobileban.png'
               alt='Hero Banner Mobile'
               className='w-full h-full object-cover'
               onError={(e) => {
                 console.error('Mobile hero image failed to load');
                 e.target.style.display = 'none';
                 setMobileImageError(true);
               }}
             />
             {mobileImageError && (
               <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-moon-100 to-moon-200 text-white text-center p-4">
                 <div>
                   <h2 className="text-2xl font-bold mb-2">مرحباً بكم في Minimoon</h2>
                   <p className="text-sm">أفضل الأسعار وأسرع توصيل</p>
                 </div>
               </div>
             )}
           </div>

           {/* Single Hero Image - Desktop */}
           <div className='max-w-7xl mx-auto h-[480px] hidden lg:block relative overflow-hidden rounded-2xl shadow-lg'>
             <img 
               src='/offers/lgrobeban30.png'
               alt='Hero Banner Desktop'
               className='w-full h-full object-cover'
               onError={(e) => {
                 console.error('Desktop hero image failed to load');
                 e.target.style.display = 'none';
                 setDesktopImageError(true);
               }}
             />
             {desktopImageError && (
               <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-moon-100 to-moon-200 text-white text-center p-8">
                 <div>
                   <h2 className="text-4xl font-bold mb-4">مرحباً بكم في Minimoon</h2>
                   <p className="text-xl">أفضل الأسعار وأسرع توصيل</p>
                 </div>
               </div>
             )}
           </div>

       </div>
    )
}
