import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";


const Sidebar = ({ isOpen, toggle}) => {
  return (
    <>
      <div
        className=" fixed w-full h-full overflow-hidden bg-white grid pt-[80px] left-0 z-10"
        style={{
          opacity: `${isOpen ? "0" : "1"}`,
          top: ` ${isOpen ? "-100%" : "0"}`,
        }}
      >
        <button value="close" className="absolute right-0 p-5 text-2xl font-bold text-orange-700" onClick={toggle}>
        {/* Close icon */}
        <MdOutlineClose />
        </button>

        <ul className="sidebar-nav text-right text-lg p-4">
          <li  className="p-3 font-bold bg-slate-200 w-full mt-1 rounded-md flex align-middle justify-between">
            <Link href="/service"><p>خدمات</p></Link>
            <SlArrowDown />
          </li>
          <li className="p-3 font-bold bg-slate-200 w-full mt-1 rounded-md flex align-middle justify-between">
            <Link href="/Support"><p>پشتیبانی</p></Link>
            <SlArrowDown />
          </li>
          <li className="p-3 font-bold bg-slate-200 w-full mt-1 rounded-md flex align-middle justify-between">
            <Link href="/about"><p>درباره ما</p></Link>
            <SlArrowDown />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;