import React from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { getCookie } from "cookies-next";
const index = ({ agentdata }) => {
  const [errorPerson, setErrorPerson] = useState({
    mobile: "",
  });
  const [selectedFile, setSelectedFile] = useState(
    agentdata.length ? agentdata[0].logo : null
  );
  console.log("🚀 ~ index ~ selectedFile:", selectedFile);
  const [profile, setProfile] = useState({
    company_name: agentdata.length ? agentdata[0].company_name : "",
    national_company_id: agentdata.length
      ? agentdata[0].national_company_id
      : "",
    phone: agentdata.length ? agentdata[0].phone : "",
    company_address: agentdata.length ? agentdata[0].company_address : "",
  });
  console.log("🚀 ~ index ~ profile:", profile);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const AgentHandler = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };
  //   submit handler:start
  const AgentHandlerSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    var Data = {
      company_name: profile.company_name,
      national_company_id: profile.national_company_id,
      phone: profile.phone,
      company_address: profile.company_address,
      logo: selectedFile,
    };
    Object.keys(Data).forEach((key) => {
      var value = Data[key];
      formData.append(key, value);
    });
    if (
      profile.company_name &&
      profile.national_company_id &&
      profile.phone &&
      profile.company_address
    ) {
      if (!/^0[0-9]{10}$/.test(profile.phone)) {
        setErrorPerson({
          mobile: "شماره موبایل وارد شده معتبر نیست!",
        });
      } else {
        if (agentdata.length) {
          fetch(
            `https://mohaddesepkz.pythonanywhere.com/profile/legal/edit/${agentdata[0].id}/`,
            {
              method: "PATCH",
              body: formData,
              headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
              },
            }
          )
            .then((res) => {
              // if (!res.ok) {
              //   return null;
              // } else {
              //   return res.json();
              // }
              return res.json();
            })
            .then((res) => {
              console.log(res);
              // if (res) {
              //   swal({
              //     text: "مشخصات شما با موفقیت تغییر پیدا کرد",
              //     icon: "success",
              //   });
              //   setFlagchange((prev) => !prev);
              // } else {
              //   swal({
              //     text: "ویرایش موفقیت آمیز نبود!",
              //     icon: "error",
              //   });
              // }
              // setErrorPerson({
              //   mobile: "",
              // });
            })
            .catch((error) => {
              console.log("error", error);
            });
        } else {
          fetch("https://mohaddesepkz.pythonanywhere.com/profile/legal/new/", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          })
            .then((res) => {
              if (!res.ok) {
                return null;
              } else {
                return res.json();
              }
            })
            .then((res) => {
              if (res) {
                swal({
                  text: "مشخصات شما با موفقیت ثبت شد",
                  icon: "success",
                });
                console.log(res);
                setFlagchange((prev) => !prev);
              } else {
                swal({
                  text: "لطفا اطلاعات را به درستی وارد کنید!",
                  icon: "error",
                });
              }
              setErrorPerson({
                mobile: "",
              });
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      }
    } else {
      notify();
    }
  };

  return (
    <div className="w-2/5 bg-txcolor py-3 rounded-lg">
      <div className="flex justify-between">
        <div className="p-2 mb-2 mr-4">
          <span className="font-bold mb-1 inline-block text-bgcolor">
            مشخصات سازمان
          </span>
          <p className="text-[0.8rem] text-gray-400">
            مشخصات حقوقی خود را تکمیل کنید
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <form
        action=""
        className="p-2 w-4/5 mx-auto"
        onSubmit={AgentHandlerSubmit}
      >
        {/* logo company */}

        <div className=" mb-4">
          <label
            htmlFor="image"
            className="text-center cursor-pointer flex justify-center "
          >
            {agentdata.length ? (
              <div className="mb-3 relative">
                <div className="absolute bg-green-400 p-3 rounded-full top-[1px] right-[94px]">
                  <MdEdit className=" text-txcolor" />
                </div>
                <Image
                  className="rounded-full"
                  src={`${agentdata[0].logo}`}
                  width={120}
                  height={120}
                  alt="Picture of the author"
                  priority
                />
              </div>
            ) : (
              <>
                <div className="text-bgcolor">تصویر</div>
                <div className="w-20 h-20 rounded bg-slate-300 flex justify-center items-center border-solid border-4 border-slate-100 relative mx-10">
                  <FaUser className="text-txcolor text-6xl" />
                  <div className="absolute bg-slate-400 p-3 rounded-full top-[-15px] right-[48px]">
                    <MdEdit className=" text-txcolor" />
                  </div>
                </div>
              </>
            )}
          </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Fristname */}
        <div className=" mb-4">
          <label htmlFor="company_name" className="text-sm text-bgcolor">
            <span className="text-[red]">*</span> اسم شرکت
          </label>
          <input
            type="text"
            name="company_name"
            id="company_name"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={profile.company_name}
            onChange={(event) => AgentHandler(event)}
          />
        </div>
        {/* Lastname */}
        <div className=" mb-4">
          <label htmlFor="national_company_id" className="text-sm text-bgcolor">
            {" "}
            <span className="text-[red]">*</span> شناسه ملی شرکت
          </label>
          <input
            type="text"
            name="national_company_id"
            id="national_company_id"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={profile.national_company_id}
            onChange={(event) => AgentHandler(event)}
          />
        </div>
        {/*  phone */}
        <div className=" mb-4 relative">
          <label htmlFor="phone" className="text-sm text-bgcolor">
            <FaPhone className="absolute top-[40px] left-[24px]" />
            <span className="text-[red]">*</span> تلفن
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={profile.phone}
            onChange={(event) => AgentHandler(event)}
          />
        </div>
        {/* company_address */}
        <div className=" mb-4 ">
          <label htmlFor="company_address" className="text-sm text-bgcolor">
            {" "}
            <span className="text-[red]">*</span> آدرس
          </label>

          <input
            type="text"
            name="company_address"
            id="company_address"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
            value={profile.company_address}
            onChange={(event) => AgentHandler(event)}
          />
          <span className="text-[red]">
            {errorPerson.mobile ? `${errorPerson.mobile}` : ""}
          </span>
        </div>
        <button
          type="submit"
          className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 bg-bgcolor text-txcolor"
        >
          {agentdata.length ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default index;
