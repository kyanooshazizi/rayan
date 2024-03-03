"use client";
import Link from "next/link";
// icon
import { usePathname } from "next/navigation";
import { ImAddressBook } from "react-icons/im";
import { IoBusiness } from "react-icons/io5";
import Image from "next/image";
import { useThemeContext } from "../../context/store";
const index = ({stylex}) => {
  const { userdata,setCheck,check,check_b } = useThemeContext();
  const path = usePathname();
  const pathflag = path.split("/");
  return (
    <div>
      <div>
        <div
          className={`pr-[24px] pl-[16px]`}
        >
          <Link href="/dashboard" className={`block`}>
            <span>
              { pathflag[2]?<Image
              src="/image_dashboard/sidbar/dashboard1.svg"
              width={22}
              height={22}
              alt="logo"
              priority
            />:<Image
            src="/image_dashboard/sidbar/dashboard.svg"
            width={22}
            height={22}
            alt="logo"
            priority
          />}
            </span>
            <span className={`text-[14px] font-bold ${pathflag[2] ? "text-[#636363]":" text-black"} inline-block`}>
              داشبورد
            </span>
          </Link>
        </div>
        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px]`} >
          <Link href="/dashboard/NewOrder" className="block">
            <span>
            {pathflag[2] === "NewOrder"?<Image
              src="/image_dashboard/sidbar/neworder1.svg"
              width={22}
              height={22}
              alt="logo"
              priority
            />:<Image
            src="/image_dashboard/sidbar/neworder.svg"
            width={22}
            height={22}
            alt="logo"
            priority
          />}
            </span>
            <span className={`text-[14px] font-bold ${pathflag[2] === "NewOrder" ? "text-black":" text-[#636363]"} inline-block`}>سفارش جدید</span>
          </Link>
        </div>
        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px]`}>
          <Link href="/dashboard/Orders" className="block">
            <span>
               {pathflag[2] === "Orders"?<Image
              src="/image_dashboard/sidbar/orders1.svg"
              width={22}
              height={22}
              alt="logo"
              priority
            />:<Image
            src="/image_dashboard/sidbar/orders.svg"
            width={22}
            height={22}
            alt="logo"
            priority
          />}
            </span>
            <span className={`text-[14px] font-bold ${pathflag[2] === "Orders" ? "text-black":" text-[#636363]"} inline-block`}>سفارش ها </span>
          </Link>
        </div>

        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px]`}>
          <Link href="/dashboard/wallet" className="block">
          <span>
               {pathflag[2] === "wallet"?<Image
              src="/image_dashboard/sidbar/walet1.svg"
              width={22}
              height={22}
              alt="logo"
              priority
            />:<Image
            src="/image_dashboard/sidbar/walet.svg"
            width={22}
            height={22}
            alt="logo"
            priority
          />}
            </span>
            <span className={`text-[14px] font-bold ${pathflag[2] === "wallet" ? "text-black":" text-[#636363]"} inline-block`}>کیف پول</span>
          </Link>
        </div>

        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px] `}>
          <Link href="/dashboard/Profile" className={`block`}>
            <span>
            {pathflag[2] === "Profile"?<Image
              src="/image_dashboard/sidbar/profile1.svg"
              width={22}
              height={22}
              alt="logo"
              priority
            />:<Image
            src="/image_dashboard/sidbar/profile.svg"
            width={22}
            height={22}
            alt="logo"
            priority
          />}
            </span>
            <span  className={`text-[14px] font-bold ${pathflag[2] === "Profile" ? "text-black":" text-[#636363]"} inline-block ${check?"!border-utils-300 border-b-2 border-solid":""}`}>پروفایل</span>
          </Link>
        </div>
        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px]`}>
          <Link href="/dashboard/ProfileBusiness" className={`block`}>
            <span>
              <IoBusiness
                className={`mr-1 text-[22px] ${
                  pathflag[2] === "ProfileBusiness" ? "text-bgcolor" : "text-[#636363]"
                }`}
              />
            </span>
            <span  className={`text-[14px] font-bold ${pathflag[2] === "ProfileBusiness" ? "text-black":" text-[#636363]"} inline-block `}>پروفایل</span>
            <span className={`text-[14px] font-bold ${pathflag[2] === "ProfileBusiness" ? "text-black":" text-[#636363]"} inline-block ${check_b?"!border-utils-300 border-b-2 border-solid":""}`}>کسب و کار</span>
          </Link>
        </div>

        <div className={`pt-[30px] ${stylex} pr-[24px] pl-[16px]`}>
          <Link href="/dashboard/Addres" className="block">
            <span>
              <ImAddressBook
                className={`mr-1 text-[22px] ${
                  pathflag[2] === "Addres" ?  "text-bgcolor" : "text-[#636363]"
                }`}
              />
            </span>
            <span  className={`text-[14px] font-bold ${pathflag[2] === "Addres" ? "text-black":" text-[#636363]"} inline-block`}>آدرس ها</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default index;
