"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { setCookie, getCookie } from "cookies-next";
import { FaWallet } from "react-icons/fa";
import useorderReviow from "../../TanstakQury/orderReviow";
import { useThemeContext } from "../../context/store";
const Payment = () => {
  const {orderReviw,error_orderReviw,isloadorderReviw}=useorderReviow()
  const { userdata} = useThemeContext();
  console.log(orderReviw,userdata)

  if (isloadorderReviw) {
    return (
      <div className="flex justify-center align-middle min-h-screen w-full mr-[100px]">
        <Image
          src="/loadgetfetch.svg"
          width={100}
          height={100}
          alt="Picture of the author"
          priority
        />
      </div>
    );
  }
  return (
    <section className=" mt-[70px]  mx-auto">
      <div className="text-[18px] font-[600] mt-[100px] mb-[20px] ">
        تایید پرداخت
      </div>
      <div className="bg-white w-full mt-[15px] text-colorgray p-4 flex flex-wrap justify-around text-[15px]">
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-4">
          <span>مجموع</span>
          <span>{orderReviw?.results[0]?.price.toLocaleString()} تومان</span>
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-4">
          <span>مالیات بر ارزش افزوده</span>
          <span>{(orderReviw?.results[0]?.total_price - orderReviw?.results[0]?.price).toLocaleString()} تومان</span>
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] px-4 text-bgcolor">
          کد تخفیف
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-4 text-[#000]">
          <span>مجموع قابل پرداخت</span>
          <span>{orderReviw?.results[0]?.total_price.toLocaleString()} تومان  </span>
        </div>
        <div className="px-4 py-[5px] basis-[98%] bg-dashboard border-2 border-solid border-[#CDCDCD] h-[55px] mt-2 rounded-[3px] flex justify-between">
          <div>
            <span className="">
              آیا تمایل کمک به خیریه بچه های آسمان را دارید؟
            </span>
            <span className="text-[#69D085] text-[12px] block">
              معادل یک درصد از هزینه خرید شما به خیریه بچه های آسمان تعلق می
              گیرد
            </span>
          </div>
          <div>
            <Image
              src="/dargah/aseman.svg"
              width={30}
              height={20}
              alt="Picture of the author"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white w-full mt-[15px] text-colorgray p-4">
        <span className="pr-[6px]"> روش پرداخت</span>
        <div className="flex justify-around mt-[10px]">
          <button className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] py-[1px] rounded-[5px] flex justify-center items-center">
            <div className="my-1">
              <span className="text-[14px] text-black">کیف پول</span>
              <span className="block text-[14px]">100000 تومان</span>
            </div>
            <FaWallet className="text-[35px] text-[#FFCB05] mr-2" />
          </button>
          <button className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] flex justify-center items-center rounded-[5px] py-[6px]">
            <span className="text-black font-[600] px-2 "> بانک ملت</span>
            <Image
              src="/dargah/melat.svg"
              width={30}
              height={20}
              alt="Picture of the author"
              className=""
            />
          </button>
          <button className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] py-[4px] rounded-[5px]">
            <Image
              src="/dargah/saman.svg"
              width={100}
              height={30}
              alt="Picture of the author"
              className="mx-auto"
            />
          </button>
        
          <Link
            href={`https://mohaddesepkz.pythonanywhere.com/payment/request/order/?tracking_code=${orderReviw.results[0].tracking_code}&wallet=false&id=${userdata.user_id}`}
            className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] rounded-[5px] inline-block pt-[17px]"
          >
            <Image
              src="/dargah/zarin.svg"
              width={80}
              height={30}
              alt="Picture of the author"
              className="mx-auto"
            />
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/order/OrderReview"
          className="text-[#fff] block text-center w-[25%] mt-[20px] bg-[#7C85A0] py-[10px] text-[15px] rounded-[4px] "
        >
          بازگشت
        </Link>
      </div>
    </section>
  );
};

export default Payment;



// https://mohaddesepkz.pythonanywhere.com/payment/request/order/?tracking_code=NX057123737MC&wallet=false&id=${userdata.user_id}