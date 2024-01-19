"use client"
import Link from "next/link";
import React, { useState,useEffect } from "react";
// icon
import { useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { MethodFlagHandler } from "@/components/utilsorder/utils/MethodFlagHandler";
import { useSelector } from "react-redux";
import { useThemeContext } from "@/components/context/store";
import { AiFillHome } from "react-icons/ai";
const login = () => {
  const { setIslogin,islogin } = useThemeContext();
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
      setCookie("access_token", res.token.access,{maxAge:60*60*24*10 });
      setIslogin(true);
    } else {
      notify("warn", "نام کاربری یا رمز عبور اشتباه است!");
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
        .catch((error) =>{
          console.log("error",error);
          notify("warn", "نام کاربری یا رمز عبور اشتباه است!");
        });
      }
      setFlagPost(false);
  }, [flagPost]);
  const changeHandler=(event)=>{
    setData(prevdata=>({
      ...prevdata,
      [event.target.name]: event.target.value,
    }))
  }
  const formHandler=(event)=>{
    event.preventDefault();
    if(!(data.user&&data.password)){
      notify("warn", "نام کاربری و پسورد خود را وارد کنید")
    }else{
      if (data.user.includes("@")) {
        setEmail(data.user);
      } else {
        setPhone(data.user);
      }
      setFlagPost(true);
    }
   
  }
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
     <div className="md:w-2/3 lg:w-1/3 w-[92%] sm:w-[80%] relative bg-transparent">
        <div className="absolute w-full top-0 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.4)] backdrop-blur-5 p-5 mt-[100px]">
          <Link href="/">
            <div className=" my-3 text-[blue] text-2xl" > <AiFillHome className="inline ml-2" />صفحه اصلی </div>
          </Link>
          <p className="text-center md:text-xl sm:text-lg text-sm font-bold bg-bgcolor text-white py-4 rounded-md">
             ورود به سایت
          </p>
          <form action="" className="mt-5" onSubmit={formHandler}>
            <div className="relative">
            <FaPhoneAlt className="absolute top-8 left-10 text-bgcolor" />
            <input
            name="user"
            type="text"
              className="mt-4 px-2 py-3 rounded-md outline-bgcolor w-[90%]  mr-5 cursor-pointer"
              placeholder="شماره موبایل یا ایمیل"
              onChange={(event) => changeHandler(event)}
            />
            </div>
            <div className="relative">
           <RiLockPasswordFill className="absolute top-8 left-10 text-bgcolor" />
           <input
           name="password"
             type="password"
             className="mt-4 px-2 py-3 rounded-md outline-bgcolor w-[90%]  mr-5 cursor-pointer"
             placeholder="رمز عبور"
             onChange={(event) => changeHandler(event)}
           />
           </div>
            <button
              type="submit"
              className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-6 mr-5"
            >
              ورود
            </button>
            <p className="inline mr-2"> 
            حساب کاربری ندارید؟
              <Link className="text-[blue] cursor-pointer pr-2" href="/auth/register">ثبت نام کنید</Link>
            </p>
            <hr className="my-2"/>
          </form>
           <div className="flex justify-between my-3">
           <Link href="/auth/login/email"> 
             <span className=" mr-8 text-[blue] ">ورود با ایمیل</span>  
            </Link>
            <Link href="/auth/ForgetPassword"> 
             <span className=" mr-8 text-[red] ">فراموشی رمز عبور</span>  
            </Link>
           </div>
         
        </div>
        <ToastContainer />
      </div>
     </div>
    </>
  );
};

export default login;


