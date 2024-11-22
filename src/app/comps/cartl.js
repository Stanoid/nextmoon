/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect,useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cartel from './cartel'
import { XIconreact,XIcon } from '@heroicons/react/outline'
import { BsHeartFill } from 'react-icons/bs'
import { CartCon } from '../contexts/cartContext'
import { Flip, toast,ToastContainer } from 'react-toastify'
import LoadingBtn from './loadingbtn'

import Image from 'next/image';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import LikeEl from "./likel"
import { API_URL, Theme,IMG_URL } from '../local'


import { forwardRef, useRef  } from "react"





const Cart = forwardRef((props, ref) => {


  

const {favData,removeFromFav,useNotifi}  = useContext(CartCon);

  const [open, setOpen] = useState(true)
  const [refr, setRefr] = useState(true)
  const [scrol,setScrol]=useState(0);
  const [likesData,setLikesData] = useState(null);
  const [lod,setLod]=useState(0);
  const firstRenderRef = useRef(true);
  const [total,setTotal]=useState(0);
  const router = useRouter();
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

const  ls = require('local-storage');
  const [subtotal,setSubtotal]=useState(0);
 

  useEffect(()=>{

   // console.log("likes jwt",udata&&udata.data.jwt)
 

  if (firstRenderRef.current) {
    firstRenderRef.current = false;
    if(udata&&udata.data.jwt){
      getLikes(); 
    }
  } else {
            
  }

  

},[props.open,firstRenderRef])



const getLikes=()=>{
        
 // props.setLod(true);

     
const requestOptions = {
  method: 'GET',
  headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + udata.data.jwt
  },

};

try {
  
  fetch(`${API_URL}likes?func=getLikes`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
  console.log("likes",data) 

  setLikesData(data);
  // if(data.data==null){
    
  // }else{
  //   setLikesData(data);
  // }

  }).then(()=>{
    
   
  })

} catch (error) {
  console.log(error);
  router.push("/logout")
}


}

   

const removeFav = (id)=>{



    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + udata.data.jwt,
      },
      body: JSON.stringify({
       id:id
      }),
    };

    fetch(`${API_URL}likes?func=removeLike`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
       // console.log(data);
       setRefr(!refr);
        useNotifi("success", "تمت إزالة المنتج من المفضلة");

      })
      .then(() => {
    
      });
  




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
      
      <Dialog as="div" style={{height:"100vh"}} className="fixed inset-0 overflow-hidden z-20" onClose={()=>{props.openHandler(true)}}>
        <div  className="absolute inset-0 overflow-hidden">
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
          <div className="fixed top-0 right-0 lg:top-0 max-h-1/2 text-right   max-w-md flex ">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
              <div className="relative w-screen ">
              <ToastContainer  limit={3}/>
                
                <div className="h-screen flex flex-col py-6 rounded-t-lg rounded-r-lg lg:rounded-r-none lg:rounded-t-none  bg-white shadow-lg overflow-y-hidden">
            
                  <div className="px-4 sm:px-6 flex align-middle justify-between">
                    
                    {/* <Dialog.Title
                    style={{fontWeight:"bold",textAlign:"right"}}
                    className="text-lg font-medium text-gray-900  ">المفضلة </Dialog.Title> */}

                    <div  style={{
                      display:"flex",
                      width:"100%",
                      color:Theme.primary,
                      justifyContent:"center",
                      alignItems:"center",
                      fontWeight:"bold",
                      paddingBottom:20,
                      borderBottom:"2px solid "+ Theme.primary,
                      fontSize:25,
                    }} >

                      <div style={{
                        marginRight:10
                      }}>
                        <BsHeartFill/>
                      </div>
                                <div>
                                المفضلة
                                </div>
                                
                  
                    </div>
                    <div className=' lg:block' onClick={()=>{props.openHandler(false)}} >   <XIcon className="h-8 w-8 p-1 border-2 rounded-full border-black  " aria-hidden="true" /></div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
              
                     

                     <div id="scrol"   style={{height:"100vh",overflowY:'scroll', overflowX:'hidden',padding:10}}>
                 
                     {likesData&&likesData.length!=0?likesData.map((like,index)=>(
                like.products.length!=0?
              <LikeEl lid={like.id} removeFav={(id)=>{removeFav(id)}} closeModal={()=>{props.openHandler(false)}} id={like.products[0]?.id} 
              price={like.products[0]?.varients[0]?.price}
               name={like.products[0]?.name_en} 
               code={like.products[0]?.code}
              index={index} img={JSON.parse(like.products[0].img)[0].url }  />:<></>
           
               )):
               <div style={{display:'flex',color:'grey',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                  <div>
      <Image src={'/like.svg'} width={200} height={200} />
      </div>
                 <div onClick={()=>{console.log(likesData)}} style={{fontWeight:'bold',marginTop:20}}> فارغة   </div>
                 <div>تصفح المنتجات و أضفها للمفضلة</div>
                 </div>}
           

              
               
                   
                     
                  
                    
                     </div>
   
                    {/* <div style={{padding:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{fontSize:15,fontWeight:'bold'}}></div>
                       
                          
                          
                         
                        

                    
                         <LoadingBtn act={()=>{handleCart()}}  text={"متابعة"} lod={lod} /></div>                   */}
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
