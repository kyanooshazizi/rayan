"use client"
import dynamic from 'next/dynamic'
import Navbar from "@/components/utilsorder/Navbar/navbar";
// import Sidbar from "@/components/utilsorder/Saidbar/sidbar";
import Address from "@/components/utilsorder/pageAddress/Address/index";
import Sidnav from "@/components/utilsDashboard/Sydbar";
// import { useState } from 'react';
const Sidbar = dynamic(() => 
{
 return import('@/components/utilsorder/Saidbar/sidbar')
}, { ssr: false, })
import { useThemeContext } from '@/components/context/store';
import { useRouter } from 'next/navigation';

const page = () => {
  const { isloading,islogin} = useThemeContext();
  const router=useRouter();
 if(!islogin&&!isloading){
  router.push("/auth/login")
 }
  return (
    <>
      <div className="w-full">
        <div>
          <Navbar />
        </div>
        <div
          className={` fixed w-[140px] mt-[100px] ${
            islogin ? "lg:flex hidden" : "hidden"
          }`}
        >
          <Sidnav stylex={"pt-[38px]"} />
        </div>
        <div className="flex lg:pr-[20px] pr-0">
          <div className="xl:basis-[75%] lg:basis-[75%] sm:basis-[90%] basis-full lg:mx-0 mx-auto">
            <Address />
          </div>
          <div className=" lg:block hidden fixed xl:w-[340px] lg:w-[300px] left-0">
            <Sidbar />
          </div>
        </div>
      </div>
    </>
  )
}

export default page
