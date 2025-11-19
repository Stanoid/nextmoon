/* cleaned deliveryPopup */
'use client'
import { Fragment, useState,useEffect,forwardRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTruck,FaClock } from 'react-icons/fa6'
import { ToastContainer } from 'react-toastify'
import { Button } from '@nextui-org/react'
import Image from 'next/image';
import { useSelector } from 'react-redux'
import { API_URL,CURRENCY,IMG_URL } from '../local'
import { XIcon } from '@heroicons/react/outline'

const deliveryPopup = forwardRef((props) => {
  const [lod,setLod]=useState(0);
  const [odate,setOdate]=useState(0);
  const [orderItems,setOrderitems]=useState(null);
  const udata = useSelector((state)=>state.root.auth.data&&state.root.auth.data)

  useEffect(()=>{
    setOrderitems(null)
    getOrderItems();
    var date=new Date(props.data&&props.data.date*1000);
    var y=date.toLocaleDateString("en-US");
    var hours=date.getHours();
    var minutes=date.getMinutes();
    setOdate("On: "+y+"  At  "+hours+":"+minutes);
  },[props.open])

  const getOrderItems=()=>{
    if(!props.data)return;
    setLod(true)
    const requestOptions={method:'POST',headers:{"Content-Type":"application/json","Authorization":'Bearer '+udata.data.jwt},body:JSON.stringify({id:props.data.id})};
    fetch(`${API_URL}orders?func=getOrderItems`,requestOptions)
    .then(r=>r.json())
    .then(d=>{setOrderitems(d);setLod(false)})
  }

  const handleOrderDelivery=()=>{
    setLod(true)
    const requestOptions={method:'POST',headers:{"Content-Type":"application/json","Authorization":'Bearer '+udata.data.jwt},body:JSON.stringify({id:props.data.id})};
    fetch(`${API_URL}orders?func=deliverOrder`,requestOptions)
    .then(r=>r.json())
    .then(()=>{props.getOrders()})
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={()=>{props.openHandler(false)}}>
        <ToastContainer limit={3}/>
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-moon-200 to-moon-300 px-6 py-5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <FaTruck className="text-2xl"/>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{props.data&&props.data.name}</h2>
                      <p className="text-sm opacity-90 flex items-center gap-2 mt-1">
                        <FaClock className="text-base"/>
                        {odate}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={()=>{props.openHandler(false)}} 
                    className="p-2 hover:bg-white/20 rounded-full transition-all hover:rotate-90 duration-300"
                  >
                    <XIcon className="h-6 w-6"/>
                  </button>
                </div>

                {/* Status Badge */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  {props.data&&props.data.status==="initiated"&&(
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-yellow-100 text-yellow-700 border-2 border-yellow-200">
                      <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse"></div>
                      غير مؤكد
                    </span>
                  )}
                  {props.data&&props.data.status==="processed"&&(
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-blue-100 text-blue-700 border-2 border-blue-200">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      قيد التوصيل
                    </span>
                  )}
                  {props.data&&props.data.status==="delivered"&&(
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-green-100 text-green-700 border-2 border-green-200">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      تم التوصيل
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  
                  {/* Contact & Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaTruck className="text-moon-200"/>
                        معلومات الاتصال
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          الهاتف: <span className="font-semibold text-gray-800">{props.data&&props.data.phone}</span>
                        </p>
                        <p className="text-gray-600 break-all">
                          البريد: <span className="font-semibold text-gray-800">{props.data&&props.data.email}</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FaClock className="text-moon-200"/>
                        عنوان التوصيل
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          المدينة: <span className="font-semibold text-gray-800">{props.data&&props.data.city}</span>
                        </p>
                        <p className="text-gray-700">{props.data&&props.data.line1}</p>
                        {props.data&&props.data.line2&&(<p className="text-gray-700">{props.data.line2}</p>)}
                      </div>
                    </div>
                  </div>

                  {/* Products Section */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b-2 border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FaTruck className="text-moon-200"/>
                        المنتجات ({orderItems?.length||0})
                      </h3>
                    </div>

                    <div className="p-4">
                      {lod?(
                        <div className="flex justify-center py-12">
                          <div className="lds-facebook"><div></div><div></div><div></div></div>
                        </div>
                      ):(
                        <div className="space-y-3">
                          {orderItems&&orderItems.map((item,index)=>(
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200">
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm">
                                {item.img?(
                                  <Image src={item.img.startsWith('http')?item.img:`${IMG_URL}${item.img}`} alt={item.name} fill className="object-cover"/>
                                ):(<div className="w-full h-full bg-gray-200 flex items-center justify-center"><FaTruck className="text-gray-400"/></div>)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 flex-wrap">
                                  <span className="bg-white px-2 py-1 rounded-md border border-gray-300 font-medium">{item.code}</span>
                                  {item.size&&(<span className="bg-white px-2 py-1 rounded-md border border-gray-300">{item.size}</span>)}
                                  {item.color&&(
                                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-gray-300">
                                      <div className="w-3 h-3 rounded-full border border-gray-400 shadow-sm" style={{backgroundColor:item.color}}/>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <p className="text-lg font-bold text-moon-200">{item.price} {CURRENCY}</p>
                                <p className="text-sm text-gray-600 mt-1">الكمية: <span className="font-semibold">{item.qty}</span></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">الإجمالي:</span>
                        <span className="text-3xl font-bold text-moon-200">{props.data&&props.data.total} {CURRENCY}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                {props.isadmin && props.data&&props.data.status!== 'delivered' && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Button 
                      radius="lg" 
                      size="lg" 
                      className="bg-gradient-to-r from-moon-200 to-moon-300 hover:from-moon-300 hover:to-moon-200 text-white font-bold w-full shadow-lg hover:shadow-xl transition-all" 
                      startContent={<FaTruck className="text-xl"/>} 
                      onClick={handleOrderDelivery} 
                      isLoading={lod}
                    >
                      تأكيد التوصيل
                    </Button>
                  </div>
                )}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
})
export default deliveryPopup;
