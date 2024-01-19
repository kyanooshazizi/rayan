"use client";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { PiPhoneCall } from "react-icons/pi";
import { MdOutlineAddLocation } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useThemeContext } from '../../context/store';

const index = () => {
  const { userdata} = useThemeContext();
  const router=useRouter();
  const [order, setOrder] = useState("");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false)

  useEffect(() => {
    try {
      fetch(
        `https://mohaddesepkz.pythonanywhere.com/orders/${getCookie("code")}/`,
        {
          headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        }
      )
        .then((res) =>
        {
          if(!res.ok){
            setError(true)
            setLoading(false)
          }else{
           return res.json()
          }
        }
        )
        .then((res) =>{
          setOrder(res);
          setLoading(false)
        }).catch(err=>console.log(err));
     
    } catch (error) {
      console.error(error);
    }
    
  }, []);


  if(loading){
return(
  <div className="flex justify-center items-center mt-[150px]">
     <Image
                src="/loading.svg"
                width={100}
                height={100}
                alt="Picture of the author"
                priority
              />
  </div>
)
  }
 if(error||order.length==0){
    return(
      <>
<div className=" mt-[300px] text-center text-2xl bg-txcolor p-2 w-2/3 mx-auto">شما هنوز سفارشی را  ثبت نکرده اید!</div>
      </>
    )
  }
  
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
                <p className="mr-6 p-1">{order[0]?.sender_name}</p>
              </div>
              <div className="my-3">
                <PiPhoneCall className="inline-block ml-2" />
                <span className="font-bold">تلفن:</span>
                <p className="mr-6 p-1">{order[0]?.sender_phone}</p>
              </div>
              <div className="my-3">
                <MdOutlineAddLocation className="inline-block ml-2" />
                <span className="font-bold">آدرس:</span>
                <p className="mr-6 p-1">{`${order[0]?.sender_address}، پلاک${order[0]?.sender_plaque}، طبقه${order[0]?.sender_stage}، واحد${order[0]?.sender_unity}`}</p>
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
                  { order.map((item, index) => {
                        return <div>{`${item.count} عدد ${item.package.title} ${item.size.title}`}</div>;
                      })}
                </div>
              </div>
              <div>
                <div>
                  <span className="font-bold">زمان ثبت سفارش:</span>
                  <span className="p-2">{
                   order[0].created_at
                  }</span>
                </div>
                <div className="my-2">
                  <span className="font-bold">زمان جمع آوری:</span>
                  <span className="p-2">{`${order[0].pickup_date} ${order[0].service.delivery_time}`}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-10">
              <div>
                <span className="font-bold">نوع سرویس:</span>
                <span className="p-2"> {order[0].service.title}</span>
              </div>
              <div>
                <span className="font-bold p-2">محتوا مرسوله:</span>
                <span>{order[0].content?`${order[0].content.title}`:"کاغذ"}</span>
              </div>
            </div>
            <div className="text-center mt-10">
              <span className="font-bold">هزینه ارسال:</span>
              <span className="p-2">
                  { order.map((item, index) => {
                    if(order.length==index+1){

                      return <span>{`${item.total_price.toLocaleString()} تومان`}</span>;
                    }
                  })
              }</span>
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
                <p className="mr-6 p-1">{order[0].receiver_name}</p>
              </div>
              <div className="my-3">
                <PiPhoneCall className="inline-block ml-2" />
                <span className="font-bold">تلفن:</span>
                <p className="mr-6 p-1">{order[0].receiver_phone}</p>
              </div>
              <div className="my-3">
                <MdOutlineAddLocation className="inline-block ml-2" />
                <span className="font-bold">آدرس:</span>
                <p className="mr-6 p-1">{`${order[0]?.receiver_address}، پلاک${order[0]?.receiver_plaque}، طبقه${order[0]?.receiver_stage}، واحد${order[0]?.receiver_unity}`}</p>
              </div>
            </div>
          </div>
        </div>
        {/* start:butten */}
        {userdata&&userdata.flag?"":<Link
          href="/dashboard/Profile"
          className="text-[blue] mx-auto text-center block mt-10"
        >
          لطفا پروفایل کاربری خود را تکمیل کنید(کلیک کنید)
        </Link>}
        
        <div className=" flex justify-around mt-6 w-1/5 mx-auto">
          <button
            onClick={() => {
              fetch("https://mohaddesepkz.pythonanywhere.com/orders/delete/", {
                method: "DELETE",
                headers: {Authorization:`Bearer ${getCookie("access_token")}` },
              }).then(res=>res.json()).then(res=>res);
              router.push("/order/address")
            }}
            className="bg-bgcolor px-3 py-4 text-txcolor rounded hover:bg-txcolor hover:text-bgcolor transition-all transition-500 ease-linear border-bgcolor border-1 border-solid"
          >
            ویرایش سفارش
          </button>
          <button 
          onClick={()=>{
            if(data.flag){

            }else{
              router.push("/dashboard/Profile")
            }
          }}
          className="bg-[green] px-3 py-3 text-txcolor rounded hover:bg-txcolor hover:text-[green] transition-all transition-500 ease-linear border-[green] border-1 border-solid">
            تایید و پرداخت
          </button>
        </div>
        {/* end:butten */}
      </>
    );


};

export default index;
