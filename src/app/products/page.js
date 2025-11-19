"use client";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useState, useEffect, useContext } from "react";
import { API_URL, CURRENCY, Theme } from "../local";
import QuantEl from "../comps/quantel";
import { FaHeart, FaStar } from 'react-icons/fa6'
import { BsHeartFill,BsCartPlusFill } from 'react-icons/bs';
import { useDispatch,useSelector } from 'react-redux';
import Lens from "../comps/Lens"
import { motion } from 'framer-motion';
import { addToCart,removeFromCart } from '../lib/actions/counterAction';
import { CartCon } from "../contexts/cartContext";
import OptionEL from "../comps/optionEL";
import Head from "next/head";
import { Accordion,AccordionItem } from '@nextui-org/react';
import {  FaRecycle } from 'react-icons/fa6';
import { FaBars } from 'react-icons/fa';
import { useI18n } from "../lib/i18n";


const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Product({}) {
  const { t, locale } = useI18n();
  const [db, setDb] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [lod, setLod] = useState(true);
  const [selectedV, setSelectedV] = useState();
  const [pref, setPref] = useState();
  const [varients,setVarients] = useState([])
  const [modelno,setModelno] = useState(null);
  const [selectedC, setSelectedC] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [sizesel, setSizesel] = useState(null);
  const [colorsel, setColorsel] = useState(null);
  const [pcode,setPcode] = useState(null);
  const [stock,setStock] = useState(0);
  const [qty,setQty]=useState(1);
  const [mimg,setmimg] = useState();
  const [imgs,setImgs]=useState([]);
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const cart = useSelector((state) => state)
  const dispatch = useDispatch();
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  useEffect(() => {

    setmimg(0);
    //


    getFullProduct();


      // callback function to call when event triggers
      const onPageLoad = () => {

       // setLod(true);
      };

      // Check if the page has already loaded
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
      }



      // for (let i = 0; i < product.data.length; i++) {
      //   if (product.data[i].id == getQueryVariable("pid")) {
      //




      //   } else {
      //   }
      // }






  },[]);


  const varselectHandler = (vid)=>{
setQty(1)
setSelectedV(vid);
//setPref(prodRef)
//console.log("aasa",prodRef)
const vrs = db.attributes.varients.data;

for (let i = 0; i < vrs.length; i++) {
 if(vrs[i].id==vid){
  setPrice(vrs[i].attributes.price);
  setStock(vrs[i].attributes.stock);
  setDiscount(vrs[i].attributes.old_price)
 // console.log(vrs[i].attributes.old_price,vrs[i].attributes.price)
 }

}





  }



  const getFullProduct = ()=>{

    setLod(true);
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // "Authorization": 'Bearer ' + ls.get("atkn")
        },

    };

      fetch(`${API_URL}products/${getQueryVariable("pid")}?func=getFullProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //

       console.log("ddddddddddddddd",data)

          setImgs(JSON.parse(data.data.attributes.img));
          setPrice(data.data.attributes.varients.data[0].attributes.price);
          setDiscount(data.data.attributes.varients.data[0].attributes.old_price);
          setStock(data.data.attributes.varients.data[0].attributes.stock);
          setSelectedV(data.data.attributes.varients.data[0].id);
          setPref(data.data.attributes.varients.data[0].attributes.product_ref);
          setPcode(data.data.attributes.code);
         setVarients(data.data.attributes.varients.data);
          setSelectedC(data.data.attributes.varients.data[0].attributes.colors.data[0].id);
          setSize(data.data.attributes.varients.data[0].attributes.sizes.data[0].id);
          setColor(data.data.attributes.varients.data[0].attributes.colors.data[0].attributes.colorCode);
          setDb(data.data);
        }).then(() => {
        setLod(false);

        });


}





  const { cartData, addTofav, favData, useNotifi, removeFromFav } =
    useContext(CartCon);

  const HandleAddToCart = () => {
   dispatch(addToCart({
    data: db,
    selvar: selectedV,
    name:db.attributes.name_ar,
    code:db.attributes.code,
    // img: db.attributes.img[0].url,
    code: db.attributes.code,
      img:
        db.attributes.img && Array.isArray(db.attributes.img) && db.attributes.img[0]?.url
          ? db.attributes.img[0].url
          : "/default-image.png",
    product_ref:pref,
    qty: qty,
  }))

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
   //
      useNotifi("success", "تمت إضافة المنتج إلى السلة");

  };


  const handleRemoveCart = ()=>{
    dispatch(removeFromCart(selectedV));
    useNotifi("success", " Done");
  }



  const handleimgselection = (index)=>{
    setmimg(index)
  }



  //legacy code.
  // const  ls = require('local-storage');
  // const router = useRouter();

  const HandleAddToFav = (id) => {

    if(!udata){
      useNotifi("error", "الرجاء تسجيل الدخول لإضافة المنتج للمفضلة");
    return;

    }


    const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + udata.data.jwt
      },
      body: JSON.stringify(
          {

              "pid":db.id,



            }
        )

  };

    fetch(`${API_URL}likes?func=AddToLikes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        useNotifi("success", "تمت إضافة المنتج إلى المفضلة");


      }).then(()=>{


      })




    // if (favData.length == 0) {
    //   addTofav(db);

    //   //useNotifi("success","Product has been added to Liked")
    // } else {
    //   if (
    //     favData.find((obj) => obj.id === parseInt(getQueryVariable("pid"))) ==
    //     undefined
    //   ) {
    //     addTofav(db);

    //     // useNotifi("success","Product has been added to Liked")
    //   } else {

    //     removeFromFav(db.id);
    //   }

    //   // const object = array.find(obj => obj.id === 3);

    //   // old cart handler (uncontrollable for loop)
    //   // for (let i = 0; i < cartData.length; i++) {
    //   //   if(cartData[i].id===parseInt(getQueryVariable("pid"))){
    //   //
    //   //    return
    //   //   }else{
    //   //
    //   //     addToCart(db);

    //   //   }
    //   //   }
    // }
  };

  function oldPrice(newPrice, discountPercentage) {
   console.log("aaaa",newPrice,discountPercentage)
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
    <div dir='rtl' className='lg:pt-12  ' >
      <Head>
        {/* <title>{"Minimoon | " + db.attributes&&db.attributes.name_en} </title>
        <meta name="description" content={db.attributes.descriptionEn} /> */}
        <meta name="theme-color" />
        <link rel="icon" href="/favicon.ico" />
      </Head>





      {/* <ToastContainer  limit={3}/> */}

    {
  !lod? <div className="main p-2 " style={{ width: "100%"}}>


  <div
    className="flex-col lg:flex-row sm:flex-col md:flex-col lg:gap-6"
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    }}
  >

   <div className='w-full lg:w-1/2 -mx-4 lg:mx-0'>
    <Lens data={db?.attributes?.images?.data || []} />
   </div>

    <div
    className='mt-4 sm:mt-4 lg:mt-0 pl-0 sm:pl-0 lg:pl-0 w-full lg:w-1/2'
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <div className=" w-full px-2">
        <span

          style={{
            backgroundColor: Theme.secondary,
            color: "white",
            borderRadius: 20,
            padding: "7px 14px",
            fontSize: 15,
          }}
          className="px-2.5 py-0.5 text-xs   rounded-xl "
        >
        {db&&db.attributes.subcatagory.data.attributes.name_ar}

        </span>
        <div
        className=''
          style={{
            display: "flex",
      alignItems:"center",
      justifyContent:"space-between",


          }}
        >


