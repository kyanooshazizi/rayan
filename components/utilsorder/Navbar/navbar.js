"use client";
import React ,{useState,useEffect} from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { BsCheckCircleFill } from "react-icons/bs";
import { useThemeContext } from '../../context/store';
import {deleteCookie } from 'cookies-next';
import {Skeleton} from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";
import {getPersianDate} from "../utils/ShowTime";
import { AiFillCaretDown } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import Clock from 'react-live-clock';
const Navbar = () => {
  const router=useRouter()
  const { islogin,isloading,setIslogin,userdata} = useThemeContext();
  const pathname = usePathname()
  const [urldata,setUrldata]=useState("");
  const [flagnav,setFlagnav]=useState({freqest:false,faddress:false,freviow:false})
  useEffect(() => {
    const url = `${pathname}`;
    setUrldata(()=>{
      if(url.split("/")[2]){
        return url.split("/")[2]
      }else{
        return null;
      }
    });
    setFlagnav(()=>{
      if(url.split("/")[2]==="requst"){
            return {freqest:true,faddress:false,freviow:false}
      }else if(url.split("/")[2]==="address"){
            return {freqest:true,faddress:true,freviow:false} 
      }else if(url.split("/")[2]==="OrderReview"){
        return {freqest:true,faddress:true,freviow:true} 
      }
    }
    );
  }, [pathname])
  return (
    <div>
        {/* start nav */}
      <nav className="shadow-md z-40 bg-white w-full p-1 fixed top-0 left-0 right-0 flex justify-between">
        <ul className="mr-4 p-2">
          <li className={`inline-block p-1 ${(flagnav.freqest)?"text-navbarrequst font-bold p-2":""}`}>
           {flagnav.faddress?<BsCheckCircleFill className='inline-block ml-1 text-base'/>:""}
            ثبت درخواست <FaAngleLeft className="inline-block" />
          </li>
          <li className={`inline-block p-2 ${(flagnav.faddress)?"text-navbarrequst font-bold":""}`}>
          {flagnav.freviow?<BsCheckCircleFill className='inline-block ml-1 text-base'/>:""}
            اطلاعات فرستنده و گیرنده <FaAngleLeft className="inline-block" />
          </li>
          <li className={`inline-block p-2 ${(flagnav.freviow)?"text-navbarrequst font-bold":""}`}>
            
            بازبینی سفارش <FaAngleLeft className="inline-block" />
          </li>
          <li className="inline-block p-2">پرداخت <FaAngleLeft className="inline-block" /></li>
          <li className="inline-block p-2">نهایی سازی سفارش</li>
        </ul>
      {/* start:clock */}
      <span className="ml-10 mt-2 px-3 py-2 rounded-sm  w-[270px] h-[40px] bg-[#EA0034] text-white"><FaRegClock className='inline-block ml-2' />{getPersianDate()} -<Clock className='mr-2' format={'HH:mm:ss'} ticking={true}/></span>
      {/* end:clock */}
        <div className='flex justify-between'>
        {isloading?<Skeleton className="h-10 w-16 ml-4 mt-2 rounded-md"/>:(islogin?<Dropdown>
        <DropdownTrigger>
      {userdata&&userdata.flag?  <div  className="font-bold  md:text-base cursor-pointer ml-4 mt-2 bg-utils-300 text-txcolor px-3 py-1 rounded h-[40px] ">
         {`${userdata.first_name||userdata.company_name} ${userdata.last_name}`} <AiFillCaretDown className='inline-block' />
        </div>:<div  className="font-bold  md:text-base cursor-pointer ml-8 mt-3">
          <FaUserAlt className="text-utils-300 text-2xl " />
        </div>}
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="">
          <DropdownItem>
          <Link href="/dashboard" className='py-4 inline-block'>
            <div className="text-bgcolor ">
              <span className="pr-2"><FaUserAlt className="inline text-md ml-3 text-bgcolor"/>مشاهده حساب کاربری</span>
              <MdOutlineKeyboardDoubleArrowLeft  className="inline mr-4 font-bold text-lg"/>
            </div>
          </Link>
          </DropdownItem>
          <DropdownItem className="text-danger">
          <button onClick={()=>
            {deleteCookie("access_token");
            setIslogin(false);
            router.replace("/");
            
            }} className="text-[red] py-3">
              <span className="pr-2"><TbLogout className="inline text-lg ml-3"/>خروج از حساب کاربری</span>
            </button>
         
          </DropdownItem> 
        </DropdownMenu>
      </Dropdown>: 
        <Link href="/auth/login">
       <button className="p-2 bg-utils-300 text-txcolor shadow-[-4px_3px_5px_1px_#utils-300] rounded-md hover:bg-utils-300 hover:transition-all hover:duration-300 font-bold flex text-md md:text-base mt-2 ml-4">
          <span> ورود </span>
            <IoMdLogIn className="text-sm md:text-2xl " />
          </button> </Link>)}
          <div className="cursor-pointer" onClick={()=>{router.push("/")}}>
        <FaHome className="mx-6 mt-2 text-3xl text-utils-300"/>
        </div>
        </div>
          
       
      </nav>
      {/* end nav */}
    </div>
  )
}
export default Navbar;