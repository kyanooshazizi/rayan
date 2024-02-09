"use client";
import React, { useState } from "react";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
const changePassword = () => {
  const [show,setShow]=useState(false)
  const [errorpass, setErrorpass] = useState({
    oldpass: "",
    newpass: "",
    newpass_repeat: "",
  });
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
  return (
    <div className="lg:w-[33%] md:w-[80%] w-full lg:mx-0 mx-auto bg-txcolor py-3 rounded-lg mt-[30px] text-[#404040]">
      <form
        action=""
        className="p-2 w-[90%] mx-auto"
        onSubmit={Submit_PassHandler}
      >
        {/* Oldpassword */}
        <div className=" mb-4 relative">
          <label htmlFor="Oldpassword" className="text-sm">
            پسورد فعلی
          </label>
          <input
            type={`${show?"text":"password"}`}
            name="Oldpassword"
            id="Oldpassword"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={password.Oldpassword}
            onChange={(event) => Passhandler(event)}
          />
          <span className="absolute text-colorgray opacity-70 top-[39px] left-[10px] text-[13px] cursor-pointer" onClick={()=>setShow(prev=>!prev)}>نمایش</span>
          <span className="text-[red]">{errorpass.oldpass}</span>
        </div>
        {/* Newpassword */}
        <div className=" mb-4 relative">
          <label htmlFor="Newpassword" className="text-sm">
            {" "}
            پسورد جدید
          </label>
          <input
            type={`${show?"text":"password"}`}
            name="Newpassword"
            id="Newpassword"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={password.Newpassword}
            onChange={(event) => Passhandler(event)}
          />
          <span className="absolute text-colorgray opacity-70 top-[39px] left-[10px] text-[13px] cursor-pointer" onClick={()=>setShow(prev=>!prev)}>نمایش</span>
          <span className="text-[red]">{errorpass.newpass}</span>
        </div>
        {/* Repeatpassword */}
        <div className=" mb-4 relative">
          <label htmlFor="Repeatpassword" className="text-sm">
            تکرار پسورد جدید
          </label>
          <input
            type={`${show?"text":"password"}`}
            name="Repeatpassword"
            id="Repeatpassword"
            className="outline-none p-2 border-2 border-solid border-[#efefef] rounded-md w-full block mt-1 placeholder:opacity-40"
            value={password.Repeatpassword}
            onChange={(event) => Passhandler(event)}
          />
          <span className="absolute text-colorgray opacity-70 top-[39px] left-[10px] text-[13px] cursor-pointer" onClick={()=>setShow(prev=>!prev)}>نمایش</span>
          <span className="text-[red]">{errorpass.newpass_repeat}</span>
        </div>
        <button
          type="submit"
          className="px-2 py-3 border-2 border-solid border-[#efefef] rounded-md w-full block mt-4 bg-bgcolor text-txcolor"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
};

export default changePassword;
