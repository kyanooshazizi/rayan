import React from 'react'

const index = () => {
  return (
    <div className='lg:w-[50%] md:w-[70%] sm:w-[80%] w-full mt-10'>
    <button className='text-[#fff] bg-bgcolor py-3 rounded-[3px] w-full'>وارد کردن آدرس ها زا طریق فایل اکسل</button>
    <div className='bg-[#fff] rounded-[3px] w-full h-[250px] mt-6 flex justify-center items-center p-6'>
      <div className='bg-[#fff] rounded-[3px] h-[200px] bg-dashboard w-full border-2 border-solid border-gray-200 pr-4 pt-2 text-gray-400'>
        فایل را در این قسمت بکشید و رها کنید
      </div>
    </div>
    <div className='flex justify-between mt-6'>
        <button className='basis-[48%] text-[#fff] bg-[#515E83] py-2 rounded-[3px]'>ثبت اطلاعات</button>
        <button className='basis-[48%] text-[#fff] bg-[#7C85A0] py-2 rounded-[3px]'>نمونه فایل اکسل</button>
    </div>
    </div>
  )
}

export default index
