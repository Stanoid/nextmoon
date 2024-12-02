'use client'

import React from 'react';
import {useEffect,useState,useRef,useContext } from 'react';
import { API_URL, CURRENCY} from '../local';
import { Button } from '@nextui-org/react';
import { FaCheckCircle,FaExchangeAlt,FaListAlt,FaShoppingBasket } from 'react-icons/fa';
import { clearCart } from '../lib/actions/counterAction';
import { useRouter } from 'next/navigation'
import { CartCon } from '../contexts/cartContext';
import { BiFontSize } from 'react-icons/bi';
import InputEl from '../comps/inputel';
import TableComp from '../comps/sandbox/table';
import LoadingBtn from '../comps/loadingbtn';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux';
import { color, motion } from 'framer-motion';
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
    const [address,setAddress] = useState(""); 
    const [phone,setPhone] = useState(""); 
    const [email,setEmail] = useState(null); 
    const [pickups,setpickups] = useState(null);
    const [selpick,setselpick] = useState(null);
    const [deliveryPrice,setDeleveryPrice] = useState(0);
    const [checkOutArray,setCheckoutArray]=useState([])
    const [paymentMeth,setPaymentMeth] = useState(1);
    const [deliveryMeth,setsetDeliveryMeth] = useState(1);
    const [total,setTotal] = useState(0)
    const [gtotal,setgTotal] = useState(0)
    const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
    const {useNotifi} = useContext(CartCon);

    useEffect(() => {

      getPicks();

 let checkArray = [];
let total = 0;
let colorName = "";
     let colorValue= "";
let price = 0;
let size= "";
      for (let i = 0; i < cartg.length; i++) {
    for (let j = 0; j < cartg[i].data.attributes.varients.data.length; j++) {
    if(cartg[i].data.attributes.varients.data[j].id==cartg[i].selvar){ 
  total = total +  cartg[i].data.attributes.varients.data[j].attributes.price * cartg[i].qty;
     
  // for (let x = 0; x < cartg[i].data.attributes.varients.data[j].attributes.colors.data.length; x++) {
  //   if(cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].id==cartg[i].color){
  //    colorName= cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].attributes.name_ar;
  //    colorValue= cartg[i].data.attributes.varients.data[j].attributes.colors.data[x].attributes.colorCode;
  //   }
     
  //   }
    colorName= cartg[i].data.attributes.varients.data[j].attributes.colors.data[0].attributes.name_ar
    colorValue= cartg[i].data.attributes.varients.data[j].attributes.colors.data[0].attributes.colorCode

    price = cartg[i].data.attributes.varients.data[j].attributes.price;
    size = cartg[i].data.attributes.varients.data[j].attributes.sizes.data[0].attributes.name_ar +" - " + cartg[i].data.attributes.varients.data[j].attributes.sizes.data[0].attributes.icon;

    }


    }



    checkArray.push(
      {id:cartg[i].selvar,
        price:price ,
        sizeo:size,
        qty: cartg[i].qty,
        code: cartg[i].code,
        colorname:colorName,
        color:colorValue,
        imgsingle:cartg[i].img,
      }
    )
      





      }
setCheckoutArray(checkArray);   
console.log("checkkkkkkk",checkArray)   
setTotal(total)
setgTotal(total+deliveryPrice)


    }, [cartg,deliveryPrice,refr])
  
     const handleDelChangle = (stat)=>{
setsetDeliveryMeth(stat);
handleCityChange(selpick,stat);
     }

    const handleCityChange= (val,stat)=>{

      setselpick(val)
      console.log(val,deliveryMeth)
let price =0;
      for (let i = 0; i < pickups.length; i++) {
   if(pickups[i].id==val){
    if(stat){
      if(stat==1){
        console.log("add")
      price = pickups[i].attributes.home_price;
      }else if(stat==2){
        console.log("pik")
        price = pickups[i].attributes.pickup_price;
      }
    }else{
      if(deliveryMeth==1){
        console.log("add")
      price = pickups[i].attributes.home_price;
      }else if(deliveryMeth==2){
        console.log("pik")
        price = pickups[i].attributes.pickup_price;
      }
    }


setDeleveryPrice(price);
setRefr(!refr);


   }
        
      }


    }


    const getPicks=()=>{
         
      //props.setLod(true);
               
          const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + isLogged.data.jwt
            },
          
        };
      
          fetch(`${API_URL}pickups`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setpickups(data.data);
             console.log("ddd",data.data)
  
          //  return data
            }).then((arr)=>{
          
            })
      
      
          }



    const handleOrder= ()=>{

      //email and selpic validation
      //payment method backend implmentation
      if(selpick==null){
        useNotifi("error","الر جاء  إختيار الولاية")
        return;
      }

      if(email==null){
        useNotifi("error","الر جاء إدخال الإيميل")
        return;
      }

      if(phone==null){
        useNotifi("error","الر جاء إدخال رقم الهاتف")
        return;
      }

      
     

      if(cartg.length==0){
        useNotifi("error","الرجاء إضافة منتجات")
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
         state_id:selpick,
         phone:phone,
         address:address,
         email:email,
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
  
<div className='flex-col md:flex-row lg:flex-row  w-full '  style={{display:'flex',alignItems:"flex-start",
  justifyContent:"space-between"}} >

<div className='flex flex-1 flex-col mt-12 px-3 w-full  '>


<div id="scrol" className='flex flex-1 flex-col  px-3 w-full  ' >                
              
              
<TableComp
   data={checkOutArray}
   checkout={true}
   columns={
    [
      {name: "ID", uid: "selvar", sortable: true},
      {name: "رمز المنتج", uid: "code", sortable: true},
      {name: "السعر", uid: "price", sortable: true},
      {name: "الكمية", uid: "qty", sortable: true},
      {name: " إسم اللون", uid: "colorname",sortable: true },
      {name: "اللون", uid: "color", sortable: true},
      {name: " المقاس", uid: "sizeo",sortable: true },
     {name: "الصورة", uid: "imgsingle", sortable: true},  
     
    ]
   }
   
   delorder={()=>{}}
    />
              
              
              
                  {/* {cartg&&cartg.length!=0?cartg.map((cart,index)=>(    
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
                    </div>}  */}
                        </div>




<div className='p-6'>
<div className='flex  flex-row-reverse    w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {total}  {CURRENCY} </div>
    </div> 

<div className='flex   flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :التوصيل </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {selpick==null? <span>إختر الولاية</span> :<span>{deliveryPrice}  {CURRENCY}</span> }  </div>
    </div> 

    <div className='flex flex-row-reverse  w-full' >
      <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :المجموع الكلي </div>
      <div dir='rtl' className='text-right text-xl font-semibold ' > {gtotal}  {CURRENCY} </div>
    </div> 
</div>
      

</div>











                        
    <div className='flex  flex-col space-y-4 w-full px-3  mt-8' >

   



     <div className='flex flex-col w-full'>
    <div className='text-moon-200 font-bold text-right text-xl mb-2 ' > :طريقة الدفع </div>

 <div className='flex flex-col sm:flex-row lg:flex-row items-center space-y-4 lg:space-x-2 md:space-x-2 lg:space-y-0 md:space-y-0   justify-between'>


 <div onClick={()=>{setPaymentMeth(1)}}
  className={`${paymentMeth==1?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex hover:shadow-md 
   transition-shadow cursor-pointer  w-full  flex-1 border-2 p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
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
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
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


 <div onClick={()=>{handleDelChangle(1);}}
  className={`${deliveryMeth==1?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex hover:shadow-md w-full transition-shadow cursor-pointer   flex-1 border-2 p-4 rounded-md items-center justify-between`}
 >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
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




    <div onClick={()=>{handleDelChangle(2);}}
    //  className='flex  flex-1 border-2 p-4 rounded-md border-moon-200 items-center justify-between'
    className={`${deliveryMeth==2?"shadow-lg border-moon-200 ":" shadow-gray-800 "}  flex w-full hover:shadow-md transition-shadow cursor-pointer flex-1 border-2 p-4 rounded-md items-center justify-between`}
    
    >
    <div className='bg-moon-200 text-white text-2xl p-3 rounded-full ' >
    <FaMapLocation/>
    </div>  
    <div className='flex items-end flex-col'>
      <div className='text-moon-200 font-semibold text-xl'>
            نقطة توزيع
      </div>
      <div>
                 من نقطة التوزيع  
      </div>
    </div>
      
    </div> 
  </div> 

  <div className='mt-4'>

  <InputEl
            value={selpick}
            outputfunc={(val) => {
             handleCityChange(val);           
            }}
            iden={"color"}
            data={pickups}
            iscats={false}
            select={true}
            label={"الولاية"}
          />

  <div style={{
    width:"100%",
display:"grid",
gap:10,
gridTemplateAreas:`
' adress  adress  adress adress  ' 
' phone phone email email   ' 


`
   }} >
    {/* <div style={{gridArea:"city"}}>
    <InputEl
            value={selpick}
            outputfunc={(val) => {
             handleCityChange(val);           
            }}
            iden={"color"}
            data={pickups}
            iscats={false}
            select={true}
            label={"الولاية"}
          />
    </div> */}
    <div style={{gridArea:"phone"}}>
      <InputEl outputfunc={(val)=>{setPhone(val)}} label={"رقم الهاتف"}/>
    </div>  

    <div style={{gridArea:"adress",display: deliveryMeth==1?"block":"none",}}>
      <InputEl outputfunc={(val)=>{setAddress(val)}} label={"العنوان"}/>
    </div>  

    <div style={{gridArea:"email"}}>
      <InputEl outputfunc={(val)=>{setEmail(val)}} label={"البريد الإلكتروني"}/>
    </div>  

   
   </div>
{/* 
   <div style={{
    width:"100%",
display: deliveryMeth==2?"grid":"none",
gap:10,
gridTemplateAreas:`
' city  city  . .   ' 
' phone phone . .    ' 


`
   }} >
    
    <div style={{gridArea:"phone"}}>
      <InputEl outputfunc={(val)=>{setNameen(val)}} label={"إختر نقطة الإستلام"}/>
    </div>  

   


   
   </div> */}

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






















































