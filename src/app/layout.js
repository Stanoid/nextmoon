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
import Breadcrumbs from "./comps/Breadcrumbs";
import SearchContent from "./comps/SearchContent";
import MobileSearchContent from "./comps/MobileSearchContent";
import MobileSearchInput from "./comps/MobileSearchInput";
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
  const [searchValue, setSearchValue] = useState('')
  const [isMobileSearch, setIsMobileSearch] = useState(false)
  const mobileSearchInputRef = useRef(null)
  const [isSearching, setIsSearching] = useState(false)
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

  useEffect(() => {
    if (isMobileSearch && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearch]);




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

  const handleSearch = (el) => {
    const query = el.target.value;
    setSearchValue(query);
    
    if (query.length === 0) {
      setDraw(false);
      setSugges([]);
      setIsSearching(false);
      return;
    }

    if (query.length < 3) {
      setDraw(true);
      setSugges([]);
      setIsSearching(false);
      return;
    }

    setDraw(true);
    setIsSearching(true);
    
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    fetch(`${API_URL}products?func=SearchWithkeyword&keyword=${query}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(`the data for te search sug`, data)
        setSugges(data)
        setIsSearching(false);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setIsSearching(false);
      });
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

        <NavbarC 
          rel={false} 
          searchTog={searchTog} 
          setSearchTog={(sta)=>{
            setSearchTog(sta);
            // On mobile, open the mobile search modal
            if (window.innerWidth < 1024) {
              setIsMobileSearch(sta);
            }
          }} 
          searchValue={searchValue}
          onSearchChange={handleSearch}
          searchDropdown={draw && sugges?.length >= 0 ? (
            <div className="max-h-[60vh] overflow-y-auto">
              <SearchContent 
                isSearching={isSearching}
                sugges={sugges}
                onProductClick={(id) => {
                  location.href = "/products?pid=" + id;
                  setDraw(false);
                  setSearchTog(false);
                  setSearchValue('');
                }}
              />
            </div>
          ) : null}
          cat={cat} 
          openCart={(t)=>{handleOpenCart(t)}}  
          openFav={handleOpenCartl}  
        />

</div>

        {/* Spacer for fixed navbar */}
        <div className="h-16 sm:h-16 lg:h-[140px]"></div>

        {/* Desktop Search Backdrop - only show when dropdown is open */}
        {searchTog && draw && (
          <div 
            className="hidden lg:block fixed inset-0 z-[49]" 
            onClick={() => { 
              setSearchTog(false); 
              setDraw(false); 
              setSearchValue(''); 
            }}
          />
        )}

        {/* Mobile Search Modal */}
        {isMobileSearch && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-white">
            <div className="flex flex-col h-full">
              {/* Mobile Search Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <button
                  onClick={() => {
                    setIsMobileSearch(false);
                    setSearchTog(false);
                    setDraw(false);
                    setSearchValue('');
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex-1">
                  <MobileSearchInput 
                    inputRef={mobileSearchInputRef}
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              {/* Mobile Search Results */}
              <div className="flex-1 overflow-y-auto">
                {draw && (
                  <MobileSearchContent 
                    isSearching={isSearching}
                    sugges={sugges}
                    onProductClick={(id) => {
                      location.href = "/products?pid=" + id;
                      setIsMobileSearch(false);
                      setSearchTog(false);
                      setDraw(false);
                      setSearchValue('');
                    }}
                  />
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
              <section className="w-full md:mx-0 mx-4 min-h-screen" dir="auto">
                {children}
              </section>
            ) : (
              <section className={`${bgColorClass} el-messiri-text`} dir="auto">
                <Breadcrumbs />
                <div
                  className="
                    w-full
                    overflow-auto
                    lg:mx-auto
                    px-2 sm:px-0
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
