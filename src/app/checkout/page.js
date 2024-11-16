'use client'

import React from 'react';
import {useEffect,useState,useRef } from 'react';
import { API_URL, CURRENCY} from '../local';
import { Button } from '@nextui-org/react';
import { FaCheckCircle,FaExchangeAlt,FaListAlt,FaShoppingBasket } from 'react-icons/fa';
import { clearCart } from '../lib/actions/counterAction';
import { useRouter } from 'next/navigation'
import { BiFontSize } from 'react-icons/bi';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Cartel from '../comps/cartel';
import { FaCreditCard, FaHandHoldingDollar, FaMapLocation, FaMapPin } from 'react-icons/fa6';
import { FaArrowAltCircleRight } from 'react-icons/fa';
function AccounteEl() {
    const ls = require("local-storage")
  const [lod,setLod] =useState(false)
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);
    const router = useRouter(); 

    const dispatch = useDispatch();
    const cartg = useSelector((state) => state.root.cart.data)
    const [page,setPage] = useState(1) 
    const [paymentMeth,setPaymentMeth] = useState(1);
    const [deliveryMeth,setsetDeliveryMeth] = useState(1);
    const [total,setTotal] = useState(0)
    const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    useEffect(() => {
     
let total = 0;
      for (let i = 0; i < cartg.length; i++) {
  total = total +  cartg[i].data.attributes.varients.data[0].attributes.price * cartg[i].qty;
      }
setTotal(total)

    }, [cartg])



    const handleOrder= ()=>{

      
      if(cartg.length==0){
        alert("الرجاء إضافة منتجات")
        return
      }
    
      setLod(true)
      let payarray = []
      for (let i = 0; i < cartg.length; i++) {
        payarray.push({
          id: cartg[i].selvar,
          product_ref:cartg[i].product_ref,
          name:cartg[i].name,
          img:cartg[i].img,
          code:cartg[i].code,
          color: cartg[i].color ,
          size: cartg[i].size ,
          qty: cartg[i].qty,
          desc: cartg[i].data.attributes.description_en 
        
        })
      }
    
    
      console.log(isLogged.jwt);
      
        const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' +  isLogged.data.jwt
      },
      body: JSON.stringify({
         items: payarray,
         payment_metod: paymentMeth,
         delivery_method:deliveryMeth,
        })
    };
    fetch(`${API_URL}orders?func=initPaymentSession`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLod(false)
    window.location= data.url;
      }).then(()=>{
        
      });
                            
    
    }


  return (
  
<div className='flex-col md:flex-row lg:flex-row  w-full '  style={{display:'flex',alignItems:"center",justifyContent:"space-between"}} >

<div className='flex flex-1 flex-col mt-12 px-3 w-full  justify-center items-center'>


<div id="scrol" className='flex flex-1 flex-col mt-12 px-3 w-full  justify-center items-center'  style={{overflowY:'scroll', overflowX:'hidden'}}>                
                  {cartg&&cartg.length!=0?cartg.map((cart,index)=>(    
                   <Cartel order={true} 
                   key={index}
                   index={index}
                   data={cart.data}
                   size={cart.size}
                   color={cart.color}
                   code={cart.code}
                
                   selvar={cart.selvar}
                    removeItem={()=>{}} 
                    qty={cart.qty}
                     
                         />
                  )):
                  <div className='mt-2' style={{display:'flex',color:'grey',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                     <div>
         <Image src={'/void.svg'} width={200} height={200} />
         </div>
                    <div style={{fontWeight:'bold',marginTop:20}}> سلة فارغة  </div>
                    <div>تصفح المنتجات و أضفها للمتابعة</div>
                    </div>} 
                        </div>





                        <div className='flex  flex-row-reverse    w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {total}  {CURRENCY} </div>
    </div> 

<div className='flex   flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :التوصيل </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {total}  {CURRENCY} </div>
    </div> 

    <div className='flex flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع الكلي </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {total}  {CURRENCY} </div>
    </div> 

</div>











                        
    <div className='flex flex-1 flex-col space-y-4 w-full px-3  mt-8' >

   



     <div className='flex flex-col w-full'>
    <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :طريقة الدفع </div>

 <div className='flex flex-col sm:flex-row lg:flex-row items-center space-y-4 lg:space-x-2 md:space-x-2 lg:space-y-0 md:space-y-0   justify-between'>


 <div onClick={()=>{setPaymentMeth(1)}}
  className={`${paymentMeth==1?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex hover:shadow-md 
   transition-shadow cursor-pointer  w-full  flex-1 border-2 p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-5 rounded-full ' >
    <FaCreditCard/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-moon-200 font-semibold text-xl'>
        دفع إلكتروني
      </div>
      <div>
         الدفع بإستخدام بطاقة بنكية
      </div>
    </div>
      
    </div> 




    <div onClick={()=>{setPaymentMeth(2)}}
    //  className='flex  flex-1 border-2 p-4 rounded-md border-moon-200 items-center justify-between'
    className={`${paymentMeth==2?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex w-full hover:shadow-md transition-shadow cursor-pointer flex-1 border-2 p-4 rounded-md items-center justify-between`}
    
    >
    <div className='bg-moon-200 text-white text-2xl p-5 rounded-full ' >
    <FaHandHoldingDollar/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-moon-200 font-semibold text-xl'>
        دفع عند الإستلام
      </div>
      <div>
            الدفع عند إستلام الطلب
      </div>
    </div>
      
    </div> 
  </div> 


    </div>    



    



    <div className='flex flex-col  w-full'>
    <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > : التوصيل </div>

 <div className='flex flex-col sm:flex-row lg:flex-row items-center space-y-4 lg:space-x-2 md:space-x-2 lg:space-y-0 md:space-y-0   justify-between'>


 <div onClick={()=>{setsetDeliveryMeth(1)}}
  className={`${deliveryMeth==1?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex hover:shadow-md w-full transition-shadow cursor-pointer   flex-1 border-2 p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-5 rounded-full ' >
    <FaMapPin/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-moon-200 font-semibold text-xl'>
         توصيل لعنوان
      </div>
      <div>
        التوصيل إلى عنوان معين 
      </div>
    </div>
      
    </div> 




    <div onClick={()=>{setsetDeliveryMeth(2)}}
    //  className='flex  flex-1 border-2 p-4 rounded-md border-moon-200 items-center justify-between'
    className={`${deliveryMeth==2?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex w-full hover:shadow-md transition-shadow cursor-pointer flex-1 border-2 p-4 rounded-md items-center justify-between`}
    
    >
    <div className='bg-moon-200 text-white text-2xl p-5 rounded-full ' >
    <FaMapLocation/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-moon-200 font-semibold text-xl'>
            نقطة توزيع
      </div>
      <div>
               إستلام الطلب من نقطة التوزيع  
      </div>
    </div>
      
    </div> 
  </div> 

  <div className='mt-4'>

  <div style={{
    width:"100%",
display: deliveryMeth==1?"grid":"none",
gap:10,
gridTemplateAreas:`
' city  city  adress adress  ' 
' phone phone email email   ' 


`
   }} >
    <div style={{gridArea:"city"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"المدينة"}/>
    </div>
    <div style={{gridArea:"phone"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"رقم الهاتف"}/>
    </div>  

    <div style={{gridArea:"adress"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"العنوان"}/>
    </div>  

    <div style={{gridArea:"email"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"البريد الإلكتروني"}/>
    </div>  

   
   </div>

   <div style={{
    width:"100%",
display: deliveryMeth==2?"grid":"none",
gap:10,
gridTemplateAreas:`
' city  city  . .   ' 
' phone phone . .    ' 


`
   }} >
    <div style={{gridArea:"city"}}>
      <InputEl outputfunc={(val)=>{setNamear(val)}} label={"المدينة"}/>
    </div>
    <div style={{gridArea:"phone"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إختر نقطة الإستلام"}/>
    </div>  

   


   
   </div>

  </div>


  <div>
    
  <LoadingBtn  icon={<FaArrowAltCircleRight className='ml-1.5' />}   act={()=>{
                       handleOrder() ; 
                       }}  text={"إتمام الطلب  "} lod={lod} />

  </div>


    </div>   



    </div>





</div>


  )
}

export default AccounteEl






















































