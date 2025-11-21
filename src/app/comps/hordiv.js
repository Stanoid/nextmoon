import React, { useState, useEffect } from 'react'
import ProductCopm from './saveproduct'
import { motion, AnimatePresence } from 'framer-motion'

function HorDiv(props) {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Hide hint after 3 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Layout - improved with swipe hint */}
      <div className="relative lg:hidden">
        <div
          // dir='rtl'
          className='scrollable-content w-lvw flex items-center p-2 px-4 overflow-x-scroll snap-x snap-mandatory'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '16px' }}
          onScroll={() => setShowHint(false)}
        >
          {props.data && props.data.map((product, index) => (
            product.status ? (
              <div
                key={index}
                className="flex justify-center items-center snap-start"
              >
                <ProductCopm atcbtn={props.btn} data={product} /> 
              </div>
            ) : null
          ))}
        </div>

        {/* Swipe Hint */}
        <AnimatePresence>
          {showHint && props.data && props.data.length > 1 && (
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

        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>

      {/* Desktop Layout - 4 cards per row */}
      <div
        dir="rtl"
        className="hidden lg:grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
      >
        {props.data && props.data.map((product, index) => (
          product.status ? (
            <div key={index}>
              <ProductCopm atcbtn={props.btn} data={product} /> 
            </div>
          ) : null
        ))}
      </div>
    </>
  )
}

export default HorDiv
