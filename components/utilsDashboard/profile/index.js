"use client";
import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import { useThemeContext } from "../../context/store";
import { GrOrganization } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgentProfile from "./agentProfile";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
const index = () => {
  const { setIslogin, userdata, setFlagchange } = useThemeContext();
  const [toggle, setToggle] = useState([1, 0, 0]);
  const [flagubdate,setFlagubdate]=useState(false)
  const [errorpass, setErrorpass] = useState({
    oldpass: "",
    newpass: "",
    newpass_repeat: "",
  });
  const [errorPerson, setErrorPerson] = useState({
    mobile: "",
  });
  const [agentdata, setAgentdata] = useState([]);
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
    console.log("🚀 ~ index ~ selectedFile:", selectedFile)
    console.log("🚀 ~ index ~ selectedFile:", selectedFile)
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

    // legal profile
    try {
      fetch("https://mohaddesepkz.pythonanywhere.com/profile/legal/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setAgentdata(res))
        .catch((err) => console.log("agentdata", err));
    } catch (error) {
      console.error(error);
    }
  }, [flagubdate]);

  // check user complate profile:start

  console.log("🚀 ~ index ~ profile:", profile);
  // check user complate profile:end
  const [password, setPassword] = useState({
    Oldpassword: "",
    Newpassword: "",
    Repeatpassword: "",
  });
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
            setFlagchange((prev) => !prev);
          }

          return response.json();
        })
        .then((res) => {
          res;
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
    const formData = new FormData();
    if(selectedFile){
      var Data = {
        address: profile.address,
        image: selectedFile,
        first_name: profile.Fristname,
        last_name: profile.Lastname,
        phone_number: profile.mobile,
      };      
    }else{
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
                setFlagubdate((prev)=>!prev)
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
            body:formData,
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

  // end person real

  const MethodHandler = (taggle) => {
    if (taggle[0]) {
      return (
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
            {/* image user */}
            <div className=" mb-4">
              <label
                htmlFor="image"
                className="text-center cursor-pointer flex justify-center "
              >
                {profile.image ? (
                  <div className="mb-3 relative">
                    <div className="absolute bg-green-400 p-3 rounded-full top-[1px] right-[94px]">
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
              <span className="text-[red]">
                {errorPerson.mobile ? `${errorPerson.mobile}` : ""}
              </span>
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
              {profile.flag ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
            </button>
          </form>
        </div>
      );
    } else if (taggle[1]) {
      return <AgentProfile agentdata={agentdata} setFlagubdate={setFlagubdate} />;
    } else {
      return (
        <div className="w-2/5 bg-txcolor py-3 rounded-lg h-[400px]">
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
      );
    }
  };

  return (
    <>
      {/* start:change preofile */}
      <div className="w-1/3 ml-10 bg-txcolor h-[300px] rounded-lg py-3">
        <div className="mr-6 mb-2 p-2">
          <span className=" mb-3 font-bold text-bgcolor">نام کاربری</span>
          <span className="text-txcolor bg-bgcolor px-2 py-2 rounded mr-10">
            {userdata && userdata.username}
          </span>
        </div>
        {userdata && (userdata.company_name || userdata.first_name) ? (
          ""
        ) : (
          <span className="my-2 bg-red-400 p-2 rounded inline-block mr-2">
            لطفا مشخصات شخصی یا سازمانی خود را تکمیل کنید
          </span>
        )}

        <hr className="w-[95%] mx-auto my-3" />
        <div>
          {/* مشخصات شخصی */}
          <div className="my-2">
            <FaUser className="text-utils-300 inline pr-2 text-2xl" />
            <button
              onClick={() => setToggle([1, 0, 0])}
              className={`${toggle[0] ? "text-bgcolor font-bold" : ""} px-4`}
            >
              اطلاعات حقیقی
            </button>
          </div>
          {/* مشخصات حقوقی */}
          <div className="my-2">
            <GrOrganization className="text-utils-300 inline pr-2 text-2xl" />
            <button
              onClick={() => setToggle([0, 1, 0])}
              className={`${toggle[1] ? "text-bgcolor font-bold" : ""} px-4`}
            >
              اطلاعات حقوقی
            </button>
          </div>
          {/* تغییر رمز عبور */}
          <div className="my-2">
            <RiLockPasswordFill className="text-utils-300 inline pr-2 text-2xl" />
            <button
              onClick={() => setToggle([0, 0, 1])}
              className={`${toggle[2] ? "text-bgcolor font-bold" : ""} px-4`}
            >
              تغییر رمز عبور
            </button>
          </div>
        </div>
      </div>
      {/* end:change preofile */}
      {/* start:form */}
      {MethodHandler(toggle)}
      <ToastContainer />
      {/* end:form */}
    </>
  );
};

export default index;
