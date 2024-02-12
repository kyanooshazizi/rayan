"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Mobile from "../dashboard/mobileshow";
import Image from "next/image";
import Sender from "./sender";
import Resiver from "./resiver";
import Customer from "./customer";
import { IoSearchSharp } from "react-icons/io5";
import TableAddress from "./tableAddress";
const index = () => {
  const [mobile, setMobile] = useState(false);
  const [flag, setFlag] = useState([1, 0, 0, 0]);
  const MethodFlagHandler = (flag) => {
    if (flag[0]) {
      return <Sender />;
    } else if (flag[1]) {
      return <Resiver />;
    } else if(flag[2]){
      return <Customer />;
    }else{
      return <TableAddress />;
    }
  };
  return (
    <div>
      <Navbar setMobile={setMobile} mobile={mobile} />

      {mobile ? (
        <Mobile />
      ) : (
        <main className="pt-[90px] min-h-screen">
          <div className="lg:flex hidden fixed w-[140px] mt-[20px]">
            <Sidbar />
          </div>
          <div className="lg:pr-[160px] pr-[14px]">
            <div className="md:text-[24px] font-bold text-[20px]">آدرس ها</div>
            <div className=" mt-[16px] w-full flex justify-between xl:flex-row flex-col text-colorgray">
              <div className="basis-[60%] flex">
                <span
                  className={`lg:ml-10 ml-6 lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer ${
                    flag[0] == 1
                      ? "text-[#000] border-solid border-b-2 border-colorgreen pb-1 font-bold"
                      : ""
                  }`}
                  onClick={() => setFlag([1, 0, 0, 0])}
                >
                  دفترچه آدرس فرستندگان
                </span>
                <span
                  className={`lg:ml-10 ml-6 lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer ${
                    flag[1] == 1
                      ? "text-[#000] border-solid  border-b-2 border-colorgreen pb-1 font-bold"
                      : ""
                  }`}
                  onClick={() => setFlag([0, 1, 0, 0])}
                >
                  دفرچه آدرس گیرندگان
                </span>
                <span
                  className={`lg:ml-10 ml-6 lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer ${
                    flag[2] == 1
                      ? "text-[#000] border-solid  border-b-2 border-colorgreen pb-1 font-bold"
                      : ""
                  }`}
                  onClick={() => setFlag([0, 0, 1, 0])}
                >
                  مشتریان من
                </span>
                <span
                  className={`lg:ml-10 ml-6 lg:text-[16px] sm:text-[14px] text-[12px] cursor-pointer ${
                    flag[3] == 1
                      ? "text-[#000] border-solid  border-b-2 border-colorgreen pb-1 font-bold"
                      : ""
                  }`}
                  onClick={() => setFlag([0, 0, 0, 1])}
                >
                   جدول اطلاعات آدرس
                </span>
              </div>
              {/* <div className="xl:basis-[40%] basis-full ml-[15px] mr-[8px] xl:mt-0 mt-10 relative">
                <input
                  type="text"
                  placeholder="کد رهگیری 13 رقمی بسته پستی یا بسته های پستی را وارد نمایید"
                  className="bg-bgcolor text-[#fff] px-2 py-3 xl:w-[90%] md:w-[80%] w-full rounded-[5px] placeholder:text-[#fff] placeholder:sm:text-[12px] placeholder:text-[10px]"
                />
                <IoSearchSharp className="absolute top-[14px] left-[4%] text-[21px] text-[#fff] " />
              </div> */}
            </div>
            {/* start component */}
            <div className="mt-[10px] pb-[50px] pl-[20px]">
              {MethodFlagHandler(flag)}
            </div>
            {/* end component */}
          </div>
        </main>
      )}
    </div>
  );
};

export default index;
