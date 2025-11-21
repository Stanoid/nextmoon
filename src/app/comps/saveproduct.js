"use client";

import React from "react";

import Styles from "../styles/Home.module.css";
import { Theme, CURRENCY, API_URL, IMG_URL, DEF_IMG } from "../local";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaHeart, FaStar } from "react-icons/fa6";
import { MAIN_STYLE } from "../styles/style";
import Head from "next/head";
import {
  BsStarFill,
  BsCheck2Circle,
  BsCheckCircleFill,
  BsCartPlusFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";

export default function Product(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cimg, setCimg] = useState("");
  const [colors, setColors] = useState(null);

  useEffect(() => {
    colorDisplay();
  }, []);

  const colorDisplay = () => {
    var colo = [];
    var colob = [];

    for (let i = 0; i < props.data.varients.length; i++) {
      if (colo.includes(props.data.varients[i].colors[0].id)) {
      } else {
        colo.push(props.data.varients[i].colors[0].id);
        colob.push(props.data.varients[i].colors[0]);
      }
    }
    setColors(colob);
  };

  function oldPrice(newPrice, discountPercentage) {
    if (discountPercentage === 0) return 0;
    const discountFactor = 1 - discountPercentage / 100;
    const oldPrice = newPrice / discountFactor;
    return parseInt(oldPrice);
  }

  const varient = props.data.varients?.[0];
  const discount = varient?.old_price > 0 ? varient.old_price : null;

  return (
    <motion.div
      onClick={() => {
        setLoading(true);
        router.push(`/products?pid=${props.data.id}`);
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg cursor-pointer flex flex-col overflow-hidden relative transition-shadow duration-200"
      style={{ width: '308px', height: '501px', minWidth: '308px' }}
    >
      {/* Image Section - 308x308 with 8px padding */}
      <div className="relative p-2" style={{ width: '308px', height: '308px' }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
            <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-xl"
              src={`${IMG_URL}${props.data?.images[0]?.formats?.medium?.url}`}
              alt={props.data?.name_ar}
            />
            <div className="absolute top-2 left-2 p-2 bg-[#f7a0983d] rounded-full shadow-sm z-10">
              <FaHeart className="text-gray-400 text-lg" />
            </div>
          </>
        )}
      </div>

      {/* Product Details Section - 308x193 with padding 4px and gap 12px */}
      <div dir="rtl" className="flex flex-col justify-between bg-white p-4" style={{ width: '308px', height: '193px', gap: '12px' }}>
        {/* Name, Colors, Stars Section - 276x85 with gap 12px */}
        <div className="flex flex-col items-  " style={{ width: '276px', height: '85px', gap: '12px' }}>
          {/* Product Name/Code - Right aligned */}
          <div className="text-base font-medium text-gray-800 text-right w-full">
            {props.data.name_ar} - {props.data.code}
          </div>

          {/* Colors - Right aligned */}
          <div className="flex items-center justify-start gap-1 w-full">
            {colors && colors.map((color) => (
              <Tooltip key={color.id} className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                <div
                  style={{ backgroundColor: color.colorCode }}
                  className="h-[16px] w-[16px] rounded-full border border-gray-200"
                ></div>
              </Tooltip>
            ))}
          </div>

          {/* Rating - Right aligned */}
          <div className="flex items-center justify-start gap-1 w-full">
            <div className="text-xs text-gray-600">(3.4k)</div>
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
            <FaStar className="text-gray-300 text-sm" />
          </div>
        </div>

        {/* Price Section - 276x64 with gap 4px - Left aligned */}
      <div className="flex flex-col items-start justify-start" style={{ width: '276px', height: '64px', gap: '4px' }}>
          <div className="text-2xl font-bold text-gray-900 flex items-baseline">
            <div className="mr-1">{CURRENCY}</div>
            <div>{props.data.varients[0].price}</div>
          </div>
          {props.data.varients[0]?.old_price > 0 && (
            <div className="text-sm text-gray-400 line-through flex items-baseline">
              <div className="mr-1">{CURRENCY}</div>
              <div>
                {(props.data.varients[0].price / (1 - props.data.varients[0].old_price / 100)).toFixed(2)}
              </div>
            </div>
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
  );
}
