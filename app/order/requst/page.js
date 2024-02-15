"use client";
// import component:start
import Navbar from "@/components/utilsorder/Navbar/navbar";
import dynamic from "next/dynamic";
// import Sidbar from '@/components/utilsorder/Saidbar/sidbar'
import Mainsection from "@/components/utilsorder/pageRequst/mainsection/mainsection";
const Sidbar = dynamic(() => import("@/components/utilsorder/Saidbar/sidbar"), {
  ssr: false,
});
// const Mainsection = dynamic(() => import('@/components/utilsorder/pageRequst/mainsection/mainsection'), { ssr: false })
// import component:end
import { useThemeContext } from "@/components/context/store";
import Sidnav from "@/components/utilsDashboard/Sydbar";
const page = () => {
  const { isloading, islogin } = useThemeContext();
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
          <div className="xl:basis-[75%] lg:basis-[72%] basis-full ">
            <Mainsection />
          </div>
          <div className=" lg:block hidden fixed xl:w-[340px] lg:w-[300px] left-0">
            <Sidbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
