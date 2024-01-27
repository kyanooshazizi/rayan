"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
// icon
import { RiDashboardFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import { IoBusiness } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useThemeContext } from "../../context/store";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
const index = () => {
  const { setIslogin, userdata } = useThemeContext();
  const router=useRouter()
  console.log(userdata);
  return (
    <>
      {/* start: show mobile   */}
      <div className="w-full bg-white min-h-screen text-[14px] mt-[72px]">
        <div className="row w-full p-4 flex ">
          <div>
            {/* {userdata.image? <Image
      src={`${userdata.image}`}
      width={50}
      height={50}
      alt="image"
    />:<FaUserCircle className="inline-block text-2xl" />} */}
            <FaUserCircle className="inline-block text-2xl" />
          </div>
          <div className="mr-5">
            <span className=" block pb-2">
              {userdata.company_name || userdata.first_name}{" "}
              {userdata.last_name}
            </span>
            <span className="block text-[12px]">
              {userdata && userdata.username}
            </span>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="row flex w-full">
            <Link
              href="/dashboard"
              className="w-1/2 bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
            >
              <div>
                {" "}
                <RiDashboardFill className="inline-block ml-2" /> داشبورد
              </div>
            </Link>
            <Link
              href="/dashboard/NewOrder"
              className="w-1/2 bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
            >
              <div>
                <FaCalendarPlus className="inline-block ml-2" /> سفارش جدید
              </div>
            </Link>
          </div>
          <div className="row flex w-full">
            <Link
              className="w-1/2  bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
              href="/dashboard/Orders"
            >
              <div>
                {" "}
                <MdShoppingCart className="inline-block ml-2" /> سفارش ها
              </div>
            </Link>
            <Link
              className="w-1/2  bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
              href="/"
            >
              <div>
                <FaWallet className="inline-block ml-2" /> کیف پول
              </div>
            </Link>
          </div>
          <div className="row flex w-full">
            <Link
              className="w-1/2  bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
              href="/dashboard/Profile"
            >
              <div>
                {" "}
                <FaUserAlt className="inline-block ml-2" /> پروفایل
              </div>
            </Link>
            <Link
              className="w-1/2  bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
              href="/dashboard/ProfileBusiness"
            >
              <div>
                <IoBusiness className="inline-block ml-2" />
                پروفایل کسب و کاری
              </div>
            </Link>
          </div>
          <div className="row flex w-full justify-center">
            <Link
              className="w-1/2  bg-[#f3f6fb] px-[16px] py-3 m-1 rounded"
              href="/dashboard/Addres"
            >
              <div>
                {" "}
                <ImAddressBook className="inline-block ml-2" /> دفترچه آدرس
              </div>
            </Link>
          </div>
        </div>
        <div className="row w-full mt-3 text-[red]">
          <TbLogout2 className="my-4 mr-4 text-lg inline-block" />
          <button
            className="mr-1"
            onClick={() => {
              deleteCookie("access_token");
              router.push("/");
              setIslogin(false);
            }}
          >
            خروج{" "}
          </button>
        </div>
        <Link
          href="/dashboard/NewOrder"
          className="w-full bg-[#0061ff] text-white py-4 px-2 text-center p-2 rounded fixed bottom-0 font-bold"
        >
          ثبت سفارش جدید
        </Link>
      </div>
      {/* end: show mobile   */}
    </>
  );
};

export default index;
