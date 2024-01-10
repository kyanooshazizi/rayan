"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { getCookie } from "cookies-next";
import swal from "sweetalert";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const index = ({ realdata,data }) => {
  const [toggle, setToggle] = useState(true);
  const [errorpass, setErrorpass] = useState({
    oldpass: "",
    newpass: "",
    newpass_repeat: "",
  });
  const [errorPerson, setErrorPerson] = useState({
    mobile: "",
  });
  // check user complate profile:start
  
  const [profile, setProfile] = useState({
    Fristname:realdata.length?realdata[0].first_name:"",
    Lastname:realdata.length?realdata[0].last_name:"",
    codemeli: realdata.length?realdata[0].national_code:"",
    mobile:realdata.length?realdata[0].phone_number:"",
    address: realdata.length?realdata[0].address:"",
  });
  // check user complate profile:end
  console.log("🚀 ~ file: index.js:15 ~ index ~ profile:", profile);
  const [password, setPassword] = useState({
    Oldpassword: "",
    Newpassword: "",
    Repeatpassword: "",
  });
  console.log("🚀 ~ file: index.js:21 ~ index ~ password:", password);
  const Passhandler = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const Mhandler = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };
// start password
  const Submit_PassHandler = (event) => {
    event.preventDefault();
    if (
      !/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        password.Newpassword
      )
    ) {
      setErrorpass((prev) => ({
        ...prev,
        newpass: "پسورد باید حداقل 8 کاراکتر باشد و شامل حروف و اعداد شود",
      }));
    } else if (password.Newpassword !== password.Repeatpassword) {
      setErrorpass({
        oldpass: "",
        newpass: "",
        newpass_repeat: "تکرار پسورد درست نیست!",
      });
    } else {
      setErrorpass({
        oldpass: "",
        newpass: "",
        newpass_repeat: "",
      });
      fetch("https://mohaddesepkz.pythonanywhere.com/users/change/password/", {
        method: "PUT",
        body: JSON.stringify({
          old_password: password.Oldpassword,
          new_password: password.Repeatpassword,
        }),
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            setErrorpass((prev) => ({
              ...prev,
              oldpass: "پسورد فعلی شما درست نیست!",
            }));
          } else {
            swal({
              text: "پسورد شما با موفقیت تغییر پیدا کرد",
              icon: "success",
            });
            setPassword({
              Oldpassword: "",
              Newpassword: "",
              Repeatpassword: "",
            });
            setErrorpass({
              oldpass: "",
              newpass: "",
              newpass_repeat: "",
            });
          }

          return response.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

// end password


// statr person real
  const notify = () => {
    toast.error("لطفا تمام فیلد ها را پر کنید", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const PersonHandler = (event) => {
    event.preventDefault();
    if (
      profile.Fristname &&
      profile.Lastname &&
      profile.codemeli &&
      profile.mobile &&
      profile.address
    ) {
      if (!(/^0[0-9]{10}$/.test(profile.mobile))) {
        setErrorPerson({
          mobile: "شماره موبایل وارد شده معتبر نیست!",
        });
      }else{
        if(realdata.length){
          fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/edit/", {
            method: "PATCH",
            body: JSON.stringify({
             
              address: profile.address,
              national_code:profile.codemeli,
              first_name: profile.Fristname,
              last_name: profile.Lastname,
              phone_number: profile.mobile
            }),
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("access_token")}`
            },
          })
            .then((res) => {
              if (!res.ok) {       
                  return null
                } else {
                  return res.json();
                }
            })
            .then((res) =>{
             if(res){
              swal({
                text: "مشخصات شما با موفقیت تغییر پیدا کرد",
                icon: "success",
              });
             }else{
              swal({
                text: "ویرایش موفقیت آمیز نبود!",
                icon: "error",
              });
             }
              setErrorPerson({
                mobile:"",
              });
              console.log(res)
            } )
            .catch((error) =>{
              console.log("error",error);
            });
        }
        else{

          fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/new/", {
            method: "POST",
            body: JSON.stringify({
             
              address: profile.address,
              national_code:profile.codemeli,
              first_name: profile.Fristname,
              last_name: profile.Lastname,
              phone_number: profile.mobile
            }),
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("access_token")}`
            },
          })
            .then((res) => {
              if (!res.ok) {       
                  return null
                } else {
                  return res.json();
                }
            })
            .then((res) =>{
              if(res){
                swal({
                  text: "مشخصات شما با موفقیت ثبت شد",
                  icon: "success",
                });

              }else{
                swal({
                  text: "خطایی رخ داده است!",
                  icon: "error",
                });
              }
              setErrorPerson({
                mobile:"",
              });
              console.log(res)
            } )
            .catch((error) =>{
              console.log("error",error);
            });
        }
        }
    } else {
      notify();
    }
  };
