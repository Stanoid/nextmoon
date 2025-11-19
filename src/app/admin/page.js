'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { FaBox, FaCreditCard, FaHeart,FaTruck, FaListCheck, FaLock, FaPowerOff, FaRuler, FaSwatchbook, FaUser, FaWarehouse } from 'react-icons/fa6';
import { FaBoxes, FaHome, FaPlusCircle } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useI18n } from '../lib/i18n';
import Logowhite from "../../../public/logoblack.svg";
                                                       
 const AddColor = dynamic(() => import('./AddColor'));
 const EditProduct = dynamic(() => import('./editProduct'));
 const EditStock = dynamic(() => import('./editStock'));
 const AddPickUp = dynamic(() => import('./addpickup'));
 const EditColor = dynamic(() => import('./editColor'));
 const PromoCodes = dynamic(() => import('./promoCodes'));
 const AddSubCat = dynamic(() => import('./addsubcat'));
 const WereHouse = dynamic(() => import('./wharehouse'));
 const EditSize = dynamic(() => import('./editsize'));
 const Orders = dynamic(() => import('./orders'));
 const EditCat = dynamic(() => import('./EditCat'));
 const ProductsList = dynamic(() => import('./productsList'));
 const AddCat = dynamic(() => import('./addcat'));
 const AddSize = dynamic(() => import('./addSize'));
 const EditSubCat = dynamic(() => import('./EditSubcat'));
 const Dashboard = dynamic(() => import('./dashboard'));

 
import { TiThMenu } from "react-icons/ti";
import AddProduct from './addproduct';
import { CartCon } from '../contexts/cartContext';
import { MdFormatSize, MdOutlineAllOut, MdOutlineAutoAwesome, MdOutlineAutoGraph, MdSpeakerPhone } from 'react-icons/md';
import { BiCategory, BiCategoryAlt } from 'react-icons/bi';


