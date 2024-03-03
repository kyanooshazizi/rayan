"use client";

import { MdLogout } from "react-icons/md";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useThemeContext } from "../../context/store";
import { AiFillCaretDown } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import {MethodFlagHandler} from "../../utilsorder/utils/MethodFlagHandler"
const Navbar = ({ setMobile, mobile }) => {
  const dataAddress = useSelector((state) => state.order.address);
  const datastore = useSelector((state) => state.order.order);
  const { setIslogin, userdata } = useThemeContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="fixed top-0 w-full z-50">
      {/* start nav */}
      <nav className="shadow-sm h-[75px]  bg-white w-full  flex justify-between align-middle items-center">
        {/* start:navbar right */}
        <div className="mr-1 lg:flex lg:justify-between lg:align-middle hidden">
          <div className="pt-[26px]  px-[25px] flex-shrink-0">
            <Image
              src="/image_dashboard/rayanlogo.svg"
              width={124}
              height={24}
              alt="logo"
              priority
              className="xl:w-[124px] w-[110px]"
            />
            <span className="text-[#283764] text-[12px] font-[400] pr-[80px]">
              داشبورد
            </span>
          </div>
        </div>
        {/* end:navbar right */}
        {/* start: navbar left  */}
        <div className="lg:flex lg:items-center lg:justify-end hidden">
          <div className="ml-4">
            <div>
              <Link
                href="/dashboard/NewOrder"
                className="inline-block xl:w-[184px] xl:text-[16px] text-[14px] w-[158px] h-[47px] text-center p-3 bg-colorgreen text-txcolor rounded-[5px] "
              >
                سفارش جدید
              </Link>
            </div>
          </div>
          <Link href={`${MethodFlagHandler(datastore)?"/order/address":"/order/requst"}`} className="mx-2 relative inline-block">
            {/* <Image
              src="/image_dashboard/news.svg"
              width={20}
              height={20}
              alt="logo"
              priority
            /> */}
            <BsCart3 className="text-[25px] text-slate-500" />
            <div className={`${MethodFlagHandler(datastore)?"bg-colorgreen text-[#fff] w-[25px] h-[25px] p-1 rounded-full absolute top-[-15px] right-[-15px] text-center":"hidden"}`}>
             1
            </div>
          </Link>
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
                    priority
                  />
                )}
              </DropdownTrigger>
              <DropdownMenu className="">
                <DropdownItem className="py-3">
                  <FaRegUser className="inline text-2xl ml-4" />
                  {userdata && userdata.username}
                </DropdownItem>
                <DropdownItem
                  className="text-[red] py-2 "
                  onClick={() => {
                    deleteCookie("access_token");
                    localStorage.clear();
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
        </div>
        {/* end: navbar left  */}

        {/* start nav Mobile */}
        <div className="lg:hidden flex justify-between items-center align-middle w-full">
          {/* start: menu icon hambarger */}
          <div>
            <button
              className=" pr-[20px] text-3xl font-bold"
              onClick={() => {
                setMobile((prev) => !prev);
              }}
            >
              {mobile ? <IoMdClose /> : <IoMdMenu />}
            </button>
          </div>
          {/*end: menu icon hambarger  */}
          {/* start: logo rayanpost */}
          <div className="pl-[20px]">
            <Image
              src="/image_dashboard/rayanlogo.svg"
              width={80}
              height={80}
              alt="Picture of the author"
              priority
            />
          </div>
          {/* end: logo rayanpost */}
        </div>
        {/* end nav Mobile */}
      </nav>
      {/* end nav */}
    </div>
  );
};
export default Navbar;
