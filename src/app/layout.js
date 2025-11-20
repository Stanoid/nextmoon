"use client";
import "./globals.css";
import './custom.css';
import { React, useEffect, useState, useRef, useContext } from "react";
import { API_URL ,Theme, IMG_URL} from "./local";
import Cart from "./comps/cart";
import { NextUIProvider } from "@nextui-org/react";
import CatDrop from "./comps/catDrop";
import Footer from "./comps/footer";
import NavbarC from "./comps/navbar";
import dynamic from "next/dynamic";
import {Provider} from "react-redux"
import './globals.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistor,store } from "./lib/store";
import Mob from "../../public/mob.svg";
const Cartl = dynamic(() => import('./comps/cartl'))
import { FaCircleDot } from "react-icons/fa6";
import {Divider, Button , Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { FaSearch, FaUserCircle,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import AnnounceComp from "./comps/announce";
import { FaUser,FaFacebook, FaInstagram,FaXTwitter,FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CartContext } from "./contexts/cartContext";
import AuthenContext from "./contexts/AuthCon";
import localFont from 'next/font/local'
import Cookies from "universal-cookie";
import Logowhite from "../../public/logored.svg";
import { useRouter, usePathname } from "next/navigation";
import { BsX } from "react-icons/bs";
import { I18nProvider } from "./lib/i18n";
import { useSelector } from "react-redux";
const ArFont = localFont({ src: './styles/fonts/alfont_com_SomarGX.ttf' })
const EnFont = localFont({ src: './styles/fonts/gothambook-webfont.woff2' })

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname()
  const isProductPage = pathname.includes('/products');
  const isAdminPage = pathname.startsWith('/admin');
  const inputRef = useRef(null);

  const bgColorClass = isProductPage ? 'bg-white' : 'bg-gray-50';

  //const userData = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  const [openCart, setOpenCart] = useState(false);
  const [openCartl, setOpenCartl] = useState(false);
  const childCompRef = useRef();
  const [eleft,setEleft] = useState(null)
  const [eltop,setEtop] = useState(null)
  const [cat,setCat] = useState(null);
  const [logindata,setLogindata] = useState(null)
  const [searchTog,setSearchTog] = useState(false);
  const firstRenderRef = useRef(true)
  const [draw,setDraw] = useState(false)
  const [searwidth,setSearwidth] = useState(0);
  const [sugges,setSugges] = useState([])
  //let { cart } = useContext(CartContext);
  const ls = require("local-storage");

  useEffect(() => {

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      getCats();
    } else {

    }



  //loginval();

  }, [])





  useEffect(() => {
    if (searchTog && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchTog]);




  const getCats=()=>{



    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",

      },

  };

    fetch(`${API_URL}sections?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("secti",data);

       setCat(data);
      }).then(()=>{

      })


    }


  const logoutUser = () => {

    ls.set("atkn", "");

    router.push("/logout");
  }


  const handleOpenCart = (open) => {
    setOpenCart(open);
  };
  const handleOpenCartl = (open) => {
    setOpenCartl(open);
  };
  const [utype, setutype] = useState(0);

  const handleSearch = (el) =>{
//

// if(el.target.value.lenght<4){
//

//   return;
// }



if(el.target.value.length<3){

  setSugges([]);

}else{

  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        // "Authorization": 'Bearer ' + ls.get("atkn")
    },
  };
  fetch(`${API_URL}products?func=SearchWithkeyword&keyword=${el.target.value}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(`the data for te search sug`, data)
      setSugges(data)
    }).then(()=>{

    })

}


  }





  const drawSugg = (el)=>{

    setEleft(el.target.getBoundingClientRect().left);
    setSearwidth(el.target.getBoundingClientRect().width);
    setEtop(el.target.getBoundingClientRect().top);
    setDraw(true);
  }





  return (
    <html className="" lang="en">
      <head>
      <meta name=" theme-color" content="#f00" />
      <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}'); // Replace with your Pixel ID
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=459328530406208&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={ArFont.className} style={{}}>
        <NextUIProvider>
          <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
          <I18nProvider defaultLocale="ar">
        <CartContext>
          <AuthenContext>
            {!isAdminPage && (
            <section className="w-full" >
            <div className="  w-full  text-white "
             style={{backgroundSize:20}}>
        <div className=" w-full  " style={{position:"fixed",
          backgroundSize:20,top:0,zIndex:15}} >

        <NavbarC rel={false} searchTog={searchTog} setSearchTog={(sta)=>{setSearchTog(sta)}} cat={cat} openCart={(t)=>{handleOpenCart(t)}}  openFav={handleOpenCartl}  />

</div>

        {/* Spacer for fixed navbar */}
        <div className="h-[60px] sm:h-[60px] lg:h-[218px]"></div>

        {searchTog && (
  <div
    onClick={() => {
      setSearchTog(false);
      setDraw(false);
    }}
    className="fixed inset-0 z-[60] flex justify-center items-start pt-20 lg:pt-32 bg-black/40 overflow-y-auto px-4"
    style={{ cursor: 'pointer' }}
  >
    <div className="w-full max-w-3xl" style={{ cursor: 'default' }}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setSearchTog(false);
            setDraw(false);
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close search"
        >
          <BsX className="text-2xl text-gray-600" />
        </button>

        {/* Search Input */}
        <div className="relative p-4 lg:p-6">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              id="search_field"
              placeholder="ابحث عن منتج أو كود المنتج..."
              autoComplete="off"
              onFocus={drawSugg}
              onChange={handleSearch}
              className="w-full border-2 border-gray-200 rounded-xl pr-12 pl-4 py-3 lg:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-moon-200 focus:ring-2 focus:ring-moon-100 transition-all text-sm lg:text-base"
            />
          </div>
        </div>

        {/* Results */}
        {draw && (
          <div className="max-h-[60vh] overflow-y-auto bg-gray-50 border-t border-gray-200">
            {sugges?.length === 0 ? (
              <div className="h-48 flex flex-col justify-center items-center text-gray-400 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mb-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <p className="text-base font-medium">لا توجد نتائج</p>
                <p className="text-sm mt-1">جرب البحث بكلمات مختلفة</p>
              </div>
            ) : (
              <div className="p-3 lg:p-4 space-y-2">
                {sugges.map((sug, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      location.href = "/products?pid=" + sug.id;
                      setDraw(false);
                      setSearchTog(false);
                    }}
                    dir="rtl"
                    className="flex items-center gap-3 lg:gap-4 hover:bg-white bg-white/50 p-3 lg:p-4 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-moon-100 hover:shadow-md"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          sug.images?.[0]?.url
                            ? `${IMG_URL || ''}${sug.images[0].url}`
                            : "/no-image.jpg"
                        }
                        alt={sug.name_ar}
                        className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg border-2 border-gray-100 group-hover:border-moon-200 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm lg:text-base font-semibold text-gray-800 truncate group-hover:text-moon-300 transition-colors">
                        {sug.name_ar}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-500 mt-1 inline-flex items-center gap-1">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                          {sug.code}
                        </span>
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-moon-200 transition-colors flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)}


        <div style={{maxWidth:"100%",}} className="  text-moon-300  text-md whitespace-nowrap  font-medium  transition-colors  py-0.5 w-full
          space-x-2 flex mt-1 pb-1
        flex-row-reverse -only  justify-center items-center  ">








        {/* <div onClick={()=>{router.push("/")}} className=" mx-3
          cursor-pointer border-b-4 border-moon-200/60 text-moon-200 pb-0.5 " > الرئيسية </div>
     */}
   <div className="blok sm:block lg:hidden "  >
    <div className="w-32"></div>
    </div>


        {/* {cat&&cat.map(ct=>(


    <CatDrop data={ct}  lable={ct.name_ar}/>
    ))}
         <a href="/about" >
        <div  className=" cursor-pointer hover:border-b-2 border-moon-300/40 pb-0.5 " > من نحن؟ </div>
        </a>
        <a href="/contactus" >
        <div className=" cursor-pointer hover:border-b-2 border-moon-300/40 pb-0.5 " > إتصل بنا </div>
       </a> */}




        </div>
       </div>
            </section>
            )}

            <section>
            <div className="">
                      <div className="flex  flex-col ">
                        <Cart
                          ref={childCompRef}
                          openHandler={handleOpenCart}
                          open={openCart}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex  flex-col ">


  <Cartl
  ref={childCompRef}
  openHandler={handleOpenCartl}
  open={openCartl}
/>



                      </div>
                    </div>
            </section>


            {isAdminPage ? (
              <section className="w-full min-h-screen" dir="auto">
                {children}
              </section>
            ) : (
              <section className={`${bgColorClass} el-messiri-text`} dir="auto">
                <div
                  className="
                    lg:max-w-[1280px]
                    w-full
                    lg:px-8
                    overflow-auto
                    lg:mx-auto
                    min-h-screen
                  "
                >
                  {children}
                </div>
              </section>
            )}

            {!isAdminPage && (
            <section>


  <Footer />


            </section>
            )}






          </AuthenContext>
        </CartContext>
        </I18nProvider>
  </PersistGate>
        </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
