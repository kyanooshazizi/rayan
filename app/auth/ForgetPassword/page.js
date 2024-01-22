"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import { setCookie } from "cookies-next";
const page = () => {
  const router = useRouter();

const [data,setData]=useState("");
const changeHandler=(event)=>{
    setData(
     event.target.value
    )
}

const checkRouter=(res)=>{
  if(res){
    setCookie("username",data,{maxAge:60*60*24*1 })
    swal({text:"کد یکبار مصرف با موفقیت ارسال شد", icon:"success"});
    router.push( '/auth/register/checkCode?type=ForgetPassword')
  }else{
    swal({text:"کاربری با این مشخصات یافت نشد",  icon: "error"});
  }
}
const formHandler=(event)=>{
    event.preventDefault();
      fetch("https://mohaddesepkz.pythonanywhere.com/users/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username:data}),
    }).then(res=>
      {if(!res.ok){
       console.log(res.json())
        return null
      }else{
        return res.json();
      }
      }
      ).then(res=>checkRouter(res)).catch(err=>console.log(err))
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
