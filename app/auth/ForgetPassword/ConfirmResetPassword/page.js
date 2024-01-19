"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { LuRefreshCcw } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
const page = () => {

const [data,setData]=useState("");
const changeHandler=(event)=>{
    event.preventDefault();
    setData(
      event.target.value
    )
}
const formHandler=(event)=>{
    event.preventDefault();
    
}
  return (
   <>
   <div className="flex justify-center">
        <div className="md:w-1/2 lg:w-1/3 w-[92%] sm:w-[80%] relative bg-transparent">
          <div className="absolute w-full top-0 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.4)] backdrop-blur-5 p-5 mt-[100px]">
          <Link href="/">
            <div className=" my-3 text-[blue] text-2xl" > <AiFillHome className="inline ml-2" />صفحه اصلی </div>
          </Link>
            <p className="text-center md:text-xl sm:text-lg text-sm font-bold bg-bgcolor text-white py-4 rounded-md">
                تایید شماره موبایل
            </p>
            <div className='text-center mt-10 bg-green-400 py-3'>کد تایید شما به شماره تماس 09376445798 ارسال شد.</div>
            <form action="" className="mt-5" onSubmit={formHandler}>
              {/* start:user */}
              <div className="relative">
                <RiLockPasswordFill   className={`absolute top-[35px] text-xl right-[28px] text-bgcolor opacity-40`} />
                <input
                  name="user"
                  type="text"
                  value={data}
                  className={`mt-6 px-2 py-3 pr-10 rounded-md  w-[90%]  mr-5 cursor-pointer`}
                  placeholder="کد تایید" 
                  onChange={(event) => changeHandler(event)}
                />
                <button> <LuRefreshCcw  className={`absolute top-[38px] text-xl left-10 text-bgcolor`} /></button>
              </div>
              {/* end:user */}
             
              <button
                type="submit"
                className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-8 mr-5"
              >
                 تایید
              </button>
              <hr className='my-6 bg-[#c3c0c0] h-[2px] '/>
              <p className="mr-6 my-4">
                <Link className="text-[blue] cursor-pointer" href="/auth/login">
                  ورود به سایت
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
   </>
  )
}

export default page
