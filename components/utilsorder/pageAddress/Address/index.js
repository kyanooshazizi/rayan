"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  MethodSenderName,
  MethodSenderAddress,
  MethodSenderMobile,
  MethodReceiverName,
  MethodReceiverAddress,
  MethodReceiverMobile,
  MethodAdditional_details,
  MethodSenderAddress_details,
  MethodReceiverAddress_details,
} from "@/components/Redux/orderslice";
import { useRouter } from "next/navigation";
import Link from "next/link";
const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const dataAddress = useSelector((state) => state.order.address);

  return (
    <>
      <section className=" mt-[70px] xl:mr-[2%] lg:mr-[3%]  mx-auto">
        <div className="text-[18px] font-[600] pr-[10%] mt-[100px] mb-[20px] ">
          اطلاعات فرستنده و گیرنده
        </div>
        <div className="flex flex-col justify-center">
          {/* شروع:مشخصات فرستنده */}
          <form className="bg-[#fff] lg:w-[80%] w-full min-h-[340px] mx-auto rounded-[5px] px-4 py-2">
            <div className="text-colorgray pr-[1%] pt-1">آدرس مبدا</div>
            <div className="flex flex-wrap justify-around text-colorgray mb-1">
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="Fullname">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  value={dataAddress.SenderName}
                  placeholder="علی کریمی"
                  name="Fullname"
                  id="Fullname"
                  onChange={(event) => {
                    dispatch(MethodSenderName(event.target.value));
                  }}
                />
              </div>
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="phone">
                  شماره همراه
                </label>
                <input
                  type="number"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  value={dataAddress.SenderMobile}
                  name="phone"
                  id="Fullname"
                  onChange={(event) => {
                    dispatch(MethodSenderMobile(event.target.value));
                  }}
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  استان
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  شهر
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  منطقه
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  خیابان
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="flex my-1 justify-between basis-full px-2">
                <div className="basis-[23%]">
                  <label htmlFor="">کوچه</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="vahed">واحد</label>
                  <input
                    type="number"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                    value={dataAddress.Sendervahed}
                    name="vahed"
                    id="vahed"
                    onChange={(event) => {
                      dispatch(
                        MethodSenderAddress_details(
                          "واحد**" + event.target.value
                        )
                      );
                    }}
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="plack">پلاک</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                    value={dataAddress.Senderpelak}
                    name="plack"
                    id="plack"
                    onChange={(event) => {
                      dispatch(
                        MethodSenderAddress_details(
                          "پلاک**" + event.target.value
                        )
                      );
                    }}
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="">کد پستی</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
              </div>
            </div>
          </form>
          {/* پایان:مشخصات فرستنده */}

          {/* شروع:مشخصات گیرنده */}
          <form className="bg-[#fff] lg:w-[80%] w-full min-h-[340px] mx-auto rounded-[5px] px-4 py-2 mt-[20px]">
            <div className="text-colorgray pr-[1%] pt-1">آدرس مقصد</div>
            <div className="flex flex-wrap justify-around text-colorgray mb-1">
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  شماره همراه
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  استان
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  شهر
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  منطقه
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  خیابان
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="flex my-1 justify-between basis-full px-2">
                <div className="basis-[23%]">
                  <label htmlFor="">کوچه</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="">واحد</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="">پلاک</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
                <div className="basis-[23%]">
                  <label htmlFor="">کد پستی</label>
                  <input
                    type="text"
                    className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  />
                </div>
              </div>
            </div>
          </form>
          {/* پایان:مشخصات گیرنده */}
          {/* شروع:توضیحات */}
          <div className="bg-[#fff] lg:w-[80%] w-full min-h-[80px] mx-auto rounded-[5px] px-4 py-2 my-[20px]">
            <div className="text-colorgray">توضیحات</div>
            <textarea
              value={dataAddress.Additional_details}
              onChange={(event) => {
                dispatch(MethodAdditional_details(event.target.value));
              }}
              rows="2"
              className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
            ></textarea>
          </div>
          {/* پایان:توضیحات */}
          <div className="flex justify-between mb-[20px] lg:w-[80%] w-full mx-auto">
            <div className="basis-[46%] pr-[8%] md:block hidden">
              <Image
                src="/order/address.svg"
                width={300}
                height={300}
                alt="Picture of the author"
              />
            </div>

            <div className="basis-[46%]">
            <button className="bg-[#7C85A0] text-[#fff]  w-full text-center rounded-[5px] px-4 py-[12px] ">
              بازگشت
            </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
