import React from "react";
import { API_URL } from "../local";
import { useState,useEffect } from "react";
import {Navbar,Divider, NavbarBrand, NavbarContent, Button,NavbarItem, Link, Input, DropdownItem, DropdownTrigger, 
  Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import Image from "next/image.js";
import { Badge } from "@nextui-org/react";
import { MdMenu, MdOutlineShoppingBag, MdShoppingBasket, MdTranslate } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { FaArrowCircleRight, FaFemale, FaGlobeAsia, FaHamburger, FaHome, FaInfoCircle, FaPhoneAlt, FaShoppingBag, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { FaSearch,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import { FaBaby, FaBabyCarriage, FaBagShopping, FaBasketShopping, FaCartShopping, FaChild, FaCircleDot, FaPersonDress } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaVest } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/react";
import { FaHeart } from "react-icons/fa6";

import MenuIcon from "@heroicons/react/outline";
import redem from "../../../public/amblemred.svg"
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./icons";
import MegaMenu from "./megaMenu";
import Logowhite from "../../../public/logored.svg";
import { BsMenuApp, BsSearch } from "react-icons/bs";

export default function NavbarC(props) {

  const ls = require("local-storage");




useEffect(() => {

  loginval();
setCount(ls.get("MinimoonCart").length)
 
}, [])




    const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
   const [count,setCount] = useState(0);
    const [logindata,setLogindata] = useState(null)


    const router = useRouter();
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  


  

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

      console.log("aaaaaa",data)
    }

    
    
         
          });
    
      }

  



  return (

<>
<div style={{float:"right",maxWidth:"100vw",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
{/* <Dropdown placement="left">
          <DropdownTrigger>
          <Button
                disableRipple
                className="p-0 bg-transparent text-white data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                العربية
              </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              
            </DropdownItem>
        
          </DropdownMenu>
        </Dropdown> */}


<div className="flex justify-center items-center">


<Dropdown    className="bg-white/60  backdrop-blur-[10px] " placement="bottom-start">
          <DropdownTrigger>
   
          <div className=" block sm:block lg:hidden md:hidden text-3xl mr-0.5  text-moon-300/70" > 
<MdMenu/>
</div>
   
          </DropdownTrigger>
          <DropdownMenu  style={{backgroundColor:"rgba(255,255,255,0.0)"}} aria-label="Profile Actions "
           className=" min-w-80  text-moon-200  py-2 px-4    "
           dir="rtl" variant="shadow">
         
         <DropdownItem key="profile" className="h-14 gap-2 text-moon-300">
            <p className="font-semibold">{"لينا سامر"}</p>
              <p className="font-normal opacity-50">{"info@minimoon.com"}</p>
          
            </DropdownItem>
            <DropdownItem showDivider onClick={()=>{router.push("/user")}} className=" text-lg border-b-1.5  py-2   border-moon-300/30 rounded-none " 
            startContent={<FaUserAlt/>} key="settings"><span className="text-lg font-bold " >الملف الشخصي</span>
              
              </DropdownItem>
            <DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaHome/>} key="team_settings "> <span className="text-lg font-bold "  >  الرئيسية  </span> </DropdownItem>
{/* 
<DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaFemale/>} key="team_settings "> <span className="text-lg font-bold "  >  ملابس نسائية </span> </DropdownItem> */}


{props.cat&&props.cat.map(ct=>(
<DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaCircleDot/>} key="team_settings "> <span className="text-lg font-bold "  >   {ct.name_ar} </span> </DropdownItem>
    ))}


{/* 



<DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaBabyCarriage/>} key="team_settings "> <span className="text-lg font-bold "  >  ملابس البيبي </span> </DropdownItem> */}


<DropdownItem onClick={()=>{console.log(props.cat)}} className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaInfoCircle/>} key="team_settings "> <span className="text-lg font-bold "  >   من نحن </span> </DropdownItem>



<DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaPhoneAlt/>} key="team_settings "> <span className="text-lg font-bold "  >   إتصل بنا </span> </DropdownItem>


<DropdownItem className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaGlobeAsia/>} key="team_settings "> <span className="text-lg font-bold "  > السعودية (ر.س),  العربية   </span> </DropdownItem>
        
            <DropdownItem  startContent={<FaPowerOff/>} onClick={()=>{logoutUser();}} key="logout"  className="text-gray-600 floa py-2 mt-4" >
        <span className="text-md font-bold  "  > تسجيل خروج </span>       
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

<Logowhite style={{cursor:"pointer",marginRight:10}}  onClick={() => {
                          router.push("/");
                        }} width={100} />


</div>











<div style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
{/* <div>

<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
><Button 
          variant="bordered" 
          startContent={<div> <MdTranslate/> </div>}
          className="capitalize text-white"
        >
          {selectedValue}
        </Button></motion.div>


</div> */}






<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>



{logindata&&logindata?<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="حسابي" >
<Button onClick={()=>{router.push("/user")}} isIconOnly className="bg-gradient-to-tr from-white to-white/65 
text-2xl font-black          text-moon-300/80 mx-0 rounded-lg " size="lg"    aria-label="Like">               
        <FaUserCircle  />
      </Button>    


</Tooltip>
</motion.div>:<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="تسجيل دخول" >
<Button onClick={()=>{router.push("/login")}}  className="bg-gradient-to-tr from-moonsec-100/40   to-moonsec-100
text-xs font-medium         text-white mx-1 rounded-md " size="sm"    aria-label="Like">               
     تسجيل دخول
      </Button>    


</Tooltip>
</motion.div>}



<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300  py-2 px-5 text-moon-200" content=" بحث " >
<Button onClick={()=>{props.openFav(true)}} isIconOnly className="bg-gradient-to-tr from-white to-white/65 
text-xl           text-moon-300/80 mx-0 rounded-lg " size="lg"    aria-label="Like">               
        <FaSearch  />
      </Button>    


</Tooltip>
</motion.div>



<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Badge size="md" content={count} placement="top-left" showOutline={false} variant="flat" color="primary" className="flex bg-moon-200
 text-white  align-middle justify-center">
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="السلة">
<Button onClick={()=>{props.openCart(true)}} isIconOnly className="  bg-gradient-to-tr from-white
 to-white/65 text-3xl text-moon-300/70  rounded-lg mx-0" size="md"  aria-label="Like">               
        <MdOutlineShoppingBag  />
      </Button>  
    </Tooltip> 
</Badge>
</motion.div>







     
        


</div>



</div>






</div>






    <Navbar position="sticky" isBordered={true} >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        
     
        
        </NavbarBrand>
      
 
        <NavbarContent className="flex gap-3">

        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center  content-between w-1/2  " justify="end">

       
     
      </NavbarContent>
    </Navbar>
    </>

  );
}
