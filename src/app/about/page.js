'use client'

import React from 'react';
import Logowhite from "../../../public/logored.svg";
import Glob from "../../../public/glb.svg";
import Ind from "../../../public/ind.svg";
import Sft from "../../../public/sft.svg";
import Sel from "../../../public/sel.svg";
import Car from "../../../public/car.svg";
import Pas from "../../../public/pas.svg";
import Cre from "../../../public/cre.svg";
import Ino from "../../../public/ino.svg";
import Fun from "../../../public/fun.svg";
import Cur from "../../../public/cur.svg";
import Wrld from "../../../public/wrld.svg"
import { FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import { IMG_URL } from '../local';
import { useI18n } from '../lib/i18n';

function AccounteEl() {
  const { direction, locale, t } = useI18n();



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
    // One placeholder to complete the 12, or just use the 11 unique ones visually
    { name: 'عين تموشنت', detail: 'مقابل محطة الترامواي الثانية' },

  ];




  return (

<div lang={locale} dir={direction} className='mt-16 w-full'>

<section  className={`flex w-full justify-center bg items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-4' >
  <div className='font-bold text-2xl'>{t('aboutCompany')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
  {t('aboutCompanyText')}
  </p>
</div>
<div className='flex flex-col justify-center items-center p-4'>
<Logowhite  width={300} />
</div>
</section>


<section  className={`flex w-full justify-center items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-4' >
  <div className={`font-bold text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourHistory')}</div>
  <p className={`text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px] ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
 <span className='font-semibold' >
  {t('ourHistoryBold')}

 </span> <br/>
 {t('ourHistoryText')}
  </p>
</div>

</section>

<section  className={`flex py-8 w-full justify-center bg items-center ${direction === 'rtl' ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}>

<div className=' p-2 w-full' >
  <div className={`font-bold px-0 sm:px-0 lg:px-20 text-2xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>{t('ourProducts')}</div>

<div className='flex items-center justify-center'>

<div className='w-full gap-3 sm:w-full lg:w-2/3' style={{

// display:"grid",

// gridTemplateAreas:`
// '. . prd0 prd0 . .'
// 'prd1 prd1 . . prd2 prd2'
// '. prd3 prd3 prd4 prd4 .'
// 'prd5 prd5 . . prd6 prd6'
// '. prd7 prd7 prd8 prd8 .'


// `
   }} >

    <div className='   relative rounded-sm grid md:grid-cols-4 grid-cols-4' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={"https://res.cloudinary.com/strapimedia/image/upload/v1734213141/minimoon/qb4xxrinlbfcgvcos53p.jpg"} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>نسائي</div>

    </div>

    <div className='   relative rounded-sm' style={{gridArea:"prd1"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_2_9da2e13111.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>لانجيري</div>

    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd2"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_10_c4c3e9fc09.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>بيجامات</div>

    </div>


    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_0223f582a2.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>جلابيات</div>

    </div>


    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_a512c4865e.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>بناتي</div>

    </div>


    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_d100db5770.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>سراويل</div>

    </div>


    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_0ff556f4ec.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>موضه واناقة</div>

    </div>


    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_5be8d27a73.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ولادي</div>

    </div>

    <div className='   relative rounded-sm' >
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >

     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_12_b2fd588a57.JPG")} />


     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ملابس TRD</div>

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





<section  className="flex w-full justify-center   items-center flex-col">
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




</div>


  )
}

export default AccounteEl






















































