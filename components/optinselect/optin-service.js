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
    <div className={` font-medium h-16 cursor-pointer relative lg:basis-[17%]  lg:block hidden`}>
      <div 
        onClick={() => {
          return setOpen(!open);
        }}
        className={` ${stylex} ${dataorder.service?"pt-12 pb-4":"py-8"}  reletive border-l-2 border-gray-200 text-txnotcolor   text-sm md:text-base bg-white w-full flex items-center justify-center ${
          !selected && "text-gray-700"
        }`}
      >
        {/* placeholder:start */}
        {isClient&&dataorder.service ? dataorder.service : placholder}
        {/* placeholder:end */}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        {dataorder.service && isClient ? <span className="absolute top-2 font-bold block text-bgcolor">محتوا مرسوله</span> : ""}
      </div>
      <ul
        className={`z-40 bg-whit shadow-xl mt-5 overflow-y-auto overflow-x-hidden absolute w-full top-[52px] rounded-sm border-x-2 border-solid border-gray-300  ${
          open ? "max-h-60" : "hidden"
        }`}
      >
        <div className={`flex items-center px-2 sticky top-0 bg-white`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="جستجو..."
            className="placeholder:text-gray-500 px-2 py-3 my-3 outline-colorgreen bg-green-50 text-sm w-full"
          />
        </div>
        {data?.map((item) => (
          <li
            key={item.id}
            className={`group p-2 pr-5 text-sm text-txnotcolor hover:bg-colorgreen bg-white
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
              className={`border-b-2 border-gray-400 group-hover:bg-colorgreen group-hover:text-txcolor`}
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
