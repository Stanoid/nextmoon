'use client';

import React, { useState, useEffect, useRef } from "react";
import ImageZoom from "react-image-zooom";
import styled, { createGlobalStyle } from "styled-components";
import { FaArrowUp, FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Import arrow icons
import { IMG_URL, Theme } from "../local";
import { motion } from "framer-motion";
import Image from "next/image";

const GlobalStyles = createGlobalStyle`
  #root {
    position: relative;
    height: auto;
  }
`;

function Lens({ data = [] }) {
  const [zoomv, setZoomv] = useState(false); // For the in-place lens zoom
  const [galleryImage, setGalleryImage] = useState(null); // The currently displayed main image URL
  const [isModalOpen, setIsModalOpen] = useState(false); // For the full-screen modal
  // New state for tracking the current image index within the modal
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0); 

  // Ref to track if a mouse down/touch start event just occurred
  // to differentiate between a click for zoom vs a click for modal
  const isZoomingRef = useRef(false);

  useEffect(() => {
      if (data.length > 0) {
          const firstUrl = data[0]?.attributes?.url;
          if (firstUrl) setGalleryImage(IMG_URL + firstUrl);
      }
  }, [data]);

  const handleClick = (url) => {
      if (url) setGalleryImage(IMG_URL + url);
  };

  const handleMainImageMouseDown = () => {
      setZoomv(true);
      isZoomingRef.current = true; // Mark that a zoom interaction started
  };

  const handleMainImageMouseUp = () => {
      setZoomv(false); // Reset zoomv when mouse leaves or button is up
      isZoomingRef.current = false; // Reset the ref
  };

  const handleMainImageTouchEnd = () => {
      setZoomv(false);
      if (isZoomingRef.current) { // If touchStart was for zoom (i.e., a drag occurred)
          isZoomingRef.current = false; // reset
      } else { // If it was a quick tap, open modal
          // Find the index of the currently displayed galleryImage to open modal at that image
          const currentMainImageSrc = galleryImage;
          const initialModalIndex = data.findIndex(
              (img) => IMG_URL + img.attributes?.url === currentMainImageSrc
          );
          setCurrentModalImageIndex(initialModalIndex !== -1 ? initialModalIndex : 0);
          setIsModalOpen(true);
      }
  };

  const handleMainImageClick = (e) => {
      if (!zoomv && !isZoomingRef.current) {
          const currentMainImageSrc = galleryImage;
          const initialModalIndex = data.findIndex(
              (img) => IMG_URL + img.attributes?.url === currentMainImageSrc
          );
          setCurrentModalImageIndex(initialModalIndex !== -1 ? initialModalIndex : 0);
          setIsModalOpen(true);
      }
  };

  // Navigation functions for modal images
  const goToPrevModalImage = () => {
      setCurrentModalImageIndex((prevIndex) =>
          prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
  };

  const goToNextModalImage = () => {
      setCurrentModalImageIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
  };

  return (
    <div dir="rtl" id="root">
      <GlobalStyles />
      <div className="w-full flex flex-col-reverse lg:flex-row">
        
        <div className="flex lg:hidden flex-row space-x-2 overflow-x-auto pb-2">
          {data.map((img, index) => {
            const thumbUrl = IMG_URL + img.attributes?.url;
            return (
              <div key={index} className="w-16 h-16 relative cursor-pointer">
                <Image
                  quality={40}
                  objectFit="cover"
                  className="rounded-md shadow-sm"
                  fill
                  onClick={() => handleClick(img.attributes?.url)}
                  src={thumbUrl}
                  alt={`image-${index}`}
                />
              </div>
            );
          })}
        </div>

        <div
          id="bb"
          onMouseDown={handleMainImageMouseDown}
          onMouseUp={handleMainImageMouseUp}
          onMouseLeave={() => { setZoomv(false); isZoomingRef.current = false; }}
          onTouchStart={(e) => {
            e.preventDefault();
            setZoomv(true);
            isZoomingRef.current = true;
          }}
          onTouchEnd={handleMainImageTouchEnd}
          onClick={handleMainImageClick}
          style={{
            backgroundColor: zoomv ? Theme.primary : "",
            WebkitUserSelect: "none",
            zIndex: zoomv ? 30 : 0,
          }}
          className={`relative transition-all duration-75 rounded-md mb-4 p-2
            w-[343px] h-[326px] 
            lg:w-[528px] lg:h-[606px] 
            mx-auto`}
        >
          {galleryImage && (
            <ImageZoom
              className="w-full h-full object-cover rounded-md"
              src={galleryImage}
              alt="Zoomed product image"
              zoom="600"
            />
          )}

          <div className="absolute bottom-2 w-full left-0 px-2 flex justify-center items-center text-xs text-white">
            <motion.div>
              <FaArrowUp className="mr-1 animate-bounce" />
            </motion.div>
            إضغط و اسحب على الصورة للتكبير (Click for full screen)
          </div>
        </div>

        <div className="hidden lg:flex flex-col space-y-2 pr-2">
          {data.map((img, index) => {
            const thumbUrl = IMG_URL + img.attributes?.url;
            return (
              <div key={index} className="w-16 h-16 relative cursor-pointer">
                <Image
                  quality={40}
                  objectFit="cover"
                  className="rounded-md shadow-sm"
                  fill
                  onClick={() => handleClick(img.attributes?.url)}
                  src={thumbUrl}
                  alt={`thumb-${index}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {zoomv && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-20" />
      )}

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2"
          onClick={() => setIsModalOpen(false)} 
        >
          <div 
            className="relative bg-white h-screen w-screen p-4 rounded-lg shadow-lg max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)] flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()} 
          >
            <button
  onClick={() => setIsModalOpen(false)}
  className="absolute flex items-center gap-2 px-2 py-1 border border-gray-900 rounded-md top-2 right-2 text-gray-800 font-bold bg-white text-xs leading-none z-20 hover:bg-gray-100"
  aria-label="Close modal"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
  اغلاق
</button>


            <div className="relative flex items-center justify-center w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-gray-900 rounded-lg shadow-xl overflow-hidden mx-auto max-w-full md:max-w-3xl lg:max-w-4xl">
    {data.length > 1 && (
        <>
            <button
                onClick={goToPrevModalImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white text-3xl md:text-4xl opacity-70 hover:opacity-100 transition-opacity duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Previous image"
                style={{
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                }}
            >
                <FaAngleLeft />
            </button>
        </>
    )}

    {data.length > 0 && data[currentModalImageIndex] ? (
        <ImageZoom
            className="w-full h-full object-contain p-4 bg-gray-800 rounded-lg z-0"
            src={IMG_URL + data[currentModalImageIndex].attributes?.url}
            alt={`Modal image ${currentModalImageIndex + 1}`}
            zoom="600"
        />
    ) : (
        <p className="text-white text-lg text-center p-4">Loading image...</p>
    )}

    {data.length > 1 && (
        <>
            <button
                onClick={goToNextModalImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white text-3xl md:text-4xl opacity-70 hover:opacity-100 transition-opacity duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Next image"
                style={{
                    background: 'linear-gradient(to left, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                }}
            >
                <FaAngleRight />
            </button>
        </>
    )}
</div>

            {/* Modal Thumbnails */}
            {data.length > 1 && ( // Only show thumbnails if more than one image
                <div className="flex flex-row space-x-2 overflow-x-auto p-2 mt-4 w-full justify-center flex-shrink-0">
                    {data.map((img, index) => {
                        const thumbUrl = IMG_URL + img.attributes?.url;
                        return (
                            <div
                                key={index}
                                className={`w-[48px] h-[48px] lg:w-[70px] lg:h-[70px] relative cursor-pointer flex-shrink-0 border-2 ${
                                    index === currentModalImageIndex ? 'border-blue-500' : 'border-transparent'
                                } rounded-md shadow-sm overflow-hidden`}
                                onClick={() => setCurrentModalImageIndex(index)}
                            >
                                <Image
                                    quality={40}
                                    objectFit="cover"
                                    className="rounded-md"
                                    fill
                                    src={thumbUrl}
                                    alt={`modal-thumb-${index}`}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lens;