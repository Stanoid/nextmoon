'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useI18n } from '../lib/i18n';
import { API_URL } from '../local';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, direction, locale } = useI18n();
  const [dynamicNames, setDynamicNames] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch dynamic names for categories, subcategories, products with proper error handling
  const fetchDynamicNames = useCallback(async () => {
    const cid = searchParams.get('cid');
    const sid = searchParams.get('sid');
    const pid = searchParams.get('pid');

    // Reset states
    setLoading(true);
    setErrors({});
    const newNames = {};
    const newErrors = {};

    try {
      // Fetch category if cid exists
      if (cid) {
        try {
          const res = await fetch(`${API_URL}catagories?func=getCatwithId&cid=${cid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          
          const data = await res.json();
          if (data && (data.name_ar || data.name_en || data.name_fr)) {
            newNames.category = {
              ar: data.name_ar,
              en: data.name_en,
              fr: data.name_fr,
              id: cid
            };
          } else {
            newErrors.category = 'Category not found';
          }
        } catch (err) {
          console.error('Error fetching category:', err);
          newErrors.category = err.message;
        }
      }

      // Fetch subcategory if sid exists
      if (sid) {
        try {
          const res = await fetch(`${API_URL}subcatagories?func=getSubcatwithId&sid=${sid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          
          const data = await res.json();
          if (data && data.subcategory) {
            newNames.subcategory = {
              ar: data.subcategory.name_ar,
              en: data.subcategory.name_en,
              fr: data.subcategory.name_fr,
              id: sid,
              categoryId: data.subcategory.catagory?.id
            };
            
            // Also fetch parent category if not already fetched
            if (!cid && data.subcategory.catagory?.id) {
              try {
                const catRes = await fetch(`${API_URL}catagories?func=getCatwithId&cid=${data.subcategory.catagory.id}`);
                if (catRes.ok) {
                  const catData = await catRes.json();
                  if (catData) {
                    newNames.parentCategory = {
                      ar: catData.name_ar,
                      en: catData.name_en,
                      fr: catData.name_fr,
                      id: data.subcategory.catagory.id
                    };
                  }
                }
              } catch (err) {
                console.error('Error fetching parent category:', err);
              }
            }
          } else {
            newErrors.subcategory = 'Subcategory not found';
          }
        } catch (err) {
          console.error('Error fetching subcategory:', err);
          newErrors.subcategory = err.message;
        }
      }

      // Fetch product if pid exists
      if (pid) {
        try {
          const res = await fetch(`${API_URL}products?func=getProductwithId&pid=${pid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          
          const data = await res.json();
          if (data && (data.name_ar || data.name_en || data.name_fr)) {
            newNames.product = {
              ar: data.name_ar,
              en: data.name_en,
              fr: data.name_fr,
              code: data.code,
              id: pid,
              subcategoryId: data.subcatagory?.id,
              categoryId: data.catagory?.id
            };

            // Fetch parent subcategory and category if not already fetched
            if (!sid && data.subcatagory?.id) {
              try {
                const subRes = await fetch(`${API_URL}subcatagories?func=getSubcatwithId&sid=${data.subcatagory.id}`);
                if (subRes.ok) {
                  const subData = await subRes.json();
                  if (subData && subData.subcategory) {
                    newNames.parentSubcategory = {
                      ar: subData.subcategory.name_ar,
                      en: subData.subcategory.name_en,
                      fr: subData.subcategory.name_fr,
                      id: data.subcatagory.id
                    };
                  }
                }
              } catch (err) {
                console.error('Error fetching parent subcategory:', err);
              }
            }

            if (!cid && data.catagory?.id) {
              try {
                const catRes = await fetch(`${API_URL}catagories?func=getCatwithId&cid=${data.catagory.id}`);
                if (catRes.ok) {
                  const catData = await catRes.json();
                  if (catData) {
                    newNames.parentCategoryFromProduct = {
                      ar: catData.name_ar,
                      en: catData.name_en,
                      fr: catData.name_fr,
                      id: data.catagory.id
                    };
                  }
                }
              } catch (err) {
                console.error('Error fetching parent category from product:', err);
              }
            }
          } else {
            newErrors.product = 'Product not found';
          }
        } catch (err) {
          console.error('Error fetching product:', err);
          newErrors.product = err.message;
        }
      }

      setDynamicNames(newNames);
      setErrors(newErrors);
    } catch (err) {
      console.error('Error in fetchDynamicNames:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchDynamicNames();
  }, [fetchDynamicNames]);

  // Build comprehensive breadcrumb items with hierarchy
  const buildBreadcrumbItems = () => {
    const items = [
      { 
        name: t('home'), 
        path: '/', 
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )
      }
    ];

    // Handle categories page with dynamic category name
    if (pathname.includes('/categories')) {
      items.push({ name: t('categories'), path: '/categories' });
      
      if (dynamicNames.category) {
        const catName = locale === 'ar' ? dynamicNames.category.ar : 
                       locale === 'fr' ? (dynamicNames.category.fr || dynamicNames.category.ar) :
                       (dynamicNames.category.en || dynamicNames.category.ar);
        items.push({ 
          name: catName || t('categories'), 
          path: `/categories?cid=${dynamicNames.category.id}`,
          loading: loading && !catName
        });
      }
    }

    // Handle subcategories page with full hierarchy
    if (pathname.includes('/subcatagories')) {
      items.push({ name: t('categories'), path: '/categories' });
      
      // Add parent category if available
      if (dynamicNames.parentCategory) {
        const catName = locale === 'ar' ? dynamicNames.parentCategory.ar : 
                       locale === 'fr' ? (dynamicNames.parentCategory.fr || dynamicNames.parentCategory.ar) :
                       (dynamicNames.parentCategory.en || dynamicNames.parentCategory.ar);
        items.push({ 
          name: catName, 
          path: `/categories?cid=${dynamicNames.parentCategory.id}`
        });
      }
      
      if (dynamicNames.subcategory) {
        const subName = locale === 'ar' ? dynamicNames.subcategory.ar : 
                       locale === 'fr' ? (dynamicNames.subcategory.fr || dynamicNames.subcategory.ar) :
                       (dynamicNames.subcategory.en || dynamicNames.subcategory.ar);
        items.push({ 
          name: subName || t('categories'), 
          path: `/subcatagories?sid=${dynamicNames.subcategory.id}`,
          loading: loading && !subName
        });
      }
    }

    // Handle products page with full hierarchy
    if (pathname.includes('/products')) {
      items.push({ name: t('products'), path: '/products' });
      
      // Add parent category if available
      if (dynamicNames.parentCategoryFromProduct) {
        const catName = locale === 'ar' ? dynamicNames.parentCategoryFromProduct.ar : 
                       locale === 'fr' ? (dynamicNames.parentCategoryFromProduct.fr || dynamicNames.parentCategoryFromProduct.ar) :
                       (dynamicNames.parentCategoryFromProduct.en || dynamicNames.parentCategoryFromProduct.ar);
        items.push({ 
          name: catName, 
          path: `/categories?cid=${dynamicNames.parentCategoryFromProduct.id}`
        });
      }

      // Add parent subcategory if available
      if (dynamicNames.parentSubcategory) {
        const subName = locale === 'ar' ? dynamicNames.parentSubcategory.ar : 
                       locale === 'fr' ? (dynamicNames.parentSubcategory.fr || dynamicNames.parentSubcategory.ar) :
                       (dynamicNames.parentSubcategory.en || dynamicNames.parentSubcategory.ar);
        items.push({ 
          name: subName, 
          path: `/subcatagories?sid=${dynamicNames.parentSubcategory.id}`
        });
      }
      
      if (dynamicNames.product) {
        const prodName = locale === 'ar' ? dynamicNames.product.ar : 
                        locale === 'fr' ? (dynamicNames.product.fr || dynamicNames.product.ar) :
                        (dynamicNames.product.en || dynamicNames.product.ar);
        const displayName = dynamicNames.product.code ? `${prodName} - ${dynamicNames.product.code}` : prodName;
        items.push({ 
          name: displayName || t('products'), 
          path: `/products?pid=${dynamicNames.product.id}`,
          loading: loading && !prodName
        });
      }
    }

    // Handle other static routes
    const staticRoutes = {
      '/about': 'aboutUs',
      '/jobs': 'jobs',
      '/cart': 'cart',
      '/checkout': 'checkout',
      '/contactus': 'contactUs',
      '/contact': 'contactUs',
      '/favorites': 'favorites',
      '/user': 'myAccount',
    };

    Object.entries(staticRoutes).forEach(([path, key]) => {
      if (pathname === path) {
        items.push({ name: t(key), path });
      }
    });

    return items;
  };

  const breadcrumbItems = buildBreadcrumbItems();

  // Don't show breadcrumbs on home page or admin pages
  if (pathname === '/' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav 
      dir={direction} 
      className="bg-white py-3 px-4 lg:px-8"
      aria-label="Breadcrumb"
    >
      <div className="max-w-[1600px] mx-auto">
        <ol className={`flex items-center flex-wrap gap-1 text-sm ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;
          
          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <svg
                  className={`w-3 h-3 text-gray-400 ${direction === 'rtl' ? 'rotate-180 ml-1.5' : 'mr-1.5'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              
              {isLast ? (
                <span className="text-gray-900 flex items-center gap-1.5">
                  {isFirst && item.icon}
                  {item.loading ? (
                    <span className="flex items-center gap-1">
                      <span className="animate-pulse">...</span>
                      {item.name}
                    </span>
                  ) : (
                    item.name
                  )}
                </span>
              ) : (
                <button
                  onClick={() => router.push(item.path)}
                  className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
                  disabled={item.loading}
                >
                  {isFirst && item.icon}
                  {item.loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    item.name
                  )}
                </button>
              )}
            </li>
          );
        })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
