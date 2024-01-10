import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import { FaWallet } from "react-icons/fa6";
import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import {getData} from "@/components/utilsFunction/checklogin";

const page = async() => {
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
  const waletTotal = 50000;
  return (
    <div>
      <Navbar data={data}/>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-2">
          <Sidbar />
        </div>
        <div className="col-start-2 col-end-13 mt-[150px] flex justify-center">
          <div className="grid grid-cols-5 gap-4 w-[90%] h-[220px]">
            <div className="grid gap-4 col-start-1 col-span-1">
              <div className="bg-txcolor">
                <span className="mr-2 block text-[green]">
                  سفارش های ثبت شده:
                </span>
                <span className="mr-2 mt-4 block text-4xl text-center font-bold ">
                  20
                </span>
                <Link
                  href="/dashboard/Orders"
                  className="text-[blue] float-left ml-2"
                >مشاهده</Link>
              </div>
              <div className="bg-txcolor">
                <span className="mr-2 block text-[orange]">
                  {" "}
                  سفارش ثبت نشده:
                </span>
                <span className="mr-2 mt-4 block text-4xl text-center font-bold ">
                  1
                </span>
                <Link
                  href="/order/requst"
                  className="text-[blue] float-left ml-2"
                >مشاهده</Link>
              </div>
            </div>
            <div className="bg-txcolor col-start-2 col-span-2">
              <span className="mr-2 block"> موجودی کیف پول:</span>
              <div className="mt-4 flex justify-center text-4xl text-utils-300">
                <FaWallet className="mr-1" />
              </div>
              <p className="text-center mt-4">
                <span className="text-2xl ml-2 font-bold">
                  {waletTotal.toLocaleString()}
                </span>{" "}
                تومان
              </p>
              <div className="text-center mt-4 text-sm">
                <button className="bg-bgcolor px-2 py-2 rounded-md text-txcolor">
                  افزایش موجودی
                </button>
              </div>
            </div>
            <div className="bg-txcolor col-start-4 col-span-2 ml-2">
              <span className="mr-2 block"> پیگیری مرسوله های ارسالی:</span>
              <form className="flex flex-col items-center mt-4">
                <input
                  type="text"
                  className="w-4/5 border-1 border-solid border-bgcolor cursor-pointer px-2 py-3 rounded-md"
                  placeholder="کد رهگیری خود را وارد کنید"
                />
                <button className="bg-bgcolor px-2 py-2 rounded-md text-txcolor block mt-4">
                  پیگیری
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
