"use client";
import React, { useState, useEffect } from "react";
import VerificationInput from "react-verification-input";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import swal from 'sweetalert';
import { useSearchParams } from 'next/navigation';
const page = () => {
  const searchParams = useSearchParams();
  const typeurl = searchParams.get('type')
  
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [code, setCode] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);

  const codeHandler = (event) => {
    setCode(event);
  };
  const checkCode=(res)=>{
if(res){
  swal({
    text: "اعتبار سنجی با موفقیت انجام شد",
    icon: "success",
  });
  if(typeurl==="ForgetPassword"){
    router.push("/auth/register/Password?type=ForgetPassword")
  }else{

    router.push("/auth/register/Password")
  }
}else{
    notify("warn", "کد وارد شده صحیح نیست");
}
  }

  const notify = (type, text) => {
    if (type === "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } else {
      toast.warn(text, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    fetch(`https://mohaddesepkz.pythonanywhere.com/users/${typeurl==="ForgetPassword"?"reset":"register"}/check-code/`, {
        method: "POST",
        body: JSON.stringify({
            code:code,
            username:getCookie("username")
        }),
        headers: { "Content-Type": "application/json" },
      }).then(res=>{
        if(!res.ok){
          console.log(res.json())
            return null
        }else{
          return res.json()
        }
    }).then(res=>{
        console.log(res)
    checkCode(res)
    }).catch(err=>console.log(err))
  };

  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 lg:w-1/3 w-[92%] sm:w-[80%] relative bg-transparent">
        <div className="absolute w-full top-0 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.4)] backdrop-blur-5 p-5 mt-[100px]">
          <Link href="/">
            <div className=" my-3 text-[blue] text-2xl">
              {" "}
              <AiFillHome className="inline ml-2" />
              صفحه اصلی{" "}
            </div>
          </Link>
          {isClient ? (
            <p className="text-center md:text-base sm:text-sm text-sm  bg-green-600 text-white py-4 rounded-md">
              {`کد اعتبارسنجی شما به ${getCookie("username")} ارسال شد`}
            </p>
          ) : (
            <p className="text-center md:text-base sm:text-sm text-sm  bg-green-600 text-white py-4 rounded-md">
              {`کد اعتبارسنجی شما به ... ارسال شد`}
            </p>
          )}

          <form action="" className="mt-5" onSubmit={formHandler}>
            {/* start:user */}
            <div className="text-center mx-auto flex justify-center">
              <VerificationInput
                value={code}
                onChange={(event) => codeHandler(event)}
                length={4}
                validChars="0-9"
                classNames={{
                  container: "ltr",
                  character: "border-1 border-green-700 border-solid rounded bg-[#fff]",
                  characterInactive: "character--inactive",
                  characterSelected: "border-none",
                  characterFilled: "text-green-700 border-none",
                }}
                placeholder=""
              />
            </div>
            {/* end:user */}

            <button
              type="submit"
              className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-6 mr-5"
            >
              تایید
            </button>
            <p className="inline mr-2">
              قبلا ثبت نام کرده اید؟{" "}
              <Link className="text-[blue] cursor-pointer" href="/auth/login">
                وارد شوید
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default page;
