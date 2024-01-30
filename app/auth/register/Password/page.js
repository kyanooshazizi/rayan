"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// icon
import { Validate } from "../Validate";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useThemeContext } from "@/components/context/store";
import { useSelector } from "react-redux";
import { MethodFlagHandler } from "@/components/utilsorder/utils/MethodFlagHandler";
import { getCookie ,deleteCookie} from "cookies-next";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
const Register = () => {
  const searchParams = useSearchParams();
  const typeurl = searchParams.get('type')
  console.log("🚀 ~ page ~ typeurl:", typeurl)
  const datastore = useSelector((state) => state.order.order);
  const router = useRouter();
  const [data, setData] = useState({
    password: "",
    confirm_password: "",
  });

  const [flagPost, setFlagPost] = useState(false);
  const [senddata, setSenddata] = useState("");
  const [flagicon, setFlagicon] = useState(false);
  const [error, setError] = useState({});
  const [focus, setFocus] = useState({});
  // start:checkregister user
  const { setIslogin, islogin } = useThemeContext();

  const CheckRegister = (res) => {
    // console.log(res);
    if (res.token) {
      setCookie("access_token", res.token.access, {
        maxAge: 60 * 60 * 24 * 10,
      });
      deleteCookie("username")
      setIslogin(true);
      notify("success", "ثبت نام با موفقیت انجام شد");
    } else if (res.phone || res.email) {
      notify("warn", "کاربری با این اطلاعات وجود دارد");
    } else if (res.non_field_errors) {
      notify("warn", "لطفا پسورد قویتری را وارد کنید");
    }else{
      if(typeurl==="ForgetPassword"){
        deleteCookie("username")
        notify("success","رمز عبور با موفقیت تغییر کرد");
      }
    }
  };
  // end:checkregister user
  useEffect(() => {
    setError(Validate(data));
    if (flagPost) {
      fetch(`https://mohaddesepkz.pythonanywhere.com/users/${typeurl==="ForgetPassword"?"reset-password":"register"}/`, {
        method: "POST",
        body: JSON.stringify(
          senddata,
        ),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => CheckRegister(res))
        .catch((error) => {
          notify("warn", "خطایی رخ داده است");
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
    setData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  };
  const iconHandler = () => {
    setFlagicon((prev) => !prev);
  };
  const changeFocuse = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };
  // usemutate:start

  // usemutate:end
  const formHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(error).length == 0) {
      setFocus({
        password: true,
        // confirm_password:true
      });
      notify("", "لطفا یک پسورد معتبر را وارد کنید");
    } else {
      if(typeurl==="ForgetPassword"){
        setSenddata({
          username: getCookie("username"),
          password: data.password,
          password2: data.confirm_password,
        });
      }else{

        if (getCookie("username").includes("@")) {
          setSenddata({
            email: getCookie("username"),
            password: data.password,
            password2: data.confirm_password,
          });
        } else {
          setSenddata({
            phone: getCookie("username"),
            password: data.password,
            password2: data.confirm_password,
          });
        }
      }
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
    if (MethodFlagHandler(datastore)) {
      router.push("/order/address");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex justify-center w-full min-h-screen bg-white">
        <div className="lg:block hidden basis-[33%] w-full bg-dashboard">
        <Image
          src="/imag_auth/logo_blue.svg"
          width={137}
          height={47}
          alt="logo"
          className="mt-[80px] mr-[90px]"
        />
        <div className="mr-[90px] mt-[300px]">
          <span className="text-bgcolor text-[36px] font-[800] block">رایان</span>
          <span className="text-[#636363] text-[18px]">بهینه مدیریت کنید</span>
        </div>
        </div>
        <div className="lg:basis-[67%] md:basis-[80%] basis-full  w-full bg-white lg:mt-[180px] mt-[140px]">
            <form action="" className="mt-5 lg:w-[45%] w-[90%] mx-auto  " onSubmit={formHandler}>
            <p className="lg:text-[30px] text-[24px] font-[600] text-gray-600">
              {typeurl==="ForgetPassword"?"رمز عبور جدید خود را وارد کنید":" تکمیل عضویت"}
             
            </p>
              {/* start:password */}
              <div className="relative">
                {flagicon ? (
                  <IoEyeSharp
                    className="absolute top-8 left-6 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="absolute top-8 left-6 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                )}

                <input
                  name="password"
                  type={!flagicon ? "password" : "text"}
                  className={`mt-6 px-2 py-3 rounded-[5px] bg-dashboard  w-full   cursor-pointer ${ColorinputHandler(
                    error.password,
                    focus.password
                  )}`}
                  placeholder="رمزعبور"
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                  value={data.password}
                />
                {error.password && focus.password && (
                  <span className="text-[red] mr-5 text-sm">
                    {error.password}
                  </span>
                )}
              </div>
              {/* end:password */}
              {/* start:confirm_password */}
              <div className="relative">
                {flagicon ? (
                  <IoEyeSharp
                    className="absolute top-8 left-6 text-bgcolor cursor-pointer"
                    onClick={iconHandler}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="absolute top-8 left-6 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                )}
                <input
                  value={data.confirm_password}
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                  name="confirm_password"
                  type={!flagicon ? "password" : "text"}
                  className={`mt-3 px-2 py-3 rounded-[5px] bg-dashboard  w-full  cursor-pointer ${ColorinputHandler(
                    error.confirm_password,
                    focus.confirm_password
                  )}`}
                  placeholder="تکرار رمزعبور"
                />
                {error.confirm_password && focus.confirm_password && (
                  <span className="text-[red] mr-6 text-sm">
                    {error.confirm_password}
                  </span>
                )}
              </div>
              {/* end:confirm_password */}
              <button
                type="submit"
                className="text-center font-bold bg-bgcolor text-white py-[10px] rounded-[5px] inline-block w-full mt-6"
              >
                 {typeurl==="ForgetPassword"?"تغییر رمز عبور":"ثبت نام"}
              </button>
              {typeurl==="ForgetPassword"?<p className="inline ">    
                <Link className="text-center font-bold bg-[#515E83] text-white py-[10px] rounded-[5px] inline-block w-full mt-6 cursor-pointer" href="/auth/login">
                  وارد شوید
                </Link>
              </p>:<p className="block mt-6 text-[16px] text-gray-600">    
                قبلا ثبت نام کرده اید؟
                <Link className="text-center font-bold bg-[#515E83] text-white py-[10px] rounded-[5px] inline-block w-full mt-2 cursor-pointer" href="/auth/login">
                  وارد شوید
                </Link>
              </p>}
              
            </form>
          </div>
          <ToastContainer />
      </div>
    </>
  );
};

export default Register;
