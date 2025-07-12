import React, { useState, useEffect } from "react";
import { Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Tooltip, Badge } from "@nextui-org/react";
import { MdMenu, MdOutlineShoppingBag, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaHeart, FaUserCircle, FaSearch, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";
import { API_URL } from "../local";
import Logowhite from "../../../public/logoblack.svg";
import { get } from "http";

export default function NavbarC(props) {
  const router = useRouter();
  const userData = useSelector((state) => state.root.auth.data && state.root.auth.data);
  const cartData = useSelector((state) => state.root.cart.data.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [subCat, setSubCat] = useState([]);

  // console.log(`${API_URL}subcatagories?func=getAllSubCat`, "Full fetch URL");


  const getsubcatogries = () => {
    fetch(`${API_URL}subcatagories?func=getAllSubcat`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "subc  atogriessssssssssssssssssssssssssssssssssssss data");
  
        if (Array.isArray(data)) {
          setSubCat(data.slice(0, 8)); 
        } else {
          setSubCat([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
      });
  };
  
  useEffect(() => {
    getsubcatogries();
  }, []);
  // const getSubCat = (cat) => {
  //   fetch(`/api/categories?cat=${cat}`)
  //     .then((res) => res.json())
  //     .then((data) => { 
  //       if (data && data.data) {
  //         props.setSubCat(data.data);
  //         console.log("categories", data.data);
  //       } else {
  //         props.setSubCat([]);
  //       }
  //     });
  // };
  
  const handleSearch = () => {
    props.setSearchTog(!props.searchTog);
  };

  const handleAccount = (type) => {
    switch (type) {
      case 1:
        router.push("/admin");
        break;
      case 4:
        router.push("/user");
        break;
      case 5:
        router.push("/delivery");
        break;
      default:
        router.push("/");
        break;
    }
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
    <nav className="bg-white  lg:max-[218px]  w-full">
      <div className="bg-mon-100  text-moon-200 border-b  text-sm py-2 flex items-center justify-center rtl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-bold">لا تفوت عرض رأس العام! ارتق بمجموعتك الآن.</span>
        <span className="mr-1">خصم يصل الي 50%</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>

      {/* Top Utility Bar */}
      <div className="container   lg:flex hidden mx-auto px-4 py-2  justify-between items-center text-gray-500 text-sm border-b border-gray-200 rtl">
        <div className="flex items-center gap-2 space-x-4 space-x-reverse">
          <a href="#" className="flex items-center space-x-1 space-x-reverse hover:text-gray-900">
            <span>اتصل بنا</span>
             {/* Using generic SVGs for exact match of image's icons if react-icons don't match perfectly */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-900">
            <span>من نحن</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
          <div className="flex items-center space-x-3 text-gray-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaFacebook className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaInstagram className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900"><FaTwitter className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
         
          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer hover:text-gray-900">
             {/* Using generic SVG for exact match of image's pricing icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.727A8 8 0 0118 8a8 8 0 00-8-8c-4.418 0-8 3.582-8 8s3.582 8 8 8c.707 0 1.397-.091 2.062-.257M10 20v-3m0 0l-2.5-2.5M10 17l2.5-2.5M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">افضل الاسعار</span> {/* Explicitly small text */}
            <MdOutlineKeyboardArrowDown className="h-3 w-3" />
          </div>


          <div className="flex items-center space-x-1 space-x-reverse cursor-pointer hover:text-gray-900">

            <span className="text-sm">اسرع توصيل</span> {/* Explicitly small text */}
            <MdOutlineKeyboardArrowDown className="h-3 w-3" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center rtl">

        {/* Hamburger Menu Icon (visible on small screens) */}
    

        <div className="lg:flex  items-center order-1 lg:order-3 flex-grow justify-end lg:justify-start">
          <div
            dir="rtl"
            className="relative lg:flex  items-center flex-grow
                       max-w-md lg:max-w-none lg:w-[776px] h-[46px]
                       rounded-[8px] border border-gray-300 bg-gray-100
                       focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500
                       overflow-hidden mr-4 lg:mr-0" 
          >
            <input
              type="text"
              placeholder="واش راكي تدوّري عليه؟"
              className="flex-grow h-full py-2
                         pr-4 pl-[80px] /* Adjusted padding for placeholder */
                         bg-transparent outline-none
                         text-right text-sm"
            />
            <button
              className="absolute top-[1.5px] bottom-[1.5px] left-[1.5px]
                         bg-moon-200 text-sm text-white font-medium
                         w-[46px] h-[36px] /* Kept original width for the button */
                         flex items-center justify-center
                         rounded-l-[7px]
                         z-10"
              type="submit"
              aria-label="بحث"
            >
              بحث
            </button>

          </div>
          <Logowhite
  style={{ cursor: "pointer", width: "64px", height: "26.694103240966797px" }}
  onClick={() => router.push("/")}
  className=" lg:ml-3 hidden lg:block"
/>
        </div>
        
        <div className="lg:flex hidden mx-4 items-center space-x-6 space-x-reverse order-2 lg:order-1 flex-row-reverse">

{/* 1. Favorites */}
{userData && !userData.error && (
  <motion.div className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer relative">
    <span className="text-sm ml-2 hidden sm:block">المفضلة</span>
    <Button onClick={() => props.openFav(true)} isIconOnly className="text-xl" size="md" aria-label="Favorites">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </Button>
  </motion.div>
)}

{/* 2. Cart */}
<motion.div  onClick={() => props.openCart(true)} className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
  <span className="ml-2 text-sm hidden sm:block">
    {cartData?.totalPrice || 0} $ {cartData?.totalItems || 0} منتجات
  </span>
  <Button isIconOnly size="md" aria-label="Cart">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  </Button>
</motion.div>

{/* 3. Account */}
{userData && !userData.error ? (
  <motion.div className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer space-x-1 space-x-reverse">
    <span className="text-sm hidden sm:block">حسابي</span>
    <Button onClick={() => handleAccount(userData.data.user.type)} isIconOnly className="text-2xl font-black text-gray-600 rounded-full" size="md" aria-label="Account">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    </Button>
  </motion.div>
) : (
  <motion.div>
    <Button onClick={() => router.push("/login")} className="bg-gradient-to-tr from-moonsec-100/40 to-moonsec-100 text-xs font-medium text-white px-3 py-1 rounded-md" size="sm" aria-label="Login">
      تسجيل دخول
    </Button>
  </motion.div>
)}
</div>

      </div>

  

      <div className="container mx-auto px-4  border-t bg-white  lg:max-h-[53px] border-gray-200 rtl hidden lg:block"> 
    
       {subCat && subCat.length > 0 ? (
  <ul className="flex justify-end  max-w-full items-center text-gray-700 text-sm font-medium">

    {subCat.map((item, index) => (
      <li key={index} className="flex justify-between hover:underline  items-center px-3">
        <button

onClick={() => {
            const catId = item.catagory?.id;
            if (catId) {
              router.push(`/categories?cid=${catId}`);
            } else {
              console.warn("Category ID not found", item);
            }
          }}
                    className="flex-1 text-right py-4 border-b hover:cursor-pointer  hover:text-moon-200  text-gray-900 text-sm rounded-md "
        >
          {item.name_ar}
        </button>
        {/* <span className="text-moon-200 text-base">←</span> */}
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 text-sm">لا توجد تصنيفات متاحة</p>
)}

      </div>
    </nav>
{/* mobile nav */}
    <div dir="rtl" className="lg:hidden  w-full fixed top-0 left-0 z-50">
        <div className="bg-white  w-full flex items-center justify-between px-4 py-3">
          <Logowhite onClick={() => router.push("/")} className="w-16 cursor-pointer" />



          <motion.div onClick={() => { props.openCart(true); }} 
  className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer"
>
  <Button isIconOnly className="mr-20" size="md" aria-label="Cart">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    </Button>
    <span className="ml-2 text-sm flex items-center sm:block">
    106.25 $ 4 منتجات <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
  </span>
</motion.div>


          <Button
            isIconOnly
            size="md"
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-700"
          >
            <MdMenu size={24} />
          </Button>
        </div>

   

        <motion.div
initial={{ y: "100%" }}
animate={{ y: isMenuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 right-0 h-full backdrop-blur-md max-h-[80%] w-full bg-white z-50 overflow-y-auto p-4"
        >
          <div className="flex justify-between items-center mb-6">
            <Button
              isIconOnly
              onClick={() => setIsMenuOpen(false)}
              size="sm"
              className="text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          <div className="space-y-4">
            {/* <Button
              onClick={() => props.openCart(true)}
              fullWidth
              className="bg-moon-200 text-white"
            >
              السلة ({cartData})
            </Button> */}
<div className="w-full flex divide-x divide-gray-200">
  <Button
    onClick={() => props.openFav(true)}
    className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
  >
    المفضلة
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  </Button>

  {userData && !userData.error ? (
    <Button
      onClick={() => handleAccount(userData.data.user.type)}
      className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
    >
      حسابي
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </Button>
  ) : (
    <Button
      onClick={() => router.push("/login")}
      className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
    >
      تسجيل دخول
    </Button>
  )}
</div>


<div dir="rtl" className="border-t text-sm space-y-2">
  <p className="text-sm font-semibold">التصنيفات</p>
  {subCat && subCat.length > 0 ? (
    <ul className="flex flex-col max-w-full text-gray-700 text-sm font-medium">
      {subCat.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center w-full px-3 hover:underline"
        >
          <button
            onClick={() => {
              const catId = item.catagory?.id;
              if (catId) {
                router.push(`/categories?cid=${catId}`);
              } else {
                console.warn("Category ID not found", item);
              }
            }}
            className="flex-1 text-right py-4 border-b hover:cursor-pointer hover:text-moon-200 text-gray-900 text-sm rounded-md"
          >
            {item.name_ar}
          </button>

          <span className="text-moon-200 text-base">←</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm">لا توجد تصنيفات متاحة</p>
  )}
</div>



          </div>
        </motion.div>
      </div>
      </>
  );
}
