"use client";
import "./globals.css";
import { React, useEffect, useState, useRef, useContext } from "react";
import { LOCALE, Theme,API_URL} from "./local";
import Image from "next/image";
import logowhite from "../../public/logowhite.svg";
import Cart from "./comps/cart";
import DropGroup from "./comps/dropgroup";
import Drop from "./comps/drop";
import PromoComp from "./comps/promo";
import { NextUIProvider } from "@nextui-org/react";
import CatDrop from "./comps/catDrop";
import AccounteEl from "./comps/accountel";
import NavbarC from "./comps/navbar";
import Cartl from "./comps/cartl";
import {Navbar, NavbarBrand, NavbarContent,Divider, Button,NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { FaSearch,FaLock,FaUserAstronaut, FaUserCircle,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import { FaVest } from "react-icons/fa6";
import AnnounceComp from "./comps/announce";
import MegaMenu from "./comps/megaMenu";
import LoadingBtn from "./comps/loadingbtn";
import { Tooltip } from "@nextui-org/react"
import { FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { ScrollShadow } from "@nextui-org/react";
import redem from "../../public/amblemred.svg"
import { BsHeartFill } from "react-icons/bs";
import { MdShoppingCart, MdSearch } from "react-icons/md";
import { CartContext } from "./contexts/cartContext";
import AuthenContext from "./contexts/AuthCon";
import { AuthCon } from "./contexts/AuthCon";
import localFont from 'next/font/local'
import Footer from "./footer";
import Cookies from "universal-cookie";
import Logowhite from "../../public/logowhite.svg";
import { useRouter, usePathname } from "next/navigation";

const ArFont = localFont({ src: './styles/fonts/alfont_com_SomarGX.ttf' })
const EnFont = localFont({ src: './styles/fonts/gothambook-webfont.woff2' })
export default function RootLayout({ children }) {
  const cookies = new Cookies();
  const pathname = usePathname();
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
        console.log(data.data)
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
//console.log(el.target.value)

// if(el.target.value.lenght<4){
//   console.log("returned")

//   return;
// }

console.log("lenght",el.target.value.length)

if(el.target.value.length<3){
console.log("returned-ish")
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
      console.log("search",data );  
      setSugges(data)
    }).then(()=>{
  
    })

}


  }




  const loginval = ()=>{
    setLogindata(null);
    console.log("loginval ")
    
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
      console.log(data);
      setLogindata(data)
    }

    console.log("loginval",data);
    
         
          });
    
      }

  const drawSugg = (el)=>{
console.log("search")
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



{cat&&cat.map(cati=>(
    
    <CatDrop data={cati.attributes.subcatagories.data}  lable={cati.attributes.name_ar}/>
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
            <div class="  hidden ">
                      <div class="flex  flex-col ">
                        <Cart
                          ref={childCompRef}
                          openHandler={handleOpenCart}
                          open={openCart}
                        />
                      </div>
                    </div>

                    <div class="  hidden">
                      <div class="flex  flex-col ">
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
            <div style={{backgroundSize:20}} class="    p-8 px8 lg:px-64 w-full  bg-[url('../../public/amblemblack.svg')] bg-moon-200  text-right lg:py-16">
      <div className="min-w-fit" >
   <div className="flex items-center my-2 justify-center">
   <Logowhite style={{cursor:"pointer"}}  onClick={() => {
                          router.push("/");
                        }} width={100} />
  
    </div>  
    <p class="text-xs text-center  break-words font-medium text-white lg:text-xl  ">
       info@minimoon.com
         <br/>
         
        </p>
        <p class="text-xs text-center  break-words font-medium text-white lg:text-xl  ">
         جميع الحقوق محفوظة
         <br/>
         2024
        </p>
      </div>
     
       
    </div>
            </section>

            
            {/* <div
            
              style={{ height: "100vh" }}
              class=" flex overflow-hidden "
              x-data="{ sidebarOpen: false }"
            >
              <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <div
                  style={{
                    top: 0,
                    backgroundColor: Theme.primary,
                  }}
                  class="   lg:flex    z-10  shadow"
                >
                  <div
                    className=""
                    style={{
                      color: "white",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      fontWeight: "bold",
                      fontSize: 25,
                    }}
                  >
                    <div className="hidden lg:flex sm:hidden md:hidden ">
                      <Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      />
                    </div>

                    <div
                      className="flex lg:hidden sm:flex md:flex "
                      style={{
                        fontSize: 15,

                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      />

                      <div>
                        <button
                          onClick={() => {
                            handleOpenCart(true);
                          }}
                          style={{
                            fontSize: 20,
                            marginLeft: 5,
                            padding: 10,
                            borderRadius: 100,
                            backgroundColor: "white",
                            color: Theme.primary,
                          }}
                          class="p-2 m-1 text-white  rounded-sm
             
             focus:shadow-outline focus:text-gray-500"
                        >
                          <MdShoppingCart />
                        </button>

                     
                      </div>
                    </div>

                    <div class="  hidden ">
                      <div class="flex  flex-col ">
                        <Cart
                          ref={childCompRef}
                          openHandler={handleOpenCart}
                          open={openCart}
                        />
                      </div>
                    </div>

                    <div class="  hidden">
                      <div class="flex  flex-col ">
                        <Cartl
                          ref={childCompRef}
                          openHandler={handleOpenCartl}
                          open={openCartl}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 hidden lg:flex md:hidden sm:hidden px-4  justify-between">

                    <div class="flex-1 flex   items-center">
                      <div class="w-2/3 flex md:ml-0">
                        <label for="search_field" class="sr-only">
                          Search
                        </label>
                        <div class="relative w-full text-white focus-within:text-gray-600">
                          <div class="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
                            <svg
                              class="h-5 w-5"
                              fill="currentColor"
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
                          onChange={(el)=>{
                            handleSearch(el);
                          }}
                            id="search_field"
                            class="block w-full  pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                            placeholder="Search Minimoon"
                          />
                        </div>
                      </div>
                      
   <div
   className="z-10 shadow-md"
   style={{ 
  position:"absolute",
  top:eltop+30,
  left:eleft,
  fontSize:15,
  width:searwidth,
  backgroundColor:"white",
  borderRadius:"0px 0px 10px 10px",
  padding:10,
  borderBottom:"5px solid"+ Theme.primary,
  display: draw?"block":"none", 
  }}

   >

 {sugges&&sugges.map((sug,index)=>(
<div key={index} onClick={()=>{location.href=("/products?pid="+sug.id);setDraw(false)}} className="hover:bg-slate-100" style={{color:"grey",padding:10,borderRadius:5,cursor:"pointer"}}>
    {sug.name_en}
    </div>

))}
    
    
    

  

   </div>
                    
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                      
                      <AccounteEl media={"m"} />
                      

                      <button
                        onClick={() => {
                          handleOpenCart(true);
                        }}
                        style={{
                          fontSize: 20,
                          marginLeft: 20,
                          padding: 10,
                          borderRadius: 100,
                          backgroundColor: "white",
                          color: Theme.primary,
                        }}
                        class="p-2 m-1 text-white  rounded-sm
             
                focus:shadow-outline focus:text-gray-500"
                      >
                        <MdShoppingCart />
                      </button>

                      <button
                        onClick={() => {
                          handleOpenCartl(true);
                        }}
                        style={{
                          fontSize: 20,
                          marginLeft: 20,
                          padding: 10,
                          paddingTop: 10,
                          paddingBottom: 8,
                          borderRadius: 100,
                          backgroundColor: "white",
                          color: Theme.primary,
                        }}
                        class="p-2 m-1 text-white  rounded-sm
             
             focus:shadow-outline focus:text-gray-500"
                      >
                        <BsHeartFill />
                      </button>

                      <button
                        style={{
                          marginLeft: 20,
                          color: "white",
                          fontWeight: "bold",
                        }}
                        class="p-2 m-1   rounded-sm
               focus:outline-none
                focus:shadow-outline focus:text-gray-500"
                      >
                        العربية
                      </button>

                      <div class="ml-3 relative" x-data="{ open: false }">
                        <div>
                          <button class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"></button>
                        </div>
                        <div class="origin-top-right hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                          <div class="py-1 rounded-md bg-white shadow-xs">
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Your Profile
                            </a>
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Settings
                            </a>
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                            >
                              Sign out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex lg:hidden sm:flex md:flex"
                  style={{
                    width: "100%",
                    maxHeight: 100,
                    padding: "5px 10px",
                    backgroundColor: "white",

                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => {
                          handleOpenCart(true);
                        }}
                        style={{
                          fontSize: 20,
                          padding: 10,
                          borderRadius: 100,
                          backgroundColor: Theme.primary,
                          color: "white",
                        }}
                        class="p-2 m-1 text-white  rounded-sm
              focus:shadow-outline focus:text-gray-500"
                      >
                        <MdSearch />
                      </button>
                    </div>

                    <div>
                      <input
                        placeholder="Seach Minimoon.."
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          padding: "6px 12px",
                          fontSize: 13,
                          color: Theme.secondary,
                          wordSpacing: "0.1px",
                          border: "3px solid" + Theme.primary,
                          outline: "white",
                          borderRadius: 20,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: 5,
                    }}
                  >
                   <AccounteEl media={"d"} />
                  </div>
                </div>

                <div
                  style={{
                    padding: 5,
                    width: "100vw",
                    position: "sticky",
                    zIndex: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Theme.secondary,
                  }}
                >
                <DropGroup/>
                </div>

                <div className="scrollable-content"  style={{ width: "100%", overflowY: "scroll" }}>
                  {children}
                </div>
              </div>
            </div> */}
      
         
          </AuthenContext>
        </CartContext>
        </NextUIProvider>
      </body>
    </html>
  );
}
