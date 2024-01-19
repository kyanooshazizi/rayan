"use client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState} from "react";
import {
  Methodpackageadd,
  Methodpackagedelet,
  MethodPrice,
  MethodInsurance_value,
  MethodInsurance_content,
  MethodBackHomepage
} from "../../../Redux/orderslice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FaCertificate } from "react-icons/fa";
import useValuedefult from "@/components/TanstakQury/useValuedefult";
import usecity_servise from "@/components/TanstakQury/useCity_servise"

import Datapicker from "@/components/utilsorder/Datapicker";
import { BsBoxSeamFill } from "react-icons/bs";
// style module
import styles from "../../../../style/neumorfism.module.css";
import stylecard from  "../../../../style/card.module.css";
const Package = () => {
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [getprice, setGetprice] = useState("");
  const [isshow, setIsshow] = useState("");
 
  const content_value=useValuedefult();

  const {datacity, dataservise}=usecity_servise()
  

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
          to_city:dataorder.delivery,
          count: [dataorder.package.packB.number,dataorder.package.packM.number,dataorder.package.packS.number],
          package: [dataorder.service,dataorder.service,dataorder.service],
          size: ["بزرگ", "متوسط","کوچک"],
        };
    
        // Loop through the object and append values to FormData
        Object.keys(OrderData).forEach((key) => {
          var value = OrderData[key];
            formData.append(key, value);
          
        });
    
        // Log FormData key-value pairs
        formData.forEach((value, key) => {
         
        });
    
        try {
          fetch("https://mohaddesepkz.pythonanywhere.com/prices/details/", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
            
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
           
            {(dataservise.data[1].size).map((item)=>{
              switch(item.title){
                case "بزرگ":
                   {/* start packB */}
              return <div className="bg-utils-300 w-40 h-36 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
              {/* start badge */}
              {dataorder.package.packB.number ? (
                <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-4 left-[128px]">
                  {dataorder.package.packB.number}+
                </span>
              ) : (
                ""
              )}
              {/* end badge */}
              <p className="text-txcolor">بسته {item.title}</p>
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
                        : dispatch(Methodpackageadd(`packB*${item.id}`));
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
             case "متوسط":
          {/* start packM */}
          return <div className="bg-utils-300 w-36 h-32 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
          {/* start badge */}
          {dataorder.package.packM.number ? (
            <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-4 left-[115px]">
              {dataorder.package.packM.number}+
            </span>
          ) : (
            ""
          )}
          {/* end badge */}
          <p className="text-txcolor">بسته {item.title}</p>
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
                    : dispatch(Methodpackageadd(`packM*${item.id}`));
                }
              }}
            >
              {dataorder.package.packM.number ? "+" : "انتخاب کن"}
            </button>
            {dataorder.package.packM.number ? (
              <button
                className="bg-bgcolor rounded-md text-txcolor py-1 px-2 mx-2"
                onClick={() => {
                  dispatch(Methodpackagedelet(`packM`));
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
        case "کوچک":
 {/* start packS */}
 return <div className="bg-utils-300 w-32 h-28 rounded-md self-end mb-3 text-center relative shadow-utils-300 shadow-lg">
 {/* start badge */}
 {dataorder.package.packS.number ? (
   <span className="bg-bgcolor text-txcolor p-2 ml-2 text-center rounded-full absolute -top-5 left-[100px]">
     {dataorder.package.packS.number}+
   </span>
 ) : (
   ""
 )}
 {/* end badge */}
 <p className="text-txcolor">بسته {item.title}</p>
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
           : dispatch(Methodpackageadd(`packS*${item.id}`));
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
              }
             
                  })}    
           
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
                    dispatch(MethodPrice(item));
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
                        <p>{`${item.pickup_time.split("_")[0]}`}</p>
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
                    <form className="mt-8 flex ">
                      <div className="w-3/5 flex">
                      <span className="text-sm right-3 bottom-2 py-[15px] px-2 bg-tickboxprice text-txcolor rounded-tr-md rounded-br-md outline-none border-none">
                             محتوا مرسوله را مشخص کنید
                          </span>
                        <select className="w-2/5  py-3 px-4 rounded-l-md  outline-none inline-block text-black cursor-pointer text-sm"
                        onClick={(event)=>{ 
                          const item=content_value.data.Content_data.find((item)=>item.title===event.target.value)
                          
                          return(
                            dispatch(MethodInsurance_content(`${event.target.value}*${item.id}`))
                          )
                          }}
                        >
                          {(content_value.data.Content_data).map((item,index)=>{
                          return <option key={index}>
                           {item.title}
                          </option>
                          })}
        
                        </select>
                      </div>
                      <div className="w-2/5 flex">
                      <span className="text-sm right-3 bottom-2 py-[15px] px-2 bg-tickboxprice text-txcolor rounded-r-md outline-none border-none">
                           ارزش مرسوله
                          </span>
                        <select className="border-solid text-black  py-3 px-4 rounded-l-md  outline-none w-3/5 text-sm cursor-pointer"
                          onClick={(event)=>{
                            const item1=content_value.data.Value_data.find((item)=>item.min_value==event.target.value.split("-")[0])
                          
                            return(
                              dispatch(MethodInsurance_value(`${event.target.value}*${item1.id}`))
                            )
                           }}>

                          {(content_value.data.Value_data).map((item,index)=>{
                          return <option key={index}>{`${(item.min_value)}-${(item.max_value)} میلیون تومان`}</option>
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
              <Datapicker getprice={getprice}/>
              {/* پایان تقویم */}
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
