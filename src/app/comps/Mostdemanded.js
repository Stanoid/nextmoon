'use client';

import React, { useEffect, useState, useRef } from 'react';
import {CURRENCY, API_URL, IMG_URL, DEF_IMG } from '../local'
import { Spinner, Button, Tooltip } from '@nextui-org/react';
import { FaArrowLeft, FaArrowRight, FaStar, FaHeart } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
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

  const productScrollRef = useRef(null);
  const router = useRouter();
  const CURRENCY = "د.ج";

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
    <div className="py-8 ">
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
                            <div className="absolute top-2 right-2 p-2 bg-white/95 rounded-full shadow-sm z-10">
                              <FaHeart className="text-gray-400 text-lg" />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Product Details Section */}
                      <div  className="flex flex-col justify-between bg-white p-4" style={{ width: '308px', height: '193px', gap: '12px' }}>
                        <div className="flex flex-col items-end" style={{ width: '276px', height: '85px', gap: '12px' }}>
                          <div className="text-base font-medium text-gray-800 text-right w-full">
                            {product.name_ar} - {product.code}
                          </div>

                          <div className="flex items-center justify-end w-full gap-1">
                            {uniqueColors.slice(0, 3).map((color) => (
                              <div key={color.id}>
                                <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-white" content={color.name_ar}>
                                  <div
                                    style={{ backgroundColor: color.colorCode }}
                                    className="h-[16px] w-[16px] rounded-full border border-gray-200"
                                  ></div>
                                </Tooltip>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-end w-full gap-1">
                            <div className="text-xs text-gray-600">(3.4k)</div>
                            {[...Array(4)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-sm" />
                            ))}
                            <FaStar className="text-gray-300 text-sm" />
                          </div>
                        </div>

                        {/* Price Section - 276x64 with gap 4px - Right aligned */}
                        <div className="flex flex-col items-end justify-end" style={{ width: '276px', height: '64px', gap: '4px' }}>
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

            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
            
            {/* Scroll Indicator */}
            {products.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {products.map((_, index) => (
                  <div
                    key={index}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-3 h-3 bg-moonsec-100 ring-2 ring-moonsec-100 ring-offset-2'
                        : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Layout - with arrow buttons */}
          <div className="hidden lg:flex items-center justify-center gap-2 w-full">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="p-2 rounded-full h-[48px] w-[48px] flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(270deg, rgba(224, 36, 36, 0.4), rgba(224, 36, 36, 0))' }}
            >
              <FaArrowLeft size={18} />
            </button>

            <div
              ref={productScrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 sm:px-4 w-full scrollbar-hide"
              style={{ gap: '16px' }}
              dir="ltr"
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
                <motion.div
                  key={product.id}
                  onClick={() => {
                    setLoading(true);
                    router.push(`/products?pid=${product.id}`);
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg cursor-pointer flex flex-col overflow-hidden relative shrink-0 snap-start"
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
                        <div className="absolute top-2 right-2 p-2 bg-white/95 rounded-full shadow-sm z-10">
                          <FaHeart className="text-gray-400 text-lg" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Product Details Section - 308x193 with padding 4px and gap 12px */}
                  <div className="flex flex-col justify-between bg-white p-4" style={{ width: '308px', height: '193px', gap: '12px' }}>
                    {/* Name, Colors, Stars Section - 276x85 with gap 12px */}
                    <div className="flex flex-col items-end" style={{ width: '276px', height: '85px', gap: '12px' }}>
                      {/* Product Name/Code - Right aligned */}
                      <div className="text-base font-medium text-gray-800 text-right w-full">
                        {product.name_ar} - {product.code}
                      </div>

                      {/* Colors - Right aligned */}
                      <div className="flex items-center justify-end gap-1 w-full">
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

          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="p-2 rounded-full h-[48px] w-[48px] flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(270deg, rgba(224, 36, 36, 0.4), rgba(224, 36, 36, 0))' }}
          >
            <FaArrowRight size={18} />
          </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">لا توجد منتجات متاحة حالياً.</div>
      )}
    </div>
  );
}