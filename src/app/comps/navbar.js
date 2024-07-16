import React from "react";
import { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, Button,NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import Image from "next/image.js";
import { MdTranslate } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaVest } from "react-icons/fa6";
import redem from "../../../public/amblemred.svg"
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from "./icons";
import MegaMenu from "./megaMenu";
import logowhite from "../../../public/logo.svg";
export default function NavbarC() {


    const [selectedKeys, setSelectedKeys] = useState(new Set(["English"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
      };

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


<Image
                        onClick={() => {
                          router.push("/");
                        }}
                        src={logowhite}
                        alt="My SVG"
                        width={100}
                      />

<Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          startContent={<div> <MdTranslate/> </div>}
          className="capitalize text-white"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="العربية">العربية</DropdownItem>
        <DropdownItem key="English">English</DropdownItem>
        <DropdownItem key="Chinese">Chinese</DropdownItem>
        <DropdownItem key="French">French</DropdownItem>
      </DropdownMenu>
    </Dropdown>





</div>


{/* <div style={{width:"100%",display:"flex"}} >
    <div className=" flex-row sm:flex-col lg:flex-row md:flex-row   flex " >
<div>a</div>
<div>b</div>
    </div>
</div> */}



    <Navbar position="sticky" isBordered={true} >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        
     
        
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="shadow"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
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
              startContent={<Image src={redem} height={40} width={40} />}
            >
             
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>


        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>



        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>



        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>



        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>


        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
              
                className=" bg-moon-100 text-moon-300  font-medium  data-[hover=true]:bg-white"
                endContent={ <div ><FaVest/></div> }
                radius="sm"
                size="sm"
                variant="bordered"
              >
                Pants
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              variant="flat"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>

          
          </DropdownMenu>
        </Dropdown>

   
       
       
      
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center  content-between w-1/2  " justify="end">
     <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"}} >
        <div style={{width:"100%",marginRight:"5px"}}>
        <Input
          classNames={{
            base: " h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
          }}
          placeholder="Search Minimoon..."
          size="sm"
          startContent={<FaSearch style={{marginRight:5}} size={18} />}
          type="search"
        />
        </div>
 


<Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="../../img/default.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
     </div>
       
     
      </NavbarContent>
    </Navbar>
    </>

  );
}
