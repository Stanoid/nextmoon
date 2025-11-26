'use client';

import React, { useEffect, useState, useRef } from 'react';
import {CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Spinner, Button, Tooltip } from '@nextui-org/react';
import { FaArrowLeft, FaArrowRight, FaStar, FaHeart } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Theme } from '../local'; 
import Image from 'next/image';

export default function MostDemanded() {
  const [subcats, setSubcats] = useState([]);
  const [selectedSubcat, setSelectedSubcat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingSubcats, setLoadingSubcats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const productScrollRef = useRef(null);
  const router = useRouter();
  const CURRENCY = "د.ج";

  // Hide hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Track scroll position for indicator
  useEffect(() => {
    const scrollContainer = productScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = 308 + 16; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [products]); 

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${API_URL}subcatagories?func=getTopSubcats`);
        const data = await res.json();
        setSubcats(data);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      } finally {
        setLoadingSubcats(false);
      }
    };
    fetchSubcategories();
  }, []);
  
  
  console.log(IMG_URL)
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        let url = `${API_URL}products?func=getTopSellerPerSubcat`;
        if (selectedSubcat) {
          url += `&subcatid=${selectedSubcat.id}`;
        }
        const res = await fetch(url);
        const data = await res.json();

        console.log("most demanded", data.images)
    
        // console.log(`ful image url ${IMG_URL}${data.data.images[0]?.formats?.medium?.url}`)
        
        const finalProducts = selectedSubcat ? (data ? [data] : []) : (data || []);
        setProducts(finalProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [selectedSubcat]);

  const scrollLeft = () => {
    if (productScrollRef.current) {
      const scrollAmount = productScrollRef.current.offsetWidth;
      productScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (productScrollRef.current) {
      const scrollAmount = productScrollRef.current.offsetWidth;
      productScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 max-w-[1400px] mx-auto px-4">
      <h2 className="text-xl text-center font-bold text-gray-800 mb-6">الاكثر طلبا</h2> 

      {loadingProducts ? (
        <div className="flex justify-center py-10">
          <Spinner color="danger" size="lg" />
        </div>
      ) : products.length > 0 ? (
        <>
          {/* Mobile Layout - Swipeable like hordiv */}
          <div className="relative lg:hidden">
            <div
              ref={productScrollRef}
              className="scrollable-content w-lvw flex items-center p-2 px-4 overflow-x-scroll snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '16px' }}
              onScroll={() => setShowHint(false)}
            >
              {products.map((product) => {
                const varient = product.varients?.[0];
                const discount =
                  varient?.old_price > varient?.price
                    ? Math.round(((varient.old_price - varient.price) / varient.old_price) * 100)
                    : null;

                const getUniqueColors = (product) => {
                  if (!Array.isArray(product.varients)) {
                    return [];
                  }
                  const seenColorIds = new Set();
                  const uniqueColors = [];
                  for (let i = 0; i < product.varients.length; i++) {
                    const variant = product.varients[i];
                    const color = variant?.colors?.[0];
                    if (color && !seenColorIds.has(color.id)) {
                      seenColorIds.add(color.id);
                      uniqueColors.push(color);
                    }
                  }
                  return uniqueColors;
                };

                const uniqueColors = getUniqueColors(product);

                return (
                  <div key={product.id} className="snap-start">
                    <motion.div
                      onClick={() => {
                        setLoading(true);
                        router.push(`/products?pid=${product.id}`);
                      }}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg cursor-pointer flex flex-col overflow-hidden relative"
                      style={{ width: '308px', height: '501px', minWidth: '308px' }}
                    >
                      {/* Image Section */}
                      <div className="relative p-2" style={{ width: '308px', height: '308px' }}>
                        {loading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
                            <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
                          </div>
                        ) : (
                          <>
                            <Image
                              fill
                              style={{ objectFit: 'cover' }}
                              className='rounded-t-xl' 
                              src={
                                product.images?.[0]?.formats?.medium?.url 
                                  ? `${IMG_URL}${product.images[0].formats.medium.url}`
                                  : product.images?.[0]?.url
                                  ? `${IMG_URL}${product.images[0].url}`
                                  : DEF_IMG || '/no-image.jpg'
                              }
                              alt={product.name_ar || 'Product'}
                              sizes="308px"
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
                        <div className="flex flex-col items-start" style={{ width: '276px', height: '85px', gap: '12px' }}>
                          {/* Product Name/Code - Right aligned */}
                          <div className="text-base font-medium text-gray-800 text-right w-full">
                            {product.name_ar} - {product.code}
                          </div>

                          {/* Colors - Right aligned */}
                          <div className="flex items-center justify-start gap-1 w-full">
                            {uniqueColors && uniqueColors.slice(0, 3).map((color) => (
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
                          {varient?.price && (
                            <>
                              <div className="text-2xl font-bold text-gray-900 flex items-baseline">
                                <span className="mr-1">{CURRENCY}</span>
                                <span>{varient.price}</span>
                              </div>
                              {varient?.old_price > 0 && (
                                <div className="text-sm text-gray-400 line-through flex items-baseline">
                                  <span className="mr-1">{CURRENCY}</span>
                                  <span>
                                    {(
                                      varient.price /
                                      (1 - varient.old_price / 100)
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
                  </div>
                );
              })}
            </div>

            {/* Swipe Hint */}
            <AnimatePresence>
              {showHint && products.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                >
                  <div className="bg-moon-200/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <svg 
                      className="w-5 h-5 animate-pulse" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 5l7 7-7 7M5 5l7 7-7 7" 
                      />
                    </svg>
                    <span className="text-sm font-medium">اسحب لرؤية المزيد</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Desktop Layout - Grid centered */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center w-full" dir="rtl">
              {products.map((product) => {
              const varient = product.varients?.[0];
              const discount =
                varient?.old_price > varient?.price
                  ? Math.round(((varient.old_price - varient.price) / varient.old_price) * 100)
                  : null;

              const getUniqueColors = (product) => {
                if (!Array.isArray(product.varients)) {
                  return [];
                }
                const seenColorIds = new Set();
                const uniqueColors = [];
                for (let i = 0; i < product.varients.length; i++) {
                  const variant = product.varients[i];
                  const color = variant?.colors?.[0];
                  if (color && !seenColorIds.has(color.id)) {
                    seenColorIds.add(color.id);
                    uniqueColors.push(color);
                  }
                }
                return uniqueColors;
              };

              const uniqueColors = getUniqueColors(product);


              return (
                <motion.div
                  key={product.id}
                  onClick={() => {
                    setLoading(true);
                    router.push(`/products?pid=${product.id}`);
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
                        <div style={{ justifyContent: "center", alignItems: "center" }} className="lds-facebook"><div></div><div></div><div></div></div>
                      </div>
                    ) : (
                      <>
                        <Image
                          fill
                          style={{ objectFit: 'cover' }}
                          className='rounded-t-xl' 
                          src={
                            product.images?.[0]?.formats?.medium?.url 
                              ? `${IMG_URL}${product.images[0].formats.medium.url}`
                              : product.images?.[0]?.url
                              ? `${IMG_URL}${product.images[0].url}`
                              : DEF_IMG || '/no-image.jpg'
                          }
                          alt={product.name_ar || 'Product'}
                          sizes="308px"
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
                    <div className="flex flex-col items-start" style={{ width: '276px', height: '85px', gap: '12px' }}>
                      {/* Product Name/Code - Right aligned */}
                      <div className="text-base font-medium text-gray-800 text-right w-full">
                        {product.name_ar} - {product.code}
                      </div>

                      {/* Colors - Right aligned */}
                      <div className="flex items-center justify-start gap-1 w-full">
                        {uniqueColors && uniqueColors.slice(0, 3).map((color) => (
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
                      {varient?.price && (
                        <>
                          <div className="text-2xl font-bold text-gray-900 flex items-baseline">
                            <span className="mr-1">{CURRENCY}</span>
                            <span>{varient.price}</span>
                          </div>
                          {varient?.old_price > 0 && (
                            <div className="text-sm text-gray-400 line-through flex items-baseline">
                              <span className="mr-1">{CURRENCY}</span>
                              <span>
                                {(
                                  varient.price /
                                  (1 - varient.old_price / 100)
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
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">لا توجد منتجات متاحة حالياً.</div>
      )}
    </div>
  );
}