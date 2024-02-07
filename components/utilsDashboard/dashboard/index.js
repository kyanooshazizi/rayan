"use client";
import React, { useState } from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import { FaWallet } from "react-icons/fa6";
import Link from "next/link";
import Mobileshow from "@/components/utilsDashboard/dashboard/mobileshow";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";
import { FaCalculator } from "react-icons/fa";
const index = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <>
      <Navbar setMobile={setMobile} mobile={mobile} />
      {mobile ? (
        <Mobileshow />
      ) : (
        <main className="pt-[90px] min-h-screen">
          <div className="lg:flex hidden fixed w-[140px] mt-[20px]">
            <Sidbar />
          </div>
          <div className="lg:pr-[160px] pr-[14px]">
            <div className="md:text-[24px] font-bold text-[20px]">داشبورد</div>
            {/* start:row1 */}
            <div className=" mt-2 lg:flex lg:flex-row flex-col">
              <div className="lg:basis-[20%] basis-full min-h-[250px] ml-4 lg:mt-0 mt-0 lg:flex lg:flex-col block">
                <div className="w-full min-h-[125px] lg:mb-2 mb-0 rounded bg-bgcolor text-white py-3 pr-4 text-[14px] grid content-between">
                  <span className="inline-block">مجموع سفارش ها</span>
                  <span className="block text-[24px] font-bold  lg:text-end sm:text-center text-end px-6">
                    10
                  </span>
                  <Link href="/dashboard/Orders" className="">
                    مشاهده
                  </Link>
                </div>
                <div className="w-full min-h-[125px] lg:mt-2 mt-4 rounded  py-3 pr-4 bg-bgcolor text-[14px] grid content-between text-white">
                  <span className="inline-block">تحویل به زودی</span>
                  <span className="block text-[24px] font-bold  lg:text-end sm:text-center text-end px-6">
                    1
                  </span>
                  <Link href="/dashboard/Orders" className="">
                    مشاهده
                  </Link>
                </div>
              </div>
              <div className="lg:basis-[40%] basis-full bg-white min-h-[250px] ml-4 rounded lg:mt-0 mt-4 p-[8px]">
               <div className="pt-3 pr-3">
               <Image
                  src="/image_dashboard/plotorder.svg"
                  width={18}
                  height={18}
                  alt="logo"
                  className="inline"
                />
                <span className="px-2 text-[12px]">سفارش ها</span>
               </div>
               <div className="flex justify-center items-center">
               <Image
                  src="/image_dashboard/plotbigorder.svg"
                  width={40}
                  height={20}
                  alt="logo"
                  className="block opacity-30 mt-[60px]"

                />
               </div>
              </div>
              <div className="lg:basis-[40%] basis-full bg-white min-h-[250px] ml-4 rounded lg:mt-0 mt-4 p-[8px] flex justify-center items-center">
                <div className="text-center">
                  <div className="text-center"><FaWallet className="text-utils-300 text-4xl block mb-4 mx-auto"/></div>
                  <span className="block text-[14px]">موجودی کیف پول شما</span>
                  <span className="text-[18px] font-bold block py-1">0 تومان</span>
                  <button className="text-white px-4 py-3 bg-black text-[14px] rounded mt-4">افزایش موجودی</button>
                </div>
                
              </div>
            </div>
            {/* end:row 1 */}
            {/* start:row2 */}
            <div className="mt-4 lg:flex lg:flex-row flex-col">
              <div className="lg:basis-[60%] basis-full bg-white min-h-[180px] ml-4 rounded lg:mt-0 mt-4 p-[8px]">
                <div className="mr-2">
                <IoLocationSharp className="inline-block text-colorgreen"/>
                <span className="text-gray-700 px-2 text-[16px]">محموله خود را پیگیری کنید</span>
                </div>
                <div>
                  <span className="text-[14px] text-gray-500 mr-2 py-2">شماره پیگیری خود را وارد کنید</span>
                  <input type="text" className="w-[98%] mx-auto px-2 py-3 outline-bgcolor border-1 border-solid border-gray-200 block my-1 rounded bg-[#F8FBFF] placeholder:text-[14px]" placeholder="شماره سفارش/شماره رهگیری"/>
                  <button className="text-white bg-black px-2 py-3 rounded mt-2 float-left ml-1 sm:w-[120px] w-[98%]">پیگیری</button>
                </div>
              </div>
              <div className="lg:basis-[40%] basis-full bg-white min-h-[180px] ml-4 rounded lg:mt-0 mt-4 p-[8px] ">
               <div className="flex justify-between px-2">
                <div>
                <IoDocumentTextSharp className="text-colorgreen inline-block"/>
                <span className="text-gray-700 px-2 text-[16px]">اسناد</span>
                </div>
                <Link href="" className="text-[blue]">مشاهده</Link>
               </div>
                <div className="mt-2">
                   <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2"></div>
                   <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2"></div>
                   <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2"></div>
                </div>
              </div>
            </div>
            {/* end:row 2 */}
            {/* start:row 3 */}
            <div className="mt-4 min-h-[220px] bg-white  ml-4 rounded ">
              <div className="flex justify-between px-4 pt-4 pb-2">
               <span className="text-colorgray">سفارشات اخیر</span>
               <Link href="/dashboard/Orders" className="text-[blue]">مشاهده</Link>
              </div>
              <div>
                <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2 w-[98%] mx-2"></div>
                <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2 w-[98%] mx-2"></div>
                <div className="bg-[#F8FBFF] px-2 py-5 rounded my-2 w-[98%] mx-2"></div>
              </div>
            </div>
            {/* end:row 3 */}
            {/* start: row 4 */}
            <div className="my-4 min-h-[180px] bg-white  ml-4 rounded p-4">
              <div>
              <FaCalculator className="inline-block text-colorgreen"/>
              <span className="text-colorgray p-2 text-[16px]">ابعاد و وزن را بررسی کنید</span>
              </div>
              <span className="text-[14px] text-colorgray py-2 opacity-80 inline-block px-2">ابعاد سفارش خود را وارد کنید تا بهترین گزینه را به شما پیشنهاد دهیم</span>
              <form action="">
              <div className="md:flex mt-6">
                <div className="basis-[15%]">
                <label htmlFor="length" className="block text-colorgray mr-2 text-[14px] pb-1">طول</label>
                <input id="length" type="number" className="mx-2 md:w-[94%] w-[95%] py-2 outline-green-500 border-1 border-solid border-gray-300 px-2 rounded placeholder:text-end block bg-[#F8FBFF]" placeholder="cm"/>
                </div>
               <div className="basis-[15%]">
               <label htmlFor="width" className="block text-colorgray mr-2 text-[14px] pb-1">عرض</label>
                <input id="width" type="number" className="mx-2 md:w-[94%] w-[95%] py-2 outline-green-500 border-1 border-solid border-gray-300 px-2 rounded placeholder:text-end block bg-[#F8FBFF]" placeholder="cm"/>
               </div>
                <div className="basis-[15%]">
                <label htmlFor="height" className="block text-colorgray mr-2 text-[14px] pb-1">ارتفاع</label>
                <input id="height" type="number" className="mx-2 md:w-[94%] w-[95%] py-2 outline-green-500 border-1 border-solid border-gray-300 px-2 rounded placeholder:text-end block bg-[#F8FBFF]" placeholder="cm"/>
                </div>
                <div className="basis-[15%]">
                <label htmlFor="weight" className="block text-colorgray mr-2 text-[14px] pb-1">وزن</label>
                <input id="weight" type="number" className="mx-2 md:w-[94%] w-[95%] py-2 outline-green-500 border-1 border-solid border-gray-300 px-2 rounded placeholder:text-end block bg-[#F8FBFF]" placeholder="kg"/>
                </div>
               
               <div className="basis-[15%]">
               <button className="md:w-full mx-2 w-[95%] bg-black text-white px-2 py-[11px] mr-2 rounded md:mt-[25px] mt-3 inline-block text-[14px]">بررسی ابعاد</button>
               </div>
              
              </div>
              </form>
            </div>
            {/* end:row 4 */}
          </div>
        </main>
      )}
    </>
  );
};

export default index;

