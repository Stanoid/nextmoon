'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cartel from './cartel'
import { XIconreact,XIcon } from '@heroicons/react/outline'
import { FaTruck,FaClock, FaBoxOpen, FaClipboard, FaX } from 'react-icons/fa6'
import { Flip, toast,ToastContainer } from 'react-toastify'
import LoadingBtn from './loadingbtn'
import { Button } from '@nextui-org/react'

import {CartCon} from '../contexts/cartContext'
import Image from 'next/image';

import { useRouter } from 'next/navigation'

import { API_URL,Theme,CURRENCY,IMG_URL } from '../local'

import { forwardRef, useRef,useImperativeHandle  } from "react"

const ItemsPopup = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true)
  const [scrol,setScrol]=useState(0);
  const [lod,setLod]=useState(0);
   const {cartData,addToCart,removeFromCart,CartTotal}  = useContext(CartCon);
  const [total,setTotal]=useState(0);
  const router = useRouter();
const  ls = require('local-storage');
  const [odate,setOdate]=useState(0);
 const [orderItems,setOrderitems] = useState({data:[]});

  useEffect(()=>{
setOrderitems({data:[]})
   getOrderItems();
//   console.log(new Date(props.data.date));

   var date = new Date(props.data&&props.data.date * 1000);
console.log(props.data&&props.data.date)
// Hours part from the timestamp
var hours = date.getHours();
var m = date.getMonth();
var y = date.toLocaleDateString("en-US");
var d = date.getDay();
// Minutes part from the timestamp
var minutes =   date.getMinutes();

// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format

//setOdate(formattedTime);
setOdate("On: "+y +"  At  "+ hours+":"+minutes);


},[props.open])





const getOrderItems= ()=>{

  if(props.data==undefined||props.data==null){return}
  setLod(true)
    const requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + ls.get("atkn")
},
  body: JSON.stringify({
     id: props.data&&props.data.refId,
    })
};
fetch(`${API_URL}orders?func=getOrderItems`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log("orderitems",data );
   
    setOrderitems({data:data})
    setLod(false)
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
//       console.log("checoutlinked",data );
//       window.location= data.url;
//     }).then(()=>{
      
//     });


    props.openHandler(false);
    router.push("/checkout")
}


