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



import Image from 'next/image';
import { IMG_URL } from '../local';
function AccounteEl() {

 
  
  return (
  
<div lang='ar' dir='rtl' className='mt-16 w-full'>

<section style={{backgroundSize:50}} className="flex w-full justify-center bg-[url('../../public/amblemblack.svg')]  items-center flex-col-reverse lg:flex-row">

<div className=' p-4' >
  <div className='font-bold text-2xl'>حول الشركة</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  نحن علامة تجارية دولية متخصصة في ملابس النساء والأطفال، بنينا سمعتنا على الجودة العالية والتصاميم المبتكرة على مدار سنوات عديدة. يثق عملاؤنا بنا لما نقدمه من أقمشة ممتازة، وخياطة متقنة، وأفكار متجددة في تصميماتنا. لدينا قاعدة عملاء سعيدة في أكثر من 10 دول حول العالم. على مدار السنين، ركزنا على تحسين الجودة باستمرار وتقديم منتجات تلبي احتياجات وتطلعات أسلوب حياة عملائنا.
  </p>
</div>
<div className='flex justify-center items-center p-4'>
<Logowhite  width={300} />
</div>
</section>


<section style={{backgroundSize:50}} className="flex w-full justify-center   items-center flex-col-reverse lg:flex-row">

<div className=' p-4' >
  <div className='font-bold text-2xl'> تاريخنا</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
 <span className='font-semibold' >
  أكثر من 10 دول على مر السنين مع أكثر من 40 عامًا من الخبرة في مجال الملابس .
 
 </span> <br/>
 لدينا أكثر من 40 عامًا من الخبرة في مجال الملابس، مما مكننا من التوسع والوصول إلى أكثر من 10 دول.
بدأنا رحلتنا في تجارة الملابس قبل 40 عامًا بدافع شغفنا بهذا المجال، مما ساعدنا على النمو والاستمرارية. تأسست علامتنا التجارية Minimoon قبل 14 عامًا، مستندة إلى شغفنا بالجودة والأناقة. التزامنا بتلبية احتياجات المستهلكين ومواكبة أنماط الحياة المتغيرة كان أساس نجاحنا. نحن نصغي لعملائنا بعناية ونسعى دائمًا لتقديم ما يتناسب مع تطلعاتهم المتجددة.
  </p>
</div>
<div className='flex justify-center items-center p-4'>
<Glob  width={300} />
</div>
</section>

<section style={{backgroundSize:50}} className="flex py-8 w-full justify-center bg-[url('../../public/amblemblack.svg')]  items-center flex-col-reverse lg:flex-row">

<div className=' p-2 w-full' >
  <div className='font-bold px-0 sm:px-0 lg:px-20 text-2xl '> منتجاتنا</div>

<div className='flex items-center justify-center'>

<div className='w-full gap-3 sm:w-full lg:w-2/3' style={{

display:"grid",

gridTemplateAreas:`
'. . prd0 prd0 . .'
'prd1 prd1 . . prd2 prd2'
'. prd3 prd3 prd4 prd4 .'
'prd5 prd5 . . prd6 prd6'
'. prd7 prd7 prd8 prd8 .' 


`
   }} >
    
    <div className='   relative rounded-sm' style={{gridArea:"prd0"}}>
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


    <div className='   relative rounded-sm' style={{gridArea:"prd3"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_0223f582a2.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>جلابيات</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd4"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_a512c4865e.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>بناتي</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd5"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_d100db5770.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>سراويل</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd6"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35292_1_0ff556f4ec.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>موضه واناقة</div>
      
    </div>


    <div className='   relative rounded-sm' style={{gridArea:"prd7"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35290_1_5be8d27a73.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ولادي</div>
      
    </div>

    <div className='   relative rounded-sm' style={{gridArea:"prd8"}}>
     <div className='lg:h-52 h-24 sm:h-24 relative w-full items-center justify-between flex flex-col' >
      
     <Image fill objectFit='cover' className='rounded-md' src={IMG_URL.concat("/uploads/35277_12_b2fd588a57.JPG")} />
    
    
     </div>
     <div className='z-10 text-center text-lg my-0.5 font-bold'>ملابس TRD</div>
      
    </div>

 
   
 
   </div>

</div>



</div>

</section>



<section style={{backgroundSize:50}} className="flex w-full justify-center   items-center flex-col">

<div className=' p-4' >
  <div className='font-bold text-2xl'> لدينا الجودة والتركيز على القيم</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  نحن نؤمن بأن الجودة لا تقتصر فقط على المنتج، بل تمتد لتشمل التجربة التي يقدمها. هذا ينطبق بشكل خاص على الملابس، حيث تُعتبر الراحة التي يشعر بها الشخص جزءًا لا يتجزأ من تجربة الحياة اليومية. نحن نسعى جاهدين لتقديم منتجات ذات جودة عالية تجعل حياة عملائنا أكثر راحة ورفاهية.

في الوقت ذاته، نؤمن أن الجودة لا يجب أن تكون مكلفة. يثق عملاؤنا في علامتنا التجارية لما نقدمه من قيمة استثنائية تجمع بين الجودة والسعر المناسب. هذه الثقة هي نتاج تجربة مميزة اكتسبناها على مر السنين، ونحن فخورون بقاعدة عملائنا المخلصين الذين يشاركوننا رحلتنا.

علاوة على ذلك، نقدم لعملائنا مجموعة واسعة من الخيارات التي تناسب مختلف الأذواق والميزانيات، مما يضمن تلبية احتياجات الجميع من خلال التنوع والمرونة.
  </p>
</div>

</section>

<section style={{backgroundSize:50}} className="flex w-full justify-center
 bg-[url('../../public/amblemblack.svg')]  items-center flex-col-reverse ">


<div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'>تصاميمنا للأطفال مستوحاة من</div>
<div className='flex flex-wrap-reverse justify-center my-3' >




<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cur  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>   حب الاستطلاع </div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Fun  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>   المزاح </div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ino  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>  البراءة </div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Cre  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'> الإبداع </div>
  </div>




  
</div>
</div>



<div className='flex justify-center flex-col items-center p-4'>
<div className='font-bold text-2xl text-center'> تصاميمنا للنساء مستوحاة من</div>
<div className='flex flex-wrap justify-center my-3' >


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Pas  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>   الشغف </div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Car  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>   الاهتمام </div>
  </div>

<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sel  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'>  التأكيد الذاتي </div>
  </div>


<div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Sft  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'> الرقة والحنان </div>
  </div>


  <div className='p-1'>
  <div className='bg-moon-100 py-2 px-4 rounded-md'>
    <Ind  width={80} />
  </div>
  <div className='text-center text-lg font-semibold'> الفردية </div>
  </div>




  
</div>
</div>
<div className=' p-4' >
  <div className='font-bold text-2xl'> تصاميمنا</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  بالنسبة لنا، الأزياء هي انعكاس للتجربة الجماعية التي يمر بها الناس عبر الثقافات، حيث يعبرون عن البهجة وحتى الفوضى من خلال أنماط وألوان مميزة. نتابع عن كثب الاتجاهات التي تلهم بأساليب جديدة، لأن في ذلك تكمن روح التصاميم المبتكرة.

نحن نسعى دائمًا لإبهار عملائنا بتصاميم تعكس الجمال والإبداع. نستلهم أعمالنا من الحياة اليومية، والاتجاهات الحديثة، والثقافات المختلفة، لأننا نرى الجمال في كل مكان من حولنا. نؤمن أن عيون الإنسان مصممة لتلتقط هذا الجمال وتتفاعل معه بإعجاب.

نعلم أن عملاءنا يسعون للتعبير عن أسلوب حياتهم ومواقفهم وقيمهم من خلال ملابسهم. لذلك، يعمل فريق مصممينا بلا كلل على استلهام الأفكار وابتكار تصاميم فريدة وجذابة تلبي احتياجاتهم. نحن فخورون بتقديم أكثر من 365 موضوع تصميم جديد كل عام، مما يضمن لعملائنا مجموعة متنوعة ومتجددة دائمًا من الخيارات التي تلبي أذواقهم وتطلعاتهم.</p>
</div>

</section>



<section style={{backgroundSize:50}} className="flex w-full justify-center   items-center flex-col">
<div className='font-bold text-2xl'>  الأسواق التي نخدمها</div>
<div className=' p-4' >
<div>
  <Wrld width={"100%"} />
</div>
  <p className='text-justify max-w-full text-xl sm:max-w-full lg:max-w-[500px]'>
  على الرغم من أننا بدأنا بأسواق صغيرة ولكن على مدار سنوات، فقد ساعدنا جودة عملائنا في توسيع نطاق أعمالنا إلى العديد من البلدان. نحن نبيع
  منتجاتنا في معظم البلدان في الشرق الأوسط وشمال إفريقيا. لدينا العديد من العملاء الراضين التي طورنا عليها على مدار سنوات. نحن نوسع أوروبا ودول أخرى. كما نحب أن نسمع منك
  </p>
</div>

</section>



</div>


  )
}

export default AccounteEl






















































