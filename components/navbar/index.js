"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMdLogIn } from "react-icons/io";
import { GoChevronDown } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
// nav mobile
import Nav_mobile from "../navbar_mobile";

const Resnav = () => {
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
              src="/logo.jpg"
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
        <div className="p-3">
          
            <button className="p-3 bg-utils-300 shadow-[-4px_3px_5px_1px_bgcolor] rounded-md hover:bg-utils-300 text-txcolor hover:transition-all hover:duration-300 font-bold flex text-xs md:text-base">
              <span><Link href="/auth/register" className="hover:text-[blue]">ورود</Link>|<Link href="/auth/Login" className="hover:text-[blue]">عضویت</Link></span>
              <IoMdLogIn className="text-sm md:text-2xl " />
            </button>
        </div>
      </nav>
    </>
  );
};

export default Resnav;
