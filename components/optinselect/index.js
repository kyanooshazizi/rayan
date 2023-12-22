"use client";
import Option_city from "./optin_city";
import Option_servic from "./optin-service";
import "animate.css";
import { FaAnglesLeft } from "react-icons/fa6"

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
 if(datacity.isError||dataservise.isError){
  return <div role="alert" className="alert alert-error w-1/2">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span >{datacity.error.message}</span>
</div>
 }
  return (
    <section className="grid md:grid-cols-4 mt-10">
      {city1.map((item) => {
        return <Option_city  key={uuidv4()} {...item} data={datacity.data} />;
      })}

      <Option_servic
        stylex={""}
        placholder="محتوا مرسوله"
        data={dataservise.data}
      />
     
        <button className={`mt-5 rounded-l-lg md:mt-0 p-3 md:p-7 ${btncolor?`bg-${btncolor} text-txcolor`:"bg-utils-300"} hover:bg-utils-400 hover:transition-all hover:duration-300 font-bold flex align-middle justify-center md:justify-between text-xs md:text-base text-txcolor}`}
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
