"use client";
import React from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState,useRef } from "react";
import { useThemeContext } from "../../../context/store";
import {
  Methodpackageadd,
  Methodpackagedelet,
  MethodPrice,
  MethodInsurance_value,
  MethodInsurance_content,
  MethodDate,
} from "../../../Redux/orderslice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FaCertificate } from "react-icons/fa";
// تقویم
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "react-multi-date-picker/styles/colors/yellow.css";
import { BsBoxSeamFill } from "react-icons/bs";
// style module
import styles from "../../../../style/neumorfism.module.css";
import stylecard from  "../../../../style/card.module.css";
import { button } from "@nextui-org/react";
const Package = () => {
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [getprice, setGetprice] = useState("");
  const [isshow, setIsshow] = useState("");
  const { datacity,datapaket,content_value } = useThemeContext();
  console.log(isshow, getprice);

  let refresh_price = `${dataorder.pick_up}+${dataorder.delivery}+${dataorder.package.packB.number}+${dataorder.package.packM.number}+${dataorder.package.packS.number}`;
  let flag_Complate_Order =
    dataorder.pick_up &&
    dataorder.delivery &&
    (dataorder.package.packB.number ||
      dataorder.package.packM.number ||
      dataorder.package.packS.number);
  const notify = () =>
    toast.warn("حداکثر بسته مجاز را انتخاب کرده اید", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


    useEffect(() => {
      if (flag_Complate_Order) {
        var formData = new FormData();
        var OrderData = {
          from_city: dataorder.pick_up,
          to_city:dataorder.delivery,
          count: [dataorder.package.packB.number,dataorder.package.packM.number,dataorder.package.packS.number],
          service: [dataorder.service,dataorder.service,dataorder.service],
          size: ["بزرگ", "متوسط","کوچک"],
        };
    
        // Loop through the object and append values to FormData
        Object.keys(OrderData).forEach((key) => {
          var value = OrderData[key];
            formData.append(key, value);
          
        });
    
        // Log FormData key-value pairs
        formData.forEach((value, key) => {
          console.log(key, value,typeof(value));
        });
    
        try {
          fetch("https://mohaddesepkz.pythonanywhere.com/prices/details/", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
              console.log(res);
              setGetprice(res);
              setIsshow(new Array([...res].length).fill(0));
            })
            .catch((error) => console.error('Error:', error));
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }, [refresh_price]);
  // send requst for back:end
  // محدود کردن تقویم
  const date = new DateObject({ calendar: persian, locale: persian_fa });
  // خواندن دیتای تقویم
const [state, setState] = useState({ format: "MM/DD/YYYY",persian:""}) 
const convert = (date, format = state.format) => {
let object = { date, format }
dispatch(MethodDate(new DateObject(object).format()))
  setState({
    jsDate: date.toDate(),
    persian: new DateObject(object).format(),
    ...object
  })
}
  return (
    <>
      <div className="text-center">
        {/* شروع سایز بسته ها*/}
        <div className={`${styles.neumorfism} w-1/2 mx-auto h-[400px] -translate-x-3 rounded-lg`}>
          {/* modal start */}
          <div>
            <button
              onClick={() => document.getElementById("my_modal_4").showModal()}
              className="mt-4"
            >
              <span className="bg-red-600 py-1 px-3 text-white rounded">
                توجه!
              </span>
              <p className="text-blue-700 inline-block mx-1">
                ابعاد مجاز برای هر بسته را از اینجا مطالعه کنید
              </p>
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Click the button below to close</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn bg-green-600 text-white hover:bg-green-800 !important">
                      متوجه شدم
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          {/* modal end */}
           {/* ثبت سفارش */}
          <div className="flex justify-around mt-8">
            {/* start packB */}
            <div className="bg-utils-300 w-40 h-36 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
              {/* start badge */}
              {dataorder.package.packB.number ? (
                <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-4 left-[128px]">
                  {dataorder.package.packB.number}+
                </span>
              ) : (
                ""
              )}
              {/* end badge */}
              <p className="text-txcolor">بسته بزرگ</p>
              <div className="flex justify-center text-6xl text-iconbox">
              <BsBoxSeamFill />
              </div>
              <div className="flex justify-center mt-4 cursor-pointer">
                <button
                  className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                  onClick={() => {
                    {
                      dataorder.package.packB.number >= 25
                        ? notify()
                        : dispatch(Methodpackageadd("packB"));
                    }
                  }}
                >
                  {dataorder.package.packB.number ? "+" : "انتخاب کن"}
                </button>
                {dataorder.package.packB.number ? (
                  <button
                    className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                    onClick={() => {
                      dispatch(Methodpackagedelet("packB"));
                    }}
                  >
                    {dataorder.package.packB.number > 1 ? (
                      "-"
                    ) : (
                      <RiDeleteBin6Fill/>
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* end packB */}
            {/* start packM */}
            <div className="bg-utils-300 w-36 h-32 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
              {/* start badge */}
              {dataorder.package.packM.number ? (
                <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-4 left-[115px]">
                  {dataorder.package.packM.number}+
                </span>
              ) : (
                ""
              )}
              {/* end badge */}
              <p className="text-txcolor">بسته متوسط</p>
              <div className="flex justify-center text-5xl text-iconbox">
              <BsBoxSeamFill />
              </div>
              <div className="flex justify-center mt-4 cursor-pointer">
                <button
                  className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                  onClick={() => {
                    {
                      dataorder.package.packM.number >= 25
                        ? notify()
                        : dispatch(Methodpackageadd("packM"));
                    }
                  }}
                >
                  {dataorder.package.packM.number ? "+" : "انتخاب کن"}
                </button>
                {dataorder.package.packM.number ? (
                  <button
                    className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                    onClick={() => {
                      dispatch(Methodpackagedelet("packM"));
                    }}
                  >
                    {dataorder.package.packM.number > 1 ? (
                      " - "
                    ) : (
                      <RiDeleteBin6Fill />
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* end packM */}
            {/* start packS */}
            <div className="bg-utils-300 w-32 h-28 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
              {/* start badge */}
              {dataorder.package.packS.number ? (
                <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-5 left-[100px]">
                  {dataorder.package.packS.number}+
                </span>
              ) : (
                ""
              )}
              {/* end badge */}
              <p className="text-txcolor">بسته کوچک</p>
              <div className="flex justify-center text-3xl text-iconbox">
              <BsBoxSeamFill />
              </div>
              <div className="flex justify-center mt-4 cursor-pointer">
                <button
                  className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                  onClick={() => {
                    {
                      dataorder.package.packS.number >= 25
                        ? notify()
                        : dispatch(Methodpackageadd("packS"));
                    }
                  }}
                >
                  {dataorder.package.packS.number ? "+" : "انتخاب کن"}
                </button>
                {dataorder.package.packS.number ? (
                  <button
                    className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                    onClick={() => {
                      dispatch(Methodpackagedelet("packS"));
                    }}
                  >
                    {dataorder.package.packS.number > 1 ? (
                      " - "
                    ) : (
                      <RiDeleteBin6Fill />
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* end packS */}
          </div>
          {/* ثبت سفرش */}
        </div>
        {/* پایان سایز بسته */}
        {/* شروع:نمایش با درخواست سمت بک اند */}
        {flag_Complate_Order ? (
          getprice ? (
            <div className="mt-10" >
              {/*  شروع نمایش هزینه ارسال */}
              {getprice.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsshow(() => {
                      const x = [...isshow];
                      const i = index;
                      return x.map((y, r) => {
                        if (r == i) {
                          y = 1;
                        } else {
                          y = 0;
                        }
                        return y;
                      });
                    });
                    dispatch(MethodPrice(item.amount));
                  }}
                  className={`${isshow[index]?"shadow-md shadow-bgcolor":""} w-1/2 mx-auto p-6 mt-10 -translate-x-3 block ${stylecard.card} `}
                >
                  <div className="z-10 text-txcolor w-full">
                  <div className="flex justify-between">
                    <div className="mx-8 font-bold text-lg">{item.title}</div>
                    <div className="mx-8 font-bold text-lg">
                      {(item.amount).toLocaleString()} تومان
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex justify-start">
                      <div className="mx-10">
                        <p className="font-bold">نزدیک ترین زمان دریافت</p>
                        <p>14{`${item.earliest_pickup.split("_")[0]}`}</p>
                      </div>
                      <div className="mx-10">
                        <p className="font-bold"> زمان تحویل</p>
                        <p>{item.delivery_time}</p>
                      </div>
                    </div>
                    {/* toggle */}
                    <FaCertificate
                      className={`w-8 h-8 ${
                        isshow[index] ? " text-tickboxprice" : " text-white"
                      }`}
                    />
                  </div>
                  {isshow[index] ? (
                    <form className="mt-8 flex justify-between">
                      <div className="w-3/5">
                        <select className="border-solid border-blue-600 border-2 py-3 px-4 rounded-md outline-2 outline-blue-600 w-full inline-block text-black cursor-pointer"
                        onChange={(event)=>dispatch(MethodInsurance_content(event.target.value))}
                        >
                          {(content_value.Content_data).map((item,index)=>{
                          return <option key={index}>
                           {item.title}
                          </option>
                          })}
        
                        </select>
                      </div>
                      <div className="w-4/12 relative">
                        <select className="border-solid text-black border-blue-600 border-2 py-3 px-4 rounded-md outline-2 outline-blue-600 w-full"
                          onChange={(event)=>dispatch(MethodInsurance_value(event.target.value))}>
                          {(content_value.Value_data).map((item,index)=>{
                          return <option key={index}>{`${(item.min_value).toLocaleString()}-${(item.max_value).toLocaleString()} تومان`}</option>
                          })}
                          </select>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                  </div>
                </button>
              ))}

              {/*  پایان نمایش هزینه ارسال */}

              {/* شروع تقویم */}
              <div className={`${styles.numDatapicker} mt-12 w-1/2 mx-auto -translate-x-3 rounded-lg py-10 my-14`}>
             <div className="w-full text-right mr-3 mb-3">
                <span className="text-red-600 text-xl font-bold">*</span>
                <span className="mx-2  py-2 px-1 rounded-md text-txcolor">
                 تاریخ ارسال مرسوله را مشخص کنید؟
                </span>
             </div>
              <div className="w-full text-right mr-3">
              <DatePicker
                 value={state.date}
                 onChange={convert}
                  plugins={[<DatePickerHeader />]}
                  inputClass="border-gray-400 bg-gray-100 border-2 border-solid px-2 py-2 rounded-lg cursor-pointer w-[400px]"
                  className="red"
                  placeholder="انتخاب کن"
                  calendar={persian}
                  locale={persian_fa}
                  animations={[transition()]}
                  minDate={new DateObject({ calendar: persian }).set(
                    "day",
                    date.day
                  )}
                />
              </div>
              </div>
              {/* پایان تقویم */}
            </div>
          ) : (
            <div className="flex justify-center mt-10 ">
              <Image
                src="/loading.svg"
                width={200}
                height={200}
                alt="Picture of the author"
              />
            </div>
          )
        ) : (
          ""
        )}
        {/* پایان:نمایش با درخواست سمت بک اند */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Package;
