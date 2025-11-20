'use client'

import React, { useEffect, useState, useRef } from 'react';
import { API_URL, Theme, CURRENCY } from '../local';
import ItemsPopup from "../comps/userItemsPopup"
import { useSelector } from 'react-redux';

function Orders(props) {
    const childCompRef = useRef();
    const [openDel, setOpenDel] = useState(false);
    const [orderData, setOrderdata] = useState([]);
    const [ordata, setOrdata] = useState(null)
    const [lod, setlod] = useState(true)
    const hasLoadedRef = useRef(false)
    const udata = useSelector((state) => state.root.auth.data && state.root.auth.data)

    useEffect(() => {
      console.log('useEffect triggered, hasLoadedRef:', hasLoadedRef.current, 'udata:', !!udata?.data?.jwt)
      
      if (!hasLoadedRef.current && udata?.data?.jwt) {
        hasLoadedRef.current = true
        console.log('Calling getOrders...')
        getOrders();
      } else if (!udata?.data?.jwt) {
        console.log('No JWT, setting lod to false')
        setlod(false)
      }
    }, [udata])

    const handleOpenDel = (open) => {
      setOpenDel(open)
    }

    const getOrders = async () => {
      console.log('getOrders called')
      
      if (!udata?.data?.jwt) {
        console.log('No JWT in getOrders')
        setlod(false)
        return
      }

      try {
        if (props.setLod) props.setLod(true)
        setOpenDel(false)
        setlod(true)

        const requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + udata.data.jwt
          },
        };

        console.log('Fetching orders...')
        const response = await fetch(`${API_URL}orders?func=getUserOrders`, requestOptions)
        const data = await response.json()

        console.log('=== ORDERS API RESPONSE ===')
        console.log('Full response:', data)
        console.log('Is Array?', Array.isArray(data))
        console.log('Type:', typeof data)
        
        // Handle different response formats
        let ordersToSet = []

        if (Array.isArray(data)) {
          console.log('✓ Data is array, length:', data.length)
          ordersToSet = data.length > 0 ? [...data].reverse() : []
        } else if (data && data.orders && Array.isArray(data.orders)) {
          console.log('✓ Data.orders is array, length:', data.orders.length)
          ordersToSet = data.orders.length > 0 ? [...data.orders].reverse() : []
        } else if (data && data.data && Array.isArray(data.data)) {
          console.log('✓ Data.data is array, length:', data.data.length)
          ordersToSet = data.data.length > 0 ? [...data.data].reverse() : []
        } else {
          console.log('✗ No valid array found')
          ordersToSet = []
        }

        console.log('Setting orderData with', ordersToSet.length, 'orders')
        console.log('Setting lod to FALSE')
        
        setOrderdata(ordersToSet)
        setlod(false)
        
        if (props.setLod) props.setLod(false)
        
        console.log('State updated')
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrderdata([])
        setlod(false)
        if (props.setLod) props.setLod(false)
      }
    }

    const DeliverOrder = (order) => {
      setOrdata(order);
      setOpenDel(true);
    }

    const getOrderStatus = (order) => {
      if (order.order && order.order.status === 'delivered') return 'delivered'
      if (order.order && order.order.status === 'initiated') return 'initiated'
      return 'initiated'
    }

    const getTrackingSteps = (status) => {
      const steps = [
        { label: 'تم الطلب', icon: '📦' },
        { label: 'قيد التحضير', icon: '⚙️' },
        { label: 'جاري التوصيل', icon: '🚚' },
        { label: 'تم التسليم', icon: '✅' }
      ]

      let activeSteps = 1
      if (status === 'delivered') activeSteps = 4
      else if (status === 'initiated') activeSteps = 2

      return steps.map((step, idx) => ({
        ...step,
        isActive: idx < activeSteps,
        isCurrent: idx === activeSteps - 1
      }))
    }

    console.log('RENDER - lod:', lod, 'orderData length:', orderData?.length)

    return (
      <div dir='rtl' className="w-full">
        {ordata && <ItemsPopup ref={childCompRef} data={ordata} getOrders={() => { getOrders() }} openHandler={handleOpenDel} open={openDel} />}

        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div className='flex items-center gap-4'>
            <div className='p-4 rounded-2xl text-white shadow-lg' style={{ backgroundColor: Theme.primary }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-gray-900'>طلباتي</h2>
              <p className='text-sm text-gray-500 mt-1'>تتبع وإدارة جميع طلباتك</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            {orderData && orderData.length > 0 && (
              <div className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg'>
                <span className='text-sm text-gray-600'>إجمالي الطلبات:</span>
                <span className='text-lg font-bold' style={{ color: Theme.primary }}>{orderData.length}</span>
              </div>
            )}
            {!lod && (
              <button
                onClick={() => {
                  hasLoadedRef.current = false
                  getOrders()
                }}
                className='p-3 rounded-xl hover:bg-gray-100 transition-all'
                title='تحديث الطلبات'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Debug Info */}
        <div className='mb-4 p-4 bg-yellow-50 rounded-lg text-sm border border-yellow-200'>
          <p><strong>Debug:</strong> lod={lod.toString()}, orders={orderData.length}</p>
        </div>

        {/* Orders List */}
        {lod ? (
          <div className='flex flex-col items-center justify-center min-h-[400px]'>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            <p className='text-gray-500 mt-4'>جاري تحميل الطلبات...</p>
          </div>
        ) : orderData.length > 0 ? (
          <div className='space-y-6'>
            {orderData.map((order, index) => {
              const status = getOrderStatus(order)
              const trackingSteps = getTrackingSteps(status)

              return (
                <div key={order.id || index} className='bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-2xl transition-all duration-300'>
                  {/* Order Header */}
                  <div className='p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg' style={{ backgroundColor: Theme.primary }}>
                          #{order.order?.id || order.id || index + 1}
                        </div>
                        <div>
                          <div className='text-lg font-bold text-gray-900'>طلب رقم {order.order?.id || order.id || index + 1}</div>
                          <div className='text-sm text-gray-500 mt-0.5 flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            {order.order?.created_at ? new Date(order.order.created_at).toLocaleDateString('ar-DZ') : (order.date || new Date().toLocaleDateString('ar-DZ'))}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='text-left sm:text-right'>
                          <div className='text-xs text-gray-500'>المبلغ الإجمالي</div>
                          <div className='text-2xl font-bold mt-1' style={{ color: Theme.primary }}>
                            {order.order?.total || order.total || '0'} {CURRENCY}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className='p-5 sm:p-6'>
                    {/* Order Info Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                      <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                        <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: `${Theme.primary}20` }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500 font-medium'>طريقة الدفع</div>
                          <div className='font-bold text-gray-900 mt-0.5'>
                            {order.order?.payment_method === 1 ? 'إلكتروني' : order.order?.payment_method === 2 ? 'عند الاستلام' : (order.payment_type || 'نقدي')}
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                        <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: `${Theme.primary}20` }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                          </svg>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500 font-medium'>نوع التوصيل</div>
                          <div className='font-bold text-gray-900 mt-0.5'>
                            {order.order?.delivery_method === 1 ? 'توصيل للمنزل' : order.order?.delivery_method === 2 ? 'استلام من المركز' : (order.delivery_type || 'توصيل منزلي')}
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                        <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: `${Theme.primary}20` }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: Theme.primary }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                          </svg>
                        </div>
                        <div>
                          <div className='text-xs text-gray-500 font-medium'>حالة الدفع</div>
                          <div className='font-bold mt-0.5' style={{
                            color: order.order?.payment_status === 'paid' || order.order?.payment_status === 1 ? '#10b981' : '#f59e0b'
                          }}>
                            {order.order?.payment_status === 'paid' || order.order?.payment_status === 1 ? 'مدفوع' : order.order?.payment_status === 'unpaid' || order.order?.payment_status === 0 ? 'غير مدفوع' : (order.payment_status || 'قيد المراجعة')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Tracking */}
                    <div className='bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100'>
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-sm font-bold text-gray-900'>تتبع الطلب</h3>
                        <span className='text-xs px-3 py-1 rounded-full font-semibold' style={{
                          backgroundColor: status === 'delivered' ? '#10b981' : `${Theme.primary}`,
                          color: 'white'
                        }}>
                          {status === 'delivered' ? 'تم التسليم' : 'قيد المعالجة'}
                        </span>
                      </div>

                      <div className='relative'>
                        {/* Progress Line */}
                        <div className='absolute top-6 right-0 left-0 h-1 bg-gray-200 rounded-full' style={{ zIndex: 0 }}></div>
                        <div className='absolute top-6 right-0 h-1 rounded-full transition-all duration-1000'
                          style={{
                            backgroundColor: Theme.primary,
                            width: `${((trackingSteps.filter(s => s.isActive).length - 1) / 3) * 100}%`,
                            zIndex: 1
                          }}></div>

                        {/* Steps */}
                        <div className='relative flex items-start justify-between' style={{ zIndex: 2 }}>
                          {trackingSteps.map((step, idx) => (
                            <div key={idx} className='flex flex-col items-center flex-1'>
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step.isActive ? 'shadow-lg scale-110' : 'bg-gray-200'
                                }`} style={step.isActive ? { backgroundColor: Theme.primary, color: 'white' } : {}}>
                                {step.isActive ? step.icon : idx + 1}
                              </div>
                              <div className={`text-xs mt-3 text-center font-medium px-2 ${step.isActive ? 'font-bold' : 'text-gray-400'
                                }`} style={step.isActive ? { color: Theme.primary } : {}}>
                                {step.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Items Count & Action Button */}
                    <div className='flex items-center justify-between mt-6 pt-5 border-t border-gray-100'>
                      <div className='flex items-center gap-2 text-gray-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span className='text-sm font-medium'>
                          {order.items?.length || order.order?.items?.length || 0} منتج
                        </span>
                      </div>
                      <button
                        onClick={() => DeliverOrder(order)}
                        className='flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95'
                        style={{ backgroundColor: Theme.primary }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200'>
            <div className='w-24 h-24 rounded-full flex items-center justify-center mb-6' style={{ backgroundColor: `${Theme.primary}20` }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12" style={{ color: Theme.primary }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>لا توجد طلبات حتى الآن</h3>
            <p className='text-gray-500 mb-6'>ابدأ التسوق الآن واستمتع بتجربة رائعة</p>
            <button
              onClick={() => window.location.href = '/products'}
              className='px-8 py-3 rounded-xl text-white font-bold hover:shadow-xl transition-all transform hover:scale-105'
              style={{ backgroundColor: Theme.primary }}
            >
              تصفح المنتجات
            </button>
          </div>
        )}
      </div>
    )
}

export default Orders
