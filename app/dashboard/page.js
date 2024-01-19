import React from "react";
import Navbar from "@/components/utilsDashboard/Navbar";
import Sidbar from "@/components/utilsDashboard/Sydbar";
import { FaWallet } from "react-icons/fa6";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getData } from "@/components/utilsFunction/checklogin";

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
  const waletTotal = 50000;
  return (
    <div>
      <Navbar />
      <main>
        <div className="lg:relative lg:top-0 lg:left-0 bg-[#f3f6fb]">
          <div className="lg:flex lg:min-h-[680px] lg:h-full hidden fixed bg-[#f3f6fb] w-[140px]">
            <Sidbar />
          </div>
          <div className="lg:pr-[160px] w-100 min-h-[670px] flex justify-center">
            <div className="w-full pl-0 mx-auto pr-[15px]">
              <div>
                {/* start row:1 */}
                <div className="flex pt-[60px]">
                  <div className="w-[60%] max-w-[60%] flex flex-1">
                    <div className="lg:w-[40%] lg:max-w-[40%] max-w-none flex-col flex pl-[20px]">
                      <div className="bg-txcolor w-full p-[16px] flex flex-auto min-h-[110px]  flex-col mb-[16px] rounded-[4px] ">
                        <div className="flex">
                          <span className="mr-2 block text-[green]">
                            سفارش های ثبت شده:
                          </span>
                        </div>
                        <div className="flex-1 flex items-start">
                          <span className="mr-2 mt-4 block text-4xl text-center font-bold ">
                            20
                          </span>
                        </div>
                        <div>
                          <Link
                            href="/dashboard/Orders"
                            className="text-[blue] float-left ml-2"
                          >
                            مشاهده
                          </Link>
                        </div>
                      </div>
                      <div className="bg-txcolor w-full p-[16px] flex flex-auto min-h-[110px]  flex-col mb-[16px] rounded-[4px] ">
                        <div className="flex">
                          <span className="mr-2 block text-[orange]">
                            {" "}
                            سفارش ثبت نشده:
                          </span>
                        </div>
                        <div className="flex flex-1 items-start">
                          <span className="mr-2 mt-4 block text-4xl text-center font-bold ">
                            1
                          </span>
                        </div>
                        <div>
                          <Link
                            href="/order/requst"
                            className="text-[blue] float-left ml-2"
                          >
                            مشاهده
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[60%] lg:max-w-[60%] max-w-none flex pl-[20px] mb-[16px]">
                      <div className="bg-txcolor w-full">
                        <span className="mr-2 block"> موجودی کیف پول:</span>
                        <div className="mt-4 flex justify-center text-4xl text-utils-300">
                          <FaWallet className="mr-1" />
                        </div>
                        <p className="text-center mt-4">
                          <span className="text-2xl ml-2 font-bold">
                            {waletTotal.toLocaleString()}
                          </span>{" "}
                          تومان
                        </p>
                        <div className="text-center mt-4 text-sm">
                          <button className="bg-bgcolor px-2 py-2 rounded-md text-txcolor">
                            افزایش موجودی
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[40%] max-w-[40%] flex flex-1 mb-[16px]">
                    <div className="bg-txcolor col-start-4 col-span-2 ml-2 w-full">
                      <span className="mr-2 block">
                        {" "}
                        پیگیری مرسوله های ارسالی:
                      </span>
                      <form className="flex flex-col items-center mt-4">
                        <input
                          type="text"
                          className="w-4/5 border-1 border-solid border-bgcolor cursor-pointer px-2 py-3 rounded-md"
                          placeholder="کد رهگیری خود را وارد کنید"
                        />
                        <button className="bg-bgcolor px-2 py-2 rounded-md text-txcolor block mt-4">
                          پیگیری
                        </button>
                      </form>
                    </div>
                  </div>

                </div>
                  {/* end row:1 */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
