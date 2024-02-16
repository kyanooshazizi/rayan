import React from "react";
import Image from "next/image";
const index = () => {
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
                کیانوش عزیزی
              </div>
            </div>
            <div className="basis-[48%]">
              <span className="text-colorgray">شماره همراه</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
          </div>
          <div className="w-[98%] mx-auto mt-[10px]">
            <span className="text-colorgray">آدرس</span>
            <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
              کیانوش عزیزی
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
                کیانوش عزیزی
              </div>
            </div>
            <div className="basis-[48%]">
              <span className="text-colorgray">شماره همراه</span>
              <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
          </div>
          <div className="w-[98%] mx-auto mt-[10px]">
            <span className="text-colorgray">آدرس</span>
            <div className="border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px] mb-2">
              کیانوش عزیزی
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
                کیانوش عزیزی
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">زمان ثبت سفارش</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">زمان جمع آوری</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">نوع سرویس</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
            <div className="flex w-full px-4 mb-3">
              <div className="basis-[20%] text-colorgray">هزینه</div>
              <div className="basis-[80%] border-2 border-solid border-[#CDCDCD] bg-dashboard rounded-[5px] px-2 py-2 text-[14px]">
                کیانوش عزیزی
              </div>
            </div>
          </div>
        </div>
        {/* پایان: خلاصه سفارش */}
        {/* start:butten */}
        <div className="mt-[15px] flex justify-between mb-[25px]">
          <button className="basis-[49%] bg-[#7C85A0] p-2 text-[#fff] rounded-[3px]">
            بازگشت
          </button>
          <button className="basis-[49%] bg-bgcolor p-2 text-[#fff] rounded-[3px]">
            تایید و ادامه
          </button>
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
