import Navbar from "../navbar";
import styles from "./style.module.scss";
import Autowriter from "../writeraauto";
import Image from "next/image";

import Selectinput from "../optinselect";

const Headerpage = () => {
  return (
    <>
      <header className={`${styles.wrraper_header} text-sm sm:text-lg md:text-xl flex items-center justify-center`}>
        <Navbar />
        <div className="mt-2" >
        <h1 className="text-white text-center">
          <Image
            alt={"iconheader"}
            width={80}
            height={80}
            src="/gif_header.gif"
            className=" pl-5 bg-transparen rounded-lg hidden md:inline"
          />
          حمل و نقل با
          <span className="bg-blue-700 shadow-[inset_0px_4px_11px_0px_#fff] py-3 px-5 text-white rounded-md mr-4">
            رایان پست{" "}
          </span>
        </h1>
        <div className="text-white flex justify-center mt-3 h-11">
          <Autowriter />
        </div>
        {/* inputselector start */}
        <div >
        <Selectinput />
        </div>
        {/* inputselector end */}
        </div>
      </header>
    </>
  );
};

export default Headerpage;
