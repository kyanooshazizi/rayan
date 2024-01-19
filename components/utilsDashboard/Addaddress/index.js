"use client";
import React, { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineBackward } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import Modal from "./modal_new_address";
import Modal_edit from "./modal_edite";
import Modal_edit_sender from "./modal_edite_sender";
import { getCookie } from "cookies-next";
// start:save in localhost
import { useDispatch,useSelector} from "react-redux";
import {
  MethodSenderName,
  MethodSenderAddress,
  MethodSenderMobile,
  MethodReceiverName,
  MethodReceiverAddress,
  MethodReceiverMobile,
  MethodSenderAddress_details,
  MethodReceiverAddress_details
} from "@/components/Redux/orderslice";
import { useRouter } from "next/navigation";
import {MethodFlagHandler} from "../../utilsorder/utils/MethodFlagHandler";
import Link from 'next/link'
// end:save in localhost
const page = () => {
  const router=useRouter();
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const [requstOrder_sender,setRequstOrder_sender]=useState(false);
  const [requstOrder_reciver,setRequstOrder_reciver]=useState(false);
  const [datasender,setDatasender]=useState([]);
  const [datareciver,setDatareciver]=useState([]);
  const [togglesender,setTogglesender]=useState(false);
  const [toggleresiver,setToggleresiver]=useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (type === "sender") {
    var [toggle, setToggle] = useState(false);
  } else {
    var [toggle, setToggle] = useState(true);
  }
useEffect(()=>{
  try {
    fetch("https://mohaddesepkz.pythonanywhere.com/address/senders/",{
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('access_token')}`
      },
    }).then(res=>res.json()).then(res=>setDatasender(res)).catch(err=>
      console.log("🚀 ~ file: index.js:32 ~ useEffect ~ err:", err)
      );
  } catch (error) {
    console.error(error);
  }
  
  try {
    fetch("https://mohaddesepkz.pythonanywhere.com/address/receivers/",{
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('access_token')}`
      },
    }).then(res=>res.json()).then(res=>setDatareciver(res)).catch(err=>
      console.log("🚀 ~ file: index.js:43 ~ useEffect ~ err:", err)
      )
  } catch (error) {
    console.error(error);
  }
    
},[togglesender,toggleresiver])


  return (
    <>
      <div className="grid grid-cols-12 p-16 gap-14">
        <div className="col-start-1 col-end-4">
        
          <div className="w-full h-[200px] bg-txcolor py-3 px-2">
            <div className="py-3">
              <FaAddressBook className="text-utils-300 inline-block ml-2 text-lg" />
              <span
                onClick={() => setToggle(true)}
                className={`${
                  toggle ? "text-[blue]" : ""
                } cursor-pointer font-bold`}
              >
                دفترچه آدرس گیرندگان{" "}
                {toggle ? (
                  <AiOutlineBackward className="inline-block text-2xl mr-2" />
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="py-3">
              <FaAddressBook className="text-utils-300 inline-block ml-2 text-lg" />
              <span
                onClick={() => setToggle(false)}
                className={`${
                  !toggle ? "text-[blue]" : ""
                } cursor-pointer font-bold`}
              >
                دفترچه آدرس فرستندگان{" "}
                {!toggle ? (
                  <AiOutlineBackward className="inline-block text-2xl mr-2" />
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
        {
          toggle ? (
            <div className="col-start-4 col-end-13">
              {requstOrder_reciver?<div className="text-center bg-green-300 pr-2 py-2 mb-3 block mx-auto rounded w-2/3">آدرس گیرنده افزوده شد اما هنوز سفارشی را ثبت نکرده اید! <Link href="/order/requst" className="px-2 text-[blue] py-1 rounded-sm bg-white mx-2">ثبت سفارش</Link></div>:""}
              <div className="w-full h-[600px] bg-txcolor py-3 px-2">
                <div className="flex justify-between px-3">
                  <span className="bg-bgcolor relative px-3 py-2 text-txcolor rounded-md after:content-[''] after:border-t-transparent after:border-l-transparent after:border-b-transparent after:border-r-bgcolor after:border-solid after:border-[10px] after:right-[100%] after:absolute after:z-10 after:top-[28%]">
                    آدرس گیرندگان
                  </span>
                  <Modal type="resiver" toggleresiver={()=>setToggleresiver(prev=>!prev)}/>
                </div>
                <hr className="my-4" />
                <div className="mt-20 ">
                  {/* start:header table */}
                  <div className="flex text-sm">
                    <div className="mr-2">نام و نام خانوادگی</div>
                    <div className="mr-12">عنوان کسب و کار</div>
                    <div className="mr-12">شماره تلفن</div>
                    <div className="mr-[74px]">آدرس</div>
                  </div>
                  <hr className="bg-utils-300 h-[2px] w-[98%] mx-auto" />
                  {/* end:header table*/}
                  {/* start body table */}
                  {datareciver.map((item, index) => {
                    return (
                      <div>
                        <div className="flex text-sm my-3">
                          <div className="flex basis-2/3 text-sm">
                            <div className=" basis-[30px]">{index+1} -</div>
                            <div className="basis-[31%] truncate">{item.name}</div>
                            <div className="basis-[31%] truncate">طلا فروشی جواهری</div>
                            <div className="basis-[31%] truncate">{item.phone}</div>
                            <div className="basis-[48%] truncate">
                              {`${item.address}، پلاک${item.plaque}، طبقه${item.stage}، واحد${item.unity}`}
                            </div>
                          </div>
                          <div className="float-left flex justify-end basis-1/3">
                            <div>
                              <MdDelete className="text-xl text-[red] mx-2 cursor-pointer" onClick={()=>{
                                fetch(`https://mohaddesepkz.pythonanywhere.com/address/delete/${item.id}/`,{
                                  method:"DELETE",
                                      headers: {
                                        Authorization: `Bearer ${getCookie("access_token")}`,
                                        "Content-type": "application/json; charset=UTF-8",
                                      },
                                }).then(res=>setToggleresiver(prev=>!prev))
                              }} />
                            </div>
                            <div>
                              <Modal_edit type="resiver" data={item} toggleresiver={()=>setToggleresiver(prev=>!prev)}/>
                            </div>
                            <button onClick={()=>{
                              dispatch(MethodReceiverName(item.name));
                              dispatch(MethodReceiverAddress(item.address));
                              dispatch(MethodReceiverAddress_details("پلاک**"+item.plaque));
                              dispatch(MethodReceiverAddress_details("طبقه**"+item.stage));
                              dispatch(MethodReceiverAddress_details("واحد**"+item.unity));
                              dispatch(MethodReceiverMobile(item.phone));
                              if(MethodFlagHandler(dataorder)){

                                router.push("/order/address")
                              }else{
                                setRequstOrder_reciver({
                                  flag:true,
                                  text:"آدرس گیرنده افزوده شد اما هنوز سفارشی را ثبت نکرده اید!"
                                })
                              }
                            }} className="bg-utils-300 text-txcolor w-[60px] h-[30px] rounded-sm mx-4">
                              انتخاب
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}

                  {/* end body table */}
                </div>
              </div>
            </div>
          ) : (
            // start sender
            <div className="col-start-4 col-end-13">
              {requstOrder_sender?<div className="text-center bg-green-300 pr-2 py-2 mb-3 block mx-auto rounded w-2/3">آدرس فرستنده افزوده شد اما هنوز سفارشی را ثبت نکرده اید! <Link href="/order/requst" className="px-2 text-[blue] py-1 rounded-sm bg-white mx-2">ثبت سفارش</Link></div>:""}
              <div className="w-full h-[600px] bg-txcolor py-3 px-2">
                <div className="flex justify-between px-3">
                  <span className="bg-bgcolor relative px-3 py-2 text-txcolor rounded-md after:content-[''] after:border-t-transparent after:border-l-transparent after:border-b-transparent after:border-r-bgcolor after:border-solid after:border-[10px] after:right-[100%] after:absolute after:z-10 after:top-[28%]">
                    آدرس فرستندگان
                  </span>
                  <Modal type={"sender"} togglesender={()=>setTogglesender(prev=>!prev)}/>
                </div>
                <hr className="my-4" />
                <div className="mt-20 ">
                  {/* start:header table */}
                  <div className="flex text-sm">
                    <div className="mr-2">نام و نام خانوادگی</div>
                    <div className="mr-12">عنوان کسب و کار</div>
                    <div className="mr-12">شماره تلفن</div>
                    <div className="mr-[74px]">آدرس</div>
                  </div>
                  <hr className="bg-utils-300 h-[2px] w-[98%] mx-auto" />
                  {/* end:header table*/}
                  {/* start body table */}
                   {datasender.map((item, index) => {
                    return (
                      <div>
                        <div className="flex justify-between text-sm my-3">
                        <div className="flex basis-2/3 text-sm">
                            <div className=" basis-[30px]">{index+1} -</div>
                            <div className="basis-[31%] truncate">{item.name}</div>
                            <div className="basis-[31%] truncate">طلا فروشی جواهری</div>
                            <div className="basis-[31%] truncate">{item.phone}</div>
                            <div className="basis-[48%] truncate">
                              {`${item.address}، پلاک${item.plaque}، طبقه${item.stage}، واحد${item.unity}`}
                            </div>
                          </div>
                          <div className="justify-end   flex basis-1/3 ">
                            <div>
                              <MdDelete className="text-xl text-[red] mx-2 cursor-pointer" onClick={()=>{
                                fetch(`https://mohaddesepkz.pythonanywhere.com/address/delete/${item.id}/`,{
                                  method:"DELETE",
                                      headers: {
                                        Authorization: `Bearer ${getCookie("access_token")}`,
                                        "Content-type": "application/json; charset=UTF-8",
                                      },
                                }).then(res=>setTogglesender(prev=>!prev))
                              }}/>
                            </div>
                            <div>
                            <Modal_edit_sender type="sender" data={item} togglesender={()=>setTogglesender(prev=>!prev)}/>
                            </div>
                            <button onClick={()=>{
                              dispatch(MethodSenderName(item.name));
                              dispatch(MethodSenderAddress(item.address));
                              dispatch(MethodSenderAddress_details("پلاک**"+item.plaque));
                              dispatch(MethodSenderAddress_details("طبقه**"+item.stage));
                              dispatch(MethodSenderAddress_details("واحد**"+item.unity));
                              dispatch(MethodSenderMobile(item.phone));
                              if(MethodFlagHandler(dataorder)){

                                router.push("/order/address")
                              }else{
                                setRequstOrder_sender(true)
                              }
                            }} className="bg-utils-300 text-txcolor w-[60px] h-[30px] rounded-sm mx-4">
                              انتخاب
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                  {/* end body table */}
                </div>
              </div>
            </div>
          )
          // end  sender
        }
      </div>
    </>
  );
};

export default page;
