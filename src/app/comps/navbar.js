import React from "react";
import { useState,useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, Button, DropdownItem, DropdownTrigger, 
  Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { MdMenu, MdOutlineShoppingBag } from "react-icons/md";
import { useRouter } from "next/navigation";
import {  FaHome, FaUserCircle } from "react-icons/fa";
import { FaSearch,FaListAlt,FaCogs,FaPowerOff } from "react-icons/fa";
import {  FaCircleDot } from "react-icons/fa6";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { Tooltip } from "@nextui-org/react";
import { FaHeart } from "react-icons/fa6";

import Logowhite from "../../../public/logored.svg";


export default function NavbarC(props) {

  const ls = require("local-storage");
  const userData = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const cartData = useSelector((state) => state.root.cart.data.length)


useEffect(() => {

//loginval();

 
}, [])

const handleSearch = ()=>{
props.setSearchTog(!props.searchTog)
}


const handleAccount=(type)=>{

  switch(type){
    case 1:
      router.push("/admin")
      break;

      case 4:
      router.push("/user")
      break;


      case 5:
      router.push("/delivery")
      break;

      default:
        router.push("/")
        break;
  }

}



    const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));
   const [count,setCount] = useState(0);
    const [logindata,setLogindata] = useState(null)


    const router = useRouter();
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  


  


  



  return (

<>
<div className="pt-4" style={{float:"right",maxWidth:"100vw",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
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


<Dropdown    className=" bg-white/90 backdrop-blur-sm " placement="bottom-start"> 
          <DropdownTrigger>
   
          <div className=" block sm:block lg:hidden md:hidden text-3xl mr-0.5  text-moon-300/70" > 
<MdMenu/>
</div>
   
          </DropdownTrigger>


          <DropdownMenu  style={{backgroundColor:"rgba(255,255,255,0.0)"}} aria-label="Profile Actions "
           className=" min-w-80  text-moon-200  py-2 px-4    "
           dir="rtl" variant="shadow">
         
    
      


            <DropdownItem onClick={()=>{router.push("/")}}  textValue="home" className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaHome/>} key="team_settings "> <span className="text-lg font-bold "  >  الرئيسية  </span> </DropdownItem>





  
<DropdownItem textValue="cats" onClick={()=>{}} className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
           key="team_settings "> 
            
          


            {props.cat&&props.cat.map((ct,index)=>(
<div key={index} >

<div className="font-bold my-1 text-lg" >
  {ct.name_ar}
</div>

<div className="mr-2 text-moon-300/50">

{ct.catagories&&ct.catagories.map((cat,ind)=>(
  <a  key={ind} href={`/categories?cid=${cat.id}`}>

<div className="flex my-1 justify-start items-center" >
<div className="ml-2 text-moon-200">
  <FaCircleDot/>
</div>

<div className="text-base font-bold" >
{cat.name_ar}
</div>

</div>

  </a>


))}

</div>




</div>

))}


                  
          
          


              
              
              
              </DropdownItem>

              <DropdownItem textValue="home" className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaUserCircle/>} key="team_settings "> <span className="text-lg font-bold "  >  حسابي  </span> </DropdownItem>
         
          <DropdownItem textValue="home" className=" text-lg border-b-1.5 py-2  border-moon-300/30 rounded-none " 
            startContent={<FaHeart/>} key="team_settings "> <span className="text-lg font-bold "  >  المفضلة  </span> </DropdownItem>


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






<div className="space-x-2" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>



{userData&&!userData.error&&userData?<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="حسابي" >
<Button onClick={()=>{handleAccount(userData&&userData.data.user.type)}}
 isIconOnly className="bg-gradient-to-tr from-moon-200/60  to-moon-200/20 
text-2xl font-black          text-gray-600 mx-0 rounded-full " size="md"    aria-label="Like">               
        <FaUserCircle  />
      </Button>    


</Tooltip>
</motion.div>:<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="تسجيل دخول" >
<Button onClick={()=>{router.push("/login")}}  className="bg-gradient-to-tr from-moonsec-100/40    to-moonsec-100 text-xs font-mediumtext-white mx-1 rounded-md " size="sm"    aria-label="Like">               
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
<Button onClick={()=>{ handleSearch() }} isIconOnly className={`${props.searchTog?"bg-moonsec-100 text-white":" text-gray-600 bg-gradient-to-tr from-moon-200/60  to-moon-200/20"}  
text-xl     transition-colors       mx-0 rounded-full `} size="md"    aria-label="Like">               
        <FaSearch  />
      </Button>    


</Tooltip>
</motion.div>




{
  userData&&!userData.error?
  <motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Tooltip className="bg-moon-300  py-2 px-5 text-moon-200" content=" المفضلة " >
<Button onClick={()=>{props.openFav(true)}} isIconOnly className="bg-gradient-to-tr from-moon-200/60  to-moon-200/20 
text-xl           text-gray-600 mx-0 rounded-full " size="md"    aria-label="Like">               
        <FaHeart  />
      </Button>    


</Tooltip>
</motion.div>:<></>
}






<motion.div 
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
<Badge size="md" content={cartData} placement="top-left" showOutline={false} variant="flat" color="primary" className="flex bg-moon-200
 text-white  align-middle justify-center">
<Tooltip className="bg-moon-300 font-medium py-2 px-5 text-moon-200" content="السلة">
<Button onClick={()=>{props.openCart(true)}} isIconOnly className="  bg-gradient-to-tr from-moon-200/60  to-moon-200/20
 text-3xl text-gray-600  rounded-full mx-0" size="md"  aria-label="Like">               
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
