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
        <div>
          <Link href="/dashboard/Orders" className="block my-10 mr-5">
            <span>
              <MdShoppingCart
                className={`mr-1 text-xl ${
                  pathflag[2] === "Orders" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span>سفارش ها</span>
          </Link>
        </div>
        <div>
          <Link href="/" className="block my-10 mr-5">
            <span>
              <FaWallet className="mr-1" />
            </span>
            <span>کیف پول</span>
          </Link>
        </div>
        <div>
          <Link href="/dashboard/Profile" className="block my-10 mr-5 relative">
            <span>
              <FaUserAlt
                className={`mr-1 text-xl ${
                  pathflag[2] === "Profile" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span>پروفایل</span>
          </Link>
        </div>

        <div>
          <Link href="/dashboard/Addres" className="block my-10 mr-5">
            <span>
              <ImAddressBook
                className={`mr-1 text-xl ${
                  pathflag[2] === "Addres" ? "text-utils-300" : ""
                }`}
              />
            </span>
            <span>آدرس ها</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default index;
