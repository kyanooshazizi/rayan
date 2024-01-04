"use client"
import {Avatar} from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import Image from 'next/image';
import { MdShoppingCart } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import {deleteCookie } from 'cookies-next';
import { useThemeContext } from '../../context/store';
const Navbar = ({data}) => {
   const { setIslogin} = useThemeContext();
  const router=useRouter();
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  const datastore = useSelector((state) => state.order.order);
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
         {data.username}
          </DropdownItem>
          <DropdownItem className="text-[red]">
            <button onClick={()=>{
              setIslogin(false)
            deleteCookie("access_token");
            router.push("/")
          }
            }>

            خروج <MdLogout  className="inline-block text-2xl mr-4"/>
            </button>
          </DropdownItem>
      </DropdownMenu>
       </Dropdown>
        </div>
        </div>
        <div className="relative cursor-pointer" onClick={()=>{router.push("/order/requst")}}>
        <MdShoppingCart className="ml-6 mt-4 text-4xl text-bgcolor" />
        
        {datastore.pick_up&&datastore.delivery&&datastore.service&&isClient? <span className="absolute bg-utils-300 text-txcolor p-1 rounded-full text-sm bottom-[33px] left-[55px]">1+</span>:"" }
        </div>
      </nav>
      {/* end nav */}
    </div>
  )
}
export default Navbar;
