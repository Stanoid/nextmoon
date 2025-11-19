'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaArrowUp, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { IMG_URL, Theme } from '../local';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageZoom from 'react-image-zooom';


const GlobalStyles = createGlobalStyle`
  #root {
    position: relative;
    height: auto;
  }
`;

function Lens({ data = [] }) {
  const [zoomv, setZoomv] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);
  const isZoomingRef = useRef(false);

  const [modalZoomLevel, setModalZoomLevel] = useState(1);
  const [modalTransformOrigin, setModalTransformOrigin] = useState('center center');

  const modalImageRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) {
      const firstUrl = data[0]?.attributes?.url;
      if (firstUrl) setGalleryImage(IMG_URL + firstUrl);
    }
  }, [data]);

  const handleClick = (url) => {
    if (url) setGalleryImage(IMG_URL + url);
  };

  const openModalWithIndex = (index) => {
    setCurrentModalImageIndex(index);
    setIsModalOpen(true);
    setModalZoomLevel(1); 
    setModalTransformOrigin('center center'); 
  };

  const handleMainImageTouchEnd = () => {
    setZoomv(false);
    if (!isZoomingRef.current) {
      const index = data.findIndex(img => IMG_URL + img.attributes?.url === galleryImage);
      openModalWithIndex(index !== -1 ? index : 0);
    } else {
      isZoomingRef.current = false;
    }
  };

  const handleModalImageClick = (e) => {
    if (modalZoomLevel === 1) {
      // Zoom in to 2x
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setModalTransformOrigin(`${x}% ${y}%`);
      setModalZoomLevel(2);
    } else {
      // Zoom out
      setModalZoomLevel(1);
      setModalTransformOrigin('center center');
    }
  };

  const handleModalMouseMove = (e) => {
    if (modalZoomLevel > 1) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setModalTransformOrigin(`${x}% ${y}%`);
    }
  };

  return (
    <div dir="rtl" id="root">
      <GlobalStyles />

      <div className="w-full flex flex-col-reverse lg:flex-row">
        {/* Mobile thumbnails */}
        <div className="flex lg:hidden flex-row gap-2 overflow-x-auto pb-2 px-2 scrollbar-hide">
          {data.map((img, i) => (
            <div 
              key={i} 
              className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 cursor-pointer border-2 rounded-md transition-all ${
                galleryImage === IMG_URL + img.attributes?.url 
                  ? 'border-moon-200 shadow-md' 
                  : 'border-gray-200'
              }`}
            >
              <Image
                src={IMG_URL + img.attributes?.url}
                alt={`thumb-${i}`}
                fill
                style={{ objectFit: 'cover' }}
                onClick={() => handleClick(img.attributes?.url)}
                className="rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Main Image - Sticky on desktop */}
        <div className="w-full lg:sticky lg:top-4 lg:self-start">
          <div
            id="bb"
            onMouseDown={() => { setZoomv(true); isZoomingRef.current = true; }}
            onMouseUp={() => { setZoomv(false); isZoomingRef.current = false; }}
            onMouseLeave={() => { setZoomv(false); isZoomingRef.current = false; }}
            onTouchStart={(e) => { e.preventDefault(); setZoomv(true); isZoomingRef.current = true; }}
            onTouchEnd={handleMainImageTouchEnd}
            onClick={() => {
              if (!zoomv && !isZoomingRef.current) {
                const index = data.findIndex(img => IMG_URL + img.attributes?.url === galleryImage);
                openModalWithIndex(index !== -1 ? index : 0);
              }
            }}
            style={{ backgroundColor: zoomv ? Theme.primary : '', WebkitUserSelect: 'none', zIndex: zoomv ? 30 : 0 }}
            className="relative transition-all duration-75 rounded-lg mb-4 p-3 w-full max-w-[343px] h-[380px] sm:max-w-[400px] sm:h-[420px] lg:max-w-none lg:w-full lg:h-[600px] mx-auto bg-gray-50 flex items-center justify-center"
          >
            {galleryImage && (
              <img
                src={galleryImage}
                alt="Zoomable"
                className="w-full h-full object-contain rounded-md"
              />
            )}

            <div className="absolute bottom-3 w-full left-0 px-4 flex justify-center items-center text-xs sm:text-sm text-gray-700 bg-white/90 py-2 rounded-b-lg backdrop-blur-sm">
              <motion.div>
                <FaArrowUp className="mr-1 animate-bounce" />
              </motion.div>
              <span className="hidden sm:inline">إضغط و اسحب على الصورة للتكبير (Click for full screen)</span>
              <span className="sm:hidden">اضغط للتكبير</span>
            </div>
          </div>
        </div>

        {/* Desktop Thumbnails - Sticky, no scrolling */}
        <div className="hidden lg:flex flex-col gap-3 pr-3 lg:sticky lg:top-4 lg:self-start">
          {data.map((img, i) => (
            <div 
              key={i} 
              className={`relative w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded-lg transition-all hover:scale-105 ${
                galleryImage === IMG_URL + img.attributes?.url 
                  ? 'border-moon-200 shadow-lg ring-2 ring-moon-100' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={IMG_URL + img.attributes?.url}
                alt={`thumb-lg-${i}`}
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handleClick(img.attributes?.url)}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-7xl flex flex-col lg:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/95 hover:bg-white text-gray-900 px-4 py-2.5 rounded-lg flex items-center gap-2 z-20 shadow-xl transition-all hover:scale-105 font-medium"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5" />
              </svg>
              <span className="hidden sm:inline">إغلاق</span>
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-white/95 text-gray-900 px-4 py-2 rounded-lg z-20 shadow-xl font-medium text-sm">
              {currentModalImageIndex + 1} / {data.length}
            </div>

            {/* Main Image Area */}
            <div className="relative flex items-center justify-center w-full h-full flex-1 px-12 sm:px-16 lg:px-20">
              {/* Previous Button */}
              <button
                className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-white/95 hover:bg-white text-gray-900 rounded-full text-xl sm:text-2xl z-10 shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setCurrentModalImageIndex(i => (i === 0 ? data.length - 1 : i - 1));
                  setModalZoomLevel(1); 
                  setModalTransformOrigin('center center'); 
                }}
                disabled={data.length <= 1}
              >
                <FaAngleLeft />
              </button>

              {/* Image Container */}
              <div
                className="relative w-full flex items-center justify-center h-full overflow-hidden" 
                onClick={handleModalImageClick}
                onMouseMove={handleModalMouseMove}
                ref={modalImageRef}
                style={{ cursor: modalZoomLevel === 1 ? 'zoom-in' : 'zoom-out' }}
              >
                <img
                  src={IMG_URL + data[currentModalImageIndex].attributes?.url}
                  alt={`modal-${currentModalImageIndex}`}
                  style={{
                    objectFit: 'contain', 
                    transform: `scale(${modalZoomLevel})`,
                    transformOrigin: modalTransformOrigin,
                    transition: 'transform 0.2s ease-out', 
                    maxHeight: '85vh',
                    maxWidth: '90vw',
                    width: 'auto',
                    height: 'auto',
                  }}
                  className="rounded-lg"
                />
                
                {/* Zoom Hint */}
                {modalZoomLevel === 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-xl">
                    انقر للتكبير
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 p-3 lg:p-4 bg-white/95 hover:bg-white text-gray-900 rounded-full text-xl sm:text-2xl z-10 shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setCurrentModalImageIndex(i => (i === data.length - 1 ? 0 : i + 1));
                  setModalZoomLevel(1);
                  setModalTransformOrigin('center center');
                }}
                disabled={data.length <= 1}
              >
                <FaAngleRight />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 lg:gap-3 mt-4 pb-4 px-4 justify-center overflow-x-auto scrollbar-hide">
              {data.map((img, i) => (
                <div
                  key={i}
                  className={`relative w-14 h-14 lg:w-20 lg:h-20 flex-shrink-0 cursor-pointer border-3 rounded-lg transition-all hover:scale-105 ${
                    i === currentModalImageIndex 
                      ? 'border-moon-200 ring-2 ring-moon-200 shadow-lg' 
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  onClick={() => {
                    setCurrentModalImageIndex(i);
                    setModalZoomLevel(1);
                    setModalTransformOrigin('center center');
                  }}
                >
                  <Image
                    src={IMG_URL + img.attributes?.url}
                    alt={`thumb-modal-${i}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lens;