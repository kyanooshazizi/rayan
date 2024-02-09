"use client";
import React, { useState } from "react";
import Navbar from "../../Navbar";
import Sidbar from "../../Sydbar";
import Mobile from "../../dashboard/mobileshow";
import PersonProfile from "./personProfile";
import AgentProfile from "./agentProfile";
import ChangePassword from "./changePassword";

const index = () => {
  const [mobile, setMobile] = useState(false);
  const [flag, setFlag] = useState([1, 0, 0]);
  const MethodFlagHandler = (flag) => {
    if (flag[0]) {
      return <PersonProfile/>
    } else if (flag[1]) {
      return <AgentProfile/>;
    } else {
      return <ChangePassword/>;
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
            <div className="md:text-[24px] font-bold sm:text-[20px] text-[18px]">پروفایل</div>
            <div className=" mt-[16px] w-full flex text-colorgray">
              <span
                className={`lg:text-[16px] sm:text-[14px] text-[12px] lg:ml-10 ml-6 cursor-pointer ${
                  flag[0] == 1
                    ? "text-[#000] border-solid border-b-2 border-colorgreen pb-1 font-bold"
                    : ""
                }`}
                onClick={() => setFlag([1, 0, 0])}
              >
                 مشخصات 
              </span>
              <span
                className={`lg:text-[16px] sm:text-[14px] text-[12px] lg:ml-10 ml-6 cursor-pointer ${
                  flag[1] == 1
                    ? "text-[#000] border-solid  border-b-2 border-colorgreen pb-1 font-bold"
                    : ""
                }`}
                onClick={() => setFlag([0, 1, 0])}
              >
               مشخصات سازمان
              </span>
              <span
                className={`lg:text-[16px] sm:text-[14px] text-[12px] lg:ml-10 ml-6 cursor-pointer ${
                  flag[2] == 1
                    ? "text-[#000] border-solid  border-b-2 border-colorgreen pb-1 font-bold"
                    : ""
                }`}
                onClick={() => setFlag([0, 0, 1])}
              >
                 تغییر پسورد
              </span>
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
