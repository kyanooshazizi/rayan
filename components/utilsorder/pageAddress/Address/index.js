"use client"; 
import { useDispatch, useSelector } from "react-redux";
import {
  MethodSenderName,
  MethodSenderAddress,
  MethodSenderMobile,
  MethodReceiverName,
  MethodReceiverAddress,
  MethodReceiverMobile,
  MethodAdditional_details,
  MethodSenderAddress_details,
  MethodReceiverAddress_details
} from "@/components/Redux/orderslice";
import { useRouter } from "next/navigation";
import Link from 'next/link';
const index = () => {
  const router=useRouter();
  const dispatch = useDispatch();
  const dataAddress = useSelector((state) => state.order.address);

  return (
    <>
      <section className="col-start-1 col-end-6 mt-[70px] ">
        <div className="flex flex-wrap">
          {/* مشخصات فرستنده */}
          <div className="w-[35%] bg-white mt-4 py-4 rounded-md mx-14">
            <span className="text-center mx-auto block text-xl font-bold">
              مشخصات فرستنده
            </span>
            <form action="" className="mt-4">
              <div className="mr-4">
                <label htmlFor="Fullname">نام و نام خانوادگی</label>
                <input
                  value={dataAddress.SenderName}
                  placeholder="علی کریمی"
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderName(event.target.value));
                  }}
                />
              </div>
              <div className="mr-4 mt-4">
                <label htmlFor="Fullname">آدرس فرستنده <span className="text-[red] mr-2">(لطفا آدرس را با جزئیات وارد کنید)</span></label>
                <input
                  value={dataAddress.SenderAddress}
                  placeholder="تهران،بلوار بریانک غربی،کوچه نیکفر،کوچه اسلامی"
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderAddress(event.target.value));
                  }}
                />
              </div>
              {/* پلاک ،واحد و طبقه */}
              <div className="mr-4 mt-4 flex justify-around">
                <div>
                <label htmlFor="Fullname">پلاک</label>
                <input
                  value={dataAddress.Senderpelak}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderAddress_details("پلاک**"+event.target.value));
                  }}
                />
                </div>
                <div>
                <label htmlFor="Fullname">طبقه</label>
                <input
                  value={dataAddress.Sendertabaghe}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderAddress_details("طبقه**"+event.target.value));
                  }}
                />
                </div>
                <div>
                <label htmlFor="Fullname">واحد</label>
                <input
                  value={dataAddress.Sendervahed}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderAddress_details("واحد**"+event.target.value));
                  }}
                />
                </div>
              </div>
  {/* پلاک ،واحد و طبقه */}
              <div className="mr-4 my-4">
                <label htmlFor="Fullname">شماره تلفن</label>
                <input
                  value={dataAddress.SenderMobile}
                  type="number"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodSenderMobile(event.target.value));
                  }}
                />
              </div>
              <Link href="/dashboard/Addres?type=sender" className="bg-utils-300 text-txcolor px-2 py-3 rounded w-[87%] mr-4 block text-center">افزودن از دفترچه آردس</Link>
             
            </form>
          </div>
          {/* مشخصات گیرنده */}
          <div className="w-[35%] bg-white rounded-md mt-4 py-4">
            <span className="text-center mx-auto block text-xl font-bold">
              مشخصات گیرنده
            </span>
            <form action="" className="mt-4">
              <div className="mr-4">
                <label htmlFor="Fullname">نام و نام خانوادگی</label>
                <input
                  value={dataAddress.ReceiverName}
                  onChange={(event) => {
                    dispatch(MethodReceiverName(event.target.value));
                  }}
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  placeholder="کیانوش عزیزی"
                />
              </div>
              <div className="mr-4 mt-4">
                <label htmlFor="Fullname">آدرس گیرنده<span className="text-[red] mr-2">(لطفا آدرس را با جزئیات وارد کنید)</span></label>
                <input
                value={dataAddress.ReceiverAddress}
                onChange={(event) => {
                  dispatch(MethodReceiverAddress(event.target.value));
                }}
                  placeholder="تهران،بلوار بریانک غربی،کوچه صالح آبادی"
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                />
              </div>
               {/* پلاک ،واحد و طبقه */}
               <div className="mr-4 mt-4 flex justify-around">
                <div>
                <label htmlFor="Fullname">پلاک</label>
                <input
                  value={dataAddress.Receiverpelak}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodReceiverAddress_details("پلاک**"+event.target.value));
                  }}
                />
                </div>
                <div>
                <label htmlFor="Fullname">طبقه</label>
                <input
                  value={dataAddress.Receivertabaghe}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodReceiverAddress_details("طبقه**"+event.target.value));
                  }}
                />
                </div>
                <div>
                <label htmlFor="Fullname">واحد</label>
                <input
                  value={dataAddress.Receivervahed}
                  type="text"
                  name=""
                  id=""
                  className="bg-[#F4F3F3] block rounded  px-2 py-2 w-[40%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                  onChange={(event) => {
                    dispatch(MethodReceiverAddress_details("واحد**"+event.target.value));
                  }}
                />
                </div>
              </div>
  {/* پلاک ،واحد و طبقه */}
              <div className="mr-4 my-4">
                <label htmlFor="Fullname">شماره تلفن</label>
                <input
                value={dataAddress.ReceiverMobile}
                onChange={(event) => {
                  dispatch(MethodReceiverMobile(event.target.value));
                }}
                  type="number"
                  name="Fullname"
                  id="Fullname"
                  className="bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200"
                />
              </div>
            </form>
            <Link href="/dashboard/Addres?type=resiver" className="bg-utils-300 text-txcolor px-2 py-3 rounded w-[87%] mr-4 block text-center">افزودن از دفترچه آردس</Link>
          </div>
        </div>
        <div className="my-6 mr-10 w-1/2">
        </div>
        <div className="mr-[16%] mt-6 w-1/2 bg-txcolor pt-14 pb-6 relative rounded-lg">
          <span className="absolute top-[24px] right-[63px] font-bold">
            توضیحات اضافی
          </span>
          <textarea
           value={dataAddress.Additional_details}
           onChange={(event) => {
             dispatch(MethodAdditional_details(event.target.value));
           }}
            rows="4"
            className="w-5/6 mx-auto block outline-none  border-1 border-solid border-gray-200 rounded-md p-3 bg-[#F4F3F3]"
          ></textarea>
        </div>
      </section>
    </>
  );
};

export default index;
