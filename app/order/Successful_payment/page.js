import Navbar from "@/components/utilsorder/Navbar/navbar";
// import Main from "@/components/utilsorder/pagePayment";
import { getData } from "@/components/utilsFunction/checklogin";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import Sidnav from "@/components/utilsDashboard/Sydbar";
import Link from 'next/link'
const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const value_cooki = token && token.value ? token.value : undefined;
  if (value_cooki) {
    var data = await getData(value_cooki);
    if (!data) {
      redirect("/auth/login");
    }
  } else {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="w-full">
        <div>
          <Navbar />
        </div>
        <div
          className={` fixed w-[140px] mt-[100px] lg:flex hidden
          }`}
        >
          <Sidnav stylex={"pt-[38px]"} />
        </div>
        <div className="flex lg:pr-[150px] pr-0">
          <div className=" lg:basis-[50%] sm:basis-[90%] basis-full lg:mx-0 mx-auto flex justify-center pt-[180px]">
            <div className="">
            <Image
                src="/order/finall_a.svg"
                width={200}
                height={100}
                alt="Picture of the author"
                className="mx-auto"
                priority
              /> 
              <span className="text-center block text-colorgray">سفارش شما با موفقیت ثبت شد</span>
              <span className="block text-center pt-[40px] pb-1">کد پیگیری شما برای تکمیل سفارش</span>
              <span className="bg-bgcolor text-[#fff] block px-3 py-2 text-center rounded-[4px]">1635246</span>
              <div className="flex justify-between mt-[10px]">
              <Link href="/order/payment" className="bg-[#515E83] text-[#fff]  py-[10px] rounded-[3px]  inline-block px-2 text-[14px] ">چاپ صورتحساب </Link>
              <Link href="/order/Factor/1635246" className="bg-[#7C85A0] text-[#fff]  py-[10px] rounded-[3px]  inline-block px-6 text-[14px]"> چاپ لیبل</Link>
              </div>
            </div>
          </div>
          <div className=" lg:block hidden lg:basis-[50%] bg-bgcolor h-screen pt-[180px]">
          <Image
                src="/order/finall.svg"
                width={700}
                height={600}
                alt="Picture of the author"
                className="mx-auto"
                priority
              />
              
          </div>
        </div>
      </div>
    </>
  );
};

export default page;


