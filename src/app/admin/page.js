'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { User } from '@nextui-org/react';
import { FaBox, FaCreditCard, FaHeart,FaTruck, FaListCheck, FaLock, FaPowerOff, FaRuler, FaSwatchbook, FaUser, FaWarehouse } from 'react-icons/fa6';
import { FaBoxes, FaHome, FaPlusCircle } from 'react-icons/fa';
import { useI18n } from '../lib/i18n';
                                                       
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


import { AuthCon } from '../contexts/AuthCon';
import { CartCon } from '../contexts/cartContext';
import { MdFormatSize, MdOutlineAllOut, MdOutlineAutoAwesome, MdOutlineAutoGraph, MdSpeakerPhone } from 'react-icons/md';
import { BiCategory, BiCategoryAlt } from 'react-icons/bi';


function AccounteEl() {
    const { t } = useI18n();
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
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

  return (
      
<div dir='rtl' style={{minHeight:"100vh",userSelect:"none"}}  className="w-full min-h-screen bg-gray-50">

<div className='w-full flex flex-col lg:flex-row min-h-screen'>

<div className='lg:w-64 w-full lg:sticky lg:top-0 lg:h-screen bg-white shadow-lg' >

<div  className='w-full p-4 flex flex-col h-full'>
{/* menu */}

<div >
<User   
  name={udata&&udata.data.user.username}
  description={udata&&udata.data.user.email}
  avatarProps={{
    className:"bg-moon-200 font-bold text-white"
  }}
/>
</div>

{/* You'll need `page`, `setPage`, `setPid` props available in the component where this JSX is rendered,
    and `router` from `useRouter()` if you're using Next.js 13/14 App Router.
    Also, ensure `Theme` is imported or defined if used elsewhere for colors. */}

<div className='flex flex-row lg:flex-col mt-4 overflow-x-auto lg:overflow-x-visible gap-1'>

  {/* لوحة التحكم (Dashboard) */}
  <div onClick={() => { setPage(0) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 0 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><MdOutlineAutoGraph /></div>
    <div className='mx-1.5'>{t('dashboard')}</div>
  </div>

  {/* الطلبات (Orders) */}
  <div onClick={() => { setPid(null); setPage(1) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 1 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div>
      
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
    </div>
    <div className='mx-1.5'>{t('orders')}</div>
  </div>

  {/* إضافة منتج (Add Product) */}
  <div onClick={() => { setPid(null); setPage(14) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 14 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
      
      </div>
    <div className='mx-1.5'> إضافة منتج</div>
  </div>

  {/* المنتجات (Products) */}
  <div onClick={() => { setPid(null); setPage(2) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 2 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
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
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 3 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaRuler /></div>
    <div className='mx-1.5'> المقاسات</div>
  </div>

  {/* الألوان (Colors) */}
  <div onClick={() => { setPid(null); setPage(4) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 4 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
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
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 5 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><BiCategory /></div>
    <div className='mx-1.5'> الفئات</div>
  </div>

  {/* نقاط التوصيل (Delivery Points) */}
  <div onClick={() => { setPid(null); setPage(21) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 21 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaTruck /></div>
    <div className='mx-1.5'> نقاط التوصيل</div>
  </div>

  {/* الفئات الفرعية (Subcategories) */}
  <div onClick={() => { setPid(null); setPage(6) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 6 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><BiCategoryAlt /></div>
    <div className='mx-1.5'> الفئات الفرعية</div>
  </div>

  {/* المخزون (Inventory) */}
  <div onClick={() => { setPid(null); setPage(20) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 20 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><FaWarehouse /></div>
    <div className='mx-1.5'> المخزون</div>
  </div>

  {/* العروض الترويجية (Promotions) */}
  <div onClick={() => { setPid(null); setPage(10) }}
    className={`
      flex px-3 py-2.5 cursor-pointer whitespace-nowrap transition-all duration-200
      rounded-lg justify-start items-center text-sm gap-2
      ${page === 10 ? 'bg-moon-200 text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-100 font-normal'}
    `}>
    <div><MdSpeakerPhone /></div>
    <div className='mx-1.5'> لعروض الترويجية</div>
  </div>

  {/* تسجيل خروج (Logout) */}
  <div onClick={() => { router.push("/logout") }}
    className='flex px-3 py-2.5 mt-2 rounded-lg cursor-pointer whitespace-nowrap transition-all hover:bg-red-50 text-red-500 hover:text-red-700 justify-start items-center text-sm gap-2'>
    <div dir='rtl'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>
    
    </div>
    <div className='mx-1.5'> تسجيل خروج</div>
  </div>

</div>

</div>

</div>
<div className='flex-1 w-full p-4 lg:p-6 overflow-auto'>

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



</div>







  )
}

export default AccounteEl






















































