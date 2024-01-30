"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// icon
import { useRouter } from "next/navigation";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { MethodFlagHandler } from "@/components/utilsorder/utils/MethodFlagHandler";
import { useSelector } from "react-redux";
import { useThemeContext } from "@/components/context/store";
import Image from "next/image";

const login = () => {
  const { setIslogin, islogin } = useThemeContext();
  const router = useRouter();
  const datastore = useSelector((state) => state.order.order);
  const [data, setData] = useState({
    user: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flagPost, setFlagPost] = useState(false);
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
  const CheckLogin = (res) => {
    if (res.token) {
      setCookie("access_token", res.token.access, {
        maxAge: 60 * 60 * 24 * 10,
      });
      setIslogin(true);
      notify("success", "به رایان خوش آمدید");
    } else {
      notify("warn", "نام کاربری یا رمز عبور اشتباه است");
    }
  };
  useEffect(() => {
    if (flagPost) {
      fetch("https://mohaddesepkz.pythonanywhere.com/users/login/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          phone,
          email,
          password: data.password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => CheckLogin(res))
        .catch((error) => {
          console.log("error", error);
          notify("warn", "نام کاربری یا رمز عبور اشتباه است");
        });
    }
    setFlagPost(false);
  }, [flagPost]);
  const changeHandler = (event) => {
    setData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  };
  const formHandler = (event) => {
    event.preventDefault();
    if (!(data.user && data.password)) {
      notify("warn", "نام کاربری و پسورد خود را وارد کنید");
    } else {
      if (data.user.includes("@")) {
        setEmail(data.user);
      } else {
        setPhone(data.user);
      }
      setFlagPost(true);
    }
  };
  if (islogin) {
    if (MethodFlagHandler(datastore)) {
      router.push("/order/address");
    } else {
      router.push("/");
    }
  }
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex">
        <div className="lg:basis-[40%] basis-full lg:mx-14 lg:block flex justify-center items-center h-[100vh] relative ">
          <div className="absolute top-[20%] lg:w-full md:w-[80%] w-full">
            {/* start:titr form */}
            <div className="px-[20px]">
              <p className="text-[42px] font-[400] py-3">ورود به رایان</p>
              <p className="inline mr-2">
                حساب کاربری ندارید؟
                <Link
                  className="text-[blue] cursor-pointer pr-2"
                  href="/auth/register"
                >
                  ثبت نام کنید
                </Link>
              </p>
            </div>
            {/* end:titr form */}
            {/* start: form */}
            <div className="">
              <form action="" className="mt-5 w-[90%]" onSubmit={formHandler}>
                <div className="relative">
                  <Image
                    src="/imag_auth/user.svg"
                    width={22}
                    height={22}
                    alt="image"
                    className="absolute top-[36px] left-[3px]"
                    priority
                  />
                  <label htmlFor="user" className="mt-4 block mr-5">
                    نام کاربری
                  </label>
                  <input
                    name="user"
                    type="text"
                    className=" px-2 py-3 rounded-md outline-gray-300 w-full  mr-5 cursor-pointer bg-[#F3F6FB]"
                    placeholder="ایمیل/ شماره موبایل"
                    onChange={(event) => changeHandler(event)}
                  />
                </div>
                <div className="relative">
               
                {/* <RiLockPasswordLine className="absolute top-[36px] left-[55px] text-[#D9D9D9] bg-white rounded-lg text-2xl" /> */}
                <Image
                    src="/imag_auth/password.svg"
                    width={22}
                    height={22}
                    alt="image"
                    className="absolute top-[36px] left-[3px]"
                    priority
                  />
                  <label htmlFor="password" className="mt-3 block mr-5">
                    کلمه عبور
                  </label>
                  <input
                    name="password"
                    type="password"
                    className=" px-2 py-3 rounded-md outline-gray-300 w-full  mr-5 cursor-pointer bg-[#F3F6FB]"
                    placeholder="کلمه عبور"
                    onChange={(event) => changeHandler(event)}
                  />
                  <Link href="/auth/register?type=ForgetPassword">
                    <span className="float-left mt-[10px] ml-1 text-gray-600 md:text-[14px] text-[13px] ">
                      فراموشی رمز عبور
                    </span>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-full mt-6 mr-5"
                >
                  ورود
                </button>
              </form>
            </div>
            {/* end: form */}
          </div>
        </div>
        <div className="lg:basis-[60%] lg:block  hidden h-[100vh] relative">
          <Image
            src="/imag_auth/login.jpg"
            width={814}
            height={1024}
            alt="image"
            className="w-full h-full"
            priority
          />
          <div className="absolute top-[80%] lg:left-[60%] left-[40%] z-10">
            <Image
              src="/imag_auth/logo.svg"
              width={196}
              height={38}
              alt="logo"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
