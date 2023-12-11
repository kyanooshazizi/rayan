"use client";
import React ,{useState,useEffect} from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import { BsCheckCircleFill } from "react-icons/bs";
 const Navbar = () => {
  const pathname = usePathname()
  const [urldata,setUrldata]=useState("");
  const [flagnav,setFlagnav]=useState({freqest:false,faddress:false})
  useEffect(() => {
    const url = `${pathname}`;
    setUrldata(()=>{
      if(url.split("/")[2]){
        return url.split("/")[2]
      }else{
        return null;
      }
    });
    setFlagnav(()=>{
      if(url.split("/")[2]==="requst"){
            return {freqest:true,faddress:false}
      }else if(url.split("/")[2]==="address"){
            return {freqest:true,faddress:true} 
      }
    }
    );
    console.log(urldata,flagnav);
  }, [pathname])
  return (
    <div>
        {/* start nav */}
      <nav className="shadow-md z-40 bg-white w-full p-1 fixed top-0 left-0 right-0 flex justify-between">
        <ul className="mr-4 p-2">
          <li className={`inline-block p-1 ${(flagnav.freqest)?"text-navbarrequst font-bold p-2":""}`}>
           {flagnav.faddress?<BsCheckCircleFill className='inline-block ml-1 text-base'/>:""}
            ثبت درخواست <FaAngleLeft className="inline-block" />
          </li>
          <li className={`inline-block p-2 ${(flagnav.faddress)?"text-navbarrequst font-bold":""}`}>
          {/* <BsCheckCircleFill className='inline-block ml-1 text-lg'/> */}
            آدرس <FaAngleLeft className="inline-block" />
          </li>
          <li className="inline-block p-2">
            
            بیمه <FaAngleLeft className="inline-block" />
          </li>
          <li className="inline-block p-2">پرداخت</li>
        </ul>
        <Link href="/auth/register">
          <button className="p-2 bg-utils-300 text-txcolor shadow-[-4px_3px_5px_1px_#utils-300] rounded-md hover:bg-utils-300 hover:transition-all hover:duration-300 font-bold flex text-md md:text-base mt-2 ml-4">
            <span> ورود </span>
            <IoMdLogIn className="text-sm md:text-2xl " />
          </button>
        </Link>
      </nav>
      {/* end nav */}
    </div>
  )
}
export default Navbar;