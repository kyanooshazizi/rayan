import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Modal from "./Modal"
const index = () => {
  const empty = Array(10).fill(0);
  return (
    <div className='mt-[20px]'>
      <div className='lg:w-[80%] md:w-[90%] w-full relative '>
         <input type="text" className='bg-[#AEB3C3] text-[#fff] placeholder:text-[#fff]  focus:bg-bgcolor outline-none px-3 py-3 w-full rounded' 
         placeholder='جستجو در عنوان'
         />
          <IoSearchSharp className="absolute top-[16px] left-[2%] text-[21px] text-[#fff] " />
      </div>
      <div className='mt-[15px] flex justify-between md:flex-row flex-col lg:w-[80%] md:w-[90%] w-full'>
        <button className='md:basis-[48%] basis-[90%] bg-bgcolor px-2 py-3 rounded text-[#fff] inline-block'>وارد کردن از فایل </button>
        <div className='md:basis-[48%] basis-[90%] bg-bgcolor px-2 py-1 rounded text-[#fff] md:mt-0 mt-4'>
        <Modal/>
        </div>
        {/* <button className='md:basis-[40%] basis-[90%] bg-bgcolor px-2 py-2 rounded text-[#fff] md:mt-0 mt-4'>ثبت آدرس جدید</button> */}
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <table className=" mt-[25px] lg:w-[80%] sm:w-[90%] w-full">
          <thead>
            <tr className="bg-dashboard ">
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right pl-4 pr-2 py-2">
                عنوان
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                استان 
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                شهر
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                کد انحصاری
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                نام مشتری
              </th>
            </tr>
          </thead>
          <tbody className="">
            {empty.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-[#fff]  h-[60px] rounded border-b-[18px] border-solid border-dashboard"
                >
                  <td className="text-right pl-4 py-4 text-[14px] pr-2">
                    
                  </td>
                  <td className="text-right px-4 py-4 text-[14px]"></td>
                  <td className="text-right px-4 py-4 text-[14px]"></td>
                  <td className="text-right px-4 py-4 text-[14px]"></td>
                  <td className="text-right px-4 py-4 text-[14px]">
                    
                  </td>
                  <td className="text-right px-4 py-4 text-[14px]"></td>
                  <td className="text-right px-4 py-4 text-[14px]"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex mt-[20px] justify-center items-center lg:w-[70%] md:w-[70%] sm:w-[80%] w-full">
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
    </div>
  )
}

export default index

