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
      
        className=" min-w-32  mx-1 bg-moon-100  text-moon-300  font-medium  data-[hover=true]:bg-white"
        endContent={ <div ><FaVest/></div> }
        radius="sm"
        size="sm"
        variant="shadow"
      >
       {props.lable?props.lable:"ملابس نسائية"}
      </Button>
    </DropdownTrigger>

  <DropdownMenu
    aria-label="ACME features"
    className=""
    itemClasses={{
      base: "gap-4",
    }}
  >
    <DropdownItem
      key="autoscaling"
      variant="flat"
      description={<MegaMenu/>}
      startContent={<redem width={40} height={40} />}
    >
     
    </DropdownItem>

  
  </DropdownMenu>
</Dropdown>

  )
}

export default CatDrop