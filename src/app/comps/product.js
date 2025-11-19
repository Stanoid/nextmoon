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
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="w-full rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg cursor-pointer flex flex-col overflow-hidden relative transition-shadow duration-200" 
      >
  
        <div className='relative aspect-square w-full flex items-center justify-center bg-gray-50'> 
          {loading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
              <div style={{ zIndex: 10 }}>
                <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
              </div>
            </div>
          ) : (
            <>
              <Image
                fill
                className='rounded-t-xl object-cover' 
                src={
                  props.data?.images?.[0]?.formats?.medium?.url 
                    ? `${IMG_URL}${props.data.images[0].formats.medium.url}`
                    : props.data?.images?.[0]?.url
                    ? `${IMG_URL}${props.data.images[0].url}`
                    : DEF_IMG || '/no-image.jpg'
                }
                alt={props.data?.name_ar || "Product Image"}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 308px"
              />
              <motion.div 
                className="absolute top-2 right-2 p-2 bg-white/95 rounded-full shadow-md z-10 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart className={`text-base transition-colors ${isLiked ? 'text-red-500' : 'text-gray-400'}`} />
              </motion.div>
              
              {props.data?.varients?.[0]?.old_price > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10 shadow-md"> 
                  {`-${props.data.varients[0].old_price}%`} 
                </span>
              )}
            </>
          )}
        </div>
  
        <div dir="rtl" className="flex flex-col p-2.5 lg:p-3 bg-white"> 
  
          <div className="text-xs lg:text-sm font-semibold mb-1 text-gray-800 text-right line-clamp-2 min-h-[36px] lg:min-h-[40px] leading-tight"> 
            {props.data.name_ar}
          </div>
          
          <div className="text-[10px] lg:text-xs text-gray-500 mb-2 text-right">
            {props.data.code}
          </div>
  
          <div className="flex flex-row-reverse items-center justify-between mb-2 lg:mb-3"> 
            {colors && colors.length > 0 && (
              <div className="flex flex-row-reverse items-center gap-0.5 lg:gap-1">
                {colors.slice(0, 3).map((color) => (
                  <Tooltip key={color.id} className="bg-gray-800 text-white text-xs py-1 px-2" content={color.name_ar}>
                    <div
                      style={{ backgroundColor: color.colorCode }}
                      className="h-3 w-3 lg:h-4 lg:w-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" 
                    ></div>
                  </Tooltip>
                ))}
                {colors.length > 3 && (
                  <span className="text-[10px] lg:text-xs text-gray-500 mr-0.5 lg:mr-1">+{colors.length - 3}</span>
                )}
              </div>
            )}
            
            {/* Rating */}
            <div className="flex flex-row-reverse items-center gap-0.5 lg:gap-1"> 
              <span className="text-[10px] lg:text-xs text-gray-600">(3.4k)</span>
              <div className="flex flex-row-reverse gap-0.5">
                <FaStar className="text-yellow-400 text-[10px] lg:text-xs" />
                <FaStar className="text-yellow-400 text-[10px] lg:text-xs" />
                <FaStar className="text-yellow-400 text-[10px] lg:text-xs" />
                <FaStar className="text-yellow-400 text-[10px] lg:text-xs" />
                <FaStar className="text-gray-300 text-[10px] lg:text-xs" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-row-reverse items-center justify-between"> 
            <div className="flex flex-col items-end">
              {props.data?.varients?.[0]?.price && (
                <>
                  <div className="text-base lg:text-lg font-bold text-gray-900 flex flex-row-reverse items-baseline">
                    <span className="mr-0.5 lg:mr-1 text-xs lg:text-sm">{CURRENCY}</span>
                    <span>{props.data.varients[0].price}</span> 
                  </div>
                  {props.data.varients[0]?.old_price > 0 && (
                    <div className="text-[10px] lg:text-xs text-gray-500 line-through flex flex-row-reverse items-baseline">
                      <span className="mr-0.5 lg:mr-1">{CURRENCY}</span>
                      <span>
                        {(
                          props.data.varients[0].price /
                          (1 - props.data.varients[0].old_price / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
  )
}