import React from "react";
import Modal from "./Modal";
import { IoSearchSharp } from "react-icons/io5";
const index = () => {
  const empty = Array(1).fill(0);
  return (
    <div className="mt-10 relative min-h-[500px]">
      <div className="flex justify-start xl:flex-row flex-col">
        <div className=" ml-[15px] mr-[8px] xl:mt-0 mt-10 relative xl:basis-[40%] md:w-[70%] w-full">
          <input
            type="text"
            placeholder="جستجو در عنوان"
            className="bg-[#AEB3C3] text-[#fff] px-2 py-3 rounded-[5px] placeholder:text-[#fff] placeholder:sm:text-[12px] placeholder:text-[10px] w-full focus:bg-bgcolor outline-none"
          />
          <IoSearchSharp className="absolute top-[14px] left-[2%] text-[21px] text-[#fff] " />
        </div>
        <div className="xl:mr-10 mr-[8px] ml-[15px] xl:mt-0 mt-6 bg-bgcolor py-1 xl:basis-[20%] md:w-[70%] w-full rounded">
          <Modal />
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <table className=" mt-[25px] lg:w-[70%] md:w-[70%] w-full">
          <thead>
            <tr className="bg-dashboard ">
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right pl-4 pr-2 py-2">
                نام و نام خانوادگی
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                شماره همراه
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                تلفن
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
                  <td className="text-right pl-4 py-3 text-[14px] pr-2"></td>
                  <td className="text-right px-4 py-3 text-[14px]"></td>
                  <td className="text-right px-4 py-3 text-[14px]"></td>
                  <td className="text-right px-4 py-3 text-[14px]"></td>
                  <td className="text-right px-4 py-3 text-[14px]"></td>
                  <td className="text-right px-4 py-3 text-[14px]"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex absolute bottom-[10px] mt-[20px] justify-center items-center lg:w-[70%] md:w-[70%] sm:w-[80%] w-full">
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
              1 ردیف
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
