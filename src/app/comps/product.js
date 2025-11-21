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

  const varient = props.data.varients?.[0];
  const discount = varient?.old_price > 0 ? varient.old_price : null;

  return (
   <motion.div
        onClick={()=>{setLoading(true); 
          router.push(`/products?pid=${props.data.id}`)
        }} 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg cursor-pointer flex flex-col overflow-hidden relative transition-shadow duration-200"
        style={{ width: '308px', height: '501px', minWidth: '308px' }}
      >
  
        {/* Image Section - 308x308 with 8px padding */}
        <div className='relative p-2' style={{ width: '308px', height: '308px' }}> 
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
              
              {/* {props.data?.varients?.[0]?.old_price > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10 shadow-md"> 
                  {`-${props.data.varients[0].old_price}%`} 
                </span>
              )} */}
            </>
          )}
        </div>
  
        {/* Product Details Section - 308x193 with padding 4px and gap 12px */}
        <div className="flex flex-col justify-between bg-white p-4" style={{ width: '308px', height: '193px', gap: '12px' }}>
          {/* Name, Colors, Stars Section - 276x85 with gap 12px */}
          <div className="flex flex-col items-end" style={{ width: '276px', height: '85px', gap: '12px' }}>
            {/* Product Name/Code - Right aligned */}
            <div className="text-base font-medium text-gray-800 text-right w-full">
              {props.data.name_ar} - {props.data.code}
            </div>

            {/* Colors - Right aligned */}
            <div className="flex items-center justify-end gap-1 w-full">
              {colors && colors.slice(0, 3).map((color) => (
                <Tooltip key={color.id} className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                  <div
                    style={{ backgroundColor: color.colorCode }}
                    className="h-[16px] w-[16px] rounded-full border border-gray-200"
                  ></div>
                </Tooltip>
              ))}
            </div>

            {/* Rating - Right aligned */}
            <div className="flex items-center justify-end gap-1 w-full">
              <span className="text-xs text-gray-600">(3.4k)</span>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
              <FaStar className="text-gray-300 text-sm" />
            </div>
          </div>

          {/* Price Section - 276x64 with gap 4px - Right aligned */}
          <div className="flex flex-col items-end justify-end" style={{ width: '276px', height: '64px', gap: '4px' }}>
            {props.data?.varients?.[0]?.price && (
              <>
                <div className="text-2xl font-bold text-gray-900 flex items-baseline">
                  <span className="mr-1">{CURRENCY}</span>
                  <span>{props.data.varients[0].price}</span>
                </div>
                {props.data.varients[0]?.old_price > 0 && (
                  <div className="text-sm text-gray-400 line-through flex items-baseline">
                    <span className="mr-1">{CURRENCY}</span>
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

        {/* Discount Badge - Bottom Left */}
        {discount && (
          <span className="absolute bottom-4 left-4 bg-moon-100 text-moon-200 text-xs font-bold px-3 py-1 rounded-full z-10">
            {`%${discount} خصم`}
          </span>
        )}
      </motion.div>
  )
}