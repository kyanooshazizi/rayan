"use client"
import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Modaledit from "./Modaledit"
import { MdDelete } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import {Tooltip, Button} from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
// start:save in localhost
import { useDispatch, useSelector } from "react-redux";
import {
  MethodSenderName,
  MethodSenderAddress,
  MethodSenderMobile,
  MethodReceiverName,
  MethodReceiverAddress,
  MethodReceiverMobile,
  MethodSenderAddress_details,
  MethodReceiverAddress_details,
  Iddistrict_resiver
} from "../../../Redux/orderslice";
import { useRouter } from "next/navigation";
import {MethodFlagHandler} from "../../../utilsorder/utils/MethodFlagHandler";
import Link from 'next/link';
// end:save in localhost
const index = () => {
  const dispatch = useDispatch();
  const dataorder = useSelector((state) => state.order.order);
  const router = useRouter();
  const empty = Array(10).fill(0);
  const { data, isLoading } = useQuery("alladdress_receivers", () => {
    return fetch("https://mohaddesepkz.pythonanywhere.com/address/receivers/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    }).then((res) => res.json());
  },);
  const y=data?.results?10-data?.results?.length:10;
  const x = Array(y).fill(0);
  console.log(data,y,x)
  const queryClient = useQueryClient()
  const { mutate: deletaddress1, data:deletdata ,error,isError } = useMutation(
    (Id) => {
      return fetch(`https://mohaddesepkz.pythonanywhere.com/address/delete/${Id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      });
    },
    {
      onError: () => {
      console.log("err")
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["alladdress_receivers"])
        
      },
    }
  );
  return (
    <div className='mt-[20px]'>
      <div className='lg:w-[85%] md:w-[90%] w-full relative '>
         <input type="text" className='bg-[#AEB3C3] text-[#fff] placeholder:text-[#fff]  focus:bg-bgcolor outline-none px-3 py-3 w-full rounded' 
         placeholder='جستجو در عنوان'
         />
          <IoSearchSharp className="absolute top-[16px] left-[2%] text-[21px] text-[#fff] " />
      </div>
      <div className='mt-[15px] flex justify-between md:flex-row flex-col lg:w-[85%] md:w-[90%] w-full'>
        <button className='md:basis-[48%] basis-[90%] bg-bgcolor px-2 py-3 rounded text-[#fff]'>وارد کردن از فایل </button>
        <div className='md:basis-[48%] basis-[90%] bg-bgcolor px-2 py-1 rounded text-[#fff] md:mt-0 mt-4'>
        <Modal/>
        </div>
        {/* <button className='md:basis-[40%] basis-[90%] bg-bgcolor px-2 py-2 rounded text-[#fff] md:mt-0 mt-4'>ثبت آدرس جدید</button> */}
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
      {isLoading ? 
        <div className=" mt-[50px] w-full lg:w-[75%] min-h-[200px]">
          <Image
            className="mx-auto"
            src="/loadgetfetch.svg"
            width={110}
            height={110}
            alt="لوگو"
            priority
          />
        </div>:
        
        <table className=" mt-[25px] lg:w-[85%] sm:w-[90%] w-full">
          <thead>
            <tr className="bg-dashboard ">
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right pl-4 pr-2 py-2">
                شناسه
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right pl-4 pr-2 py-2">
                عنوان کسب و کار
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                نام و نام خانوادگی 
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                شماره همراه
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                شهر 
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                محله
              </th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-4 py-2">
                آدرس 
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data?.results?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-[#fff]  h-[60px] rounded border-b-[18px] border-solid border-dashboard hover:bg-slate-200 cursor-pointer"
                >
                  <td className="text-right pl-4 py-4 text-[14px] pr-2">
                    {item.id+140000}
                  </td>
                  <td className="text-right pl-4 py-4 text-[14px] pr-2">
                    {item.title}
                  </td>
                  <td className="text-right px-4 py-4 text-[14px]"> {item.name}</td>
                  <td className="text-right px-4 py-4 text-[14px]"> {item.phone}</td>
                  <td className="text-right px-4 py-4 text-[14px]">
                      {item.city.name}
                    </td>
                    <td className="text-right px-4 py-4 text-[14px]">
                      {item.district.name}
                    </td>
                  <td className="text-right px-4 py-4 text-[14px]"> {`${item.address},پلاک ${item.plaque}, واحد ${item.unity}`}</td>
                  <td className="text-right px-4 py-4 text-[14px]">
                  <Modaledit datainput={item} />
                  </td>
                  {/* <td className="text-right px-4 py-4 text-[14px]"><Modal datainput={item}/> </td> */}
                  <td className="text-right  py-4 text-[14px]"><MdDelete
                      className="text-[25px] cursor-pointer text-bgcolor"
                      onClick={()=>deletaddress1(item.id)}
                    /> </td>
                     <td className="text-right px-4  py-4 text-[14px]">
                     <Tooltip showArrow={true}  content="افزودن آدرس">
                    <button onClick={()=>{
                              
                              if(item.city.id==dataorder.id.idcity_resiver){
                                dispatch(MethodReceiverName(item.name));
                              dispatch(MethodReceiverAddress(item.address));
                              dispatch(MethodReceiverAddress_details("پلاک**"+item.plaque));
                              dispatch(Iddistrict_resiver(item.district.id))
                              dispatch(MethodReceiverAddress_details("واحد**"+item.unity));
                              dispatch(MethodReceiverMobile(item.phone));
                                if (MethodFlagHandler(dataorder)) {
                                  router.push("/order/address");
                                  toast.success('با موفقیت افزوده شد', {
                                    position: "top-center"
                                  })
                                }
    
                              }else{
                                toast.error("شهر مقصد تطابقت ندارد")
                              }
                            }} className="text-bgcolor text-[22px] cursor-pointer mt-[8px]">
                              <FaPlusSquare />
                            </button>
                            </Tooltip>
                    </td>
                </tr>
              );
            })}
            {x.map((item,index)=>{
             return <tr
              key={index}
              className="bg-[#fff]  h-[60px] rounded border-b-[18px] border-solid border-dashboard hover:bg-slate-200 cursor-pointer"
            >
              <td className="text-right pl-4 py-6 text-[14px] pr-2"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
              <td className="text-right px-4 py-6 text-[14px]"></td>
            </tr>
            })}
          </tbody>
        </table>
        }
        <div className="flex mt-[20px] justify-center items-center lg:w-[70%] md:w-[70%] sm:w-[80%] w-full">
          <div className="text-[12px] mt-[15px]">
            <span className="px-2">صفحه</span>
            <select className="bg-[#fff] px-2 rounded outline-none">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="px-2">از</span>
            <span>1</span>
            <span className="text-center py-1 px-2 bg-[#fff] mr-8 rounded">
              {" "}
              10 ردیف
            </span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default index
