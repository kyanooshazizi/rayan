"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { deleteCookie } from "cookies-next";
import React from "react";
import { Skeleton } from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { useThemeContext } from "../../context/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
const Resnav = () => {
  const {
    username,
    islogin,
    setIslogin,
    isloading,
    userdata,
    toggle,
    setToggle,
  } = useThemeContext();
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const handleScroll = () => {
    setClientWindowHeight(document.documentElement.scrollTop);
    // console.log(clientWindowHeight)
  };
 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  return (
    <>
      <nav
        className={`h-[80px] ${styles.nav_header} ${
          clientWindowHeight > 0
            ? "bg-bgcolor_hover text-white z-50"
            : "bg-bgcolor text-txcolor mt-5"
        } ${toggle ? "text-txcolor" : "text-txnotcolor bg-dashboard"} `}
        id="nav_menu"
      >
        {/* start:show size for mobile  */}

        <div className={`flex justify-around items-center lg:hidden`}>
          <div
            className="  text-2xl sm:px-6 px-4"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            {toggle ? <TiThMenu /> : <MdOutlineClose />}
          </div>
          <div className="sm:px-1">
            {isloading ? (
              <Skeleton className="h-[38px] w-28 ml-3 rounded hidden md:block" />
            ) : islogin ? (
              <Dropdown>
                <DropdownTrigger>
                  {userdata && userdata.flag ? (
                    <div className="ml-6 lg:text-base sm:text-[14px] text-[12px] border-1 border-utils-300 py-[5px] px-2 border-solid rounded-sm hover:text-bgcolor hover:bg-white cursor-pointer transition-all hidden md:block">
                      {`${userdata.first_name || userdata.company_name} ${
                        userdata.last_name
                      }`}{" "}
                      <AiFillCaretDown className="inline-block " />
                    </div>
                  ) : (
                    <div>
                      <FaUserCircle className="text-3xl hidden md:block" />
                    </div>
                  )}
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="">
                  <DropdownItem>
                    <Link href="/dashboard">
                      <div className="text-bgcolor md:py-4 py-2">
                        <span className="pr-2">
                          <FaUserAlt className="inline lg:text-md md:text-[16px] text-[12px] ml-3 text-bgcolor" />
                          مشاهده حساب کاربری
                        </span>
                        <MdOutlineKeyboardDoubleArrowLeft className="inline mr-4 font-bold lg:text-lg text-base" />
                      </div>
                    </Link>
                  </DropdownItem>
                  <DropdownItem className="text-danger">
                    <button
                      onClick={() => {
                        deleteCookie("access_token");
                        setIslogin(false);
                      }}
                      className="text-[red] md:py-4 py-2"
                    >
                      <span className="pr-2 lg:text-md md:text-[16px] text-[12px]">
                        <TbLogout className="inline lg:text-lg text-base ml-3" />
                        خروج از حساب کاربری
                      </span>
                    </button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="sm:p-3 p-0">
                <button
                  className={`text-[16px] hover:bg-bgcolor_hover py-2 px-3 rounded ${
                    toggle ? "bg-bgcolor_hover" : "bg-slate-200"
                  }  sm:bg-none`}
                >
                  <FaUserCircle className="sm:inline-block text-2xl hidden" />
                  <span>
                    <Link href="/auth/login" className="px-2">
                      ورود
                    </Link>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden px-4">
          <Image
            src={`${
              toggle
                ? "/imag_homepage/logoRayan.svg"
                : "/imag_homepage/logoRayan1.svg"
            }`}
            alt="logo"
            width={90}
            height={24}
            className="mr-[40px]"
            priority={true}
          />
        </div>
        {/* end:show size for mobile  */}
        {/* start:nav  right */}
        <div className={`${styles.nav_right} lg:flex hidden`}>
          <div>
            <Image
              src="/imag_homepage/logoRayan.svg"
              alt="logo"
              width={120}
              height={24}
              className="mr-[40px]"
              priority={true}
            />
          </div>

          <div>
            <ul className={`${styles.nav_header_ul} px-4 mt-2`}>
              <li className="mr-4">
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
        {/* end:nav  right */}
        {/* start:nav left */}
        <div className="lg:flex lg:justify-center lg:align-middle lg:items-center hidden">
          {isloading ? (
            <Skeleton className="h-[39px] w-[110px] ml-3 rounded" />
          ) : islogin ? (
            <Dropdown>
              <DropdownTrigger>
                {userdata && userdata.flag ? (
                  <div className="ml-6 text-base border-1 border-utils-300 py-[5px] px-2 border-solid rounded-sm hover:text-bgcolor hover:bg-white cursor-pointer transition-all">
                    {`${userdata.first_name || userdata.company_name} ${
                      userdata.last_name
                    }`}{" "}
                    <AiFillCaretDown className="inline-block " />
                  </div>
                ) : (
                  <div>
                    <FaUserCircle className=" text-3xl mx-8 cursor-pointer" />
                  </div>
                )}
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions" className="">
                <DropdownItem>
                  <Link href="/dashboard">
                    <div className="text-bgcolor py-4 ">
                      <span className="pr-2">
                        <FaUserAlt className="inline text-md ml-3 text-bgcolor" />
                        مشاهده حساب کاربری
                      </span>
                      <MdOutlineKeyboardDoubleArrowLeft className="inline mr-4 font-bold text-lg" />
                    </div>
                  </Link>
                </DropdownItem>
                <DropdownItem className="text-danger">
                  <button
                    onClick={() => {
                      deleteCookie("access_token");
                      setIslogin(false);
                    }}
                    className="text-[red] py-4"
                  >
                    <span className="pr-2">
                      <TbLogout className="inline text-lg ml-3" />
                      خروج از حساب کاربری
                    </span>
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="p-3">
              <button className="text-[16px] hover:bg-bgcolor_hover py-2 px-3 rounded">
                <FaUserCircle className="inline-block text-2xl " />
                <span>
                  <Link href="/auth/login" className="px-2">
                    ورود
                  </Link>
                </span>
              </button>
            </div>
          )}

          <div>
            <Link
              href={"/order/requst"}
              className="bg-colorgreen px-9 text-[16px] py-[8px] rounded"
            >
              شروع کنیم
            </Link>
          </div>
          <div className="pr-6 pl-4">
            <CiGlobe className="text-2xl mx-3 inline-block" />
            <Image
              src={"/imag_homepage/shopping.svg"}
              alt="shopping"
              width={25}
              height={25}
              className="inline-block mx-3"
            />
          </div>
        </div>
        {/* end:nav left */}
      </nav>
    </>
  );
};

export default Resnav;
