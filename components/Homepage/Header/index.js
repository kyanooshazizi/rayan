import Navbar from "../navbar";
import Selectinput from "../../optinselect";

const Headerpage = () => {
  return (
    <>
      <header
        className={`w-[100wh] h-[600px] text-sm sm:text-lg md:text-xl flex items-center justify-center bg-[url('/wave2.svg')] bg-no-repeat bg-white bg-cover`}
      >
        <Navbar  />
        <div className="mt-0 font-bold text-2xl text-txcolor">
          <div>
          <h1 className=" text-center text-3xl mb-4">آسان و ساده با رایان پست</h1>
          <h2 className=" flex justify-center mt-3 h-11 text-2xl mb-2">
            راه حل های هوشمندانه حمل و نقل در تجارت الکترونیک
          </h2>
          </div>
          {/* inputselector start */}
          <div className="mt-10">
            <Selectinput />
          </div>
          {/* inputselector end */}
        </div>
      </header>
    </>
  );
};

export default Headerpage;
