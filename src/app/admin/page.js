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
    const ls = require("local-storage")
    const {logindata,logoutUser}  = useContext(AuthCon);
    const router = useRouter(); 
    const [page,setPage] = useState(1) 
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
      
<div dir='rtl' style={{minHeight:"100vh",userSelect:"none",minWidth:"100vw",backgroundSize:50}}  className="w-full   
bg-[url('../../public/amblemblack.svg')] ">


<div className='w-full flex pt-10  flex-col  sm:flex-col lg:flex-row     justify-center'>

<div className='min-w-60    p-2 ' >

<div  className='w-full  p-3 flex  flex-col   lg:min-h-96 shadow-lg bg-white'>
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
<div style={{width:"100%",overflowX:"scroll"}} className='flex  sm:flex-row mt-3 lg:flex-col scrollable-content ' >



{/* <div onClick={()=>{setPage(0)}} style={{backgroundColor:page==0?Theme.primary:"white", color:page==0?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap '   >
<div><MdOutlineAutoGraph/></div><div className='mx-1.5'> لوحة التحكم</div></div> */}



<div onClick={()=>{ setPid(null);setPage(1)}} style={{backgroundColor:page==1?Theme.primary:"white", color:page==1?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaListCheck/></div><div className='mx-1.5'> الطلبات</div></div>



<div onClick={()=>{ setPid(null); setPage(14)  }} style={{backgroundColor:page==14?Theme.primary:"white", color:page==14?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap '   >
<div><FaPlusCircle/></div><div className='mx-1.5'> إضافة منتج</div></div>

<div onClick={()=>{  setPid(null); setPage(2)}} style={{backgroundColor:page==2?Theme.primary:"white", color:page==2?"white":Theme.primary}} 
className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap'   >
<div><FaBoxes/></div><div className='mx-1.5'> المنتجات</div></div>


<div onClick={()=>{  setPid(null); setPage(3)}} style={{backgroundColor:page==3?Theme.primary:"white", color:page==3?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap '   >
<div><FaRuler/></div><div className='mx-1.5'>  المقاسات</div></div>



<div onClick={()=>{ setPid(null);setPage(4)}} style={{backgroundColor:page==4?Theme.primary:"white", color:page==4?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start whitespace-nowrap items-center '   >
<div><FaSwatchbook/></div><div className='mx-1.5'> الألوان</div></div>


<div onClick={()=>{ setPid(null);setPage(5)}} style={{backgroundColor:page==5?Theme.primary:"white", color:page==5?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><BiCategory/></div><div className='mx-1.5'> الفئات</div></div>

<div onClick={()=>{ setPid(null);setPage(21)}} style={{backgroundColor:page==21?Theme.primary:"white", color:page==21?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaTruck/></div><div className='mx-1.5'> نقاط التوصيل</div></div>


<div onClick={()=>{ setPid(null);setPage(6)}} style={{backgroundColor:page==6?Theme.primary:"white", color:page==6?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><BiCategoryAlt/></div><div className='mx-1.5'> الفئات الفرعية</div></div>


<div onClick={()=>{ setPid(null);setPage(1)}} style={{backgroundColor:page==14?Theme.primary:"white", color:page==14?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaListCheck/></div><div className='mx-1.5'> الطلبات</div></div>


<div onClick={()=>{ setPid(null);setPage(20)}} style={{backgroundColor:page==20?Theme.primary:"white", color:page==20?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaWarehouse/></div><div className='mx-1.5'> المخزون</div></div>

<div onClick={()=>{ setPid(null);setPage(10)}} style={{backgroundColor:page==10?Theme.primary:"white", color:page==10?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><MdSpeakerPhone/></div><div className='mx-1.5'> لعروض الترويجية</div></div>





{/* <div onClick={()=>{setPage(9)}} style={{backgroundColor:page==6?Theme.primary:"white", color:page==6?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaCreditCard/></div><div className='mx-1.5'> الفئات الفرعية</div></div> */}

<div onClick={()=>{router.push("/logout")}}  className='flex px-2 py-3  bg-red-300 hover:bg-red-500 rounded-sm cursor-pointer whitespace-nowrap transition-colors
hover:text-white text-white justify-start items-center '   >
<div><FaPowerOff/></div><div className='mx-1.5'>  تسجيل خروج</div></div>

</div>

</div>

</div>
<div className='w-full sm:w-full lg:w-2/3  p-2' >

<div className='min-h-96 px-2 py-5 w-full shadow-lg bg-white'>

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






















































