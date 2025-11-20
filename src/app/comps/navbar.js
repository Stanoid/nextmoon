import React, { useState, useEffect } from "react";
import { Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Tooltip, Badge } from "@nextui-org/react";
import { MdMenu, MdOutlineShoppingBag, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaHeart, FaUserCircle, FaSearch, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Subcatmenu from "./subcatmenu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Image from "next/image";
import { API_URL } from "../local";
import Logowhite from "../../../public/logoblack.svg";
import { get } from "http";
import { useI18n } from "../lib/i18n";

export default function NavbarC(props) {
  const router = useRouter();
  const { t, locale, setLocale, direction } = useI18n();

  // Null guards for Redux selectors
  const authState = useSelector((state) => state?.root?.auth);
  const userData = authState?.data && !authState.data.error ? authState.data : null;

  const cartState = useSelector((state) => state?.root?.cart);
  const cartData = Array.isArray(cartState?.data) ? cartState.data : [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subCat, setSubCat] = useState([]);
  const [error, setError] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Null-safe total price calculation
  const totalPrice = React.useMemo(() => {
    try {
      if (!Array.isArray(cartData) || cartData.length === 0) {
        return 0;
      }

      return cartData.reduce((sum, item) => {
        try {
          if (!item || typeof item !== 'object') {
            console.warn('Invalid cart item:', item);
            return sum;
          }

          const selectedVariant = item?.data?.attributes?.varients?.data?.find(
            v => v && v.id === item?.selvar
          );

          const price = selectedVariant?.attributes?.price || 0;
          const qty = item?.qty || 0;

          if (typeof price !== 'number' || typeof qty !== 'number') {
            console.warn('Invalid price or quantity:', { price, qty, item });
            return sum;
          }

          return sum + (price * qty);
        } catch (err) {
          console.error('Error calculating item price:', err, item);
          return sum;
        }
      }, 0);
    } catch (err) {
      console.error('Error calculating total price:', err);
      return 0;
    }
  }, [cartData]);

  // Null-safe total items calculation
  const totalItems = React.useMemo(() => {
    try {
      if (!Array.isArray(cartData) || cartData.length === 0) {
        return 0;
      }

      return cartData.reduce((sum, item) => {
        const qty = item?.qty || 0;
        return sum + (typeof qty === 'number' ? qty : 0);
      }, 0);
    } catch (err) {
      console.error('Error calculating total items:', err);
      return 0;
    }
  }, [cartData]);

  console.log("cart data in navbar", totalItems, totalPrice);
  console.log(cartData, "cart data in navbar");

  // Smart scroll behavior for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up - show navbar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getsubcatogries = () => {
    try {
      if (!API_URL) {
        console.error('API_URL is not defined');
        setError('API URL is missing');
        return;
      }

      fetch(`${API_URL}subcatagories?func=getAllSubcat`)
        .then((res) => {
          if (!res) {
            throw new Error('No response from server');
          }
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          try {
            if (!data) {
              console.warn('No data received from subcategories API');
              setSubCat([]);
              return;
            }

            if (Array.isArray(data)) {
              setSubCat(data);
              setError(null);
            } else {
              console.warn('Subcategories data is not an array:', data);
              setSubCat([]);
            }
          } catch (err) {
            console.error('Error processing subcategories data:', err);
            setSubCat([]);
            setError('Failed to process subcategories');
          }
        })
        .catch((err) => {
          console.error("Error fetching subcategories:", err);
          setError('Failed to fetch subcategories');
          setSubCat([]);
        });
    } catch (err) {
      console.error("Error in getsubcatogries function:", err);
      setError('Failed to fetch subcategories');
      setSubCat([]);
    }
  };

  useEffect(() => {
    try {
      getsubcatogries();
    } catch (err) {
      console.error("Error in useEffect for getsubcatogries:", err);
    }
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
    try {
      if (props && typeof props.setSearchTog === 'function') {
        props.setSearchTog(!props.searchTog);
      } else {
        console.warn('setSearchTog function not available');
      }
    } catch (err) {
      console.error('Error in handleSearch:', err);
    }
  };

  const handleAccount = (type) => {
    try {
      if (!type || typeof type !== 'number') {
        console.warn('Invalid account type:', type);
        router.push("/");
        return;
      }

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
    } catch (err) {
      console.error('Error in handleAccount:', err);
      router.push("/");
    }
  };

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <>
    <nav className={`bg-white lg:max-[218px] w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
      showNavbar ? 'translate-y-0' : '-translate-y-full'
    }`}>
    {/* <div
  className="bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-200 border-b border-yellow-200 flex justify-center items-center select-none duration-300 w-full px-4 py-2"
  style={{
    minHeight: '50px',
    backgroundSize: '200% 100%',
    animation: 'waveGradient 6s ease infinite',
    fontFamily: '"El Messiri", sans-serif',
    fontWeight: 500,
  }}
>
  <div className="flex items-center gap-2 text-yellow-800 text-sm sm:text-base text-center flex-wrap justify-center leading-relaxed">

    <span>نأسف، لا نقوم بالتوصيل في الوقت الحالي</span>
  </div>

  <style jsx>{`
    @keyframes waveGradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `}</style>
</div> */}



      <div className={`container lg:flex hidden mx-auto px-4 py-2 justify-between items-center text-gray-500 text-sm border-b border-gray-200 ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
        <div className={`flex items-center gap-2 ${direction === 'rtl' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
          <a href="/contactus" className={`flex items-center ${direction === 'rtl' ? 'space-x-1 space-x-reverse' : 'space-x-1'} hover:text-gray-900`}>
            <span>{t('contactUs')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href="/about" className="flex items-center gap-2 hover:text-gray-900">
            <span>{t('aboutUs')}</span>
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
        <div className={`flex items-center ${direction === 'rtl' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}>
          {/* Language Selector */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                size="sm"
                className="text-gray-600 hover:text-gray-900 min-w-fit"
              >
                <span className="text-base mr-1">{currentLanguage.flag}</span>
                <span className="text-sm hidden sm:inline">{currentLanguage.name}</span>
                <MdOutlineKeyboardArrowDown className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              selectedKeys={[locale]}
              selectionMode="single"
              onSelectionChange={(keys) => {
                try {
                  const selectedKey = Array.from(keys)[0];
                  if (selectedKey && typeof selectedKey === 'string') {
                    setLocale(selectedKey);
                  }
                } catch (err) {
                  console.error('Error changing language:', err);
                }
              }}
            >
              {languages.map((lang) => (
                <DropdownItem key={lang.code} textValue={lang.name}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-900">
            <span className="text-sm">{t('bestPrices')}</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-900">
            <span className="font-medium mx-2"> | </span>
            <span className="text-sm">{t('fastestDelivery')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center ltr">

        {/* Hamburger Menu Icon (visible on small screens) */}


        <div className="lg:flex items-center order-1 lg:order-3 flex-grow justify-end lg:justify-start">
          <form
            className="relative lg:flex items-center flex-grow
                       max-w-md lg:max-w-none lg:w-[776px] h-[46px]
                       rounded-[8px] border border-gray-300 bg-gray-100
                       focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500
                       overflow-hidden ml-4 lg:ml-0"
          >
            <input
              type="text"
              onClick={handleSearch}
              placeholder={t('searchPlaceholder')}
              className="flex-grow h-full py-2
                         bg-transparent outline-none text-sm
                         pl-4 pr-[80px] text-left"
            />
            <button
              className="absolute top-[1.5px] bottom-[1.5px]
                         bg-moon-200 text-sm text-white font-medium
                         w-fit px-2 h-[36px]
                         flex items-center justify-center
                         z-10
                         right-[1.5px] rounded-r-[7px]"
              type="submit"
              aria-label={t('search')}
            >
              {t('search')}
            </button>
          </form>
          {Logowhite && (
            <Logowhite
              style={{ cursor: "pointer", width: "64px", height: "26.694103240966797px" }}
              onClick={() => {
                try {
                  router.push("/");
                } catch (err) {
                  console.error('Error navigating to home:', err);
                }
              }}
              className="hidden lg:block lg:mr-3"
            />
          )}
        </div>

        <div className="lg:flex hidden mx-2 items-center space-x-6 order-2 lg:order-1">

{/* 1. Favorites */}
{userData && !userData.error && (
  <motion.div onClick={() => {
    try {
      if (props && typeof props.openFav === 'function') {
        props.openFav(true);
      }
    } catch (err) {
      console.error('Error opening favorites:', err);
    }
  }} className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer relative">
    <span className="text-sm hidden sm:block mr-0">{t('favorites')}</span>
    <Button isIconOnly className="text-xl" size="md" aria-label="Favorites">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </Button>
  </motion.div>
)}

<motion.div onClick={() => {
  try {
    if (props && typeof props.openCart === 'function') {
      props.openCart(true);
    }
  } catch (err) {
    console.error('Error opening cart:', err);
  }
}} className="flex w-full items-center text-gray-700 hover:text-gray-900 cursor-pointer">
  <span className="text-sm w-full hidden sm:block text-left">
    {totalPrice.toFixed(2)} $ <span className="mx-2 font-thin">|</span> {totalItems} {t('products')}
    {/* <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg> */}
  </span>
  <Button isIconOnly size="sm" aria-label="Cart">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  </Button>
</motion.div>

{userData && !userData.error ? (
  <motion.div onClick={() => {
    try {
      if (userData?.data?.user?.type) {
        handleAccount(userData.data.user.type);
      } else {
        cons
        ole.warn('User type not available');
        router.push("/");
      }
    } catch (err) {
      console.error('Error handling account click:', err);
    }
   }} className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer space-x-1">
    <span className="text-sm hidden sm:block mr-0">{t('myAccount')}</span>
    <Button isIconOnly className="text-2xl font-black text-gray-600 rounded-full" size="md" aria-label="Account">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    </Button>
  </motion.div>
) : (
  <motion.div>
    <Button onClick={() => {
      try {
        router.push("/login");
      } catch (err) {
        console.error('Error navigating to login:', err);
      }
    }} className="bg-gradient-to-tr from-moonsec-100/40 to-moonsec-100 text-xs font-medium text-white px-3 py-1 rounded-md" size="sm" aria-label="Login">
      {t('login')}
    </Button>
  </motion.div>
)}
</div>



      </div>
<div className="hidden lg:block">

      <Subcatmenu subCat={subCat} />
</div>





    </nav>
{/* mobile nav */}


{/* <div
  className="lg:hidden bg-gradient-to-r from-yellow-200 via-yellow-50 to-yellow-200 border-b border-yellow-200 flex justify-center items-center select-none duration-300 w-full px-4 py-2"
  style={{
    minHeight: '50px', // slightly taller for mobile
    backgroundSize: '200% 100%',
    animation: 'waveGradient 6s ease infinite',
    fontFamily: '"El Messiri", sans-serif',
    fontWeight: 500,
  }}
>
  <div className="flex items-center gap-2 text-yellow-800 text-sm sm:text-base text-center flex-wrap justify-center leading-relaxed">

    <span>نأسف، لا نقوم بالتوصيل في الوقت الحالي</span>
  </div>

  <style jsx>{`
    @keyframes waveGradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `}</style>
</div> */}

    <div dir="rtl" className="lg:hidden w-full fixed top-0 left-0 z-50">
        <div className="bg-white w-full flex items-center justify-between px-4 py-3">
          {Logowhite && (
            <Logowhite onClick={() => {
              try {
                router.push("/");
              } catch (err) {
                console.error('Error navigating to home:', err);
              }
            }} className="w-16 cursor-pointer" />
          )}

<div className="flex items-center gap-2">
          {/* Search Button for Mobile */}
          <Button
            isIconOnly
            size="md"
            onClick={() => {
              try {
                if (props && typeof props.setSearchTog === 'function') {
                  props.setSearchTog(true);
                }
              } catch (err) {
                console.error('Error opening search:', err);
              }
            }}
            className="text-gray-700"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Button>

          <motion.div onClick={() => {
            try {
              if (props && typeof props.openCart === 'function') {
                props.openCart(true);
              }
            } catch (err) {
              console.error('Error opening cart:', err);
            }
          }} className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
            <Button isIconOnly size="md" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </Button>
            <span className="text-sm hidden sm:flex items-center text-left ml-2">
              {totalPrice.toFixed(2)} $ <span className="mx-1 font-thin">|</span> {totalItems} {t('products')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor" className="size-4">
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
      </div>



        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 h-screen backdrop-blur- w-full bg-white z-50 overflow-y-auto p-4"
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
            {/* Language Selector for Mobile */}
            <div className="w-full mb-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
                    fullWidth
                    className="justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentLanguage.flag}</span>
                      <span>{currentLanguage.name}</span>
                    </div>
                    <MdOutlineKeyboardArrowDown className="h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Language selection"
                  selectedKeys={[locale]}
                  selectionMode="single"
                  onSelectionChange={(keys) => {
                    try {
                      const selectedKey = Array.from(keys)[0];
                      if (selectedKey && typeof selectedKey === 'string') {
                        setLocale(selectedKey);
                      }
                    } catch (err) {
                      console.error('Error changing language:', err);
                    }
                  }}
                >
                  {languages.map((lang) => (
                    <DropdownItem key={lang.code} textValue={lang.name}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

<div className="w-full flex divide-x">
  <Button
    onClick={() => {
      try {
        if (props && typeof props.openFav === 'function') {
          props.openFav(true);
          setIsMenuOpen(false);
        }
      } catch (err) {
        console.error('Error opening favorites:', err);
      }
    }}
    className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
  >
    {t('favorites')}
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
      onClick={() => {
        try {
          if (userData?.data?.user?.type) {
            handleAccount(userData.data.user.type);
            setIsMenuOpen(false);
          } else {
            console.warn('User type not available');
            router.push("/");
            setIsMenuOpen(false);
          }
        } catch (err) {
          console.error('Error handling account click:', err);
        }
      }}
      className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
    >
      {t('myAccount')}
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
      onClick={() => {
        try {
          router.push("/login");
          setIsMenuOpen(false);
        } catch (err) {
          console.error('Error navigating to login:', err);
        }
      }}
      className="flex-1 text-gray-900 rounded-none flex items-center justify-center gap-2"
    >
      {t('login')}
    </Button>
  )}
</div>


<Subcatmenu subCat={subCat} onNavigate={() => setIsMenuOpen(false)} />

          </div>
        </motion.div>
      </div>
      </>
  );
}
