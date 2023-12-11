"use client";
import React ,{useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { AiFillBackward } from "react-icons/ai";
import { AiOutlineForward } from "react-icons/ai";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { MethodDeletOrder } from "../../Redux/orderslice";
import { usePathname, useSearchParams } from 'next/navigation'
const Sidbar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const router=useRouter();
  const datastore = useSelector((state) => state.order.order);
 console.log(typeof datastore.Insurance.Product_value)
  const [urldata,setUrldata]=useState("");
  useEffect(() => {
    const url = `${pathname}`;
    setUrldata(()=>{
      if(url.split("/")[2]){
        return url.split("/")[2]
      }else{
        return null;
      }
    })
    // console.log(url)
    // You can now use the current URL
    // ...
  }, [pathname])
   // شروع:مدیریت نوع مرسوله
  const MethodFlagHandler=(serveisName)=>{
          switch(serveisName){
             case "بسته":
               return(
                 datastore.pick_up &&
                 datastore.delivery &&
                 (datastore.package.packB.number ||
                   datastore.package.packM.number ||
                   datastore.package.packS.number ||
                   datastore.document.number) &&
                 datastore.Price &&
                 datastore.pickup_date &&
                 datastore.Insurance.Product_value &&
                 datastore.Insurance.Product_content
               )
             case "پاکت":
              return(
                datastore.pick_up &&
                datastore.delivery &&
                datastore.document.number&&
                datastore.Price &&
                datastore.pickup_date &&
                datastore.Insurance.Product_value  
              )  

          }
          return null
  }
  const ServiceNameHandler = (serveisName) => {
    switch (serveisName) {
      case "بسته":
        return [
          datastore.package.packB.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته بزرگ:</span>
              <span> {datastore.package.packB.number} عدد</span>
            </div>
          ) : (
            ""
          ),
          datastore.package.packM.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته متوسط:</span>
              <span> {datastore.package.packM.number} عدد</span>
            </div>
          ) : (
            ""
          ),
          datastore.package.packS.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد بسته کوچک:</span>
              <span> {datastore.package.packS.number} عدد</span>
            </div>
          ) : (
            ""
          ),
        ];
      case "پاکت":
        return [
          datastore.document.number ? (
            <div className="flex items-center justify-around">
              <span>تعداد پاکت انتخاب شده:</span>
              <span> {datastore.document.number} عدد</span>
            </div>
          ) : (
            ""
          ),
        ];
    }
    return null;
  };