function AccounteEl() {
    const { t, locale, setLocale } = useI18n();
    const ls = require("local-storage")
    const router = useRouter(); 
    const [page,setPage] = useState(0) 
    const [logged,setLogged] = useState(0)
    const [colors,setColors] = useState([])
    const [sizes,setSizes] = useState([])
    const [pid,setPid] = useState(null);
    const [sid,setSid] = useState(null);
    const [cid,setCid] = useState(null);
    const [catid,setCatid] = useState(null);
    const [scatid,setScatid] = useState(null);
    const [lod,setLod] =useState(true)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    const [userData,setUserdata] = useState(null)
    const {useNotifi} = useContext(CartCon);
    useEffect(() => {
     loginval();
    },[])



   console.log("user data wtf",udata)



   const loginval = ()=>{
if(udata.data.user.type!=1){router.push("/login")}
//console.log(utype)
   }



  const handleEdit = (pageid,id)=>{

    setPid(id)

   setPage(pageid)


  }


  const notifi = (type,message)=>{
useNotifi(type,message);
  }


  
  const handleSizeEdit = (pageid,id)=>{

    setSid(id)
   setPage(pageid)


  }

  
  const handleColorEdit = (pageid,id)=>{
    setCid(id)

   setPage(pageid)


  }


  
  const handleCatEdit = (pageid,id)=>{

    setCatid(id)

   setPage(pageid)


  }

  const handleScatEdit = (pageid,id)=>{

    setScatid(id)

   setPage(pageid)


  }
 
  const handleqty = (page,pid)=>{
    setPid(pid)
    setPage(page)
  }

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
      
<div dir='rtl' style={{minHeight:"100vh",userSelect:"none"}}  className="w-full min-h-screen bg-gray-50">

{/* Top Admin Navbar */}
<div className='w-full bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50'>
  <div className='flex items-center justify-between px-4 py-3'>
    {/* Logo */}
    <div className='flex items-center gap-3'>
      {Logowhite && (
        <Logowhite
          style={{ cursor: "pointer", width: "48px", height: "auto" }}
          onClick={() => setShowBackModal(true)}
          className="cursor-pointer"
        />
      )}
      <div className='hidden sm:block text-sm font-semibold text-gray-600'>
        {t('dashboard')}
      </div>
    </div>

    {/* Right Side - Language, Profile, Logout */}
    <div className='flex items-center gap-2'>
      {/* Language Selector */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            size="sm"
            className="text-gray-600 hover:text-gray-900 min-w-fit h-9"
          >
            <span className="text-base">{currentLanguage.flag}</span>
            <span className="text-sm hidden sm:inline ml-1">{currentLanguage.name}</span>
            <MdOutlineKeyboardArrowDown className="h-4 w-4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Language selection"
          selectedKeys={[locale]}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];
            if (selectedKey && typeof selectedKey === 'string') {
              setLocale(selectedKey);
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

      {/* Profile Dropdown */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            size="sm"
            className="text-gray-600 hover:text-gray-900 min-w-fit h-9 px-2"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-moon-200 to-moon-300 flex items-center justify-center text-white font-bold text-sm">
              {udata?.data?.user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="text-sm hidden md:inline ml-2">{udata?.data?.user?.username}</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile actions">
          <DropdownItem key="profile" textValue="Profile">
            <div className="flex flex-col">
              <span className="font-semibold">{udata?.data?.user?.username}</span>
              <span className="text-xs text-gray-500">{udata?.data?.user?.email}</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Back to Site Icon */}
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onClick={() => setShowBackModal(true)}
        className="text-moon-200 hover:text-moon-300 hover:bg-moon-50 h-9 w-9"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </Button>

      {/* Logout Icon */}
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onClick={() => setShowLogoutModal(true)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
      </Button>
    </div>
  </div>
</div>

{/* Add padding top to account for fixed navbar */}
<div className='pt-16'></div>

<div className='w-full flex flex-col lg:flex-row min-h-screen'>

<div className='lg:w-64 w-full lg:sticky lg:top-0 lg:h-screen bg-white shadow-xl border-r border-gray-200' >

<div  className='w-full p-4 flex flex-col h-full'>
{/* menu */}

<div className='mb-6 pb-4 border-b border-gray-200'>
<User   
  name={udata&&udata.data.user.username}
  description={udata&&udata.data.user.email}
  avatarProps={{
    className:"bg-gradient-to-br from-moon-200 to-moon-300 font-bold text-white"
  }}
  classNames={{
    name: "text-gray-800 font-semibold",
    description: "text-gray-500"
  }}
/>
</div>

{/* You'll need `page`, `setPage`, `setPid` props available in the component where this JSX is rendered,
    and `router` from `useRouter()` if you're using Next.js 13/14 App Router.
    Also, ensure `Theme` is imported or defined if used elsewhere for colors. */}

<div className='flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5'>

  {/* لوحة التحكم (Dashboard) */}
  <div onClick={() => { setPage(0) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 0 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><MdOutlineAutoGraph /></div>
    <div className='mx-1.5'>{t('dashboard')}</div>
  </div>

  {/* الطلبات (Orders) */}
  <div onClick={() => { setPid(null); setPage(1) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 1 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
    </div>
    <div className='mx-1.5'>{t('orders')}</div>
  </div>

  {/* المنتجات (Products) */}
  <div onClick={() => { setPid(null); setPage(2) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 2 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

        </div>
    <div className='mx-1.5'>{t('products')}</div>
  </div>

  {/* المقاسات (Sizes) */}
  <div onClick={() => { setPid(null); setPage(3) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 3 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaRuler /></div>
    <div className='mx-1.5'> المقاسات</div>
  </div>

  {/* الألوان (Colors) */}
  <div onClick={() => { setPid(null); setPage(4) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 4 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
</svg>
    
    </div>
    <div className='mx-1.5'> الألوان</div>
  </div>

  {/* الفئات (Categories) */}
  <div onClick={() => { setPid(null); setPage(5) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 5 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><BiCategory /></div>
    <div className='mx-1.5'> الفئات</div>
  </div>

  {/* نقاط التوصيل (Delivery Points) */}
  <div onClick={() => { setPid(null); setPage(21) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 21 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaTruck /></div>
    <div className='mx-1.5'> نقاط التوصيل</div>
  </div>

  {/* الفئات الفرعية (Subcategories) */}
  <div onClick={() => { setPid(null); setPage(6) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 6 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><BiCategoryAlt /></div>
    <div className='mx-1.5'> الفئات الفرعية</div>
  </div>

  {/* المخزون (Inventory) */}
  <div onClick={() => { setPid(null); setPage(20) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 20 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaWarehouse /></div>
    <div className='mx-1.5'> المخزون</div>
  </div>

  {/* العروض الترويجية (Promotions) */}
  <div onClick={() => { setPid(null); setPage(10) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-300
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 10 ? 'bg-gradient-to-r from-moon-200 to-moon-300 text-white font-semibold shadow-md' : 'text-gray-700 hover:bg-gray-100 font-normal'}
    `}>
    <div><MdSpeakerPhone /></div>
    <div className='mx-1.5'> لعروض الترويجية</div>
  </div>


</div>

</div>

</div>
<div className='flex-1 w-full p-4 lg:p-6 overflow-auto bg-gray-50'>

<div className='w-full'>

<div style={{display:lod?"flex":"none"}}  className='w-full min-h-96 flex items-center justify-center' >
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>

<div style={{display:lod?"none":"block"}} >
{page==0 ?  <Dashboard notifi={(type,message)=>{notifi(type,message)}} lod={lod} setLod={(sta)=>{setLod(sta)}}  setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
{page==14 ?  <AddProduct pid={pid&&pid} notifi={(type,message)=>{notifi(type,message)}}  lod={lod} setLod={(sta)=>{setLod(sta)}}  setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==2 ?  <ProductsList  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}}  setpage={(pid,id)=>{handleEdit(pid,id)}} />  :<></>}
  {page==3 ? <AddSize  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(sid,id)=>{handleSizeEdit(sid,id)}} /> :<></>}
  {page==4 ? <AddColor  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}}  setpage={(cid,id)=>{handleColorEdit(cid,id)}} />  :<></>}
  {page==5 ? <AddCat  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(catid,id)=>{handleCatEdit(catid,id)}} /> :<></>}
  {page==6 ? <AddSubCat  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(scatid,id)=>{handleScatEdit(scatid,id)}} /> :<></>}
  {page==15 ? pid?<EditProduct  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(page)=>{setPage(page)}} pid={pid} />:<EditProduct setpage={(page)=>{setPage(page)}} pid={pid} /> :<></>}
  {page==1 ? <Orders  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}}  setpage={(cid,id)=>{handleColorEdit(cid,id)}} />  :<></>}
  {page==10 ? <PromoCodes  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(sid,id)=>{handleSizeEdit(sid,id)}} /> :<></>}
  {page==16 ? sid?<EditSize  notifi={(type,message)=>{notifi(type,message)}}  setpage={(page)=>{setPage(page)}} sid={sid} />:<EditSize setpage={(page)=>{setPage(page)}} sid={sid} /> :<></>}
  {page==17 ? cid?<EditColor  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(page)=>{setPage(page)}} cid={cid} />:<EditColor setpage={(page)=>{setPage(page)}} cid={cid} /> :<></>}
  {page==18 ? catid?<EditCat  notifi={(type,message)=>{notifi(type,message)}}  setpage={(page)=>{setPage(page)}} catid={catid} />:<EditCat setpage={(page)=>{setPage(page)}} catid={catid} /> :<></>}
  {page==19 ? scatid?<EditSubCat  notifi={(type,message)=>{notifi(type,message)}}  setpage={(page)=>{setPage(page)}} scatid={scatid} />:<EditSubCat setpage={(page)=>{setPage(page)}} scatid={scatid} /> :<></>}
  
  
  {page==20 ? <WereHouse  notifi={(type,message)=>{notifi(type,message)}} setLod={(sta)=>{setLod(sta)}}  setpage={(page,pid)=>{handleqty(page,pid)}} 
  scatid={scatid} /> :<></>}

{page==21 ? <AddPickUp  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(sid,id)=>{handleSizeEdit(sid,id)}} /> :<></>}

{page==22 ? pid?<EditStock  notifi={(type,message)=>{notifi(type,message)}}  setLod={(sta)=>{setLod(sta)}} setpage={(page)=>{setPage(page)}} pid={pid} />:<EditStock setpage={(page)=>{setPage(page)}} etLod={(sta)=>{setLod(sta)}} pid={pid} /> :<></>}

</div>




</div>

</div>

</div>

{/* Logout Confirmation Modal */}
{showLogoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)}>
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{t('confirmLogout')}</h3>
        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all"
          >
            {t('no')}
          </button>
          <button
            onClick={() => router.push("/logout")}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all shadow-md"
          >
            {t('yes')}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Back to Site Confirmation Modal */}
{showBackModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowBackModal(false)}>
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-moon-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-moon-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{t('confirmBackToSite')}</h3>
        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={() => setShowBackModal(false)}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all"
          >
            {t('no')}
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-moon-200 to-moon-300 hover:from-moon-300 hover:to-moon-200 text-white rounded-lg font-medium transition-all shadow-md"
          >
            {t('yes')}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

</div>







  )
}

export default AccounteEl






















































