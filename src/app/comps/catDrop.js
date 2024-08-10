import React from 'react'
import MegaMenu from './megaMenu';
import redem from "../../../public/logoblack.svg";
import Image from 'next/image';
import { FaCircleDot, FaVest } from 'react-icons/fa6';
import {Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
function CatDrop(props) {
  return (
   
    <Dropdown>
    <DropdownTrigger>
      <Button
      
        className=" font-medium min-w-36 hover:shadow-md transition-shadow"
        endContent={ <div className='text-moon-200' ><FaCircleDot/></div> }
      
        size="lg"
        variant="flat"
      >
       {props.lable?props.lable:"ملابس نسائية"}
      </Button>
    </DropdownTrigger>

  <DropdownMenu
    aria-label="ACME features"
    className="  "

    itemClasses={{
      base: "gap-1 bg-gradient-to-b from-moon-100/10 to-moon-100/5  ",
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