const ContentHandler=(servisName)=>{
switch(servisName){
    case "بسته":
      return(
        datastore.Insurance.Product_value ? (
          <div className=" border-b-2 border-b-lime-500 p-2 text-txcolor">
            <p className="text-lg mb-3">نوع مرسوله:</p>
            <div className="flex justify-between">
              <span>{datastore.Insurance.Product_content}</span>
              <span className="text-sm px-2">با ارزش تقریبی</span>
              <span>{(datastore.Insurance.Product_value)}</span>
            </div>
          </div>
        ) : (
          ""
        )
      ) 
     case "پاکت":
      return(
        datastore.Insurance.Product_value ? (
          <div className=" border-b-2 border-b-lime-500 p-2 text-txcolor">
            <p className="text-lg mb-3">نوع مرسوله:</p>
            <div className="flex justify-between">
              <span>پاکت</span>
              <span className="text-sm px-2">با ارزش </span>
              <span>{(datastore.Insurance.Product_value)}</span>
            </div>
          </div>
        ) : (
          ""
        )
      ) 
}
return null;
}
  return (
    <>
      <aside className="bg-bgcolor p-2 fixed top-[60px] left-0 col-span-1 h-[calc(100vh_-_60px)] w-1/4">
        {/* شروع:عنوان */}
        <div className="text-txcolor text-center">
          <h3 className="text-center shadow-sm bg-white text-bgcolor mb-3 w-[200px] py-2 rounded font-bold mx-auto !important">
            خلاصه سفارش
          </h3>
          {datastore.service ? (
            ""
          ) : (
            <h4 className="text-justify p-2">
              برای دریافت قیمت، مقصد ، مبدا و نوع مرسوله را انتخاب کنید
            </h4>
          )}
        </div>
        {/* پایان:عنوان */}
        {/* start detail order  */}

        <div>
          {datastore.service && (
            <>
              <div className="border-b-2 border-b-lime-500 p-2">
                <div className="flex align-middle justify-around mt-6 font-bold text-txcolor text-xl">
                  <span>مبدا</span>
                  <GoArrowLeft className="inline-block" />
                  <span>مقصد</span>
                </div>
                <div className="flex align-middle justify-around mt-3  text-txcolor text-md">
                  <span>{datastore.pick_up}</span>
                  <GoArrowLeft className="inline-block" />
                  <span>{datastore.delivery}</span>
                </div>
              </div>
              {/* شروع: با توجه به نوع مرسوله این قسمت متفاوت است */}

              <div className="border-b-2 border-b-lime-500 p-2">
                <div className="flex align-middle justify-start mt-6 font-bold text-txcolor text-md">
                  مرسوله های انتخابی
                </div>
                {/* تابع چک کننده اسم محصول*/}
                <div className="mt-3  text-txcolor text-md">
                  {ServiceNameHandler(datastore.service).map((item,index) => {
                    return <div key={index}>{item}</div>
                  })}
                </div>
              </div>
              {/*  پایان: با توجه به نوع مرسوله این قسمت متفاوت است */}
              {datastore.Price ? (
                <div className="flex justify-around border-b-2 border-b-lime-500 p-2 text-txcolor">
                  <span> هزینه ارسال:</span>
                  <span>{datastore.Price.toLocaleString()} تومان</span>
                </div>
              ) : (
                ""
              )}
              {/*  نمایش محتوا و ارزش بسته*/}
              {ContentHandler(datastore.service)}
              {/*  نمایش محتوا و ارزش بسته*/}
              {datastore.pickup_date ? (
                <div className="flex justify-around border-b-2 border-b-lime-500 p-2 text-txcolor">
                  <span>تاریخ ارسال:</span>
                  <span>{datastore.pickup_date}</span>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        {/* end detail order  */}
        {/* start:button  */}
        <div className="fixed bottom-10 flex justify-around w-1/4 p-4">
          {datastore.service ? (
            urldata==="requst"?
            <button
              className="group border-2 border-white py-2 px-4 rounded-md text-txcolor bg-utils-300 hover:bg-white
              hover:text-navbarrequst transition-all transition-500 ease-linear"
              onClick={() => dispatch(MethodDeletOrder())}
            >
              حذف سفارش
              <AiFillDelete className="inline-block text-xl mr-1 group-hover:text-[red]" />
            </button>:
             <button
             className="border-2 border-white py-2 px-6 rounded-md bg-utils-300 text-txcolor hover:bg-white
             hover:text-navbarrequst transition-all transition-500 ease-linear"
             onClick={() => router.back()}
           >
             <AiOutlineForward className="inline-block text-xl ml-2" />
             بازگشت
           </button>

          ) : null}
          {
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <button
                  className={`btnoutline border-2 border-white bg-utils-300 py-2 px-2 rounded-md text-txcolor hover:bg-bgbtnhover
                  hover:text-navbarrequst transition-all transition-500 ease-linear ${
                    MethodFlagHandler(datastore.service) ? "bg-green-800" : ""
                  }`}
                  onClick={()=>{
                    if(MethodFlagHandler(datastore.service)){
                      router.push("/order/address")
                    }
                  }}
                >
                      تکمیل سفارش<AiFillBackward className="text-xl inline-block mr-2" />
                </button>
              </PopoverTrigger>
              {MethodFlagHandler(datastore.service) ? (
                ""
              ) : (
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      لطفا تمام فیلد ها را پر کنید!
                    </div>
                    <div className="text-tiny mt-5">سفارش شما ناقص است</div>
                  </div>
                </PopoverContent>
              )}
            </Popover>
          }
        </div>
        {/* end:button  */}
        
      </aside>
    </>
  );
};

export default Sidbar;