const handleOrderDelivery = ()=>{

  
        setLod(true)
 const requestOptions = {
   method: 'POST',
   headers: {
       "Content-Type": "application/json",
       "Authorization": 'Bearer ' + ls.get("atkn")
   },  body: JSON.stringify(
    {
        "id": props.data&&props.data.id,
      }
  )
};
 fetch(`${API_URL}orders?func=deliverOrder`, requestOptions)
   .then((response) => response.json())
   .then((data) => {
     console.log("delivered ",data )
     props.getOrders();
  
   }).then(()=>{
  
   
   })



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
         
            
          <div className="fixed bottom-0 right-0 lg:bottom-0 max-h-1/2 text-right   max-w-md flex ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-200 sm:duration-300"
              enterFrom="translate-y-full lg:translate-y-full"
              enterTo="translate-y-0 lg:translate-y-0 "
              leave="transform transition ease-in-out duration-200 sm:duration-300"
              leaveFrom="translate-y-0 lg:translate-y-0 "
              leaveTo="translate-y-full lg:translate-y-full"
            >
              <div className="relative w-screen tracking-tight text-sm">
              <ToastContainer  limit={3}/>
                
                <div className="h-screen-1/2 flex flex-col py-6 rounded-t-lg rounded-r-lg lg:rounded-r-none lg:rounded-t-none  bg-white shadow-lg overflow-y-hidden">
            
                  <div className="px-4 py-4 sm:px-6 flex align-middle justify-between">

                

                  <div  className='text-moon-200/80 flex-grow '  style={{
                      display:"flex",
                     whiteSpace:"nowrap",
                    
                      justifyContent:"center",
                      alignItems:"center",
                      fontWeight:"bold",  
                      fontSize:"1.5rem",
                      paddingBottom:20,
                   
                     
                    }} >

<div>
                      تفاصيل الطلب
                      </div>    

                      <div style={{
                        marginLeft:1
                      }}>
                        <FaClipboard/>
                      </div>
                        
                                
                  
                    </div>   

                    <div></div>
                 
               

   





                  </div>

                  <div className="px-4 sm:px-6 flex mb-3 align-middle justify-between">

                  <div style={{
                      fontWeight:650,
              
                  }}>

                  <div className='shadow-sm  text-amber-700 bg-amber-200 ' 
                  style={{
                    display:props.data&&props.data.status=="initiated"?"flex":"none",
                    padding:"5px 11px",
                    alignItems:"center",
                    borderRadius:8,
                    fontSize:"0.7rem",
                  
                    justifyContent:"center",
                   
                  }}
                  >
                    <div  className='bg-amber-700' style={{width:8,height:8,borderRadius:100,marginRight:7}}></div>
                    <div>غير موصل</div>
                  </div>

                  <div className='shadow-sm text-green-600 bg-green-300 ' 
                  style={{
                    display:props.data&&props.data.status=="delivered"?"flex":"none",
                    padding:"7px 11px",
                    borderRadius:8,
                    alignItems:"center",
                    fontSize:"0.7rem",
                    justifyContent:"center",
                   
                  }}
                  >
                    <div  className='bg-green-600' style={{width:8,height:8,borderRadius:100,marginRight:7}}></div>
                    <div>تم التوصيل</div>
                  </div>
               

                  </div>
        
                  <div className='shadow-sm text-sm text-gray-600  ' 
                  style={{
                    display:"flex",
                    padding:"5px 11px",
                    alignItems:"center",
                    borderRadius:8,
                   
                  
                    justifyContent:"center",
                   
                  }}
                  >
                    <div>{odate}</div>
                    <div  className='' style={{marginLeft:7}}><FaClock/></div>
                   
                  </div>

                  
                  </div>



                  <div  style={{
                    margin:"0px 20px",
                     
                  }} className="mt-6 relative flex-1 border-t-2 border-moon-200/80  ">
              

              <div id="scrol"   style={{height:"50vh",overflowY:'scroll', overflowX:'hidden',padding:0}}>
                 
           




                    <div style={{display:"flex",width:"100%",alignItems:"flex-start",flexDirection:"column",justifyContent:"center"
                    ,padding:"20px 5px 5px 5px",marginTop:10}} 
              className="shadow-md rounded-md ">
               {/* <div style={{color:"teal",borderBottom:"2px solid teal",width:"100%",textAlign:"left",fontWeight:"bold",paddingBottom:15}}>
                 Order items:
               </div> */}
              <div style={{marginTop:10,width:"100%"}} >
             
              {orderItems&&orderItems.data.map((item,index)=>(
                
                
              

                <div className='shadow-sm' key={index} style={{display:"flex",flexDirection:"row-reverse",marginBottom:10,padding:6,borderRadius:6,alignItems:"center",justifyContent:"space-between"}} >

              <div style={{display:'flex',alignItems:"center",justifyContent:"flex-start"}}>
             
             
<div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",flexDirection:"column",marginRight:10}}>

               <div>{item.name&&item.name}</div> 
               <div className='text-gray-600' style={{fontWeight:"bold",textAlign:"right",width:"100%"}}>{item.product_ref&&item.product_ref}</div>                 
              </div>
              <img
        style={{objectFit:'cover',width:'25%',height:'100%',borderRadius:12}}
          src={IMG_URL.concat(item.imgs&&JSON.parse(item.imgs)[0])} 
          />

              </div>


<div style={{display:"flex",fontWeight:"bold",alignItems:"center",justifyContent:"center",textWrap:"nowrap"}}>
{item.qty} Pcs
</div>

            

              <div style={{display:"flex",alignContent:"center",justifyContent:"center",flexDirection:"column",padding:"0px 10px"}}>

<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:25,height:25,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:14}}>{item.sizeIcom&&item.sizeIcom}</div>

<div style={{width:30,height:30,
marginLeft:-10,marginTop:-5
,borderRadius:100,backgroundColor:item.colorCode&&item.colorCode}} ></div>

</div>

<div style={{fontSize:13,display:props.order?"none":"block",textAlign:"center"}}>
{item.sizeName&&item.sizeName} <span>  </span> {item.color&&item.color}
</div>

</div>
                
                </div>    
               ))
             
              }


<div style={{
  display:lod?'flex':'none' ,
  alignItems:"center",
  justifyContent:"center"
}}>
<div style={{zIndex:10}}>
      <div style={{justifyContent:"center",alignItems:"center"}} className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
</div>

              </div>
             
            
                    </div>


               
                 
      
        
                   
                    
                     </div> 



                     {/* <div style={{
                      width:"100%",
                      display:cartData.length==0?"none":"block",
                      color:Theme.primary,
                      fontWeight:"bold",
                      fontSize:25,
                      textAlign:"center",
                      padding:0,
                      paddingBottom:5
                     }}> 
                      Total  : {CartTotal} {CURRENCY} 
                     </div> */}
   
                    <div style={{padding:5, display:"flex",alignItems:'center',flexDirection:"column",justifyContent:'space-between'}}>
                        <div style={{fontWeight:'bold'}}>
                          
                           </div>
    

                           <div className=' lg:block flex-grow flex align-middle justify-start  '  >
                     <Button startContent={<FaX/>} className='bg-red-400/30 font-bold text-red-500' 
                     onClick={()=>{props.openHandler(false)}} 
                      variant='shadow' > إخفاء </Button> </div>

                          
                         {/* <LoadingBtn 
                         color={props.data&&props.data.status=="initiated"?"teal":"darkgray"}
                         act={props.data&&props.data.status=="initiated"?()=>{
                       handleOrderDelivery() ; 
                       }:()=>{}}  text={props.data&&props.data.status=="initiated"?"Deliver":"Delivered"} lod={lod} /> */}
                       
                       
                       
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

export default ItemsPopup;
