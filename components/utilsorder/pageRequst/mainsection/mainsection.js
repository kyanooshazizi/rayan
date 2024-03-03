"use client";

import useCity_servise from "@/components/TanstakQury/useCity_servise";
import { useDispatch, useSelector } from "react-redux";

// utils
import Pakage from "../orderpackage/package";
// servise
import Selectpick_delivery from "../../../optinselect/optin_city";
import Image from "next/image";
import { useState, useEffect } from "react";

const Main_section = () => {
  const { datacity, dataservise,loadcity,loadservicel,error_city,error_service,error } = useCity_servise();
  const datastore = useSelector((state) => state.order.order);
  // Hydration error:strat
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Hydration error:end
  // شروع:انتخاب نوع محصول
  const OrderHandler = () => {  
        return <Pakage />;   
    
  };
  // پایان:انتخاب نوع محصول
  if (loadcity || loadservicel) {
    return (
      <div className="col-span-5 mt-[60px] flex items-center justify-center w-100 h-[100vh] bg-white">
        <Image
          src="/loadgetfetch.svg"
          width={200}
          height={200}
          alt="Picture of the author"
          priority
        />
      </div>
    );
  }

  return (
    <>
      <section className=" mt-[60px]">
        {/* مبدا ومقصد شروع*/}
        {error_city ? (
          <div className="flex align-middle justify-center mt-[6.5rem]">
            <span className="text-center p-3 bg-white border-2 border-bgcolor w-1/2 rounded-md">
              {error.message}
            </span>
          </div>
        ) : (
          <div className="mt-[100px]">
            <span className="mt-[10px] text-[18px] font-[600] block lg:px-[15%] px-[7.5%] pb-[8px]">
              جزئیات سفارش
            </span>
            <div className="flex lg:flex-row flex-col items-center justify-center  lg:w-[70%] w-[85%] mx-auto">
              <div className=" lg:basis-[50%] w-full">
                <Selectpick_delivery
                  stylex="!rounded-[4px] !bg-[#fff] !border-none !justify-between !w-full px-4"
                  withw="!w-full"
                  py1="!pt-8 !pb-4"
                  py2="!py-6"
                  placholder={datastore.pick_up || "مبدا"}
                  data={datacity.results}
                  slug="pick"
                />
              </div>
              <div className=" lg:basis-[50%] w-full">
                <Selectpick_delivery
                  stylex="!rounded-[4px] !bg-[#fff] !border-none !justify-between !w-full px-4"
                  withw="!w-full"
                  py1="!pt-8 !pb-4"
                  py2="!py-6"
                  placholder={datastore.delivery || "مقصد"}
                  data={datacity.results}
                  slug="deliv"
                />
              </div>
            </div>
          </div>
        )}
        {/* پایان مبدا و مقصد */}


        {/* شروع نوع مرسوله */}
        {error_service? (
          <div className="flex justify-center">
            <span className="bg-white p-3 mt-8">
              {error.message}
            </span>
          </div>
        ) : (
          <div className="mt-[10px]">
            { 
              OrderHandler()
            }
          </div>
        )}
        {/* پایان نوع مرسوله */}

      </section>
    </>
  );
};

export default Main_section;
