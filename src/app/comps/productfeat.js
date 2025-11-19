'use client';

import React, { useState, useEffect } from 'react';
import { API_URL } from '../local';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useI18n } from '../lib/i18n';
import { useRef } from 'react';
import { ProductCardSkeleton } from '../../components/skeletons';

function ProductFeat() {
  const { t, direction } = useI18n();
  const [subcats, setSubcats] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchTopSubcats();
  }, []);

  // Removed auto-rotation for better UX

  const fetchTopSubcats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}subcatagories?func=getTopSecSubcats`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log("Top subcategories:", data);
      setSubcats(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching top subcategories:", err);
      setLoading(false);
    }
  };

  const getImageUrl = (img) => {
    if (!img || !img.url) {
      return 'https://place-hold.it/300x500/666/fff/000.gif';
    }
    let url = img.url;
    if (!url.startsWith('http')) {
      const base = API_URL.replace(/\/api\/?$/, '');
      return base + url;
    }
    return url;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0.5 },
    hover: {
      opacity: 0.7,
      transition: {
        duration: 0.3,
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 1,
    },
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
      },
    },
  };

  const CategoryCard = ({ img, name, link, isLarge = false, index = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        ref={containerRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => {
          try {
            if (link) {
              window.location.assign(link);
            }
          } catch (err) {
            console.error('Error navigating:', err);
          }
        }}
        className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group
          ${isLarge ? 'col-span-2 row-span-2 min-h-[300px] lg:min-h-[400px]' : 'min-h-[180px] lg:min-h-[220px]'}
          flex items-end
          bg-gray-100
          transition-all duration-300
          ${isHovered ? 'shadow-xl' : ''}`}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              filter: isHovered ? 'brightness(1.05)' : 'brightness(1)',
            }}
          />
        </motion.div>

        {/* Gradient Overlay with better colors */}
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />



        {/* Content */}
        <motion.div
          variants={textVariants}
          initial="initial"
          whileHover="hover"
          className={`absolute bottom-0 left-0 right-0 p-4 lg:p-5 flex items-center justify-center z-10
            ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        >
          <h3
            className={`text-white font-bold text-center w-full
              ${isLarge ? 'text-lg lg:text-2xl' : 'text-sm lg:text-lg'}
              transition-all duration-200`}
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
            }}
          >
            {name}
          </h3>
        </motion.div>
      </motion.div>
    );
  };

  // Show first 5 subcategories without rotation
  const visibleSubcats = subcats.slice(0, 5);

  return (
    <div
      ref={containerRef}
      dir={direction}
      className="py-8 lg:py-12 w-full max-w-7xl mx-auto sm:px-6"
    >
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'} justify-between items-center mb-8 lg:mb-12`}
      >
        <motion.h2
          initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-2xl lg:text-4xl font-bold text-gray-900 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
          style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('bestSections')}
        </motion.h2>
        <motion.a
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          href="/products"
          className={`text-sm lg:text-base text-gray-600 hover:text-moon-200 transition-colors duration-200 font-medium
            ${direction === 'rtl' ? 'text-left' : 'text-right'}
            flex items-center gap-2`}
        >
          <span>{t('viewAllProducts')}</span>
          <span className="inline-block">→</span>
        </motion.a>
      </motion.div>

      {/* Grid with stagger animation */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
          <ProductCardSkeleton count={5} />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr"
        >
          {visibleSubcats.map((subcat, idx) => (
            <CategoryCard
              key={subcat.id}
              img={getImageUrl(subcat.img)}
              name={subcat.name_ar || subcat.name || 'Category'}
              link={`/categories?cid=${subcat.id}`}
              isLarge={idx === 0}
              index={idx}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default ProductFeat;
