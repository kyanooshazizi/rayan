"use client";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
// redux start
import { MethodPick_up, MethodDelivery } from "../Redux/orderslice.js";
import { useDispatch, useSelector } from "react-redux";
// redux end

const Option = ({ stylex, placholder, data, slug }) => {
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
      <div suppressHydrationWarning 
        onClick={() => {
          return setOpen(!open);
        }}
        className={`${stylex} border-l-2 text-txnotcolor border-gray-200 p-3 md:p-7 text-sm md:text-base w-full flex items-center justify-between ${
          !selected && "text-gray-700"
        }`}
      >
        {slug === "pick" ? (dataorder.pick_up?dataorder.pick_up:placholder) : (dataorder.delivery?dataorder.delivery:placholder)}
        {/* {selected?selected:placholder} */}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        {slug === "pick" ? (isClient&&dataorder.pick_up?<span className={`absolute top-0 opacity-60 `}>مبدا</span>:"") : (isClient&&dataorder.delivery?<span className={`absolute top-0 opacity-60 `}>مقصد</span>:"")}
         
      </div>
      <ul
        className={`z-10 bg-white shadow-xl mt-0 overflow-y-auto overflow-x-hidden absolute w-full top-[52px] rounded-sm border-x-2 border-solid border-gray-300  ${
          open ? "max-h-60" : "hidden"
        } `}
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
        {data?.map((city) => (
          <li
            key={city.id}
            className={`p-2 pr-5 text-sm text-txnotcolor hover:bg-utils-300 hover:text-txcolor
            ${
              city.name.toLowerCase() === selected.toLowerCase() &&
              "bg-utils-300 text-txcolor"
            }
            ${
              city.name.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={(event) => {
              setSelected(city.name);
              setOpen(false);
              setInputValue("");
              {
                slug === "pick"
                  ? dispatch(MethodPick_up(city.name))
                  : dispatch(MethodDelivery(city.name));
              }
            }}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Option;
