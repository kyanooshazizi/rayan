"use client";
import React from "react";

const payment_history = () => {
  return (
    <div className="overflow-x-auto ">
      <table className=" mt-[25px] w-full lg:w-[90%]">
        <thead>
          <tr className="bg-dashboard ">
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              تاریخ
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              کد
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              سفارش
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              طریقه پرداخت
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              مقدار
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-6 py-2">
              صورت حساب
            </th>
            <th className="px-10"></th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="bg-[#fff]  h-[60px] rounded border-b-[10px] border-solid border-dashboard">
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-10 py-6 text-[14px]"></td>
          </tr>
          <tr className="bg-[#fff]  h-[60px]">
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-6 py-6 text-[14px]"></td>
            <td className="text-right px-10 py-6 text-[14px]"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default payment_history;
