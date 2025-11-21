'use client'

import React from 'react';
import Logowhite from "../../../public/logored.svg";
import Wrld from "../../../public/wrld.svg"
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import { IMG_URL } from '../local';
import { useI18n } from '../lib/i18n';

function AccounteEl() {
  const { direction, locale, t } = useI18n();
  const [imageErrors, setImageErrors] = React.useState({});

  const productCategories = [
    { 
      id: 1,
      nameKey: 'womenCategory',
      image: 'https://res.cloudinary.com/strapimedia/image/upload/v1734213141/minimoon/qb4xxrinlbfcgvcos53p.jpg'
    },
    { 
      id: 2,
      nameKey: 'lingerieCategory',
      image: IMG_URL.concat('/uploads/35277_2_9da2e13111.JPG')
    },
    { 
      id: 3,
      nameKey: 'pajamasCategory',
      image: IMG_URL.concat('/uploads/35290_10_c4c3e9fc09.JPG')
    },
    { 
      id: 4,
      nameKey: 'jalabiyasCategory',
      image: IMG_URL.concat('/uploads/35290_1_0223f582a2.JPG')
    },
    { 
      id: 5,
      nameKey: 'girlsCategory',
      image: IMG_URL.concat('/uploads/35292_1_a512c4865e.JPG')
    },
    { 
      id: 6,
      nameKey: 'pantsCategory',
      image: IMG_URL.concat('/uploads/35290_1_d100db5770.JPG')
    },
    { 
      id: 7,
      nameKey: 'fashionCategory',
      image: IMG_URL.concat('/uploads/35292_1_0ff556f4ec.JPG')
    },
    { 
      id: 8,
      nameKey: 'boysCategory',
      image: IMG_URL.concat('/uploads/35290_1_5be8d27a73.JPG')
    },
    { 
      id: 9,
      nameKey: 'trdClothesCategory',
      image: IMG_URL.concat('/uploads/35277_12_b2fd588a57.JPG')
    },
    { 
      id: 10,
      nameKey: 'moreProducts',
      isSpecial: true
    }
  ];

  const handleImageError = (categoryId) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }));
  };

  const branches = [
    { name: 'برج الكيفان', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'بومرداس', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'الرويبة', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'الرغاية', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'وهران 2', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'الشراقة', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'واد سوف', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'البليدة', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'وهران 1', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'باتنة', detail: 'مقابل محطة الترامواي الثانية' },
    { name: 'عين تموشنت', detail: 'مقابل محطة الترامواي الثانية' },
  ];




  return (

<div lang={locale} dir={direction} className='w-full mt-16'>

<section  className={`flex w-full bg-white justify-center bg items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-4' >
  <div className='font-bold text-2xl'>{t('aboutCompany')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('aboutCompanyText')}
  </p>
  
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourHistory')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
 <span className='font-semibold' >
  {t('ourHistoryBold')}

 </span> <br/>
 {t('ourHistoryText')}
  </p>

</div>
<div className='flex flex-col justify-center items-center p-4'>
<Logowhite  width={800} />
</div>
</section>


{/* <section  className={`flex w-full justify-center items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>


</section> */}

<section className="w-full bg-gray-100 py-12 mx-auto  ">
  <div className="mx-auto px-4">
    <div className={`flex flex-col lg:flex-row gap-24 items-center ${direction === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
      
      {/* Images Grid - Left Side (4 columns) */}
      <div className="w-full max-w-lg lg:w-auto flex-shrink-0">
        <div className="grid grid-cols-4 gap-3">
          {productCategories.map((category) => (
            <div key={category.id} className="relative">
              {category.isSpecial ? (
                // Special "+450 من منتجاتنا الرائعة" item
                <div className="h-20 w-40 flex relative   rounded-md overflow-hidden flex  items-center justify-center px-1">
                  
                  <div className="text-moon-200 text-center">
                    <div className="text-2xl font-bold leading-tight">
                      +450
                    </div>
                    <div className="text-xl font-md leading-tight mt-0.5">
                      {t('ourWonderfulProducts')}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular product items
                <div className="h-20 w-20 relative bg-gray-200 rounded-md overflow-hidden">
                  {category.image && !imageErrors[category.id] ? (
                    <Image 
                      fill 
                      objectFit="cover" 
                      className="rounded-md" 
                      src={category.image}
                      alt={t(category.nameKey)}
                      onError={() => handleImageError(category.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                      {t(category.nameKey).charAt(0)}
                    </div>
                  )}
                 </div>
              )}
              {/* <div className="text-center text-xs mt-1 font-semibold">
                {category.isSpecial ? t('andMore') : t(category.nameKey)}
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Text Content - Right Side */}
      <div className="flex-1 max-w-lg">
        <div className={`${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
          <h2 className="font-bold text-xl mb-3">{t('ourProducts')}</h2>
          <p className="text-sm leading-relaxed mb-4">
            {t('aboutCompanyText')}
          </p>
          <h3 className="font-bold text-lg mb-2">{t('ourHistory')}</h3>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">{t('ourHistoryBold')}</span>
            <br />
            {t('ourHistoryText')}
          </p>
        </div>
      </div>

    </div>
  </div>
</section>



<section  className="flex w-full justify-center   items-center flex-col">

<div className=' p-4' >
  <div className='font-bold text-2xl'> لدينا الجودة والتركيز على القيم</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  نحن نؤمن بأن الجودة لا تقتصر فقط على المنتج، بل تمتد لتشمل التجربة التي يقدمها. هذا ينطبق بشكل خاص على الملابس، حيث تُعتبر الراحة التي يشعر بها الشخص جزءًا لا يتجزأ من تجربة الحياة اليومية. نحن نسعى جاهدين لتقديم منتجات ذات جودة عالية تجعل حياة عملائنا أكثر راحة ورفاهية.

في الوقت ذاته، نؤمن أن الجودة لا يجب أن تكون مكلفة. يثق عملاؤنا في علامتنا التجارية لما نقدمه من قيمة استثنائية تجمع بين الجودة والسعر المناسب. هذه الثقة هي نتاج تجربة مميزة اكتسبناها على مر السنين، ونحن فخورون بقاعدة عملائنا المخلصين الذين يشاركوننا رحلتنا.

علاوة على ذلك، نقدم لعملائنا مجموعة واسعة من الخيارات التي تناسب مختلف الأذواق والميزانيات، مما يضمن تلبية احتياجات الجميع من خلال التنوع والمرونة.
  </p>
</div>

</section>

<section  className={`flex w-full justify-center bg items-center ${direction === 'rtl' ? 'flex-col-reverse' : 'flex-col'}`}>


<div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'>{t('childrenDesigns')}</div>
<div className={`flex ${direction === 'rtl' ? 'flex-wrap-reverse' : 'flex-wrap'} justify-center my-3`}>



{/*
<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cur  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('curiosity')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Fun  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('fun')}</div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ino  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('innocence')}</div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cre  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('creativity')}</div>
  </div>


 */}


</div>
</div>



{/* <div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'>{t('womenDesigns')}</div>
<div className='flex flex-wrap justify-center my-3' >


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Pas  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('passion')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Car  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('care')}</div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sel  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('selfAffirmation')}</div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sft  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('tenderness')}</div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ind  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>{t('individuality')}</div>
  </div>





</div>
</div> */}


<div className=' p-4' >
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourDesigns')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('designsText')}</p>
</div>

</section>



{/* comhere */}
<section className="w-full py-12 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          فروعنا
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          تغطية شاملة لجميع المناطق والولايات عبر ١٢ فرعًا منتشرين في أنحاء الجمهورية
        </p>

        {/* Responsive Grid Container: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {branches.map((branch, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition duration-300 cursor-pointer">

              {/* Card Content Wrapper (RTL alignment) */}
              <div className="flex items-center w-full justify-between">

                {/* Location Icon/Arrow (Left in RTL layout) */}
                <FaMapMarkerAlt className="w-5 h-5 text-gray-400 rotate-90" />

                {/* Text Content (Right Aligned in RTL) */}
                <div dir='rtl' className=" flex-grow pr-4">
                  <div className="flex items-center justify-end">
                    <span className="text-lg font-semibold text-gray-900 ml-2">
                      {branch.name}
                    </span>
                    {/* Red Pin Circle */}
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full flex-shrink-0"></span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {branch.detail}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>  
      </div>
    </section>





<section  className="flex w-full justify-center items-center flex-col py-12">
<div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('marketsWeServe')}</div>
<div className=' p-4' >
<div>
  <Wrld width={"100%"} />
</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('marketsText')}
  </p>
</div>
</section>

{/* Contact Form Section */}
<section className="w-full bg-white py-12" dir="rtl">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold text-center mb-8">تواصل معنا</h2>
    
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
          <input 
            type="tel" 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="+213 XXX XXX XXX"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="موضوع الرسالة"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
        <textarea 
          rows="5" 
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          placeholder="اكتب رسالتك هنا..."
        ></textarea>
      </div>

      <div className="text-center">
        <button 
          type="submit" 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-12 py-3 rounded-md transition duration-300"
        >
          إرسال
        </button>
      </div>
    </form>
  </div>
</section>

</div>


  )
}

export default AccounteEl






















































