import React from 'react'
import { FaWallet } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import Image from "next/image";
const charge = () => {
  return (
    <div className='mt-[15px] flex w-full lg:w-[90%]'>
      <div className='basis-[60%] bg-bgcolor h-[180px] rounded flex items-start pt-[38px] justify-around'>
      <div className='basis-full px-[10px]'>
      <span className='text-[white] pr-[10px] pb-[10px] block'>مقدار را انتخاب کنید</span>
       <div className='flex items-center justify-around p-1'>
         <div className='w-[18%] border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='w-[18%] border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='w-[18%] border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='w-[18%] border-1 border-solid border-[white] h-[40px] rounded'></div>
         <div className='w-[18%] border-1 border-solid border-[white] h-[40px] rounded'></div>
       </div>
      </div>
      </div>
      <div className='basis-[40%] flex lg:flex-col pr-[20px]'>
        <div className='h-[180px] w-[80%] bg-[#fff] mb-[10px] rounded'>
        <div className='mx-auto pt-[38px]' >
        <FaWallet className='text-utils-300 text-[36px] block text-center mx-auto'/>
        <span className='block pt-1 text-[14px] text-center'>موجودی فعلی شما</span>
        <span className='block pt-1 text-center text-bold text-[16px]'><span className='lg:text-[26px] text-[18px]'>0</span> تومان</span>
        </div>
        </div>
        <div className='h-[180px] w-[80%] bg-[#fff] mt-[10px] rounded'>
        <div className='pt-[36px]'>
        <Image
            src="/image_dashboard/seke.svg"
            width={60}
            height={45}
            alt="logo"
            priority
            className='mx-auto'
          />
        <span className='block text-center'>سفارش دهید و در هزینه خود صرفه جویی کنید</span>
        <span className='block text-center'>10% صرفه جویی با پرداخت اعتبار کاربری</span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default charge
