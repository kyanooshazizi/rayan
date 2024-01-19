"use client"; 
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  MethodDocument_plus,
  MethodPrice,
  MethodInsurance_value,
  MethodDocument_mines,
  MethodBackHomepage
} from "../../../Redux/orderslice";
import { useDispatch, useSelector } from "react-redux";
import { FaCertificate } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import useValuedefult from "@/components/TanstakQury/useValuedefult";
// module style
import stylecard from "../../../../style/card.module.css";
import styles from "../../../../style/neumorfism.module.css";
import usecity_servise from "@/components/TanstakQury/useCity_servise";
import Datapicker from "@/components/utilsorder/Datapicker";
const Package = () => {
  const {datacity, dataservise}=usecity_servise()
 
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [getprice, setGetprice] = useState("");
  const [isshow, setIsshow] = useState("");
  const content_value=useValuedefult();

  let refresh_price = `${dataorder.pick_up}+${dataorder.delivery}+${dataorder.document.afour.number}+${dataorder.document.athree.number}`;
  let flag_Complate_Order =
    dataorder.pick_up && dataorder.delivery && (dataorder.document.afour.number||dataorder.document.athree.number);
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


// const {data,isPending}=useMutation({mutationFn:})
  // send requst for back:end
  useEffect(() => {
    if (flag_Complate_Order) {
      dispatch(MethodBackHomepage());
      var formData = new FormData();
      var OrderData = {
        from_city: dataorder.pick_up,
        to_city: dataorder.delivery,
        count: [dataorder.document.athree.number,dataorder.document.afour.number],
        package: [dataorder.service,dataorder.service],
        size: ["A3", "A4"],
      };

      // Loop through the object and append values to FormData
      Object.keys(OrderData).forEach((key) => {
        var value = OrderData[key];
        formData.append(key, value);
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
          .catch((error) => console.error("Error:", error));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [refresh_price]);
 
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
          <div className="flex justify-around mt-8">
          {(dataservise.data[0].size).map((item)=>{
            switch(item.title){
              case "A4":
              return(
                <div className="relative mt-5">
                <Image
                  src="/document1.png"
                  width={130}
                  height={130}
                  alt="Picture of the author"
                  loading="lazy"
                />
                {/* badge */}
                {dataorder.document.afour.number ? (
                  <span className="absolute bg-bgcolor text-txcolor px-3 py-2 rounded-full -top-[6px] right-[21px]">
                    {dataorder.document.afour.number}+
                  </span>
                ) : null}
                {/* badge */}
                <span className="absolute top-[89px] right-[35px] text-sm">پاکت A4</span>
                {dataorder.document.afour.number == 0 ? (
                  <button
                    className="bg-utils-300 text-txcolor py-2 px-3 rounded-md"
                    onClick={() => {
                      dispatch(MethodDocument_plus(`A4*${item.id}`));
                    }}
                  >
                    انتخاب کن
                  </button>
                ) : (
                  <div className="flex justify-center ">
                    <button
                      className="text-xl ml-3 bg-bgcolor px-3 py-2 text-txcolor font-bold rounded-full"
                      onClick={() => {
                        if (dataorder.document.afour.number > 24) {
                          notify();
                        } else {
                          dispatch(MethodDocument_plus(`A4*${item.id}`));
                        }
                      }}
                    >
                      +
                    </button>
                    <button
                      className="text-2xl bg-bgcolor px-4 py-2 text-txcolor font-bold rounded-full"
                      onClick={() => {
                        dispatch(MethodDocument_mines(`A4*${item.id}`));
                      }}
                    >
                      {dataorder.document.afour.number <= 1 ? (
                        <AiOutlineDelete />
                      ) : (
                        "-"
                      )}
                    </button>
                  </div>
                )}
              </div>
              )
              case "A3":
                return(
                  <div className="relative">
                  <Image
                    src="/document1.png"
                    width={150}
                    height={150}
                    alt="Picture of the author"
                    loading="lazy"
                  />
                  {/* badge */}
                  {dataorder.document.athree.number ? (
                    <span className="absolute bg-bgcolor text-txcolor px-3 py-2 rounded-full -top-[6px] right-[40px]">
                      {dataorder.document.athree.number}+
                    </span>
                  ) : null}
                  {/* badge */}
                  <span className="absolute top-[102px] right-[46px] text-sm">پاکت A3</span>
                  {dataorder.document.athree.number == 0 ? (
                    <button
                      className="bg-utils-300 text-txcolor py-2 px-3 rounded-md"
                      onClick={() => {
                        dispatch(MethodDocument_plus(`A3*${item.id}`));
                      }}
                    >
                      انتخاب کن
                    </button>
                  ) : (
                    <div className="flex justify-center ">
                      <button
                        className="text-xl ml-3 bg-bgcolor px-3 py-2 text-txcolor font-bold rounded-full"
                        onClick={() => {
                          if (dataorder.document.athree.number > 24) {
                            notify();
                          } else {
                            dispatch(MethodDocument_plus(`A3*${item.id}`));
                          }
                        }}
                      >
                        +
                      </button>
                      <button
                        className="text-2xl bg-bgcolor px-4 py-2 text-txcolor font-bold rounded-full"
                        onClick={() => {
                          dispatch(MethodDocument_mines(`A3*${item.id}`));
                        }}
                      >
                        {dataorder.document.athree.number <= 1 ? (
                          <AiOutlineDelete />
                        ) : (
                          "-"
                        )}
                      </button>
                    </div>
                  )}
                </div>
                )
            }
 
          })}
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
                    dispatch(MethodPrice(item));
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
                      <form className="mt-8 flex justify-between">
                        <div className="w-3/4 relative mt-10">
                          <span className="absolute text-sm right-3 bottom-2 py-[13px] px-2 bg-tickboxprice text-txcolor rounded-tr-md rounded-br-md outline-none border-none">
                            ارزش مرسوله شما چقدر است؟
                          </span>
                          <select
                            className="w-1/2 border-solid border-2 py-2 px-3 rounded-tl-md rounded-bl-md outline-0 text-black absolute right-[193px] bottom-2 cursor-pointer"
                            onClick={(event) => {
                              const item1=content_value.data.Value_data.find((item)=>item.min_value==event.target.value.split("-")[0])
                            
                                return(
                                  dispatch(MethodInsurance_value(`${event.target.value}*${item1.id}`))
                                )
                            }}
                          >
                           
                            {(content_value.data.Value_data).map((item,index) => {
                                return <option key={index}  >{`${item.min_value.toLocaleString()}-${item.max_value.toLocaleString()} میلیون تومان`}</option>
                              
                             
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
                priority
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
