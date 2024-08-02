"use client";
import "./globals.css";
import { React, useEffect, useState, useRef, useContext } from "react";
import { API_URL} from "./local";
import Cart from "./comps/cart";
import { NextUIProvider } from "@nextui-org/react";
import CatDrop from "./comps/catDrop";
import NavbarC from "./comps/navbar";
import dynamic from "next/dynamic";

const Cartl = dynamic(() => import('./comps/cartl'))

import {Divider, Button , Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { FaSearch, FaUserCircle,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import AnnounceComp from "./comps/announce";
import { FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { CartContext } from "./contexts/cartContext";
import AuthenContext from "./contexts/AuthCon";
import localFont from 'next/font/local'
import Cookies from "universal-cookie";
import Logowhite from "../../public/logowhite.svg";
import { useRouter, usePathname } from "next/navigation";

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
  
  const [draw,setDraw] = useState(false)
  const [searwidth,setSearwidth] = useState(0);
  const [sugges,setSugges] = useState([])
  //let { cart } = useContext(CartContext);
  const ls = require("local-storage");
  
  useEffect(() => {
   
   getCats(); 
  loginval();
   
  }, [ls.get("atkn")])
  



  const getCats=()=>{
         
    
             
    const requestOptions = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
       
      },
    
  };

    fetch(`${API_URL}catagories?populate=*`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
       setCat(data.data);
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




  const loginval = ()=>{
    setLogindata(null);
    
    
        const requestOptions = {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": 'Bearer ' + ls.get("atkn")
          },
        
      };
    
        fetch(`${API_URL}users/me`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
    
            if(data.id){
      
      setLogindata(data)
    }

    
    
         
          });
    
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
        <CartContext>
          <AuthenContext>
            <section className="w-full" >
            <div className="  w-full bg-[url('../../public/amblemblack.svg')] bg-moon-200/90 from-moon-200 to-moon-200 text-white shadow-lg"
             style={{backgroundSize:20}}>
        <div className="p-3 w-full  shadow-md  bg-[url('../../public/amblemblack.svg')] bg-moon-200 from-moon-200 to-moon-200 " style={{position:"fixed",
          backgroundSize:20,top:0,zIndex:15}} >
        <NavbarC openCart={(t)=>{handleOpenCart(t)}}  openFav={handleOpenCartl}  />
       
          </div>      
      <div className="h-16" ></div>
       <div className="w-full  p-3" >
    <div className=" flex flex-col  w-full  lg:flex-row-reverse sm:flex-col justify-between   " >
    <div className="my-3 lg:my-2 md:my-0 sm:my-3   sm:w-full lg:w-2/6 p-2 py-2 ">
<div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"}} >
        <div className="  lg:w-11/12 sm:w-11/12 w-10/12  " style={{}}>
        <Input
          classNames={{
            base: " h-10 w-full",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white",
          }}
          placeholder="Search Minimoon..."
          size="sm"
          startContent={<FaSearch style={{marginRight:5}} size={18} />}
          type="search"
        />
        </div>
 

{logindata&&logindata?<Dropdown   placement="bottom-end">
          <DropdownTrigger>
          {/* <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="My Cart"> */}
<Button  isIconOnly className="bg-white text-xl  text-moon-200  rounded-full mx-1" size="md" variant="shadow"  aria-label="Like">               
        <FaUser  />
      </Button>  
    {/* </Tooltip> */}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions " className=" min-w-72  py-2 px-4  " dir="rtl" variant="shadow">
            <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{logindata&&logindata.username}</p>
              <p className="font-normal opacity-50">{logindata&&logindata.email}</p>
              <Divider className="my-1" />
            </DropdownItem>
            
            <DropdownItem onClick={()=>{router.push("/user")}} className="h-8 text-md " startContent={<FaListAlt/>} key="settings"><span className="text-md" >الطلبات</span>  </DropdownItem>
            <DropdownItem className="h-8 text-md " startContent={<FaCogs/>} key="team_settings "> <span className="text-md"  > إعدادات الحساب  </span> </DropdownItem>
        
            <DropdownItem  startContent={<FaPowerOff/>} onClick={()=>{logoutUser();}} key="logout"  className="text-red-500 h-8 text-md" >
        <span className="text-md"  > تسجيل خروج </span>       
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>:<motion.div className='flex-grow p-0 sm:px-0 lg:px-3 flex align-middle justify-end ml-2' whileTap={{ scale: 1.03 }}>
      {/* <LoadingBtn act={()=>{router.push("/login")} } color={Theme.primary} textColor={"white"} icon={<FaLock  />} text={"تسجيل دخول"}  /> */}
     <Button onClick={()=>{router.push("/login")} } variant="shadow" className="text-white text-xs rounded-lg
     bg-gradient-to-r from-moonsec-100 to-moonsec-100/70  font-bold shadow-md" endContent={<FaUserCircle />}> تسجيل دخول </Button>
     </motion.div>

}

     </div>
</div>


<div className="scrollable-content  sm:w-full lg:w-4/6  sm:mr-0 lg:mr-3 mr-0" style={{display:"flex",alignItems:"center",overflowX:"scroll",}} >  



{cat&&cat.map((cati,index)=>(
    
    <CatDrop key={index} data={cati.attributes.subcatagories.data}  lable={cati.attributes.name_ar}/>
    ))}



        
        </div>
      
    </div>
</div>

       </div>
            </section>
            <section>
              <AnnounceComp/>
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
            <div style={{backgroundSize:20}} className="    p-8 px8 lg:px-64 w-full  bg-[url('../../public/amblemblack.svg')] bg-moon-200  text-right lg:py-16">
      <div className="min-w-fit" >
   <div className="flex items-center my-2 justify-center">
   <Logowhite style={{cursor:"pointer"}}  onClick={() => {
                          router.push("/");
                        }} width={100} />
  
    </div>  
    <p className="text-xs text-center  break-words font-medium text-white lg:text-xl  ">
       info@minimoon.com
         <br/>
         
        </p>
        <p className="text-xs text-center  break-words font-medium text-white lg:text-xl  ">
         جميع الحقوق محفوظة
         <br/>
         2024
        </p>
      </div>
     
       
    </div>
            </section>


      
         
          </AuthenContext>
        </CartContext>
        </NextUIProvider>
      </body>
    </html>
  );
}
