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
import { useI18n } from '../lib/i18n';
import { FaArrowAltCircleRight } from 'react-icons/fa'

const Cart = forwardRef((props, ref) => {
  const [open, setOpen] = useState(true)
  const [lod, setLod] = useState(0);
  const { cartData, addToCart, removeFromCart, CartTotal } = useContext(CartCon);
  const router = useRouter();
  const { t, direction } = useI18n();


  const [subtotal, setSubtotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const cartg = useSelector((state) => state.root.cart.data);
  console.log("cartg",cartg);
  const isLogged = useSelector((state) => state.root.auth.data);
  useEffect(() => {
    let calculatedSubtotal = 0;
    let calculatedSavings = 0;

    cartg.forEach(item => {
      const selectedVariant = item.data?.attributes?.varients?.data?.find(v => v.id === item.selvar);
      if (selectedVariant && selectedVariant.attributes?.price) {
        const price = selectedVariant.attributes.price;
        const discountPercent = selectedVariant.attributes.old_price || 0;

        calculatedSubtotal += price * item.qty;
        calculatedSavings += (price * discountPercent / 100) * item.qty;
      }
    });

    setSubtotal(calculatedSubtotal);
    setSavings(calculatedSavings);
    setFinalTotal(calculatedSubtotal);

    const freeShippingThreshold = 1499;
    let currentShippingCost = 120;
    if (calculatedSubtotal >= freeShippingThreshold) {
      currentShippingCost = 0;
    }
    setShippingCost(currentShippingCost);

  }, [cartg]);



  const handleOrder = () => {
    props.openHandler(false);
    router.push("/checkout");
  };

  const guestCheckout = () => {
    props.openHandler(false);
    router.push("/checkout");
  };


  // console.log("Full cart from Redux:", cartg);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-[100]"
        onClose={() => {
          props.openHandler(false);
        }}
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
                      onClick={() => {
                        props.openHandler(false);
                      }}
                      aria-label="Close"
                    >
                      <XIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{t('cart')}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
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
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 mb-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <div className="font-bold text-lg mb-2">{t('emptyCart')}</div>
                        <div className="text-sm">{t('browseProducts')}</div>
                      </div>
                    )}
                  </div>

                  {/* Footer with totals and checkout */}
                  {cartg.length > 0 && (
                    <div className="px-4 sm:px-6 py-4 border-t-2 bg-gray-50" style={{ borderColor: Theme.primary }}>
                        {/* الإجمالي الاساسي (Base Total) */}
                        <div className={`flex justify-between items-center text-gray-700 mb-2`} dir={direction}>
                          <span className="text-sm">{t('baseTotal')}</span>
                          <span className="text-base font-bold">{subtotal.toFixed(2)} {CURRENCY}</span>
                        </div>
                        <div className={`flex justify-between items-center mb-2`} dir={direction}>
                        <span className="text-sm text-gray-700">{t('saved')}</span>
                        <span className="text-base font-bold text-green-600">
                          {savings.toFixed(2)} {CURRENCY}
                        </span>
                      </div>

                        <div className={`flex justify-between items-center mb-2`} dir={direction}>
                          <span className="text-sm text-gray-700">{t('shipping')}</span>
                          <span className="text-base font-bold">{shippingCost.toFixed(2)} {CURRENCY}</span>
                        </div>

                        <div className={`flex justify-between items-center text-lg font-bold text-gray-900 mb-6`} dir={direction}>
                          <span>{t('total')}</span>
                          <span>{finalTotal.toFixed(2)} {CURRENCY}</span>
                        </div>


                      <div className="mt-4">
                        {isLogged ? (
                          <LoadingBtn
                            act={handleOrder}
                            text={t('proceedToCheckout')}
                            lod={lod}
                            className="w-full"
                          />
                        ) : (
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <LoadingBtn
                              act={() => {
                                router.push("/login");
                                props.openHandler(false);
                              }}
                              text={t('login')}
                              color={Theme.secondaryDark}
                              lod={lod}
                              className="w-full sm:w-2/5"
                            />
                            <button
                              onClick={guestCheckout}
                              style={{ backgroundColor: Theme.primary }}
                              className="w-full sm:w-3/5 text-white py-3 px-4 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                              dir={direction}
                            >
                              {t('guestCheckout')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
