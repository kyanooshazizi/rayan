import React, { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCookie } from "cookies-next";
import { FaUser } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import Modal from "../modaleditBusiness";
import { useThemeContext } from "../../../context/store";
const Table = () => {
  const { setFlagchange } = useThemeContext();
  const { data: btype } = useQuery("btype");
  const { data, isLoading } = useQuery("allbesiness", () => {
    return fetch("https://mohaddesepkz.pythonanywhere.com/business/?page=1", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    }).then((res) => res.json());
  });
  const y = data?.results ? 10 - data?.results?.length : 10;
  const x = Array(y).fill(0);
  const typeHandler = (x) => {
    const a = btype?.results.find((item) => item.id == x);
    return a?.title;
  };
  // start medit
  const queryClient = useQueryClient();
  const {
    mutate: deletBusiness,
    data: deletdata,
    error,
    isError,
  } = useMutation(
    (Id) => {
      return fetch(`https://mohaddesepkz.pythonanywhere.com/business/${Id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      });
    },
    {
      onError: () => {
        console.log("err");
      },
      onSuccess: () => {
        setFlagchange((prev) => !prev);
        queryClient.invalidateQueries("allbesiness");
      },
    }
  );
  // start delet
  return (
    <div className="overflow-x-auto overflow-y-hidden mb-[60px]">
      {isLoading ? (
        <div className=" mt-[50px] w-full lg:w-[90%] min-h-[200px]">
          <Image
            className="mx-auto"
            src="/loadgetfetch.svg"
            width={110}
            height={110}
            alt="لوگو"
            priority
          />
        </div>
      ) : (
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
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-3 py-2"></th>
              <th className="text-colorgray lg:text-[14px] text-[12px] !font-[400] text-right px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="">
            {data?.results?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-[#fff]  h-[50px] rounded border-b-[12px] border-solid border-dashboard hover:bg-slate-200 cursor-pointer"
                >
                  <td className="text-right px-4 py-2 text-[14px]">
                    {item.logo ? (
                      <Image
                        className="rounded-full"
                        src={`${item.logo}`}
                        width={45}
                        height={45}
                        alt="لوگو"
                        priority
                      />
                    ) : (
                      <div className="rounded-full bg-slate-300 w-[50px] h-[50px] flex justify-center items-center border-solid border-4 border-slate-100 relative">
                        <FaUser className="text-[#fff] text-3xl rounded-full" />
                      </div>
                    )}
                  </td>
                  <td className="text-right px-3 py-2 text-[14px]">
                    {item.name}
                  </td>
                  <td className="text-right px-3 py-2 text-[14px]">
                    {typeHandler(item.b_type)}
                  </td>
                  <td className="text-right px-3 py-2 text-[14px]">
                    {item.national_code || "---"}
                  </td>
                  <td className="text-right pr-3 pl-1 pb-2 pt-3 ">
                    <Modal datainput={item} />
                  </td>
                  <td className="text-right pr-3 pl-1  py-2 ">
                    <MdDelete
                      className="text-[25px] cursor-pointer text-bgcolor"
                      onClick={() => {
                        deletBusiness(item.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            {x.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-[#fff]  h-[50px] rounded border-b-[12px] border-solid border-dashboard hover:bg-slate-200 cursor-pointer"
                >
                  <td className="text-right px-4 py-6 text-[14px]"></td>
                  <td className="text-right px-3 py-6 text-[14px]"></td>
                  <td className="text-right px-3 py-6 text-[14px]"></td>
                  <td className="text-right px-3 py-6 text-[14px]"></td>
                  <td className="text-right pr-3 pl-1 py-6 "></td>
                  <td className="text-right pr-3 pl-1  py-6 "></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

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
