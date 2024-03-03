"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Mobile from "../dashboard/mobileshow";
import { RiErrorWarningLine } from "react-icons/ri";
import Modal from "./modalnewBusiness";
import Table from "./Table";
import {
  MethodFlagHandler,
  MethodFlagHandlerAddress,
} from "../../utilsorder/utils/MethodFlagHandler";
import { useDispatch, useSelector } from "react-redux";
const index = () => {
  const dataAddress = useSelector((state) => state.order.address);
  const dataorder = useSelector((state) => state.order.order);
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
          <div className="lg:pr-[160px] pr-[14px] pl-[14px]">
            <div className="md:text-[24px] font-bold text-[20px]">
              پروفایل کسب و کار
            </div>
            <div className="mt-3 border-b-2 border-colorgreen max-w-fit border-solid ">
              ثبت اطلاعات پروفایل کسب و کار
            </div>
            <div className="flex">
              <div className="sm:text-[16px] text-[14px] px-2 mt-6 xl:w-[35%] md:w-[50%] w-full bg-[#fff] border-solid border-2 border-[#FFCB05] rounded-[4px]  py-3 text-bgcolor">
                <RiErrorWarningLine className="inline-block text-2xl mx-1" />{" "}
                برای ثبت سفارش یک پروفایل کسب و کار بسازید
              </div>
            </div>
            <div>
              <Modal />
            </div>
            <div className="mt-4">
              <Table />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default index;
