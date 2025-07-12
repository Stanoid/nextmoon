'use client'
import { Fragment, useState, useEffect, useContext, forwardRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Cartel from './cartel'
import { XIcon } from '@heroicons/react/outline'
import { BsCartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { Button } from '@nextui-org/react'
import { FaCreditCard, FaLock, FaUser } from 'react-icons/fa6'
import LoadingBtn from './loadingbtn'
import { CartCon } from '../contexts/cartContext'
import Image from 'next/image';

import { useRouter } from 'next/navigation'

import { API_URL, Theme, CURRENCY } from '../local'

import { FaArrowAltCircleRight } from 'react-icons/fa'

const Cart = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true)
  const [lod, setLod] = useState(0);
  const { cartData, addToCart, removeFromCart, CartTotal } = useContext(CartCon);
  const router = useRouter();


  const [subtotal, setSubtotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); 
  const [finalTotal, setFinalTotal] = useState(0); 
  
  const cartg = useSelector((state) => state.root.cart.data); 
  const isLogged = useSelector((state) => state.root.auth.data);

  useEffect(() => {
    let calculatedSubtotal = 0;

    cartg.forEach(item => {
      const selectedVariant = item.data?.attributes?.varients?.data?.find(v => v.id === item.selvar);
      if (selectedVariant && selectedVariant.attributes?.price) {
        calculatedSubtotal += selectedVariant.attributes.price * item.qty;
      }
    });
    setSubtotal(calculatedSubtotal);

    const calculatedSavings = calculatedSubtotal >= 6950 ? 6950 : 0;
    setSavings(calculatedSavings);

    const freeShippingThreshold = 1499; 
    let currentShippingCost = 120; 
    if (calculatedSubtotal >= freeShippingThreshold) {
      currentShippingCost = 0; 
    }
    setShippingCost(currentShippingCost);
    
    setFinalTotal(calculatedSubtotal - calculatedSavings + currentShippingCost);
    
  }, [cartg]); 

  console.log("here are the porops ",props)

  const handleOrder = () => {
    props.openHandler(false);
    router.push("/checkout");
  };

  const guestCheckout = () => {
    props.openHandler(false);
    router.push("/checkout");
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-20"
        onClose={() => {
          props.openHandler(false);
        }}
      >
        <div className="absolute backdrop-blur-md inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-10 lg:bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 lg:inset-y-0 lg:right-0 lg:left-auto w-full max-w-full lg:max-w-md  flex z-50">

            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-200 sm:duration-300"
              enterFrom="translate-y-full lg:translate-x-full"
              enterTo="translate-y-0 lg:translate-x-0 "
              leave="transform transition ease-in-out duration-200 sm:duration-300"
              leaveFrom="translate-y-0 lg:translate-x-0 "
              leaveTo="translate-y-full lg:translate-x-full"
            >
              <div className="relative w-full h-full ">
                <ToastContainer limit={3} />

                <div className="h-full flex flex-col py-6  lg:max-w-[512px]  w-full rounded-t-lg rounded-r-none lg:rounded-t-none lg:rounded-r-lg bg-white shadow-lg overflow-y-hidden">
                  <div className="px-4 sm:px
                  -6 flex items-center justify-between">
                    <div
                      className="lg:block"
                      onClick={() => {
                        props.openHandler(false);
                      }}
                    >
                      <XIcon
                        className="h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                        alignItems: "center",
                        fontWeight: "bold",
                        paddingBottom: 20,
                        fontSize: 18,
                      }}
                    >
                      <div>السلة</div>
                      <div
                        style={{
                          marginRight: 10,
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Bar */}
                  {/* <div className="bg-green-50 text-green-700 text-sm py-2 px-4 text-center mb-4 mx-4 rounded-md" dir="rtl">
                    يمكنك الحصول على شحن مجاني إذا أضفت منتجات بقيمة 1,499 د.ج
                  </div> */}

                  <div
                    style={{
                      margin: "0px 20px",
                      borderTop: "2px solid " + Theme.primary,
                    }}
                    className="mt-6 relative flex-1"
                  >
                    <div
                      id="scrol"
                      style={{
                        height: "50vh",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        padding: 0,
                      }}
                    >
                      {cartg && cartg.length != 0 ? (
                        cartg.map((cart, index) => (
                          <Cartel
                            order={false}
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
                        ))
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            color: "grey",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            flexDirection: "column",
                          }}
                          
                        >
                          <div>
                            {/* <Image src={"/void.svg"} width={200} height={200} alt="Empty cart" /> */}


                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-36">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

                          </div>
                          <div style={{ fontWeight: "bold", marginTop: 20 }}>
                            سلة فارغة
                          </div>
                          <div>تصفح المنتجات و أضفها للمتابعة</div>
                        </div>
                      )}
                    </div>

                    {cartg.length > 0 && (
                      <div className="px-4 pt-4 border-t border-gray-200">
                        {/* الإجمالي الاساسي (Base Total) */}
                        <div className="flex justify-between items-center text-gray-700 mb-2" dir="rtl">
                          <span className="text-sm">الإجمالي الاساسي</span>
                          <span className="text-base font-bold">{subtotal.toFixed(2)} {CURRENCY}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2" dir="rtl">
                          <span className="text-sm text-gray-700">تم توفير</span>
                          <span className="text-base font-bold text-green-600">{savings.toFixed(2)} {CURRENCY}</span>
                        </div>
                   
                        <div className="flex justify-between items-center mb-4" dir="rtl">
                          <span className="text-sm text-gray-700">مصاريف الشحن و التوصيل</span>
                          <span className="text-base font-bold text-gray-700">{shippingCost.toFixed(2)} {CURRENCY}</span>
                        </div>

                        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-6" dir="rtl">
                          <span>الإجمالي</span>
                          <span>{finalTotal.toFixed(2)} {CURRENCY}</span>
                        </div>

   
                        <div className="mt-6">
  {isLogged ? (
    <div className="flex justify-center">
      <LoadingBtn
        act={handleOrder}
        text={"اتمام الشراء"}
        lod={lod}
        className="w-full"
      />
    </div>
  ) : (
    <div className="flex items-center justify-between gap-2">
      <LoadingBtn
        icon={<FaLock className="" />}
        act={() => {
          router.push("/login");
          props.openHandler(false);
        }}
        text={"سجل الدخول للمتابعة"}
        color={Theme.secondaryDark}
        lod={lod}
        className="w-2/5 py-2 text-base rounded-md"
      />
      <button
        onClick={guestCheckout}
        style={{ backgroundColor: Theme.primary }}
        className="w-3/5 bg-moon-200 text-white py-3 px-4 rounded-md text-sm font-meduim"
        dir="rtl"
      >
        متابعة كزائر
      </button>
    </div>
  )}
</div>

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
  );
})

export default Cart;