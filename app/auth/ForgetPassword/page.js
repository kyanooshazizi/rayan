"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import swal from 'sweetalert';

const page = () => {
// const [email,setEmail]=useState("");
// const [phone,setPhone]=useState("");
const [data,setData]=useState("");
const changeHandler=(event)=>{
    event.preventDefault();
    setData(
     event.target.value
    )
}
const formHandler=(event)=>{
    event.preventDefault();
    // if (data.includes("@")) {
        // setEmail(data);
      fetch("https://mohaddesepkz.pythonanywhere.com/users/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username:data}),
    }).then(res=>
      {if(!res.ok){
        console.log(res)
        swal({text:"کاربری با این مشخصات یافت نشد!",  icon: "error"});
        return null
      }else{
        swal({text:"کد یکبار مصرف با موفقیت ارسال شد", icon:"success"});
        console.log(res)
        return res.json();
      }
      }
      ).then(res=>res).catch(err=>console.log(err))
      // }
      //  else {
      //   // setPhone(data);
      //   fetch("https://mohaddesepkz.pythonanywhere.com/users/forgot-password/", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({username:data}),
      //   }).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))
      // }
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
              فراموشی رمز عبور
            </p>
            <form action="" className="mt-5" onSubmit={formHandler}>
              {/* start:user */}
              <div className="relative">
                <FaUserAlt className={`absolute top-[36px] left-10 text-bgcolor`} />
                <input
                  name="user"
                  type="text"
                  value={data}
                  className={`mt-6 px-2 py-3 rounded-md  w-[90%]  mr-5 cursor-pointer`}
                  placeholder="شماره موبایل یا ایمیل خود را وارد کنید" 
                  onChange={(event) => changeHandler(event)}
                />
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
