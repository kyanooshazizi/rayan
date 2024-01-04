"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
// redux start
import { MethodService } from "../Redux/orderslice.js";
import { useDispatch, useSelector } from "react-redux";
// redux end
const Servic = ({ stylex, placholder,data}) => {
   // start change redux
   const dispatch = useDispatch();
   // end change redux
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dataorder=useSelector((state) => state.order.order);
// Hydration error:strat
const [isClient, setIsClient] = useState(false);
useEffect(() => {
  setIsClient(true)
}, [])
// Hydration error:end
  return (
    <div className={` font-medium h-10 cursor-pointer relative`}>
      <div 
        onClick={() => {
          return setOpen(!open);
        }}
        className={`${stylex} reletive border-l-2 border-gray-200 text-txnotcolor p-3 md:p-7 text-sm md:text-base bg-white w-full flex items-center justify-between ${
          !selected && "text-gray-700"
        }`}
      >
        {/* placeholder:start */}
        {isClient&&dataorder.service ? dataorder.service : placholder}
        {/* placeholder:end */}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        {dataorder.service && isClient ? <span className="absolute top-0 opacity-60">محتوا مرسوله</span> : ""}
      </div>
      <ul
        className={`z-40 bg-whit shadow-xl mt-0 overflow-y-auto overflow-x-hidden absolute w-full top-[52px] rounded-sm border-x-2 border-solid border-gray-300  ${
          open ? "max-h-60" : "hidden"
        }`}
      >
        <div className={`flex items-center px-2 sticky top-0 bg-white`}>
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="جستجو..."
            className="placeholder:text-gray-500 p-2 my-3 outline-utils-300 bg-orange-100 text-sm w-40"
          />
        </div>
        {data?.map((item) => (
          <li
            key={item.id}
            className={`group p-2 pr-5 text-sm text-txnotcolor hover:bg-utils-300 bg-white
            ${
              item.title.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              setSelected(item.title);
              setOpen(false);
              setInputValue("");
              dispatch(MethodService(item));
            }}
          >
            <div
              className={`border-b-2 border-gray-400 group-hover:bg-utils-300 group-hover:text-txcolor`}
            >
              <span className={`block`}>
                <Image
                  src={item.icon}
                  width={30}
                  height={30}
                  alt="Picture of the author"
                  className="inline-block p-1"
                  />
                  {item.title}
              </span>
              <span
                className={`block text-[10px] text-gray-600 group-hover:text-txcolor`}
              >
                {item.short_description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Servic;
