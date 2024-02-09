import React from 'react'
import { FaWallet } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import Image from "next/image";
const charge = () => {
  return (
    <div className='mt-[15px] flex lg:flex-row flex-col w-full lg:w-[90%]'>
      <div className='lg:basis-[60%] basis-full bg-bgcolor h-[180px] rounded flex items-start pt-[38px] justify-around'>
      <div className='basis-full px-[10px]'>
      <span className='text-[white] pr-[10px] pb-[10px] block'>مقدار را انتخاب کنید</span>
       <div className='flex items-center justify-around lg:flex-nowrap flex-wrap p-1'>
         <div className='lg:w-[18%] w-[43%] lg:my-0 my-2 border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='lg:w-[18%] w-[43%] lg:my-0 my-2 border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='lg:w-[18%] w-[43%] lg:my-0 my-2 border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='lg:w-[18%] w-[43%] lg:my-0 my-2 border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='lg:w-[18%] w-[43%] lg:my-0 my-2 border-1 border-solid border-[white] h-[40px] rounded'></div>
       </div>
      </div>
      </div>
      <div className='lg:basis-[40%] basis-full flex flex-col lg:pr-[20px] pr-[0px] lg:mt-0 mt-[20px]'>
        <div className='h-[180px] lg:w-[80%] w-full bg-[#fff] mb-[10px] rounded'>
        <div className='mx-auto pt-[38px] text-colorgray' >
        <FaWallet className='text-utils-300 text-[36px] block text-center mx-auto'/>
        <span className='block pt-1 text-[14px] text-center'>موجودی فعلی شما</span>
        <span className='block pt-1 text-center text-bold text-[16px]'><span className='lg:text-[26px] text-[18px]'>0</span> تومان</span>
        </div>
        </div>
        <div className='h-[180px] lg:w-[80%] w-full bg-[#fff] mt-[10px] rounded p-4'>
        <div className='pt-[36px] text-colorgray'>
        <Image
            src="/image_dashboard/seke.svg"
            width={55}
            height={40}
            alt="logo"
            priority
            className='mx-auto'
          />
        <span className='block text-center text-[14px] pt-1'>سفارش دهید و در هزینه خود صرفه جویی کنید</span>
        <span className='block text-center text-[12px] pt-1'>10% صرفه جویی با پرداخت اعتبار کاربری</span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default charge