{/* <motion.div

whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.9 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                HandleAddToFav();
              }}
              className="shadow-md"
              style={{
                color: "#FA5882",
                backgroundColor: "white",

                fontSize: 25,
                padding: "8px 12px",
                paddingTop: 9,
                paddingBottom: 7,
                borderRadius: 8,


              }}
            >
              <BsHeartFill />
            </motion.div> */}


      <div  className='flex flex-col my-3'>
      <div className='bg-gray-200 text-center lg:w-[176px] lg:h-[35px] rounded-full'>
            <h2
              style={{
                fontWeight: "bold",

                width:"100%",
                lineHeight:"150%"

              }}
              className="max-w-xl mt-2 text-base lg:text-lg   font-semibold leading-loose tracking-tight text-gray-900  "
            >
              {pcode} : رقم الصنف
            </h2>
          </div>

          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 20,
                width:"100%",

                lineHeight: 1.3,
              }}
              className="max-w-xl mt-6  text-right font-semibold leading-loose tracking-tight text-gray-700  "
            >
              {db&&db.attributes.name_ar}
            </h2>
          </div>





   </div>


          </div>





        <p
        dir='rtl'
          style={{ fontWeight: 400, fontSize: 14, lineHeight: "150%", fontWeight:400 }}
          className="max-w-xl lg:mt-6   text-right  font-semibold leading-loose tracking-wide text-gray-900  dark:text-gray-800"
        >
          {db&&db.attributes.description_ar}
        </p>

        <div className="flex items-center my-4 space-x-1">
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-yellow-400 text-base" />
            <FaStar className="text-gray-300 text-sm" />
            <div className="text-base mx-2 text-gray-600">(3.4k)</div>
          </div>


        <p
          style={{
            display: "inline-block",
            fontWeight: "bold",
            textAlign:"right",
            fontSize: 25,

            width:"100%",
            color: "black",
          }}
          className="inline-block lg:text-3xl lg:font-extrabold text-lg  "
        >
          <span>  {price} {CURRENCY} </span>
          {discount ==0
          ?<></>: (<span
            style={{
              marginLeft: "0.5 rem",
              fontSize: "1 rem",
              lineHeight: "1.5 rem",

              textDecorationLine: "line-through",
            }}
            className="ml-3 text-base font-medium  text-red-600 line-through dark:text-gray-400"
          >
            {oldPrice(price,discount)} {CURRENCY}
          </span>)}
        </p>
      </div>

      <div
        className="w-full sm:w-full "
        style={{
          display: "flex",
          alignSelf:"center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",

        }}
      >
        <div style={{width:"100%"}} className='   py-4 mb-4 rounded-md' >
         <OptionEL varselect={(vid)=>{varselectHandler(vid)}}
         vari={selectedV}
         selid={selectedV} vars={varients} />


               </div>




               <div

             className=' py-4 pb-5 '
            style={{


              color: "white",

              cursor: "pointer",
              display:"flex",
              alignItems:"center",
              width:"100%",
              justifyContent:"center",
              flexDirection:"column",

              borderRadius: "0px 0px 10px 10px",
            }}
          >



 {/* <div >
 <QuantEl qty={qty} quantHandler={(q)=>{setQty(q)}} stock={stock}/>
 </div> */}



