'use client';

import React from 'react';
import {useEffect,useState,useContext } from 'react';
import { API_URL, Theme, CURRENCY, IMG_URL} from '../local';
import { useRouter } from 'next/navigation'
import { CartCon } from '../contexts/cartContext';
import InputEl from '../comps/inputel';
import LoadingBtn from '../comps/loadingbtn';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { FaCreditCard, FaHandHoldingDollar, FaMapLocation, FaMapPin } from 'react-icons/fa6';

function CheckoutPage() {
  const [lod,setLod] =useState(false)
  const [refr,setRefr] = useState(true);
  const router = useRouter();

  const cartg = useSelector((state) => state.root.cart.data) || []
  const [address,setAddress] = useState("");
  const [phone,setPhone] = useState("");
  const [phoneC,setPhoneC] = useState("");
  const [email,setEmail] = useState(null);
  const [pickups,setpickups] = useState(null);
  const [selpick,setselpick] = useState(null);
  const [deliveryPrice,setDeleveryPrice] = useState(0);
  const [paymentMeth,setPaymentMeth] = useState(2);
  const [deliveryMeth,setsetDeliveryMeth] = useState(1);
  const [total,setTotal] = useState(0)
  const [gtotal,setgTotal] = useState(0)
  const isLogged = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const {useNotifi} = useContext(CartCon);

  useEffect(() => {
    if(isLogged){
      setEmail(isLogged.data.user.username);
    }
    getPicks();

    let total = 0;
    for (let i = 0; i < cartg.length; i++) {
      for (let j = 0; j < cartg[i].data.attributes.varients.data.length; j++) {
        if(cartg[i].data.attributes.varients.data[j].id==cartg[i].selvar){
          total = total +  cartg[i].data.attributes.varients.data[j].attributes.price * cartg[i].qty;
        }
      }
    }
    setTotal(total)
    setgTotal(total+deliveryPrice)
  }, [cartg,deliveryPrice,refr,isLogged])

  const handleDelChangle = (stat)=>{
    setsetDeliveryMeth(stat);
    handleCityChange(selpick,stat);
  }

  const handleCityChange= (val,stat)=>{
    setselpick(val)
    let price =0;
    if(pickups) {
      for (let i = 0; i < pickups.length; i++) {
        if(pickups[i].id==val){
          if(stat){
            if(stat==1){
              price = pickups[i].home_price;
            }else if(stat==2){
              price = pickups[i].pickup_price;
            }
          }else{
            if(deliveryMeth==1){
              price = pickups[i].home_price;
            }else if(deliveryMeth==2){
              price = pickups[i].pickup_price;
            }
          }
          setDeleveryPrice(price);
          setRefr(!refr);
        }
      }
    }
  }

  const getPicks=()=>{
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}products?func=getPick`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setpickups(data);
      })
  }

  const isPhoneValid = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  const handleOrder= ()=>{
    if(selpick==null){
      useNotifi("error","الرجاء إختيار الولاية")
      return;
    }

    if (!phone || !isPhoneValid(phone)) {
      useNotifi("error", "يجب أن يتكون رقم الهاتف من 10 أرقام");
      return;
    }

    if (phone !== phoneC) {
      useNotifi("error", "رقم الهاتف غير متطابق");
      return;
    }
    
    if (address.length < 3  && deliveryMeth===1) {
      useNotifi("error", "الرجاء إدخال عنوان صالح");
      return;
    }

    if(cartg.length==0){
      useNotifi("error","الرجاء إضافة منتجات")
      return
    }

    setLod(true)
    let payarray = []
    for (let i = 0; i < cartg.length; i++) {
      payarray.push({
        id: cartg[i].selvar,
        product_ref:cartg[i].product_ref,
        name:cartg[i].name,
        img:cartg[i].images?.[0].data.url,
        code:cartg[i].code,
        qty: cartg[i].qty,
        desc: cartg[i].data.attributes.description_en
      })
    }

    if(isLogged){
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' +  isLogged.data.jwt
        },
        body: JSON.stringify({
          items: payarray,
          payment_metod: paymentMeth,
          delivery_method:deliveryMeth,
          state_id:selpick,
          phone:phone,
          address:address,
          email:email,
        })
      };

      fetch(`${API_URL}orders?func=initPaymentSession`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLod(false)
          window.location= data.url;
        });
    }else{
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: payarray,
          payment_metod: paymentMeth,
          delivery_method:deliveryMeth,
          state_id:selpick,
          phone:phone,
          address:address,
          email:email,
        })
      };

      fetch(`${API_URL}orders?func=initPaymentSessionGuest`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLod(false)
          window.location= data.url;
        });
    }
  }

  return (
    <div dir='rtl' className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-6 lg:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='mb-6 lg:mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-3 rounded-2xl text-white shadow-lg' style={{backgroundColor: Theme.primary}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>إتمام الطلب</h1>
              <p className='text-sm text-gray-500 mt-1'>أكمل بياناتك لإتمام عملية الشراء</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          
          {/* Order Summary - Right Side */}
          <div className='lg:col-span-1 order-1 lg:order-2'>
            <div className='space-y-4'>
              
              {/* Cart Items */}
              <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                <div className='p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100'>
                  <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{color: Theme.primary}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    المنتجات ({cartg.length})
                  </h2>
                </div>
                <div className='p-4'></div>
                
                <div className='space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide'>
                  {cartg && cartg.length > 0 ? (
                    cartg.map((cart, index) => {
                      const selectedVariant = cart.data.attributes.varients.data.find(v => v.id === cart.selvar);
                      const productPrice = selectedVariant?.attributes.price || 0;
                      const productName = cart.name || `Product ${cart.code}`;
                      const productImage = cart.data.attributes.images?.data?.[0]?.attributes?.url;
                      const fullProductImage = `${IMG_URL}${productImage}`;
                      const productSize = selectedVariant?.attributes.sizes.data[0]?.attributes.name_ar + " - " + selectedVariant?.attributes.sizes.data[0]?.attributes.icon || "";
                      const productColorName = selectedVariant?.attributes.colors.data[0]?.attributes.name_ar || "";
                      const productColorHex = selectedVariant?.attributes.colors.data[0]?.attributes.colorCode || "#000000";

                      return (
                        <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'>
                          <div className='relative flex-shrink-0'>
                            <Image
                              src={fullProductImage}
                              alt={productName}
                              width={80}
                              height={80}
                              className='rounded-xl object-cover shadow-md'
                            />
                            <div className='absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg' style={{backgroundColor: Theme.primary}}>
                              {cart.qty}
                            </div>
                          </div>
                          
                          <div className='flex-1 min-w-0 w-full'>
                            <h3 className='font-bold text-base text-gray-900 mb-2'>{productName}</h3>
                            <div className='flex flex-wrap items-center gap-3 mb-2'>
                              <div className='flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <span className='font-medium'>{productSize}</span>
                              </div>
                              <div className='flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg'>
                                <span className='w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm' style={{backgroundColor: productColorHex}}></span>
                                <span className='font-medium'>{productColorName}</span>
                              </div>
                            </div>
                            <div className='flex items-center justify-between'>
                              <div className='text-xs text-gray-500'>
                                السعر للقطعة: {productPrice.toLocaleString()} {CURRENCY}
                              </div>
                              <div className='font-bold text-lg' style={{color: Theme.primary}}>
                                {(productPrice * cart.qty).toLocaleString()} {CURRENCY}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='text-center py-12'>
                      <div className='w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center' style={{backgroundColor: `${Theme.primary}20`}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10" style={{color: Theme.primary}}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                      </div>
                      <p className='text-lg font-semibold text-gray-900 mb-1'>السلة فارغة</p>
                      <p className='text-sm text-gray-500'>أضف منتجات لإتمام الطلب</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Total */}
              <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-5'>
                <h2 className='text-lg font-bold text-gray-900 mb-4'>ملخص الطلب</h2>
                
                <div className='space-y-3'>
                  <div className='flex justify-between items-center text-gray-700'>
                    <span className='font-semibold'>{total.toLocaleString()} {CURRENCY}</span>
                    <span>المجموع الفرعي</span>
                  </div>
                  
                  <div className='flex justify-between items-center text-green-600'>
                    <span className='font-semibold'>- 0 {CURRENCY}</span>
                    <span>الخصم</span>
                  </div>
                  
                  <div className='flex justify-between items-center text-gray-700'>
                    <span className='font-semibold'>{deliveryPrice.toLocaleString()} {CURRENCY}</span>
                    <span>التوصيل</span>
                  </div>
                  
                  <div className='pt-3 border-t-2 border-gray-200'>
                    <div className='flex justify-between items-center'>
                      <span className='text-2xl font-bold' style={{color: Theme.primary}}>
                        {gtotal.toLocaleString()} {CURRENCY}
                      </span>
                      <span className='text-lg font-bold text-gray-900'>الإجمالي</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form - Left Side */}
          <div className='lg:col-span-2 order-2 lg:order-1 space-y-4'>
            
            {/* Payment Method */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold' style={{backgroundColor: Theme.primary}}>1</span>
                طريقة الدفع
              </h2>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button
                  disabled
                  className='relative p-5 rounded-xl border-2 border-gray-300 bg-gray-100 opacity-40 cursor-not-allowed'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='p-3 rounded-xl bg-gray-200'>
                      <FaCreditCard className='w-6 h-6 text-gray-400'/>
                    </div>
                  </div>
                  <h3 className='font-bold text-gray-500 text-right mb-1'>دفع إلكتروني</h3>
                  <p className='text-xs text-gray-400 text-right'>الدفع بإستخدام بطاقة بنكية</p>
                  <div className='absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold'>
                    قريباً
                  </div>
                </button>

                <button
                  onClick={()=>{setPaymentMeth(2)}}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                    paymentMeth==2 ? 'shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={paymentMeth==2 ? {borderColor: Theme.primary, backgroundColor: `${Theme.primary}10`} : {}}
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='p-3 rounded-xl text-white' style={{backgroundColor: Theme.primary}}>
                      <FaHandHoldingDollar className='w-6 h-6'/>
                    </div>
                    {paymentMeth==2 && (
                      <div className='w-6 h-6 rounded-full flex items-center justify-center' style={{backgroundColor: Theme.primary}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className='font-bold text-gray-900 text-right mb-1'>دفع عند الإستلام</h3>
                  <p className='text-xs text-gray-600 text-right'>الدفع نقداً عند استلام الطلب</p>
                </button>
              </div>
            </div>

            {/* Delivery Method */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold' style={{backgroundColor: Theme.primary}}>2</span>
                طريقة التوصيل
              </h2>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button
                  onClick={()=>{handleDelChangle(1);}}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                    deliveryMeth==1 ? 'shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={deliveryMeth==1 ? {borderColor: Theme.primary, backgroundColor: `${Theme.primary}10`} : {}}
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='p-3 rounded-xl text-white' style={{backgroundColor: Theme.primary}}>
                      <FaMapPin className='w-6 h-6'/>
                    </div>
                    {deliveryMeth==1 && (
                      <div className='w-6 h-6 rounded-full flex items-center justify-center' style={{backgroundColor: Theme.primary}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className='font-bold text-gray-900 text-right mb-1'>توصيل لعنوان</h3>
                  <p className='text-xs text-gray-600 text-right'>التوصيل إلى عنوان معين</p>
                </button>

                <button
                  onClick={()=>{handleDelChangle(2);}}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                    deliveryMeth==2 ? 'shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={deliveryMeth==2 ? {borderColor: Theme.primary, backgroundColor: `${Theme.primary}10`} : {}}
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='p-3 rounded-xl text-white' style={{backgroundColor: Theme.primary}}>
                      <FaMapLocation className='w-6 h-6'/>
                    </div>
                    {deliveryMeth==2 && (
                      <div className='w-6 h-6 rounded-full flex items-center justify-center' style={{backgroundColor: Theme.primary}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className='font-bold text-gray-900 text-right mb-1'>نقطة توزيع</h3>
                  <p className='text-xs text-gray-600 text-right'>الإستلام من نقطة التوزيع</p>
                </button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <span className='w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold' style={{backgroundColor: Theme.primary}}>3</span>
                معلومات التوصيل
              </h2>
              
              <div className='space-y-4'>
                <InputEl
                  value={selpick}
                  outputfunc={(val) => {handleCityChange(val);}}
                  iden={"color"}
                  data={pickups}
                  iscats={true}
                  select={true}
                  label={"الولاية"}
                />

                <InputEl 
                  value={isLogged ? isLogged.data.user.username : email} 
                  disabled={isLogged}
                  outputfunc={(val) => { setEmail(val) }} 
                  label={"الإسم الكامل"} 
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <InputEl 
                    outputfunc={(val) => { setPhone(val) }} 
                    label={"رقم الهاتف"} 
                  />

                  <InputEl 
                    outputfunc={(val) => { setPhoneC(val) }} 
                    label={"تأكيد رقم الهاتف"} 
                  />
                </div>

                {deliveryMeth == 1 && (
                  <InputEl 
                    outputfunc={(val) => { setAddress(val) }} 
                    label={"العنوان الكامل"} 
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6'>
              <LoadingBtn  
                act={()=>{handleOrder()}}  
                text={"تأكيد الطلب"} 
                lod={lod} 
              />
              <p className='text-xs text-gray-500 text-center mt-3'>
                بالنقر على "تأكيد الطلب"، أنت توافق على شروط وأحكام الخدمة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
