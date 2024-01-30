"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// icon
import { useThemeContext } from "@/components/context/store";
import swal from "sweetalert";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
const Register = () => {
  const searchParams = useSearchParams();
  const typeurl = searchParams.get("type");
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
  });
  const [flagrout, setFlagrout] = useState(false);
  console.log("🚀 ~ Register ~ data:", data.username);

  const [flagPost, setFlagPost] = useState(false);
  const [focus, setFocus] = useState("");
  // start:checkregister user
  const { islogin } = useThemeContext();
  const [error, setError] = useState("");
  const checkRouter = (res) => {
    if (res) {
      setCookie("username", data.username, { maxAge: 60 * 60 * 24 * 1 });
      swal({ text: "کد یکبار مصرف با موفقیت ارسال شد", icon: "success" });
      if (typeurl === "ForgetPassword") {
        router.push("/auth/register/checkCode?type=ForgetPassword");
      } else {
        router.push("/auth/register/checkCode");
      }
    } else {
      if (typeurl === "ForgetPassword") {
        swal({ text: "کاربری با این مشخصات وجود ندارد", icon: "error" });
      } else {
        swal({ text: "کاربری با این مشخصات قبلا وجود دارد", icon: "error" });
      }
    }
  };
  // end:checkregister user
  useEffect(() => {
    if (focus || flagPost) {
      if (!data.username.trim()) {
        setError("شماره موبایل یا ایمیل معتبر وارد کنید");
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
          data.username
        ) &&
        !/^0[0-9]{10}$/.test(data.username)
      ) {
        setError("شماره موبایل یا ایمیل معتبر وارد کنید");
      } else setError("");
    }
    if (flagPost) {
      fetch(
        `https://mohaddesepkz.pythonanywhere.com/users/${
          typeurl === "ForgetPassword" ? "forgot-password" : "register/code"
        }/`,
        {
          method: "POST",
          body: JSON.stringify({
            username: data.username,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (!res.ok) {
            return null;
          } else {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          return checkRouter(res);
        })
        .catch((error) => {
          swal({
            text: "ارسال کد اعتبار سنجی با خطا مواجه شده است",
            icon: "error",
          });
          console.error(error);
        });
      setFlagPost(false);
    }
  }, [data, flagPost]);

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
  const changeHandler = (event) => {
    setData({ username: event.target.value });
  };

  const changeFocuse = (e) => {
    setFocus(true);
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (error) {
      notify("warn", "ایمیل یا شماره تلفن وارد شده معتبر نیست");
    } else {
      setError("");
      setFlagPost(true);
    }
  };

  // start:color outline handler
  const ColorinputHandler = (x, y) => {
    if (x && y) {
      return "outline-[red]";
    } else if (!x && y) {
      return "outline-[green]";
    }
  };
  // end:color outline handler
  if (islogin) {
    router.push("/");
  }

  return (
    <>
      <div className="w-full min-h-screen bg-dashboard">
        <div className="p-6 lg:hidden flex flex-row-reverse">
        <Image
          src="/imag_homepage/logoRayan1.svg"
          width={120}
          height={35}
          alt="logo"
          className=""
        />
        </div>
        <div className="flex">
          <div className="lg:basis-[33%] lg:block hidden bg-bgcolor h-[100vh] relative ">
            <div className="absolute top-[62px] right-[93px]">
              <Image
                src="/imag_homepage/logoRayan.svg"
                width={196}
                height={35}
                alt="logo"
              />
            </div>
            <div className="absolute top-[50%] right-[93px] text-white">
              <span className="text-white text-[38px] font-[800] ">رایان</span>
              <p className="leading-8">راه حل های هوشمند</p>
              <p>کسب و کار های اینترنتی</p>
            </div>
          </div>
          <div className="lg:basis-[67%] basis-full h-[100vh] relative flex justify-center lg:items-center lg:mt-0 mt-[120px] ">
            <form
              action=""
              className=" lg:basis-[50%] sm:basis-[70%] basis-[90%]"
              onSubmit={formHandler}
            >
              <span className="md:text-[27px] text-[24px] md:font-[500] font-[600] mb-2 block">
                  {typeurl === "ForgetPassword"?"فراموشی رمز عبور":"ایجاد حساب کاربری"}
              </span>
              {/* start:user */}
              <div className="relative w-full">
                <Image
                  src="/imag_auth/user_icon.svg"
                  width={22}
                  height={22}
                  alt="logo"
                  className="absolute top-[35px] left-[14px]"
                />
                <label htmlFor="username block">ایمیل / شماره همراه</label>
                <input
                  name="username"
                  type="text"
                  value={data.username}
                  className={`mt-1 px-3 py-3 block rounded-md  w-full  cursor-pointer ${ColorinputHandler(
                    error,
                    focus
                  )}`}
                  placeholder="ایمیل/شماره همراه"
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                />
                {error && focus && (
                  <span className="text-[red] mr-6 text-sm">{error}</span>
                )}
              </div>
              {/* end:user */}

              <button
                type="submit"
                className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-full mt-8"
              >
                {typeurl === "ForgetPassword" ? "تایید" : "تایید اطلاعات"}
              </button>
              <Link
                href="/"
                className="text-center font-[500] bg-white text-gray-500 py-3 rounded-md inline-block w-full mt-3"
              >
                بازگشت به صفحه اصلی
              </Link>

              {/* {typeurl === "ForgetPassword" ? (
                <p className="inline-block mt-4 text-lg">
                  {" "}
                  <Link
                    className="text-[blue] cursor-pointer"
                    href="/auth/login"
                  >
                    وارد شوید
                  </Link>
                </p>
              ) : (
                <p className="inline-block mt-4">
                  قبلا ثبت نام کرده اید؟{" "}
                  <Link
                    className="text-[blue] cursor-pointer"
                    href="/auth/login"
                  >
                    وارد شوید
                  </Link>
                </p>
              )} */}
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
