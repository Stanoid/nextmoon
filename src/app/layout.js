"use client";
import "./globals.css";
import { React, useEffect, useState, useRef, useContext } from "react";
import { API_URL ,Theme} from "./local";
import Cart from "./comps/cart";
import { NextUIProvider } from "@nextui-org/react";
import CatDrop from "./comps/catDrop";
import NavbarC from "./comps/navbar";
import dynamic from "next/dynamic";
import {Provider} from "react-redux"

import { PersistGate } from "redux-persist/integration/react";
import { persistor,store } from "./lib/store";
import Mob from "../../public/mob.svg";
const Cartl = dynamic(() => import('./comps/cartl'))

import {Divider, Button , Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { FaSearch, FaUserCircle,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import AnnounceComp from "./comps/announce";
import { FaUser,FaFacebook, FaInstagram,FaXTwitter,FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CartContext } from "./contexts/cartContext";
import AuthenContext from "./contexts/AuthCon";
import localFont from 'next/font/local'
import Cookies from "universal-cookie";
import Logowhite from "../../public/logored.svg";
import { useRouter, usePathname } from "next/navigation";
import { BsX } from "react-icons/bs";

const ArFont = localFont({ src: './styles/fonts/alfont_com_SomarGX.ttf' })
const EnFont = localFont({ src: './styles/fonts/gothambook-webfont.woff2' })
export default function RootLayout({ children }) {
 
  const router = useRouter();
 

  const [openCart, setOpenCart] = useState(false);
  const [openCartl, setOpenCartl] = useState(false);
  const childCompRef = useRef();
  const [eleft,setEleft] = useState(null)
  const [eltop,setEtop] = useState(null)
  const [cat,setCat] = useState(null);
  const [logindata,setLogindata] = useState(null)
  const [searchTog,setSearchTog] = useState(false);

  const [draw,setDraw] = useState(false)
  const [searwidth,setSearwidth] = useState(0);
  const [sugges,setSugges] = useState([])
  //let { cart } = useContext(CartContext);
  const ls = require("local-storage");
  
  useEffect(() => {
   
   getCats(); 
  //loginval();
   
  }, [])
  



  const getCats=()=>{
         
    
             
    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
       
      },
    
  };

    fetch(`${API_URL}sections?func=getAllSubcat`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("sections",data);

       setCat(data);
      }).then(()=>{
     
      })


    }

  
  const logoutUser = () => {
    
    ls.set("atkn", "");

    router.push("/logout");
  }


  const handleOpenCart = (open) => {
    setOpenCart(open);
  };
  const handleOpenCartl = (open) => {
    setOpenCartl(open);
  };
  const [utype, setutype] = useState(0);

  const handleSearch = (el) =>{
//

// if(el.target.value.lenght<4){
//   

//   return;
// }



if(el.target.value.length<3){

  setSugges([]);
  
}else{

  const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        // "Authorization": 'Bearer ' + ls.get("atkn")
    },
  };
  fetch(`${API_URL}products?func=SearchWithkeyword&keyword=${el.target.value}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      
      setSugges(data)
    }).then(()=>{
  
    })

}


  }





  const drawSugg = (el)=>{

    setEleft(el.target.getBoundingClientRect().left);
    setSearwidth(el.target.getBoundingClientRect().width);
    setEtop(el.target.getBoundingClientRect().top);
    setDraw(true);
  }

  return (
    <html className="scrollable-content" lang="en">
      <head>
      <meta name=" theme-color" content="#f00" />
      </head>
      <body className={ArFont.className} style={{}}>
        <NextUIProvider>
          <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>

        <CartContext>
          <AuthenContext>
            <section className="w-full" >
            <div className="  w-full bg-white text-white "
             style={{backgroundSize:20}}>
        <div className="p-2 w-full transition-all  shadow-md bg-white " style={{position:"fixed",
          backgroundSize:20,top:0,zIndex:15}} >

        <NavbarC rel={false} searchTog={searchTog} setSearchTog={(sta)=>{setSearchTog(sta)}} cat={cat} openCart={(t)=>{handleOpenCart(t)}}  openFav={handleOpenCartl}  />
       

        <div style={{display:searchTog?"flex":"none"}} className="flex-1 flex mt-3 items-center">
                      <div className=" w-full sm:m-full lg:w-1/2  flex md:ml-0">
                        <label for="search_field" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full text-white focus-within:text-gray-600">
                          <div className="absolute inset-y-0 left-0 flex items-center  p-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-moon-200"
                            fill={Theme.secondary}
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              />
                            </svg>
                          </div>
                          <input
                          // onBlur={()=>{setDraw(false)}}
                          onFocus={(el)=>{drawSugg(el)}}
                          autoComplete="off"
                          onChange={(el)=>{
                            handleSearch(el);
                          }}
                            id="search_field"
                            className="block w-full 
                          border-2 border-moonsec-100
                            pl-8 pr-3 py-2 rounded-md text-moon-300/40
                             placeholder-moon-300/40 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                            placeholder="Search Minimoon"
                          />
                        </div>
                      </div>
                      
   <div
   className="z-30 border-2 border-t-0 border-b-5 border-moonsec-100 shadow-md"
   style={{ 
  position:"absolute",
  top:eltop+36,
  left:eleft,
  fontSize:15,
  width:searwidth,
  backgroundColor:"white",
  borderRadius:"0px 0px 10px 10px",
  padding:10,
  
  
  display: draw?"block":"none", 
  }}

   >

<div className="flex w-full text-red-500  text-2xl font-bold justify-end align-middle items-center">

<div
onClick={()=>{ setDraw(false) }}
className="flex cursor-pointer items-center" >
  <div className="text-sm font-bold text-moon-300/60 " >
  إخفاء
  </div>
  

<BsX/>
</div>

</div>

 {sugges&&sugges.length==0?
  <div className="h-40 flex text-moon-200 w-full justify-center items-center align-middle">
<div className="inline">
لاتوجد نتائج


</div>
 </div> :sugges.map((sug,index)=>(

<div key={index} onClick={()=>{location.href=("/products?pid="+sug.id);setDraw(false)}} className="hover:bg-slate-100" style={{color:"grey",padding:10,borderRadius:5,cursor:"pointer"}}>
    {sug.name_en}
    </div>

))}
    
    
    

  

   </div>                  
  </div>
       
       
        <div style={{maxWidth:"100%",overflowX:"scroll"}} className=" text-moon-300 text-md whitespace-nowrap  font-medium  transition-colors  py-0.5 w-full
          space-x-2 flex mt-1 pb-2
        flex-row-reverse scrollable-content  justify-center items-center  ">







        
        <div className=" mx-3   cursor-pointer border-b-4 border-moon-200/60 text-moon-200 pb-0.5 " > الرئيسية </div>
    
   <div className="blok sm:block lg:hidden "  >
    <div className="w-32"></div>
    </div>    
     

        {cat&&cat.map(ct=>(
    

    <CatDrop data={ct}  lable={ct.name_ar}/>
    ))}
         <a href="/about" >
        <div  className=" cursor-pointer hover:border-b-2 border-moon-300/40 pb-0.5 " > من نحن؟ </div>
        </a>
        <a href="/contactus" >
        <div className=" cursor-pointer hover:border-b-2 border-moon-300/40 pb-0.5 " > إتصل بنا </div>
       </a>

     


        </div>








          </div>      
      <div className="h-14 sm:h-14 lg:h-24" ></div>
       <div className="w-full  p-3" >
    <div className=" flex flex-col  w-full  lg:flex-row-reverse sm:flex-col justify-between   " >

  
  




      
    </div>
</div>

       </div>
            </section>


            
          

            <section>
            <div className="  hidden ">
                      <div className="flex  flex-col ">
                        <Cart
                          ref={childCompRef}
                          openHandler={handleOpenCart}
                          open={openCart}
                        />
                      </div>
                    </div>

                    <div className="  hidden">
                      <div className="flex  flex-col ">
                        <Cartl
                          ref={childCompRef}
                          openHandler={handleOpenCartl}
                          open={openCartl}
                        />
                      </div>
                    </div>
            </section>

 
            
            <section>
            <div className="scrollable-content min-h-lvh"  style={{  }}>
                  {children}
                </div>
            </section>
            <section>
            <div style={{backgroundSize:20}} className="    border-t-2 border-gray-500 mt-8 p-8 px-0  pb-3  w-full   text-right">
      <div className="w-full" >
   {/* <div className=" hidden sm:hidden lg:flex items-center my-2 justify-center">
   <Logowhite style={{cursor:"pointer"}}  onClick={() => {
                          router.push("/");
                        }} width={100} />
  
    </div>   */}

    <div className="w-full  flex whitespace-nowrap text-right text-sm font-semibold px-6 lg:px-44 sm  justify-center space-x-3 items-center">
  
    <div className=" w-full flex text-moon-200  space-y-1 flex-col items-start justify-center "> 
    <div className=" w-full "> المملكة السعودية    </div>
    <div className=" w-full ">الدولار الأمريكي    </div>
    <div className=" w-full ">اللغة العربية</div>
  
     </div>


    <div className=" w-full flex space-y-1 flex-col items-start justify-center "> 
    <div className=" w-full "> من نحن    </div>
    <div className=" w-full ">قيمنا    </div>
    <div className=" w-full ">منتجاتنا</div>
    <div className=" w-full ">متاجرنا</div>
     </div>



    <div className=" w-full flex space-y-1 flex-col items-start justify-center "> 
    <div className=" w-full "> الدعم الفني    </div>
    <div className=" w-full ">اتصل بنا    </div>
    <div className=" w-full ">سياسة الشحن
    </div>
    <div className=" w-full ">سياسة الارجاع</div>
     </div>

     <div className=" w-full flex space-y-1 flex-col items-start justify-center "> 
     <div className=" w-full ">التسجيل    </div>
    <div className=" w-full ">تسجيل الدخول    </div>
    <div className=" w-full ">عنواني</div>
    <div className=" w-full ">طلباتي</div>
     </div>
    </div>

    <div className='my-3' >
     <div className='text-center my-1 font-semibold text-moon-200 '> تابعنا على</div> 
   <div className='flex space-x-3 text-2xl flex-row items-center justify-center' >
   <FaFacebook className='text-[#3E5C9A]' />
   <FaInstagram className='text-[#C84278]' />  
   <FaXTwitter/>
   <FaGoogle className='text-[#DF4B38]' />
   
   </div>
  
    </div>
    
    
        <p className="text-xs text-center border-t-1 border-gray-300 py-2  w-full break-words font-medium text-black lg:text-base  ">
        جميع الحقوق محفوظة © ميني مون 2024
        </p>
      </div>
     
       
    </div>
            </section>

          


      
         
          </AuthenContext>
        </CartContext>
  </PersistGate>
        </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
