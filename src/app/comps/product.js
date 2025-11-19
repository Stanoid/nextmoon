'use client'

import React from 'react'

import Styles from "../styles/Home.module.css"
import { Theme,CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { CldImage } from 'next-cloudinary';
import { Spinner } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useState,useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { MAIN_STYLE } from '../styles/style'
import Head from 'next/head'
import { BsStarFill,BsCheck2Circle,BsCheckCircleFill,BsCartPlusFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'



export default function Product(props) {
  const router = useRouter();
  const [loading,setLoading]= useState(false);
  const [cimg,setCimg] = useState("");
  const [colors,setColors]=useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    colorDisplay()
  }, [])

  const colorDisplay = () => {
    if (!Array.isArray(props.data.varients)) {
      console.warn("Missing or invalid varients:", props.data.varients);
      setColors([]);
      return;
    }
  
    const seenColorIds = new Set();
    const uniqueColors = [];
  
    for (let i = 0; i < props.data.varients.length; i++) {
      const variant = props.data.varients[i];
      const color = variant?.colors?.[0];
  
      if (color && !seenColorIds.has(color.id)) {
        seenColorIds.add(color.id);
        uniqueColors.push(color);
      }
    }
  
    setColors(uniqueColors);
  };
  

  function oldPrice(newPrice, discountPercentage) {
    if (discountPercentage === 0) return 0; 
    const discountFactor = 1 - (discountPercentage / 100);
    const oldPrice = newPrice / discountFactor;
    return parseInt(oldPrice);
  }

  return (
   <motion.div
        onClick={()=>{setLoading(true); 
          router.push(`/products?pid=${props.data.id}`)
        }} 
        className="
        lg:w-[308px] lg:h-[501px] w-full h-[380px] sm:h-[400px] rounded-lg border border-gray-200 bg-white shadow-md cursor-pointer flex flex-col overflow-hidden relative" 
      >
  
        <div className='relative h-[220px] sm:h-[240px] lg:h-[308px] w-full flex items-center justify-center bg-gray-50'> 
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-100 '>
              <div style={{ zIndex: 10 }}>
                <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
              </div>
            </div>
          ) : (
            <>
              <Image
                fill
                className='rounded-t-lg object-contain p-2' 
                src={`${IMG_URL}${props.data?.images[0]?.formats?.medium?.url}`} 
                alt="Product Image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 308px"
              />
              <motion.div 
                className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md z-10 cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                  // TODO: Add API call to add/remove from favorites
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart className={`text-lg transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
              </motion.div>
            </>
          )}
        </div>
  
        <div dir="ltr" className="flex flex-col p-3 lg:p-2 lg:max-h-[193px] h-full lg:max-w-[308px] w-full bg-white items-end"> 
  
          <div className="lg:text-lg text-sm hidden lg:flex sm:hidden lg:flex:row font-medium mb-2 text-gray-800 text-right line-clamp-1"> 
            {props.data.name_ar} - {props.data.code}
          </div>
  
  
          <div className="text-sm lg:text-lg lg:hidden flex flex-col font-medium mb-2 text-gray-800 text-right"> 
            <h className="text-xs text-gray-600">{props.data.code}</h>
            <h className="line-clamp-2">{props.data.name_ar}</h> 
          </div>
  
          <div className="flex flex-col items-end mb-4"> 
            <div className="flex items-center mb-2">
              {colors &&
                colors.map((color) => (
                  <div key={color.id} className="ml-1">
                    <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                      <div
                        style={{ backgroundColor: color.colorCode }}
                        className="h-[14px] w-[14px] lg:h-[16px] lg:w-[16px] rounded-full border border-gray-200" 
                      ></div>
                    </Tooltip>
                  </div>
                ))}
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1"> 
              <div className="text-xs text-gray-600">(3.4k)</div>
              <FaStar className="text-yellow-400 text-sm" />
              <FaStar className="text-yellow-400 text-sm" />
              <FaStar className="text-yellow-400 text-sm" />
              <FaStar className="text-yellow-400 text-sm" />
              <FaStar className="text-gray-300 text-sm" />
            </div>
          </div>
  <div className="flex flex-col items-end  w-[276px] lg:mt-2 h-[64px]"> 
            <div className="text-lg font-bold text-gray-900 flex items-baseline">
              <div className="ml-1">{CURRENCY}</div> 
  
  <div>
                <div>{props.data.varients[0]?.price}</div> 
    </div> 
             </div>
            {/* {props.data.varients[0].old_price > 0 &&
              props.data.varients[0].old_price > props.data.varients[0].price && ( */}
                <div className="text-sm text-gray-900 line-through flex items-baseline">
                {/* 1<div>{props.data.varients[0].old_price} </div> */}
                <div className="ml-1">{CURRENCY}</div>
        <div>
          {(
            props.data.varients[0]?.price /
            (1 - props.data.varients[0]?.old_price / 100)
          ).toFixed(2)}
        </div>
                </div>
  
          </div>
        </div>
        
          <span className="absolute bottom-4 left-4 bg-moon-100 text-moon-200 text-xs font-bold px-3 py-1 rounded-full z-10"> 
            {`%25 خصم`} 
          </span>
        {/* )}s */}
      </motion.div>
  )
}