// end person real



  return (
    <>
      {/* start:change preofile */}
      <div className="w-1/3 ml-10 bg-txcolor h-[200px] rounded-lg py-3">
        <div className="mr-6 mb-2 p-2">
          <span className=" mb-3 font-bold text-bgcolor">نام کاربری</span>
          <span className=" border-solid border-2 border-utils-300 px-2 py-1 mr-10">
            {data.username}
          </span>
        </div>
        <hr className="w-[95%] mx-auto my-3" />
        <div>
          {/* مشخصات شخصی */}
          <div className="my-2">
            <FaUser className="text-bgcolor inline pr-2 text-3xl" />
            <button
              onClick={() => setToggle(true)}
              className={`${toggle ? "text-bgcolor font-bold" : ""} px-4`}
            >
              مشخصات شخصی
            </button>
          </div>
          {/* تغییر رمز عبور */}
          <div className="my-2">
            <RiLockPasswordFill className="text-bgcolor inline pr-2 text-3xl" />
            <button
              onClick={() => setToggle(false)}
              className={`${!toggle ? "text-bgcolor font-bold" : ""} px-4`}
            >
              تغییر رمز عبور
            </button>
          </div>
        </div>
      </div>
      {/* end:change preofile */}
      {/* start:form */}
      {toggle ? (
        <div className="w-2/5 bg-txcolor py-3 rounded-lg">
          <div className="flex justify-between">
            <div className="p-2 mb-2 mr-4">
              <span className="font-bold mb-1 inline-block text-bgcolor">
                مشخصات شخصی
              </span>
              <p className="text-[0.8rem] text-gray-400">
                مشخصات شخصی خود را تکمیل کنید
              </p>
            </div>
          </div>
          <hr className="my-2" />
          <form
            action=""
            className="p-2 w-4/5 mx-auto"
            onSubmit={PersonHandler}
          >
            {/* Fristname */}
            <div className=" mb-4">
              <label htmlFor="Fristname" className="text-sm">
                <span className="text-[red]">*</span> نام
              </label>
              <input
                type="text"
                name="Fristname"
                id="Fristname"
                placeholder="کیانوش"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={profile.Fristname}
                onChange={(event) => Mhandler(event)}
              />
            </div>
            {/* Lastname */}
            <div className=" mb-4">
              <label htmlFor="Lastname" className="text-sm">
                {" "}
                <span className="text-[red]">*</span> نام خانوادگی
              </label>
              <input
                type="text"
                name="Lastname"
                id="Lastname"
                placeholder="عزیزی"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={profile.Lastname}
                onChange={(event) => Mhandler(event)}
              />
            </div>
            {/*  code meli */}
            <div className=" mb-4">
              <label htmlFor="codemeli" className="text-sm">
                {" "}
                <span className="text-[red]">*</span> کد ملی{" "}
              </label>
              <input
                type="number"
                name="codemeli"
                id="codemeli"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={profile.codemeli}
                onChange={(event) => Mhandler(event)}
              />
            </div>
            {/* Mobile */}
            <div className=" mb-4 relative">
              <label htmlFor="Mobile" className="text-sm">
                {" "}
                <span className="text-[red]">*</span> موبایل{" "}
              </label>
              <FaPhone className="absolute top-[40px] left-[24px]" />
              <input
                type="number"
                name="mobile"
                id="Mobile"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
                value={profile.mobile}
                onChange={(event) => Mhandler(event)}
              />
              <span className="text-[red]">{errorPerson.mobile ? `${errorPerson.mobile}` : ""}</span>
            </div>
            {/* Address */}
            <div className=" mb-4 relative">
              <label htmlFor="Address" className="text-sm">
                {" "}
                <span className="text-[red]">*</span> آدرس{" "}
              </label>
              <input
                type="text"
                name="address"
                id="Address"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
                value={profile.address}
                onChange={(event) => Mhandler(event)}
              />
            </div>
            <button
              type="submit"
              className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 bg-bgcolor text-txcolor"
            >
      {realdata.length?"ویرایش اطلاعات":"ثبت اطلاعات"}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-2/5 bg-txcolor py-3 rounded-lg">
          <form
            action=""
            className="p-2 w-4/5 mx-auto"
            onSubmit={Submit_PassHandler}
          >
            {/* Oldpassword */}
            <div className=" mb-4">
              <label htmlFor="Oldpassword" className="text-sm">
                پسورد فعلی
              </label>
              <input
                type="text"
                name="Oldpassword"
                id="Oldpassword"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={password.Oldpassword}
                onChange={(event) => Passhandler(event)}
              />
              <span className="text-[red]">{errorpass.oldpass}</span>
            </div>
            {/* Newpassword */}
            <div className=" mb-4">
              <label htmlFor="Newpassword" className="text-sm">
                {" "}
                پسورد جدید
              </label>
              <input
                type="text"
                name="Newpassword"
                id="Newpassword"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={password.Newpassword}
                onChange={(event) => Passhandler(event)}
              />
              <span className="text-[red]">{errorpass.newpass}</span>
            </div>
            {/* Repeatpassword */}
            <div className=" mb-4">
              <label htmlFor="Repeatpassword" className="text-sm">
                تکرار پسورد جدید
              </label>
              <input
                type="text"
                name="Repeatpassword"
                id="Repeatpassword"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
                value={password.Repeatpassword}
                onChange={(event) => Passhandler(event)}
              />
              <span className="text-[red]">{errorpass.newpass_repeat}</span>
            </div>
            <button
              type="submit"
              className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 bg-bgcolor text-txcolor"
            >
              ثبت
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
      {/* end:form */}
    </>
  );
};

export default index;
