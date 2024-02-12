import React from "react";

const Table = () => {
  const x = Array(10).fill(0);
  return (
    <div className="overflow-x-auto overflow-y-hidden mb-[60px]">
      <table className=" mt-[25px] w-full lg:w-[90%]">
        <thead>
          <tr className="bg-dashboard ">
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-5 py-2">
              لوگو
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-3 py-2">
              عنوان کسب و کار
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-3 py-2">
              نوع کسب و کار
            </th>
            <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-3 py-2">
              شناسه ملی / کد ملی
            </th>
            
          </tr>
        </thead>
        <tbody className="">
          {x.map((item, index) => {
            return (
              <tr
                key={index}
                className="bg-[#fff]  h-[50px] rounded border-b-[12px] border-solid border-dashboard"
              >
                <td className="text-right px-5 py-6 text-[14px]"></td>
                <td className="text-right px-3 py-6 text-[14px]">
                  
                </td>
                <td className="text-right px-3 py-6 text-[14px]">
                 
                </td>
                <td className="text-right px-3 py-6 text-[14px]">
                 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-center w-[90%]">
        <div className="text-[12px] mt-[15px]">
          <span className="px-2">صفحه</span>
          <select className="bg-[#fff] px-2 rounded outline-none">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <span className="px-2">از</span>
          <span>1</span>
          <span className="text-center py-1 px-2 bg-[#fff] mr-8 rounded">
            {" "}
            10 ردیف
          </span>
        </div>
      </div>
    </div>
  );
};

export default Table;
