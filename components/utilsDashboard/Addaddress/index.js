"use client"
import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
const page = () => {
  const [toggle,setToggle]=useState(false)
  return (
    <>
      <div className="grid grid-cols-12 p-16 gap-14">
        <div className="col-start-1 col-end-4">
          <div className="w-full h-[200px] bg-txcolor py-3 px-2">
              <div className="py-3">
              <FaAddressBook className="text-utils-300 inline-block ml-2 text-lg" />
                <span onClick={()=>setToggle(prev=>!prev)}>دفترچه آدرس گیرندگان</span>
              </div>
              <div className="py-3">
              <FaAddressBook className="text-utils-300 inline-block ml-2 text-lg"/>
              <span onClick={()=>setToggle(prev=>!prev)}>دفترچه آدرس فرستندگان</span>
              </div>
          </div>
        </div>
        <div className="col-start-4 col-end-13">
          <div className="w-full h-[400px] bg-txcolor py-3 px-2">
           <div className="flex justify-between px-3">
            <span className="bg-bgcolor px-3 py-2 text-txcolor rounded-md after:content-[''] ">آدرس گیرندگان</span>
            <button>ثبت آدرس جدید</button>
           </div>
           <hr className="my-4"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
