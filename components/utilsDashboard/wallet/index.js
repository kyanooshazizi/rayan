"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Mobile from "../dashboard/mobileshow";
import ChargeWallet from "./charge";
import PaymentHistory from "./payment_history";
import PaymentMethod from "./Paymentmethod";
const index = () => {
  const [mobile, setMobile] = useState(false);
  const [flag, setFlag] = useState([1, 0, 0]);
  const MethodFlagHandler = (flag) => {
    if (flag[0]) {
      return <ChargeWallet/>;
    } else if (flag[1]) {
      return <PaymentHistory/>;
    } else {
      return <PaymentMethod/>;
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
            <div className="md:text-[24px] font-bold text-[20px]">کیف پول</div>
            <div className=" mt-[16px] w-full flex text-colorgray">
              <span
                className={`ml-10 cursor-pointer ${
                  flag[0] == 1
                    ? "text-[#000] border-solid border-b-2 border-[black] font-bold"
                    : ""
                }`}
                onClick={() => setFlag([1, 0, 0])}
              >
                شارژ کردن
              </span>
              <span
                className={`ml-10 cursor-pointer ${
                  flag[1] == 1
                    ? "text-[#000] border-solid  border-b-2 border-[black] font-bold"
                    : ""
                }`}
                onClick={() => setFlag([0, 1, 0])}
              >
                روش های پرداخت
              </span>
              <span
                className={`ml-10 cursor-pointer ${
                  flag[2] == 1
                    ? "text-[#000] border-solid  border-b-2 border-[black] font-bold"
                    : ""
                }`}
                onClick={() => setFlag([0, 0, 1])}
              >
                سابقه پرداخت
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
