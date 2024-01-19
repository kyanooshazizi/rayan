
import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineAlignCenter } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { BiBarcode } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import {getData} from "@/components/utilsFunction/checklogin";
const page =async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')
  const value_cooki=token&&token.value? token.value:undefined;
  if(value_cooki){
    var data=await getData(value_cooki)
    if(!data){ 
      redirect("/auth/login") 
       }
  }else{
    redirect("/auth/login") 
  }
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-28 bg-white mx-auto w-[90%] h-[100vh] rounded-3xl px-4 py-6">
          <span className="mb-3 block text-utils-300 font-bold">
            مدیریت سفارش ها
          </span>
          <hr className="bg-bgcolor h-[2px]" />
          {/* start:Manage orders */}
         <div className="flex flex-row mt-10 justify-evenly">
         <div className=" inline-block relative">
            <input
              type="text"
              placeholder="شماره سفارش را وارد کنید"
              className="placeholder:text-[12px] border-solid border-1 outline-none border-bgcolor px-2 py-2 rounded-md w-[240px]"
            />
            <button className="absolute bg-bgcolor px-2 text-txcolor top-0 left-[0px] pt-[10px] pb-[13px] rounded-l-md text-[12px]">
              پیگیری سفارش
            </button>
          </div>
          <div className="">
            تعداد کل سفارش ها: <span className="px-3 py-1 border-solid border-1 border-utils-300">2</span>
          </div>
         </div>
          {/* end:Manage orders */}

          {/* start:table */}
          <div className="mt-24">
            {/* thead */}
            <div className="flex flex-row mb-1 text-gray-500 text-sm">
              <div className="basis-40 pr-2">
                شماره سفارش{" "}
                <AiOutlineArrowDown className="inline-block text-bgcolor" />
              </div>
              <div className="basis-40">
                نام گیرنده{" "}
                <AiOutlineAlignCenter className="inline-block text-bgcolor" />
              </div>
              <div className="basis-40">
                تاریخ ثبت{" "}
                <MdOutlineDateRange className="inline-block text-bgcolor" />
              </div>
              <div className="basis-32">تعداد کالا</div>
              <div className="basis-40">
                تاریخ جمع آوری{" "}
                <MdOutlineDateRange className="inline-block text-bgcolor" />
              </div>
              <div className="basis-40">هزینه ارسال</div>
              <div className="basis-40">وضعیت</div>
            </div>
            <hr className="bg-utils-300 h-[2px]" />
            {/* trow */}
            <div className="flex flex-row my-3 text-gray-800 text-sm">
              <div className="basis-40 pr-2">
                <BiBarcode className="inline-block text-gray-400" /> 252696
              </div>
              <div className="basis-40">کیانوش عزیزی</div>
              <div className="basis-40">1402/09/27</div>
              <div className="basis-32">1</div>
              <div className="basis-40">1402/09/28</div>
              <div className="basis-40">5000000 تومان</div>
              <div className="basis-40 text-utils-300">
                 در حال بررسی
                <FiTruck  className="text-utils-300 inline-block mr-1" />
              </div>
              <div className="text-bgcolor group cursor-pointer">
                جزئیات سفارش
                <IoIosArrowBack className="inline pr-1 text-2xl group-hover:pr-2" />
              </div>
            </div>
            <hr />
            <div className="flex flex-row my-3 text-gray-800 text-sm">
              <div className="basis-40 pr-2">
                <BiBarcode className="inline-block text-gray-400" /> 252696
              </div>
              <div className="basis-40">کیانوش عزیزی</div>
              <div className="basis-40">1402/09/27</div>
              <div className="basis-32">1</div>
              <div className="basis-40">1402/09/28</div>
              <div className="basis-40">25000 تومان</div>
              <div className="basis-40 text-green-700">
                تکمیل شده{" "}
                <AiFillCheckCircle className="text-[green] inline-block" />
              </div>
              <div className="text-bgcolor group cursor-pointer">
                جزئیات سفارش
                <IoIosArrowBack className="inline pr-1 text-2xl group-hover:pr-2" />
              </div>
            </div>
            <hr />
           
          </div>
          {/* end:table */}
        </div>
      </div>
    </div>
  );
};

export default page;
