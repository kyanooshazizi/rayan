"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LuUser2 } from "react-icons/lu";
import { PiPhoneCall } from "react-icons/pi";
import { MdOutlineAddLocation } from "react-icons/md";
import Link from "next/link";
import { getCookie } from 'cookies-next';
const index = () => {
  const [render,setRender]=useState(true)
  const dataAddress = useSelector((state) => state.order.address);
  const dataOrder = useSelector((state) => state.order.order);
  console.log(dataAddress, dataOrder);
  const size_order=dataOrder.id.size.filter((item)=>item!=="");
  const count_order=dataOrder.id.count.filter((item)=>item!==0);
  // console.log(size_order,count_order)
  useEffect(()=>{
    if(render){
      size_order.map((item,index)=>{
        fetch(("https://mohaddesepkz.pythonanywhere.com/orders/new/"),{
          method: 'POST',
          body: JSON.stringify({
            count: count_order[index],
            size: size_order[index],
            package: dataOrder.id.package,
            content: dataOrder.id.content,
            service: dataOrder.id.service,
            value: dataOrder.id.value,
            delivery_date: "2023-01-03",
            // delivery_date: dataOrder.pickup_date,
            sender_address: dataAddress.SenderAddress,
            sender_plaque: dataAddress.Senderpelak,
            sender_stage: dataAddress.Sendertabaghe,
            sender_unity: dataAddress.Sendervahed,
            sender_name: dataAddress.SenderName,
            sender_phone: dataAddress.SenderMobile,
            receiver_address: dataAddress.ReceiverAddress,
            receiver_plaque: dataAddress.Receiverpelak,
            receiver_stage: dataAddress.Receivertabaghe,
            receiver_unity: dataAddress.Receivervahed,
            receiver_name: dataAddress.ReceiverName,
            receiver_phone: dataAddress.ReceiverMobile ,
            description:dataAddress.Additional_details 
          }),
          headers: {
            Authorization:`Bearer ${getCookie('access_token')}`,
            'Content-type': 'application/json',
          },
        }
      
        ).then(res=>res.json()).then(res=>console.log("aa",res)).catch(err=>console.error(err))      
      })
      console.log("salam")
      setRender(false)
    }
  } , [])
  return (
    <>
      <div className="flex mt-[120px] justify-center flex-wrap">
        <div className="w-1/5 h-[300px] bg-txcolor rounded-tr-lg">
          <span className="text-center block bg-bgcolor text-txcolor px-1 py-1 rounded-tr-lg font-bold">
            مشخصات فرستنده
          </span>
          <div className="mt-2 mr-3">
            <div className="my-3">
              <LuUser2 className="inline-block ml-2" />
              <span className="font-bold">نام و نام خانوادگی:</span>
              <p className="mr-6 p-1">کیانوش عزیزی</p>
            </div>
            <div className="my-3">
              <PiPhoneCall className="inline-block ml-2" />
              <span className="font-bold">تلفن:</span>
              <p className="mr-6 p-1">09376445798</p>
            </div>
            <div className="my-3">
              <MdOutlineAddLocation className="inline-block ml-2" />
              <span className="font-bold">آدرس:</span>
              <p className="mr-6 p-1">بریانک،کوچه صالح آبادی،پلاک1،واحد1</p>
            </div>
          </div>
        </div>

        {/* start:details order */}
  
          <div className=" h-[300px] bg-txcolor w-2/5 border-x-1 border-x-solid border-gray-300">
            <span className="text-center block bg-bgcolor text-txcolor px-1 py-1 text-font">
              جزئیات سفارش
            </span>
         
          <div className="flex justify-around mt-4">
              <div className="flex">
                <div className="font-bold">مرسوله های ارسالی:</div>
                <div className="mr-2">
                  <div>2 عدد بسته بزرگ</div>
                  <div>3 عدد بسته کوچک</div>
                  <div>1 عدد بسته متوسط</div>
                </div>
              </div>
              <div>
                <div >
                <span className="font-bold">زمان ثبت سفارش:</span>
                <span className="p-2">1402/05/24-12:00</span>
                </div>
                <div className="my-2">
                <span className="font-bold">زمان جمع آوری:</span>
                <span className="p-2">1402/05/25-12:00تا 17:00</span>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-10">
              <div>
                <span className="font-bold">نوع سرویس:</span>
                <span className="p-2">فوری برون شهری</span>
              </div>
              <div>
                <span className="font-bold p-2">محتوا مرسوله:</span>
                <span>کالای عمومی</span>
              </div>
            </div>
            <div  className="text-center mt-10">
                <span className="font-bold">هزینه ارسال:</span>
                <span className="p-2">35000 تومان</span>
              </div>
          </div>
       
        {/* end:details order */}

        <div className="w-1/5 h-[300px] bg-txcolor rounded-tl-lg">
          <span className="text-center block bg-bgcolor text-txcolor px-1 py-1 rounded-tl-lg font-bold">
            مشخصات گیرنده
          </span>
          <div className="mt-2 mr-3">
            <div className="my-3">
              <LuUser2 className="inline-block ml-2" />
              <span className="font-bold">نام و نام خانوادگی:</span>
              <p className="mr-6 p-1">کیانوش عزیزی</p>
            </div>
            <div className="my-3">
              <PiPhoneCall className="inline-block ml-2" />
              <span className="font-bold">تلفن:</span>
              <p className="mr-6 p-1">09376445798</p>
            </div>
            <div className="my-3">
              <MdOutlineAddLocation className="inline-block ml-2" />
              <span className="font-bold">آدرس:</span>
              <p className="mr-6 p-1">بریانک،کوچه صالح آبادی،پلاک1،واحد1</p>
            </div>
          </div>
        </div>
      </div>
      {/* start:butten */}
      <Link
        href="/dashboard/Profile"
        className="text-[blue] mx-auto text-center block mt-10"
      >
        لطفا پروفایل کاربری خود را تکمیل کنید(کلیک کنید)
      </Link>
      <div className=" flex justify-around mt-6 w-1/5 mx-auto">
        <button className="bg-bgcolor px-3 py-3 text-txcolor rounded hover:bg-txcolor hover:text-bgcolor transition-all transition-500 ease-linear border-bgcolor border-1 border-solid">
          ویرایش سفارش
        </button>
        <button className="bg-[green] px-3 py-3 text-txcolor rounded hover:bg-txcolor hover:text-[green] transition-all transition-500 ease-linear border-[green] border-1 border-solid">
          تایید و پرداخت
        </button>
      </div>
      {/* end:butten */}
    </>
  );
};

export default index;
