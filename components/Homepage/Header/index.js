import Navbar from "../navbar";
import Selectinput from "../../optinselect";
import Image from "next/image";
const Headerpage = () => {
  return (
    <>
      <header
        className={`w-full lg:min-h-[550px] min-h-[620px] text-[14px] flex flex-wrap  md:text-[16px] bg-[url('/imag_homepage/Header.svg')] bg-no-repeat bg-cover relative`}
      >
        <div>
          {" "}
          <Navbar />
        </div>
        <div className="text-txcolor w-full mt-[180px]">
          <div className=" sm:w-full w-4/5 mx-auto pb-3">
            <h1 className="text-center md:text-[26px]  font-bold sm:text-[24px] text-[24px] mx-auto">
              <span className="px-1 md:text-[38px] sm:text-[32px] text-[28px] md:font-extrabold ">
                رایان
              </span>{" "}
              راه حل های هوشمندانه برای کسب و کار های آنلاین
            </h1>
          </div>
          {/* inputselector start */}
          <div className="w-full mt-4">
            <Selectinput />
          </div>
          {/* inputselector end */}
          <div className="lg:mt-20 lg:flex justify-center items-center text-[14px] font-[400] hidden">
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
          {/* box image */}
          <div className="flex justify-center w-full absolute lg:bottom-[-50px] sm:bottom-[-32.5px] bottom-[-25px]">
            <div className="shadow-lg lg:mx-[20px] sm:mx-[10px] mx-[5px] lg:w-[100px] lg:h-[100px] sm:w-[65px] sm:h-[65px] w-[50px] h-[50px] bg-[#fff] lg:rounded-[16px] sm:rounded-[8px] rounded-[4px] flex justify-center items-center">
              <Image
                src="/imag_homepage/box_header/Energic.svg"
                width={80}
                height={20}
                alt="Picture of the author"
                className="lg:px-[0px] sm:px-[4px] px-[6px]"
              />
            </div>
            <div className="shadow-lg lg:mx-[20px] sm:mx-[10px] mx-[5px] lg:w-[100px] lg:h-[100px] sm:w-[65px] sm:h-[65px] w-[50px] h-[50px] bg-[#fff] lg:rounded-[16px] sm:rounded-[8px] rounded-[4px] flex justify-center items-center">
              <Image
                src="/imag_homepage/box_header/home.svg"
                width={60}
                height={8}
                alt="Picture of the author"
                className="lg:px-[0px] sm:px-[4px] px-[6px] lg:py-[0px] sm:py-[4px] py-[8px] lg:w-[60px] sm:[50px] w-[40px]"
              />
            </div>
            <div className="shadow-lg lg:mx-[20px] sm:mx-[10px] mx-[5px] lg:w-[100px] lg:h-[100px] sm:w-[65px] sm:h-[65px] w-[50px] h-[50px] bg-[#fff] lg:rounded-[16px] sm:rounded-[8px] rounded-[4px] flex justify-center items-center">
              <Image
                src="/imag_homepage/box_header/aseman.svg"
                width={70}
                height={50}
                alt="Picture of the author"
                className="lg:px-[0px] sm:px-[4px] px-[6px]"
              />
            </div>
            <div className="shadow-lg lg:mx-[20px] sm:mx-[10px] mx-[5px] lg:w-[100px] lg:h-[100px] sm:w-[65px] sm:h-[65px] w-[50px] h-[50px] bg-[#fff] lg:rounded-[16px] sm:rounded-[8px] rounded-[4px] flex justify-center items-center overflow-hidden">
              <Image
                src="/imag_homepage/box_header/amirkabir.svg"
                width={90}
                height={20}
                alt="Picture of the author"
                className="lg:px-[0px] sm:px-[4px] px-[6px]"
              />
            </div>
            <div className="shadow-lg lg:mx-[20px] sm:mx-[10px] mx-[5px] lg:w-[100px] lg:h-[100px] sm:w-[65px] sm:h-[65px] w-[50px] h-[50px] bg-[#fff] lg:rounded-[16px] sm:rounded-[8px] rounded-[4px] flex justify-center items-center">
              <Image
                src="/imag_homepage/box_header/naft.svg"
                width={60}
                height={30}
                alt="Picture of the author"
                className="lg:px-[0px] sm:px-[4px] px-[6px]"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headerpage;
