"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
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
  Iddistrict_sender,
  Iddistrict_resiver,
} from "@/components/Redux/orderslice";
import { useRouter } from "next/navigation";
import { useThemeContext } from "../../../context/store";
import usecity_servise from "@/components/TanstakQury/useCity_servise";
import Modal from "react-modal";
import { useQuery} from "react-query";
import { getCookie } from "cookies-next";
import { IoClose } from "react-icons/io5";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'#283764',
  },
};
const index = () => {
  const { data, isLoading } = useQuery("allbesiness", () => {
    return fetch("https://mohaddesepkz.pythonanywhere.com/business/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    }).then((res) => res.json());
  });
  const { datacity, dataservise } = usecity_servise();
  const {userdata,modalIsOpen,setModalIsOpen,idBessiness, setIdBessiness} = useThemeContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const dataAddress = useSelector((state) => state.order.address);
  const dataorder = useSelector((state) => state.order.order);
  const district_sender = datacity
    ? datacity.results.filter((item) => item.id === dataorder.id.idcity_sender)
    : [{ district: [] }];
  const district_resiver = datacity
    ? datacity.results.filter((item) => item.id === dataorder.id.idcity_resiver)
    : [{ district: [] }];

  return (
    <>
      <section className=" mt-[70px] xl:mr-[2%] lg:mr-[3%]  mx-auto">
        <Modal isOpen={modalIsOpen} style={customStyles}>
        <IoClose className="text-[#fff] cursor-pointer mb-3 text-[20px]" onClick={()=> setModalIsOpen(false)}/>
          <div className="text-[16px] text-[#fff] px-2 py-3">سفارش شما مربوط به کدام یک از کسب و کارهایتان است؟</div>
          {data?.results?.map((item,index)=>{
            return(
              <div className="text-14px px-2 my-4 py-1 text-[#fff] cursor-pointer" onClick={()=>{
                setIdBessiness(item.id)
                setModalIsOpen(false)}}>{index+1} - <span className="bg-slate-400 px-6 py-1 rounded-sm text-center">{item.name}</span></div>
            )
          })}
        </Modal>
        <div className="text-[18px] font-[600] pr-[10%] mt-[100px] mb-[20px] ">
          اطلاعات فرستنده و گیرنده
        </div>
        <div className="flex flex-col justify-center">
          {/* شروع:مشخصات فرستنده */}
          <form className="bg-[#fff] lg:w-[80%] w-full min-h-[300px] mx-auto rounded-[5px] px-4 py-2 mt-[20px]">
            <div className="text-colorgray pr-[1%] pt-1">آدرس مبدا</div>
            <div className="flex flex-wrap justify-around text-colorgray mb-1">
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  نام و نام خانوادگی
                </label>
                <input
                  value={dataAddress.SenderName}
                  placeholder=""
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  onChange={(event) => {
                    dispatch(MethodSenderName(event.target.value));
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  شماره همراه
                </label>
                <input
                  value={dataAddress.SenderMobile}
                  type="number"
                  name="tel"
                  id="tel"
                  onChange={(event) => {
                    dispatch(MethodSenderMobile(event.target.value));
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              {/* <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  استان
                </label>
                <select  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-[5px] focus:border-colorgreen" onChange={(e)=>{dispatch(Idcity_sender(e.target.value))}}>
                  {datacity?.results.map((item,index)=>{
                   return <option key={index} value={item.name}>{item.name}</option>
                  })}
                </select>
              </div>
              <div className="basis-[48%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  شهر
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div> */}
              <div className="basis-[30%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  محله
                </label>
                <select
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  onClick={(event) => {
                    const item1 = district_sender[0]?.district.find(
                      (item) => item.name == event.target.value
                    );

                    return dispatch(Iddistrict_sender(item1.id));
                  }}
                >
                  {district_sender[0]?.district.map((item, index) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="basis-[66%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  آدرس
                </label>
                <input
                  value={dataAddress.SenderAddress}
                  placeholder="لطفا خیابان اصلی یا فرعی و کوچه را با دقت وارد کنید"
                  type="text"
                  name="address"
                  id="address"
                  onChange={(event) => {
                    dispatch(MethodSenderAddress(event.target.value));
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%]">
                <label htmlFor="">پلاک</label>
                <input
                  value={dataAddress.Senderpelak}
                  type="number"
                  name="pelak"
                  id="pelak"
                  onChange={(event) => {
                    dispatch(
                      MethodSenderAddress_details("پلاک**" + event.target.value)
                    );
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%]">
                <label htmlFor="">واحد</label>
                <input
                  value={dataAddress.Sendervahed}
                  type="number"
                  name="vahed"
                  id="vahed"
                  onChange={(event) => {
                    dispatch(
                      MethodSenderAddress_details("واحد**" + event.target.value)
                    );
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
            </div>
          </form>
          {/* پایان:مشخصات فرستنده */}

          {/* شروع:مشخصات گیرنده */}
          <form className="bg-[#fff] lg:w-[80%] w-full min-h-[300px] mx-auto rounded-[5px] px-4 py-2 mt-[20px]">
            <div className="text-colorgray pr-[1%] pt-1">آدرس مقصد</div>
            <div className="flex flex-wrap justify-around text-colorgray mb-1">
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  نام و نام خانوادگی
                </label>
                <input
                  value={dataAddress.ReceiverName}
                  onChange={(event) => {
                    dispatch(MethodReceiverName(event.target.value));
                  }}
                  type="text"
                  name="Fullname"
                  id="Fullname"
                  placeholder="کیانوش عزیزی"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%] flex flex-col mt-2 mb-1">
                <label className="text-[14px]" htmlFor="">
                  شماره همراه
                </label>
                <input
                  value={dataAddress.ReceiverMobile}
                  onChange={(event) => {
                    dispatch(MethodReceiverMobile(event.target.value));
                  }}
                  type="number"
                  name="Fullname"
                  id="Fullname"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              {/* <div className="basis-[48%] flex flex-col my-1">
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
              </div> */}
              <div className="basis-[30%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  محله
                </label>
                <select
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  onClick={(event) => {
                    const item1 = district_resiver[0]?.district.find(
                      (item) => item.name == event.target.value
                    );

                    return dispatch(Iddistrict_resiver(item1.id));
                  }}
                >
                  {district_resiver[0]?.district.map((item, index) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="basis-[66%] flex flex-col my-1">
                <label className="text-[14px]" htmlFor="">
                  آدرس
                </label>
                <input
                  type="text"
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                  value={dataAddress.ReceiverAddress}
                  onChange={(event) => {
                    dispatch(MethodReceiverAddress(event.target.value));
                  }}
                  placeholder="لطفا خیابان اصلی یا فرعی و کوچه را با دقت وارد کنید"
                  name="Fullname"
                  id="Fullname"
                />
              </div>
              <div className="basis-[48%]">
                <label htmlFor="">پلاک</label>
                <input
                  value={dataAddress.Receiverpelak}
                  type="number"
                  name="pelak"
                  id="pelak"
                  onChange={(event) => {
                    dispatch(
                      MethodReceiverAddress_details(
                        "پلاک**" + event.target.value
                      )
                    );
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
              </div>
              <div className="basis-[48%]">
                <label htmlFor="">واحد</label>
                <input
                  value={dataAddress.Receivervahed}
                  type="number"
                  name="vahed"
                  id="vahed"
                  onChange={(event) => {
                    dispatch(
                      MethodReceiverAddress_details(
                        "واحد**" + event.target.value
                      )
                    );
                  }}
                  className="w-full outline-none rounded-[5px] text-[14px] bg-dashboard border-2 border-solid px-2 py-2 focus:border-colorgreen"
                />
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
              <Link
                href="/order/requst"
                className="bg-[#7C85A0] text-[#fff]  w-full text-center rounded-[5px] px-4 py-[12px] inline-block"
              >
                بازگشت
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
