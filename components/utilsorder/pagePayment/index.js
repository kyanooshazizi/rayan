import React from "react";
import Image from "next/image";
const Payment = () => {
  return (
    <section className=" mt-[70px]  mx-auto">
      <div className="text-[18px] font-[600] mt-[100px] mb-[20px] ">
        تایید پرداخت
      </div>
      <div className="text-colorgray text-[16px]">سرویس ها</div>
      <div className="bg-white w-full mt-[10px] text-colorgray p-4">
        <span className="pr-[6px]">از طریق کیف پول</span>
        <div className="flex flex-wrap justify-around">
          <div className="flex justify-between px-4 items-center basis-[48%] bg-dashboard border-2 border-solid border-[#CDCDCD] h-[55px] mt-2 rounded-[3px]">
            <span className="text-[#CDCDCD]">250000تومان</span>
            <span className="text-[#CDCDCD]">+</span>
          </div>
          <div className="flex justify-between px-4 items-center basis-[48%] bg-dashboard border-2 border-solid border-[#CDCDCD] h-[55px] mt-2 rounded-[3px] text-black">
            <span>هزینه</span>
            <span>35000تومان</span>
          </div>
          <div className="px-4 py-[5px] basis-[48%] bg-dashboard border-2 border-solid border-[#CDCDCD] h-[55px] mt-2 rounded-[3px]">
            <span className="">
              آیا تمایل کمک به خیریه بچه های آسمان را دارید؟
            </span>
            <span className="text-[#69D085] text-[12px] block">
              معادل یک درصد از هزینه خرید شما به خیریه بچه های آسمان تعلق می
              گیرد
            </span>
          </div>
          <div className="basis-[48%] mt-2 rounded-[3px] bg-[#7C85A0] flex justify-center items-center">
            <div>
              <Image
                src="/order/aseman.svg"
                width={100}
                height={30}
                alt="Picture of the author"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full mt-[15px] text-colorgray p-4">
        <span className="pr-[6px]">از طریق درگاه بانکی</span>
        <div className="flex justify-around mt-[10px]">
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
          <button className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] rounded-[5px] py-[4px]">
            <Image
              src="/dargah/zarin.svg"
              width={80}
              height={30}
              alt="Picture of the author"
              className="mx-auto"
            />
          </button>
          <button className="basis-[22%] bg-dashboard border-2 border-solid border-[#CDCDCD] py-[1px] rounded-[5px]">
            <Image
              src="/dargah/asan.svg"
              width={45}
              height={30}
              alt="Picture of the author"
              className="mx-auto"
            />
          </button>
        </div>
      </div>
      <div className="bg-white w-full mt-[15px] text-colorgray p-4 flex flex-wrap justify-around text-[15px]">
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-2">
          <span>مجموع</span>
          <span>35000 تومان</span>
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-2">
          <span>مالیات بر ارزش افزوده</span>
          <span>0 تومان</span>
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] px-2 text-bgcolor">
          کد تخفیف
        </div>
        <div className="mt-[10px] rounded-[4px] py-[10px] bg-dashboard basis-[48%] border-2 border-solid border-[#CDCDCD] flex justify-between items-center px-2 text-[#000]">
          <span>مجموع قابل پرداخت</span>
          <span>35000تومان</span>
        </div>
      </div>
      <div className="text-[#fff] w-full my-[20px] bg-bgcolor py-[8px] flex flex-wrap justify-around text-[15px] rounded-[4px]">
        تایید و پرداخت
      </div>
    </section>
  );
};

export default Payment;
