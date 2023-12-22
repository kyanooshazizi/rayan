"use client"
import {Avatar} from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import Image from 'next/image';
import { MdShoppingCart } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
 const Navbar = () => {
 
  return (
    <div>
        {/* start nav */}
      <nav className="shadow-md  bg-white w-full p-1 fixed top-0 flex justify-between z-40">
        <div className="mr-4 p-2 flex justify-between align-middle w-[180px]">
        <div>
        <Image
      src="/logoRayan.png"
      width={80}
      height={80}
      alt="Picture of the author"
      priority
    />
        </div>
        <div>
        <Dropdown>
      <DropdownTrigger>
      <Avatar showFallback />
     
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem>
          Kyanoosh.azizi@yahoo.com
          </DropdownItem>
          <DropdownItem>
           حساب کاربری
          </DropdownItem>
          <DropdownItem className="text-[red]">
            خروج <MdLogout  className="inline-block text-2xl mr-4"/>
          </DropdownItem>
      </DropdownMenu>
       </Dropdown>
        </div>
        </div>
        <div className="relative">
        <MdShoppingCart className="ml-6 mt-4 text-4xl text-bgcolor" />
        <span className="absolute bg-utils-300 text-txcolor p-1 rounded-full text-sm bottom-[33px] left-[55px]">3+</span>
        </div>
      </nav>
      {/* end nav */}
    </div>
  )
}
export default Navbar;
