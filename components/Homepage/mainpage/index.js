import React from "react";
import Image from "next/image";
import { IoStar } from "react-icons/io5";
import Link from "next/link";
import Slider from "./slider";
// start icon footer
import { FiInstagram } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { SiAparat } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
const Maincomponent = () => {
  return (
    <>
      {/* start section 1 */}
      <div className="bg-dashboard w-full min-h-[350px]">
        <div className="mt-[75px] text-center text-[16px] font-[700] text-[#5B6271]">
          <Image
            src="/imag_homepage/enemad.svg"
            width={85}
            height={40}
            alt="Picture of the author"
            className="mx-auto"
          />
        </div>
        <div className="mt-[120px] text-center mx-auto lg:text-[18px] text-[16px] text-colortext flex justify-center flex-col items-center">
          <div className="flex">
            بازدید
            <div className="flex px-2">
              <IoStar className="text-utils-300 mx-[1px]" />
              <IoStar className="text-utils-300 mx-[1px]" />
              <IoStar className="text-utils-300 mx-[1px]" />
              <IoStar className="text-utils-300 mx-[1px]" />
              <IoStar className="text-utils-300 mx-[1px]" />
            </div>
            +30,000
          </div>
          <div className="flex text-[16px] text-black">
            <Image
              src="/imag_homepage/Google.svg"
              width={75}
              height={30}
              alt="Picture of the author"
              className="px-1"
            />
            مورد اعتماد
            <IoStar className="text-colorgreen mx-[1px] text-[16px]" />
          </div>
        </div>
      </div>
      {/* end section 1 */}

      {/* start section2 */}
      <div className="bg-[white] w-full min-h-[620px] pb-[100px]">
        <div className="flex justify-center pt-[100px]">
          <h2 className="lg:text-[24px] text-[18] lg:font-[800] font-[500]">
            <span className="lg:text-[32px] text-[24px] font-[900] align-middle inline-block">
              رایان
            </span>{" "}
            چگونه کار می کند
          </h2>
        </div>
        <div className="flex justify-center items-center lg:flex-nowrap flex-wrap mt-[50px] gap-[40px] px-[10px]">
          {}
          <div className="w-[250px] h-[170px] sm:my-0 my-4">
            <Image
              src="/imag_homepage/work_rayan/one.svg"
              width={250}
              height={150}
              alt="Picture of the author"
              className="mx-auto"
            />
            <p className="mx-auto px-4 mt-[16px] text-colorgray text-center">
              مبدا خود را مشخص کنید و در هر مقصد دیگری تحویل بگیرید
            </p>
          </div>
          <div className="w-[250px] h-[170px] sm:my-0 my-4">
            <Image
              src="/imag_homepage/work_rayan/tow.svg"
              width={155}
              height={140}
              alt="Picture of the author"
              className="mx-auto"
            />
            <p className="mx-auto px-4 mt-[16px] text-colorgray text-center">
              سرویس متناسب با کسب و کار خودتان را انتخاب کنید
            </p>
          </div>
          <div className="w-[250px] h-[170px] sm:my-0 my-4">
            <Image
              src="/imag_homepage/work_rayan/three.svg"
              width={220}
              height={100}
              alt="Picture of the author"
              className="mx-auto"
            />
            <p className="mx-auto px-1 mt-[16px] text-colorgray text-center">
              ما سریعترین و مطمئن ترین سفیران رایان را برای کسب و کار شما
              پیشنهاد خواهیم داد
            </p>
          </div>
          <div className="w-[250px] h-[170px] sm:my-0 my-4">
            <Image
              src="/imag_homepage/work_rayan/four.svg"
              width={160}
              height={120}
              alt="Picture of the author"
              className="mx-auto"
            />
            <p className="mx-auto px-4 mt-[16px] text-colorgray text-center">
              روش پرداخت و بیمه متناسب با کسب و کار خودتان را انتخاب کنید
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center pt-[100px]">
          <Link
            href="/order/requst"
            className="bg-bgcolor text-[#fff] text-center px-4 font-[600] py-[14px] rounded text-[14px]"
          >
            می خواهید سفارش ثبت کنید؟
          </Link>
        </div>
      </div>
      {/* end section 2 */}

      {/*start section 3  */}
      <div className="bg-dashboard w-full min-h-[620px] pb-[50px]">
        <div className="pt-[120px] flex justify-center items-center">
          <h2 className="lg:text-[24px] text-[18] text-center lg:font-[800] font-[500]">
            <span className="lg:text-[32px] text-[24px] font-[900] align-middle inline-block">
              رایان
            </span>{" "}
            چگونه در صرفه جویی هزینه ها <p>به شما کمک می کند</p>
          </h2>
        </div>
        <div className="mt-[10px] mx-2">
          <Image
            src="/imag_homepage/work_rayan/helpRayan.svg"
            width={900}
            height={900}
            alt="rayan"
            className="mx-auto"
          />
        </div>
      </div>
      {/* end section 3 */}

      {/* start section 4 */}
      <div className="bg-dashboard w-full min-h-[600px] pb-[50px] pt-[50px]">
        <h2 className="lg:text-[24px] text-[18] text-center lg:font-[800] font-[600]">
          <span className="block text-bgcolor">
            با چند گام ساده کسب و کار خود را ثبت کنید
          </span>
          <span className="block ">
            و از مزایا و امکانات اختصاصی بهره مند شوید
          </span>
        </h2>
        <div className="flex justify-center items-center mt-[30px]">
          <Link
            href="/auth/login"
            className="bg-bgcolor text-[#fff] rounded-[16px] text-center px-6 py-3 text-[14px] font-[600] shadow-sm"
          >
            بدون هزینه ثبت نام کنید
          </Link>
        </div>
        {/* start row1 */}
        <div className="md:mt-[50px] mt-[0px] flex md:flex-row flex-col md:justify-around  md:mx-[30px] mx-0">
          <div className="h-[200px] mx-auto sm:px-0 px-6 pt-[40px] md:my-0 my-6">
            <p className="sm:text-[14px] text-[12px] text-[#B5B5B5] pb-[6px]">
              صورت حساب
            </p>
            <p className="sm:text-[18px] text-[16px] font-[600] ">
              صورت حساب خود را در لحظه دریافت کنید
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              با مدیریت مالی بر عملیات خود نظارت کامل داشته باشید و در هر
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              لحظه صورتحساب و گزارشهای مالی خود را دریافت کنید
            </p>
          </div>
          <div className="h-[200px] mx-auto sm:px-0 px-6 md:my-0 my-6">
            <Image
              src="/imag_homepage/work_rayan/top.svg"
              width={300}
              height={50}
              alt="rayan"
              className="mx-auto"
            />
          </div>
        </div>
        {/* end row1 */}
        {/* start row2 */}
        <div className="md:mt-[50px] mt-[0px] flex md:flex-row flex-col-reverse md:justify-around  md:mx-[30px] mx-0">
          <div className="h-[200px] mx-auto sm:px-0 px-6 md:my-0 my-6">
            <Image
              src="/imag_homepage/work_rayan/midle.svg"
              width={300}
              height={50}
              alt="rayan"
              className="mx-auto"
            />
          </div>
          <div className="h-[200px] mx-auto sm:px-0 px-6 pt-[60px] md:my-0 my-6">
            <p className="sm:text-[14px] text-[12px] text-[#B5B5B5] pb-[6px]">
              کیف پول
            </p>
            <p className="sm:text-[18px] text-[16px] font-[600] ">
              شارژ کنید و بیشتر صرفه جویی کنید
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              با پرداخت اعتباری از محل کیف پول، تخفیف های بیشتر را در
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              خدمات ویژه فعال کنید. اعتبار کاربران رایان مقرون به صرفه ترین
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              انتخاب پرداخت برای نیاز های لجستیک کسب و کار شما است.
            </p>
          </div>
        </div>
        {/* end row 2 */}
        {/* start row 3 */}
        <div className="md:mt-[50px] mt-[0px] flex md:flex-row flex-col md:justify-around  md:mx-[30px] mx-0">
          <div className="h-[200px] mx-auto sm:px-0 px-6 pt-[60px] md:my-0 my-6">
            <p className="sm:text-[14px] text-[12px] text-[#B5B5B5] pb-[10px]">
              کسب و کارتان با رایان یکپارچه می شود
            </p>
            <p className="sm:text-[18px] text-[16px] font-[600] ">
              رایان به فروشگاه آنلاین شما متصل می شود
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              با اتصال پلتفرم رایان پست به کسب و کارتان از طریق ابزار های متنوع
              مانند
            </p>
            <p className="text-colorgray sm:text-[16px] text-[14px]">
              وب سرویس و پلاگین، آسوده به توسعه ی فروشتان بپردازید
            </p>
          </div>
          <div className="h-[200px] mx-auto sm:px-0 px-6 md:my-0 my-6">
            <Image
              src="/imag_homepage/work_rayan/bottem.svg"
              width={300}
              height={50}
              alt="rayan"
              className="mx-auto"
            />
          </div>
        </div>
        {/* end row 3*/}
        <div className="flex justify-center mt-[60px]">
          <Link
            href="order/requst"
            className="bg-coloryellow text-colortext rounded py-[10px] px-[14px] font-[500] text-[15px]"
          >
            حساب کاربری ایجاد کنید
          </Link>
        </div>
      </div>
      {/* end section 4 */}

      {/*start section 5  */}
      <div className="bg-dashboard w-full min-h-[600px] pb-[50px] pt-[50px]">
        <div className="flex justify-center items-center lg:text-[32px] font-[600] md:text-[24px] tetx-[18px]">
          <h3>مشتریان درباره ما چه می گویند</h3>
        </div>
        <div className="mt-[50px] w-[80%] mx-auto mb-[50px]">
          <Slider />
        </div>
      </div>
      {/*end section 5  */}

      {/* start Footer */}
      <div className="bg-[white] w-full mt-[10px]">
        <div className="md:pt-[90px] pt-[40px] pb-[60px] md:px-[80px] flex justify-between 2lg:flex-nowrap flex-wrap">
          <div className="mx-auto md:px-[15px] px-[0px] 2lg:basis-[20%] md:basis-[50%] basis-full sm:text-center text-right 2lg:mb-0 mb-[25px]">
            <p className="text-[18px] font-[600] pb-[14px] text-center">
              رایان در شبکه های اجتماعی:
            </p>
            <div className="flex justify-center items-center">
              <Link
                href="/"
                className="text-bgcolor text-[22px] ml-[8px] bg-[#D9D9D9] p-[5px] rounded-[4px] "
              >
                <FiInstagram />
              </Link>
              <Link
                href="/"
                className="text-bgcolor text-[22px] mx-[8px] bg-[#D9D9D9] p-[5px] rounded-[4px] "
              >
                <FaTelegramPlane />
              </Link>
              <Link
                href="/"
                className="text-bgcolor text-[22px] mx-[8px] bg-[#D9D9D9] p-[5px] rounded-[4px] "
              >
                <SiAparat />
              </Link>
              <Link
                href="/"
                className="text-bgcolor text-[22px] mx-[8px] bg-[#D9D9D9] p-[5px] rounded-[4px] "
              >
                <FaLinkedinIn />
              </Link>
            </div>
            <Image
              src="/imag_homepage/enemad.svg"
              width={80}
              height={30}
              alt="rayan"
              className="mx-auto mt-[30px]"
            />
             <hr className="md:hidden block my-[10px] bg-gray-200 w-full h-[1px] " />
          </div>
          <div className="mx-auto px-[15px] 2lg:basis-[20%] md:basis-[50%] basis-full sm:text-center text-right 2lg:mb-0 mb-[25px]">
            <p className="text-[18px] font-[600] pb-[20px] ">رایان پژوهش</p>
            <div className="flex flex-col gap-[25px]">
              <Link href="/" className="text-[16px] text-colorgray">
                درباره ما
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                پلتفرم
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                خبرکده
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                کسب و کار
              </Link>
            </div>
          </div>
          <div className="mx-auto px-[15px] 2lg:basis-[20%] md:basis-[50%] basis-full sm:text-center text-right 2lg:mb-0 mb-[25px]">
            <p className="text-[18px] font-[600] pb-[20px] ">خدمات و محصولات</p>
            <div className="flex flex-col gap-[25px]">
              <Link href="/" className="text-[16px] text-colorgray">
                یکپارچگی با وب سرویس
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                با ما مشارکت کنید
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                به ناوگان رایان بپیوندید
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                میزکار تجارت
              </Link>
            </div>
          </div>
          <div className="mx-auto px-[15px] 2lg:basis-[20%] md:basis-[50%] basis-full sm:text-center text-right 2lg:mb-0 mb-[25px]">
            <p className="text-[18px] font-[600] pb-[20px] ">پشتیبانی</p>
            <div className="flex flex-col gap-[25px]">
              <Link href="/" className="text-[16px] text-colorgray">
                مرکز پشتیبانی
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                تماس با ما
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                {" "}
                رهگیری
              </Link>
              <Link href="/" className="text-[16px] text-colorgray">
                مرکز اطلاعات و داده ها
              </Link>
            </div>
          </div>
          <div className="mx-auto md:px-[15px]  2lg:order-5 order-first 2lg:basis-[20%] md:basis-[50%] basis-full sm:text-center text-right 2lg:mb-0 mb-[25px]">
            <Image
              src="/footer/logo.svg"
              width={180}
              height={30}
              alt="rayan"
              className="mx-auto"
            />
           
          </div>
        </div>
        <div className="text-center py-[20px] bg-bgcolor text-[#fff] sm:text-[16px] text-[14px]">تمام حقوق این سایت متعلق به برند رایان و شرکت رایان پژوهش ایرانیان نیک می باشد</div>
      </div>
      {/* end Footer */}
    </>
  );
};

export default Maincomponent;
