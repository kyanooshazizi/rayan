"use client";
import React from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import { useThemeContext } from "../../../context/store";
import {
  MethodDocument,
  MethodPrice,
  MethodInsurance_value,
  MethodDate,
} from "../../../Redux/orderslice";
import { useDispatch, useSelector } from "react-redux";
import { FaCertificate } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
// تقویم
import DatePicker, { DateObject } from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "react-multi-date-picker/styles/colors/yellow.css";
// module style
import stylecard from "../../../../style/card.module.css";
import styles from "../../../../style/neumorfism.module.css";
const Package = () => {
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [getprice, setGetprice] = useState("");
  const [isshow, setIsshow] = useState("");
  const [value, setValue] = useState("");
  const { datacity, datapaket, content_value } = useThemeContext();
  console.log(content_value);

  let refresh_price = `${dataorder.pick_up}+${dataorder.delivery}+${dataorder.document.number}`;
  let flag_Complate_Order =
    dataorder.pick_up && dataorder.delivery && dataorder.document.number;
  const notify = () =>
    toast.warn("حداکثر تعداد پاکت مجاز را انتخاب کرده اید", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // console.log(dataorder);

  // send requst for back:end
  useEffect(() => {
    if (flag_Complate_Order) {
      var formData = new FormData();
      var OrderData = {
        from_city: dataorder.pick_up,
        to_city: dataorder.delivery,
        vehicle: "موتور",
        count: [dataorder.document.number],
        service: [dataorder.service],
      };

      // Loop through the object and append values to FormData
      Object.keys(OrderData).forEach((key) => {
        var value = OrderData[key];
        formData.append(key, value);
      });

      // Log FormData key-value pairs
      formData.forEach((value, key) => {
        // console.log(key, value,typeof(value));
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
          .catch((error) => console.error("Error:", error));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [refresh_price]);
  // محدود کردن تقویم
  const date = new DateObject({ calendar: persian, locale: persian_fa });
  // خواندن دیتای تقویم
  const [state, setState] = useState({ format: "MM/DD/YYYY", persian: "" });
  const convert = (date, format = state.format) => {
    let object = { date, format };
    dispatch(MethodDate(new DateObject(object).format()));
    setState({
      jsDate: date.toDate(),
      persian: new DateObject(object).format(),
      ...object,
    });
  };
  return (
    <>
      <div className="text-center">
        {/* شروع سایز پاکت ها*/}
        <div
          className={`w-1/2 bg-white mx-auto h-[300px] -translate-x-3 rounded-lg shadow-xl relative ${styles.neumorfism}`}
        >
          {/* modal start */}
          <div>
            <button
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              {" "}
              <span className="bg-[red] py-1 px-3 text-white rounded">
                توجه!
              </span>
              <p className="text-blue-700 inline-block mx-1 mt-3">
                ابعاد مجاز برای هر پاکت را از اینجا مطالعه کنید
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
           <div className={`mt-5 absolute right-[50%] translate-x-[50%]`}>
                  <Image
                    src="/document1.png"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                    loading="lazy"
                  />
                  {/* badge */}
                  {dataorder.document.number ? (
                    <span className="absolute bg-bgcolor text-txcolor px-3 py-2 rounded-full -top-[6px] right-[47px]">
                      {dataorder.document.number}+
                    </span>
                  ) : null}
                  {/* badge */}
                  {dataorder.document.number == 0 ? (
                    <button
                      className="bg-utils-300 text-txcolor py-2 px-3 rounded-md"
                      onClick={() => {
                        dispatch(MethodDocument("plus"));
                      }}
                    >
                      انتخاب کن
                    </button>
                  ) : (
                    <div className="flex justify-center ">
                      <button
                        className="text-xl ml-3 bg-bgcolor px-3 py-2 text-txcolor font-bold rounded-full"
                        onClick={() => {
                          if (dataorder.document.number > 24) {
                            notify();
                          } else {
                            dispatch(MethodDocument("plus"));
                          }
                        }}
                      >
                        +
                      </button>
                      <button
                        className="text-2xl bg-bgcolor px-4 py-2 text-txcolor font-bold rounded-full"
                        onClick={() => {
                          dispatch(MethodDocument("mines"));
                        }}
                      >
                        {dataorder.document.number <= 1 ? (
                          <AiOutlineDelete />
                        ) : (
                          "-"
                        )}
                      </button>
                    </div>
                  )}
                </div>
          {/* ثبت سفرش */}
        </div>
        {/* پایان سایز  پاکت */}
        {/* شروع:نمایش با درخواست سمت بک اند */}
        {flag_Complate_Order ? (
          getprice ? (
            <div>
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
                  className={`${
                    isshow[index] ? "shadow-md shadow-bgcolor" : ""
                  } w-1/2 mx-auto p-4 mt-4 -translate-x-3 rounded-lg block ${
                    stylecard.card
                  }`}
                >
                  <div className="z-10 text-txcolor w-full">
                    <div className="flex justify-between">
                      <div className="mx-8 font-bold text-lg">{item.title}</div>
                      <div className="mx-8 font-bold text-lg">
                        {item.amount.toLocaleString()} تومان
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="flex justify-start">
                        <div className="mx-10">
                          <p className="font-bold">نزدیک ترین زمان دریافت</p>
                          <p>{`${item.earliest_pickup.split("_")[0]}`}</p>
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
                        <div className="w-3/4 relative mt-10">
                          <span className="absolute text-sm right-3 bottom-2 py-[13px] px-2 bg-tickboxprice text-txcolor rounded-tr-md rounded-br-md outline-none border-none">
                            ارزش مرسوله شما چقدر است؟
                          </span>
                          <select
                            className="w-1/2 border-solid border-2 py-2 px-3 rounded-tl-md rounded-bl-md outline-0 text-black absolute left-20 bottom-2 cursor-pointer"
                            onChange={(event) => {
                              dispatch(
                                MethodInsurance_value(event.target.value)
                              );
                            }}
                          >
                            {(content_value.Value_data).map((item,index) => {
                              return <option key={index}>{`${item.min_value.toLocaleString()}-${item.max_value.toLocaleString()}    تومان`}</option>
                             
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
              <div
                className={`mt-8 w-1/2 bg-white mx-auto -translate-x-3 rounded-lg py-10 my-14 ${styles.numDatapicker}`}
              >
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
