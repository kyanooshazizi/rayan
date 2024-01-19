"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlineForward } from "react-icons/ai";
import {MethodFlagHandler,MethodFlagHandlerAddress} from "../utils/MethodFlagHandler";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { MethodDeletOrder } from "../../Redux/orderslice";
import { usePathname } from "next/navigation";
import { useThemeContext } from '../../context/store';
import { setCookie ,getCookie } from "cookies-next";
const Sidbar = () => {
  const { islogin} = useThemeContext();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const datastore = useSelector((state) => state.order.order);
  const [urldata, setUrldata] = useState("");
  const [delorder,setDelorder]=useState("")
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
const [tax,setTax]=useState("");
useEffect(() => {
  const url = `${pathname}`;
    setUrldata(() => {
      if (url.split("/")[2]) {
        return url.split("/")[2];
      } else {
        return null;
      }
    }, []);
    if(datastore.Insurance.Product_value){
      fetch("https://mohaddesepkz.pythonanywhere.com/prices/tax/",{
        method:"POST",
        body: JSON.stringify({
          price: datastore.Price,
          value: datastore.id.value
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res=>res.json()).then((res)=>setTax(res)).catch(err=>console.log("🚀 ~ file: sidbar.js:70 ~ Sidbar ~ err:", err))
    }

    // You can now use the current URL
    // ...
  }, [pathname,datastore.Insurance.Product_value,datastore.Price]);
  // شروع:مدیریت نوع مرسوله
  const ServiceNameHandler = (serveisName) => {
    switch (serveisName) {
      case "بسته":
        return [
          datastore.package.packB.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته بزرگ:</span>
              <span> {datastore.package.packB.number} عدد</span>
            </div>
          ) : (
            ""
          ),
          datastore.package.packM.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته متوسط:</span>
              <span> {datastore.package.packM.number} عدد</span>
            </div>
          ) : (
            ""
          ),
          datastore.package.packS.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته کوچک:</span>
              <span> {datastore.package.packS.number} عدد</span>
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
                className={`btnoutline border-2 border-white bg-utils-300 py-2 px-2 rounded-md text-txcolor font-bold hover:bg-bgbtnhover
hover:text-navbarrequst transition-all transition-500 ease-linear ${
                  MethodFlagHandler(datastore) ? "bg-green-800" : ""
                }`}
                onClick={() => {
                  if (MethodFlagHandler(datastore)) {
                    if(getCookie('access_token')){
                       
                      router.push("/order/address");
                    }else{

                    router.push("/auth/login");

                    }
                  }
                }}
              >
                ثبت درخواست{" "}
                <AiFillBackward className="text-xl inline-block mr-2" />
              </button>
            </PopoverTrigger>
            {MethodFlagHandler(datastore) ? (
              ""
            ) : (
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    لطفا تمام فیلد ها را پر کنید!
                  </div>
                  <div className="text-tiny mt-5">سفارش شما ناقص است</div>
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
              className={`btnoutline border-2 border-white bg-utils-300 py-2 px-2 rounded-md text-txcolor font-bold hover:bg-bgbtnhover hover:text-navbarrequst transition-all transition-500 ease-linear ${MethodFlagHandlerAddress(dataAddress)?"bg-[green]":""}`}
              onClick={() => {
                
                if (MethodFlagHandlerAddress(dataAddress)) {
                  fetch("https://mohaddesepkz.pythonanywhere.com/orders/delete/", {
                  method: "DELETE",
                  headers: {Authorization:`Bearer ${getCookie("access_token")}` },
                }).then(res=>res.json()).then(res=>
                  {
                  size_order.map((item, index) => {
                    fetch("https://mohaddesepkz.pythonanywhere.com/orders/new/", {
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
                        Authorization: `Bearer ${getCookie("access_token")}`,
                        "Content-type": "application/json",
                      },
                    })
                      .then((res) => res.json())
                      .then((res) =>{
                        
                        setCookie('code', res.tracking_code);
                      })
                      
                      .catch((err) => console.error(err));
                      
                    })
                  }
                  );
                
                 
                
                  setTimeout(()=>{ router.push("/order/OrderReview")},1000)
                  
                 
                }
              }}
            >
            ثبت آدرس
              <AiFillBackward className="text-xl inline-block mr-2" />
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
      <aside className="bg-bgcolor p-2 fixed top-[60px] left-0 w-1/4 h-[calc(100vh_-_60px)]">
        {/* شروع:عنوان */}
        <div className="text-txcolor text-center">
          <div className="text-center shadow-sm bg-white text-bgcolor mb-3 w-[200px] py-2 rounded font-bold mx-auto !important">
            خلاصه سفارش
          </div>
          {datastore.service ? (
            ""
          ) : (
            <div className="text-justify p-2">
              برای دریافت قیمت، مقصد ، مبدا و نوع مرسوله را انتخاب کنید
            </div>
          )}
        </div>
        {/* پایان:عنوان */}
        {/* start detail order  */}

        <div>
          {datastore.service && (
            <>
              <div className="border-b-2 border-b-lime-500 p-2">
                <div className="flex align-middle justify-around mt-6 font-bold text-txcolor text-xl">
                  <span>مبدا</span>
                  <GoArrowLeft className="inline-block" />
                  <span>مقصد</span>
                </div>
                <div className="flex align-middle justify-around mt-3  text-txcolor text-md">
                  <span>{datastore.pick_up}</span>
                  <GoArrowLeft className="inline-block" />
                  <span>{datastore.delivery}</span>
                </div>
              </div>
              {/* شروع: با توجه به نوع مرسوله این قسمت متفاوت است */}

              <div className="border-b-2 border-b-lime-500 p-2">
                <div className="flex align-middle justify-start mt-6 font-bold text-txcolor text-md">
                  مرسوله های انتخابی
                </div>
                {/* تابع چک کننده اسم محصول*/}
                <div className="mt-3  text-txcolor text-md">
                  {ServiceNameHandler(datastore.service).map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
              {/*  پایان: با توجه به نوع مرسوله این قسمت متفاوت است */}
              {datastore.Price ? (
                <div className="border-b-2 border-b-lime-500">

                <div className="flex justify-between py-1 mx-5 text-txcolor">
                  <span> هزینه ارسال:</span>
                  <span>{datastore.Price.toLocaleString()} تومان</span>
                </div>
                 
                  <div className="flex justify-between py-1 mx-5 text-txcolor">
                    <span>هزینه بابت جبران خسارت:</span>
                    <span> {tax?`${tax.tax.toLocaleString()}`:""} تومان</span>
                  </div>
                </div>
                 
              ) : (
                ""
              )}
              {/*  نمایش محتوا و ارزش بسته*/}
              {ContentHandler(datastore.service)}
              {/*  نمایش محتوا و ارزش بسته*/}
              {datastore.pickup_date ? (
                <div className="flex justify-around border-b-2 border-b-lime-500 p-2 text-txcolor">
                  <span>تاریخ ارسال:</span>
                  <span>{datastore.pickup_date}</span>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        {/* end detail order  */}
        {/* start:button  */}
        <div className="fixed bottom-10 flex justify-around w-1/4 p-4">
          {datastore.service ? (
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
          ) : null}
          {ButtenCountinueHandler(urldata)}
        </div>
        {/* end:button  */}
      </aside>
    </>
  );
};

export default Sidbar;
