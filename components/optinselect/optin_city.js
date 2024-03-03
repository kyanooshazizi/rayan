"use client";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
// redux start
import { MethodPick_up, MethodDelivery ,Idcity_sender,
  Idcity_resiver,
 } from "../Redux/orderslice.js";
import { useDispatch, useSelector } from "react-redux";
// redux end

const Option = ({ stylex, placholder, data, slug, withw,py1,py2}) => {
  console.log("datainput",data)
  // start change redux
  const dispatch = useDispatch();

  // end change redux

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dataorder = useSelector((state) => state.order.order);
  // Hydration error:strat
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Hydration error:end

  return (
    <div
      className={`${withw} font-medium h-16 cursor-pointer relative lg:basis-[17%] lg:mx-0 mx-auto  w-[80%] lg:mt-0 md:mt-[18px] mt-[13px]`}
    >
      <div
        suppressHydrationWarning
        onClick={() => {
          return setOpen(!open);
        }}
        className={`${stylex} border-l-2 ${slug === "pick"
        ? dataorder.pick_up
          ? `${py1} pt-12 pb-4`
          : `${py2} py-8`
        : dataorder.delivery
        ? `${py1} pt-12 pb-4`:`${py2} py-8`}  text-txnotcolor border-gray-200  text-sm md:text-base w-full flex items-center justify-center ${
          !selected && "text-gray-700"
        }`}
      >
        {slug === "pick"
          ? dataorder.pick_up
            ? dataorder.pick_up
            : placholder
          : dataorder.delivery
          ? dataorder.delivery
          : placholder}
        {/* {selected?selected:placholder} */}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        {slug === "pick" ? (
          isClient && dataorder.pick_up ? (
            <span className={`absolute top-2 font-bold text-black `}>
              مبدا
            </span>
          ) : (
            ""
          )
        ) : isClient && dataorder.delivery ? (
          <span className={`absolute top-2 font-bold text-black `}>مقصد</span>
        ) : (
          ""
        )}
      </div>
      <ul
        className={`z-10 bg-white shadow-xl mt-5 overflow-y-auto overflow-x-hidden absolute w-full top-[52px] rounded-sm border-x-2 border-solid border-gray-300  ${
          open ? "max-h-60" : "hidden"
        } `}
      >
        <div className={`flex items-center px-2 sticky top-0 bg-white`}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="جستجو..."
            className="placeholder:text-gray-500 px-2 py-3 my-3 outline-[blue] bg-green-50 rounded-sm text-sm w-full text-black"
          />
        </div>
        {data?.map((city) => (
          <li
            key={city.id}
            className={`px-2 py-3 pr-5 text-sm text-txnotcolor hover:bg-colorgreen hover:text-txcolor
            ${
              city.name.toLowerCase() === selected.toLowerCase()
                ? "text-white bg-colorgreen"
                : ""
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
                  ? 
                  dispatch(MethodPick_up(city))
                  :dispatch(MethodDelivery(city))
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
