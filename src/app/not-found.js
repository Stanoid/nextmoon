'use client'; 

import React from 'react';
import Image from 'next/image';

const NOT_FOUND_IMAGE_URL = '/404.svg'; 

function NotFound() {
  return (
    <div
      dir="rtl"
      className=" text-gray-300 flex flex-col items-center w-full justify-center min-h-screen p-4"
    >
      <div className="text-center max-w-7xl mx-auto">
        <div className="my-8">
          <Image
            src={NOT_FOUND_IMAGE_URL}
            alt="404 Error - Page Not Found"
            width={500} 
            height={300} 
            priority
            className="w-full max-w-sm md:max-w-md  h-auto mx-auto"
          />
        </div>



        <h1 className="text-4xl sm:text-2xl mb-6 md:text-6xl font-bold text-gray-900 ">
          ووبس! هذه الصفحة غير موجودة.
        </h1>

        <p className="text-sm sm:text-xl text-gray-400 mb-8">
          يبدو أنك ضللت الطريق. لكن لا تقلق! لدينا بعض الاقتراحات لمساعدتك:
        </p>

        <div className="flex  sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <a
            href="/"
            className="px-6 py-3 text-gray-500 text-sm transition duration-300 w-full sm:w-auto"
          >
            الرئيسية
          </a>
          <a
            href="/contact"
            className="px-6 py-3 text-gray-500 text-sm transition duration-300 w-full sm:w-auto"
          >
            اتصل بنا  
          </a>
          <a
            href="/shop"
            className="px-6 py-3 text-gray-500 text-sm transition duration-300 w-full sm:w-auto"
          >
            المتجر
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;