"use client";
import Option from "./optin";
import "animate.css";
import { FaAnglesLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Alloptien = () => {
  const router = useRouter();
  const [allcity, setAllcity] = useState([]);

  const formHandler = (event) => {
    event.preventDefault();
    router.push("/formservice");
  };

  return (
    <form action="" className="grid md:grid-cols-4 mt-10">
      <Option
        stylex={"rounded-r-lg"}
        placholder="شهر مبدا"
        url={"https://mohaddesepkz.pythonanywhere.com/cities/"}
      />
      <Option
        stylex={""}
        placholder="منطقه"
        url={"https://mohaddesepkz.pythonanywhere.com/cities/region/"}
      />
      <Option
        stylex={""}
        placholder="محله"
        url={"https://mohaddesepkz.pythonanywhere.com/cities/district/"}
      />
      <button
        onClick={formHandler}
        className="mt-5 rounded-l-lg md:mt-0 p-3 md:p-7 bg-orange-500 hover:bg-orange-600 hover:transition-all hover:duration-300 font-bold flex align-middle justify-center md:justify-between text-xs md:text-base text-white"
      >
        <span>ثبت درخواست </span>
        <FaAnglesLeft className="text-sm md:text-2xl " />
      </button>
    </form>
  );
};

export default Alloptien;
