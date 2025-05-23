"use client";
import React from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useThemeContext } from "../../../context/store";
import { useQuery, useMutation, useQueryClient } from "react-query";
const index = () => {
  const [flagubdate, setFlagubdate] = useState(false);
  const {setFlagchange,setCheck} = useThemeContext();
  const [errorPerson, setErrorPerson] = useState({
    mobile: "",
  });
  const [selectedFile, setSelectedFile] = useState("");

  const { data, isError, isLoading } = useQuery(
    "legalprofile",
    () => {
      return fetch("https://mohaddesepkz.pythonanywhere.com/profile/legal/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        setProfile({
          company_name:
            data && data.results.length ? data.results[0].company_name : "",
          phone: data && data.results.length ? data.results[0].phone : "",
          company_address:
            data && data.results.length ? data.results[0].company_address : "",
          logo: data && data.results.length ? data.results[0].logo : "",
          id: data && data.results.length ? data.results[0].id : "",
        });
      },
    }
  );
  const [profile, setProfile] = useState({
    company_name:
      data && data.results.length ? data.results[0].company_name : "",
    phone: data && data.results.length ? data.results[0].phone : "",
    company_address:
      data && data.results.length ? data.results[0].company_address : "",
    logo: data && data.results.length ? data.results[0].logo : "",
    id: data && data.results.length ? data.results[0].id : "",
  });
  // start edit profile
  const queryClient = useQueryClient();
  const {
    data: edit,
    isError: iserroredit,
    isLoading: isloadingedit,
    mutate: dataedit,
  } = useMutation(
    (variables) => {
      return fetch(
        `https://mohaddesepkz.pythonanywhere.com/profile/legal/edit/${variables.id}/`,
        {
          method: "PATCH",
          body: variables.formData,
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      ).then((res) => {
        if (!res.ok) {
          return null;
        } else {
          return res.json();
        }
      });
    },
    {
      onSuccess: (data) => {
        setFlagchange((prev) => !prev);
        setErrorPerson({
          mobile: "",
        });
        queryClient.invalidateQueries(["legalprofile"]);
        if (!data) {
          swal({
            text: "ویرایش موفقیت آمیز نبود",
            icon: "error",
          });
        } else {
          swal({
            text: "مشخصات شما با موفقیت تغییر پیدا کرد",
            icon: "success",
          });
        }
      },
    }
  );
  // end edit profile
  // start new profile
  const {
    data: newdata,
    isError: iserrornew,
    isLoading: isloadingnew,
    mutate: datanew,
  } = useMutation(
    (formData) => {
      return fetch(
        `https://mohaddesepkz.pythonanywhere.com/profile/legal/new/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
          },
        }
      ).then((res) => {
        if (!res.ok) {
          return null;
        } else {
          return res.json();
        }
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["legalprofile"]);
        if (data) {
          swal({
            text: "مشخصات شما با موفقیت ثبت شد",
            icon: "success",
          });
          setFlagchange((prev) => !prev);
          setErrorPerson({
            mobile: "",
          });
          setCheck(false)
        } else {
          swal({
            text: "لطفا اطلاعات را به درستی وارد کنید",
            icon: "error",
          });
        }
      },
    }
  );
  // end new profile
  const notify = () =>
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
    if (selectedFile) {
      var Data = {
        company_name: profile.company_name,
        phone: profile.phone,
        company_address: profile.company_address,
        logo: selectedFile,
      };
    } else {
      var Data = {
        company_name: profile.company_name,
        phone: profile.phone,
        company_address: profile.company_address,
      };
    }
    Object.keys(Data).forEach((key) => {
      var value = Data[key];
      formData.append(key, value);
    });
    if (profile.company_name && profile.phone && profile.company_address) {
      if (!/^0[0-9]{10}$/.test(profile.phone)) {
        setErrorPerson({
          mobile: "شماره موبایل وارد شده معتبر نیست!",
        });
      } else {
        if (profile.id) {
          dataedit({ id: profile.id, formData });
        } else {
          datanew(formData);
        }
      }
    } else {
      notify();
    }
  };

  return (
    <div className="lg:w-[33%] md:w-[80%] w-full lg:mx-0 mx-auto bg-txcolor py-3 rounded-lg mt-[30px] text-[#404040]">
      <form
        action=""
        className="p-2 w-[90%] mx-auto"
        onSubmit={AgentHandlerSubmit}
      >
        {/* logo company */}

        <div className=" mb-4">
          <label
            htmlFor="image"
            className="text-center cursor-pointer flex justify-center "
          >
            {profile.logo ? (
              <div className="mb-3 relative">
                <div className="absolute bg-colorgreen p-3 rounded-full top-[1px] right-[94px]">
                  <MdEdit className=" text-txcolor" />
                </div>
                <Image
                  className="rounded-full"
                  src={`${profile.logo}`}
                  width={100}
                  height={100}
                  alt="لوگو"
                />
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded bg-slate-300 flex justify-center items-center border-solid border-4 border-slate-100 relative mx-10">
                  <FaUser className="text-txcolor text-6xl" />
                  <div className="absolute bg-slate-400 p-3 rounded-full top-[-15px] right-[48px]">
                    <MdEdit className=" text-txcolor" />
                  </div>
                  <div className="text-colorgray text-[12px] absolute top-[45px]">
                    لوگو
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

        {/* company nanme */}
        <div className=" mb-4">
          <label htmlFor="company_name" className="text-sm text-bgcolor">
            اسم شرکت
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
        {/*  phone */}
        <div className=" mb-4 relative">
          <label htmlFor="phone" className="text-sm text-bgcolor">
            <FaPhone className="absolute top-[40px] left-[24px]" />
            تلفن
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={profile.phone}
            onChange={(event) => AgentHandler(event)}
          />
          <span className="text-[red]">
            {errorPerson.mobile ? `${errorPerson.mobile}` : ""}
          </span>
        </div>
        {/* company_address */}
        <div className=" mb-4 ">
          <label htmlFor="company_address" className="text-sm text-bgcolor">
            آدرس
          </label>

          <input
            type="text"
            name="company_address"
            id="company_address"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 "
            value={profile.company_address}
            onChange={(event) => AgentHandler(event)}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 bg-bgcolor text-txcolor"
        >
          {profile.id ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default index;
