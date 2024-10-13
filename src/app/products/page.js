"use client";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React, { useState, useEffect, useContext, useRef, useSear } from "react";
import { useRouter } from "next/navigation";
import { API_URL, ROOT_URL, CURRENCY, Theme,IMG_URL,DEF_IMG } from "../local";
import QuantEl from "../comps/quantel";
import { BsHeartFill,BsCartPlusFill } from 'react-icons/bs';
import { useDispatch,useSelector } from 'react-redux';
import Lens from "../comps/Lens"
import { motion } from 'framer-motion';
import { addToCart,removeFromCart } from '../lib/actions/counterAction';
import { Flip, Slide, toast, ToastContainer } from "react-toastify";
import { CartCon, CartContext } from "../contexts/cartContext";
import OptionEL from "../comps/optionEL";
import LoadingOverlay from '../comps/loadingOverlay';
import Head from "next/head";
import { Accordion,AccordionItem, Avatar } from '@nextui-org/react';
import { FaAudioDescription, FaParagraph, FaRecycle, FaStar } from 'react-icons/fa6';
import { FaBars, FaShippingFast, FaTextHeight } from 'react-icons/fa';

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Product({}) {
  const [db, setDb] = useState(null);
  const [price, setPrice] = useState();
  const [lod, setLod] = useState(true);
  const [selectedV, setSelectedV] = useState();
  const [pref, setPref] = useState();
  const [modelno,setModelno] = useState(null);
  const [selectedC, setSelectedC] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [sizesel, setSizesel] = useState(null);
  const [colorsel, setColorsel] = useState(null);
  const [pcode,setPcode] = useState(null);
  const [stock,setStock] = useState(0);
  const [qty,setQty]=useState(1);
  const [mimg,setmimg] = useState();
  const [imgs,setImgs]=useState([]);
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const cart = useSelector((state) => state)
  const dispatch = useDispatch();
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  useEffect(() => {
  
    setmimg(0);
    //


    getFullProduct();


      // callback function to call when event triggers
      const onPageLoad = () => {
        
       // setLod(true);
      };
  
      // Check if the page has already loaded
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad, false);
        // Remove the event listener when component unmounts
        return () => window.removeEventListener('load', onPageLoad);
      }



      // for (let i = 0; i < product.data.length; i++) {
      //   if (product.data[i].id == getQueryVariable("pid")) {
      //     
        
  
        
  
      //   } else {
      //   }
      // }






  }, []);


  const varselectHandler = (vid,prodRef)=>{
setQty(1)
setSelectedV(vid);
setPref(prodRef)

const vrs = db.attributes.varients.data;

for (let i = 0; i < vrs.length; i++) {
 if(vrs[i].id==vid){
  setPrice(vrs[i].attributes.price);
  setStock(vrs[i].attributes.stock);
 }
  
}





  }



  const getFullProduct = ()=>{
        
    setLod(true);
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // "Authorization": 'Bearer ' + ls.get("atkn")
        },
      
    };
  
      fetch(`${API_URL}products/${getQueryVariable("pid")}?func=getFullProduct`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //



          setImgs(JSON.parse(data.data.attributes.img));
          setPrice(data.data.attributes.varients.data[0].attributes.price);
          setStock(data.data.attributes.varients.data[0].attributes.stock);
          setSelectedV(data.data.attributes.varients.data[0].id);
          setPref(data.data.attributes.varients.data[0].attributes.product_ref);
          setPcode(data.data.attributes.varients.data[0].attributes.code);
          setSizesel(data.data.attributes.varients.data[0].attributes.sizes.data[0].id);
          setColorsel(data.data.attributes.varients.data[0].attributes.colors.data[0].id);

          setSelectedC(data.data.attributes.varients.data[0].attributes.colors.data[0].id);
          setSize(data.data.attributes.varients.data[0].attributes.sizes.data[0].id);
          setColor(data.data.attributes.varients.data[0].attributes.colors.data[0].attributes.colorCode);
          setDb(data.data);
        }).then(()=>{
        setLod(false);
        
        });


}





  const { cartData, addTofav, favData, useNotifi, removeFromFav } =
    useContext(CartCon);

  const HandleAddToCart = () => {
   dispatch(addToCart({ 
    data: db, 
    selvar: selectedV, 
    name:db.attributes.name_ar,
    code:db.attributes.varients.data[0].attributes.code,
    img: JSON.parse(db.attributes.img)[0].url,
    color: colorsel,
    size: sizesel,
    product_ref:pref,
    qty: qty, 
  }))
     
   //   
      useNotifi("success", "تمت إضافة المنتج إلى السلة");
  
  };


  const handleRemoveCart = ()=>{
    dispatch(removeFromCart(selectedV));
    useNotifi("success", " Done");
  }



  const handleimgselection = (index)=>{
    setmimg(index)
  }



  //legacy code.
  // const  ls = require('local-storage');
  // const router = useRouter();

  const HandleAddToFav = (id) => {

    if(!udata){
      useNotifi("error", "الرجاء تسجيل الدخول لإضافة المنتج للمفضلة");
    return;

    }


    const requestOptions = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + udata.data.jwt
      },
      body: JSON.stringify(
          {
          
              "pid":db.id,
           
                     
       
            }
        )
    
  };

    fetch(`${API_URL}likes?func=AddToLikes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        useNotifi("success", "تمت إضافة المنتج إلى المفضلة");

    
      }).then(()=>{
          
    
      })




    // if (favData.length == 0) {
    //   addTofav(db);
      
    //   //useNotifi("success","Product has been added to Liked")
    // } else {
    //   if (
    //     favData.find((obj) => obj.id === parseInt(getQueryVariable("pid"))) ==
    //     undefined
    //   ) {
    //     addTofav(db);
        
    //     // useNotifi("success","Product has been added to Liked")
    //   } else {
        
    //     removeFromFav(db.id);
    //   }

    //   // const object = array.find(obj => obj.id === 3);

    //   // old cart handler (uncontrollable for loop)
    //   // for (let i = 0; i < cartData.length; i++) {
    //   //   if(cartData[i].id===parseInt(getQueryVariable("pid"))){
    //   //     
    //   //    return
    //   //   }else{
    //   //     
    //   //     addToCart(db);

    //   //   }
    //   //   }
    // }
  };

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    
  }

  return (
    <div className='mt-24' >
      <Head>
        {/* <title>{"Minimoon | " + db.attributes&&db.attributes.name_en} </title>
        <meta name="description" content={db.attributes.descriptionEn} /> */}
        <meta name="theme-color" />
        <link rel="icon" href="/favicon.ico" />
      </Head>





      {/* <ToastContainer  limit={3}/> */}

    {
  !lod? <div className="main p-2 " style={{ width: "100%"}}>
        

  <div
    className="flex-col lg:flex-row sm:flex-col md:flex-col "
    style={{
      width: "100%",
      display: "flex",

      justifyContent: "center",
      alignItems: "flex-start",
    }}
  >
    
   
   <div className='w-full '>
    <Lens data={imgs} />
   </div>


   
    <div
    className='mt-4 sm:mt-4 lg:mt-2 pl-0 sm:pl-0 lg:pl-3'
      style={{
        width: "100%",
        height: "100%",
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
   
   
      }}
    >
      <div className=" w-full px-2">
        <span

          style={{
            backgroundColor: Theme.secondary,
            color: "white",
            borderRadius: 20,
            padding: "7px 14px",
            fontSize: 15,
          }}
          className="px-2.5 py-0.5 text-xs   rounded-xl "
        >
        {db&&db.attributes.subcatagory.data.attributes.name_ar}
        
        </span>
        <div
        className=''
          style={{
            display: "flex",
      alignItems:"center",
      justifyContent:"space-between",
           
           
          }}
        >


<motion.div

whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.9 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => {
                HandleAddToFav();
              }}
              className="shadow-md"
              style={{
                color: "#FA5882",
                backgroundColor: "white",
                
                fontSize: 25,
                padding: "8px 12px",
                paddingTop: 9,
                paddingBottom: 7,
                borderRadius: 8,
               
              
              }}
            >
              <BsHeartFill />
            </motion.div>


      <div  className='flex flex-col my-3'>
          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 20,
                width:"100%",
                
                lineHeight: 1.3,
              }}
              className="max-w-xl mt-6  text-right font-semibold leading-loose tracking-tight text-gray-700  "
            >
              {db&&db.attributes.name_ar}
            </h2>
          </div>

          <div>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 17,
                width:"100%",
                
                lineHeight: 1.3,
              }}
              className="max-w-xl mt-2  text-right font-semibold leading-loose tracking-tight text-gray-500  "
            >
              {pcode} : رقم الصنف
            </h2>
          </div>

          <div >
            <h2
              style={{
                fontWeight: "bold",
                fontSize: 21,
                color: stock<=0?"red":"gray",
                width:"100%",
                
                lineHeight: 1.3,
              }}
              className="max-w-xl mt-2  text-right font-semibold leading-loose tracking-tight text-gray-500  "
            >
        الكمية :  {stock}      قطعة 
            </h2>
          </div>


   </div>
         
          
          </div>
        

      
        <p
          style={{
            display: "inline-block",
            fontWeight: "bold",
            textAlign:"right",
            fontSize: 25,
         
            width:"100%",
            color: "black",
          }}
          className="inline-block text-2xl font-semibold  "
        >
          <span> {CURRENCY} {price} </span> 
          <span
            style={{
              marginLeft: "0.5 rem",
              fontSize: "1 rem",
              lineHeight: "1.5 rem",
              
              textDecorationLine: "line-through",
            }}
            className="ml-3 text-base font-medium  text-red-600 line-through dark:text-gray-400"
          >
            {price + 21} {CURRENCY}
          </span>
        </p>

        <p
          style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.2 }}
          className="max-w-xl mt-6 mb-6 text-right  font-semibold leading-loose tracking-wide text-gray-900  dark:text-gray-800"
        >
          {db&&db.attributes.description_ar}
        </p>
      </div>

      <div
        className="w-full sm:w-full shadow-md "
        style={{
          display: "flex",
          alignSelf:"center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
       
          padding: 20,
        }}
      >
        <div style={{width:"100%",padding:"10px",borderRadius: "10px 10px 0px 0px",}}>
         <OptionEL varselect={(vid,prodRef)=>{varselectHandler(vid,prodRef)}} 
         size={sizesel}
         color={colorsel}
         sizeSelect={(sid)=>{setSizesel(sid)}}
         colorSelect={(cid)=>{setColorsel(cid)}}
         selid={selectedV} vars={db&&db.attributes.varients.data} />

    
               </div>


            

               <div
            
             className=' py-4 pb-5'
            style={{
             
             
              color: "white",
           
              cursor: "pointer",
              display:"flex",
              alignItems:"center",
              width:"100%",
              justifyContent:"center",
              flexDirection:"column",
              
              borderRadius: "0px 0px 10px 10px",
            }}
          >
 


 <div >
 <QuantEl qty={qty} quantHandler={(q)=>{setQty(q)}} stock={stock}/>
 </div>

       

        <div className='flex flex-col space-y-2 justify-center items-center' >
        <div
             className="shadow-lg shadow-moon-100/70 rounded-md px-6 py-2.5 mt-3 bg-moon-200 "
              onClick={() => {
                HandleAddToCart();
              }}
              style={{
                display: stock<=0? "none" :"flex" ,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
              <span> أضف إلى السلة  </span>
              <div
                style={{
                  color: "white",
                  fontSize: 23,
                  marginLeft: 8,
                }}
              >
                <BsCartPlusFill />
              </div>
            </div>


            <div
             className="shadow-lg shadow-moon-100/70 rounded-md px-6 py-2.5 mt-3 text-moon-300 bg-white "
              onClick={() => {
                HandleAddToFav();
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
             
              <span> أضف إلى المفضلة  </span>
              <div className='text-pink-600'
                style={{
                 
                  fontSize: 23,
                  marginLeft: 8,
                }}
              >
                <BsHeartFill />
              </div>
            </div>


        </div>

            {/* <div onClick={()=>{console.log(cart)}} className='w-8 h-8 bg-red-800 text-white rounded-sm shadow-md '>
              cart
            </div>
            <div onClick={()=>{handleRemoveCart()}} className='w-8 h-8 bg-red-800 text-white rounded-sm shadow-md '>
              remove from cart 
              </div> */}
          </div>
            

            <div  dir="rtl" className='w-full'>
            <Accordion selectionMode="multiple">

            <AccordionItem
        key="1"
        aria-label="Chung Miller"
        startContent={
        <FaBars/>
        }
       
        title="وصف المنتج"
      >
        مجموعة متنوعة من الخيارات: متوفرة بألوان وأشكال متعددة لتناسب ذوقك الشخصي.✅

جودة متينة: تحافظ على الحالة المثالية حتى بعد عدة غسلات.✅

راحة فائقة: خفيفة الوزن ومريحة، مثالية للارتداء طوال اليوم.✅

مثالية للهدايا: هدية ممتازة لأحبائك أو هدية فاخرة لنفسك.✅
        
       </AccordionItem>

      <AccordionItem
        key="2"
        aria-label="Chung Miller"
        startContent={
        <FaRecycle/>
        }
       
        title=" الإرجاع و معلومات و الشحن "
      >
        <p className='text-right'>

        سياسة الاستبدال والاسترجاع
سياسة الاستبدال: 


- الإستبدال حق مضمون كل عملائنا وهو يشمل جميع المنتجات التي نعرضها على متجرنا.
- جميع المنتجات المعروضة على متجرنا قابلة لسياسة الإستبدال وفق الشروط والأحكام المنصوص عليها في هذه الصفحة.
- يمكن الإستبدال إذا كان المنتج بنفس حالته الأصلية عند الشراء ومغلفا بالغلاف الأصلي.
- الاستبدال خلال خمسة (5) أيام من تاريخ الشراء.
- يرجى التواصل معنا عبر صفحة اتصل بنا أو عبر أرقامنا الهاتفية من أجل طلب الإستبدال.
- يرجى تصوير المنتج وإرساله مع تحديد المدينة والعنوان ورقم الطلب ليتم إستبداله بمنتج اخر في حالة كان المنتج فاسدا أو به عيب معين .


عند ارسال الطلبية , في حالة حدوث خطا في المقاس من طرف الشركة تتكفل الشركة المسؤولية و جميع التكاليف (سعر التوصيل )
 في حالة قام العميل بطلب مقاس ما و عند استلام الطلبية وجد ان المقاس لا يناسبه يتحمل العميل المسؤولية الكاملة و جميع التكاليف في حالة ما اراد تغيير المنتج بمقاس اخر ( التكاليف تتمثل في سعر الشحن )

        </p>
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Chung Miller"
        startContent={
        <FaShippingFast/>
        }
       
        title=" شحن مجاني "
      >
       
      </AccordionItem>

      <AccordionItem
        key="4" 
        className='text-center bg-gray-100  p-3 py-0 '
        aria-label="Chung Miller"
        startContent={
        <div className='flex flex-col justify-center items-start text-center w-full text-sm font-semibold'> <FaStar className='text-yellow-400 mb-3 text-2xl' /> 
        (4.6) 233  تقييم</div>
        }
       
        title=" التقييمات "
      >
        {defaultContent}
      </AccordionItem>
  
    
    </Accordion>

            </div>
              
      

        <div style={{ marginTop: 14, width: "100%" }}>
          <div
            className="flex-col lg:flex-co sm:flex-col md:flex-col"
            style={{

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >



          </div>
        </div>
      </div>
    </div>
  </div>
</div>
:<div  style={{ width: "100%",opacity:0.4, padding: "20px 10px" }}>
 
 <SkeletonTheme baseColor="white" highlightColor={Theme.primary}>
 
   <div className='px-2' >
   <Skeleton count={4} />
    </div> 

    <div className='flex mt-2 items-center justify-between w-full ' >
      
      <div className='mx-2 flex-grow ' >
        <Skeleton count={3} />
      </div>
  
   
    


    </div>


    <div className='mx-2 mt-2 flex-grow ' >
        <Skeleton count={3} />
      </div>
   
  </SkeletonTheme>



 
</div>

    }
    </div>
  );
}