<div class='flex flex-col  lg:flex-row space-x-2 lg:gap-[16px] gap-4'>
  {stock <= 0 ? (
    <div class='text-center font-bold text-red-500 py-3 bg-red-100 px-4 rounded-md'>
      نفذت الكمية
    </div>
  ) : (
    <motion.div
      className='rounded-lg px-6 lg:max-w-full  max-w-[343px]  py-3.5 bg-[#e5675c] text-white flex items-center justify-center cursor-pointer'
      onClick={() => {
        HandleAddToCart();
      }}
      style={{
        width: '411px',
        height: '52px',
        whiteSpace: 'nowrap',
      }}

    >
      <div
      className='flex items-center'
        style={{
          color: 'white',
          fontSize: 23,
          marginLeft: 8,
        }}
      >
        <BsCartPlusFill />
      </div>
      <span className='text-base'> أضف إلى السلة </span>
    </motion.div>
  )}

  <motion.div
    className='rounded-lg lg:w-[165px] mt-2 lg:mt-0 w-full px-6 py-3.5 bg-white border border-[#d3d3d3] flex items-center justify-center cursor-pointer'
    onClick={() => {
      HandleAddToFav();
    }}
    style={{
      height: '52px',
      whiteSpace: 'nowrap',
    }}

  >
    <div
      className='text-gray-500'
      style={{
        fontSize: 23,
        marginLeft: 8,
      }}
    >
      {/* <BsHeartFill /> */}


      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              <span className="absolute top-0 right-0 -mt-0 -mr-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">4</span>
</svg>
    </div>
    <span className='text-base text-gray-900'> أضف إلى المفضلة </span>
  </motion.div>
