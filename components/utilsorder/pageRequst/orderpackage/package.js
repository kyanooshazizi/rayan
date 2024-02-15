"use client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  Methodpackageadd,
  Methodpackagedelet,
  MethodPrice,
  MethodInsurance_value,
  MethodInsurance_content,
  MethodBackHomepage,
} from "../../../Redux/orderslice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { GoCheckCircleFill } from "react-icons/go";
import useValuedefult from "@/components/TanstakQury/useValuedefult";
import usecity_servise from "@/components/TanstakQury/useCity_servise";
import { FiCircle } from "react-icons/fi";
import Datapicker from "@/components/utilsorder/Datapicker";
import { BsBoxSeamFill } from "react-icons/bs";
// style module
import stylecard from "../../../../style/card.module.css";
import { IoIosWarning } from "react-icons/io";
const Package = () => {
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [getprice, setGetprice] = useState("");
  const [isshow, setIsshow] = useState("");

  const content_value = useValuedefult();

  const { datacity, dataservise } = usecity_servise();

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
      dispatch(MethodBackHomepage());
      var formData = new FormData();
      var OrderData = {
        from_city: dataorder.pick_up,
        to_city: dataorder.delivery,
        count: [
          dataorder.package.packB.number,
          dataorder.package.packM.number,
          dataorder.package.packS.number,
        ],
        package: ["بسته", "بسته", "بسته"],
        size: ["بزرگ", "متوسط", "کوچک"],
      };

      // Loop through the object and append values to FormData
      Object.keys(OrderData).forEach((key) => {
        var value = OrderData[key];
        formData.append(key, value);
      });

      // Log FormData key-value pairs
      formData.forEach((value, key) => {});

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
  // send requst for back:end
  return (
    <>
      <div className="text-center">
        {/* شروع سایز بسته ها*/}
        {/* ثبت سفارش */}

        <div className="mt-[30px] bg-[#fff] lg:w-[70%] w-[85%] min-h-[500px] mx-auto rounded-[8px] pt-4">
          <div className="flex lg:flex-row flex-col justify-around">
            {dataservise.data[1].size.map((item, index) => {
              switch (item.title) {
                case "کوچک":
                  return (
                    <div key={index} className="lg:basis-[29%] mr-2">
                      <div className="pb-4 lg:text-right text-center text-colorgray">
                        بسته و پاکت
                      </div>
                      <button
                        onClick={() => {
                          {
                            dataorder.package.packS.number == 0
                              ? dispatch(Methodpackageadd(`packS*${item.id}`))
                              : "";
                          }
                        }}
                        className="lg:w-full h-[35px] py-[4px] sm:w-[50%] w-[90%] mx-auto bg-dashboard border-2 border-solid border-[#CDCDCD] flex justify-center rounded-[4px]"
                      >
                        {dataorder.package.packS.number ? (
                          <div className="flex ">
                            <button
                              className="px-2 mx-3 text-colorgray"
                              onClick={() => {
                                dispatch(Methodpackagedelet("packS"));
                              }}
                            >
                              {dataorder.package.packS.number > 1 ? (
                                " - "
                              ) : (
                                <RiDeleteBin6Fill className=" text-colorgray text-[15px]" />
                              )}
                            </button>
                            <div className="mx-3 text-colorgray">
                              {dataorder.package.packS.number}
                            </div>
                            <button
                              className="px-2 mx-3 text-colorgray"
                              onClick={() => {
                                {
                                  dataorder.package.packS.number >= 30
                                    ? notify()
                                    : dispatch(
                                        Methodpackageadd(`packS*${item.id}`)
                                      );
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          "انتخاب کنید"
                        )}
                      </button>
                      <div className="flex justify-center mt-10">
                        <Image
                          src="/order/small.svg"
                          width={80}
                          height={80}
                          alt="Picture of the author"
                          priority
                        />
                        <Image
                          src="/order/packat.svg"
                          width={40}
                          height={40}
                          alt="Picture of the author"
                          priority
                        />
                      </div>
                    </div>
                  );
                case "متوسط":
                  return (
                    <div className="lg:basis-[29%] mt-10">
                      <button
                        onClick={() => {
                          {
                            dataorder.package.packM.number == 0
                              ? dispatch(Methodpackageadd(`packM*${item.id}`))
                              : "";
                          }
                        }}
                        className="lg:w-full h-[35px] py-[4px] sm:w-[50%] w-[90%] mx-auto bg-dashboard border-2 border-solid border-[#CDCDCD] flex justify-center rounded-[4px]"
                      >
                        {dataorder.package.packM.number ? (
                          <div className="flex ">
                            <button
                              className="px-2 mx-3"
                              onClick={() => {
                                dispatch(Methodpackagedelet("packM"));
                              }}
                            >
                              {dataorder.package.packM.number > 1 ? (
                                " - "
                              ) : (
                                <RiDeleteBin6Fill className=" text-colorgray text-[15px]" />
                              )}
                            </button>
                            <div className="mx-3">
                              {dataorder.package.packM.number}
                            </div>
                            <button
                              className="px-2 mx-3"
                              onClick={() => {
                                {
                                  dataorder.package.packM.number >= 30
                                    ? notify()
                                    : dispatch(
                                        Methodpackageadd(`packM*${item.id}`)
                                      );
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          "انتخاب کنید"
                        )}
                      </button>
                      <div className="flex justify-center mt-8">
                        <Image
                          src="/order/mediom.svg"
                          width={110}
                          height={110}
                          alt="Picture of the author"
                          priority
                        />
                      </div>
                    </div>
                  );
                case "بزرگ":
                  return (
                    <div className="lg:basis-[29%] mt-10 ml-2">
                      <button
                        onClick={() => {
                          {
                            dataorder.package.packB.number == 0
                              ? dispatch(Methodpackageadd(`packB*${item.id}`))
                              : "";
                          }
                        }}
                        className="lg:w-full h-[35px] py-[4px] sm:w-[50%] w-[90%] mx-auto bg-dashboard border-2 border-solid border-[#CDCDCD] flex justify-center rounded-[4px]"
                      >
                        {dataorder.package.packB.number ? (
                          <div className="flex ">
                            <button
                              className="px-2 mx-3"
                              onClick={() => {
                                dispatch(Methodpackagedelet("packB"));
                              }}
                            >
                              {dataorder.package.packB.number > 1 ? (
                                " - "
                              ) : (
                                <RiDeleteBin6Fill className=" text-colorgray text-[15px]" />
                              )}
                            </button>
                            <div className="mx-3">
                              {dataorder.package.packB.number}
                            </div>
                            <button
                              className="px-2 mx-3"
                              onClick={() => {
                                {
                                  dataorder.package.packB.number >= 30
                                    ? notify()
                                    : dispatch(
                                        Methodpackageadd(`packB*${item.id}`)
                                      );
                                }
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          "انتخاب کنید"
                        )}
                      </button>
                      <div className="flex justify-center mt-6">
                        <Image
                          src="/order/big.svg"
                          width={140}
                          height={140}
                          alt="Picture of the author"
                          priority
                        />
                      </div>
                    </div>
                  );
                  {
                    /* end packS */
                  }
              }
            })}
          </div>
          {content_value.data ? (
            <div className="w-full text-colorgray">
              <form className="mt-[10px] flex justify-around">
                <div className="basis-[44%]">
                  <span className="lg:text-[16px] text-[14px] text-colorgray block text-right pb-1">
                    محتوا مرسوله
                  </span>
                  <select
                    className="w-full rounded-l-md  outline-none block text-colorgray cursor-pointer text-[14px] bg-dashboard px-2 py-2 border-2 rounded-[5px] border-[#CDCDCD]"
                    onClick={(event) => {
                      const item = content_value.data.Content_data.find(
                        (item) => item.title === event.target.value
                      );

                      return dispatch(
                        MethodInsurance_content(
                          `${event.target.value}*${item.id}`
                        )
                      );
                    }}
                  >
                    {content_value.data.Content_data.map((item, index) => {
                      return <option key={index}>{item.title}</option>;
                    })}
                  </select>
                </div>
                <div className="basis-[44%]">
                  <span className="lg:text-[16px] text-[14px] block text-right pb-1 text-colorgray">
                    ارزش مرسوله
                  </span>
                  <select
                    className="w-full rounded-l-md  outline-none block text-colorgray cursor-pointer text-[14px] bg-dashboard px-2 py-2 border-2 border-[#CDCDCD] rounded-[5px]"
                    onClick={(event) => {
                      const item1 = content_value.data.Value_data.find(
                        (item) =>
                          item.min_value == event.target.value.split("-")[0]
                      );

                      return dispatch(
                        MethodInsurance_value(
                          `${event.target.value}*${item1.id}`
                        )
                      );
                    }}
                  >
                    {content_value.data.Value_data.map((item, index) => {
                      return (
                        <option
                          key={index}
                        >{`${item.min_value}-${item.max_value} میلیون تومان`}</option>
                      );
                    })}
                  </select>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}

          <div className="w-full flex justify-end text-colorgray">
            <div className="flex justify-end flex-col mt-[10px] w-[26%] ml-6">
              <span className="inline-block text-right">تعداد کل</span>
              <div className="bg-dashboard h-[40px] border-2 border-solid border-[#CDCDCD] rounded-[4px] lg:w-[full] py-[4px] px-4">
                {dataorder.package.packB.number +
                  dataorder.package.packS.number +
                  dataorder.package.packM.number}
              </div>
            </div>
          </div>
          <div className="flex justify-end flex-col text-colorgray">
            <span className="mt-[8px]  text-right mr-[3%]">توضیحات</span>
            <div className="bg-dashboard border-2 border-solid border-[#CDCDCD] h-[50px] w-[94%] rounded-[5px] px-4 py-4 mx-auto"></div>
          </div>
        </div>
        <div className="lg:w-[70%] w-[85%] rounded-[5px] px-2 py-2 border-2 border-solid border-[#FFCB05] mx-auto bg-[#fff] mt-[15px] mb-[50px] flex text-[14px] ">
          <IoIosWarning className="text-[#FFCB05] inline-block  mx-1 text-[18px]" />
          لطفا مطمئن شوید که وزن و ابعاد دقیق باشد تا از هزینه های اضافه بعدی
          جلوگیری شود
        </div>
        {flag_Complate_Order ? <div className="lg:w-[70%] w-[85%] mb-[10px] text-right mr-[15%] text-[18px] font-[600]">
          انتخاب جزئیات سفارش
        </div>:""}
       
        {/* ثبت سفرش */}
        {/* پایان سایز بسته */}
        {/* شروع:نمایش با درخواست سمت بک اند */}

        {flag_Complate_Order ? (
          getprice ? (
            <div className="mt-1">
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
                    dispatch(MethodPrice(item));
                  }}
                  className={`${
                    isshow[index] ? "" : ""
                  } lg:w-[70%] w-[85%] mx-auto px-4 pt-4 pb-2 mb-[30px]  block text-[black] bg-[#fff] rounded-md`}
                >
                  <div className="z-10 w-full">
                    <div className="flex justify-between">
                      <div className="mx-12 font-[600] text-[15px]">
                        {item.title}
                      </div>
                      {/* <div className="mx-8 text-colorgray text-lg">
                        {item.amount.toLocaleString()} تومان
                      </div> */}
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <div className="flex">
                          <div className="">
                            { isshow[index]?<GoCheckCircleFill
                              className={`w-8 h-8  text-colorgreen`}
                            />: <FiCircle  className={`w-8 h-8  text-[#d8dde7]`} />}
                         
                            
                          </div>
                          <div className="mx-4">
                            <p className="text-[#8A8A8A]">جمع آوری فوری</p>
                            <p className="text-colorgray pt-2">{`${
                              item.pickup_time.split("_")[0]
                            }`}</p>
                          </div>
                        </div>
                        <div className="mx-4">
                          <div className="flex">
                            <p className="text-[#8A8A8A] px-3"> تحویل</p>
                            <div className="flex">
                              <Image
                                src="/order/tick.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              <Image
                                src="/order/tick.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                              <Image
                                src="/order/ticke.svg"
                                width={20}
                                height={20}
                                alt="Picture of the author"
                              />
                            </div>
                          </div>
                          <p className="text-colorgray pt-2">
                            {item.delivery_time}
                          </p>
                        </div>
                      </div>
                      {/* toggle */}
                    </div>
                    <div className="flex rounded-[5px] bg-dashboard border-2 border-solid border-[#CDCDCD] px-2 py-2 mt-[5px] justify-between">
                      <div className="text-[#8A8A8A] flex  px-2 ">
                        <Image
                          src="/order/chap.svg"
                          width={20}
                          height={20}
                          alt="Picture of the author"
                        />
                        <p className="px-2 text-[14px]">امکان چاپ لیبل بارکد</p>
                      </div>
                      <div className="text-[#8A8A8A] flex  px-2">
                        <Image
                          src="/order/search.svg"
                          width={23}
                          height={23}
                          alt="Picture of the author"
                        />
                        <p className="px-2 text-[14px]">امکان رهگیری</p>
                      </div>
                      <div className="text-[#8A8A8A] flex px-2">
                        <Image
                          src="/order/bime.svg"
                          width={18}
                          height={18}
                          alt="Picture of the author"
                        />
                        <p className="px-2 text-[14px]">بیمه پایه</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {/*  پایان نمایش هزینه ارسال */}
              {/* شروع تصاویر */}
              <div className="pt-[2px] lg:w-[70%] w-[85%] mx-auto">
                <Image
                  src="/order/price/image.svg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-full"
                  priority
                />
              </div>
              {/* پایان تصاویر */}
              {/* شروع تقویم */}
              <div className="lg:w-[70%] w-[85%] mb-[10px] text-right mr-[20%] text-[18px] font-[600] mt-[50px]">
                انتخاب روز جمع آوری
              </div>
              <div className=" lg:w-[60%] w-[85%] mx-auto mb-[50px]">
                <Datapicker getprice={getprice} />
              </div>
              {/* پایان تقویم */}
              <div className="py-[20px] lg:w-[70%] w-[85%] mx-auto my-6">
                <Image
                  src="/order/cal.svg"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  className="w-[60%] block mx-auto"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-10 ">
              <Image
                src="/loading.svg"
                width={100}
                height={100}
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
