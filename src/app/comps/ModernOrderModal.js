'use client'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTruck, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBox, FaTimes, FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'
import { API_URL, CURRENCY, IMG_URL } from '../local'
import { useSelector } from 'react-redux'
import { useI18n } from '../lib/i18n'

export default function ModernOrderModal({ open, onClose, orderData, isAdmin, onDeliver, getOrders }) {
  const { t } = useI18n()
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(false)
  const udata = useSelector((state) => state.root.auth.data && state.root.auth.data)

  useEffect(() => {
    if (open && orderData) {
      getOrderItems()
    }
  }, [open, orderData])

  const getOrderItems = async () => {
    if (!orderData) return
    setLoading(true)
    
    try {
      const response = await fetch(`${API_URL}orders?func=getOrderItems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + udata.data.jwt
        },
        body: JSON.stringify({ id: orderData.id })
      })
      const data = await response.json()
      setOrderItems(data || [])
    } catch (error) {
      console.error('Error fetching order items:', error)
    }
    setLoading(false)
  }

  const handleDeliver = async () => {
    setLoading(true)
    try {
      await fetch(`${API_URL}orders?func=deliverOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + udata.data.jwt
        },
        body: JSON.stringify({ id: orderData.id })
      })
      getOrders()
      onClose()
    } catch (error) {
      console.error('Error delivering order:', error)
    }
    setLoading(false)
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'processed':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'initiated':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return t('statusDelivered')
      case 'processed':
        return t('statusNotDelivered')
      case 'initiated':
        return t('statusUnconfirmed')
      default:
        return status
    }
  }

  if (!orderData) return null

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" dir="rtl">
              {/* Header */}
              <div className="bg-gradient-to-r from-moon-200 to-moon-300 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaTruck className="text-3xl" />
                    <div>
                      <h2 className="text-2xl font-bold">{orderData.name}</h2>
                      <p className="text-sm opacity-90 flex items-center gap-2 mt-1">
                        <FaClock className="text-sm" />
                        {formatDate(orderData.date)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mt-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(orderData.status)}`}>
                    <FaCheckCircle />
                    {getStatusText(orderData.status)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                {/* Order Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FaPhone className="text-moon-200" />
                      معلومات الاتصال
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <span className="text-gray-600">الهاتف:</span>
                        <span className="font-semibold">{orderData.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-gray-600">البريد:</span>
                        <span className="font-semibold text-xs">{orderData.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-moon-200" />
                      عنوان التوصيل
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">المدينة:</span>
                        <span className="font-semibold mr-2">{orderData.city}</span>
                      </p>
                      <p className="text-gray-700">{orderData.line1}</p>
                      {orderData.line2 && <p className="text-gray-700">{orderData.line2}</p>}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <FaBox className="text-moon-200" />
                      المنتجات ({orderItems.length})
                    </h3>
                  </div>

                  <div className="p-4">
                    {loading ? (
                      <div className="flex justify-center py-8">
                        <div className="lds-facebook"><div></div><div></div><div></div></div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {orderItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
                              {item.img ? (
                                <Image
                                  src={item.img.startsWith('http') ? item.img : `${IMG_URL}${item.img}`}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <FaBox className="text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{item.name}</h4>
                              <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                <span className="bg-white px-2 py-1 rounded border border-gray-300">
                                  الكود: {item.code}
                                </span>
                                {item.size && (
                                  <span className="bg-white px-2 py-1 rounded border border-gray-300">
                                    المقاس: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-300">
                                    اللون:
                                    <div
                                      className="w-4 h-4 rounded-full border border-gray-300"
                                      style={{ backgroundColor: item.color }}
                                    />
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price & Quantity */}
                            <div className="text-left">
                              <p className="text-lg font-bold text-moon-200">
                                {item.price} {CURRENCY}
                              </p>
                              <p className="text-sm text-gray-600">الكمية: {item.qty}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 p-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">الإجمالي:</span>
                      <span className="text-2xl font-bold text-moon-200">
                        {orderData.total} {CURRENCY}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              {isAdmin && orderData.status !== 'delivered' && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={handleDeliver}
                    disabled={loading}
                    className="w-full bg-moon-200 hover:bg-moon-300 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTruck />
                    {loading ? 'جاري التحديث...' : 'تأكيد التوصيل'}
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
