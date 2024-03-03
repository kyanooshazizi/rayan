"use client";
import React from "react";
import Link from "next/link";
import useorderReviow from "../../TanstakQury/orderReviow";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
const index = () => {
 const {orderReviw:data,error_orderReviw,isloadorderReviw}=useorderReviow()
  const hours = data ? data?.results[0].updated_at.split(" ") : [];
  console.log(hours);
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
    <>
      <section className=" mt-[70px]  mx-auto text-colorgray">
        <div className="text-[18px] font-[600] mt-[100px] mb-[20px] text-[#000]">
          بازبینی و تایید سفارش
        </div>
        {/* شروع:مشخصات فرستنده */}
        <div className="bg-[#fff] w-full p-[15px]">
          <div className="text-colorgray text-[16px] pr-[5px]">
            مشخصات فرستنده
          </div>
          <div className="flex justify-around mt-[20px]">
            <div className="basis-[48%]">
              <span className="text-colorgray">نام و نام خانوادگی</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.sender_name}
              </div>
            </div>
            <div className="basis-[48%]">
              <span className="text-colorgray">شماره همراه</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.sender_phone}
              </div>
            </div>
          </div>
          <div className="w-[98%] mx-auto mt-[10px] flex items-center lg:flex-row flex-col ">
            {/* <div className="lg:basis-[12%] basis-[33%] ml-[1px]">
              <span className="text-colorgray">استان</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {``}
              </div>
            </div> */}
            <div className="lg:basis-[20%] basis-[33%] mx-[2px]">
              <span className="text-colorgray">شهر</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.sender_city.name}`}
              </div>
            </div>
            <div className="lg:basis-[20%] basis-[33%] mx-[2px]">
              <span className="text-colorgray">محله</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.sender_district.name}`}
              </div>
            </div>
            <div className="lg:basis-[40%] basis-[99%] mx-[2px]">
              <span className="text-colorgray">آدرس</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.sender_address}`}
              </div>
            </div>
            <div className="lg:basis-[20%] basis-[50%] mr-[2px]">
              <span className="text-colorgray">پلاک، واحد</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`پلاک ${data?.results[0]?.sender_plaque} , واحد ${data?.results[0]?.sender_unity}`}
              </div>
            </div>
          </div>
        </div>
        {/* پایان:مشخصات فرستنده */}
        {/* شروع:مشخصات گیرنده */}
        <div className="bg-[#fff] w-full p-[15px] mt-[15px]">
          <div className="text-colorgray text-[16px] pr-[5px]">
            مشخصات گیرنده
          </div>
          <div className="flex justify-around mt-[20px]">
            <div className="basis-[48%]">
              <span className="text-colorgray">نام و نام خانوادگی</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.receiver_name}
              </div>
            </div>
            <div className="basis-[48%]">
              <span className="text-colorgray">شماره همراه</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.receiver_phone}
              </div>
            </div>
          </div>
          <div className="w-[98%] mx-auto mt-[10px] flex items-center lg:flex-row flex-col ">
            {/* <div className="lg:basis-[12%] basis-[33%] ml-[1px]">
              <span className="text-colorgray">استان</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {``}
              </div>
            </div> */}
            <div className="lg:basis-[20%] basis-[33%] mx-[2px]">
              <span className="text-colorgray">شهر</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.receiver_city.name}`}
              </div>
            </div>
            <div className="lg:basis-[20%] basis-[33%] mx-[2px]">
              <span className="text-colorgray">محله</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.receiver_district.name}`}
              </div>
            </div>
            <div className="lg:basis-[40%] basis-[99%] mx-[2px]">
              <span className="text-colorgray">آدرس</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`${data?.results[0]?.receiver_address}`}
              </div>
            </div>
            <div className="lg:basis-[20%] basis-[50%] mr-[2px]">
              <span className="text-colorgray">پلاک، واحد</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
                {`پلاک ${data?.results[0]?.receiver_plaque} , واحد ${data?.results[0]?.receiver_unity}`}
              </div>
            </div>
          </div>
        </div>
        {/* پایان:مشخصات گیرنده */}
        {/* شروع: خلاصه سفارش */}
        <div className="bg-[#fff] w-full p-[15px] mt-[15px]">
          <div className="text-colorgray text-[16px] pr-[5px]">خلاصه سفارش</div>
          <div className="flex flex-col mt-[20px]">
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">مرسوله</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results.map((item, index) => {
                  return (
                    <span key={index}>
                      {item.count} <LiaTimesSolid className="inline-block" />
                      {item.package.title} {item.size.title}{" "}
                      <span
                        className={`px-1 ${
                          index + 1 == data.results.length ? "hidden" : ""
                        }`}
                      >
                        ،
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">زمان ثبت سفارش</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                <span>{hours.length ? hours[0] : ""}</span>
                <span className="px-2">ساعت</span>
                <span>{hours.length ? hours[1] : ""}</span>
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">زمان جمع آوری</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.pickup_date}
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">نوع سرویس</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.service.title}
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">هزینه</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                {data?.results[0]?.total_price.toLocaleString()} تومان
              </div>
            </div>
          </div>
        </div>
        {/* پایان: خلاصه سفارش */}
        {/* start:butten */}
        <div className="mt-[15px] flex justify-between mb-[25px]">
          <Link
            href={"/order/address"}
            className="text-center basis-[49%] bg-[#7C85A0] p-2 text-[#fff] rounded-[3px]"
          >
            ویرایش
          </Link>
          <Link
            href={"/order/payment"}
            className="text-center basis-[49%] bg-bgcolor p-2 text-[#fff] rounded-[3px]"
          >
            تایید و ادامه
          </Link>
        </div>
        {/* end:butten */}
        <div className=" lg:flex hidden justify-between mt-[45px] mx-auto mb-[30px]">
          <Image
            src="/order/preview.svg"
            width={400}
            height={200}
            alt="Picture of the author"
            className="mx-auto"
          />
        </div>
      </section>
    </>
  );
};

export default index;
