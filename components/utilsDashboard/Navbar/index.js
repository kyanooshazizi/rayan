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
import { FaHome } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import {MethodFlagHandler,MethodFlagHandlerAddress} from "../../utilsorder/utils/MethodFlagHandler";

const Navbar = () => {

  const dataAddress = useSelector((state) => state.order.address);
  const datastore = useSelector((state) => state.order.order);
   const { setIslogin,userdata} = useThemeContext();
  const router=useRouter();
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
        {/* start nav */}
      <nav className="shadow-md  bg-white w-full px-[24px] py-[8px] sticky top-0 flex justify-between align-middle min-h-[48px] z-40">
        <div className="mr-4 flex justify-between align-middle">
        <div>
        <Image
      src="/logoRayan.png"
      width={80}
      height={80}
      alt="Picture of the author"
      priority
    />
        </div>
         <div className="mt-1">
        <Dropdown>
      <DropdownTrigger>
        {userdata&&userdata.flag? <div className="mr-10 border-2 border-bgcolor border-solid px-2 py-2 mt-1 rounded-sm text-bgcolor cursor-pointer">{`${userdata.first_name||userdata.company_name} ${userdata.last_name}`} <AiFillCaretDown className="inline-block"/></div>:<Avatar showFallback className="mr-10" />}
      </DropdownTrigger>
      <DropdownMenu>
          <DropdownItem className="py-3">
         {userdata&&userdata.username}
          </DropdownItem>
          <DropdownItem className="text-[red] py-2" onClick={()=>{
              deleteCookie("access_token");
              router.push("/")
              setIslogin(false)
          }
            }>
            خروج <MdLogout  className="inline-block text-2xl mr-4"/>
         
          </DropdownItem>
      </DropdownMenu>
       </Dropdown>
        </div>
       
        </div>
        {/* start:icon home&requste */}
        <div className="flex justify-between align-middle">
        <div className="relative cursor-pointer" onClick={()=>{
        if(MethodFlagHandler(datastore)&&!MethodFlagHandlerAddress(dataAddress)){
          router.push("/order/requst")
        }else if(MethodFlagHandler(datastore)&&MethodFlagHandlerAddress(dataAddress)){
          router.push("/order/address")
        }else{
          router.push("/order/requst")
        }
          
          }}>
        <MdShoppingCart className="ml-10 mt-4 text-3xl text-bgcolor" />
        
        {datastore.pick_up&&datastore.delivery&&datastore.service&&isClient? <span className="absolute bg-utils-300 text-txcolor p-1 rounded-full text-sm -top-[2px] left-[65px]">1+</span>:"" }
        </div>
        <div className="cursor-pointer" onClick={()=>{
          router.push("/")
          }}>
        <FaHome className="ml-6 mt-4 text-3xl text-bgcolor"/>
        </div>
        </div>
        {/* start:icon home&requste */}
      </nav>
      {/* end nav */}
    </div>
  )
}
export default Navbar;
