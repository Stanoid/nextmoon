'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { API_URL, IMG_URL } from '../local';
import ProductCopm from '../comps/product';
import HorDiv from '../comps/hordiv';
import SidebarFilter from '../comps/prodfilter';
import { useI18n } from '../lib/i18n';

const Slider = dynamic(() => import('../comps/mainSlider'));

export default function Home() {
  const { t, locale } = useI18n();
  const [lod, setLod] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState(null);
  const [filters, setFilters] = useState({});
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');

  const getCatProducts = () => {
    if (!cid) return;

    fetch(`${API_URL}products?func=getProductswithCatid&cid=${cid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Products fetched from server:", data);
        setProducts(data);
        setLod(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLod(false);
      });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowMobileFilter(false);
    fetch(
      `${API_URL}products?func=filterProducts&cid=${cid}&sizes=${newFilters.sizes}&colors=${newFilters.colors}&priceRange=${newFilters.priceRange}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredResults({ name_ar: 'النتائج', id: 0, products: data });
      });
  };

  useEffect(() => {
    getCatProducts();
  }, [cid]);

  return (
    <>
      <div className="w-full">
          {/* Mobile Filter Button - Top */}
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-3 py-2.5">
              <button
                onClick={() => setShowMobileFilter(true)}
                className="w-full px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 hover:border-moon-200 text-gray-500 rounded-lg flex items-center justify-center gap-2 font-normal transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 text-moon-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm">{t('filterProducts')}</span>
                {(filters.sizes || filters.colors || filters.priceRange) && (
                  <span className="bg-moon-200 text-white text-xs px-2 py-0.5 rounded-full font-medium ml-1">
                    {t('active')}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full px-3 lg:px-12 gap-4 lg:gap-8 mt-4 lg:mt-6 mb-8">
            {/* Sidebar Filter - Desktop */}
            <div className="hidden lg:block lg:w-[280px] shrink-0 sticky top-6 self-start">
              <SidebarFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-8" dir="ltr">
              {/* Subcategory Banners */}
              <div className="w-full py-2 lg:mt-8 grid grid-cols-4  gap-4 items-center justify-center">
                {products?.products?.map((prd) => (
                  <div
                    key={prd.id}
                    onClick={() => router.push(`/subcatagories?sid=${prd.id}`)}
                    className="shadow-md min-w-28 w-28 lg:w-40 lg:min-w-40 mx-1.5 rounded-sm hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="w-28 h-28 lg:w-40 lg:h-40 relative">
                      <Image
                        quality={20}
                        fill
                        objectFit="cover"
                        className="rounded-md rounded-b-none"
                        src={`${IMG_URL}${products.data?.images?.[0]?.formats?.medium?.url}`}
                        alt="Product"
                      />
                    </div>
                    <div className="py-2 w-full text-sm text-center">{/* {prd.name_ar} */}</div>
                  </div>
                ))}
              </div>

                {filteredResults && (
                <div className="w-full mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-5 mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" dir="rtl">
                      <div className="text-right">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                          {locale === 'ar' ? filteredResults.name_ar : locale === 'fr' ? filteredResults.name_fr || filteredResults.name_ar : filteredResults.name_en || filteredResults.name_ar}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {filteredResults.products.length} {t('product')}
                        </p>
                      </div>
                      <button
                        onClick={() => setFilteredResults(null)}
                        className="text-sm text-moon-200 hover:text-moon-300 flex items-center gap-1 font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {t('clearFilter')}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-0 lg:gap-8 justify-items-center">
                    {filteredResults.products.map(
                      (prd) =>
                        prd.status && (
                          <div key={prd.id} className="w-full flex justify-center -my-16 lg:my-0">
                            <div className="transform scale-[0.6] lg:scale-[0.95]">
                              <ProductCopm atcbtn={false} data={prd} />
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}

              {!filteredResults && Array.isArray(products) &&
                products.map((sub, index) => (
                  <div className="w-full mb-6" key={sub.id}>
                    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-5 mb-4" dir="rtl">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-800 text-right">{sub.name_ar}</h2>
                      <p className="text-sm text-gray-500 mt-1 text-right">
                        {sub.products?.length || 0} منتج
                      </p>
                    </div>

                    {index % 2 === 0 ? (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-0 lg:gap-8 justify-items-center">
                        {sub.products?.map(
                          (prd) =>
                            prd.status && (
                              <div key={prd.id} className="w-full flex justify-center -my-16 lg:my-0">
                                <div className="transform scale-[0.6] lg:scale-[0.95]">
                                  <ProductCopm atcbtn={false} data={prd} />
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    ) : (
                      <div className="w-full">
                        <HorDiv cid={sub.id} data={sub.products} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)}>
          <div 
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center ">
              <h2 className="text-xl font-bold text-gray-800">{t('filters')}</h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowMobileFilter(false)}
                aria-label={t('close')}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <SidebarFilter onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
