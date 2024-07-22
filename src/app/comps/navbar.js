import React from "react";
import { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, Button,NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import Image from "next/image.js";
import { Badge } from "@nextui-org/react";
import { MdTranslate } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaVest } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/react";
import { FaHeart } from "react-icons/fa6";
import redem from "../../../public/amblemred.svg"
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./icons";
import MegaMenu from "./megaMenu";
import Logowhite from "../../../public/logo.svg";
export default function NavbarC(props) {


    const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
    const router = useRouter();
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  

  return (

<>
<div style={{float:"right",width:"100%",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
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

<Logowhite style={{cursor:"pointer"}}  onClick={() => {
                          router.push("/");
                        }} width={100} />
{/* <Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      /> */}
<div style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
<div>

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

{/* 
<Dropdown>
      <DropdownTrigger>
      <Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="اللغة">
        <Button 
          variant="bordered" 
          startContent={<div> <MdTranslate/> </div>}
          className="capitalize text-white"
        >
          {selectedValue}
        </Button>
        </Tooltip>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={null}
      >
        <DropdownItem key="العربية">العربية</DropdownItem>
        <DropdownItem key="English">English</DropdownItem>
        <DropdownItem key="Chinese">Chinese</DropdownItem>
        <DropdownItem key="French">French</DropdownItem>
      </DropdownMenu>
    </Dropdown> */}

</div>

<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Badge size="lg" content="0" placement="top-right" showOutline={false} variant="flat" color="primary" className="flex bg-moonsec-100 text-white  align-middle justify-center">
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="My Cart">
<Button onClick={()=>{props.openCart(true)}} isIconOnly className="bg-white text-xl text-moon-200  rounded-lg mx-1" size="lg" variant="shadow"  aria-label="Like">               
        <FaCartShopping  />
      </Button>  
    </Tooltip> 
</Badge>
</motion.div>


<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="My Likes" >
<Button onClick={()=>{props.openFav(true)}} isIconOnly className="bg-white text-xl text-moon-200 mx-1 rounded-lg " size="lg"  variant="shadow"   aria-label="Like">               
        <FaHeart  />
      </Button>    


</Tooltip>
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
