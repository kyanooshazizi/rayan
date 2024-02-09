import React from "react";

import ModalnewAdd from "./modalnewBusiness";
const ProfileBusiness = () => {
  return (
    <div className="pl-4 mx-auto pt-20 pr-4 lg:pr-0">
      <div>
        <h3 className="lg:text-xl md:text-lg text-base font-bold ">
          پروفایل کسب و کاری
        </h3>
      </div>
      <div className="mt-4 bg-txcolor w-full h-[650px]">
        <div className="p-2 bg-red-400 text-txcolor md:text-base sm:text-sm text-xs">
          برای ثبت سفارش حداقل یک پروفایل کسب و کاری را بسازید
        </div>
        <div className="p-4">
          <div>
           <ModalnewAdd/>
          </div>
          <hr />
        </div>
        {/* start: business */}
        <div className="p-4 mt-4 flex flex-wrap ">
         <div className="max-w-full flex-[0_0_100%]">
         <div className="flex flex-[auto_1] flex-col items-stretch w-full overflow-auto ">
          {/* thead:start */}
           <div className="min-w-[1024px] flex-[1_0_auto] flex-col select-none flex ">
            
           </div>
          {/* thead:end */}
         </div>
         </div>
        </div>
        {/* end: business */}
      </div>
    </div>
  );
};

export default ProfileBusiness;
