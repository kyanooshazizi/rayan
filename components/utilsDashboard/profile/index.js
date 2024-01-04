"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const index = ({ data }) => {
  const [toggle, setToggle] = useState(true);
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
          <form action="" className="p-2 w-4/5 mx-auto">
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
                name="Mobile"
                id="Mobile"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
              />
            </div>
            {/* Address */}
            <div className=" mb-4 relative">
              <label htmlFor="Address" className="text-sm">
                {" "}
                <span className="text-[red]">*</span> آدرس{" "}
              </label>
              <input
                type="text"
                name="Address"
                id="Address"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
              />
            </div>
            <button
              type="submit"
              className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 bg-bgcolor text-txcolor"
            >
              ثبت اطلاعات
            </button>
          </form>
        </div>
      ) : (
        <div className="w-2/5 bg-txcolor py-3 rounded-lg">
          <form action="" className="p-2 w-4/5 mx-auto">
            {/* Oldpassword */}
            <div className=" mb-4">
              <label htmlFor="Oldpassword" className="text-sm">
                {" "}
                پسورد فعلی
              </label>
              <input
                type="text"
                name="Oldpassword"
                id="Oldpassword"
                className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
              />
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
              />
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
              />
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
      {/* end:form */}
    </>
  );
};

export default index;
