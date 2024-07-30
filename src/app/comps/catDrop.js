import React from 'react'
import MegaMenu from './megaMenu';
import redem from "../../../public/logoblack.svg";
import Image from 'next/image';
import { FaVest } from 'react-icons/fa6';
import {Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
function CatDrop(props) {
  return (
   
    <Dropdown>
    <DropdownTrigger>
      <Button
      
        className=" min-w-32  rounded mx-1  bg-gradient-to-tr from-moon-100 to-moon-100/80  text-moon-300/80  font-semibold  tracking-tight  data-[hover=true]:bg-white"
        endContent={ <div ><FaVest/></div> }
      
        size="sm"
        variant="shadow"
      >
       {props.lable?props.lable:"ملابس نسائية"}
      </Button>
    </DropdownTrigger>

  <DropdownMenu
    aria-label="ACME features"
    // className="  bg-[url('../../public/amblemblack.svg')]"
   style={{backgroundSize:20}}
    itemClasses={{
      base: "gap-4",
    }}
  >
    <DropdownItem
      key="autoscaling"
      variant="flat"
      description={<MegaMenu cat={props.lable} data={props.data} />}
      startContent={<redem width={40} height={40} />}
    >
     
    </DropdownItem>

  
  </DropdownMenu>
</Dropdown>

  )
}

export default CatDrop