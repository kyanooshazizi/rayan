import Navbar from "../navbar";
import Selectinput from "../../optinselect";

const Headerpage = () => {
  return (
    <>
      <header
        className={`w-full min-h-[570px] text-[14px]  md:text-[16px] flex items-center justify-center bg-[url('/imag_homepage/Header.svg')] bg-no-repeat bg-cover`}
      >
        <Navbar />
        <div className="text-txcolor">
          <div className="mt-10 sm:w-full w-4/5 mx-auto pb-3">
            <h1 className="text-center md:text-[26px]  font-bold sm:text-[24px] text-[24px] mx-auto">
              <span className="px-1 md:text-[38px] sm:text-[32px] text-[28px] md:font-extrabold ">
                رایان
              </span>{" "}
              راه حل های هوشمندانه برای کسب و کار های آنلاین
            </h1>
          </div>
          {/* inputselector start */}
          <div>
            <Selectinput />
          </div>
          {/* inputselector end */}
          <div className="mt-20 md:flex justify-center items-center text-[14px] font-[400] hidden">
            <div className="bg-colorgray text-white rounded-2xl py-2 px-10 mx-4">
              پرداخت امن
            </div>
            <div className="bg-colorgray text-white rounded-2xl py-2 px-10 mx-4">
              سفیران مطمئن
            </div>
            <div className="bg-colorgray text-white rounded-2xl py-2 px-10 mx-4">
              سفارش آسان
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headerpage;
