'use client'

import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { Theme ,API_URL} from '../local';
import { User } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
//import Orders from './orders';
import dynamic from 'next/dynamic';
import { AuthCon } from '../contexts/AuthCon';
import { FaBox, FaCreditCard, FaHeart, FaListCheck, FaLock, FaPowerOff, FaRecycle, FaUser } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Orders = dynamic(() => import('./orders'))
const Favo = dynamic(() => import('./favo'))
const UserData = dynamic(() => import('./userData'))
const PasSet = dynamic(() => import('./pasSet'))
const Address = dynamic(() => import('./address'))
const PaymentMeth = dynamic(() => import('./paymentmeth'))

function AccounteEl() {
    const ls = require("local-storage")

    const router = useRouter(); 
    const [page,setPage] = useState(1) 
    const [lod,setLod] =useState(true)
    const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    useEffect(() => {
   loginval();  
  
    },[])



   
    const loginval = ()=>{
      if(udata.data.user.type!=4){router.push("/login")}
      //console.log(utype)
         }
      



    
  


  const handleEdit = (pageid,id)=>{

    setPid(id)

   setPage(pageid)


  }

  
 

  return (
  
<>

{
    
    <div dir='rtl' style={{minHeight:"100vh",userSelect:"none",minWidth:"100vw",backgroundSize:50}}  className="w-full   
    bg-[url('../../public/amblemblack.svg')] ">


<div className='w-full flex  flex-col  sm:flex-col lg:flex-row  mt-10    justify-center'>

<div className='min-w-60    p-2 ' >

<div  className='w-full p-3 flex  flex-col   lg:min-h-96 shadow-lg bg-white'>
  {/* menu */}

<div >
<User   
      name={udata.data.user.username}
      description={udata.data.user.email}
      avatarProps={{
        className:"bg-moon-200 font-bold text-white"
      }}
    />
</div>
<div style={{width:"100%",overflowX:"scroll"}} className='flex  sm:flex-row mt-3 lg:flex-col scrollable-content ' >


<div onClick={()=>{setPage(1)}} style={{backgroundColor:page==1?Theme.primary:"white", color:page==1?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap '   >
<div><FaBox/></div><div className='mx-1.5'> الطلبات</div></div>

{/* <div onClick={()=>{setPage(2)}} style={{backgroundColor:page==2?Theme.primary:"white", color:page==2?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap'   >
<div><FaHeart/></div><div className='mx-1.5'> المفضلة</div></div> */}


<div onClick={()=>{setPage(3)}} style={{backgroundColor:page==3?Theme.primary:"white", color:page==3?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center whitespace-nowrap '   >
<div><FaUser/></div><div className='mx-1.5'> البيانات الشخصية</div></div>



<div onClick={()=>{setPage(4)}} style={{backgroundColor:page==4?Theme.primary:"white", color:page==4?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start whitespace-nowrap items-center '   >
<div><FaLock/></div><div className='mx-1.5'> تغيير كلمة المرور</div></div>


<div onClick={()=>{setPage(5)}} style={{backgroundColor:page==5?Theme.primary:"white", color:page==5?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaHome/></div><div className='mx-1.5'> تعديل العنوان</div></div>



<div onClick={()=>{setPage(6)}} style={{backgroundColor:page==6?Theme.primary:"white", color:page==6?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaCreditCard/></div><div className='mx-1.5'>  وسائل الدفع</div></div>


<div onClick={()=>{setPage(7)}} style={{backgroundColor:page==7?Theme.primary:"white", color:page==7?"white":Theme.primary}} className='flex px-2 py-3  bg-white hover:bg-moon-200 cursor-pointer whitespace-nowrap transition-colors
 hover:text-white lg:border-b-2  lg:border-gray-200 text-moon-200 justify-start items-center '   >
<div><FaRecycle/></div><div className='mx-1.5'>  سياسة إسترجاع البضائع</div></div>


<div onClick={()=>{router.push("/logout")}}   className='flex px-2 py-3 cursor-pointer  bg-red-300 hover:bg-red-500 rounded-sm cursor-pointer whitespace-nowrap transition-colors
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
{page== undefined ? <div/> :<></>}
  {page==1 ? <Orders setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==2 ? <Favo setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==3 ? <UserData setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==4 ? <PasSet setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==5 ? <Address setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
  {page==6 ? <PaymentMeth setLod={(sta)=>{setLod(sta)}} setpage={(pid,id)=>{handleEdit(pid,id)}} /> :<></>}
</div>




</div>




</div>

</div>



    </div>
    
}

</>


  )
}

export default AccounteEl




