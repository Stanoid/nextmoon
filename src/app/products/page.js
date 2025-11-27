"use client";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useState, useEffect, useContext } from "react";
import { API_URL, CURRENCY, Theme } from "../local";
import { FaHeart, FaStar } from 'react-icons/fa6';
import { BsCartPlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Lens from "../comps/Lens";
import { motion } from 'framer-motion';
import { addToCart, removeFromCart } from '../lib/actions/counterAction';
import { CartCon } from "../contexts/cartContext";
import OptionEL from "../comps/optionEL";
import Head from "next/head";

export default function Product() {
  const [db, setDb] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [lod, setLod] = useState(true);
  const [selectedV, setSelectedV] = useState();
  const [pref, setPref] = useState();
  const [varients, setVarients] = useState([]);
  const [pcode, setPcode] = useState(null);
  const [stock, setStock] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const dispatch = useDispatch();
  const udata = useSelector((state) => state.root.auth.data && state.root.auth.data);

  useEffect(() => {
    getFullProduct();
  }, []);

  const varselectHandler = (vid) => {
    setQty(1);
    setSelectedV(vid);
    const vrs = db.attributes.varients.data;

    for (let i = 0; i < vrs.length; i++) {
      if (vrs[i].id == vid) {
        setPrice(vrs[i].attributes.price);
        setStock(vrs[i].attributes.stock);
        setDiscount(vrs[i].attributes.old_price);
      }
    }
  };

  const getFullProduct = () => {
    setLod(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}products/${getQueryVariable("pid")}?func=getFullProduct`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPrice(data.data.attributes.varients.data[0].attributes.price);
        setDiscount(data.data.attributes.varients.data[0].attributes.old_price);
        setStock(data.data.attributes.varients.data[0].attributes.stock);
        setSelectedV(data.data.attributes.varients.data[0].id);
        setPref(data.data.attributes.varients.data[0].attributes.product_ref);
        setPcode(data.data.attributes.code);
        setVarients(data.data.attributes.varients.data);
        setDb(data.data);
      })
      .then(() => {
        setLod(false);
      });
  };

  const { useNotifi } = useContext(CartCon);

  const HandleAddToCart = () => {
    dispatch(addToCart({
      data: db,
      selvar: selectedV,
      name: db.attributes.name_ar,
      code: db.attributes.code,
      img: db.attributes.img && Array.isArray(db.attributes.img) && db.attributes.img[0]?.url
        ? db.attributes.img[0].url
        : "/default-image.png",
      product_ref: pref,
      qty: qty,
    }));

    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "AddToCart", {
        content_name: db.attributes.name_ar,
        content_ids: [db.attributes.code],
        content_type: "product",
        value: db.attributes.price,
        currency: "USD",
        quantity: qty,
      });
    }

    useNotifi("success", "تمت إضافة المنتج إلى السلة");
  };

  const HandleAddToFav = () => {
    if (!udata) {
      useNotifi("error", "الرجاء تسجيل الدخول لإضافة المنتج للمفضلة");
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + udata.data.jwt
      },
      body: JSON.stringify({
        "pid": db.id,
      })
    };

    fetch(`${API_URL}likes?func=AddToLikes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        useNotifi("success", "تمت إضافة المنتج إلى المفضلة");
      });
  };

  function oldPrice(newPrice, discountPercentage) {
    const discountFactor = 1 - (discountPercentage / 100);
    const oldPrice = newPrice / discountFactor;
    return parseInt(oldPrice);
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  return (
    <div dir='rtl' className='pt-6 md:pt-8 lg:pt-12'>
      <Head>
        <meta name="theme-color" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!lod ? (
        <div className="main px-4 sm:px-6 lg:px-10" style={{ width: "100%" }}>
          <div
            className="flex-col lg:flex-row max-w-[1500px] mx-auto"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "0px"
            }}
          >
            <div className='w-full lg:w-auto lg:flex-shrink-0'>
              <Lens data={db?.attributes?.images?.data || []} />
            </div>

            <div className='mt-6 lg:mt-0 w-full lg:w-[592px] lg:flex-shrink-0' dir='rtl'>
              <div className="w-full space-y-4">
                {/* Available Badge */}
                <div className="flex justify-start">
                  <span className="bg-teal-50 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium">
                    متوفر
                  </span>
                </div>

                {/* Product Code Badge */}
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-6 py-2 rounded-full">
                    <span className="text-gray-800 font-bold text-sm">
                      رقم الصنف: {pcode}
                    </span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl font-bold text-gray-900 text-right leading-tight">
                  {db && db.attributes.name_ar}
                </h1>

                {/* Description */}
                <p className="text-sm text-gray-600 text-right leading-relaxed">
                  {db && db.attributes.description_ar}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-start gap-2">
                  <span className="text-sm text-gray-600">(3.0)</span>
                  <div className="flex gap-0.5">
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                    <FaStar className="text-yellow-400 text-sm" />
                  </div>
                </div>
                {/* Price and Discount */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col items-start gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                      {price} {CURRENCY}
                    </span>
                    {discount > 0 && (
                      <span className=" text-gray-500 py-1 rounded-md text-right text-base line-through font-  ">
                        {oldPrice(price, discount)} {CURRENCY}
                      </span>
                    )}
                
                  </div>
                    {discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-4  py-1.5 rounded-md text-sm font-bold">
                        خصم {Math.floor(discount)}%
                      </span>
                    )}
                </div>

                {/* Size Selector */}
                <div className="space-y-3">
                  {/* <h3 className="text-sm font-bold text-red-800 text-right">اختر المقاس</h3> */}
                  <OptionEL
                    varselect={(vid) => { varselectHandler(vid) }}
                    vari={selectedV}
                    selid={selectedV}
                    vars={varients}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {stock <= 0 ? (
                    <div className='text-center font-bold text-red-500 py-3 bg-red-100 px-4 rounded-lg w-full'>
                      نفذت الكمية
                    </div>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={HandleAddToCart}
                        className='flex-1 rounded-lg px-4 py-3 bg-[#E5675C] hover:bg-[#d5574c] text-white flex items-center justify-center gap-2 transition-colors font-medium text-base'
                      >
                        <span>أضف للسلة</span>
                        <BsCartPlusFill className='text-lg' />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={HandleAddToFav}
                        className='rounded-lg px-5 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2 transition-all'
                      >
                        <span>أضف للمفضلة</span>
                        <FaHeart className='text-lg' />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div dir="rtl" className='mt-12 mb-16 lg:mb-24 max-w-[1280px] lg:mx-auto px-4 lg:px-6'>
            {/* Tabs */}
            <div className="flex justify-start border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === 'description'
                  ? 'text-moon-200 border-b-2 border-moon-200'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                وصف المنتج
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === 'shipping'
                  ? 'text-moon-200 border-b-2 border-moon-200'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                الإرجاع و معلومات الشحن
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="mb-8">
                <ul className="list-disc list-outside text-right space-y-3 pr-5">
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    مجموعة متنوعة من الخيارات: متوفرة بألوان وأشكال متعددة لتناسب ذوقك الشخصي.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    جودة متينة: تحافظ على الحالة المثالية حتى بعد عدة غسلات.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    راحة فائقة: خفيفة الوزن ومريحة، مثالية للارتداء طوال اليوم.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    مثالية للهدايا: هدية ممتازة لأحبائك أو هدية فاخرة لنفسك.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="text-right">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  سياسة الاستبدال والاسترجاع
                </h3>
                <ul className="list-disc list-outside space-y-3 pr-5">
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    الإستبدال حق مضمون لكل عملائنا ويشمل جميع المنتجات المعروضة على متجرنا.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    جميع المنتجات قابلة لسياسة الإستبدال وفق الشروط والأحكام المنصوص عليها.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    يمكن الإستبدال إذا كان المنتج بنفس حالته الأصلية عند الشراء ومغلفاً بالغلاف الأصلي.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    الاستبدال خلال خمسة (5) أيام من تاريخ الشراء. يرجى التواصل معنا عبر صفحة اتصل بنا أو عبر أرقامنا الهاتفية.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    يرجى تصوير المنتج وإرساله مع تحديد المدينة والعنوان ورقم الطلب ليتم إستبداله في حالة وجود عيب.
                  </li>
                  <li className="text-sm font-light text-gray-600 leading-relaxed">
                    في حالة خطأ في المقاس من طرف الشركة، تتحمل الشركة جميع التكاليف. أما إذا كان الخطأ من العميل، يتحمل العميل تكاليف الشحن.
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", opacity: 0.4, padding: "20px 10px" }}>
          <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
            <div className='px-2'>
              <Skeleton count={4} />
            </div>
            <div className='flex mt-2 items-center justify-between w-full'>
              <div className='mx-2 flex-grow'>
                <Skeleton count={3} />
              </div>
            </div>
            <div className='mx-2 mt-2 flex-grow'>
              <Skeleton count={3} />
            </div>
          </SkeletonTheme>
        </div>
      )}
    </div>
  );
}
