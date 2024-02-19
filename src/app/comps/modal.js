/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {BsBoxSeam,BsDownload} from 'react-icons/bs'
import { API_URL ,CURRENCY} from "../../app/local";
import { Theme } from '../../app/local';
export default function Modal(props) {
  const [open, setOpen] = useState(true)

  const statushand = (stat)=>{
    switch(stat){
      case 1:
        return <div style={{backgroundColor:"grey",color:"white",fontWeight:"bold",padding:5,borderRadius:0,textAlign:'center'}} >طلب مبدئي</div>
        break;

        case 2:
          return <div style={{backgroundColor:"orange",color:"white",fontWeight:"bold",padding:5,borderRadius:0,textAlign:'center'}} >قيد الإنتظار</div>
          break;

          case 3:
            return <div style={{backgroundColor:"green",color:"white",fontWeight:"bold",padding:5,borderRadius:0,textAlign:'center'}} >موكد</div>
            break;

            case 8:
              return <div style={{backgroundColor:"black",color:"white",fontWeight:"bold",padding:5,borderRadius:0,textAlign:'center'}} >ملغي</div>
              break;

            case 9:
              return <div style={{backgroundColor:"red",color:"white",fontWeight:"bold",padding:5,borderRadius:0,textAlign:'center'}} >محذوف</div>
              break;
    }

    
  }
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10   inset-0 overflow-y-auto" initialFocus={cancelButtonRef}  onClose={() => props.setopen(false)}>
        <div style={{backdropFilter:"blur(7px)",backgroundColor:"rgba(0,0,0,0.2)"}} className="flex   items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-10"
            enterFrom="opacity-0"
            enterTo="opacity-0"
            leave="ease-in duration-10"
            leaveFrom="opacity-0"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:w-3/4 xl:w-3/4 md:w-3/4  sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <BsBoxSeam className="h-10 w-10 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                     تفاصيل الطلب 
                    </Dialog.Title>
                    <div className="mt-2">
                   
          <div>
         
            {/* <div style={{textAlign:"left"}}  className='grid grid-cols-6 gap-2'>
            {props.order&&props.order.product.image.map((product) => (
            <div style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}} className='col-span-1'>
              <div   style={{position:'absolute',backgroundColor:Theme.primary,borderRadius:"5px 0px 0px 0px",cursor:"pointer",display:'flex',justifyContent:'center',alignItems:'center',padding:7,color:"white"}} 
              className='transition-opacity  hover:opacity-90' >
             
                <a download={props.order&&props.order.product.name} href={props.order&&props.order.product.image[0].url} title="ImageName">
                <BsDownload/>
                 </a>
              
              
                </div>

                <img width={"100%"} src={props.order&&props.order.product.image[0].url} />
                
                </div>
           ))}

            </div> */}
        
           <div style={{textAlign:"left"}} className='grid grid-cols-6 gap-6 mt-3'>
           <div className='col-span-6 xl:col-span-3 md:col-span-3 lg:col-span-3 '>
             <div style={{fontSize:20,color:Theme.grey,fontWeight:"bold"}}> التفاصبل</div>

             <div style={{marginTop:0,textAlign:"left"}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> إسم المنتج :</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.product.name} `}
                 </div>
               </div>

               <div style={{marginTop:0,textAlign:"left"}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> السعر الأساسي:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.price} ${CURRENCY} `}
                 </div>
               </div>

             <div style={{marginTop:0,textAlign:"left"}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> سعر البيع:</div>
                 </div>
                 <div className='col-span-3 '>
                {props.order&&props.order.sale_price!=null?`${props.order&&props.order.sale_price} ${CURRENCY} `: "لم يباع"}
                 
                 </div>
               </div>


               <div style={{marginTop:0,textAlign:'left'}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> الكمية:</div>
                 </div>
                 <div className='col-span-3 '>
                 {props.order&&props.order.qty!=null?`${props.order&&props.order.qty} `: "لم يباع"}
                 
                 </div>
               </div>

               <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> العمولة:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.commission} ${CURRENCY}`}
                 </div>
               </div>
               <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> التوصيل:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`1000 ${CURRENCY}`}
                 </div>
               </div>

               <div style={{marginTop:10}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> الحالة:</div>
                 </div>
                 <div className='col-span-3 '>
               {statushand(props.order&&props.order.status)}
                 </div>
               </div>
                       


                       {/* {props.order&&props.order.commission}
                       {props.order&&props.order.price}
                       {props.order&&props.order.sale_price} */}
                     
           </div>
          
           <div style={{display:props.order&&props.order.buyers_name==null?"none":"block",textAlign:'left'}} className='col-span-6 xl:col-span-3 md:col-span-3 lg:col-span-3'>
           <div style={{  fontSize:20,color:Theme.grey,fontWeight:"bold"}}> معلومات المشتري</div>
          
           <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> الإسم:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.buyers_name}`}
                 </div>
               </div>

               <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> العنوان:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.buyers_address}`}
                 </div>
               </div>

               <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> الهاتف:</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.buyers_phone}`}
                 </div>
               </div>

               <div style={{marginTop:0}} className='grid grid-cols-6'>
               <div className='col-span-3 '>
               <div style={{fontSize:15,color:Theme.grey,fontWeight:"bold"}}> الهاتف الإحتياطي :</div>
                 </div>
                 <div className='col-span-3 '>
                 {`${props.order&&props.order.buyer_backup_number}`}
                 </div>
               </div>
           
                     
           </div>
        

          </div>
          </div>
                     
                
                    </div>
                  </div>
                </div>
              </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexFlow:"row-reverse"}}>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  
                  style={{backgroundColor:"red",color:"white",display:props.type==1?"blobk":"none" }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.act(props.order&&props.order.id)}
                >
                  حذف
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setopen(false)}
                  ref={cancelButtonRef}
                >
                  إغلاق
                </button>

                
              </div>
              <div style={{display:props.type==1||props.type==3?"blobk":"none"}} className='bg-gray-50 px-4 py-3 sm:px-6'>
                <div style={{fontSize:13}} >الطلب + التوصيل: <span style={{color:Theme.grey,fontWeight:"bold"}}  >{`${props.order&&props.order.sale_price * props.order.qty + 1000} ${CURRENCY}`} </span></div>
                <div style={{fontSize:13}}>العمولة: <span style={{color:Theme.grey,fontWeight:"bold"}}>

                {props.order&&props.order.sale_price!=null?`${props.order&&props.order.commission * props.order.qty} ${CURRENCY} `: "لم يباع"}
                 
 
                   </span></div>
                <div style={{fontSize:17,fontWeight:"bold"}}>المجموع: <span style={{color:Theme.primary,fontWeight:"bold"}}>{`${(props.order&&props.order.sale_price * props.order.qty + 1000)  } ${CURRENCY}`} </span></div>
                </div>
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
