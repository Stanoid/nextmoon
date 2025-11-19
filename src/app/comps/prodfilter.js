'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '../local';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

export default function SidebarFilter({ onFilterChange }) {
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedColors, setSelectedColors] = useState(new Set());
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [isSizesOpen, setIsSizesOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [sizeRes, colorRes, subcat] = await Promise.all([
          fetch(`${API_URL}products?func=getSizesFilter`),
          fetch(`${API_URL}products?func=getColorsFilter`),
        // fetch(`${API_URL}subcatagories?func=getAllSubcat`)
        
        ]);

        const sizeData = await sizeRes.json();
        const colorData = await colorRes.json();
const subcatData =  subcat
console.log("subcatsdddddddddddddddddd",subcatData);
        const newSizes = Array.isArray(sizeData) ? sizeData : sizeData?.data || [];
        const newColors = Array.isArray(colorData) ? colorData : colorData?.data || [];

        if (sizes.length === 0) setSizes(newSizes);
        if (colors.length === 0) setColors(newColors);
      } catch (err) {
        console.error('Failed to fetch filters', err);
      }
    };

    fetchFilters();
  }, [sizes.length, colors.length]);

  const handleSizeClick = (sizeId) => {
    const newSelectedSizes = new Set(selectedSizes);
    newSelectedSizes.has(sizeId) ? newSelectedSizes.delete(sizeId) : newSelectedSizes.add(sizeId);
    setSelectedSizes(newSelectedSizes);
  };

  const handleColorClick = (colorId) => {
    const newSelectedColors = new Set(selectedColors);
    newSelectedColors.has(colorId) ? newSelectedColors.delete(colorId) : newSelectedColors.add(colorId);
    setSelectedColors(newSelectedColors);
  };

  const handleFilterSubmit = () => {
    const minPrice = priceRange.min === '' ? 0 : parseInt(priceRange.min);
    const maxPrice = priceRange.max === '' ? 10000 : parseInt(priceRange.max);
    
    onFilterChange({
      sizes: Array.from(selectedSizes).join(','),
      colors: Array.from(selectedColors).join(','),
      priceRange: `${minPrice},${maxPrice}`,
    });
  };

  const handleClearFilters = () => {
    setSelectedSizes(new Set());
    setSelectedColors(new Set());
    setPriceRange({ min: '', max: '' });
    onFilterChange({
      sizes: '',
      colors: '',
      priceRange: '0,10000',
    });
  };

  const hasActiveFilters = selectedSizes.size > 0 || selectedColors.size > 0 || priceRange.min !== '' || priceRange.max !== '';

  return (
    <aside dir='rtl' className="w-full sm:w-64 lg:w-[280px] mt-12 lg:mt-[48px] bg-white p-5 shadow-lg rounded-xl border border-gray-100 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">الفلاتر</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <FaTimes className="text-xs" />
            مسح الكل
          </button>
        )}
      </div>

      {/* Sizes Filter */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <button
          className="flex justify-between items-center w-full pb-3 text-right cursor-pointer group hover:text-moon-200 transition-colors"
          onClick={() => setIsSizesOpen(!isSizesOpen)}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-700 group-hover:text-moon-200">المقاس</h3>
            {selectedSizes.size > 0 && (
              <span className="bg-moon-200 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedSizes.size}
              </span>
            )}
          </div>
          {isSizesOpen ? (
            <FaChevronUp className="text-gray-400 text-sm" />
          ) : (
            <FaChevronDown className="text-gray-400 text-sm" />
          )}
        </button>

        {isSizesOpen && (
          <div className="flex flex-wrap gap-2 justify-end pt-3 max-h-48 overflow-y-auto scrollbar-hide">
            {sizes.slice(0, 30).map((size) => {
              const isSelected = selectedSizes.has(size.id);
              return (
                <button
                  key={size.id}
                  className={`
                    min-w-[40px] px-3 py-2 text-sm font-medium text-center rounded-lg transition-all transform hover:scale-105
                    ${isSelected
                      ? 'bg-moon-200 text-white shadow-md'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'}
                  `}
                  onClick={() => handleSizeClick(size.id)}
                >
                  {size.name_ar}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <button
          className="flex justify-between items-center w-full pb-3 text-right cursor-pointer group hover:text-moon-200 transition-colors"
          onClick={() => setIsColorsOpen(!isColorsOpen)}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-700 group-hover:text-moon-200">الألوان</h3>
            {selectedColors.size > 0 && (
              <span className="bg-moon-200 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedColors.size}
              </span>
            )}
          </div>
          {isColorsOpen ? (
            <FaChevronUp className="text-gray-400 text-sm" />
          ) : (
            <FaChevronDown className="text-gray-400 text-sm" />
          )}
        </button>

        {isColorsOpen && (
          <div className="flex flex-wrap gap-3 justify-end pt-3 max-h-48 overflow-y-auto scrollbar-hide">
            {colors.slice(0, 30).map((color) => {
              const isSelected = selectedColors.has(color.id);
              const isWhite = ['#FFFFFF', '#FFF', 'white'].includes(color.colorCode?.toUpperCase());
              return (
                <div
                  key={color.id}
                  className={`
                    relative w-9 h-9 rounded-full cursor-pointer transition-all transform hover:scale-110 shadow-sm
                    ${isSelected ? 'ring-2 ring-moon-200 ring-offset-2' : 'border-2 border-gray-200'}
                    ${isWhite ? 'border-gray-300' : ''}
                  `}
                  style={{ backgroundColor: color.colorCode }}
                  title={color.name_ar}
                  onClick={() => handleColorClick(color.id)}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-5">
        <button
          className="flex justify-between items-center w-full pb-3 text-right cursor-pointer group hover:text-moon-200 transition-colors"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h3 className="font-semibold text-gray-700 group-hover:text-moon-200">نطاق السعر</h3>
          {isPriceOpen ? (
            <FaChevronUp className="text-gray-400 text-sm" />
          ) : (
            <FaChevronDown className="text-gray-400 text-sm" />
          )}
        </button>

        {isPriceOpen && (
          <div className="pt-3 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="border border-gray-200 p-2.5 w-full text-right text-sm rounded-lg focus:ring-2 focus:ring-moon-200 focus:border-transparent transition-all"
                placeholder="من"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                className="border border-gray-200 p-2.5 w-full text-right text-sm rounded-lg focus:ring-2 focus:ring-moon-200 focus:border-transparent transition-all"
                placeholder="إلى"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
              />
            </div>
            <div className="text-xs text-gray-500 text-right">
              {priceRange.min && priceRange.max && (
                <span>من {priceRange.min} إلى {priceRange.max} د.ج</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button
        className="bg-moon-200 hover:bg-moon-300 text-white font-medium text-sm px-6 py-3 rounded-lg w-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
        onClick={handleFilterSubmit}
      >
        تطبيق الفلاتر
      </button>
    </aside>
  );
}
