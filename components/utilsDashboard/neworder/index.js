"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Neworder from "../../optinselect/index";
import Mobile from "../dashboard/mobileshow";
const index = () => {
  const [mobile, setMobile] = useState(false);
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
            <div className="md:text-[24px] font-bold text-[20px]">سفارش جدید</div>
            <div className=" mt-10 w-full flex">
            <Neworder btncolor={"bgcolor"} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default index;
