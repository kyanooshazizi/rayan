"use client"
import Link from "next/link";
// icon
import { RiDashboardFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import { ImAddressBook } from "react-icons/im";
const index = () => {
  const path=usePathname();
  const pathflag=path.split("/")
  console.log(pathflag)
  return (
    <div className="mt-[70px] w-[100px] bg-bgcolor fixed h-[100vh]">
      <Link href="/dashboard" className={`block my-10 mr-5 text-txcolor`}>
        <RiDashboardFill className={`mr-1 text-xl ${pathflag[2]?"":" text-utils-300"}`} />
        داشبورد
      </Link>
      <Link href="/dashboard/NewOrder" className="block my-10 mr-5 text-txcolor">
        <FaCalendarPlus className={`mr-1 text-xl ${pathflag[2]==="NewOrder"?"text-utils-300":""}`} />
        سفارش جدید
      </Link>
      <Link href="/dashboard/Orders" className="block my-10 mr-5 text-txcolor">
      <MdShoppingCart className={`mr-1 text-xl ${pathflag[2]==="Orders"?"text-utils-300":""}`} />
        سفارش ها
      </Link>
      <Link href="/" className="block my-10 mr-5 text-txcolor">
      <FaWallet className="mr-1"/>
        کیف پول
      </Link>
      <Link href="/dashboard/Profile" className="block my-10 mr-5 text-txcolor">
      <FaUserAlt  className={`mr-1 text-xl ${pathflag[2]==="Profile"?"text-utils-300":""}`} />
        پروفایل
      </Link>
      <Link href="/dashboard/Addres" className="block my-10 mr-5 text-txcolor">
      <ImAddressBook   className={`mr-1 text-xl ${pathflag[2]==="Addres"?"text-utils-300":""}`} />
       آدرس ها
      </Link>
    </div>
  );
};
export default index;
