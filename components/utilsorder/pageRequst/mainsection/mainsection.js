"use client";

import React from "react";
import { useThemeContext } from "../../../context/store";
import { useDispatch, useSelector } from "react-redux";
import { MethodService } from "../../../Redux/orderslice";
import { v4 as uuidv4 } from 'uuid';
// utils
import Pakage from "../orderpackage/package";
import Document from "../orderDocument/document";
// servise
import Selectpick_delivery from "../../../optinselect/optin_city";
import Image from 'next/image';
const Main_section = () => {
  const { datacity, datapaket } = useThemeContext();
  console.log(datacity, datapaket);
  const dispatch = useDispatch();
  const datastore = useSelector((state) => state.order.order);
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
  return (
    <>
      <section className="col-span-5 mt-[60px]">
        {/* مبدا ومقصد شروع*/}
        <div className="flex align-middle justify-center mt-4 w-full">
          <div className="relative mx-4 basis-52">
            {/* <span className="absolute top-0 z-10 text-sm text-gray-800 bg-white rounded-full p-2 left-5">
              مبدا
            </span> */}
            <Selectpick_delivery
              stylex="rounded-xl bg-white !important"
              placholder={datastore.pick_up || "مبدا"}
              data={datacity}
              slug="pick"
            />
          </div>
          <div className="relative mx-4 basis-52">
            {/* <span className="absolute top-0 z-10 text-sm text-gray-800 bg-white rounded-full p-2 left-4">
              مقصد
            </span> */}
            <Selectpick_delivery
              stylex="rounded-xl bg-white !important"
              placholder={datastore.delivery || "مقصد"}
              data={datacity}
              slug="deliv"
            />
          </div>
        </div>
        {/* پایان مبدا و مقصد */}
        {/* شروع نوع مرسوله */}
        <div className="mt-24">
          {datastore.service ? (
            OrderHandler(datastore.service)
          ) : (
            <div>
              <div className="flex justify-center">
                <p className="text-center shadow w-72 py-3 px-4 rounded-md">
                  مرسوله مورد نظر را انتخاب کنید:
                </p>
              </div>
              <div className="flex align-middle justify-center m-4">
                {datapaket.map((optin) => {
                  return (
                    <button
                    key={uuidv4()}
                      className="py-2 px-6 rounded-md m-4 bg-utils-300 text-txcolor !important"
                      onClick={(event) => {
                        dispatch(MethodService(optin.title));
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
        {/* پایان نوع مرسوله */}
      </section>
    </>
  );
};

export default Main_section;
