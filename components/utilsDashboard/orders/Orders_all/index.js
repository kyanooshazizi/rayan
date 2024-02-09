import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { VscFilter } from "react-icons/vsc";
const index = () => {
  const empty = Array(10).fill(0);
  
  return (
    <>
      <div className=" lg:w-[90%] w-full flex md:flex-col flex-row justify-center ">
        <div className="md:mb-2 mb-0 flex justify-end relative">
          <input
            className="bg-[#B4E7C2] text-[#fff] tetx-[12px] outline-none py-1 px-3 lg:w-[180px] md:w-[150px] w-[150px] rounded placeholder:text-colorgreen placeholder:text-[12px]"
            placeholder="جستجو نام گیرنده"
          />
          <VscSearch className="absolute text-[#fff] text-[16px] top-[7px] left-[10px]" />
        </div>
        <div className=" flex justify-end relative md:mx-0 mx-4">
          <button className="text-start bg-[#B4E7C2] text-[#fff] tetx-[12px]  py-1 px-3 rounded lg:w-[180px] md:w-[150px] w-[90px]"><span className="text-colorgreen">فیلتر</span></button>
          <VscFilter className="text-[#fff] text-[16px] top-[7px] left-[10px] absolute" />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className=" mt-[25px] w-full lg:w-[90%]">
          <thead>
            <tr className="bg-dashboard ">
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right pl-4 py-2">
                شماره سفارش
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                نام گیرنده
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                تاریخ ثبت
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                تعداد
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                تاریخ جمع آوری
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                قیمت کل
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                وضعیت
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                جزئیات
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                چاپ لیبل
              </th>
            </tr>
          </thead>
          <tbody className="">
            {empty.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-[#fff]  h-[50px] rounded border-b-[12px] border-solid border-dashboard"
                >
                  <td className="text-right pl-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right pr-14 pl-6 py-6 text-[14px]"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center w-[90%]">
          <div className="text-[12px] mt-[15px]">
            <span className="px-2">صفحه</span>
            <select className="bg-[#fff] px-2 rounded outline-none">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="px-2">از</span>
            <span>1</span>
            <span className="text-center py-1 px-2 bg-[#fff] mr-8 rounded">
              {" "}
              10 ردیف
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
