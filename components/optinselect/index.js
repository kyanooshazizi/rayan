"use client";
import Option_city from "./optin_city";
import Option_servic from "./optin-service";
import "animate.css";
import { FaAnglesLeft } from "react-icons/fa6"
import { TfiSearch } from "react-icons/tfi";
import { useState } from "react";
import useCity_servise from "../TanstakQury/useCity_servise";
import { useRouter } from "next/navigation";
import { MethodBackHomepage} from "../Redux/orderslice.js";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
const Alloptien = ({btncolor}) => {
  const dispatch = useDispatch();
  const router=useRouter();
  const {datacity,dataservise} = useCity_servise();
  const [city1, setCity] = useState([
    {
      id:1,
      stylex: "lg:rounded-r-lg lg:rounded-none rounded-t-lg bg-white lg:border-b-0 border-b-2 border-solid border-b-gray-200",
      placholder: "شهر مبدا",
      slug:"pick"  
    },
    {
      id:2,
      stylex: "bg-white lg:rounded-none rounded-b-lg",
      placholder: "شهر مقصد",
      slug:"deliv" 
    },
  ]);
 if(datacity.isError||dataservise.isError){
  return <div role="alert" className="alert alert-error w-1/2">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span >{datacity.error.message}</span>
</div>
 }
  return (
    <section className="lg:flex lg:justify-center lg:items-center mt-3 lg:flex-wrap">
      {city1.map((item) => {
        return <Option_city  key={uuidv4()} {...item} data={datacity.data} />;
      })}

      <Option_servic
        stylex={""}
        placholder="محتوا مرسوله"
        data={dataservise.data}
      />
     
       <div className="h-12">
       <button className={`lg:w-[190px] sm:w-full w-5/6 mx-auto lg:rounded-l-lg lg:rounded-none rounded-lg p-4 lg:p-7 ${btncolor?`bg-${btncolor} text-txcolor`:"bg-colorgray"} hover:bg-utils-400 hover:transition-all hover:duration-300 font-bold flex align-middle justify-center lg:justify-between text-xs md:text-base text-txcolor} lg:mt-0 md:mt-7 mt-6`}
        onClick={()=>{
          dispatch(MethodBackHomepage())
          router.push("/order/requst");
        }}
        >
          <span className="pl-2">ثبت درخواست </span>
          <TfiSearch className="rotate-90 text-[24px] align-middle font-thin"/>
        </button>
       </div>
     
    </section>
  );
};

export default Alloptien;