</div>
            {/* <div onClick={()=>{console.log(cart)}} className='w-8 h-8 bg-red-800 text-white rounded-sm shadow-md '>
              cart
            </div>
            <div onClick={()=>{handleRemoveCart()}} className='w-8 h-8 bg-red-800 text-white rounded-sm shadow-md '>
              remove from cart
              </div> */}
          </div>



        <div style={{ marginTop: 14, width: "100%" }}>
          <div
            className="flex-col lg:flex-co sm:flex-col md:flex-col"
            style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >



          </div>

        </div>



      </div>


    </div>
  </div>

  <div dir="rtl" className=' mt-12 '>
  <div className="flex justify-start border-b border-gray-300 mb-4">
    <div className="px-4 py-2 text-gray-700 border-b-2 border-mon-200 font-semibold">وصف المنتج</div>
    <div className="px-4 py-2 text-gray-700">الإرجاع و معلومات و الشحن</div>
  </div>

  <div className="mb-8 text-base text-gray-500">
    <ul className="list-disc list-outside text-right">
      <li className="mb-2">مجموعة متنوعة من الخيارات: متوفرة بألوان وأشكال متعددة لتناسب ذوقك الشخصي.</li>
      <li className="mb-2">جودة متينة: تحافظ على الحالة المثالية حتى بعد عدة غسلات.</li>
      <li className="mb-2">راحة فائقة: خفيفة الوزن ومريحة، مثالية للارتداء طوال اليوم.</li>
      <li className="mb-2">مثالية للهدايا: هدية ممتازة لأحبائك أو هدية فاخرة لنفسك.</li>
    </ul>
    <div className="text-moot-200 text-right mt-4 flex items-center justify-end">
      {/* <span className="ml-1">اقرأ المزيد</span> */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div className="text-right">
    <h2 className="text-xl font-bold flex items-center justify-start mb-4">
      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12V10a2 2 0 012-2h10a2 2 0 012 2v2m-4 8h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2z" />
      </svg> */}
      سياسة الاستبدال والاسترجاع
    </h2>
    <ul className="list-disc list-outside text-base text-gray-500">
      <li className="mb-2">الإستبدال حق مضمون كل عملائنا وهو يشمل جميع المنتجات التي نعرضها على متجرنا.</li>
      <li className="mb-2">جميع المنتجات المعروضة على متجرنا قابلة لسياسة الإستبدال وفق الشروط والأحكام المنصوص عليها في هذه الصفحة.</li>
      <li className="mb-2">يمكن الإستبدال إذا كان المنتج بنفس حالته الأصلية عند الشراء ومغلفا بالغلاف الأصلي.</li>
      <li className="mb-2">الاستبدال خلال خمسة (5) أيام من تاريخ الشراء. - يرجى التواصل معنا عبر صفحة اتصل بنا أو عبر أرقامنا الهاتفية من أجل طلب الإستبدال.</li>
      <li className="mb-2">يرجى تصوير المنتج وإرساله مع تحديد المدينة والعنوان ورقم الطلب ليتم إستبداله بمنتج اخر في حالة كان المنتج فاسدا أو به عيب معين .</li>
      <li>عند ارسال الطلبية , في حالة حدوث خطا في المقاس من طرف الشركة تتكفل الشركة المسؤولية و جميع التكاليف (سعر التوصيل ) في حالة قام العميل بطلب مقاس ما و عند استلام الطلبية وجد ان المقاس لا يناسبه يتحمل العميل المسؤولية الكاملة و جميع التكاليف في حالة ما اراد تغيير المنتج بمقاس اخر ( التكاليف تتمثل في سعر الشحن )</li>
    </ul>
  </div>
</div>
</div>
:<div  style={{ width: "100%",opacity:0.4, padding: "20px 10px" }}>

 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>

   <div className='px-2' >
   <Skeleton count={4} />
    </div>

    <div className='flex mt-2 items-center justify-between w-full ' >

      <div className='mx-2 flex-grow ' >
        <Skeleton count={3} />
      </div>





    </div>


    <div className='mx-2 mt-2 flex-grow ' >
        <Skeleton count={3} />
      </div>

  </SkeletonTheme>




</div>

    }
    </div>
  );
}
