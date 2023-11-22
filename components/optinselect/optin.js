"use client";
import React, { useEffect, useState, useRef } from "react";

import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Option = ({stylex,placholder,url}) => {
  const [allcity, setAllcity] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const search = useRef(null);
  useEffect(() => {
    // https://restallcity.com/v2/all?fields=${value}
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllcity(data);
      });
  }, []);
  return (
    <div className={` font-medium h-10 cursor-pointer relative`}>
      <div
        onClick={() => {
          search.current.autofocus = "true";
          return setOpen(!open);
        }}
        className={`${stylex} border-l-2 border-gray-200 p-3 md:p-7 text-sm md:text-base bg-white w-full flex items-center justify-between ${
          !selected && "text-gray-700"
        }`}
      >
        {selected ? selected : placholder}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
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
            className="placeholder:text-gray-500 p-2 my-3 outline-blue-700 bg-orange-100 text-sm w-40"
            ref={search}
          />
        </div>
        {allcity.map((city) => (
          <li
            key={city.id}
            className={`p-2 pr-5 text-sm hover:bg-sky-600 hover:text-white
            ${
              city.name.toLowerCase() === selected.toLowerCase() &&
              "bg-sky-600 text-white"
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
