"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidbar from "../Sydbar";
import Mobile from "../dashboard/mobileshow";
import TableOrder from "./Orders_all";
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
             <div className="text-colorgray">
              <span className={`lg:ml-10 ml-6 lg:text-[16px] cursor-pointer sm:text-[14px] text-[12px] ${ flag ? "border-solid border-b-2 border-colorgreen pb-1 font-bold text-[#000] ":""}`} onClick={()=>setFlag(true)}>لیست سفارش ها</span>
              <span className={`lg:ml-10 ml-6 lg:text-[16px] cursor-pointer sm:text-[14px] text-[12px] ${flag ? "":"border-solid border-b-2 border-colorgreen pb-1 font-bold text-[#000]"}`} onClick={()=>setFlag(false)}>اسناد</span>
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
