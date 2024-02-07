"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Mobile from "../dashboard/mobileshow";
import TableOrder from "./all_order";
import TableDocument from "./documents";

const index = () => {
  const [mobile, setMobile] = useState(false);
  const [flag,setFlag]=useState(true)
  return (
    <div>
      <Navbar setMobile={setMobile} mobile={mobile} />

      {mobile ? (
        <Mobile />
      ) : (
        <main className="pt-[90px] min-h-screen">
          <div className="lg:flex hidden fixed w-[140px] mt-[20px]">
            <Sidbar />
          </div>
          <div className="lg:pr-[160px] pr-[14px]">
            <div className="md:text-[24px] font-bold text-[20px]">سفارش ها</div>
            <div className=" mt-5 w-full">
             <div className="">
              <span className={`font-bold pr-2 pl-2 lg:text-[16px] cursor-pointer text-[14px] text-colorgray ${flag?"text-[#000] ":""}`} onClick={()=>setFlag(true)}>لیست سفارش ها</span>
              <span className={`font-bold px-2 lg:text-[16px] cursor-pointer text-[14px] text-colorgray ${flag?"":"text-[#000] "}`} onClick={()=>setFlag(false)}>اسناد</span>
             </div>
             {/* start component */}
           <div className="mt-[10px] pb-[50px] pl-[20px]">
           {
              flag?<TableOrder/>:<TableDocument/>
            }
           </div>
             {/* end component */}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default index;
