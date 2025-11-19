'use client'

import React from 'react';
import { Theme } from '../local';
import { useRouter } from 'next/navigation';

export default function ProductError({ message = "فشل في تحميل المنتج" }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mb-4">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          المنتج غير متوفر
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors"
            style={{ backgroundColor: Theme.primary }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            إعادة المحاولة
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 px-4 bg-gray-200 rounded-lg text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    </div>
  );
}
