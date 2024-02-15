"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlineForward } from "react-icons/ai";
import {
  MethodFlagHandler,
  MethodFlagHandlerAddress,
} from "../utils/MethodFlagHandler";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { GoCircle } from "react-icons/go";
import { MethodDeletOrder } from "../../Redux/orderslice";
import { usePathname } from "next/navigation";
import { useThemeContext } from "../../context/store";
import { setCookie, getCookie } from "cookies-next";
import { LiaTimesSolid } from "react-icons/lia";
const Sidbar = () => {
  const { islogin } = useThemeContext();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const datastore = useSelector((state) => state.order.order);
  const [urldata, setUrldata] = useState("");
  const [delorder, setDelorder] = useState("");
  // start: send data order
  const dataAddress = useSelector((state) => state.order.address);

  const size_order = datastore.id.size.filter((item) => item !== "");
  const count_order = datastore.id.count.filter((item) => item !== 0);

  var faToEnDigits = function (input) {
    if (input == undefined) return;
    var returnModel = "",
      symbolMap = {
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        "۰": "0",
      };
    input = input.toString();
    for (var i = 0; i < input.length; i++)
      if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
      else returnModel += input[i];
    return returnModel;
  };
  const pickup_date = faToEnDigits(datastore.pickup_date);
  // end:send data order
  const [tax, setTax] = useState("");
  useEffect(() => {
    const url = `${pathname}`;
    setUrldata(() => {
      if (url.split("/")[2]) {
        return url.split("/")[2];
      } else {
        return null;
      }
    }, []);
    if (datastore.Insurance.Product_value) {
      fetch("https://mohaddesepkz.pythonanywhere.com/prices/tax/", {
        method: "POST",
        body: JSON.stringify({
          price: datastore.Price,
          value: datastore.id.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setTax(res))
        .catch((err) =>
          console.log("🚀 ~ file: sidbar.js:70 ~ Sidbar ~ err:", err)
        );
    }

    // You can now use the current URL
    // ...
  }, [pathname, datastore.Insurance.Product_value, datastore.Price]);
  // شروع:مدیریت نوع مرسوله
  const ServiceNameHandler = (serveisName) => {
    switch (serveisName) {
      case "بسته":
        return [
          datastore.package.packB.number ? (
            <div className="flex items-center justify-between px-3">
              <span>
                {" "}
                {datastore.package.packB.number}{" "}
                <LiaTimesSolid className="text-[14px] mx-2 inline-block text-[#000]" />{" "}
                بسته{" "}
              </span>
              {/* <span>بزرگ</span> */}
            </div>
          ) : (
            ""
          ),
          datastore.package.packM.number ? (
            <div className="flex items-center justify-between px-3">
              <span>
                {" "}
                {datastore.package.packM.number}{" "}
                <LiaTimesSolid className="text-[14px] mx-2 inline-block text-[#000]" />{" "}
                بسته{" "}
              </span>
              {/* <span>متوسط</span> */}
            </div>
          ) : (
            ""
          ),
          datastore.package.packS.number ? (
            <div className="flex items-center justify-between px-3">
              <span>
                {" "}
                {datastore.package.packS.number}{" "}
                <LiaTimesSolid className="text-[14px] mx-2 inline-block text-[#000]" />{" "}
                بسته{" "}
              </span>
              {/* <span>کوچک</span> */}
            </div>
          ) : (
            ""
          ),
        ];
      case "پاکت":
        return [
          datastore.document.afour.number ? (
            <div className="flex items-center justify-around">
              <span>پاکت A4</span>
              <span> {datastore.document.afour.number} عدد</span>
            </div>
          ) : (
            ""
          ),
          datastore.document.athree.number ? (
            <div className="flex items-center justify-around">
              <span>پاکت A3</span>
              <span> {datastore.document.athree.number} عدد</span>
            </div>
          ) : (
            ""
          ),
        ];
    }
    return null;
  };
  const ContentHandler = (servisName) => {
    switch (servisName) {
      case "بسته":
        return datastore.Insurance.Product_value ? (
          <div className=" border-b-2 border-b-lime-500 p-2 text-txcolor">
            <p className="text-lg mb-3">نوع مرسوله:</p>
            <div className="flex justify-between">
              <span>{datastore.Insurance.Product_content}</span>
              <span className="text-sm px-2">با ارزش تقریبی</span>
              <span>{datastore.Insurance.Product_value}</span>
            </div>
          </div>
        ) : (
          ""
        );
      case "پاکت":
        return datastore.Insurance.Product_value ? (
          <div className=" border-b-2 border-b-lime-500 p-2 text-txcolor">
            <p className="text-lg mb-3">نوع مرسوله:</p>
            <div className="flex justify-between">
              <span>پاکت</span>
              <span className="text-sm px-2">با ارزش </span>
              <span>{datastore.Insurance.Product_value}</span>
            </div>
          </div>
        ) : (
          ""
        );
    }
    return null;
  };
  const ButtenCountinueHandler = (path) => {
    switch (path) {
      case "requst":
        return (
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <button
                className={`bg-bgcolor outline-none py-[8px] px-2 rounded-[4px] text-txcolor w-full text-[18px]  ${
                  MethodFlagHandler(datastore) ? "" : ""
                }`}
                onClick={() => {
                  if (MethodFlagHandler(datastore)) {
                    if (getCookie("access_token")) {
                      router.push("/order/address");
                    } else {
                      router.push("/auth/login");
                    }
                  }
                }}
              >
                ادامه ثبت سفارش
              </button>
            </PopoverTrigger>
            {MethodFlagHandler(datastore) ? (
              ""
            ) : (
              <PopoverContent className="!rounded-[4px] !w-[255px] ">
                <div className="px-1 py-4">
                  <div className="text-[14px]  text-[#B5B5B5]">
                    برای ادامه سفارش جزئیات را تکمیل کنید
                  </div>
                  <div className="text-tiny mt-1">
                    <div className="flex  py-1">
                      <GoCircle className="text-[18px] text-colorgray" />
                      <span className="px-2 text-colorgray">ابعاد مرسوله</span>
                    </div>
                    <div className="flex py-1">
                      <GoCircle className="text-[18px] text-colorgray" />
                      <span className="px-2 text-colorgray">ارزش مرسوله</span>
                    </div>
                    <div className="flex py-1">
                      <GoCircle className="text-[18px] text-colorgray" />
                      <span className="px-2 text-colorgray">محتوا مرسوله</span>
                    </div>
                    <div className="flex py-1">
                      <GoCircle className="text-[18px] text-colorgray" />
                      <span className="px-2 text-colorgray"> جزئیات سرویس</span>
                    </div>
                    <div className="flex py-1">
                      <GoCircle className="text-[18px] text-colorgray" />
                      <span className="px-2 text-colorgray">
                        انتخاب روز جمع آوری
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
      case "address":
        return (
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <button
                className={`bg-bgcolor outline-none py-[8px] px-1 rounded-[4px] text-txcolor w-full text-[18px]`}
                onClick={() => {
                  if (MethodFlagHandlerAddress(dataAddress)) {
                    fetch(
                      "https://mohaddesepkz.pythonanywhere.com/orders/delete/",
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${getCookie("access_token")}`,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res);
                        size_order.map((item, index) => {
                          fetch(
                            "https://mohaddesepkz.pythonanywhere.com/orders/new/",
                            {
                              method: "POST",
                              body: JSON.stringify({
                                count: count_order[index],
                                size: size_order[index],
                                package: datastore.id.package,
                                content: datastore.id.content,
                                service: datastore.id.service,
                                value: datastore.id.value,
                                pickup_date,
                                sender_address: dataAddress.SenderAddress,
                                sender_plaque: dataAddress.Senderpelak,
                                sender_stage: dataAddress.Sendertabaghe,
                                sender_unity: dataAddress.Sendervahed,
                                sender_name: dataAddress.SenderName,
                                sender_phone: dataAddress.SenderMobile,
                                receiver_address: dataAddress.ReceiverAddress,
                                receiver_plaque: dataAddress.Receiverpelak,
                                receiver_stage: dataAddress.Receivertabaghe,
                                receiver_unity: dataAddress.Receivervahed,
                                receiver_name: dataAddress.ReceiverName,
                                receiver_phone: dataAddress.ReceiverMobile,
                                description: dataAddress.Additional_details,
                              }),
                              headers: {
                                Authorization: `Bearer ${getCookie(
                                  "access_token"
                                )}`,
                                "Content-type": "application/json",
                              },
                            }
                          )
                            .then((res) => res.json())
                            .then((res) => {
                              console.log(res);
                              setCookie("code", res.tracking_code);
                            })

                            .catch((err) => console.error(err));
                        });
                      })
                      .catch((err) => console.log("error delet", err));

                    setTimeout(() => {
                      router.push("/order/OrderReview");
                    }, 2000);
                  }
                }}
              >
               ادامه ثبت سفارش
              </button>
            </PopoverTrigger>
            {MethodFlagHandlerAddress(dataAddress) ? (
              ""
            ) : (
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    لطفا مشخصات فرستنده و گیرنده را با دقت پر کنید!
                  </div>
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
    }
  };

  return (
    <>
      <aside className="bg-[#ADB3C3] w-full min-h-screen pt-[120px] pr-[10px]">
        {/* شروع:عنوان */}
        <div className="text-[16px] font-[600] mr-[20px]">خلاصه سفارش</div>
        {/* پایان:عنوان */}
        {/* start detail order  */}

        <div>
          {datastore.delivery && datastore.pick_up && (
            <>
              <div className=" bg-[#fff] mt-1 rounded-[4px] w-[250px] mr-[22px]">
                <div className="flex items-center pt-2 text-[16px]">
                  <span className="px-5 text-colorgray font-[500]">مبدا</span>
                  <GoArrowLeft className="inline-block" />
                  <span className="px-5 text-colorgray font-[500]">مقصد</span>
                </div>
                <div className="flex items-center py-1 text-[16px]">
                  <span className="px-5 text-[14px]">{datastore.pick_up}</span>
                  <GoArrowLeft className="inline-block" />
                  <span className="px-5 text-[14px]">{datastore.delivery}</span>
                </div>
              </div>
              {/* شروع: با توجه به نوع مرسوله این قسمت متفاوت است */}
              {datastore.package.packB.number ||
              datastore.package.packM.number ||
              datastore.package.packS.number ? (
                <div>
                  <div className="p-2 mr-[15px]">
                    <div className="mt-2 font-bold  text-[16px]">
                      جزئیات سفارش
                    </div>
                    <div className="mt-1 text-md bg-[#fff] w-[250px] rounded-[4px] py-2 text-colorgray">
                      {ServiceNameHandler("بسته").map((item, index) => {
                        return <div key={index}>{item}</div>;
                      })}
                      {datastore.Price ?<div className="flex justify-between mt-2">
                     <span className="text-[14px] pr-3">{datastore.titleprice} </span>
                     <span className="text-[14px] px-1">{datastore.Price.toLocaleString()} تومان</span>
                     </div>:""}
                     
                    </div>
                  </div>
                  {datastore.pickup_date ? (
                    <div className="p-2 mr-[15px]">
                      <div className=" font-bold  text-[16px]">
                        تاریخ جمع آوری
                      </div>
                      <div className="mt-1 text-md bg-[#fff] w-[250px] rounded-[4px] py-2 px-4 text-colorgray">
                        <span>{datastore.pickup_date}</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {datastore.Price&&tax ? (
                    <div className="p-2 mr-[15px]">
                      <div className=" font-bold  text-[16px]">قیمت</div>
                      <div className="mt-1 text-md bg-[#fff] w-[250px] rounded-[4px] py-2 px-4 text-colorgray">
                        <span>{(datastore.Price+tax.tax).toLocaleString()} تومان</span>
                      </div>

                      {/* <div className="flex justify-between py-1  text-txcolor">
                <span>هزینه بابت جبران خسارت:</span>
                <span> {tax?`${tax.tax.toLocaleString()}`:""} تومان</span>
              </div> */}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {/*  نمایش محتوا و ارزش بسته*/}
              {/* {ContentHandler(datastore.service)} */}
              {/*  نمایش محتوا و ارزش بسته*/}
              {/*  پایان: با توجه به نوع مرسوله این قسمت متفاوت است */}
            </>
          )}
        </div>

        {/* end detail order  */}
        {/* start:button  */}
        <div className="rounded-[4px] w-[260px] mr-[20px] mt-2 fixed bottom-[100px]">
          {/* {
            urldata === "requst" ? (
              <button
                className="group border-2 border-white py-2 px-4 rounded-md text-txcolor bg-utils-300 hover:bg-white
              hover:text-navbarrequst transition-all transition-500 ease-linear font-bold"
                onClick={() => dispatch(MethodDeletOrder())}
              >
                حذف سفارش
                <AiFillDelete className="inline-block text-xl mr-1 group-hover:text-[red]" />
              </button>
            ) : (
              <button
                className="border-2 border-white py-2 px-6 rounded-md bg-utils-300 text-txcolor hover:bg-white
             hover:text-navbarrequst transition-all transition-500 ease-linear font-bold"
                onClick={() => router.push("/order/requst")}
              >
                <AiOutlineForward className="inline-block text-xl ml-2" />
                بازگشت
              </button>
            )
           } */}
          {ButtenCountinueHandler(urldata)}
        </div>
        {/* end:button  */}
      </aside>
    </>
  );
};

export default Sidbar;
