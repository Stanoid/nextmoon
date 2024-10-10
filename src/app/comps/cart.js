'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cartel from './cartel'
import { XIconreact,XIcon } from '@heroicons/react/outline'
import { BsCartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Flip, toast,ToastContainer } from 'react-toastify'
import { Button } from '@nextui-org/react'
import { FaCreditCard, FaLock, FaUser } from 'react-icons/fa6'
import LoadingBtn from './loadingbtn'
import {CartCon} from '../contexts/cartContext'
import Image from 'next/image';

import { useRouter } from 'next/navigation'

import { API_URL,Theme,CURRENCY } from '../local'

import { forwardRef, useRef,useImperativeHandle  } from "react"
import { product } from './productdata'

const Cart = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true)
  const [scrol,setScrol]=useState(0);
  const [lod,setLod]=useState(0);
   const {cartData,addToCart,removeFromCart,CartTotal}  = useContext(CartCon);
  const [total,setTotal]=useState(0);
  const router = useRouter();
const  ls = require('local-storage');
  const [subtotal,setSubtotal]=useState(0);
  const cartg = useSelector((state) => state.root.cart.data)
  const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
const [logindata,setLogindata]= useState(null)


  useEffect(()=>{
  
},[props.open])



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
     items: payarray
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




const createCheckoutSession = ()=>{

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(
//         {     
//            "id":1,
//           }
//       )
// };
//   fetch(`${API_URL}orders?func=initPaymentSession`, requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       
//       window.location= data.url;
//     }).then(()=>{
      
//     });


    props.openHandler(false);
    router.push("/checkout")
}



const notify = (type,msg)=>{

    const options={
      hideProgressBar:true,
      draggable:true,
      closeButton:false,
      
    }
    switch(type){
      case 'success':
        toast.success(msg,options)
        break;

        case 'error':
          toast.error(msg,options)
          break;

          case 'warn':
            toast.warn(msg,options)
            break;

          

    }
   
  }
  


  return (
    <Transition.Root  show={props.open} as={Fragment}>
      
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-20" onClose={()=>{props.openHandler(true)}}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"



          >
            <Dialog.Overlay  className="absolute inset-0 bg-black lg:bg-black  bg-opacity-10 lg:bg-opacity-50 transition-opacity" />
          </Transition.Child>
         
            
          <div className="fixed bottom-0 right-0 lg:top-0 max-h-1/2 text-right   max-w-md flex ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-200 sm:duration-300"
              enterFrom="translate-y-full lg:-translate-y-full"
              enterTo="translate-y-0 lg:-translate-y-0 "
              leave="transform transition ease-in-out duration-200 sm:duration-300"
              leaveFrom="translate-y-0 lg:-translate-y-0 "
              leaveTo="translate-y-full lg:-translate-y-full"
            >
              <div className="relative w-screen ">
              <ToastContainer  limit={3}/>
                
                <div className="h-screen-1/2 flex flex-col py-6 rounded-t-lg rounded-r-lg lg:rounded-r-none lg:rounded-t-none  bg-white shadow-lg overflow-y-hidden">
            
                  <div className="px-4 sm:px-6 flex align-middle justify-between">

                  <div  style={{
                      display:"flex",
                      width:"100%",
                      color:Theme.primary,
                      justifyContent:"center",
                      alignItems:"center",
                      fontWeight:"bold",
                      paddingBottom:20,
                   
                      fontSize:25,
                    }} >

                      <div style={{
                        marginRight:10
                      }}>
                        <BsCartFill/>
                      </div>
                                <div>
                                السلة
                                </div>
                                
                  
                    </div>   
                 
                    <div className=' lg:block' onClick={()=>{props.openHandler(false)}} >   <XIcon className="h-8 w-8 
                     border-2 rounded-full border-black  " aria-hidden="true" /></div>
                  </div>
                  <div style={{
                    margin:"0px 20px",
                       borderTop:"2px solid "+ Theme.primary,
                  }} className="mt-6 relative flex-1  ">
              
                     

                     <div id="scrol"   style={{height:"50vh",overflowY:'scroll', overflowX:'hidden',padding:0}}>
                  
                 
      
                      
               {cartg&&cartg.length!=0?cartg.map((cart,index)=>(
                
                <Cartel order={false} 
                key={index}
                index={index}
                data={cart.data}
                size={cart.size}
                color={cart.color}
                code={cart.code}
                selvar={cart.selvar}
                 removeItem={removeFromCart} 
                 qty={cart.qty}
                  

                      />
           
               )):
               <div style={{display:'flex',color:'grey',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                  <div>
      <Image src={'/void.svg'} width={200} height={200} />
      </div>
                 <div style={{fontWeight:'bold',marginTop:20}}> سلة فارغة  </div>
                 <div>تصفح المنتجات و أضفها للمتابعة</div>
                 </div>}
           

              
               
                   
                     
                   
                    
                     </div>





                    <div style={{padding:20, display:cartg&&cartg.length==0?"none":"flex",
                      alignItems:'center',justifyContent:'center'}}>

                        {isLogged?<LoadingBtn  icon={<FaCreditCard className='ml-1.5' />}   act={()=>{
                       handleOrder() ; 
                       }}  text={"متابعة إلى الدفع"} lod={lod} />:<LoadingBtn   icon={<FaLock className='ml-1.5' />}   act={()=>{
                        router.push("/login"); props.openHandler(false); 
                        }}  text={"سجل الدخول للمتابعة إلى الدفع"} color={Theme.secondaryDark} lod={lod} />}

                        
                       </div>                  
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
  
  





        </div>
      </Dialog>
    </Transition.Root>
  )
})

export default Cart;
