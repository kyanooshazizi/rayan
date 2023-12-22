"use client"
import Link from "next/link";
import React, { useState } from "react";
// icon
import { FaPhoneAlt } from "react-icons/fa";


const Register = () => {
 

  return (
    <>
     <div className="flex justify-center">
     <div className="md:w-1/2 lg:w-[430px] w-[92%] sm:w-[80%] relative bg-transparent">
        <div className="absolute w-full top-0 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.4)] backdrop-blur-5 p-5 mt-[100px]">
          <p className="text-center md:text-xl sm:text-lg text-sm font-bold bg-bgcolor text-white py-4 rounded-md">
             ورود
          </p>
          <form action="" className="mt-5">
            <div className="relative">
            <FaPhoneAlt className="absolute top-8 left-10 text-bgcolor" />
            <input
              type="number"
              className="mt-4 px-2 py-3 rounded-md outline-bgcolor w-[90%]  mr-5 cursor-pointer"
              placeholder="شماره موبایل"
            />
            </div>
            <button
              type="submit"
              className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-6 mr-5"
            >
              تایید
            </button>
            <p className="inline mr-2"> 
            حساب کاربری ندارید؟
              <Link className="text-[blue] cursor-pointer pr-2" href="/auth/register">ثبت نام کنید</Link>
            </p>
            <hr className="my-2"/>
          </form>
            <Link href="/auth/login/email"> 
             <span className=" mr-8 text-utils-300 font-bold">ورود با ایمیل</span>  
            </Link>
        </div>
      </div>
     </div>
    </>
  );
};

export default Register;


