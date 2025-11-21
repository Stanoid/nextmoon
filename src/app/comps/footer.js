'use client';
import React from 'react';
import Logowhite from "../../../public/logoblack.svg";
import { useI18n } from '../lib/i18n';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const { t, direction } = useI18n();
  const router = useRouter();

  return (
    <footer dir={direction} className={`w-full bg-white border-t border-gray-200 lg:max-h-[219px] pt-16 px-8`}>
      <div className="max-w-7xl mx-auto"> 
        <div dir={direction} className={`grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>

          {/* Shipping Section */}
          <div className={`flex flex-col items-start md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'}`}>
            <div className="flex items-center gap-2 mb-4">
              {/* Truck Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 tetx-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>

              <h3 className="text-sm font-semibold text-gray-700">{t('trackOrderShipping')}</h3>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              {t('trackOrderShippingDesc')}
            </p>
          </div>

          <div className={`flex flex-col items-start md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'}`}>
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>

              <h3 className="text-sm font-semibold text-gray-700">{t('allSecurePaymentMethods')}</h3>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              {t('allSecurePaymentMethodsDesc')}
            </p>
          </div>


          <div className={`flex flex-col items-start md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'}`}>
            <div className="flex items-center mb-4">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
              <h3 className={`text-sm font-semibold text-gray-500 ${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>{t('contactUs')}</h3>
            </div>
            <div className="space-y-3">
              <div className={`flex items-center ${direction === 'rtl' ? 'justify-start' : 'justify-start'} gap-1 md:justify-start`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>

                <span className="text-gray-500 ">+1234567890</span>

              </div>
              <div className={`flex items-center ${direction === 'rtl' ? 'justify-center' : 'justify-center'} gap-1 md:justify-start`}>
              
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>

                <span className={`text-gray-500 ${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>Support@minimoon.com</span>
              
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-12"></div>

        <div className={`grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-8 w-full ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>

          <div className={`flex flex-col items-start md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'} order-1 md:order-1`}>
            <h4 className="font-semibold text-gray-500 text-sm mb-4">{t('ordersAndShipping')}</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-gray-800">{t('myAccount')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('trackOrder')}</a></li>
              <li><a href="#" className="hover:text-gray-800">{t('shippingReturnPolicy')}</a></li>
            </ul>
          </div>

          <div className={`flex flex-col items-start md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'} order-2 md:order-2`}>
            <h4 className="font-semibold text-sm text-gray-700 mb-4">{t('aboutCompany')}</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <span 
                  onClick={() => router.push('/jobs')} 
                  className="hover:text-gray-800 cursor-pointer"
                >
                  {t('jobs')}
                </span>
              </li>
              <li>
                <span 
                  onClick={() => router.push('/about')} 
                  className="hover:text-gray-800 cursor-pointer"
                >
                  {t('aboutUs')}
                </span>
              </li>
              <li><a href="#" className="hover:text-gray-800 cursor-pointer">{t('ourStores')}</a></li>
            </ul>
          </div>

          <div className={`flex flex-col lg:col-span-1 col-span-2 items-center md:items-start ${direction === 'rtl' ? 'text-right md:text-right' : 'text-left md:text-left'} order-3 md:order-3`}>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              {t('getLatestOffers')}
            </h3>
            <div className={`w-full max-w-md flex flex-col gap-2 items-center ${direction === 'rtl' ? 'md:items-end' : 'md:items-start'}`}>
              <input
                type="email"
                placeholder={t('enterEmail')}
                dir={direction}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${direction === 'rtl' ? 'text-right' : 'text-left'} focus:outline-none focus:ring-2 focus:ring-red-400`}
              />
              <button className="w-full px-5 py-2.5 bg-moon-200 text-white text-sm rounded-lg border transition-colors">
                {t('subscribeNow')}
              </button>
            </div>
          </div>
        </div>

        <div className={`flex justify-center mt-8`}> 
          <div className={`flex ${direction === 'rtl' ? 'space-x-4 space-x-reverse' : 'space-x-4'}`}> 
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.256 5.676c-.66.293-1.37.49-2.108.577.76-.456 1.34-1.18 1.615-2.04-.71.424-1.5.73-2.336.898-.67-.714-1.62-1.16-2.67-1.16-2.02 0-3.66 1.64-3.66 3.66 0 .287.032.56.096.825-3.04-.153-5.743-1.6-7.55-3.837-.315.54-.495 1.17-.495 1.84 0 1.27.645 2.39 1.628 3.058-.598-.018-1.16-.184-1.65-.453v.045c0 1.77 1.258 3.247 2.923 3.582-.305.083-.627.126-.96.126-.235 0-.46-.023-.68-.067.465 1.45 1.815 2.505 3.425 2.535-1.24.97-2.79 1.55-4.47 1.55-.29 0-.58-.017-.86-.05 1.61 1.04 3.52 1.65 5.56 1.65 6.67 0 10.31-5.52 10.31-10.31 0-.158-.003-.315-.01-.47.715-.51 1.335-1.14 1.83-1.87z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0H5c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-3 7h-2v2h2v-2zm0 3h-2v2h2v-2zm0 3h-2v2h2v-2zm-3 0h-2v2h2v-2zm0-3h-2v2h2v-2zm0-3h-2v2h2v-2zm-3 6H8v2h2v-2zm0-3H8v2h2v-2zm0-3H8v2h2v-2zM5 22V5c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v12h-2v-2h-2v2h-2v-2h-2v2h-2v-2h-2v2H5zm14-10h-2v2h2v-2zm0 3h-2v2h2v-2z" />
                <path d="M15 8h-2c-1.104 0-2 .896-2 2v2h4l-1 3h-3v7h-3v-7h-3V10h3V7c0-3.867 2.67-6 6-6h2v4h-2c-.552 0-1 .448-1 1v1z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.06 1.805.234 2.224.413.56.243.96.65 1.353 1.042.393.393.801.794 1.043 1.352.179.419.353 1.054.413 2.224.058 1.265.07 1.646.07 4.85s-.012 3.584-.071 4.85c-.06 1.17-.234 1.805-.413 2.224-.243.56-.65 1.003-1.042 1.353-.393.393-.794.801-1.352 1.043-.419.179-1.054.353-2.224.413-1.265.058-1.646.07-4.85.07s-3.584-.012-4.85-.071c-1.17-.06-1.805-.234-2.224-.413-.56-.243-.96-.65-1.353-1.042-.393-.393-.801-.794-1.043-1.352-.179-.419-.353-1.054-.413-2.224-.058-1.265-.07-1.646-.07-4.85s.012-3.584.071-4.85c.06-1.17.234-1.805.413-2.224.243-.56.65-1.003 1.042-1.353.393-.393.794-.801 1.352-1.043.419-.179 1.054-.353 2.224-.413C8.416 2.175 8.797 2.163 12 2.163zm0 1.488c-3.195 0-3.565.012-4.82.07c-1.085.056-1.57.214-1.84.32-.38.153-.64.357-.92.64-.28.28-.487.54-.64.92-.106.27-.264.755-.32 1.84-.058 1.255-.07 1.625-.07 4.82s.012 3.565.07 4.82c.056 1.085.214 1.57.32 1.84.153.38.357.64.64.92.28.28.54.487.92.64.27.106.755.264 1.84.32 1.255.058 1.625.07 4.82.07s3.565-.012 4.82-.07c1.085-.056 1.57-.214 1.84-.32.38-.153.64-.357.92-.64.28-.28.487-.54.64-.92.106-.27.264-.755.32-1.84.058-1.255.07-1.625.07-4.82s-.012-3.565-.07-4.82c-.056-1.085-.214-1.57-.32-1.84-.153-.38-.357-.64-.92-.64-.28-.28-.54-.487-.64-.92-.106-.27-.264-.755-.32-1.84-.058-1.255-.07-1.625-.07-4.82zM12 7.75c2.347 0 4.25 1.903 4.25 4.25S14.347 16.25 12 16.25 7.75 14.347 7.75 12 9.653 7.75 12 7.75zm0 1.488c-1.527 0-2.762 1.235-2.762 2.762s1.235 2.762 2.762 2.762 2.762-1.235 2.762-2.762S13.527 9.238 12 9.238zM17.857 5.093c0 .548-.445.992-.993.992s-.992-.444-.992-.992.445-.992.993-.992.992.444.992.992z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8 10c0 .99-.14 1.94-.41 2.83l-4.59-4.59c.78-.54 1.34-1.24 1.63-2.01l3.37 3.37c-.07.07-.15.13-.24.19zM4 12c0-.99.14-1.94.41-2.83l4.59 4.59c-.78.54-1.34 1.24-1.63 2.01L4 12zm10-1.85V10c0 1.38-1.12 2.5-2.5 2.5h-.7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.7c.83 0 1.5.67 1.5 1.5zm0-2.35v-1.5c0-.83-.67-1.5-1.5-1.5h-.7c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h.7c.83 0 1.5.67 1.5 1.5zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </a>
          </div>
        </div>

        <div className={`border-t border-gray-200 mt-8 py-3 flex flex-col-reverse md:flex-row justify-center items-center text-sm text-gray-500 text-center ${direction === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
          <div className="mt-4 md:mt-0 order-1 md:order-3">
            <span>{t('allRightsReserved')}</span>
          </div>
          <div className={`flex items-center mb-4 md:mb-0 order-3 md:order-1 ${direction === 'rtl' ? 'lg:mr-3' : 'lg:ml-3'}`}>
            <span className="font-semibold">      
              <Logowhite
                style={{ cursor: "pointer", width: "64px", height: "26.694103240966797px" }}
                onClick={() => router.push("/")}
                className="hidden lg:block"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
