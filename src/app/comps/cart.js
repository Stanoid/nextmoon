'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cartel from './cartel'
import { XIconreact,XIcon } from '@heroicons/react/outline'
import { BsCartFill } from 'react-icons/bs'
import { Flip, toast,ToastContainer } from 'react-toastify'
import LoadingBtn from './loadingbtn'
import {CartCon} from '../contexts/cartContext'
import Image from 'next/image';

import { useRouter } from 'next/navigation'

import { API_URL,Theme,CURRENCY } from '../local'

import { forwardRef, useRef,useImperativeHandle  } from "react"

const Cart = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true)
  const [scrol,setScrol]=useState(0);
  const [lod,setLod]=useState(0);
   const {cartData,addToCart,removeFromCart}  = useContext(CartCon);
  const [total,setTotal]=useState(0);
  const router = useRouter();
  const [carts,setCarts] = useState([


    {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      id:2,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     {
      name:"Intel® Core™ i5-12600HX Processor (18M Cache, up to 4.60 GHz)",
      price:56,
      color:"grey",
      img:"https://res.cloudinary.com/strapimedia/image/upload/v1704806799/cld-sample-4.jpg",
      qty:3
     },
     

  ]);
const  ls = require('local-storage');
  const [subtotal,setSubtotal]=useState(0);
 

  useEffect(()=>{

  
   

},[])


const handleTotal=()=>{
  const totacart = ls.get("cart");
  let total = 0;
  for (let i = 0; i < totacart.length; i++) {
 total = total + (totacart[i].price * totacart[i].qty);

    
  }
  setTotal(total);
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
                  }} className="mt-6 relative flex-1  sm:px-6">
              
                     

                     <div id="scrol"   style={{height:"50vh",overflowY:'scroll', overflowX:'hidden',padding:0}}>
                  
                 
      
                      
               {cartData.length!=0?cartData.map(cart=>(
                
                <Cartel removeItem={removeFromCart} id={cart.id} name={cart.nameEn} price={cart.price} size={cart.opt} 
                comm={cart.comm}  color={cart.color} img={cart.id} qty={cart.qty} />
           
               )):
               <div style={{display:'flex',color:'grey',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                  <div>
      <Image src={'/void.svg'} width={200} height={200} />
      </div>
                 <div style={{fontWeight:'bold',marginTop:20}}> سلة فارغة  </div>
                 <div>تصفح المنتجات و أضفها للمتابعة</div>
                 </div>}
           

              
               
                   
                     
                   
                    
                     </div>



                     <div style={{
                      width:"100%",
                      
                      color:Theme.primary,
                      fontWeight:"bold",
                      fontSize:25,
                      textAlign:"center",
                      padding:0,
                      paddingBottom:5
                     }}> 
                      Total  : 321.3 {CURRENCY} 
                     </div>
   
                    <div style={{padding:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{fontSize:15,fontWeight:'bold'}}>
                          
                           </div>
                       
                          
                          
                         
                        

                    
                         <LoadingBtn act={()=>{addToCart({id:1,name:"jhon"})}}  text={"متابعة"} lod={lod} /></div>                  
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
