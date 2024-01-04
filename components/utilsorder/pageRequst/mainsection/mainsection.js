"use client";

import useCity_servise from "@/components/TanstakQury/useCity_servise";
import { useDispatch, useSelector } from "react-redux";
import { MethodService } from "../../../Redux/orderslice";
import { v4 as uuidv4 } from "uuid";
// utils
import Pakage from "../orderpackage/package";
import Document from "../orderDocument/document";
// servise
import Selectpick_delivery from "../../../optinselect/optin_city";
import Image from "next/image";
import { useState, useEffect } from "react";
const Main_section = () => {
  const { datacity, dataservise } = useCity_servise();
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.order.order);
  // Hydration error:strat
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Hydration error:end
  // شروع:انتخاب نوع محصول
  const OrderHandler = (item) => {
    switch (item) {
      case "بسته": 
        return <Pakage />;
      case "پاکت":
        return <Document />;
    }
  };
  // پایان:انتخاب نوع محصول
  if (datacity.isPending || dataservise.isPending) {
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
      <section className="col-span-5 mt-[60px]">
        {/* مبدا ومقصد شروع*/}
        {datacity.isError ? (
          <div className="flex align-middle justify-center mt-8">
            <span className="text-center p-3 bg-white border-2 border-bgcolor w-1/2 rounded-md">
              {datacity.error.message}
            </span>
          </div>
        ) : (
          <div className="flex align-middle justify-center mt-4 w-full">
            <div className=" mx-4 basis-52">
              <Selectpick_delivery
                stylex="rounded-xl bg-white !important"
                placholder={datastore.pick_up || "مبدا"}
                data={datacity.data}
                slug="pick"
              />
            </div>
            <div className=" mx-4 basis-52">
              <Selectpick_delivery
                stylex="rounded-xl bg-white !important"
                placholder={datastore.delivery || "مقصد"}
                data={datacity.data}
                slug="deliv"
              />
            </div>
          </div>
        )}
        {/* پایان مبدا و مقصد */}
        {/* شروع نوع مرسوله */}
        {dataservise.isError ? (
          <div className="flex justify-center">
            <span className="bg-white p-3 mt-6">
              {dataservise.error.message}
            </span>
          </div>
        ) : (
          <div className="mt-24">
            {isClient && datastore.service ? (
              OrderHandler(datastore.service)
            ) : (
              <div>
                <div className="flex justify-center">
                  <p className="text-center shadow w-72 py-3 px-4 rounded-md">
                    مرسوله مورد نظر را انتخاب کنید:
                  </p>
                </div>
                <div className="flex align-middle justify-center m-4">
                  {dataservise.data?.map((optin) => {
                    return (
                      <button
                        key={uuidv4()}
                        className="py-2 px-6 rounded-md m-4 bg-utils-300 text-txcolor !important"
                        onClick={() => {
                          dispatch(MethodService(optin));
                        }}
                      >
                        {optin.title}
                        <Image
                          className="inline-block mr-2 rounded-sm"
                          src={optin.icon}
                          width={25}
                          height={25}
                          alt="Picture of the author"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        {/* پایان نوع مرسوله */}
      </section>
    </>
  );
};

export default Main_section;
