"use client";
import Link from "next/link";
import { setCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
// icon
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { useThemeContext } from "@/components/context/store";
import swal from 'sweetalert';
import { useSearchParams } from 'next/navigation';

const Register = () => {
  const searchParams = useSearchParams();
  const typeurl = searchParams.get('type')
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
  });
  const [flagrout,setFlagrout]=useState(false)
  console.log("🚀 ~ Register ~ data:", data.username)

  const [flagPost, setFlagPost] = useState(false);
  const [focus, setFocus] = useState("");
  // start:checkregister user
  const { islogin } = useThemeContext();
const [error,setError]=useState("")
const checkRouter=(res)=>{
  if(res){
    setCookie("username",data.username,{maxAge:60*60*24*1 })
    swal({text:"کد یکبار مصرف با موفقیت ارسال شد", icon:"success"});
    if(typeurl==="ForgetPassword"){

      router.push("/auth/register/checkCode?type=ForgetPassword") 
    }else{
      router.push("/auth/register/checkCode") 
    }
  }else{
    if(typeurl==="ForgetPassword"){
      swal({text:"کاربری با این مشخصات وجود ندارد",  icon: "error"});
    }else{
      swal({text:"کاربری با این مشخصات قبلا وجود دارد",  icon: "error"});

    }
  }
}
  // end:checkregister user
  useEffect(() => {
    if(focus||flagPost){
      if(!data.username.trim()){
        setError("شماره موبایل یا ایمیل معتبر وارد کنید!")
     }else if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(data.username))&&!(/^0[0-9]{10}$/.test(data.username))){
       setError("شماره موبایل یا ایمیل معتبر وارد کنید!")
     }else(
      setError("")
     )
    }
    if (flagPost) {
      fetch(`https://mohaddesepkz.pythonanywhere.com/users/${typeurl==="ForgetPassword"?"forgot-password":"register/code"}/`, {
        method: "POST",
        body: JSON.stringify({
          username:data.username
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if(!res.ok){
            return null;
          }
          else{
            return res.json();
          }
        })
        .then((res) =>{
          console.log(res);
          return checkRouter(res)
        })
        .catch((error) => {
          console.error(error);
        });
      setFlagPost(false);
    }
  }, [data,flagPost]);

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
    setData({username:event.target.value});
  };

  const changeFocuse = (e) => {
    setFocus(true);
  };
  
  const formHandler = (event) => {
    event.preventDefault();
    if(error){
      notify("warn", "ایمیل یا شماره تلفن وارد شده معتبر نیست");
    }
  else{   
    setError("") 
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
            <p className="text-center md:text-xl sm:text-lg text-sm font-bold bg-bgcolor text-white py-4 rounded-md">
              {typeurl==="ForgetPassword"?"فراموشی رمز عبور":"عضویت"}
            </p>
            <form action="" className="mt-5" onSubmit={formHandler}>
              {/* start:user */}
              <div className="relative">
                <FaUserAlt className={`absolute top-8 left-10 text-bgcolor`} />
                <input
                  name="username"
                  type="text"
                  value={data.username}
                  className={`mt-4 px-2 py-3 rounded-md  w-[90%]  mr-5 cursor-pointer ${ColorinputHandler(
                    error,
                    focus
                  )}`}
                  placeholder="شماره موبایل یا ایمیل خود را وارد کنید"
                  onChange={(event) => changeHandler(event)}
                  onFocus={changeFocuse}
                />
                {error&& focus && (
                  <span className="text-[red] mr-6 text-sm">
                    {error}
                  </span>
                )}
              </div>
              {/* end:user */}

              <button
                type="submit"
                className="text-center font-bold bg-bgcolor text-white py-3 rounded-md inline-block w-1/3 mt-6 mr-5"
              >
                {typeurl==="ForgetPassword"?"تایید":"ثبت نام"}
               
              </button>
              {typeurl==="ForgetPassword"?<p className="inline mr-6 text-lg"> <Link className="text-[blue] cursor-pointer" href="/auth/login">
                  وارد شوید
                </Link></p>:<p className="inline mr-2">
                قبلا ثبت نام کرده اید؟{" "}
                <Link className="text-[blue] cursor-pointer" href="/auth/login">
                  وارد شوید
                </Link>
              </p>}
              
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Register;
