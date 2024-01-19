"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// icon
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Validate } from "./Validate";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useThemeContext } from "@/components/context/store";
import { useSelector } from "react-redux";
import { MethodFlagHandler } from "@/components/utilsorder/utils/MethodFlagHandler";

const Register = () => {
  const datastore = useSelector((state) => state.order.order);
  const router = useRouter();
  const [data, setData] = useState({
    user: "",
    password: "",
    confirm_password: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flagPost, setFlagPost] = useState(false);

  const [flagicon, setFlagicon] = useState(false);
  const [error, setError] = useState({});
  const [focus, setFocus] = useState({});
  // start:checkregister user
  const { setIslogin,islogin} = useThemeContext();

  const CheckRegister = (res) => {
    if (res.token) {
      setCookie("access_token", res.token.access,{maxAge:60*60*24*10 });
      setIslogin(true)
      notify("success", "ثبت نام با موفقیت انجام شد");

    } else if(res.phone||res.email) {
      notify("warn", "کاربری با این اطلاعات وجود دارد");
    }else if(res.non_field_errors){
      notify("warn", "لطفا پسورد قویتری را وارد کنید");
    }
  };
  // end:checkregister user
  useEffect(() => {
    setError(Validate(data));
    if (flagPost) {
      fetch("https://mohaddesepkz.pythonanywhere.com/users/register/", {
        method: "POST",
        //  withCredentials: true,
        credentials: "include",
        body: JSON.stringify({
          phone,
          email,
          password: data.password,
          password2: data.confirm_password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
            return res.json();
        })
        .then((res) =>CheckRegister(res))
        .catch((error) => {
          notify("warn", "خطایی رخ داده است");
          console.error(error)});
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
        user: true,
        password: true,
        // confirm_password:true
      });
      notify("", "اطلاعاتتون رو درست وارد نکرده اید");
    } else {
      if (data.user.includes("@")) {
        setEmail(data.user);
      } else {
        setPhone(data.user);
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
  if(islogin){
    if(MethodFlagHandler(datastore)){
      router.push("/order/address");
    }else{

      router.push("/");
    }
    
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
              عضویت
            </p>
            <form action="" className="mt-5" onSubmit={formHandler}>
              {/* start:user */}
              <div className="relative">
                <FaUserAlt className={`absolute top-8 left-10 text-bgcolor`} />
                <input
                  name="user"
                  type="text"
                  value={data.user}
                  className={`mt-4 px-2 py-3 rounded-md  w-[90%]  mr-5 cursor-pointer ${ColorinputHandler(
                    error.user,
                    focus.user
                  )}`}
                  placeholder="شماره موبایل یا ایمیل"
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                />
                {error.user && focus.user && (
                  <span className="text-[red] mr-6 text-sm">{error.user}</span>
                )}
              </div>
              {/* end:user */}
              {/* start:password */}
              <div className="relative">
                {flagicon ? (
                  <IoEyeSharp
                    className="absolute top-8 left-10 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="absolute top-8 left-10 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                )}

                <input
                  name="password"
                  type={!flagicon ? "password" : "text"}
                  className={`mt-4 px-2 py-3 rounded-md  w-[90%]  mr-5 cursor-pointer ${ColorinputHandler(
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
                    className="absolute top-8 left-10 text-bgcolor cursor-pointer"
                    onClick={iconHandler}
                  />
                ) : (
                  <BsEyeSlashFill
                    className="absolute top-8 left-10 text-bgcolor cursor-pointe"
                    onClick={iconHandler}
                  />
                )}
                <input
                  value={data.confirm_password}
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                  name="confirm_password"
                  type={!flagicon ? "password" : "text"}
                  className={`mt-4 px-2 py-3 rounded-md  w-[90%]  mr-5 cursor-pointer ${ColorinputHandler(
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
                className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-6 mr-5"
              >
                ثبت نام
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
    </>
  );
};

export default Register;
