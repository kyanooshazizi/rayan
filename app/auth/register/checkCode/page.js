"use client";
import React, { useState, useEffect } from "react";
import VerificationInput from "react-verification-input";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
const page = () => {
  const searchParams = useSearchParams();
  const typeurl = searchParams.get("type");

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [code, setCode] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);

  const codeHandler = (event) => {
    setCode(event);
  };
  const checkCode = (res) => {
    if (res) {
      swal({
        text: "اعتبار سنجی با موفقیت انجام شد",
        icon: "success",
      });
      if (typeurl === "ForgetPassword") {
        router.push("/auth/register/Password?type=ForgetPassword");
      } else {
        router.push("/auth/register/Password");
      }
    } else {
      swal({
        text: "کد وارد شده صحیح نیست",
        icon: "error",
      });
    }
  };

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
    fetch(
      `https://mohaddesepkz.pythonanywhere.com/users/${
        typeurl === "ForgetPassword" ? "reset" : "register"
      }/check-code/`,
      {
        method: "POST",
        body: JSON.stringify({
          code: code,
          username: getCookie("username"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.log(res.json());
          return null;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        checkCode(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-dashboard">
      <div className="">
        <div className="lg:mt-[180px] mt-[130px] w-full text-center">
          <Image
            src="/imag_auth/logo_blue.svg"
            width={183}
            height={36}
            alt="logo"
            className="mb-3 mx-auto"
          />
          <span className="text-center text-[25px] text-[#636363]">تایید حساب کاربری</span>
        </div>

        <form action="" className="mt-5" onSubmit={formHandler}>
        {isClient ? (
          <p className="py-3 text-center">
       کد اعتبار سنجی ارسال شده به <span className="text-[18px] text-bgcolor px-1 font-[600] ">{`${getCookie("username")}`}</span> را وارد کنید
          </p>
        ) : (
          <p className="py-3 text-center">
            {`کد اعتبارسنجی ارسال شده به ... را وارد کنید`}
          </p>
        )}
          {/* start:user */}
          <div className="text-center mx-auto flex justify-center">
            <VerificationInput
              value={code}
              onChange={(event) => codeHandler(event)}
              length={4}
              validChars="0-9"
              classNames={{
                container: "ltr ",
                character:
                  "rounded-[3px] bg-bgcolor border-none",
                characterInactive: "",
                characterSelected: "border-none",
                characterFilled: "text-white border-none",
              }}
              placeholder=""
            />
          </div>
          {/* end:user */}

          <button
            type="submit"
            className="mx-auto text-center block font-bold bg-green-500 text-white py-3 rounded-md w-[300px] mt-8"
          >
            تایید
          </button>
          {/* <p className="inline mr-2">
              قبلا ثبت نام کرده اید؟{" "}
              <Link className="text-[blue] cursor-pointer" href="/auth/login">
                وارد شوید
              </Link>
            </p> */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
