"use client";
import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsCheckCircleFill } from "react-icons/bs";
import { useThemeContext } from "../../context/store";
import { deleteCookie } from "cookies-next";
import { Skeleton } from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { getPersianDate } from "../utils/ShowTime";
import { AiFillCaretDown } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
const Clock = dynamic(() => import("react-live-clock"), { ssr: false });

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();
  const { islogin, isloading, setIslogin, userdata } = useThemeContext();
  const pathname = usePathname();
  const [urldata, setUrldata] = useState("");
  const [flagnav, setFlagnav] = useState({
    freqest: false,
    faddress: false,
    freviow: false,
  });
  useEffect(() => {
    const url = `${pathname}`;
    setUrldata(() => {
      if (url.split("/")[2]) {
        return url.split("/")[2];
      } else {
        return null;
      }
    });
    setFlagnav(() => {
      if (url.split("/")[2] === "requst") {
        return { freqest: true, faddress: false, freviow: false };
      } else if (url.split("/")[2] === "address") {
        return { freqest: true, faddress: true, freviow: false };
      } else if (url.split("/")[2] === "OrderReview") {
        return { freqest: true, faddress: true, freviow: true };
      }
    });
  }, [pathname]);
  return (
    <div>
      {/* start nav */}
      <nav className="shadow-md z-40 bg-white w-full p-1 fixed top-0 left-0 right-0 flex justify-between">
        <div className="flex justify-between items-center">
          <Image
            src="/image_dashboard/rayanlogo.svg"
            width={124}
            height={24}
            alt="logo"
            priority
            className="xl:w-[124px] w-[110px] mr-4 ml-2"
          />
          <ul className="mr-4 p-2">
            <li
              className={`inline-block p-2  text-colorgray ${
                flagnav.freqest ? "!text-[black] font-bold p-2" : ""
              }`}
            >
              {flagnav.faddress ? (
                <BsCheckCircleFill className="inline-block ml-1 text-base" />
              ) : (
                ""
              )}
              ثبت درخواست <FaAngleLeft className="inline-block mx-6 " />
            </li>
            <li
              className={`inline-block text-colorgray p-2 ${
                flagnav.faddress ? "!text-[black] font-bold" : ""
              }`}
            >
              {flagnav.freviow ? (
                <BsCheckCircleFill className="inline-block ml-1 text-base" />
              ) : (
                ""
              )}
              جمع آوری و توزیع <FaAngleLeft className="inline-block mx-6" />
            </li>
            <li
              className={`inline-block text-colorgray p-2 ${
                flagnav.freviow ? "!text-[black] font-bold" : ""
              }`}
            >
              بازبینی سفارش <FaAngleLeft className="inline-block mx-6" />
            </li>
            <li className="inline-block text-colorgray p-2">پرداخت</li>
          </ul>
        </div>
        {/* start:clock */}
        {/* <time  className="ml-10 mt-2 px-3 py-2 rounded-sm  w-[270px] h-[40px] bg-[#EA0034] text-white"><FaRegClock className='inline-block ml-2' />{isClient?getPersianDate():""} -<Clock className='mr-2' format={'HH:mm:ss'} ticking={true}/></time> */}
        {/* end:clock */}
        {/* start: navbar left  */}
        <div className="lg:flex lg:items-center lg:justify-end hidden">
          <div className="mx-2">
            <Image
              src="/image_dashboard/news.svg"
              width={20}
              height={20}
              alt="logo"
              priority
            />
          </div>
          <div className="mx-2">
            <Image
              src="/image_dashboard/qustion.svg"
              width={20}
              height={20}
              alt="logo"
              priority
            />
          </div>
          <div className="mx-2">
            <Image
              src="/image_dashboard/setting.svg"
              width={20}
              height={20}
              alt="logo"
              priority
            />
          </div>
          {islogin?
           <div className="mr-2 ml-[30px]">
           <Dropdown>
             <DropdownTrigger>
               {userdata && userdata.flag ? (
                 <div className="xl:text-[16px] text-[12px] border-2 border-bgcolor border-solid px-2 py-2 rounded-[5px] text-bgcolor cursor-pointer">
                   {`${userdata.first_name || userdata.company_name}`}{" "}
                   <AiFillCaretDown className="inline-block" />
                 </div>
               ) : (
                 
                   <Image
                   src="/image_dashboard/user.svg"
                   width={32}
                   height={32}
                   alt="logo"
                   className="inline-block"
                   priority
                 />
                
               )}
             </DropdownTrigger>
             <DropdownMenu className="">
               <DropdownItem
                className="py-3"
                onClick={() => {
                 router.push("/dashboard");
                
               }}
                >
                 <MdOutlineDashboard className="inline text-2xl ml-4" />
                 داشبورد
               </DropdownItem>
               <DropdownItem className="py-3">
                 <FaRegUser className="inline text-2xl ml-4" />
                 {userdata && userdata.username}
               </DropdownItem>
               <DropdownItem
                 className="text-[red] py-2 "
                 onClick={() => {
                   deleteCookie("access_token");
                   router.push("/");
                   setIslogin(false);
                 }}
               >
                 <MdLogout className="inline-block text-2xl ml-4" />
                 خروج
               </DropdownItem>
             </DropdownMenu>
           </Dropdown>
         </div>
          :<Link  href="/auth/login"   className="hover:bg-dashboard p-2 cursor-pointer rounded-[8px]">
          <Image
          src="/image_dashboard/user.svg"
          width={32}
          height={32}
          alt="logo"
          className="inline-block"
          priority
        />
        <span className="inline-block pr-2">ورود</span>
        </Link>}
         
        </div>
        {/* end: navbar left  */}
      </nav>
      {/* end nav */}
    </div>
  );
};
export default Navbar;
