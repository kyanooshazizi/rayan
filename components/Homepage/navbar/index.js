"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";
import { GoChevronDown } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {deleteCookie } from 'cookies-next';
import React from "react";
import {Skeleton} from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
// nav mobile
import Nav_mobile from "../navbar_mobile";
import { useThemeContext } from '../../context/store';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
const Resnav = () => {
  const { username, islogin,setIslogin,isloading,userdata} = useThemeContext();
  const [iconstate, setIconstate] = useState("true");
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const Navmobile = () => {
    setIconstate((prevstate) => {
      return !prevstate;
    });
  };

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
    // console.log(clientWindowHeight)
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <Nav_mobile isOpen={iconstate} toggle={Navmobile} />
      <nav className={`${styles.nav_header} ${clientWindowHeight>0? "bg-white text-txnotcolor mt-0 z-50":"text-txcolor mt-5"}`} id="nav_menu">
        <div className={styles.nav_right}>
          <div className="p-3">
            <Image
              src="/logoRayan.png"
              alt="logo"
              width={100}
              height={100}
              className="rounded-xl hidden md:block"
              priority={true}
            />
          </div>
          {/* icon for mobile start */}
          <div className="blok md:hidden text-2xl" onClick={Navmobile}>
            {iconstate ? <TiThMenu /> : <MdOutlineClose />}
          </div>
          {/* icon for mobil end */}
          <div className="hidden md:block">
            <ul className={`${styles.nav_header_ul}`}>
              <li>
                <Link href={"/service"}>
                  {" "}
                  <span>خدمات</span>
                  <GoChevronDown />
                </Link>
              </li>
              <li>
                <Link href={"/Support"}>
                  <span>پشتیبانی</span>
                </Link>
              </li>
              <li>
                <Link href={"/about"}>
                  {" "}
                  <span>درباره ما</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {isloading?<Skeleton className="h-12 w-32 ml-3 rounded-md"/> :(islogin?<Dropdown>
        <DropdownTrigger>
          {userdata&&userdata.flag? <div className="ml-6 text-base border-1 border-utils-300 py-2 px-3 border-solid rounded-sm hover:text-bgcolor hover:bg-white cursor-pointer transition-all">{`${userdata.first_name||userdata.company_name} ${userdata.last_name}`} <AiFillCaretDown className="inline-block "/></div>:<div  className="group p-3 bg-utils-300 shadow-[-4px_3px_5px_1px_bgcolor] rounded-full hover:bg-txcolor hover:transition-all duration-500 hover:duration-300 font-bold  md:text-base cursor-pointer ml-10 ">
          <FaUserAlt className="text-txcolor group-hover:text-utils-300 text-2xl " />
        </div>}
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="">
          <DropdownItem >
          <Link href="/dashboard">
            <div className="text-bgcolor py-4 ">
              <span className="pr-2"><FaUserAlt className="inline text-md ml-3 text-bgcolor"/>مشاهده حساب کاربری</span>
              <MdOutlineKeyboardDoubleArrowLeft  className="inline mr-4 font-bold text-lg"/>
            </div>
          </Link>
          </DropdownItem>
          <DropdownItem className="text-danger">
          <button onClick={()=>
            {deleteCookie("access_token");
            setIslogin(false)}} className="text-[red] py-4">
              <span className="pr-2"><TbLogout className="inline text-lg ml-3"/>خروج از حساب کاربری</span>
            </button>
         
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>:<div className="p-3">       
            <button className="p-3 bg-utils-300 shadow-[-4px_3px_5px_1px_bgcolor] rounded-md hover:bg-utils-300 text-txcolor hover:transition-all hover:duration-300 font-bold flex text-xs md:text-base">
              <span><Link href="/auth/login" className="hover:text-[blue]">ورود</Link>|<Link href="/auth/register" className="hover:text-[blue]">عضویت</Link></span>
              <IoMdLogIn className="text-sm md:text-2xl " />
            </button>
        </div>)}
        
      </nav>
    </>
  );
};

export default Resnav;