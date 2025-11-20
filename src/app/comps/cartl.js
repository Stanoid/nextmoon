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
import { useI18n } from '../lib/i18n';
import { forwardRef, useRef  } from "react"





const Cart = forwardRef((props, ref) => {
  const { t, direction } = useI18n();
  const {favData,removeFromFav,useNotifi}  = useContext(CartCon);

  const [open, setOpen] = useState(true)
  const [refr, setRefr] = useState(true)
  const [scrol,setScrol]=useState(0);
  const [likesData,setLikesData] = useState([]);
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
        useNotifi("success", t('removeFromFavorites'));

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
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed inset-0 overflow-hidden z-[100]" 
        onClose={() => {props.openHandler(false)}}
      >
        <div className="absolute backdrop-blur-sm inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-30 lg:bg-opacity-50 transition-opacity" />
          </Transition.Child>
          
          <div className={`fixed inset-y-0 ${direction === 'rtl' ? 'right-0' : 'left-0'} w-full max-w-full sm:max-w-md flex`}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom={direction === 'rtl' ? "translate-x-full" : "-translate-x-full"}
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo={direction === 'rtl' ? "translate-x-full" : "-translate-x-full"}
            >
              <div className="relative w-full h-full">
                <ToastContainer limit={3} />
                
                <div className="flex flex-col h-full w-full bg-white shadow-2xl overflow-hidden" dir={direction}>
                  {/* Header */}
                  <div className="px-4 sm:px-6 py-4 border-b-2 flex items-center justify-between" style={{ borderColor: Theme.primary }}>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => {props.openHandler(false)}}
                      aria-label="Close"
                    >
                      <XIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{t('favorites')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Favorites Items */}
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                 
                    {likesData && Array.isArray(likesData) && likesData.length !== 0 ? (
                      likesData.map((like, index) => (
                        like?.products && Array.isArray(like.products) && like.products.length !== 0 ? (
                          <LikeEl 
                            key={like.id || index}
                            lid={like.id} 
                            removeFav={(id) => {removeFav(id)}} 
                            closeModal={() => {props.openHandler(false)}} 
                            id={like.products[0]?.id} 
                            price={like.products[0]?.varients?.[0]?.price}
                            name={like.products[0]?.name_en} 
                            code={like.products[0]?.code}
                            index={index}
                            img={
                              like.products[0]?.images && Array.isArray(like.products[0].images) && like.products[0].images[0]?.url
                                ? IMG_URL + like.products[0].images[0].url
                                : "/default-image.png" 
                            }
                          />
                        ) : null
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 mb-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <div className="font-bold text-lg mb-2">{t('emptyFavorites')}</div>
                        <div className="text-sm">{t('browseFavorites')}</div>
                      </div>
                    )}
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
