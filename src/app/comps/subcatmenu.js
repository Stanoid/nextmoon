"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdClose, MdKeyboardArrowRight } from "react-icons/md";
import { useI18n } from "../lib/i18n";

export default function Subcatmenu({ subCat = [] }) {
  const router = useRouter();
  const { t, direction } = useI18n();
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  const safeSubCat = Array.isArray(subCat) ? subCat : [];
  const totalItems = safeSubCat.length;
  const desktopInitialLimit = 8;
  const mobileItemLimit = 9;

  const half = Math.ceil(safeSubCat.length / 2);
  const firstHalf = safeSubCat.slice(0, half);
  const secondHalf = safeSubCat.slice(half);

  // No scroll behavior - subcatmenu stays in place

  const handleCategoryClick = (item) => {
    try {
      if (!item) return;
      const catId = item?.catagory?.id;
      if (catId) {
        router.push(`/categories?cid=${catId}`);
        setShowAllDesktop(false);
      }
    } catch (err) {
      console.error('Error navigating to category:', err);
    }
  };

  const getCategoryName = (item) => {
    try {
      if (!item) return '';
      return item.name_ar || item.name || '';
    } catch (err) {
      return '';
    }
  };

  return (
    <>
      {/* Desktop Mega Menu */}
      <div 
        dir={direction} 
        className="hidden md:block w-full bg-white border-b border-gray-100 z-40 relative"
      >
        {totalItems > 0 ? (
          showAllDesktop ? (
            // Expanded Mega Menu
            <div className="relative bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                  onClick={() => setShowAllDesktop(false)}
                  className={`absolute top-4 text-gray-400 hover:text-gray-600 transition-colors ${
                    direction === 'rtl' ? 'left-4' : 'right-4'
                  }`}
                >
                  <MdClose size={28} />
                </button>

                <div className="grid grid-cols-12 gap-8">
                  {/* Categories - 2 columns */}
                  <div className="col-span-5 grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="space-y-1">
                      {firstHalf.map((item, index) => {
                        const categoryName = getCategoryName(item);
                        return (
                          <div
                            key={item.id || index}
                            onClick={() => handleCategoryClick(item)}
                            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-moon-50 hover:to-pink-50 cursor-pointer transition-all duration-200"
                          >
                            <MdKeyboardArrowRight className="text-moon-200 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                            <span className="text-gray-700 group-hover:text-moon-200 font-medium text-sm transition-colors">
                              {categoryName}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-1">
                      {secondHalf.map((item, index) => {
                        const categoryName = getCategoryName(item);
                        return (
                          <div
                            key={item.id || index}
                            onClick={() => handleCategoryClick(item)}
                            className="group flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-moon-50 hover:to-pink-50 cursor-pointer transition-all duration-200"
                          >
                            <MdKeyboardArrowRight className="text-moon-200 opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                            <span className="text-gray-700 group-hover:text-moon-200 font-medium text-sm transition-colors">
                              {categoryName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Featured Images */}
                  <div className="col-span-7 grid grid-cols-3 gap-4">
                    <div className="col-span-2 relative rounded-xl overflow-hidden shadow-lg group h-64">
                      <Image
                        src="/featured/IMG-20250802-WA0007.jpg"
                        alt="Featured"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                        <div>
                          <h3 className="text-white text-xl font-bold mb-1">{t('discoverProducts')}</h3>
                          <p className="text-white/90 text-sm">{t('newCollection')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative rounded-xl overflow-hidden shadow-md group h-30">
                        <Image
                          src="/featured/IMG-20250802-WA0003.jpg"
                          alt="Offer 1"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      </div>
                      <div className="relative rounded-xl overflow-hidden shadow-md group h-30">
                        <Image
                          src="/featured/IMG-20250802-WA0010.jpg"
                          alt="Offer 2"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Collapsed Menu Bar
            <div className="max-w-7xl mx-auto px-6 py-3">
              <ul className="flex items-center justify-start gap-1">
                {safeSubCat.slice(0, desktopInitialLimit).map((item, index) => {
                  const categoryName = getCategoryName(item);
                  return (
                    <li key={item.id || index}>
                      <button
                        onClick={() => handleCategoryClick(item)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-moon-200 hover:bg-moon-50 rounded-lg transition-all duration-200"
                      >
                        {categoryName}
                      </button>
                    </li>
                  );
                })}
                {totalItems > desktopInitialLimit && (
                  <li>
                    <button
                      onClick={() => setShowAllDesktop(true)}
                      className="px-4 py-2 text-sm font-medium text-moon-200 hover:bg-moon-50 rounded-lg transition-all duration-200 flex items-center gap-1"
                    >
                      {t('seeMore')}
                      <span className="text-xs text-gray-500">({totalItems})</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-3">
            <p className="text-gray-400 text-sm">{t('noCategories')}</p>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div dir={direction} className="md:hidden w-full bg-white border-b border-gray-100 py-2">
        {totalItems > 0 ? (
          <ul className="flex flex-col gap-1 px-3">
            {safeSubCat.map((item, index) => {
              const categoryName = getCategoryName(item);
              return (
                <li key={item.id || index}>
                  <button
                    onClick={() => handleCategoryClick(item)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-moon-50 hover:text-moon-200 rounded-lg transition-all duration-200"
                  >
                    {categoryName}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm px-3">{t('noCategories')}</p>
        )}
      </div>

    </>
  );
}
