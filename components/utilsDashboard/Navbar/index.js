"use client";
import { Avatar } from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
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
import { FaHome } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import {
  MethodFlagHandler,
  MethodFlagHandlerAddress,
} from "../../utilsorder/utils/MethodFlagHandler";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

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
      <nav className="shadow-sm h-[75px]  bg-white w-full  flex justify-stretch align-middle items-center">
        {/* start:navbar right */}
        <div className="mr-4 lg:flex lg:justify-between lg:align-middle hidden basis-1/2">
          <div className="pt-[26px]  px-[39px] flex-shrink-0">
            <Image
              src="/image_dashboard/rayanlogo.svg"
              width={124}
              height={24}
              alt="logo"
              priority
              className="xl:w-[124px] w-[110px]"
            />
            <span className="text-[#283764] text-[12px] font-[400] ">
              داشبورد
            </span>
          </div>
        </div>
           {/* end:navbar right */}
        {/* start: navbar left  */}
        <div className="lg:flex lg:items-center lg:justify-between basis-1/2 hidden">
          <div className="basis-1/2">
            <div className="xl:w-[198px] xl:text-[16px] text-[14px] w-[158px] h-[47px] text-center p-3 bg-colorgreen text-txcolor rounded-[5px] mx-auto">
              <Link href="/dashboard/NewOrder" className="">
                سفارش جدید
              </Link>
            </div>
          </div>

          <div className="lg:flex lg:align-middle justify-center items-center basis-1/2">
            <div className="mx-4">
              <Image
                src="/image_dashboard/news.svg"
                width={30}
                height={23}
                alt="logo"
                priority
              />
            </div>
            <div className="mx-4">
              <Image
                src="/image_dashboard/qustion.svg"
                width={30}
                height={23}
                alt="logo"
                priority
              />
            </div>
            <div className="mx-4">
              <Image
                src="/image_dashboard/setting.svg"
                width={30}
                height={23}
                alt="logo"
                priority
              />
            </div>
            <div className="mr-4 ml-4">
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
                        width={30}
                        height={23}
                        alt="logo"
                        priority
                      />
                    )}
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem className="py-3">
                      {userdata && userdata.username}
                    </DropdownItem>
                    <DropdownItem
                      className="text-[red] py-2"
                      onClick={() => {
                        deleteCookie("access_token");
                        router.push("/");
                        setIslogin(false);
                      }}
                    >
                      خروج <MdLogout className="inline-block text-2xl mr-4" />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
          </div>
        </div>
        {/* start: navbar left  */}

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
