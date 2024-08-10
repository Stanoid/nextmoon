'use client'
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {  FaClipboard, FaChevronDown,FaCreditCard, FaClock } from 'react-icons/fa6'
import {  toast,ToastContainer } from 'react-toastify'
import { Button } from '@nextui-org/react'
import {CartCon} from '../contexts/cartContext'
import { useRouter } from 'next/navigation'
import { API_URL,Theme,CURRENCY,IMG_URL } from '../local'
import { forwardRef  } from "react"

const ItemsPopup = forwardRef((props, ref) => {
  const [lod,setLod]=useState(0);
  const router = useRouter();
const  ls = require('local-storage');
  const [odate,setOdate]=useState(0);
 const [orderItems,setOrderitems] = useState({data:[]});

  useEffect(()=>{
setOrderitems({data:[]})
   getOrderItems();
//   

   var date = new Date(props.data&&props.data.date * 1000);

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
    
   //console.log(data)
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
//       
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
                
                <div style={{backgroundSize:20}} className="h-screen-1/2 flex flex-col pt-6 pb-2 rounded-t-lg
                 rounded-r-lg lg:rounded-r-none lg:rounded-t-none 

                 bg-gradient-to-b from-white to-moon-100/30

                  bg-white  shadow-lg overflow-y-hidden">
            
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

                  <div className='flex items-center justify-start space-x-2' style={{
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



                  <div className='shadow-sm  text-amber-700 bg-amber-200 ' 
                  style={{
                    display:props.data&&props.data.payment_status=="unpaid"?"flex":"none",
                    padding:"5px 11px",
                    alignItems:"center",
                    borderRadius:8,
                    fontSize:"0.7rem",
                  
                    justifyContent:"center",
                   
                  }}
                  >
                    <div  className='bg-amber-700' style={{width:8,height:8,borderRadius:100,marginRight:7}}></div>
                    <div>غير مدفوع</div>
                  </div>

                  <div className='shadow-sm text-green-600 bg-green-300 ' 
                  style={{
                    display:props.data&&props.data.payment_status=="paid"?"flex":"none",
                    padding:"7px 11px",
                    borderRadius:8,
                    alignItems:"center",
                    fontSize:"0.7rem",
                    justifyContent:"center",
                   
                  }}
                  >
                    <div  className='bg-green-600' style={{width:8,height:8,borderRadius:100,marginRight:7}}></div>
                    <div>مدفوع</div>
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
                    margin:"0px 8px",
                     
                  }} className="mt-6 relative flex-1 border-t-2 border-moon-200/80  ">
              

              <div id="scrol"   style={{height:"50vh",overflowY:'scroll', overflowX:'hidden',padding:0}}>
                 
           




                    <div style={{display:"flex",width:"100%",alignItems:"flex-start",flexDirection:"column",justifyContent:"center"
                    ,padding:"20px 5px 5px 5px",marginTop:10}} 
              className=" ">
               {/* <div style={{color:"teal",borderBottom:"2px solid teal",width:"100%",textAlign:"left",fontWeight:"bold",paddingBottom:15}}>
                 Order items:
               </div> */}
              <div className='space-y-3.5' style={{marginTop:10,width:"100%"}} >
             
              {orderItems&&orderItems.data.map((item,index)=>(
                
                
              

                <div  className='shadow-md px bg-white rounded-md p-3 px-4' key={index} style={{display:"flex",flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-between"}} >


<div>
<img
        style={{objectFit:'cover',width:80,borderRadius:4}}
          src={IMG_URL.concat(item.imgs&&JSON.parse(item.imgs)[1])} 
          />
</div>
              <div className='p-3' style={{display:'flex',alignItems:"flex-end",flexDirection:"column",justifyContent:"flex-start"}}>
             
             
<div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",flexDirection:"column"}}>

               <div className='text-md whitespace-nowrap' >{item.nameAr&&item.nameAr.slice(0,20)+"..."}</div> 
               
               <div className='text-gray-400 text-xs '  style={{fontWeight:"bold",textAlign:"right",width:"100%"}}>{item.product_ref&&item.product_ref}</div>                 
              </div>
              <div dir='rtl' className='font-semibold '>

      <span className=' italic text-gray-500 ' style={{ padding:5,fontSize:12,paddingTop:0,fontWeight:"bold"}}>{item.qty} قطعة</span>
     - 
      <span className=' italic text-moon-200/80 ' style={{ padding:5,fontSize:12,paddingTop:0,fontWeight:"bold"}}>{item.price} {CURRENCY}</span>

      </div>

              </div>




            

              <div className='' style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexDirection:"column",padding:"0px 0px"}}>

<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div  style={{width:35,height:35,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",
border:"3px solid white",marginRight:-10,zIndex:10,marginBottom:-5
,backgroundColor:Theme.primary,color:"white",fontSize:16}}>{item.sizeIcom&&item.sizeIcom}</div>

<div style={{width:40,height:40,
marginLeft:-20,marginTop:-8
,borderRadius:100,backgroundColor:item.colorCode&&item.colorCode}} ></div>

</div>

<div className='flex flex-col text-xs ' style={{display:props.order?"none":"block",textAlign:"left"}}>
 <div>{item.sizeNameEn&&item.sizeNameEn}  </div>  <div className='text-gray-500' >   {item.colorAr&&item.colorAr} </div> 
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



                    
   
                    <div className='py-3 px-3' style={{height:"100%", display:"flex",alignItems:'center',flexDirection:"row",justifyContent:'space-between'}}>
                       
    

                           <div className=' lg:block  flex align-middle justify-start  '  >
                     <Button startContent={<FaChevronDown/>} className='bg-gray-300 font-bold text-white' 
                     onClick={()=>{props.openHandler(false)}} 
                      variant='shadow' > إخفاء </Button> 
{props.data.payment_status=="unpaid"?<Button startContent={<FaCreditCard/>} className='bg-moon-200 mx-2 font-bold text-white px-8' 
                     onClick={()=>{router.push(props.data.url)}} 
                      variant='shadow' > دفع </Button>:<></> }

                      
                      </div>


<div dir='rtl' className='px-2' style={{fontWeight:'bold',alignItems:"center"  }}>
 <div className='text-md text-moon-200/80' >
 المجموع : {props.data&&props.data.total }  <span className='text-gray-500 mx-0.5 italic text-xs'>{CURRENCY}</span> 
 </div>
      
                           </div>

                          
                   
                       
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
