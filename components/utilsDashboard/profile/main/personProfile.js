"use client";
import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import { useThemeContext } from "../../../context/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
const personProfile = () => {
  const { setIslogin, userdata, setFlagchange } = useThemeContext();
  const [flagubdate, setFlagubdate] = useState(false);
  const [errorPerson, setErrorPerson] = useState({
    mobile: "",
  });
  const [profile, setProfile] = useState({
    flag: false,
    Fristname: "",
    Lastname: "",
    image: "",
    mobile: "",
    address: "",
  });
  // start choose file
  const [selectedFile, setSelectedFile] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  // end choose file
  useEffect(() => {
    try {
      fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length) {
            return setProfile({
              flag: true,
              Fristname: res[0].first_name,
              Lastname: res[0].last_name,
              image: res[0].image,
              mobile: res[0].phone_number,
              address: res[0].address,
            });
          } else {
            setProfile({
              flag: false,
              ...profile,
            });
          }
        })
        .catch((err) => console.log("realdata", err));
    } catch (error) {
      console.error(error);
    }

  }, [flagubdate]);
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
  const Mhandler = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };
  const PersonHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      var Data = {
        address: profile.address,
        image: selectedFile,
        first_name: profile.Fristname,
        last_name: profile.Lastname,
        phone_number: profile.mobile,
      };
    } else {
      var Data = {
        address: profile.address,
        first_name: profile.Fristname,
        last_name: profile.Lastname,
        phone_number: profile.mobile,
      };
    }
    Object.keys(Data).forEach((key) => {
      var value = Data[key];
      formData.append(key, value);
    });

    if (
      profile.Fristname &&
      profile.Lastname &&
      profile.mobile &&
      profile.address
    ) {
      if (!/^0[0-9]{10}$/.test(profile.mobile)) {
        setErrorPerson({
          mobile: "شماره موبایل وارد شده معتبر نیست!",
        });
      } else {
        if (profile.flag) {
          fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/edit/", {
            method: "PATCH",
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
                  text: "مشخصات شما با موفقیت تغییر پیدا کرد",
                  icon: "success",
                });
                setFlagchange((prev) => !prev);
                setFlagubdate((prev) => !prev);
              } else {
                swal({
                  text: "ویرایش موفقیت آمیز نبود!",
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
        } else {
          fetch("https://mohaddesepkz.pythonanywhere.com/profile/real/new/", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          })
            .then((res) => {
              if (!res.ok) {
                return res.json();
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
    <div className="lg:w-[33%] md:w-[80%] w-full lg:mx-0 mx-auto bg-txcolor py-3 rounded-lg mt-[30px] text-[#404040]">
      <form action="" className="p-2 w-[90%] mx-auto" onSubmit={PersonHandler}>
        {/* image user */}
        <div className=" mb-2">
          <label
            htmlFor="image"
            className="text-center cursor-pointer flex justify-center "
          >
            {profile.image ? (
              <div className="mb-3 relative">
                <div className="absolute bg-colorgreen p-3 rounded-full top-[1px] right-[94px]">
                  <MdEdit className=" text-txcolor" />
                </div>
                <Image
                  className="rounded-full"
                  src={`${profile.image}`}
                  width={100}
                  height={100}
                  alt="تصویر"
                  priority
                />
              </div>
            ) : (
              <>
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
          <label htmlFor="Fristname" className="text-sm">
            نام
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
            نام خانوادگی
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
        {/* code meli
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
      </div> */}
        {/* Mobile */}
        <div className=" mb-4 relative">
          <label htmlFor="Mobile" className="text-sm">
            {" "}
            شماره تلفن
          </label>
          <FaPhone className="absolute top-[40px] left-[24px] text-colorgray opacity-60" />
          <input
            type="number"
            name="mobile"
            id="Mobile"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
            value={profile.mobile}
            onChange={(event) => Mhandler(event)}
          />
          <span className="text-[red]">
            {errorPerson.mobile ? `${errorPerson.mobile}` : ""}
          </span>
        </div>
        {/* Address */}
        <div className=" mb-4 relative">
          <label htmlFor="Address" className="text-sm">
            آدرس
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
          {profile.flag ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
        </button>
      </form>
    </div>
  );
};

export default personProfile;
