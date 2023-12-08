"use client";
import Option_city from "./optin_city";
import Option_servic from "./optin-service";
import "animate.css";
import { FaAnglesLeft } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { useThemeContext } from "../context/store.js";
import { useRouter } from "next/navigation";
import { MethodBackHomepage} from "../Redux/orderslice.js";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
const Alloptien = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { datacity,datapaket } = useThemeContext();
  const [city, setCity] = useState([
    {
      id:1,
      stylex: "rounded-r-lg bg-white",
      placholder: "شهر مبدا",
      slug:"pick"  
    },
    {
      id:2,
      stylex: "bg-white",
      placholder: "شهر مقصد",
      slug:"deliv" 
    },
  ]);

  return (
    <section className="grid md:grid-cols-4 mt-10">
      {city.map((item) => {
        return <Option_city key={uuidv4()} {...item} data={datacity} />;
      })}

      <Option_servic
        stylex={""}
        placholder="محتوا مرسوله"
        data={datapaket}
      />
     
        <button className="mt-5 rounded-l-lg md:mt-0 p-3 md:p-7 bg-utils-300 hover:bg-utils-400 hover:transition-all hover:duration-300 font-bold flex align-middle justify-center md:justify-between text-xs md:text-base text-txcolor"
        onClick={()=>{
          dispatch(MethodBackHomepage())
          router.push("/order/requst");
        }}
        >
          <span>ثبت درخواست </span>
          <FaAnglesLeft className="text-sm md:text-2xl mr-3" />
        </button>
     
    </section>
  );
};

export default Alloptien;
