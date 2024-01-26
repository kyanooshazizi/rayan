"use client";
import Link from "next/link";
// icon
import { RiDashboardFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { ImAddressBook } from "react-icons/im";
import { IoBusiness } from "react-icons/io5";
const index = () => {
  const path = usePathname();
  const pathflag = path.split("/");
  return (
    <div>
      <div>
        <div
          className={`pt-[32px] pr-[24px] pl-[16px]  ${
            pathflag[2] ? "" : " border-r-[5px] border-solid border-[blue]"
          }`}
        >
          <Link href="/dashboard" className={`block`}>
            <span>
              <RiDashboardFill
                className={`mr-1 text-xl ${
                  pathflag[2] ? "" : " text-utils-300"
                }`}
              />
            </span>
            <span className={`text-[18px] font-bold text-[#858d9f] ${pathflag[2] ? "":" text-[#141415]"} pt-2 inline-block`}>
              داشبورد
            </span>
          </Link>
        </div>
        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "NewOrder" ? "border-r-[5px] border-solid border-[blue]":""
          }`} >
          <Link href="/dashboard/NewOrder" className="block">
            <span>
              <FaCalendarPlus
                className={`mr-1 text-xl ${
                  pathflag[2] === "NewOrder" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">سفارش جدید</span>
          </Link>
        </div>
        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "Orders" ? "border-r-[5px] border-solid border-[blue]":""
          }`}>
          <Link href="/dashboard/Orders" className="block">
            <span>
              <MdShoppingCart
                className={`mr-1 text-xl ${
                  pathflag[2] === "Orders" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">سفارش ها</span>
          </Link>
        </div>

        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "Orders" ? "border-r-[5px] border-solid border-[blue]":""
          }`}>
          <Link href="/" className="block">
            <span>
              <FaWallet className="mr-1" />
            </span>
            <span className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">کیف پول</span>
          </Link>
        </div>

        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "Profile" ? "border-r-[5px] border-solid border-[blue]":""
          }`}>
          <Link href="/dashboard/Profile" className="block">
            <span>
              <FaUserAlt
                className={`mr-1 text-xl ${
                  pathflag[2] === "Profile" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span  className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">پروفایل</span>
          </Link>
        </div>
        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "ProfileBusiness" ? "border-r-[5px] border-solid border-[blue]":""
          }`}>
          <Link href="/dashboard/ProfileBusiness" className="block">
            <span>
              <IoBusiness
                className={`mr-1 text-xl ${
                  pathflag[2] === "ProfileBusiness" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span  className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">پروفایل کسب و کاری</span>
          </Link>
        </div>

        <div className={`pt-[32px] pr-[24px] pl-[16px]  ${
           pathflag[2] === "Addres" ? "border-r-[5px] border-solid border-[blue]":""
          }`}>
          <Link href="/dashboard/Addres" className="block">
            <span>
              <ImAddressBook
                className={`mr-1 text-xl ${
                  pathflag[2] === "Addres" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span className="text-[18px] font-bold text-[#858d9f] pt-2 inline-block">آدرس ها</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default index;
