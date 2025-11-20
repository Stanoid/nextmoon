'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@nextui-org/react';
import { FaCheckCircle, FaListAlt, FaShoppingBasket, FaBox, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { clearCart } from '../lib/actions/counterAction';
import { useI18n } from '../lib/i18n';

function AccounteEl() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lod, setLod] = useState(false);
  const { t, direction } = useI18n();

  const isLogged = useSelector((state) => state.root.auth.data && state.root.auth.data);

  useEffect(() => {
    dispatch(clearCart([]));
  }, [dispatch]);

  return (
    <>
      {lod ? (
        <div
          className="h-80 flex flex-col items-center justify-center"
          style={{ display: lod ? 'flex' : 'none' }}
        >
          <div className="lds-facebook flex justify-center items-center">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="mt-4 text-lg font-bold text-moon-200">{t('pleaseWait')}</div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh] p-4 sm:p-6" dir={direction}>
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center text-center max-w-2xl w-full border border-gray-100"
          >
            {/* Success Icon with animated circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-50"></div>
              <div className="relative text-green-500 text-[7rem] sm:text-[8rem]">
                <FaCheckCircle />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-bold text-3xl sm:text-4xl mt-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
            >
              {t('paymentSuccessTitle')}
            </motion.h1>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-600 text-lg mt-4 max-w-md leading-relaxed"
            >
              {t('paymentSuccessMessage')}
            </motion.p>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="text-moon-200 text-2xl">
                  <FaBox />
                </div>
                <div className={`text-${direction === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-500">{t('orderConfirmation')}</p>
                  <p className="font-semibold text-gray-800">{t('orderReceived')}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="text-moon-200 text-2xl">
                  <FaTruck />
                </div>
                <div className={`text-${direction === 'rtl' ? 'right' : 'left'}`}>
                  <p className="text-xs text-gray-500">{t('trackYourOrder')}</p>
                  <p className="font-semibold text-gray-800">{t('myAccount')}</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row mt-8 gap-4 w-full sm:w-auto"
            >
              {isLogged && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial">
                  <Button
                    onClick={() => router.push('/user')}
                    variant="shadow"
                    className="w-full sm:w-auto bg-gradient-to-r from-gray-700 to-gray-600 text-white text-base font-semibold rounded-xl shadow-lg px-8 py-6 flex items-center justify-center gap-3 hover:shadow-xl transition-all"
                    endContent={<FaListAlt className="text-lg" />}
                  >
                    {t('viewOrders')}
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial">
                <Button
                  onClick={() => router.push('/')}
                  variant="shadow"
                  className="w-full sm:w-auto bg-gradient-to-r from-moon-200 to-green-400 text-white text-base font-semibold rounded-xl shadow-lg px-8 py-6 flex items-center justify-center gap-3 hover:shadow-xl transition-all"
                  endContent={<FaShoppingBasket className="text-lg" />}
                >
                  {t('continueShopping')}
                </Button>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-moon-100 rounded-full blur-3xl opacity-20 -z-10"></div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default AccounteEl;
